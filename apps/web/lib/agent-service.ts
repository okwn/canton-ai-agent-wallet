// Agent execution service — orchestrates parse → policy → execution
import {
  parseIntent,
  intentSummary,
  policyEngine,
} from '@canton/agent-core';
import type { ParsedExecutionIntent, PolicyEvaluationResult, ExecutionReceipt } from '@canton/shared';
import {
  queryPolicies,
  queryWalletState,
  queryOpportunities,
  insertAuditEvent,
  insertExecutionAttempt,
  updateExecutionAttempt,
  updatePolicy,
  queryAuditEvents,
} from './db';
import { generateId } from './utils';

function microCCToDisplay(n: number | null): string {
  if (n === null) return 'N/A';
  return (n / 1_000_000).toFixed(2);
}

// ─── Parse + Evaluate pipeline ──────────────────────────────────────────────

export async function parseAndEvaluate(text: string) {
  // 1. Parse intent
  const intent = parseIntent(text);

  // 2. Load policies + wallet state from DB
  const policies = await queryPolicies();
  const wallet = await queryWalletState();
  const opportunities = await queryOpportunities();

  // 3. Convert raw DB policies to typed Policy objects
  const typedPolicies = policies.map((p: Record<string, unknown>) => {
    const base = {
      id: p.id as string,
      enabled: p.enabled as boolean,
      priority: p.priority as number,
    };
    switch (p.type) {
      case 'MAX_PER_TRADE':
        return { ...base, type: 'MAX_PER_TRADE' as const, valueMicroCC: parseInt(p.value as string, 10) };
      case 'MAX_DAILY':
        return {
          ...base,
          type: 'MAX_DAILY' as const,
          valueMicroCC: parseInt(p.value as string, 10),
          currentUsageMicroCC: (p.currentUsageMicroCC as number) ?? 0,
          windowStart: p.windowStart as string | null,
        };
      case 'APPROVAL_THRESHOLD':
        return { ...base, type: 'APPROVAL_THRESHOLD' as const, valueMicroCC: parseInt(p.value as string, 10) };
      case 'STRATEGY_ALLOWLIST':
      case 'STRATEGY_DENYLIST':
        return {
          ...base,
          type: p.type as 'STRATEGY_ALLOWLIST' | 'STRATEGY_DENYLIST',
          providerIds: (p.providerIds as string[]) ?? [],
        };
      case 'ASSET_ALLOWLIST':
        return {
          ...base,
          type: 'ASSET_ALLOWLIST' as const,
          assetSymbols: (p.assetSymbols as string[]) ?? [],
        };
      case 'MAX_SLIPPAGE':
        return { ...base, type: 'MAX_SLIPPAGE' as const, valueBps: parseInt(p.value as string, 10) };
      case 'SIMULATION_ONLY':
        return { ...base, type: 'SIMULATION_ONLY' as const };
      case 'EXECUTION_MODE':
        return { ...base, type: 'EXECUTION_MODE' as const, value: p.value as 'disabled' | 'approval_required' | 'auto_execute' };
      default:
        return null;
    }
  }).filter(Boolean);

  // 4. Convert wallet state
  const typedWallet = {
    address: wallet.address as string,
    isConnected: wallet.isConnected as boolean,
    isDemo: wallet.isDemo as boolean,
    balances: (wallet.balances as Array<{ asset: string; available: number; locked: number; total: number }>).map(b => ({
      asset: b.asset,
      available: b.available,
      locked: b.locked,
      total: b.total,
    })),
    lastSyncedAt: wallet.lastSyncedAt as string | null,
  };

  // 5. Set policies on engine
  policyEngine.setPolicies(typedPolicies as Parameters<typeof policyEngine.setPolicies>[0]);

  // 6. Evaluate
  const evaluation = policyEngine.evaluate(intent, typedWallet);

  // 7. Log audit event
  await insertAuditEvent({
    id: generateId(),
    eventType: 'INTENT_PARSED',
    walletAddress: typedWallet.address,
    intentId: intent.id,
    payload: {
      rawText: text,
      parsedIntent: intent,
      evaluation,
    },
    simulated: typedWallet.isDemo,
  });

  await insertAuditEvent({
    id: generateId(),
    eventType: 'POLICY_EVALUATED',
    walletAddress: typedWallet.address,
    intentId: intent.id,
    payload: { evaluation },
    simulated: typedWallet.isDemo,
  });

  return {
    intent,
    intentSummary: intentSummary(intent),
    evaluation,
    opportunities,
    wallet: typedWallet,
    policies: typedPolicies,
  };
}

// ─── Execute approved plan ──────────────────────────────────────────────────

export async function executeApprovedIntent(
  intentId: string,
  intent: ParsedExecutionIntent,
  evaluation: PolicyEvaluationResult
) {
  const attemptId = generateId();
  const wallet = await queryWalletState();
  const opportunities = await queryOpportunities();

  const typedWallet = {
    address: wallet.address as string,
    isConnected: wallet.isConnected as boolean,
    isDemo: wallet.isDemo as boolean,
    balances: (wallet.balances as Array<{ asset: string; available: number; locked: number; total: number }>).map(b => ({
      asset: b.asset,
      available: b.available,
      locked: b.locked,
      total: b.total,
    })),
    lastSyncedAt: wallet.lastSyncedAt as string | null,
  };

  // Find matching opportunity
  const topOpportunity = (intent.providerFilter && intent.providerFilter.length > 0
    ? opportunities.find((o: Record<string, unknown>) => intent.providerFilter!.includes(o.provider as string))
    : opportunities[0]) as Record<string, unknown> | undefined;

  const isSimulated = !!(typedWallet.isDemo || intent.simulationOnly || (topOpportunity && topOpportunity.executionSupport !== 'real'));

  await insertExecutionAttempt({
    id: attemptId,
    intentId,
    planId: null,
    status: 'RUNNING',
    stepsTotal: 1,
  });

  const startTime = Date.now();
  let receipt: ExecutionReceipt;

  if (evaluation.decision === 'REQUIRES_APPROVAL') {
    receipt = {
      id: generateId(),
      attemptId,
      intentId,
      status: 'BLOCKED',
      stepResults: [],
      totalOutputMicroCC: null,
      totalFeesPaidMicroCC: null,
      policyDecision: 'REQUIRES_APPROVAL',
      policyReasons: evaluation.reasons,
      blockedByPolicy: evaluation.blockedBy,
      simulationOnly: isSimulated,
      executedAt: new Date().toISOString(),
      durationMs: Date.now() - startTime,
    };
  } else if (evaluation.decision === 'DENIED') {
    receipt = {
      id: generateId(),
      attemptId,
      intentId,
      status: 'BLOCKED',
      stepResults: [],
      totalOutputMicroCC: null,
      totalFeesPaidMicroCC: null,
      policyDecision: 'DENIED',
      policyReasons: evaluation.reasons,
      blockedByPolicy: evaluation.blockedBy,
      simulationOnly: isSimulated,
      executedAt: new Date().toISOString(),
      durationMs: Date.now() - startTime,
    };
  } else {
    // Simulated execution
    const estimatedOutput = topOpportunity && intent.amountMicroCC !== null
      ? Math.floor(intent.amountMicroCC * (1 + ((topOpportunity.aprBps as number) / 10_000) / 365))
      : null;
    const estimatedFees = topOpportunity
      ? (topOpportunity.estimatedExecutionCostMicroCC as number)
      : 5000;

    receipt = {
      id: generateId(),
      attemptId,
      intentId,
      status: isSimulated ? 'SIMULATED' : 'SUCCESS',
      stepResults: [
        {
          stepId: generateId(),
          status: isSimulated ? 'SIMULATED' : 'SUCCESS',
          outputMicroCC: estimatedOutput,
          feesPaidMicroCC: estimatedFees,
          slippageBps: topOpportunity ? (topOpportunity.slippageToleranceBps as number) : 30,
          txHash: null,
          simulatedTxHash: `0xSIM${Date.now().toString(16)}`,
          error: null,
          executedAt: new Date().toISOString(),
        },
      ],
      totalOutputMicroCC: estimatedOutput,
      totalFeesPaidMicroCC: estimatedFees,
      policyDecision: 'APPROVED',
      policyReasons: evaluation.reasons,
      blockedByPolicy: null,
      simulationOnly: isSimulated,
      executedAt: new Date().toISOString(),
      durationMs: Date.now() - startTime,
    };
  }

  // Update attempt
  await updateExecutionAttempt(attemptId, {
    status: receipt.status === 'BLOCKED' ? 'REJECTED' : receipt.status === 'SIMULATED' ? 'COMPLETED' : receipt.status,
    stepsCompleted: receipt.status === 'BLOCKED' ? 0 : 1,
    completedAt: new Date().toISOString(),
  });

  // Log completion
  await insertAuditEvent({
    id: generateId(),
    eventType: receipt.status === 'BLOCKED' ? 'EXECUTION_REJECTED' : 'EXECUTION_COMPLETED',
    walletAddress: typedWallet.address,
    intentId,
    attemptId,
    payload: { receipt, evaluation },
    simulated: isSimulated,
  });

  // Update daily usage if approved
  if (evaluation.decision === 'APPROVED' && intent.amountMicroCC !== null) {
    const policies = await queryPolicies();
    const dailyPolicy = policies.find((p: Record<string, unknown>) => p.type === 'MAX_DAILY') as Record<string, unknown> | undefined;
    if (dailyPolicy) {
      const currentUsage = (dailyPolicy.currentUsageMicroCC as number) ?? 0;
      await updatePolicy(dailyPolicy.id as string, {
        currentUsageMicroCC: currentUsage + intent.amountMicroCC,
        windowStart: (dailyPolicy.windowStart as string | null) ?? new Date().toISOString(),
      });
    }
  }

  return { receipt, attemptId };
}

// ─── Get dashboard data ─────────────────────────────────────────────────────

export async function getDashboardData() {
  const [policies, auditEvents, opportunities] = await Promise.all([
    queryPolicies(),
    queryAuditEvents(20),
    queryOpportunities(),
  ]);

  return {
    policies,
    auditEvents,
    opportunities,
    stats: {
      totalEvents: auditEvents.length,
      policiesActive: policies.filter((p: Record<string, unknown>) => p.enabled).length,
      opportunities: opportunities.length,
    },
  };
}

import { NextRequest, NextResponse } from 'next/server';
import { AgentOrchestrator } from '@canton/agent-core';
import {
  queryPolicies,
  queryWalletState,
  queryOpportunities,
  insertAuditEvent,
} from '@/lib/db';
import { generateId } from '@/lib/utils';

function toPolicy(p: Record<string, unknown>) {
  const base = { id: p.id as string, enabled: p.enabled as boolean, priority: p.priority as number };
  switch (p.type) {
    case 'MAX_PER_TRADE': return { ...base, type: 'MAX_PER_TRADE' as const, valueMicroCC: parseInt(p.value as string, 10) };
    case 'MAX_DAILY': return { ...base, type: 'MAX_DAILY' as const, valueMicroCC: parseInt(p.value as string, 10), currentUsageMicroCC: (p.currentUsageMicroCC as number) ?? 0, windowStart: p.windowStart as string | null };
    case 'APPROVAL_THRESHOLD': return { ...base, type: 'APPROVAL_THRESHOLD' as const, valueMicroCC: parseInt(p.value as string, 10) };
    case 'STRATEGY_ALLOWLIST': case 'STRATEGY_DENYLIST': return { ...base, type: p.type as 'STRATEGY_ALLOWLIST' | 'STRATEGY_DENYLIST', providerIds: (p.providerIds as string[]) ?? [] };
    case 'ASSET_ALLOWLIST': return { ...base, type: 'ASSET_ALLOWLIST' as const, assetSymbols: (p.assetSymbols as string[]) ?? [] };
    case 'MAX_SLIPPAGE': return { ...base, type: 'MAX_SLIPPAGE' as const, valueBps: parseInt(p.value as string, 10) };
    case 'SIMULATION_ONLY': return { ...base, type: 'SIMULATION_ONLY' as const };
    case 'EXECUTION_MODE': return { ...base, type: 'EXECUTION_MODE' as const, value: p.value as 'disabled' | 'approval_required' | 'auto_execute' };
    default: return null;
  }
}

function toWalletState(w: Record<string, unknown>) {
  return {
    address: w.address as string,
    isConnected: w.isConnected as boolean,
    isDemo: w.isDemo as boolean,
    balances: (w.balances as Array<{ asset: string; available: number; locked: number; total: number }>).map(b => ({ asset: b.asset, available: b.available, locked: b.locked, total: b.total })),
    lastSyncedAt: w.lastSyncedAt as string | null,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'Missing or invalid text field' }, { status: 400 });
    }

    const [policies, wallet, opportunities] = await Promise.all([
      queryPolicies(),
      queryWalletState(),
      queryOpportunities(),
    ]);

    const typedPolicies = policies.map(toPolicy).filter(Boolean);
    const typedWallet = toWalletState(wallet);
    const typedOpportunities = (opportunities as Array<Record<string, unknown>>).map(o => ({
      id: o.id as string,
      provider: o.provider as string,
      providerName: o.providerName as string,
      strategyName: o.strategyName as string,
      assetIn: o.assetIn as string,
      assetOut: o.assetOut as string,
      aprBps: o.aprBps as number,
      feesBps: o.feesBps as number,
      liquidityMicroCC: o.liquidityMicroCC as number,
      riskScore: o.riskScore as number,
      riskLevel: o.riskLevel as 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN',
      minAmountMicroCC: o.minAmountMicroCC as number,
      estimatedExecutionCostMicroCC: o.estimatedExecutionCostMicroCC as number,
      slippageToleranceBps: o.slippageToleranceBps as number,
      executionSupport: o.executionSupport as 'real' | 'simulated' | 'unsupported',
      isWhitelisted: o.isWhitelisted as boolean,
      addedAt: o.addedAt as string,
      expiresAt: (o.expiresAt as string) ?? null,
    }));

    const orchestrator = new AgentOrchestrator();
    orchestrator.configureFromEnv(); // no-op if no LLM_API_KEY set
    orchestrator.setPolicies(typedPolicies as Parameters<typeof orchestrator.setPolicies>[0]);
    orchestrator.setWallet(typedWallet);
    orchestrator.setOpportunities(typedOpportunities);

    const { plan, intentId, llmParseFallback } = await orchestrator.generatePlan(text.trim());

    // Log audit event
    await insertAuditEvent({
      id: generateId(),
      eventType: 'AGENT_PLAN_GENERATED',
      walletAddress: typedWallet.address,
      intentId,
      payload: {
        interpretedIntent: plan.interpretedIntent,
        policyVerdict: plan.policyVerdict,
        shortlistedCount: plan.shortlistedOpportunities.length,
        nextAction: plan.nextAction,
        isSimulated: plan.isSimulated,
        llmParseFallback,
      },
      simulated: plan.isSimulated,
    });

    return NextResponse.json({
      intentId,
      plan,
      llmParseFallback,
      disclaimer: plan.disclaimer,
    });
  } catch (err) {
    console.error('[agent/plan]', err);
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}

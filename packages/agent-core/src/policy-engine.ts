// Policy Engine — deterministic risk evaluation pipeline
import {
  ParsedExecutionIntentSchema,
  PolicySchema,
  ConnectedWalletStateSchema,
  PolicyEvaluationResultSchema,
  RiskCheckResultSchema,
  type ParsedExecutionIntent,
  type Policy,
  type ConnectedWalletState,
  type PolicyEvaluationResult,
  type RiskCheckResult,
  type BudgetPolicy,
  type ExecutionPolicy,
  type ApprovalPolicy,
  type ProviderListPolicy,
  type AssetAllowlistPolicy,
  type MaxSlippagePolicy,
  type SimulationOnlyPolicy,
  type ExecutionModePolicy,
} from '@canton/shared';
import { z } from 'zod';
import { DEFAULT_LIMITS } from '@canton/shared/constants';

function microCCToDisplay(n: number): string {
  return (n / 1_000_000).toFixed(2);
}

// ─── Zod-parsed intent ───────────────────────────────────────────────────────

type ParsedIntent = z.infer<typeof ParsedExecutionIntentSchema>;

// ─── Risk evaluation pipeline ────────────────────────────────────────────────

export class PolicyEngine {
  private policies: Policy[] = [];

  setPolicies(policies: Policy[]): void {
    this.policies = [...policies].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
  }

  getPolicies(): Policy[] {
    return [...this.policies];
  }

  /**
   * Main entry point: evaluate an intent against current policies and wallet state.
   * Runs all risk checks in priority order and returns a deterministic decision.
   */
  evaluate(
    intent: ParsedIntent,
    wallet: ConnectedWalletState
  ): PolicyEvaluationResult {
    const intentId = intent.id;
    const evaluatedAt = new Date().toISOString();
    const riskChecks: RiskCheckResult[] = [];

    // 1. Validate intent structure
    riskChecks.push(this.checkIntentValidity(intent));

    // Short-circuit: if intent is invalid, deny
    if (riskChecks[0].verdict === 'FAIL') {
      return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
    }

    // 2. Check execution mode policy
    const execModeCheck = this.checkExecutionMode(intent);
    riskChecks.push(execModeCheck);
    if (execModeCheck.verdict === 'FAIL') {
      return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
    }

    // 3. Check simulation-only policy
    const simCheck = this.checkSimulationMode(intent);
    riskChecks.push(simCheck);
    // simulation-only is a WARN (allows sim) not a FAIL

    // 4. Check provider denylist
    if (intent.providerFilter) {
      const denyCheck = this.checkProviderDenyList(intent);
      riskChecks.push(denyCheck);
      if (denyCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
      }
    }

    // 5. Check provider allowlist
    if (intent.providerFilter) {
      const allowlistCheck = this.checkProviderAllowList(intent);
      riskChecks.push(allowlistCheck);
      if (allowlistCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
      }
    }

    // 6. Check asset allowlist
    if (intent.assetFilter && intent.assetFilter.length > 0) {
      const assetCheck = this.checkAssetAllowlist(intent);
      riskChecks.push(assetCheck);
      if (assetCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
      }
    }

    // 7. Check slippage
    if (intent.maxSlippageBps !== null) {
      const slippageCheck = this.checkSlippage(intent);
      riskChecks.push(slippageCheck);
      if (slippageCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
      }
    }

    // 8. Resolve amount and check balance
    if (intent.amountMicroCC !== null) {
      const balanceCheck = this.checkBalance(intent, wallet);
      riskChecks.push(balanceCheck);
      if (balanceCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
      }

      // 9. Check max per trade
      const tradeCapCheck = this.checkBudgetCap(intent);
      riskChecks.push(tradeCapCheck);
      if (tradeCapCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
      }

      // 10. Check daily limit
      const dailyCheck = this.checkDailyLimit(intent);
      riskChecks.push(dailyCheck);
      if (dailyCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
      }

      // 11. Check approval threshold
      const approvalCheck = this.checkApprovalThreshold(intent);
      riskChecks.push(approvalCheck);
      if (approvalCheck.verdict === 'FAIL') {
        return this.buildResult(intentId, 'REQUIRES_APPROVAL', riskChecks, evaluatedAt);
      }
    }

    // All checks passed → APPROVED
    return this.buildResult(intentId, 'APPROVED', riskChecks, evaluatedAt);
  }

  // ─── Individual risk checks ──────────────────────────────────────────────

  private checkIntentValidity(intent: ParsedIntent): RiskCheckResult {
    const result = ParsedExecutionIntentSchema.safeParse(intent);
    if (!result.success) {
      return {
        checkType: 'VALIDITY_CHECK',
        verdict: 'FAIL',
        reason: `Intent validation failed: ${result.error.issues.map(i => i.message).join('; ')}`,
        blockedByPolicy: null,
      };
    }
    if (!intent.action || intent.action === 'UNKNOWN') {
      return {
        checkType: 'VALIDITY_CHECK',
        verdict: 'FAIL',
        reason: 'Could not determine a valid action from the command.',
        blockedByPolicy: null,
      };
    }
    return {
      checkType: 'VALIDITY_CHECK',
      verdict: 'PASS',
      reason: 'Intent structure is valid.',
      blockedByPolicy: null,
    };
  }

  private checkExecutionMode(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<ExecutionModePolicy>('EXECUTION_MODE');
    if (!policy || !policy.enabled) {
      return {
        checkType: 'EXECUTION_MODE_CHECK',
        verdict: 'PASS',
        reason: 'No execution mode policy active. Using default: approval required.',
        blockedByPolicy: null,
      };
    }

    if (policy.value === 'disabled') {
      return {
        checkType: 'EXECUTION_MODE_CHECK',
        verdict: 'FAIL',
        reason: 'Execution is currently disabled by policy. No trades can be executed.',
        blockedByPolicy: policy.id,
      };
    }

    return {
      checkType: 'EXECUTION_MODE_CHECK',
      verdict: 'PASS',
      reason: `Execution mode is set to "${policy.value}".`,
      blockedByPolicy: null,
    };
  }

  private checkSimulationMode(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<SimulationOnlyPolicy>('SIMULATION_ONLY');
    const simOnly = policy?.enabled ?? false;

    if (simOnly && !intent.simulationOnly) {
      // User wants to execute for real but sim-only is on
      return {
        checkType: 'SIMULATION_MODE_CHECK',
        verdict: 'WARN',
        reason: 'Simulation-only mode is active. Real execution is blocked.',
        blockedByPolicy: policy?.id ?? null,
      };
    }

    if (intent.simulationOnly) {
      return {
        checkType: 'SIMULATION_MODE_CHECK',
        verdict: 'PASS',
        reason: 'Simulation-only requested. This will be a simulated run.',
        blockedByPolicy: null,
      };
    }

    return {
      checkType: 'SIMULATION_MODE_CHECK',
      verdict: 'PASS',
      reason: 'Simulation mode is off. Real execution is permitted.',
      blockedByPolicy: null,
    };
  }

  private checkProviderDenyList(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<ProviderListPolicy>('STRATEGY_DENYLIST');
    if (!policy || !policy.enabled) {
      return {
        checkType: 'DENYLIST_CHECK',
        verdict: 'PASS',
        reason: 'No denylist policy active.',
        blockedByPolicy: null,
      };
    }

    const denied = intent.providerFilter?.filter(p => policy.providerIds.includes(p));
    if (denied && denied.length > 0) {
      return {
        checkType: 'DENYLIST_CHECK',
        verdict: 'FAIL',
        reason: `Requested provider(s) "${denied.join(', ')}" are on the denylist and cannot be used.`,
        blockedByPolicy: policy.id,
      };
    }

    return {
      checkType: 'DENYLIST_CHECK',
      verdict: 'PASS',
      reason: 'No requested providers are on the denylist.',
      blockedByPolicy: null,
    };
  }

  private checkProviderAllowList(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<ProviderListPolicy>('STRATEGY_ALLOWLIST');
    if (!policy || !policy.enabled) {
      return {
        checkType: 'ALLOWLIST_CHECK',
        verdict: 'PASS',
        reason: 'No allowlist policy active.',
        blockedByPolicy: null,
      };
    }

    const requested = intent.providerFilter ?? [];
    const notAllowed = requested.filter(p => !policy.providerIds.includes(p));
    if (notAllowed.length > 0) {
      return {
        checkType: 'ALLOWLIST_CHECK',
        verdict: 'FAIL',
        reason: `Provider(s) "${notAllowed.join(', ')}" are not on the allowlist. Only ${policy.providerIds.join(', ')} are permitted.`,
        blockedByPolicy: policy.id,
      };
    }

    return {
      checkType: 'ALLOWLIST_CHECK',
      verdict: 'PASS',
      reason: 'All requested providers are on the allowlist.',
      blockedByPolicy: null,
    };
  }

  private checkAssetAllowlist(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<AssetAllowlistPolicy>('ASSET_ALLOWLIST');
    if (!policy || !policy.enabled || policy.assetSymbols.length === 0) {
      return {
        checkType: 'ASSET_ALLOWLIST_CHECK',
        verdict: 'PASS',
        reason: 'No asset allowlist policy active.',
        blockedByPolicy: null,
      };
    }

    const requested = intent.assetFilter ?? [];
    const notAllowed = requested.filter(a => !policy.assetSymbols.includes(a));
    if (notAllowed.length > 0) {
      return {
        checkType: 'ASSET_ALLOWLIST_CHECK',
        verdict: 'FAIL',
        reason: `Asset(s) "${notAllowed.join(', ')}" are not on the allowed asset list. Only ${policy.assetSymbols.join(', ')} may be used.`,
        blockedByPolicy: policy.id,
      };
    }

    return {
      checkType: 'ASSET_ALLOWLIST_CHECK',
      verdict: 'PASS',
      reason: 'All requested assets are on the allowlist.',
      blockedByPolicy: null,
    };
  }

  private checkSlippage(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<MaxSlippagePolicy>('MAX_SLIPPAGE');
    if (!policy || !policy.enabled) {
      return {
        checkType: 'SLIPPAGE_CHECK',
        verdict: 'PASS',
        reason: 'No max slippage policy active.',
        blockedByPolicy: null,
      };
    }

    if (intent.maxSlippageBps !== null && intent.maxSlippageBps > policy.valueBps) {
      return {
        checkType: 'SLIPPAGE_CHECK',
        verdict: 'FAIL',
        reason: `Requested slippage of ${(intent.maxSlippageBps / 100).toFixed(2)}% exceeds your maximum of ${(policy.valueBps / 100).toFixed(2)}%.`,
        blockedByPolicy: policy.id,
      };
    }

    return {
      checkType: 'SLIPPAGE_CHECK',
      verdict: 'PASS',
      reason: `Slippage of ${(intent.maxSlippageBps ?? 0) / 100}% is within the ${(policy.valueBps / 100).toFixed(2)}% limit.`,
      blockedByPolicy: null,
    };
  }

  private checkBalance(intent: ParsedIntent, wallet: ConnectedWalletState): RiskCheckResult {
    if (intent.amountMicroCC === null) {
      return {
        checkType: 'BALANCE_CHECK',
        verdict: 'PASS',
        reason: 'No amount specified; balance check not applicable.',
        blockedByPolicy: null,
      };
    }

    const ccBalance = wallet.balances.find(b => b.asset === 'CC');
    const available = ccBalance?.available ?? 0;

    if (intent.amountMicroCC > available) {
      return {
        checkType: 'BALANCE_CHECK',
        verdict: 'FAIL',
        reason: `Insufficient balance. You have ${microCCToDisplay(available)} CC available but the request is for ${microCCToDisplay(intent.amountMicroCC)} CC.`,
        blockedByPolicy: null,
        details: { available, requested: intent.amountMicroCC },
      };
    }

    return {
      checkType: 'BALANCE_CHECK',
      verdict: 'PASS',
      reason: `Balance sufficient. ${microCCToDisplay(available)} CC available, ${microCCToDisplay(intent.amountMicroCC)} CC requested.`,
      blockedByPolicy: null,
      details: { available, requested: intent.amountMicroCC },
    };
  }

  private checkBudgetCap(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<BudgetPolicy>('MAX_PER_TRADE');
    const maxPerTrade = policy?.valueMicroCC ?? DEFAULT_LIMITS.MAX_PER_TRADE_MICRO_CC;

    if (intent.amountMicroCC === null) {
      return {
        checkType: 'BUDGET_CAP_CHECK',
        verdict: 'PASS',
        reason: 'No amount specified; per-trade cap not applicable.',
        blockedByPolicy: null,
      };
    }

    if (intent.amountMicroCC > maxPerTrade) {
      return {
        checkType: 'BUDGET_CAP_CHECK',
        verdict: 'FAIL',
        reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC exceeds your per-trade limit of ${microCCToDisplay(maxPerTrade)} CC.`,
        blockedByPolicy: policy?.id ?? null,
        details: { maxPerTrade, requested: intent.amountMicroCC },
      };
    }

    return {
      checkType: 'BUDGET_CAP_CHECK',
      verdict: 'PASS',
      reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC is within the per-trade limit of ${microCCToDisplay(maxPerTrade)} CC.`,
      blockedByPolicy: null,
      details: { maxPerTrade, requested: intent.amountMicroCC },
    };
  }

  private checkDailyLimit(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<ExecutionPolicy>('MAX_DAILY');
    if (!policy || !policy.enabled) {
      return {
        checkType: 'DAILY_LIMIT_CHECK',
        verdict: 'PASS',
        reason: 'No daily limit policy active.',
        blockedByPolicy: null,
      };
    }

    if (intent.amountMicroCC === null) {
      return {
        checkType: 'DAILY_LIMIT_CHECK',
        verdict: 'PASS',
        reason: 'No amount specified; daily limit not applicable.',
        blockedByPolicy: null,
      };
    }

    const effectiveWindowStart = policy.windowStart
      ? new Date(policy.windowStart)
      : new Date(Date.now() - 86_400_000); // default: last 24h
    const windowExpired = Date.now() - effectiveWindowStart.getTime() > 86_400_000;
    const currentUsage = windowExpired ? 0 : (policy.currentUsageMicroCC ?? 0);
    const projectedUsage = currentUsage + intent.amountMicroCC;

    if (projectedUsage > policy.valueMicroCC) {
      return {
        checkType: 'DAILY_LIMIT_CHECK',
        verdict: 'FAIL',
        reason: `This trade would bring daily usage to ${microCCToDisplay(projectedUsage)} CC, which exceeds your daily limit of ${microCCToDisplay(policy.valueMicroCC)} CC. Current usage: ${microCCToDisplay(currentUsage)} CC.`,
        blockedByPolicy: policy.id,
        details: { dailyLimit: policy.valueMicroCC, currentUsage, requested: intent.amountMicroCC, projectedUsage },
      };
    }

    return {
      checkType: 'DAILY_LIMIT_CHECK',
      verdict: 'PASS',
      reason: `Daily usage after this trade would be ${microCCToDisplay(projectedUsage)} CC, within the ${microCCToDisplay(policy.valueMicroCC)} CC daily limit.`,
      blockedByPolicy: null,
      details: { dailyLimit: policy.valueMicroCC, currentUsage, requested: intent.amountMicroCC, projectedUsage },
    };
  }

  private checkApprovalThreshold(intent: ParsedIntent): RiskCheckResult {
    const policy = this.findPolicy<ApprovalPolicy>('APPROVAL_THRESHOLD');
    const threshold = policy?.valueMicroCC ?? DEFAULT_LIMITS.APPROVAL_THRESHOLD_MICRO_CC;

    if (intent.amountMicroCC === null) {
      return {
        checkType: 'APPROVAL_THRESHOLD_CHECK',
        verdict: 'PASS',
        reason: 'No amount specified; approval threshold not applicable.',
        blockedByPolicy: null,
      };
    }

    if (intent.amountMicroCC > threshold) {
      return {
        checkType: 'APPROVAL_THRESHOLD_CHECK',
        verdict: 'FAIL',
        reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC exceeds the approval threshold of ${microCCToDisplay(threshold)} CC. This trade requires explicit confirmation.`,
        blockedByPolicy: policy?.id ?? null,
        details: { threshold, requested: intent.amountMicroCC },
      };
    }

    return {
      checkType: 'APPROVAL_THRESHOLD_CHECK',
      verdict: 'PASS',
      reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC is at or below the approval threshold of ${microCCToDisplay(threshold)} CC.`,
      blockedByPolicy: null,
      details: { threshold, requested: intent.amountMicroCC },
    };
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private findPolicy<T extends Policy>(type: T['type']): T | undefined {
    return this.policies.find((p): p is T => p.type === type && p.enabled);
  }

  private buildResult(
    intentId: string,
    decision: 'APPROVED' | 'DENIED' | 'REQUIRES_APPROVAL',
    riskChecks: RiskCheckResult[],
    evaluatedAt: string
  ): PolicyEvaluationResult {
    const failedCheck = riskChecks.find(c => c.verdict === 'FAIL');
    const warnings = riskChecks.filter(c => c.verdict === 'WARN').map(c => c.reason);
    const reasons = riskChecks
      .filter(c => c.verdict !== 'SKIP')
      .map(c => c.reason);

    return {
      intentId,
      decision,
      riskChecks,
      blockedBy: failedCheck?.reason ?? null,
      blockedByPolicyId: failedCheck?.blockedByPolicy ?? null,
      reasons,
      warnings,
      evaluatedAt,
    };
  }
}

// Singleton instance
export const policyEngine = new PolicyEngine();

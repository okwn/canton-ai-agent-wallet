// Tool functions the AI agent can call.
// Each tool is a pure function: input → serializable output.
// Tools never execute transactions — they only read data and compute previews.

import type {
  ParsedExecutionIntent,
  PolicyEvaluationResult,
  StrategyOpportunity,
  ConnectedWalletState,
  Policy,
} from '@canton/shared';

// ─── Sanitization helpers ────────────────────────────────────────────────────

const DANGEROUS_CHARS = /[<>'"&;\\]/g;
const MAX_STRING_LEN = 500;

function sanitizeString(s: unknown): string {
  if (typeof s !== 'string') return '';
  return s.replace(DANGEROUS_CHARS, '').slice(0, MAX_STRING_LEN).trim();
}

function sanitizeArrayOfStrings(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(sanitizeString).filter(Boolean);
}

// ─── Tool: get_wallet_snapshot ───────────────────────────────────────────────

export interface GetWalletSnapshotInput {
  address?: string;
}

export interface WalletSnapshotOutput {
  address: string;
  isConnected: boolean;
  isDemo: boolean;
  totalBalanceMicroCC: number;
  balances: Array<{
    asset: string;
    available: number;
    locked: number;
    total: number;
  }>;
  dailyUsageMicroCC: number;
  dailyLimitMicroCC: number;
  lastSyncedAt: string | null;
  canExecuteReal: boolean;
  simulationOnly: boolean;
}

export function getWalletSnapshot(
  _input: GetWalletSnapshotInput,
  wallet: ConnectedWalletState,
  policies: Policy[],
): WalletSnapshotOutput {
  const dailyPolicy = policies.find((p) => p.type === 'MAX_DAILY') as
    | { type: 'MAX_DAILY'; valueMicroCC: number; currentUsageMicroCC: number }
    | undefined;

  const simPolicy = policies.find((p) => p.type === 'SIMULATION_ONLY') as
    | { type: 'SIMULATION_ONLY'; enabled: boolean }
    | undefined;

  const totalBalanceMicroCC = wallet.balances.reduce((sum, b) => sum + b.total, 0);

  return {
    address: sanitizeString(wallet.address),
    isConnected: Boolean(wallet.isConnected),
    isDemo: Boolean(wallet.isDemo),
    totalBalanceMicroCC,
    balances: wallet.balances.map((b) => ({
      asset: sanitizeString(b.asset),
      available: b.available,
      locked: b.locked,
      total: b.total,
    })),
    dailyUsageMicroCC: dailyPolicy?.currentUsageMicroCC ?? 0,
    dailyLimitMicroCC: dailyPolicy?.valueMicroCC ?? 100_000_000,
    lastSyncedAt: wallet.lastSyncedAt ?? null,
    canExecuteReal: wallet.isConnected && !wallet.isDemo,
    simulationOnly: simPolicy?.enabled ?? false,
  };
}

// ─── Tool: list_seeded_opportunities ────────────────────────────────────────

export interface ListOpportunitiesInput {
  limit?: number;
  minAprBps?: number;
  maxRiskLevel?: string;
}

export interface OpportunityOutput {
  id: string;
  provider: string;
  providerName: string;
  strategyName: string;
  assetIn: string;
  assetOut: string;
  aprBps: number;
  aprPercent: number;
  feesBps: number;
  riskLevel: string;
  riskScore: number;
  minAmountMicroCC: number;
  estimatedExecutionCostMicroCC: number;
  slippageToleranceBps: number;
  executionSupport: string;
  isWhitelisted: boolean;
  liquidityMicroCC: number;
  expiry: string | null;
}

export function listSeededOpportunities(
  input: ListOpportunitiesInput,
  opportunities: StrategyOpportunity[],
): OpportunityOutput[] {
  const sanitizedInput: ListOpportunitiesInput = {
    limit: typeof input.limit === 'number' ? Math.min(Math.max(1, input.limit), 20) : 10,
    minAprBps: typeof input.minAprBps === 'number' ? Math.max(0, input.minAprBps) : 0,
    maxRiskLevel: sanitizeString(input.maxRiskLevel),
  };

  const riskOrder = ['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN'];
  const maxRiskIdx = sanitizedInput.maxRiskLevel
    ? riskOrder.indexOf(sanitizedInput.maxRiskLevel.toUpperCase())
    : riskOrder.length;

  return opportunities
    .filter((o) => {
      if (o.aprBps < sanitizedInput.minAprBps!) return false;
      const riskIdx = riskOrder.indexOf(o.riskLevel);
      return riskIdx <= maxRiskIdx;
    })
    .sort((a, b) => b.aprBps - a.aprBps) // best yield first
    .slice(0, sanitizedInput.limit!)
    .map((o) => ({
      id: sanitizeString(o.id),
      provider: sanitizeString(o.provider),
      providerName: sanitizeString(o.providerName),
      strategyName: sanitizeString(o.strategyName),
      assetIn: sanitizeString(o.assetIn),
      assetOut: sanitizeString(o.assetOut),
      aprBps: o.aprBps,
      aprPercent: o.aprBps / 100,
      feesBps: o.feesBps,
      riskLevel: o.riskLevel,
      riskScore: o.riskScore,
      minAmountMicroCC: o.minAmountMicroCC,
      estimatedExecutionCostMicroCC: o.estimatedExecutionCostMicroCC,
      slippageToleranceBps: o.slippageToleranceBps,
      executionSupport: o.executionSupport,
      isWhitelisted: o.isWhitelisted,
      liquidityMicroCC: o.liquidityMicroCC,
      expiry: o.expiresAt ?? null,
    }));
}

// ─── Tool: filter_opportunities ─────────────────────────────────────────────

export interface FilterOpportunitiesInput {
  providers?: string[];
  riskLevels?: string[];
  minAprBps?: number;
  minLiquidityMicroCC?: number;
  executionSupport?: string;
  assetIn?: string;
  assetOut?: string;
  limit?: number;
}

export function filterOpportunities(
  input: FilterOpportunitiesInput,
  opportunities: StrategyOpportunity[],
): OpportunityOutput[] {
  const sanitized: FilterOpportunitiesInput = {
    providers: sanitizeArrayOfStrings(input.providers),
    riskLevels: sanitizeArrayOfStrings(input.riskLevels).map((r) => r.toUpperCase()),
    minAprBps: typeof input.minAprBps === 'number' ? Math.max(0, input.minAprBps) : 0,
    minLiquidityMicroCC:
      typeof input.minLiquidityMicroCC === 'number' ? Math.max(0, input.minLiquidityMicroCC) : 0,
    executionSupport: sanitizeString(input.executionSupport),
    assetIn: sanitizeString(input.assetIn),
    assetOut: sanitizeString(input.assetOut),
    limit: typeof input.limit === 'number' ? Math.min(Math.max(1, input.limit), 20) : 10,
  };

  return opportunities
    .filter((o) => {
      if (sanitized.providers?.length && !sanitized.providers.includes(o.provider)) return false;
      if (sanitized.riskLevels?.length && !sanitized.riskLevels.includes(o.riskLevel)) return false;
      if (o.aprBps < (sanitized.minAprBps ?? 0)) return false;
      if (o.liquidityMicroCC < (sanitized.minLiquidityMicroCC ?? 0)) return false;
      if (sanitized.executionSupport && o.executionSupport !== sanitized.executionSupport) return false;
      if (sanitized.assetIn && o.assetIn !== sanitized.assetIn) return false;
      if (sanitized.assetOut && o.assetOut !== sanitized.assetOut) return false;
      return true;
    })
    .sort((a, b) => b.aprBps - a.aprBps)
    .slice(0, sanitized.limit ?? 10)
    .map((o) => ({
      id: sanitizeString(o.id),
      provider: sanitizeString(o.provider),
      providerName: sanitizeString(o.providerName),
      strategyName: sanitizeString(o.strategyName),
      assetIn: sanitizeString(o.assetIn),
      assetOut: sanitizeString(o.assetOut),
      aprBps: o.aprBps,
      aprPercent: o.aprBps / 100,
      feesBps: o.feesBps,
      riskLevel: o.riskLevel,
      riskScore: o.riskScore,
      minAmountMicroCC: o.minAmountMicroCC,
      estimatedExecutionCostMicroCC: o.estimatedExecutionCostMicroCC,
      slippageToleranceBps: o.slippageToleranceBps,
      executionSupport: o.executionSupport,
      isWhitelisted: o.isWhitelisted,
      liquidityMicroCC: o.liquidityMicroCC,
      expiry: o.expiresAt ?? null,
    }));
}

// ─── Tool: evaluate_policy ────────────────────────────────────────────────────

export interface EvaluatePolicyInput {
  intent: Partial<ParsedExecutionIntent>;
  wallet: ConnectedWalletState;
}

export interface PolicyCheckOutput {
  intentSummary: string;
  decision: PolicyEvaluationResult['decision'];
  blockedBy: string | null;
  riskChecks: Array<{
    checkType: string;
    verdict: string;
    reason: string;
  }>;
  warnings: string[];
  reasons: string[];
}

export function evaluatePolicy(
  input: EvaluatePolicyInput,
  engine: { evaluate(intent: ParsedExecutionIntent, wallet: ConnectedWalletState): PolicyEvaluationResult },
  intent: ParsedExecutionIntent,
  wallet: ConnectedWalletState,
): PolicyCheckOutput {
  const result = engine.evaluate(intent, wallet);

  return {
    intentSummary: buildIntentSummary(intent),
    decision: result.decision,
    blockedBy: result.blockedBy,
    riskChecks: result.riskChecks.map((c) => ({
      checkType: c.checkType,
      verdict: c.verdict,
      reason: c.reason,
    })),
    warnings: result.warnings,
    reasons: result.reasons,
  };
}

// ─── Tool: build_execution_preview ──────────────────────────────────────────

export interface BuildExecutionPreviewInput {
  intent: ParsedExecutionIntent;
  opportunity: OpportunityOutput;
  amountMicroCC: number;
}

export interface ExecutionPreviewOutput {
  estimatedOutputMicroCC: number | null;
  estimatedFeesMicroCC: number;
  netYieldMicroCC: number | null;
  effectiveAprPercent: number | null;
  breakEvenTimeSeconds: number | null;
  isSimulation: boolean;
  slippageBps: number;
  gasEstimateMicroCC: number;
  warnings: string[];
}

export function buildExecutionPreview(
  _input: BuildExecutionPreviewInput,
  simulationOnly: boolean,
): ExecutionPreviewOutput {
  const { opportunity, amountMicroCC } = _input;

  const estimatedOutputMicroCC =
    amountMicroCC > 0 && opportunity.estimatedExecutionCostMicroCC > 0
      ? Math.floor(amountMicroCC * (1 + opportunity.aprBps / 10000 / 365))
      : null;

  const estimatedFeesMicroCC = opportunity.estimatedExecutionCostMicroCC ?? 5000;
  const netYieldMicroCC =
    estimatedOutputMicroCC !== null ? estimatedOutputMicroCC - amountMicroCC - estimatedFeesMicroCC : null;

  const warnings: string[] = [];
  if (opportunity.riskLevel === 'HIGH') warnings.push('This strategy is high risk.');
  if (!opportunity.isWhitelisted) warnings.push('This provider is not on your whitelist.');
  if (opportunity.executionSupport !== 'real') warnings.push('This strategy only supports simulated execution.');

  return {
    estimatedOutputMicroCC,
    estimatedFeesMicroCC,
    netYieldMicroCC,
    effectiveAprPercent:
      estimatedOutputMicroCC !== null
        ? (netYieldMicroCC! / amountMicroCC) * 365 * 100
        : null,
    breakEvenTimeSeconds: null,
    isSimulation: simulationOnly || opportunity.executionSupport !== 'real',
    slippageBps: opportunity.slippageToleranceBps,
    gasEstimateMicroCC: 5000,
    warnings,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildIntentSummary(intent: ParsedExecutionIntent): string {
  const parts: string[] = [intent.action];
  if (intent.amountMicroCC !== null) {
    parts.push(`${(intent.amountMicroCC / 1_000_000).toFixed(2)} CC`);
  }
  if (intent.providerFilter?.length) {
    parts.push(`providers: ${intent.providerFilter.join(', ')}`);
  }
  if (intent.assetFilter?.length) {
    parts.push(`assets: ${intent.assetFilter.join(', ')}`);
  }
  if (intent.simulationOnly) parts.push('simulation-only');
  return parts.join(' | ');
}

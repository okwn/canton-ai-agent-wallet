// Domain models with Zod runtime-safe schemas
import { z } from 'zod';

// ─── Core Identifiers ────────────────────────────────────────────────────────

export const AssetSymbolSchema = z.string().min(1).max(10);
export type AssetSymbol = z.infer<typeof AssetSymbolSchema>;

export const ProviderIdSchema = z.string().min(1).max(50);
export type ProviderId = z.infer<typeof ProviderIdSchema>;

export const StrategyIdSchema = z.string().min(1).max(100);
export type StrategyId = z.infer<typeof StrategyIdSchema>;

export const WalletAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/).or(z.string().startsWith('0xDEMO'));
export type WalletAddress = z.infer<typeof WalletAddressSchema>;

export const MicroCCSchema = z.number().int().min(0);
export type MicroCC = z.infer<typeof MicroCCSchema>;

// ─── User Wallet Profile ─────────────────────────────────────────────────────

export const ExecutionModeSchema = z.enum(['disabled', 'approval_required', 'auto_execute']);
export type ExecutionMode = z.infer<typeof ExecutionModeSchema>;

export const UserWalletProfileSchema = z.object({
  id: z.string().uuid(),
  ownerAddress: WalletAddressSchema,
  displayName: z.string().min(1).max(100),
  executionMode: ExecutionModeSchema,
  simulationOnly: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type UserWalletProfile = z.infer<typeof UserWalletProfileSchema>;

// ─── Connected Wallet State ──────────────────────────────────────────────────

export const ConnectedWalletStateSchema = z.object({
  address: WalletAddressSchema,
  isConnected: z.boolean(),
  isDemo: z.boolean(),
  balances: z.array(z.object({
    asset: AssetSymbolSchema,
    available: MicroCCSchema,
    locked: MicroCCSchema,
    total: MicroCCSchema,
  })),
  lastSyncedAt: z.string().datetime().nullable(),
});
export type ConnectedWalletState = z.infer<typeof ConnectedWalletStateSchema>;

// ─── Asset Balance ───────────────────────────────────────────────────────────

export const AssetBalanceSchema = z.object({
  asset: AssetSymbolSchema,
  available: MicroCCSchema,
  locked: MicroCCSchema,
  total: MicroCCSchema,
  usdEstimate: z.number().optional(),
});
export type AssetBalance = z.infer<typeof AssetBalanceSchema>;

// ─── Strategy Opportunity ────────────────────────────────────────────────────

export const ExecutionSupportSchema = z.enum(['real', 'simulated', 'unsupported']);
export type ExecutionSupport = z.infer<typeof ExecutionSupportSchema>;

export const RiskLevelSchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN']);
export type RiskLevel = z.infer<typeof RiskLevelSchema>;

export const StrategyOpportunitySchema = z.object({
  id: StrategyIdSchema,
  provider: ProviderIdSchema,
  providerName: z.string(),
  strategyName: z.string(),
  assetIn: AssetSymbolSchema,
  assetOut: AssetSymbolSchema,
  aprBps: z.number().int().min(0),       // basis points, e.g. 420 = 4.2%
  feesBps: z.number().int().min(0),       // total fees in basis points
  liquidityMicroCC: MicroCCSchema,
  riskScore: z.number().min(0).max(100),
  riskLevel: RiskLevelSchema,
  minAmountMicroCC: MicroCCSchema,
  estimatedExecutionCostMicroCC: MicroCCSchema,
  slippageToleranceBps: z.number().int().min(0).default(50),
  executionSupport: ExecutionSupportSchema,
  isWhitelisted: z.boolean(),
  addedAt: z.string().datetime(),
  expiresAt: z.string().datetime().nullable(),
});
export type StrategyOpportunity = z.infer<typeof StrategyOpportunitySchema>;

// ─── Strategy Quote ──────────────────────────────────────────────────────────

export const StrategyQuoteSchema = z.object({
  opportunityId: StrategyIdSchema,
  provider: ProviderIdSchema,
  assetIn: AssetSymbolSchema,
  assetOut: AssetSymbolSchema,
  amountInMicroCC: MicroCCSchema,
  estimatedOutputMicroCC: MicroCCSchema,
  estimatedAprBps: z.number().int(),
  estimatedFeesMicroCC: MicroCCSchema,
  estimatedSlippageBps: z.number().int(),
  estimatedExecutionCostMicroCC: MicroCCSchema,
  netYieldBps: z.number().int(),
  validUntil: z.string().datetime(),
});
export type StrategyQuote = z.infer<typeof StrategyQuoteSchema>;

// ─── Natural Language Intent ─────────────────────────────────────────────────

export const IntentActionSchema = z.enum([
  'FIND_YIELD',
  'EXECUTE_STRATEGY',
  'CHECK_BALANCE',
  'SET_POLICY',
  'ADD_STRATEGY',
  'REMOVE_STRATEGY',
  'VIEW_OPPORTUNITIES',
  'UNKNOWN',
]);
export type IntentAction = z.infer<typeof IntentActionSchema>;

export const NaturalLanguageIntentSchema = z.object({
  rawText: z.string().min(0).max(500),
  confidence: z.number().min(0).max(1),
  parsedAt: z.string().datetime(),
});
export type NaturalLanguageIntent = z.infer<typeof NaturalLanguageIntentSchema>;

// ─── Parsed Execution Intent ─────────────────────────────────────────────────

export const ParsedExecutionIntentSchema = z.object({
  id: z.string().uuid(),
  action: IntentActionSchema,
  naturalLanguage: NaturalLanguageIntentSchema,
  amountMicroCC: MicroCCSchema.nullable(),
  minAmountMicroCC: MicroCCSchema.nullable(),
  maxSlippageBps: z.number().int().nullable(),
  strategyFilter: z.array(StrategyIdSchema).optional(),
  providerFilter: z.array(ProviderIdSchema).optional(),
  assetFilter: z.array(AssetSymbolSchema).optional(),
  requireApproval: z.boolean(),
  simulationOnly: z.boolean(),
  parsedErrors: z.array(z.string()).default([]),
});
export type ParsedExecutionIntent = z.infer<typeof ParsedExecutionIntentSchema>;

// ─── Policy ─────────────────────────────────────────────────────────────────

export const PolicyTypeSchema = z.enum([
  'MAX_PER_TRADE',
  'MAX_DAILY',
  'APPROVAL_THRESHOLD',
  'STRATEGY_ALLOWLIST',
  'STRATEGY_DENYLIST',
  'ASSET_ALLOWLIST',
  'MAX_SLIPPAGE',
  'EXECUTION_MODE',
  'SIMULATION_ONLY',
]);
export type PolicyType = z.infer<typeof PolicyTypeSchema>;

export const BudgetPolicySchema = z.object({
  id: z.string().uuid(),
  type: z.literal('MAX_PER_TRADE'),
  valueMicroCC: MicroCCSchema,
  enabled: z.boolean(),
  priority: z.number().int().default(1),
});
export type BudgetPolicy = z.infer<typeof BudgetPolicySchema>;

export const ExecutionPolicySchema = z.object({
  id: z.string().uuid(),
  type: z.literal('MAX_DAILY'),
  valueMicroCC: MicroCCSchema,
  enabled: z.boolean(),
  priority: z.number().int().default(2),
  currentUsageMicroCC: MicroCCSchema.default(0),
  windowStart: z.string().datetime().nullable(),
});
export type ExecutionPolicy = z.infer<typeof ExecutionPolicySchema>;

export const ApprovalPolicySchema = z.object({
  id: z.string().uuid(),
  type: z.literal('APPROVAL_THRESHOLD'),
  valueMicroCC: MicroCCSchema,
  enabled: z.boolean(),
  priority: z.number().int().default(3),
});
export type ApprovalPolicy = z.infer<typeof ApprovalPolicySchema>;

export const ProviderListPolicySchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['STRATEGY_ALLOWLIST', 'STRATEGY_DENYLIST']),
  providerIds: z.array(ProviderIdSchema),
  enabled: z.boolean(),
  priority: z.number().int().default(4),
});
export type ProviderListPolicy = z.infer<typeof ProviderListPolicySchema>;

export const AssetAllowlistPolicySchema = z.object({
  id: z.string().uuid(),
  type: z.literal('ASSET_ALLOWLIST'),
  assetSymbols: z.array(AssetSymbolSchema),
  enabled: z.boolean(),
  priority: z.number().int().default(5),
});
export type AssetAllowlistPolicy = z.infer<typeof AssetAllowlistPolicySchema>;

export const MaxSlippagePolicySchema = z.object({
  id: z.string().uuid(),
  type: z.literal('MAX_SLIPPAGE'),
  valueBps: z.number().int().min(1),
  enabled: z.boolean(),
  priority: z.number().int().default(6),
});
export type MaxSlippagePolicy = z.infer<typeof MaxSlippagePolicySchema>;

export const SimulationOnlyPolicySchema = z.object({
  id: z.string().uuid(),
  type: z.literal('SIMULATION_ONLY'),
  enabled: z.boolean(),
  priority: z.number().int().default(7),
});
export type SimulationOnlyPolicy = z.infer<typeof SimulationOnlyPolicySchema>;

export const ExecutionModePolicySchema = z.object({
  id: z.string().uuid(),
  type: z.literal('EXECUTION_MODE'),
  value: ExecutionModeSchema,
  enabled: z.boolean(),
  priority: z.number().int().default(0),
});
export type ExecutionModePolicy = z.infer<typeof ExecutionModePolicySchema>;

export const PolicySchema = z.discriminatedUnion('type', [
  BudgetPolicySchema,
  ExecutionPolicySchema,
  ApprovalPolicySchema,
  ProviderListPolicySchema,
  AssetAllowlistPolicySchema,
  MaxSlippagePolicySchema,
  SimulationOnlyPolicySchema,
  ExecutionModePolicySchema,
]);
export type Policy = z.infer<typeof PolicySchema>;

// ─── Execution Plan ──────────────────────────────────────────────────────────

export const ExecutionActionSchema = z.enum([
  'YIELD_FIND',
  'YIELD_EXECUTE',
  'BALANCE_CHECK',
  'POLICY_SET',
  'STRATEGY_ADD',
  'STRATEGY_REMOVE',
  'OPPORTUNITIES_LIST',
]);
export type ExecutionAction = z.infer<typeof ExecutionActionSchema>;

export const StepSchema = z.object({
  stepId: z.string().uuid(),
  action: ExecutionActionSchema,
  description: z.string(),
  opportunityId: StrategyIdSchema.nullable(),
  amountInMicroCC: MicroCCSchema.nullable(),
  estimatedOutputMicroCC: MicroCCSchema.nullable(),
  estimatedFeesMicroCC: MicroCCSchema.nullable(),
  isSimulation: z.boolean(),
  skipped: z.boolean().default(false),
  skipReason: z.string().nullable(),
});
export type Step = z.infer<typeof StepSchema>;

export const ExecutionPlanSchema = z.object({
  id: z.string().uuid(),
  intentId: z.string().uuid(),
  steps: z.array(StepSchema),
  totalEstimatedFeesMicroCC: MicroCCSchema,
  totalEstimatedOutputMicroCC: MicroCCSchema.nullable(),
  estimatedDurationMs: z.number().int(),
  createdAt: z.string().datetime(),
});
export type ExecutionPlan = z.infer<typeof ExecutionPlanSchema>;

// ─── Execution Attempt ──────────────────────────────────────────────────────

export const AttemptStatusSchema = z.enum([
  'PENDING',
  'RUNNING',
  'APPROVED',
  'REJECTED',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
]);
export type AttemptStatus = z.infer<typeof AttemptStatusSchema>;

export const ExecutionAttemptSchema = z.object({
  id: z.string().uuid(),
  intentId: z.string().uuid(),
  planId: z.string().uuid().nullable(),
  status: AttemptStatusSchema,
  stepsCompleted: z.number().int().default(0),
  stepsTotal: z.number().int(),
  currentStepId: z.string().uuid().nullable(),
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  error: z.string().nullable(),
});
export type ExecutionAttempt = z.infer<typeof ExecutionAttemptSchema>;

// ─── Execution Receipt ───────────────────────────────────────────────────────

export const ReceiptStatusSchema = z.enum(['SUCCESS', 'PARTIAL', 'FAILED', 'SIMULATED', 'BLOCKED']);
export type ReceiptStatus = z.infer<typeof ReceiptStatusSchema>;

export const StepResultSchema = z.object({
  stepId: z.string().uuid(),
  status: ReceiptStatusSchema,
  outputMicroCC: MicroCCSchema.nullable(),
  feesPaidMicroCC: MicroCCSchema.nullable(),
  slippageBps: z.number().int().nullable(),
  txHash: z.string().nullable(),
  simulatedTxHash: z.string().nullable(),
  error: z.string().nullable(),
  executedAt: z.string().datetime().nullable(),
});
export type StepResult = z.infer<typeof StepResultSchema>;

export const ExecutionReceiptSchema = z.object({
  id: z.string().uuid(),
  attemptId: z.string().uuid(),
  intentId: z.string().uuid(),
  status: ReceiptStatusSchema,
  stepResults: z.array(StepResultSchema),
  totalOutputMicroCC: MicroCCSchema.nullable(),
  totalFeesPaidMicroCC: MicroCCSchema.nullable(),
  policyDecision: z.enum(['APPROVED', 'DENIED', 'REQUIRES_APPROVAL']),
  policyReasons: z.array(z.string()),
  blockedByPolicy: z.string().nullable(),
  simulationOnly: z.boolean(),
  executedAt: z.string().datetime(),
  durationMs: z.number().int(),
});
export type ExecutionReceipt = z.infer<typeof ExecutionReceiptSchema>;

// ─── Risk Check Result ───────────────────────────────────────────────────────

export const RiskCheckTypeSchema = z.enum([
  'BALANCE_CHECK',
  'BUDGET_CAP_CHECK',
  'DAILY_LIMIT_CHECK',
  'APPROVAL_THRESHOLD_CHECK',
  'ALLOWLIST_CHECK',
  'DENYLIST_CHECK',
  'ASSET_ALLOWLIST_CHECK',
  'SLIPPAGE_CHECK',
  'SIMULATION_MODE_CHECK',
  'EXECUTION_MODE_CHECK',
  'VALIDITY_CHECK',
]);
export type RiskCheckType = z.infer<typeof RiskCheckTypeSchema>;

export const RiskVerdictSchema = z.enum(['PASS', 'FAIL', 'WARN', 'SKIP']);
export type RiskVerdict = z.infer<typeof RiskVerdictSchema>;

export const RiskCheckResultSchema = z.object({
  checkType: RiskCheckTypeSchema,
  verdict: RiskVerdictSchema,
  reason: z.string(),
  details: z.record(z.string(), z.unknown()).optional(),
  blockedByPolicy: z.string().nullable(),
});
export type RiskCheckResult = z.infer<typeof RiskCheckResultSchema>;

// ─── Audit Event ─────────────────────────────────────────────────────────────

export const AuditEventTypeSchema = z.enum([
  'INTENT_PARSED',
  'POLICY_EVALUATED',
  'RISK_CHECK_COMPLETED',
  'EXECUTION_PLAN_CREATED',
  'EXECUTION_APPROVED',
  'EXECUTION_REJECTED',
  'EXECUTION_STARTED',
  'EXECUTION_COMPLETED',
  'EXECUTION_FAILED',
  'EXECUTION_CANCELLED',
  'POLICY_UPDATED',
  'WALLET_CONNECTED',
  'WALLET_DISCONNECTED',
  'AGENT_PLAN_GENERATED',
  'AGENT_EXPLAIN_GENERATED',
  'AGENT_REJECTED',
]);
export type AuditEventType = z.infer<typeof AuditEventTypeSchema>;

export const AuditEventSchema = z.object({
  id: z.string().uuid(),
  eventType: AuditEventTypeSchema,
  walletAddress: WalletAddressSchema.nullable(),
  intentId: z.string().uuid().nullable(),
  attemptId: z.string().uuid().nullable(),
  policyId: z.string().uuid().nullable(),
  payload: z.record(z.string(), z.unknown()),
  simulated: z.boolean(),
  createdAt: z.string().datetime(),
});
export type AuditEvent = z.infer<typeof AuditEventSchema>;

// ─── Policy Evaluation Result ────────────────────────────────────────────────

export const PolicyEvaluationResultSchema = z.object({
  intentId: z.string().uuid(),
  decision: z.enum(['APPROVED', 'DENIED', 'REQUIRES_APPROVAL']),
  riskChecks: z.array(RiskCheckResultSchema),
  blockedBy: z.string().nullable(),
  blockedByPolicyId: z.string().uuid().nullable(),
  reasons: z.array(z.string()),
  warnings: z.array(z.string()).default([]),
  evaluatedAt: z.string().datetime(),
});
export type PolicyEvaluationResult = z.infer<typeof PolicyEvaluationResultSchema>;

// ─── Composite Exports ───────────────────────────────────────────────────────

export const DomainModels = {
  AssetSymbolSchema,
  ProviderIdSchema,
  StrategyIdSchema,
  WalletAddressSchema,
  MicroCCSchema,
  ExecutionModeSchema,
  UserWalletProfileSchema,
  ConnectedWalletStateSchema,
  AssetBalanceSchema,
  ExecutionSupportSchema,
  RiskLevelSchema,
  StrategyOpportunitySchema,
  StrategyQuoteSchema,
  IntentActionSchema,
  NaturalLanguageIntentSchema,
  ParsedExecutionIntentSchema,
  PolicyTypeSchema,
  BudgetPolicySchema,
  ExecutionPolicySchema,
  ApprovalPolicySchema,
  ProviderListPolicySchema,
  AssetAllowlistPolicySchema,
  MaxSlippagePolicySchema,
  SimulationOnlyPolicySchema,
  ExecutionModePolicySchema,
  PolicySchema,
  ExecutionActionSchema,
  StepSchema,
  ExecutionPlanSchema,
  AttemptStatusSchema,
  ExecutionAttemptSchema,
  ReceiptStatusSchema,
  StepResultSchema,
  ExecutionReceiptSchema,
  RiskCheckTypeSchema,
  RiskVerdictSchema,
  RiskCheckResultSchema,
  AuditEventTypeSchema,
  AuditEventSchema,
  PolicyEvaluationResultSchema,
};

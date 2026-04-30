// Execution adapter interface and support level types.
// All adapters are read-only safe — they never perform real on-chain transactions
// without verifying prerequisites.

import { z } from 'zod';
import type { ParsedExecutionIntent, StrategyOpportunity, ConnectedWalletState } from '@canton/shared';

// ─── Support level ─────────────────────────────────────────────────────────

export const SupportLevelSchema = z.enum(['REAL', 'SIMULATED', 'UNSUPPORTED']);
export type SupportLevel = z.infer<typeof SupportLevelSchema>;

export const ExecutionStatusSchema = z.enum([
  'PREPARED',
  'EXECUTED',
  'SIMULATED',
  'BLOCKED',
  'UNSUPPORTED',
  'FAILED',
]);
export type ExecutionStatus = z.infer<typeof ExecutionStatusSchema>;

// ─── Prepared execution ─────────────────────────────────────────────────────

export const PreparedExecutionSchema = z.object({
  id: z.string(),
  intentId: z.string(),
  opportunityId: z.string(),
  adapterType: z.string(),
  supportLevel: SupportLevelSchema,
  status: ExecutionStatusSchema,
  preparedAt: z.string(),
  estimatedOutputMicroCC: z.number().nullable(),
  estimatedFeesMicroCC: z.number(),
  gasEstimateMicroCC: z.number(),
  executionPayload: z.record(z.string(), z.unknown()).nullable(),
  reason: z.string(), // why this adapter was selected / why not supported
});

export type PreparedExecution = z.infer<typeof PreparedExecutionSchema>;

// ─── Execution result ───────────────────────────────────────────────────────

export const ExecutionResultSchema = z.object({
  id: z.string(),
  preparedExecutionId: z.string(),
  status: ExecutionStatusSchema,
  outputMicroCC: z.number().nullable(),
  feesPaidMicroCC: z.number().nullable(),
  txHash: z.string().nullable(),
  simulatedTxHash: z.string().nullable(),
  errorMessage: z.string().nullable(),
  executedAt: z.string(),
  durationMs: z.number(),
  supportLevel: SupportLevelSchema,
  explanation: z.string(), // human-readable explanation of what happened
});

export type ExecutionResult = z.infer<typeof ExecutionResultSchema>;

// ─── Adapter interface ───────────────────────────────────────────────────────

export interface ExecutionAdapter {
  readonly name: string;
  readonly supportLevel: SupportLevel;
  readonly supportedActions: string[];
  readonly supportedProviders: string[];

  /**
   * Check if this adapter supports the given opportunity + wallet combination.
   * Returns a reason string explaining why it is or isn't supported.
   */
  supports(opportunity: StrategyOpportunity, wallet: ConnectedWalletState): {
    supported: boolean;
    reason: string;
  };

  /**
   * Prepare an execution payload for the given intent + opportunity.
   * Does NOT execute — only prepares and returns a PreparedExecution.
   */
  prepareExecution(
    intent: ParsedExecutionIntent,
    opportunity: StrategyOpportunity,
    wallet: ConnectedWalletState,
  ): PreparedExecution;

  /**
   * Estimate the cost (gas/fees) of executing the prepared payload.
   */
  estimateExecutionCost(prepared: PreparedExecution): {
    costMicroCC: number;
    explanation: string;
  };

  /**
   * Execute the prepared payload.
   * Always returns an ExecutionResult — never throws.
   */
  execute(prepared: PreparedExecution): Promise<ExecutionResult>;
}

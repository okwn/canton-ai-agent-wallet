// Core domain types for Canton Agent Wallet

import type {
  ParsedExecutionIntent,
  IntentAction,
  Policy,
  ConnectedWalletState,
  PolicyEvaluationResult,
  RiskCheckResult,
} from '@canton/shared';

// Re-export shared types for agent-core scope
export type {
  ParsedExecutionIntent,
  IntentAction,
  Policy,
  ConnectedWalletState,
  PolicyEvaluationResult,
  RiskCheckResult,
};

// Intent Parser result
export interface IntentParserResult {
  intent: ParsedExecutionIntent;
  parseErrors: string[];
}

// Policy Engine context
export interface PolicyCheckContext {
  intent: ParsedExecutionIntent;
  policies: Policy[];
}

// Adapter interface
export interface IAdapter<TInput, TOutput> {
  name: string;
  isLive: boolean;
  execute(input: TInput): Promise<TOutput>;
  healthCheck(): Promise<boolean>;
}

// Execution Engine context
export interface ExecutionContext {
  intent: ParsedExecutionIntent;
  adapterName: string;
  isSimulated: boolean;
  startedAt: string;
}

// Audit Log entry
export interface AuditEntry {
  id: string;
  intent: ParsedExecutionIntent;
  decision: 'APPROVED' | 'DENIED' | 'REQUIRES_APPROVAL';
  reason: string;
  adapterName: string;
  isSimulated: boolean;
  result?: unknown;
  timestamp: string;
}

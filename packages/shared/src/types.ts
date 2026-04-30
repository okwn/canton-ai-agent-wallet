// Shared types across Canton Agent Wallet

export type IntentAction =
  | 'FIND_BEST_YIELD'
  | 'BUY_ASSET'
  | 'CHECK_BALANCE'
  | 'LIST_STRATEGIES'
  | 'ADD_STRATEGY'
  | 'SET_POLICY'
  | 'UNKNOWN';

export interface Intent {
  action: IntentAction;
  rawText: string;
  confidence: number;
  maxAmount: number | null; // micro-CC
  minAmount: number | null;
  strategyFilter?: string;
  requireApproval: boolean;
}

export type PolicyDecision = 'APPROVED' | 'DENIED' | 'REQUIRES_APPROVAL';

export interface PolicyRule {
  id: string;
  type: 'MAX_PER_TRADE' | 'MAX_DAILY' | 'APPROVAL_THRESHOLD' | 'STRATEGY_WHITELIST';
  name: string;
  value: string;
  enabled: boolean;
}

export interface Policy {
  rules: PolicyRule[];
  version: number;
  updatedAt: string;
}

export interface PolicyDecisionResult {
  decision: PolicyDecision;
  reason: string;
  blockedRule?: string;
}

export interface YieldOpportunity {
  id: string;
  protocol: string;
  apy: number; // basis points
  tvl: number; // micro-CC
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  token: string;
  expiry?: string;
}

export interface ExecutionReceipt {
  id: string;
  intent: Intent;
  decision: PolicyDecisionResult;
  adapterName: string;
  isSimulated: boolean;
  result: unknown;
  timestamp: string;
}

export interface Strategy {
  id: string;
  name: string;
  protocol: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  addedAt: string;
}

export interface SwapParams {
  amount: number; // micro-CC
  targetProtocol: string;
  slippageBps: number;
}

export type CapabilityStatus = 'REAL' | 'SIMULATED' | 'DISABLED';

export interface SystemCapabilities {
  intentParser: CapabilityStatus;
  policyEngine: CapabilityStatus;
  marketData: CapabilityStatus;
  walletExecution: CapabilityStatus;
  damlIntegration: CapabilityStatus;
}

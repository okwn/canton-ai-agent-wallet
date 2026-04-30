// Loop SDK wallet types — all interface-level, no SDK import here

export type LoopConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'rejected'    // user dismissed / denied
  | 'error';      // unexpected failure

export interface LoopTokenBalance {
  asset: string;         // e.g. "CC"
  symbol: string;
  decimals: number;
  rawAmount: string;     // bigint as string (micro units)
  displayAmount: string; // human-readable
}

export interface LoopActiveContract {
  contractId: string;
  templateId: string;
  templateName: string;
  party: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface LoopGasEstimate {
  estimatedFeeMicroCC: number;
  currency: string;
  valid: boolean;
  reason?: string;        // if not valid
}

export interface LoopWalletState {
  status: LoopConnectionStatus;
  address: string | null;
  networkId: string | null;
  balances: LoopTokenBalance[];
  activeContracts: LoopActiveContract[];
  gasEstimate: LoopGasEstimate | null;
  lastSyncedAt: string | null;
  errorMessage: string | null;
  // Capability flags — set by the client based on actual SDK support
  capabilities: {
    canSign: boolean;
    canExecuteReal: boolean;
    canReadContracts: boolean;
    serverSigningActive: boolean;
  };
}

export const INITIAL_WALLET_STATE: LoopWalletState = {
  status: 'disconnected',
  address: null,
  networkId: null,
  balances: [],
  activeContracts: [],
  gasEstimate: null,
  lastSyncedAt: null,
  errorMessage: null,
  capabilities: {
    canSign: false,
    canExecuteReal: false,
    canReadContracts: false,
    serverSigningActive: false,
  },
};

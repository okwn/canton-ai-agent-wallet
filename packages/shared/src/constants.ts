// Shared constants

export const CURRENCY = {
  SYMBOL: 'CC',
  NAME: 'Canton Coin',
  DECIMALS: 6, // micro-CC: 1 CC = 1_000_000 micro-CC
} as const;

export const DEFAULT_LIMITS = {
  MAX_PER_TRADE_MICRO_CC: 20_000_000,    // 20 CC
  APPROVAL_THRESHOLD_MICRO_CC: 10_000_000, // 10 CC
  MAX_DAILY_MICRO_CC: 100_000_000,        // 100 CC
  DEFAULT_SLIPPAGE_BPS: 50,               // 0.5%
  MAX_SLIPPAGE_BPS: 500,                  // 5%
  MIN_APPROVAL_THRESHOLD_MICRO_CC: 1_000_000, // 1 CC
} as const;

export const EXECUTION_MODE_LABELS: Record<string, string> = {
  disabled: 'Disabled — no execution allowed',
  approval_required: 'Approval Required — confirm each trade',
  auto_execute: 'Auto Execute — run without confirmation',
};

export const RISK_LABELS: Record<string, string> = {
  LOW: 'Low Risk',
  MEDIUM: 'Medium Risk',
  HIGH: 'High Risk',
  UNKNOWN: 'Unknown Risk',
};

export const SUPPORT_LABELS: Record<string, string> = {
  real: 'Live Execution',
  simulated: 'Simulation Only',
  unsupported: 'Not Supported',
};

export const PROVIDER_DISPLAY_NAMES: Record<string, string> = {
  'froburn': 'Froburn Protocol',
  'lace': 'Lace Finance',
  'cantonswap': 'CantonSwap',
  'fro-demo': 'Froburn (Demo)',
};

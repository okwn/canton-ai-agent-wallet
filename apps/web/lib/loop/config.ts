// Loop SDK configuration — all values from env, no secrets exposed
export const LOOP_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_LOOP_ENABLED === 'true',
  network: (process.env.NEXT_PUBLIC_LOOP_NETWORK ?? 'testnet') as 'testnet' | 'mainnet' | 'local',
  openMode: (process.env.NEXT_PUBLIC_LOOP_OPEN_MODE ?? 'popup') as 'popup' | 'tab' | 'overlay',
  requestSigningMode: (process.env.NEXT_PUBLIC_LOOP_REQUEST_SIGNING_MODE ?? 'browser') as 'browser' | 'server',
  serverSigningEnabled: process.env.LOOP_SERVER_SIGNING_ENABLED === 'true' && !!process.env.LOOP_SERVER_SIGNING_URL,
} as const;

export type LoopOpenMode = typeof LOOP_CONFIG.openMode;
export type LoopNetwork = typeof LOOP_CONFIG.network;
export type LoopSigningMode = typeof LOOP_CONFIG.requestSigningMode;

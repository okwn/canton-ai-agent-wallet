// Server-side signing adapter (EXPERIMENTAL — disabled by default)
// Set LOOP_SERVER_SIGNING_ENABLED=true and LOOP_SERVER_SIGNING_URL to enable.
// The private key is never loaded client-side; this adapter calls a server route.

import { LOOP_CONFIG } from '../config';

export interface SigningRequest {
  payload: string;         // hex-encoded transaction bytes
  walletAddress: string;
  intentId: string;
}

export interface SigningResponse {
  signature: string;       // hex-encoded signature
  signedPayload: string;   // hex-encoded signed tx
  signerAddress: string;
  timestamp: string;
}

export interface ServerSigningAdapter {
  isEnabled: boolean;
  sign(req: SigningRequest): Promise<SigningResponse>;
}

// Disabled stub — used when server signing is not configured
const disabledAdapter: ServerSigningAdapter = {
  isEnabled: false,
  sign: async () => {
    throw new Error(
      'Server-side signing is not enabled. ' +
      'Set LOOP_SERVER_SIGNING_ENABLED=true and LOOP_SERVER_SIGNING_URL in your .env.local to enable.'
    );
  },
};

// Live adapter — calls /api/loop/sign route which reads the private key server-side
function createLiveAdapter(signingUrl: string): ServerSigningAdapter {
  return {
    isEnabled: true,
    async sign(req: SigningRequest): Promise<SigningResponse> {
      const res = await fetch(signingUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => 'unknown error');
        throw new Error(`Server signing failed (${res.status}): ${text}`);
      }

      return res.json() as Promise<SigningResponse>;
    },
  };
}

export function getServerSigningAdapter(): ServerSigningAdapter {
  if (!LOOP_CONFIG.serverSigningEnabled) {
    return disabledAdapter;
  }

  const url = process.env.LOOP_SERVER_SIGNING_URL;
  if (!url) {
    console.warn('[loop/server-signing] LOOP_SERVER_SIGNING_ENABLED=true but LOOP_SERVER_SIGNING_URL is missing — falling back to disabled');
    return disabledAdapter;
  }

  return createLiveAdapter(url);
}

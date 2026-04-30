'use client';

import { useEffect, useState, useCallback } from 'react';
import { loopClient } from '@/lib/loop/client';
import type { LoopWalletState } from '@/lib/loop/types';
import { INITIAL_WALLET_STATE } from '@/lib/loop/types';

export interface UseWalletReturn {
  state: LoopWalletState;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  reload: () => Promise<void>;
  isConnecting: boolean;
  isConnected: boolean;
  isDemoWallet: boolean;
}

export function useWallet(): UseWalletReturn {
  const [state, setState] = useState<LoopWalletState>(INITIAL_WALLET_STATE);

  useEffect(() => {
    // Subscribe to client state — immediately emits current state
    const unsub = loopClient.subscribe(setState);
    return unsub;
  }, []);

  const connect = useCallback(async () => {
    await loopClient.connect();
  }, []);

  const disconnect = useCallback(async () => {
    await loopClient.disconnect();
  }, []);

  const reload = useCallback(async () => {
    await loopClient.reload();
  }, []);

  return {
    state,
    connect,
    disconnect,
    reload,
    isConnecting: state.status === 'connecting',
    isConnected: state.status === 'connected',
    isDemoWallet: state.status === 'connected' && !state.capabilities.canExecuteReal,
  };
}

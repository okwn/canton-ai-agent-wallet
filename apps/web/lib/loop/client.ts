// Loop SDK client wrapper
// When LOOP_CONFIG.enabled=false (default), all methods gracefully no-op
// and return demo data. When enabled, the SDK window.loop object is accessed.

import { LOOP_CONFIG } from './config';
import type {
  LoopConnectionStatus,
  LoopWalletState,
  LoopTokenBalance,
  LoopActiveContract,
  LoopGasEstimate,
} from './types';
import { INITIAL_WALLET_STATE } from './types';

// ─── SDK shape (loosely typed — SDK is injected by browser extension) ──────

interface LoopSDK {
  connect(options?: { network?: string; mode?: string }): Promise<{ address: string; networkId: string }>;
  disconnect(): Promise<void>;
  getBalances(address: string): Promise<Array<{ asset: string; symbol: string; decimals: number; amount: string }>>;
  getActiveContracts(address: string): Promise<Array<{ contractId: string; templateId: string; templateName: string; party: string; payload: Record<string, unknown>; createdAt: string }>>;
  estimateGas(params: { from: string; operation: string }): Promise<{ fee: string; currency: string }>;
  on(event: string, handler: (...args: unknown[]) => void): void;
  off(event: string, handler: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    loop?: LoopSDK;
  }
}

// ─── State change callback ─────────────────────────────────────────────────

type StateListener = (state: LoopWalletState) => void;

// ─── Client ───────────────────────────────────────────────────────────────

class LoopClient {
  private _state: LoopWalletState = { ...INITIAL_WALLET_STATE };
  private _listeners: Set<StateListener> = new Set();
  private _accountChangedHandler = (...args: unknown[]) => this._onAccountChanged(args[0] as string);
  private _networkChangedHandler = (...args: unknown[]) => this._onNetworkChanged(args[0] as string);
  private _disconnectedHandler = (..._args: unknown[]) => this._onDisconnected();

  // ── Subscribe ──────────────────────────────────────────────────────────

  subscribe(listener: StateListener): () => void {
    this._listeners.add(listener);
    // Immediately emit current state
    listener(this._state);
    return () => this._listeners.delete(listener);
  }

  getState(): LoopWalletState {
    return this._state;
  }

  // ── Connect ────────────────────────────────────────────────────────────

  async connect(): Promise<void> {
    if (!LOOP_CONFIG.enabled) {
      // Demo mode — simulate a successful connect with fake data
      await this._simulateDemoConnect();
      return;
    }

    const sdk = this._getSDK();
    if (!sdk) {
      this._setState({
        status: 'error',
        errorMessage: 'Loop wallet extension not detected. Please install the Loop browser extension.',
      });
      return;
    }

    this._setState({ status: 'connecting', errorMessage: null });

    try {
      const { address, networkId } = await sdk.connect({
        network: LOOP_CONFIG.network,
        mode: LOOP_CONFIG.openMode,
      });

      // Wire up event listeners
      sdk.on('accountChanged', this._accountChangedHandler);
      sdk.on('networkChanged', this._networkChangedHandler);
      sdk.on('disconnected', this._disconnectedHandler);

      await this._loadWalletData(address, networkId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isUserRejection =
        msg.toLowerCase().includes('user rejected') ||
        msg.toLowerCase().includes('user denied') ||
        msg.toLowerCase().includes('cancelled');

      this._setState({
        status: isUserRejection ? 'rejected' : 'error',
        errorMessage: isUserRejection
          ? 'Connection cancelled by user.'
          : `Connection failed: ${msg}`,
      });
    }
  }

  // ── Disconnect ─────────────────────────────────────────────────────────

  async disconnect(): Promise<void> {
    if (LOOP_CONFIG.enabled) {
      const sdk = this._getSDK();
      if (sdk) {
        sdk.off('accountChanged', this._accountChangedHandler);
        sdk.off('networkChanged', this._networkChangedHandler);
        sdk.off('disconnected', this._disconnectedHandler);
        try { await sdk.disconnect(); } catch { /* ignore */ }
      }
    }
    this._setState({ ...INITIAL_WALLET_STATE });
  }

  // ── Reload data (after account/network change) ─────────────────────────

  async reload(): Promise<void> {
    if (this._state.address && this._state.status === 'connected') {
      await this._loadWalletData(this._state.address, this._state.networkId ?? '');
    }
  }

  // ── Private helpers ────────────────────────────────────────────────────

  private _getSDK(): LoopSDK | null {
    if (typeof window === 'undefined') return null;
    return window.loop ?? null;
  }

  private _setState(partial: Partial<LoopWalletState>): void {
    this._state = { ...this._state, ...partial };
    this._listeners.forEach((l) => l(this._state));
  }

  private async _loadWalletData(address: string, networkId: string): Promise<void> {
    const sdk = this._getSDK();
    if (!sdk) return;

    try {
      const [rawBalances, rawContracts] = await Promise.all([
        sdk.getBalances(address),
        sdk.getActiveContracts(address).catch(() => [] as LoopActiveContract[]),
      ]);

      const balances: LoopTokenBalance[] = rawBalances.map((b) => ({
        asset: b.asset,
        symbol: b.symbol,
        decimals: b.decimals,
        rawAmount: b.amount,
        displayAmount: (parseInt(b.amount, 10) / Math.pow(10, b.decimals)).toFixed(b.decimals > 2 ? 2 : b.decimals),
      }));

      const activeContracts: LoopActiveContract[] = rawContracts.map((c) => ({
        contractId: c.contractId,
        templateId: c.templateId,
        templateName: c.templateName,
        party: c.party,
        payload: c.payload,
        createdAt: c.createdAt,
      }));

      const gasEstimate = await this._fetchGasEstimate(sdk, address);

      this._setState({
        status: 'connected',
        address,
        networkId,
        balances,
        activeContracts,
        gasEstimate,
        lastSyncedAt: new Date().toISOString(),
        errorMessage: null,
        capabilities: {
          canSign: LOOP_CONFIG.requestSigningMode === 'browser',
          canExecuteReal: true,
          canReadContracts: true,
          serverSigningActive: LOOP_CONFIG.serverSigningEnabled,
        },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this._setState({
        status: 'error',
        errorMessage: `Failed to load wallet data: ${msg}`,
      });
    }
  }

  private async _fetchGasEstimate(sdk: LoopSDK, address: string): Promise<LoopGasEstimate> {
    try {
      const raw = await sdk.estimateGas({ from: address, operation: 'transfer' });
      return {
        estimatedFeeMicroCC: parseInt(raw.fee, 10),
        currency: raw.currency,
        valid: true,
      };
    } catch {
      return {
        estimatedFeeMicroCC: 5000,
        currency: 'CC',
        valid: false,
        reason: 'Gas estimate unavailable',
      };
    }
  }

  private async _simulateDemoConnect(): Promise<void> {
    this._setState({ status: 'connecting', errorMessage: null });

    // Realistic async delay (simulates wallet popup)
    await new Promise((r) => setTimeout(r, 800));

    this._setState({
      status: 'connected',
      address: process.env.NEXT_PUBLIC_DEMO_WALLET_ADDRESS ?? '0xDEMO0000000000000000000000000000000',
      networkId: `${LOOP_CONFIG.network}-demo`,
      balances: [
        {
          asset: 'CC',
          symbol: 'CC',
          decimals: 6,
          rawAmount: String((parseInt(process.env.NEXT_PUBLIC_DEMO_BALANCE_CC ?? '500', 10)) * 1_000_000),
          displayAmount: process.env.NEXT_PUBLIC_DEMO_BALANCE_CC ?? '500',
        },
      ],
      activeContracts: [],
      gasEstimate: {
        estimatedFeeMicroCC: 5000,
        currency: 'CC',
        valid: true,
      },
      lastSyncedAt: new Date().toISOString(),
      errorMessage: null,
      capabilities: {
        canSign: false,           // demo cannot sign real txs
        canExecuteReal: false,    // demo cannot execute real txs
        canReadContracts: false,
        serverSigningActive: false,
      },
    });
  }

  private _onAccountChanged(address: string): void {
    this._setState({ address });
    this.reload().catch(() => {});
  }

  private _onNetworkChanged(networkId: string): void {
    this._setState({ networkId });
    this.reload().catch(() => {});
  }

  private _onDisconnected(): void {
    this._setState({ ...INITIAL_WALLET_STATE });
  }
}

// Singleton — one client per browser session
export const loopClient = new LoopClient();

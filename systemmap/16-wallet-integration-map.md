# 16. Wallet Integration Map

## Current State: PARTIALLY WIRED

The wallet system has UI components and some integration points, but real blockchain execution is **not connected**.

## Wallet Pages and Components

### `/wallet` page components

| Component | File | Real Data? |
|-----------|------|-----------|
| WalletConnectButton | `components/wallet/WalletConnectButton.tsx` | DEMO — no real connector |
| WalletDetailsPanel | `components/wallet/WalletDetailsPanel.tsx` | DEMO — hardcoded values |
| HoldingsPanel | `components/wallet/HoldingsPanel.tsx` | DEMO — static demo data |
| ActiveContractsPanel | `components/wallet/ActiveContractsPanel.tsx` | DEMO — empty or static |
| GasEstimatePanel | `components/wallet/GasEstimatePanel.tsx` | DEMO — static estimates |
| CapabilityStatusPanel | `components/wallet/CapabilityStatusPanel.tsx` | DEMO — hardcoded badges |

### `useWallet` hook (`hooks/useWallet.ts`)

Provides wallet state to components. Currently returns hardcoded demo state:
- Address: `0x1234...abcd` (mock)
- Balance: 500,000,000 CC (hardcoded)
- Is connected: `true` (demo mode)

## Wallet Types (from `@canton/shared`)

```typescript
ConnectedWalletState {
  address: string
  isConnected: boolean
  isDemo: boolean
  balances: Array<{
    asset: string   // 'CC' | other
    available: number  // microCC
    locked: number
    total: number
  }>
  lastSyncedAt: string | null
}
```

## Execution Integration (`loop/` directory)

### Files

- `lib/loop/config.ts` — Loop protocol configuration
- `lib/loop/client.ts` — Loop client (wallet integration client)
- `lib/loop/types.ts` — Loop protocol types
- `lib/loop/adapters/server-signing.ts` — Server-side signing adapter

### Configuration

Loop execution is gated by `NEXT_PUBLIC_LOOP_ENABLED=true` env var.

### Server Signing Adapter

`server-signing.ts` provides a signing interface for the Loop adapter. This is the path through which real execution would be authorized — but **no actual signing key is configured**, and no on-chain transaction is ever built or submitted.

## Database Wallet State

Wallet state is stored in SQLite and queried via `queryWalletState()` in `db.ts`. In demo mode:
- `isDemo = true`
- `isConnected = true`
- Hardcoded 500M CC balance
- No real blockchain sync

## What Would Be Needed for Real Wallet Execution

1. **Wallet connection**: Implement real wallet connector (e.g., WalletConnect, MetaMask)
2. **Chain provider**: Connect to Canton blockchain node
3. **Transaction signing**: Implement proper transaction signing flow
4. **Gas estimation**: Real gas estimation from chain
5. **Execution adapter**: Wire `execution/adapter.ts` to actual blockchain
6. **Confirmation modal**: User approval step before signing
7. **Tx receipt tracking**: Poll/fetch actual transaction receipts

## Demo Mode Behavior

When `isDemo = true`:
- Agent orchestrator sets `isSimulated = true`
- All execution receipts have `simulationOnly: true`
- No blockchain calls are made
- Gas estimates shown are hardcoded static values
- Activity feed shows `SIMULATED` events with fake tx hashes (`0xSIM...`)

## Gap Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Wallet UI | DEMO | Hardcoded values, no real connector |
| Balance display | DEMO | Static 500M CC |
| Holdings panel | DEMO | Static demo data |
| Gas estimates | DEMO | Static mock values |
| Active contracts | DEMO | Empty or static |
| Execution (Loop) | NOT WIRED | Config exists but no real signing |
| Chain connection | NOT CONNECTED | No node connection |
| Transaction signing | NOT IMPLEMENTED | No signing flow |
| Tx receipt tracking | NOT IMPLEMENTED | No on-chain state sync |
# Loop Wallet Integration

This document describes how the Canton AI Agent Wallet integrates with the Loop wallet SDK.

---

## Overview

The Loop integration is **opt-in**. By default (`NEXT_PUBLIC_LOOP_ENABLED=false`) the app runs in **demo mode** — all wallet actions are simulated, no real transactions are submitted. When you enable the Loop SDK, users can connect a live browser wallet and execute real on-chain transactions through the policy engine.

---

## Quick Start

1. Copy `.env.example` to `.env.local`:
   ```
   cp .env.example .env.local
   ```

2. Enable Loop:
   ```
   NEXT_PUBLIC_LOOP_ENABLED="true"
   NEXT_PUBLIC_LOOP_NETWORK="testnet"   # or mainnet / local
   ```

3. Restart the dev server:
   ```
   pnpm dev
   ```

4. Open the app, go to **Wallet** in the sidebar, and click **Connect Loop Wallet**.

---

## Architecture

```
Browser
  └─ window.loop (injected by Loop extension)
       │
       ▼
apps/web/lib/loop/client.ts  (LoopClient singleton)
       │  ├─ connect()
       │  ├─ disconnect()
       │  ├─ reload()
       │  └─ subscribe(listener)
       │
       ▼
apps/web/hooks/useWallet.ts  (React hook — subscribes to LoopClient)
       │
       ▼
apps/web/components/wallet/  (UI panels)
       ├─ WalletConnectButton.tsx
       ├─ WalletDetailsPanel.tsx
       ├─ HoldingsPanel.tsx
       ├─ ActiveContractsPanel.tsx
       ├─ GasEstimatePanel.tsx
       └─ CapabilityStatusPanel.tsx
```

---

## Configuration

All configuration is in environment variables. The config object is at `apps/web/lib/loop/config.ts`.

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_LOOP_ENABLED` | `false` | Enable Loop SDK. When false, runs in demo mode. |
| `NEXT_PUBLIC_LOOP_NETWORK` | `testnet` | Network: `testnet`, `mainnet`, or `local`. |
| `NEXT_PUBLIC_LOOP_OPEN_MODE` | `popup` | How to open the wallet: `popup`, `tab`, or `overlay`. |
| `NEXT_PUBLIC_LOOP_REQUEST_SIGNING_MODE` | `browser` | Signing path: `browser` (local key) or `server`. |
| `LOOP_SERVER_SIGNING_ENABLED` | `false` | Enable server-side signing adapter. |
| `LOOP_SERVER_SIGNING_URL` | — | URL of the signing endpoint (server-only). |

---

## Connection States

The wallet goes through these states (defined in `apps/web/lib/loop/types.ts`):

| Status | Description |
|---|---|
| `disconnected` | No wallet connected. Default state. |
| `connecting` | Wallet popup/tab is open, waiting for user. |
| `connected` | Wallet connected and data loaded. |
| `rejected` | User cancelled the connection prompt. |
| `error` | Unexpected error (extension missing, network failure, etc.). |

---

## Demo Mode vs Live Mode

### Demo Mode (`NEXT_PUBLIC_LOOP_ENABLED=false`)

- `LoopClient.connect()` simulates a 800ms async delay then sets `status: connected` with fake data.
- `capabilities.canSign = false`, `capabilities.canExecuteReal = false`.
- All executions go through simulated paths in `agent-service.ts`.
- No window.loop calls are ever made.

### Live Mode (`NEXT_PUBLIC_LOOP_ENABLED=true`)

- `LoopClient.connect()` calls `window.loop.connect()`.
- If the extension is not installed, sets `status: error` with a clear message.
- If the user denies, sets `status: rejected`.
- On success, loads balances, active contracts, and gas estimates from the SDK.
- `capabilities.canSign = true`, `capabilities.canExecuteReal = true`.

---

## Capability Badges

The UI uses three badge states to be honest about what is and isn't real:

| Badge | Meaning |
|---|---|
| `REAL` | Actually happening on-chain or against a real wallet. |
| `SIMULATED` | Safe mock — estimated outcome, no on-chain effect. |
| `DISABLED` | Feature not available in the current configuration. |

The `CapabilityStatusPanel` shows all 8 capability dimensions at once.

---

## Server-Side Signing (Experimental)

> **Never enable this without proper secret management.**

Server-side signing allows a server-held private key to sign transactions. It is disabled by default and requires explicit opt-in:

```
LOOP_SERVER_SIGNING_ENABLED="true"
LOOP_SERVER_SIGNING_URL="https://your-signing-server/api/sign"
# SERVER_SIGNING_PRIVATE_KEY="..."   # in .env.local ONLY, never committed
```

The adapter is at `apps/web/lib/loop/adapters/server-signing.ts`. It calls the configured URL via `POST` and expects the response shape defined in `SigningResponse`. The private key is never loaded in browser code.

---

## Wallet Events

`LoopClient` listens to three SDK events and reacts automatically:

| Event | Behavior |
|---|---|
| `accountChanged` | Updates address, reloads balances and contracts. |
| `networkChanged` | Updates networkId, reloads wallet data. |
| `disconnected` | Resets all state to `INITIAL_WALLET_STATE`. |

All event listeners are removed on `disconnect()`.

---

## Error Handling

- **Extension not installed**: `status: error`, message: "Loop wallet extension not detected."
- **User rejected**: `status: rejected` (distinct from error — the user intentionally cancelled).
- **Data fetch failure**: `status: error` with specific message; gas estimate falls back to a default (5000 µCC) with `valid: false`.
- **Server signing failure**: Throws with a descriptive message; does not silently swallow errors.

---

## File Map

```
apps/web/lib/loop/
  config.ts                   # env-var configuration object
  types.ts                    # TypeScript types for wallet state
  client.ts                   # LoopClient singleton
  adapters/
    server-signing.ts         # Server-side signing adapter

apps/web/hooks/
  useWallet.ts                # React hook wrapping LoopClient

apps/web/components/wallet/
  WalletConnectButton.tsx     # Sidebar connect/status button
  WalletDetailsPanel.tsx      # Full connection detail card
  HoldingsPanel.tsx           # Token balances
  ActiveContractsPanel.tsx    # Live Daml contracts
  GasEstimatePanel.tsx        # Fee preview
  CapabilityStatusPanel.tsx   # All-capabilities overview

apps/web/app/(main)/wallet/
  page.tsx                    # /wallet route

docs/integrations/
  loop.md                     # This file
```

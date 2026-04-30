# Guest vs Authenticated Terminal States

## Overview

The same `AgentTerminal` component renders in two contexts:
- **Public terminal** (`/agent`): accessible to everyone, no sidebar, guest-labeled
- **Authenticated terminal** (`/agent` inside `(main)/`): inside DashboardShell, auth-labeled, richer initial state

The `isAuthenticated` prop (and other props) determine the visible differences.

---

## Guest Mode (`/agent`)

### Entry Condition
- No authentication required
- Anyone can open `/agent` directly

### Visible Differences from Auth Mode

| Element | Guest Mode | Auth Mode |
|---------|-----------|-----------|
| Shell | Navbar only | DashboardShell (sidebar) |
| Auth badge | "Guest Session" | "Authenticated" |
| Wallet address | "demo-wallet-0000" | Truncated real address |
| Balance | Hardcoded 500 CC | From wallet state |
| Daily usage | Hidden | Shown |
| Add Balance button | Visible | Hidden |
| Policies list | Hidden | Visible in props |
| Saved preferences | Empty | From user profile |

### Guest-Specific Features

**Add Balance Flow:**
1. Guest clicks "+ Add balance" next to wallet display
2. Button shows spinning icon + "Restoring…"
3. `POST /api/demo/reset` is called
4. On success: "Balance restored" appears for 3 seconds
5. Wallet balance display reflects actual DB state from next plan response

**Session History:**
- All exchanges during the session are shown in scrollable history
- Session clears on "Clear session" click or page refresh
- No cross-session persistence for anonymous users

### What Guests Can Do

| Capability | Guest Can Do? |
|------------|--------------|
| Type natural language commands | Yes |
| See intent parsed in real time | Yes |
| View policy evaluation results | Yes |
| See plan and explanation | Yes |
| Execute real transactions | No (demo only) |
| Persist policies | No |
| See cross-session activity | No |
| Access dashboard | No |

---

## Authenticated Mode (`/agent`)

### Entry Condition
- User is authenticated (session/cookie based)
- Accessed via sidebar nav inside DashboardShell

### Visible Differences from Guest Mode

| Element | Auth Mode |
|---------|-----------|
| Shell | DashboardShell with full sidebar |
| Auth badge | "Authenticated" |
| Wallet address | Truncated real address from DB |
| Balance | From actual wallet_state DB query |
| Daily usage | Visible and accurate |
| Add Balance | Not in terminal (use Dashboard) |
| Policies | Passed as props (all active policies) |
| Saved preferences | Passed as props |

### What Authenticated Users Can Do

| Capability | Authenticated Can Do? |
|------------|----------------------|
| All guest capabilities | Yes |
| Execute simulated transactions | Yes (demo wallet) |
| Execute real transactions | Yes (if live mode enabled) |
| Persist policies | Yes |
| View cross-session activity | Yes |
| Access full dashboard | Yes |

---

## Shared Behaviors (Both Modes)

Regardless of auth state, the following are identical:

### Terminal UX
- Same input behavior (Enter to submit, Shift+Enter for newline)
- Same 5 preset prompts
- Same thinking animation (3-dot bounce + rotating messages)
- Same plan result sections

### API Calls
- Same `/api/agent/plan` endpoint
- Same `/api/agent/explain` endpoint
- Same response processing

### Policy Engine
- Same server-side deterministic evaluation
- Same policy verdict format
- Same passed/failed check display

### Simulation Behavior
- Both modes show SIMULATED execution unless `NEXT_PUBLIC_LOOP_ENABLED=true`
- Both show the same disclaimer about demo mode

---

## State Flow Diagram

```
Guest visits /agent
        │
        ▼
┌──────────────────────┐
│  AgentTerminal       │
│  isAuthenticated=false
│  walletBalanceCC=500 │◄── display only (hardcoded)
│  Add Balance visible │
└──────────────────────┘
        │
        ▼ enters command
┌──────────────────────┐
│  POST /api/agent/plan│
│  (queryWalletState() │
│   from DB — actual    │
│   balance returned)  │
└──────────────────────┘
        │
        ▼
┌──────────────────────┐
│  Plan result shown    │
│  (wallet snapshot     │
│   reflects real DB     │
│   state)              │
└──────────────────────┘
        │
        ▼ clicks "+ Add balance"
┌──────────────────────┐
│  POST /api/demo/reset│
│  (resets DB balances)│
└──────────────────────┘
```

```
User visits /agent (authenticated)
        │
        ▼
┌──────────────────────────────┐
│  DashboardShell (sidebar)     │
│  AgentTerminal                │
│  isAuthenticated=true         │
│  walletAddress=0x1a2b...9z0y │
│  walletBalanceCC=500 (from   │
│    wallet_state table)        │
│  policies=[...] (from DB)    │
└──────────────────────────────┘
        │
        ▼ (same API flow)
```

---

## Implementation Details

### AgentTerminal Props

```ts
interface AgentTerminalProps {
  isAuthenticated?: boolean;      // false = guest, true = auth
  walletAddress?: string;         // displayed address
  walletBalanceCC?: number;       // displayed balance (initial)
  walletDailyUsageCC?: number;     // displayed daily usage
  walletDailyLimitCC?: number;    // displayed daily limit
  policies?: string[];            // active policy names
  savedPreferences?: string[];    // user preferences
}
```

### Public Page Props to AgentTerminal

```ts
<AgentTerminal
  isAuthenticated={false}
  walletAddress="demo-wallet-0000"
  walletBalanceCC={500}
  walletDailyUsageCC={0}
  walletDailyLimitCC={1000}
/>
```

### Authenticated Page Props to AgentTerminal

```ts
<AgentTerminal
  isAuthenticated={true}
  walletAddress="0x1a2b...9z0y"    // from session/DB
  walletBalanceCC={500}            // from queryWalletState()
  walletDailyUsageCC={0}           // from wallet state
  walletDailyLimitCC={1000}        // from policies
  policies={['MAX_PER_TRADE', 'DENYLIST', 'DAILY_LIMIT']}
  savedPreferences={[]}
/>
```

---

## Future Auth-Aware Improvements

| Improvement | Description |
|-------------|-------------|
| Real auth integration | Wire actual user session to pass real wallet address |
| Live balance polling | Poll wallet state every 30s instead of on-plan only |
| Cross-session persistence | Store session history in localStorage for guest |
| Policy display | Show actual policies from DB in authenticated props |
| Saved preferences | Load user's default command preferences |

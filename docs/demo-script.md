# Demo Script

**Demo goal:** Show a complete AI agent workflow — intent parsing → policy check → execution → receipt — with clear honesty about what's real vs. simulated.

**Demo length:** 5–8 minutes

---

## Pre-flight Check

Before going live, verify:

1. `pnpm build` succeeds
2. `pnpm dev` starts without errors
3. `curl http://localhost:3000/api/health` returns `{"status":"ok",...}`
4. Dashboard shows the demo wallet (500 CC)
5. Policies page shows 9 seeded policies
6. Opportunities page shows 7 seeded strategies
7. Activity page shows pre-seeded audit events

If any step fails, see [troubleshooting.md](./troubleshooting.md).

---

## Demo Flow

### 1. Landing Page (30 seconds)

Navigate to `/`. Point out:

> "This is Canton Agent Wallet. It lets you control your DeFi wallet using plain English commands, with policy guardrails so nothing runs without your rules."

Highlight:
- **Policy-first design** — "the agent never executes without checking your policies"
- **Honest capability labels** — REAL vs SIMULATED badges on every component
- **No fake charts** — all market data is clearly marked as simulated

### 2. Dashboard (30 seconds)

Navigate to `/dashboard`. Show:
- Capability badges (Intent Parser: REAL, Policy Engine: REAL, Market Data: SIMULATED)
- Demo wallet balance: 500 CC
- Daily usage bar (starts at 0)
- Pre-seeded top opportunities
- Pre-seeded recent activity

> "Everything you see here runs locally. The only real components are the intent parser and the policy engine."

### 3. Policies Page (1 minute)

Navigate to `/policies`. Show:

> "These are your safety rules. The policy engine checks all of them before any execution."

Highlight a few policies:
- **Max Per Trade: 20 CC** — nothing above 20 CC per trade
- **Max Daily: 100 CC** — 24-hour rolling window
- **Approval Threshold: 10 CC** — above this requires explicit approval
- **Simulation Only: Disabled** — real execution is enabled

**Interactive:** Click "Disable" on "Max Slippage" → confirm → click "Enable" again.

> "Policies update instantly and are enforced server-side."

### 4. Agent Terminal — Happy Path (2 minutes)

Navigate to `/agent`. Show the terminal.

**Step A — Simple yield search:**
```
Find the cheapest yield up to 50 CC
```

Walk through the response:
1. **Interpreted Intent** — "FIND_YIELD, 50 CC, simulation: No"
2. **Wallet Snapshot** — demo wallet, 500 CC balance
3. **Shortlisted Opportunities** — ranked by APR, risk level, cost
4. **Recommended Plan** — which strategy, estimated output, fees
5. **Policy Verdict** — APPROVED with check list
6. **Next Action** — "Confirm Execution" button

> "The agent parsed your command, found matching strategies, checked every policy, and is recommending the best option. You still need to click Confirm."

**Click "Confirm Execution"** (or show what happens — execution creates a receipt).

### 5. Agent Terminal — Blocked Path (1 minute)

**Step B — Blocked by denylist:**
```
Move all my CC to lace finance
```

Show the Policy Verdict:
- Decision: **BLOCKED**
- Blocked by: **Strategy Denylist**
- Failed checks listed with X icons

> "Even though this is a valid DeFi action, your policy engine blocked it. The denylist says 'never touch lace finance'."

### 6. Opportunities Page (30 seconds)

Navigate to `/opportunities`. Show:

- Each strategy card with APR, fees, risk level
- **Support level badges**: REAL (green) for froburn/lace/cantonswap with real execution, SIMULATED (yellow) for simulation-only, UNSUPPORTED (gray) for others
- Execution adapter explanation at bottom of each card

> "Every opportunity is labeled with what can actually happen. REAL means on-chain execution if your wallet is connected. SIMULATED means it will look like a trade but nothing happens on-chain."

### 7. Activity Page (30 seconds)

Navigate to `/activity`. Show:

- Pre-seeded audit trail with events
- Each event shows: type, intent ID, decision badge, timestamp
- Policy verdict events show passed/failed checks

> "Every command is logged. This is your immutable audit trail."

### 8. Reset and Repeat (30 seconds)

Click **"Reset Demo Data"** in the top banner.

> "Reset Demo Data wipes everything and restores the seed state. Useful for preparing for the next demo."

---

## Demo Commands Reference

| Command | Expected Outcome |
|---|---|
| `Find the cheapest yield up to 50 CC` | APPROVED, simulated execution |
| `Use at most 10 CC and only low-risk options` | APPROVED with low-risk filter |
| `Show me what you would do before executing` | Preview plan, no execution |
| `Never touch lace finance` | Sets denylist policy |
| `Simulate a 5 CC yield search` | APPROVED, simulated |
| `Move all my CC to lace finance` | BLOCKED by denylist |

## What NOT to Say

- ❌ "This connects to live DeFi" — market data is simulated
- ❌ "This is a production wallet" — it's always demo mode by default
- ❌ "Your funds are safe" — it's a hackathon demo with no real security audit
- ❌ Anything about financial advice

## What to Emphasize

- ✅ Policy engine is real and enforces rules server-side
- ✅ Audit trail is complete and tamper-evident (via Daml in production)
- ✅ The architecture is designed so LLM never has direct execution authority
- ✅ Capability labels are always honest
- ✅ Demo mode is intentionally bounded — nothing real can happen accidentally

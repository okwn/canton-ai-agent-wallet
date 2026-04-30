# Canton AI Agent Wallet — Product Scope

## V1: What Is Real

| Feature | Status | Notes |
|---------|--------|-------|
| Natural language intent parsing | REAL | Rule-based parser in packages/agent-core. Works without external LLM API. |
| Policy engine | REAL | Enforces budget caps, approval thresholds, whitelist checks. All logic is functional. |
| Strategy whitelist | REAL | Stored in SQLite, checked at execution time. |
| SQLite database | REAL | Policies, audit log, strategies persisted to SQLite. |
| Loop SDK integration | REAL | SDK installed. Live wallet connection is DEMO — see below. |
| Execution audit log | REAL | Every command and result logged to SQLite. |
| Next.js App Router UI | REAL | Full functional React interface with all routes. |
| Adapter pattern | REAL | All external calls go through typed adapters. Demo ↔ live swap is a config flag. |
| Budget enforcement | REAL | Per-trade limit and approval threshold checked before any execution. |

## V1: What Is Simulated

| Feature | Status | Notes |
|---------|--------|-------|
| Market/opportunity data | SIMULATED | Hardcoded mock data in MockMarketAdapter. Returns static yield opportunities. |
| Token swap execution | SIMULATED | LoopWalletAdapter.executeSwap() logs intent and returns a fake receipt. No real blockchain transaction. |
| Wallet balance | SIMULATED | Returns static 500 CC balance for demo purposes. |
| Daml smart contracts | SIMULATED | Daml model defined but not deployed. V2 integration planned. |
| LLM-powered intent parser | SIMULATED | V1 uses regex + keyword rules. LLM parser is a planned V2 upgrade. |

**Honest label on UI**: Every simulated component displays a "SIMULATED" badge. No misleading live-data indicators.

## V1: Explicitly Out of Scope

| Feature | Reason |
|---------|--------|
| Live blockchain transaction submission | Loop SDK live mode requires wallet connect infrastructure not available at hackathon |
| Actual yield farming / DeFi integration | Requires whitelist of real protocols + audited contracts |
| Multi-step autonomous strategies | Safety risk too high without live policy enforcement from Daml |
| Persistent policy contracts on Daml | Daml model is designed but not deployed |
| Mobile UI | Web-first; React is the right tool for hackathon speed |
| Gas fee estimation and optimization | No live RPC connections to base chains |
| Cross-chain operations | Single-chain focus (Canton/Loop ecosystem) |
| User authentication / session management | Hackathon demo; local SQLite only |
| Persistent transaction history beyond SQLite | SQLite only; no backend API |

## Feature Flags (Environment Variables)

```bash
FEATURE_MOCK_MARKET="true"      # true = simulated market data
FEATURE_LIVE_WALLET="false"     # false = demo wallet (no real tx)
FEATURE_LLM_PARSER="false"      # false = rule-based parser
FEATURE_DAML_INTEGRATION="false" # false = SQLite-only persistence
```

## What "Working Demo" Means in V1

A user can:
1. Navigate to `/agent` and type a natural language command ("find cheapest yield up to 50 CC")
2. See the intent parsed correctly (action, amount, confidence displayed)
3. See the policy engine evaluate it (APPROVED / DENIED / NEEDS APPROVAL shown)
4. See the mock market return a result (opportunity cards)
5. See the execution logged to the Activity page
6. Configure a policy rule on `/policies` (e.g., max per trade = 20 CC)
7. See the policy engine correctly block an intent that exceeds the limit

**All of this is real TypeScript/React code. None of it is mocked at the UI level.**

# Capability Matrix

Every feature is labeled with its actual capability level. No "live" indicators are faked.

| Feature | Real | Simulated | Disabled | Notes |
|---|---|---|---|---|
| Intent parser (NLP) | ✅ | — | — | Rule-based parser always available. LLM parser when `LLM_API_KEY` is set. |
| Policy engine | ✅ | — | — | 11-step deterministic evaluation. Server-side enforcement. |
| Policy storage | ✅ | — | — | SQLite via sql.js. Daml contracts in production. |
| Audit log | ✅ | — | — | Append-only. Timestamped, includes intent ID, decision, receipts. |
| Market / opportunity data | — | ✅ | — | Seeded on first startup. 7 strategies across 4 providers. Not live DeFi. |
| Wallet connection (Loop) | — | ✅ | — | Demo wallet by default. Set `NEXT_PUBLIC_LOOP_ENABLED=true` for live. |
| Real on-chain execution | — | ✅ | — | Only for froburn/lace/cantonswap with connected live wallet. |
| Simulated execution | — | ✅ | — | Available for all opportunities. No on-chain effect. |
| Execution receipts | ✅ | — | — | Structured receipt returned for every execution attempt. |
| Daml ledger integration | — | — | ✅ | Daml model exists in `daml/agent-wallet/`. Not connected in this demo. |
| LLM-powered parsing | — | ✅ | — | Active when `LLM_API_KEY` is set. Rule-based fallback always works. |
| Auto-execution | — | — | ✅ | Always requires approval. `EXECUTION_MODE` policy controls this. |

---

## Adapter Capability Detail

| Adapter | Trigger | On-chain Effect | Demo Safety |
|---|---|---|---|
| `LoopSupportedExecutionAdapter` | `executionSupport='real'` + live wallet + supported provider | Yes (via Loop SDK) | Returns PREPARED; actual tx submitted by browser runtime |
| `DemoExecutionAdapter` | `executionSupport='simulated'` OR wallet is demo | None | Returns SIMULATED with honest TX hash |
| `UnsupportedExecutionAdapter` | All other cases | None | Returns UNSUPPORTED; never fakes execution |

---

## Execution Path by Scenario

| Scenario | Adapter Selected | Status Returned |
|---|---|---|
| Demo wallet + any opportunity | `DemoExecutionAdapter` | `SIMULATED` |
| Live wallet + real opportunity + supported provider | `LoopSupportedExecutionAdapter` | `PREPARED` (browser submits) |
| Live wallet + real opportunity + unsupported provider | `DemoExecutionAdapter` | `SIMULATED` (graceful fallback) |
| No wallet + real opportunity | `DemoExecutionAdapter` | `SIMULATED` |
| Unsupported provider + no simulation | `UnsupportedExecutionAdapter` | `UNSUPPORTED` |

---

## Policy Check Coverage

| Policy | Blocking | Scope |
|---|---|---|
| `MAX_PER_TRADE` | Yes | Per-transaction amount |
| `MAX_DAILY` | Yes | 24-hour rolling window |
| `APPROVAL_THRESHOLD` | No (approval flag) | Transaction amount |
| `STRATEGY_DENYLIST` | Yes | Provider name |
| `STRATEGY_ALLOWLIST` | Yes (if non-empty) | Provider name |
| `ASSET_ALLOWLIST` | Yes (if non-empty) | Asset symbol |
| `MAX_SLIPPAGE` | Yes | Slippage tolerance |
| `SIMULATION_ONLY` | No (execution mode) | All executions |
| `EXECUTION_MODE` | No (approval gate) | Whether auto-execute is allowed |

---

## What Is NOT in This Demo

- **No real blockchain connectivity** — nothing touches mainnet or testnet
- **No actual asset custody** — demo wallet has no real tokens
- **No live DeFi protocols** — all opportunity data is seeded
- **No Daml ledger** — Daml model exists but is not connected
- **No authentication** — no user accounts or sessions
- **No rate limiting** — no protection against API abuse
- **No transaction signing** — DemoExecutionAdapter never signs anything

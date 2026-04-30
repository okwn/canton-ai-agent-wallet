# 25. Final Capability Matrix

## Feature Classification Key

| Class | Definition |
|-------|------------|
| **REAL** | Fully functional code path with real logic; not mocked |
| **SIMULATED** | Real logic but demo/seeded data; no live external dependency |
| **DEMO** | UI exists but not fully wired to backend |
| **NOT BUILT** | Not implemented; placeholder or stub |

---

## Core Agent Capabilities

| Feature | Class | Notes |
|---------|-------|-------|
| Intent parsing (LLM) | REAL | Works when `OPENAI_API_KEY` set |
| Intent parsing (fallback) | REAL | Rule-based; always works |
| Policy engine evaluation | REAL | 11-step deterministic pipeline; tested |
| Plan generation | REAL | LLM when available, structured output |
| Explanation generation | REAL | Human-readable intent explanation |
| Safety filtering | REAL | Disallowed action blocking, input sanitization |
| Simulation mode flag | REAL | Propagated through full pipeline |

---

## Wallet / Execution

| Feature | Class | Notes |
|---------|-------|-------|
| Wallet UI (balance, holdings) | DEMO | Hardcoded 500M CC |
| Gas estimate UI | DEMO | Static mock values |
| Active contracts panel | DEMO | Empty or static |
| Wallet connection flow | NOT BUILT | No real connector |
| Daml ledger connection | NOT BUILT | No integration |
| Transaction signing | NOT BUILT | Stub exists, not wired |
| Real blockchain execution | NOT BUILT | Loop adapter configured but no signing |
| Simulated execution | SIMULATED | Logs receipt, fake tx hash, no on-chain effect |

---

## Data / Market

| Feature | Class | Notes |
|---------|-------|-------|
| Opportunities API | SIMULATED | Seeded data from DB |
| Opportunity filtering | REAL | Provider, risk tolerance filtering works |
| Opportunity ranking | REAL | APR-based ranking |
| Live DeFi data | NOT BUILT | No protocol connections |
| Price feed | NOT BUILT | No oracle integration |
| Liquidity validation | NOT BUILT | Static seeded liquidity |

---

## Policies

| Feature | Class | Notes |
|---------|-------|-------|
| Policy CRUD | REAL | Full create/read/update/delete |
| Policy evaluation | REAL | All 9 policy types functional |
| MAX_PER_TRADE | REAL | Implemented and tested |
| MAX_DAILY | REAL | With window tracking and accumulation |
| APPROVAL_THRESHOLD | REAL | Triggers REQUIRES_APPROVAL |
| STRATEGY_DENYLIST | REAL | Blocks denied providers |
| STRATEGY_ALLOWLIST | REAL | Restricts to allowed providers |
| ASSET_ALLOWLIST | REAL | Asset symbol filtering |
| MAX_SLIPPAGE | REAL | BPS-based limit |
| SIMULATION_ONLY | REAL | Blocks real execution when active |
| EXECUTION_MODE | REAL | Can disable all execution |

---

## Database / Persistence

| Feature | Class | Notes |
|---------|-------|-------|
| Policies table | REAL | Full CRUD |
| Audit events table | REAL | Append-only log |
| Opportunities table | SEEDED | Static data on startup |
| Execution attempts table | REAL | Tracks attempt status |
| DB migrations | NOT BUILT | No migration system |
| DB backup/export | NOT BUILT | No export functionality |

---

## API Routes

| Feature | Class | Notes |
|---------|-------|-------|
| POST /api/agent/parse | REAL | LLM or fallback |
| POST /api/agent/plan | REAL | Full pipeline |
| POST /api/agent/policy-check | REAL | Standalone eval |
| POST /api/agent/explain | REAL | Explanation generation |
| GET /api/dashboard | REAL | Aggregated data |
| GET /api/policies | REAL | List all |
| POST /api/policies | REAL | Create |
| PUT /api/policies/:id | REAL | Update |
| DELETE /api/policies/:id | REAL | Delete |
| GET /api/opportunities | SIMULATED | Seeded data |
| GET /api/audit | REAL | Filtered by type/limit |
| POST /api/demo/reset | REAL | Resets demo state |
| GET /api/health | REAL | Basic health |

---

## Frontend Pages

| Page | Class | Notes |
|------|-------|-------|
| Home (/) | REAL | Marketing page, explains product |
| Dashboard (/dashboard) | REAL | Stats, opportunities, activity |
| Agent (/agent) | REAL | Command terminal, full flow |
| Policies (/policies) | REAL | CRUD UI |
| Opportunities (/opportunities) | REAL | Seeded yield strategies |
| Activity (/activity) | REAL | Audit event log |
| Wallet (/wallet) | DEMO | Hardcoded demo values |

---

## Security

| Feature | Class | Notes |
|---------|-------|-------|
| Input sanitization | REAL | Truncation, char stripping |
| Disallowed action blocking | REAL | Blocks drain/admin attempts |
| Audit logging | REAL | All events logged |
| Auth / session management | NOT BUILT | No auth layer |
| Rate limiting | NOT BUILT | No rate limit |
| CSRF protection | NOT BUILT | No CSRF tokens |
| Key management (HSM/KMS) | NOT BUILT | No signing key storage |

---

## Developer Experience

| Feature | Class | Notes |
|---------|-------|-------|
| TypeScript | REAL | Full type coverage |
| Unit tests (policy engine) | REAL | Policy engine tested |
| Integration tests | NOT BUILT | No full-stack tests |
| E2E tests | PARTIAL | Skeleton exists, not wired |
| LLM fallback | REAL | Always works |
| Clear error messages | PARTIAL | Some errors clear, some silent |
| Structured logging | NOT BUILT | Uses console.log |

---

## Honest Summary

**What works end-to-end**: Natural language → intent parse → policy check → simulated execution receipt → audit log. This full loop works with demo data.

**What is real**: Intent parsing, policy engine, plan generation, audit logging, policy CRUD, database operations, UI components.

**What is simulated**: Wallet balance, opportunities data, execution receipts (fake tx hash), gas estimates.

**What is not built**: Real wallet connection, Daml ledger, DeFi protocol integration, authentication, rate limiting, transaction signing, live market data.

**What would need the most work to be production-ready**: Auth system, wallet integration, blockchain execution wiring, DeFi data connection.
# 24. Real / Demo / Mock / Unsupported Matrix

## Classification Definitions

| Classification | Meaning |
|---------------|---------|
| **REAL** | Works with production logic, real data |
| **DEMO** | Works with demo/seeded data, production logic |
| **MOCK** | Stubbed, no production logic |
| **UNSUPPORTED** | Not implemented |

---

## Features Matrix

| Feature | Status | Notes |
|---------|--------|-------|
| **Auth** | | |
| Login/Register | REAL | Cookie-based session |
| Auth middleware | REAL | Route protection |
| Session persistence | REAL | 7-day cookie |
| Logout | REAL | Clears session |
| **Agent** | | |
| Intent parsing (LLM) | DEMO | Works when OPENAI_API_KEY set |
| Intent parsing (fallback) | REAL | Rule-based, always works |
| Policy engine | REAL | Server-side enforcement |
| Plan generation | DEMO | Uses LLM when configured |
| Policy evaluation | REAL | Deterministic |
| **Execution** | | |
| Simulated execution | DEMO | Logs receipt, no blockchain |
| Real execution | UNSUPPORTED | Loop SDK not complete |
| **Data** | | |
| Policy CRUD | REAL | Persists to SQLite |
| Audit logging | REAL | Append-only |
| Activity history | DEMO | Seeded events |
| Opportunities | DEMO | Seeded data |
| **Wallet** | | |
| Demo wallet | DEMO | 500M CC hardcoded |
| Live wallet | UNSUPPORTED | Loop SDK incomplete |
| Gas estimates | DEMO | Static values |
| **API** | | |
| /api/agent/* | REAL | Core logic works |
| /api/dashboard | DEMO | Aggregates seeded data |
| /api/policies | REAL | Full CRUD |
| /api/audit | REAL | Append/query |
| /api/opportunities | DEMO | Seeded only |
| **UI** | | |
| Home page | REAL | Marketing |
| Agent terminal | REAL | Functional |
| Dashboard | REAL | Redesigned |
| Login/Register | REAL | Functional |
| Policies page | REAL | CRUD works |
| Activity page | DEMO | Seeded events |
| Opportunities page | DEMO | Seeded data |
| Wallet page | DEMO | Static data |

---

## What Works End-to-End

1. **Guest terminal flow**: Type command → Parse intent → See policy verdict → Approve → See receipt
2. **Login/register flow**: Create account → Get session → Access dashboard
3. **Policy management**: Create, edit, toggle, delete policies
4. **Activity viewing**: See audit events with proper formatting

---

## What Requires External Services

| Service | Status | Enable |
|---------|--------|--------|
| OpenAI | Works when API key set | OPENAI_API_KEY |
| Loop Wallet | Not complete | NEXT_PUBLIC_LOOP_ENABLED |
| DeFi Protocols | Not integrated | N/A |
| Daml Ledger | Not integrated | N/A |

---

## Honest Claims You Can Make

### Can Claim
- "Policy engine is server-side enforced"
- "Intent parsing works (with LLM or fallback)"
- "Full audit trail"
- "Policy CRUD is functional"
- "Demo wallet with 500M CC"

### Cannot Claim
- "Real blockchain transactions"
- "Live DeFi integration"
- "Connected to Canton ledger"
- "Real wallet balance"
- "Production-ready auth"

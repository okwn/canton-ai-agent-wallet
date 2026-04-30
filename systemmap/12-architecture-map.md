# 12. Architecture Map

## System Topology

```
                        ┌─────────────────────────────────────────────────┐
                        │                   USER                          │
                        └────────────────────┬────────────────────────────┘
                                             │ natural language
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (Next.js 14)                             │
│                                                                              │
│  / ──────────── Home (public marketing)                                      │
│  /dashboard ── Dashboard (wallet overview, activity, opportunities)           │
│  /agent ────── Agent Terminal (NLP command input)                            │
│  /policies ─── Policy management (CRUD)                                      │
│  /opportunities Yield marketplace (seeded opportunities)                     │
│  /activity ─── Audit log (full event history)                                │
│  /wallet ───── Wallet details (balances, contracts)                          │
└────────────────────────────┬───────────────────────────────────────────────┘
                             │ fetch / submit
                             ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                        API ROUTE HANDLERS (Next.js)                         │
│                                                                              │
│  POST /api/agent/parse ──────── Intent extraction (LLM or fallback)        │
│  POST /api/agent/plan ────────── Plan generation + policy check             │
│  POST /api/agent/policy-check ── Standalone policy evaluation                │
│  POST /api/agent/explain ─────── Explanation of intent                      │
│  GET  /api/dashboard ─────────── Dashboard aggregation                      │
│  GET  /api/opportunities ──────── Yield opportunities (seeded)                │
│  GET  /api/policies ──────────── List policies                              │
│  POST /api/policies ──────────── Create policy                              │
│  PUT  /api/policies/:id ──────── Update policy                              │
│  DELETE /api/policies/:id ────── Delete policy                              │
│  GET  /api/audit ──────────────── Audit events                              │
│  POST /api/demo/reset ─────────── Reset demo state                          │
└────────────────────────────┬───────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌────────────────┐  ┌─────────────────┐  ┌────────────────────┐
│  @canton/      │  │  @canton/       │  │  SQLite DB         │
│  agent-core    │  │  shared         │  │  (better-sqlite3)  │
│                │  │                 │  │                   │
│ • AgentOrchestr│  │ • Types/schemas │  │ • policies         │
│ • PolicyEngine │  │ • Domain models │  │ • audit_events    │
│ • IntentParser │  │ • Constants     │  │ • opportunities   │
│ • LLM Service  │  │                 │  │ • execution_attempt│
│ • Safety       │  │                 │  │                   │
└────────────────┘  └─────────────────┘  └────────────────────┘
```

## Package Boundaries

### `apps/web/` — Next.js frontend + API routes
- **Role**: UI layer and API route handlers
- **Key files**: `lib/agent-service.ts`, `lib/db.ts`, `app/api/**`

### `packages/agent-core/` — Agent logic
- **Role**: Orchestration, intent parsing, policy evaluation, plan generation
- **Public exports**: `parseIntent`, `intentSummary`, `policyEngine`, `agentOrchestrator`
- **Dependencies**: `@canton/shared`

### `packages/shared/` — Types and constants
- **Role**: Zod schemas, TypeScript types, domain models, shared constants
- **Public exports**: All types, `DEFAULT_LIMITS`, domain schemas

## Data Flow Summary

1. User types natural language at `/agent`
2. Frontend calls `POST /api/agent/parse`
3. API route calls `parseIntent()` from `agent-core`
4. Intent parser extracts structured intent (LLM or fallback rule-based)
5. Frontend calls `POST /api/agent/plan`
6. Agent orchestrator evaluates against policy engine
7. Plan returned with policy verdict (APPROVED / DENIED / REQUIRES_APPROVAL)
8. User approves → `POST /api/agent/execute`
9. Execution logged to audit_events table
10. Dashboard and Activity pages reflect state changes

## Real vs Simulated Components

| Layer | Component | Status | Notes |
|-------|-----------|--------|-------|
| Frontend | All pages | REAL | Functional React components |
| Frontend | Wallet UI | SIMULATED | Hardcoded 500M CC balance |
| API | Intent parsing | REAL | LLM when configured, fallback always works |
| API | Policy engine | REAL | Deterministic 11-step evaluation |
| API | Plan generation | REAL | Uses LLM when configured |
| API | Execution | SIMULATED | Logs receipt but no real tx |
| DB | policies table | REAL | Full CRUD |
| DB | audit_events table | REAL | Append-only log |
| DB | opportunities table | SEEDED | Static data on startup |
| LLM | OpenAI-compatible | REAL | When `OPENAI_API_KEY` set |
| Wallet | Canton Ledger (Daml) | NOT CONNECTED | No Daml integration |
| DeFi | External protocols | NOT CONNECTED | No on-chain integration |
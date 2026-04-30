# 19. Architecture Map

## System Topology

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USERS                                            │
│                                                                              │
│   Guest ──────► Home Page (public marketing)                                │
│                  /agent (public terminal - no login needed)                  │
│                  /login, /register                                          │
│                                                                              │
│   Auth User ──► /dashboard (authenticated control center)                    │
│                  /policies, /activity, /opportunities, /wallet              │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 14 App Router)                      │
│                                                                              │
│   Public Routes          Auth Routes          API Routes                     │
│   ─────────────         ───────────          ──────────                     │
│   / (home)              /dashboard           /api/agent/*                   │
│   /agent                /policies            /api/dashboard                 │
│   /login                /activity             /api/opportunities            │
│   /register             /opportunities         /api/policies                 │
│                         /wallet               /api/audit                     │
│                                                                              │
│   Shell: Navbar (public)         Shell: DashboardShell (sidebar)            │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        API ROUTE HANDLERS                                    │
│                                                                              │
│   Agent API          Dashboard API        Policy/Auth API                    │
│   ────────          ─────────────        ────────────────                    │
│   /api/agent/parse  /api/dashboard      /api/policies                       │
│   /api/agent/plan   /api/opportunities   /api/audit                          │
│   /api/agent/policy-check                                  [middleware.ts]  │
│   /api/agent/explain                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AGENT CORE (@canton/agent-core)                     │
│                                                                              │
│   ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│   │ IntentParser   │  │ PolicyEngine   │  │ AgentOrchestr │                │
│   │                │  │                │  │               │                │
│   │ • LLM parsing  │  │ • 11-step eval │  │ • Flow control│                │
│   │ • Rule fallback│  │ • Usage track  │  │ • Plan gen    │                │
│   │ • Type extract │  │ • DENYLIST     │  │ • Safety check│                │
│   └────────────────┘  │ • MAX_PER_TRADE│  └────────────────┘                │
│                        │ • MAX_DAILY    │                                    │
│                        │ • APPROVAL_... │  ┌────────────────┐                │
│                        └────────────────┘  │ LLM Service   │                │
│                                              │               │                │
│                        @canton/shared ────► │ • OpenAI      │                │
│                        • Types              │ • Fallback    │                │
│                        • Schemas            └────────────────┘                │
│                        • Constants                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                         │
│                                                                              │
│   SQLite (better-sqlite3)              │                                    │
│   ──────────────────────────           │                                    │
│   policies        REAL (CRUD)          │                                    │
│   audit_events   REAL (append-only)    │                                    │
│   opportunities  SEEDED (demo data)    │                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Package Boundaries

### `apps/web/` — Next.js Frontend + API Routes

**Role**: UI layer, API route handlers, client-side state

**Key Directories**:
- `app/` — Next.js App Router pages and layouts
- `app/api/` — API route handlers
- `components/` — React components
- `lib/` — Services, utilities, database

**Dependencies**: `@canton/agent-core`, `@canton/shared`

---

### `packages/agent-core/` — Agent Logic

**Role**: Orchestration, intent parsing, policy evaluation, plan generation

**Public Exports**:
- `parseIntent()` — NLP intent extraction
- `intentSummary()` — Intent summarization
- `policyEngine` — Policy evaluation
- `agentOrchestrator` — Main orchestration

**Dependencies**: `@canton/shared`, `openai` (optional)

---

### `packages/shared/` — Types and Constants

**Role**: Zod schemas, TypeScript types, domain models, constants

**Public Exports**:
- All domain types (`Intent`, `Policy`, `AuditEvent`, etc.)
- `DEFAULT_LIMITS` — Default policy values
- Schema validators

---

## Three Surfaces

Marcus has three distinct surfaces:

| Surface | Route | Auth | Purpose |
|---------|-------|------|---------|
| **Home** | `/` | None | Marketing, product explanation |
| **Public Terminal** | `/agent` | None | Demo agent without login |
| **Dashboard** | `/dashboard` | Required | Full control center |

---

## Data Flow: Prompt to Receipt

```
User types natural language
         │
         ▼
POST /api/agent/parse
         │
         ▼
IntentParser extracts:
• action (yield, transfer, etc.)
• amount
• constraints
         │
         ▼
POST /api/agent/plan
         │
         ▼
AgentOrchestrator:
1. Generate plan steps
2. Evaluate against PolicyEngine
3. Calculate risk
         │
         ▼
User sees: Plan + Policy Verdict + Risk
         │
         ▼
User clicks [Approve]
         │
         ▼
POST /api/agent/execute
         │
         ▼
1. Re-check policies
2. Execute (simulated)
3. Log to audit_events
         │
         ▼
User sees: Receipt with tx hash (simulated)
```

---

## Authentication Architecture

**Current**: Mock auth with cookie-based session

```
Login form ──► AuthProvider.login()
                    │
                    ▼
               Validate credentials
                    │
                    ▼
               Set cookie: marcus_auth (base64 email)
                    │
                    ▼
middleware.ts checks cookie on protected routes
                    │
                    ▼
No cookie on protected route ──► Redirect /login?redirect=...
```

**Protected Routes**: `/dashboard`, `/activity`, `/policies`, `/opportunities`, `/wallet`

---

## Database Schema

| Table | Purpose | Operations |
|-------|---------|------------|
| `policies` | User safety rules | CRUD |
| `audit_events` | All agent activity | INSERT, SELECT |
| `opportunities` | Yield strategies (seeded) | SELECT |

---

## Environment Variables

| Variable | Effect | Default |
|----------|--------|---------|
| `OPENAI_API_KEY` | Enables LLM intent parsing | Not set (uses rule fallback) |
| `NEXT_PUBLIC_LOOP_ENABLED` | Enables real wallet | false |
| `DATABASE_PATH` | SQLite file location | `./data/marcus.db` |

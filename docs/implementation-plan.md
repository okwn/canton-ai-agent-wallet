# Canton AI Agent Wallet — Implementation Plan

## Phase 0: Scaffold + Workspace (Day 0 — 2 hours)

**Goal**: Empty shell with working pnpm workspace.

### Tasks
- [x] `pnpm-workspace.yaml` — workspace definition
- [x] Root `package.json` — workspace scripts
- [x] `apps/web` — Next.js App Router + Tailwind + TypeScript
- [x] `packages/shared` — types and constants
- [x] `packages/agent-core` — intent parser + policy engine
- [x] `scripts/dev-check.js` — environment verification
- [x] `.env.example` — environment variable template
- [x] `scripts/db-migrate.js` — SQLite bootstrap

### Exit Criteria
- `node scripts/dev-check.js` passes
- `pnpm install` succeeds
- Dev server starts with `pnpm run dev`

---

## Phase 1: UI Shell + Navigation (Day 0.5 — 3 hours)

**Goal**: All routes render with minimal content; sidebar navigation works.

### Tasks
- [x] Root layout with sidebar navigation
- [x] Route pages: `/`, `/dashboard`, `/agent`, `/policies`, `/opportunities`, `/activity`
- [x] `/api/health` API route
- [x] Badge components (REAL / SIMULATED / DISABLED)
- [x] Card, Button UI primitives
- [x] DEMO badge in sidebar

### Exit Criteria
- All 7 routes render without console errors
- Sidebar navigation highlights active route
- DEMO badge visible on all authenticated pages

---

## Phase 2: Intent Parser + Policy Engine (Day 1 — 4 hours)

**Goal**: Core business logic works in API routes.

### Tasks
- [x] `packages/agent-core/src/intent-parser.ts` — rule-based NL → structured Intent
- [x] `packages/agent-core/src/policy-engine.ts` — policy evaluation
- [x] `/api/agent/parse` — POST endpoint wired to intent parser
- [x] `/api/agent/policy-check` — POST endpoint wired to policy engine
- [x] `useAgent` hook in web app (or direct fetch calls)
- [x] Agent page shows parsed intent result
- [x] Agent page shows policy check result

### Exit Criteria
- "Find me the cheapest yield up to 50 CC" → action=FIND_BEST_YIELD, amount=50000000
- "Find me the cheapest yield up to 5 CC" → action=FIND_BEST_YIELD, amount=5000000, decision=APPROVED
- "Find me the cheapest yield up to 50 CC" → decision=REQUIRES_APPROVAL (threshold=10 CC)

---

## Phase 3: Database Integration (Day 1.5 — 3 hours)

**Goal**: Policies and audit log persist to SQLite.

### Tasks
- [x] `apps/web/lib/db.ts` — SQLite connection with schema bootstrap
- [x] `scripts/db-migrate.js` — initializes database and seeds default policies
- [x] Policies page reads from SQLite
- [x] Activity page reads from audit_log table
- [x] API routes write to audit_log on each request

### Exit Criteria
- Default policies (max per trade 20 CC, approval threshold 10 CC) seeded on first run
- Audit log entries appear after agent commands
- Policies page shows editable policy rules

---

## Phase 4: Mock Adapters + Opportunities (Day 2 — 3 hours)

**Goal**: Opportunities page shows mock yield data; agent can execute mock commands.

### Tasks
- [x] MockMarketAdapter — hardcoded yield opportunities
- [x] Opportunities page shows mock yield cards
- [x] Agent page "Execute" button triggers mock execution (logs to console + DB)
- [x] Simulated execution receipt shown in Activity log

### Exit Criteria
- 3+ mock opportunities visible on /opportunities
- Executing a mock opportunity creates an audit log entry
- Activity page shows execution result with SIMULATED badge

---

## Phase 5: Polish + Docs (Day 2.5 — 2 hours)

**Goal**: Demo is clean, well-documented, and presentable.

### Tasks
- [x] README.md with setup and run commands
- [x] Docs: architecture.md, product-scope.md, risk-register.md, implementation-plan.md
- [x] Daml model skeleton in `daml/agent-wallet/model/`
- [x] Verify all routes work in browser
- [x] No TypeScript errors on typecheck

### Exit Criteria
- `pnpm run typecheck` passes with zero errors
- `pnpm run dev` boots the app at localhost:3000
- Full demo run-through: agent command → policy check → execution → activity log

---

## Timeline Summary

```
Day 0 (5h):   Phase 0 (scaffold) + Phase 1 (UI shell)
Day 1 (7h):   Phase 2 (intent parser) + Phase 3 (database)
Day 2 (5h):   Phase 4 (mock adapters) + Phase 5 (polish)
─────────────────────────────────────────────────────
Total:        ~17 hours (hackathon scope)
```

## Build Verification

```bash
node scripts/dev-check.js    # Environment check
pnpm run typecheck           # TypeScript check
pnpm run build               # Production build
pnpm run dev                  # Dev server at localhost:3000
```

## Known Trade-offs

1. **Rule-based parser vs LLM**: V1 parser misinterprets complex phrasing. Documented honestly in product-scope.md.
2. **SQLite vs Daml persistence**: Policies editable via DB. Daml enforces on-chain in V2.
3. **Simulated wallet vs live**: Clearly labeled SIMULATED. No misleading live indicators.
4. **No conversational memory**: Each command is independent. Context window is single-shot.

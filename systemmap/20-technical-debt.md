# 20. Technical Debt

## UI Debt

### 1. Design System Incomplete
**Issue**: Design tokens from `DESIGN-lovable.md` not fully implemented.
- Background still gray instead of warm cream `#f7f4ed`
- Primary color still blue instead of charcoal `#1c1c1c`
- Cards use shadow containment instead of border-based
- Buttons lack signature inset shadow

**Impact**: Product feels generic, not warm/trustworthy.

### 2. Typography Gap
**Issue**: Camera Plain Variable font specified in design but not loaded in `app/layout.tsx`.
**Current**: Geist Sans
**Expected**: Camera Plain Variable

### 3. Loading States
**Issue**: No skeleton loading components for dashboard cards during data fetch.
**Impact**: User sees blank space or layout shift during API calls.

### 4. Focus States
**Issue**: Using default Tailwind ring instead of custom warm shadow.
**Expected**: `rgba(0,0,0,0.1) 0px 4px 12px`

### 5. Empty States
**Issue**: Inline text + icon pattern, no consistent component.
**Expected**: Consistent EmptyState component with CTA.

### 6. Demo Banner Persistence
**Issue**: DemoBanner shows on all pages but doesn't persist user dismissal.

---

## Architecture Debt

### 7. Singleton PolicyEngine
**Issue**: `policyEngine` is a module-level singleton exported from agent-core. This works for single-process but prevents parallel test execution and makes dependency injection awkward.
**Fix**: Inject PolicyEngine instance via constructor.

### 8. No Migration System
**Issue**: Database schema changes require manual intervention.
**Fix**: Add a lightweight migration runner (e.g., `migrate.ts` that runs on startup).

### 9. Type Casting in agent-service.ts
**Issue**: Extensive `as` type assertions when reading from DB:
```typescript
const typedPolicies = policies.map((p: Record<string, unknown>) => {
  // ... lots of `as` casts
```
**Fix**: Use typed row interfaces from `@canton/shared`.

### 10. Hardcoded Demo State
**Issue**: `queryWalletState()` in `db.ts` returns a hardcoded mock instead of reading from a configured source.
**Fix**: Either read from Daml ledger or from a configuration file.

---

## State Handling Debt

### 11. No React Query / SWR
**Issue**: Data fetching uses raw `fetch` in page components without caching, deduplication, or revalidation.
**Impact**: Dashboard doesn't auto-refresh, no optimistic updates, no loading state management.

### 12. Wallet State In-Memory Mock
**Issue**: `useWallet` hook returns hardcoded state, not actual blockchain state.
**Fix**: Real wallet connection with dynamic state.

### 13. No Optimistic UI
**Issue**: Execution approval requires waiting for server response.
**Fix**: Optimistic update on confirm button with rollback on failure.

### 14. Session State Not Persisted
**Issue**: No persistent session; demo reset wipes all state.
**Fix**: Session management for real usage.

---

## Testing Debt

### 15. No Integration Tests
**Issue**: No tests that cover API route → agent-core → DB full flow.
**Fix**: Add supertest-based integration tests.

### 16. No E2E Tests (Playwright configured but no specs)
**Issue**: `e2e/happy-path.spec.ts` exists but only has skeleton structure.
**Fix**: Write actual happy-path test.

### 17. Agent Core Tests Limited
**Issue**: Policy engine has tests, but agent orchestrator has no unit tests.
**Fix**: Add unit tests for `generatePlan`, `generateExplain`.

### 18. No Test Coverage Reporting
**Issue**: No coverage reporting configured.
**Fix**: Add coverage threshold to CI.

---

## Infrastructure Debt

### 19. No Environment Validation
**Issue**: Missing required env vars don't produce clear errors at startup.
**Fix**: Validate required vars on startup (e.g., `zod` env schema).

### 20. No Logging Framework
**Issue**: `console.log` used throughout for debugging.
**Fix**: Structured logging (e.g., `pino` or `winston`).

### 21. No Rate Limiting
**Issue**: API routes have no rate limiting.
**Fix**: Add `rate-limit` middleware to agent routes.

### 22. No Metrics/Telemetry
**Issue**: No observability into agent performance, error rates, policy decisions.
**Fix**: Add OpenTelemetry traces/metrics.

---

## Security Debt

### 23. No Authentication
**Issue**: All API routes are publicly accessible.
**Fix**: Add session-based auth or API key auth.

### 24. No CSRF Protection
**Issue**: No CSRF tokens on state-changing endpoints.
**Fix**: Next.js CSRF protection or SameSite cookies.

### 25. No Input Rate Limiting
**Issue**: Agent parse endpoint accepts unbounded text.
**Fix**: Rate limit + input length cap.

---

## Priority Order

| # | Debt Item | Severity | Fix Effort |
|---|-----------|----------|------------|
| 1 | Design system incomplete | High | Medium |
| 2 | No authentication | Critical | High |
| 3 | No integration tests | High | Medium |
| 4 | Type casting in agent-service | Low | Low |
| 5 | No React Query/SWR | Medium | Medium |
| 6 | Singleton PolicyEngine | Low | Low |
| 7 | No migration system | Medium | Medium |
| 8 | No environment validation | Medium | Low |
| 9 | Loading states missing | Medium | Low |
| 10 | Hardcoded demo wallet state | Medium | Medium |
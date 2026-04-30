# 24. What Is Needed Next

## Priority 0: Security Hardening (Before Any Production Use)

### 1. Add Authentication
**What**: Session-based auth or API key auth for all API routes.
**Why blocking**: Without auth, anyone can modify policies or trigger execution.
**Effort**: Medium

### 2. Add Rate Limiting
**What**: `rate-limit` middleware on agent parse/plan endpoints.
**Why**: Prevent cost attacks on LLM API budget.
**Effort**: Low

### 3. Audit Log Encryption
**What**: Encrypt audit log data at rest, or use a managed DB with encryption.
**Why**: Audit events contain wallet addresses and user inputs.
**Effort**: Medium

---

## Priority 1: Real Wallet Integration

### 4. Wallet Connection
**What**: Integrate WalletConnect or similar to connect a real wallet.
**Why**: Demo mode with hardcoded balance is not credible for production.
**Effort**: Medium

### 5. Daml Ledger Connection
**What**: Connect to Canton Daml ledger via JSON API.
**Why**: Canton-specific smart contract state lives on Daml.
**Effort**: High

### 6. Transaction Signing
**What**: Implement proper transaction signing flow with HSM/KMS.
**Why**: Without signing, no real on-chain execution is possible.
**Effort**: High

---

## Priority 2: Real Market Data

### 7. DeFi Protocol Integration
**What**: Connect to at least one real DeFi protocol (Aave, Compound, or Canton-specific).
**Why**: Seeded opportunities are stale and misrepresent the system's capability.
**Effort**: High

### 8. Price Oracle
**What**: Integrate Chainlink or Uniswap TWAP for price data.
**Why**: Accurate gas estimation and output calculation requires live prices.
**Effort**: Medium

### 9. Liquidity Validation
**What**: Check opportunity liquidity before execution recommendation.
**Why**: Prevent recommending illiquid strategies.
**Effort**: Low

---

## Priority 3: Architecture Improvements

### 10. Database Migration System
**What**: Add a migration runner that runs on startup.
**Why**: Schema changes currently require manual DB manipulation.
**Effort**: Low

### 11. Environment Validation
**What**: Validate required env vars at startup with clear errors.
**Why**: Missing API key produces silent fallback instead of clear error.
**Effort**: Low

### 12. Structured Logging
**What**: Replace console.log with a proper logger (pino).
**Why**: Production debugging and observability.
**Effort**: Low

### 13. React Query / SWR
**What**: Replace raw fetch with React Query for data fetching.
**Why**: Caching, deduplication, optimistic updates, loading states.
**Effort**: Medium

---

## Priority 4: Testing

### 14. Integration Tests
**What**: Add supertest-based API integration tests.
**Why**: No full-stack test coverage.
**Effort**: Medium

### 15. E2E Tests
**What**: Write actual Playwright happy-path spec.
**Why**: `e2e/happy-path.spec.ts` is a skeleton.
**Effort**: Low

### 16. Agent Orchestrator Tests
**What**: Unit tests for `generatePlan` and `generateExplain`.
**Why**: Core logic not covered by tests.
**Effort**: Medium

---

## Priority 5: UX Polish

### 17. Design System Completion
**What**: Implement remaining design tokens from DESIGN-lovable.md.
**Why**: Product still looks generic, not warm/trustworthy.
**Effort**: Medium

### 18. Loading Skeletons
**What**: Add skeleton loading components for dashboard cards.
**Why**: Remove layout shift and blank states.
**Effort**: Low

### 19. Error Recovery UI
**What**: Add retry buttons, exponential backoff, circuit breaker UI.
**Why**: Users stuck when requests fail.
**Effort**: Medium

---

## What NOT to Prioritize

- **Multi-hop plan execution**: Not supported by current architecture; design first
- **Multi-tenant support**: User model doesn't exist; design first
- **Mobile-first redesign**: Low priority for demo/prototype
- **Prompt versioning**: Nice to have but not blocking
- **LLM cost tracking**: Low priority for demo

---

## Quick Wins (Under 1 Day Each)

1. Add rate limiting middleware to agent routes
2. Add environment validation on startup
3. Add skeleton loading to dashboard
4. Wire up the existing `e2e/happy-path.spec.ts` skeleton
5. Add clear error messages when LLM API key is missing
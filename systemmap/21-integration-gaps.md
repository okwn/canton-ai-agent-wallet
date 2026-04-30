# 21. Integration Gaps

## Blockchain / Wallet Integration

### Gap 1: No Daml Ledger Connection
**Status**: NOT CONNECTED
**What exists**: `daml/` directory with Daml model, documentation in `docs/daml.md`
**What's missing**: No Daml JSON API client, no ledger connection, no contract query
**Impact**: Cannot read real on-chain wallet state
**Fix needed**: Daml JSON API client, ledger connection config, contract subscription

### Gap 2: No Real Wallet Signing
**Status**: NOT IMPLEMENTED
**What exists**: `lib/loop/adapters/server-signing.ts` (stub/skeleton)
**What's missing**: Actual signing key management, transaction construction, signature submission
**Impact**: Cannot execute real blockchain transactions
**Fix needed**: HSM or KMS integration, transaction signing flow, on-chain submission

### Gap 3: No Chain Provider
**Status**: NOT CONNECTED
**What exists**: Loop protocol config in `lib/loop/config.ts`
**What's missing**: Ethereum RPC provider connection (e.g., Infura, Alchemy)
**Impact**: No gas estimation, no balance queries, no tx status tracking
**Fix needed**: RPC provider URL, provider instance, gas estimation logic

---

## DeFi / Market Data Integration

### Gap 4: No Live DeFi Protocol Connection
**Status**: NOT CONNECTED
**What exists**: Seeded opportunities with hardcoded APR, risk, liquidity
**What's missing**: Integration with any lending/DEX protocol API
**Impact**: Opportunity data is stale and inaccurate; no real yield tracking
**Fix needed**: Protocol API integration (Aave, Compound, Uniswap, etc.) or indexer connection

### Gap 5: No Price Feed
**Status**: NOT CONNECTED
**What exists**: Static `microCCToDisplay` conversion helper
**What's missing**: Real-time price data for gas estimation, slippage calculation
**Impact**: Cannot accurately estimate output amounts or gas costs
**Fix needed**: Oracle integration (Chainlink, Uniswap TWAP, etc.)

### Gap 6: No Liquidity Validation
**Status**: NOT IMPLEMENTED
**What exists**: Opportunity.liquidityMicroCC is seeded static value
**What's missing**: Live liquidity check before execution
**Impact**: Plan might recommend an opportunity that's actually illiquid
**Fix needed**: Real-time liquidity queries from protocol

---

## Agent / LLM Integration

### Gap 7: LLM Fallback Not Evaluated by Default
**Status**: WORKS but not prominent
**What exists**: `fallbackParse()` always runs and always succeeds
**What's missing**: No clear UX indication when fallback is used vs LLM
**Impact**: User may not know if LLM actually processed their request
**Fix needed**: Explicit badge in plan response indicating parse method

### Gap 8: No Prompt Versioning
**Status**: Hardcoded SYSTEM_PROMPT in `agent.ts`
**What's missing**: Prompt version tracking, A/B testing, prompt registry
**Impact**: Hard to iterate on agent behavior safely
**Fix needed**: Prompt config in DB or config file with version history

### Gap 9: No LLM Cost Tracking
**Status**: No tracking
**What's missing**: Token usage logging, cost aggregation per user/tenant
**Impact**: Cannot monitor or optimize LLM spend
**Fix needed**: Token counter middleware, cost logging

---

## Data / Backend Integration

### Gap 10: No Real-Time Event Subscription
**Status**: Polling-based (audit events queried on demand)
**What exists**: `queryAuditEvents()` polls DB
**What's missing**: Real-time updates pushed to frontend (WebSocket/SSE)
**Impact**: Activity feed requires manual refresh; dashboard doesn't auto-update
**Fix needed**: WebSocket server or SSE endpoint for real-time events

### Gap 11: No User/Tenant Model
**Status**: Single-demo-mode (no multi-user)
**What exists**: Hardcoded wallet address, no user records
**What's missing**: User accounts, tenant isolation, session management
**Impact**: Cannot support multi-user; no personalization
**Fix needed**: User table, auth layer, tenant-scoped data

### Gap 12: No Data Export/Import
**Status**: No backup mechanism
**What's missing**: Export audit log, policy config as JSON, full DB backup
**Impact**: Cannot migrate data, audit for compliance
**Fix needed**: Export endpoints, import/restore flow

---

## UI/UX Integration

### Gap 13: No Error Recovery UX
**Status**: Errors show inline or toast, no retry flows
**What's missing**: Retry buttons, exponential backoff, circuit breaker UI
**Impact**: User stuck if a request fails
**Fix needed**: Retry UI components, error boundary with recovery actions

### Gap 14: No Mobile Responsive Optimization
**Status**: Sidebar layout on desktop, basic mobile view
**What's missing**: Full responsive optimization for tablet/mobile
**Impact**: Poor mobile UX for on-the-go monitoring
**Fix needed**: Mobile-first responsive design pass

---

## Summary Table

| Gap | Area | Severity | Fix Effort |
|-----|------|----------|------------|
| No Daml ledger connection | Blockchain | Critical | High |
| No real wallet signing | Blockchain | Critical | High |
| No authentication | Security | Critical | High |
| No live DeFi connection | Market Data | High | High |
| No real-time events | Data | High | Medium |
| No user/tenant model | Backend | High | Medium |
| No price feed | Market Data | Medium | Medium |
| No LLM cost tracking | Agent | Low | Low |
| No prompt versioning | Agent | Medium | Medium |
| No error recovery UX | UI | Medium | Medium |
# 18. Dashboard Real / Demo / Mock Map

## Overview

The dashboard displays data from multiple sources with different levels of realism. This document clarifies which parts are real, simulated, or mocked.

---

## Real vs Simulated vs Mocked

### Definition

| Term | Meaning |
|------|---------|
| **REAL** | Production-ready, server-side logic, actual data |
| **SIMULATED** | Server-side logic is real, data is seeded/demo |
| **MOCKED** | Client-side fake data, no server interaction |

---

## Dashboard Section Analysis

### 1. Dashboard Header

| Aspect | Status | Details |
|--------|--------|---------|
| User name | **REAL** | From auth session (AuthProvider) |
| Execution mode badge | **SIMULATED** | Always 'DEMO' in current implementation |

**Reality**: The name comes from the actual auth session. The execution mode is hardcoded to DEMO because we don't have live wallet integration yet.

---

### 2. Demo Mode Banner

| Aspect | Status | Details |
|--------|--------|---------|
| Banner visibility | **MOCKED** | Shown based on hardcoded `executionMode === 'DEMO'` |
| Banner message | **REAL** | Accurate description of demo limitations |

**Reality**: Banner appears when `executionMode` is 'DEMO'. This is hardcoded and should be driven by actual wallet connection state in production.

---

### 3. Quick Access CTA

| Aspect | Status | Details |
|--------|--------|---------|
| Links | **REAL** | Link to actual routes |

**Reality**: These are straightforward navigation links.

---

### 4. Wallet Overview Card

| Aspect | Status | Details |
|--------|--------|---------|
| Wallet address | **SIMULATED** | `0xDEMO_A1B2C3D4E5F6` - mock address |
| Balance | **SIMULATED** | 500M CC - hardcoded demo value |
| Daily usage | **SIMULATED** | From `MAX_DAILY` policy usage |
| Daily limit | **SIMULATED** | From `MAX_DAILY` policy value |
| SIMULATED badge | **REAL** | Correctly indicates simulated state |

**Reality**: Wallet data should come from:
- Real: Loop SDK when `NEXT_PUBLIC_LOOP_ENABLED=true`
- Simulated: Demo values when Loop SDK not connected

**Current implementation**: Always shows demo values.

---

### 5. Policy Status Card

| Aspect | Status | Details |
|--------|--------|---------|
| Policy engine | **REAL** | Server-side deterministic enforcement |
| Policy list | **SIMULATED** | Seeded demo policies from API |
| ON/OFF status | **REAL** | Actual `enabled` flag from policies |
| Usage values | **SIMULATED** | From seeded demo usage data |

**What users can do**:
- Toggle policies ON/OFF → **REAL** (persisted to DB)
- Create new policies → **REAL** (persisted to DB)
- Delete policies → **REAL** (removed from DB)

**What users see**:
- Policy rules → **SIMULATED** (seeded demo rules)
- Usage tracking → **SIMULATED** (seeded demo usage)

---

### 6. Recent Activity Card

| Aspect | Status | Details |
|--------|--------|---------|
| Activity events | **SIMULATED** | Seeded demo events |
| Event types | **REAL** | Actual event type strings |
| Timestamps | **SIMULATED** | Seeded demo timestamps |
| SIM badge | **REAL** | Correctly indicates which events are simulated |

**Reality**: In production:
- Real events would be recorded when users execute commands
- Events would persist across sessions
- Timestamps would be actual event times

**Current implementation**: Demo events are seeded on first load.

---

### 7. Opportunity Card

| Aspect | Status | Details |
|--------|--------|---------|
| Strategy name | **SIMULATED** | Seeded demo strategies |
| Provider name | **SIMULATED** | Seeded demo providers |
| APR | **SIMULATED** | Seeded demo APR values |
| Risk level | **SIMULATED** | Seeded demo risk levels |
| SIMULATED badge | **REAL** | Correctly indicates simulated state |

**Reality**: In production:
- Real yield strategies would come from DeFi protocol integrations
- APR would be real-time from protocol data
- Risk levels would be calculated from actual protocol risk metrics

**Current implementation**: Opportunities are seeded demo data.

---

## What Is Actually Real

### Working, Production-Ready
1. **Auth flow** - Login, register, logout, session management
2. **Middleware protection** - Route guarding works correctly
3. **Policy engine** - Server-side enforcement is real and deterministic
4. **Intent parser** - LLM-based parsing with rule-based fallback
5. **Policy CRUD** - Creating, editing, deleting policies persists to DB
6. **Nav routing** - All navigation links work correctly

### Technically Real But With Demo Data
1. **Policy display** - Shows policies from DB, but seeded demo policies
2. **Activity events** - Shows events from DB, but seeded demo events
3. **Opportunities** - Shows opportunities from API, but seeded demo data

### Mocked / Not Implemented
1. **Wallet balance** - Always shows 500M CC demo balance
2. **Wallet address** - Always shows `0xDEMO_...` address
3. **Execution mode** - Always shows DEMO badge
4. **Live wallet connection** - Loop SDK integration not complete

---

## Honest Framing for Users

When users see the dashboard, they should understand:

1. **Policy engine is real** - "Your safety rules work exactly as they would in production"

2. **Everything else is demo** - "This dashboard shows how the product works. The wallet balance and opportunities are simulated for demonstration."

3. **What becomes real when connected** - "Connect a real wallet to see actual balances and real yield opportunities"

---

## How to Enable Real Data

### For Wallet Integration
```bash
NEXT_PUBLIC_LOOP_ENABLED=true
# Requires Loop browser extension and wallet setup
```

### For Real Opportunities
- Implement actual DeFi protocol integrations
- Replace `api/opportunities` seed data with real API calls

### For Real Policy Data
- Clear seeded policies from DB
- Let users create their own from scratch

---

## Security Note

The policy engine is **actually enforced server-side** - this is not simulated. Even if a user tries to bypass the UI, the server will reject transactions that violate policies.

This is the core trust property of Marcus: policies are hard constraints, not UI suggestions.

---

## Files and Their States

| File | Real | Simulated | Mocked |
|------|------|-----------|--------|
| `middleware.ts` | ✅ Auth checks | | |
| `AuthProvider.tsx` | ✅ Session management | | |
| `DashboardComponents.tsx` | ✅ Theme colors | | |
| `dashboard/page.tsx` | ✅ Component logic | | |
| `api/policies/route.ts` | ✅ Policy CRUD | | |
| `api/audit/route.ts` | ✅ Event recording | | |
| `api/dashboard/route.ts` | | ✅ Returns seeded data | |
| `api/opportunities/route.ts` | | ✅ Returns seeded data | |
| `lib/agent-service.ts` | | ✅ Demo data seeding | |
| `lib/loop/client.ts` | | | ✅ Demo mode only |

---

## Next Steps for Production

To move from demo to production:

1. **Wallet Integration**
   - Complete Loop SDK integration
   - Replace hardcoded address/balance
   - Show actual wallet balance when connected

2. **Opportunities**
   - Integrate real DeFi protocols
   - Replace seed data with live data
   - Add protocol risk calculations

3. **Activity**
   - Real event recording from actual agent executions
   - Persist to user-specific audit log

4. **Execution**
   - Enable `NEXT_PUBLIC_LOOP_ENABLED`
   - Connect to real custody/signing infrastructure

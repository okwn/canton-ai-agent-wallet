# 19. Demo Flow Map

## Demo Scenario

The system includes a complete demo mode with seeded data, simulated execution, and a reset capability.

## Demo Setup (on startup)

```
seedOpportunities() is called from db.ts init
→ Clears opportunities table
→ Inserts 10 seeded opportunities across 3 providers
```

## Seeded Providers

- `froburn` — Lending protocol
- `lace` — Liquidity protocol
- `cantonswap` — DEX protocol

## Seeded Opportunity Example

```typescript
{
  id: "opp-froburn-lending-usdc",
  provider: "froburn",
  providerName: "Froburn Lending",
  strategyName: "USDC Lending",
  aprPercent: 4.25,
  aprBps: 425,
  riskLevel: "LOW",
  executionSupport: "simulated",
  isWhitelisted: true,
  liquidityMicroCC: 1_000_000_000_000,
  estimatedExecutionCostMicroCC: 5000,
  minAmountMicroCC: 100_000,
  slippageToleranceBps: 30,
  expiry: null
}
```

## Demo Wallet

- Address: `0xDemoWallet00000000000000000000001`
- Balance: 500,000,000 CC (500M, hardcoded in `queryWalletState()`)
- `isDemo: true`, `isConnected: true`

## Demo Flow Steps

### 1. Navigate to `/agent`
User sees the agent terminal with command input.

### 2. Enter command
Example: "Deploy 1000 CC to a low-risk lending strategy"

### 3. Parse Intent
- `/api/agent/parse` called
- LLM or fallback extracts: action=DEPOSIT, amount=1_000_000_000 microCC, riskTolerance=LOW

### 4. Policy Check
- `/api/agent/plan` generates plan
- Policy engine evaluates: balance OK, within per-trade limit, within daily limit, below approval threshold
- Result: APPROVED

### 5. Show Plan
UI displays:
- Interpreted intent summary
- Shortlisted opportunities (filtered by LOW risk)
- Recommended plan (top opportunity)
- Policy verdict (APPROVED)
- Disclaimer: "Simulated preview — no real transaction"

### 6. User Approves
User clicks "Confirm Execution"

### 7. Execution (Simulated)
- `executeApprovedIntent()` called
- Receipt generated with `simulationOnly: true`
- `simulatedTxHash: "0xSIM..."` (not a real hash)
- `status: SIMULATED`
- Execution logged to `execution_attempts` and `audit_events`

### 8. Activity Feed
- `/activity` page shows EXECUTION_COMPLETED event
- Type badge: SIMULATED
- Transaction hash: `0xSIM...`

## Demo Reset

`POST /api/demo/reset`:
1. Deletes all audit events
2. Resets execution attempts
3. Resets daily usage on MAX_DAILY policy
4. Re-seeds opportunities
5. Returns `{ ok: true, message: "..." }`

## What Is Real in Demo Mode

- Intent parsing (LLM or fallback) — REAL
- Policy engine evaluation — REAL
- Database writes (audit, attempts, policy updates) — REAL
- Plan generation logic — REAL

## What Is Simulated in Demo Mode

- Wallet balance — not real blockchain
- Opportunity data — seeded, not live DeFi
- Execution receipts — fake tx hash, no on-chain effect
- Gas estimates — static values
- Daily usage accumulation — real DB write but no real financial impact

## Simulated Flag in UI

The `isSimulated` flag is propagated through:
- AgentPlanResponse
- ExecutionReceipt
- AuditEvent.payload
- Activity page display (SIMULATED badge on events)
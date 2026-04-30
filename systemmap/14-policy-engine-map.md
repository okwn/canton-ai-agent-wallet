# 14. Policy Engine Map

## Overview

The policy engine (`packages/agent-core/src/policy-engine.ts`) is a deterministic 11-step evaluation pipeline. It is **production-real** — the logic is fully functional and correctly evaluates intents against configured rules.

## Policy Types

| Type | Policy Class | Fields | Default |
|------|-------------|--------|---------|
| `MAX_PER_TRADE` | BudgetPolicy | `valueMicroCC: number` | 5,000,000 CC (5 CC) |
| `MAX_DAILY` | ExecutionPolicy | `valueMicroCC`, `currentUsageMicroCC`, `windowStart` | 50,000,000 CC (50 CC) |
| `APPROVAL_THRESHOLD` | ApprovalPolicy | `valueMicroCC: number` | 1,000,000 CC (1 CC) |
| `STRATEGY_DENYLIST` | ProviderListPolicy | `providerIds: string[]` | none |
| `STRATEGY_ALLOWLIST` | ProviderListPolicy | `providerIds: string[]` | none |
| `ASSET_ALLOWLIST` | AssetAllowlistPolicy | `assetSymbols: string[]` | none |
| `MAX_SLIPPAGE` | MaxSlippagePolicy | `valueBps: number` (basis points) | none (skip check) |
| `SIMULATION_ONLY` | SimulationOnlyPolicy | (flag only) | `enabled: false` |
| `EXECUTION_MODE` | ExecutionModePolicy | `value: 'disabled' | 'approval_required' | 'auto_execute'` | `approval_required` |

## Evaluation Pipeline

```
evaluate(intent, wallet) → PolicyEvaluationResult

Step 1: VALIDITY_CHECK
  • Parse intent with Zod schema
  • Reject if action is UNKNOWN or missing
  → FAIL: intent invalid

Step 2: EXECUTION_MODE_CHECK
  • If EXECUTION_MODE policy exists and value === 'disabled'
  → FAIL: execution disabled

Step 3: SIMULATION_MODE_CHECK
  • If SIMULATION_ONLY policy active AND intent.simulationOnly === false
  → WARN: real execution blocked by sim-only policy

Step 4: DENYLIST_CHECK (if providerFilter present)
  • Any requested provider is on denylist
  → FAIL: provider blocked

Step 5: ALLOWLIST_CHECK (if providerFilter present)
  • Any requested provider not on allowlist
  → FAIL: provider not permitted

Step 6: ASSET_ALLOWLIST_CHECK (if assetFilter present)
  • Any requested asset not on allowlist
  → FAIL: asset not permitted

Step 7: SLIPPAGE_CHECK (if maxSlippageBps set)
  • intent.maxSlippageBps > policy.valueBps
  → FAIL: slippage exceeds limit

Step 8: BALANCE_CHECK (if amountMicroCC set)
  • intent.amountMicroCC > wallet.balances.CC.available
  → FAIL: insufficient balance

Step 9: BUDGET_CAP_CHECK (if amountMicroCC set)
  • intent.amountMicroCC > MAX_PER_TRADE policy
  → FAIL: per-trade limit exceeded

Step 10: DAILY_LIMIT_CHECK (if amountMicroCC set)
  • currentUsage + intent.amountMicroCC > MAX_DAILY policy
  → FAIL: daily limit exceeded

Step 11: APPROVAL_THRESHOLD_CHECK (if amountMicroCC set)
  • intent.amountMicroCC > APPROVAL_THRESHOLD policy
  → REQUIRES_APPROVAL: amount above threshold

All checks PASSED → APPROVED
Any FAIL → DENIED (short-circuit)
```

## Decision Outcomes

| Decision | Meaning | Next Action |
|----------|---------|-------------|
| `APPROVED` | All checks passed, can execute | User can confirm execution |
| `DENIED` | A check failed, blocked | User cannot execute |
| `REQUIRES_APPROVAL` | Amount above threshold | User must explicitly approve |

## Key Implementation Details

- **Priority ordering**: Policies are sorted by `priority` field (lower = evaluated first), default priority is 99
- **Short-circuit**: Evaluation stops on first FAIL
- **WARN vs FAIL**: Simulation mode check produces WARN (doesn't block) but prevents real execution
- **Daily window**: Resets after 24 hours; `windowStart` tracks the current window
- **MicroCC units**: All amounts in micro-CC (1 CC = 1,000,000 microCC)

## What is NOT Covered by Policy Engine

- **Slippage tolerance per opportunity**: The engine checks intent-specified slippage against a MAX_SLIPPAGE policy, but does not validate against the opportunity's own `slippageToleranceBps`
- **Liquidity checks**: No validation that the opportunity has sufficient liquidity for the requested amount
- **Provider aliveness**: No check that a provider is operational — only denylist/allowlist filtering
- **Price impact**: No price impact estimation or validation
- **Smart contract risk**: No contract vulnerability scanning or risk scoring
- **Multi-step execution**: Policy engine evaluates a single intent; multi-hop plans are not modeled

## Database Schema (Policies)

Policies are stored in SQLite with type-specific columns:

```sql
policies: id, type, name, enabled, priority, value,
         currentUsageMicroCC, windowStart,
         providerIds (JSON), assetSymbols (JSON),
         valueBps, createdAt, updatedAt
```

## API Surface

| Endpoint | Operation | Description |
|----------|-----------|-------------|
| `GET /api/policies` | Read | List all policies |
| `POST /api/policies` | Write | Create new policy |
| `PUT /api/policies/:id` | Write | Update existing policy |
| `DELETE /api/policies/:id` | Write | Delete policy |
| `POST /api/agent/policy-check` | Eval | Standalone policy evaluation |

## Testing

Policy engine has unit tests in `packages/agent-core/src/__tests__/policy-engine.test.ts` covering:
- Valid intent passes
- Invalid action is denied
- Balance check fails when insufficient
- Daily limit accumulates correctly
- Approval threshold triggers correctly
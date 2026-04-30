# Architecture: One-Pager

## System Overview

```
User (Browser)
  │
  │  Types a command: "Find yield up to 50 CC"
  ▼
┌─────────────────────────────────────────────────────────┐
│  Next.js API Route: POST /api/agent/plan                 │
│                                                         │
│  1. Intent Parser                                       │
│     ├─ LLM path (when LLM_API_KEY is set)              │
│     └─ Rule-based fallback (always available)           │
│        → ParsedExecutionIntent                          │
│                                                         │
│  2. Policy Engine (11 checks)                          │
│     ├─ MAX_PER_TRADE     ── blocks excessive spend       │
│     ├─ MAX_DAILY       ── 24h rolling window          │
│     ├─ APPROVAL_THRESHOLD ── flags for approval         │
│     ├─ STRATEGY_DENYLIST ── blocks listed providers    │
│     ├─ STRATEGY_ALLOWLIST ── restricts to list         │
│     ├─ ASSET_ALLOWLIST  ── restricts assets            │
│     ├─ MAX_SLIPPAGE     ── checks slippage tolerance    │
│     ├─ SIMULATION_ONLY   ── forces simulation mode      │
│     └─ EXECUTION_MODE   ── approval required gate       │
│        → PolicyEvaluationResult (APPROVED / DENIED /     │
│                                    REQUIRES_APPROVAL)  │
│                                                         │
│  3. Execution Adapter Resolution                         │
│     ├─ LoopSupportedExecutionAdapter  (REAL)             │
│     ├─ DemoExecutionAdapter         (SIMULATED)         │
│     └─ UnsupportedExecutionAdapter   (UNSUPPORTED)      │
│        → PreparedExecution → ExecutionReceipt            │
└─────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│  Persistence (sql.js / SQLite)                         │
│  ┌──────────┐  ┌────────────────┐  ┌─────────────────┐ │
│  │ Policies │  │ Audit Events  │  │ Opportunities  │ │
│  │ (9 seed) │  │ (append-only) │  │ (7 seed)      │ │
│  └──────────┘  └────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Key Design Decisions

### 1. Policy engine is always the gatekeeper
The AI generates a plan; the policy engine approves or denies it. The AI never directly calls an executor. This is not a safety convention — it's enforced in code.

### 2. Execution adapters are a strategy pattern
```
resolveAdapter(opportunity, wallet):
  if real_opportunity AND live_wallet AND supported_provider:
    → LoopSupportedExecutionAdapter (REAL)
  elif simulation_allowed:
    → DemoExecutionAdapter (SIMULATED)
  else:
    → UnsupportedExecutionAdapter (UNSUPPORTED — honest)
```
Each adapter returns a typed `ExecutionResult` with a clear status. No adapter ever returns fake data.

### 3. LLM is an optional parser, not an authority
LLM converts natural language → structured intent. The policy engine evaluates the intent. If LLM isn't configured, rule-based parsing takes over seamlessly.

### 4. Daml models the consent lifecycle formally
```
UserPolicy   ── defines spending rules
AgentInstruction ── agent proposes an action
ExecutionApproval ── user approves
ExecutionReceipt ── immutable record of what happened
AuditEntry ── append-only log
```
This maps directly to the TypeScript execution pipeline.

## Data Flow for a Single Execution

```
User command
    │
    ▼
POST /api/agent/plan
    │
    ▼
parseIntent("Find yield up to 50 CC")
    │
    ▼
policyEngine.evaluate(intent, wallet)
    │
    ├── PASS → resolveAdapter → DemoExecutionAdapter.prepareExecution
    │                                      │
    │                                      ▼
    │                              DemoExecutionAdapter.execute()
    │                                      │
    │                                      ▼
    │                              ExecutionReceipt { status: SIMULATED }
    │
    └── FAIL → ExecutionReceipt { status: BLOCKED, blockedByPolicy: "..." }
```

## Package Responsibilities

| Package | Responsibility |
|---|---|
| `apps/web` | UI (Next.js App Router), API routes, SQLite persistence, Loop SDK client |
| `@canton/agent-core` | Policy engine, intent parser, LLM service, execution adapters |
| `@canton/shared` | Zod schemas for all shared types |
| `daml/agent-wallet` | Formal Daml templates for production policy enforcement |

## Security Properties

1. **No direct AI execution** — AI proposes, policy decides, user approves
2. **No policy bypass** — policy engine is server-side and deterministic
3. **No fake transactions** — `UnsupportedExecutionAdapter` always returns honest UNSUPPORTED
4. **Append-only audit** — audit log cannot be modified after insert
5. **Demo is bounded** — demo mode cannot accidentally trigger real on-chain activity

# Canton AI Agent Wallet — Architecture

## 1. Folder Structure

```
canton-agent-wallet/
├── apps/
│   └── web/                      # Next.js App Router frontend
│       ├── app/                  # App Router pages
│       │   ├── (main)/           # Authenticated layout group
│       │   │   ├── dashboard/
│       │   │   ├── agent/
│       │   │   ├── policies/
│       │   │   ├── opportunities/
│       │   │   └── activity/
│       │   ├── api/
│       │   │   ├── health/
│       │   │   └── agent/
│       │   │       ├── parse/
│       │   │       └── policy-check/
│       │   └── layout.tsx
│       ├── components/ui/       # Reusable UI components
│       ├── lib/                  # Utilities (db, utils)
│       └── data/                # SQLite database (gitignored)
├── packages/
│   ├── shared/                  # Shared TypeScript types & constants
│   │   └── src/
│   │       ├── types.ts
│   │       └── constants.ts
│   └── agent-core/              # Core business logic
│       └── src/
│           ├── intent-parser.ts  # NL → structured Intent
│           ├── policy-engine.ts  # Rule enforcement
│           └── types.ts
├── daml/
│   └── agent-wallet/            # Daml smart contract model
│       ├── model/
│       │   ├── Policy.daml
│       │   └── AuditLog.daml
│       └── daml.yaml
├── scripts/
│   ├── dev-check.js             # Environment verification
│   └── db-migrate.js            # Database bootstrap
└── docs/
```

## 2. Runtime Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE (Next.js)                   │
│   Natural language input: "Find me the cheapest yield up to 50 CC"
└───────────────────────────────┬──────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                      API Route: /api/agent/parse                  │
│   Intent Parser (packages/agent-core)                            │
│   Parses NL → structured Intent { action, amount, limits }       │
│   V1: Rule-based parser with regex + keyword extraction          │
└───────────────────────────────┬──────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                    API Route: /api/agent/policy-check             │
│                      Policy Engine (packages/agent-core)          │
│   Evaluates Intent against user-defined safety rules:            │
│   • Budget caps (max spend per trade, daily limit)               │
│   • Approval thresholds (require confirmation above X CC)        │
│   • Strategy whitelist enforcement                               │
│   Output: APPROVED | DENIED | REQUIRES_APPROVAL                  │
└───────────────────────────────┬──────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                       Execution Engine                           │
│   Routes approved Intents to the correct adapter:               │
│   • yield-search  → MockMarketAdapter (simulated)                │
│   • token-swap     → LoopWalletAdapter (demo)                    │
│   • balance-check  → LoopWalletAdapter (demo)                   │
└───────────────────────────────┬──────────────────────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐
│  Loop Wallet    │  │  Mock Market    │  │  SQLite DB              │
│  ADAPTER        │  │  ADAPTER        │  │  (policies, audit log)  │
│  (DEMO)         │  │  (SIMULATED)    │  │  (REAL)                 │
└─────────────────┘  └─────────────────┘  └─────────────────────────┘
```

## 3. Data Flow

```
1. User input
   "Find me the cheapest yield up to 50 CC and buy"

2. Intent Parser (agent-core)
   → extracts: { action: "FIND_BEST_YIELD", maxAmount: 50_000_000, confidence: 0.85 }

3. Policy Engine (agent-core)
   → checks:
     • maxAmount (50 CC) > maxPerTrade (20 CC)? → DENIED
     • or: maxAmount (50 CC) > approvalThreshold (10 CC)? → REQUIRES_APPROVAL
   → result: REQUIRES_APPROVAL

4. UI shows approval modal: "This will spend 50 CC (your limit is 20 CC). Confirm?"

5. User approves

6. Execution Engine → MockMarketAdapter
   → returns: { protocol: "Froburn", apy: 4.2%, tvl: 1.25M CC }

7. Execution log written to SQLite audit_log table
```

## 4. Loop Integration Path

```
Loop SDK provides:
  • wallet.connect()      — connect user wallet
  • wallet.getBalance()    — query CC balance
  • wallet.signAndSend(tx) — submit signed transaction

V1 Status:
  • SDK installed (@loop/sdk) ✓
  • Demo mode active (no live wallet in hackathon env)
  • Adapter pattern allows real SDK swap-in without core changes

Adapter: apps/web/lib/adapters/loop-wallet.ts
  - connect(): Promise<WalletConnection>
  - getBalance(): Promise<number>
  - executeSwap(params: SwapParams): Promise<ExecutionReceipt>
  - isLive: boolean — toggled by FEATURE_LIVE_WALLET env var
```

## 5. Daml Role

```
Daml is used for:
  • Digital Asset smart contract modeling (tokens, offers)
  • Agreement between agent and user on policy rules
  • Audit trail of all agent actions (append-only log)

V1 Status:
  • Daml model defined in daml/agent-wallet/model/
  • NOT integrated in V1 demo — adapter is a stub
  • daml/agent-wallet/model/Policy.daml defines UserPolicy template
  • daml/agent-wallet/model/AuditLog.daml defines AuditEntry template

Integration path (V2):
  1. Deploy Daml model to Canton ledger
  2. Replace localStorage policy reads with Daml contract queries
  3. Replace SQLite audit log with Daml AuditEntry contracts
```

## 6. Database Schema (SQLite)

```sql
policies       — user safety rules (max per trade, approval threshold, etc.)
audit_log      — immutable record of all intent parsing and execution
strategies     — approved strategy whitelist
opportunities  — cached market opportunities
```

## 7. Adapter Interface

```typescript
interface IAdapter<TInput, TOutput> {
  name: string;
  isLive: boolean;
  execute(input: TInput): Promise<TOutput>;
  healthCheck(): Promise<boolean>;
}
```

All external calls go through typed adapters. Core logic never knows if it's calling live or simulated systems.

## 8. Security Boundaries

```
┌────────────────────────────────────────────────────────────┐
│  USER SPACE                                                 │
│  • Natural language commands (untrusted input)            │
│  • Policy configuration (user-defined rules)              │
└──────────────────────┬─────────────────────────────────────┘
                       │  Intent object (validated)
                       ▼
┌────────────────────────────────────────────────────────────┐
│  POLICY ENGINE (trusted boundary)                          │
│  • Never executes without policy check                     │
│  • Hard limits cannot be overridden by NL input            │
│  • Approval gating for high-value actions                  │
└──────────────────────┬─────────────────────────────────────┘
                       │  Approved Intent
                       ▼
┌────────────────────────────────────────────────────────────┐
│  EXECUTION ENGINE                                          │
│  • Adapter routing only                                    │
│  • No business logic here                                  │
│  • Logs every execution attempt to SQLite                 │
└────────────────────────────────────────────────────────────┘
```

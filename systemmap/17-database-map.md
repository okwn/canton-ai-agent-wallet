# 17. Database Map

## Technology

SQLite via `better-sqlite3`. DB file: `.data/canton.db` (gitignored).

## Schema

```sql
CREATE TABLE policies (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  priority INTEGER,
  value TEXT,
  currentUsageMicroCC INTEGER DEFAULT 0,
  windowStart TEXT,
  providerIds TEXT,        -- JSON array
  assetSymbols TEXT,        -- JSON array
  valueBps INTEGER,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  eventType TEXT NOT NULL,
  walletAddress TEXT,
  intentId TEXT,
  attemptId TEXT,
  payload TEXT,            -- JSON object
  simulated INTEGER NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE opportunities (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  providerName TEXT NOT NULL,
  strategyName TEXT NOT NULL,
  aprPercent REAL NOT NULL,
  aprBps INTEGER NOT NULL,
  riskLevel TEXT NOT NULL,
  executionSupport TEXT NOT NULL,
  isWhitelisted INTEGER NOT NULL DEFAULT 1,
  liquidityMicroCC INTEGER NOT NULL,
  estimatedExecutionCostMicroCC INTEGER NOT NULL,
  minAmountMicroCC INTEGER NOT NULL,
  slippageToleranceBps INTEGER NOT NULL,
  expiry TEXT,
  createdAt TEXT NOT NULL
);

CREATE TABLE execution_attempts (
  id TEXT PRIMARY KEY,
  intentId TEXT NOT NULL,
  planId TEXT,
  status TEXT NOT NULL,
  stepsTotal INTEGER NOT NULL DEFAULT 1,
  stepsCompleted INTEGER DEFAULT 0,
  completedAt TEXT
);
```

## Tables Summary

| Table | Purpose | Real Data? |
|-------|---------|------------|
| `policies` | User-configured risk rules | REAL — CRUD fully functional |
| `audit_events` | Append-only event log | REAL — all events logged |
| `opportunities` | Yield strategies | SEEDED — static data on startup |
| `execution_attempts` | Execution tracking | REAL — logged on each attempt |

## Operations (db.ts)

| Function | Table | Operations |
|----------|-------|-----------|
| `queryPolicies()` | policies | SELECT all |
| `queryPolicy(id)` | policies | SELECT one |
| `insertPolicy()` | policies | INSERT |
| `updatePolicy(id, fields)` | policies | UPDATE |
| `deletePolicy(id)` | policies | DELETE |
| `queryAuditEvents(limit?)` | audit_events | SELECT ordered by createdAt DESC |
| `insertAuditEvent()` | audit_events | INSERT |
| `queryOpportunities()` | opportunities | SELECT all |
| `insertExecutionAttempt()` | execution_attempts | INSERT |
| `updateExecutionAttempt(id, fields)` | execution_attempts | UPDATE |
| `queryWalletState()` | — (in-memory mock) | Returns hardcoded demo wallet |
| `seedOpportunities()` | opportunities | INSERT all seed data (idempotent) |

## Seeding

On app startup, `seedOpportunities()` is called to populate the opportunities table with seeded data. Known providers: `froburn`, `lace`, `cantonswap`.

## Indexes

No explicit indexes defined. For the demo scale this is fine, but production would need:
- `audit_events(eventType, createdAt)`
- `audit_events(intentId)`
- `execution_attempts(intentId)`

## Limitations

- **No migration system**: Schema changes require manual DB wipe
- **No backup**: No export/import functionality
- **No concurrent write safety**: `better-sqlite3` is single-threaded; concurrent API routes could cause issues under load
- **Wallet state is in-memory mock**: `queryWalletState()` returns hardcoded values, not real blockchain state
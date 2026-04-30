# Demo vs Mock vs Real

## Classification Definitions

| Classification | Definition |
|----------------|------------|
| **Production-Like** | Functional code path that mirrors production behavior, but uses demo/seeded data |
| **Mock-Only** | Stubbed implementations or hardcoded returns, no actual logic |
| **Fully Real** | Connected to actual services with real data |

---

## API Routes

### `/api/agent/parse`
| Aspect | Classification | Notes |
|--------|----------------|-------|
| NLP Parsing | **Production-Like** | Uses LLM API when configured |
| Fallback Parser | **Production-Like** | Rule-based fallback always works |
| Intent Extraction | **Production-Like** | Returns structured intent object |

**Data Flow**: User input → LLM/Rule Parser → Intent object

---

### `/api/agent/plan`
| Aspect | Classification | Notes |
|--------|----------------|-------|
| Plan Generation | **Production-Like** | Uses LLM to generate plan steps |
| Step Validation | **Production-Like** | Each step validated against policies |
| Risk Assessment | **Production-Like** | Risk level calculated from parameters |

**Data Flow**: Intent → LLM Plan → Policy Validation → Plan Response

---

### `/api/agent/policy-check`
| Aspect | Classification | Notes |
|--------|----------------|-------|
| Policy Engine | **Fully Real** | Deterministic evaluation logic |
| Rule Checking | **Fully Real** | Actual policy comparison logic |
| Usage Tracking | **Fully Real** | Updates policy usage in DB |

**Data Flow**: Action → Policy Engine → Pass/Fail + Usage Update

---

### `/api/dashboard`
| Aspect | Classification | Notes |
|--------|----------------|-------|
| Aggregated Data | **Production-Like** | Reads from actual database |
| Policy Stats | **Production-Like** | Real aggregation logic |
| Activity Feed | **Production-Like** | Real audit log data |

**Data Flow**: DB Queries → Aggregation → Dashboard Response

---

### `/api/opportunities`
| Aspect | Classification | Notes |
|--------|----------------|-------|
| Data Source | **Mock-Only** | Seeded static data |
| APR Calculation | **Mock-Only** | Hardcoded values |
| Risk Levels | **Mock-Only** | Static assignments |

**Data Flow**: Static JSON → API Response (no external calls)

---

### `/api/policies`
| Aspect | Classification | Notes |
|--------|----------------|-------|
| CRUD Operations | **Fully Real** | Actual database operations |
| Validation | **Fully Real** | Policy-specific validation rules |
| Persistence | **Fully Real** | SQLite database |

**Data Flow**: User Input → Validation → SQLite → Response

---

### `/api/audit`
| Aspect | Classification | Notes |
|--------|----------------|-------|
| Event Logging | **Fully Real** | Appends to audit log |
| Event Retrieval | **Fully Real** | Queries actual audit table |
| Filtering | **Fully Real** | Supports type/date filtering |

**Data Flow**: Any Action → Audit Log → Query API

---

## Frontend Components

### Agent Terminal (`/agent`)
| Component | Classification | Notes |
|------------|----------------|-------|
| Input Form | **Production-Like** | Functional UI |
| Parse Display | **Production-Like** | Shows parsed intent |
| Plan Display | **Production-Like** | Shows generated plan |
| Approval Flow | **Production-Like** | Buttons wired to API |
| Execution | **Mock-Only** | Logs only, no actual tx |

### Dashboard (`/dashboard`)
| Component | Classification | Notes |
|-----------|----------------|-------|
| Stats Cards | **Production-Like** | Real data aggregation |
| Opportunity List | **Mock-Only** | Static seeded data |
| Activity Feed | **Production-Like** | Real audit log |
| Capability Badges | **Production-Like** | Hardcoded but accurate |

### Wallet Page (`/wallet`)
| Component | Classification | Notes |
|-----------|----------------|-------|
| Balance Display | **Mock-Only** | Hardcoded 500M CC |
| Holdings | **Mock-Only** | Static demo data |
| Active Contracts | **Mock-Only** | Empty or static |
| Gas Estimates | **Mock-Only** | Static estimates |

---

## Data Sources

### SQLite Database
| Table | Classification | Notes |
|-------|----------------|-------|
| policies | **Fully Real** | User-configured policies |
| audit_events | **Fully Real** | Append-only event log |
| opportunities | **Mock-Only** | Seeded on app startup |

### Environment Variables
| Variable | Affects | Classification |
|----------|---------|----------------|
| `OPENAI_API_KEY` | Intent parsing | **Real** when set |
| `NEXT_PUBLIC_LOOP_ENABLED` | Wallet execution | **Real** when true |
| Database file | All persistence | **Fully Real** |

---

## Wiring Summary

| Area | Production-Like | Mock-Only | Fully Real |
|------|-----------------|------------|------------|
| Intent Parsing | ✅ | | |
| Policy Engine | | | ✅ |
| Plan Generation | ✅ | | |
| Market Data | | ✅ | |
| Wallet Execution | | ✅ | |
| Database CRUD | | | ✅ |
| Audit Logging | | | ✅ |
| UI Components | Mostly | Some | |

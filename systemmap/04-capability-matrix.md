# Capability Matrix

## Component Status Definitions

| Status | Meaning |
|--------|---------|
| **REAL** | Fully functional with actual data/services |
| **SIMULATED** | Works correctly but uses demo/seeded data |
| **DEMO** | UI exists but may not be wired to backend |

---

## Core Capabilities

### Intent Parser
| Property | Status | Notes |
|----------|--------|-------|
| Implementation | **REAL** | LLM-based NLP parsing |
| Fallback | **REAL** | Rule-based fallback when LLM unavailable |
| API | `/api/agent/parse` | ✅ Wired |
| UI | `/agent` | ✅ Wired |

### Policy Engine
| Property | Status | Notes |
|----------|--------|-------|
| Implementation | **REAL** | Deterministic 11-step evaluation |
| Policy Types | **REAL** | MAX_PER_TRADE, MAX_DAILY, DENYLIST, APPROVAL_THRESHOLD |
| API | `/api/agent/policy-check` | ✅ Wired |
| UI | `/policies` | ✅ Wired |

### Market Data
| Property | Status | Notes |
|----------|--------|-------|
| Implementation | **SIMULATED** | Seeded opportunity data |
| Live DeFi | ❌ | Not connected to any DeFi protocol |
| Risk | N/A | No actual financial risk |
| API | `/api/opportunities` | ✅ Returns seeded data |

### Wallet Execution
| Property | Status | Notes |
|----------|--------|-------|
| Demo Mode | **SIMULATED** | Demo wallet with 500M CC |
| Live Mode | **DEMO** | Requires `NEXT_PUBLIC_LOOP_ENABLED=true` |
| Execution | **SIMULATED** | Logs to audit but doesn't actually execute |
| UI | `/wallet` | ✅ Partial wiring |

---

## Feature Matrix

### Home Page Features
| Feature | Status | Notes |
|---------|--------|-------|
| Hero Section | ✅ | Explains the product |
| How It Works | ✅ | 3-step process |
| Capabilities Transparency | ✅ | REAL/SIMULATED badges |
| Feature Cards | ✅ | 3 cards with icons |
| Navigation | ✅ | Links to all pages |
| Footer | ✅ | Minimal footer |

### Dashboard Features
| Feature | Status | Notes |
|---------|--------|-------|
| Capability Status | ✅ | 4 badges |
| CC Balance | ✅ | Static 500M display |
| Daily Usage | ✅ | From policies API |
| Policies Active | ✅ | Count from API |
| Top Opportunities | ✅ | From opportunities API |
| Recent Activity | ✅ | From audit API |

### Agent Features
| Feature | Status | Notes |
|---------|--------|-------|
| Command Input | ✅ | Text area |
| Intent Parsing | ✅ | `/api/agent/parse` |
| Policy Check | ✅ | `/api/agent/policy-check` |
| Plan Generation | ✅ | `/api/agent/plan` |
| Explanation | ✅ | `/api/agent/explain` |
| Execution | **SIMULATED** | Logs to audit only |

### Policy Features
| Feature | Status | Notes |
|---------|--------|-------|
| List Policies | ✅ | From `/api/policies` |
| Add Policy | ✅ | Via form + POST |
| Edit Policy | ✅ | Via form + PUT |
| Delete Policy | ✅ | Via DELETE |
| Policy Evaluation | ✅ | In policy engine |

### Activity Features
| Feature | Status | Notes |
|---------|--------|-------|
| Event List | ✅ | From `/api/audit` |
| Event Types | ✅ | PARSE, POLICY_CHECK, PLAN, EXECUTE, etc. |
| Timestamps | ✅ | ISO format |
| Simulated Flag | ✅ | Boolean indicator |

---

## Data Capabilities

### Database
| Table | Status | Notes |
|-------|--------|-------|
| policies | ✅ | CRUD operations |
| audit_events | ✅ | Append-only log |
| opportunities | ✅ | Seeded on startup |

### External Services
| Service | Status | Notes |
|---------|--------|-------|
| LLM (Intent Parse) | **REAL** | Uses configured LLM API |
| DeFi Protocols | ❌ | Not connected |
| Blockchain | **SIMULATED** | Not actually connected |

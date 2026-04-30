# Route Map

## Public Routes

### `/` — Home Page
**Purpose**: Public marketing page explaining the product.

**Content**:
- Hero with tagline: "AI agent for your wallet, with guardrails"
- How it works (3-step process)
- Capabilities transparency (REAL vs SIMULATED)
- Feature highlights (Policy Guardrails, Natural Language, Full Audit Trail)

**Wiring Status**: ✅ Wired (production-ready content)

**Design State**: Needs redesign per 00-redesign-plan.md

---

## Authenticated Routes (Sidebar Shell)

All routes below render inside `app/(main)/layout.tsx` with sidebar navigation.

### `/dashboard` — Dashboard
**Purpose**: Overview of wallet state, activity, and opportunities.

**Content**:
- Capability status badges (4 items)
- Quick stats (CC Balance, Daily Usage, Policies Active)
- Top Opportunities summary
- Recent Activity timeline

**Wiring Status**: ✅ Wired (API: `/api/dashboard`)

**Design State**: Needs redesign per 00-redesign-plan.md

---

### `/agent` — Agent Terminal
**Purpose**: Natural language command interface.

**Content**:
- Command input area
- Intent parsing result display
- Policy check results
- Plan presentation
- Execution approval buttons

**Wiring Status**: ✅ Partially wired
- Intent parsing: `/api/agent/parse`
- Policy check: `/api/agent/policy-check`
- Plan generation: `/api/agent/plan`
- Explain: `/api/agent/explain`

**Design State**: Uses standard components, needs design refresh

---

### `/policies` — Policies
**Purpose**: View and configure safety policies.

**Content**:
- List of configured policies
- Policy type, value, current usage
- Active/inactive status
- Add/Edit policy UI

**Wiring Status**: ✅ Wired (API: `/api/policies`)

**Design State**: Uses standard Card/List components

---

### `/opportunities` — Opportunities
**Purpose**: Browse available yield strategies.

**Content**:
- List of opportunities with APR, risk level, provider
- Filter by risk level
- Sort by APR

**Wiring Status**: ✅ Wired (API: `/api/opportunities`)

**Design State**: Uses standard Card/List components

---

### `/activity` — Activity Log
**Purpose**: Full audit trail of all agent activity.

**Content**:
- Chronological list of events
- Event type, timestamp, simulated flag
- Details expandable

**Wiring Status**: ✅ Wired (API: `/api/audit`)

**Design State**: Uses standard Card/List components

---

### `/wallet` — Wallet Details
**Purpose**: View wallet holdings and active contracts.

**Content**:
- Wallet address display
- CC token balance
- Active contracts
- Gas estimates

**Wiring Status**: ✅ Partially wired (static demo data)

**Design State**: Needs design refresh

---

## API Routes

### Agent APIs
| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/agent/parse` | POST | Parse natural language intent | ✅ Wired |
| `/api/agent/plan` | POST | Generate execution plan | ✅ Wired |
| `/api/agent/explain` | POST | Explain plan or decision | ✅ Wired |
| `/api/agent/policy-check` | POST | Validate against policies | ✅ Wired |

### Data APIs
| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/dashboard` | GET | Dashboard aggregated data | ✅ Wired |
| `/api/policies` | GET/POST | Policy CRUD | ✅ Wired |
| `/api/opportunities` | GET | List opportunities | ✅ Wired |
| `/api/audit` | GET | Audit log | ✅ Wired |
| `/api/health` | GET | Health check | ✅ Wired |
| `/api/demo/reset` | POST | Reset demo state | ✅ Wired |

---

## Navigation Structure

### Header (Home Page)
```
[Canton Agent Wallet] [Dashboard] [Agent] [Policies] [Get Started →]
```

### Sidebar (Authenticated)
```
┌─────────────────────┐
│ [Logo] Canton Wallet │
│              [DEMO]  │
├─────────────────────┤
│ 🏠 Home             │
│ 📊 Dashboard        │
│ 🤖 Agent            │
│ 🛡️ Policies        │
│ 📈 Opportunities    │
│ 📋 Activity         │
│ 👛 Wallet           │
├─────────────────────┤
│ Wallet:              │
│ [Connect Wallet]     │
└─────────────────────┘
```

### Mobile
Hamburger menu with slide-out drawer.

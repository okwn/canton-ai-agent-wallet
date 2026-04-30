# Dashboard Information Architecture

## Purpose

The dashboard is the **operational control surface** — where an authenticated user comes to understand the current state of their wallet, policies, and agent activity. Unlike the home page (which explains), the dashboard operates. Every element must answer: what is happening right now, and what can I do next?

---

## Section Order & Rationale

### 1. Page Header
**Content**: Page title + last-updated timestamp.

**Why**: Immediately anchors the user in the product. Timestamp signals this is live, operational data.

---

### 2. Demo Mode Banner
**Content**: "Demo Mode — Policy engine is fully functional. Wallet execution and market data are simulated."

**Why**: Must appear before any data. The user should know immediately that they are in demo mode. Not buried in footer — prominent at top.

**Data dependency**: None (static)

---

### 3. Wallet Status Panel
**Content**: Wallet address, CC balance, execution mode badge, daily usage bar with percent.

**Why**: The most critical operational question — "how much do I have and what is my daily spending?" Answered in one glance.

**Data dependency**: Real wallet state from `queryWalletState()` or demo fallback.

---

### 4. System Status Strip (4 cards)
**Content**: Intent Parser (REAL), Policy Engine (REAL), Market Data (SIMULATED), Wallet Execution (SIMULATED).

**Why**: Trust through transparency. User sees exactly what is real vs simulated without clicking anywhere. No surprises.

**Data dependency**: Static capability map.

---

### 5. Two-Column Row: Policy Summary + Opportunity Card
**Why**: These are the two primary action triggers. Policies = safety config, Opportunity = next action candidate. Side-by-side emphasizes balance between control and opportunity.

#### Policy Summary Card
- Lists top 4 policies with name, current value/usage, and ON/OFF badge
- "Manage" link to /policies
- Shows active count

#### Top Opportunity Card
- Single best opportunity with APR, risk, estimated output
- "Find yield with Agent" link
- SIM badge if demo mode
- Empty state if no opportunities seeded

**Data dependency**: `queryPolicies()`, `queryOpportunities()`

---

### 6. Quick Action Strip (4 cards)
**Content**: Agent Terminal, Policies, Opportunities, Activity — each as a nav card with icon, label, one-line description.

**Why**: Provides clear navigation to the four main operational areas. Replaces generic nav links with purposeful action cards.

**Data dependency**: Static route links.

---

### 7. Recent Activity Feed
**Content**: Last 6 audit events with event type icon, SIM badge, timestamp.

**Why**: Shows recent operational history. Link to full log for drill-down. Empty state guides user to Agent Terminal.

**Data dependency**: `queryAuditEvents(20)`

---

### 8. Opportunities Count Footer
**Content**: "X opportunities available" + "View all" link.

**Why**: Only shown when opportunities exist. Confirms data is loaded and provides navigation.

**Data dependency**: `queryOpportunities()`

---

## Data Flow

```
getDashboardData()
├── queryPolicies()          → PolicySummary, stats.policiesActive
├── queryAuditEvents(20)    → RecentActivityFeed (last 6)
├── queryOpportunities()     → TopOpportunityCard, hasOpportunities, count
└── Static: wallet state, capabilities, daily limits
```

---

## Real vs Demo-Backed Sections

| Section | Source | Classification |
|---------|--------|---------------|
| Demo Banner | Static | Static |
| Wallet Status | Static (demo values) | DEMO |
| System Status | Static capability map | MIXED (REAL + SIMULATED) |
| Policy Summary | `queryPolicies()` | REAL (persisted) |
| Top Opportunity | `queryOpportunities()` | SIMULATED (seeded data) |
| Quick Actions | Static links | Static |
| Activity Feed | `queryAuditEvents()` | REAL (persisted) |

---

## Empty/Loading/Error States

| Section | Empty | Loading | Error |
|---------|-------|---------|-------|
| Wallet Panel | Never empty (demo values) | Skeleton with pulse | Show "—" |
| Policy Summary | "No policies configured" message | Skeleton cards | Hide section |
| Opportunity Card | EmptyOpportunityCard with message | Skeleton | Hide section |
| Activity Feed | "No activity yet" message | Skeleton rows | "Failed to load" with retry |

---

## UX Design Decisions

1. **No card shadows** — Border-based containment only. Cards sit flat on cream background.
2. **Information density** — Denser than home page (operational context) but still clean. 16px base, tight vertical rhythm.
3. **Color discipline** — Success/warning/error only for semantic states. Charcoal for text. No decorative color.
4. **Action hierarchy** — Primary actions (Agent, Policies) get nav cards. Secondary actions (View all) get text links.
5. **Trust signals everywhere** — REAL/SIMULATED badges appear in 3 places: banner, status strip, opportunity card.
6. **No decorative elements** — Every visual element serves an informational purpose.
7. **Progressive disclosure** — Summary → detail flow. Top of page = summary. Full detail pages linked below.

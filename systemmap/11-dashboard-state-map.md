# Dashboard State Map

## State Types & Handling

### 1. Demo Mode (Default State)
**Condition**: No live wallet connected.

**Visual markers**:
- Banner: yellow warning background with "Demo Mode" label
- Wallet panel: shows demo address `0xDEMO_A1B2C3D4E5F6`, balance 500,000 CC
- Execution badge: "DEMO" in warning yellow
- Opportunity card: "SIMULATED" badge

**All sections visible**:
- Policy engine is real and functional
- Audit log is real and persistent
- Only market data and wallet execution are simulated

---

### 2. Live Mode (Future State)
**Condition**: Live wallet connected via `NEXT_PUBLIC_LOOP_ENABLED=true`.

**Visual markers**:
- Banner: green success background (or hidden)
- Execution badge: "LIVE" in success green
- Opportunity card: no SIM badge

**Behavioral change**:
- Actual on-chain execution enabled
- Real wallet balance displayed

---

### 3. No-Wallet State
**Condition**: Wallet disconnected.

**Visual markers**:
- Wallet panel shows "Not connected"
- Policy summary hidden (policies exist but no wallet context)
- Activity feed shows "Connect wallet to begin"

**Handling**: Should not occur in demo mode (wallet auto-connected).

---

### 4. Loading States

| Section | Loading UI |
|---------|-----------|
| Wallet Panel | 2-column skeleton with pulsing rectangles |
| Policy Summary | 4 skeleton rows with shimmer |
| Opportunity | Full card skeleton |
| Activity Feed | 6 skeleton rows |

**Implementation**: CSS `animate-pulse-subtle` on cream-light backgrounds.

---

### 5. Empty States

| Section | Empty Condition | UI |
|---------|----------------|-----|
| Policy Summary | `policies.length === 0` | "No policies configured" + link to /policies |
| Opportunity | `opportunities.length === 0` | EmptyOpportunityCard + "Seed data loads on first startup" |
| Activity Feed | `auditEvents.length === 0` | "No activity yet" + "Use Agent Terminal to get started" |

---

### 6. Error States

| Section | Error Handling |
|---------|----------------|
| Wallet Panel | Never errors (static demo) |
| Policy Summary | `try/catch` in page — on error, section hidden |
| Opportunity | `try/catch` — on error, card hidden |
| Activity Feed | `try/catch` — shows "Failed to load" with retry button |

**Error banner**: Red-tinted card with error message and retry action.

---

### 7. Unsupported Path States

**Opportunities with unsupported providers**:
- Adapter badge shows "UNSUPPORTED" in neutral gray
- Execution link grayed out
- Tooltip explains why

**Policy violations**:
- Activity feed shows "REJECTED" in red
- Blocked reason shown inline

---

## Component State Diagram

```
DashboardPage
├── DemoModeBanner          → always visible
├── WalletStatusPanel
│   └── executionMode: DEMO | LIVE
├── SystemStatusStrip       → always visible (static)
├── PolicySummary
│   ├── hasPolicies → list
│   └── noPolicies → empty message
├── [Opportunity | EmptyOpportunityCard]
│   ├── hasOpportunities → card with SIM badge
│   └── noOpportunities → empty state
├── QuickActionStrip       → always visible (static links)
├── RecentActivityFeed
│   ├── hasEvents → list (last 6)
│   └── noEvents → empty message
└── [Opportunities footer | hidden]
```

---

## UX Rationale

### Why the Demo Banner is Prominent
In demo mode, users may forget they are using simulated data. The banner must be impossible to miss — positioned directly below the page header, before any data cards. If hidden in a footer, users might mistake demo data for live data.

### Why Wallet Panel is First
The most common question for any wallet product: "What is my balance?" Answering it immediately — even with demo values — establishes operational credibility and sets context for everything below.

### Why Two Columns for Policies + Opportunity
These represent the two poles of the product: **control** (policies) and **action** (opportunities). Placing them side-by-side creates visual balance and signals that Canton is about controlled action, not blind automation.

### Why Quick Actions are Cards
Navigation links in a sidebar or nav bar are easy to ignore. Cards with icons and one-line descriptions make each section's purpose scannable at a glance. "I want to configure policies" is faster to find than scanning nav labels.

### Why Activity Feed is Last
The activity feed is the audit trail — important for trust and debugging, but not the primary operational question. Users come to the dashboard to check status and take action, not review history.

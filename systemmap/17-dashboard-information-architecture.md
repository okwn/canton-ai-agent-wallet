# 17. Dashboard Information Architecture

## Overview

The dashboard is the authenticated command center for Marcus. It provides registered users with a clear view of their wallet status, policy enforcement, recent activity, and available opportunities.

---

## Section Order and Purpose

```
┌─────────────────────────────────────────────────────────────┐
│  1. DASHBOARD HEADER                                         │
│     "Welcome back, [Name]" + Execution Mode Badge            │
│     Purpose: Identity confirmation + mode awareness          │
├─────────────────────────────────────────────────────────────┤
│  2. DEMO MODE BANNER (if applicable)                        │
│     Explains what demo mode means                            │
│     Purpose: Set correct expectations                        │
├─────────────────────────────────────────────────────────────┤
│  3. QUICK ACCESS CTA                                         │
│     [Open Agent Terminal] [Browse Opportunities]             │
│     Purpose: Primary action - how users interact with Marcus │
├─────────────────────────────────────────────────────────────┤
│  4. WALLET OVERVIEW + POLICY STATUS (2-column grid)         │
│     ┌───────────────────┐  ┌───────────────────┐           │
│     │ Wallet Overview   │  │ Policy Status     │           │
│     │ - Address        │  │ - Active count    │           │
│     │ - Balance        │  │ - Top policies    │           │
│     │ - Daily limit    │  │ - ON/OFF status   │           │
│     └───────────────────┘  └───────────────────┘           │
│     Purpose: Core status at a glance                        │
├─────────────────────────────────────────────────────────────┤
│  5. RECENT ACTIVITY + OPPORTUNITY (2-column grid)           │
│     ┌───────────────────┐  ┌───────────────────┐           │
│     │ Recent Activity   │  │ Top Opportunity   │           │
│     │ - Last 5 events  │  │ - Strategy name  │           │
│     │ - Event type     │  │ - APR + risk      │           │
│     │ - Timestamp      │  │ - [SIMULATED]     │           │
│     └───────────────────┘  └───────────────────┘           │
│     Purpose: What's happening + what's possible             │
├─────────────────────────────────────────────────────────────┤
│  6. FOOTER LINKS                                             │
│     Manage Policies | Full Audit Log | Wallet Details        │
│     Purpose: Navigation to detailed views                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Section Dependencies

### 1. Dashboard Header
**Dependencies:**
- Auth context (for user name)

**Data needed:**
- `user.name` from AuthProvider
- Execution mode ('DEMO' or 'LIVE')

**States:**
- Authenticated: Shows user name + mode badge
- (Fallback): Shows "User" if name unavailable

---

### 2. Demo Mode Banner
**Dependencies:**
- Execution mode state

**Data needed:**
- `executionMode` ('DEMO' or 'LIVE')
- If LIVE, banner can be hidden

**States:**
- Demo mode: Banner visible with explanation
- Live mode: Banner hidden

---

### 3. Quick Access CTA
**Dependencies:**
- None (always visible)

**Data needed:**
- None

**Content:**
- Primary: "Open Agent Terminal" → `/agent`
- Secondary: "Browse Opportunities" → `/opportunities`

---

### 4. Wallet Overview Card
**Dependencies:**
- Wallet connection (mock in demo mode)

**Data needed:**
- Wallet address (string, truncated display)
- Balance in CC (number, formatted with locale)
- Daily usage / daily limit (for progress bar)
- `isSimulated` flag (to show SIMULATED badge)

**Source:**
- Demo mode: Hardcoded `0xDEMO_A1B2C3D4E5F6`, 500M CC
- Live mode: Would come from Loop SDK or wallet connection

**States:**
- Loading: Skeleton placeholder
- Demo mode: Shows simulated address/balance + SIMULATED badge
- Live mode: Shows real address/balance, no badge
- Error: "Unable to load wallet" with retry option

---

### 5. Policy Status Card
**Dependencies:**
- Policy API (`/api/policies`)

**Data needed:**
- List of user's policies
- `policies[].type` - policy type identifier
- `policies[].name` - display name
- `policies[].value` - limit value (for display)
- `policies[].currentUsageMicroCC` - usage (for some policy types)
- `policies[].enabled` - active/inactive

**Source:**
- Real: API returns user's persisted policies
- Demo: API returns seeded demo policies

**States:**
- Loading: Skeleton
- Has policies: List up to 4 policies with ON/OFF status + usage
- No policies: Empty state with "Create a policy" CTA
- Error: "Unable to load policies"

---

### 6. Recent Activity Card
**Dependencies:**
- Audit API (`/api/audit`)

**Data needed:**
- List of audit events
- `events[].id` - unique identifier
- `events[].eventType` - type string (INTENT_PARSED, POLICY_EVALUATED, etc.)
- `events[].createdAt` - ISO timestamp
- `events[].simulated` - boolean flag

**Source:**
- Real: API returns user's persisted events
- Demo: API returns seeded demo events

**States:**
- Loading: Skeleton
- Has events: List up to 5 events with colored dot + timestamp
- No events: Empty state with "Use Agent Terminal to get started"
- Error: "Unable to load activity"

---

### 7. Opportunity Card
**Dependencies:**
- Opportunities API (`/api/opportunities`)

**Data needed:**
- Top opportunity object
- `opportunity.strategyName` - strategy display name
- `opportunity.providerName` - provider name
- `opportunity.aprBps` - APR in basis points (display as %)
- `opportunity.riskLevel` - LOW/MEDIUM/HIGH
- `opportunity.estimatedOutputMicroCC` - estimated return
- `opportunity.estimatedExecutionCostMicroCC` - fees

**Source:**
- Real: API returns real yield opportunities (when integrated)
- Demo: API returns seeded demo opportunities

**States:**
- Loading: Skeleton
- Has opportunity: Shows strategy details + APR + risk + fees
- No opportunity: Empty state explaining seed data
- Error: "Unable to load opportunities"

---

## Data Flow

```
User visits /dashboard
         ↓
Middleware checks auth cookie
         ↓
DashboardPage loads
         ↓
AuthProvider provides user context
         ↓
Parallel API calls:
├── /api/dashboard → policies, auditEvents, opportunities, stats
├── /api/policies → (for PolicyStatusCard)
├── /api/audit → (for RecentActivityCard)
└── /api/opportunities → (for OpportunityCard)
         ↓
Data assembled into sections
         ↓
Render with appropriate loading/error/empty states
```

---

## Component Inventory

| Component | File | Purpose |
|----------|------|---------|
| DashboardHeader | DashboardComponents.tsx | Welcome message + mode badge |
| DemoModeBanner | DashboardComponents.tsx | Demo mode explanation |
| QuickAccessStrip | DashboardComponents.tsx | Primary CTAs |
| WalletOverviewCard | DashboardComponents.tsx | Wallet status |
| PolicyStatusCard | DashboardComponents.tsx | Policy list |
| RecentActivityCard | DashboardComponents.tsx | Activity feed |
| OpportunityCard | DashboardComponents.tsx | Top yield opportunity |
| SectionTitle | DashboardComponents.tsx | Section headers (if needed) |

---

## Responsive Behavior

### Desktop (lg+)
- 2-column grid for Wallet/Policy and Activity/Opportunity
- Sidebar navigation visible
- Full-width header

### Tablet (md)
- Same 2-column grid
- Condensed padding

### Mobile (<md)
- Single column stack
- Hamburger menu for navigation
- Full-width cards

---

## Loading States

Each major section has a loading skeleton:
- Skeleton maintains layout space during load
- Uses `animate-pulse` for subtle indication
- Same dimensions as loaded content to prevent layout shift

---

## Error States

Errors are caught and displayed inline:
- Each card handles its own error state
- "Unable to load [data]" message
- Retry button where applicable
- Non-blocking - other sections still display

---

## Empty States

| Section | Empty State Message | CTA |
|---------|-------------------|-----|
| Policies | "No policies configured" + "Set up safety rules..." | "Create a policy →" |
| Activity | "No activity yet" + "Use Agent Terminal..." | None |
| Opportunities | "No opportunities available" + "Seed data loads..." | None |

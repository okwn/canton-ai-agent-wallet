# Public Agent Terminal Map

## What the Public Agent Terminal Is

The **public agent terminal** (`/agent`) is a standalone, sidebar-free page that gives anyone — authenticated or anonymous — direct access to the Marcus agent without requiring a dashboard account. It is designed to be a focused action surface: you arrive, you type a command, you see the result.

It exists to answer: *"Can I try this without signing up?"* — and the answer is yes.

---

## Why It Is Separate from the Dashboard

The dashboard (`/dashboard` and sub-routes under `(main)/`) is the authenticated workspace: wallet overview, policy management, activity history, yield opportunities. It is a persistent context surface.

The terminal is a **task-focused surface**: one prompt, one response, one plan. It does not persist session state across page loads (other than the in-session history), and it does not require the user to be logged in.

Separation rationale:

| Dimension | Dashboard | Public Terminal |
|-----------|-----------|-----------------|
| Purpose | Persistent workspace | Task completion |
| Auth | Required | Optional |
| Context | Multi-page, multi-feature | Single-turn or session |
| Navigation | Sidebar + full nav | Navbar only |
| Entry point | After login | First-touch experience |

---

## Architecture

### Route Structure

| Route | File | Shell | Auth |
|-------|------|-------|------|
| `/agent` | `app/agent/page.tsx` | Navbar only (no sidebar) | Optional |
| `/agent` (auth) | `app/(main)/agent/page.tsx` | DashboardShell (sidebar) | Required |
| `/dashboard` | `app/(main)/dashboard/page.tsx` | DashboardShell | Required |

### Public `/agent` Page

- **File:** `apps/web/app/agent/page.tsx`
- **Shell:** `Navbar` only (public navigation)
- **Content:** `AgentTerminal` component wrapped in a terminal chrome frame
- **Terminal chrome:** Decorative top bar with traffic-light dots and a `marcus — public terminal` label

### Authenticated `/agent` Page

- **File:** `apps/web/app/(main)/agent/page.tsx`
- **Shell:** `DashboardShell` (sidebar nav, demo banner)
- **Content:** `AgentTerminal` component with richer initial props (address, policies, preferences)
- **Terminal chrome:** Same as public, labeled `marcus — authenticated`

### Shared Component

- **File:** `apps/web/components/agent/AgentTerminal.tsx`
- Both pages render the same `AgentTerminal` component with different props
- `isAuthenticated` prop controls guest vs auth behavior (wallet display, badge, session labeling)

---

## What the Terminal Contains

### Terminal Header
- Bot icon + "Marcus Terminal" label
- Auth status badge (Guest Session vs Authenticated)
- Wallet display: balance, daily usage, DEMO/LIVE badge
- Add balance button (guest only) → calls `/api/demo/reset`
- Clear session button (appears after first command)

### Session History
- Scrollable area showing previous user/marcus exchanges in the current session
- Each message tagged with role (user/marcus)
- Max height with overflow scroll

### Input Area
- Multi-line textarea with placeholder
- Submit on Enter (Shift+Enter for newline)
- Send button (active only when input has content)
- 5 preset prompt chips below input

### Preset Prompts
```
- "Convert this 100 CC to the most suitable USDT route"
- "Find the cheapest route for swapping 50 CC"
- "Use at most 20 CC and minimize fees"
- "Preview before executing"
- "Find the lowest-risk yield up to 30 CC"
```

### Loading State
- Animated 3-dot bounce indicator
- Rotating thinking messages:
  - "Parsing your intent…"
  - "Checking policies…"
  - "Evaluating opportunities…"
  - "Building plan…"

### Plan Result Sections
1. **Interpreted Intent** — parsed action, amount, confidence, simulation mode
2. **Wallet Snapshot** — address, balance, daily usage, execution mode
3. **Opportunities** — shortlisted options with APR, risk, estimated output
4. **Recommended Plan** — step description, estimated output, why this plan
5. **Policy Verdict** — decision badge, passed/failed checks, next action
6. **Disclaimer** — simulation notice

### Explanation View
- Toggle from plan view
- Summary, what will happen, what could go wrong, alternatives, policy constraints

---

## Wallet Behavior

### Guest Mode
- Balance shown: **500 CC** (hardcoded initial display value)
- "Add Balance" button appears next to wallet display
- Clicking "Add Balance" calls `POST /api/demo/reset`
- After reset: shows "Balance restored" confirmation for 3 seconds
- The plan response shows the **actual** wallet state from the DB

### Authenticated Mode
- Same terminal UX but with richer initial props
- Wallet display shows address (truncated), balance, daily usage
- No "Add Balance" button (full wallet controls are in the Dashboard)

### Demo Top-Up (`/api/demo/reset`)
- Calls `resetDemoData()` in `lib/db.ts`
- Restores wallet balances to seed: 500 CC, 250 USDC
- Resets all policy usage counters to zero
- Re-seeds demo audit events with fresh timestamps
- This is the **only** way to restore demo balance in the public terminal

---

## Terminal States

| State | Indicator | Can Execute |
|-------|-----------|-------------|
| Loading | 3-dot bounce + thinking message | No |
| Plan ready | Full result sections visible | No (preview only) |
| Policy blocked | Red blockedBy message + FAIL badge | No |
| Policy approved | Green APPROVED badge | Approval required |
| Demo mode | Yellow DEMO badge on wallet | No (simulated) |
| Live mode | Green LIVE badge on wallet | Yes (if configured) |

---

## Real vs Demo in Terminal

| Component | Status | Notes |
|-----------|--------|-------|
| Intent Parser | REAL | LLM or rule-based fallback |
| Policy Engine | REAL | Server-side evaluation |
| Agent Terminal UI | REAL | Production-grade UI |
| Market Data | SIMULATED | Seeded demo opportunities |
| Wallet Execution | SIMULATED | Demo wallet, no real signing |
| Balance Top-Up | SIMULATED | Demo reset, not real funding |

---

## Files Reference

| File | Purpose |
|------|---------|
| `apps/web/app/agent/page.tsx` | Public terminal page (no sidebar) |
| `apps/web/app/(main)/agent/page.tsx` | Authenticated terminal (inside DashboardShell) |
| `apps/web/components/agent/AgentTerminal.tsx` | Shared terminal component |
| `apps/web/components/ui/Navbar.tsx` | Public navigation |
| `apps/web/components/ui/DashboardShell.tsx` | Authenticated app shell |
| `apps/web/app/api/agent/plan/route.ts` | Plan generation API |
| `apps/web/app/api/agent/explain/route.ts` | Explanation API |
| `apps/web/app/api/demo/reset/route.ts` | Demo balance reset |
| `apps/web/lib/db.ts` | `resetDemoData()` function |

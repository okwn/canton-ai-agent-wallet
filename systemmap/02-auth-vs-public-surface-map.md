# 02. Auth vs Public Surface Map

## What Changed

The previous architecture treated `/agent` as part of the authenticated `(main)` shell. This document restructures it so:
- **Public surface** (no auth) = `/`, `/how-it-works`, `/cli`, `/agent`
- **Authenticated surface** (requires login) = `/dashboard`, `/policies`, `/opportunities`, `/activity`, `/wallet`
- **Auth pages** = `/login`, `/register`

The public agent terminal and the authenticated dashboard are **distinct products** sharing the same agent logic and policy engine.

---

## Public Surface (No Login Required)

### `/` — Marketing Home

**What you see**:
- Marcus brand (leaf symbol, "Marcus" wordmark)
- Dark mode background
- Public top-nav: Home | How it works | CLI | Login | Register | Open Agent
- Hero: "Your AI wallet agent, with guardrails"
- 30-second product story
- Capabilities section with REAL/SIMULATED labels
- Footer with DEMO badge + simulation notice

**What guests can do**: Read, understand product, click "Open Agent" → `/agent`, click "Login/Register"

**What guests cannot do**: Access dashboard, view authenticated activity, modify policies

---

### `/agent` — Public Agent Terminal

**What you see**:
- Marcus leaf logo (top-left, small)
- "Public Terminal · Demo Mode" badge (not a full sidebar)
- Demo wallet: 500M CC pre-connected
- 5 preset example prompts to click and try
- Natural language input field
- Plan output with policy verdict
- Execution simulation with "DEMO" indicator
- Session activity log (local to session, no persistence without auth)

**Shell**: None. Full-page focused terminal UI. No sidebar, no top-nav (logo + badge only).

**What guests can do**:
- Run natural language commands through Marcus
- See policy evaluation in real time
- See simulated execution receipts
- Try all preset prompts
- See how Marcus interprets intent and checks policies

**What guests cannot do**: Persist activity across sessions, access full audit log, modify policies, connect a real wallet

---

### `/how-it-works` — Public Explainer

**What you see**: Step-by-step walkthrough with visual diagram showing Prompt → Intent → Policy → Plan → Execute flow.

**What guests can do**: Read and understand the full Marcus workflow.

---

### `/cli` — Public CLI Reference

**What you see**: Developer reference for programmatic Marcus interaction.

**What guests can do**: Read CLI docs.

---

## Authenticated Surface (Login Required)

### `/dashboard` — Authenticated Home

**What you see**:
- Full sidebar: Marcus logo, wallet status, all nav items
- Wallet overview (real/connected balance, daily usage vs limit)
- System status strip
- Policy summary
- Top opportunity card
- Recent activity feed
- Quick action strip

**Shell**: Full DashboardShell with sidebar.

**What authenticated users can do**: Everything. Full wallet management, policy CRUD, activity audit, opportunities browsing.

**Auth redirect**: Unauthenticated → redirected to `/login`.

---

### `/policies` — Policy Management

**Shell**: Full sidebar (DashboardShell).

**What authenticated users can do**: Full policy CRUD — create, edit, toggle, delete safety rules. See policy engine enforcement in real time.

---

### `/opportunities` — Yield Strategies

**Shell**: Full sidebar (DashboardShell).

**What authenticated users can do**: Browse all opportunities with REAL/SIMULATED/UNSUPPORTED adapter badges. Compare APR, risk, fees.

---

### `/activity` — Full Audit Log

**Shell**: Full sidebar (DashboardShell).

**What authenticated users can do**: Full audit trail — all events, all policy decisions, all execution receipts. Filterable by event type.

---

### `/wallet` — Wallet Details

**Shell**: Full sidebar (DashboardShell).

**What authenticated users can do**: View wallet state, holdings, active contracts, gas estimates.

---

## Auth Pages

### `/login`

**What you see**: Email/password form + "connect wallet instead" option.

**What unauthenticated users can do**: Log in with existing credentials.

---

### `/register`

**What you see**: Registration form + first wallet connection.

**What unauthenticated users can do**: Create account.

---

## Access Matrix

| Route | Anonymous | Authenticated | Shell |
|-------|-----------|---------------|-------|
| `/` | ✅ Read | ✅ Read | Public top-nav |
| `/how-it-works` | ✅ Read | ✅ Read | Public top-nav |
| `/cli` | ✅ Read | ✅ Read | Public top-nav |
| `/agent` | ✅ Full demo | ✅ Full + persisted | None (focused) |
| `/login` | ✅ Auth form | → `/dashboard` | Public top-nav |
| `/register` | ✅ Auth form | → `/dashboard` | Public top-nav |
| `/dashboard` | → `/login` | ✅ Full | DashboardShell |
| `/policies` | → `/login` | ✅ Full | DashboardShell |
| `/opportunities` | → `/login` | ✅ Full | DashboardShell |
| `/activity` | → `/login` | ✅ Full | DashboardShell |
| `/wallet` | → `/login` | ✅ Full | DashboardShell |

---

## What the Judge Should Understand

**Layer 1 — Public (no login)**:
- Home page explains Marcus in under 30 seconds
- "Open Agent" takes you to the public terminal
- Public terminal has a demo wallet, lets you try 5 preset prompts, shows policy evaluation in real time
- Everything runs in simulation — no real blockchain, no real money

**Layer 2 — Authenticated (login required)**:
- Full dashboard with real policy management
- All pages accessible after login
- Activity log persists across sessions

**Key distinction**: The public terminal is a **demo surface** for evaluation. The dashboard is a **real product surface** for registered users. Both share the same agent logic and policy engine — the difference is authentication and data persistence.

---

## How the Architecture Supports This

1. **No sidebar on `/agent`** — public terminal is visually distinct from dashboard
2. **Auth middleware on `/dashboard` and sub-routes** — unauthenticated users are redirected to `/login`
3. **Session-based auth** — login creates a session cookie; middleware checks it on protected routes
4. **Public terminal always accessible** — even authenticated users can hit `/agent` for quick demos
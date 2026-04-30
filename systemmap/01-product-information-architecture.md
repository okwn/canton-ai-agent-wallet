# 01. Product Information Architecture

## Surface Definitions

### Surface 1: Public Marketing Home (`/`)
**Purpose**: Explain what Marcus is, why it matters, and how to try it.
**Audience**: Anyone — especially first-time evaluators and judges.
**Shell**: Public top-nav (no sidebar).

**Content priorities**:
1. Brand: Marcus — AI wallet agent with a leaf symbol
2. Value prop: "Describe what you want. Marcus checks your policies. Only executes when you approve."
3. 30-second product story
4. Clear CTA: "Try the Public Terminal" (no login required)
5. Secondary: "See How It Works", "View Dashboard" (auth-gated)
6. Honest capabilities section (REAL / SIMULATED labels)
7. Demo context: "This is a demonstration. No real blockchain execution."

**What it must NOT do**: Dump visitors directly into the dashboard or make the agent feel like a full app without context.

---

### Surface 2: Public Agent Terminal (`/agent`)
**Purpose**: Let anyone try Marcus immediately — no account, no wallet connection required.
**Audience**: First-time evaluators, judges, curious visitors.
**Shell**: None — focused, standalone UI. No sidebar.

**Experience design**:
- Demo wallet pre-connected (500M mock CC balance)
- 3-5 preset example prompts they can click to try
- Prominent "DEMO MODE" indicator at top
- No authentication required
- No sidebar or top-nav that implies "you are inside an app"
- Terminal is the entire page — focused action surface

**Content**:
- Marcus logo (small, top-left)
- "Public Terminal — Demo Mode" badge
- Demo wallet balance prominently displayed
- Example prompts: "Find low-risk yield up to 10 CC", "Show me a safe strategy", etc.
- Natural language input
- Policy verdict shown after each command
- Execution simulation with clear "this is not real" indicator
- Activity log (session-only, no persistence for anonymous)

**What it must NOT do**: Look like the authenticated dashboard. Must feel like a dedicated, lightweight demo surface.

---

### Surface 3: Authenticated Dashboard (`/dashboard`)
**Purpose**: Full Marcus experience — real wallet, policies, activity, opportunities.
**Audience**: Authenticated users who have registered and connected a wallet.
**Shell**: Full sidebar with Marcus branding, wallet status, navigation.

**Sections**:
1. Wallet overview (real balance, daily usage, execution mode)
2. System status (Intent Parser REAL, Policy Engine REAL, Market Data SIMULATED, Wallet Execution SIMULATED)
3. Active policies summary with quick toggle
4. Top opportunity from live (or seeded) market data
5. Recent activity feed (full audit log)
6. Quick action strip (Agent Terminal, Policies, Opportunities, Activity)

**What it must NOT do**: Be accessible to anonymous users. Must redirect to login if no session.

---

### Surface 4: Authenticated Sub-Surfaces
All under sidebar shell after login:

| Route | Purpose |
|-------|---------|
| `/policies` | Create, edit, toggle, delete safety rules |
| `/opportunities` | Browse yield strategies with REAL/SIMULATED per-adapter badges |
| `/activity` | Full audit log — all events, all decisions, timestamps |
| `/wallet` | Wallet details, holdings, gas estimates, active contracts |

---

### Surface 5: Auth Pages
| Route | Purpose |
|-------|---------|
| `/login` | Email/password or wallet-based login |
| `/register` | Create account + connect first wallet |

---

### Surface 6: Public Info Pages
| Route | Purpose |
|-------|---------|
| `/how-it-works` | Step-by-step explainer with visual diagram |
| `/cli` | Developer / CLI reference |

---

## Information Architecture Principles

1. **Jury-safe entry**: First-time visitor lands on `/` → understands Marcus in 30s → can try `/agent` immediately without login
2. **Surface separation**: Public terminal has NO sidebar. Dashboard has FULL sidebar. These are visually and conceptually distinct.
3. **Auth gate**: Dashboard surfaces redirect to `/login` if no session. Agent terminal is always public.
4. **Honest labeling**: Every surface shows its mode (DEMO / LIVE) clearly. No false "live" indicators.
5. **Demo-to-auth progression**: After trying the public terminal, a judge should think "I want to see what a real user experience looks like" → Login → Dashboard. The progression makes sense.

## Transition Flows

```
Anonymous judge flow:
  / → "Marcus is an AI wallet agent" → /agent → Tries demo terminal
  → Understands product in 60 seconds
  → Optionally goes to /how-it-works for deeper explanation

Authenticated user flow:
  / → /login or /register → /dashboard → full experience
  → Can access /agent too (public terminal also available in authenticated context)
```

## What the Jury Should Think After 30 Seconds

> "Marcus is an AI wallet agent. You tell it what you want in plain language, it checks your safety rules, shows you the plan, and only executes when you approve. There's a public demo terminal anyone can try right now, and a full dashboard for registered users. The policy engine is real — the blockchain execution is demo."

This is the mental model the architecture must support.
# 20. Surface Separation Map

## The Three Surfaces

Marcus has three distinct surfaces, each with a specific purpose and access level:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SURFACE 1: HOME (/)                                                       │
│  ─────────────────────────────────────────────────────────────────────────│
│  Purpose: Marketing, product explanation, conversion                      │
│  Access: Anyone (no auth)                                                  │
│  Shell: Public Navbar                                                      │
│                                                                             │
│  What you see:                                                             │
│  • Hero section with tagline                                               │
│  • "An AI wallet that follows your rules"                                  │
│  • How it works (5-step flow)                                              │
│  • Why it matters (policy enforcement, explainability)                      │
│  • Two tiers: Guest vs Registered                                          │
│  • Agent Terminal section                                                  │
│  • Honest REAL/SIMULATED framing                                           │
│  • Footer with DEMO badge                                                  │
│                                                                             │
│  CTA: "Open Agent Terminal" → /agent                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  SURFACE 2: PUBLIC AGENT TERMINAL (/agent)                                 │
│  ─────────────────────────────────────────────────────────────────────────│
│  Purpose: Demo the agent without login                                     │
│  Access: Anyone (no auth)                                                 │
│  Shell: None (focused terminal UI)                                         │
│                                                                             │
│  What you see:                                                             │
│  • Minimal header with logo only                                           │
│  • Full-page terminal interface                                            │
│  • 5 preset example prompts                                                │
│  • Natural language input                                                  │
│  • Policy verdict display                                                   │
│  • Plan review + approval                                                  │
│  • Simulated execution receipt                                             │
│  • Session activity log                                                    │
│                                                                             │
│  Demo wallet: 500M CC (pre-connected)                                      │
│  Policy engine: REAL (server-side enforcement)                             │
│  Execution: SIMULATED (no real blockchain)                                 │
│                                                                             │
│  CTA: "Create an account" → /register                                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  SURFACE 3: AUTHENTICATED DASHBOARD (/dashboard)                          │
│  ─────────────────────────────────────────────────────────────────────────│
│  Purpose: Full control center for registered users                         │
│  Access: Login required (cookie-based session)                            │
│  Shell: DashboardShell with sidebar                                        │
│                                                                             │
│  What you see:                                                             │
│  • Welcome header with user name + mode badge                              │
│  • Demo mode banner (explains demo limitations)                            │
│  • Quick access: Open Agent Terminal, Browse Opportunities                  │
│  • Wallet overview card (address, balance, daily limit)                   │
│  • Policy status card (active policies with ON/OFF)                        │
│  • Recent activity feed (last 5 events)                                   │
│  • Top opportunity card (APR, risk, SIMULATED badge)                        │
│                                                                             │
│  Sidebar navigation:                                                       │
│  • Dashboard, Policies, Opportunities, Activity, Wallet                    │
│                                                                             │
│  CTA: Agent Terminal always accessible from here                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Why the Split Exists

### Guest Users (No Login)
- **Want to understand the product quickly**
- **Don't want to commit before trying**
- **May never intend to register**

The public terminal lets them:
- Experience the core value proposition
- See policy enforcement in action
- Verify the product works

### Registered Users (Logged In)
- **Want persistent policies and history**
- **Want real control over their wallet**
- **Are ready to use the product seriously**

The dashboard provides:
- Centralized control
- Activity persistence
- Policy management

---

## Access Matrix

| Route | Guest | Authenticated | Shell |
|-------|-------|---------------|-------|
| `/` | Read | Read | Public Navbar |
| `/agent` | Full demo | Full demo | None |
| `/login` | Form | → /dashboard | Public Navbar |
| `/register` | Form | → /dashboard | Public Navbar |
| `/dashboard` | → /login | Full | DashboardShell |
| `/policies` | → /login | Full | DashboardShell |
| `/activity` | → /login | Full | DashboardShell |
| `/opportunities` | → /login | Full | DashboardShell |
| `/wallet` | → /login | Full | DashboardShell |

---

## Surface-Specific UX

### Home Page UX
- Marketing tone (persuasive, not technical)
- Focus on value proposition
- Clear CTAs to terminal
- Social proof / honest framing

### Terminal UX
- Functional tone (action-oriented)
- Focus on command execution
- Minimal distractions
- Clear feedback at each step

### Dashboard UX
- Control tone (empowering)
- Focus on status and actions
- Comprehensive but organized
- Clear real vs simulated labels

---

## Navigation Context

### From Home
```
Home → Click "Open Agent Terminal" → /agent
Home → Click "Login" → /login
Home → Click "Register" → /register
Home → Scroll to "How it works" → /
Home → Footer links → various
```

### From Public Terminal
```
/agent → Click "Login" → /login
/agent → "Create account" → /register
/agent → Demo flow (no exit needed)
```

### From Dashboard
```
/dashboard → Sidebar → /policies, /activity, /opportunities, /wallet
/dashboard → "Open Agent Terminal" → /agent
/dashboard → User menu → Sign out → /
```

---

## Design Language Per Surface

### Home
- **Tone**: Marketing, persuasive
- **Colors**: Full Marcus dark theme
- **Layout**: Section-based scrolling page
- **CTAs**: Prominent, action-oriented

### Terminal
- **Tone**: Technical, focused
- **Colors**: Terminal-inspired (dark, monospace accents)
- **Layout**: Single-purpose, centered
- **CTAs**: Minimal, necessary actions only

### Dashboard
- **Tone**: Control, professional
- **Colors**: Marcus dark with data visualization colors
- **Layout**: Grid-based with sidebar
- **CTAs**: Contextual, status-aware

---

## Jump Points Between Surfaces

```
                    ┌─────────────┐
                    │    HOME     │
                    │     (/)     │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐
      │  /login  │  │ /register│  │  /agent  │
      └────┬─────┘  └────┬─────┘  └────┬─────┘
           │             │             │
           └─────────────┴─────────────┘
                         │
                         ▼
                  (If authenticated)
                         │
                         ▼
               ┌────────────────────┐
               │    /dashboard      │
               │ (authenticated)    │
               └────────────────────┘
```

---

## Surface Selection Logic

**When to send users to which surface:**

| User State | Send To | Why |
|------------|---------|-----|
| First time visitor | Home `/` | Explain product |
| Evaluating product | Terminal `/agent` | Experience core value |
| Ready to commit | Register `/register` | Create account |
| Returning user | Dashboard `/dashboard` | Continue work |
| Quick task | Terminal `/agent` | Fast execution |
| Policy check | Dashboard `/dashboard` | Manage policies |

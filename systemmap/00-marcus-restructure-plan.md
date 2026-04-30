# 00. Marcus Restructure Plan

## What Changed

**Brand**: Canton Agent Wallet → **Marcus**
**Symbol**: Leaf (replaces "CA" monogram)
**Mode**: Dark mode (cream → deep charcoal backgrounds)
**Navigation**: Public top-nav (Home, How it works, CLI) + auth cluster (Login, Register, Open Agent)

## Why the Previous Structure Was Logically Wrong

### Problem 1: Agent inside Dashboard Shell
The `(main)` route group wraps Agent, Policies, Opportunities, Activity, and Wallet in a sidebar shell. But the requirement states:
- **Public terminal** must be a focused surface, no sidebar
- **Dashboard** is for authenticated users only

Currently a first-time visitor hitting `/agent` sees a complex sidebar with 7 nav items — it looks like they're already inside an app, not evaluating a product.

### Problem 2: Route Grouping is Inconsistent
- Home is at `/` (public, no shell)
- Dashboard is at `/dashboard` (inside `(main)` → sidebar)
- Agent is at `/agent` (inside `(main)` → sidebar)
- Policies is at `/policies` (inside `(main)` → sidebar)

The `(main)` group means "authenticated shell" but it's being applied to the public agent terminal too.

### Problem 3: Anonymous vs Authenticated Not Enforced
There is no auth. The "Login" and "Register" in the nav don't actually do anything. The dashboard is accessible to anyone. The system can't distinguish between a guest trying the terminal and an authenticated user managing their wallet.

### Problem 4: Product Story is Inverted
Currently: visitor lands on home, might go to agent (which looks like a full app), might explore dashboard. The path is unclear and the "aha" moment requires navigating too much.

**Inverted for judges**: A judge lands on the home page and has 30 seconds. The product must communicate what it is in that time. The current home page is good but the agent URL and dashboard feel like the same product tier, not distinct surfaces.

## New Architecture

```
PUBLIC LAYER (no auth, no sidebar)
├── /                    → Marketing home
├── /how-it-works        → Public explainer
├── /cli                 → CLI reference / developer docs
└── /agent               → Public terminal (no sidebar, focused UI)

AUTHENTICATED LAYER (full dashboard shell)
├── /dashboard           → Main dashboard (home after login)
├── /policies           → Policy management
├── /opportunities      → Yield strategies
├── /activity           → Audit log
└── /wallet             → Wallet details

AUTH ROUTES
├── /login
├── /register
└── /logout
```

## Access Model

| Surface | Who | Shell | Experience |
|---------|-----|-------|-------------|
| Home | Anyone | Public top-nav | Marketing, product explanation |
| How it works | Anyone | Public top-nav | Educational |
| CLI docs | Anyone | Public top-nav | Developer reference |
| Agent (public) | Anyone (anonymous) | None — focused UI | Demo terminal with preset prompts, demo wallet connect |
| Dashboard | Authenticated users | Full sidebar shell | Real wallet, policies, activity, full agent |
| Login/Register | Anonymous only | Public top-nav | Auth forms |

## Brand Transition

| Element | Old | New |
|---------|-----|-----|
| Brand name | Canton Agent Wallet | **Marcus** |
| Symbol | CA monogram | Leaf |
| Logo text | Canton Wallet / Canton Agent Wallet | Marcus |
| Color mode | Warm cream/light | **Dark mode** (deep charcoal) |
| Nav | Sidebar + top nav | Public top-nav with auth cluster |
| Demo badge | DEMO (amber) | DEMO (muted) |

## Jury Comprehension Goal

A judge lands on Marcus and within 30 seconds understands:
1. This is an AI wallet agent named Marcus
2. You describe what you want in plain English
3. It checks your safety policies before acting
4. Nothing runs without your approval
5. There's a public demo terminal anyone can try
6. Authenticated users get a full dashboard

The public terminal is the "aha" moment — it should be immediately accessible, clearly demo, and obviously safe to try. The dashboard is for users who want to go deeper.

## Files Created

- `00-marcus-restructure-plan.md` — This document
- `01-product-information-architecture.md` — Surface definitions and transitions
- `02-auth-vs-public-surface-map.md` — What each surface shows and why
- `03-route-and-access-map.md` — URL structure and access control
- `04-brand-transition-plan.md` — Brand rename action items
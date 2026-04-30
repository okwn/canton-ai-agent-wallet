# 03. Route and Access Map

## What Changed

The `(main)` route group previously wrapped both `/agent` and all dashboard pages. This document restructures the route tree so:
- **Public routes**: `/`, `/how-it-works`, `/cli`, `/agent` — no DashboardShell, no auth required
- **Authenticated routes**: `/dashboard`, `/policies`, `/opportunities`, `/activity`, `/wallet` — DashboardShell, auth required
- **Auth routes**: `/login`, `/register` — no shell, public top-nav

---

## New Route Structure

```
APPS/WEB/APP/
│
├── (public)/                    # NEW: Public marketing shell
│   ├── layout.tsx              # Public top-nav layout (Marcus leaf logo, nav links)
│   ├── page.tsx               # / (home)
│   ├── how-it-works/
│   │   └── page.tsx
│   └── cli/
│       └── page.tsx
│
├── agent/                       # NEW: Public terminal (standalone, no shell)
│   └── page.tsx               # /agent — focused demo UI
│
├── (auth)/                      # NEW: Authenticated shell
│   ├── layout.tsx             # DashboardShell sidebar + auth state
│   ├── dashboard/
│   │   └── page.tsx           # /dashboard
│   ├── policies/
│   │   └── page.tsx           # /policies
│   ├── opportunities/
│   │   └── page.tsx           # /opportunities
│   ├── activity/
│   │   └── page.tsx           # /activity
│   └── wallet/
│       └── page.tsx           # /wallet
│
├── login/
│   └── page.tsx               # /login
│
├── register/
│   └── page.tsx               # /register
│
├── api/                        # API routes (no shell, auth where needed)
│   ├── agent/
│   │   ├── parse/route.ts
│   │   ├── plan/route.ts
│   │   ├── explain/route.ts
│   │   └── policy-check/route.ts
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── register/route.ts
│   │   └── logout/route.ts
│   ├── dashboard/route.ts
│   ├── policies/route.ts
│   ├── opportunities/route.ts
│   ├── audit/route.ts
│   └── demo/reset/route.ts
│
├── layout.tsx                 # Root layout (dark mode, Marcus metadata)
└── page.tsx                   # Redirect to (public)/page.tsx or /agent
```

---

## Route Access Summary

| URL | Route File | Shell | Auth Required | Notes |
|-----|-----------|-------|--------------|-------|
| `/` | `(public)/page.tsx` | Public top-nav | No | Marketing home |
| `/how-it-works` | `(public)/how-it-works/page.tsx` | Public top-nav | No | Explainer |
| `/cli` | `(public)/cli/page.tsx` | Public top-nav | No | CLI docs |
| `/agent` | `agent/page.tsx` | **None** | No | Focused demo terminal |
| `/login` | `login/page.tsx` | Public top-nav | No (redirect if authed) | Auth form |
| `/register` | `register/page.tsx` | Public top-nav | No (redirect if authed) | Registration |
| `/dashboard` | `(auth)/dashboard/page.tsx` | DashboardShell | **Yes** | Main dashboard |
| `/policies` | `(auth)/policies/page.tsx` | DashboardShell | **Yes** | Policy management |
| `/opportunities` | `(auth)/opportunities/page.tsx` | DashboardShell | **Yes** | Yield strategies |
| `/activity` | `(auth)/activity/page.tsx` | DashboardShell | **Yes** | Audit log |
| `/wallet` | `(auth)/wallet/page.tsx` | DashboardShell | **Yes** | Wallet details |

---

## Auth Middleware Logic

```
Request → checkSession() →
  if (session exists) →
    if (public route) → render normally (auth user can access public too)
    if (auth route) → render
  if (no session) →
    if (public route) → render normally
    if (auth route) → redirect /login
    if (agent route) → render normally (agent is public)
```

Note: Authenticated users CAN also access `/agent` — the public terminal is available to everyone. The difference is that authenticated users get session-persistent activity logs.

---

## What Gets Removed

- `(main)` route group — no longer used
- `apps/web/app/(main)/layout.tsx` — replaced by `(auth)/layout.tsx`
- `apps/web/app/(main)/agent/page.tsx` — moved to `apps/web/app/agent/page.tsx` (no shell)
- Old `apps/web/app/page.tsx` — replaced by `(public)/page.tsx`

---

## Session / Auth Implementation Required

1. **Session cookie**: `next-auth` or custom session. Contains user ID, wallet address.
2. **Auth middleware**: Check session on every `/(auth)/*` request. Redirect to `/login` if no session.
3. **Public agent session**: Anonymous users get a session-less experience on `/agent`. Activity is stored in localStorage for session continuity.
4. **Login/Register pages**: Standard auth forms. Register should prompt for wallet address or wallet connection.
5. **Logout**: Clear session, redirect to `/`.

---

## API Route Auth

| API Route | Auth Required | Notes |
|-----------|--------------|-------|
| `GET /api/dashboard` | Yes | Returns user-specific dashboard data |
| `GET /api/policies` | Yes | Returns user's policies |
| `POST/PUT/DELETE /api/policies` | Yes | Policy mutations |
| `GET /api/audit` | Yes | User's audit log |
| `GET /api/opportunities` | No | Public — seeded data |
| `POST /api/agent/plan` | No | Public terminal works without auth |
| `POST /api/agent/parse` | No | Public terminal works without auth |
| `POST /api/auth/login` | No | Auth endpoint |
| `POST /api/auth/register` | No | Auth endpoint |

---

## Visual Shell Map

| Route | Logo | Top-Nav | Sidebar | Focus UI |
|-------|------|---------|---------|----------|
| `/` | Leaf | ✅ Home · How it works · CLI · Login · Register · Open Agent | ❌ | ❌ |
| `/how-it-works` | Leaf | ✅ | ❌ | ❌ |
| `/cli` | Leaf | ✅ | ❌ | ❌ |
| `/agent` | Leaf (small) | ❌ | ❌ | ✅ Full-page terminal |
| `/login` | Leaf | ✅ | ❌ | ❌ |
| `/register` | Leaf | ✅ | ❌ | ❌ |
| `/dashboard` | Leaf | (sidebar has nav) | ✅ | ❌ |
| `/policies` | Leaf | (sidebar) | ✅ | ❌ |
| `/opportunities` | Leaf | (sidebar) | ✅ | ❌ |
| `/activity` | Leaf | (sidebar) | ✅ | ❌ |
| `/wallet` | Leaf | (sidebar) | ✅ | ❌ |

---

## How the Jury Navigates

1. **Judge lands on `/`** → sees Marcus brand, leaf logo, dark mode → understands AI wallet agent in 30s
2. **Clicks "Open Agent"** → goes to `/agent` → no sidebar → sees focused demo terminal → tries preset prompt
3. **Understands product core** → optionally reads `/how-it-works` for deeper explanation
4. **If wants to see full dashboard** → clicks Login → /login → /dashboard (authenticated)

**The judge never hits an "access denied" on the public surface. The authenticated surface requires login, which is the correct gated experience.**

---

## Files Created

- `03-route-and-access-map.md` — This document
- Route tree above defines the new file organization
- Auth middleware and session implementation are Phase 2 work (not in scope for this plan)
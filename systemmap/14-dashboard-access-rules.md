# 14. Dashboard Access Rules

## Overview

The dashboard is the authenticated entry point for registered users. This document defines access rules, what authenticated users can/cannot do, and the flow when access is denied.

---

## Access Model Summary

| Aspect | Rule |
|--------|------|
| **Default state** | Dashboard is NOT the first surface |
| **Access requirement** | Valid session cookie required |
| **Guest capability** | Can only access public terminal (`/agent`) |
| **Redirect target** | `/login` with `?redirect=` param |

---

## Dashboard Entry Points

### Via Login
```
User → /login → [credentials] → success → /dashboard (or ?redirect param)
```

### Via Direct Access
```
User → /dashboard (directly) → middleware checks cookie → valid → render
                                                          → missing → /login?redirect=/dashboard
```

### Via URL Bookmark
```
User → /dashboard (bookmarked) → same as direct access flow
```

---

## Protected Routes

All routes under the dashboard require authentication:

```
/dashboard          - Main wallet overview
/activity           - Full audit log
/policies           - Policy CRUD
/opportunities      - Yield opportunities
/wallet             - Wallet details
```

### Middleware Protection

```typescript
const PROTECTED_ROUTES = [
  '/dashboard',
  '/activity',
  '/policies',
  '/opportunities',
  '/wallet',
];

// Any route starting with these paths is protected
```

---

## Guest Capabilities

Guests (unauthenticated users) can:

| Route | Capability |
|-------|-----------|
| `/` | View marketing home, understand product |
| `/#how-it-works` | Read explainer |
| `/agent` | Use full public terminal with demo data |

Guests **cannot**:

| Action | Reason |
|--------|--------|
| Access `/dashboard` | Requires auth cookie |
| Access `/activity` | Requires auth cookie |
| Access `/policies` | Requires auth cookie |
| Access `/opportunities` | Requires auth cookie (but sees public opp data via API) |
| Access `/wallet` | Requires auth cookie |
| Persist session | No auth cookie issued |

---

## Authenticated User Capabilities

| Action | Capability |
|--------|-----------|
| View dashboard | Full wallet overview with real/connected wallet state |
| Manage policies | Create, edit, delete, toggle policies |
| View activity | Full audit trail with filtering |
| Browse opportunities | See opportunities with user-specific recommendations |
| View wallet | Holdings, active contracts, gas estimates |
| Logout | Clear session, return to guest state |

---

## Access Denied Flow

### When
- User directly types `/dashboard` in address bar
- User clicks a link to dashboard while unauthenticated
- Session cookie is expired or invalid

### Flow
```
Unauthenticated request for /dashboard
    ↓
Middleware: auth cookie missing/invalid
    ↓
302 Redirect to /login?redirect=/dashboard
    ↓
User sees login page with "redirect" preserved
    ↓
[User logs in]
    ↓
Redirect to /dashboard
```

### What User Sees

On `/login?redirect=/dashboard`:
- Login form as usual
- After login: redirects to `/dashboard`

On direct access attempt (if middleware somehow bypassed):
- `<AuthGuard>` shows "Authentication required" card with login/register buttons

---

## Session Persistence

### Cookie Properties
- **Name**: `marcus_auth`
- **Max-Age**: 604800 (7 days)
- **SameSite**: Lax
- **Path**: `/`

### Session Continuity
- Auth persists across browser tabs
- Auth persists across page refreshes
- Auth persists across browser restarts (until cookie expires)

### Logout Behavior
```
User clicks "Sign out"
    ↓
AuthProvider.logout()
    ↓
Clear cookie (max-age=0)
    ↓
Set user=null
    ↓
Redirect to / (home)
    ↓
Navbar now shows guest state
```

---

## Auth-Aware Navigation

### Guest Navbar (desktop)
```
[Logo]  Home  |  How it works  |  Open Agent     [Login] [Register]
```

### Authenticated Navbar (desktop)
```
[Logo]  Dashboard  |  Open Agent                       [User Avatar ▾]
                                                          Dashboard
                                                          Sign out
```

### Mobile Guest Navbar
- Same links in hamburger menu

### Mobile Authenticated Navbar
- Dashboard + Open Agent in menu
- User email displayed at top
- Sign out button

---

## Edge Cases

### 1. Authenticated user visits /login
- Redirect to `/dashboard` (already authenticated)
- Or use the ?redirect param if provided

### 2. Authenticated user visits /register
- Same as login — redirect to dashboard or ?redirect

### 3. Guest visits /agent then /dashboard
- /agent: Works fine (public)
- /dashboard: Redirects to /login (guest has no cookie)

### 4. Session expires while using dashboard
- Cookie expires → middleware catches it → redirects to login
- AuthProvider client state may be stale (handled by page reload)

### 5. Multiple browser tabs with different auth states
- Each tab maintains its own cookie state
- Login in one tab doesn't auto-login other tabs (cookie is set per-tab)

---

## Security Notes

### Current (Hackathon) State
- No CSRF protection (SameSite=Lax helps)
- No rate limiting on login attempts
- Mock token (base64 email) is easily spoofable
- No https-only flag on cookie (should be added in production)

### Production Recommendations
- Use HttpOnly, Secure, SameSite=Strict cookies
- Implement CSRF tokens
- Add rate limiting
- Use proper JWT or opaque tokens
- Add captcha after N failed login attempts
- Log authentication events for audit

---

## Files Involved

| File | Role |
|------|------|
| `middleware.ts` | Enforces auth at edge |
| `AuthProvider.tsx` | Client auth state |
| `Navbar.tsx` | Auth-aware nav |
| `app/login/page.tsx` | Login with redirect |
| `app/register/page.tsx` | Register |
| `AuthGuard.tsx` | Client-side fallback guard |

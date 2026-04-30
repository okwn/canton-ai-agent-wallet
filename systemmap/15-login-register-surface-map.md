# 15. Login / Register Surface Map

## Overview

Login and Register are the gateway surfaces between public and authenticated experiences. This document maps the design, layout, components, and flow of these auth surfaces in the Marcus dark theme.

---

## Design System: Marcus Dark

### Colors
```css
--color-page: #111110          /* Background */
--color-elevated: #1a1918      /* Card surfaces */
--color-muted-surface: #242320 /* Input backgrounds */
--color-foreground: #f5f3ef    /* Primary text */
--color-secondary: #a8a4cc     /* Secondary text */
--color-muted: #6b6860         /* Placeholder text */
--color-accent: #7fb069        /* Brand accent (leaf green) */
--color-accent-muted: rgba(127, 176, 105, 0.15)
--color-border: #2e2c2a        /* Borders */
--color-destructive: #f87171   /* Error states */
```

### Typography
- Font: Inter (Google Fonts)
- Headings: 600 weight, tight tracking
- Body: 400 weight, 1rem
- Labels: 500 weight, 0.875rem

### Spacing
- Card padding: `1.5rem` (24px)
- Form field gap: `1.25rem` (20px)
- Page padding: `1.5rem` (24px)

---

## Login Page (`/login`)

### Layout
```
┌─────────────────────────────────────────┐
│ Header: [Logo]              [Sign up]  │  ← Public nav (no auth links)
├─────────────────────────────────────────┤
│                                         │
│              Welcome back                │  ← H1, centered
│         Sign in to access dashboard     │  ← Subtext
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  [Error banner if applicable]    │   │  ← Red bg, only shows on error
│  │                                  │   │
│  │  Email                           │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │ you@example.com          │    │   │  ← Input field
│  │  └─────────────────────────┘    │   │
│  │                                  │   │
│  │  Password                        │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │ ••••••••          [Hide]│    │   │  ← Password toggle
│  │  └─────────────────────────┘    │   │
│  │                                  │   │
│  │  [      Sign in      ]           │   │  ← Primary button, full width
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Demo credentials                 │   │  ← Muted card
│  │ demo@marcus.ai                  │   │
│  │ demo123                          │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Continue to public terminal without     │  ← Footer link
│  signing in                             │
│                                         │
└─────────────────────────────────────────┘
```

### Components
- **Header**: Logo (links to `/`) + "Create an account" link (links to `/register`)
- **SurfaceCard**: Elevated card containing the form
- **Input fields**: Email (type=email), Password (type=password with show/hide toggle)
- **PrimaryButton**: Full-width, centered
- **ErrorBanner**: Red background, shows validation/auth errors
- **DemoCredentials**: Muted card with hint text

### States

| State | Visual |
|-------|--------|
| Default | Form ready, demo credentials visible |
| Loading | Button shows "Signing in...", inputs disabled |
| Error | Error banner appears above form fields |
| Success | Redirect to dashboard |

### Redirect Handling
```
/login                    → After login → /dashboard
/login?redirect=/policies → After login → /policies
```

---

## Register Page (`/register`)

### Layout
```
┌─────────────────────────────────────────┐
│ Header: [Logo]              [Sign in]  │  ← Public nav (Login link)
├─────────────────────────────────────────┤
│                                         │
│           Create your account           │  ← H1, centered
│     Start with access to the dashboard  │  ← Subtext
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  [Error banner if applicable]    │   │
│  │                                  │   │
│  │  Name                            │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │ Your name                │    │   │
│  │  └─────────────────────────┘    │   │
│  │                                  │   │
│  │  Email                           │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │ you@example.com          │    │   │
│  │  └─────────────────────────┘    │   │
│  │                                  │   │
│  │  Password                        │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │ ••••••••          [Hide]│    │   │
│  │  └─────────────────────────┘    │   │
│  │                                  │   │
│  │  Confirm Password                │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │ ••••••••          [Hide]│    │   │
│  │  └─────────────────────────┘    │   │
│  │                                  │   │
│  │  [    Create account    ]        │   │  ← Primary button
│  │                                  │   │
│  │  By creating account, you agree   │  ← Terms text, muted
│  │  to our terms of service...       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ What you get with an account     │   │  ← Benefits card
│  │ • Persistent policy config       │   │
│  │ • Cross-session activity history │   │
│  │ • Dashboard with wallet overview │   │
│  │ • Yield opportunity tracking     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Try the public terminal first          │  ← Footer link
│  no account needed                      │
│                                         │
└─────────────────────────────────────────┘
```

### Components
- **Header**: Logo + "Sign in" link
- **SurfaceCard**: Elevated card containing the form
- **Input fields**: Name, Email, Password, Confirm Password
- **PrimaryButton**: Full-width, centered
- **ErrorBanner**: Same as login
- **BenefitsCard**: Muted card listing account benefits

### Validation Rules
| Field | Rule |
|-------|------|
| Name | Required, any text |
| Email | Required, valid email format |
| Password | Required, minimum 6 characters |
| Confirm Password | Must match password |

### States

| State | Visual |
|-------|--------|
| Default | Form ready, benefits card visible |
| Loading | Button shows "Creating account...", inputs disabled |
| Validation Error | Error banner with specific message |
| Email Exists | Error: "An account with this email already exists" |
| Success | Redirect to /dashboard |

---

## Shared Patterns

### Header
- Logo links to home (`/`)
- Auth pages show contextual nav (Login shows Register link, Register shows Login link)
- No auth-dependent links (no Dashboard, no user menu)

### Input Fields
```
┌─────────────────────────────┐
│ Label                        │  ← Text above input
│ ┌─────────────────────────┐ │  ← bg: muted-surface
│ │ Placeholder text        │ │  ← border: border
│ └─────────────────────────┘ │  ← focus: border-interactive-hover + glow
└─────────────────────────────┘
```

### Password Toggle
- Small "Show"/"Hide" button inside input (right side)
- Toggles between `type="password"` and `type="text"`

### Error Banner
```
┌─────────────────────────────────┐
│ ⚠ Error message here            │  ← bg: destructive-bg, border: destructive/20
└─────────────────────────────────┘
```

### Loading State
- Button text changes to "Signing in..." or "Creating account..."
- Inputs get `disabled` attribute
- Button gets `disabled` attribute

### Demo Credentials Card (Login only)
```
┌─────────────────────────────────┐
│ Demo credentials                │  ← Label in muted
│ demo@marcus.ai                  │  ← Monospace
│ demo123                         │
└─────────────────────────────────┘
```

---

## Flow Diagrams

### Login Flow
```
/login page load
    ↓
User enters email + password
    ↓
[Submit]
    ↓
isLoading = true, error = null
    ↓
login(email, password)
    ↓
┌─ Wait 500ms (simulate network)
│
├─ Mock user found AND password matches
│   → Set auth cookie
│   → Set user state
│   → router.push(redirect or /dashboard)
│
└─ Mock user NOT found OR password wrong
    → error = "Invalid email or password"
    → isLoading = false
```

### Register Flow
```
/register page load
    ↓
User enters name + email + password + confirm
    ↓
[Submit]
    ↓
Validate: passwords match? passwords >= 6 chars?
    ↓
┌─ Validation failed
│   → error = specific validation message
│
└─ Validation passed
    │
    ↓
isLoading = true, error = null
    ↓
register(email, password, name)
    ↓
┌─ Wait 500ms (simulate network)
│
├─ Email NOT in mock store
│   → Create user in mock store
│   → Set auth cookie
│   → Set user state
│   → router.push(/dashboard)
│
└─ Email already exists
    → error = "An account with this email already exists"
    → isLoading = false
```

---

## Accessibility

- All inputs have associated `<label>` elements
- Error messages linked via `aria-describedby`
- Focus states visible (custom glow effect)
- Color contrast meets WCAG AA
- Form can be submitted with Enter key
- Loading state communicated via button text

---

## Responsive Behavior

### Desktop (md+)
- Centered card, max-width 384px
- Card padding 24px
- Horizontal nav in header

### Mobile (<md)
- Full-width card (with 24px horizontal margin)
- Reduced padding (20px)
- Hamburger menu in header (if any nav needed)

---

## Component Inventory

| Component | Location | States |
|-----------|----------|--------|
| Header | `app/login/page.tsx`, `app/register/page.tsx` | Static |
| SurfaceCard | shadcn/ui | default, elevated |
| Input | Native HTML | default, focus, disabled, error |
| PrimaryButton | shadcn/ui button | default, hover, active, disabled, loading |
| ErrorBanner | Inline | visible, hidden |
| DemoCredentials | Inline | visible |
| BenefitsCard | Inline | visible |

---

## Files

| File | Description |
|------|-------------|
| `app/login/page.tsx` | Login page component |
| `app/register/page.tsx` | Register page component |
| `components/auth/AuthProvider.tsx` | Auth context and login/register logic |
| `components/ui/SurfaceCard.tsx` | Card component |
| `components/ui/button.tsx` | Button variants |

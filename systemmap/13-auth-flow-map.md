# 13. Auth Flow Map

## Overview

This document describes how authentication flows work in Marcus — from login/registration through session management to route access control.

---

## Authentication Model

**Type**: Cookie-based session auth (hackathon-safe, mock implementation)

**Session Storage**: HTTP-only cookie (`marcus_auth`) containing a base64-encoded mock token

**Provider**: `AuthProvider` React context + middleware cookie check

---

## Login Flow

```
User visits /login
    ↓
[Login Form] - email + password
    ↓
AuthProvider.login(email, password)
    ↓
Validate against mock user store
    ↓
Success: Create token (btoa(email)), set cookie, update React state, redirect to /dashboard or ?redirect param
    ↓
Failure: Show error message, stay on login page
```

### Demo Credentials
- Email: `demo@marcus.ai`
- Password: `demo123`

---

## Register Flow

```
User visits /register
    ↓
[Register Form] - name + email + password + confirm password
    ↓
Validate: passwords match, password >= 6 chars
    ↓
AuthProvider.register(email, password, name)
    ↓
Check if email already exists in mock store
    ↓
Success: Create user in mock store, auto-login, redirect to /dashboard
    ↓
Failure: Show error (email exists or other), stay on register page
```

---

## Session Management

### Client Side
- `AuthProvider` React context holds `user` state
- `user` object: `{ id, email, name }`
- `logout()` clears cookie and resets user state

### Server Side (Middleware)
- `middleware.ts` reads `marcus_auth` cookie on every request
- If cookie exists and valid → allow access
- If cookie missing on protected route → redirect to `/login?redirect=<original_path>`

### Cookie Details
- Name: `marcus_auth`
- Max-Age: 7 days
- SameSite: Lax

---

## Route Access Control

### Protected Routes (require auth)
```
/dashboard
/activity
/policies
/opportunities
/wallet
```

### Public Routes (no auth required)
```
/                - Home page
/agent           - Public terminal (demo mode)
/login           - Login form
/register        - Registration form
/api/*           - API routes (individual routes handle their own auth)
```

### Middleware Logic
```typescript
if (isPublicRoute(pathname)) {
  return NextResponse.next();
}

const authCookie = request.cookies.get('marcus_auth');
if (!authCookie) {
  return NextResponse.redirect('/login?redirect=' + pathname);
}

return NextResponse.next();
```

---

## Auth State Awareness

### Navbar
- **Guest**: Home | How it works | Open Agent + Login | Register
- **Authenticated**: Dashboard | Open Agent + [User Avatar dropdown: Dashboard | Sign out]

### Login Page
- Shows different nav (no Login/Register links)
- Redirect to ?redirect param after successful login
- Demo credentials hint shown below form

### Register Page
- Shows different nav (Login link instead of Register)
- Shows "What you get with an account" benefits list

---

## Auth Provider API

```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
```

---

## Auth Guard Component

`<AuthGuard>` wraps protected content:
- Shows loading spinner while checking auth
- Shows "Authentication required" card with login/register buttons if not authenticated
- Renders children if authenticated

Currently used as client-side fallback (middleware handles main protection).

---

## Redirect Flow

When accessing protected route without auth:
```
/dashboard → middleware → /login?redirect=/dashboard
    ↓
User logs in → redirect to /dashboard
```

---

## Key Files

| File | Purpose |
|------|---------|
| `middleware.ts` | Route protection at edge |
| `AuthProvider.tsx` | Client-side auth state |
| `AuthGuard.tsx` | Protected content wrapper |
| `Navbar.tsx` | Auth-aware navigation |
| `app/login/page.tsx` | Login form |
| `app/register/page.tsx` | Registration form |

---

## Limitations (Hackathon Mode)

1. **Mock user store**: No real database — users stored in memory
2. **No password hashing**: Plain text comparison (demo only)
3. **No session expiry refresh**: Cookie lasts 7 days then expires
4. **No OAuth/Social login**: Email/password only
5. **No "forgot password" flow**: Not implemented
6. **No email verification**: Instant registration

For production: integrate with real auth service (Auth0, Clerk, NextAuth, Supabase Auth, etc.)

---

## Future Auth Enhancements

- [ ] Real database for user storage
- [ ] Password hashing with bcrypt
- [ ] JWT tokens instead of mock tokens
- [ ] Session refresh mechanism
- [ ] OAuth providers (Google, GitHub)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Rate limiting on login attempts
- [ ] Account lockout after failed attempts

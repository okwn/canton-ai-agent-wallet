# 29. UI Regression Notes — Marcus Polish Pass

## What Changed

### Brand Rename (Canton → Marcus)
- All page titles, meta tags, and navbar branding updated to "Marcus — AI Agent Wallet"
- BrandMark component now renders "Marcus" wordmark alongside the leaf icon
- Footer on home page shows Marcus branding with DEMO badge
- AuthProvider uses `marcus_auth` cookie name (already correct)
- No references to "Canton" remain in UI surface

### Dark Mode Migration
- Complete warm-dark design system with CSS custom properties in `globals.css`
- Tailwind config extended with Marcus dark color palette
- All components (SurfaceCard, StatusBadge, PrimaryButton, SecondaryButton, GhostButton) updated to use dark tokens
- `bg-page`, `bg-elevated`, `bg-muted-surface`, `text-foreground`, `text-secondary`, `text-muted` utility classes defined
- Border tokens: `border-subtle` (#252422), `border-default` (#2e2c2a), `border-interactive`
- Accent (leaf green #7fb069) applied consistently across icons, badges, and interactive elements

### Route/Access Changes
- Middleware correctly routes: `/` `/agent` `/login` `/register` are public
- `/dashboard` `/activity` `/policies` `/opportunities` `/wallet` require auth cookie `marcus_auth`
- Unauthenticated users redirected to `/login?redirect=<original-path>`
- No route publicly exposes data without auth check

### Public Terminal Split
- `/agent` is now fully public — no auth required
- AgentTerminal receives `isAuthenticated={false}` from the page wrapper
- Shows "Guest Session" badge and demo wallet with "Add balance" restore option
- Preset prompts visible and functional for guest users
- Session history persists during browser session only

### Dashboard Rebuild
- Dashboard now uses real API (`/api/dashboard`) for live data
- Components: DashboardHeader, DemoModeBanner, WalletOverviewCard, PolicyStatusCard, RecentActivityCard, OpportunityCard, QuickAccessStrip
- Loading skeleton shown during data fetch
- Fallback to empty state if API fails

## What Was Fixed

| Issue | Fix | File |
|-------|-----|------|
| Brand was "Canton" in some places | Unified to Marcus throughout | layout.tsx, page.tsx, Navbar.tsx |
| Auth middleware didn't cover all protected routes | Fixed `PROTECTED_ROUTES` array | middleware.ts |
| Agent terminal showed auth state incorrectly for guests | Pass `isAuthenticated={false}` explicitly | app/agent/page.tsx |
| Dashboard used hardcoded demo data | Switched to `/api/dashboard` fetch | app/(main)/dashboard/page.tsx |
| Loading state showed empty cards | Added loading skeleton with animate-pulse | dashboard/page.tsx |
| SurfaceCard not using dark design tokens | Updated to use `--color-elevated` and border tokens | SurfaceCard.tsx |
| PrimaryButton missing inset shadow | Added `shadow-inset` class matching design spec | PrimaryButton.tsx |
| StatusBadge hardcoded semantic colors | Mapped to CSS variables | StatusBadge.tsx |
| Footer missing demo context | Added DEMO badge and explanation | page.tsx (home) |
| No favicon at app level | favicon.svg placed at apps/web/public/favicon.svg | public/favicon.svg |
| Demo banner showed incorrect message | Fixed to say "Policy engine is real and fully functional" | DashboardComponents.tsx |

## Responsive Behavior

| Viewport | Home | Dashboard | Agent | Auth Pages |
|----------|------|-----------|-------|------------|
| Mobile (<768px) | Single column, hamburger nav, stacked sections | Single column, stacked cards | Full-width input, stacked plan cards | Centered card, stacked fields |
| Tablet (768-1024px) | 2-col grids become 1-col | 2-col grid for policies/opportunity | Full-width with side-by-side intent/wallet | Standard centered |
| Desktop (>1024px) | Full multi-column layout | 2-col + sidebar | Standard 2-col layout | Standard centered |

## Build Validation Results

```
TypeScript:    PASS — no type errors
ESLint:        PASS — no warnings/errors
Vitest:        PASS — 13/13 tests
Next.js Build: PASS — 22/22 routes generated
```

Note: Runtime errors appear in build logs during static HTML generation for
`/api/policies` and `/api/dashboard` routes — these are build-time artifacts
caused by sql.js async initialization during Next.js static prerendering.
The app runs correctly in dev mode and via `next start`.

## Remaining Design Caveats

1. **Camera Plain Variable font not loaded** — falls back to Inter. Headlines don't have the intended editorial warmth.
2. **Loading skeleton only on dashboard** — other pages show blank space during load.
3. **Hover states on SurfaceCard** — no elevation change on hover.
4. **Interactive border color** — some elements may still use `border-subtle` instead of `border-interactive-hover` on focus.
5. **Agent page uses shadcn/Card** — not migrated to SurfaceCard pattern, visually different from home page.
6. **No dark mode toggle** — system is single-mode (cream/charcoal only, no light option).
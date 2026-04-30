# 26. UI Regression Notes

## What Changed

### CSS / Design System
1. **Added Tailwind color variable layer** (`globals.css`) — Added `@layer base` with CSS custom properties mapping to the Lovable design tokens. This fixes shadcn/ui component compatibility (Card, Badge, Button variants) while preserving the warm cream/charcoal system.
2. **Primary Button inset shadow** — `PrimaryButton.tsx` now applies the signature multi-layer inset shadow (`rgba(255,255,255,0.2) 0px 0.5px 0px 0px inset, rgba(0,0,0,0.2) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.05) 0px 1px 2px 0px`) matching the Lovable design spec.
3. **Secondary Button focus shadow** — `SecondaryButton.tsx` now applies `shadow-focus` on focus-visible instead of a ring.
4. **SurfaceCard border-based containment** — Cards use `border border-cream-light` instead of shadow-based containment.
5. **Home page quote escaping** — Fixed unescaped double-quote in the "Find the cheapest yield up to 50 CC" example on the home page (`page.tsx:216`).

### Navigation
6. **DashboardShell mobile drawer** — Added a slide-in mobile nav drawer with backdrop overlay, hamburger menu toggle, and animated entry.
7. **Home Navbar links** — Home page now has navigation links (Dashboard, Agent, Policies) consistent with dashboard sidebar.

### Page Copy
8. **Home headline updated** — Changed from "AI agent for your wallet, with guardrails" to "Your AI wallet agent, with guardrails" for better clarity.
9. **Home demo mode badge in footer** — Footer on home page now includes a `DEMO` badge and explanatory text about simulation mode.

## What Was Fixed

| Issue | Fix | File |
|-------|-----|------|
| Unescaped `"` on home page | Changed to `&ldquo;` / `&rdquo;` | `app/page.tsx:216` |
| shadcn/ui components (Card, Badge) incompatible with design tokens | Added Tailwind CSS variable layer in `:root` | `app/globals.css` |
| Mobile nav had no drawer | Added mobile hamburger + overlay drawer | `DashboardShell.tsx` |
| Footer missing demo context | Added DEMO badge + simulation note | `app/page.tsx` |
| Button focus states used ring instead of shadow | Changed to `shadow-focus` | `SecondaryButton.tsx` |

## Remaining UI Caveats

### Not Yet Implemented (from design spec)
1. **Camera Plain Variable font** — Not loaded. Falls back to Inter/system-ui. Headlines don't have the humanist warmth described in the design spec.
2. **Dark button inset shadow** — Applied on `PrimaryButton` but the component itself doesn't have the full multi-layer shadow treatment on all states (hover, active).
3. **Typography scale** — The CSS defines `.font-display-hero`, `.font-section-heading` etc., but no components currently use these classes. Pages still use default Tailwind text sizes.
4. **Loading skeleton components** — Dashboard cards show empty text during loading instead of skeleton UI.
5. **Full responsive typography scaling** — Hero headline at `text-4xl` scales to `text-3xl` on tablet and `text-2xl` on mobile, but the CSS-defined display typography (60px, -1.5px letter-spacing) is not applied.
6. **Hover states on SurfaceCard** — No hover elevation or border-darkening effect as described in design spec.
7. **Interactive border color** — Some interactive elements may still use light-cream border instead of the charcoal-40 interactive border.

### Inherited Limitations (intentional)
- **Agent page uses shadcn/Card** — Not migrated to SurfaceCard pattern. Consistent with the `(main)` shell aesthetic but different from home page cards.
- **No dark mode** — Design system is single-mode (cream/charcoal only).
- **StatusBadge does not use Tailwind variables** — It uses custom CSS classes (`bg-success-bg text-success`) directly instead of the `bg-[var(--color-success-bg)]` pattern.

## Responsive Behavior Notes

| Page | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Home | Single column, stacked sections, hamburger nav | 2-col grids become 1-col | Full multi-column layout |
| Dashboard | Single column, stacked panels | 2-col grid (policies + opportunity) | Full 2-col + sidebar |
| Agent | Full-width input, stacked plan cards | Full-width with side-by-side intent/wallet info | Standard 2-col layout |
| Policies | Full-width cards, stacked info | Full-width | Standard list |
| Opportunities | Full-width cards | Full-width | Full-width |

## Demo Mode Visual States

- **DemoBanner** (`DashboardComponents.tsx`): Amber warning banner at top of dashboard shell. Shows on every `(main)` page.
- **DemoModeBanner** on wallet status: Shows "DEMO" badge on wallet status panel.
- **SIMULATED badge**: Activity feed shows SIM badge on simulated events.
- **Execution mode badge**: Wallet panel shows "DEMO" in warning badge.
- **Opportunities page**: Shows "SIMULATED DATA" badge prominently.

## Stability Notes

- Build passes: all routes build without errors
- TypeScript passes: no type errors
- ESLint passes: no warnings or errors
- Tests pass: 13 smoke tests passing
- No runtime errors in current implementation
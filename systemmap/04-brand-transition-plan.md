# 04. Brand Transition Plan

## What Changed

| Element | Old | New |
|---------|-----|-----|
| Brand name | Canton Agent Wallet | **Marcus** |
| Brand symbol | "CA" monogram | Leaf icon |
| Color mode | Warm cream (light) | Dark mode (deep charcoal) |
| Logo text | "Canton Wallet" / "Canton Agent Wallet" | "Marcus" |
| Tagline | "AI agent for your wallet, with guardrails" | "Your AI wallet agent, with guardrails" (keep) |
| Home headline | "Your AI wallet agent, with guardrails" | Keep (works for Marcus) |
| Footer brand | "Canton Agent Wallet" | "Marcus" |

---

## What "Brand" Means in This Context

"Brand" in this document refers to:
1. **UI text** — every visible label, heading, badge, button, nav item that says "Canton"
2. **Logo mark** — the "CA" monogram replaced by a leaf
3. **Color scheme** — cream backgrounds replaced by dark charcoal backgrounds
4. **Metadata** — page titles, descriptions, favicon

It does NOT refer to the underlying technical product (agent-core, policy-engine, agent-service) which remains the same.

---

## Files to Update — UI Text

### `apps/web/app/page.tsx` (Home)
- [ ] Headline: "Your AI wallet agent, with guardrails" — keep (neutral)
- [ ] "Canton Agent Wallet" in footer → "Marcus"
- [ ] Footer DEMO badge → keep
- [ ] Nav links: keep existing structure

### `apps/web/app/layout.tsx`
- [ ] `<title>Canton Agent Wallet</title>` → `<title>Marcus — AI Wallet Agent</title>`
- [ ] `<meta name="description">` → update for Marcus
- [ ] Body className: `bg-cream text-charcoal` → dark mode equivalent

### `apps/web/components/ui/DashboardShell.tsx`
- [ ] Logo text "Canton Wallet" → "Marcus"
- [ ] "CA" monogram → leaf SVG

### `apps/web/components/ui/Navbar.tsx`
- [ ] "Canton Agent Wallet" text → "Marcus" in default logo
- [ ] "CA" monogram → leaf SVG

### `apps/web/components/wallet/WalletConnectButton.tsx`
- [ ] Any "Canton" text → "Marcus"

### `apps/web/app/(main)/dashboard/page.tsx`
- [ ] "Canton Wallet" references → "Marcus"

### Footer of any page
- [ ] "Canton Agent Wallet" → "Marcus"

---

## Files to Update — Color Mode

### `apps/web/app/globals.css`
```css
/* Old (light mode) */
--color-cream: #f7f4ed;
--color-charcoal: #1c1c1c;  /* text on light bg */

/* New (dark mode) — approximate mapping */
--color-bg-deep: #0f0f0f;      /* near black page bg */
--color-bg-surface: #1a1a1a;    /* card/panel bg */
--color-bg-elevated: #242424;  /* elevated surfaces */
--color-text-primary: #f5f5f5; /* primary text (light on dark) */
--color-text-secondary: #a0a0a0; /* muted text */
--color-border: #2a2a2a;       /* subtle borders */
--color-accent: #4ade80;       /* green accent (leaf-inspired) */
```

### `apps/web/tailwind.config.ts`
- [ ] Update color palette for dark mode
- [ ] Tailwind ring/shadow variables updated for dark bg

### All page backgrounds
- [ ] `bg-cream` → `bg-[#0f0f0f]` (or dark equivalent)
- [ ] `text-charcoal` → `text-[#f5f5f5]`
- [ ] `border-cream-light` → `border-[#2a2a2a]`

### Component backgrounds
- [ ] `SurfaceCard` background: cream → dark surface
- [ ] `StatusBadge` variants: adjust for dark bg
- [ ] `DashboardShell` sidebar: cream bg → dark bg

---

## Files to Update — Logo / Symbol

### Replace "CA" monogram with Leaf SVG
In all components showing "CA":
- `DashboardShell.tsx` logo
- `Navbar.tsx` default logo
- `PrimaryButton` or any marketing logo

Leaf SVG could be:
```tsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12z" fill="#4ade80"/>
  <path d="M12 22V12" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round"/>
</svg>
```

---

## Files to Update — Metadata

### `apps/web/app/layout.tsx`
```tsx
export const metadata: Metadata = {
  title: 'Marcus — AI Wallet Agent',
  description: 'Describe what you want. Marcus checks your policies. Only executes when you approve.',
  icons: {
    icon: '/favicon-leaf.svg',  // new leaf favicon
  }
}
```

---

## Files to Update — SystemMap Docs

| File | Changes |
|------|---------|
| `systemmap/01-system-overview.md` | Brand name → Marcus |
| `systemmap/README.md` | Brand name → Marcus throughout |
| `systemmap/12-architecture-map.md` | Brand name, logo note |
| `systemmap/27-demo-walkthrough.md` | "Canton" → "Marcus" in all product references |
| `systemmap/28-final-readiness.md` | Brand name update |

---

## Brand Transition Checklist

### Phase 1: Text Changes (Low Effort)
- [ ] Rename "Canton" → "Marcus" in all visible UI text
- [ ] Update `layout.tsx` metadata (title, description, favicon)
- [ ] Update `README.md` at project root
- [ ] Update SystemMap docs

### Phase 2: Color Mode (Medium Effort)
- [ ] Define dark mode CSS variables in `globals.css`
- [ ] Update `tailwind.config.ts` for dark palette
- [ ] Change all page/component backgrounds from cream to dark
- [ ] Change text from charcoal to light-on-dark
- [ ] Update border colors for dark surfaces
- [ ] Adjust StatusBadge variants for dark bg contrast

### Phase 3: Logo (Medium Effort)
- [ ] Replace "CA" monogram with leaf SVG in DashboardShell
- [ ] Replace "CA" monogram with leaf SVG in Navbar
- [ ] Create leaf favicon SVG
- [ ] Update any inline logo references

### Phase 4: Auth/Surface Restructure (High Effort)
- [ ] Create `(public)/layout.tsx` with public top-nav
- [ ] Move home page to `(public)/page.tsx`
- [ ] Create `(auth)/layout.tsx` with DashboardShell
- [ ] Move dashboard pages to `(auth)/` group
- [ ] Create standalone `agent/page.tsx` (no shell)
- [ ] Implement auth middleware
- [ ] Add `/login` and `/register` pages
- [ ] Wire up session auth

---

## What NOT to Change

- Package names (`@canton/agent-core`, `@canton/shared`) — internal only, no user-facing brand
- Database schema and table names — internal
- API route paths — breaking change, keep for now
- Agent core logic — same product, just rebranded
- Policy engine — same logic, just Marcus-branded

---

## Order of Operations

1. **This session**: Complete Phase 1 (text changes) and update SystemMap docs
2. **Next session**: Phase 2 (dark mode colors)
3. **Next session**: Phase 3 (leaf logo)
4. **Next session**: Phase 4 (route restructure + auth) — largest effort

**This plan document is the output of this session. Implementation comes in subsequent phases.**
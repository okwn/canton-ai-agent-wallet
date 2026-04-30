# Marcus Global Navigation Map

## Navigation Architecture

Marcus has two distinct navigation contexts:

1. **Public Navigation** — Landing page, marketing, unauthenticated users
2. **Authenticated Navigation** — Dashboard shell with sidebar, logged-in users

Both use the **same dark design system** but have different navigation patterns.

---

## Public Navigation

**Component:** `apps/web/components/ui/Navbar.tsx`

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Leaf] Marcus     Home   How it works   CLI    │ Login  Register  [Open Agent] │
└─────────────────────────────────────────────────────────────────────┘
```

### Structure

| Position | Element | Description |
|----------|---------|-------------|
| Left | BrandMark | Leaf + "Marcus" wordmark |
| Left | Nav Links | Home, How it works, CLI |
| Right | Auth Links | Login, Register |
| Right | CTA | "Open Agent" button |

### Navigation Links

#### Left Links (Main)
| Label | href | Description |
|-------|------|-------------|
| Home | `/` | Landing page hero |
| How it works | `/#how-it-works` | Feature explanation section |
| CLI | `/cli` | CLI documentation page |

#### Right Links (Auth)
| Label | href | Description |
|-------|------|-------------|
| Login | `/login` | Authentication |
| Register | `/register` | Sign up |

### CTA Button

- Label: "Open Agent"
- href: `/agent`
- Style: Primary button (solid `foreground` bg, `page` text)
- Position: Far right of nav

### Mobile Behavior

Below `md` breakpoint (768px):

1. **Hamburger menu** appears on right
2. **Mobile menu** slides down when hamburger is clicked
3. Mobile menu contains:
   - All main links
   - Auth links
   - Open Agent CTA (full-width at bottom)

### Sticky Behavior

- Navbar is `sticky top-0`
- Border-bottom uses `border-subtle`
- Z-index: 50

### Dark Mode

All nav elements use the dark palette:
- Background: `page` (#111110)
- Text: `secondary` for links, `foreground` on hover
- Border: `border-subtle`
- CTA: `foreground` background with inset shadow

---

## Authenticated Navigation

**Component:** `apps/web/components/ui/DashboardShell.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│ Sidebar (240px fixed)    │    Main Content Area                      │
│                          │                                           │
│  [Marcus Logo]           │    [Top Bar with page title]              │
│                          │                                           │
│  ─────────────           │    [Page Content]                          │
│                          │                                           │
│  Home                    │                                           │
│  Dashboard               │                                           │
│  Agent                   │                                           │
│  Policies                │                                           │
│  Opportunities           │                                           │
│  Activity                │                                           │
│  Wallet                  │                                           │
│                          │                                           │
│  ─────────────           │                                           │
│  [Demo Banner]           │                                           │
└──────────────────────────────────────────────────────────────────────┘
```

### Authenticated Nav Items

| Label | href | Icon | Description |
|-------|------|------|-------------|
| Home | `/` | (link to public) | Return to public site |
| Dashboard | `/dashboard` | LayoutDashboard | Main wallet overview |
| Agent | `/agent` | Bot | Chat with agent |
| Policies | `/policies` | Shield | Manage policies |
| Opportunities | `/opportunities` | TrendingUp | Yield opportunities |
| Activity | `/activity` | Activity | Audit log |
| Wallet | `/wallet` | Wallet | Wallet details |

### Sidebar Behavior

- **Fixed width:** 240px on desktop
- **Collapsible** on mobile (drawer pattern)
- **Active state** for current route
- **Demo Banner** at bottom when in demo mode

### Mobile Behavior

Below `md` breakpoint:
1. Sidebar hidden by default
2. Mobile header shows hamburger
3. Tapping hamburger opens sidebar as drawer
4. Overlay dims content behind sidebar

---

## Responsive Breakpoints

| Breakpoint | Nav Behavior |
|------------|--------------|
| `md` and up | Full horizontal nav, sidebar visible |
| Below `md` | Hamburger menu, mobile nav drawer |

### Breakpoint Reference

```ts
md: '768px'  // Tailwind default
```

---

## Shared Navigation Elements

### BrandMark
Used in both public nav (left) and authenticated shell (top of sidebar).

### Design Tokens
All navigation uses the same dark design tokens:
- Background: `page`
- Borders: `border-subtle`
- Text: `secondary` default, `foreground` hover
- Active: `foreground` text, `accent-muted` background

---

## Navigation State

### Active Link Indication
- Text color: `foreground`
- Background: `accent-muted` (subtle green tint)
- Border-radius: `sm`

### Hover States
- Text color: `foreground` (from `secondary`)
- Background: `foreground-5`

---

## Route Access Pattern

| Route | Navigation | Auth Required |
|-------|------------|---------------|
| `/` | Public Nav | No |
| `/login` | Public Nav | No |
| `/register` | Public Nav | No |
| `/cli` | Public Nav | No |
| `/agent` | Public Nav → Auth Shell | Redirects to dashboard if not auth |
| `/dashboard` | Auth Shell | Yes |
| `/policies` | Auth Shell | Yes |
| `/opportunities` | Auth Shell | Yes |
| `/activity` | Auth Shell | Yes |
| `/wallet` | Auth Shell | Yes |

---

## Implementation Notes

### Navbar Component Props

```tsx
interface NavbarProps {
  className?: string;
  logo?: React.ReactNode;           // Override BrandMark
  leftLinks?: NavLink[];            // Override default left links
  rightLinks?: NavLink[];           // Override default right links
  cta?: React.ReactNode;            // Override Open Agent button
  sticky?: boolean;                 // Default: true
}
```

### Navigation Link Type

```tsx
interface NavLink {
  label: string;
  href: string;
}
```

### Mobile Menu State
Managed with `useState` hook in Navbar component:
- `mobileMenuOpen: boolean`
- Toggles on hamburger click
- Closes on link click

---

## Files Reference

| File | Purpose |
|------|---------|
| `apps/web/components/ui/Navbar.tsx` | Public landing navigation |
| `apps/web/components/ui/DashboardShell.tsx` | Authenticated app shell |
| `apps/web/components/ui/BrandMark.tsx` | Logo component |
| `apps/web/components/ui/index.ts` | Component exports |

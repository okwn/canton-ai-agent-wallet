# Marcus Logo & Favicon Map

## Brand Name

**Marcus** — A warm, approachable name for an AI agent wallet.

## Brand Symbol: Leaf

The Marcus brand symbol is a **leaf**, representing:
- Growth and natural intelligence
- Gentle, organic power
- A departure from cold, robotic AI aesthetics

The leaf is **muted sage green** (`#7fb069`), warm and natural, not neon or aggressive.

## Logo Design Principles

### What Makes a Premium Leaf Logo

1. **Simple silhouette** — Single continuous leaf shape
2. **Clean curves** — No jagged edges or excessive detail
3. **Product-grade, not clipart** — Looks intentional, designed
4. **Subtle internal detail** — Light vein/highlight adds depth without complexity
5. **Scalable** — Works from 16px favicon to large hero display

### Design Specifications

```
ViewBox: 32x32

Leaf body: curved teardrop shape pointing up-right
  - Starts at bottom-left stem
  - Curves up to pointed top
  - Curves back down to stem
  - Filled with accent green at 90% opacity

Leaf highlight: subtle stroke along left curve
  - Accent green at 40% opacity
  - 1.5px stroke, round cap

Stem: simple line from bottom of leaf
  - 1.5px stroke, round cap
  - Accent green at 60% opacity

Center vein: subtle line from top to lower third
  - 1px stroke, round cap
  - Accent green at 30% opacity
```

## BrandMark Component

**Location:** `apps/web/components/ui/BrandMark.tsx`

### Variants

| Variant | Description |
|---------|-------------|
| `mark` | Leaf icon only, no text |
| `full` | Leaf icon + "Marcus" wordmark |

### Sizes

| Size | Mark Dimensions | Text Size | Gap |
|------|----------------|-----------|-----|
| `sm` | 24x24 | 14px | 6px |
| `md` | 32x32 | 16px | 8px |
| `lg` | 40x40 | 18px | 10px |

### Usage

```tsx
// Leaf only (for favicon, small contexts)
<BrandMark variant="mark" size="md" />

// Full logo (for navbar, headers)
<BrandMark variant="full" size="md" />

// Large hero variant
<BrandMark variant="full" size="lg" />
```

## Favicon Assets

### Source File

**Location:** `apps/web/public/favicon.svg`

SVG format, optimized for web. Contains the same leaf icon as the BrandMark component.

### Favicon Usage

The favicon is wired into the app via `layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Marcus — AI Agent Wallet',
  description: '...',
  icons: {
    icon: '/favicon.svg',
  },
};
```

### Favicon Specifications

| Property | Value |
|----------|-------|
| Format | SVG (scalable) |
| ViewBox | 0 0 32 32 |
| Primary Color | `#7fb069` (accent) |
| Background | Transparent |

## Logo Usage Guidelines

### Do

- Use the BrandMark component for consistent rendering
- Use the `full` variant in headers and marketing
- Use the `mark` variant when space is constrained
- Maintain minimum clear space around the logo

### Don't

- Don't stretch or distort the logo
- Don't change the leaf color outside the accent palette
- Don't add shadows or effects to the logo
- Don't use the logo at sizes below 16px

## Logo in Context

### Navbar (Public Landing)
```
[Leaf] Marcus     Home  How it works  CLI     Login  Register  [Open Agent]
```
Uses: `BrandMark variant="full" size="md"`

### Authenticated Dashboard
May use the `mark` variant in the sidebar to save space.

### Hero / Marketing
```
[Large Leaf Illustration]     <- hero-sized leaf graphic
```
Can be rendered at larger scale for impact.

## File Reference

| Asset | Location |
|-------|----------|
| BrandMark Component | `apps/web/components/ui/BrandMark.tsx` |
| Favicon SVG | `apps/web/public/favicon.svg` |
| UI Index Export | `apps/web/components/ui/index.ts` |

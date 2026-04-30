# Design System Map

## Overview

The Canton AI Agent Wallet uses a **warm, editorial, trust-first design system** inspired by the Lovable design language. The system prioritizes clarity, calmness, and premium feel over flashy AI-dashboard clichés.

---

## Token System

### Color Tokens

#### Foundation Colors
| Token | Hex/Value | Usage |
|-------|-----------|-------|
| `--color-cream` | `#f7f4ed` | Page background, card surfaces |
| `--color-light-cream` | `#eceae4` | Borders, dividers |
| `--color-off-white` | `#fcfbf8` | Button text on dark backgrounds |

#### Charcoal Scale (Opacity-Based)
| Token | Hex/Value | Usage |
|-------|-----------|-------|
| `--color-charcoal` | `#1c1c1c` | Primary text, headings, dark buttons |
| `--color-charcoal-83` | `rgba(28,28,28,0.83)` | Strong secondary text |
| `--color-charcoal-82` | `rgba(28,28,28,0.82)` | Body copy |
| `--color-charcoal-40` | `rgba(28,28,28,0.4)` | Interactive borders |
| `--color-charcoal-4` | `rgba(28,28,28,0.04)` | Subtle hover backgrounds |
| `--color-charcoal-3` | `rgba(28,28,28,0.03)` | Barely-visible overlays |

#### Semantic Colors
| Token | Hex/Value | Usage |
|-------|-----------|-------|
| `--color-muted` | `#5f5f5d` | Secondary text, captions |
| `--color-success` | `#16a34a` | Success states, REAL badges |
| `--color-warning` | `#d97706` | Warning states, SIMULATED badges |
| `--color-destructive` | `#dc2626` | Error states |

#### Background Colors
| Token | Hex/Value | Usage |
|-------|-----------|-------|
| `--color-success-bg` | `rgba(22,163,74,0.1)` | Success background tint |
| `--color-warning-bg` | `rgba(217,119,6,0.1)` | Warning background tint |
| `--color-destructive-bg` | `rgba(220,38,38,0.1)` | Error background tint |

---

### Shadow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-inset` | Multi-layer inset | Primary dark buttons |
| `--shadow-focus` | `0 4px 12px rgba(0,0,0,0.1)` | Focus and active states |

---

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-micro` | `4px` | Small buttons, micro elements |
| `--radius-sm` | `6px` | Standard buttons, inputs |
| `--radius-md` | `8px` | Compact cards |
| `--radius-lg` | `12px` | Standard cards, images |
| `--radius-xl` | `16px` | Large containers |
| `--radius-full` | `9999px` | Pills, badges, toggles |

---

### Spacing Scale (8px Base)

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--space-1` | `4px` | Micro gaps |
| `--space-2` | `8px` | Tight spacing |
| `--space-3` | `12px` | Compact padding |
| `--space-4` | `16px` | Standard padding |
| `--space-6` | `24px` | Section gaps |
| `--space-8` | `32px` | Card padding |
| `--space-10` | `40px` | Large gaps |
| `--space-12` | `48px` | Section padding |
| `--space-16` | `64px` | Large section gaps |
| `--space-20` | `80px` | Editorial spacing |
| `--space-24` | `96px` | Hero spacing |

---

## Typography System

### Font Stack
```
'Inter', ui-sans-serif, system-ui, sans-serif
```

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display Hero | 60px / 3.75rem | 600 | 1.05 | -1.5px |
| Display Alt | 60px | 480 | 1.0 | normal |
| Section Heading | 48px / 3rem | 600 | 1.0 | -1.2px |
| Subheading | 36px / 2.25rem | 600 | 1.1 | -0.9px |
| Card Title | 20px / 1.25rem | 400 | 1.25 | normal |
| Body Large | 18px / 1.125rem | 400 | 1.38 | normal |
| Body | 16px / 1rem | 400 | 1.5 | normal |
| Caption | 14px / 0.875rem | 400 | 1.5 | normal |
| Label | 14px | 400 | 1.5 | normal |
| Button | 14-16px | 400 | 1.5 | normal |

---

## Depth System

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, cream background | Page surface |
| Bordered | `1px solid #eceae4` | Cards, containers |
| Elevated | Bordered + `shadow-focus` | Active states, modals |
| Inset | `--shadow-inset` | Dark buttons only |

**Key Principle**: Borders define boundaries, not shadows. Shadows are only used for focus states and the signature inset button technique.

---

## Responsive Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | < 640px | Single column, hamburger nav |
| Tablet | 640-768px | 2-column grids begin |
| Desktop | 768-1024px | Sidebar layout |
| Large Desktop | > 1280px | Max content width |

---

## Layout System

### Container
- Max width: `1200px`
- Padding: `24px` (mobile), `32px` (desktop)

### Page Backgrounds
- Home page: cream (`#f7f4ed`)
- Dashboard: cream (`#f7f4ed`)
- Section alternation: cream → light cream → cream

### Dashboard Inner Shell
- Fixed sidebar: `224px` width
- Main content area: fluid with `32px` padding
- Demo banner: fixed at top of content

---

## Interaction Rules

### Focus States
- Use soft shadow: `0 4px 12px rgba(0,0,0,0.1)`
- No harsh rings or outlines
- Focus visible on all interactive elements

### Hover States
- Opacity: 0.8 for active states
- Background: `charcoal-4` for subtle hover
- Border: `charcoal-40` for interactive emphasis

### Active/Press States
- Opacity: 0.8
- No color change
- Maintains tactile feedback

### Buttons Feel
- Tactile, not glossy
- Inset shadow on dark buttons creates pressed-into-surface feel
- No heavy gradients or 3D effects

---

## Animation Guidelines

| Animation | Duration | Easing | Use |
|-----------|----------|--------|-----|
| Fade in | 300ms | ease-out | Page transitions, reveals |
| Pulse subtle | 1500ms | ease-in-out | Loading indicators |
| Slide in | 300ms | ease-out | Mobile menu |

---

## Known Temporary Compromises

1. **Inter font instead of Camera Plain Variable**: Camera Plain Variable is not available on Google Fonts. Inter is used as a humanist alternative with similar warmth to Geist but better weight support.

2. **Blue removed from palette**: The original shadcn blue (`hsl(220, 80%, 55%)`) has been removed. If needed for future states, use semantic colors (success, warning, destructive) rather than introducing brand blue.

3. **JetBrains Mono for code**: While Inter has a monospace cousin, JetBrains Mono is used for wallet addresses and numbers for clarity.

4. **Sidebar uses CSS border, not Tailwind border class**: Due to the opacity-based system, border colors are set via CSS variables rather than Tailwind's `border-` utility.

5. **Demo banner is inline in DashboardShell**: Rather than a separate component, the demo banner is integrated into the shell layout for consistency.

# Marcus Dark Design System — Token Map

## Overview

The Marcus design system is a **warm-dark** visual foundation. Unlike cold blue SaaS dark modes, Marcus uses warm blacks and browns reminiscent of aged paper, leather, and natural materials. The palette is designed to feel **premium, minimal, calm, and modern**.

## Color Palette

### Page & Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `page` | `#111110` | Page background, deepest dark |
| `elevated` | `#1a1918` | Cards, modals, dropdowns |
| `elevated-hover` | `#201f1d` | Elevated surface hover state |
| `muted-surface` | `#242320` | Secondary containers, input backgrounds |
| `muted-surface-hover` | `#2a2926` | Muted surface hover state |

### Foregrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `foreground` | `#f5f3ef` | Primary text on dark backgrounds |
| `foreground-90` | `rgba(245,243,239,0.9)` | Slightly muted primary text |
| `foreground-70` | `rgba(245,243,239,0.7)` | Secondary text |
| `foreground-50` | `rgba(245,243,239,0.5)` | Placeholder text |
| `foreground-10` | `rgba(245,243,239,0.1)` | Subtle tints |
| `foreground-5` | `rgba(245,243,239,0.05)` | Barely-visible overlays |

### Secondary & Muted

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary` | `#a8a49c` | Subtler text, descriptions |
| `secondary-80` | `rgba(168,164,156,0.8)` | Secondary text variant |
| `muted` | `#6b6860` | Captions, metadata, placeholders |
| `muted-2` | `#55534f` | Deeper muted text |

### Accent (Leaf Green)

The brand accent is a **muted sage green** derived from the leaf symbol. Used sparingly.

| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#7fb069` | Primary accent, leaf color |
| `accent-hover` | `#8fbc7a` | Accent hover state |
| `accent-muted` | `rgba(127,176,105,0.15)` | Accent backgrounds |
| `accent-subtle` | `rgba(127,176,105,0.08)` | Subtle accent tints |

### Borders

| Token | Hex | Usage |
|-------|-----|-------|
| `border-subtle` | `#252422` | Subtle dividers |
| `border-default` | `#2e2c2a` | Standard borders |
| `border-interactive` | `rgba(245,243,239,0.15)` | Interactive element borders |
| `border-interactive-hover` | `rgba(245,243,239,0.25)` | Interactive border hover |

### Semantic Colors

| Token | Success | Warning | Destructive | Info |
|--------|---------|---------|-------------|------|
| **Color** | `#4ade80` | `#fbbf24` | `#f87171` | `#60a5fa` |
| **Background** | `rgba(74,222,128,0.1)` | `rgba(251,191,36,0.1)` | `rgba(248,113,113,0.1)` | `rgba(96,165,250,0.1)` |
| **Muted** | `rgba(74,222,128,0.08)` | `rgba(251,191,36,0.08)` | `rgba(248,113,113,0.08)` | `rgba(96,165,250,0.08)` |

## Typography

Same as the Lovable foundation (Inter), adapted for dark:

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display Hero | 60px (3.75rem) | 600 | 1.05 | -1.5px |
| Section Heading | 48px (3rem) | 600 | 1.0 | -1.2px |
| Subheading | 36px (2.25rem) | 600 | 1.1 | -0.9px |
| Card Title | 20px (1.25rem) | 400 | 1.25 | normal |
| Body Large | 18px (1.125rem) | 400 | 1.38 | normal |
| Body | 16px (1rem) | 400 | 1.5 | normal |
| Caption | 14px (0.875rem) | 400 | 1.5 | normal |

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `micro` | 4px | Small buttons, badges |
| `sm` | 6px | Standard buttons, inputs |
| `md` | 8px | Compact cards |
| `lg` | 12px | Standard cards |
| `xl` | 16px | Large containers |
| `full` | 9999px | Pills, avatars |

## Spacing Scale

Same 8px base scale as Lovable: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

## Shadows & Focus

| Type | Value | Usage |
|------|-------|-------|
| Focus | `0 0 0 3px rgba(127,176,105,0.3)` | Warm green-tinted focus ring |
| Focus Sm | `0 0 0 2px rgba(127,176,105,0.3)` | Smaller focus ring |
| Elevated | `0 4px 16px rgba(0,0,0,0.3)` | Card elevation |
| Inset | Multi-layer light/dark | Button press effect |

## Button Variants

### Primary (Solid)
- Background: `foreground` (#f5f3ef)
- Text: `page` (#111110)
- Inset shadow for tactile depth
- Hover: slightly dimmed

### Primary (Accent)
- Background: `accent` (#7fb069)
- Text: `page` (#111110)
- Used sparingly for special CTAs

### Secondary
- Background: transparent
- Text: `foreground`
- Border: `border-interactive`
- Hover: subtle `foreground-5` background

### Ghost
- Background: transparent
- Text: `secondary`
- Hover: `foreground-5` background, text becomes `foreground`

## Component Adaptations

### StatusBadge
| Variant | Background | Text |
|---------|-----------|------|
| success | `success-bg` | `success` |
| warning | `warning-bg` | `warning` |
| error | `destructive-bg` | `destructive` |
| neutral | `muted-surface` | `secondary` |
| info | `info-bg` | `info` |
| accent | `accent-muted` | `accent` |

### SurfaceCard
- Background: `elevated`
- Border: `border-default`
- Radius: `lg` (12px)
- Elevated variant adds `shadow-elevated`

### PageSection Backgrounds
- `page`: `bg-page`
- `elevated`: `bg-elevated`
- `muted`: `bg-muted-surface`

## Form Elements

- Background: `muted-surface`
- Border: `border-default`
- Text: `foreground`
- Placeholder: `muted`
- Focus: `border-interactive-hover` + green focus ring

## Shared Between Public & Authenticated

All dark design tokens are shared:
- Color palette
- Typography
- Border radius
- Shadows
- Button variants
- Card and badge components
- Form elements

The **authenticated dashboard** (under `(main)/`) uses the same design tokens but typically in `elevated` or `muted` surface contexts for depth.

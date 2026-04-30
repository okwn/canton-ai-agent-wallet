# Redesign Plan: Home Page & Dashboard

## Context

The Canton AI Agent Wallet is an AI-powered crypto wallet agent with policy guardrails. The current UI uses a generic cold SaaS aesthetic (gray backgrounds, blue primary, Geist fonts) that fails to communicate the product's uniqueness: **warm, human, policy-first, and trustworthy**.

The design reference (DESIGN-lovable.md) defines a warm cream foundation with charcoal primary, Camera Plain Variable typography, and opacity-driven neutral system. This redesign aligns the product's visual language with its core value proposition.

## Current State

### Pages Identified
- `/` — Home page (public marketing)
- `/dashboard` — Main dashboard (authenticated)
- `/agent` — Agent terminal
- `/policies` — Policy management
- `/opportunities` — Yield opportunities
- `/activity` — Audit log
- `/wallet` — Wallet details

### Design Debt Summary
1. **Background**: Cold gray (`#f0f0f0`) instead of warm cream
2. **Primary color**: Blue instead of charcoal
3. **Typography**: Geist Sans instead of Camera Plain Variable
4. **Card containment**: Box shadows instead of borders
5. **Buttons**: Standard blue with no inset shadow
6. **No opacity-driven neutral system**
7. **No warm atmosphere** — feels generic SaaS
8. **Home page**: Lacks clear product positioning
9. **Dashboard**: Not sufficiently operational-grade
10. **Inconsistent information density** between surfaces

## Redesign Strategy

### 1. Home Page
**Goal**: Clearly communicate what the product is, what it does, why it matters, how it works.

**Layout**:
- Sticky header with cream background, dark CTA button
- Hero section: centered single-column with 60px display headline, editorial letter-spacing
- How it works: 3-step horizontal layout with numbered indicators
- Capabilities transparency section: honest REAL/SIMULATED badges
- Feature cards: 3-column grid with warm icon containers
- Footer: minimal with warm border

**Typography**:
- Display headline: 60px Camera Plain Variable, weight 600, letter-spacing -1.5px
- Section headings: 48px weight 600, letter-spacing -1.2px
- Body: 16-18px weight 400, normal tracking

**Colors**:
- Background: `#f7f4ed` (warm cream)
- Text: `#1c1c1c` (charcoal)
- Accents: muted grays via opacity

### 2. Dashboard Shell
**Goal**: More modern, product-grade, operational feel.

**Layout**:
- Fixed sidebar with 56px width, warm cream background
- Logo/brand at top with DEMO badge
- Navigation items with active state highlighting
- Wallet connect section at bottom
- Mobile: hamburger menu

**Visual System**:
- Sidebar border instead of shadow
- Active nav items: primary/10 background
- Inactive: muted foreground with hover state

### 3. Dashboard Cards & Hierarchy
**Goal**: Operational-grade information density.

**Card System**:
- Background: `#f7f4ed` (cream, matches page)
- Border: `1px solid #eceae4`
- Radius: 12px
- No box shadows — borders define boundaries

**Hierarchy Levels**:
1. **Quick Stats** (top): Large numbers, muted labels
2. **Capability Status**: 4-column badge grid
3. **Opportunities Summary**: List with risk APR indicators
4. **Recent Activity**: Timeline-style event log

**States**:
- Empty: Centered icon + message, muted tones
- Loading: Skeleton with subtle pulse
- Error: Red-tinted border, error message

### 4. Reusable Components

**Button**:
- Primary Dark: `#1c1c1c` bg, `#fcfbf8` text, inset shadow
- Ghost: transparent bg, `rgba(28,28,28,0.4)` border
- Cream Surface: `#f7f4ed` bg (for toolbar buttons)
- Pill: 9999px radius for action toggles

**Card**:
- Border: `1px solid #eceae4`
- Radius: 12px
- No shadow
- Padding: 16px standard

**Badge**:
- Full-pill radius (9999px)
- Opacity-based variants
- Size: small text

**Input**:
- Border: `1px solid #eceae4`
- Focus: ring blue at 50% opacity
- Background: `#f7f4ed`

### 5. Navigation
- Horizontal on home: logo left, links center, CTA right
- Sidebar on dashboard: fixed, icon + label
- Mobile: hamburger with slide-out menu
- Subtle border on scroll

### 6. Data States

**Empty State**:
- Centered icon (muted)
- Title + description
- Optional CTA button
- Warm, encouraging tone

**Loading State**:
- Skeleton rectangles
- Subtle pulse animation
- Matches card layout

**Error State**:
- Red-tinted border on card
- Error icon
- Clear error message
- Retry action if applicable

## Implementation Phases

### Phase 1: Foundation
1. Update `globals.css` with Lovable design tokens
2. Update `tailwind.config.ts` with new color system
3. Add Camera Plain Variable font
4. Create base button component with inset shadow

### Phase 2: Home Page
1. Rewrite hero section with new typography
2. Update capabilities section with proper badges
3. Refresh feature cards with warm borders
4. Update navigation header

### Phase 3: Dashboard
1. Update sidebar with warm cream background
2. Refresh dashboard cards with border containment
3. Update stat cards with new typography
4. Add proper empty/loading states

### Phase 4: Polish
1. Add responsive behavior
2. Ensure focus states use soft shadow
3. Verify hover states
4. Test all interactive elements

## Success Criteria

- Home page clearly explains: what (AI wallet agent), what (intent parsing + policy guardrails), why (safe DeFi access), how (natural language → policy check → plan → approve)
- Dashboard feels operational and product-grade
- Visual system is coherent across both surfaces
- Information density matches each surface's purpose
- All interactive states (hover, active, focus) work correctly
- Responsive design works at all breakpoints

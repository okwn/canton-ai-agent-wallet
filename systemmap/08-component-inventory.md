# Component Inventory

## Shared Components (Home + Dashboard)

These components are used across both the public home page and the authenticated dashboard.

### Navigation Components

#### `Navbar`
- **Purpose**: Public site header with logo, links, and CTA
- **Location**: `components/ui/Navbar.tsx`
- **Props**: `logo`, `links[]`, `cta`, `sticky`, `className`
- **Usage**: Home page header
- **Variants**: Sticky (default) or static

#### `DashboardShell`
- **Purpose**: Authenticated app shell with sidebar navigation
- **Location**: `components/ui/DashboardShell.tsx`
- **Props**: `children`, `walletConnect`
- **Usage**: Wraps all authenticated routes via `(main)/layout.tsx`
- **Responsive**: Sidebar on desktop, hamburger drawer on mobile

---

### Layout Components

#### `PageSection`
- **Purpose**: Full-width content section with consistent padding
- **Location**: `components/ui/PageSection.tsx`
- **Props**: `background` ('cream' | 'light' | 'white'), `padding` ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'), `className`
- **Usage**: Home page sections

#### `SectionIntro`
- **Purpose**: Section header with eyebrow, title, and description
- **Location**: `components/ui/SectionIntro.tsx`
- **Props**: `eyebrow`, `title`, `description`, `centered`, `titleClassName`
- **Usage**: Section headers on home page and dashboard

---

### Button Components

#### `PrimaryButton`
- **Purpose**: Primary CTA button with signature inset shadow
- **Location**: `components/ui/PrimaryButton.tsx`
- **Props**: `size` ('sm' | 'md' | 'lg'), `shadow`, standard button props
- **Appearance**: Dark charcoal bg, off-white text, inset shadow
- **Usage**: Primary actions (Open Agent, Submit)

#### `SecondaryButton`
- **Purpose**: Secondary/outline button
- **Location**: `components/ui/SecondaryButton.tsx`
- **Props**: `size` ('sm' | 'md' | 'lg'), standard button props
- **Appearance**: Transparent bg, charcoal border, charcoal text
- **Usage**: Secondary actions (View Policies, Cancel)

#### `PillButton`
- **Purpose**: Pill-shaped button for toggles and action pills
- **Location**: `components/ui/PillButton.tsx`
- **Props**: `active`, standard button props
- **Appearance**: Full pill radius, subtle opacity states
- **Usage**: Suggestion pills, action toggles

---

### Card Components

#### `SurfaceCard`
- **Purpose**: Border-based card container
- **Location**: `components/ui/SurfaceCard.tsx`
- **Props**: `elevated`, `padding` ('none' | 'sm' | 'md' | 'lg'), `className`
- **Appearance**: Cream bg, light-cream border, rounded-lg
- **Usage**: Generic card wrapper

#### `MetricCard`
- **Purpose**: Dashboard stat display
- **Location**: `components/ui/MetricCard.tsx`
- **Props**: `label`, `value`, `subtext`, `trend`, `valueClassName`
- **Appearance**: Large mono value, small muted label
- **Usage**: Dashboard quick stats

#### `FeatureCard`
- **Purpose**: Feature highlight with icon
- **Location**: `components/ui/FeatureCard.tsx`
- **Props**: `icon`, `title`, `description`
- **Appearance**: Icon container, title, body text
- **Usage**: Home page feature grid

---

### Feedback Components

#### `StatusBadge`
- **Purpose**: Status indicator badge
- **Location**: `components/ui/StatusBadge.tsx`
- **Props**: `variant` ('success' | 'warning' | 'error' | 'neutral' | 'info'), `size` ('sm' | 'md')
- **Appearance**: Full-pill radius, color-coded background
- **Usage**: REAL/SIMULATED badges, risk levels

#### `EmptyState`
- **Purpose**: Empty state with icon and optional action
- **Location**: `components/ui/EmptyState.tsx`
- **Props**: `icon`, `title`, `description`, `action`
- **Appearance**: Centered icon, title, description, optional CTA
- **Usage**: Lists with no data

#### `LoadingState`
- **Purpose**: Skeleton loading indicator
- **Location**: `components/ui/LoadingState.tsx`
- **Props**: `variant` ('card' | 'list' | 'inline'), `rows`
- **Appearance**: Pulsing skeleton rectangles
- **Usage**: Content loading

#### `ErrorState`
- **Purpose**: Error display with retry
- **Location**: `components/ui/ErrorState.tsx`
- **Props**: `title`, `description`, `onRetry`
- **Appearance**: Red-tinted card with error icon
- **Usage**: Error states with recovery

---

### Input Components

#### `PromptInput`
- **Purpose**: Large text input for agent commands
- **Location**: `components/ui/PromptInput.tsx`
- **Props**: `label`, `suggestionPills[]`, `onSuggestionClick`, standard textarea props
- **Appearance**: Cream bg, light-cream border, suggestion pills below
- **Usage**: Agent command input

---

## Dashboard-Only Components

These components are used specifically within the authenticated dashboard area.

### `DashboardShell` (documented above)

### `MetricCard` (documented above)

### `SectionIntro` (documented above)

### `StatusBadge` (documented above)

### `EmptyState` (documented above)

### `LoadingState` (documented above)

---

## Legacy Components (Still Present)

These components exist but should be migrated to the new design system over time.

| Component | Location | Issue | Priority |
|-----------|----------|-------|----------|
| `Button` | `components/ui/button.tsx` | Uses old blue primary | Medium |
| `Badge` | `components/ui/badge.tsx` | Uses old badge variants | Medium |
| `Card` | `components/ui/card.tsx` | Has shadow-sm | Low |
| `DemoBanner` | `components/demo/DemoBanner.tsx` | Uses old Button | Low |
| `WalletConnectButton` | `components/wallet/WalletConnectButton.tsx` | Uses old Button/Badge | Medium |

---

## Component Usage by Page

### Home Page (`/`)
| Component | Usage |
|-----------|-------|
| `Navbar` | Header navigation |
| `PageSection` | Section wrappers |
| `SectionIntro` | Section headers |
| `PrimaryButton` | Open Agent CTA |
| `SecondaryButton` | View Policies |
| `StatusBadge` | REAL/SIMULATED badges |
| `FeatureCard` | Feature highlights |

### Dashboard (`/dashboard`)
| Component | Usage |
|-----------|-------|
| `SurfaceCard` | Card containers |
| `MetricCard` | Quick stats |
| `StatusBadge` | System status, risk levels |
| `SectionIntro` | Section headers |
| `EmptyState` | Empty lists |

### Agent Terminal (`/agent`)
| Component | Usage |
|-----------|-------|
| `PromptInput` | Command input |
| `SurfaceCard` | Response containers |
| `StatusBadge` | Status indicators |
| `PrimaryButton` | Execute/Approve |

### Policies (`/policies`)
| Component | Usage |
|-----------|-------|
| `SurfaceCard` | Policy cards |
| `StatusBadge` | Active/inactive |
| `PrimaryButton` | Add policy |
| `SecondaryButton` | Edit/delete |

---

## Design Token Usage by Component

### Buttons (PrimaryButton, SecondaryButton, PillButton)
- Border radius: `6px` (sm), `6px` (md), `6px` (lg)
- Shadow: `var(--shadow-inset)` for primary dark
- Focus: `var(--shadow-focus)`

### Cards (SurfaceCard, MetricCard)
- Border: `1px solid var(--color-light-cream)`
- Border radius: `12px` (lg)
- No box-shadow by default
- Elevated variant: `shadow-focus`

### Badges (StatusBadge)
- Border radius: `9999px` (full)
- Background: semantic color at 10% opacity
- Text: semantic color at full

### Inputs (PromptInput)
- Border: `1px solid var(--color-light-cream)`
- Background: `var(--color-cream)`
- Focus: border color `var(--color-charcoal-40)` + `shadow-focus`

### Navigation (Navbar, DashboardShell)
- Background: `var(--color-cream)`
- Border: `1px solid var(--color-light-cream)`
- Active state: `var(--color-charcoal-4)` background

---

## Migration Notes

### From Old Button to PrimaryButton
```tsx
// Before
<Button variant="default" className="bg-primary">Open Agent</Button>

// After
<PrimaryButton>Open Agent</PrimaryButton>
```

### From Old Card to SurfaceCard
```tsx
// Before
<Card className="shadow-sm"><CardContent>...</CardContent></Card>

// After
<SurfaceCard><p>...</p></SurfaceCard>
```

### From Old Badge to StatusBadge
```tsx
// Before
<Badge variant={cap.level === 'REAL' ? 'success' : 'warning'}>REAL</Badge>

// After
<StatusBadge variant={cap.status === 'REAL' ? 'success' : 'warning'}>REAL</StatusBadge>
```

---

## File Structure

```
apps/web/components/ui/
├── index.ts                      # Exports all shared components
├── Navbar.tsx                    # Public header
├── PageSection.tsx                # Section wrapper
├── SectionIntro.tsx               # Section header
├── PrimaryButton.tsx              # Primary CTA
├── SecondaryButton.tsx           # Secondary button
├── PillButton.tsx                # Pill/toggle button
├── SurfaceCard.tsx                # Border-based card
├── MetricCard.tsx                 # Dashboard stat
├── StatusBadge.tsx                # Status indicator
├── FeatureCard.tsx                # Feature highlight
├── EmptyState.tsx                 # Empty list state
├── LoadingState.tsx               # Skeleton loader
├── ErrorState.tsx                 # Error with retry
├── PromptInput.tsx                # Command input
└── DashboardShell.tsx            # Sidebar layout
```

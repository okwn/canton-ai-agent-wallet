# UI Surface Map

## Base Components

### Button (`components/ui/button.tsx`)
**Current Variants**:
- `default`: Blue bg, white text (`bg-primary`)
- `secondary`: Gray bg (`bg-secondary`)
- `ghost`: Transparent, hover shows bg
- `outline`: Border only
- `destructive`: Red bg

**Current Sizes**:
- `default`: h-10 px-4 py-2
- `sm`: h-8 px-3 text-xs
- `lg`: h-12 px-6

**Status**: ⚠️ Needs new variants for Lovable design system:
- Primary Dark (with inset shadow)
- Ghost/Outline (with `rgba(28,28,28,0.4)` border)
- Cream Surface
- Pill (9999px radius)

---

### Card (`components/ui/card.tsx`)
**Current Implementation**:
```tsx
className="rounded-xl border border-border bg-card text-card-foreground shadow-sm"
```

**Status**: ⚠️ Needs update:
- Remove `shadow-sm`
- Background should be `#f7f4ed` (cream)
- Border: `1px solid #eceae4`
- Radius: 12px

**Sub-components**:
- `Card`: Main container
- `CardHeader`: Header section with padding
- `CardTitle`: Title text
- `CardContent`: Content section

---

### Badge (`components/ui/badge.tsx`)
**Current Variants**:
- `default`: `bg-primary/10 text-primary` (blue)
- `success`: `bg-success/10 text-success` (green)
- `warning`: `bg-warning/10 text-warning` (yellow)
- `destructive`: `bg-destructive/10 text-destructive` (red)
- `secondary`: `bg-secondary text-secondary-foreground`

**Status**: ⚠️ Needs Lovable-style update:
- Full-pill radius (9999px)
- Font: Camera Plain Variable 14px
- Opacity-based colors from charcoal

---

### Input (via globals.css)
**Current**:
```css
border border-border rounded-md px-3 py-2 bg-background
```

**Status**: ⚠️ Needs update:
- Background: `#f7f4ed`
- Border: `1px solid #eceae4`
- Focus: ring blue at 50% opacity

---

## Page-Specific Components

### DemoBanner (`components/demo/DemoBanner.tsx`)
**Purpose**: Shows "Demo Mode Active" banner.

**Status**: ✅ Exists, needs design refresh

---

### WalletConnectButton (`components/wallet/WalletConnectButton.tsx`)
**Purpose**: Connect/disconnect wallet button.

**Status**: ✅ Exists

---

### Wallet Panels (`components/wallet/`)
- `ActiveContractsPanel.tsx`
- `CapabilityStatusPanel.tsx`
- `GasEstimatePanel.tsx`
- `HoldingsPanel.tsx`
- `WalletDetailsPanel.tsx`

**Status**: ⚠️ Use border containment, not shadows

---

## Component Wiring Status

| Component | Location | Status |
|-----------|----------|--------|
| Button | `components/ui/button.tsx` | ⚠️ Needs Lovable variants |
| Card | `components/ui/card.tsx` | ⚠️ Needs border-only style |
| Badge | `components/ui/badge.tsx` | ⚠️ Needs pill + opacity |
| Input | `globals.css` | ⚠️ Needs cream bg |
| DemoBanner | `components/demo/DemoBanner.tsx` | ⚠️ Needs refresh |
| WalletConnectButton | `components/wallet/WalletConnectButton.tsx` | ✅ OK |
| Sidebar | `app/(main)/layout.tsx` | ⚠️ Needs warm bg |
| Header | `app/page.tsx` | ⚠️ Needs redesign |

---

## CSS Variables (Current)

```css
--background: 220 20% 97%;      /* Light gray */
--foreground: 220 10% 10%;      /* Near black */
--muted: 220 15% 94%;
--muted-foreground: 220 10% 45%;
--card: 0 0% 100%;              /* White */
--primary: 220 80% 55%;          /* Blue */
--secondary: 220 15% 92%;
--border: 220 13% 85%;
--radius: 0.5rem;
```

## CSS Variables (Target - Lovable Design)

```css
--background: #f7f4ed;           /* Warm cream */
--foreground: #1c1c1c;           /* Charcoal */
--muted: rgba(28,28,28,0.04);   /* Opacity-based */
--muted-foreground: #5f5f5d;     /* Muted gray */
--card: #f7f4ed;                 /* Cream */
--primary: #1c1c1c;              /* Charcoal */
--secondary: #eceae4;            /* Light cream border */
--border: #eceae4;               /* Warm border */
--border-interactive: rgba(28,28,28,0.4);  /* Interactive border */
--focus-shadow: rgba(0,0,0,0.1) 0px 4px 12px;
--button-inset: rgba(255,255,255,0.2) 0px 0.5px 0px 0px inset, rgba(0,0,0,0.2) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.05) 0px 1px 2px 0px;
```

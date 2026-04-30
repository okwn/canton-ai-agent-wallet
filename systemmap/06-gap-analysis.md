# Gap Analysis

## Design Debt

### Critical Issues (Affect User Experience)

#### 1. Cold SaaS Aesthetic
**Issue**: Current design uses generic gray backgrounds and blue primary color.

**Current**:
```css
--background: 220 20% 97%;  /* Light gray */
--primary: 220 80% 55%;     /* Blue */
```

**Expected** (per DESIGN-lovable.md):
```css
--background: #f7f4ed;      /* Warm cream */
--primary: #1c1c1c;          /* Charcoal */
```

**Impact**: Product feels generic, not warm/trustworthy as intended.

---

#### 2. Typography Not Humanist
**Issue**: Uses Geist Sans instead of Camera Plain Variable.

**Current**:
```css
fontFamily: ['var(--font-geist-sans)', 'system-ui', 'sans-serif']
```

**Expected**:
```css
fontFamily: ['Camera Plain Variable', 'ui-sans-serif', 'system-ui']
```

**Impact**: Headlines don't have the warm, editorial quality.

---

#### 3. Cards Use Shadows Instead of Borders
**Issue**: Card containment uses `shadow-sm` instead of border-based containment.

**Current**:
```tsx
className="rounded-xl border border-border bg-card text-card-foreground shadow-sm"
```

**Expected**:
```tsx
className="rounded-xl border border-border bg-card text-card-foreground"
```

(with border: `1px solid #eceae4`)

**Impact**: UI feels "floating" instead of integrated with cream background.

---

#### 4. Buttons Lack Signature Inset Shadow
**Issue**: Primary dark buttons don't have the Lovable-style inset shadow.

**Current**: Standard blue button with hover opacity change.

**Expected**: Dark button with multi-layer inset shadow:
```css
box-shadow: rgba(255,255,255,0.2) 0px 0.5px 0px 0px inset,
            rgba(0,0,0,0.2) 0px 0px 0px 0.5px inset,
            rgba(0,0,0,0.05) 0px 1px 2px 0px;
```

**Impact**: Missing the signature tactile depth.

---

#### 5. Home Page Doesn't Clearly Explain the Product
**Issue**: Hero headline "AI agent for your wallet, with guardrails" is good, but the page doesn't clearly answer:
- What is Canton? (It's an AI wallet agent)
- What does it do? (NLP → policy check → plan → execute)
- Why does it matter? (Safe DeFi without complexity)
- How does it work? (3-step process shown, but could be clearer)

**Expected**: Clear sections explaining each aspect.

---

#### 6. Dashboard Feels Like a Prototype
**Issue**: Dashboard uses basic cards without hierarchy or operational polish.

**Expected**:
- Better stat card hierarchy
- Clearer information density
- More operational-grade feel
- Proper empty/loading states

---

### Component-Level Issues

#### Badge Styles
| Issue | Current | Expected |
|-------|---------|----------|
| Radius | `rounded-full` (pill) | Already pill ✅ |
| Font | Geist Sans | Camera Plain Variable |
| Colors | HSL-based | Opacity-based from charcoal |

---

#### Sidebar Design
| Issue | Current | Expected |
|-------|---------|----------|
| Background | White/gray | Cream `#f7f4ed` |
| Border | Standard | Warm `#eceae4` |
| Active State | Blue tint | Charcoal 10% |

---

#### Input Styles
| Issue | Current | Expected |
|-------|---------|----------|
| Background | White | Cream `#f7f4ed` |
| Border | Gray | `#eceae4` |
| Focus | Ring | Soft shadow |

---

### Missing Components

#### 1. Camera Plain Variable Font
**Status**: Not loaded in the app.
**Required**: Add font import and configure in `app/layout.tsx`.

---

#### 2. Focus State Styles
**Status**: Using default Tailwind ring.
**Required**: Custom focus shadow: `rgba(0,0,0,0.1) 0px 4px 12px`

---

#### 3. Loading Skeleton Components
**Status**: Not implemented.
**Required**: For dashboard cards during data fetch.

---

#### 4. Empty State Components
**Status**: Using inline text + icon pattern.
**Required**: Consistent empty state component with CTA.

---

## Implementation Gaps

### Not Wired
| Component | Location | Issue |
|-----------|----------|-------|
| Camera Plain Font | `app/layout.tsx` | Font not loaded |
| Custom Button Variants | `components/ui/button.tsx` | Missing Primary Dark |
| Warm CSS Variables | `globals.css` | Still using cold colors |

---

### Partially Wired
| Component | Issue |
|-----------|-------|
| Wallet Execution | Demo mode only, not fully wired for live |
| Market Data | Uses seeded data, no live DeFi connection |

---

## Summary of Top 10 Design Issues

1. **Background is gray, not warm cream** — Product feels cold, not trustworthy
2. **Primary color is blue, not charcoal** — Doesn't match design reference
3. **Typography uses Geist Sans** — Missing Camera Plain Variable warmth
4. **Cards use shadows** — Should use border-based containment
5. **Buttons lack inset shadow** — Missing signature tactile depth
6. **Home page unclear positioning** — Doesn't fully answer what/why/how
7. **Dashboard feels prototype-like** — Needs operational polish
8. **Sidebar not warm** — Should use cream background
9. **Focus states use ring** — Should use soft warm shadow
10. **No skeleton loading states** — Dashboard cards lack loading UX

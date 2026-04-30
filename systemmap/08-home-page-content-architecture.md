# Home Page Content Architecture

## Purpose

The home page must answer the fundamental questions a new visitor has when arriving at an unknown product:

1. **What is this?** — The one-liner and subheadline
2. **What problem does it solve?** — The "What Marcus Is" section
3. **How does it actually work?** — The "How It Works" flow
4. **Why should I trust this model?** — The "Why It Matters" section
5. **What can I do without signing up?** vs **What do I unlock with an account?** — The Guest vs Authenticated section
6. **What kind of interface is this?** — The CLI/Terminal section
7. **Is this real or a demo?** — The Real/Demo/Mock section

The page is designed to be **jury-friendly**: a judge reading it for the first time should leave with a clear, accurate understanding of the product.

---

## Section Order and Rationale

### 1. Hero
**Position:** First. Must communicate the core value immediately.

**Content:**
- One-liner: "An AI wallet that follows your rules"
- Grounded subheadline explaining the policy-first execution model
- Primary CTA: Open Agent Terminal
- Secondary CTA: See how it works (scroll anchor)
- No-account note to reduce friction

**Why this order:** A visitor who lands and doesn't immediately understand the value is gone. The hero front-loads the single most important message: Marcus executes only within your rules.

**Static/Dynamic:** Fully static content. No auth state affects the hero.

---

### 2. What Marcus Is
**Position:** After hero, before the step-by-step flow.

**Content:**
- Plain-English description of what Marcus does
- Explicit framing of the problem it solves (AI black boxes, blind execution)
- A visual flow card showing the 5 steps (Intent → Policy → Plan → Execute → Receipt)

**Why this section exists:** The hero makes a claim ("AI wallet that follows your rules"). This section proves it and explains it in plain English, without jargon.

**User question answered:** "But what does that actually mean? How is this different from a regular crypto wallet or a DeFi bot?"

**Static/Dynamic:** Fully static. The flow card is a static representation of the actual execution model.

---

### 3. How It Works
**Position:** After "What Marcus Is". Referenced by the hero's secondary CTA.

**Content:**
- 5 numbered steps: Prompt → Interpret → Policy → Plan → Execute
- Each step: label, title, description, concrete example
- Arrow connectors between steps

**Why this section exists:** Some users need to see the mechanics before trusting. The step-by-step format answers "but how does it actually work?" with concrete examples.

**User question answered:** "I understand the concept, but what's the actual sequence of events?"

**Static/Dynamic:** Fully static. This is a UI representation of the actual agent flow (which is implemented in the agent terminal).

---

### 4. Why It Matters
**Position:** After understanding the mechanics.

**Content:**
- 6 cards covering: budget limits, safer execution, explainability, audit trail, no blind execution, accessible without account

**Why this section exists:** At this point the user understands what Marcus does. Now we answer "why does this matter? Why would I choose this over a regular wallet or a fully automated DeFi protocol?"

**User question answered:** "Why would I use this instead of just doing it myself, or using a fully automated service?"

**Static/Dynamic:** Fully static.

---

### 5. Guest vs Authenticated
**Position:** After "Why It Matters".

**Content:**
- Two side-by-side cards: Guest/Public Terminal vs Registered User/Dashboard
- Each lists concrete capabilities
- Clear CTA per tier

**Why this section exists:** Users often don't know what they can do without an account. This section sets expectations clearly. It also answers "what do I get for registering?" without hiding the public terminal's capabilities.

**User question answered:** "Can I try this without signing up? What's the difference if I create an account?"

**Static/Dynamic:** Fully static. The actual auth-gating of routes is handled by the app routing, not here.

---

### 6. CLI / Terminal Section
**Position:** After Guest vs Authenticated.

**Content:**
- Describes the conversational terminal interface
- 3 principles: conversational, every response is a record, no hidden state
- Live terminal visual mockup (SVG/CSS, not real terminal)

**Why this section exists:** Some users are unfamiliar with conversational/terminal-style interfaces. This explains the interaction model. Also positions Marcus as clarifying-focused rather than dashboard-heavy.

**User question answered:** "What kind of interface is this? Is it a chat bot? A command line? A regular app?"

**Static/Dynamic:** Static description + a CSS mockup of the terminal UI. The actual terminal is the `/agent` route.

---

### 7. Real / Demo / Mock
**Position:** Late in the page, for users who are still evaluating.

**Content:**
- 5 capability rows, each labeled REAL or SIMULATED
- A disclaimer about what NEXT_PUBLIC_LOOG_ENABLED does

**Why this section exists:** Honest framing is a core product value. Hiding limitations erodes trust. Users who reach this section are doing due diligence — give them the truth.

**User question answered:** "Is this actually real? Or is everything fake? What can I trust?"

**Static/Dynamic:** Fully static. The REAL/SIMULATED labels are constant (they reflect actual product state).

---

### 8. Final CTA
**Position:** End of page.

**Content:**
- Recap of value
- Two CTAs: Open Agent Terminal (primary), Create an account (secondary)

**Why this section exists:** After reading everything, the user needs a clear next step. Don't make them scroll back up.

**Static/Dynamic:** Fully static.

---

## Navigation Link Map

| Section | Nav Link | Route |
|---------|----------|-------|
| Hero | — | `/` |
| What Marcus Is | — | `/` (below hero) |
| How It Works | How it works | `/#how-it-works` |
| CLI / Terminal | CLI | `/cli` (links to agent) |
| Agent Terminal | Open Agent | `/agent` |
| Login | Login | `/login` |
| Register | Register | `/register` |
| Dashboard (auth) | — | `/dashboard` |

---

## Content Principles

1. **No empty buzzwords** — Every claim has a concrete backing ("policy engine" is backed by actual policy types listed)
2. **No vague "AI magic"** — The flow is specific enough that a developer could understand it
3. **Honest limitations** — Simulated capabilities are labeled, not hidden
4. **No-pressure framing** — "No account needed" reduces friction; CTAs are clear but not manipulative
5. **Jury-friendly** — A non-technical judge should understand: what the product is, how it works, and what its safety model is

---

## Files Reference

| File | Purpose |
|------|---------|
| `apps/web/app/page.tsx` | Home page component |
| `apps/web/components/ui/Navbar.tsx` | Public navigation |
| `apps/web/components/ui/PageSection.tsx` | Section wrapper |
| `apps/web/components/ui/SectionIntro.tsx` | Section heading block |
| `apps/web/components/ui/SurfaceCard.tsx` | Card component |
| `apps/web/components/ui/BrandMark.tsx` | Logo |
| `apps/web/components/ui/PrimaryButton.tsx` | Primary CTA button |
| `apps/web/components/ui/GhostButton.tsx` | Secondary CTA button |
| `apps/web/components/ui/StatusBadge.tsx` | REAL/SIMULATED badges |

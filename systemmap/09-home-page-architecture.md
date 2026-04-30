# Home Page Architecture

## Overview

The home page (`/`) is the public-facing marketing page for Canton Agent Wallet. It is designed to answer a first-time visitor's core questions in order: **what is this → what does it do → how does it work → why should I trust it → what can I try → what is demo vs real**.

---

## Section-by-Section Information Hierarchy

### 1. Header (Navbar)

**Purpose**: Navigation + immediate entry points.

**Content**:
- Logo + wordmark
- Links: Dashboard, Agent, Policies
- CTA: "Open Agent" button

**User question answered**: "How do I get started?"

**Dynamic/Static**: Static. Navbar links point to real routes.

---

### 2. Hero Section

**Purpose**: Immediate product positioning and primary value proposition.

**Content**:
- Eyebrow: "Policy-first — nothing runs without your approval"
- Headline: "Your AI wallet agent, with guardrails"
- Subheadline: Explains the core loop (intent → policy → plan → approve → execute)
- Primary CTA: "Try the Agent Terminal"
- Secondary CTA: "See How Policies Work"
- Micro-copy: "No account needed. Try it now"

**User questions answered**:
- "What is this?" → AI wallet agent
- "What does it do?" → Parses intent, checks policies, shows plan, waits for approval
- "Why is it different?" → Guardrails, approval required

**Dynamic/Static**: Static content. CTAs link to real routes (`/agent`, `/policies`).

**Design notes**:
- Centered layout with generous vertical breathing room
- Editorial headline at 4xl–5xl with tight tracking
- Warm cream background, no gradient washes (restrained, not flashy)

---

### 3. What It Is

**Purpose**: Explain the product in plain human language without marketing fluff.

**Content**:
- Headline: "An AI agent that speaks your language"
- Body paragraph: What the product does in one paragraph
- Detail sentence: How the approval flow works
- Visual: Command → Flow card showing the 5-step process

**User question answered**: "But what does that actually mean?"

**Dynamic/Static**: Static content. Visual cards are static representations of the flow.

---

### 4. How It Works

**Purpose**: Show the exact 5-step execution flow.

**Content** (5 cards in a row):
1. **Prompt** — "You speak naturally" + example command
2. **Intent** — "Agent parses your request" + parsed output example
3. **Policy** — "Safety rules are checked" + policy checks example
4. **Plan** — "You review the proposal" + opportunity example
5. **Execute** — "You approve, then it runs" + waiting state

**User question answered**: "What actually happens when I use it?"

**Dynamic/Static**: Static content. Cards show representative examples of each step's output.

**Design notes**:
- 5-column grid on desktop, single column on mobile
- Each card shows a realistic example in mono font
- Arrow connectors between cards on desktop

---

### 5. Why It Matters

**Purpose**: Address the fear of blind AI automation.

**Content** (3 cards):
1. **Safety first** — Policies block violations automatically
2. **Budget control** — Per-trade limits, daily caps, thresholds
3. **Full visibility** — Every decision is logged

**User question answered**: "Why is this safer than auto-execution bots?"

**Dynamic/Static**: Static content explaining core safety principles.

---

### 6. What Makes It Different

**Purpose**: Position against generic AI finance tools.

**Content** (3 cards):
1. **Policy-guarded execution** — Rules are server-side, cannot be bypassed
2. **Wallet-aware actions** — Agent reads actual wallet state before proposing
3. **Complete audit trail** — Logs of every command, check, and execution

**User question answered**: "How is this different from X autopilot product?"

**Dynamic/Static**: Static content.

---

### 7. Real / Demo / Mock

**Purpose**: Radical transparency about what is real vs simulated.

**Content** (4 capability cards):
- Intent Parser: REAL
- Policy Engine: REAL
- Market Data: SIMULATED
- Wallet Execution: SIMULATED

**User question answered**: "Is this actually doing things on-chain? What's live?"

**Dynamic/Static**: Static content with accurate labels. Critical for building trust.

**Design notes**:
- Each card shows the capability + REAL/SIMULATED badge + one-line explanation
- Footnote clarifies: policy engine is real, wallet execution is simulated

---

### 8. Product Highlights

**Purpose**: Additional specific product details.

**Content** (4 cards):
- Natural language commands
- Transparent about limitations
- No blind execution
- Policy enforcement

**User question answered**: "What else should I know?"

**Dynamic/Static**: Static content.

---

### 9. Try It CTA

**Purpose**: Final conversion moment for interested visitors.

**Content**:
- Headline: "Ready to try it?"
- Body: "Open the agent terminal, type a command, and see the full flow"
- Primary CTA: "Open Agent Terminal"
- Secondary CTA: "View Dashboard"

**User question answered**: "I want to try it. How?"

**Dynamic/Static**: Static. Links to real routes.

---

### 10. Footer

**Purpose**: Navigation + legal transparency.

**Content**:
- Logo + DEMO badge
- Navigation links
- Demo disclaimer

**Dynamic/Static**: Static.

---

## Dynamic vs Static Summary

| Section | Dynamic? | Notes |
|---------|----------|-------|
| Header/Nav | No | Static links |
| Hero | No | Static content |
| What It Is | No | Static content |
| How It Works | No | Static with example outputs |
| Why It Matters | No | Static principles |
| What Makes It Different | No | Static positioning |
| Real/Demo/Mock | No | Static capability labels |
| Product Highlights | No | Static details |
| Try It CTA | No | Static links |
| Footer | No | Static |

**No server-side data fetching on home page.** All content is static and pre-renderable.

---

## User Journey Mapping

1. **Landing** → Hero headline immediately positions product
2. **Curious** → "What it is" explains in plain language
3. **Skeptical** → "How it works" shows the exact flow
4. **Concerned** → "Why it matters" addresses automation fears
5. **Comparing** → "What makes it different" positions vs alternatives
6. **Cautious** → "Real/Demo/Mock" provides honest framing
7. **Informed** → "Product highlights" adds details
8. **Ready** → "Try it" CTA converts

---

## Still Needs Future Improvement

### High Priority
1. **Product preview/mockup** — Currently the "What It Is" section uses abstract cards. A real screenshot or animated flow demo would be more convincing.
2. **Social proof** — No testimonials, user count, or trust signals beyond the policy messaging.
3. **Real data integration** — The "How It Works" section shows static examples. Could show a real anonymized example from actual usage.

### Medium Priority
4. **Pricing/FAQ section** — No discussion of when Canton moves from demo to production.
5. **Mobile flow preview** — The agent terminal is responsive, but no mobile-specific preview exists.
6. **Dark mode** — The design system supports it structurally, but no toggle or auto-detection is implemented.

### Low Priority
7. **Blog/docs links** — No external documentation links.
8. **Changelog** — No visible version or update history.
9. **Multi-language** — No i18n support.
10. **Animated transitions** — Section-to-section scroll animations would add polish.

---

## Design Principles Applied

- **No vague AI buzzwords** — "AI agent" is used once; the rest explains what it actually does
- **No empty marketing fluff** — Every sentence describes a specific behavior
- **No misleading claims** — "Real" and "Simulated" labels are accurate
- **Safety and clarity in copy** — "Nothing runs without your approval" is repeated and visible
- **Generous spacing** — Sections breathe; no cramped layouts
- **Warm cream background** — Product feels human, not cold SaaS
- **Editorial typography** — Large headlines with tight tracking create confidence

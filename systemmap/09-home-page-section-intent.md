# Home Page Section Intent

Each section exists to answer a specific user question. This document maps sections to the questions they resolve, what they contain, and what future improvements are possible.

---

## Section: Hero

**User question answered:** "What is this, in one sentence?"

### Intent
- **First impression** — The most important real estate on the page
- Communicate the core value proposition immediately
- Reduce cognitive load: user should understand Marcus in <5 seconds

### Content
- Eyebrow: "Marcus — AI Agent Wallet"
- One-liner: "An AI wallet that follows your rules"
- Subheadline: Explains policy-first execution in plain language
- Primary CTA: Open Agent Terminal
- Secondary CTA: See how it works (anchor to #how-it-works)
- No-account note

### What is static vs dynamic
- **Static:** All text, all visual elements
- **Dynamic (future):** Personalized CTAs based on auth state (e.g., "Go to Dashboard" if logged in)

### Future improvements
- [ ] Auth-aware hero: show different CTA if user is logged in
- [ ] Animated terminal preview behind the hero text
- [ ] Live demo count or "X policies created today" social proof

---

## Section: What Marcus Is

**User question answered:** "What does this actually do? In plain English?"

### Intent
- Prove the hero's claim with concrete explanation
- Define the problem Marcus solves (AI black boxes, blind execution)
- Show the execution flow visually so mechanics are clear

### Content
- Two-paragraph explanation (what Marcus does + what problem it solves)
- Visual flow card: Intent → Policy → Plan → Execute → Receipt
- 5 numbered steps with descriptions

### What is static vs dynamic
- **Static:** All content. The flow card is a static UI representation.
- **Dynamic (future):** Could show real-time policy count if user is authenticated

### Future improvements
- [ ] Interactive flow: click each step to expand with more detail
- [ ] Link each flow step to its corresponding UI element in the agent terminal

---

## Section: How It Works

**User question answered:** "But how does it actually work step by step?"

### Intent
- Give mechanics-minded users the detailed sequence
- Use concrete examples (real command text) not abstract descriptions
- Establishes trust through transparency

### Content
- 5 steps: Prompt → Interpret → Policy → Plan → Execute
- Each step has: step number, label, title, description, terminal-style example
- Arrow connectors on desktop

### What is static vs dynamic
- **Static:** All content
- **Dynamic (future):** Could highlight the active step if linked from a specific policy or action

### Future improvements
- [ ] Link each step to its documentation page
- [ ] Show a short animated sequence of the 5 steps on first visit

---

## Section: Why It Matters

**User question answered:** "Why would I choose this over doing it myself or using a fully automated service?"

### Intent
- Translate features into user-level value
- Address the core anxiety around AI finance tools (loss of control, blind execution)
- Highlight what makes Marcus's model different from typical DeFi bots

### Content
- 6 value cards:
  1. Budget limits that hold
  2. Safer execution model
  3. Full explainability
  4. Audit trail
  5. No blind execution
  6. Accessible without an account

### What is static vs dynamic
- **Static:** All content

### Future improvements
- [ ] Specific user testimonials or case studies
- [ ] Comparison table: Marcus vs traditional DeFi vs other AI agents

---

## Section: Guest vs Authenticated

**User question answered:** "Can I try this without signing up? What's the difference if I register?"

### Intent
- Reduce friction by making it clear no account is needed for the terminal
- Set accurate expectations about what registering unlocks
- Prevent confusion about public vs authenticated surfaces

### Content
- Two side-by-side cards:
  - Guest/Public Terminal: 6 capabilities
  - Registered User/Dashboard: 6 capabilities (+ full access)
- StatusBadge on each card (No account needed / Full access)
- One CTA per card

### What is static vs dynamic
- **Static:** All content
- **Dynamic (future):** Could suppress "create account" CTA if already logged in

### Future improvements
- [ ] Auth-aware: show dashboard CTA instead of create account if already logged in
- [ ] Show real policy count or wallet balance if user is authenticated

---

## Section: CLI / Terminal

**User question answered:** "What kind of interface is this? Is it a chatbot? A dashboard? A command line?"

### Intent
- Explain the conversational terminal interaction model
- Position the terminal as clarity-focused (not complex or intimidating)
- Address the "this is too different/complex" objection

### Content
- 3 principles: conversational, every response is a record, no hidden state
- CSS terminal mockup showing a sample exchange
- CTA: Open Terminal

### What is static vs dynamic
- **Static:** Text + CSS mockup
- **Dynamic:** The actual terminal is the `/agent` route

### Future improvements
- [ ] Replace CSS mockup with an actual embedded mini-terminal (iframe or component)
- [ ] Show multiple example exchanges for different command types

---

## Section: Real / Demo / Mock

**User question answered:** "Is this actually real? What's fake? What can I trust?"

### Intent
- Honest framing is a core brand value
- Build trust by disclosing limitations rather than hiding them
- Prevent overclaiming, which could cause problems in a legal/judicial context

### Content
- 5 capability rows with REAL/SIMULATED labels:
  - Policy Engine: REAL
  - Intent Parser: REAL
  - Agent Terminal: REAL
  - Market Data: SIMULATED
  - Wallet Execution: SIMULATED
- Disclaimer about NEXT_PUBLIC_LOOP_ENABLED

### What is static vs dynamic
- **Static:** All labels and descriptions (they reflect actual product state)
- **Dynamic (future):** Could toggle labels based on feature flags if different deployments have different capabilities

### Future improvements
- [ ] Expand each row to link to technical documentation
- [ ] Add a "what's coming next" section for SIMULATED capabilities

---

## Section: Final CTA

**User question answered:** "I've read everything. What do I do now?"

### Intent
- Give a clear, unambiguous next step after reading the whole page
- Don't make the user scroll back up to find the CTA

### Content
- Recap of value proposition
- Two CTAs: Open Agent Terminal (primary), Create an account (secondary)

### What is static vs dynamic
- **Static:** All content
- **Dynamic (future):** Auth-aware: swap "create account" for "go to dashboard" if logged in

### Future improvements
- [ ] Auth-aware CTA
- [ ] Add a third CTA for CLI/documentation

---

## Design Principles Applied

1. **No section is filler** — Every section answers a real question a visitor has
2. **Progressive disclosure** — Surface-level value first, mechanics second, details last
3. **Honest framing** — Real/Demo section prevents overclaiming
4. **No pressure tactics** — CTAs are clear, not manipulative ("No account needed" reduces friction)
5. **Jury-friendly** — A non-technical judge leaves understanding: what Marcus is, how it works mechanically, and why its safety model matters

---

## Future Content Additions

| Section | Potential Addition |
|---------|-------------------|
| Hero | Social proof (policies created, transactions evaluated) |
| What Marcus Is | Animated flow visualization |
| Why It Matters | Comparison table vs DeFi bots and traditional wallets |
| Guest vs Authenticated | Interactive feature toggle |
| Real/Demo/Mock | Roadmap for SIMULATED capabilities |
| Final CTA | Trust signals or certifications |

# Terminal Interaction Model

## Interaction Philosophy

The Marcus terminal is designed around one core principle: **you type what you want, Marcus shows you what will happen, and only you decide whether it happens**.

The terminal is:
- **Conversational** — natural language, not commands
- **Transparent** — every step is shown, nothing hidden
- **Read-only by default** — execution requires explicit approval
- **Honest about limits** — demo vs live is always labeled

---

## Interaction Flow

### Step 1: User Types a Command

The user types a natural-language command into the input field. Examples:
- "Find the cheapest yield up to 50 CC"
- "Convert this 100 CC to the most suitable USDT route"
- "Use at most 20 CC and minimize fees"
- "Preview before executing"

The user can:
- Type directly
- Click a preset prompt chip to auto-fill the input
- Press **Enter** to submit (or **Shift+Enter** for newline)
- Press the **Send** button

### Step 2: Marcus Parses Intent

While loading, the terminal shows a **thinking indicator**:
- 3-dot bounce animation in accent color
- Rotating status messages:
  - "Parsing your intent…"
  - "Checking policies…"
  - "Evaluating opportunities…"
  - "Building plan…"

This communicates that the system is actively processing, not stalled.

### Step 3: Plan Is Displayed

The plan result appears below the input, showing:

1. **Interpreted Intent** — What Marcus understood:
   - Action (yield, swap, transfer, etc.)
   - Amount
   - Confidence percentage
   - Simulation vs execution mode
   - Risk tolerance
   - Provider/asset filters

2. **Wallet Snapshot** — Current wallet state:
   - Address (truncated)
   - Total balance
   - Daily usage vs limit
   - SIMULATED or LIVE badge

3. **Shortlisted Opportunities** — Options Marcus found:
   - Ranked list (best first)
   - Strategy name and provider
   - APR percentage
   - Risk level badge
   - Reason for recommendation
   - Estimated output and fees

4. **Recommended Plan** — What Marcus proposes to do:
   - Step description
   - Estimated output and fees
   - "Why this plan?" explanation
   - Link to detailed explanation

5. **Policy Verdict** — Whether policies allow this:
   - Decision badge: APPROVED / REQUIRES_APPROVAL / BLOCKED
   - Passed policy checks (green)
   - Failed policy checks (red)
   - Blocked reason (if applicable)
   - Next action

6. **Disclaimer** — Important caveats:
   - "This is a simulated execution" (when in demo mode)
   - Any other relevant caveats

### Step 4: User Can Take Action

After viewing the plan, the user can:

**Ask for more detail:**
- Click "Explain this plan in detail →" to see:
  - Summary of what was asked
  - What will happen step by step
  - What could go wrong
  - Alternative options
  - Policy constraints

**Clear and start over:**
- Click "Clear session" to reset the terminal
- Type a new command

**Note on execution:** In demo mode, the "Confirm Execution" button is disabled. In live mode (when `NEXT_PUBLIC_LOOP_ENABLED=true`), it would trigger `executeApprovedIntent()`.

---

## Preset Prompts

Preset prompts are quick-start command examples shown below the input. They serve two purposes:
1. Reduce friction for new users who don't know what to type
2. Demonstrate the range of valid commands

The 5 presets are:
```
1. "Convert this 100 CC to the most suitable USDT route"
   → Demonstrates: asset conversion, routing

2. "Find the cheapest route for swapping 50 CC"
   → Demonstrates: yield search, amount specification

3. "Use at most 20 CC and minimize fees"
   → Demonstrates: budget constraint, fee optimization

4. "Preview before executing"
   → Demonstrates: simulation mode preference

5. "Find the lowest-risk yield up to 30 CC"
   → Demonstrates: risk filtering, amount constraint
```

Clicking a preset auto-fills the input and focuses the cursor. The user can edit the text before submitting.

---

## Input Behavior

| Event | Behavior |
|-------|----------|
| Type text | Updates textarea |
| Press Enter | Submits command (triggers plan generation) |
| Press Shift+Enter | Inserts newline (no submit) |
| Click preset chip | Fills input with preset text, focuses cursor |
| Click Send button | Same as pressing Enter |
| Submit while loading | Ignored (button disabled) |
| Submit empty input | Ignored (button disabled) |
| Press Escape | Clears input |

---

## Session History

The session history area appears above the input after the first command is submitted. It shows a chronological list of:
- **User messages** (right-aligned, darker background)
- **Marcus responses** (left-aligned, elevated surface background)

This is stored in React state (`sessionHistory`) and is cleared on:
- Page refresh
- Clicking "Clear session"

For authenticated users, this is the same behavior — there is no cross-session history in the terminal itself (cross-session history is shown in the Activity dashboard page).

---

## Terminal Chrome

The terminal is wrapped in a decorative chrome frame to reinforce the terminal metaphor:

```
┌─────────────────────────────────────────────┐
│ ● ● ●   marcus — public terminal            │  ← chrome header
├─────────────────────────────────────────────┤
│                                             │
│   [session history or empty]                │
│                                             │
│   [input area with textarea]                │
│   [preset prompt chips]                      │
│                                             │
│   [plan result sections]                    │
│                                             │
└─────────────────────────────────────────────┘
```

The chrome uses `bg-page` for the header and `bg-elevated` for the content area, creating visual separation from the surrounding page sections.

---

## Error Handling

| Error Condition | User Feedback |
|-----------------|----------------|
| Network failure | Red error card: "Request failed" |
| Server error (500) | Red error card: "Failed to generate plan" |
| Empty input submit | Submit button disabled |
| Rate limiting | Red error card with message from server |
| LLM not configured | Yellow notice: rule-based parsing is active |

Errors are displayed in a card with an AlertCircle icon, using the destructive color palette. The session history also logs the error as a Marcus message.

---

## Loading States

### During Command Submission
- Input is disabled
- Send button shows disabled state
- Thinking indicator replaces results area
- Preset chips are disabled

### During Explanation Request
- "Back to plan" button is hidden
- Explanation view replaces plan view
- Same loading animation shown

---

## Policy-Verdict Driven Actions

The "Next action" shown in the plan result is determined by the policy verdict:

| Verdict | Next Action | UI Shown |
|---------|-------------|----------|
| APPROVED | execute | "Confirm Execution" button (disabled in demo) |
| REQUIRES_APPROVAL | request_approval | "Request Approval" button |
| BLOCKED | (none) | Red blockedBy message, no action button |
| preview mode | preview | "Preview mode — no execution" badge |

---

## Demo Mode Constraints

In demo mode (default):
- "Confirm Execution" button is always disabled
- Wallet execution is simulated (no real on-chain transactions)
- Market data comes from seeded demo opportunities
- Balance is restorable via "Add Balance" button (guest) or demo reset

The terminal honestly communicates this via:
- Yellow DEMO badge on wallet display
- "(demo data)" label on opportunities
- "SIMULATED" badge on plan steps
- Disclaimer text at bottom of plan

---

## Future Interaction Improvements

| Improvement | Description |
|-------------|-------------|
| Streaming responses | Show Marcus's reasoning as it generates (SSE) |
| Voice input | Microphone button for voice commands |
| Command history | Up/down arrows to cycle through previous commands |
| Inline policy editing | Click a failed policy check to edit the policy directly |
| Share plan | Generate a shareable link to a specific plan result |
| Multi-step plans | Support for plans with multiple sequential steps |

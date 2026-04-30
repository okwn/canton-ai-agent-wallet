# 23. CLI Surface Purpose

## /agent is the CLI

The public terminal at `/agent` is Marcus's command-line interface.

It is designed to feel like a terminal while being accessible via browser.

---

## Terminal Design Principles

1. **Conversational, not scripted** — Natural language commands, not keywords
2. **Every response is a record** — Full exchange logged
3. **No hidden state** — Policy verdicts explain exactly why something was blocked

---

## What the Terminal Provides

| Feature | Guest | Authenticated |
|---------|-------|---------------|
| Natural language input | ✓ | ✓ |
| Intent parsing display | ✓ | ✓ |
| Policy evaluation | ✓ (demo) | ✓ (real) |
| Plan generation | ✓ | ✓ |
| Approval flow | ✓ | ✓ |
| Simulated execution | ✓ | ✓ |
| Session activity log | ✓ | ✓ |
| Persistent activity | ✗ | ✓ |

---

## Preset Prompts

5 preset prompts are shown for first-time users:

1. "Find the cheapest yield up to 50 CC"
2. "Show me my policy status"
3. "What is my daily limit?"
4. "Find a safe savings strategy for 100 CC"
5. "Block all withdrawals over 10 CC"

---

## Public Terminal vs Dashboard Terminal

Both use the same `/agent` route. The difference is auth state:

| Aspect | Guest Terminal | Auth Terminal |
|--------|---------------|----------------|
| Navbar | Minimal (logo only) | None (dashboard shell) |
| Activity | Session-only | Persisted |
| Policies | Demo policies | User's real policies |
| Wallet | 500M CC demo | Connected wallet |

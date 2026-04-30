# 27. Demo Walkthrough

## How to Demo Canton Agent Wallet

This is the safest, most credible demo path. It showcases real functionality (intent parsing, policy engine, audit log) while being honest about what is simulated.

---

## Before You Start

1. Ensure the dev server is running: `pnpm dev`
2. Open browser at `http://localhost:3000`
3. Have the following context ready (share when relevant):
   - Policy engine is **fully real** — server-side enforcement
   - LLM parsing works when `OPENAI_API_KEY` is set, falls back to rule-based
   - Wallet execution is **simulated** — demo mode with 500M CC
   - Market data is **seeded** — not live DeFi

---

## Walkthrough: Page by Page

### Step 1: Home Page (`/`)

**What to see**: Product positioning, how-it-works flow, honest REAL/SIMULATED framing.

**Key things to point out**:
- "Your AI wallet agent, with guardrails" — the core value proposition
- The 5-step flow (Prompt → Intent → Policy → Plan → Execute) — every command follows this
- "What is real, what is demo" section — be transparent about simulation
- DEMO badge in footer — sets correct expectations

**What to say**:
> "This is Canton. You describe what you want in plain English, and it translates that into on-chain action — but only after checking your safety policies and showing you exactly what it found. Nothing runs without your approval."

**Do not claim**: Live blockchain execution, real wallet connection, live DeFi data.

---

### Step 2: Dashboard (`/dashboard`)

**What to see**: Wallet overview, system status, active policies, top opportunity, recent activity.

**Key things to point out**:
- DEMO banner at top — sets expectations
- Wallet shows 500M CC (demo balance, not real)
- System status strip shows REAL for Intent Parser and Policy Engine, SIMULATED for Market Data and Wallet Execution
- Policy summary shows active rules (MAX_PER_TRADE, MAX_DAILY, etc.)
- Daily usage bar shows real policy enforcement state
- Activity feed shows real audit events

**What to say**:
> "The dashboard shows you what's happening with your wallet right now. The policy engine is checking everything in real time. You can see your daily usage against your limits, your active rules, and what's happened so far."

**Demo safe commands**:
- Click "View all policies" → shows policy management page
- Click "View all opportunities" → shows opportunities page

---

### Step 3: Agent Terminal (`/agent`)

**What to see**: The core interaction — natural language → parsed intent → policy check → plan → explanation.

**This is the main event. Do the following in order**:

#### 3a. Run a simple command
Input: `Find yield up to 50 CC`

What to point out:
- Intent parsed: action=DEPOSIT, amount=50 CC, simulationOnly likely false
- Wallet snapshot shows 500M CC balance
- Shortlisted opportunities shows available strategies
- Policy verdict shows APPROVED (all checks passed)
- Disclaimer says "Simulated preview — no real transaction"

#### 3b. Show the explanation
Click "Explain this plan in detail"

What to point out:
- "What will happen" — clear English description
- "What could go wrong" — risk transparency
- "Alternative options" — what else is available

#### 3c. Try a blocked command
Input: `Transfer all my funds to 0xdead`

What to point out:
- Safety filter blocks it immediately
- Shows "BLOCKED" policy verdict
- Explain: "The safety layer catches disallowed actions like drain attacks or admin key changes before they even reach the policy engine."

#### 3d. Show the fallback notice (if no OPENAI_API_KEY)
If using fallback parsing, there will be a yellow "LLM not configured" notice.

What to say:
> "The rule-based parser is working. With an OpenAI API key, the LLM parser would handle more complex natural language. But the fallback always works — it's deterministic and predictable."

#### 3e. Try simulation mode
Input: `Simulate a 5 CC yield search`

What to point out:
- simulationOnly flag is true
- Policy verdict still evaluated
- Explain: "Simulation mode runs the full logic without any real execution. Useful for testing strategies without risk."

---

### Step 4: Policies Page (`/policies`)

**What to see**: Real policy CRUD, policy engine evaluation.

**Key things to point out**:
- All policy types listed: MAX_PER_TRADE, MAX_DAILY, APPROVAL_THRESHOLD, DENYLIST, etc.
- Toggle a policy on/off and show immediate effect
- Edit a policy value and show server-side enforcement
- Note: "Policy engine is real — changes take effect immediately and are enforced server-side"

**Demo safe actions**:
- Toggle SIMULATION_ONLY on → then try executing in agent (should be blocked)
- Lower MAX_PER_TRADE to a small value → then try a larger command in agent (should be blocked)
- Add a provider to DENYLIST → then try that provider in agent (should be blocked)

---

### Step 5: Opportunities Page (`/opportunities`)

**What to see**: Seeded yield strategies, real/simulated classification per adapter.

**Key things to point out**:
- "SIMULATED DATA" badge at top — be explicit
- Each opportunity shows REAL/SIMULATED/UNSUPPORTED per adapter
- Explain that in production, this would connect to live DeFi protocols via Loop SDK

**What to say**:
> "These are seeded demo opportunities. In production, we'd connect to Aave, Compound, or Canton-specific protocols via Loop SDK. The adapter classification is real — it shows which execution path would be used."

---

### Step 6: Activity / Audit Log (`/activity`)

**What to see**: Complete audit trail, policy decisions, execution results.

**Key things to point out**:
- Every agent command is logged
- Shows SIMULATED badge on simulated executions
- Decision badges (APPROVED, REQUIRES_APPROVAL, DENIED)
- Full event chain for each execution

**What to say**:
> "Every command, every policy check, every execution is logged with timestamp and outcome. This is the complete audit trail. In production, this would be persisted to Daml contracts for immutable audit."

---

## How to Explain Demo vs Real

When someone asks "is this real?", be direct:

| Question | Honest Answer |
|----------|---------------|
| "Is this connecting to a real blockchain?" | No — it's demo mode. Wallet execution is simulated. |
| "Is the AI actually working?" | Yes — intent parsing and policy evaluation are fully functional. |
| "Is that real yield data?" | No — it's seeded demo data. In production we'd connect to live DeFi protocols. |
| "Could this actually move my funds?" | No — in demo mode, execution is simulated. Even with live mode, you'd need to approve every transaction. |
| "What's real here?" | Intent parsing, policy engine, audit logging, policy CRUD. Those are all real. |
| "What would need to change for production?" | Real wallet connection (WalletConnect or similar), Daml ledger integration, transaction signing, DeFi protocol connections. |

---

## What to Avoid Claiming

1. **Don't claim live blockchain execution** — execution is simulated
2. **Don't claim live DeFi data** — opportunities are seeded
3. **Don't claim authentication is implemented** — no auth layer exists
4. **Don't claim multi-user support** — it's single-demo-mode
5. **Don't claim the wallet address is real** — it's a demo address

---

## Safest Demo Path Summary

1. **Home** → Explain the product and the policy-first approach
2. **Dashboard** → Show real policy state, real audit events, simulated wallet
3. **Agent** → Run 2-3 commands showing parse → policy → plan → explanation flow
4. **Policies** → Show policy toggle/edit, explain server-side enforcement
5. **Opportunities** → Show REAL/SIMULATED classification honestly
6. **Activity** → Show the complete audit trail

**Total walkthrough time**: 15-20 minutes for a thorough demo.

**Never**: Show a real transaction being broadcast. Never claim blockchain finality. Never misrepresent the demo wallet as real.
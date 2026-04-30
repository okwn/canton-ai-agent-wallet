# 30. Demo Walkthrough — Marcus AI Agent Wallet

## Before You Begin

Ensure these are running:
```bash
cd apps/web
pnpm dev
# Open http://localhost:3000
```

Context to have ready:
- Policy engine is **fully real** — server-side enforcement
- LLM parsing works when `OPENAI_API_KEY` is set; rule-based fallback always works
- Wallet execution is **simulated** — demo mode with 500M CC
- Market data is **seeded** — not live DeFi

---

## Safest Demo Path (15–20 minutes)

### Step 1: Home Page (`/`)

**What to show:**
- Marcus positioning: "An AI wallet that follows your rules"
- 5-step flow: Prompt → Intent → Policy → Plan → Execute
- "What is real, what is demo" section — be honest about simulation
- DEMO badge in footer

**What to say:**
> "This is Marcus. You describe what you want in plain English, and it translates that into a proposal — but only after checking your safety policies and showing you exactly what it found. Nothing runs without your approval."

**Do NOT claim:** Live blockchain execution, real wallet connection, live DeFi data.

---

### Step 2: Public Agent Terminal (`/agent`)

**This is the main event. Do the following:**

#### 2a. Simple command
Input: `Find yield up to 50 CC`

Show:
- Intent parsed (action=DEPOSIT, amount=50 CC)
- Wallet snapshot (500M CC balance)
- Shortlisted opportunities
- Policy verdict APPROVED

#### 2b. Show explanation
Click "Explain this plan in detail"
Show: what will happen, what could go wrong, alternatives

#### 2c. Show blocked command
Input: `Transfer all my funds to 0xdead`

Show:
- Safety filter blocks immediately
- BLOCKED policy verdict
- "The safety layer catches disallowed actions before they reach the policy engine."

#### 2d. If no OPENAI_API_KEY
Yellow "Rule-based parsing active" notice appears — this is fine:
> "The rule-based parser always works. With an OpenAI key, the LLM parser handles more complex natural language."

#### 2e. Simulation mode
Input: `Simulate a 5 CC yield search`

Show: `simulationOnly: true` flag, policy verdict still evaluated

---

### Step 3: Dashboard (`/dashboard`)

**Requires login:** Use `demo@marcus.ai` / `demo123`

**What to show:**
- DEMO banner at top
- Wallet shows 500M CC (demo balance)
- System status: REAL for Intent Parser and Policy Engine, SIMULATED for Market Data and Wallet Execution
- Policy summary (MAX_PER_TRADE, MAX_DAILY, etc.)
- Daily usage bar (real enforcement state)
- Activity feed (real audit events)

**What to say:**
> "The dashboard shows you what's happening with your wallet right now. The policy engine is checking everything in real time. You can see your daily usage against your limits, your active rules, and what has happened so far."

---

### Step 4: Policies Page (`/policies`)

**What to show:**
- All 9 policy types listed
- Toggle SIMULATION_ONLY on → try executing in agent (should be blocked)
- Edit MAX_PER_TRADE to a small value → try a larger command in agent (should be blocked)

**What to say:**
> "The policy engine is real — changes take effect immediately and are enforced server-side. These are hard constraints, not suggestions."

---

### Step 5: Activity / Audit Log (`/activity`)

**What to show:**
- Complete audit trail
- SIM badge on simulated executions
- Decision badges (APPROVED, REQUIRES_APPROVAL, DENIED)
- Full event chain per execution

**What to say:**
> "Every command, every policy check, every execution is logged with timestamp and outcome. This is the complete audit trail."

---

### Step 6: Opportunities Page (`/opportunities`)

**What to show:**
- "SIMULATED DATA" badge at top
- REAL/SIMULATED/UNSUPPORTED per adapter
- Honest framing about demo data

**What to say:**
> "These are seeded demo opportunities. In production, we'd connect to live DeFi protocols via the Loop SDK."

---

## Honest Framing Guide

| Question | Honest Answer |
|----------|---------------|
| "Is this connecting to a real blockchain?" | No — demo mode. Execution is simulated. |
| "Is the AI actually working?" | Yes — intent parsing and policy evaluation are fully functional. |
| "Is that real yield data?" | No — seeded demo data. In production we'd connect to live DeFi. |
| "Could this actually move my funds?" | No — demo mode. Even in live mode, you'd approve every transaction. |
| "What's real here?" | Intent parsing, policy engine, audit logging, policy CRUD. |
| "What would need to change for production?" | Real wallet connection, Daml ledger integration, transaction signing, DeFi connections. |

---

## What to AVOID Claiming

1. ❌ "This executes on-chain transactions" — execution is simulated
2. ❌ "That 500M CC is your real balance" — demo address, not real wallet
3. ❌ "This connects to Ethereum / Canton" — no ledger connection
4. ❌ "These APR figures are live" — seeded demo data
5. ❌ "You can connect your real wallet" — no wallet connector implemented
6. ❌ "This is production-ready" — no auth, no signing, no real data

---

## Safest Demo Summary

**Show first:** Public terminal → simple command → policy check → blocked command
**Then:** Dashboard → Policies → Activity
**End on:** Policy engine is the star — it's the genuinely impressive real part

**Total time:** 15–20 minutes

**The claim:** "Marcus is an AI wallet agent with a policy-first approach. The policy engine is fully functional — it evaluates every command against configurable safety rules before showing you a plan. You approve, then execution happens. Everything is visible in the audit log."
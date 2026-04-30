# Submission Summary

## What We Built

**Canton Agent Wallet** — an AI-powered DeFi wallet that lets users speak in plain English while a deterministic policy engine enforces safety rules on every action.

Core components:
- **Agent Terminal** — natural language intent parsing (LLM or rule-based)
- **Policy Engine** — 11-step deterministic evaluation before any execution
- **Execution Adapters** — three adapters (Real/Simulated/Unsupported) with honest status reporting
- **Daml Model** — formal templates for UserPolicy, AgentInstruction, ExecutionReceipt
- **Demo Mode** — fully self-contained with seeded data, no external services required

---

## Who It Is For

- **Non-technical DeFi users** who want AI assistance without surrendering control
- **Power users** who want to set policy guardrails and audit every agent action
- **Teams** running autonomous strategies that need formal consent workflows

---

## Why It Matters

Current AI wallet products are black boxes. Either the AI has full wallet authority (dangerous) or it shows outputs users can't verify or limit.

Canton Agent Wallet makes the **AI an assistant, not an operator**. The policy engine is the gatekeeper. The AI proposes; the user's rules decide. Every execution is logged.

The Daml model makes this legally rigorous — in production, policies and instructions become on-chain Daml contracts with formal semantics.

---

## What Is Innovative

1. **Policy-first architecture** — the AI never has direct execution authority. Policy engine is always the intermediate decider.
2. **Execution adapter strategy** — a typed interface where every adapter (Real/Simulated/Unsupported) returns honest, structured results. No faked transactions.
3. **Daml + AI integration** — formal Daml templates model the consent lifecycle (propose → approve → execute → receipt) in a way that's both human-legible and machine-enforceable.
4. **Honest capability labeling** — every page labels components REAL/SIMULATED/DISABLED. No fake "live" indicators.

---

## What Is Working Today

| Component | Status | Detail |
|---|---|---|
| Intent parser (rule-based) | **Working** | Keyword extraction, amount parsing, provider/risk filters |
| Intent parser (LLM) | **Working** | Zod schema validation with fallback to rule-based |
| Policy engine | **Working** | 11 checks, server-side enforcement |
| Execution adapters | **Working** | Demo (SIMULATED), Unsupported (honest), Loop (PREPARED) |
| SQLite persistence | **Working** | sql.js — no native binaries, works everywhere |
| Audit log | **Working** | Append-only, timestamped, includes policy decisions |
| UI (all pages) | **Working** | Landing, Dashboard, Agent, Opportunities, Policies, Activity, Wallet |
| Smoke tests | **Working** | 13 smoke + 79 unit tests, all passing |
| Demo mode | **Working** | Seeded wallet, policies, opportunities, audit events |

---

## What Is Simulated Today

| Component | Status | Reason |
|---|---|---|
| Market / opportunity data | **Simulated** | Seeded static data — no live DeFi oracles |
| Wallet execution | **Simulated** | Demo wallet (500 CC) — no real tokens |
| Real on-chain execution | **Simulated** | Loop SDK integration exists but requires live wallet + `NEXT_PUBLIC_LOOP_ENABLED=true` |
| Daml ledger | **Not connected** | Daml model exists in `daml/agent-wallet/`. Not wired to the TypeScript app. |

---

## What We Would Build Next

1. **Daml ledger integration** — wire the `DamlExecutionAdapter` to the Canton HTTP API so policy contracts are actual Daml templates on a real ledger
2. **Live opportunity feeds** — replace seeded data with Chainlink/Pyth price oracles for real APR and liquidity data
3. **Multi-step strategies** — Daml workflows for compose-able multi-transaction strategies (swap → deposit → yield farm)
4. **Approval flow UI** — full approve/reject UI for the `AgentInstruction` → `ExecutionApproval` Daml choice lifecycle
5. **Transaction signing** — server-side signing adapter for non-custodial execution in production

---

## One-Line Pitch

**"An AI agent wallet where your safety policies are always the final decision-maker — nothing executes without your rules, nothing is faked, and everything is logged."**

## Sub-headline

**Canton Agent Wallet — DeFi commands in plain English, with policy guardrails that even the AI can't bypass.**

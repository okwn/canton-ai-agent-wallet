# Judging Alignment

Framing this project across the criteria judges care about.

---

## Product Quality

**What we built:** A complete, runnable web app with 7 pages, 14 API routes, 13 smoke tests + 79 unit tests, and a full Playwright happy-path suite. Every page loads, every API responds, and the demo flow works end-to-end.

**How we show it:** `pnpm dev` → browser → walk through the Agent Terminal with "Find yield up to 50 CC" → see APPROVED plan → see SIMULATED execution receipt.

**Why it stands out:** Most hackathon projects show screenshots. Ours shows a working product with seeded data, an honest demo banner, and a "Reset Demo Data" button for repeatable demos.

---

## Technical Credibility

**What we built:** A proper monorepo (pnpm workspace) with typed packages (`@canton/shared`, `@canton/agent-core`), a deterministic policy engine with 11 enforcement steps, a structured execution adapter pattern, and formal Daml templates for the consent lifecycle.

**How we show it:**
- `packages/agent-core/src/policy-engine.ts` — 11 sequential checks, each producing a `PolicyCheckResult`
- `packages/agent-core/src/execution/adapter.ts` — typed `ExecutionAdapter` interface with `supports/prepareExecution/execute/estimateExecutionCost`
- `daml/agent-wallet/model/` — UserPolicy, AgentInstruction, ExecutionReceipt as Daml templates
- 79 unit tests passing on agent-core

**Why it stands out:** The execution adapter pattern means you can trace any execution result back to the exact adapter that produced it. No magic — just typed interfaces and honest status codes.

---

## Canton Relevance

**What we built:** Daml templates that formally model the entire consent lifecycle: UserPolicy (spending rules), AgentInstruction (agent proposals), ExecutionApproval (user consent), and ExecutionReceipt (immutable result record). The architecture is designed so these Daml contracts are the enforcement layer in production.

**How we show it:**
- `daml/agent-wallet/model/Policy.daml` — `UserPolicy` with `ApprovePolicy` and `ArchivePolicy` choices
- `daml/agent-wallet/model/Instruction.daml` — `AgentInstruction` with `ApproveInstruction` / `RejectInstruction` choices
- `docs/daml.md` — explains the Daml-to-TypeScript mapping

**Why it matters for Canton:** The policy engine in TypeScript is the demo-time enforcement. The Daml model is the production enforcement. They model the same concepts using Canton's formal notation. A judge can see we understand Canton isn't just a buzzword — it's the formal foundation for our consent model.

---

## User Safety

**What we built:** A system where the AI **proposes** and the policy engine **decides**. The AI never has direct wallet authority. Every execution goes through an adapter that honestly reports its status.

**The safety architecture:**
```
LLM proposes intent
    ↓
Policy engine evaluates (11 checks)
    ↓
User approves (or auto-approves based on policy)
    ↓
Execution adapter runs (Real / Simulated / Unsupported)
    ↓
ExecutionReceipt logged
```

**Why it's credible:**
- Policy engine is server-side and deterministic — not a prompt engineering convention
- `UnsupportedExecutionAdapter` always returns `UNSUPPORTED` — it never fakes a transaction
- `EXECUTION_MODE = approval_required` is the default seed policy
- No "auto-execute unless blocked" — it's always "block unless approved"
- Audit log is append-only

**Honest limitations:** We explicitly label SIMULATED data. The demo banner is always visible. We do not claim the demo wallet has real tokens.

---

## Execution Realism

**What we built:** Three real execution adapters with honest return types.

| Adapter | What it does | Is it honest? |
|---|---|---|
| `LoopSupportedExecutionAdapter` | Prepares payload for Loop SDK | Yes — returns `status: PREPARED` with explanation that browser must call `window.loop.execute()` |
| `DemoExecutionAdapter` | Simulates locally | Yes — returns `status: SIMULATED` with `simulatedTxHash` and honest explanation |
| `UnsupportedExecutionAdapter` | Reports unsupported | Yes — always returns `status: UNSUPPORTED`, never attempts a transaction |

**Why it's credible:** We show the execution receipt on the Activity page. Users can see the difference between a `SIMULATED` result and an `UNSUPPORTED` result. The adapter type is logged on every execution.

**Limitation we call out:** Real on-chain execution requires `NEXT_PUBLIC_LOOP_ENABLED=true` and a live wallet. This is clearly labeled. We don't fake live execution.

---

## Extensibility

**What we built:** A typed execution adapter interface. Adding a new adapter means implementing `supports/prepareExecution/execute/estimateExecutionCost` and adding one branch to `resolveAdapter()`.

**How to add a new adapter:**
1. Implement `ExecutionAdapter` interface in `packages/agent-core/src/execution/adapters.ts`
2. Add one conditional branch in `packages/agent-core/src/execution/resolution.ts::resolveAdapter()`
3. The new adapter appears in the Opportunities page support badges automatically

**Why it matters:** The system is designed so a team can add a real oracle adapter, a different wallet SDK adapter, or a mock adapter for testing — without changing the policy engine or UI.

---

## 60-Second Demo Pitch

> "Canton Agent Wallet lets you control your DeFi wallet with plain English commands — but here's what makes it different: every command goes through your safety policies before anything happens. The AI proposes; your rules decide.
>
> You can say 'find me yield up to 50 CC' — the agent parses it, checks your per-trade limit, your daily cap, your denylist — and shows you a plan. You approve it, it executes, and you get a receipt.
>
> The policy engine is real. The audit log is real. The only simulated parts are the market data and the wallet — and we label those honestly on every screen.
>
> Built with a formal Daml model for the consent lifecycle, a typed execution adapter pattern, and a demo mode that just works out of the box. No setup, no external services — just `pnpm dev`."

---

## 3-Minute Demo Script

1. **Landing page (30s)** — Show honest capability labels. "The agent is real. The market data is simulated. Nothing is faked."
2. **Dashboard (30s)** — Demo wallet, daily usage bar, policy count, pre-seeded opportunities.
3. **Agent Terminal — approved path (1min)** — Type "Find the cheapest yield up to 50 CC". Walk through the 7 response sections. Show Policy Verdict = APPROVED. Click Confirm Execution.
4. **Agent Terminal — blocked path (30s)** — Type "Move all my CC to lace finance". Show Policy Verdict = BLOCKED. Show which policy blocked it.
5. **Opportunities page (30s)** — Show REAL/SIMULATED/UNSUPPORTED badges. Explain the adapter matrix.
6. **Activity page + Reset (30s)** — Show execution receipts. Click Reset Demo Data. "Ready for the next demo."

---

## Architecture Talk Track

> "The core insight is that most AI wallet products make the AI the authority. We made the policy engine the authority.
>
> When you type a command, the LLM parses it into a structured intent — but the intent doesn't execute. It goes to our policy engine, which runs 11 deterministic checks: per-trade limit, daily spend, approval threshold, denylists, slippage, simulation mode.
>
> The policy engine returns a decision — APPROVED, DENIED, or REQUIRES_APPROVAL. Only then does an execution adapter run. And our three adapters are honest: Loop for real execution, Demo for simulation, Unsupported when we can't do anything.
>
> On the backend, we're modeling this with Daml templates. The UserPolicy, the AgentInstruction, the ExecutionReceipt — these are Daml contracts. In production, they run on a Canton ledger. In the demo, they run as TypeScript objects. The shape is the same.
>
> This is why Canton matters for us. The Daml model isn't decoration — it's the formal specification for what the TypeScript code implements today and what the production system enforces tomorrow."

---

## Crisp One-Liner + Subheadline

**One-liner:** An AI agent wallet where your safety policies are always the final decision-maker.

**Subheadline:** Plain English DeFi commands with policy guardrails that even the AI can't bypass — backed by formal Daml contracts on Canton.

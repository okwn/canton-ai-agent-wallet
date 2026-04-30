# Canton Agent Wallet

<!-- Badges -->
<div align="center">

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Daml](https://img.shields.io/badge/Daml-2.0-black?style=flat-square&logo=daml)

**Natural language DeFi commands with policy-first safety.**

*Find me the cheapest yield up to 50 CC* → the agent parses it, checks your rules, shows you the plan, executes only when you approve.

**[Live Demo](https://canton-agent-wallet.vercel.app)** · [Documentation](#architecture) · [Getting Started](#setup)

</div>

---

## The Problem

DeFi is powerful but dangerous for non-technical users. APRs, slippage, impermanent loss, and smart contract risk are opaque.

| Existing Solutions | The Gap |
|---|---|
| "Here's your seed phrase, good luck" | Full control, full responsibility |
| "Trust our AI" | Black box, no visibility or limits |

**What users want:** Simple commands · Clear explanations · Safety nets they configure

---

## The Solution

Canton Agent Wallet is an AI-powered wallet interface that speaks plain English, while a **deterministic policy engine** remains the gatekeeper for every action.

```
User: "Find yield up to 50 CC"
  │
  ├─► Intent Parser        (LLM or rule-based)
  ├─► Policy Engine        (11 deterministic checks)
  ├─► Recommended Plan      (shown to user)
  └─► Execution             (only after you approve)
```

### Core Principles

- **No policy can be bypassed** — AI proposes, your rules decide
- **No execution without consent** — every action needs your approval
- **No AI wallet authority** — the agent suggests, you control

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Browser (Next.js UI)                                   │
│  ┌──────────┐  ┌───────────┐  ┌─────────────────────┐   │
│  │ Dashboard │  │ Agent     │  │ Opportunities      │   │
│  │           │  │ Terminal  │  │                    │   │
│  └─────┬────┘  └─────┬─────┘  └──────────┬──────────┘   │
│        │              │                   │              │
│        └──────────────┼───────────────────┘              │
│                       │ fetch /api/agent/plan            │
└───────────────────────┼─────────────────────────────────┘
                        ▼
┌───────────────────────────────────────────────────────────┐
│  API Routes                                                │
│  ┌───────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │ Intent Parser │─►│ Policy Engine │─►│ Exec Adapter │  │
│  │ LLM / Rules   │  │ 11 checks      │  │ Loop/Demo/   │  │
│  └───────────────┘  └────────────────┘  │ Unsupported  │  │
│                                        └───────┬───────┘  │
└───────────────────────────────────────────────┼───────────┘
                                                ▼
┌───────────────────────────────────────────────────────────┐
│  Storage                                                   │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────┐  │
│  │ SQLite       │  │ Audit Log     │  │ Daml Model    │  │
│  │ (sql.js)     │  │ (append-only) │  │ (production)  │  │
│  └──────────────┘  └───────────────┘  └────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

### Execution Adapter Strategy

Every execution route goes through one adapter — no exceptions:

| Adapter | Purpose | Status |
|---|---|---|
| `LoopSupportedExecutionAdapter` | Real on-chain via Loop SDK | PREPARED |
| `DemoExecutionAdapter` | Honest simulation | ACTIVE |
| `UnsupportedExecutionAdapter` | Always returns UNSUPPORTED | ACTIVE |

---

## Features

### Agent Terminal
- Natural language intent parsing
- Rule-based parser works out of the box
- LLM-powered parser when `LLM_API_KEY` is configured

### Policy Engine
- 11-step deterministic evaluation
- Server-side enforcement
- Every policy check is logged

### Transparency First
| Component | Status | Notes |
|---|---|---|
| Intent parser (NLP) | **REAL** | Rule-based always. LLM when key set. |
| Policy engine | **REAL** | 11-step deterministic. Server-side. |
| Audit log | **REAL** | Append-only, timestamped. |
| Policy storage | **REAL** | SQLite (sql.js). Daml in prod. |
| Market data | **SIMULATED** | Seeded, not live DeFi. |
| Wallet execution | **SIMULATED** | Demo wallet (500 CC). |

---

## Why Canton + Loop

| | |
|---|---|
| **Canton** | Formal modeling layer — policies and agent instructions as Daml templates. Clear path from demo → production with real contractual semantics. |
| **Loop** | Wallet runtime. Loop SDK provides browser API to sign and submit transactions, bridged by our `LoopSupportedExecutionAdapter`. |

---

## Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development server
pnpm dev
# → http://localhost:3000
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_LOOP_ENABLED` | `false` | Set `true` for live Loop wallet integration |
| `LLM_API_KEY` | _(unset)_ | OpenAI API key. Rule-based parser used without it. |
| `LLM_BASE_URL` | _(unset)_ | OpenAI-compatible endpoint |
| `LLM_MODEL` | _(unset)_ | Model name (e.g., `gpt-4o-mini`) |

### Demo Mode

Demo mode is **always on by default**. Includes:
- Demo wallet: 500 CC, 250 USDC (no real tokens)
- 9 pre-configured safety policies
- 7 seeded yield opportunities
- 7 pre-seeded audit events (happy path + blocked path)

Reset demo data:
```bash
curl -X POST http://localhost:3000/api/demo/reset
```

---

## Project Structure

```
.
├── apps/web/                    # Next.js frontend
│   ├── app/
│   │   ├── (main)/              # Authenticated pages
│   │   │   ├── dashboard/
│   │   │   ├── agent/           # Agent Terminal
│   │   │   ├── opportunities/
│   │   │   ├── policies/
│   │   │   ├── activity/        # Audit log
│   │   │   └── wallet/
│   │   ├── api/                 # API routes
│   │   └── page.tsx             # Landing page
│   └── lib/
│       ├── agent-service.ts
│       ├── db.ts                # sql.js + seeded data
│       └── loop/                # Loop SDK integration
├── packages/
│   ├── agent-core/              # Agent logic (79 tests)
│   │   └── src/
│   │       ├── execution/       # Adapters + resolution
│   │       ├── llm/             # LLM service, tools, parser
│   │       ├── parser.ts
│   │       └── policy-engine.ts
│   └── shared/
├── daml/agent-wallet/           # Daml model
│   └── model/
│       ├── Policy.daml
│       ├── Instruction.daml
│       ├── AuditLog.daml
│       └── scripts/Setup.daml
├── docs/                        # Architecture & runbooks
└── e2e/                         # Playwright tests
```

---

## Scripts

```bash
pnpm dev              # Start all packages in dev mode
pnpm build            # Build all packages
pnpm typecheck        # Type-check all packages
pnpm test             # Run smoke tests (web)
pnpm test:agent-core  # Run unit tests (agent-core)
pnpm e2e              # Run Playwright happy-path tests
```

---

## Built With

<p align="left">
<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" height="24"/></a>
<a href="https://sql.js.org/"><img src="https://img.shields.io/badge/sql.js-1.0-blue?style=flat-square" height="24"/></a>
<a href="https://daml.com/"><img src="https://img.shields.io/badge/Daml-2.0-black?style=flat-square&logo=daml" height="24"/></a>
<a href="https://loop.markets/"><img src="https://img.shields.io/badge/Loop%20SDK-Integration-black?style=flat-square" height="24"/></a>
<a href="https://zod.dev/"><img src="https://img.shields.io/badge/Zod-3.0-blue?style=flat-square&logo=zod" height="24"/></a>
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-3.0-black?style=flat-square&logo=tailwindcss" height="24"/></a>
<a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-1.0-green?style=flat-square&logo=vitest" height="24"/></a>
<a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-1.40-black?style=flat-square&logo=playwright" height="24"/></a>
</p>

---

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.
# SystemMap: Marcus AI Agent Wallet

**Single source of truth** for what Marcus is, how it works, what is real vs simulated, and what remains to be built.

---

## Start Here: Recommended Reading Order

### Phase 1: Understand What Marcus Is
| # | Document | Time |
|---|---------|------|
| 1 | [19-architecture-map.md](./19-architecture-map.md) | 5 min - System topology, packages, three surfaces |
| 2 | [20-surface-separation-map.md](./20-surface-separation-map.md) | 5 min - Home vs Terminal vs Dashboard explained |

### Phase 2: Understand the Core Value
| # | Document | Time |
|---|---------|------|
| 3 | [13-auth-flow-map.md](./13-auth-flow-map.md) | 3 min - Login, register, session, protected routes |
| 4 | [14-dashboard-access-rules.md](./14-dashboard-access-rules.md) | 3 min - Access model, redirects, guest vs auth |

### Phase 3: Understand What You're Demoing
| # | Document | Time |
|---|---------|------|
| 5 | [15-login-register-surface-map.md](./15-login-register-surface-map.md) | 3 min - Login/register UI surfaces |
| 6 | [16-dashboard-rebuild-rationale.md](./16-dashboard-rebuild-rationale.md) | 5 min - Why dashboard was rebuilt |
| 7 | [17-dashboard-information-architecture.md](./17-dashboard-information-architecture.md) | 5 min - Dashboard sections explained |
| 8 | [18-dashboard-real-demo-map.md](./18-dashboard-real-demo-map.md) | 5 min - What is real vs simulated in dashboard |

### Phase 4: Deep Dives (as needed)
| # | Document | Time |
|---|---------|------|
| 9 | [21-agent-and-wallet-flow.md](./21-agent-and-wallet-flow.md) | 3 min - Prompt to receipt flow |
| 10 | [22-demo-balance-behavior.md](./22-demo-balance-behavior.md) | 2 min - Demo wallet explained |
| 11 | [23-cli-surface-purpose.md](./23-cli-surface-purpose.md) | 2 min - Terminal purpose |
| 12 | [24-real-demo-mock-unsupported-matrix.md](./24-real-demo-mock-unsupported-matrix.md) | 5 min - Complete feature classification |
| 13 | [25-technical-gap-analysis.md](./25-technical-gap-analysis.md) | 5 min - What needs building |
| 14 | [26-security-safety-notes.md](./26-security-safety-notes.md) | 5 min - Security and safety |
| 15 | [27-jury-demo-story.md](./27-jury-demo-story.md) | 5 min - How to demo for judges |

### Phase 6: Final Assessment
| # | Document | Time |
|---|---------|------|
| 16 | [28-final-readiness.md](./28-final-readiness.md) | 5 min - Complete readiness summary |

---

## Quick Summary

### What Marcus Is
An AI wallet agent that lets you manage funds with natural language commands. Every command is checked against your safety policies before execution.

### Core Flow
```
User types command → Intent parsed → Policy evaluated → Plan shown → User approves → Executed → Logged
```

### Three Surfaces
1. **Home** (`/`) - Marketing page
2. **Public Terminal** (`/agent`) - Demo without login
3. **Dashboard** (`/dashboard`) - Full control center (login required)

---

## What's Real vs Simulated

| Component | Status |
|-----------|--------|
| Policy engine | **REAL** - Server-side enforcement |
| Intent parsing | **REAL** - LLM or rule-based fallback |
| Plan generation | **DEMO** - Works but with seeded data |
| Audit logging | **REAL** - Complete event trail |
| Policy CRUD | **REAL** - Persists to database |
| Wallet balance | **DEMO** - 500M CC hardcoded |
| Opportunities | **DEMO** - Seeded data only |
| Execution | **DEMO** - Simulated, no blockchain |

---

## Safest Demo Claim

> "Marcus is an AI wallet with policy-first safety. The policy engine is server-side enforced — every command is checked against your rules before anything happens. This demo shows the full flow with simulated data."

---

## Demo Credentials

```
Email: demo@marcus.ai
Password: demo123
```

---

## Document Index

| Filename | Title |
|----------|-------|
| [19-architecture-map.md](./19-architecture-map.md) | Architecture Map |
| [20-surface-separation-map.md](./20-surface-separation-map.md) | Surface Separation Map |
| [13-auth-flow-map.md](./13-auth-flow-map.md) | Auth Flow Map |
| [14-dashboard-access-rules.md](./14-dashboard-access-rules.md) | Dashboard Access Rules |
| [15-login-register-surface-map.md](./15-login-register-surface-map.md) | Login/Register Surface Map |
| [16-dashboard-rebuild-rationale.md](./16-dashboard-rebuild-rationale.md) | Dashboard Rebuild Rationale |
| [17-dashboard-information-architecture.md](./17-dashboard-information-architecture.md) | Dashboard Information Architecture |
| [18-dashboard-real-demo-map.md](./18-dashboard-real-demo-map.md) | Dashboard Real/Demo Map |
| [21-agent-and-wallet-flow.md](./21-agent-and-wallet-flow.md) | Agent and Wallet Flow |
| [22-demo-balance-behavior.md](./22-demo-balance-behavior.md) | Demo Balance Behavior |
| [23-cli-surface-purpose.md](./23-cli-surface-purpose.md) | CLI Surface Purpose |
| [24-real-demo-mock-unsupported-matrix.md](./24-real-demo-mock-unsupported-matrix.md) | Real/Demo/Mock/Unsupported Matrix |
| [25-technical-gap-analysis.md](./25-technical-gap-analysis.md) | Technical Gap Analysis |
| [26-security-safety-notes.md](./26-security-safety-notes.md) | Security and Safety Notes |
| [27-jury-demo-story.md](./27-jury-demo-story.md) | Jury Demo Story |
| [28-final-readiness.md](./28-final-readiness.md) | Final Readiness |

---

## For Judges

Read these in order:
1. [19-architecture-map.md](./19-architecture-map.md) - Understand the system
2. [24-real-demo-mock-unsupported-matrix.md](./24-real-demo-mock-unsupported-matrix.md) - Know what is real
3. [27-jury-demo-story.md](./27-jury-demo-story.md) - How to demo it
4. [28-final-readiness.md](./28-final-readiness.md) - Honest assessment

---

## Maintenance

After any significant change, update:
1. The relevant map document
2. This README's reading order if structure changed
3. [28-final-readiness.md](./28-final-readiness.md) readiness verdict

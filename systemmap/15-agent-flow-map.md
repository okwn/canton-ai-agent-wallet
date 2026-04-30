# 15. Agent Flow Map

## Agent Orchestrator (`packages/agent-core/src/agent.ts`)

The `AgentOrchestrator` class is the main AI agent logic. It is **production-real** for parsing and planning, **simulated** for execution.

## Public API

```typescript
class AgentOrchestrator {
  configure(llm: LLMService): void
  configureFromEnv(): boolean  // Returns false if no API key
  setOpportunities(opportunities: StrategyOpportunity[]): void
  setPolicies(policies: Policy[]): void
  setWallet(wallet: ConnectedWalletState): void
  getSimulationFlag(): boolean

  async generatePlan(userText: string): Promise<{
    plan: AgentPlanResponse
    intentId: string
    llmParseFallback: boolean
  }>

  async generateExplain(userText: string): Promise<{
    explanation: AgentExplainResponse
    intentId: string
  }>
}
```

## generatePlan Flow

```
User text
   │
   ▼
sanitizeUserInput()    ── strips dangerous chars, normalizes whitespace
   │
   ▼
checkDisallowedAction() ── safety: blocks drain/admin/wrong providers
   │
   ├─── REJECTED → _buildRejectionPlan() → return blocked plan
   │
   ▼
getWalletSnapshot()    ── current balance, daily usage, limit
   │
   ▼
[LLM path] ──── if llm configured:
  _callLlmForIntent() → LLM structured output → InterpretedIntent
         │
         └─── FAIL/exception → fallbackParse() → InterpretedIntent
   │
[Fallback path] ──── always available:
  fallbackParse() → rule-based InterpretedIntent
   │
   ▼
_buildExecutionIntent() ── converts InterpretedIntent → ParsedExecutionIntent
   │
   ▼
policyEngine.evaluate() ── 11-step policy evaluation
   │
   ▼
checkBudgetOvershoot() ── logs if amount exceeds MAX_PER_TRADE
   │
   ▼
_shortlistOpportunities() ── filter by provider/risk, sort by APR, take top 5
   │
   ▼
_buildRecommendedPlan() ── uses top opportunity
   │
   ▼
_determineNextAction() ── blocked | request_approval | preview_only | execute
   │
   ▼
return AgentPlanResponse
   │
   ▼
logSafetyEvent('AGENT_PLAN_GENERATED')
```

## Safety Layer

The safety module (`packages/agent-core/src/llm/safety.ts`) provides:

| Function | Purpose |
|----------|---------|
| `sanitizeUserInput()` | Remove control chars, truncate to 2000 chars |
| `checkDisallowedAction()` | Block drain, admin key, ownership change requests |
| `checkRequestedProviders()` | Log if provider not in known list (froburn, lace, cantonswap) |
| `checkBudgetOvershoot()` | Log if intent amount > MAX_PER_TRADE default |
| `logSafetyEvent()` | Write safety events to audit log |

**Hardcoded allowed providers**: `froburn`, `lace`, `cantonswap` — any other provider logged as a warning.

## Intent Parsing

Two paths:

### LLM Path (when `OPENAI_API_KEY` set)
- Uses OpenAI-compatible API
- Sends `SYSTEM_PROMPT` + user text
- Requests `InterpretedIntent` schema via structured output
- If LLM fails or returns invalid → fallback

### Fallback Path (always available)
- `fallbackParse()` in `packages/agent-core/src/llm/parser.ts`
- Regex-based action detection
- Extracts amount from text patterns
- Always produces a result (never throws)

## Prompt System

```text
SYSTEM_PROMPT:
"You are the Canton AI Wallet Agent... 
IMPORTANT SAFETY RULES:
1. NEVER suggest drain or unknown address transfer
2. NEVER mention admin key changes
3. Only use known providers: froburn, lace, cantonswap
4. If disallowed action → explain + offer alternatives
5. Respect budget/policy constraints
6. If "preview"/"simulate" → return preview only, no auto-execute
7. Be transparent about simulated data"
```

## Plan Response Structure

```typescript
AgentPlanResponse {
  interpretedIntent: InterpretedIntent
  walletSnapshotSummary: WalletSnapshot
  shortlistedOpportunities: Opportunity[]
  recommendedPlan: PlanStep
  whyThisPlan: string          // Human-readable rationale
  policyVerdict: {
    decision: 'APPROVED' | 'DENIED' | 'REQUIRES_APPROVAL'
    blockedBy: string | null
    passedChecks: string[]
    failedChecks: string[]
  }
  nextAction: 'execute' | 'preview_only' | 'request_approval' | 'blocked'
  disclaimer: string           // Simulated warning
  isSimulated: boolean
  isBasedOnSeededData: boolean
}
```

## What is Real vs Simulated

| Operation | Status | Notes |
|-----------|--------|-------|
| Intent parsing (LLM) | REAL | Works when API key set |
| Intent parsing (fallback) | REAL | Always works |
| Safety checks | REAL | Correct logic, real logging |
| Policy evaluation | REAL | Deterministic, tested |
| Opportunity filtering | SIMULATED | Uses seeded data only |
| Execution | SIMULATED | Logs receipt, no real tx |
| LLM plan generation | REAL | Uses LLM when available |
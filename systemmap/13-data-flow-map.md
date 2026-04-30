# 13. Data Flow Map

## Full Prompt-to-Receipt Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: PROMPT IN                                                          │
│ User types natural language into /agent terminal                           │
│ "Deploy 1000 CC to a low-risk lending strategy"                             │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: PARSING (parseIntent in agent-core)                                 │
│                                                                          │
│   Path A — LLM path (if OPENAI_API_KEY set):                              │
│     sanitizeUserInput() → LLM structured output → InterpretedIntent       │
│                                                                          │
│   Path B — Fallback path (always available):                              │
│     fallbackParse() → rule-based extraction → InterpretedIntent          │
│                                                                          │
│ Output: ParsedExecutionIntent { id, action, amountMicroCC, providerFilter, │
│         assetFilter, maxSlippageBps, simulationOnly, ... }                 │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: POLICY EVALUATION (PolicyEngine.evaluate in agent-core)            │
│                                                                          │
│ 11-step deterministic pipeline (priority order):                         │
│                                                                          │
│  1. VALIDITY_CHECK     → intent structure valid? action != UNKNOWN?       │
│  2. EXECUTION_MODE    → disabled? → DENY                                  │
│  3. SIMULATION_MODE   → sim-only policy active + real requested? → WARN  │
│  4. DENYLIST_CHECK    → requested provider on denylist? → DENY            │
│  5. ALLOWLIST_CHECK   → requested provider not on allowlist? → DENY      │
│  6. ASSET_ALLOWLIST   → requested asset not allowed? → DENY               │
│  7. SLIPPAGE_CHECK    → slippage > max? → DENY                            │
│  8. BALANCE_CHECK     → amount > available balance? → DENY                │
│  9. BUDGET_CAP_CHECK  → amount > MAX_PER_TRADE? → DENY                    │
│ 10. DAILY_LIMIT_CHECK → projected daily usage > MAX_DAILY? → DENY        │
│ 11. APPROVAL_THRESHOLD→ amount > APPROVAL_THRESHOLD? → REQUIRES_APPROVAL   │
│                                                                          │
│ Output: PolicyEvaluationResult { decision, riskChecks[], blockedBy,       │
│         blockedByPolicyId, reasons, warnings }                            │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 4: OPPORTUNITY SELECTION                                              │
│                                                                          │
│ _shortlistOpportunities() in agent.ts:                                   │
│  • Filter by providerFilter if provided                                   │
│  • Filter by riskTolerance if provided                                     │
│  • Limit to top 5 by APR                                                  │
│  • Each opp ranked with reason string                                     │
│                                                                          │
│ Data source: seeded opportunities from DB (NOT live DeFi)                 │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 5: EXECUTION PREVIEW (AgentPlanResponse)                             │
│                                                                          │
│ AgentOrchestrator.generatePlan() produces:                               │
│                                                                          │
│  interpretedIntent     → Parsed intent                                    │
│  walletSnapshotSummary → Address, balance, daily usage, canExecuteReal  │
│  shortlistedOpportunities[] → Top 5 ranked opportunities                │
│  recommendedPlan       → Step 1 of execution (top opp)                    │
│  whyThisPlan           → Human-readable rationale                         │
│  policyVerdict         → { decision, blockedBy, passedChecks, failedChecks }│
│  nextAction            → execute | preview_only | request_approval | blocked│
│  disclaimer            → Simulated warning if applicable                  │
│  isSimulated           → true if demo mode or no live opportunities       │
│  isBasedOnSeededData   → true if opportunities are seeded (not live)      │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 6: EXECUTION ATTEMPT                                                 │
│                                                                          │
│ User approves → executeApprovedIntent() in agent-service.ts:             │
│                                                                          │
│  1. Check evaluation.decision:                                           │
│     • DENIED → receipt.status = BLOCKED, no execution                    │
│     • REQUIRES_APPROVAL → receipt.status = BLOCKED, needs confirmation   │
│     • APPROVED → continue                                                 │
│                                                                          │
│  2. Determine isSimulated:                                               │
│     typedWallet.isDemo || intent.simulationOnly ||                       │
│       topOpportunity.executionSupport !== 'real'                          │
│                                                                          │
│  3. Build ExecutionReceipt:                                               │
│     • status: SUCCESS | SIMULATED | BLOCKED                              │
│     • stepResults[] with txHash (null for sim)                            │
│     • totalOutputMicroCC, totalFeesPaidMicroCC                            │
│     • policyDecision, simulationOnly flag                                │
│                                                                          │
│  4. Log to DB:                                                            │
│     • insertExecutionAttempt() → execution_attempts table                │
│     • insertAuditEvent() for EXECUTION_COMPLETED or EXECUTION_REJECTED   │
│     • updatePolicy() for daily usage if APPROVED                         │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 7: RECEIPT / ACTIVITY                                                 │
│                                                                          │
│ Receipt returned to frontend:                                             │
│  { id, attemptId, status, stepResults[], totalOutputMicroCC,            │
│    totalFeesPaidMicroCC, policyDecision, simulationOnly, executedAt }   │
│                                                                          │
│ Frontend polls /api/audit for activity feed                              │
│ Dashboard shows recent events, updated balances                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## State Transitions

| Event | DB Write | UI Update |
|-------|----------|-----------|
| Intent parsed | `audit_events: INTENT_PARSED` | Agent page shows parsed intent |
| Policy evaluated | `audit_events: POLICY_EVALUATED` | Agent page shows policy verdict |
| Plan generated | `audit_events: AGENT_PLAN_GENERATED` | Agent page shows plan |
| User approves | `execution_attempts: insert + update` | Agent page shows receipt |
| Execution blocked | `execution_attempts: REJECTED` | Agent page shows blocked reason |
| Execution simulated | `execution_attempts: COMPLETED` (SIMULATED) | Activity feed shows SIMULATED event |

## Safety Events (logged on safety check failures)

| Event | Trigger |
|-------|---------|
| `AGENT_DISALLOWED_ACTION` | User requested unsupported action (drain, admin key change, etc.) |
| `AGENT_PARSE_FAILED` | LLM parse threw an exception |
| `AGENT_BUDGET_OVERSHOOT` | Intent amount exceeds MAX_PER_TRADE |
| `AGENT_PLAN_GENERATED` | Successful plan generation |
| `AGENT_REJECTED` | Request blocked by safety policy |
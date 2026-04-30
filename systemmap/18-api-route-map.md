# 18. API Route Map

## All Routes

### Agent Routes (`/api/agent/`)

| Route | Method | Handler | Real/Simulated | Notes |
|-------|--------|---------|----------------|-------|
| `/api/agent/parse` | POST | Agent parse | REAL | Parses intent via LLM or fallback |
| `/api/agent/plan` | POST | Agent plan | REAL | Generates plan + policy check |
| `/api/agent/policy-check` | POST | Policy check | REAL | Standalone policy evaluation |
| `/api/agent/explain` | POST | Agent explain | REAL | Explains intent in human-readable form |

**Request shape for parse/plan/explain**: `{ text: string }`

**Request shape for policy-check**: `{ intent: ParsedExecutionIntent }`

### Dashboard Routes

| Route | Method | Handler | Real/Simulated | Notes |
|-------|--------|---------|----------------|-------|
| `/api/dashboard` | GET | Dashboard data | REAL | Returns policies, audit, opportunities |

### Policy Routes

| Route | Method | Handler | Real/Simulated | Notes |
|-------|--------|---------|----------------|-------|
| `/api/policies` | GET | List policies | REAL | Returns all policies |
| `/api/policies` | POST | Create policy | REAL | Validates + inserts |
| `/api/policies/:id` | PUT | Update policy | REAL | Updates existing |
| `/api/policies/:id` | DELETE | Delete policy | REAL | Hard delete |

### Opportunity Routes

| Route | Method | Handler | Real/Simulated | Notes |
|-------|--------|---------|----------------|-------|
| `/api/opportunities` | GET | List opportunities | SEEDED | Returns seeded DB data |

### Audit Routes

| Route | Method | Handler | Real/Simulated | Notes |
|-------|--------|---------|----------------|-------|
| `/api/audit` | GET | List audit events | REAL | Supports `?limit=N&type=` |

### Demo Routes

| Route | Method | Handler | Real/Simulated | Notes |
|-------|--------|---------|----------------|-------|
| `/api/demo/reset` | POST | Reset demo state | REAL | Resets DB to initial seed |

### Health Route

| Route | Method | Handler | Real/Simulated | Notes |
|-------|--------|---------|----------------|-------|
| `/api/health` | GET | Health check | REAL | Returns `{ ok: true }` |

## Request/Response Shapes

### POST `/api/agent/parse`
```typescript
// Request
{ text: string }
// Response
{ intent: ParsedExecutionIntent, intentSummary: string }
```

### POST `/api/agent/plan`
```typescript
// Request
{ text: string }
// Response
{ plan: AgentPlanResponse, intentId: string, llmParseFallback: boolean }
```

### POST `/api/agent/explain`
```typescript
// Request
{ text: string }
// Response
{ explanation: AgentExplainResponse, intentId: string }
```

### POST `/api/agent/policy-check`
```typescript
// Request
{ intent: ParsedExecutionIntent }
// Response
{ evaluation: PolicyEvaluationResult }
```

### POST `/api/policies`
```typescript
// Request
{ type, name, enabled, priority?, value?, providerIds?, ... }
// Response
{ policy: Policy }
```

### PUT `/api/policies/:id`
```typescript
// Request
{ enabled?, value?, priority?, currentUsageMicroCC?, ... }
// Response
{ policy: Policy }
```

## Error Handling

- Invalid JSON → 400 Bad Request
- Missing required fields → 400 with validation message
- Not found → 404
- Internal errors → 500 with error message

## CORS

No CORS configuration — Next.js default behavior (same-origin only in production).

## Authentication

None. The app has no authentication layer. All API routes are publicly accessible. In production this is a significant gap.
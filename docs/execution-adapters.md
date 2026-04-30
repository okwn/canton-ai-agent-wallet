# Execution Adapters

## Concept

Execution adapters are a **strategy pattern** implementation that bridges opportunities and wallet state to actual execution paths. Every adapter is read-only safe — it never performs real on-chain transactions without verifying all prerequisites.

## Adapter Interface (`packages/agent-core/src/execution/adapter.ts`)

```typescript
interface ExecutionAdapter {
  name: string;
  supportLevel: 'REAL' | 'SIMULATED' | 'UNSUPPORTED';
  supportedActions: string[];
  supportedProviders: string[];

  supports(opp, wallet, intent?): { supported: boolean; reason: string };
  prepareExecution(intent, opp, wallet): PreparedExecution;
  estimateExecutionCost(prepared): { costMicroCC: number; explanation: string };
  execute(prepared): Promise<ExecutionResult>;
}
```

## Adapter Matrix

| Adapter | Support Level | Trigger Condition | On-Chain Effect |
|---|---|---|---|
| `DemoExecutionAdapter` | SIMULATED | Always available | None — pure simulation |
| `LoopSupportedExecutionAdapter` | REAL | `executionSupport === 'real'` AND wallet.isConnected AND NOT wallet.isDemo AND provider in supported list | Yes — via Loop SDK |
| `UnsupportedExecutionAdapter` | UNSUPPORTED | All other cases | None — always returns unsupported |

## Resolution Logic (`resolution.ts`)

```typescript
resolveAdapter(intent, opportunity, wallet):
  1. if opportunity.executionSupport === 'real'
       AND wallet.isConnected AND NOT wallet.isDemo
       AND LoopSupportedExecutionAdapter.supports() → true:
       → select LoopSupportedExecutionAdapter (REAL)
  2. else if opportunity.executionSupport === 'simulated' OR 'real':
       → select DemoExecutionAdapter (SIMULATED)
  3. else:
       → select UnsupportedExecutionAdapter (UNSUPPORTED)
```

## Supported Providers (Loop SDK)

Only these providers are eligible for `REAL` execution via Loop SDK: `froburn`, `lace`, `cantonswap`.

## No Fake On-Chain Execution Rule

`UnsupportedExecutionAdapter.execute()` **always** returns `status: 'UNSUPPORTED'` and never attempts any transaction. The `LoopSupportedExecutionAdapter.execute()` returns `status: 'PREPARED'` with a clear explanation that actual submission requires browser runtime integration.

## Return Shape

Every execution returns a machine-readable `ExecutionResult`:

```typescript
{
  id: string;
  preparedExecutionId: string;
  status: 'PREPARED' | 'EXECUTED' | 'SIMULATED' | 'BLOCKED' | 'UNSUPPORTED' | 'FAILED';
  outputMicroCC: number | null;
  feesPaidMicroCC: number | null;
  txHash: string | null;           // real hash for REAL, null for SIMULATED
  simulatedTxHash: string | null;  // sim hash for SIMULATED, null otherwise
  errorMessage: string | null;
  executedAt: string;
  durationMs: number;
  supportLevel: 'REAL' | 'SIMULATED' | 'UNSUPPORTED';
  explanation: string;  // human-readable description
}
```

## Files

```
packages/agent-core/src/execution/
  adapter.ts       — Interface + Zod schemas (SupportLevel, PreparedExecution, ExecutionResult)
  adapters.ts      — DemoExecutionAdapter, LoopSupportedExecutionAdapter, UnsupportedExecutionAdapter
  resolution.ts    — resolveAdapter(), executeWithAdapter()
  index.ts         — re-exports
```

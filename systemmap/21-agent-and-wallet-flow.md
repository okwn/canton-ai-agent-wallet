# 21. Agent and Wallet Flow

## Agent Flow (Full)

```
1. User Input
   "Find the cheapest yield up to 50 CC"
         │
2. Parse Intent (/api/agent/parse)
   • Extract action: yield
   • Extract amount: 50 CC
   • Extract constraints: lowest cost
         │
3. Evaluate Policies (/api/agent/policy-check)
   • MAX_PER_TRADE ✓ (50 ≤ 100)
   • DENYLIST ✓ (not blocked)
   • DAILY_LIMIT ✓ (under limit)
   • APPROVAL_THRESHOLD ✓ (under threshold)
         │
4. Generate Plan (/api/agent/plan)
   • Opportunity: StableYield
   • APR: 4.2%
   • Est. output: 2.1 CC
   • Fees: 0.05 CC
   • Risk: LOW
         │
5. User Approval
   [Approve] or [Reject]
         │
6. Execute (/api/agent/execute)
   • Re-verify policies
   • Simulate execution
   • Generate receipt
         │
7. Log Audit Event
   • eventType: EXECUTION_COMPLETED
   • simulated: true
   • timestamp
```

---

## Wallet Connect Flow

**Demo Mode (Default)**
```
/agent loads
         │
LoopClient.connect() called
         │
LOOP_CONFIG.enabled = false
         │
_simulateDemoConnect()
         │
Set state:
• status: 'connected'
• address: '0xDEMO_...'
• balance: 500M CC
• capabilities.canExecuteReal: false
```

**Live Mode (NEXT_PUBLIC_LOOP_ENABLED=true)**
```
User clicks "Connect Wallet"
         │
LoopClient.connect() called
         │
Check for window.loop (browser extension)
         │
If found: SDK.connect()
If not found: Show "Install Loop extension"
         │
On success:
• Get real address
• Fetch real balances
• Fetch gas estimates
```

---

## Demo Balance Behavior

- **Balance**: Hardcoded 500M CC (displayed as 500,000,000 microCC)
- **Daily Limit**: From MAX_DAILY policy (default 100M CC)
- **Usage**: Tracked per policy evaluation
- **Reset**: Demo reset button clears usage

---

## Wallet States

| State | Indicator | Can Execute |
|-------|----------|-------------|
| Disconnected | Gray badge | No |
| Demo Connected | DEMO badge | Simulated only |
| Live Connected | LIVE badge | Real transactions |

---

## Receipt Structure

```typescript
interface ExecutionReceipt {
  id: string;
  timestamp: string;
  intent: Intent;
  policiesEvaluated: PolicyResult[];
  decision: 'APPROVED' | 'REJECTED';
  simulated: true; // Always true in demo
  txHash?: string; // Fake hash: 0xDEMO_...
  estimatedFee: number; // In microCC
}
```

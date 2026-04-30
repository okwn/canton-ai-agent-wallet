# 22. Demo Balance Behavior

## Demo Wallet

| Property | Value | Notes |
|----------|-------|-------|
| Address | `0xDEMO_A1B2C3D4E5F6` | Fake address |
| Balance | 500,000,000 CC | 500M CC display |
| Network | demo | Not real blockchain |
| Signing | Disabled | Demo cannot sign |

---

## Balance Display

```
500,000,000 microCC → 500 CC → Displayed as "500,000,000 CC"
```

The UI displays in full microCC units for precision, but labels it "CC".

---

## Demo Top-Up

No top-up mechanism exists. Balance is fixed at 500M CC for demo purposes.

To test different balances, use the demo reset API or modify the seed data.

---

## Daily Limit Behavior

- Default MAX_DAILY policy: 100,000,000 microCC (100 CC)
- Usage accumulates from executions
- Progress bar shows usage vs limit
- When limit reached: Policy check fails with DAILY_LIMIT_EXCEEDED

---

## Resetting Demo State

```
POST /api/demo/reset

Response: { success: true, message: "Demo state reset" }

Resets:
• Policy usage counters to 0
• Audit events cleared
• Session state cleared
```

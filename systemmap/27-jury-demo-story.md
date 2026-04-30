# 27. Jury Demo Story

## The Narrative

Marcus is an AI wallet that follows your rules. Nothing runs without your approval, and policies are hard constraints enforced server-side.

---

## Recommended Demo Flow

### Phase 1: Land on Home (30 seconds)
1. Open browser to `/`
2. Point out the tagline: "An AI wallet that follows your rules"
3. Scroll briefly to show marketing content
4. Point out the DEMO badge in footer

**Say**: "This is Marcus. It's a demo — no real money, no real blockchain. But everything I'm about to show you works with real policy enforcement."

---

### Phase 2: Open the Terminal (1 minute)
1. Click "Open Agent Terminal"
2. Explain: "This is the public terminal. No login needed. Anyone can try it."
3. Point out the demo wallet: 500M CC, pre-connected

---

### Phase 3: Run a Command (2 minutes)
1. Click preset prompt: "Find the cheapest yield up to 50 CC"
2. Show the parsing: "Marcus extracted: action=yield, amount=50 CC"
3. Show the policy check: "MAX_PER_TRADE ✓, DENYLIST ✓, DAILY_LIMIT ✓"
4. Show the plan: "Found StableYield, APR 4.2%, Risk LOW"
5. Click "Approve"
6. Show the receipt: fake tx hash, simulated execution

**Say**: "Notice nothing happened yet. Marcus shows you the plan, explains the policy verdict, and waits for your approval. That's the safety-first design."

---

### Phase 4: Try Policy Blocking (1 minute)
1. Type: "Transfer 999 CC to 0x123..."
2. Show it gets blocked
3. Explain: "Policy engine caught it. MAX_PER_TRADE exceeded."

**Say**: "The policy engine is server-side. It runs on every request, even if you try to bypass the UI."

---

### Phase 5: Show Dashboard (Optional, 1 minute)
1. Click "Login" (or go to /login directly)
2. Use demo credentials: `demo@marcus.ai` / `demo123`
3. Show dashboard: wallet overview, policies, activity
4. Point out SIMULATED badges

**Say**: "Registered users get this dashboard. Policies persist. Activity is tracked. But it's still demo data."

---

## What to Emphasize

### DO Emphasize
- Policy engine is REAL server-side enforcement
- Audit trail is complete and real
- Policy CRUD works end-to-end
- The safety-first design philosophy
- Clear REAL/SIMULATED labeling

### DO NOT Claim
- Real blockchain transactions
- Live DeFi yields
- Production-ready auth
- Connected to Canton ledger
- Real wallet balance

---

## Demo Credentials

```
Email: demo@marcus.ai
Password: demo123
```

---

## Demo Limitations to State Upfront

1. "Policy engine is fully functional"
2. "Execution is simulated — no real blockchain"
3. "Opportunities are seeded demo data"
4. "Wallet balance is fake"

---

## If Asked About Real Wallet

**Q**: "Can you connect a real wallet?"

**A**: "The Loop SDK integration is not complete. Right now it only works in demo mode. The architecture supports real wallets, but we haven't connected the custody layer yet."

---

## If Asked About Production

**Q**: "Is this production ready?"

**A**: "The policy engine and agent logic are production-quality. But we need real auth, rate limiting, and wallet integration before production. The demo is safe to show because nothing real can happen."

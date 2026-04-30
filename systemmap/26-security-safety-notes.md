# 26. Security and Safety Notes

## Security

### What's Secure

| Aspect | Status | Notes |
|--------|--------|-------|
| Policy engine | ✅ Secure | Server-side enforcement |
| Input validation | ✅ Secure | Zod schemas validate all inputs |
| SQL injection | ✅ Secure | Parameterized queries |
| Auth middleware | ⚠️ Demo | Cookie-based, no hashing |

### What Needs Work

| Aspect | Risk | Fix |
|--------|------|-----|
| Password storage | Medium | bcrypt + salt |
| HTTPS cookie | Medium | Add Secure flag |
| CSRF protection | Medium | Add CSRF tokens |
| Rate limiting | High | Add rate limiter |
| Session refresh | Low | Implement sliding expiry |

---

## Safety (Policy Engine)

### Policy Enforcement is REAL

The policy engine is **server-side enforced**. This means:

1. Policies cannot be bypassed via UI manipulation
2. Even if a user inspects/alters the frontend, server validates
3. Policy checks run before any execution

### Policy Types

| Policy | Enforcement | Notes |
|--------|-------------|-------|
| DENYLIST | Block specific addresses/tokens | Real |
| MAX_PER_TRADE | Block trades over limit | Real |
| MAX_DAILY | Track usage, block when exceeded | Real |
| APPROVAL_THRESHOLD | Require approval over amount | Real |

### What Policies Don't Cover

- Flash loan attacks
- Oracle manipulation
- Smart contract vulnerabilities
- Front-running
- Slippage beyond limits (not implemented)

---

## Demo Safety

Since execution is simulated:
- **No real money at risk**
- **No real blockchain transactions**
- **Cannot lose funds in demo mode**

The demo is safe to show anyone.

---

## Production Considerations

Before production:

1. Add real authentication
2. Enable HTTPS
3. Add rate limiting
4. Implement CSRF protection
5. Add password hashing
6. Connect real wallet custody
7. Audit policy engine edge cases

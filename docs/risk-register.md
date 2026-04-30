# Canton AI Agent Wallet — Risk Register

## 1. Wallet Safety Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Unintended spend: user types high value by accident | MEDIUM | HIGH | Policy engine hard-blocks amounts above user cap; confirmation modal for approval threshold |
| Policy rules not loaded at startup | LOW | HIGH | PolicyEngine initializes from SQLite; defaults used if DB empty |
| Race condition: policy check passes but balance changes before execution | LOW | HIGH | Execution engine re-checks balance immediately before dispatch; fails gracefully if insufficient |
| Demo mode accidental exposure: user thinks they're on live network | LOW | MEDIUM | UI shows prominent "DEMO MODE" badge; no real wallet address displayed |
| Approval threshold bypass via re-phrasing | LOW | HIGH | Policy engine operates on structured Intent, not raw NL; re-phrasing doesn't change parsed amounts |

## 2. Prompt Injection / Tool Misuse Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User paste malicious content into command input | MEDIUM | MEDIUM | Input sanitized before parsing; no eval() or dynamic code execution |
| Clipboard paste injection | MEDIUM | MEDIUM | Same parsing + policy enforcement as typed text |
| Adversarial NL designed to confuse intent parser | MEDIUM | MEDIUM | Parser only extracts structured fields; cannot execute arbitrary commands from NL |
| Context window exhaustion (very long command history) | LOW | LOW | Command input is single-shot; no conversational memory in V1 |
| XSS via rawText display | LOW | MEDIUM | React escapes content by default; rawText displayed as text not HTML |

## 3. Budget Bypass Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User bypasses policy by editing SQLite directly | MEDIUM | MEDIUM | In-memory policy cache validated on each request; direct DB edits don't affect running session |
| Floating point math errors in amount comparison | LOW | MEDIUM | All amounts stored as integers (micro-CC); no floating point in financial math |
| Currency unit confusion (CC vs micro-CC) | LOW | HIGH | All internal amounts in micro-CC; display layer converts; intent parser normalizes to micro-CC |
| Daily limit reset timezone issue | LOW | LOW | Reset time is UTC midnight; documented in policy display |
| Approval threshold set to 0 | LOW | MEDIUM | Minimum approval threshold is 1 CC; cannot be disabled entirely |

## 4. Strategy Data Quality Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Whitelist contains deprecated/renamed strategies | MEDIUM | MEDIUM | StrategyRegistry stores protocol name; user must re-confirm on use |
| Mock market returns stale APY data | HIGH | LOW | MockMarketAdapter is clearly marked SIMULATED; data is static and timestamped |
| Strategy approved but protocol rug-pulled | LOW | HIGH | V1 only supports hardcoded "trusted" strategies in seed data |
| APY displayed as basis points but user expects percentage | LOW | MEDIUM | Display converts basis points to percentage; tooltip explains conversion |

## 5. Unsupported Transaction Path Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User requests a transaction type not in adapter map | MEDIUM | MEDIUM | ExecutionEngine throws on unknown action; user gets clear error message |
| Adapter not implemented for a valid intent action | MEDIUM | MEDIUM | Adapter registry checked at startup; missing adapters logged as warnings |
| Loop SDK version mismatch causing runtime errors | LOW | HIGH | SDK version pinned in package.json |
| Wallet disconnect mid-execution | LOW | HIGH | All async operations wrapped in try/catch; error displayed in UI |
| Database file locked or corrupted | LOW | MEDIUM | SQLite WAL mode; migrations are additive only; backups recommended for production |

## 6. Integration & Infrastructure Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| No internet connection | MEDIUM | LOW | UI degrades gracefully; demo mode works offline; error displayed for any network-dependent call |
| SQLite database quota exceeded | LOW | LOW | Audit log trimmed to last 1000 entries; old entries archived automatically |
| TypeScript compilation errors on fresh clone | LOW | MEDIUM | Verified build process; CI checks typecheck |
| React re-render loop from state updates | LOW | MEDIUM | State updates are batched; useCallback/useMemo used appropriately |
| Memory leak from unbounded event listeners | LOW | MEDIUM | All event listeners cleaned up in useEffect return functions |

## 7. Risk Summary

```
HIGH Impact Risks:
  - Unintended spend by accident (mitigated by policy engine + confirmation modal)
  - Currency unit confusion (mitigated by micro-CC normalization)
  - Adapter not implemented (mitigated by clear error messages)

MEDIUM Likelihood + HIGH Impact:
  - User edits SQLite directly (mitigated by in-memory validation)
  - Clipboard paste injection (mitigated by input sanitization)

Top 3 to Monitor During Demo:
1. Policy engine blocking/allowing correctly for edge-case amounts
2. Intent parser handling unexpected phrasing gracefully
3. SQLite write failures handling
```

## 8. Risk Status Definitions

- **Likelihood**: LOW / MEDIUM / HIGH
- **Impact**: LOW / MEDIUM / HIGH
- **Mitigation**: MITIGATED (control in place) / PARTIAL (some exposure) / OPEN (no control yet)

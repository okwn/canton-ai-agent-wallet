# Troubleshooting

## App won't start

**Symptom:** `pnpm dev` fails with a module resolution error.

```
Module not found: Can't resolve '@canton/...'
```

**Fix:**
```bash
pnpm build
```

The workspace packages must be built before `next dev` can resolve them.

---

## DB not initialized

**Symptom:** Pages show "Failed to load" or API routes return 500.

```
[opportunities GET] TypeError: Cannot set properties of undefined
```

**Fix:**
```bash
curl -X POST http://localhost:3000/api/demo/reset
```

Or delete `apps/web/data/wallet.db` and restart — the DB is created on first startup.

---

## Build failures

**Symptom:** `pnpm build` fails with TypeScript errors or SWC errors.

### `cannot find module '@canton/shared'` or `'@canton/agent-core'`
The workspace packages haven't been built. Run `pnpm build` from the root.

### `Syntax Error: Unexpected token 'div'` in a page file
Usually caused by a JSX ternary inside a return statement where SWC misinterprets the structure. Fix by replacing `condition ? (...) : (...)` with `condition && (...)` or by extracting to a named variable.

### `z.record()` requires 2 arguments
You are using Zod v4 which requires `z.record(z.string(), z.unknown())` instead of `z.record()`.

### `uuid` validation failing in tests
Test IDs must use valid UUID format: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` (e.g., `00000000-0000-4000-8000-000000000001`).

---

## No wallet connected (Loop integration disabled)

**Symptom:** Wallet shows "Disconnected" or all execution paths show SIMULATED.

**Cause:** `NEXT_PUBLIC_LOOP_ENABLED` is not set, or the Loop SDK is not available in the browser.

**Fix:**
1. Set `NEXT_PUBLIC_LOOP_ENABLED=true` in your environment
2. Ensure the Loop SDK browser bundle is available
3. In the UI, click "Connect Wallet" in the sidebar

**Note:** Without a connected live wallet, all executions fall back to `DemoExecutionAdapter` (SIMULATED). This is the correct and expected behavior.

---

## Loop integration disabled

**Symptom:** Execution always shows SIMULATED even with a connected wallet.

**Cause:** The environment variable `NEXT_PUBLIC_LOOP_ENABLED` is `false` (the default).

**Fix:** Set `NEXT_PUBLIC_LOOP_ENABLED=true` and restart the dev server.

If Loop is enabled but the wallet still shows SIMULATED, check the Opportunities page — only `froburn`, `lace`, and `cantonswap` providers support real execution via Loop SDK.

---

## Malformed model output (LLM)

**Symptom:** Agent plan returns an error or shows "LLM parse failed" fallback notice.

**Cause:** LLM output didn't match the expected JSON schema.

**Fix:**
1. The parser has a rule-based fallback — it will still produce a result using keyword matching
2. Check the fallback notice at the top of the agent response — if it says "LLM not configured", set `LLM_API_KEY`
3. If using a custom LLM provider, verify `LLM_BASE_URL` and `LLM_MODEL` are correct
4. Check server logs for the raw LLM response to see what went wrong

**Debug:**
```bash
# Check what the LLM provider is
echo $LLM_API_KEY  # should be set
echo $LLM_BASE_URL # e.g., http://localhost:8080 for LM Studio
```

---

## Unsupported execution paths

**Symptom:** Opportunity shows UNSUPPORTED badge and execution always fails.

**Cause:** The provider is not in the Loop SDK supported list (`froburn`, `lace`, `cantonswap`) AND the opportunity's `executionSupport` is not `simulated`.

**Resolution matrix:**

| Provider | executionSupport | Wallet | Result |
|---|---|---|---|
| froburn/lace/cantonswap | real | connected | REAL |
| any | simulated | any | SIMULATED |
| other | real | disconnected/demo | SIMULATED |
| other | real | connected | UNSUPPORTED |

**Fix:** The `UnsupportedExecutionAdapter` correctly returns UNSUPPORTED. This is intentional — the system honestly reports when it cannot execute. No workaround is provided that would fake execution.

---

## Policy not being enforced

**Symptom:** A command that should be blocked runs anyway.

**Check:**
1. Is the policy enabled? (Policies page shows ACTIVE/DISABLED badge)
2. Is the policy priority correct? (lower number = higher priority)
3. Is the policy value correct? (e.g., MAX_PER_TRADE is in micro-CC: 20 CC = 20000000)
4. Check the policy engine logs in the agent response — passed/failed checks are listed

**Debug:** Go to `/agent`, enter the command, and look at the "Policy Verdict" section.

---

## Daily limit exhausted

**Symptom:** All executions blocked with "daily limit exceeded" or similar.

**Fix:** Click "Reset Demo Data" in the top banner, or:
```bash
curl -X POST http://localhost:3000/api/demo/reset
```

This resets the daily usage counter to 0.

---

## sql.js native binary issues

**Symptom:** Build fails or runtime errors related to `sql.js`.

**Cause:** sql.js is a pure JavaScript SQLite implementation. It should work without any native binaries. If you see errors about `.node` files, you may have accidentally installed `better-sqlite3` which requires native compilation.

**Fix:**
```bash
# Remove any native sqlite dependency
pnpm remove better-sqlite3
pnpm install
```

sql.js is already a dependency and works on all platforms without compilation.

---

## Tests failing

**Symptom:** `pnpm test` or `pnpm --filter @canton/agent-core test` fails.

### "cannot find module" in tests
Run `pnpm build` first to compile the workspace packages.

### SQL errors in smoke tests
The test DB path may conflict. Set it explicitly:
```bash
TEST_DB_PATH=./data/wallet-test.db pnpm --filter @canton/web test
```

### Agent-core tests failing due to policy evaluation
Tests use specific UUID fixtures. If a test fails with "invalid UUID", the fixture IDs may have been changed. The correct format is `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.

---

## Need to start fresh

To reset everything to a clean demo state:

```bash
# 1. Delete the database
rm -rf apps/web/data/wallet.db

# 2. Reset the demo data API
curl -X POST http://localhost:3000/api/demo/reset

# 3. Verify health
curl http://localhost:3000/api/health
```

---

## Getting Help

If you hit an error not covered here:

1. Check the API route error logs in the terminal
2. Check `apps/web/data/wallet.db` exists and is non-empty
3. Run `pnpm typecheck` to verify TypeScript correctness
4. Run `pnpm build` to verify the full build succeeds

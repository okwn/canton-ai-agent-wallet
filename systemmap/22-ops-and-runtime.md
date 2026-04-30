# 22. Ops and Runtime

## Environment Variables

### Required for Full Functionality

| Variable | Example | Purpose | Default |
|---------|---------|---------|---------|
| `OPENAI_API_KEY` | `sk-...` | LLM intent parsing | Not set (fallback used) |
| `NEXT_PUBLIC_LOOP_ENABLED` | `true` | Enable Loop execution path | `false` |
| `DATABASE_URL` | `./.data/canton.db` | SQLite file path | `./.data/canton.db` |

### Optional / Development

| Variable | Example | Purpose |
|---------|---------|---------|
| `NODE_ENV` | `development` | Dev mode (extra logging) |
| `LOG_LEVEL` | `debug` | Logging verbosity |
| `LLM_BASE_URL` | `https://api.openai.com/v1` | OpenAI-compatible endpoint |
| `LLM_MODEL` | `gpt-4o` | Model to use |

### .env.example Reference

The project has a `.env.example` with:
```
OPENAI_API_KEY=your_key_here
NEXT_PUBLIC_LOOP_ENABLED=false
```

## Local Services

### Startup Requirements

1. **Node.js process** — next dev or next start
2. **SQLite database** — auto-created at `.data/canton.db`
3. **No external services required** — all dependencies embedded

### Optional Services (not wired)

- Daml ledger (JSON API) — not connected
- Ethereum RPC node — not connected
- DeFi protocol APIs — not connected

## Database Initialization

On first run (or after reset):
1. `better-sqlite3` opens/creates `.data/canton.db`
2. `createTables()` runs CREATE TABLE IF NOT EXISTS
3. `seedOpportunities()` inserts 10 seeded records
4. No default policies — user must create

## Startup Sequence

```
next dev server starts
  → app/api/** routes register
  → lib/db.ts → createTables()
  → lib/db.ts → seedOpportunities()
  → Ready to serve requests
```

## Running Locally

```bash
# Install dependencies
pnpm install

# Copy env
cp .env.example .env.local
# Edit .env.local with OPENAI_API_KEY

# Run dev server
pnpm dev

# Run tests
pnpm test

# Run e2e
pnpm exec playwright test
```

## Database Location

- Path: `.data/canton.db` (gitignored via `.gitignore`)
- Backup: No automatic backup; manual copy required

## Reset Procedure

```bash
# Call demo reset endpoint
curl -X POST http://localhost:3000/api/demo/reset

# Or delete the DB file
rm .data/canton.db && pnpm dev
```

## Production Deployment Notes

- **SQLite limitation**: Not suitable for multi-instance deployment (single writer)
- **Recommended**: PostgreSQL for production with Prisma or Drizzle ORM
- **Session state**: No session store; add Redis or DB-backed sessions
- **Static file serving**: Next.js handles; deploy to Vercel/Cloudflare Pages
- **Environment**: Ensure `NODE_ENV=production` for minification

## Known Operational Issues

1. **No health check for DB**: `/api/health` returns `{ ok: true }` but doesn't verify DB connection
2. **No graceful shutdown**: Server doesn't drain connections on SIGTERM
3. **No background jobs**: Policy usage reset relies on request-time check (not a cron)
4. **Seeding on every import**: `seedOpportunities()` is idempotent but still runs on every server start
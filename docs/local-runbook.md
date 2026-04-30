# Local Runbook

## Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8
- Port 3000 available

## Setup

```bash
# Install dependencies
pnpm install

# Build all packages (shared, agent-core, then web)
pnpm build

# Start the dev server
pnpm dev
```

The app runs at **http://localhost:3000**.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_ENV` | `development` | Set to `production` for production deployment |
| `NEXT_PUBLIC_LOOP_ENABLED` | `false` | Set to `true` to enable live Loop wallet integration |
| `LLM_API_KEY` | _(none)_ | OpenAI API key for LLM-powered intent parsing |
| `LLM_BASE_URL` | _(none)_ | OpenAI-compatible base URL (e.g., for LM Studio or proxy) |
| `LLM_MODEL` | _(none)_ | Model name (e.g., `gpt-4o-mini`). Defaults to rule-based parsing if not set |

## Database

Data is stored in `apps/web/data/wallet.db` (SQLite via sql.js). The file is created automatically on first startup.

**To reset the database:**
```bash
# Option 1: via the UI — click "Reset Demo Data" in the top banner
# Option 2: via the API
curl -X POST http://localhost:3000/api/demo/reset
# Option 3: delete the file
rm apps/web/data/wallet.db
```

## Demo Mode

Demo mode is **always on** by default. The app runs without any external services.

- Wallet is always a demo wallet (500 CC, 250 USDC)
- Market data is seeded (not live DeFi)
- AI parsing falls back to rule-based if `LLM_API_KEY` is not set
- The demo banner is always visible in the sidebar

## Starting a Real Wallet (Optional)

To connect a real Loop wallet:

1. Set `NEXT_PUBLIC_LOOP_ENABLED=true` in your environment
2. Ensure the Loop SDK is available in the browser
3. Click "Connect Wallet" in the sidebar
4. A real Loop wallet connection flow will be initiated

## Starting the Daml Integration (Optional)

```bash
cd daml/agent-wallet
daml start
# In another terminal:
daml script --dar .daml/dist/agent-wallet-0.1.0.dar \
  --script-name Setup:testAgentWalletFlow \
  --ledger-host localhost --ledger-port 6865
```

## Scripts

```bash
pnpm dev          # Start all packages in dev mode
pnpm build        # Build all packages
pnpm typecheck    # Type-check all packages
pnpm test         # Run smoke tests
pnpm --filter @canton/agent-core test  # Run agent-core unit tests
```

## Ports

| Service | Port |
|---|---|
| Web app (Next.js) | 3000 |
| Daml ledger | 6865 |
| Daml JSON API | 4000 |

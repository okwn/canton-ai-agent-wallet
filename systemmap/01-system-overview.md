# System Overview

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Components**: Custom shadcn/ui-style components
- **Icons**: Lucide React
- **Fonts**: Geist Sans/Mono (pending redesign to Camera Plain Variable)

### Backend
- **Runtime**: Node.js
- **API**: Next.js Route Handlers
- **Database**: SQLite via better-sqlite3 (demo mode)
- **Agent Service**: Custom NLP parsing + policy engine

### Architecture
```
apps/web/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── (main)/                  # Authenticated routes (with sidebar)
│   │   ├── layout.tsx          # Sidebar + mobile header
│   │   ├── dashboard/page.tsx  # Dashboard
│   │   ├── agent/page.tsx      # Agent terminal
│   │   ├── policies/page.tsx   # Policy management
│   │   ├── opportunities/      # Yield opportunities
│   │   ├── activity/           # Audit log
│   │   └── wallet/             # Wallet details
│   └── api/                    # API routes
│       ├── agent/              # Agent endpoints (plan, parse, explain)
│       ├── dashboard/           # Dashboard data
│       ├── policies/           # Policy CRUD
│       ├── opportunities/      # Opportunity data
│       ├── audit/              # Audit log
│       └── demo/               # Demo reset
├── components/
│   ├── ui/                     # Base components (Button, Card, Badge)
│   ├── wallet/                 # Wallet-specific components
│   └── demo/                   # Demo banner
├── lib/
│   ├── agent-service.ts        # Agent orchestration
│   ├── db.ts                   # Database access
│   ├── policies.ts             # Policy engine
│   └── utils.ts               # Utilities
└── hooks/                      # Custom React hooks
```

## Key Services

### Agent Service (`lib/agent-service.ts`)
Orchestrates the intent parsing, policy checking, and plan generation.

### Policy Engine (`lib/policies.ts`)
Evaluates actions against configured rules:
- MAX_PER_TRADE: Maximum amount per transaction
- MAX_DAILY: Daily spending limit
- DENYLIST: Blocked addresses/contracts
- APPROVAL_THRESHOLD: Require approval above this amount

### Database (`lib/db.ts`)
SQLite database storing:
- Policies
- Audit events
- Opportunities (seeded)
- Session state

## Data Flow

1. User enters natural language command in Agent terminal
2. API `/api/agent/parse` extracts intent (LLM or rule-based)
3. API `/api/agent/policy-check` validates against policies
4. API `/api/agent/plan` generates execution plan
5. User approves plan
6. Execution logged to audit trail
7. Dashboard and Activity reflect state changes

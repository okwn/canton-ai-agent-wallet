// SQLite database using sql.js (pure JavaScript, no native compilation)
import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';

let db: SqlJsDatabase | null = null;
let initPromise: Promise<SqlJsDatabase> | null = null;

const DB_PATH = process.env.TEST_DB_PATH
  ?? path.join(process.cwd(), 'data', 'wallet.db');

// ─── sql.js locateFile ──────────────────────────────────────────────────────
// In Node.js (Next.js server), sql.js needs an explicit wasm path.
// We resolve it from the project root node_modules, not from the bundled path.
function getSqlJsConfig() {
  if (typeof window === 'undefined' && typeof process !== 'undefined') {
    // Use a fixed path from project root — works because the wasm file is in a stable pnpm location
    return {
      locateFile: () => {
        return 'C:/Users/ogzka/Desktop/Canton_AI_Agent_Wallet/node_modules/.pnpm/sql.js@1.14.1/node_modules/sql.js/dist/sql-wasm.wasm';
      },
    };
  }
  return {};
}

// Cast initSqlJs to accept config (the type definitions are incomplete)
const initSqlJsWithConfig = initSqlJs as (
  config?: { locateFile?: (file: string) => string }
) => Promise<{ Database: new (data?: ArrayLike<number>) => SqlJsDatabase }>;

// ─── Schema ─────────────────────────────────────────────────────────────────

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS policies (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    value TEXT,
    enabled INTEGER NOT NULL DEFAULT 1,
    priority INTEGER NOT NULL DEFAULT 99,
    current_usage_micro_cc INTEGER NOT NULL DEFAULT 0,
    window_start TEXT,
    provider_ids TEXT,
    asset_symbols TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    wallet_address TEXT,
    intent_id TEXT,
    attempt_id TEXT,
    policy_id TEXT,
    payload TEXT NOT NULL,
    simulated INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS execution_attempts (
    id TEXT PRIMARY KEY,
    intent_id TEXT NOT NULL,
    plan_id TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING',
    steps_completed INTEGER NOT NULL DEFAULT 0,
    steps_total INTEGER NOT NULL DEFAULT 0,
    current_step_id TEXT,
    started_at TEXT,
    completed_at TEXT,
    error TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS opportunities (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    provider_name TEXT NOT NULL,
    strategy_name TEXT NOT NULL,
    asset_in TEXT NOT NULL,
    asset_out TEXT NOT NULL,
    apr_bps INTEGER NOT NULL,
    fees_bps INTEGER NOT NULL DEFAULT 0,
    liquidity_micro_cc INTEGER NOT NULL DEFAULT 0,
    risk_score INTEGER NOT NULL DEFAULT 50,
    risk_level TEXT NOT NULL DEFAULT 'MEDIUM',
    min_amount_micro_cc INTEGER NOT NULL DEFAULT 0,
    estimated_execution_cost_micro_cc INTEGER NOT NULL DEFAULT 0,
    slippage_tolerance_bps INTEGER NOT NULL DEFAULT 50,
    execution_support TEXT NOT NULL DEFAULT 'simulated',
    is_whitelisted INTEGER NOT NULL DEFAULT 1,
    added_at TEXT NOT NULL,
    expires_at TEXT
  );

  CREATE TABLE IF NOT EXISTS wallet_state (
    key TEXT PRIMARY KEY,
    address TEXT,
    is_connected INTEGER NOT NULL DEFAULT 0,
    is_demo INTEGER NOT NULL DEFAULT 1,
    balances TEXT NOT NULL DEFAULT '[]',
    last_synced_at TEXT
  );
`;

// ─── Init ────────────────────────────────────────────────────────────────────

async function getDb(): Promise<SqlJsDatabase> {
  if (db) return db;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const SQL = await initSqlJsWithConfig(getSqlJsConfig());

    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    if (fs.existsSync(DB_PATH)) {
      const fileBuffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(fileBuffer);
    } else {
      db = new SQL.Database();
    }

    db.run(SCHEMA);

    // Seed default data
    await seedDefaultData(db);

    persist();
    return db;
  })();

  return initPromise;
}

function safeJsonParse(val: string | null): unknown[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

function persist() {
  if (db) {
    const data = db.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  }
}

// ─── Reset demo data ─────────────────────────────────────────────────────────

export async function resetDemoData(): Promise<void> {
  const database = await getDb();

  // Clear all runtime data, keep schema
  database.run('DELETE FROM audit_events');
  database.run('DELETE FROM execution_attempts');

  // Reset policy usage counters
  const resetNow = new Date().toISOString();
  database.run('UPDATE policies SET current_usage_micro_cc = 0, window_start = NULL');
  database.run("UPDATE wallet_state SET balances = '[{\"asset\":\"CC\",\"available\":500000000,\"locked\":0,\"total\":500000000},{\"asset\":\"USDC\",\"available\":250000000,\"locked\":0,\"total\":250000000}]', last_synced_at = ?", [resetNow]);

  // Re-seed audit events
  const insertEvent = database.prepare(
    'INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );
  const demoEvents = [
    ['evt-r1', 'WALLET_CONNECTED', '0xDEMO00000000000000000000000000000001', null, null, null,
     JSON.stringify({ address: '0xDEMO00000000000000000000000000000001', isDemo: true }),
     1, new Date(Date.now() - 1000 * 60 * 30).toISOString()],
    ['evt-r2', 'POLICY_EVALUATED', '0xDEMO00000000000000000000000000000001', null, null, null,
     JSON.stringify({ decision: 'APPROVED', passedChecks: ['max_per_trade', 'max_daily', 'allowlist', 'simulation_mode'] }),
     1, new Date(Date.now() - 1000 * 60 * 28).toISOString()],
    ['evt-r3', 'INTENT_PARSED', '0xDEMO00000000000000000000000000000001', 'intent-reset-001', null, null,
     JSON.stringify({ rawText: 'Find the cheapest yield up to 50 CC', action: 'FIND_YIELD', confidence: 0.95, simulationOnly: false }),
     1, new Date(Date.now() - 1000 * 60 * 25).toISOString()],
    ['evt-r4', 'EXECUTION_COMPLETED', '0xDEMO00000000000000000000000000000001', 'intent-reset-001', 'attempt-reset-001', null,
     JSON.stringify({
       receipt: {
         status: 'SIMULATED', totalOutputMicroCC: 501234, totalFeesPaidMicroCC: 5000,
         policyDecision: 'APPROVED', simulationOnly: true,
       }
     }),
     1, new Date(Date.now() - 1000 * 60 * 23).toISOString()],
  ];
  for (const e of demoEvents) {
    insertEvent.run([...e as unknown as (string | number | null)[]]);
  }
  insertEvent.free();

  persist();
}

// ─── Seed ───────────────────────────────────────────────────────────────────

async function seedDefaultData(database: SqlJsDatabase) {
  // Policies
  const existingPolicies = database.exec('SELECT COUNT(*) FROM policies');
  if (!existingPolicies[0] || existingPolicies[0].values[0][0] === 0) {
    const insertPolicy = database.prepare(
      'INSERT INTO policies (id, type, name, value, enabled, priority, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );

    const now = new Date().toISOString();
    const defaultPolicies = [
      ['pol-max-trade', 'MAX_PER_TRADE', 'Max Per Trade', '20000000', 1, 1, now, now],
      ['pol-daily', 'MAX_DAILY', 'Max Daily Spend', '100000000', 1, 2, now, now],
      ['pol-approval', 'APPROVAL_THRESHOLD', 'Approval Threshold', '10000000', 1, 3, now, now],
      ['pol-denylist', 'STRATEGY_DENYLIST', 'Strategy Denylist', null, 1, 4, now, now],
      ['pol-allowlist', 'STRATEGY_ALLOWLIST', 'Strategy Allowlist', null, 1, 5, now, now],
      ['pol-assets', 'ASSET_ALLOWLIST', 'Asset Allowlist', null, 0, 6, now, now],
      ['pol-slippage', 'MAX_SLIPPAGE', 'Max Slippage', '100', 1, 7, now, now],
      ['pol-sim-only', 'SIMULATION_ONLY', 'Simulation Only', null, 0, 8, now, now],
      ['pol-exec-mode', 'EXECUTION_MODE', 'Execution Mode', 'approval_required', 1, 0, now, now],
    ];

    for (const p of defaultPolicies) {
      insertPolicy.run([...p as unknown as (string | number | null)[]]);
    }
    insertPolicy.free();
  }

  // Opportunities
  const existingOpps = database.exec('SELECT COUNT(*) FROM opportunities');
  if (!existingOpps[0] || existingOpps[0].values[0][0] === 0) {
    const insertOpp = database.prepare(
      `INSERT INTO opportunities (id, provider, provider_name, strategy_name, asset_in, asset_out,
       apr_bps, fees_bps, liquidity_micro_cc, risk_score, risk_level, min_amount_micro_cc,
       estimated_execution_cost_micro_cc, slippage_tolerance_bps, execution_support, is_whitelisted, added_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    const now = new Date().toISOString();
    const seedOpportunities = [
      // id, provider, provider_name, strategy_name, asset_in, asset_out, apr_bps, fees_bps, liquidity, risk_score, risk_level, min_amount, exec_cost, slippage, support, whitelisted, added_at
      ['opp-fro-y1', 'froburn', 'Froburn Protocol', 'Stable Yield Vault', 'CC', 'fCC', 420, 15, 1_250_000_000, 15, 'LOW', 1_000_000, 5000, 30, 'real', 1, now],
      ['opp-fro-y2', 'froburn', 'Froburn Protocol', 'High Yield Bridge', 'CC', 'fCC', 685, 25, 750_000_000, 35, 'MEDIUM', 5_000_000, 8000, 50, 'simulated', 1, now],
      ['opp-lace-1', 'lace', 'Lace Finance', 'Lending Pool A', 'CC', 'lCC', 285, 12, 890_000_000, 28, 'MEDIUM', 2_000_000, 3500, 40, 'real', 1, now],
      ['opp-lace-2', 'lace', 'Lace Finance', 'Leveraged Yield', 'CC', 'lCC', 540, 35, 420_000_000, 58, 'HIGH', 10_000_000, 12000, 80, 'simulated', 0, now],
      ['opp-cswap-1', 'cantonswap', 'CantonSwap', 'CC-USDC LP', 'CC', 'USDC', 180, 8, 2_100_000_000, 12, 'LOW', 500_000, 2000, 20, 'real', 1, now],
      ['opp-cswap-2', 'cantonswap', 'CantonSwap', 'Alt Trade', 'CC', 'USDC', 95, 6, 3_400_000_000, 8, 'LOW', 100_000, 1500, 15, 'unsupported', 1, now],
      ['opp-fro-d1', 'fro-demo', 'Froburn (Demo)', 'Testnet Yield', 'CC', 'fCC', 720, 20, 50_000_000, 20, 'LOW', 0, 0, 50, 'simulated', 1, now],
    ];

    for (const o of seedOpportunities) {
      insertOpp.run([...o as unknown as (string | number | null | undefined)[]]);
    }
    insertOpp.free();
  }

  // Wallet state
  const existingWallet = database.exec("SELECT COUNT(*) FROM wallet_state WHERE key = 'default'");
  const wsNow = new Date().toISOString();
  if (!existingWallet[0] || existingWallet[0].values[0][0] === 0) {
    database.run(
      "INSERT INTO wallet_state (key, address, is_connected, is_demo, balances, last_synced_at) VALUES ('default', '0xDEMO00000000000000000000000000000001', 1, 1, '[{\"asset\":\"CC\",\"available\":500000000,\"locked\":0,\"total\":500000000},{\"asset\":\"USDC\",\"available\":250000000,\"locked\":0,\"total\":250000000}]', ?)",
      [wsNow]
    );
  }

  // Seed demo audit events (only if no events exist)
  const existingEvents = database.exec('SELECT COUNT(*) FROM audit_events');
  if (!existingEvents[0] || existingEvents[0].values[0][0] === 0) {
    const insertEvent = database.prepare(
      'INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    const demoEvents = [
      // Wallet connected event
      ['evt-0001', 'WALLET_CONNECTED', '0xDEMO00000000000000000000000000000001', null, null, null,
       JSON.stringify({ address: '0xDEMO00000000000000000000000000000001', isDemo: true }),
       1, new Date(Date.now() - 1000 * 60 * 30).toISOString()],
      // Policy loaded
      ['evt-0002', 'POLICY_EVALUATED', '0xDEMO00000000000000000000000000000001', null, null, null,
       JSON.stringify({ decision: 'APPROVED', passedChecks: ['max_per_trade', 'max_daily', 'allowlist', 'simulation_mode'] }),
       1, new Date(Date.now() - 1000 * 60 * 28).toISOString()],
      // Intent parsed (yield search)
      ['evt-0003', 'INTENT_PARSED', '0xDEMO00000000000000000000000000000001', 'intent-demo-001', null, null,
       JSON.stringify({ rawText: 'Find the cheapest yield up to 50 CC', action: 'FIND_YIELD', confidence: 0.95, simulationOnly: false }),
       1, new Date(Date.now() - 1000 * 60 * 25).toISOString()],
      // Policy approved the yield search
      ['evt-0004', 'POLICY_EVALUATED', '0xDEMO00000000000000000000000000000001', 'intent-demo-001', null, null,
       JSON.stringify({ decision: 'APPROVED', passedChecks: ['max_per_trade', 'max_daily', 'denylist', 'slippage'] }),
       1, new Date(Date.now() - 1000 * 60 * 24).toISOString()],
      // Execution completed (simulated)
      ['evt-0005', 'EXECUTION_COMPLETED', '0xDEMO00000000000000000000000000000001', 'intent-demo-001', 'attempt-demo-001', null,
       JSON.stringify({
         receipt: {
           status: 'SIMULATED', totalOutputMicroCC: 501234, totalFeesPaidMicroCC: 5000,
           policyDecision: 'APPROVED', simulationOnly: true,
         }
       }),
       1, new Date(Date.now() - 1000 * 60 * 23).toISOString()],
      // Another intent (blocked by policy)
      ['evt-0006', 'INTENT_PARSED', '0xDEMO00000000000000000000000000000001', 'intent-demo-002', null, null,
       JSON.stringify({ rawText: 'Move 500 CC to lace finance', action: 'EXECUTE_STRATEGY', confidence: 0.88, simulationOnly: false }),
       1, new Date(Date.now() - 1000 * 60 * 10).toISOString()],
      // Blocked by denylist policy
      ['evt-0007', 'EXECUTION_REJECTED', '0xDEMO00000000000000000000000000000001', 'intent-demo-002', 'attempt-demo-002', null,
       JSON.stringify({
         receipt: {
           status: 'BLOCKED', totalOutputMicroCC: null, totalFeesPaidMicroCC: null,
           policyDecision: 'DENIED', blockedByPolicy: 'Strategy Denylist', simulationOnly: false,
         }
       }),
       1, new Date(Date.now() - 1000 * 60 * 9).toISOString()],
    ];
    for (const e of demoEvents) {
      insertEvent.run([...e as unknown as (string | number | null)[]]);
    }
    insertEvent.free();
  }
}

// ─── Query helpers ───────────────────────────────────────────────────────────

export async function queryPolicies(): Promise<Record<string, unknown>[]> {
  const database = await getDb();
  const result = database.exec('SELECT * FROM policies ORDER BY priority');
  if (!result[0]) return [];
  return result[0].values.map((row) => ({
    id: row[0],
    type: row[1],
    name: row[2],
    value: row[3],
    enabled: row[4] === 1,
    priority: row[5],
    currentUsageMicroCC: row[6] ?? 0,
    windowStart: row[7],
    providerIds: safeJsonParse(row[8] as string | null),
    assetSymbols: safeJsonParse(row[9] as string | null),
  }));
}

export async function queryPolicyById(id: string): Promise<Record<string, unknown> | null> {
  const database = await getDb();
  // sql.js Statement.bind() exists at runtime but TS types don't expose it
  const stmt = database.prepare('SELECT * FROM policies WHERE id = ?') as unknown as { bind: (params: unknown[]) => void; step: () => boolean; get: () => unknown[]; free: () => void };
  stmt.bind([id]);
  if (!stmt.step()) { stmt.free(); return null; }
  const row = stmt.get();
  stmt.free();
  return {
    id: row[0],
    type: row[1],
    name: row[2],
    value: row[3],
    enabled: row[4] === 1,
    priority: row[5],
    currentUsageMicroCC: row[6] ?? 0,
    windowStart: row[7],
    providerIds: safeJsonParse(row[8] as string | null),
    assetSymbols: safeJsonParse(row[9] as string | null),
  };
}

export async function updatePolicy(
  id: string,
  updates: {
    value?: string;
    enabled?: boolean;
    providerIds?: string[];
    assetSymbols?: string[];
    currentUsageMicroCC?: number;
    windowStart?: string;
  }
): Promise<void> {
  const database = await getDb();
  const fields: string[] = ['updated_at = datetime(\'now\')'];
  const values: (string | number | null)[] = [];

  if (updates.value !== undefined) {
    fields.push('value = ?');
    values.push(updates.value);
  }
  if (updates.enabled !== undefined) {
    fields.push('enabled = ?');
    values.push(updates.enabled ? 1 : 0);
  }
  if (updates.providerIds !== undefined) {
    fields.push('provider_ids = ?');
    values.push(JSON.stringify(updates.providerIds));
  }
  if (updates.assetSymbols !== undefined) {
    fields.push('asset_symbols = ?');
    values.push(JSON.stringify(updates.assetSymbols));
  }
  if (updates.currentUsageMicroCC !== undefined) {
    fields.push('current_usage_micro_cc = ?');
    values.push(updates.currentUsageMicroCC);
  }
  if (updates.windowStart !== undefined) {
    fields.push('window_start = ?');
    values.push(updates.windowStart);
  }

  values.push(id);
  database.run(`UPDATE policies SET ${fields.join(', ')} WHERE id = ?`, values);
  persist();
}

export async function queryAuditEvents(limit = 100): Promise<Record<string, unknown>[]> {
  const database = await getDb();
  const result = database.exec(
    `SELECT * FROM audit_events ORDER BY created_at DESC LIMIT ${limit}`
  );
  if (!result[0]) return [];
  return result[0].values.map((row) => ({
    id: row[0],
    eventType: row[1],
    walletAddress: row[2],
    intentId: row[3],
    attemptId: row[4],
    policyId: row[5],
    payload: JSON.parse(row[6] as string),
    simulated: row[7] === 1,
    createdAt: row[8],
  }));
}

export async function insertAuditEvent(event: {
  id: string;
  eventType: string;
  walletAddress?: string | null;
  intentId?: string | null;
  attemptId?: string | null;
  policyId?: string | null;
  payload: Record<string, unknown>;
  simulated: boolean;
}): Promise<void> {
  const database = await getDb();
  const now = new Date().toISOString();
  database.run(
    `INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      event.id,
      event.eventType,
      event.walletAddress ?? null,
      event.intentId ?? null,
      event.attemptId ?? null,
      event.policyId ?? null,
      JSON.stringify(event.payload),
      event.simulated ? 1 : 0,
      now,
    ]
  );
  persist();
}

export async function queryOpportunities(): Promise<Record<string, unknown>[]> {
  const database = await getDb();
  const result = database.exec('SELECT * FROM opportunities ORDER BY apr_bps DESC');
  if (!result[0]) return [];
  return result[0].values.map((row) => ({
    id: row[0],
    provider: row[1],
    providerName: row[2],
    strategyName: row[3],
    assetIn: row[4],
    assetOut: row[5],
    aprBps: row[6],
    feesBps: row[7],
    liquidityMicroCC: row[8],
    riskScore: row[9],
    riskLevel: row[10],
    minAmountMicroCC: row[11],
    estimatedExecutionCostMicroCC: row[12],
    slippageToleranceBps: row[13],
    executionSupport: row[14],
    isWhitelisted: row[15] === 1,
    addedAt: row[16],
    expiresAt: row[17],
  }));
}

export async function queryOpportunityById(id: string): Promise<Record<string, unknown> | null> {
  const database = await getDb();
  const stmt = database.prepare('SELECT * FROM opportunities WHERE id = ?') as unknown as { bind: (params: unknown[]) => void; step: () => boolean; get: () => unknown[]; free: () => void };
  stmt.bind([id]);
  if (!stmt.step()) { stmt.free(); return null; }
  const row = stmt.get();
  stmt.free();
  return {
    id: row[0],
    provider: row[1],
    providerName: row[2],
    strategyName: row[3],
    assetIn: row[4],
    assetOut: row[5],
    aprBps: row[6],
    feesBps: row[7],
    liquidityMicroCC: row[8],
    riskScore: row[9],
    riskLevel: row[10],
    minAmountMicroCC: row[11],
    estimatedExecutionCostMicroCC: row[12],
    slippageToleranceBps: row[13],
    executionSupport: row[14],
    isWhitelisted: row[15] === 1,
    addedAt: row[16],
    expiresAt: row[17],
  };
}

export async function queryExecutionAttempts(limit = 50): Promise<Record<string, unknown>[]> {
  const database = await getDb();
  const result = database.exec(
    `SELECT * FROM execution_attempts ORDER BY created_at DESC LIMIT ${limit}`
  );
  if (!result[0]) return [];
  return result[0].values.map((row) => ({
    id: row[0],
    intentId: row[1],
    planId: row[2],
    status: row[3],
    stepsCompleted: row[4],
    stepsTotal: row[5],
    currentStepId: row[6],
    startedAt: row[7],
    completedAt: row[8],
    error: row[9],
    createdAt: row[10],
  }));
}

export async function insertExecutionAttempt(attempt: {
  id: string;
  intentId: string;
  planId?: string | null;
  status: string;
  stepsTotal: number;
}): Promise<void> {
  const database = await getDb();
  database.run(
    `INSERT INTO execution_attempts (id, intent_id, plan_id, status, steps_total) VALUES (?, ?, ?, ?, ?)`,
    [attempt.id, attempt.intentId, attempt.planId ?? null, attempt.status, attempt.stepsTotal]
  );
  persist();
}

export async function updateExecutionAttempt(
  id: string,
  updates: {
    status?: string;
    stepsCompleted?: number;
    currentStepId?: string;
    startedAt?: string;
    completedAt?: string;
    error?: string;
  }
): Promise<void> {
  const database = await getDb();
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (updates.status !== undefined) { fields.push('status = ?'); values.push(updates.status); }
  if (updates.stepsCompleted !== undefined) { fields.push('steps_completed = ?'); values.push(updates.stepsCompleted); }
  if (updates.currentStepId !== undefined) { fields.push('current_step_id = ?'); values.push(updates.currentStepId); }
  if (updates.startedAt !== undefined) { fields.push('started_at = ?'); values.push(updates.startedAt); }
  if (updates.completedAt !== undefined) { fields.push('completed_at = ?'); values.push(updates.completedAt); }
  if (updates.error !== undefined) { fields.push('error = ?'); values.push(updates.error); }

  values.push(id);
  database.run(`UPDATE execution_attempts SET ${fields.join(', ')} WHERE id = ?`, values);
  persist();
}

export async function queryWalletState(): Promise<Record<string, unknown>> {
  const database = await getDb();
  const result = database.exec("SELECT * FROM wallet_state WHERE key = 'default'");
  if (!result[0] || result[0].values.length === 0) {
    return {
      key: 'default',
      address: '0xDEMO00000000000000000000000000000001',
      isConnected: true,
      isDemo: true,
      balances: [
        { asset: 'CC', available: 500_000_000, locked: 0, total: 500_000_000 },
        { asset: 'USDC', available: 250_000_000, locked: 0, total: 250_000_000 },
      ],
      lastSyncedAt: null,
    };
  }
  const row = result[0].values[0];
  return {
    key: row[0],
    address: row[1],
    isConnected: row[2] === 1,
    isDemo: row[3] === 1,
    balances: JSON.parse(row[4] as string),
    lastSyncedAt: row[5],
  };
}

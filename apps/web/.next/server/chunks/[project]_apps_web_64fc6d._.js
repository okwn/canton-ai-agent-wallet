module.exports = {

"[project]/apps/web/lib/db.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// SQLite database using sql.js (pure JavaScript, no native compilation)
__turbopack_esm__({
    "insertAuditEvent": ()=>insertAuditEvent,
    "insertExecutionAttempt": ()=>insertExecutionAttempt,
    "queryAuditEvents": ()=>queryAuditEvents,
    "queryExecutionAttempts": ()=>queryExecutionAttempts,
    "queryOpportunities": ()=>queryOpportunities,
    "queryOpportunityById": ()=>queryOpportunityById,
    "queryPolicies": ()=>queryPolicies,
    "queryPolicyById": ()=>queryPolicyById,
    "queryWalletState": ()=>queryWalletState,
    "resetDemoData": ()=>resetDemoData,
    "updateExecutionAttempt": ()=>updateExecutionAttempt,
    "updatePolicy": ()=>updatePolicy
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sql$2e$js$40$1$2e$14$2e$1$2f$node_modules$2f$sql$2e$js$2f$dist$2f$sql$2d$wasm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/sql.js@1.14.1/node_modules/sql.js/dist/sql-wasm.js [app-route] (ecmascript)");
var __TURBOPACK__commonjs__external__fs__ = __turbopack_external_require__("fs", true);
var __TURBOPACK__commonjs__external__path__ = __turbopack_external_require__("path", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
let db = null;
let initPromise = null;
const DB_PATH = process.env.TEST_DB_PATH ?? __TURBOPACK__commonjs__external__path__["default"].join(process.cwd(), 'data', 'wallet.db');
// ─── sql.js locateFile ──────────────────────────────────────────────────────
// In Node.js (Next.js server), sql.js needs an explicit wasm path.
// We resolve it from the project root node_modules, not from the bundled path.
function getSqlJsConfig() {
    if (typeof window === 'undefined' && typeof process !== 'undefined') {
        // Use a fixed path from project root — works because the wasm file is in a stable pnpm location
        return {
            locateFile: ()=>{
                return 'C:/Users/ogzka/Desktop/Canton_AI_Agent_Wallet/node_modules/.pnpm/sql.js@1.14.1/node_modules/sql.js/dist/sql-wasm.wasm';
            }
        };
    }
    return {};
}
// Cast initSqlJs to accept config (the type definitions are incomplete)
const initSqlJsWithConfig = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sql$2e$js$40$1$2e$14$2e$1$2f$node_modules$2f$sql$2e$js$2f$dist$2f$sql$2d$wasm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
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
async function getDb() {
    if (db) return db;
    if (initPromise) return initPromise;
    initPromise = (async ()=>{
        const SQL = await initSqlJsWithConfig(getSqlJsConfig());
        const dataDir = __TURBOPACK__commonjs__external__path__["default"].dirname(DB_PATH);
        if (!__TURBOPACK__commonjs__external__fs__["default"].existsSync(dataDir)) {
            __TURBOPACK__commonjs__external__fs__["default"].mkdirSync(dataDir, {
                recursive: true
            });
        }
        if (__TURBOPACK__commonjs__external__fs__["default"].existsSync(DB_PATH)) {
            const fileBuffer = __TURBOPACK__commonjs__external__fs__["default"].readFileSync(DB_PATH);
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
function safeJsonParse(val) {
    if (!val) return [];
    try {
        return JSON.parse(val);
    } catch  {
        return [];
    }
}
function persist() {
    if (db) {
        const data = db.export();
        __TURBOPACK__commonjs__external__fs__["default"].writeFileSync(DB_PATH, Buffer.from(data));
    }
}
async function resetDemoData() {
    const database = await getDb();
    // Clear all runtime data, keep schema
    database.run('DELETE FROM audit_events');
    database.run('DELETE FROM execution_attempts');
    // Reset policy usage counters
    const resetNow = new Date().toISOString();
    database.run('UPDATE policies SET current_usage_micro_cc = 0, window_start = NULL');
    database.run("UPDATE wallet_state SET balances = '[{\"asset\":\"CC\",\"available\":500000000,\"locked\":0,\"total\":500000000},{\"asset\":\"USDC\",\"available\":250000000,\"locked\":0,\"total\":250000000}]', last_synced_at = ?", [
        resetNow
    ]);
    // Re-seed audit events
    const insertEvent = database.prepare('INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const demoEvents = [
        [
            'evt-r1',
            'WALLET_CONNECTED',
            '0xDEMO00000000000000000000000000000001',
            null,
            null,
            null,
            JSON.stringify({
                address: '0xDEMO00000000000000000000000000000001',
                isDemo: true
            }),
            1,
            new Date(Date.now() - 1000 * 60 * 30).toISOString()
        ],
        [
            'evt-r2',
            'POLICY_EVALUATED',
            '0xDEMO00000000000000000000000000000001',
            null,
            null,
            null,
            JSON.stringify({
                decision: 'APPROVED',
                passedChecks: [
                    'max_per_trade',
                    'max_daily',
                    'allowlist',
                    'simulation_mode'
                ]
            }),
            1,
            new Date(Date.now() - 1000 * 60 * 28).toISOString()
        ],
        [
            'evt-r3',
            'INTENT_PARSED',
            '0xDEMO00000000000000000000000000000001',
            'intent-reset-001',
            null,
            null,
            JSON.stringify({
                rawText: 'Find the cheapest yield up to 50 CC',
                action: 'FIND_YIELD',
                confidence: 0.95,
                simulationOnly: false
            }),
            1,
            new Date(Date.now() - 1000 * 60 * 25).toISOString()
        ],
        [
            'evt-r4',
            'EXECUTION_COMPLETED',
            '0xDEMO00000000000000000000000000000001',
            'intent-reset-001',
            'attempt-reset-001',
            null,
            JSON.stringify({
                receipt: {
                    status: 'SIMULATED',
                    totalOutputMicroCC: 501234,
                    totalFeesPaidMicroCC: 5000,
                    policyDecision: 'APPROVED',
                    simulationOnly: true
                }
            }),
            1,
            new Date(Date.now() - 1000 * 60 * 23).toISOString()
        ]
    ];
    for (const e of demoEvents){
        insertEvent.run([
            ...e
        ]);
    }
    insertEvent.free();
    persist();
}
// ─── Seed ───────────────────────────────────────────────────────────────────
async function seedDefaultData(database) {
    // Policies
    const existingPolicies = database.exec('SELECT COUNT(*) FROM policies');
    if (!existingPolicies[0] || existingPolicies[0].values[0][0] === 0) {
        const insertPolicy = database.prepare('INSERT INTO policies (id, type, name, value, enabled, priority, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        const now = new Date().toISOString();
        const defaultPolicies = [
            [
                'pol-max-trade',
                'MAX_PER_TRADE',
                'Max Per Trade',
                '20000000',
                1,
                1,
                now,
                now
            ],
            [
                'pol-daily',
                'MAX_DAILY',
                'Max Daily Spend',
                '100000000',
                1,
                2,
                now,
                now
            ],
            [
                'pol-approval',
                'APPROVAL_THRESHOLD',
                'Approval Threshold',
                '10000000',
                1,
                3,
                now,
                now
            ],
            [
                'pol-denylist',
                'STRATEGY_DENYLIST',
                'Strategy Denylist',
                null,
                1,
                4,
                now,
                now
            ],
            [
                'pol-allowlist',
                'STRATEGY_ALLOWLIST',
                'Strategy Allowlist',
                null,
                1,
                5,
                now,
                now
            ],
            [
                'pol-assets',
                'ASSET_ALLOWLIST',
                'Asset Allowlist',
                null,
                0,
                6,
                now,
                now
            ],
            [
                'pol-slippage',
                'MAX_SLIPPAGE',
                'Max Slippage',
                '100',
                1,
                7,
                now,
                now
            ],
            [
                'pol-sim-only',
                'SIMULATION_ONLY',
                'Simulation Only',
                null,
                0,
                8,
                now,
                now
            ],
            [
                'pol-exec-mode',
                'EXECUTION_MODE',
                'Execution Mode',
                'approval_required',
                1,
                0,
                now,
                now
            ]
        ];
        for (const p of defaultPolicies){
            insertPolicy.run([
                ...p
            ]);
        }
        insertPolicy.free();
    }
    // Opportunities
    const existingOpps = database.exec('SELECT COUNT(*) FROM opportunities');
    if (!existingOpps[0] || existingOpps[0].values[0][0] === 0) {
        const insertOpp = database.prepare(`INSERT INTO opportunities (id, provider, provider_name, strategy_name, asset_in, asset_out,
       apr_bps, fees_bps, liquidity_micro_cc, risk_score, risk_level, min_amount_micro_cc,
       estimated_execution_cost_micro_cc, slippage_tolerance_bps, execution_support, is_whitelisted, added_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        const now = new Date().toISOString();
        const seedOpportunities = [
            // id, provider, provider_name, strategy_name, asset_in, asset_out, apr_bps, fees_bps, liquidity, risk_score, risk_level, min_amount, exec_cost, slippage, support, whitelisted, added_at
            [
                'opp-fro-y1',
                'froburn',
                'Froburn Protocol',
                'Stable Yield Vault',
                'CC',
                'fCC',
                420,
                15,
                1_250_000_000,
                15,
                'LOW',
                1_000_000,
                5000,
                30,
                'real',
                1,
                now
            ],
            [
                'opp-fro-y2',
                'froburn',
                'Froburn Protocol',
                'High Yield Bridge',
                'CC',
                'fCC',
                685,
                25,
                750_000_000,
                35,
                'MEDIUM',
                5_000_000,
                8000,
                50,
                'simulated',
                1,
                now
            ],
            [
                'opp-lace-1',
                'lace',
                'Lace Finance',
                'Lending Pool A',
                'CC',
                'lCC',
                285,
                12,
                890_000_000,
                28,
                'MEDIUM',
                2_000_000,
                3500,
                40,
                'real',
                1,
                now
            ],
            [
                'opp-lace-2',
                'lace',
                'Lace Finance',
                'Leveraged Yield',
                'CC',
                'lCC',
                540,
                35,
                420_000_000,
                58,
                'HIGH',
                10_000_000,
                12000,
                80,
                'simulated',
                0,
                now
            ],
            [
                'opp-cswap-1',
                'cantonswap',
                'CantonSwap',
                'CC-USDC LP',
                'CC',
                'USDC',
                180,
                8,
                2_100_000_000,
                12,
                'LOW',
                500_000,
                2000,
                20,
                'real',
                1,
                now
            ],
            [
                'opp-cswap-2',
                'cantonswap',
                'CantonSwap',
                'Alt Trade',
                'CC',
                'USDC',
                95,
                6,
                3_400_000_000,
                8,
                'LOW',
                100_000,
                1500,
                15,
                'unsupported',
                1,
                now
            ],
            [
                'opp-fro-d1',
                'fro-demo',
                'Froburn (Demo)',
                'Testnet Yield',
                'CC',
                'fCC',
                720,
                20,
                50_000_000,
                20,
                'LOW',
                0,
                0,
                50,
                'simulated',
                1,
                now
            ]
        ];
        for (const o of seedOpportunities){
            insertOpp.run([
                ...o
            ]);
        }
        insertOpp.free();
    }
    // Wallet state
    const existingWallet = database.exec("SELECT COUNT(*) FROM wallet_state WHERE key = 'default'");
    const wsNow = new Date().toISOString();
    if (!existingWallet[0] || existingWallet[0].values[0][0] === 0) {
        database.run("INSERT INTO wallet_state (key, address, is_connected, is_demo, balances, last_synced_at) VALUES ('default', '0xDEMO00000000000000000000000000000001', 1, 1, '[{\"asset\":\"CC\",\"available\":500000000,\"locked\":0,\"total\":500000000},{\"asset\":\"USDC\",\"available\":250000000,\"locked\":0,\"total\":250000000}]', ?)", [
            wsNow
        ]);
    }
    // Seed demo audit events (only if no events exist)
    const existingEvents = database.exec('SELECT COUNT(*) FROM audit_events');
    if (!existingEvents[0] || existingEvents[0].values[0][0] === 0) {
        const insertEvent = database.prepare('INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const demoEvents = [
            // Wallet connected event
            [
                'evt-0001',
                'WALLET_CONNECTED',
                '0xDEMO00000000000000000000000000000001',
                null,
                null,
                null,
                JSON.stringify({
                    address: '0xDEMO00000000000000000000000000000001',
                    isDemo: true
                }),
                1,
                new Date(Date.now() - 1000 * 60 * 30).toISOString()
            ],
            // Policy loaded
            [
                'evt-0002',
                'POLICY_EVALUATED',
                '0xDEMO00000000000000000000000000000001',
                null,
                null,
                null,
                JSON.stringify({
                    decision: 'APPROVED',
                    passedChecks: [
                        'max_per_trade',
                        'max_daily',
                        'allowlist',
                        'simulation_mode'
                    ]
                }),
                1,
                new Date(Date.now() - 1000 * 60 * 28).toISOString()
            ],
            // Intent parsed (yield search)
            [
                'evt-0003',
                'INTENT_PARSED',
                '0xDEMO00000000000000000000000000000001',
                'intent-demo-001',
                null,
                null,
                JSON.stringify({
                    rawText: 'Find the cheapest yield up to 50 CC',
                    action: 'FIND_YIELD',
                    confidence: 0.95,
                    simulationOnly: false
                }),
                1,
                new Date(Date.now() - 1000 * 60 * 25).toISOString()
            ],
            // Policy approved the yield search
            [
                'evt-0004',
                'POLICY_EVALUATED',
                '0xDEMO00000000000000000000000000000001',
                'intent-demo-001',
                null,
                null,
                JSON.stringify({
                    decision: 'APPROVED',
                    passedChecks: [
                        'max_per_trade',
                        'max_daily',
                        'denylist',
                        'slippage'
                    ]
                }),
                1,
                new Date(Date.now() - 1000 * 60 * 24).toISOString()
            ],
            // Execution completed (simulated)
            [
                'evt-0005',
                'EXECUTION_COMPLETED',
                '0xDEMO00000000000000000000000000000001',
                'intent-demo-001',
                'attempt-demo-001',
                null,
                JSON.stringify({
                    receipt: {
                        status: 'SIMULATED',
                        totalOutputMicroCC: 501234,
                        totalFeesPaidMicroCC: 5000,
                        policyDecision: 'APPROVED',
                        simulationOnly: true
                    }
                }),
                1,
                new Date(Date.now() - 1000 * 60 * 23).toISOString()
            ],
            // Another intent (blocked by policy)
            [
                'evt-0006',
                'INTENT_PARSED',
                '0xDEMO00000000000000000000000000000001',
                'intent-demo-002',
                null,
                null,
                JSON.stringify({
                    rawText: 'Move 500 CC to lace finance',
                    action: 'EXECUTE_STRATEGY',
                    confidence: 0.88,
                    simulationOnly: false
                }),
                1,
                new Date(Date.now() - 1000 * 60 * 10).toISOString()
            ],
            // Blocked by denylist policy
            [
                'evt-0007',
                'EXECUTION_REJECTED',
                '0xDEMO00000000000000000000000000000001',
                'intent-demo-002',
                'attempt-demo-002',
                null,
                JSON.stringify({
                    receipt: {
                        status: 'BLOCKED',
                        totalOutputMicroCC: null,
                        totalFeesPaidMicroCC: null,
                        policyDecision: 'DENIED',
                        blockedByPolicy: 'Strategy Denylist',
                        simulationOnly: false
                    }
                }),
                1,
                new Date(Date.now() - 1000 * 60 * 9).toISOString()
            ]
        ];
        for (const e of demoEvents){
            insertEvent.run([
                ...e
            ]);
        }
        insertEvent.free();
    }
}
async function queryPolicies() {
    const database = await getDb();
    const result = database.exec('SELECT * FROM policies ORDER BY priority');
    if (!result[0]) return [];
    return result[0].values.map((row)=>({
            id: row[0],
            type: row[1],
            name: row[2],
            value: row[3],
            enabled: row[4] === 1,
            priority: row[5],
            currentUsageMicroCC: row[6] ?? 0,
            windowStart: row[7],
            providerIds: safeJsonParse(row[8]),
            assetSymbols: safeJsonParse(row[9])
        }));
}
async function queryPolicyById(id) {
    const database = await getDb();
    // sql.js Statement.bind() exists at runtime but TS types don't expose it
    const stmt = database.prepare('SELECT * FROM policies WHERE id = ?');
    stmt.bind([
        id
    ]);
    if (!stmt.step()) {
        stmt.free();
        return null;
    }
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
        providerIds: safeJsonParse(row[8]),
        assetSymbols: safeJsonParse(row[9])
    };
}
async function updatePolicy(id, updates) {
    const database = await getDb();
    const fields = [
        'updated_at = datetime(\'now\')'
    ];
    const values = [];
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
async function queryAuditEvents(limit = 100) {
    const database = await getDb();
    const result = database.exec(`SELECT * FROM audit_events ORDER BY created_at DESC LIMIT ${limit}`);
    if (!result[0]) return [];
    return result[0].values.map((row)=>({
            id: row[0],
            eventType: row[1],
            walletAddress: row[2],
            intentId: row[3],
            attemptId: row[4],
            policyId: row[5],
            payload: JSON.parse(row[6]),
            simulated: row[7] === 1,
            createdAt: row[8]
        }));
}
async function insertAuditEvent(event) {
    const database = await getDb();
    const now = new Date().toISOString();
    database.run(`INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        event.id,
        event.eventType,
        event.walletAddress ?? null,
        event.intentId ?? null,
        event.attemptId ?? null,
        event.policyId ?? null,
        JSON.stringify(event.payload),
        event.simulated ? 1 : 0,
        now
    ]);
    persist();
}
async function queryOpportunities() {
    const database = await getDb();
    const result = database.exec('SELECT * FROM opportunities ORDER BY apr_bps DESC');
    if (!result[0]) return [];
    return result[0].values.map((row)=>({
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
            expiresAt: row[17]
        }));
}
async function queryOpportunityById(id) {
    const database = await getDb();
    const stmt = database.prepare('SELECT * FROM opportunities WHERE id = ?');
    stmt.bind([
        id
    ]);
    if (!stmt.step()) {
        stmt.free();
        return null;
    }
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
        expiresAt: row[17]
    };
}
async function queryExecutionAttempts(limit = 50) {
    const database = await getDb();
    const result = database.exec(`SELECT * FROM execution_attempts ORDER BY created_at DESC LIMIT ${limit}`);
    if (!result[0]) return [];
    return result[0].values.map((row)=>({
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
            createdAt: row[10]
        }));
}
async function insertExecutionAttempt(attempt) {
    const database = await getDb();
    database.run(`INSERT INTO execution_attempts (id, intent_id, plan_id, status, steps_total) VALUES (?, ?, ?, ?, ?)`, [
        attempt.id,
        attempt.intentId,
        attempt.planId ?? null,
        attempt.status,
        attempt.stepsTotal
    ]);
    persist();
}
async function updateExecutionAttempt(id, updates) {
    const database = await getDb();
    const fields = [];
    const values = [];
    if (updates.status !== undefined) {
        fields.push('status = ?');
        values.push(updates.status);
    }
    if (updates.stepsCompleted !== undefined) {
        fields.push('steps_completed = ?');
        values.push(updates.stepsCompleted);
    }
    if (updates.currentStepId !== undefined) {
        fields.push('current_step_id = ?');
        values.push(updates.currentStepId);
    }
    if (updates.startedAt !== undefined) {
        fields.push('started_at = ?');
        values.push(updates.startedAt);
    }
    if (updates.completedAt !== undefined) {
        fields.push('completed_at = ?');
        values.push(updates.completedAt);
    }
    if (updates.error !== undefined) {
        fields.push('error = ?');
        values.push(updates.error);
    }
    values.push(id);
    database.run(`UPDATE execution_attempts SET ${fields.join(', ')} WHERE id = ?`, values);
    persist();
}
async function queryWalletState() {
    const database = await getDb();
    const result = database.exec("SELECT * FROM wallet_state WHERE key = 'default'");
    if (!result[0] || result[0].values.length === 0) {
        return {
            key: 'default',
            address: '0xDEMO00000000000000000000000000000001',
            isConnected: true,
            isDemo: true,
            balances: [
                {
                    asset: 'CC',
                    available: 500_000_000,
                    locked: 0,
                    total: 500_000_000
                },
                {
                    asset: 'USDC',
                    available: 250_000_000,
                    locked: 0,
                    total: 250_000_000
                }
            ],
            lastSyncedAt: null
        };
    }
    const row = result[0].values[0];
    return {
        key: row[0],
        address: row[1],
        isConnected: row[2] === 1,
        isDemo: row[3] === 1,
        balances: JSON.parse(row[4]),
        lastSyncedAt: row[5]
    };
}

})()),
"[project]/apps/web/lib/utils.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "bpsToPercent": ()=>bpsToPercent,
    "cn": ()=>cn,
    "formatAddress": ()=>formatAddress,
    "generateId": ()=>generateId,
    "microCCToDisplay": ()=>microCCToDisplay
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/tailwind-merge@2.6.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function microCCToDisplay(n) {
    if (n === null || n === undefined) return '0.00';
    return (n / 1_000_000).toFixed(2);
}
function bpsToPercent(bps) {
    return (bps / 100).toFixed(2);
}
function formatAddress(addr) {
    if (addr.startsWith('0xDEMO')) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

})()),
"[project]/apps/web/app/api/policies/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET,
    "PUT": ()=>PUT
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.5_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/lib/utils.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
async function GET() {
    try {
        const policies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryPolicies"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            policies
        });
    } catch (err) {
        console.error('[policies GET]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to load policies'
        }, {
            status: 500
        });
    }
}
async function PUT(req) {
    try {
        const body = await req.json();
        const { id, value, enabled, providerIds, assetSymbols } = body;
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing policy id'
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updatePolicy"])(id, {
            value: value !== undefined ? String(value) : undefined,
            enabled,
            providerIds,
            assetSymbols
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertAuditEvent"])({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            eventType: 'POLICY_UPDATED',
            payload: {
                id,
                value,
                enabled,
                providerIds,
                assetSymbols
            },
            simulated: true
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error('[policies PUT]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update policy'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=%5Bproject%5D_apps_web_64fc6d._.js.map
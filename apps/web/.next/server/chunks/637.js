"use strict";exports.id=637,exports.ids=[637],exports.modules={3637:(e,t,a)=>{a.d(t,{Bt:()=>I,DM:()=>A,Nw:()=>y,_T:()=>N,_c:()=>U,i5:()=>D,i8:()=>S,nW:()=>C,vu:()=>m});var i=a(1786),s=a.n(i),n=a(7147),l=a.n(n),o=a(1017),r=a.n(o);let d=null,T=null,E=process.env.TEST_DB_PATH??r().join(process.cwd(),"data","wallet.db"),p=s(),u=`
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
`;async function c(){return d||T||(T=(async()=>{let e=await p("undefined"!=typeof process?{locateFile:()=>"C:/Users/ogzka/Desktop/Canton_AI_Agent_Wallet/node_modules/.pnpm/sql.js@1.14.1/node_modules/sql.js/dist/sql-wasm.wasm"}:{}),t=r().dirname(E);if(l().existsSync(t)||l().mkdirSync(t,{recursive:!0}),l().existsSync(E)){let t=l().readFileSync(E);d=new e.Database(t)}else d=new e.Database;return d.run(u),await O(d),L(),d})())}function _(e){if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function L(){if(d){let e=d.export();l().writeFileSync(E,Buffer.from(e))}}async function N(){let e=await c();e.run("DELETE FROM audit_events"),e.run("DELETE FROM execution_attempts");let t=new Date().toISOString();e.run("UPDATE policies SET current_usage_micro_cc = 0, window_start = NULL"),e.run('UPDATE wallet_state SET balances = \'[{"asset":"CC","available":500000000,"locked":0,"total":500000000},{"asset":"USDC","available":250000000,"locked":0,"total":250000000}]\', last_synced_at = ?',[t]);let a=e.prepare("INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");for(let e of[["evt-r1","WALLET_CONNECTED","0xDEMO00000000000000000000000000000001",null,null,null,JSON.stringify({address:"0xDEMO00000000000000000000000000000001",isDemo:!0}),1,new Date(Date.now()-18e5).toISOString()],["evt-r2","POLICY_EVALUATED","0xDEMO00000000000000000000000000000001",null,null,null,JSON.stringify({decision:"APPROVED",passedChecks:["max_per_trade","max_daily","allowlist","simulation_mode"]}),1,new Date(Date.now()-168e4).toISOString()],["evt-r3","INTENT_PARSED","0xDEMO00000000000000000000000000000001","intent-reset-001",null,null,JSON.stringify({rawText:"Find the cheapest yield up to 50 CC",action:"FIND_YIELD",confidence:.95,simulationOnly:!1}),1,new Date(Date.now()-15e5).toISOString()],["evt-r4","EXECUTION_COMPLETED","0xDEMO00000000000000000000000000000001","intent-reset-001","attempt-reset-001",null,JSON.stringify({receipt:{status:"SIMULATED",totalOutputMicroCC:501234,totalFeesPaidMicroCC:5e3,policyDecision:"APPROVED",simulationOnly:!0}}),1,new Date(Date.now()-138e4).toISOString()]])a.run([...e]);a.free(),L()}async function O(e){let t=e.exec("SELECT COUNT(*) FROM policies");if(!t[0]||0===t[0].values[0][0]){let t=e.prepare("INSERT INTO policies (id, type, name, value, enabled, priority, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"),a=new Date().toISOString();for(let e of[["pol-max-trade","MAX_PER_TRADE","Max Per Trade","20000000",1,1,a,a],["pol-daily","MAX_DAILY","Max Daily Spend","100000000",1,2,a,a],["pol-approval","APPROVAL_THRESHOLD","Approval Threshold","10000000",1,3,a,a],["pol-denylist","STRATEGY_DENYLIST","Strategy Denylist",null,1,4,a,a],["pol-allowlist","STRATEGY_ALLOWLIST","Strategy Allowlist",null,1,5,a,a],["pol-assets","ASSET_ALLOWLIST","Asset Allowlist",null,0,6,a,a],["pol-slippage","MAX_SLIPPAGE","Max Slippage","100",1,7,a,a],["pol-sim-only","SIMULATION_ONLY","Simulation Only",null,0,8,a,a],["pol-exec-mode","EXECUTION_MODE","Execution Mode","approval_required",1,0,a,a]])t.run([...e]);t.free()}let a=e.exec("SELECT COUNT(*) FROM opportunities");if(!a[0]||0===a[0].values[0][0]){let t=e.prepare(`INSERT INTO opportunities (id, provider, provider_name, strategy_name, asset_in, asset_out,
       apr_bps, fees_bps, liquidity_micro_cc, risk_score, risk_level, min_amount_micro_cc,
       estimated_execution_cost_micro_cc, slippage_tolerance_bps, execution_support, is_whitelisted, added_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`),a=new Date().toISOString();for(let e of[["opp-fro-y1","froburn","Froburn Protocol","Stable Yield Vault","CC","fCC",420,15,125e7,15,"LOW",1e6,5e3,30,"real",1,a],["opp-fro-y2","froburn","Froburn Protocol","High Yield Bridge","CC","fCC",685,25,75e7,35,"MEDIUM",5e6,8e3,50,"simulated",1,a],["opp-lace-1","lace","Lace Finance","Lending Pool A","CC","lCC",285,12,89e7,28,"MEDIUM",2e6,3500,40,"real",1,a],["opp-lace-2","lace","Lace Finance","Leveraged Yield","CC","lCC",540,35,42e7,58,"HIGH",1e7,12e3,80,"simulated",0,a],["opp-cswap-1","cantonswap","CantonSwap","CC-USDC LP","CC","USDC",180,8,21e8,12,"LOW",5e5,2e3,20,"real",1,a],["opp-cswap-2","cantonswap","CantonSwap","Alt Trade","CC","USDC",95,6,34e8,8,"LOW",1e5,1500,15,"unsupported",1,a],["opp-fro-d1","fro-demo","Froburn (Demo)","Testnet Yield","CC","fCC",720,20,5e7,20,"LOW",0,0,50,"simulated",1,a]])t.run([...e]);t.free()}let i=e.exec("SELECT COUNT(*) FROM wallet_state WHERE key = 'default'"),s=new Date().toISOString();i[0]&&0!==i[0].values[0][0]||e.run('INSERT INTO wallet_state (key, address, is_connected, is_demo, balances, last_synced_at) VALUES (\'default\', \'0xDEMO00000000000000000000000000000001\', 1, 1, \'[{"asset":"CC","available":500000000,"locked":0,"total":500000000},{"asset":"USDC","available":250000000,"locked":0,"total":250000000}]\', ?)',[s]);let n=e.exec("SELECT COUNT(*) FROM audit_events");if(!n[0]||0===n[0].values[0][0]){let t=e.prepare("INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");for(let e of[["evt-0001","WALLET_CONNECTED","0xDEMO00000000000000000000000000000001",null,null,null,JSON.stringify({address:"0xDEMO00000000000000000000000000000001",isDemo:!0}),1,new Date(Date.now()-18e5).toISOString()],["evt-0002","POLICY_EVALUATED","0xDEMO00000000000000000000000000000001",null,null,null,JSON.stringify({decision:"APPROVED",passedChecks:["max_per_trade","max_daily","allowlist","simulation_mode"]}),1,new Date(Date.now()-168e4).toISOString()],["evt-0003","INTENT_PARSED","0xDEMO00000000000000000000000000000001","intent-demo-001",null,null,JSON.stringify({rawText:"Find the cheapest yield up to 50 CC",action:"FIND_YIELD",confidence:.95,simulationOnly:!1}),1,new Date(Date.now()-15e5).toISOString()],["evt-0004","POLICY_EVALUATED","0xDEMO00000000000000000000000000000001","intent-demo-001",null,null,JSON.stringify({decision:"APPROVED",passedChecks:["max_per_trade","max_daily","denylist","slippage"]}),1,new Date(Date.now()-144e4).toISOString()],["evt-0005","EXECUTION_COMPLETED","0xDEMO00000000000000000000000000000001","intent-demo-001","attempt-demo-001",null,JSON.stringify({receipt:{status:"SIMULATED",totalOutputMicroCC:501234,totalFeesPaidMicroCC:5e3,policyDecision:"APPROVED",simulationOnly:!0}}),1,new Date(Date.now()-138e4).toISOString()],["evt-0006","INTENT_PARSED","0xDEMO00000000000000000000000000000001","intent-demo-002",null,null,JSON.stringify({rawText:"Move 500 CC to lace finance",action:"EXECUTE_STRATEGY",confidence:.88,simulationOnly:!1}),1,new Date(Date.now()-6e5).toISOString()],["evt-0007","EXECUTION_REJECTED","0xDEMO00000000000000000000000000000001","intent-demo-002","attempt-demo-002",null,JSON.stringify({receipt:{status:"BLOCKED",totalOutputMicroCC:null,totalFeesPaidMicroCC:null,policyDecision:"DENIED",blockedByPolicy:"Strategy Denylist",simulationOnly:!1}}),1,new Date(Date.now()-54e4).toISOString()]])t.run([...e]);t.free()}}async function S(){let e=(await c()).exec("SELECT * FROM policies ORDER BY priority");return e[0]?e[0].values.map(e=>({id:e[0],type:e[1],name:e[2],value:e[3],enabled:1===e[4],priority:e[5],currentUsageMicroCC:e[6]??0,windowStart:e[7],providerIds:_(e[8]),assetSymbols:_(e[9])})):[]}async function D(e,t){let a=await c(),i=["updated_at = datetime('now')"],s=[];void 0!==t.value&&(i.push("value = ?"),s.push(t.value)),void 0!==t.enabled&&(i.push("enabled = ?"),s.push(t.enabled?1:0)),void 0!==t.providerIds&&(i.push("provider_ids = ?"),s.push(JSON.stringify(t.providerIds))),void 0!==t.assetSymbols&&(i.push("asset_symbols = ?"),s.push(JSON.stringify(t.assetSymbols))),void 0!==t.currentUsageMicroCC&&(i.push("current_usage_micro_cc = ?"),s.push(t.currentUsageMicroCC)),void 0!==t.windowStart&&(i.push("window_start = ?"),s.push(t.windowStart)),s.push(e),a.run(`UPDATE policies SET ${i.join(", ")} WHERE id = ?`,s),L()}async function C(e=100){let t=(await c()).exec(`SELECT * FROM audit_events ORDER BY created_at DESC LIMIT ${e}`);return t[0]?t[0].values.map(e=>({id:e[0],eventType:e[1],walletAddress:e[2],intentId:e[3],attemptId:e[4],policyId:e[5],payload:JSON.parse(e[6]),simulated:1===e[7],createdAt:e[8]})):[]}async function m(e){let t=await c(),a=new Date().toISOString();t.run(`INSERT INTO audit_events (id, event_type, wallet_address, intent_id, attempt_id, policy_id, payload, simulated, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[e.id,e.eventType,e.walletAddress??null,e.intentId??null,e.attemptId??null,e.policyId??null,JSON.stringify(e.payload),e.simulated?1:0,a]),L()}async function y(){let e=(await c()).exec("SELECT * FROM opportunities ORDER BY apr_bps DESC");return e[0]?e[0].values.map(e=>({id:e[0],provider:e[1],providerName:e[2],strategyName:e[3],assetIn:e[4],assetOut:e[5],aprBps:e[6],feesBps:e[7],liquidityMicroCC:e[8],riskScore:e[9],riskLevel:e[10],minAmountMicroCC:e[11],estimatedExecutionCostMicroCC:e[12],slippageToleranceBps:e[13],executionSupport:e[14],isWhitelisted:1===e[15],addedAt:e[16],expiresAt:e[17]})):[]}async function I(e){(await c()).run("INSERT INTO execution_attempts (id, intent_id, plan_id, status, steps_total) VALUES (?, ?, ?, ?, ?)",[e.id,e.intentId,e.planId??null,e.status,e.stepsTotal]),L()}async function A(e,t){let a=await c(),i=[],s=[];void 0!==t.status&&(i.push("status = ?"),s.push(t.status)),void 0!==t.stepsCompleted&&(i.push("steps_completed = ?"),s.push(t.stepsCompleted)),void 0!==t.currentStepId&&(i.push("current_step_id = ?"),s.push(t.currentStepId)),void 0!==t.startedAt&&(i.push("started_at = ?"),s.push(t.startedAt)),void 0!==t.completedAt&&(i.push("completed_at = ?"),s.push(t.completedAt)),void 0!==t.error&&(i.push("error = ?"),s.push(t.error)),s.push(e),a.run(`UPDATE execution_attempts SET ${i.join(", ")} WHERE id = ?`,s),L()}async function U(){let e=(await c()).exec("SELECT * FROM wallet_state WHERE key = 'default'");if(!e[0]||0===e[0].values.length)return{key:"default",address:"0xDEMO00000000000000000000000000000001",isConnected:!0,isDemo:!0,balances:[{asset:"CC",available:5e8,locked:0,total:5e8},{asset:"USDC",available:25e7,locked:0,total:25e7}],lastSyncedAt:null};let t=e[0].values[0];return{key:t[0],address:t[1],isConnected:1===t[2],isDemo:1===t[3],balances:JSON.parse(t[4]),lastSyncedAt:t[5]}}}};
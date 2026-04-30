module.exports = {

"[project]/packages/agent-core/src/types.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Core domain types for Canton Agent Wallet
__turbopack_esm__({});
;

})()),
"[project]/packages/shared/src/domain.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Domain models with Zod runtime-safe schemas
__turbopack_esm__({
    "ApprovalPolicySchema": ()=>ApprovalPolicySchema,
    "AssetAllowlistPolicySchema": ()=>AssetAllowlistPolicySchema,
    "AssetBalanceSchema": ()=>AssetBalanceSchema,
    "AssetSymbolSchema": ()=>AssetSymbolSchema,
    "AttemptStatusSchema": ()=>AttemptStatusSchema,
    "AuditEventSchema": ()=>AuditEventSchema,
    "AuditEventTypeSchema": ()=>AuditEventTypeSchema,
    "BudgetPolicySchema": ()=>BudgetPolicySchema,
    "ConnectedWalletStateSchema": ()=>ConnectedWalletStateSchema,
    "DomainModels": ()=>DomainModels,
    "ExecutionActionSchema": ()=>ExecutionActionSchema,
    "ExecutionAttemptSchema": ()=>ExecutionAttemptSchema,
    "ExecutionModePolicySchema": ()=>ExecutionModePolicySchema,
    "ExecutionModeSchema": ()=>ExecutionModeSchema,
    "ExecutionPlanSchema": ()=>ExecutionPlanSchema,
    "ExecutionPolicySchema": ()=>ExecutionPolicySchema,
    "ExecutionReceiptSchema": ()=>ExecutionReceiptSchema,
    "ExecutionSupportSchema": ()=>ExecutionSupportSchema,
    "IntentActionSchema": ()=>IntentActionSchema,
    "MaxSlippagePolicySchema": ()=>MaxSlippagePolicySchema,
    "MicroCCSchema": ()=>MicroCCSchema,
    "NaturalLanguageIntentSchema": ()=>NaturalLanguageIntentSchema,
    "ParsedExecutionIntentSchema": ()=>ParsedExecutionIntentSchema,
    "PolicyEvaluationResultSchema": ()=>PolicyEvaluationResultSchema,
    "PolicySchema": ()=>PolicySchema,
    "PolicyTypeSchema": ()=>PolicyTypeSchema,
    "ProviderIdSchema": ()=>ProviderIdSchema,
    "ProviderListPolicySchema": ()=>ProviderListPolicySchema,
    "ReceiptStatusSchema": ()=>ReceiptStatusSchema,
    "RiskCheckResultSchema": ()=>RiskCheckResultSchema,
    "RiskCheckTypeSchema": ()=>RiskCheckTypeSchema,
    "RiskLevelSchema": ()=>RiskLevelSchema,
    "RiskVerdictSchema": ()=>RiskVerdictSchema,
    "SimulationOnlyPolicySchema": ()=>SimulationOnlyPolicySchema,
    "StepResultSchema": ()=>StepResultSchema,
    "StepSchema": ()=>StepSchema,
    "StrategyIdSchema": ()=>StrategyIdSchema,
    "StrategyOpportunitySchema": ()=>StrategyOpportunitySchema,
    "StrategyQuoteSchema": ()=>StrategyQuoteSchema,
    "UserWalletProfileSchema": ()=>UserWalletProfileSchema,
    "WalletAddressSchema": ()=>WalletAddressSchema
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const AssetSymbolSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(10);
const ProviderIdSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(50);
const StrategyIdSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100);
const WalletAddressSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^0x[a-fA-F0-9]{40}$/).or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().startsWith('0xDEMO'));
const MicroCCSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0);
const ExecutionModeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'disabled',
    'approval_required',
    'auto_execute'
]);
const UserWalletProfileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    ownerAddress: WalletAddressSchema,
    displayName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100),
    executionMode: ExecutionModeSchema,
    simulationOnly: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime()
});
const ConnectedWalletStateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    address: WalletAddressSchema,
    isConnected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    isDemo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    balances: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        asset: AssetSymbolSchema,
        available: MicroCCSchema,
        locked: MicroCCSchema,
        total: MicroCCSchema
    })),
    lastSyncedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable()
});
const AssetBalanceSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    asset: AssetSymbolSchema,
    available: MicroCCSchema,
    locked: MicroCCSchema,
    total: MicroCCSchema,
    usdEstimate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
});
const ExecutionSupportSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'real',
    'simulated',
    'unsupported'
]);
const RiskLevelSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'LOW',
    'MEDIUM',
    'HIGH',
    'UNKNOWN'
]);
const StrategyOpportunitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: StrategyIdSchema,
    provider: ProviderIdSchema,
    providerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    strategyName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    assetIn: AssetSymbolSchema,
    assetOut: AssetSymbolSchema,
    aprBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0),
    feesBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0),
    liquidityMicroCC: MicroCCSchema,
    riskScore: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).max(100),
    riskLevel: RiskLevelSchema,
    minAmountMicroCC: MicroCCSchema,
    estimatedExecutionCostMicroCC: MicroCCSchema,
    slippageToleranceBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).default(50),
    executionSupport: ExecutionSupportSchema,
    isWhitelisted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    addedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime(),
    expiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable()
});
const StrategyQuoteSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    opportunityId: StrategyIdSchema,
    provider: ProviderIdSchema,
    assetIn: AssetSymbolSchema,
    assetOut: AssetSymbolSchema,
    amountInMicroCC: MicroCCSchema,
    estimatedOutputMicroCC: MicroCCSchema,
    estimatedAprBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int(),
    estimatedFeesMicroCC: MicroCCSchema,
    estimatedSlippageBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int(),
    estimatedExecutionCostMicroCC: MicroCCSchema,
    netYieldBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int(),
    validUntil: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime()
});
const IntentActionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'FIND_YIELD',
    'EXECUTE_STRATEGY',
    'CHECK_BALANCE',
    'SET_POLICY',
    'ADD_STRATEGY',
    'REMOVE_STRATEGY',
    'VIEW_OPPORTUNITIES',
    'UNKNOWN'
]);
const NaturalLanguageIntentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    rawText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(0).max(500),
    confidence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).max(1),
    parsedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime()
});
const ParsedExecutionIntentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    action: IntentActionSchema,
    naturalLanguage: NaturalLanguageIntentSchema,
    amountMicroCC: MicroCCSchema.nullable(),
    minAmountMicroCC: MicroCCSchema.nullable(),
    maxSlippageBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nullable(),
    strategyFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(StrategyIdSchema).optional(),
    providerFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ProviderIdSchema).optional(),
    assetFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(AssetSymbolSchema).optional(),
    requireApproval: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    simulationOnly: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    parsedErrors: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([])
});
const PolicyTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'MAX_PER_TRADE',
    'MAX_DAILY',
    'APPROVAL_THRESHOLD',
    'STRATEGY_ALLOWLIST',
    'STRATEGY_DENYLIST',
    'ASSET_ALLOWLIST',
    'MAX_SLIPPAGE',
    'EXECUTION_MODE',
    'SIMULATION_ONLY'
]);
const BudgetPolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('MAX_PER_TRADE'),
    valueMicroCC: MicroCCSchema,
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(1)
});
const ExecutionPolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('MAX_DAILY'),
    valueMicroCC: MicroCCSchema,
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(2),
    currentUsageMicroCC: MicroCCSchema.default(0),
    windowStart: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable()
});
const ApprovalPolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('APPROVAL_THRESHOLD'),
    valueMicroCC: MicroCCSchema,
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(3)
});
const ProviderListPolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'STRATEGY_ALLOWLIST',
        'STRATEGY_DENYLIST'
    ]),
    providerIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ProviderIdSchema),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(4)
});
const AssetAllowlistPolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('ASSET_ALLOWLIST'),
    assetSymbols: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(AssetSymbolSchema),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(5)
});
const MaxSlippagePolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('MAX_SLIPPAGE'),
    valueBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(6)
});
const SimulationOnlyPolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('SIMULATION_ONLY'),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(7)
});
const ExecutionModePolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('EXECUTION_MODE'),
    value: ExecutionModeSchema,
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(0)
});
const PolicySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion('type', [
    BudgetPolicySchema,
    ExecutionPolicySchema,
    ApprovalPolicySchema,
    ProviderListPolicySchema,
    AssetAllowlistPolicySchema,
    MaxSlippagePolicySchema,
    SimulationOnlyPolicySchema,
    ExecutionModePolicySchema
]);
const ExecutionActionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'YIELD_FIND',
    'YIELD_EXECUTE',
    'BALANCE_CHECK',
    'POLICY_SET',
    'STRATEGY_ADD',
    'STRATEGY_REMOVE',
    'OPPORTUNITIES_LIST'
]);
const StepSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    stepId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    action: ExecutionActionSchema,
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    opportunityId: StrategyIdSchema.nullable(),
    amountInMicroCC: MicroCCSchema.nullable(),
    estimatedOutputMicroCC: MicroCCSchema.nullable(),
    estimatedFeesMicroCC: MicroCCSchema.nullable(),
    isSimulation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    skipped: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    skipReason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
});
const ExecutionPlanSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    intentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    steps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(StepSchema),
    totalEstimatedFeesMicroCC: MicroCCSchema,
    totalEstimatedOutputMicroCC: MicroCCSchema.nullable(),
    estimatedDurationMs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime()
});
const AttemptStatusSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'PENDING',
    'RUNNING',
    'APPROVED',
    'REJECTED',
    'COMPLETED',
    'FAILED',
    'CANCELLED'
]);
const ExecutionAttemptSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    intentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    planId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().nullable(),
    status: AttemptStatusSchema,
    stepsCompleted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().default(0),
    stepsTotal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int(),
    currentStepId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().nullable(),
    startedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable(),
    completedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
});
const ReceiptStatusSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'SUCCESS',
    'PARTIAL',
    'FAILED',
    'SIMULATED',
    'BLOCKED'
]);
const StepResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    stepId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    status: ReceiptStatusSchema,
    outputMicroCC: MicroCCSchema.nullable(),
    feesPaidMicroCC: MicroCCSchema.nullable(),
    slippageBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nullable(),
    txHash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    simulatedTxHash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    executedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable()
});
const ExecutionReceiptSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    attemptId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    intentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    status: ReceiptStatusSchema,
    stepResults: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(StepResultSchema),
    totalOutputMicroCC: MicroCCSchema.nullable(),
    totalFeesPaidMicroCC: MicroCCSchema.nullable(),
    policyDecision: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'APPROVED',
        'DENIED',
        'REQUIRES_APPROVAL'
    ]),
    policyReasons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
    blockedByPolicy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    simulationOnly: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    executedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime(),
    durationMs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int()
});
const RiskCheckTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'BALANCE_CHECK',
    'BUDGET_CAP_CHECK',
    'DAILY_LIMIT_CHECK',
    'APPROVAL_THRESHOLD_CHECK',
    'ALLOWLIST_CHECK',
    'DENYLIST_CHECK',
    'ASSET_ALLOWLIST_CHECK',
    'SLIPPAGE_CHECK',
    'SIMULATION_MODE_CHECK',
    'EXECUTION_MODE_CHECK',
    'VALIDITY_CHECK'
]);
const RiskVerdictSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'PASS',
    'FAIL',
    'WARN',
    'SKIP'
]);
const RiskCheckResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    checkType: RiskCheckTypeSchema,
    verdict: RiskVerdictSchema,
    reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    details: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()).optional(),
    blockedByPolicy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
});
const AuditEventTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'INTENT_PARSED',
    'POLICY_EVALUATED',
    'RISK_CHECK_COMPLETED',
    'EXECUTION_PLAN_CREATED',
    'EXECUTION_APPROVED',
    'EXECUTION_REJECTED',
    'EXECUTION_STARTED',
    'EXECUTION_COMPLETED',
    'EXECUTION_FAILED',
    'EXECUTION_CANCELLED',
    'POLICY_UPDATED',
    'WALLET_CONNECTED',
    'WALLET_DISCONNECTED',
    'AGENT_PLAN_GENERATED',
    'AGENT_EXPLAIN_GENERATED',
    'AGENT_REJECTED'
]);
const AuditEventSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    eventType: AuditEventTypeSchema,
    walletAddress: WalletAddressSchema.nullable(),
    intentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().nullable(),
    attemptId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().nullable(),
    policyId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().nullable(),
    payload: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()),
    simulated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime()
});
const PolicyEvaluationResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    intentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    decision: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'APPROVED',
        'DENIED',
        'REQUIRES_APPROVAL'
    ]),
    riskChecks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(RiskCheckResultSchema),
    blockedBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    blockedByPolicyId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().nullable(),
    reasons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
    warnings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    evaluatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime()
});
const DomainModels = {
    AssetSymbolSchema,
    ProviderIdSchema,
    StrategyIdSchema,
    WalletAddressSchema,
    MicroCCSchema,
    ExecutionModeSchema,
    UserWalletProfileSchema,
    ConnectedWalletStateSchema,
    AssetBalanceSchema,
    ExecutionSupportSchema,
    RiskLevelSchema,
    StrategyOpportunitySchema,
    StrategyQuoteSchema,
    IntentActionSchema,
    NaturalLanguageIntentSchema,
    ParsedExecutionIntentSchema,
    PolicyTypeSchema,
    BudgetPolicySchema,
    ExecutionPolicySchema,
    ApprovalPolicySchema,
    ProviderListPolicySchema,
    AssetAllowlistPolicySchema,
    MaxSlippagePolicySchema,
    SimulationOnlyPolicySchema,
    ExecutionModePolicySchema,
    PolicySchema,
    ExecutionActionSchema,
    StepSchema,
    ExecutionPlanSchema,
    AttemptStatusSchema,
    ExecutionAttemptSchema,
    ReceiptStatusSchema,
    StepResultSchema,
    ExecutionReceiptSchema,
    RiskCheckTypeSchema,
    RiskVerdictSchema,
    RiskCheckResultSchema,
    AuditEventTypeSchema,
    AuditEventSchema,
    PolicyEvaluationResultSchema
};

})()),
"[project]/packages/shared/src/constants.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Shared constants
__turbopack_esm__({
    "CURRENCY": ()=>CURRENCY,
    "DEFAULT_LIMITS": ()=>DEFAULT_LIMITS,
    "EXECUTION_MODE_LABELS": ()=>EXECUTION_MODE_LABELS,
    "PROVIDER_DISPLAY_NAMES": ()=>PROVIDER_DISPLAY_NAMES,
    "RISK_LABELS": ()=>RISK_LABELS,
    "SUPPORT_LABELS": ()=>SUPPORT_LABELS
});
const CURRENCY = {
    SYMBOL: 'CC',
    NAME: 'Canton Coin',
    DECIMALS: 6
};
const DEFAULT_LIMITS = {
    MAX_PER_TRADE_MICRO_CC: 20_000_000,
    APPROVAL_THRESHOLD_MICRO_CC: 10_000_000,
    MAX_DAILY_MICRO_CC: 100_000_000,
    DEFAULT_SLIPPAGE_BPS: 50,
    MAX_SLIPPAGE_BPS: 500,
    MIN_APPROVAL_THRESHOLD_MICRO_CC: 1_000_000
};
const EXECUTION_MODE_LABELS = {
    disabled: 'Disabled — no execution allowed',
    approval_required: 'Approval Required — confirm each trade',
    auto_execute: 'Auto Execute — run without confirmation'
};
const RISK_LABELS = {
    LOW: 'Low Risk',
    MEDIUM: 'Medium Risk',
    HIGH: 'High Risk',
    UNKNOWN: 'Unknown Risk'
};
const SUPPORT_LABELS = {
    real: 'Live Execution',
    simulated: 'Simulation Only',
    unsupported: 'Not Supported'
};
const PROVIDER_DISPLAY_NAMES = {
    'froburn': 'Froburn Protocol',
    'lace': 'Lace Finance',
    'cantonswap': 'CantonSwap',
    'fro-demo': 'Froburn (Demo)'
};

})()),
"[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
;

})()),
"[project]/packages/shared/src/index.ts [app-route] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$domain$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/shared/src/domain.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/shared/src/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/packages/agent-core/src/intent-parser.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Intent Parser — converts natural language to ParsedExecutionIntent
__turbopack_esm__({
    "intentSummary": ()=>intentSummary,
    "parseIntent": ()=>parseIntent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$domain$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/shared/src/domain.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
// ─── Keyword patterns ────────────────────────────────────────────────────────
const ACTION_PATTERNS = [
    {
        pattern: /cheapest\s+yield|best\s+yield|find\s+.*yield|highest\s+apr/i,
        action: 'FIND_YIELD',
        confidence: 0.88
    },
    {
        pattern: /yield.*up\s+to|yield.*max|yield.*no\s+more/i,
        action: 'FIND_YIELD',
        confidence: 0.82
    },
    {
        pattern: /\bbuy\b|\bpurchase\b|\bswap\b|\bexecute.*strategy/i,
        action: 'EXECUTE_STRATEGY',
        confidence: 0.8
    },
    {
        pattern: /strategy.*execute|execute.*strategy/i,
        action: 'EXECUTE_STRATEGY',
        confidence: 0.85
    },
    {
        pattern: /\bbalance\b|how\s+much|what.*have|check.*funds/i,
        action: 'CHECK_BALANCE',
        confidence: 0.9
    },
    {
        pattern: /set.*max|set.*limit|update.*policy|set.*policy/i,
        action: 'SET_POLICY',
        confidence: 0.85
    },
    {
        pattern: /add.*strategy|new.*strategy|whitelist.*strategy/i,
        action: 'ADD_STRATEGY',
        confidence: 0.8
    },
    {
        pattern: /remove.*strategy|delete.*strategy|unlist.*strategy/i,
        action: 'REMOVE_STRATEGY',
        confidence: 0.8
    },
    {
        pattern: /list.*opportunities|show.*yield|view.*strategies/i,
        action: 'VIEW_OPPORTUNITIES',
        confidence: 0.85
    }
];
const ASSET_PATTERNS = [
    {
        pattern: /\bCC\b|\bcanton\s*coin\b/i,
        asset: 'CC'
    },
    {
        pattern: /\bUSDC\b|\busdc\b/i,
        asset: 'USDC'
    },
    {
        pattern: /\bETH\b|\bethereum\b/i,
        asset: 'ETH'
    }
];
const PROVIDER_PATTERNS = [
    {
        pattern: /\bfroburn\b|\bfro\b/i,
        provider: 'froburn'
    },
    {
        pattern: /\blace\b/i,
        provider: 'lace'
    },
    {
        pattern: /\bcantonswap\b|\bcswap\b/i,
        provider: 'cantonswap'
    }
];
const AMOUNT_PATTERN = /(\d+(?:\.\d+)?)\s*(cc|CC)/;
const SLIPPAGE_PATTERN = /(\d+(?:\.\d+)?)\s*%(?:slippage)?/i;
const APPROVAL_SIGNAL = /require.*approval|need.*confirm|ask\s+me|confirm.*first/i;
const SIMULATION_SIGNAL = /\bsim(ulate)?\b|\bdemo\b|\btest\b/;
function extractAction(text) {
    for (const { pattern, action, confidence } of ACTION_PATTERNS){
        if (pattern.test(text)) return {
            action,
            confidence
        };
    }
    return {
        action: 'UNKNOWN',
        confidence: 0.3
    };
}
function extractAmount(text) {
    const match = text.match(AMOUNT_PATTERN);
    if (!match) return null;
    const amount = parseFloat(match[1]);
    if (isNaN(amount) || amount <= 0) return null;
    return Math.round(amount * 1_000_000); // convert to micro-CC
}
function extractSlippage(text) {
    const match = text.match(SLIPPAGE_PATTERN);
    if (!match) return null;
    const bps = Math.round(parseFloat(match[1]) * 100);
    return bps > 0 ? bps : null;
}
function extractAssets(text) {
    const found = new Set();
    for (const { asset } of ASSET_PATTERNS){
        if (asset === 'CC' && (/\bCC\b/.test(text) || /canton\s*coin/i.test(text))) {
            found.add('CC');
        } else if (ASSET_PATTERNS.find((p)=>p.asset === asset)?.pattern.test(text)) {
            found.add(asset);
        }
    }
    return Array.from(found);
}
function extractProviders(text) {
    const found = new Set();
    for (const { provider } of PROVIDER_PATTERNS){
        if (PROVIDER_PATTERNS.find((p)=>p.provider === provider)?.pattern.test(text)) {
            found.add(provider);
        }
    }
    return Array.from(found);
}
function extractMinMax(text) {
    const result = {};
    // "up to X" or "max X" or "no more than X"
    const maxMatch = text.match(/(?:up\s+to|max|no\s+more\s+than|under)\s*(\d+(?:\.\d+)?)/i);
    if (maxMatch) {
        result.max = Math.round(parseFloat(maxMatch[1]) * 1_000_000);
    }
    return result;
}
function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function parseIntent(text) {
    const errors = [];
    const trimmed = text.trim();
    if (!trimmed) {
        errors.push('Empty input');
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$domain$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParsedExecutionIntentSchema"].parse({
            id: generateId(),
            action: 'UNKNOWN',
            naturalLanguage: {
                rawText: '',
                confidence: 0,
                parsedAt: new Date().toISOString()
            },
            amountMicroCC: null,
            minAmountMicroCC: null,
            maxSlippageBps: null,
            strategyFilter: undefined,
            providerFilter: undefined,
            assetFilter: undefined,
            requireApproval: false,
            simulationOnly: false,
            parsedErrors: errors
        });
    }
    if (trimmed.length > 500) {
        errors.push('Input too long (max 500 characters)');
    }
    const { action, confidence } = extractAction(trimmed);
    const amountMicroCC = extractAmount(trimmed);
    const slippageBps = extractSlippage(trimmed);
    const assetFilter = extractAssets(trimmed);
    const providerFilter = extractProviders(trimmed);
    const { min: minAmountMicroCC, max: maxAmountMicroCC } = extractMinMax(trimmed);
    const requireApproval = APPROVAL_SIGNAL.test(trimmed);
    const simulationOnly = SIMULATION_SIGNAL.test(trimmed);
    if (action === 'UNKNOWN' && confidence < 0.5) {
        errors.push(`Could not determine intent with sufficient confidence (${(confidence * 100).toFixed(0)}%)`);
    }
    const finalAmount = maxAmountMicroCC ?? amountMicroCC;
    const nlIntent = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$domain$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NaturalLanguageIntentSchema"].parse({
        rawText: trimmed,
        confidence,
        parsedAt: new Date().toISOString()
    });
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$domain$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParsedExecutionIntentSchema"].parse({
        id: generateId(),
        action,
        naturalLanguage: nlIntent,
        amountMicroCC: finalAmount,
        minAmountMicroCC: minAmountMicroCC ?? null,
        maxSlippageBps: slippageBps,
        strategyFilter: providerFilter.length > 0 ? providerFilter : undefined,
        providerFilter: providerFilter.length > 0 ? providerFilter : undefined,
        assetFilter: assetFilter.length > 0 ? assetFilter : undefined,
        requireApproval,
        simulationOnly,
        parsedErrors: errors
    });
    return parsed;
}
function intentSummary(intent) {
    const parts = [];
    parts.push(`Action: ${intent.action}`);
    if (intent.amountMicroCC !== null) {
        parts.push(`Amount: ${(intent.amountMicroCC / 1_000_000).toFixed(2)} CC`);
    }
    if (intent.providerFilter?.length) {
        parts.push(`Providers: ${intent.providerFilter.join(', ')}`);
    }
    if (intent.assetFilter?.length) {
        parts.push(`Assets: ${intent.assetFilter.join(', ')}`);
    }
    if (intent.simulationOnly) {
        parts.push('Mode: Simulation only');
    }
    if (intent.requireApproval) {
        parts.push('Requires approval');
    }
    return parts.join(' | ');
}

})()),
"[project]/packages/agent-core/src/policy-engine.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Policy Engine — deterministic risk evaluation pipeline
__turbopack_esm__({
    "PolicyEngine": ()=>PolicyEngine,
    "policyEngine": ()=>policyEngine
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$domain$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/shared/src/domain.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/shared/src/constants.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function microCCToDisplay(n) {
    return (n / 1_000_000).toFixed(2);
}
class PolicyEngine {
    policies = [];
    setPolicies(policies) {
        this.policies = [
            ...policies
        ].sort((a, b)=>(a.priority ?? 99) - (b.priority ?? 99));
    }
    getPolicies() {
        return [
            ...this.policies
        ];
    }
    /**
   * Main entry point: evaluate an intent against current policies and wallet state.
   * Runs all risk checks in priority order and returns a deterministic decision.
   */ evaluate(intent, wallet) {
        const intentId = intent.id;
        const evaluatedAt = new Date().toISOString();
        const riskChecks = [];
        // 1. Validate intent structure
        riskChecks.push(this.checkIntentValidity(intent));
        // Short-circuit: if intent is invalid, deny
        if (riskChecks[0].verdict === 'FAIL') {
            return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
        }
        // 2. Check execution mode policy
        const execModeCheck = this.checkExecutionMode(intent);
        riskChecks.push(execModeCheck);
        if (execModeCheck.verdict === 'FAIL') {
            return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
        }
        // 3. Check simulation-only policy
        const simCheck = this.checkSimulationMode(intent);
        riskChecks.push(simCheck);
        // simulation-only is a WARN (allows sim) not a FAIL
        // 4. Check provider denylist
        if (intent.providerFilter) {
            const denyCheck = this.checkProviderDenyList(intent);
            riskChecks.push(denyCheck);
            if (denyCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
            }
        }
        // 5. Check provider allowlist
        if (intent.providerFilter) {
            const allowlistCheck = this.checkProviderAllowList(intent);
            riskChecks.push(allowlistCheck);
            if (allowlistCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
            }
        }
        // 6. Check asset allowlist
        if (intent.assetFilter && intent.assetFilter.length > 0) {
            const assetCheck = this.checkAssetAllowlist(intent);
            riskChecks.push(assetCheck);
            if (assetCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
            }
        }
        // 7. Check slippage
        if (intent.maxSlippageBps !== null) {
            const slippageCheck = this.checkSlippage(intent);
            riskChecks.push(slippageCheck);
            if (slippageCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
            }
        }
        // 8. Resolve amount and check balance
        if (intent.amountMicroCC !== null) {
            const balanceCheck = this.checkBalance(intent, wallet);
            riskChecks.push(balanceCheck);
            if (balanceCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
            }
            // 9. Check max per trade
            const tradeCapCheck = this.checkBudgetCap(intent);
            riskChecks.push(tradeCapCheck);
            if (tradeCapCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
            }
            // 10. Check daily limit
            const dailyCheck = this.checkDailyLimit(intent);
            riskChecks.push(dailyCheck);
            if (dailyCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'DENIED', riskChecks, evaluatedAt);
            }
            // 11. Check approval threshold
            const approvalCheck = this.checkApprovalThreshold(intent);
            riskChecks.push(approvalCheck);
            if (approvalCheck.verdict === 'FAIL') {
                return this.buildResult(intentId, 'REQUIRES_APPROVAL', riskChecks, evaluatedAt);
            }
        }
        // All checks passed → APPROVED
        return this.buildResult(intentId, 'APPROVED', riskChecks, evaluatedAt);
    }
    // ─── Individual risk checks ──────────────────────────────────────────────
    checkIntentValidity(intent) {
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$domain$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParsedExecutionIntentSchema"].safeParse(intent);
        if (!result.success) {
            return {
                checkType: 'VALIDITY_CHECK',
                verdict: 'FAIL',
                reason: `Intent validation failed: ${result.error.issues.map((i)=>i.message).join('; ')}`,
                blockedByPolicy: null
            };
        }
        if (!intent.action || intent.action === 'UNKNOWN') {
            return {
                checkType: 'VALIDITY_CHECK',
                verdict: 'FAIL',
                reason: 'Could not determine a valid action from the command.',
                blockedByPolicy: null
            };
        }
        return {
            checkType: 'VALIDITY_CHECK',
            verdict: 'PASS',
            reason: 'Intent structure is valid.',
            blockedByPolicy: null
        };
    }
    checkExecutionMode(intent) {
        const policy = this.findPolicy('EXECUTION_MODE');
        if (!policy || !policy.enabled) {
            return {
                checkType: 'EXECUTION_MODE_CHECK',
                verdict: 'PASS',
                reason: 'No execution mode policy active. Using default: approval required.',
                blockedByPolicy: null
            };
        }
        if (policy.value === 'disabled') {
            return {
                checkType: 'EXECUTION_MODE_CHECK',
                verdict: 'FAIL',
                reason: 'Execution is currently disabled by policy. No trades can be executed.',
                blockedByPolicy: policy.id
            };
        }
        return {
            checkType: 'EXECUTION_MODE_CHECK',
            verdict: 'PASS',
            reason: `Execution mode is set to "${policy.value}".`,
            blockedByPolicy: null
        };
    }
    checkSimulationMode(intent) {
        const policy = this.findPolicy('SIMULATION_ONLY');
        const simOnly = policy?.enabled ?? false;
        if (simOnly && !intent.simulationOnly) {
            // User wants to execute for real but sim-only is on
            return {
                checkType: 'SIMULATION_MODE_CHECK',
                verdict: 'WARN',
                reason: 'Simulation-only mode is active. Real execution is blocked.',
                blockedByPolicy: policy?.id ?? null
            };
        }
        if (intent.simulationOnly) {
            return {
                checkType: 'SIMULATION_MODE_CHECK',
                verdict: 'PASS',
                reason: 'Simulation-only requested. This will be a simulated run.',
                blockedByPolicy: null
            };
        }
        return {
            checkType: 'SIMULATION_MODE_CHECK',
            verdict: 'PASS',
            reason: 'Simulation mode is off. Real execution is permitted.',
            blockedByPolicy: null
        };
    }
    checkProviderDenyList(intent) {
        const policy = this.findPolicy('STRATEGY_DENYLIST');
        if (!policy || !policy.enabled) {
            return {
                checkType: 'DENYLIST_CHECK',
                verdict: 'PASS',
                reason: 'No denylist policy active.',
                blockedByPolicy: null
            };
        }
        const denied = intent.providerFilter?.filter((p)=>policy.providerIds.includes(p));
        if (denied && denied.length > 0) {
            return {
                checkType: 'DENYLIST_CHECK',
                verdict: 'FAIL',
                reason: `Requested provider(s) "${denied.join(', ')}" are on the denylist and cannot be used.`,
                blockedByPolicy: policy.id
            };
        }
        return {
            checkType: 'DENYLIST_CHECK',
            verdict: 'PASS',
            reason: 'No requested providers are on the denylist.',
            blockedByPolicy: null
        };
    }
    checkProviderAllowList(intent) {
        const policy = this.findPolicy('STRATEGY_ALLOWLIST');
        if (!policy || !policy.enabled) {
            return {
                checkType: 'ALLOWLIST_CHECK',
                verdict: 'PASS',
                reason: 'No allowlist policy active.',
                blockedByPolicy: null
            };
        }
        const requested = intent.providerFilter ?? [];
        const notAllowed = requested.filter((p)=>!policy.providerIds.includes(p));
        if (notAllowed.length > 0) {
            return {
                checkType: 'ALLOWLIST_CHECK',
                verdict: 'FAIL',
                reason: `Provider(s) "${notAllowed.join(', ')}" are not on the allowlist. Only ${policy.providerIds.join(', ')} are permitted.`,
                blockedByPolicy: policy.id
            };
        }
        return {
            checkType: 'ALLOWLIST_CHECK',
            verdict: 'PASS',
            reason: 'All requested providers are on the allowlist.',
            blockedByPolicy: null
        };
    }
    checkAssetAllowlist(intent) {
        const policy = this.findPolicy('ASSET_ALLOWLIST');
        if (!policy || !policy.enabled || policy.assetSymbols.length === 0) {
            return {
                checkType: 'ASSET_ALLOWLIST_CHECK',
                verdict: 'PASS',
                reason: 'No asset allowlist policy active.',
                blockedByPolicy: null
            };
        }
        const requested = intent.assetFilter ?? [];
        const notAllowed = requested.filter((a)=>!policy.assetSymbols.includes(a));
        if (notAllowed.length > 0) {
            return {
                checkType: 'ASSET_ALLOWLIST_CHECK',
                verdict: 'FAIL',
                reason: `Asset(s) "${notAllowed.join(', ')}" are not on the allowed asset list. Only ${policy.assetSymbols.join(', ')} may be used.`,
                blockedByPolicy: policy.id
            };
        }
        return {
            checkType: 'ASSET_ALLOWLIST_CHECK',
            verdict: 'PASS',
            reason: 'All requested assets are on the allowlist.',
            blockedByPolicy: null
        };
    }
    checkSlippage(intent) {
        const policy = this.findPolicy('MAX_SLIPPAGE');
        if (!policy || !policy.enabled) {
            return {
                checkType: 'SLIPPAGE_CHECK',
                verdict: 'PASS',
                reason: 'No max slippage policy active.',
                blockedByPolicy: null
            };
        }
        if (intent.maxSlippageBps !== null && intent.maxSlippageBps > policy.valueBps) {
            return {
                checkType: 'SLIPPAGE_CHECK',
                verdict: 'FAIL',
                reason: `Requested slippage of ${(intent.maxSlippageBps / 100).toFixed(2)}% exceeds your maximum of ${(policy.valueBps / 100).toFixed(2)}%.`,
                blockedByPolicy: policy.id
            };
        }
        return {
            checkType: 'SLIPPAGE_CHECK',
            verdict: 'PASS',
            reason: `Slippage of ${(intent.maxSlippageBps ?? 0) / 100}% is within the ${(policy.valueBps / 100).toFixed(2)}% limit.`,
            blockedByPolicy: null
        };
    }
    checkBalance(intent, wallet) {
        if (intent.amountMicroCC === null) {
            return {
                checkType: 'BALANCE_CHECK',
                verdict: 'PASS',
                reason: 'No amount specified; balance check not applicable.',
                blockedByPolicy: null
            };
        }
        const ccBalance = wallet.balances.find((b)=>b.asset === 'CC');
        const available = ccBalance?.available ?? 0;
        if (intent.amountMicroCC > available) {
            return {
                checkType: 'BALANCE_CHECK',
                verdict: 'FAIL',
                reason: `Insufficient balance. You have ${microCCToDisplay(available)} CC available but the request is for ${microCCToDisplay(intent.amountMicroCC)} CC.`,
                blockedByPolicy: null,
                details: {
                    available,
                    requested: intent.amountMicroCC
                }
            };
        }
        return {
            checkType: 'BALANCE_CHECK',
            verdict: 'PASS',
            reason: `Balance sufficient. ${microCCToDisplay(available)} CC available, ${microCCToDisplay(intent.amountMicroCC)} CC requested.`,
            blockedByPolicy: null,
            details: {
                available,
                requested: intent.amountMicroCC
            }
        };
    }
    checkBudgetCap(intent) {
        const policy = this.findPolicy('MAX_PER_TRADE');
        const maxPerTrade = policy?.valueMicroCC ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_LIMITS"].MAX_PER_TRADE_MICRO_CC;
        if (intent.amountMicroCC === null) {
            return {
                checkType: 'BUDGET_CAP_CHECK',
                verdict: 'PASS',
                reason: 'No amount specified; per-trade cap not applicable.',
                blockedByPolicy: null
            };
        }
        if (intent.amountMicroCC > maxPerTrade) {
            return {
                checkType: 'BUDGET_CAP_CHECK',
                verdict: 'FAIL',
                reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC exceeds your per-trade limit of ${microCCToDisplay(maxPerTrade)} CC.`,
                blockedByPolicy: policy?.id ?? null,
                details: {
                    maxPerTrade,
                    requested: intent.amountMicroCC
                }
            };
        }
        return {
            checkType: 'BUDGET_CAP_CHECK',
            verdict: 'PASS',
            reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC is within the per-trade limit of ${microCCToDisplay(maxPerTrade)} CC.`,
            blockedByPolicy: null,
            details: {
                maxPerTrade,
                requested: intent.amountMicroCC
            }
        };
    }
    checkDailyLimit(intent) {
        const policy = this.findPolicy('MAX_DAILY');
        if (!policy || !policy.enabled) {
            return {
                checkType: 'DAILY_LIMIT_CHECK',
                verdict: 'PASS',
                reason: 'No daily limit policy active.',
                blockedByPolicy: null
            };
        }
        if (intent.amountMicroCC === null) {
            return {
                checkType: 'DAILY_LIMIT_CHECK',
                verdict: 'PASS',
                reason: 'No amount specified; daily limit not applicable.',
                blockedByPolicy: null
            };
        }
        const effectiveWindowStart = policy.windowStart ? new Date(policy.windowStart) : new Date(Date.now() - 86_400_000); // default: last 24h
        const windowExpired = Date.now() - effectiveWindowStart.getTime() > 86_400_000;
        const currentUsage = windowExpired ? 0 : policy.currentUsageMicroCC ?? 0;
        const projectedUsage = currentUsage + intent.amountMicroCC;
        if (projectedUsage > policy.valueMicroCC) {
            return {
                checkType: 'DAILY_LIMIT_CHECK',
                verdict: 'FAIL',
                reason: `This trade would bring daily usage to ${microCCToDisplay(projectedUsage)} CC, which exceeds your daily limit of ${microCCToDisplay(policy.valueMicroCC)} CC. Current usage: ${microCCToDisplay(currentUsage)} CC.`,
                blockedByPolicy: policy.id,
                details: {
                    dailyLimit: policy.valueMicroCC,
                    currentUsage,
                    requested: intent.amountMicroCC,
                    projectedUsage
                }
            };
        }
        return {
            checkType: 'DAILY_LIMIT_CHECK',
            verdict: 'PASS',
            reason: `Daily usage after this trade would be ${microCCToDisplay(projectedUsage)} CC, within the ${microCCToDisplay(policy.valueMicroCC)} CC daily limit.`,
            blockedByPolicy: null,
            details: {
                dailyLimit: policy.valueMicroCC,
                currentUsage,
                requested: intent.amountMicroCC,
                projectedUsage
            }
        };
    }
    checkApprovalThreshold(intent) {
        const policy = this.findPolicy('APPROVAL_THRESHOLD');
        const threshold = policy?.valueMicroCC ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_LIMITS"].APPROVAL_THRESHOLD_MICRO_CC;
        if (intent.amountMicroCC === null) {
            return {
                checkType: 'APPROVAL_THRESHOLD_CHECK',
                verdict: 'PASS',
                reason: 'No amount specified; approval threshold not applicable.',
                blockedByPolicy: null
            };
        }
        if (intent.amountMicroCC > threshold) {
            return {
                checkType: 'APPROVAL_THRESHOLD_CHECK',
                verdict: 'FAIL',
                reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC exceeds the approval threshold of ${microCCToDisplay(threshold)} CC. This trade requires explicit confirmation.`,
                blockedByPolicy: policy?.id ?? null,
                details: {
                    threshold,
                    requested: intent.amountMicroCC
                }
            };
        }
        return {
            checkType: 'APPROVAL_THRESHOLD_CHECK',
            verdict: 'PASS',
            reason: `Amount ${microCCToDisplay(intent.amountMicroCC)} CC is at or below the approval threshold of ${microCCToDisplay(threshold)} CC.`,
            blockedByPolicy: null,
            details: {
                threshold,
                requested: intent.amountMicroCC
            }
        };
    }
    // ─── Helpers ──────────────────────────────────────────────────────────────
    findPolicy(type) {
        return this.policies.find((p)=>p.type === type && p.enabled);
    }
    buildResult(intentId, decision, riskChecks, evaluatedAt) {
        const failedCheck = riskChecks.find((c)=>c.verdict === 'FAIL');
        const warnings = riskChecks.filter((c)=>c.verdict === 'WARN').map((c)=>c.reason);
        const reasons = riskChecks.filter((c)=>c.verdict !== 'SKIP').map((c)=>c.reason);
        return {
            intentId,
            decision,
            riskChecks,
            blockedBy: failedCheck?.reason ?? null,
            blockedByPolicyId: failedCheck?.blockedByPolicy ?? null,
            reasons,
            warnings,
            evaluatedAt
        };
    }
}
const policyEngine = new PolicyEngine();

})()),
"[project]/packages/agent-core/src/utils.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Shared utilities for agent-core
// (Duplicated from apps/web/lib/utils.ts to avoid cross-package import issues)
__turbopack_esm__({
    "bpsToPercent": ()=>bpsToPercent,
    "formatAddress": ()=>formatAddress,
    "generateId": ()=>generateId,
    "microCCToDisplay": ()=>microCCToDisplay
});
function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function microCCToDisplay(n) {
    if (n === null) return 'N/A';
    return (n / 1_000_000).toFixed(2);
}
function bpsToPercent(bps) {
    return (bps / 100).toFixed(2);
}
function formatAddress(address, chars = 4) {
    if (!address) return 'Not connected';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

})()),
"[project]/packages/agent-core/src/llm/providers/openai-compatible.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// OpenAI-compatible LLM provider
// Works with OpenAI, Groq, Together, or any OpenAI-compatible REST endpoint.
// Configure via environment variables — no API key hardcoded.
__turbopack_esm__({
    "OpenAICompatibleService": ()=>OpenAICompatibleService
});
// ─── Helper: fetch wrapper ───────────────────────────────────────────────────
async function openaiFetch(baseUrl, path, apiKey, body) {
    const url = `${baseUrl.replace(/\/$/, '')}${path}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const text = await res.text().catch(()=>'unknown error');
        throw new Error(`OpenAI-compatible API error ${res.status}: ${text}`);
    }
    return res.json();
}
class OpenAICompatibleService {
    config;
    providerName;
    apiKey;
    baseUrl;
    defaultSystemPrompt;
    constructor(cfg){
        this.config = {
            model: cfg.model
        };
        this.providerName = 'openai-compatible';
        this.apiKey = cfg.apiKey;
        this.baseUrl = cfg.baseUrl;
        this.defaultSystemPrompt = cfg.defaultSystemPrompt ?? '';
    }
    static fromEnv() {
        const apiKey = process.env.LLM_API_KEY ?? process.env.OPENAI_API_KEY ?? '';
        const baseUrl = process.env.LLM_BASE_URL ?? process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
        const model = process.env.LLM_MODEL ?? process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
        if (!apiKey) return null;
        return new OpenAICompatibleService({
            apiKey,
            baseUrl,
            model,
            defaultSystemPrompt: 'You are a helpful crypto wallet assistant. Always respond with valid JSON when asked to structure output.'
        });
    }
    async complete(prompt, systemPrompt) {
        const msgs = [];
        if (systemPrompt ?? this.defaultSystemPrompt) {
            msgs.push({
                role: 'system',
                content: systemPrompt ?? this.defaultSystemPrompt
            });
        }
        msgs.push({
            role: 'user',
            content: prompt
        });
        const raw = await openaiFetch(this.baseUrl, '/chat/completions', this.apiKey, {
            model: this.config.model,
            messages: msgs,
            max_tokens: this.config.maxTokens ?? 1024,
            temperature: this.config.temperature ?? 0.3
        });
        return this._mapChoice(raw.choices[0]);
    }
    async chat(messages, systemPrompt) {
        const msgs = [];
        if (systemPrompt ?? this.defaultSystemPrompt) {
            msgs.push({
                role: 'system',
                content: systemPrompt ?? this.defaultSystemPrompt
            });
        }
        for (const m of messages){
            msgs.push({
                role: m.role,
                content: m.content,
                name: m.name
            });
        }
        const raw = await openaiFetch(this.baseUrl, '/chat/completions', this.apiKey, {
            model: this.config.model,
            messages: msgs,
            max_tokens: this.config.maxTokens ?? 1024,
            temperature: this.config.temperature ?? 0.3
        });
        return this._mapChoice(raw.choices[0]);
    }
    async structuredOutput(prompt, systemPrompt, outputSchema, maxRetries = 2) {
        const msgs = [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: `${prompt}\n\nYou must respond with ONLY valid JSON matching this schema. No markdown, no explanation.`
            }
        ];
        for(let attempt = 0; attempt <= maxRetries; attempt++){
            const raw = await openaiFetch(this.baseUrl, '/chat/completions', this.apiKey, {
                model: this.config.model,
                messages: msgs,
                max_tokens: this.config.maxTokens ?? 2048,
                temperature: this.config.temperature ?? 0.1,
                response_format: {
                    type: 'json_object'
                }
            });
            const choice = raw.choices[0];
            const content = choice.message.content ?? '';
            try {
                const parsed = outputSchema.safeParse(JSON.parse(content));
                if (parsed.success) return parsed.data;
                // On last attempt, throw
                if (attempt === maxRetries) {
                    throw new Error(`LLM output failed Zod validation: ${parsed.error.issues.map((i)=>i.message).join('; ')}`);
                }
                // Add error context and retry
                msgs.push({
                    role: 'assistant',
                    content
                });
                msgs.push({
                    role: 'user',
                    content: `Your previous JSON was invalid: ${parsed.error.issues.map((i)=>i.message).join('; ')}. Please respond with ONLY valid JSON.`
                });
            } catch (err) {
                // If JSON.parse failed, retry with correction prompt
                if (err instanceof SyntaxError) {
                    if (attempt === maxRetries) throw err;
                    msgs.push({
                        role: 'assistant',
                        content
                    });
                    msgs.push({
                        role: 'user',
                        content: `Your previous response was not valid JSON. Please respond with ONLY valid JSON, no other text.`
                    });
                    continue;
                }
                throw err;
            }
        }
        // Should not reach here
        throw new Error('structuredOutput: exhausted retries without result');
    }
    listTools() {
        return []; // Tools are defined at the agent level, not the service level
    }
    _mapChoice(choice) {
        const finishReason = choice.finish_reason;
        const toolCalls = choice.message.tool_calls?.map((tc)=>({
                toolName: tc.function.name,
                input: JSON.parse(tc.function.arguments),
                callId: tc.id
            }));
        return {
            content: choice.message.content ?? '',
            finishReason,
            toolCalls,
            usage: undefined
        };
    }
}

})()),
"[project]/packages/agent-core/src/llm/parser.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Structured-output parser — converts LLM responses into typed agent plan objects.
// All outputs pass through strict Zod validation.
// Malformed responses trigger fallback to rule-based parsing.
__turbopack_esm__({
    "AgentExplainResponseSchema": ()=>AgentExplainResponseSchema,
    "AgentPlanResponseSchema": ()=>AgentPlanResponseSchema,
    "InterpretedIntentSchema": ()=>InterpretedIntentSchema,
    "RecommendedPlanSchema": ()=>RecommendedPlanSchema,
    "ShortlistedOpportunitySchema": ()=>ShortlistedOpportunitySchema,
    "fallbackParse": ()=>fallbackParse,
    "validateStructuredOutput": ()=>validateStructuredOutput
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$intent$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/intent-parser.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const InterpretedIntentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    action: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'FIND_YIELD',
        'EXECUTE_STRATEGY',
        'CHECK_BALANCE',
        'SET_POLICY',
        'ADD_STRATEGY',
        'REMOVE_STRATEGY',
        'VIEW_OPPORTUNITIES',
        'UNKNOWN'
    ]),
    confidence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).max(1),
    amountMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    maxSlippageBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    providerFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).nullable().default(null),
    assetFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).nullable().default(null),
    requireApproval: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    simulationOnly: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    riskTolerance: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'low',
        'medium',
        'high'
    ]).nullable().default(null),
    executionPreference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'preview',
        'execute'
    ]).default('preview')
});
const ShortlistedOpportunitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    rank: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    providerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    strategyName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    aprPercent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    aprBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    riskLevel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'LOW',
        'MEDIUM',
        'HIGH',
        'UNKNOWN'
    ]),
    executionSupport: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    isWhitelisted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    liquidityMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    minAmountMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    slippageToleranceBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    estimatedOutputMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    estimatedExecutionCostMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    expiry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const RecommendedPlanSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    step: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    action: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    opportunityId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    amountMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    estimatedOutputMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    estimatedExecutionCostMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    isSimulation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
});
const AgentPlanResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    interpretedIntent: InterpretedIntentSchema,
    walletSnapshotSummary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        totalBalanceMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        dailyUsageMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        dailyLimitMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        canExecuteReal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        simulationOnly: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
    }),
    shortlistedOpportunities: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ShortlistedOpportunitySchema),
    recommendedPlan: RecommendedPlanSchema,
    whyThisPlan: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    policyVerdict: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        decision: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            'APPROVED',
            'DENIED',
            'REQUIRES_APPROVAL'
        ]),
        blockedBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
        passedChecks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
        failedChecks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string())
    }),
    nextAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'preview_only',
        'request_approval',
        'execute',
        'blocked'
    ]),
    disclaimer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('This is a simulated preview. No real transaction will be executed.'),
    isSimulated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
    isBasedOnSeededData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
});
const AgentExplainResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    whatWillHappen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    whatCouldGoWrong: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    alternativeOptions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    policyConstraints: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    disclaimer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('This is a simulated preview. No real transaction will be executed.'),
    isSimulated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
});
function fallbackParse(text) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$intent$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseIntent"])(text);
    const riskToleranceMap = {
        low: 'low',
        medium: 'medium',
        high: 'high'
    };
    // Very rough heuristic: if the text contains "low risk" or "safe", assume low
    const risk = /\b(low\s+risk|very\s+safe|conservative)\b/i.test(text) ? 'low' : /\b(high\s+risk|aggressive)\b/i.test(text) ? 'high' : null;
    // Preview vs execute: "show me what you would do", "preview", "simulate" → preview
    const execPref = /\b(preview|show\s+me|what\s+you\s+would|simulate|demo)\b/i.test(text) ? 'preview' : 'execute';
    return {
        interpretedIntent: {
            action: parsed.action,
            confidence: parsed.naturalLanguage.confidence,
            amountMicroCC: parsed.amountMicroCC,
            maxSlippageBps: parsed.maxSlippageBps,
            providerFilter: parsed.providerFilter ?? null,
            assetFilter: parsed.assetFilter ?? null,
            requireApproval: parsed.requireApproval,
            simulationOnly: parsed.simulationOnly,
            riskTolerance: risk ?? riskToleranceMap[parsed.action] ?? null,
            executionPreference: execPref
        },
        fallback: true
    };
}
function validateStructuredOutput(rawContent, schema, fallbackFn) {
    try {
        const parsed = schema.safeParse(JSON.parse(rawContent));
        if (parsed.success) {
            return {
                data: parsed.data,
                valid: true,
                fallback: false
            };
        }
        return {
            data: null,
            valid: false,
            fallback: false,
            rawContent,
            error: parsed.error.issues.map((i)=>`${i.path.join('.')}: ${i.message}`).join('; ')
        };
    } catch (err) {
        // JSON parse failed
        if (fallbackFn) {
            try {
                const fallbackData = fallbackFn(rawContent);
                const validated = schema.safeParse(fallbackData);
                if (validated.success) {
                    return {
                        data: validated.data,
                        valid: true,
                        fallback: true
                    };
                }
            } catch  {
            // fallback also failed
            }
        }
        return {
            data: null,
            valid: false,
            fallback: false,
            rawContent,
            error: err instanceof Error ? err.message : 'Unknown parse error'
        };
    }
}

})()),
"[project]/packages/agent-core/src/llm/tools.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Tool functions the AI agent can call.
// Each tool is a pure function: input → serializable output.
// Tools never execute transactions — they only read data and compute previews.
__turbopack_esm__({
    "buildExecutionPreview": ()=>buildExecutionPreview,
    "evaluatePolicy": ()=>evaluatePolicy,
    "filterOpportunities": ()=>filterOpportunities,
    "getWalletSnapshot": ()=>getWalletSnapshot,
    "listSeededOpportunities": ()=>listSeededOpportunities
});
// ─── Sanitization helpers ────────────────────────────────────────────────────
const DANGEROUS_CHARS = /[<>'"&;\\]/g;
const MAX_STRING_LEN = 500;
function sanitizeString(s) {
    if (typeof s !== 'string') return '';
    return s.replace(DANGEROUS_CHARS, '').slice(0, MAX_STRING_LEN).trim();
}
function sanitizeArrayOfStrings(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(sanitizeString).filter(Boolean);
}
function getWalletSnapshot(_input, wallet, policies) {
    const dailyPolicy = policies.find((p)=>p.type === 'MAX_DAILY');
    const simPolicy = policies.find((p)=>p.type === 'SIMULATION_ONLY');
    const totalBalanceMicroCC = wallet.balances.reduce((sum, b)=>sum + b.total, 0);
    return {
        address: sanitizeString(wallet.address),
        isConnected: Boolean(wallet.isConnected),
        isDemo: Boolean(wallet.isDemo),
        totalBalanceMicroCC,
        balances: wallet.balances.map((b)=>({
                asset: sanitizeString(b.asset),
                available: b.available,
                locked: b.locked,
                total: b.total
            })),
        dailyUsageMicroCC: dailyPolicy?.currentUsageMicroCC ?? 0,
        dailyLimitMicroCC: dailyPolicy?.valueMicroCC ?? 100_000_000,
        lastSyncedAt: wallet.lastSyncedAt ?? null,
        canExecuteReal: wallet.isConnected && !wallet.isDemo,
        simulationOnly: simPolicy?.enabled ?? false
    };
}
function listSeededOpportunities(input, opportunities) {
    const sanitizedInput = {
        limit: typeof input.limit === 'number' ? Math.min(Math.max(1, input.limit), 20) : 10,
        minAprBps: typeof input.minAprBps === 'number' ? Math.max(0, input.minAprBps) : 0,
        maxRiskLevel: sanitizeString(input.maxRiskLevel)
    };
    const riskOrder = [
        'LOW',
        'MEDIUM',
        'HIGH',
        'UNKNOWN'
    ];
    const maxRiskIdx = sanitizedInput.maxRiskLevel ? riskOrder.indexOf(sanitizedInput.maxRiskLevel.toUpperCase()) : riskOrder.length;
    return opportunities.filter((o)=>{
        if (o.aprBps < sanitizedInput.minAprBps) return false;
        const riskIdx = riskOrder.indexOf(o.riskLevel);
        return riskIdx <= maxRiskIdx;
    }).sort((a, b)=>b.aprBps - a.aprBps) // best yield first
    .slice(0, sanitizedInput.limit).map((o)=>({
            id: sanitizeString(o.id),
            provider: sanitizeString(o.provider),
            providerName: sanitizeString(o.providerName),
            strategyName: sanitizeString(o.strategyName),
            assetIn: sanitizeString(o.assetIn),
            assetOut: sanitizeString(o.assetOut),
            aprBps: o.aprBps,
            aprPercent: o.aprBps / 100,
            feesBps: o.feesBps,
            riskLevel: o.riskLevel,
            riskScore: o.riskScore,
            minAmountMicroCC: o.minAmountMicroCC,
            estimatedExecutionCostMicroCC: o.estimatedExecutionCostMicroCC,
            slippageToleranceBps: o.slippageToleranceBps,
            executionSupport: o.executionSupport,
            isWhitelisted: o.isWhitelisted,
            liquidityMicroCC: o.liquidityMicroCC,
            expiry: o.expiresAt ?? null
        }));
}
function filterOpportunities(input, opportunities) {
    const sanitized = {
        providers: sanitizeArrayOfStrings(input.providers),
        riskLevels: sanitizeArrayOfStrings(input.riskLevels).map((r)=>r.toUpperCase()),
        minAprBps: typeof input.minAprBps === 'number' ? Math.max(0, input.minAprBps) : 0,
        minLiquidityMicroCC: typeof input.minLiquidityMicroCC === 'number' ? Math.max(0, input.minLiquidityMicroCC) : 0,
        executionSupport: sanitizeString(input.executionSupport),
        assetIn: sanitizeString(input.assetIn),
        assetOut: sanitizeString(input.assetOut),
        limit: typeof input.limit === 'number' ? Math.min(Math.max(1, input.limit), 20) : 10
    };
    return opportunities.filter((o)=>{
        if (sanitized.providers?.length && !sanitized.providers.includes(o.provider)) return false;
        if (sanitized.riskLevels?.length && !sanitized.riskLevels.includes(o.riskLevel)) return false;
        if (o.aprBps < (sanitized.minAprBps ?? 0)) return false;
        if (o.liquidityMicroCC < (sanitized.minLiquidityMicroCC ?? 0)) return false;
        if (sanitized.executionSupport && o.executionSupport !== sanitized.executionSupport) return false;
        if (sanitized.assetIn && o.assetIn !== sanitized.assetIn) return false;
        if (sanitized.assetOut && o.assetOut !== sanitized.assetOut) return false;
        return true;
    }).sort((a, b)=>b.aprBps - a.aprBps).slice(0, sanitized.limit ?? 10).map((o)=>({
            id: sanitizeString(o.id),
            provider: sanitizeString(o.provider),
            providerName: sanitizeString(o.providerName),
            strategyName: sanitizeString(o.strategyName),
            assetIn: sanitizeString(o.assetIn),
            assetOut: sanitizeString(o.assetOut),
            aprBps: o.aprBps,
            aprPercent: o.aprBps / 100,
            feesBps: o.feesBps,
            riskLevel: o.riskLevel,
            riskScore: o.riskScore,
            minAmountMicroCC: o.minAmountMicroCC,
            estimatedExecutionCostMicroCC: o.estimatedExecutionCostMicroCC,
            slippageToleranceBps: o.slippageToleranceBps,
            executionSupport: o.executionSupport,
            isWhitelisted: o.isWhitelisted,
            liquidityMicroCC: o.liquidityMicroCC,
            expiry: o.expiresAt ?? null
        }));
}
function evaluatePolicy(input, engine, intent, wallet) {
    const result = engine.evaluate(intent, wallet);
    return {
        intentSummary: buildIntentSummary(intent),
        decision: result.decision,
        blockedBy: result.blockedBy,
        riskChecks: result.riskChecks.map((c)=>({
                checkType: c.checkType,
                verdict: c.verdict,
                reason: c.reason
            })),
        warnings: result.warnings,
        reasons: result.reasons
    };
}
function buildExecutionPreview(_input, simulationOnly) {
    const { opportunity, amountMicroCC } = _input;
    const estimatedOutputMicroCC = amountMicroCC > 0 && opportunity.estimatedExecutionCostMicroCC > 0 ? Math.floor(amountMicroCC * (1 + opportunity.aprBps / 10000 / 365)) : null;
    const estimatedFeesMicroCC = opportunity.estimatedExecutionCostMicroCC ?? 5000;
    const netYieldMicroCC = estimatedOutputMicroCC !== null ? estimatedOutputMicroCC - amountMicroCC - estimatedFeesMicroCC : null;
    const warnings = [];
    if (opportunity.riskLevel === 'HIGH') warnings.push('This strategy is high risk.');
    if (!opportunity.isWhitelisted) warnings.push('This provider is not on your whitelist.');
    if (opportunity.executionSupport !== 'real') warnings.push('This strategy only supports simulated execution.');
    return {
        estimatedOutputMicroCC,
        estimatedFeesMicroCC,
        netYieldMicroCC,
        effectiveAprPercent: estimatedOutputMicroCC !== null ? netYieldMicroCC / amountMicroCC * 365 * 100 : null,
        breakEvenTimeSeconds: null,
        isSimulation: simulationOnly || opportunity.executionSupport !== 'real',
        slippageBps: opportunity.slippageToleranceBps,
        gasEstimateMicroCC: 5000,
        warnings
    };
}
// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildIntentSummary(intent) {
    const parts = [
        intent.action
    ];
    if (intent.amountMicroCC !== null) {
        parts.push(`${(intent.amountMicroCC / 1_000_000).toFixed(2)} CC`);
    }
    if (intent.providerFilter?.length) {
        parts.push(`providers: ${intent.providerFilter.join(', ')}`);
    }
    if (intent.assetFilter?.length) {
        parts.push(`assets: ${intent.assetFilter.join(', ')}`);
    }
    if (intent.simulationOnly) parts.push('simulation-only');
    return parts.join(' | ');
}

})()),
"[project]/packages/agent-core/src/llm/safety.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Safety features — sanitization, disallowed action rejection, audit logging.
__turbopack_esm__({
    "checkBudgetOvershoot": ()=>checkBudgetOvershoot,
    "checkDisallowedAction": ()=>checkDisallowedAction,
    "checkRequestedProviders": ()=>checkRequestedProviders,
    "createAuditEntry": ()=>createAuditEntry,
    "logSafetyEvent": ()=>logSafetyEvent,
    "sanitizeUserInput": ()=>sanitizeUserInput,
    "setAuditLogger": ()=>setAuditLogger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/utils.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
// ─── Input sanitization ──────────────────────────────────────────────────────
const DANGEROUS_CHARS = /[<>'"`&;\\$]/g;
const MAX_INPUT_LEN = 500;
function sanitizeUserInput(raw) {
    if (typeof raw !== 'string') return '';
    return raw.replace(DANGEROUS_CHARS, '').slice(0, MAX_INPUT_LEN).trim();
}
// ─── Disallowed action types ──────────────────────────────────────────────────
const ALWAYS_DISALLOWED = new Set([
    'WALLET_DRAIN',
    'TRANSFER_TO_UNKNOWN',
    'APPROVE_UNLIMITED',
    'SET_AUTHORITY'
]);
const DISALLOWED_PATTERNS = [
    /transfer.*all.*tokens/i,
    /drain.*wallet/i,
    /approve.*unlimited/i,
    /set.*owner.*address/i,
    /change.*admin.*key/i
];
function checkDisallowedAction(text) {
    const normalized = text.toLowerCase();
    // Check explicit disallowed action types
    for (const action of ALWAYS_DISALLOWED){
        if (normalized.includes(action.toLowerCase())) {
            return {
                rejected: true,
                reason: `Action "${action}" is not supported and will never be executed.`
            };
        }
    }
    // Check dangerous patterns
    for (const pattern of DISALLOWED_PATTERNS){
        if (pattern.test(text)) {
            return {
                rejected: true,
                reason: 'This request matches a pattern that is not permitted by the safety policy.'
            };
        }
    }
    return {
        rejected: false,
        reason: null
    };
}
// ─── Unsupported provider rejection ─────────────────────────────────────────
const KNOWN_PROVIDERS = new Set([
    'froburn',
    'lace',
    'cantonswap'
]);
function checkRequestedProviders(text) {
    const mentioned = [];
    // Look for provider names in the input
    const providerKeywords = [
        'froburn',
        'lace',
        'cantonswap',
        'fro',
        'cswap'
    ];
    for (const kw of providerKeywords){
        if (text.toLowerCase().includes(kw)) {
            // Map to canonical provider names
            if (kw === 'fro' || kw === 'froburn') mentioned.push('froburn');
            else if (kw === 'lace') mentioned.push('lace');
            else if (kw === 'cswap' || kw === 'cantonswap') mentioned.push('cantonswap');
        }
    }
    // Unknown providers (not in the seeded list) should be flagged
    const unknown = mentioned.filter((p)=>!KNOWN_PROVIDERS.has(p));
    if (unknown.length > 0) {
        return {
            rejected: true,
            requestedProviders: unknown,
            reason: `Provider(s) "${unknown.join(', ')}" are not supported. Known providers: ${[
                ...KNOWN_PROVIDERS
            ].join(', ')}.`
        };
    }
    return {
        rejected: false,
        requestedProviders: mentioned,
        reason: null
    };
}
function checkBudgetOvershoot(intent, defaultLimitMicroCC) {
    const limit = defaultLimitMicroCC;
    if (intent.amountMicroCC === null) {
        return {
            overshoot: false,
            requestedMicroCC: null,
            limitMicroCC: limit,
            reason: null
        };
    }
    if (intent.amountMicroCC > limit) {
        return {
            overshoot: true,
            requestedMicroCC: intent.amountMicroCC,
            limitMicroCC: limit,
            reason: `Requested amount of ${(intent.amountMicroCC / 1_000_000).toFixed(2)} CC exceeds the maximum per-trade limit of ${(limit / 1_000_000).toFixed(2)} CC.`
        };
    }
    return {
        overshoot: false,
        requestedMicroCC: intent.amountMicroCC,
        limitMicroCC: limit,
        reason: null
    };
}
class ConsoleAuditLogger {
    log(event) {
        // Only log in non-production or when explicitly enabled
        if (("TURBOPACK compile-time value", "development") === 'production' && !process.env.AI_AUDIT_LOG_ENABLED) return;
        const prefix = '[AI-AUDIT]';
        const emoji = event.eventType === 'AGENT_REJECTED' || event.eventType === 'AGENT_DISALLOWED_ACTION' ? '🔴' : event.llmParseFallback ? '🟡' : '✅';
        console.info(`${prefix} ${emoji} ${event.eventType}`, {
            input: event.sanitizedInput.slice(0, 80),
            wallet: event.walletAddress ?? 'none',
            simulated: event.isSimulated,
            policyDecision: event.policyDecision,
            fallback: event.llmParseFallback,
            disallowedReason: event.disallowedReason
        });
    }
}
// Singleton audit logger
let _auditLogger = new ConsoleAuditLogger();
function setAuditLogger(logger) {
    _auditLogger = logger;
}
function createAuditEntry(eventType, params) {
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
        eventType,
        userInput: params.userInput.slice(0, MAX_INPUT_LEN),
        sanitizedInput: sanitizeUserInput(params.userInput),
        walletAddress: params.walletAddress,
        intentId: params.intentId,
        isSimulated: params.isSimulated,
        isBasedOnSeededData: params.isBasedOnSeededData,
        llmParseFailed: params.llmParseFailed,
        llmParseFallback: params.llmParseFallback,
        policyDecision: params.policyDecision,
        disallowedReason: params.disallowedReason,
        overshootReason: params.overshootReason,
        errorMessage: params.errorMessage,
        createdAt: new Date().toISOString()
    };
}
function logSafetyEvent(eventType, params) {
    const entry = createAuditEntry(eventType, params);
    _auditLogger.log(entry);
}

})()),
"[project]/packages/agent-core/src/agent.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Agent Orchestrator — coordinates LLM, tools, and policy engine.
// This is the main entry point for the AI agent layer.
__turbopack_esm__({
    "AgentOrchestrator": ()=>AgentOrchestrator,
    "agentOrchestrator": ()=>agentOrchestrator
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$policy$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/policy-engine.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/shared/src/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$providers$2f$openai$2d$compatible$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/llm/providers/openai-compatible.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/llm/parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/llm/tools.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/llm/safety.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
// ─── System prompt ───────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the Canton AI Wallet Agent. Your role is to help users interact safely with their crypto wallet using natural language.

IMPORTANT SAFETY RULES you must follow:
1. NEVER suggest or plan a transaction that drains a wallet or transfers tokens to an unknown address.
2. NEVER mention or suggest actions involving changing admin keys, owners, or contract authorities.
3. Only use known, seeded providers: froburn, lace, cantonswap.
4. If a user requests a disallowed action, explain that it is not supported and offer alternatives.
5. Always respect the user's budget constraints and policy settings.
6. If the user asks to "preview", "show", or "simulate" — never auto-execute. Return a preview only.
7. Be transparent: if you are using simulated market data, say so clearly.

Your output must always be valid JSON matching the requested schema. Never include markdown fences or extra text outside the JSON.`.trim();
class AgentOrchestrator {
    llm = null;
    opportunities = [];
    policies = [];
    wallet = null;
    isSimulated = true;
    /**
   * Configure the LLM service. If not called, falls back to rule-based parsing.
   */ configure(llm) {
        this.llm = llm;
    }
    /**
   * Configure with OpenAI-compatible service from environment variables.
   * Returns false if no API key is set.
   */ configureFromEnv() {
        const svc = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$providers$2f$openai$2d$compatible$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAICompatibleService"].fromEnv();
        if (!svc) return false;
        this.llm = svc;
        return true;
    }
    /**
   * Set current opportunities from the DB.
   */ setOpportunities(opportunities) {
        this.opportunities = opportunities;
    }
    /**
   * Set current policies from the DB.
   */ setPolicies(policies) {
        this.policies = policies;
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$policy$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["policyEngine"].setPolicies(policies);
    }
    /**
   * Set current wallet state.
   */ setWallet(wallet) {
        this.wallet = wallet;
        this.isSimulated = wallet.isDemo || !wallet.isConnected;
    }
    getSimulationFlag() {
        return this.isSimulated;
    }
    // ── Generate plan ────────────────────────────────────────────────────────
    async generatePlan(userText) {
        const sanitized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeUserInput"])(userText);
        const intentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])();
        // Safety checks first
        const disallowedCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkDisallowedAction"])(sanitized);
        if (disallowedCheck.rejected) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSafetyEvent"])('AGENT_DISALLOWED_ACTION', {
                userInput: userText,
                walletAddress: this.wallet?.address ?? null,
                intentId,
                isSimulated: this.isSimulated,
                isBasedOnSeededData: true,
                llmParseFailed: false,
                llmParseFallback: false,
                policyDecision: null,
                disallowedReason: disallowedCheck.reason,
                overshootReason: null,
                errorMessage: null
            });
            const fallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackParse"])(sanitized);
            const rejectionPlan = this._buildRejectionPlan(sanitized, fallback.interpretedIntent, intentId, disallowedCheck.reason);
            return {
                plan: rejectionPlan,
                intentId,
                llmParseFallback: false
            };
        }
        // Build wallet snapshot
        const snapshot = this.wallet ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWalletSnapshot"])({}, this.wallet, this.policies) : this._emptySnapshot();
        // Try LLM if configured
        let interpretedIntent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fallbackParse"])(sanitized).interpretedIntent;
        let llmParseFallback = true;
        if (this.llm) {
            try {
                const llmResult = await this._callLlmForIntent(sanitized);
                if (llmResult.valid) {
                    interpretedIntent = llmResult.data;
                    llmParseFallback = false;
                }
            } catch (err) {
                // LLM failed — log and continue with fallback
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSafetyEvent"])('AGENT_PARSE_FAILED', {
                    userInput: userText,
                    walletAddress: this.wallet?.address ?? null,
                    intentId,
                    isSimulated: this.isSimulated,
                    isBasedOnSeededData: true,
                    llmParseFailed: true,
                    llmParseFallback: true,
                    policyDecision: null,
                    disallowedReason: null,
                    overshootReason: null,
                    errorMessage: err instanceof Error ? err.message : String(err)
                });
            }
        }
        // Build execution intent for policy engine
        const execIntent = this._buildExecutionIntent(interpretedIntent, intentId);
        // Evaluate against policy engine
        const policyResult = this.wallet ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$policy$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["policyEngine"].evaluate(execIntent, this.wallet) : this._noWalletVerdict(execIntent);
        // Budget overshoot warning
        const overshoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkBudgetOvershoot"])(execIntent, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_LIMITS"].MAX_PER_TRADE_MICRO_CC);
        if (overshoot.overshoot) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSafetyEvent"])('AGENT_BUDGET_OVERSHOOT', {
                userInput: userText,
                walletAddress: this.wallet?.address ?? null,
                intentId,
                isSimulated: this.isSimulated,
                isBasedOnSeededData: true,
                llmParseFailed: false,
                llmParseFallback,
                policyDecision: policyResult.decision,
                disallowedReason: null,
                overshootReason: overshoot.reason,
                errorMessage: null
            });
        }
        // Get shortlisted opportunities
        const shortlisted = this._shortlistOpportunities(interpretedIntent);
        // Build recommended plan
        const recommendedPlan = this._buildRecommendedPlan(interpretedIntent, shortlisted, execIntent);
        // Determine next action
        const nextAction = this._determineNextAction(policyResult, interpretedIntent);
        // Build disclaimer
        const disclaimer = this.isSimulated ? '⚠️ Simulated preview — no real transaction will be executed. Market data is from seeded opportunities, not live data.' : 'This plan is based on live market data. Confirm to execute.';
        const plan = {
            interpretedIntent,
            walletSnapshotSummary: snapshot,
            shortlistedOpportunities: shortlisted,
            recommendedPlan,
            whyThisPlan: this._buildWhyThisPlan(interpretedIntent, shortlisted, policyResult),
            policyVerdict: {
                decision: policyResult.decision,
                blockedBy: policyResult.blockedBy,
                passedChecks: policyResult.riskChecks.filter((c)=>c.verdict === 'PASS' || c.verdict === 'WARN').map((c)=>c.checkType),
                failedChecks: policyResult.riskChecks.filter((c)=>c.verdict === 'FAIL').map((c)=>c.checkType)
            },
            nextAction,
            disclaimer,
            isSimulated: this.isSimulated,
            isBasedOnSeededData: this.opportunities.length > 0 && !this._hasLiveOpportunities()
        };
        // Log audit event
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSafetyEvent"])('AGENT_PLAN_GENERATED', {
            userInput: userText,
            walletAddress: this.wallet?.address ?? null,
            intentId,
            isSimulated: this.isSimulated,
            isBasedOnSeededData: plan.isBasedOnSeededData,
            llmParseFailed: false,
            llmParseFallback,
            policyDecision: policyResult.decision,
            disallowedReason: null,
            overshootReason: overshoot.overshoot ? overshoot.reason : null,
            errorMessage: null
        });
        return {
            plan,
            intentId,
            llmParseFallback
        };
    }
    // ── Generate explanation ─────────────────────────────────────────────────
    async generateExplain(userText) {
        const sanitized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeUserInput"])(userText);
        const intentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])();
        const disallowedCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkDisallowedAction"])(sanitized);
        if (disallowedCheck.rejected) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSafetyEvent"])('AGENT_REJECTED', {
                userInput: userText,
                walletAddress: this.wallet?.address ?? null,
                intentId,
                isSimulated: this.isSimulated,
                isBasedOnSeededData: true,
                llmParseFailed: false,
                llmParseFallback: false,
                policyDecision: null,
                disallowedReason: disallowedCheck.reason,
                overshootReason: null,
                errorMessage: null
            });
            return {
                explanation: {
                    summary: sanitized,
                    whatWillHappen: 'This request cannot be processed.',
                    whatCouldGoWrong: [
                        disallowedCheck.reason ?? 'Disallowed action type.'
                    ],
                    alternativeOptions: [],
                    policyConstraints: [],
                    disclaimer: 'No real transaction will be executed.',
                    isSimulated: true
                },
                intentId
            };
        }
        const { plan } = await this.generatePlan(sanitized);
        const whatCouldGoWrong = [];
        if (plan.policyVerdict.decision === 'DENIED') {
            whatCouldGoWrong.push(`Policy blocked: ${plan.policyVerdict.blockedBy}`);
        }
        if (plan.shortlistedOpportunities.some((o)=>o.riskLevel === 'HIGH')) {
            whatCouldGoWrong.push('High-risk strategies are included in results — review carefully.');
        }
        if (plan.isSimulated) {
            whatCouldGoWrong.push('Execution is simulated — no real on-chain effect.');
        }
        const explanation = {
            summary: sanitized,
            whatWillHappen: this._buildWhatWillHappen(plan),
            whatCouldGoWrong,
            alternativeOptions: plan.shortlistedOpportunities.slice(1, 3).map((o)=>`${o.strategyName} via ${o.providerName} at ${o.aprPercent.toFixed(2)}% APR`),
            policyConstraints: plan.policyVerdict.passedChecks.map((c)=>`✓ ${c.replace(/_/g, ' ')}`),
            disclaimer: plan.disclaimer,
            isSimulated: plan.isSimulated
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSafetyEvent"])('AGENT_EXPLAIN_GENERATED', {
            userInput: userText,
            walletAddress: this.wallet?.address ?? null,
            intentId,
            isSimulated: this.isSimulated,
            isBasedOnSeededData: plan.isBasedOnSeededData,
            llmParseFailed: false,
            llmParseFallback: false,
            policyDecision: plan.policyVerdict.decision,
            disallowedReason: null,
            overshootReason: null,
            errorMessage: null
        });
        return {
            explanation,
            intentId
        };
    }
    // ── Private helpers ─────────────────────────────────────────────────────
    async _callLlmForIntent(text) {
        if (!this.llm) return {
            valid: false,
            data: null
        };
        const result = await this.llm.structuredOutput(text, SYSTEM_PROMPT, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InterpretedIntentSchema"], 2);
        return {
            valid: true,
            data: result
        };
    }
    _buildExecutionIntent(interpretedIntent, intentId) {
        return {
            id: intentId,
            action: interpretedIntent.action,
            naturalLanguage: {
                rawText: '',
                confidence: interpretedIntent.confidence,
                parsedAt: new Date().toISOString()
            },
            amountMicroCC: interpretedIntent.amountMicroCC,
            minAmountMicroCC: null,
            maxSlippageBps: interpretedIntent.maxSlippageBps,
            strategyFilter: interpretedIntent.providerFilter ?? undefined,
            providerFilter: interpretedIntent.providerFilter ?? undefined,
            assetFilter: interpretedIntent.assetFilter ?? undefined,
            requireApproval: interpretedIntent.requireApproval,
            simulationOnly: interpretedIntent.simulationOnly,
            parsedErrors: []
        };
    }
    _shortlistOpportunities(intent) {
        const riskLevelMap = {
            low: 'LOW',
            medium: 'MEDIUM',
            high: 'HIGH'
        };
        const riskFilter = intent.riskTolerance ? riskLevelMap[intent.riskTolerance] : undefined;
        const allOpps = intent.providerFilter?.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filterOpportunities"])({
            providers: intent.providerFilter
        }, this.opportunities) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listSeededOpportunities"])({
            limit: 5
        }, this.opportunities);
        const filtered = riskFilter ? allOpps.filter((o)=>o.riskLevel === riskFilter) : allOpps;
        return filtered.slice(0, 5).map((opp, idx)=>({
                id: opp.id,
                provider: opp.provider,
                providerName: opp.providerName,
                strategyName: opp.strategyName,
                aprPercent: opp.aprPercent,
                aprBps: opp.aprBps,
                riskLevel: opp.riskLevel,
                executionSupport: opp.executionSupport,
                isWhitelisted: opp.isWhitelisted,
                liquidityMicroCC: opp.liquidityMicroCC,
                estimatedOutputMicroCC: intent.amountMicroCC !== null ? Math.floor(intent.amountMicroCC * (1 + opp.aprBps / 10000 / 365)) : null,
                estimatedExecutionCostMicroCC: opp.estimatedExecutionCostMicroCC,
                minAmountMicroCC: opp.minAmountMicroCC,
                slippageToleranceBps: opp.slippageToleranceBps,
                expiry: opp.expiry,
                rank: idx + 1,
                reason: this._oppReason(opp, intent)
            }));
    }
    _oppReason(opp, intent) {
        const reasons = [];
        reasons.push(`${opp.aprPercent.toFixed(2)}% APR`);
        if (opp.riskLevel === 'LOW') reasons.push('low risk');
        if (opp.executionSupport === 'simulated') reasons.push('simulated-only');
        if (intent.providerFilter?.includes(opp.provider)) reasons.push('matches your provider filter');
        return reasons.join(' · ');
    }
    _buildRecommendedPlan(intent, shortlisted, execIntent) {
        const top = shortlisted[0];
        return {
            step: 1,
            action: intent.action,
            opportunityId: top?.id ?? null,
            amountMicroCC: intent.amountMicroCC ?? top?.estimatedOutputMicroCC ?? null,
            description: top ? `Deploy ${intent.amountMicroCC !== null ? (intent.amountMicroCC / 1_000_000).toFixed(2) : 'all'} CC to ${top.strategyName} via ${top.providerName}` : 'No matching opportunity found — review shortlisted options.',
            estimatedOutputMicroCC: top?.estimatedOutputMicroCC ?? null,
            estimatedExecutionCostMicroCC: top?.estimatedExecutionCostMicroCC ?? 5000,
            isSimulation: this.isSimulated || intent.simulationOnly || execIntent.simulationOnly
        };
    }
    _buildWhyThisPlan(intent, shortlisted, policyResult) {
        const top = shortlisted[0];
        if (!top) return 'No opportunities matched your criteria.';
        const parts = [];
        parts.push(`Selected ${top.strategyName} (${top.aprPercent.toFixed(2)}% APR) from ${top.providerName} as the top-ranked option.`);
        if (intent.amountMicroCC) {
            parts.push(`Budget: ${(intent.amountMicroCC / 1_000_000).toFixed(2)} CC.`);
        }
        if (policyResult.decision === 'APPROVED') {
            parts.push('All policy checks passed — execution is approved.');
        } else if (policyResult.decision === 'REQUIRES_APPROVAL') {
            parts.push(`Approval required: ${policyResult.blockedBy ?? 'amount above threshold'}.`);
        } else {
            parts.push(`Blocked: ${policyResult.blockedBy ?? 'policy violation'}.`);
        }
        if (this.isSimulated) {
            parts.push('Running in simulation mode — no real funds will be used.');
        }
        return parts.join(' ');
    }
    _determineNextAction(policyResult, intent) {
        if (policyResult.decision === 'DENIED') return 'blocked';
        if (policyResult.decision === 'REQUIRES_APPROVAL') return 'request_approval';
        if (intent.executionPreference === 'preview') return 'preview_only';
        return 'execute';
    }
    _buildWhatWillHappen(plan) {
        if (plan.shortlistedOpportunities.length === 0) {
            return 'No opportunities match your request. The agent will not execute anything.';
        }
        const top = plan.shortlistedOpportunities[0];
        const amount = plan.interpretedIntent.amountMicroCC !== null ? `${(plan.interpretedIntent.amountMicroCC / 1_000_000).toFixed(2)} CC` : 'your full balance';
        if (plan.policyVerdict.decision === 'DENIED') {
            return `The requested action is blocked by your policy engine. Reason: ${plan.policyVerdict.blockedBy}. Nothing will be executed.`;
        }
        if (plan.policyVerdict.decision === 'REQUIRES_APPROVAL') {
            return `Your policy requires explicit approval for this amount. The plan will be shown but not executed until you confirm.`;
        }
        if (plan.nextAction === 'preview_only') {
            return `This is a preview — no execution will occur. The plan would deploy ${amount} via ${top.strategyName} on ${top.provider}.`;
        }
        return `Deploy ${amount} via ${top.strategyName} on ${top.provider}. Estimated output: ${top.estimatedOutputMicroCC !== null ? (top.estimatedOutputMicroCC / 1_000_000).toFixed(2) : 'N/A'} CC.`;
    }
    _buildRejectionPlan(text, intent, intentId, reason) {
        return {
            interpretedIntent: {
                action: 'UNKNOWN',
                confidence: 0,
                amountMicroCC: null,
                maxSlippageBps: null,
                providerFilter: null,
                assetFilter: null,
                requireApproval: false,
                simulationOnly: true,
                riskTolerance: null,
                executionPreference: 'preview'
            },
            walletSnapshotSummary: this.wallet ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWalletSnapshot"])({}, this.wallet, this.policies) : this._emptySnapshot(),
            shortlistedOpportunities: [],
            recommendedPlan: {
                step: 0,
                action: 'BLOCKED',
                opportunityId: null,
                amountMicroCC: null,
                description: `Request rejected: ${reason ?? 'This action is not supported.'}`,
                estimatedOutputMicroCC: null,
                estimatedExecutionCostMicroCC: 0,
                isSimulation: true
            },
            whyThisPlan: reason ?? 'This action is not supported by the safety policy.',
            policyVerdict: {
                decision: 'DENIED',
                blockedBy: reason,
                passedChecks: [],
                failedChecks: [
                    'DISALLOWED_ACTION_CHECK'
                ]
            },
            nextAction: 'blocked',
            disclaimer: '⚠️ This request was blocked by the safety policy. No action will be taken.',
            isSimulated: true,
            isBasedOnSeededData: false
        };
    }
    _emptySnapshot() {
        return {
            address: '0x0000000000000000000000000000000000000000',
            totalBalanceMicroCC: 0,
            dailyUsageMicroCC: 0,
            dailyLimitMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_LIMITS"].MAX_DAILY_MICRO_CC,
            canExecuteReal: false,
            simulationOnly: true
        };
    }
    _noWalletVerdict(intent) {
        return {
            intentId: intent.id,
            decision: intent.simulationOnly ? 'REQUIRES_APPROVAL' : 'DENIED',
            riskChecks: [],
            blockedBy: 'No wallet connected. Connect a wallet to execute real transactions.',
            blockedByPolicyId: null,
            reasons: [],
            warnings: [],
            evaluatedAt: new Date().toISOString()
        };
    }
    _hasLiveOpportunities() {
        return this.opportunities.some((o)=>o.executionSupport === 'real');
    }
}
const agentOrchestrator = new AgentOrchestrator();

})()),
"[project]/packages/agent-core/src/llm/service.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Provider-agnostic LLM service interface
// All concrete implementations must conform to this interface.
__turbopack_esm__({});
;

})()),
"[project]/packages/agent-core/src/execution/adapter.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Execution adapter interface and support level types.
// All adapters are read-only safe — they never perform real on-chain transactions
// without verifying prerequisites.
__turbopack_esm__({
    "ExecutionResultSchema": ()=>ExecutionResultSchema,
    "ExecutionStatusSchema": ()=>ExecutionStatusSchema,
    "PreparedExecutionSchema": ()=>PreparedExecutionSchema,
    "SupportLevelSchema": ()=>SupportLevelSchema
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const SupportLevelSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'REAL',
    'SIMULATED',
    'UNSUPPORTED'
]);
const ExecutionStatusSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'PREPARED',
    'EXECUTED',
    'SIMULATED',
    'BLOCKED',
    'UNSUPPORTED',
    'FAILED'
]);
const PreparedExecutionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    intentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    opportunityId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    adapterType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    supportLevel: SupportLevelSchema,
    status: ExecutionStatusSchema,
    preparedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    estimatedOutputMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    estimatedFeesMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    gasEstimateMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    executionPayload: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()).nullable(),
    reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const ExecutionResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    preparedExecutionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    status: ExecutionStatusSchema,
    outputMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    feesPaidMicroCC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
    txHash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    simulatedTxHash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    errorMessage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    executedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    durationMs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    supportLevel: SupportLevelSchema,
    explanation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});

})()),
"[project]/packages/agent-core/src/execution/adapters.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// All execution adapters.
// DemoExecutionAdapter — fully local, no on-chain effects.
// LoopSupportedExecutionAdapter — real execution via Loop SDK when requirements are met.
// UnsupportedExecutionAdapter — returns structured unsupported result.
__turbopack_esm__({
    "DemoExecutionAdapter": ()=>DemoExecutionAdapter,
    "LoopSupportedExecutionAdapter": ()=>LoopSupportedExecutionAdapter,
    "UnsupportedExecutionAdapter": ()=>UnsupportedExecutionAdapter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/utils.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function microCCToDisplay(n) {
    return (n / 1_000_000).toFixed(2);
}
class DemoExecutionAdapter {
    name = 'DemoExecutionAdapter';
    supportLevel = 'SIMULATED';
    supportedActions = [
        'FIND_YIELD',
        'EXECUTE_STRATEGY',
        'VIEW_OPPORTUNITIES',
        'CHECK_BALANCE'
    ];
    supportedProviders = [];
    supports(_opp, _wallet, _intent) {
        return {
            supported: true,
            reason: 'Demo adapter: simulates execution locally with no on-chain effects.'
        };
    }
    prepareExecution(intent, opp, _wallet) {
        const estimatedOutput = intent.amountMicroCC !== null ? Math.floor(intent.amountMicroCC * (1 + opp.aprBps / 10000 / 365)) : null;
        return {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            intentId: intent.id,
            opportunityId: opp.id,
            adapterType: this.name,
            supportLevel: 'SIMULATED',
            status: 'PREPARED',
            preparedAt: new Date().toISOString(),
            estimatedOutputMicroCC: estimatedOutput,
            estimatedFeesMicroCC: opp.estimatedExecutionCostMicroCC,
            gasEstimateMicroCC: 5000,
            executionPayload: {
                intentId: intent.id,
                opportunityId: opp.id,
                amountMicroCC: intent.amountMicroCC ?? 0,
                provider: opp.provider,
                strategyName: opp.strategyName,
                simulationOnly: true
            },
            reason: 'Demo adapter selected — execution is simulated.'
        };
    }
    estimateExecutionCost(prepared) {
        return {
            costMicroCC: prepared.estimatedFeesMicroCC + prepared.gasEstimateMicroCC,
            explanation: `Demo: ${microCCToDisplay(prepared.estimatedFeesMicroCC)} CC fees + ${microCCToDisplay(prepared.gasEstimateMicroCC)} CC gas. No real cost.`
        };
    }
    async execute(prepared) {
        const simHash = `0xSIM${Date.now().toString(16)}`;
        const netOutput = prepared.estimatedOutputMicroCC !== null ? prepared.estimatedOutputMicroCC - prepared.estimatedFeesMicroCC : null;
        return {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            preparedExecutionId: prepared.id,
            status: 'SIMULATED',
            outputMicroCC: netOutput,
            feesPaidMicroCC: prepared.estimatedFeesMicroCC,
            txHash: null,
            simulatedTxHash: simHash,
            errorMessage: null,
            executedAt: new Date().toISOString(),
            durationMs: 0,
            supportLevel: 'SIMULATED',
            explanation: `Simulated. TX: ${simHash}. Output: ${netOutput !== null ? microCCToDisplay(netOutput) : 'N/A'} CC. No real transaction occurred.`
        };
    }
}
// ─── LoopSupportedExecutionAdapter ───────────────────────────────────────────
const SUPPORTED_ACTIONS = new Set([
    'FIND_YIELD',
    'EXECUTE_STRATEGY'
]);
const SUPPORTED_PROVIDERS = new Set([
    'froburn',
    'lace',
    'cantonswap'
]);
class LoopSupportedExecutionAdapter {
    name = 'LoopSupportedExecutionAdapter';
    supportLevel = 'REAL';
    supportedActions = [
        ...SUPPORTED_ACTIONS
    ];
    supportedProviders = [
        ...SUPPORTED_PROVIDERS
    ];
    supports(opp, wallet, intent) {
        if (!wallet.isConnected) return {
            supported: false,
            reason: 'No wallet connected. Connect a Loop wallet to enable live execution.'
        };
        if (wallet.isDemo) return {
            supported: false,
            reason: 'Demo wallet cannot execute real transactions. Connect a live Loop wallet.'
        };
        if (opp.executionSupport !== 'real') return {
            supported: false,
            reason: `Opportunity only supports "${opp.executionSupport}" execution — this adapter requires "real".`
        };
        if (!SUPPORTED_PROVIDERS.has(opp.provider)) return {
            supported: false,
            reason: `Provider "${opp.provider}" is not supported by Loop SDK. Supported: ${[
                ...SUPPORTED_PROVIDERS
            ].join(', ')}.`
        };
        if (intent?.amountMicroCC != null && intent.amountMicroCC > (wallet.balances.find((b)=>b.asset === 'CC')?.available ?? 0)) {
            return {
                supported: false,
                reason: 'Insufficient CC balance for this transaction.'
            };
        }
        return {
            supported: true,
            reason: 'All requirements met — Loop SDK will execute this transaction.'
        };
    }
    prepareExecution(intent, opp, wallet) {
        const estimatedOutput = intent.amountMicroCC !== null ? Math.floor(intent.amountMicroCC * (1 + opp.aprBps / 10000 / 365)) : null;
        return {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            intentId: intent.id,
            opportunityId: opp.id,
            adapterType: this.name,
            supportLevel: 'REAL',
            status: 'PREPARED',
            preparedAt: new Date().toISOString(),
            estimatedOutputMicroCC: estimatedOutput,
            estimatedFeesMicroCC: opp.estimatedExecutionCostMicroCC,
            gasEstimateMicroCC: 5000,
            executionPayload: {
                to: opp.provider,
                value: intent.amountMicroCC ?? 0,
                data: `execute:${opp.strategyName}`,
                opportunisticId: intent.id
            },
            reason: 'Prepared for Loop SDK execution.'
        };
    }
    estimateExecutionCost(prepared) {
        return {
            costMicroCC: prepared.estimatedFeesMicroCC + prepared.gasEstimateMicroCC,
            explanation: `Real execution via Loop SDK: ${microCCToDisplay(prepared.estimatedFeesMicroCC)} CC fees + ${microCCToDisplay(prepared.gasEstimateMicroCC)} CC gas.`
        };
    }
    async execute(prepared) {
        // Loop SDK execution must be called from the runtime (apps/web) — this adapter
        // prepares the payload but the actual tx submission happens via loopClient in the browser.
        return {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            preparedExecutionId: prepared.id,
            status: 'PREPARED',
            outputMicroCC: null,
            feesPaidMicroCC: null,
            txHash: null,
            simulatedTxHash: null,
            errorMessage: null,
            executedAt: new Date().toISOString(),
            durationMs: 0,
            supportLevel: 'REAL',
            explanation: 'Execution payload prepared by LoopSupportedExecutionAdapter. Actual transaction submission requires the runtime (apps/web) to call window.loop.execute().'
        };
    }
}
class UnsupportedExecutionAdapter {
    name = 'UnsupportedExecutionAdapter';
    supportLevel = 'UNSUPPORTED';
    supportedActions = [];
    supportedProviders = [];
    supports(opp, _wallet) {
        const reasons = [];
        if (opp.executionSupport === 'unsupported') reasons.push(`Opportunity marked as unsupported: "${opp.executionSupport}"`);
        if (opp.executionSupport !== 'real') reasons.push(`Execution support is "${opp.executionSupport}" — no real execution path available.`);
        reasons.push(`No adapter supports provider "${opp.provider}" with executionSupport "${opp.executionSupport}".`);
        return {
            supported: false,
            reason: reasons.join(' ')
        };
    }
    prepareExecution(intent, opp, _wallet) {
        return {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            intentId: intent.id,
            opportunityId: opp.id,
            adapterType: this.name,
            supportLevel: 'UNSUPPORTED',
            status: 'UNSUPPORTED',
            preparedAt: new Date().toISOString(),
            estimatedOutputMicroCC: null,
            estimatedFeesMicroCC: 0,
            gasEstimateMicroCC: 0,
            executionPayload: null,
            reason: `Unsupported: provider="${opp.provider}", executionSupport="${opp.executionSupport}".`
        };
    }
    estimateExecutionCost() {
        return {
            costMicroCC: 0,
            explanation: 'No cost — execution is not supported.'
        };
    }
    async execute(prepared) {
        return {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            preparedExecutionId: prepared.id,
            status: 'UNSUPPORTED',
            outputMicroCC: null,
            feesPaidMicroCC: null,
            txHash: null,
            simulatedTxHash: null,
            errorMessage: prepared.reason,
            executedAt: new Date().toISOString(),
            durationMs: 0,
            supportLevel: 'UNSUPPORTED',
            explanation: `Execution is not supported. ${prepared.reason}`
        };
    }
}

})()),
"[project]/packages/agent-core/src/execution/resolution.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Strategy-to-adapter resolution layer.
// Resolves the best adapter for a given opportunity + wallet combination.
__turbopack_esm__({
    "executeWithAdapter": ()=>executeWithAdapter,
    "resolveAdapter": ()=>resolveAdapter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$adapters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/execution/adapters.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const demo = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$adapters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DemoExecutionAdapter"]();
const loop = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$adapters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoopSupportedExecutionAdapter"]();
const unsupported = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$adapters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedExecutionAdapter"]();
function resolveAdapter(intent, opportunity, wallet) {
    const log = [];
    // Try Loop adapter first (requires real support + live wallet)
    if (opportunity.executionSupport === 'real' && !wallet.isDemo && wallet.isConnected) {
        const check = loop.supports(opportunity, wallet, intent);
        if (check.supported) {
            log.push(`[LoopAdapter] Selected — ${check.reason}`);
            const prep = loop.prepareExecution(intent, opportunity, wallet);
            return {
                adapter: loop,
                preparedExecution: prep,
                canExecute: true,
                willSimulate: false,
                resolutionLog: log
            };
        }
        log.push(`[LoopAdapter] Not selected — ${check.reason}`);
    } else if (opportunity.executionSupport === 'real') {
        log.push(`[LoopAdapter] Skipped — opportunity requires real execution but wallet isDemo=${wallet.isDemo} isConnected=${wallet.isConnected}`);
    }
    // Fall back to Demo adapter
    if (opportunity.executionSupport === 'simulated' || opportunity.executionSupport === 'real') {
        const check = demo.supports(opportunity, wallet);
        log.push(`[DemoAdapter] Selected — ${check.reason}`);
        const prep = demo.prepareExecution(intent, opportunity, wallet);
        return {
            adapter: demo,
            preparedExecution: prep,
            canExecute: true,
            willSimulate: true,
            resolutionLog: log
        };
    }
    // Last resort: Unsupported adapter
    log.push(`[UnsupportedAdapter] Selected — no supported path for provider=${opportunity.provider} executionSupport=${opportunity.executionSupport}`);
    const prep = unsupported.prepareExecution(intent, opportunity, wallet);
    return {
        adapter: unsupported,
        preparedExecution: prep,
        canExecute: false,
        willSimulate: false,
        resolutionLog: log
    };
}
async function executeWithAdapter(resolved) {
    if (resolved.canExecute) {
        return resolved.adapter.execute(resolved.preparedExecution);
    }
    return unsupported.execute(resolved.preparedExecution);
}

})()),
"[project]/packages/agent-core/src/execution/index.ts [app-route] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
;
;

})()),
"[project]/packages/agent-core/src/execution/index.ts [app-route] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/execution/adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$adapters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/execution/adapters.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$resolution$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/execution/resolution.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/packages/agent-core/src/execution/index.ts [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/packages/agent-core/src/index.ts [app-route] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
;
;
;
;
;
;
;
;

})()),
"[project]/packages/agent-core/src/index.ts [app-route] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$intent$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/intent-parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$policy$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/policy-engine.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$agent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/agent.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/llm/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/llm/parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$llm$2f$safety$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/llm/safety.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$execution$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/packages/agent-core/src/execution/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/packages/agent-core/src/index.ts [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
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
"[project]/apps/web/lib/agent-service.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Agent execution service — orchestrates parse → policy → execution
__turbopack_esm__({
    "executeApprovedIntent": ()=>executeApprovedIntent,
    "getDashboardData": ()=>getDashboardData,
    "parseAndEvaluate": ()=>parseAndEvaluate
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/packages/agent-core/src/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$intent$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/intent-parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$policy$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/agent-core/src/policy-engine.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/lib/utils.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
function microCCToDisplay(n) {
    if (n === null) return 'N/A';
    return (n / 1_000_000).toFixed(2);
}
async function parseAndEvaluate(text) {
    // 1. Parse intent
    const intent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$intent$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseIntent"])(text);
    // 2. Load policies + wallet state from DB
    const policies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryPolicies"])();
    const wallet = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryWalletState"])();
    const opportunities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryOpportunities"])();
    // 3. Convert raw DB policies to typed Policy objects
    const typedPolicies = policies.map((p)=>{
        const base = {
            id: p.id,
            enabled: p.enabled,
            priority: p.priority
        };
        switch(p.type){
            case 'MAX_PER_TRADE':
                return {
                    ...base,
                    type: 'MAX_PER_TRADE',
                    valueMicroCC: parseInt(p.value, 10)
                };
            case 'MAX_DAILY':
                return {
                    ...base,
                    type: 'MAX_DAILY',
                    valueMicroCC: parseInt(p.value, 10),
                    currentUsageMicroCC: p.currentUsageMicroCC ?? 0,
                    windowStart: p.windowStart
                };
            case 'APPROVAL_THRESHOLD':
                return {
                    ...base,
                    type: 'APPROVAL_THRESHOLD',
                    valueMicroCC: parseInt(p.value, 10)
                };
            case 'STRATEGY_ALLOWLIST':
            case 'STRATEGY_DENYLIST':
                return {
                    ...base,
                    type: p.type,
                    providerIds: p.providerIds ?? []
                };
            case 'ASSET_ALLOWLIST':
                return {
                    ...base,
                    type: 'ASSET_ALLOWLIST',
                    assetSymbols: p.assetSymbols ?? []
                };
            case 'MAX_SLIPPAGE':
                return {
                    ...base,
                    type: 'MAX_SLIPPAGE',
                    valueBps: parseInt(p.value, 10)
                };
            case 'SIMULATION_ONLY':
                return {
                    ...base,
                    type: 'SIMULATION_ONLY'
                };
            case 'EXECUTION_MODE':
                return {
                    ...base,
                    type: 'EXECUTION_MODE',
                    value: p.value
                };
            default:
                return null;
        }
    }).filter(Boolean);
    // 4. Convert wallet state
    const typedWallet = {
        address: wallet.address,
        isConnected: wallet.isConnected,
        isDemo: wallet.isDemo,
        balances: wallet.balances.map((b)=>({
                asset: b.asset,
                available: b.available,
                locked: b.locked,
                total: b.total
            })),
        lastSyncedAt: wallet.lastSyncedAt
    };
    // 5. Set policies on engine
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$policy$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["policyEngine"].setPolicies(typedPolicies);
    // 6. Evaluate
    const evaluation = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$policy$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["policyEngine"].evaluate(intent, typedWallet);
    // 7. Log audit event
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertAuditEvent"])({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
        eventType: 'INTENT_PARSED',
        walletAddress: typedWallet.address,
        intentId: intent.id,
        payload: {
            rawText: text,
            parsedIntent: intent,
            evaluation
        },
        simulated: typedWallet.isDemo
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertAuditEvent"])({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
        eventType: 'POLICY_EVALUATED',
        walletAddress: typedWallet.address,
        intentId: intent.id,
        payload: {
            evaluation
        },
        simulated: typedWallet.isDemo
    });
    return {
        intent,
        intentSummary: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$agent$2d$core$2f$src$2f$intent$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["intentSummary"])(intent),
        evaluation,
        opportunities,
        wallet: typedWallet,
        policies: typedPolicies
    };
}
async function executeApprovedIntent(intentId, intent, evaluation) {
    const attemptId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])();
    const wallet = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryWalletState"])();
    const opportunities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryOpportunities"])();
    const typedWallet = {
        address: wallet.address,
        isConnected: wallet.isConnected,
        isDemo: wallet.isDemo,
        balances: wallet.balances.map((b)=>({
                asset: b.asset,
                available: b.available,
                locked: b.locked,
                total: b.total
            })),
        lastSyncedAt: wallet.lastSyncedAt
    };
    // Find matching opportunity
    const topOpportunity = intent.providerFilter && intent.providerFilter.length > 0 ? opportunities.find((o)=>intent.providerFilter.includes(o.provider)) : opportunities[0];
    const isSimulated = !!(typedWallet.isDemo || intent.simulationOnly || topOpportunity && topOpportunity.executionSupport !== 'real');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertExecutionAttempt"])({
        id: attemptId,
        intentId,
        planId: null,
        status: 'RUNNING',
        stepsTotal: 1
    });
    const startTime = Date.now();
    let receipt;
    if (evaluation.decision === 'REQUIRES_APPROVAL') {
        receipt = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            attemptId,
            intentId,
            status: 'BLOCKED',
            stepResults: [],
            totalOutputMicroCC: null,
            totalFeesPaidMicroCC: null,
            policyDecision: 'REQUIRES_APPROVAL',
            policyReasons: evaluation.reasons,
            blockedByPolicy: evaluation.blockedBy,
            simulationOnly: isSimulated,
            executedAt: new Date().toISOString(),
            durationMs: Date.now() - startTime
        };
    } else if (evaluation.decision === 'DENIED') {
        receipt = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            attemptId,
            intentId,
            status: 'BLOCKED',
            stepResults: [],
            totalOutputMicroCC: null,
            totalFeesPaidMicroCC: null,
            policyDecision: 'DENIED',
            policyReasons: evaluation.reasons,
            blockedByPolicy: evaluation.blockedBy,
            simulationOnly: isSimulated,
            executedAt: new Date().toISOString(),
            durationMs: Date.now() - startTime
        };
    } else {
        // Simulated execution
        const estimatedOutput = topOpportunity && intent.amountMicroCC !== null ? Math.floor(intent.amountMicroCC * (1 + topOpportunity.aprBps / 10_000 / 365)) : null;
        const estimatedFees = topOpportunity ? topOpportunity.estimatedExecutionCostMicroCC : 5000;
        receipt = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
            attemptId,
            intentId,
            status: isSimulated ? 'SIMULATED' : 'SUCCESS',
            stepResults: [
                {
                    stepId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
                    status: isSimulated ? 'SIMULATED' : 'SUCCESS',
                    outputMicroCC: estimatedOutput,
                    feesPaidMicroCC: estimatedFees,
                    slippageBps: topOpportunity ? topOpportunity.slippageToleranceBps : 30,
                    txHash: null,
                    simulatedTxHash: `0xSIM${Date.now().toString(16)}`,
                    error: null,
                    executedAt: new Date().toISOString()
                }
            ],
            totalOutputMicroCC: estimatedOutput,
            totalFeesPaidMicroCC: estimatedFees,
            policyDecision: 'APPROVED',
            policyReasons: evaluation.reasons,
            blockedByPolicy: null,
            simulationOnly: isSimulated,
            executedAt: new Date().toISOString(),
            durationMs: Date.now() - startTime
        };
    }
    // Update attempt
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateExecutionAttempt"])(attemptId, {
        status: receipt.status === 'BLOCKED' ? 'REJECTED' : receipt.status === 'SIMULATED' ? 'COMPLETED' : receipt.status,
        stepsCompleted: receipt.status === 'BLOCKED' ? 0 : 1,
        completedAt: new Date().toISOString()
    });
    // Log completion
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertAuditEvent"])({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
        eventType: receipt.status === 'BLOCKED' ? 'EXECUTION_REJECTED' : 'EXECUTION_COMPLETED',
        walletAddress: typedWallet.address,
        intentId,
        attemptId,
        payload: {
            receipt,
            evaluation
        },
        simulated: isSimulated
    });
    // Update daily usage if approved
    if (evaluation.decision === 'APPROVED' && intent.amountMicroCC !== null) {
        const policies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryPolicies"])();
        const dailyPolicy = policies.find((p)=>p.type === 'MAX_DAILY');
        if (dailyPolicy) {
            const currentUsage = dailyPolicy.currentUsageMicroCC ?? 0;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updatePolicy"])(dailyPolicy.id, {
                currentUsageMicroCC: currentUsage + intent.amountMicroCC,
                windowStart: dailyPolicy.windowStart ?? new Date().toISOString()
            });
        }
    }
    return {
        receipt,
        attemptId
    };
}
async function getDashboardData() {
    const [policies, auditEvents, opportunities] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryPolicies"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryAuditEvents"])(20),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryOpportunities"])()
    ]);
    return {
        policies,
        auditEvents,
        opportunities,
        stats: {
            totalEvents: auditEvents.length,
            policiesActive: policies.filter((p)=>p.enabled).length,
            opportunities: opportunities.length
        }
    };
}

})()),
"[project]/apps/web/app/api/dashboard/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.5_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$agent$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/lib/agent-service.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
async function GET() {
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$agent$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDashboardData"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (err) {
        console.error('[dashboard GET]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$5_$40$playwright$2b$test$40$1$2e$59$2e$1_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to load dashboard'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=%5Bproject%5D__d6bdb6._.js.map
// Policy Engine Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { PolicyEngine } from '../policy-engine';
import type {
  ParsedExecutionIntent, ConnectedWalletState, Policy,
  BudgetPolicy, ExecutionPolicy, ApprovalPolicy,
  ProviderListPolicy, SimulationOnlyPolicy, ExecutionModePolicy,
} from '@canton/shared';

const VALID_UUID = '00000000-0000-4000-8000-000000000001';
const VALID_UUID2 = '00000000-0000-4000-8000-000000000002';

function intent(overrides: Partial<ParsedExecutionIntent> = {}): ParsedExecutionIntent {
  return {
    id: VALID_UUID,
    action: 'FIND_YIELD',
    naturalLanguage: { rawText: 'test', confidence: 0.85, parsedAt: new Date().toISOString() },
    amountMicroCC: 10_000_000,
    minAmountMicroCC: null,
    maxSlippageBps: null,
    strategyFilter: undefined,
    providerFilter: undefined,
    assetFilter: undefined,
    requireApproval: false,
    simulationOnly: false,
    parsedErrors: [],
    ...overrides,
  };
}

function wallet(balances?: Array<{ asset: string; available: number; locked: number; total: number }>): ConnectedWalletState {
  return {
    address: '0xDEMO00000000000000000000000000000001',
    isConnected: true,
    isDemo: true,
    balances: balances ?? [{ asset: 'CC', available: 500_000_000, locked: 0, total: 500_000_000 }],
    lastSyncedAt: new Date().toISOString(),
  };
}

function polBudget(v: number, en = true) { return { id: 'pol-budget', type: 'MAX_PER_TRADE' as const, valueMicroCC: v, enabled: en, priority: 1 }; }
function polDaily(v: number, used = 0, en = true) { return { id: 'pol-daily', type: 'MAX_DAILY' as const, valueMicroCC: v, enabled: en, priority: 2, currentUsageMicroCC: used, windowStart: new Date().toISOString() }; }
function polApproval(v: number, en = true) { return { id: 'pol-approval', type: 'APPROVAL_THRESHOLD' as const, valueMicroCC: v, enabled: en, priority: 3 }; }
function polDeny(ids: string[], en = true) { return { id: 'pol-deny', type: 'STRATEGY_DENYLIST' as const, providerIds: ids, enabled: en, priority: 4 }; }
function polAllow(ids: string[], en = true) { return { id: 'pol-allow', type: 'STRATEGY_ALLOWLIST' as const, providerIds: ids, enabled: en, priority: 5 }; }
function polSim(en: boolean) { return { id: 'pol-sim', type: 'SIMULATION_ONLY' as const, enabled: en, priority: 7 }; }
function polExec(v: 'disabled'|'approval_required'|'auto_execute', en = true) { return { id: 'pol-exec', type: 'EXECUTION_MODE' as const, value: v, enabled: en, priority: 0 }; }
function pols(...p: Policy[]) { return p; }

// ─── Budget cap ───────────────────────────────────────────────────────────────

describe('PolicyEngine — budget cap enforcement', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('approves amount below per-trade cap', () => {
    engine.setPolicies(pols(polBudget(20_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 10_000_000 }), wallet());
    expect(result.decision).toBe('APPROVED');
    expect(result.riskChecks.some(c => String(c.checkType) === 'BUDGET_CAP_CHECK' && String(c.verdict) === 'PASS')).toBe(true);
  });

  it('denies amount above per-trade cap', () => {
    engine.setPolicies(pols(polBudget(20_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 50_000_000 }), wallet());
    expect(result.decision).toBe('DENIED');
    expect(result.riskChecks.some(c => String(c.checkType) === 'BUDGET_CAP_CHECK' && String(c.verdict) === 'FAIL')).toBe(true);
    expect(result.blockedBy ?? '').toContain('20.00');
    expect(result.blockedBy ?? '').toContain('50.00');
  });

  it('approves amount exactly at cap', () => {
    engine.setPolicies(pols(polBudget(20_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 20_000_000 }), wallet());
    expect(result.decision).not.toBe('DENIED');
  });

  it('uses default cap when no budget policy set', () => {
    engine.setPolicies(pols());
    const result = engine.evaluate(intent({ amountMicroCC: 50_000_000 }), wallet());
    expect(result.decision).toBe('DENIED');
  });
});

// ─── Approval threshold ───────────────────────────────────────────────────────

describe('PolicyEngine — approval threshold', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('approves amount at threshold', () => {
    engine.setPolicies(pols(polApproval(10_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 10_000_000 }), wallet());
    expect(result.decision).toBe('APPROVED');
  });

  it('requires approval for amount above threshold', () => {
    engine.setPolicies(pols(polApproval(10_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 15_000_000 }), wallet());
    expect(result.decision).toBe('REQUIRES_APPROVAL');
    expect(result.blockedBy ?? '').toContain('explicit confirmation');
  });

  it('approval check is skipped when amount is null (check not run)', () => {
    engine.setPolicies(pols(polApproval(10_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: null }), wallet());
    // null amount → approval check is not run at all → no APPROVAL_THRESHOLD_CHECK in list
    const hasApprovalCheck = result.riskChecks.some(c => String(c.checkType) === 'APPROVAL_THRESHOLD_CHECK');
    expect(hasApprovalCheck).toBe(false);
  });

  it('uses default threshold when no approval policy set', () => {
    engine.setPolicies(pols());
    const result = engine.evaluate(intent({ amountMicroCC: 15_000_000 }), wallet());
    expect(result.decision).toBe('REQUIRES_APPROVAL');
  });
});

// ─── Denylist block ───────────────────────────────────────────────────────────

describe('PolicyEngine — denylist block', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('allows providers not on denylist', () => {
    engine.setPolicies(pols(polDeny(['lace'])));
    const result = engine.evaluate(intent({ providerFilter: ['froburn'] }), wallet());
    expect(result.decision).toBe('APPROVED');
  });

  it('denies providers on denylist', () => {
    engine.setPolicies(pols(polDeny(['lace'])));
    const result = engine.evaluate(intent({ providerFilter: ['lace'] }), wallet());
    expect(result.decision).toBe('DENIED');
    expect(result.blockedByPolicyId).toBe('pol-deny');
  });

  it('denies when one of multiple providers is on denylist', () => {
    engine.setPolicies(pols(polDeny(['fro-demo'])));
    const result = engine.evaluate(intent({ providerFilter: ['froburn', 'fro-demo'] }), wallet());
    expect(result.decision).toBe('DENIED');
  });

  it('passes denylist when no provider filter set', () => {
    engine.setPolicies(pols(polDeny(['lace'])));
    // Empty array means no filter = no providers requested = denylist check passes
    const result = engine.evaluate(intent({ providerFilter: [] }), wallet());
    expect(result.riskChecks.some(c => String(c.checkType) === 'DENYLIST_CHECK' && String(c.verdict) === 'PASS')).toBe(true);
  });

  it('passes when denylist policy is disabled', () => {
    engine.setPolicies(pols(polDeny(['lace'], false)));
    const result = engine.evaluate(intent({ providerFilter: ['lace'] }), wallet());
    expect(result.riskChecks.some(c => String(c.checkType) === 'DENYLIST_CHECK' && String(c.verdict) === 'PASS')).toBe(true);
  });
});

// ─── Insufficient balance ─────────────────────────────────────────────────────

describe('PolicyEngine — insufficient balance', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('approves when balance is sufficient', () => {
    engine.setPolicies(pols());
    const result = engine.evaluate(intent({ amountMicroCC: 10_000_000 }), wallet());
    expect(result.decision).toBe('APPROVED');
  });

  it('denies when balance is insufficient', () => {
    engine.setPolicies(pols());
    const result = engine.evaluate(intent({ amountMicroCC: 100_000_000 }), wallet([{ asset: 'CC', available: 50_000_000, locked: 0, total: 50_000_000 }]));
    expect(result.decision).toBe('DENIED');
    expect(result.blockedBy ?? '').toContain('Insufficient balance');
  });

  it('denies when wallet has zero balance', () => {
    engine.setPolicies(pols());
    const result = engine.evaluate(intent({ amountMicroCC: 1_000_000 }), wallet([{ asset: 'CC', available: 0, locked: 0, total: 0 }]));
    expect(result.decision).toBe('DENIED');
  });

  it('balance check is skipped when amount is null (check not run)', () => {
    engine.setPolicies(pols());
    // null amount → balance check is not run at all
    const result = engine.evaluate(intent({ amountMicroCC: null }), wallet([{ asset: 'CC', available: 0, locked: 0, total: 0 }]));
    const hasBalanceCheck = result.riskChecks.some(c => String(c.checkType) === 'BALANCE_CHECK');
    expect(hasBalanceCheck).toBe(false);
  });
});

// ─── Simulation-only mode ────────────────────────────────────────────────────

describe('PolicyEngine — simulation-only mode', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('passes when simulation-only is disabled', () => {
    engine.setPolicies(pols(polSim(false)));
    const result = engine.evaluate(intent({ simulationOnly: false }), wallet());
    expect(result.riskChecks.some(c => String(c.checkType) === 'SIMULATION_MODE_CHECK' && String(c.verdict) === 'PASS')).toBe(true);
    expect(result.decision).toBe('APPROVED');
  });

  it('warns but still approves when policy is on but intent wants real', () => {
    engine.setPolicies(pols(polSim(true)));
    const result = engine.evaluate(intent({ simulationOnly: false }), wallet());
    const simCheck = result.riskChecks.find(c => String(c.checkType) === 'SIMULATION_MODE_CHECK');
    expect(simCheck?.verdict).toBe('WARN');
    expect(result.decision).toBe('APPROVED');
  });

  it('approves simulation-only intent when policy is on', () => {
    engine.setPolicies(pols(polSim(true)));
    const result = engine.evaluate(intent({ simulationOnly: true }), wallet());
    expect(result.riskChecks.some(c => String(c.checkType) === 'SIMULATION_MODE_CHECK' && String(c.verdict) === 'PASS')).toBe(true);
  });
});

// ─── Invalid intent ──────────────────────────────────────────────────────────

describe('PolicyEngine — invalid intent handling', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('denies intent with UNKNOWN action', () => {
    engine.setPolicies(pols());
    const result = engine.evaluate(intent({ action: 'UNKNOWN', naturalLanguage: { rawText: 'test', confidence: 0.3, parsedAt: new Date().toISOString() } }), wallet());
    expect(result.decision).toBe('DENIED');
  });

  it('includes blocked reason in result', () => {
    engine.setPolicies(pols(polBudget(5_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 100_000_000 }), wallet());
    expect(result.decision).toBe('DENIED');
    expect(result.blockedBy).toBeTruthy();
  });
});

// ─── Execution mode ──────────────────────────────────────────────────────────

describe('PolicyEngine — execution mode', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('denies all execution when mode is disabled', () => {
    engine.setPolicies(pols(polExec('disabled')));
    const result = engine.evaluate(intent({ amountMicroCC: 1_000_000 }), wallet());
    expect(result.decision).toBe('DENIED');
  });

  it('approves when mode is auto_execute', () => {
    engine.setPolicies(pols(polExec('auto_execute'), polBudget(20_000_000), polApproval(10_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 5_000_000 }), wallet());
    expect(result.decision).toBe('APPROVED');
  });
});

// ─── Daily limit ─────────────────────────────────────────────────────────────

describe('PolicyEngine — daily limit', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('approves when daily usage stays within limit', () => {
    // Set budget cap and approval threshold high enough so daily limit is the active constraint
    engine.setPolicies(pols(polBudget(100_000_000), polApproval(100_000_000), polDaily(100_000_000, 50_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 30_000_000 }), wallet());
    expect(result.decision).toBe('APPROVED');
  });

  it('denies when daily limit would be exceeded', () => {
    engine.setPolicies(pols(polBudget(100_000_000), polApproval(100_000_000), polDaily(100_000_000, 80_000_000)));
    const result = engine.evaluate(intent({ amountMicroCC: 30_000_000 }), wallet());
    expect(result.decision).toBe('DENIED');
    expect(result.blockedBy ?? '').toContain('daily limit');
  });
});

// ─── Allowlist ────────────────────────────────────────────────────────────────

describe('PolicyEngine — allowlist', () => {
  let engine: PolicyEngine;
  beforeEach(() => { engine = new PolicyEngine(); });

  it('denies providers not on allowlist', () => {
    engine.setPolicies(pols(polAllow(['froburn', 'cantonswap'])));
    const result = engine.evaluate(intent({ providerFilter: ['lace'] }), wallet());
    expect(result.decision).toBe('DENIED');
    expect(result.blockedBy ?? '').toContain('lace');
  });

  it('allows providers on allowlist', () => {
    engine.setPolicies(pols(polAllow(['froburn', 'cantonswap'])));
    const result = engine.evaluate(intent({ providerFilter: ['froburn'] }), wallet());
    expect(result.decision).toBe('APPROVED');
  });
});

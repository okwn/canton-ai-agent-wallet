import { describe, it, expect } from 'vitest';
import path from 'path';

// Resolve modules relative to the web app root
const WEB_ROOT = path.resolve(__dirname, '../..');

describe('Smoke: db module', () => {
  it('db module exports required functions', async () => {
    const db = await import(path.join(WEB_ROOT, 'lib/db'));
    expect(typeof db.queryPolicies).toBe('function');
    expect(typeof db.queryOpportunities).toBe('function');
    expect(typeof db.queryWalletState).toBe('function');
    expect(typeof db.queryAuditEvents).toBe('function');
    expect(typeof db.updatePolicy).toBe('function');
    expect(typeof db.insertAuditEvent).toBe('function');
    expect(typeof db.resetDemoData).toBe('function');
  });

  it('queryPolicies returns array with seed data', async () => {
    const { queryPolicies } = await import(path.join(WEB_ROOT, 'lib/db'));
    const policies = await queryPolicies();
    expect(Array.isArray(policies)).toBe(true);
    expect(policies.length).toBeGreaterThan(0);
  });

  it('queryOpportunities returns array with expected fields', async () => {
    const { queryOpportunities } = await import(path.join(WEB_ROOT, 'lib/db'));
    const opps = await queryOpportunities();
    expect(Array.isArray(opps)).toBe(true);
    expect(opps.length).toBeGreaterThan(0);
    const opp = opps[0] as Record<string, unknown>;
    expect(typeof opp.id).toBe('string');
    expect(typeof opp.provider).toBe('string');
    expect(typeof opp.aprBps).toBe('number');
    expect(typeof opp.executionSupport).toBe('string');
  });

  it('queryWalletState returns demo wallet', async () => {
    const { queryWalletState } = await import(path.join(WEB_ROOT, 'lib/db'));
    const wallet = await queryWalletState();
    expect(wallet.isDemo).toBe(true);
    expect(wallet.isConnected).toBe(true);
    expect(Array.isArray(wallet.balances)).toBe(true);
  });

  it('queryAuditEvents returns seeded events', async () => {
    const { queryAuditEvents } = await import(path.join(WEB_ROOT, 'lib/db'));
    const events = await queryAuditEvents(10);
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('updatePolicy persists and restores', async () => {
    const { queryPolicyById, updatePolicy, queryPolicies } = await import(path.join(WEB_ROOT, 'lib/db'));
    const policies = await queryPolicies();
    const policy = policies.find((p: Record<string, unknown>) => p.enabled !== undefined);
    expect(policy).toBeDefined();

    const originalEnabled = policy!.enabled as boolean;
    await updatePolicy(policy!.id as string, { enabled: !originalEnabled });
    const updated = await queryPolicyById(policy!.id as string);
    expect(updated?.enabled).toBe(!originalEnabled);

    // Restore
    await updatePolicy(policy!.id as string, { enabled: originalEnabled });
    const restored = await queryPolicyById(policy!.id as string);
    expect(restored?.enabled).toBe(originalEnabled);
  });

  it('resetDemoData clears custom events and restores seed', async () => {
    const { queryAuditEvents, insertAuditEvent, resetDemoData } = await import(path.join(WEB_ROOT, 'lib/db'));

    await insertAuditEvent({
      id: 'smoke-test-event',
      eventType: 'SMOKE_TEST',
      payload: { test: true },
      simulated: true,
    });

    const eventsBefore = await queryAuditEvents(100);
    const hasCustom = eventsBefore.some((e: Record<string, unknown>) => e.id === 'smoke-test-event');
    expect(hasCustom).toBe(true);

    await resetDemoData();

    const eventsAfter = await queryAuditEvents(100);
    const stillHasCustom = eventsAfter.some((e: Record<string, unknown>) => e.id === 'smoke-test-event');
    expect(stillHasCustom).toBe(false);
    expect(eventsAfter.length).toBeGreaterThan(0);
  });
});

describe('Smoke: policy engine', () => {
  it('policyEngine is callable', async () => {
    const { policyEngine } = await import('@canton/agent-core');
    expect(typeof policyEngine.evaluate).toBe('function');
    expect(typeof policyEngine.setPolicies).toBe('function');
  });

  it('parseIntent handles basic input', async () => {
    const { parseIntent } = await import('@canton/agent-core');
    const result = parseIntent('Find yield up to 50 CC');
    expect(result).not.toBeNull();
    expect(result!.action).toBe('FIND_YIELD');
    expect(result!.amountMicroCC).toBe(50_000_000);
  });
});

describe('Smoke: agent-service', () => {
  it('getDashboardData returns expected shape', async () => {
    const { getDashboardData } = await import(path.join(WEB_ROOT, 'lib/agent-service'));
    const data = await getDashboardData();
    expect(Array.isArray(data.opportunities)).toBe(true);
    expect(Array.isArray(data.auditEvents)).toBe(true);
    expect(typeof data.stats).toBe('object');
  });
});

describe('Smoke: utils', () => {
  it('microCCToDisplay formats correctly', async () => {
    const { microCCToDisplay } = await import(path.join(WEB_ROOT, 'lib/utils'));
    expect(microCCToDisplay(500_000_000)).toBe('500.00');
    expect(microCCToDisplay(1_000_000)).toBe('1.00');
    expect(microCCToDisplay(null)).toBe('0.00');
    expect(microCCToDisplay(undefined)).toBe('0.00');
  });

  it('bpsToPercent formats correctly', async () => {
    const { bpsToPercent } = await import(path.join(WEB_ROOT, 'lib/utils'));
    expect(bpsToPercent(420)).toBe('4.20');
    expect(bpsToPercent(100)).toBe('1.00');
  });

  it('generateId returns valid uuid-like string', async () => {
    const { generateId } = await import(path.join(WEB_ROOT, 'lib/utils'));
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBe(36);
    expect(id.includes('-')).toBe(true);
  });
});

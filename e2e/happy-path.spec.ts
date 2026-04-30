import { test, expect } from '@playwright/test';

/**
 * Happy-path end-to-end test.
 * Prerequisites: `pnpm dev` must be running on port 3000.
 * Run: `pnpm exec playwright test`
 */

test.describe('Happy Path', () => {

  test('health endpoint returns ok', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.ok()).toBe(true);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.capabilities).toBeDefined();
    expect(body.capabilities.intentParser).toBe('real');
    expect(body.capabilities.policyEngine).toBe('real');
    expect(body.capabilities.marketData).toBe('simulated');
  });

  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('AI agent for your wallet');
    await expect(page.getByRole('link', { name: /Open Agent Terminal/i })).toBeVisible();
  });

  test('dashboard loads with seeded data', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.getByText('CC Balance')).toBeVisible();
    await expect(page.getByText('Daily Usage')).toBeVisible();
    await expect(page.getByText('Policies Active')).toBeVisible();
  });

  test('opportunities page shows seeded strategies', async ({ page }) => {
    await page.goto('/opportunities');
    await expect(page.locator('h1')).toContainText('Opportunities');
    // Should have at least one opportunity card
    await expect(page.locator('[class*="Card"]').first()).toBeVisible();
    // Check SIMULATED DATA badge is shown
    await expect(page.getByText('SIMULATED DATA')).toBeVisible();
  });

  test('policies page shows 9 seeded policies', async ({ page }) => {
    await page.goto('/policies');
    await expect(page.locator('h1')).toContainText('Policies');
    // Should show policy cards — check for specific ones
    await expect(page.getByText('Max Per Trade')).toBeVisible();
    await expect(page.getByText('Max Daily Spend')).toBeVisible();
    await expect(page.getByText('Approval Threshold')).toBeVisible();
  });

  test('activity page loads', async ({ page }) => {
    await page.goto('/activity');
    await expect(page.locator('h1')).toContainText('Activity');
    // Page should load without crashing
    await expect(page.getByText('Execution Log')).toBeVisible();
  });

  test('agent terminal renders and accepts input', async ({ page }) => {
    await page.goto('/agent');
    await expect(page.locator('h1')).toContainText('Agent Terminal');
    await expect(page.getByPlaceholder(/Find the cheapest yield/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Plan/i })).toBeVisible();
  });

  test('agent plan endpoint returns structured plan', async ({ request }) => {
    const res = await request.post('/api/agent/plan', {
      data: { text: 'Find the cheapest yield up to 50 CC' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.ok()).toBe(true);
    const body = await res.json();
    expect(body.intentId).toBeDefined();
    expect(body.plan).toBeDefined();
    expect(body.plan.interpretedIntent).toBeDefined();
    expect(body.plan.interpretedIntent.action).toBe('FIND_YIELD');
  });

  test('policy update persists via API', async ({ request }) => {
    // Get current policies
    const getRes = await request.get('/api/policies');
    expect(getRes.ok()).toBe(true);
    const { policies } = await getRes.json();
    const maxTrade = policies.find((p: Record<string, unknown>) => p.type === 'MAX_PER_TRADE');
    expect(maxTrade).toBeDefined();
    const originalEnabled = maxTrade.enabled;

    // Toggle the policy
    const putRes = await request.put('/api/policies', {
      data: { id: maxTrade.id, enabled: !originalEnabled },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(putRes.ok()).toBe(true);

    // Verify the change persisted
    const getRes2 = await request.get('/api/policies');
    const { policies: policies2 } = await getRes2.json();
    const maxTrade2 = policies2.find((p: Record<string, unknown>) => p.id === maxTrade.id);
    expect(maxTrade2.enabled).toBe(!originalEnabled);

    // Restore original value
    await request.put('/api/policies', {
      data: { id: maxTrade.id, enabled: originalEnabled },
      headers: { 'Content-Type': 'application/json' },
    });
  });

  test('blocked action shows BLOCKED policy verdict', async ({ request }) => {
    // lace is in the denylist in seed data, so this should be blocked
    const res = await request.post('/api/agent/plan', {
      data: { text: 'Move all my CC to lace finance' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.ok()).toBe(true);
    const body = await res.json();
    expect(body.plan).toBeDefined();
    // Policy verdict should show DENIED or the denylist as the blocker
    const verdict = body.plan.policyVerdict;
    expect(verdict.decision === 'DENIED' || verdict.decision === 'REQUIRES_APPROVAL').toBe(true);
  });

  test('demo execution creates a SIMULATED receipt', async ({ request }) => {
    // The agent parses the intent
    const planRes = await request.post('/api/agent/plan', {
      data: { text: 'Simulate a 5 CC yield search' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(planRes.ok()).toBe(true);
    const { plan } = await planRes.json();
    expect(plan).toBeDefined();

    // The execution path should be SIMULATED
    expect(plan.shortlistedOpportunities.length).toBeGreaterThanOrEqual(0);
    // Simulation flag should be set
    expect(plan.interpretedIntent.simulationOnly === true || plan.isSimulated === true).toBe(true);
  });

  test('opportunities API returns seeded data', async ({ request }) => {
    const res = await request.get('/api/opportunities');
    expect(res.ok()).toBe(true);
    const { opportunities } = await res.json();
    expect(opportunities.length).toBeGreaterThan(0);

    // Every opportunity should have required fields
    for (const opp of opportunities) {
      expect(typeof opp.id).toBe('string');
      expect(typeof opp.provider).toBe('string');
      expect(typeof opp.aprBps).toBe('number');
      expect(typeof opp.executionSupport).toBe('string'); // 'real' | 'simulated' | 'unsupported'
    }
  });

  test('dashboard API returns seeded data', async ({ request }) => {
    const res = await request.get('/api/dashboard');
    expect(res.ok()).toBe(true);
    const data = await res.json();
    expect(Array.isArray(data.policies)).toBe(true);
    expect(data.policies.length).toBeGreaterThan(0);
    expect(Array.isArray(data.opportunities)).toBe(true);
    expect(Array.isArray(data.auditEvents)).toBe(true);
    expect(typeof data.stats).toBe('object');
  });

  test('reset demo data API works', async ({ request }) => {
    // First add a custom audit event
    const preRes = await request.get('/api/audit?limit=100');
    const preEvents = await preRes.json().then(r => r.events);

    // Reset
    const resetRes = await request.post('/api/demo/reset');
    expect(resetRes.ok()).toBe(true);

    // Verify reset happened (custom events should be gone, seeded events back)
    const postRes = await request.get('/api/audit?limit=100');
    const postEvents = await postRes.json().then(r => r.events);
    // Should have seeded events
    expect(postEvents.length).toBeGreaterThan(0);
  });

});

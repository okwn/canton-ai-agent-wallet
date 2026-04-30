// Strategy-to-adapter resolution layer.
// Resolves the best adapter for a given opportunity + wallet combination.

import type { ExecutionAdapter, PreparedExecution, ExecutionResult } from './adapter';
import type { ParsedExecutionIntent, StrategyOpportunity, ConnectedWalletState } from '@canton/shared';
import { DemoExecutionAdapter, LoopSupportedExecutionAdapter, UnsupportedExecutionAdapter } from './adapters';

export interface ResolutionResult {
  adapter: ExecutionAdapter;
  preparedExecution: PreparedExecution;
  canExecute: boolean;
  willSimulate: boolean;
  resolutionLog: string[];
}

const demo = new DemoExecutionAdapter();
const loop = new LoopSupportedExecutionAdapter();
const unsupported = new UnsupportedExecutionAdapter();

/**
 * Resolve the best adapter for the given opportunity + wallet.
 * Priority order:
 *   1. LoopSupportedExecutionAdapter — if opportunity.executionSupport === 'real' AND wallet is live
 *   2. DemoExecutionAdapter — if opportunity.executionSupport === 'simulated' OR wallet is demo
 *   3. UnsupportedExecutionAdapter — never truly supports
 */
export function resolveAdapter(
  intent: ParsedExecutionIntent,
  opportunity: StrategyOpportunity,
  wallet: ConnectedWalletState,
): ResolutionResult {
  const log: string[] = [];

  // Try Loop adapter first (requires real support + live wallet)
  if (opportunity.executionSupport === 'real' && !wallet.isDemo && wallet.isConnected) {
    const check = loop.supports(opportunity, wallet, intent);
    if (check.supported) {
      log.push(`[LoopAdapter] Selected — ${check.reason}`);
      const prep = loop.prepareExecution(intent, opportunity, wallet);
      return { adapter: loop, preparedExecution: prep, canExecute: true, willSimulate: false, resolutionLog: log };
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
    return { adapter: demo, preparedExecution: prep, canExecute: true, willSimulate: true, resolutionLog: log };
  }

  // Last resort: Unsupported adapter
  log.push(`[UnsupportedAdapter] Selected — no supported path for provider=${opportunity.provider} executionSupport=${opportunity.executionSupport}`);
  const prep = unsupported.prepareExecution(intent, opportunity, wallet);
  return { adapter: unsupported, preparedExecution: prep, canExecute: false, willSimulate: false, resolutionLog: log };
}

/**
 * Execute via the resolved adapter, returning a consistent ExecutionResult.
 */
export async function executeWithAdapter(resolved: ResolutionResult): Promise<ExecutionResult> {
  if (resolved.canExecute) {
    return resolved.adapter.execute(resolved.preparedExecution);
  }
  return unsupported.execute(resolved.preparedExecution);
}

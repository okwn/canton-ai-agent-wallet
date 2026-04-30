// All execution adapters.
// DemoExecutionAdapter — fully local, no on-chain effects.
// LoopSupportedExecutionAdapter — real execution via Loop SDK when requirements are met.
// UnsupportedExecutionAdapter — returns structured unsupported result.

import type { ExecutionAdapter, PreparedExecution, ExecutionResult } from './adapter';
import type { ParsedExecutionIntent, StrategyOpportunity, ConnectedWalletState } from '@canton/shared';
import { generateId } from '../utils';

function microCCToDisplay(n: number): string {
  return (n / 1_000_000).toFixed(2);
}

// ─── DemoExecutionAdapter ────────────────────────────────────────────────────

export class DemoExecutionAdapter implements ExecutionAdapter {
  readonly name = 'DemoExecutionAdapter';
  readonly supportLevel = 'SIMULATED' as const;
  readonly supportedActions = ['FIND_YIELD', 'EXECUTE_STRATEGY', 'VIEW_OPPORTUNITIES', 'CHECK_BALANCE'];
  readonly supportedProviders: string[] = [];

  supports(_opp: StrategyOpportunity, _wallet: ConnectedWalletState, _intent?: ParsedExecutionIntent) {
    return { supported: true, reason: 'Demo adapter: simulates execution locally with no on-chain effects.' };
  }

  prepareExecution(intent: ParsedExecutionIntent, opp: StrategyOpportunity, _wallet: ConnectedWalletState): PreparedExecution {
    const estimatedOutput =
      intent.amountMicroCC !== null
        ? Math.floor(intent.amountMicroCC * (1 + opp.aprBps / 10000 / 365))
        : null;
    return {
      id: generateId(), intentId: intent.id, opportunityId: opp.id, adapterType: this.name,
      supportLevel: 'SIMULATED', status: 'PREPARED', preparedAt: new Date().toISOString(),
      estimatedOutputMicroCC: estimatedOutput, estimatedFeesMicroCC: opp.estimatedExecutionCostMicroCC,
      gasEstimateMicroCC: 5000,
      executionPayload: { intentId: intent.id, opportunityId: opp.id, amountMicroCC: intent.amountMicroCC ?? 0, provider: opp.provider, strategyName: opp.strategyName, simulationOnly: true },
      reason: 'Demo adapter selected — execution is simulated.',
    };
  }

  estimateExecutionCost(prepared: PreparedExecution) {
    return { costMicroCC: prepared.estimatedFeesMicroCC + prepared.gasEstimateMicroCC, explanation: `Demo: ${microCCToDisplay(prepared.estimatedFeesMicroCC)} CC fees + ${microCCToDisplay(prepared.gasEstimateMicroCC)} CC gas. No real cost.` };
  }

  async execute(prepared: PreparedExecution): Promise<ExecutionResult> {
    const simHash = `0xSIM${Date.now().toString(16)}`;
    const netOutput = prepared.estimatedOutputMicroCC !== null ? prepared.estimatedOutputMicroCC - prepared.estimatedFeesMicroCC : null;
    return {
      id: generateId(), preparedExecutionId: prepared.id, status: 'SIMULATED',
      outputMicroCC: netOutput, feesPaidMicroCC: prepared.estimatedFeesMicroCC,
      txHash: null, simulatedTxHash: simHash, errorMessage: null,
      executedAt: new Date().toISOString(), durationMs: 0,
      supportLevel: 'SIMULATED', explanation: `Simulated. TX: ${simHash}. Output: ${netOutput !== null ? microCCToDisplay(netOutput) : 'N/A'} CC. No real transaction occurred.`,
    };
  }
}

// ─── LoopSupportedExecutionAdapter ───────────────────────────────────────────

const SUPPORTED_ACTIONS = new Set(['FIND_YIELD', 'EXECUTE_STRATEGY']);
const SUPPORTED_PROVIDERS = new Set(['froburn', 'lace', 'cantonswap']);

export class LoopSupportedExecutionAdapter implements ExecutionAdapter {
  readonly name = 'LoopSupportedExecutionAdapter';
  readonly supportLevel = 'REAL' as const;
  readonly supportedActions = [...SUPPORTED_ACTIONS];
  readonly supportedProviders = [...SUPPORTED_PROVIDERS];

  supports(opp: StrategyOpportunity, wallet: ConnectedWalletState, intent?: ParsedExecutionIntent): { supported: boolean; reason: string } {
    if (!wallet.isConnected) return { supported: false, reason: 'No wallet connected. Connect a Loop wallet to enable live execution.' };
    if (wallet.isDemo) return { supported: false, reason: 'Demo wallet cannot execute real transactions. Connect a live Loop wallet.' };
    if (opp.executionSupport !== 'real') return { supported: false, reason: `Opportunity only supports "${opp.executionSupport}" execution — this adapter requires "real".` };
    if (!SUPPORTED_PROVIDERS.has(opp.provider)) return { supported: false, reason: `Provider "${opp.provider}" is not supported by Loop SDK. Supported: ${[...SUPPORTED_PROVIDERS].join(', ')}.` };
    if (intent?.amountMicroCC != null && intent.amountMicroCC > (wallet.balances.find(b => b.asset === 'CC')?.available ?? 0)) {
      return { supported: false, reason: 'Insufficient CC balance for this transaction.' };
    }
    return { supported: true, reason: 'All requirements met — Loop SDK will execute this transaction.' };
  }

  prepareExecution(intent: ParsedExecutionIntent, opp: StrategyOpportunity, wallet: ConnectedWalletState): PreparedExecution {
    const estimatedOutput = intent.amountMicroCC !== null
      ? Math.floor(intent.amountMicroCC * (1 + opp.aprBps / 10000 / 365)) : null;
    return {
      id: generateId(), intentId: intent.id, opportunityId: opp.id, adapterType: this.name,
      supportLevel: 'REAL', status: 'PREPARED', preparedAt: new Date().toISOString(),
      estimatedOutputMicroCC: estimatedOutput, estimatedFeesMicroCC: opp.estimatedExecutionCostMicroCC,
      gasEstimateMicroCC: 5000,
      executionPayload: {
        to: opp.provider, value: intent.amountMicroCC ?? 0,
        data: `execute:${opp.strategyName}`, opportunisticId: intent.id,
      },
      reason: 'Prepared for Loop SDK execution.',
    };
  }

  estimateExecutionCost(prepared: PreparedExecution) {
    return { costMicroCC: prepared.estimatedFeesMicroCC + prepared.gasEstimateMicroCC, explanation: `Real execution via Loop SDK: ${microCCToDisplay(prepared.estimatedFeesMicroCC)} CC fees + ${microCCToDisplay(prepared.gasEstimateMicroCC)} CC gas.` };
  }

  async execute(prepared: PreparedExecution): Promise<ExecutionResult> {
    // Loop SDK execution must be called from the runtime (apps/web) — this adapter
    // prepares the payload but the actual tx submission happens via loopClient in the browser.
    return {
      id: generateId(), preparedExecutionId: prepared.id, status: 'PREPARED',
      outputMicroCC: null, feesPaidMicroCC: null, txHash: null, simulatedTxHash: null,
      errorMessage: null, executedAt: new Date().toISOString(), durationMs: 0,
      supportLevel: 'REAL',
      explanation: 'Execution payload prepared by LoopSupportedExecutionAdapter. Actual transaction submission requires the runtime (apps/web) to call window.loop.execute().',
    };
  }
}

// ─── UnsupportedExecutionAdapter ───────────────────────────────────────────

export class UnsupportedExecutionAdapter implements ExecutionAdapter {
  readonly name = 'UnsupportedExecutionAdapter';
  readonly supportLevel = 'UNSUPPORTED' as const;
  readonly supportedActions: string[] = [];
  readonly supportedProviders: string[] = [];

  supports(opp: StrategyOpportunity, _wallet: ConnectedWalletState): { supported: boolean; reason: string } {
    const reasons: string[] = [];
    if (opp.executionSupport === 'unsupported') reasons.push(`Opportunity marked as unsupported: "${opp.executionSupport}"`);
    if (opp.executionSupport !== 'real') reasons.push(`Execution support is "${opp.executionSupport}" — no real execution path available.`);
    reasons.push(`No adapter supports provider "${opp.provider}" with executionSupport "${opp.executionSupport}".`);
    return { supported: false, reason: reasons.join(' ') };
  }

  prepareExecution(intent: ParsedExecutionIntent, opp: StrategyOpportunity, _wallet: ConnectedWalletState): PreparedExecution {
    return {
      id: generateId(), intentId: intent.id, opportunityId: opp.id, adapterType: this.name,
      supportLevel: 'UNSUPPORTED', status: 'UNSUPPORTED', preparedAt: new Date().toISOString(),
      estimatedOutputMicroCC: null, estimatedFeesMicroCC: 0, gasEstimateMicroCC: 0,
      executionPayload: null,
      reason: `Unsupported: provider="${opp.provider}", executionSupport="${opp.executionSupport}".`,
    };
  }

  estimateExecutionCost() {
    return { costMicroCC: 0, explanation: 'No cost — execution is not supported.' };
  }

  async execute(prepared: PreparedExecution): Promise<ExecutionResult> {
    return {
      id: generateId(), preparedExecutionId: prepared.id, status: 'UNSUPPORTED',
      outputMicroCC: null, feesPaidMicroCC: null, txHash: null, simulatedTxHash: null,
      errorMessage: prepared.reason, executedAt: new Date().toISOString(), durationMs: 0,
      supportLevel: 'UNSUPPORTED', explanation: `Execution is not supported. ${prepared.reason}`,
    };
  }
}

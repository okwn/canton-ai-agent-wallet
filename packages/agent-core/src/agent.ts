// Agent Orchestrator — coordinates LLM, tools, and policy engine.
// This is the main entry point for the AI agent layer.

import { z } from 'zod';
import { generateId } from './utils';
import { policyEngine } from './policy-engine';
import type {
  ParsedExecutionIntent,
  PolicyEvaluationResult,
  StrategyOpportunity,
  ConnectedWalletState,
  Policy,
} from '@canton/shared';
import { DEFAULT_LIMITS } from '@canton/shared/constants';

import type { LLMService } from './llm/service';
import { OpenAICompatibleService } from './llm/providers/openai-compatible';
import {
  AgentPlanResponseSchema,
  AgentExplainResponseSchema,
  InterpretedIntentSchema,
  type AgentPlanResponse,
  type AgentExplainResponse,
  type InterpretedIntent,
  fallbackParse,
} from './llm/parser';
import {
  getWalletSnapshot,
  listSeededOpportunities,
  filterOpportunities,
  buildExecutionPreview,
  type OpportunityOutput,
} from './llm/tools';
import {
  sanitizeUserInput,
  checkDisallowedAction,
  checkRequestedProviders,
  checkBudgetOvershoot,
  logSafetyEvent,
} from './llm/safety';

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

// ─── Re-exports for convenience ───────────────────────────────────────────────

export type { AgentPlanResponse, AgentExplainResponse, InterpretedIntent } from './llm/parser';

// ─── Agent ───────────────────────────────────────────────────────────────────

export class AgentOrchestrator {
  private llm: LLMService | null = null;
  private opportunities: StrategyOpportunity[] = [];
  private policies: Policy[] = [];
  private wallet: ConnectedWalletState | null = null;
  private isSimulated: boolean = true;

  /**
   * Configure the LLM service. If not called, falls back to rule-based parsing.
   */
  configure(llm: LLMService): void {
    this.llm = llm;
  }

  /**
   * Configure with OpenAI-compatible service from environment variables.
   * Returns false if no API key is set.
   */
  configureFromEnv(): boolean {
    const svc = OpenAICompatibleService.fromEnv();
    if (!svc) return false;
    this.llm = svc;
    return true;
  }

  /**
   * Set current opportunities from the DB.
   */
  setOpportunities(opportunities: StrategyOpportunity[]): void {
    this.opportunities = opportunities;
  }

  /**
   * Set current policies from the DB.
   */
  setPolicies(policies: Policy[]): void {
    this.policies = policies;
    policyEngine.setPolicies(policies);
  }

  /**
   * Set current wallet state.
   */
  setWallet(wallet: ConnectedWalletState): void {
    this.wallet = wallet;
    this.isSimulated = wallet.isDemo || !wallet.isConnected;
  }

  getSimulationFlag(): boolean {
    return this.isSimulated;
  }

  // ── Generate plan ────────────────────────────────────────────────────────

  async generatePlan(userText: string): Promise<{
    plan: AgentPlanResponse;
    intentId: string;
    llmParseFallback: boolean;
  }> {
    const sanitized = sanitizeUserInput(userText);
    const intentId = generateId();

    // Safety checks first
    const disallowedCheck = checkDisallowedAction(sanitized);
    if (disallowedCheck.rejected) {
      logSafetyEvent('AGENT_DISALLOWED_ACTION', {
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
        errorMessage: null,
      });

      const fallback = fallbackParse(sanitized);
      const rejectionPlan = this._buildRejectionPlan(sanitized, fallback.interpretedIntent, intentId, disallowedCheck.reason);
      return { plan: rejectionPlan, intentId, llmParseFallback: false };
    }

    // Build wallet snapshot
    const snapshot = this.wallet
      ? getWalletSnapshot({}, this.wallet, this.policies)
      : this._emptySnapshot();

    // Try LLM if configured
    let interpretedIntent = fallbackParse(sanitized).interpretedIntent;
    let llmParseFallback = true;

    if (this.llm) {
      try {
        const llmResult = await this._callLlmForIntent(sanitized);
        if (llmResult.valid) {
          interpretedIntent = llmResult.data;
          llmParseFallback = false;
        }
      } catch (err: unknown) {
        // LLM failed — log and continue with fallback
        logSafetyEvent('AGENT_PARSE_FAILED', {
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
          errorMessage: err instanceof Error ? err.message : String(err),
        });
      }
    }

    // Build execution intent for policy engine
    const execIntent = this._buildExecutionIntent(interpretedIntent, intentId);

    // Evaluate against policy engine
    const policyResult = this.wallet
      ? policyEngine.evaluate(execIntent, this.wallet)
      : this._noWalletVerdict(execIntent);

    // Budget overshoot warning
    const overshoot = checkBudgetOvershoot(execIntent, DEFAULT_LIMITS.MAX_PER_TRADE_MICRO_CC);
    if (overshoot.overshoot) {
      logSafetyEvent('AGENT_BUDGET_OVERSHOOT', {
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
        errorMessage: null,
      });
    }

    // Get shortlisted opportunities
    const shortlisted = this._shortlistOpportunities(interpretedIntent);

    // Build recommended plan
    const recommendedPlan = this._buildRecommendedPlan(interpretedIntent, shortlisted, execIntent);

    // Determine next action
    const nextAction = this._determineNextAction(policyResult, interpretedIntent);

    // Build disclaimer
    const disclaimer = this.isSimulated
      ? '⚠️ Simulated preview — no real transaction will be executed. Market data is from seeded opportunities, not live data.'
      : 'This plan is based on live market data. Confirm to execute.';

    const plan: AgentPlanResponse = {
      interpretedIntent,
      walletSnapshotSummary: snapshot,
      shortlistedOpportunities: shortlisted,
      recommendedPlan,
      whyThisPlan: this._buildWhyThisPlan(interpretedIntent, shortlisted, policyResult),
      policyVerdict: {
        decision: policyResult.decision,
        blockedBy: policyResult.blockedBy,
        passedChecks: policyResult.riskChecks
          .filter((c) => c.verdict === 'PASS' || c.verdict === 'WARN')
          .map((c) => c.checkType),
        failedChecks: policyResult.riskChecks
          .filter((c) => c.verdict === 'FAIL')
          .map((c) => c.checkType),
      },
      nextAction,
      disclaimer,
      isSimulated: this.isSimulated,
      isBasedOnSeededData: this.opportunities.length > 0 && !this._hasLiveOpportunities(),
    };

    // Log audit event
    logSafetyEvent('AGENT_PLAN_GENERATED', {
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
      errorMessage: null,
    });

    return { plan, intentId, llmParseFallback };
  }

  // ── Generate explanation ─────────────────────────────────────────────────

  async generateExplain(userText: string): Promise<{
    explanation: AgentExplainResponse;
    intentId: string;
  }> {
    const sanitized = sanitizeUserInput(userText);
    const intentId = generateId();

    const disallowedCheck = checkDisallowedAction(sanitized);
    if (disallowedCheck.rejected) {
      logSafetyEvent('AGENT_REJECTED', {
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
        errorMessage: null,
      });

      return {
        explanation: {
          summary: sanitized,
          whatWillHappen: 'This request cannot be processed.',
          whatCouldGoWrong: [disallowedCheck.reason ?? 'Disallowed action type.'],
          alternativeOptions: [],
          policyConstraints: [],
          disclaimer: 'No real transaction will be executed.',
          isSimulated: true,
        },
        intentId,
      };
    }

    const { plan } = await this.generatePlan(sanitized);

    const whatCouldGoWrong: string[] = [];
    if (plan.policyVerdict.decision === 'DENIED') {
      whatCouldGoWrong.push(`Policy blocked: ${plan.policyVerdict.blockedBy}`);
    }
    if (plan.shortlistedOpportunities.some((o) => o.riskLevel === 'HIGH')) {
      whatCouldGoWrong.push('High-risk strategies are included in results — review carefully.');
    }
    if (plan.isSimulated) {
      whatCouldGoWrong.push('Execution is simulated — no real on-chain effect.');
    }

    const explanation: AgentExplainResponse = {
      summary: sanitized,
      whatWillHappen: this._buildWhatWillHappen(plan),
      whatCouldGoWrong,
      alternativeOptions: plan.shortlistedOpportunities
        .slice(1, 3)
        .map((o) => `${o.strategyName} via ${o.providerName} at ${o.aprPercent.toFixed(2)}% APR`),
      policyConstraints: plan.policyVerdict.passedChecks.map((c) => `✓ ${c.replace(/_/g, ' ')}`),
      disclaimer: plan.disclaimer,
      isSimulated: plan.isSimulated,
    };

    logSafetyEvent('AGENT_EXPLAIN_GENERATED', {
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
      errorMessage: null,
    });

    return { explanation, intentId };
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  private async _callLlmForIntent(text: string): Promise<{
    valid: boolean;
    data: InterpretedIntent;
  }> {
    if (!this.llm) return { valid: false, data: null as unknown as InterpretedIntent };

    const result = await this.llm.structuredOutput(
      text,
      SYSTEM_PROMPT,
      InterpretedIntentSchema,
      2,
    );

    return { valid: true, data: result };
  }

  private _buildExecutionIntent(
    interpretedIntent: InterpretedIntent,
    intentId: string,
  ): ParsedExecutionIntent {
    return {
      id: intentId,
      action: interpretedIntent.action as ParsedExecutionIntent['action'],
      naturalLanguage: {
        rawText: '',
        confidence: interpretedIntent.confidence,
        parsedAt: new Date().toISOString(),
      },
      amountMicroCC: interpretedIntent.amountMicroCC,
      minAmountMicroCC: null,
      maxSlippageBps: interpretedIntent.maxSlippageBps,
      strategyFilter: interpretedIntent.providerFilter ?? undefined,
      providerFilter: interpretedIntent.providerFilter ?? undefined,
      assetFilter: interpretedIntent.assetFilter ?? undefined,
      requireApproval: interpretedIntent.requireApproval,
      simulationOnly: interpretedIntent.simulationOnly,
      parsedErrors: [],
    };
  }

  private _shortlistOpportunities(
    intent: InterpretedIntent,
  ): AgentPlanResponse['shortlistedOpportunities'] {
    const riskLevelMap: Record<string, string | undefined> = {
      low: 'LOW',
      medium: 'MEDIUM',
      high: 'HIGH',
    };

    const riskFilter = intent.riskTolerance ? riskLevelMap[intent.riskTolerance] : undefined;

    const allOpps = intent.providerFilter?.length
      ? filterOpportunities({ providers: intent.providerFilter }, this.opportunities)
      : listSeededOpportunities({ limit: 5 }, this.opportunities);

    const filtered = riskFilter
      ? allOpps.filter((o) => o.riskLevel === riskFilter)
      : allOpps;

    return filtered.slice(0, 5).map((opp, idx): AgentPlanResponse['shortlistedOpportunities'][number] => ({
      id: opp.id,
      provider: opp.provider,
      providerName: opp.providerName,
      strategyName: opp.strategyName,
      aprPercent: opp.aprPercent,
      aprBps: opp.aprBps,
      riskLevel: opp.riskLevel as 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN',
      executionSupport: opp.executionSupport,
      isWhitelisted: opp.isWhitelisted,
      liquidityMicroCC: opp.liquidityMicroCC,
      estimatedOutputMicroCC:
        intent.amountMicroCC !== null
          ? Math.floor(intent.amountMicroCC * (1 + opp.aprBps / 10000 / 365))
          : null,
      estimatedExecutionCostMicroCC: opp.estimatedExecutionCostMicroCC,
      minAmountMicroCC: opp.minAmountMicroCC,
      slippageToleranceBps: opp.slippageToleranceBps,
      expiry: opp.expiry,
      rank: idx + 1,
      reason: this._oppReason(opp, intent),
    }));
  }

  private _oppReason(opp: OpportunityOutput, intent: InterpretedIntent): string {
    const reasons: string[] = [];
    reasons.push(`${opp.aprPercent.toFixed(2)}% APR`);
    if (opp.riskLevel === 'LOW') reasons.push('low risk');
    if (opp.executionSupport === 'simulated') reasons.push('simulated-only');
    if (intent.providerFilter?.includes(opp.provider)) reasons.push('matches your provider filter');
    return reasons.join(' · ');
  }

  private _buildRecommendedPlan(
    intent: InterpretedIntent,
    shortlisted: AgentPlanResponse['shortlistedOpportunities'],
    execIntent: ParsedExecutionIntent,
  ): AgentPlanResponse['recommendedPlan'] {
    const top = shortlisted[0];

    return {
      step: 1,
      action: intent.action,
      opportunityId: top?.id ?? null,
      amountMicroCC: intent.amountMicroCC ?? top?.estimatedOutputMicroCC ?? null,
      description: top
        ? `Deploy ${intent.amountMicroCC !== null ? (intent.amountMicroCC / 1_000_000).toFixed(2) : 'all'} CC to ${top.strategyName} via ${top.providerName}`
        : 'No matching opportunity found — review shortlisted options.',
      estimatedOutputMicroCC: top?.estimatedOutputMicroCC ?? null,
      estimatedExecutionCostMicroCC: top?.estimatedExecutionCostMicroCC ?? 5000,
      isSimulation: this.isSimulated || intent.simulationOnly || execIntent.simulationOnly,
    };
  }

  private _buildWhyThisPlan(
    intent: InterpretedIntent,
    shortlisted: AgentPlanResponse['shortlistedOpportunities'],
    policyResult: PolicyEvaluationResult,
  ): string {
    const top = shortlisted[0];
    if (!top) return 'No opportunities matched your criteria.';

    const parts: string[] = [];
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

  private _determineNextAction(
    policyResult: PolicyEvaluationResult,
    intent: InterpretedIntent,
  ): AgentPlanResponse['nextAction'] {
    if (policyResult.decision === 'DENIED') return 'blocked';
    if (policyResult.decision === 'REQUIRES_APPROVAL') return 'request_approval';
    if (intent.executionPreference === 'preview') return 'preview_only';
    return 'execute';
  }

  private _buildWhatWillHappen(plan: AgentPlanResponse): string {
    if (plan.shortlistedOpportunities.length === 0) {
      return 'No opportunities match your request. The agent will not execute anything.';
    }
    const top = plan.shortlistedOpportunities[0];
    const amount = plan.interpretedIntent.amountMicroCC !== null
      ? `${(plan.interpretedIntent.amountMicroCC / 1_000_000).toFixed(2)} CC`
      : 'your full balance';

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

  private _buildRejectionPlan(
    text: string,
    intent: { action: string },
    intentId: string,
    reason: string | null,
  ): AgentPlanResponse {
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
        executionPreference: 'preview',
      },
      walletSnapshotSummary: this.wallet
        ? getWalletSnapshot({}, this.wallet, this.policies)
        : this._emptySnapshot(),
      shortlistedOpportunities: [],
      recommendedPlan: {
        step: 0,
        action: 'BLOCKED',
        opportunityId: null,
        amountMicroCC: null,
        description: `Request rejected: ${reason ?? 'This action is not supported.'}`,
        estimatedOutputMicroCC: null,
        estimatedExecutionCostMicroCC: 0,
        isSimulation: true,
      },
      whyThisPlan: reason ?? 'This action is not supported by the safety policy.',
      policyVerdict: {
        decision: 'DENIED',
        blockedBy: reason,
        passedChecks: [],
        failedChecks: ['DISALLOWED_ACTION_CHECK'],
      },
      nextAction: 'blocked',
      disclaimer: '⚠️ This request was blocked by the safety policy. No action will be taken.',
      isSimulated: true,
      isBasedOnSeededData: false,
    };
  }

  private _emptySnapshot(): AgentPlanResponse['walletSnapshotSummary'] {
    return {
      address: '0x0000000000000000000000000000000000000000',
      totalBalanceMicroCC: 0,
      dailyUsageMicroCC: 0,
      dailyLimitMicroCC: DEFAULT_LIMITS.MAX_DAILY_MICRO_CC,
      canExecuteReal: false,
      simulationOnly: true,
    };
  }

  private _noWalletVerdict(intent: ParsedExecutionIntent): PolicyEvaluationResult {
    return {
      intentId: intent.id,
      decision: intent.simulationOnly ? 'REQUIRES_APPROVAL' : 'DENIED',
      riskChecks: [],
      blockedBy: 'No wallet connected. Connect a wallet to execute real transactions.',
      blockedByPolicyId: null,
      reasons: [],
      warnings: [],
      evaluatedAt: new Date().toISOString(),
    };
  }

  private _hasLiveOpportunities(): boolean {
    return this.opportunities.some((o) => o.executionSupport === 'real');
  }
}

// Singleton orchestrator
export const agentOrchestrator = new AgentOrchestrator();

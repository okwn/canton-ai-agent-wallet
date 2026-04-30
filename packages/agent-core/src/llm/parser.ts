// Structured-output parser — converts LLM responses into typed agent plan objects.
// All outputs pass through strict Zod validation.
// Malformed responses trigger fallback to rule-based parsing.

import { z } from 'zod';
import { parseIntent as ruleBasedParse } from '../intent-parser';
import { generateId } from '../utils';

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const InterpretedIntentSchema = z.object({
  action: z.enum([
    'FIND_YIELD',
    'EXECUTE_STRATEGY',
    'CHECK_BALANCE',
    'SET_POLICY',
    'ADD_STRATEGY',
    'REMOVE_STRATEGY',
    'VIEW_OPPORTUNITIES',
    'UNKNOWN',
  ]),
  confidence: z.number().min(0).max(1),
  amountMicroCC: z.number().nullable(),
  maxSlippageBps: z.number().nullable(),
  providerFilter: z.array(z.string()).nullable().default(null),
  assetFilter: z.array(z.string()).nullable().default(null),
  requireApproval: z.boolean().default(false),
  simulationOnly: z.boolean().default(false),
  riskTolerance: z.enum(['low', 'medium', 'high']).nullable().default(null),
  executionPreference: z.enum(['preview', 'execute']).default('preview'),
});

export type InterpretedIntent = z.infer<typeof InterpretedIntentSchema>;

export const ShortlistedOpportunitySchema = z.object({
  id: z.string(),
  rank: z.number().int().positive(),
  provider: z.string(),
  providerName: z.string(),
  strategyName: z.string(),
  aprPercent: z.number(),
  aprBps: z.number(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN']),
  executionSupport: z.string(),
  isWhitelisted: z.boolean(),
  liquidityMicroCC: z.number(),
  minAmountMicroCC: z.number(),
  slippageToleranceBps: z.number(),
  estimatedOutputMicroCC: z.number().nullable(),
  estimatedExecutionCostMicroCC: z.number(),
  expiry: z.string().nullable(),
  reason: z.string(),
});

export const RecommendedPlanSchema = z.object({
  step: z.number().int().positive(),
  action: z.string(),
  opportunityId: z.string().nullable(),
  amountMicroCC: z.number().nullable(),
  description: z.string(),
  estimatedOutputMicroCC: z.number().nullable(),
  estimatedExecutionCostMicroCC: z.number(),
  isSimulation: z.boolean(),
});

export const AgentPlanResponseSchema = z.object({
  interpretedIntent: InterpretedIntentSchema,
  walletSnapshotSummary: z.object({
    address: z.string(),
    totalBalanceMicroCC: z.number(),
    dailyUsageMicroCC: z.number(),
    dailyLimitMicroCC: z.number(),
    canExecuteReal: z.boolean(),
    simulationOnly: z.boolean(),
  }),
  shortlistedOpportunities: z.array(ShortlistedOpportunitySchema),
  recommendedPlan: RecommendedPlanSchema,
  whyThisPlan: z.string(), // plain-English explanation
  policyVerdict: z.object({
    decision: z.enum(['APPROVED', 'DENIED', 'REQUIRES_APPROVAL']),
    blockedBy: z.string().nullable(),
    passedChecks: z.array(z.string()),
    failedChecks: z.array(z.string()),
  }),
  nextAction: z.enum(['preview_only', 'request_approval', 'execute', 'blocked']),
  disclaimer: z.string().default('This is a simulated preview. No real transaction will be executed.'),
  isSimulated: z.boolean().default(true),
  isBasedOnSeededData: z.boolean().default(true),
});

export type AgentPlanResponse = z.infer<typeof AgentPlanResponseSchema>;

export const AgentExplainResponseSchema = z.object({
  summary: z.string(), // what the user asked
  whatWillHappen: z.string(), // step-by-step plain English
  whatCouldGoWrong: z.array(z.string()).default([]),
  alternativeOptions: z.array(z.string()).default([]),
  policyConstraints: z.array(z.string()).default([]),
  disclaimer: z.string().default('This is a simulated preview. No real transaction will be executed.'),
  isSimulated: z.boolean().default(true),
});

export type AgentExplainResponse = z.infer<typeof AgentExplainResponseSchema>;

// ─── Fallback parser ─────────────────────────────────────────────────────────

export interface FallbackParseResult {
  interpretedIntent: InterpretedIntent;
  fallback: true;
}

/**
 * When the LLM fails to produce valid structured output, fall back to the
 * rule-based parser. This ensures the app never dead-ends on a bad LLM response.
 */
export function fallbackParse(text: string): FallbackParseResult {
  const parsed = ruleBasedParse(text);

  const riskToleranceMap: Record<string, InterpretedIntent['riskTolerance']> = {
    low: 'low',
    medium: 'medium',
    high: 'high',
  };

  // Very rough heuristic: if the text contains "low risk" or "safe", assume low
  const risk =
    /\b(low\s+risk|very\s+safe|conservative)\b/i.test(text)
      ? 'low'
      : /\b(high\s+risk|aggressive)\b/i.test(text)
        ? 'high'
        : null;

  // Preview vs execute: "show me what you would do", "preview", "simulate" → preview
  const execPref =
    /\b(preview|show\s+me|what\s+you\s+would|simulate|demo)\b/i.test(text) ? 'preview' : 'execute';

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
      executionPreference: execPref,
    },
    fallback: true,
  };
}

// ─── Validation wrapper ───────────────────────────────────────────────────────

export interface ParseResult<T> {
  data: T;
  valid: boolean;
  fallback: boolean;
  rawContent?: string;
  error?: string;
}

/**
 * Parse and validate an LLM text response against a Zod schema.
 * On failure, falls back to the rule-based parser for plan generation,
 * or returns a safe error object for explain requests.
 */
export function validateStructuredOutput<T extends z.ZodType>(
  rawContent: string,
  schema: T,
  fallbackFn?: (text: string) => unknown,
): ParseResult<z.infer<T>> {
  try {
    const parsed = schema.safeParse(JSON.parse(rawContent));
    if (parsed.success) {
      return { data: parsed.data, valid: true, fallback: false };
    }

    return {
      data: null as z.infer<T>,
      valid: false,
      fallback: false,
      rawContent,
      error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
    };
  } catch (err: unknown) {
    // JSON parse failed
    if (fallbackFn) {
      try {
        const fallbackData = fallbackFn(rawContent) as z.infer<T>;
        const validated = schema.safeParse(fallbackData);
        if (validated.success) {
          return { data: validated.data, valid: true, fallback: true };
        }
      } catch {
        // fallback also failed
      }
    }

    return {
      data: null as z.infer<T>,
      valid: false,
      fallback: false,
      rawContent,
      error: err instanceof Error ? err.message : 'Unknown parse error',
    };
  }
}

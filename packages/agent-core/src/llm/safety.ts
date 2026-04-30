// Safety features — sanitization, disallowed action rejection, audit logging.

import { z } from 'zod';
import type { ParsedExecutionIntent, PolicyEvaluationResult } from '@canton/shared';
import { generateId } from '../utils';

// ─── Input sanitization ──────────────────────────────────────────────────────

const DANGEROUS_CHARS = /[<>'"`&;\\$]/g;
const MAX_INPUT_LEN = 500;

export function sanitizeUserInput(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(DANGEROUS_CHARS, '')
    .slice(0, MAX_INPUT_LEN)
    .trim();
}

// ─── Disallowed action types ──────────────────────────────────────────────────

const ALWAYS_DISALLOWED = new Set([
  'WALLET_DRAIN',
  'TRANSFER_TO_UNKNOWN',
  'APPROVE_UNLIMITED',
  'SET_AUTHORITY',
]);

const DISALLOWED_PATTERNS = [
  /transfer.*all.*tokens/i,
  /drain.*wallet/i,
  /approve.*unlimited/i,
  /set.*owner.*address/i,
  /change.*admin.*key/i,
];

export interface DisallowedAction {
  rejected: boolean;
  reason: string | null;
}

export function checkDisallowedAction(text: string): DisallowedAction {
  const normalized = text.toLowerCase();

  // Check explicit disallowed action types
  for (const action of ALWAYS_DISALLOWED) {
    if (normalized.includes(action.toLowerCase())) {
      return {
        rejected: true,
        reason: `Action "${action}" is not supported and will never be executed.`,
      };
    }
  }

  // Check dangerous patterns
  for (const pattern of DISALLOWED_PATTERNS) {
    if (pattern.test(text)) {
      return {
        rejected: true,
        reason: 'This request matches a pattern that is not permitted by the safety policy.',
      };
    }
  }

  return { rejected: false, reason: null };
}

// ─── Unsupported provider rejection ─────────────────────────────────────────

const KNOWN_PROVIDERS = new Set(['froburn', 'lace', 'cantonswap']);

export interface ProviderRejection {
  rejected: boolean;
  requestedProviders: string[];
  reason: string | null;
}

export function checkRequestedProviders(text: string): ProviderRejection {
  const mentioned: string[] = [];

  // Look for provider names in the input
  const providerKeywords = ['froburn', 'lace', 'cantonswap', 'fro', 'cswap'];
  for (const kw of providerKeywords) {
    if (text.toLowerCase().includes(kw)) {
      // Map to canonical provider names
      if (kw === 'fro' || kw === 'froburn') mentioned.push('froburn');
      else if (kw === 'lace') mentioned.push('lace');
      else if (kw === 'cswap' || kw === 'cantonswap') mentioned.push('cantonswap');
    }
  }

  // Unknown providers (not in the seeded list) should be flagged
  const unknown = mentioned.filter((p) => !KNOWN_PROVIDERS.has(p));
  if (unknown.length > 0) {
    return {
      rejected: true,
      requestedProviders: unknown,
      reason: `Provider(s) "${unknown.join(', ')}" are not supported. Known providers: ${[...KNOWN_PROVIDERS].join(', ')}.`,
    };
  }

  return { rejected: false, requestedProviders: mentioned, reason: null };
}

// ─── Budget overshoot check ─────────────────────────────────────────────────

export interface BudgetOvershoot {
  overshoot: boolean;
  requestedMicroCC: number | null;
  limitMicroCC: number;
  reason: string | null;
}

export function checkBudgetOvershoot(
  intent: ParsedExecutionIntent,
  defaultLimitMicroCC: number,
): BudgetOvershoot {
  const limit = defaultLimitMicroCC;

  if (intent.amountMicroCC === null) {
    return { overshoot: false, requestedMicroCC: null, limitMicroCC: limit, reason: null };
  }

  if (intent.amountMicroCC > limit) {
    return {
      overshoot: true,
      requestedMicroCC: intent.amountMicroCC,
      limitMicroCC: limit,
      reason: `Requested amount of ${(intent.amountMicroCC / 1_000_000).toFixed(2)} CC exceeds the maximum per-trade limit of ${(limit / 1_000_000).toFixed(2)} CC.`,
    };
  }

  return { overshoot: false, requestedMicroCC: intent.amountMicroCC, limitMicroCC: limit, reason: null };
}

// ─── Audit event logger ───────────────────────────────────────────────────────

export type SafetyAuditEventType =
  | 'AGENT_PLAN_GENERATED'
  | 'AGENT_EXPLAIN_GENERATED'
  | 'AGENT_REJECTED'
  | 'AGENT_DISALLOWED_ACTION'
  | 'AGENT_BUDGET_OVERSHOOT'
  | 'AGENT_PARSE_FAILED';

export interface SafetyAuditEntry {
  id: string;
  eventType: SafetyAuditEventType;
  userInput: string;
  sanitizedInput: string;
  walletAddress: string | null;
  intentId: string | null;
  isSimulated: boolean;
  isBasedOnSeededData: boolean;
  llmParseFailed: boolean;
  llmParseFallback: boolean;
  policyDecision: string | null;
  disallowedReason: string | null;
  overshootReason: string | null;
  errorMessage: string | null;
  createdAt: string;
}

export interface AuditLogger {
  log(event: Omit<SafetyAuditEntry, 'id' | 'createdAt'>): void;
}

class ConsoleAuditLogger implements AuditLogger {
  log(event: Omit<SafetyAuditEntry, 'id' | 'createdAt'>): void {
    // Only log in non-production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' && !process.env.AI_AUDIT_LOG_ENABLED) return;

    const prefix = '[AI-AUDIT]';
    const emoji =
      event.eventType === 'AGENT_REJECTED' || event.eventType === 'AGENT_DISALLOWED_ACTION'
        ? '🔴'
        : event.llmParseFallback
          ? '🟡'
          : '✅';

    console.info(
      `${prefix} ${emoji} ${event.eventType}`,
      {
        input: event.sanitizedInput.slice(0, 80),
        wallet: event.walletAddress ?? 'none',
        simulated: event.isSimulated,
        policyDecision: event.policyDecision,
        fallback: event.llmParseFallback,
        disallowedReason: event.disallowedReason,
      },
    );
  }
}

// Singleton audit logger
let _auditLogger: AuditLogger = new ConsoleAuditLogger();

export function setAuditLogger(logger: AuditLogger): void {
  _auditLogger = logger;
}

export function createAuditEntry(
  eventType: SafetyAuditEventType,
  params: {
    userInput: string;
    walletAddress: string | null;
    intentId: string | null;
    isSimulated: boolean;
    isBasedOnSeededData: boolean;
    llmParseFailed: boolean;
    llmParseFallback: boolean;
    policyDecision: string | null;
    disallowedReason: string | null;
    overshootReason: string | null;
    errorMessage: string | null;
  },
): SafetyAuditEntry {
  return {
    id: generateId(),
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
    createdAt: new Date().toISOString(),
  };
}

export function logSafetyEvent(
  eventType: SafetyAuditEventType,
  params: {
    userInput: string;
    walletAddress: string | null;
    intentId: string | null;
    isSimulated: boolean;
    isBasedOnSeededData: boolean;
    llmParseFailed: boolean;
    llmParseFallback: boolean;
    policyDecision: string | null;
    disallowedReason: string | null;
    overshootReason: string | null;
    errorMessage: string | null;
  },
): void {
  const entry = createAuditEntry(eventType, params);
  _auditLogger.log(entry);
}

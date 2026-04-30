// Intent Parser — converts natural language to ParsedExecutionIntent
import {
  ParsedExecutionIntentSchema,
  IntentActionSchema,
  NaturalLanguageIntentSchema,
  type ParsedExecutionIntent,
  type IntentAction,
} from '@canton/shared';
import { z } from 'zod';

// ─── Keyword patterns ────────────────────────────────────────────────────────

const ACTION_PATTERNS: Array<{ pattern: RegExp; action: IntentAction; confidence: number }> = [
  { pattern: /cheapest\s+yield|best\s+yield|find\s+.*yield|highest\s+apr/i, action: 'FIND_YIELD', confidence: 0.88 },
  { pattern: /yield.*up\s+to|yield.*max|yield.*no\s+more/i, action: 'FIND_YIELD', confidence: 0.82 },
  { pattern: /\bbuy\b|\bpurchase\b|\bswap\b|\bexecute.*strategy/i, action: 'EXECUTE_STRATEGY', confidence: 0.8 },
  { pattern: /strategy.*execute|execute.*strategy/i, action: 'EXECUTE_STRATEGY', confidence: 0.85 },
  { pattern: /\bbalance\b|how\s+much|what.*have|check.*funds/i, action: 'CHECK_BALANCE', confidence: 0.9 },
  { pattern: /set.*max|set.*limit|update.*policy|set.*policy/i, action: 'SET_POLICY', confidence: 0.85 },
  { pattern: /add.*strategy|new.*strategy|whitelist.*strategy/i, action: 'ADD_STRATEGY', confidence: 0.8 },
  { pattern: /remove.*strategy|delete.*strategy|unlist.*strategy/i, action: 'REMOVE_STRATEGY', confidence: 0.8 },
  { pattern: /list.*opportunities|show.*yield|view.*strategies/i, action: 'VIEW_OPPORTUNITIES', confidence: 0.85 },
];

const ASSET_PATTERNS = [
  { pattern: /\bCC\b|\bcanton\s*coin\b/i, asset: 'CC' },
  { pattern: /\bUSDC\b|\busdc\b/i, asset: 'USDC' },
  { pattern: /\bETH\b|\bethereum\b/i, asset: 'ETH' },
];

const PROVIDER_PATTERNS = [
  { pattern: /\bfroburn\b|\bfro\b/i, provider: 'froburn' },
  { pattern: /\blace\b/i, provider: 'lace' },
  { pattern: /\bcantonswap\b|\bcswap\b/i, provider: 'cantonswap' },
];

const AMOUNT_PATTERN = /(\d+(?:\.\d+)?)\s*(cc|CC)/;
const SLIPPAGE_PATTERN = /(\d+(?:\.\d+)?)\s*%(?:slippage)?/i;
const APPROVAL_SIGNAL = /require.*approval|need.*confirm|ask\s+me|confirm.*first/i;
const SIMULATION_SIGNAL = /\bsim(ulate)?\b|\bdemo\b|\btest\b/;

function extractAction(text: string): { action: IntentAction; confidence: number } {
  for (const { pattern, action, confidence } of ACTION_PATTERNS) {
    if (pattern.test(text)) return { action, confidence };
  }
  return { action: 'UNKNOWN', confidence: 0.3 };
}

function extractAmount(text: string): number | null {
  const match = text.match(AMOUNT_PATTERN);
  if (!match) return null;
  const amount = parseFloat(match[1]);
  if (isNaN(amount) || amount <= 0) return null;
  return Math.round(amount * 1_000_000); // convert to micro-CC
}

function extractSlippage(text: string): number | null {
  const match = text.match(SLIPPAGE_PATTERN);
  if (!match) return null;
  const bps = Math.round(parseFloat(match[1]) * 100);
  return bps > 0 ? bps : null;
}

function extractAssets(text: string): string[] {
  const found = new Set<string>();
  for (const { asset } of ASSET_PATTERNS) {
    if (asset === 'CC' && (/\bCC\b/.test(text) || /canton\s*coin/i.test(text))) {
      found.add('CC');
    } else if (ASSET_PATTERNS.find(p => p.asset === asset)?.pattern.test(text)) {
      found.add(asset);
    }
  }
  return Array.from(found);
}

function extractProviders(text: string): string[] {
  const found = new Set<string>();
  for (const { provider } of PROVIDER_PATTERNS) {
    if (PROVIDER_PATTERNS.find(p => p.provider === provider)?.pattern.test(text)) {
      found.add(provider);
    }
  }
  return Array.from(found);
}

function extractMinMax(text: string): { min?: number; max?: number } {
  const result: { min?: number; max?: number } = {};
  // "up to X" or "max X" or "no more than X"
  const maxMatch = text.match(/(?:up\s+to|max|no\s+more\s+than|under)\s*(\d+(?:\.\d+)?)/i);
  if (maxMatch) {
    result.max = Math.round(parseFloat(maxMatch[1]) * 1_000_000);
  }
  return result;
}

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Parse a natural language command into a structured ParsedExecutionIntent.
 */
export function parseIntent(text: string): ParsedExecutionIntent {
  const errors: string[] = [];
  const trimmed = text.trim();

  if (!trimmed) {
    errors.push('Empty input');
    return ParsedExecutionIntentSchema.parse({
      id: generateId(),
      action: 'UNKNOWN',
      naturalLanguage: { rawText: '', confidence: 0, parsedAt: new Date().toISOString() },
      amountMicroCC: null,
      minAmountMicroCC: null,
      maxSlippageBps: null,
      strategyFilter: undefined,
      providerFilter: undefined,
      assetFilter: undefined,
      requireApproval: false,
      simulationOnly: false,
      parsedErrors: errors,
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

  const nlIntent = NaturalLanguageIntentSchema.parse({
    rawText: trimmed,
    confidence,
    parsedAt: new Date().toISOString(),
  });

  const parsed = ParsedExecutionIntentSchema.parse({
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
    parsedErrors: errors,
  });

  return parsed;
}

/** Human-readable summary of a parsed intent */
export function intentSummary(intent: ParsedExecutionIntent): string {
  const parts: string[] = [];
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

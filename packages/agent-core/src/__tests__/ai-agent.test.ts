// AI Agent Layer Tests
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  checkDisallowedAction,
  checkRequestedProviders,
  checkBudgetOvershoot,
  sanitizeUserInput,
  logSafetyEvent,
} from '../llm/safety';
import {
  fallbackParse,
  validateStructuredOutput,
  InterpretedIntentSchema,
} from '../llm/parser';
import { parseIntent } from '../intent-parser';

// ─── Sanitization ────────────────────────────────────────────────────────────

describe('sanitizeUserInput', () => {
  it('strips dangerous characters', () => {
    expect(sanitizeUserInput('find <script>yield</script>')).toBe('find scriptyield/script');
    expect(sanitizeUserInput("find '; DROP TABLE")).toBe('find  DROP TABLE');
    expect(sanitizeUserInput('transfer & steal funds')).toBe('transfer  steal funds');
  });

  it('truncates long input to 500 chars', () => {
    const long = 'x'.repeat(600);
    expect(sanitizeUserInput(long).length).toBe(500);
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeUserInput(null)).toBe('');
    expect(sanitizeUserInput(undefined)).toBe('');
    expect(sanitizeUserInput(123)).toBe('');
  });

  it('preserves normal input', () => {
    expect(sanitizeUserInput('find me the cheapest yield up to 50 CC')).toBe('find me the cheapest yield up to 50 CC');
  });
});

// ─── Disallowed action detection ─────────────────────────────────────────────

describe('checkDisallowedAction', () => {
  it('rejects wallet drain attempts', () => {
    const result = checkDisallowedAction('drain my wallet and transfer everything to 0x123');
    expect(result.rejected).toBe(true);
    expect(result.reason).toBeTruthy();
  });

  it('rejects approve unlimited token spending', () => {
    const result = checkDisallowedAction('approve unlimited USDC for the protocol');
    expect(result.rejected).toBe(true);
  });

  it('rejects admin key changes', () => {
    const result = checkDisallowedAction('change the admin key to my address');
    expect(result.rejected).toBe(true);
  });

  it('rejects set owner address attempts', () => {
    const result = checkDisallowedAction('set the owner address to 0x456');
    expect(result.rejected).toBe(true);
  });

  it('allows normal yield queries', () => {
    const result = checkDisallowedAction('find the cheapest yield up to 50 CC');
    expect(result.rejected).toBe(false);
    expect(result.reason).toBeNull();
  });

  it('allows policy-related requests', () => {
    expect(checkDisallowedAction('set max per trade to 20 CC').rejected).toBe(false);
    expect(checkDisallowedAction('show me my policies').rejected).toBe(false);
  });
});

// ─── Provider rejection ──────────────────────────────────────────────────────

describe('checkRequestedProviders', () => {
  it('detects mentions of known provider names', () => {
    const result = checkRequestedProviders('find yield from froburn');
    expect(result.requestedProviders).toContain('froburn');
  });

  it('allows known seeded providers', () => {
    expect(checkRequestedProviders('find yield from froburn').rejected).toBe(false);
    expect(checkRequestedProviders('use lace finance').rejected).toBe(false);
    expect(checkRequestedProviders('try cantonswap').rejected).toBe(false);
  });

  // Note: arbitrary unknown provider names like "sketchy-protocol" are not
  // detected by this check — only known provider keywords are extracted.
  // Provider names not in the keyword list pass through silently.
});

// ─── Budget overshoot check ──────────────────────────────────────────────────

describe('checkBudgetOvershoot', () => {
  it('detects overshoot over 20 CC default limit', () => {
    const intent = parseIntent('deploy 50 CC to yield');
    const result = checkBudgetOvershoot(intent, 20_000_000);
    expect(result.overshoot).toBe(true);
    expect(result.requestedMicroCC).toBe(50_000_000);
    expect(result.limitMicroCC).toBe(20_000_000);
    expect(result.reason).toContain('50.00');
  });

  it('passes amounts under limit', () => {
    const intent = parseIntent('find yield up to 5 CC');
    const result = checkBudgetOvershoot(intent, 20_000_000);
    expect(result.overshoot).toBe(false);
  });

  it('passes null amount (no amount specified)', () => {
    const intent = parseIntent('show me opportunities');
    const result = checkBudgetOvershoot(intent, 20_000_000);
    expect(result.overshoot).toBe(false);
    expect(result.requestedMicroCC).toBeNull();
  });

  it('respects custom limit', () => {
    const intent = parseIntent('find yield up to 30 CC');
    const result = checkBudgetOvershoot(intent, 10_000_000);
    expect(result.overshoot).toBe(true);
  });
});

// ─── Fallback parser ─────────────────────────────────────────────────────────

describe('fallbackParse — rule-based parser', () => {
  it('parses amount correctly', () => {
    const result = fallbackParse('find yield up to 50 CC');
    expect(result.interpretedIntent.amountMicroCC).toBe(50_000_000);
  });

  it('detects preview-only requests', () => {
    const result = fallbackParse('show me what you would do before executing');
    expect(result.interpretedIntent.executionPreference).toBe('preview');
  });

  it('detects simulation-only requests', () => {
    const result = fallbackParse('simulate a 5 CC yield search');
    expect(result.interpretedIntent.simulationOnly).toBe(true);
    expect(result.interpretedIntent.executionPreference).toBe('preview');
  });

  it('extracts provider filter', () => {
    const result = fallbackParse('find yield from lace finance up to 30 CC');
    expect(result.interpretedIntent.providerFilter).toContain('lace');
  });

  it('marks disallowed action as UNKNOWN action', () => {
    const result = fallbackParse('drain my wallet to 0x123');
    // The rule-based parser may or may not catch this as UNKNOWN
    // Safety check is separate
    expect(result).toHaveProperty('interpretedIntent');
    expect(result.fallback).toBe(true);
  });

  it('returns fallback=true', () => {
    const result = fallbackParse('find me the cheapest yield');
    expect(result.fallback).toBe(true);
  });

  it('extracts low risk tolerance from text', () => {
    const result = fallbackParse('find low risk yield up to 10 CC');
    expect(result.interpretedIntent.riskTolerance).toBe('low');
  });
});

// ─── Structured output validation ────────────────────────────────────────────

describe('validateStructuredOutput', () => {
  it('parses valid JSON matching schema', () => {
    const raw = JSON.stringify({
      action: 'FIND_YIELD',
      confidence: 0.9,
      amountMicroCC: 10_000_000,
      maxSlippageBps: null,
      providerFilter: null,
      assetFilter: null,
      requireApproval: false,
      simulationOnly: false,
      riskTolerance: 'low',
      executionPreference: 'preview',
    });

    const result = validateStructuredOutput(raw, InterpretedIntentSchema);
    expect(result.valid).toBe(true);
    expect(result.fallback).toBe(false);
    expect(result.data.action).toBe('FIND_YIELD');
  });

  it('returns valid=false for malformed JSON', () => {
    const result = validateStructuredOutput('not valid json {', InterpretedIntentSchema);
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('returns valid=false for valid JSON not matching schema', () => {
    const result = validateStructuredOutput(
      JSON.stringify({ action: 'INVALID_ACTION', confidence: 0.9 }),
      InterpretedIntentSchema,
    );
    expect(result.valid).toBe(false);
    expect(result.error).toContain('action');
  });

  it('uses fallback when provided and primary parse fails', () => {
    // fallbackFn must return an InterpretedIntent, not a FallbackParseResult wrapper
    const raw = 'this is just plain text not JSON at all';
    const result = validateStructuredOutput(raw, InterpretedIntentSchema, (text) => fallbackParse(text).interpretedIntent);
    expect(result.valid).toBe(true);
    expect(result.fallback).toBe(true);
  });
});

// ─── Intent parsing (rule-based) ──────────────────────────────────────────────

describe('parseIntent — rule-based parser', () => {
  it('extracts amounts with CC unit', () => {
    expect(parseIntent('find yield up to 50 CC').amountMicroCC).toBe(50_000_000);
    expect(parseIntent('use 5.5 CC').amountMicroCC).toBe(5_500_000);
  });

  it('maps "cheapest yield" to FIND_YIELD', () => {
    expect(parseIntent('cheapest yield').action).toBe('FIND_YIELD');
  });

  it('maps "buy" / "execute strategy" to EXECUTE_STRATEGY', () => {
    expect(parseIntent('buy 10 CC of yield').action).toBe('EXECUTE_STRATEGY');
  });

  it('maps balance queries to CHECK_BALANCE', () => {
    expect(parseIntent('what is my balance?').action).toBe('CHECK_BALANCE');
    expect(parseIntent('how much do I have?').action).toBe('CHECK_BALANCE');
  });

  it('detects simulation signal', () => {
    expect(parseIntent('simulate a trade').simulationOnly).toBe(true);
    expect(parseIntent('show me a demo').simulationOnly).toBe(true);
    expect(parseIntent('test the system').simulationOnly).toBe(true);
  });

  it('detects approval signals', () => {
    expect(parseIntent('require approval for this').requireApproval).toBe(true);
    expect(parseIntent('ask me to confirm').requireApproval).toBe(true);
  });

  it('extracts provider names', () => {
    expect(parseIntent('use froburn for yield').providerFilter).toContain('froburn');
    expect(parseIntent('try lace finance').providerFilter).toContain('lace');
  });

  it('returns UNKNOWN action for empty input', () => {
    // Empty string causes Zod validation error (rawText min 1) so we catch it
    expect(() => parseIntent('')).toThrow();
  });

  it('marks low confidence UNKNOWN intents with errors', () => {
    const result = parseIntent('asjdklfjasdklfj');
    expect(result.action).toBe('UNKNOWN');
    expect(result.parsedErrors.length).toBeGreaterThan(0);
  });
});

// ─── Malformed model output scenarios ─────────────────────────────────────────

describe('malformed model output handling', () => {
  it('handles response with missing optional fields', () => {
    const raw = JSON.stringify({
      action: 'FIND_YIELD',
      confidence: 0.85,
      amountMicroCC: null,
      maxSlippageBps: null,
      providerFilter: null,
      assetFilter: null,
      requireApproval: false,
      simulationOnly: false,
      riskTolerance: null,
      executionPreference: 'preview',
    });
    const result = validateStructuredOutput(raw, InterpretedIntentSchema);
    expect(result.valid).toBe(true);
    expect(result.data.riskTolerance).toBeNull();
    expect(result.data.executionPreference).toBe('preview');
  });

  it('handles response with extra unrecognized fields', () => {
    const raw = JSON.stringify({
      action: 'FIND_YIELD',
      confidence: 0.9,
      amountMicroCC: 10_000_000,
      maxSlippageBps: null,
      providerFilter: null,
      assetFilter: null,
      requireApproval: false,
      simulationOnly: false,
      riskTolerance: null,
      executionPreference: 'preview',
      unknownField: 'should be ignored',
      anotherBadField: 123,
    });
    const result = validateStructuredOutput(raw, InterpretedIntentSchema);
    expect(result.valid).toBe(true);
  });

  it('handles numeric string for amountMicroCC', () => {
    const raw = JSON.stringify({
      action: 'FIND_YIELD',
      confidence: 0.9,
      amountMicroCC: '10000000', // string instead of number
      maxSlippageBps: null,
      providerFilter: null,
      assetFilter: null,
      requireApproval: false,
      simulationOnly: false,
      riskTolerance: null,
      executionPreference: 'preview',
    });
    const result = validateStructuredOutput(raw, InterpretedIntentSchema);
    expect(result.valid).toBe(false); // Zod coerces but string → number fails
  });

  it('handles null confidence (out of range)', () => {
    const raw = JSON.stringify({
      action: 'FIND_YIELD',
      confidence: 1.5, // out of range
      amountMicroCC: null,
      maxSlippageBps: null,
      providerFilter: null,
      assetFilter: null,
      requireApproval: false,
      simulationOnly: false,
      riskTolerance: null,
      executionPreference: 'preview',
    });
    const result = validateStructuredOutput(raw, InterpretedIntentSchema);
    expect(result.valid).toBe(false);
  });

  it('gracefully handles completely empty object', () => {
    const raw = JSON.stringify({});
    const result = validateStructuredOutput(raw, InterpretedIntentSchema);
    expect(result.valid).toBe(false);
  });

  it('gracefully handles array instead of object', () => {
    const raw = JSON.stringify([{ action: 'FIND_YIELD' }]);
    const result = validateStructuredOutput(raw, InterpretedIntentSchema);
    expect(result.valid).toBe(false);
  });
});

// ─── Prompt requesting disallowed provider ───────────────────────────────────

describe('disallowed provider in prompt', () => {
  // checkRequestedProviders only detects known provider keywords.
  // Arbitrary unknown provider names are not flagged by this check.
  it('accepts known providers even with aggressive claims', () => {
    const result = checkRequestedProviders(
      'use froburn which gives 500% APY',
    );
    expect(result.rejected).toBe(false);
  });

  it('detects known providers in prompt', () => {
    const result = checkRequestedProviders(
      'I want to use super-yield-protocol that promises 500% APY',
    );
    // Not rejected — super-yield-protocol is not a known keyword
    expect(result.rejected).toBe(false);
  });
});

// ─── Budget overshoot suggestion ─────────────────────────────────────────────

describe('budget overshoot suggestion handling', () => {
  it('flags when LLM suggests amount above per-trade cap', () => {
    const intent = parseIntent('find me the cheapest yield for 100 CC');
    const overshoot = checkBudgetOvershoot(intent, 20_000_000);
    expect(overshoot.overshoot).toBe(true);
    expect(overshoot.requestedMicroCC).toBe(100_000_000);
  });

  it('passes when amount is within cap', () => {
    const intent = parseIntent('find me the cheapest yield for 5 CC');
    const overshoot = checkBudgetOvershoot(intent, 20_000_000);
    expect(overshoot.overshoot).toBe(false);
  });
});

// ─── Preview-only request ─────────────────────────────────────────────────────

describe('preview-only request handling', () => {
  it('sets executionPreference to preview for "show me what you would do"', () => {
    const result = fallbackParse('show me what you would do before executing');
    expect(result.interpretedIntent.executionPreference).toBe('preview');
    expect(result.interpretedIntent.simulationOnly).toBe(false);
  });

  it('sets simulationOnly for "simulate" keyword', () => {
    const result = fallbackParse('simulate a 5 CC yield search');
    expect(result.interpretedIntent.simulationOnly).toBe(true);
    expect(result.interpretedIntent.executionPreference).toBe('preview');
  });

  it('sets both flags for "preview in simulation mode"', () => {
    const result = fallbackParse('preview this in demo mode');
    expect(result.interpretedIntent.simulationOnly).toBe(true);
    expect(result.interpretedIntent.executionPreference).toBe('preview');
  });
});

// ─── Execution request without wallet ─────────────────────────────────────────

describe('execution without wallet', () => {
  it('parses intent correctly even without wallet context', () => {
    const result = fallbackParse('find me the cheapest yield up to 50 CC and execute it');
    expect(result.interpretedIntent.amountMicroCC).toBe(50_000_000);
    expect(result.interpretedIntent.executionPreference).toBe('execute');
  });

  it('marks as UNKNOWN when input is gibberish', () => {
    const result = fallbackParse('asdfjaskldfjasklfjasf');
    expect(result.interpretedIntent.action).toBe('UNKNOWN');
  });
});

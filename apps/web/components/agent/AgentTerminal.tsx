'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  TrendingUp,
  Wallet,
  ListChecks,
  Zap,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Plus,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { GhostButton } from '@/components/ui/GhostButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

// ─── Types ───────────────────────────────────────────────────────────────────

interface InterpretedIntent {
  action: string;
  confidence: number;
  amountMicroCC: number | null;
  maxSlippageBps: number | null;
  providerFilter: string[] | null;
  assetFilter: string[] | null;
  requireApproval: boolean;
  simulationOnly: boolean;
  riskTolerance: string | null;
  executionPreference: string;
}

interface WalletSnapshot {
  address: string;
  totalBalanceMicroCC: number;
  dailyUsageMicroCC: number;
  dailyLimitMicroCC: number;
  canExecuteReal: boolean;
  simulationOnly: boolean;
}

interface ShortlistedOpp {
  id: string;
  rank: number;
  provider: string;
  providerName: string;
  strategyName: string;
  aprPercent: number;
  aprBps: number;
  riskLevel: string;
  estimatedOutputMicroCC: number | null;
  estimatedExecutionCostMicroCC: number;
  executionSupport: string;
  reason: string;
}

interface RecommendedPlan {
  step: number;
  action: string;
  opportunityId: string | null;
  amountMicroCC: number | null;
  description: string;
  estimatedOutputMicroCC: number | null;
  estimatedExecutionCostMicroCC: number;
  isSimulation: boolean;
}

interface PolicyVerdict {
  decision: string;
  blockedBy: string | null;
  passedChecks: string[];
  failedChecks: string[];
}

interface AgentPlan {
  interpretedIntent: InterpretedIntent;
  walletSnapshotSummary: WalletSnapshot;
  shortlistedOpportunities: ShortlistedOpp[];
  recommendedPlan: RecommendedPlan;
  whyThisPlan: string;
  policyVerdict: PolicyVerdict;
  nextAction: string;
  disclaimer: string;
  isSimulated: boolean;
  isBasedOnSeededData: boolean;
}

interface AgentExplain {
  summary: string;
  whatWillHappen: string;
  whatCouldGoWrong: string[];
  alternativeOptions: string[];
  policyConstraints: string[];
  disclaimer: string;
  isSimulated: boolean;
}

// ─── Preset Prompts ──────────────────────────────────────────────────────────

export const PRESET_PROMPTS = [
  'Convert this 100 CC to the most suitable USDT route',
  'Find the cheapest route for swapping 50 CC',
  'Use at most 20 CC and minimize fees',
  'Preview before executing',
  'Find the lowest-risk yield up to 30 CC',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function microCC(n: number | null): string {
  if (n === null) return 'N/A';
  return (n / 1_000_000).toFixed(2);
}

function VerdictIcon({ verdict }: { verdict: string }) {
  if (verdict === 'PASS') return <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />;
  if (verdict === 'FAIL') return <XCircle className="w-3.5 h-3.5 text-destructive shrink-0" />;
  return <Clock className="w-3.5 h-3.5 text-warning shrink-0" />;
}

function RiskBadge({ level }: { level: string }) {
  const variant = level === 'LOW' ? 'success' : level === 'MEDIUM' ? 'warning' : 'error';
  return <StatusBadge variant={variant} size="sm">{level}</StatusBadge>;
}

// ─── Thinking Animation ───────────────────────────────────────────────────────

function ThinkingIndicator({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm text-secondary">{message || 'Marcus is thinking…'}</span>
    </div>
  );
}

// ─── Wallet State Display ─────────────────────────────────────────────────────

interface WalletDisplayProps {
  address: string;
  balanceCC: number;
  dailyUsageCC: number;
  dailyLimitCC: number;
  isSimulated: boolean;
  onAddBalance?: () => void;
  isGuest?: boolean;
}

function WalletDisplay({
  address,
  balanceCC,
  dailyUsageCC,
  dailyLimitCC,
  isSimulated,
  onAddBalance,
  isGuest = false,
}: WalletDisplayProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Wallet className="w-4 h-4 text-secondary" />
        <div className="text-xs">
          <span className="text-secondary">Balance: </span>
          <span className="font-mono font-medium text-foreground">{balanceCC.toFixed(0)} CC</span>
        </div>
      </div>
      {!isGuest && (
        <div className="text-xs text-secondary hidden sm:block">
          Daily: <span className="font-mono text-foreground">{dailyUsageCC.toFixed(0)}</span>
          {' / '}
          <span className="font-mono text-foreground">{dailyLimitCC.toFixed(0)} CC</span>
        </div>
      )}
      <StatusBadge variant={isSimulated ? 'warning' : 'success'} size="sm">
        {isSimulated ? 'DEMO' : 'LIVE'}
      </StatusBadge>
      {isGuest && onAddBalance && (
        <button
          onClick={onAddBalance}
          className="flex items-center gap-1 text-xs text-secondary hover:text-foreground transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add balance
        </button>
      )}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface AgentTerminalProps {
  isAuthenticated?: boolean;
  walletAddress?: string;
  walletBalanceCC?: number;
  walletDailyUsageCC?: number;
  walletDailyLimitCC?: number;
  policies?: string[];
  savedPreferences?: string[];
  className?: string;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AgentTerminal({
  isAuthenticated = false,
  walletAddress = 'demo-wallet-0000',
  walletBalanceCC = 500,
  walletDailyUsageCC = 0,
  walletDailyLimitCC = 1000,
  policies = [],
  savedPreferences = [],
  className,
}: AgentTerminalProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');
  const [plan, setPlan] = useState<AgentPlan | null>(null);
  const [explain, setExplain] = useState<AgentExplain | null>(null);
  const [intentId, setIntentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [llmFallback, setLlmFallback] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<Array<{ role: 'user' | 'marcus'; text: string }>>([]);
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const thinkingMessages = [
    'Parsing your intent…',
    'Checking policies…',
    'Evaluating opportunities…',
    'Building plan…',
  ];

  // Auto-scroll to results
  useEffect(() => {
    if (plan || explain || error) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [plan, explain, error]);

  const handlePresetClick = (preset: string) => {
    setInput(preset);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent, forceExplain = false) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setSessionHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);
    setError(null);
    setPlan(null);
    setExplain(null);
    setShowExplain(false);
    setThinkingMessage(thinkingMessages[0]);

    // Animate thinking messages
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % thinkingMessages.length;
      setThinkingMessage(thinkingMessages[msgIdx]);
    }, 1200);

    try {
      const endpoint = forceExplain ? '/api/agent/explain' : '/api/agent/plan';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText }),
      });

      clearInterval(msgInterval);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? 'Request failed');
      }

      const data = await res.json();
      setIntentId(data.intentId);
      setLlmFallback(data.llmParseFallback ?? false);

      if (forceExplain) {
        setExplain(data.explanation);
        setShowExplain(true);
        setSessionHistory((prev) => [
          ...prev,
          { role: 'marcus', text: 'Here is a detailed explanation of the plan.' },
        ]);
      } else {
        setPlan(data.plan);
        setSessionHistory((prev) => [
          ...prev,
          { role: 'marcus', text: 'I found a plan for you. Review it below.' },
        ]);
      }
    } catch (err: unknown) {
      clearInterval(msgInterval);
      setSessionHistory((prev) => [
        ...prev,
        { role: 'marcus', text: err instanceof Error ? err.message : 'An unexpected error occurred.' },
      ]);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
      setThinkingMessage('');
    }
  };

  const handleExplain = async () => {
    if (!plan) return;
    setPlan(null);
    await handleSubmit(new Event('submit') as unknown as React.FormEvent, true);
  };

  const handleAddBalance = async () => {
    setTopUpLoading(true);
    setTopUpSuccess(false);
    try {
      const res = await fetch('/api/demo/reset', { method: 'POST' });
      if (res.ok) {
        setTopUpSuccess(true);
        setTimeout(() => setTopUpSuccess(false), 3000);
      }
    } catch {
      // silent
    } finally {
      setTopUpLoading(false);
    }
  };

  const handleClearSession = () => {
    setPlan(null);
    setExplain(null);
    setSessionHistory([]);
    setError(null);
    setIntentId(null);
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* ── Terminal Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-accent" />
            <h2 className="text-sm font-semibold text-foreground">Marcus Terminal</h2>
          </div>
          {isAuthenticated && (
            <StatusBadge variant="success" size="sm">Authenticated</StatusBadge>
          )}
          {!isAuthenticated && (
            <StatusBadge variant="neutral" size="sm">Guest Session</StatusBadge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <WalletDisplay
            address={walletAddress}
            balanceCC={walletBalanceCC}
            dailyUsageCC={walletDailyUsageCC}
            dailyLimitCC={walletDailyLimitCC}
            isSimulated={true}
            onAddBalance={handleAddBalance}
            isGuest={!isAuthenticated}
          />
          {topUpSuccess && (
            <span className="text-xs text-success flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Balance restored
            </span>
          )}
          {topUpLoading && (
            <span className="text-xs text-secondary flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" /> Restoring…
            </span>
          )}
          {sessionHistory.length > 0 && (
            <button
              onClick={handleClearSession}
              className="text-xs text-muted hover:text-secondary transition-colors"
            >
              Clear session
            </button>
          )}
        </div>
      </div>

      {/* ── Session History (scrollable) ───────────────────────────────── */}
      {sessionHistory.length > 0 && (
        <div className="py-4 space-y-3 max-h-48 overflow-y-auto">
          {sessionHistory.map((entry, i) => (
            <div key={i} className={cn('flex items-start gap-2', entry.role === 'user' ? 'flex-row-reverse' : '')}>
              {entry.role === 'marcus' && <Bot className="w-4 h-4 text-accent shrink-0 mt-0.5" />}
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                  entry.role === 'user'
                    ? 'bg-muted-surface text-foreground'
                    : 'bg-elevated border border-border-subtle text-secondary'
                )}
              >
                {entry.text}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Input Area ─────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="pt-4 space-y-3">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type a command — e.g. &quot;Find the cheapest yield up to 50 CC&quot;"
            className="w-full min-h-[80px] p-4 pr-12 bg-muted-surface border border-border-default rounded-lg text-sm text-foreground placeholder:text-muted resize-none transition-all duration-150 focus:outline-none focus:border-border-interactive-hover focus:ring-0"
            disabled={loading}
            rows={2}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={cn(
              'absolute right-3 bottom-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150',
              input.trim() && !loading
                ? 'bg-accent text-page hover:bg-accent-hover'
                : 'bg-muted-surface text-muted'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Prompts */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted self-center">Try:</span>
          {PRESET_PROMPTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-full bg-muted-surface border border-border-subtle text-secondary hover:text-foreground hover:border-border-default transition-all duration-150 disabled:opacity-50"
            >
              {preset}
            </button>
          ))}
        </div>
      </form>

      {/* ── LLM Fallback Notice ─────────────────────────────────────────── */}
      {intentId && llmFallback && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-warning-bg border border-warning/20">
          <Clock className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div className="text-xs text-warning/90">
            <span className="font-medium">Rule-based parsing active.</span>{' '}
            Set <code className="text-warning font-mono">LLM_API_KEY</code> in your environment to enable
            LLM-powered intent parsing.
          </div>
        </div>
      )}

      {/* ── Loading / Thinking ─────────────────────────────────────────── */}
      {loading && <ThinkingIndicator message={thinkingMessage} />}

      {/* ── Results ────────────────────────────────────────────────────── */}
      <div ref={resultRef} className="pt-6 space-y-4">

        {/* ── Plan Result ─────────────────────────────────────────────────── */}
        {plan && !showExplain && (
          <>
            {/* Interpreted Intent */}
            <SurfaceCard padding="md">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Interpreted Intent</h3>
                <StatusBadge variant="success" size="sm" className="ml-auto">REAL</StatusBadge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {[
                  { label: 'Action', value: plan.interpretedIntent.action },
                  { label: 'Amount', value: plan.interpretedIntent.amountMicroCC !== null ? `${microCC(plan.interpretedIntent.amountMicroCC)} CC` : 'Not specified' },
                  { label: 'Confidence', value: `${(plan.interpretedIntent.confidence * 100).toFixed(0)}%` },
                  { label: 'Simulation', value: plan.interpretedIntent.simulationOnly ? 'Yes' : 'No' },
                  { label: 'Approval', value: plan.interpretedIntent.requireApproval ? 'Required' : 'Not required' },
                  { label: 'Risk', value: plan.interpretedIntent.riskTolerance ?? 'Any' },
                  { label: 'Providers', value: plan.interpretedIntent.providerFilter?.join(', ') ?? 'Any' },
                  { label: 'Assets', value: plan.interpretedIntent.assetFilter?.join(', ') ?? 'Any' },
                  { label: 'Mode', value: plan.interpretedIntent.executionPreference === 'preview' ? 'Preview only' : 'Execute on approval' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[10px] text-muted uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="font-medium text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            {/* Wallet Snapshot */}
            <SurfaceCard padding="md">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-4 h-4 text-secondary" />
                <h3 className="text-sm font-semibold text-foreground">Wallet Snapshot</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {[
                  { label: 'Address', value: `${plan.walletSnapshotSummary.address.slice(0, 8)}…${plan.walletSnapshotSummary.address.slice(-4)}` },
                  { label: 'Balance', value: `${microCC(plan.walletSnapshotSummary.totalBalanceMicroCC)} CC` },
                  { label: 'Daily Usage', value: `${microCC(plan.walletSnapshotSummary.dailyUsageMicroCC)} / ${microCC(plan.walletSnapshotSummary.dailyLimitMicroCC)} CC` },
                  { label: 'Mode', value: plan.walletSnapshotSummary.canExecuteReal ? 'LIVE' : 'SIMULATED' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[10px] text-muted uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="font-mono text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            {/* Shortlisted Opportunities */}
            {plan.shortlistedOpportunities.length > 0 && (
              <SurfaceCard padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <h3 className="text-sm font-semibold text-foreground">Opportunities</h3>
                  {plan.isBasedOnSeededData && (
                    <span className="text-[10px] text-muted ml-1">(demo data)</span>
                  )}
                </div>
                <div className="space-y-2">
                  {plan.shortlistedOpportunities.map((opp) => (
                    <div key={opp.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted-surface border border-border-subtle">
                      <div className="w-5 h-5 rounded-full bg-accent-muted text-accent flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5">
                        {opp.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-sm font-medium text-foreground">{opp.strategyName}</div>
                            <div className="text-xs text-muted">{opp.providerName}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-mono font-medium text-success">{opp.aprPercent.toFixed(2)}%</div>
                            <RiskBadge level={opp.riskLevel} />
                          </div>
                        </div>
                        <div className="text-[10px] text-muted mt-1">{opp.reason}</div>
                        {opp.estimatedOutputMicroCC !== null && (
                          <div className="text-[10px] text-muted font-mono mt-0.5">
                            Est. output: {microCC(opp.estimatedOutputMicroCC)} CC
                            {opp.estimatedExecutionCostMicroCC > 0 && ` · fees: ${microCC(opp.estimatedExecutionCostMicroCC)} CC`}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            )}

            {/* Recommended Plan */}
            <SurfaceCard padding="md">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-4 h-4 text-secondary" />
                <h3 className="text-sm font-semibold text-foreground">Recommended Plan</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-accent-subtle border border-accent-muted">
                  <div className="text-[10px] text-muted mb-1">Step {plan.recommendedPlan.step}</div>
                  <div className="text-sm text-foreground">{plan.recommendedPlan.description}</div>
                  {plan.recommendedPlan.estimatedOutputMicroCC !== null && (
                    <div className="text-xs text-muted font-mono mt-1">
                      Est. output: {microCC(plan.recommendedPlan.estimatedOutputMicroCC)} CC
                      {plan.recommendedPlan.estimatedExecutionCostMicroCC > 0 && ` · fees: ${microCC(plan.recommendedPlan.estimatedExecutionCostMicroCC)} CC`}
                    </div>
                  )}
                  {plan.recommendedPlan.isSimulation && (
                    <StatusBadge variant="warning" size="sm" className="mt-2">SIMULATED</StatusBadge>
                  )}
                </div>

                <div className="p-3 rounded-lg bg-muted-surface border border-border-subtle">
                  <div className="text-xs font-medium text-foreground mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Why this plan?
                  </div>
                  <div className="text-sm text-secondary leading-relaxed">{plan.whyThisPlan}</div>
                </div>

                <button
                  onClick={handleExplain}
                  disabled={loading}
                  className="w-full text-xs text-secondary hover:text-foreground transition-colors py-1"
                >
                  Explain this plan in detail →
                </button>
              </div>
            </SurfaceCard>

            {/* Policy Verdict */}
            <SurfaceCard padding="md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  <h3 className="text-sm font-semibold text-foreground">Policy Verdict</h3>
                </div>
                <StatusBadge
                  variant={
                    plan.policyVerdict.decision === 'APPROVED'
                      ? 'success'
                      : plan.policyVerdict.decision === 'REQUIRES_APPROVAL'
                        ? 'warning'
                        : 'error'
                  }
                  size="sm"
                >
                  {plan.policyVerdict.decision}
                </StatusBadge>
              </div>

              {plan.policyVerdict.blockedBy && (
                <div className="mb-3 p-2 rounded-lg bg-destructive-bg border border-destructive/20 text-xs text-destructive">
                  <AlertCircle className="w-3.5 h-3.5 inline mr-1.5 shrink-0" />
                  {plan.policyVerdict.blockedBy}
                </div>
              )}

              <div className="space-y-1.5">
                {plan.policyVerdict.passedChecks.map((check) => (
                  <div key={check} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                    <span className="text-secondary">{check.replace(/_/g, ' ')}</span>
                  </div>
                ))}
                {plan.policyVerdict.failedChecks.map((check) => (
                  <div key={check} className="flex items-center gap-2 text-xs">
                    <XCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
                    <span className="text-secondary">{check.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle">
                <div className="text-xs">
                  <span className="text-muted">Next: </span>
                  <span className="font-medium text-foreground capitalize">{plan.nextAction.replace(/_/g, ' ')}</span>
                </div>
                {plan.nextAction === 'execute' && (
                  <Button size="sm" disabled>
                    <Zap className="w-3.5 h-3.5 mr-1" />
                    Confirm Execution
                  </Button>
                )}
                {plan.nextAction === 'request_approval' && (
                  <Button size="sm" variant="secondary" disabled>
                    Request Approval
                  </Button>
                )}
                {plan.nextAction === 'preview' && (
                  <StatusBadge variant="neutral" size="sm">Preview mode — no execution</StatusBadge>
                )}
              </div>
            </SurfaceCard>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 p-3">
              <Clock className="w-4 h-4 text-muted shrink-0 mt-0.5" />
              <p className="text-xs text-muted leading-relaxed">{plan.disclaimer}</p>
            </div>
          </>
        )}

        {/* ── Explanation Result ──────────────────────────────────────────── */}
        {explain && showExplain && (
          <SurfaceCard padding="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Detailed Explanation</h3>
              </div>
              <button
                onClick={() => setShowExplain(false)}
                className="text-xs text-muted hover:text-secondary transition-colors"
              >
                ← Back to plan
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <div className="text-[10px] text-muted uppercase tracking-wide mb-1">What you asked</div>
                <div className="text-secondary">{explain.summary}</div>
              </div>

              <div>
                <div className="text-[10px] text-muted uppercase tracking-wide mb-1">What will happen</div>
                <div className="text-secondary">{explain.whatWillHappen}</div>
              </div>

              {explain.whatCouldGoWrong.length > 0 && (
                <div>
                  <div className="text-[10px] text-muted uppercase tracking-wide mb-1">What could go wrong</div>
                  <div className="space-y-1">
                    {explain.whatCouldGoWrong.map((w, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-warning">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {explain.alternativeOptions.length > 0 && (
                <div>
                  <div className="text-[10px] text-muted uppercase tracking-wide mb-1">Alternative options</div>
                  <div className="space-y-1">
                    {explain.alternativeOptions.map((alt, i) => (
                      <div key={i} className="text-xs text-secondary">• {alt}</div>
                    ))}
                  </div>
                </div>
              )}

              {explain.policyConstraints.length > 0 && (
                <div>
                  <div className="text-[10px] text-muted uppercase tracking-wide mb-1">Policy constraints</div>
                  <div className="space-y-1">
                    {explain.policyConstraints.map((c, i) => (
                      <div key={i} className="text-xs text-success flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0" /> {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-muted pt-3 border-t border-border-subtle">
                {explain.disclaimer}
              </div>
            </div>
          </SurfaceCard>
        )}
      </div>
    </div>
  );
}

export default AgentTerminal;

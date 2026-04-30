'use client';

import Link from 'next/link';
import { TrendingUp, Shield, Activity, Bot, ChevronRight, AlertCircle, Wallet, ArrowRight } from 'lucide-react';
import { SurfaceCard, StatusBadge } from '@/components/ui';

// ─── Dashboard Header ───────────────────────────────────────────────────────

interface DashboardHeaderProps {
  userName: string;
  executionMode: 'DEMO' | 'LIVE';
}

export function DashboardHeader({ userName, executionMode }: DashboardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="text-sm text-secondary mt-0.5">
          Your agent wallet overview
        </p>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge variant={executionMode === 'LIVE' ? 'success' : 'warning'} size="sm">
          {executionMode} MODE
        </StatusBadge>
      </div>
    </div>
  );
}

// ─── Demo Mode Banner ───────────────────────────────────────────────────────

interface DemoModeBannerProps {
  onModeSwitch?: () => void;
}

export function DemoModeBanner({ onModeSwitch }: DemoModeBannerProps) {
  return (
    <div className="bg-warning-bg border border-warning/20 rounded-lg px-4 py-3 flex items-start gap-3">
      <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          <span className="font-medium">Demo Mode Active</span>
        </p>
        <p className="text-xs text-secondary mt-0.5">
          Policy engine is real and fully functional. Market data and wallet execution are simulated.
          {' '}Connect a wallet to enable live mode.
        </p>
      </div>
      {onModeSwitch && (
        <button
          onClick={onModeSwitch}
          className="text-xs text-accent hover:text-accent-hover transition-colors shrink-0"
        >
          Switch to Live
        </button>
      )}
    </div>
  );
}

// ─── Wallet Overview Card ───────────────────────────────────────────────────

interface WalletOverviewCardProps {
  address: string;
  balanceCC: number;
  dailyUsageCC: number;
  dailyLimitCC: number;
  isSimulated: boolean;
}

export function WalletOverviewCard({
  address,
  balanceCC,
  dailyUsageCC,
  dailyLimitCC,
  isSimulated,
}: WalletOverviewCardProps) {
  const usagePercent = dailyLimitCC > 0 ? Math.min(100, (dailyUsageCC / dailyLimitCC) * 100) : 0;
  const usageColor = usagePercent > 90 ? 'bg-destructive' : usagePercent > 70 ? 'bg-warning' : 'bg-accent';

  return (
    <SurfaceCard padding="lg">
      <div className="flex items-start justify-between gap-6">
        {/* Left: Address + Balance */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-muted" />
            <span className="text-xs text-muted uppercase tracking-wide">Wallet</span>
            {isSimulated && (
              <StatusBadge variant="warning" size="sm">SIMULATED</StatusBadge>
            )}
          </div>
          <div>
            <p className="font-mono text-sm text-foreground/80">{address}</p>
            <p className="text-2xl font-semibold text-foreground mt-1">
              {balanceCC.toLocaleString()} <span className="text-base text-secondary">CC</span>
            </p>
          </div>
        </div>

        {/* Right: Daily Usage */}
        <div className="space-y-3 min-w-48">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted uppercase tracking-wide">Daily Limit</span>
            <span className="text-xs text-foreground font-mono">
              {dailyUsageCC.toLocaleString()} / {dailyLimitCC.toLocaleString()} CC
            </span>
          </div>
          <div className="w-full bg-muted-surface rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${usageColor}`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="text-xs text-secondary">
            {usagePercent < 100
              ? `${(100 - usagePercent).toFixed(0)}% of daily limit remaining`
              : 'Daily limit reached'
            }
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
}

// ─── Policy Status Card ─────────────────────────────────────────────────────

interface PolicyItem {
  type: string;
  name: string;
  value: string;
  currentUsage?: number;
  limit?: number;
  enabled: boolean;
}

interface PolicyStatusCardProps {
  policies: PolicyItem[];
  activeCount: number;
}

export function PolicyStatusCard({ policies, activeCount }: PolicyStatusCardProps) {
  const hasPolicies = policies.length > 0;

  return (
    <SurfaceCard padding="none">
      <div className="p-4 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted" />
          <h2 className="text-sm font-medium text-foreground">Policy Status</h2>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge variant={activeCount > 0 ? 'success' : 'neutral'} size="sm">
            {activeCount} active
          </StatusBadge>
          <Link href="/policies" className="text-xs text-secondary hover:text-foreground flex items-center gap-0.5 transition-colors">
            Manage <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {hasPolicies ? (
        <div className="divide-y divide-border-subtle">
          {policies.slice(0, 4).map((policy) => (
            <div key={policy.type} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${policy.enabled ? 'bg-accent' : 'bg-muted-2'}`} />
                <span className="text-sm text-foreground">{policy.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {policy.currentUsage !== undefined && policy.limit !== undefined ? (
                  <div className="text-right">
                    <span className="text-sm font-mono text-foreground">
                      {policy.currentUsage.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted"> / {policy.limit.toLocaleString()}</span>
                  </div>
                ) : (
                  <span className="text-sm font-mono text-foreground">{policy.value}</span>
                )}
                <StatusBadge variant={policy.enabled ? 'success' : 'neutral'} size="sm">
                  {policy.enabled ? 'ON' : 'OFF'}
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center">
          <Shield className="w-8 h-8 text-muted mx-auto mb-2 opacity-30" />
          <p className="text-sm text-secondary">No policies configured</p>
          <p className="text-xs text-muted mt-1">Set up safety rules to protect your wallet</p>
          <Link
            href="/policies"
            className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-hover mt-3 transition-colors"
          >
            Create a policy <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </SurfaceCard>
  );
}

// ─── Recent Activity Card ───────────────────────────────────────────────────

interface ActivityEvent {
  id: string;
  eventType: string;
  createdAt: string;
  simulated: boolean;
}

interface RecentActivityCardProps {
  events: ActivityEvent[];
}

const EVENT_CONFIG: Record<string, { label: string; color: 'accent' | 'warning' | 'error' | 'muted' }> = {
  INTENT_PARSED: { label: 'Intent Parsed', color: 'muted' },
  POLICY_EVALUATED: { label: 'Policy Check', color: 'muted' },
  EXECUTION_APPROVED: { label: 'Approved', color: 'accent' },
  EXECUTION_REJECTED: { label: 'Rejected', color: 'error' },
  EXECUTION_COMPLETED: { label: 'Completed', color: 'accent' },
  EXECUTION_STARTED: { label: 'Started', color: 'warning' },
  EXECUTION_FAILED: { label: 'Failed', color: 'error' },
  POLICY_UPDATED: { label: 'Policy Updated', color: 'muted' },
};

const EVENT_COLOR_MAP: Record<string, string> = {
  accent: 'bg-accent',
  warning: 'bg-warning',
  error: 'bg-destructive',
  muted: 'bg-muted-2',
};

export function RecentActivityCard({ events }: RecentActivityCardProps) {
  const hasEvents = events.length > 0;

  return (
    <SurfaceCard padding="none">
      <div className="p-4 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-muted" />
          <h2 className="text-sm font-medium text-foreground">Recent Activity</h2>
        </div>
        <Link href="/activity" className="text-xs text-secondary hover:text-foreground flex items-center gap-0.5 transition-colors">
          Full log <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {hasEvents ? (
        <div className="divide-y divide-border-subtle">
          {events.slice(0, 5).map((event) => {
            const config = EVENT_CONFIG[event.eventType] ?? { label: event.eventType.replace(/_/g, ' '), color: 'muted' as const };
            const dotColor = EVENT_COLOR_MAP[config.color];
            return (
              <div key={event.id} className="p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                  <span className="text-sm text-foreground truncate">{config.label}</span>
                  {event.simulated && (
                    <StatusBadge variant="warning" size="sm">SIM</StatusBadge>
                  )}
                </div>
                <span className="text-xs text-muted shrink-0">
                  {new Date(event.createdAt).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 text-center">
          <Activity className="w-8 h-8 text-muted mx-auto mb-2 opacity-30" />
          <p className="text-sm text-secondary">No activity yet</p>
          <p className="text-xs text-muted mt-1">Use the Agent Terminal to get started</p>
        </div>
      )}
    </SurfaceCard>
  );
}

// ─── Top Opportunity Card ─────────────────────────────────────────────────

interface OpportunityItem {
  strategyName: string;
  providerName: string;
  aprBps: number;
  riskLevel: string;
  estimatedOutputMicroCC?: number;
  estimatedExecutionCostMicroCC?: number;
}

interface OpportunityCardProps {
  opportunity: OpportunityItem | null;
  isSimulated: boolean;
}

export function OpportunityCard({ opportunity, isSimulated }: OpportunityCardProps) {
  if (!opportunity) {
    return (
      <SurfaceCard padding="none">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted" />
            <h2 className="text-sm font-medium text-foreground">Top Opportunity</h2>
          </div>
          {isSimulated && <StatusBadge variant="warning" size="sm">SIMULATED</StatusBadge>}
        </div>
        <div className="p-6 text-center">
          <TrendingUp className="w-8 h-8 text-muted mx-auto mb-2 opacity-30" />
          <p className="text-sm text-secondary">No opportunities available</p>
          <p className="text-xs text-muted mt-1">Seed data loads on first startup</p>
        </div>
      </SurfaceCard>
    );
  }

  const aprPercent = opportunity.aprBps / 100;
  const estimatedOutput = opportunity.estimatedOutputMicroCC
    ? Math.floor(opportunity.estimatedOutputMicroCC / 1_000_000)
    : undefined;
  const fees = opportunity.estimatedExecutionCostMicroCC
    ? Math.floor(opportunity.estimatedExecutionCostMicroCC / 1_000_000)
    : undefined;

  return (
    <SurfaceCard padding="none">
      <div className="p-4 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted" />
          <h2 className="text-sm font-medium text-foreground">Top Opportunity</h2>
        </div>
        {isSimulated && <StatusBadge variant="warning" size="sm">SIMULATED</StatusBadge>}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">{opportunity.strategyName}</p>
          <p className="text-xs text-muted mt-0.5">by {opportunity.providerName}</p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-accent font-mono">{aprPercent.toFixed(2)}%</span>
          <span className="text-xs text-muted">APR</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge
            variant={
              opportunity.riskLevel === 'LOW' ? 'success' :
              opportunity.riskLevel === 'MEDIUM' ? 'warning' : 'error'
            }
            size="sm"
          >
            {opportunity.riskLevel}
          </StatusBadge>
          {estimatedOutput !== undefined && fees !== undefined && (
            <div className="text-xs text-muted">
              Est: {estimatedOutput.toLocaleString()} CC · Fees: {fees} CC
            </div>
          )}
        </div>
      </div>
      <div className="p-3 border-t border-border-subtle">
        <Link
          href="/agent"
          className="flex items-center justify-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors py-1 font-medium"
        >
          <Bot className="w-4 h-4" />
          Find yield with Agent
        </Link>
      </div>
    </SurfaceCard>
  );
}

// ─── Quick Access Strip ────────────────────────────────────────────────────

export function QuickAccessStrip() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/agent"
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-accent text-page rounded-sm hover:bg-accent-hover transition-colors"
      >
        <Bot className="w-4 h-4" />
        Open Agent Terminal
      </Link>
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border text-secondary rounded-sm hover:text-foreground hover:border-border-interactive transition-colors"
      >
        <TrendingUp className="w-4 h-4" />
        Browse Opportunities
      </Link>
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────

interface SectionTitleProps {
  title: string;
  action?: {
    label: string;
    href: string;
  };
}

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-medium text-foreground">{title}</h2>
      {action && (
        <Link href={action.href} className="text-xs text-secondary hover:text-foreground flex items-center gap-0.5 transition-colors">
          {action.label} <ChevronRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DashboardHeader,
  DemoModeBanner,
  WalletOverviewCard,
  PolicyStatusCard,
  RecentActivityCard,
  OpportunityCard,
  QuickAccessStrip,
} from '@/components/ui/DashboardComponents';
import { useAuth } from '@/components/auth/AuthProvider';
import { SurfaceCard } from '@/components/ui';

export const dynamic = 'force-dynamic';

interface DashboardData {
  policies: Array<{
    type: string;
    name?: string;
    value: string;
    currentUsageMicroCC?: number;
    enabled: boolean;
  }>;
  auditEvents: Array<{
    id: string;
    eventType: string;
    createdAt: string;
    simulated: boolean;
  }>;
  opportunities: Array<{
    strategyName: string;
    providerName: string;
    aprBps: number;
    riskLevel: string;
    estimatedOutputMicroCC?: number;
    estimatedExecutionCostMicroCC?: number;
  }>;
  stats: {
    totalEvents: number;
    policiesActive: number;
    opportunities: number;
  };
}

async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const res = await fetch('/api/dashboard');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch {
    return {
      policies: [],
      auditEvents: [],
      opportunities: [],
      stats: { totalEvents: 0, policiesActive: 0, opportunities: 0 },
    };
  }
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then((d) => {
      setData(d);
      setIsLoading(false);
    });
  }, []);

  // Wallet state (in real app, this comes from connected wallet)
  const walletAddress = '0xDEMO_A1B2C3D4E5F6';
  const ccBalance = 500_000_000;
  const executionMode: 'DEMO' | 'LIVE' = 'DEMO';
  const isSimulated = true;

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-5xl animate-fade-in">
        {/* Loading skeleton */}
        <div className="space-y-6">
          <div className="h-12 bg-muted-surface rounded w-64 animate-pulse" />
          <div className="h-24 bg-muted-surface rounded animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-40 bg-muted-surface rounded animate-pulse" />
            <div className="h-40 bg-muted-surface rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const dailyPolicy = data?.policies.find((p) => p.type === 'MAX_DAILY');
  const dailyUsageCC = Math.floor((dailyPolicy?.currentUsageMicroCC ?? 0) / 1_000_000);
  const dailyLimitCC = Math.floor(parseInt(dailyPolicy?.value ?? '100000000', 10) / 1_000_000);

  const policyItems = data?.policies.map((p) => ({
    type: p.type,
    name: p.name ?? p.type,
    value: p.value,
    currentUsage: p.currentUsageMicroCC,
    limit: parseInt(p.value ?? '0', 10),
    enabled: p.enabled,
  })) ?? [];

  const topOpp = data?.opportunities[0];

  const activityEvents = data?.auditEvents.slice(0, 5) ?? [];

  return (
    <div className="space-y-8 max-w-5xl animate-fade-in">
      {/* Dashboard Header */}
      <DashboardHeader
        userName={user?.name ?? 'User'}
        executionMode={executionMode}
      />

      {/* Demo Mode Banner */}
      <DemoModeBanner />

      {/* Quick Access - Primary CTA */}
      <QuickAccessStrip />

      {/* Main Grid: Wallet + Policies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallet Overview */}
        <WalletOverviewCard
          address={walletAddress}
          balanceCC={Math.floor(ccBalance / 1_000_000)}
          dailyUsageCC={dailyUsageCC}
          dailyLimitCC={dailyLimitCC}
          isSimulated={isSimulated}
        />

        {/* Policy Status */}
        <PolicyStatusCard
          policies={policyItems}
          activeCount={data?.stats.policiesActive ?? 0}
        />
      </div>

      {/* Recent Activity + Opportunity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivityCard events={activityEvents} />

        {/* Top Opportunity */}
        <OpportunityCard
          opportunity={topOpp ?? null}
          isSimulated={isSimulated}
        />
      </div>

      {/* Footer Links */}
      <div className="pt-4 border-t border-border-subtle">
        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-4">
            <Link href="/policies" className="hover:text-secondary transition-colors">
              Manage Policies
            </Link>
            <Link href="/activity" className="hover:text-secondary transition-colors">
              View Full Audit Log
            </Link>
            <Link href="/wallet" className="hover:text-secondary transition-colors">
              Wallet Details
            </Link>
          </div>
          <div>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

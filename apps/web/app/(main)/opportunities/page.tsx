'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { microCCToDisplay, bpsToPercent } from '@/lib/utils';

interface Opportunity {
  id: string;
  provider: string;
  providerName: string;
  strategyName: string;
  assetIn: string;
  assetOut: string;
  aprBps: number;
  feesBps: number;
  liquidityMicroCC: number;
  riskScore: number;
  riskLevel: string;
  minAmountMicroCC: number;
  estimatedExecutionCostMicroCC: number;
  slippageToleranceBps: number;
  executionSupport: string;
  isWhitelisted: boolean;
}

const SUPPORTED_PROVIDERS = ['froburn', 'lace', 'cantonswap'];

function getAdapterInfo(opp: Opportunity): { adapter: string; level: string; why: string; supported: boolean } {
  if (opp.executionSupport === 'real' && SUPPORTED_PROVIDERS.includes(opp.provider)) {
    return {
      adapter: 'LoopSupportedExecutionAdapter',
      level: 'REAL',
      why: 'Opportunity supports real execution and provider is in Loop SDK supported list.',
      supported: true,
    };
  }
  if (opp.executionSupport === 'simulated') {
    return {
      adapter: 'DemoExecutionAdapter',
      level: 'SIMULATED',
      why: 'Opportunity is simulation-only — Demo adapter used.',
      supported: true,
    };
  }
  if (opp.executionSupport === 'real' && !SUPPORTED_PROVIDERS.includes(opp.provider)) {
    return {
      adapter: 'UnsupportedExecutionAdapter',
      level: 'UNSUPPORTED',
      why: `Provider "${opp.provider}" not in Loop SDK supported list: ${SUPPORTED_PROVIDERS.join(', ')}.`,
      supported: false,
    };
  }
  return {
    adapter: 'UnsupportedExecutionAdapter',
    level: 'UNSUPPORTED',
    why: `Execution support is "${opp.executionSupport}" — no supported execution path.`,
    supported: false,
  };
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/opportunities')
      .then((r) => r.json())
      .then((d) => setOpportunities(d.opportunities ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="text-muted-foreground text-sm">Loading opportunities...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Opportunities</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Available yield and investment strategies with execution support info.
          </p>
        </div>
        <Badge variant="warning">SIMULATED DATA</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {opportunities.map((opp) => {
          const info = getAdapterInfo(opp);
          return (
            <Card key={opp.id} className="bg-card">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">{opp.strategyName}</span>
                        <span className="text-sm text-muted-foreground">by {opp.providerName}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span>{opp.assetIn} → {opp.assetOut}</span>
                        <span>·</span>
                        <span>Min: {microCCToDisplay(opp.minAmountMicroCC)} CC</span>
                        <span>·</span>
                        <span>Liq: {microCCToDisplay(opp.liquidityMicroCC)} CC</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="font-mono text-sm font-medium text-success bg-success/10 px-2 py-0.5 rounded">
                          {bpsToPercent(opp.aprBps)}% APR
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Fees: {bpsToPercent(opp.feesBps)}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Est. cost: {microCCToDisplay(opp.estimatedExecutionCostMicroCC)} CC
                        </span>
                        <Badge
                          variant={opp.riskLevel === 'LOW' ? 'success' : opp.riskLevel === 'MEDIUM' ? 'warning' : 'destructive'}
                          className="text-[10px]"
                        >
                          <AlertTriangle className="w-3 h-3 mr-0.5" />
                          {opp.riskLevel}
                        </Badge>
                        {!opp.isWhitelisted && (
                          <Badge variant="destructive" className="text-[10px]">NOT WHITELISTED</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        info.level === 'REAL' ? 'success' : info.level === 'SIMULATED' ? 'warning' : 'secondary'
                      }
                      className="text-[10px]"
                    >
                      {info.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px]">
                      {info.supported
                        ? <CheckCircle2 className="w-3 h-3 text-success" />
                        : <XCircle className="w-3 h-3 text-muted-foreground" />
                      }
                      <span className="text-muted-foreground">{info.adapter.replace('ExecutionAdapter','').replace('Supported','').replace('Unsupported','Unsupported')}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border/50 flex items-start gap-2">
                  {info.supported
                    ? <CheckCircle2 className="w-3 h-3 text-success shrink-0 mt-0.5" />
                    : <XCircle className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                  }
                  <p className="text-[10px] text-muted-foreground">{info.why}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Market data is simulated.</span> In production, this
            would connect to real DeFi protocols via Loop SDK. All data here is for demonstration only.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

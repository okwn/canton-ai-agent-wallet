'use client';

import { useWallet } from '@/hooks/useWallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function microCCToDisplay(n: number): string {
  return (n / 1_000_000).toFixed(6);
}

export function GasEstimatePanel() {
  const { state, isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Gas Estimate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Connect a wallet to see fee estimates.</p>
        </CardContent>
      </Card>
    );
  }

  const gas = state.gasEstimate;

  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Gas Estimate</CardTitle>
          {gas && (
            <Badge
              variant={gas.valid ? 'success' : 'warning'}
              className="text-[10px]"
            >
              {gas.valid ? 'LIVE' : 'FALLBACK'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {!gas ? (
          <p className="text-xs text-muted-foreground">Estimate unavailable.</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Estimated fee</span>
              <span className="text-sm font-mono font-medium">
                {microCCToDisplay(gas.estimatedFeeMicroCC)} {gas.currency}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">In micro-CC</span>
              <span className="text-xs font-mono text-muted-foreground">{gas.estimatedFeeMicroCC} µCC</span>
            </div>
            {!gas.valid && gas.reason && (
              <p className="text-[10px] text-muted-foreground border-l-2 border-warning pl-2 mt-1">
                {gas.reason}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

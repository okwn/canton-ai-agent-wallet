'use client';

import { useWallet } from '@/hooks/useWallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HoldingsPanel() {
  const { state, isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Connect a wallet to see holdings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        {state.balances.length === 0 ? (
          <p className="text-xs text-muted-foreground">No token balances found.</p>
        ) : (
          <div className="space-y-2">
            {state.balances.map((b) => (
              <div key={b.asset} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                <div>
                  <div className="text-sm font-medium">{b.symbol}</div>
                  <div className="text-xs text-muted-foreground font-mono text-[10px]">
                    {b.rawAmount} µ{b.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-medium">{b.displayAmount}</div>
                  <div className="text-xs text-muted-foreground">{b.asset}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

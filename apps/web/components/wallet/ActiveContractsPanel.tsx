'use client';

import { useWallet } from '@/hooks/useWallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ActiveContractsPanel() {
  const { state, isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Connect a wallet to see active Daml contracts.</p>
        </CardContent>
      </Card>
    );
  }

  if (!state.capabilities.canReadContracts) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Badge variant="secondary" className="text-[10px]">DEMO MODE</Badge>
          <p className="text-xs text-muted-foreground">
            Contract queries require a live Loop wallet connection.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
      </CardHeader>
      <CardContent>
        {state.activeContracts.length === 0 ? (
          <p className="text-xs text-muted-foreground">No active contracts found.</p>
        ) : (
          <div className="space-y-2">
            {state.activeContracts.map((c) => (
              <div key={c.contractId} className="p-2 rounded-lg bg-secondary/30 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium truncate max-w-[200px]">{c.templateName}</div>
                  <div className="text-[10px] font-mono text-muted-foreground ml-2 shrink-0">
                    {c.contractId.slice(0, 8)}…
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">{c.templateId}</div>
                <div className="text-[10px] text-muted-foreground">
                  Party: {c.party.slice(0, 16)}…
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

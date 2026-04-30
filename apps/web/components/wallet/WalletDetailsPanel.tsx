'use client';

import { useWallet } from '@/hooks/useWallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function WalletDetailsPanel() {
  const { state, connect, disconnect, reload, isConnected, isConnecting, isDemoWallet } = useWallet();

  if (state.status === 'disconnected') {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Connect a Loop wallet to enable live execution. Without a wallet, the agent runs in simulation mode.
          </p>
          <Button onClick={connect} size="sm" className="w-full">
            Connect Loop Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (state.status === 'connecting') {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Waiting for wallet…
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state.status === 'rejected') {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs text-muted-foreground">Connection was cancelled.</p>
          <Button onClick={connect} size="sm" variant="outline" className="w-full">Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  if (state.status === 'error') {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs text-destructive">{state.errorMessage}</p>
          <Button onClick={connect} size="sm" variant="outline" className="w-full">Retry</Button>
        </CardContent>
      </Card>
    );
  }

  // Connected
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Wallet</CardTitle>
          <div className="flex gap-1">
            {isDemoWallet
              ? <Badge variant="warning" className="text-[10px]">DEMO</Badge>
              : <Badge variant="success" className="text-[10px]">LIVE</Badge>
            }
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-0.5">Address</div>
          <div className="font-mono text-xs text-foreground break-all">{state.address}</div>
        </div>

        {state.networkId && (
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Network</div>
            <div className="text-xs font-mono text-foreground">{state.networkId}</div>
          </div>
        )}

        {state.lastSyncedAt && (
          <div className="text-[10px] text-muted-foreground">
            Last synced {new Date(state.lastSyncedAt).toLocaleTimeString()}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button onClick={reload} size="sm" variant="outline" className="text-xs flex-1">
            Refresh
          </Button>
          <Button onClick={disconnect} size="sm" variant="ghost" className="text-xs text-muted-foreground flex-1">
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

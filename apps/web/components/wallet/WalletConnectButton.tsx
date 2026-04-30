'use client';

import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function WalletConnectButton() {
  const { state, connect, disconnect, isConnecting, isConnected, isDemoWallet } = useWallet();

  if (isConnected && state.address) {
    const shortAddr = `${state.address.slice(0, 6)}...${state.address.slice(-4)}`;
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-foreground">{shortAddr}</span>
          {isDemoWallet
            ? <Badge variant="warning" className="text-[10px]">DEMO</Badge>
            : <Badge variant="success" className="text-[10px]">LIVE</Badge>
          }
        </div>
        {state.balances.map((b) => (
          <div key={b.asset} className="text-xs text-muted-foreground font-mono">
            {b.displayAmount} {b.symbol}
          </div>
        ))}
        <button
          onClick={disconnect}
          className="text-[10px] text-muted-foreground hover:text-destructive mt-1 text-left"
        >
          Disconnect
        </button>
      </div>
    );
  }

  if (state.status === 'rejected') {
    return (
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">Connection cancelled</div>
        <Button size="sm" variant="outline" onClick={connect} className="w-full text-xs">
          Try Again
        </Button>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="space-y-1">
        <div className="text-xs text-destructive leading-tight">{state.errorMessage ?? 'Connection error'}</div>
        <Button size="sm" variant="outline" onClick={connect} className="w-full text-xs">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      onClick={connect}
      disabled={isConnecting}
      className="w-full text-xs"
    >
      {isConnecting ? 'Connecting…' : 'Connect Wallet'}
    </Button>
  );
}

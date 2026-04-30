'use client';

import { useWallet } from '@/hooks/useWallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CapabilityRow {
  label: string;
  status: 'REAL' | 'SIMULATED' | 'DISABLED';
  note?: string;
}

export function CapabilityStatusPanel() {
  const { state, isConnected } = useWallet();
  const caps = state.capabilities;

  const rows: CapabilityRow[] = [
    {
      label: 'Intent Parser',
      status: 'REAL',
      note: 'Rule-based NL parser',
    },
    {
      label: 'Policy Engine',
      status: 'REAL',
      note: '11-step evaluation pipeline',
    },
    {
      label: 'Market Data',
      status: 'SIMULATED',
      note: 'Mock opportunities from DB',
    },
    {
      label: 'Wallet Connection',
      status: isConnected ? 'REAL' : 'DISABLED',
      note: isConnected ? 'Loop wallet connected' : 'No wallet connected',
    },
    {
      label: 'Transaction Signing',
      status: isConnected && caps.canSign ? 'REAL' : isConnected && !caps.canSign ? 'DISABLED' : 'DISABLED',
      note: isConnected && caps.canSign
        ? 'Browser key signing'
        : isConnected && !caps.canSign
          ? 'Demo wallet — signing disabled'
          : 'Connect wallet to enable',
    },
    {
      label: 'Real Execution',
      status: isConnected && caps.canExecuteReal ? 'REAL' : 'SIMULATED',
      note: isConnected && caps.canExecuteReal
        ? 'Live on-chain execution'
        : 'All executions are simulated',
    },
    {
      label: 'Contract Queries',
      status: isConnected && caps.canReadContracts ? 'REAL' : 'DISABLED',
      note: isConnected && caps.canReadContracts
        ? 'Live Daml ledger'
        : 'Requires live wallet',
    },
    {
      label: 'Server Signing',
      status: caps.serverSigningActive ? 'REAL' : 'DISABLED',
      note: caps.serverSigningActive
        ? 'Server-side key active'
        : 'Disabled (set LOOP_SERVER_SIGNING_ENABLED=true to enable)',
    },
  ];

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Capability Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-medium text-foreground">{row.label}</div>
                {row.note && (
                  <div className="text-[10px] text-muted-foreground">{row.note}</div>
                )}
              </div>
              <Badge
                variant={
                  row.status === 'REAL'
                    ? 'success'
                    : row.status === 'SIMULATED'
                      ? 'warning'
                      : 'secondary'
                }
                className="text-[10px] shrink-0"
              >
                {row.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

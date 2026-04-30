'use client';

import { WalletDetailsPanel } from '@/components/wallet/WalletDetailsPanel';
import { HoldingsPanel } from '@/components/wallet/HoldingsPanel';
import { ActiveContractsPanel } from '@/components/wallet/ActiveContractsPanel';
import { GasEstimatePanel } from '@/components/wallet/GasEstimatePanel';
import { CapabilityStatusPanel } from '@/components/wallet/CapabilityStatusPanel';

export default function WalletPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Connect and manage your Loop wallet. All executions run in simulation mode until a live wallet is connected.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WalletDetailsPanel />
        <GasEstimatePanel />
      </div>

      <HoldingsPanel />
      <ActiveContractsPanel />
      <CapabilityStatusPanel />
    </div>
  );
}

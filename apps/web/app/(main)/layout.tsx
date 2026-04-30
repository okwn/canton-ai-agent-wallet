'use client';

import { DashboardShell } from '@/components/ui/DashboardShell';
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell walletConnect={<WalletConnectButton />}>
      {children}
    </DashboardShell>
  );
}

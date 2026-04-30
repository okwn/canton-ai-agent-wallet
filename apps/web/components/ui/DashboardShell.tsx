'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, LayoutDashboard, Bot, Shield, TrendingUp, Activity, Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SurfaceCard } from './SurfaceCard';
import { BrandMark } from './BrandMark';
import { StatusBadge } from './StatusBadge';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agent', label: 'Agent', icon: Bot },
  { href: '/policies', label: 'Policies', icon: Shield },
  { href: '/opportunities', label: 'Opportunities', icon: TrendingUp },
  { href: '/activity', label: 'Activity', icon: Activity },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
];

interface DashboardShellProps {
  children: React.ReactNode;
  walletConnect?: React.ReactNode;
}

export function DashboardShell({ children, walletConnect }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-page">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 flex-col fixed h-full border-r border-border-subtle bg-page">
        {/* Logo */}
        <div className="p-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <BrandMark variant="mark" size="sm" />
            <div>
              <span className="font-semibold text-sm text-foreground">Marcus</span>
              <div className="mt-0.5">
                <StatusBadge variant="warning" size="sm">DEMO</StatusBadge>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                  isActive
                    ? 'bg-accent-muted text-foreground font-medium'
                    : 'text-secondary hover:bg-foreground-5 hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connect */}
        {walletConnect && (
          <div className="p-4 border-t border-border-subtle">
            <SurfaceCard padding="sm">
              <p className="text-xs text-muted mb-2">Wallet</p>
              {walletConnect}
            </SurfaceCard>
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-page border-b border-border-subtle">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <BrandMark variant="mark" size="sm" />
            <span className="font-semibold text-foreground">Marcus</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-secondary hover:text-foreground rounded-lg transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-foreground/10 z-30"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="md:hidden fixed top-14 left-0 right-0 z-40 bg-elevated border-b border-border-subtle animate-slide-in-right">
            <div className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-accent-muted text-foreground font-medium'
                        : 'text-secondary hover:bg-foreground-5 hover:text-foreground'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-56 min-h-screen">
        {/* Demo Banner */}
        <div className="bg-warning-bg border-b border-warning/20 px-6 py-2">
          <p className="text-xs text-foreground-70 text-center">
            <span className="font-medium">Demo Mode Active</span> — Policy engine and agent logic are fully functional. Wallet execution is simulated.
          </p>
        </div>
        <div className="p-6 pt-20 md:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardShell;

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import Link from 'next/link';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state while checking auth
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show auth required state
  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-6">
        <SurfaceCard padding="lg" className="max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Authentication required</h2>
          <p className="text-sm text-secondary mb-6">
            You need to be signed in to access this page.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full px-4 py-2.5 text-sm font-medium bg-foreground text-page rounded-sm hover:bg-foreground-90 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="block w-full px-4 py-2.5 text-sm font-medium border border-border text-secondary hover:text-foreground hover:border-border-interactive transition-colors rounded-sm"
            >
              Create an account
            </Link>
          </div>
        </SurfaceCard>
      </div>
    );
  }

  // Authenticated - render children
  return <>{children}</>;
}

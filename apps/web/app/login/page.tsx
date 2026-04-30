'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrandMark } from '@/components/ui/BrandMark';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '@/components/auth/AuthProvider';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await login(email, password);
    if (result.success) {
      router.push(redirect);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <>
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-secondary">
          Sign in to access your dashboard
        </p>
      </div>

      {/* Form Card */}
      <SurfaceCard padding="lg" className="mb-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-md bg-destructive-bg border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full px-3 py-2.5 bg-muted-surface border border-border rounded-md text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-border-interactive-hover focus:shadow-[0_0_0_3px_rgba(127,176,105,0.15)]"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 bg-muted-surface border border-border rounded-md text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-border-interactive-hover focus:shadow-[0_0_0_3px_rgba(127,176,105,0.15)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <PrimaryButton
            type="submit"
            disabled={isLoading}
            className="w-full justify-center py-2.5"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </PrimaryButton>
        </form>
      </SurfaceCard>
    </>
  );
}

function LoginFormFallback() {
  return (
    <div className="animate-pulse">
      <div className="text-center mb-8">
        <div className="h-8 bg-muted-surface rounded w-48 mx-auto mb-2" />
        <div className="h-4 bg-muted-surface rounded w-64 mx-auto" />
      </div>
      <div className="h-64 bg-muted-surface rounded-lg" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-page">
      {/* Header */}
      <header className="border-b border-border-subtle">
        <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <BrandMark variant="full" size="md" />
          </Link>
          <Link href="/register" className="text-sm text-secondary hover:text-foreground transition-colors">
            Create an account
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-md bg-muted-surface border border-border-subtle">
            <p className="text-xs text-muted mb-2 font-medium">Demo credentials</p>
            <div className="space-y-1 font-mono text-xs text-secondary">
              <p>demo@marcus.ai</p>
              <p>demo123</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/agent" className="text-sm text-secondary hover:text-foreground transition-colors">
              Continue to public terminal without signing in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

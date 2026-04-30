'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BrandMark } from '@/components/ui/BrandMark';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '@/components/auth/AuthProvider';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await register(email, password, name);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-page">
      {/* Header */}
      <header className="border-b border-border-subtle">
        <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <BrandMark variant="full" size="md" />
          </Link>
          <Link href="/login" className="text-sm text-secondary hover:text-foreground transition-colors">
            Sign in
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-sm text-secondary">
              Start with access to the full dashboard
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

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="w-full px-3 py-2.5 bg-muted-surface border border-border rounded-md text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-border-interactive-hover focus:shadow-[0_0_0_3px_rgba(127,176,105,0.15)]"
                />
              </div>

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
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    autoComplete="new-password"
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  className="w-full px-3 py-2.5 bg-muted-surface border border-border rounded-md text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-border-interactive-hover focus:shadow-[0_0_0_3px_rgba(127,176,105,0.15)]"
                />
              </div>

              {/* Submit Button */}
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="w-full justify-center py-2.5"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </PrimaryButton>

              {/* Terms */}
              <p className="text-xs text-muted text-center">
                By creating an account, you agree to our terms of service and privacy policy.
              </p>
            </form>
          </SurfaceCard>

          {/* What you get */}
          <div className="p-4 rounded-md bg-muted-surface border border-border-subtle">
            <p className="text-xs text-muted mb-2 font-medium">What you get with an account</p>
            <ul className="space-y-1 text-xs text-secondary">
              <li>• Persistent policy configuration</li>
              <li>• Cross-session activity history</li>
              <li>• Dashboard with wallet overview</li>
              <li>• Yield opportunity tracking</li>
            </ul>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/agent" className="text-sm text-secondary hover:text-foreground transition-colors">
              Try the public terminal first — no account needed
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

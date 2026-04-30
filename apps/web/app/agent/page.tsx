'use client';

import { Navbar } from '@/components/ui/Navbar';
import { AgentTerminal } from '@/components/agent/AgentTerminal';
import { PageSection } from '@/components/ui/PageSection';

export default function PublicAgentPage() {
  return (
    <main className="min-h-screen flex flex-col bg-page">
      {/* ── Public Navigation ─────────────────────────────────────────── */}
      <Navbar sticky />

      {/* ── Terminal ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        <PageSection padding="lg" className="flex-1">
          <div className="max-w-3xl mx-auto">
            {/* Page context */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-foreground tracking-tight mb-1">
                Agent Terminal
              </h1>
              <p className="text-sm text-secondary">
                Describe what you want in plain language. The agent parses your intent,
                checks policies, and shows you a plan — nothing executes without your approval.
              </p>
            </div>

            {/* Terminal Shell */}
            <div className="bg-elevated border border-border-default rounded-xl overflow-hidden">
              {/* Terminal chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-page">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive-muted" />
                  <div className="w-3 h-3 rounded-full bg-muted-2" />
                  <div className="w-3 h-3 rounded-full bg-accent-muted" />
                </div>
                <p className="text-xs text-muted ml-2 font-mono">marcus — public terminal</p>
              </div>

              {/* Terminal content */}
              <div className="p-6">
                <AgentTerminal isAuthenticated={false} />
              </div>
            </div>

            {/* Demo notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted">
                This is a demo environment.{' '}
                <span className="text-secondary">Wallet execution is simulated.</span>{' '}
                The policy engine and intent parser are fully functional.
              </p>
            </div>
          </div>
        </PageSection>
      </div>
    </main>
  );
}

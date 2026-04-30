'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Bot,
  Eye,
  Lock,
  History,
  Terminal,
  LayoutDashboard,
  User,
  ChevronRight,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import {
  Navbar,
  PageSection,
  SectionIntro,
  PrimaryButton,
  SecondaryButton,
  GhostButton,
  StatusBadge,
  SurfaceCard,
  BrandMark,
} from '@/components/ui';

// ─── HERO ─────────────────────────────────────────────────────────────────────

const HERO = {
  eyebrow: 'Marcus — AI Agent Wallet',
  headline: 'An AI wallet that follows your rules',
  subheadline:
    'Describe what you want in plain language. The agent interprets your intent, checks it against your safety policies, shows you the plan, and executes only when you approve. No blind automation, no surprises.',
  cta: 'Open Agent Terminal',
  ctaHref: '/agent',
  secondaryCta: 'See how it works',
  secondaryCtaHref: '/#how-it-works',
};

// ─── WHAT MARCUS IS ───────────────────────────────────────────────────────────

const WHAT_MARCUS_IS = {
  eyebrow: 'What Marcus is',
  headline: 'An AI agent wallet you can actually trust',
  body: `Marcus is an intelligent wallet interface that lets you manage funds using natural language commands — "find low-risk yield up to 50 CC" or "show me a safe strategy for 10 CC." The agent parses your intent, evaluates it against your own safety rules, shows you exactly what it found and why, and only acts when you explicitly approve.`,
  problemHeadline: 'The problem it solves',
  problemBody:
    'Most AI finance tools execute blindly. They claim convenience but give you no visibility into their reasoning, no control over their boundaries, and no record of what they did. Marcus inverts that by design: policy enforcement comes first, execution comes second, and you are in control throughout.',
  flow: [
    { label: 'Intent', desc: 'Agent parses your natural-language command' },
    { label: 'Policy', desc: 'Every rule is evaluated before anything proceeds' },
    { label: 'Plan', desc: 'You review the proposal and reasoning' },
    { label: 'Execute', desc: 'Only with your explicit approval' },
    { label: 'Receipt', desc: 'Complete record of what happened and why' },
  ],
};

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS = [
  {
    step: '1',
    label: 'Prompt',
    title: 'You speak naturally',
    desc: 'Type a command in plain English — no special syntax, no DeFi jargon required.',
    example: '"Find the cheapest yield up to 50 CC"',
  },
  {
    step: '2',
    label: 'Interpret',
    title: 'Agent parses your intent',
    desc: 'The system extracts what you want, how much, and any constraints you specified.',
    example: 'Action: yield · Amount: 50 CC · Risk: low',
  },
  {
    step: '3',
    label: 'Policy',
    title: 'Safety rules are checked',
    desc: 'Every configured policy is evaluated. Transactions that violate your rules are blocked automatically.',
    example: 'MAX_PER_TRADE ✓ · DENYLIST ✓ · DAILY_LIMIT ✓',
  },
  {
    step: '4',
    label: 'Plan',
    title: 'You review the proposal',
    desc: 'See what was found, why it is recommended, what could go wrong, and the estimated cost.',
    example: '1 opportunity · APR: 4.2% · Risk: LOW',
  },
  {
    step: '5',
    label: 'Execute',
    title: 'You approve, then it runs',
    desc: 'Nothing happens without your explicit confirmation. You are always in control.',
    example: 'Waiting for your approval…',
  },
];

// ─── WHY IT MATTERS ───────────────────────────────────────────────────────────

const WHY_IT_MATTERS = [
  {
    icon: <Scale className="w-5 h-5 text-accent" />,
    title: 'Budget limits that hold',
    desc: 'Set per-trade caps, daily limits, and approval thresholds. The agent tracks usage in real time and cannot exceed your configured boundaries — even if you ask it to.',
  },
  {
    icon: <Shield className="w-5 h-5 text-accent" />,
    title: 'Safer execution model',
    desc: 'Policies are not suggestions. They are hard constraints enforced server-side. The agent cannot execute outside your rules, even if prompted to do so.',
  },
  {
    icon: <Eye className="w-5 h-5 text-accent" />,
    title: 'Full explainability',
    desc: 'Every parsed intent, policy decision, and execution step is logged. You always know what happened, why it was allowed, and what it cost.',
  },
  {
    icon: <History className="w-5 h-5 text-accent" />,
    title: 'Audit trail',
    desc: 'Every command, policy check, and execution result is recorded with a timestamp. Policy decisions are tracked separately from execution outcomes.',
  },
  {
    icon: <Lock className="w-5 h-5 text-accent" />,
    title: 'No blind execution',
    desc: 'The agent shows the full plan — opportunity, reasoning, and risks — before asking for your approval. No background transactions, no surprises.',
  },
  {
    icon: <User className="w-5 h-5 text-accent" />,
    title: 'Accessible without an account',
    desc: 'Try the public terminal without registering. See how the agent works with demo data before committing to an account.',
  },
];

// ─── GUEST VS AUTHENTICATED ───────────────────────────────────────────────────

const ACCESS_TIERS = [
  {
    label: 'Guest / Public Terminal',
    badge: 'No account needed',
    badgeVariant: 'neutral' as const,
    description:
      'Anyone can open the agent terminal and try the full flow with demo data. See how intent parsing, policy evaluation, and plan review work — no sign-up required.',
    capabilities: [
      'Natural language command interface',
      'Intent parsing and interpretation',
      'Policy evaluation (demo policies)',
      'Plan review and approval step',
      'Demo wallet (500M CC simulated)',
      'Activity log for the session',
    ],
    ctaLabel: 'Try Public Terminal',
    ctaHref: '/agent',
  },
  {
    label: 'Registered User / Dashboard',
    badge: 'Full access',
    badgeVariant: 'success' as const,
    description:
      'Create an account to persist your policies, track your activity across sessions, and unlock the full dashboard view. The same policy-first execution model, with continuity.',
    capabilities: [
      'All guest capabilities',
      'Persistent policy configuration',
      'Cross-session activity history',
      'Wallet overview and holdings',
      'Yield opportunity tracking',
      'Real policy engine (not demo)',
    ],
    ctaLabel: 'Create an account',
    ctaHref: '/register',
  },
];

// ─── CLI / TERMINAL SECTION ───────────────────────────────────────────────────

const CLI_SECTION = {
  eyebrow: 'How you interact',
  headline: 'A terminal built for clarity, not complexity',
  body: 'The Marcus agent interface is a conversational terminal — you type what you want, it shows you what it found, explains why, and waits. It is designed to be read, not just used.',
  principles: [
    {
      title: 'Conversational, not scripted',
      desc: 'Ask follow-up questions, refine your request, ask "why this option?" — the terminal handles it.',
    },
    {
      title: 'Every response is a record',
      desc: 'The terminal logs the full exchange. You can review what you asked, what Marcus found, and what you approved.',
    },
    {
      title: 'No hidden state',
      desc: 'Marcus shows its reasoning at each step. If it blocks something, it tells you exactly which policy triggered and why.',
    },
  ],
  cta: 'Open Terminal',
  ctaHref: '/agent',
};

// ─── REAL / DEMO / MOCK ───────────────────────────────────────────────────────

const HONEST_FRAMING = [
  {
    label: 'Policy Engine',
    status: 'REAL' as const,
    desc: 'Server-side deterministic evaluation of MAX_PER_TRADE, MAX_DAILY, DENYLIST, APPROVAL_THRESHOLD, and compound conditions. Fully functional.',
    statusVariant: 'success' as const,
  },
  {
    label: 'Intent Parser',
    status: 'REAL' as const,
    desc: 'LLM-based intent parsing with rule-based fallback. Tested with realistic command variations.',
    statusVariant: 'success' as const,
  },
  {
    label: 'Agent Terminal',
    status: 'REAL' as const,
    desc: 'The conversational interface, plan display, approval flow, and session logging are production-grade.',
    statusVariant: 'success' as const,
  },
  {
    label: 'Market Data',
    status: 'SIMULATED' as const,
    desc: 'Opportunities are seeded demo data. No live DeFi protocol integration yet.',
    statusVariant: 'warning' as const,
  },
  {
    label: 'Wallet Execution',
    status: 'SIMULATED' as const,
    desc: 'Demo wallet with 500M CC. Live signing available via NEXT_PUBLIC_LOOP_ENABLED=true (requires custody setup).',
    statusVariant: 'warning' as const,
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-cream">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Navbar sticky />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection padding="2xl" className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl text-center space-y-8 animate-fade-in">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2">
            <StatusBadge variant="success" size="sm">
              Policy-first
            </StatusBadge>
            <span className="text-xs text-muted-gray-gray">Nothing runs without your approval</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-semibold tracking-tight text-charcoal md:text-5xl leading-tight font-display-hero">
            {HERO.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-charcoal-82 leading-relaxed max-w-xl mx-auto">
            {HERO.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href={HERO.ctaHref}>
              <PrimaryButton size="lg">
                {HERO.cta}
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            </Link>
            <Link href={HERO.secondaryCtaHref}>
              <GhostButton size="lg">
                {HERO.secondaryCta}
                <ChevronRight className="w-4 h-4" />
              </GhostButton>
            </Link>
          </div>

          {/* No-account note */}
          <p className="text-sm text-muted-gray-gray">
            No account required —{' '}
            <Link
              href="/agent"
              className="text-charcoal-83 hover:text-charcoal underline transition-colors"
            >
              open the terminal
            </Link>{' '}
            and try it now.
          </p>
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          WHAT MARCUS IS
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Explanation */}
          <div className="space-y-6">
            <SectionIntro
              eyebrow={WHAT_MARCUS_IS.eyebrow}
              title={WHAT_MARCUS_IS.headline}
            />
            <p className="text-base text-charcoal-82 leading-relaxed">
              {WHAT_MARCUS_IS.body}
            </p>
            <div className="border-l-2 border-accent pl-5 py-1">
              <p className="text-sm font-medium text-charcoal mb-1">
                {WHAT_MARCUS_IS.problemHeadline}
              </p>
              <p className="text-sm text-muted-gray-gray leading-relaxed">
                {WHAT_MARCUS_IS.problemBody}
              </p>
            </div>
          </div>

          {/* Right: Visual flow card */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-gray uppercase tracking-wide mb-4">
              Every command follows this flow
            </p>
            {WHAT_MARCUS_IS.flow.map((step, i) => (
              <SurfaceCard key={step.label} padding="md">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-muted text-accent text-xs font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal">{step.label}</p>
                    <p className="text-xs text-muted-gray mt-0.5">{step.desc}</p>
                  </div>
                  {i < WHAT_MARCUS_IS.flow.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-muted-gray shrink-0 mt-1" />
                  )}
                </div>
              </SurfaceCard>
            ))}
            <div className="flex items-center gap-2 pt-2 px-1">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <p className="text-xs text-muted-gray">
                Each step is logged and reviewable in the activity feed.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection id="how-it-works" padding="xl">
        <SectionIntro
          eyebrow="How it works"
          title="From prompt to execution in five steps"
          description="Every command goes through the same flow — no exceptions, no shortcuts."
          centered
          className="mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div key={step.step} className="relative">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent text-page flex items-center justify-center text-xs font-semibold shrink-0">
                    {step.step}
                  </div>
                  <span className="text-xs font-medium text-muted-gray uppercase tracking-wide">
                    {step.label}
                  </span>
                </div>
                <h3 className="font-semibold text-charcoal text-sm leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-charcoal-82 leading-relaxed">{step.desc}</p>
                <div className="p-2 rounded bg-muted-surface border border-border-subtle">
                  <p className="text-xs text-muted-gray font-mono leading-snug">{step.example}</p>
                </div>
              </div>
              {i < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-3 text-muted-gray">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          WHY IT MATTERS
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection background="elevated" padding="xl">
        <SectionIntro
          eyebrow="Why it matters"
          title='Agent + budget control: why the model matters'
          description="AI execution without constraints is a liability. Marcus combines natural language convenience with hard safety boundaries."
          centered
          className="mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {WHY_IT_MATTERS.map((item) => (
            <SurfaceCard key={item.title} padding="lg">
              <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
              <p className="text-sm text-charcoal-82 leading-relaxed">{item.desc}</p>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          GUEST VS AUTHENTICATED
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection padding="xl">
        <SectionIntro
          eyebrow="Two ways to use Marcus"
          title="Guest terminal or registered dashboard"
          description="Start in the public terminal without an account. Register to persist your policies and activity."
          centered
          className="mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ACCESS_TIERS.map((tier) => (
            <SurfaceCard key={tier.label} padding="lg" elevated>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">{tier.label}</h3>
                  <p className="text-sm text-charcoal-82 leading-relaxed">{tier.description}</p>
                </div>
                <StatusBadge variant={tier.badgeVariant} size="sm">
                  {tier.badge}
                </StatusBadge>
              </div>
              <ul className="space-y-2 mb-5">
                {tier.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-charcoal-82">{cap}</span>
                  </li>
                ))}
              </ul>
              <Link href={tier.ctaHref} className="block">
                <SecondaryButton className="w-full justify-center">
                  {tier.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </SecondaryButton>
              </Link>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          CLI / TERMINAL SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection background="elevated" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <SectionIntro
              eyebrow={CLI_SECTION.eyebrow}
              title={CLI_SECTION.headline}
              description={CLI_SECTION.body}
            />
            <div className="space-y-4 mt-2">
              {CLI_SECTION.principles.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">{p.title}</p>
                    <p className="text-xs text-muted-gray mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href={CLI_SECTION.ctaHref}>
                <PrimaryButton>
                  {CLI_SECTION.cta}
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Right: Terminal visual mockup */}
          <div className="bg-muted-surface rounded-xl border border-border overflow-hidden">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-page">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive-muted" />
                <div className="w-3 h-3 rounded-full bg-muted-2" />
                <div className="w-3 h-3 rounded-full bg-accent-muted" />
              </div>
              <p className="text-xs text-muted-gray ml-2 font-mono">marcus terminal</p>
            </div>
            {/* Terminal body */}
            <div className="p-5 space-y-4 font-mono text-sm">
              <div className="flex items-start gap-2">
                <span className="text-accent">›</span>
                <span className="text-charcoal-82">Find the cheapest yield up to 50 CC</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-muted-gray">marcus</span>
                <div className="text-charcoal-82 leading-relaxed">
                  <p>Found 1 opportunity:</p>
                  <p className="mt-1">
                    <span className="text-charcoal">StableYield</span> — APR 4.2% — Risk LOW
                  </p>
                  <p className="text-xs text-muted-gray mt-1">
                    Policy check: MAX_PER_TRADE ✓ · DENYLIST ✓ · DAILY_LIMIT ✓
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent">›</span>
                <span className="text-muted-gray">Waiting for your approval…</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          REAL / DEMO / MOCK
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection padding="xl">
        <SectionIntro
          eyebrow="Honest framing"
          title="What is real, what is simulated"
          description="Every capability is labeled accurately. No inflated claims."
          centered
          className="mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {HONEST_FRAMING.map((item) => (
            <SurfaceCard key={item.label} padding="md">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-charcoal">{item.label}</span>
                    <StatusBadge variant={item.statusVariant} size="sm">
                      {item.status}
                    </StatusBadge>
                  </div>
                  <p className="text-xs text-muted-gray leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
        <div className="mt-6 flex items-start gap-2 justify-center max-w-xl mx-auto">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <p className="text-xs text-muted-gray text-center">
            The policy engine and agent logic are fully real. Market data and wallet execution are
            simulated by default. Enable{' '}
            <code className="text-charcoal-82 font-mono">NEXT_PUBLIC_LOOP_ENABLED=true</code> for
            live signing (requires custody setup).
          </p>
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════ */}
      <PageSection background="elevated" padding="xl">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold text-charcoal tracking-tight">
            Ready to try it?
          </h2>
          <p className="text-base text-charcoal-82 leading-relaxed">
            Open the agent terminal, type a command, and see the full flow — from natural language
            to policy check to execution plan. No account needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/agent">
              <PrimaryButton size="lg">
                Open Agent Terminal
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            </Link>
            <Link href="/register">
              <GhostButton size="lg">Create an account</GhostButton>
            </Link>
          </div>
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-light-cream py-6">
        <div className="max-w-content mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BrandMark variant="mark" size="sm" />
              <span className="text-sm text-charcoal-82">Marcus</span>
              <StatusBadge variant="warning" size="sm">
                DEMO
              </StatusBadge>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-gray">
              <Link href="/" className="hover:text-charcoal-82 transition-colors">
                Home
              </Link>
              <Link href="/#how-it-works" className="hover:text-charcoal-82 transition-colors">
                How it works
              </Link>
              <Link href="/agent" className="hover:text-charcoal-82 transition-colors">
                Terminal
              </Link>
              <Link href="/login" className="hover:text-charcoal-82 transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-charcoal-82 transition-colors">
                Register
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border-subtle text-center text-xs text-muted-gray">
            Demo mode — policy engine and agent logic are fully functional. Wallet execution is
            simulated.
          </div>
        </div>
      </footer>
    </main>
  );
}

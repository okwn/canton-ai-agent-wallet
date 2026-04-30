'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DemoBanner() {
  const [state, setState] = useState<'idle' | 'resetting' | 'success' | 'error'>('idle');

  async function handleReset() {
    if (!confirm('Reset all demo data? This will clear policies, activity, and restore default seed data.')) return;
    setState('resetting');
    try {
      const res = await fetch('/api/demo/reset', { method: 'POST' });
      if (!res.ok) throw new Error('Reset failed');
      setState('success');
      setTimeout(() => setState('idle'), 3000);
      window.location.reload();
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  }

  return (
    <div className="bg-primary/5 border-b border-primary/20">
      <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-primary">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-medium">Demo Mode</span>
          <span className="text-muted-foreground">—</span>
          <span className="text-muted-foreground">All data is simulated. No real on-chain activity.</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleReset}
          disabled={state === 'resetting'}
          className="text-xs h-7 gap-1.5"
        >
          {state === 'resetting' ? (
            <>
              <RotateCcw className="w-3 h-3 animate-spin" />
              Resetting…
            </>
          ) : state === 'success' ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-success" />
              Reset!
            </>
          ) : state === 'error' ? (
            <>
              <AlertCircle className="w-3 h-3 text-destructive" />
              Failed
            </>
          ) : (
            <>
              <RotateCcw className="w-3 h-3" />
              Reset Demo Data
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

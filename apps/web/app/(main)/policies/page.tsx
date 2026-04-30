'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Edit2, Save, X } from 'lucide-react';

interface Policy {
  id: string;
  type: string;
  name: string;
  value: string;
  enabled: boolean;
  priority: number;
  currentUsageMicroCC?: number;
  windowStart?: string | null;
  providerIds?: string[];
  assetSymbols?: string[];
}

const POLICY_DESCRIPTIONS: Record<string, string> = {
  MAX_PER_TRADE: 'Maximum amount that can be spent in a single transaction.',
  MAX_DAILY: 'Maximum total spend across all transactions in a 24-hour window.',
  APPROVAL_THRESHOLD: 'Transactions above this amount require explicit user confirmation.',
  STRATEGY_DENYLIST: 'List of strategy providers that are explicitly blocked.',
  STRATEGY_ALLOWLIST: 'Only these strategy providers are permitted. Leave empty to allow all.',
  ASSET_ALLOWLIST: 'Only these assets can be used in transactions.',
  MAX_SLIPPAGE: 'Maximum acceptable price difference from expected trade price.',
  SIMULATION_ONLY: 'When enabled, all executions run in simulation mode with no real transactions.',
  EXECUTION_MODE: 'Controls whether trades can execute automatically or require approval.',
};

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, []);

  async function fetchPolicies() {
    setLoading(true);
    try {
      const res = await fetch('/api/policies');
      if (res.ok) {
        const data = await res.json();
        setPolicies(data.policies);
      }
    } finally {
      setLoading(false);
    }
  }

  async function savePolicy(id: string, newValue: string, newEnabled?: boolean) {
    setSaving(true);
    try {
      await fetch('/api/policies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, value: newValue, enabled: newEnabled }),
      });
      await fetchPolicies();
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  }

  async function togglePolicy(policy: Policy) {
    setSaving(true);
    try {
      await fetch('/api/policies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: policy.id, enabled: !policy.enabled }),
      });
      await fetchPolicies();
    } finally {
      setSaving(false);
    }
  }

  function formatValue(policy: Policy): string {
    switch (policy.type) {
      case 'MAX_PER_TRADE':
      case 'MAX_DAILY':
      case 'APPROVAL_THRESHOLD':
        return `${(parseInt(policy.value, 10) / 1_000_000).toFixed(2)} CC`;
      case 'MAX_SLIPPAGE':
        return `${(parseInt(policy.value, 10) / 100).toFixed(2)}%`;
      case 'EXECUTION_MODE':
        return policy.value.replace(/_/g, ' ');
      case 'SIMULATION_ONLY':
        return policy.enabled ? 'Enabled' : 'Disabled';
      case 'STRATEGY_DENYLIST':
      case 'STRATEGY_ALLOWLIST':
        const ids = policy.providerIds ?? [];
        return ids.length > 0 ? ids.join(', ') : '(none)';
      case 'ASSET_ALLOWLIST':
        const assets = policy.assetSymbols ?? [];
        return assets.length > 0 ? assets.join(', ') : '(all allowed)';
      default:
        return policy.value;
    }
  }

  function displayValue(policy: Policy): string {
    switch (policy.type) {
      case 'MAX_PER_TRADE':
      case 'MAX_DAILY':
      case 'APPROVAL_THRESHOLD':
        return (parseInt(policy.value, 10) / 1_000_000).toFixed(2);
      case 'MAX_SLIPPAGE':
        return (parseInt(policy.value, 10) / 100).toFixed(2);
      default:
        return policy.value;
    }
  }

  function inputUnit(policy: Policy): string {
    switch (policy.type) {
      case 'MAX_PER_TRADE':
      case 'MAX_DAILY':
      case 'APPROVAL_THRESHOLD':
        return 'CC';
      case 'MAX_SLIPPAGE':
        return '%';
      default:
        return '';
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="text-muted-foreground text-sm">Loading policies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Policies</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Safety rules that govern every agent execution. Changes take effect immediately.
          </p>
        </div>
        <Badge variant="success">REAL</Badge>
      </div>

      {policies.length === 0 ? (
        <Card className="bg-card">
          <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
            <Shield className="w-8 h-8 text-muted-foreground mb-3 opacity-40" />
            <p className="text-sm text-foreground font-medium">No policies configured</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Policies are seeded on first startup. Reload the page if they don&apos;t appear.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {policies.length > 0 && (
        <div className="space-y-4">
          {policies.map((policy) => {
            const isEditing = editingId === policy.id;
            return (
              <Card key={policy.id} className="bg-card">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-foreground">{policy.name}</div>
                          <Badge
                            variant={policy.enabled ? 'success' : 'secondary'}
                            className="text-[10px]"
                          >
                            {policy.enabled ? 'ACTIVE' : 'DISABLED'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-0.5">
                          {POLICY_DESCRIPTIONS[policy.type] ?? policy.type}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-2">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-24 text-sm font-mono border border-border rounded px-2 py-1"
                              />
                              <span className="text-xs text-muted-foreground">{inputUnit(policy)}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => savePolicy(policy.id, editValue)}
                                disabled={saving}
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingId(null)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span className="font-mono text-sm bg-secondary px-2 py-0.5 rounded">
                                {formatValue(policy)}
                              </span>
                              {policy.type === 'MAX_DAILY' && policy.currentUsageMicroCC !== undefined && (
                                <span className="text-xs text-muted-foreground">
                                  (used: {(policy.currentUsageMicroCC / 1_000_000).toFixed(2)} CC)
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {!['STRATEGY_DENYLIST', 'STRATEGY_ALLOWLIST', 'ASSET_ALLOWLIST', 'EXECUTION_MODE', 'SIMULATION_ONLY'].includes(policy.type) && (
                        <button
                          onClick={() => {
                            setEditingId(policy.id);
                            setEditValue(displayValue(policy));
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => togglePolicy(policy)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                          policy.enabled
                            ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                            : 'bg-success/10 text-success hover:bg-success/20'
                        }`}
                        disabled={saving}
                      >
                        {policy.enabled ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-4 flex items-start gap-3">
          <Shield className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Policy engine is real.</span> Changes take effect
            immediately and are enforced server-side on every command. In production, policies are enforced by Daml
            smart contracts on-chain.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

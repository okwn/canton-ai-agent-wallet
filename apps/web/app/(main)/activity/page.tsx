'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle2, XCircle, Clock, Info } from 'lucide-react';

interface AuditEvent {
  id: string;
  eventType: string;
  walletAddress?: string | null;
  intentId?: string | null;
  attemptId?: string | null;
  policyId?: string | null;
  payload: Record<string, unknown>;
  simulated: boolean;
  createdAt: string;
}

const EVENT_LABELS: Record<string, { label: string; color: string }> = {
  INTENT_PARSED: { label: 'Intent Parsed', color: 'text-primary' },
  POLICY_EVALUATED: { label: 'Policy Evaluated', color: 'text-primary' },
  RISK_CHECK_COMPLETED: { label: 'Risk Check', color: 'text-primary' },
  EXECUTION_PLAN_CREATED: { label: 'Plan Created', color: 'text-primary' },
  EXECUTION_APPROVED: { label: 'Execution Approved', color: 'text-success' },
  EXECUTION_REJECTED: { label: 'Execution Rejected', color: 'text-destructive' },
  EXECUTION_STARTED: { label: 'Execution Started', color: 'text-warning' },
  EXECUTION_COMPLETED: { label: 'Execution Completed', color: 'text-success' },
  EXECUTION_FAILED: { label: 'Execution Failed', color: 'text-destructive' },
  EXECUTION_CANCELLED: { label: 'Execution Cancelled', color: 'text-muted-foreground' },
  POLICY_UPDATED: { label: 'Policy Updated', color: 'text-primary' },
  WALLET_CONNECTED: { label: 'Wallet Connected', color: 'text-success' },
  WALLET_DISCONNECTED: { label: 'Wallet Disconnected', color: 'text-muted-foreground' },
};

function getEventIcon(eventType: string) {
  if (eventType.startsWith('EXECUTION_APPROVED') || eventType === 'EXECUTION_COMPLETED') {
    return <CheckCircle2 className="w-4 h-4 text-success" />;
  }
  if (eventType.startsWith('EXECUTION_REJECTED') || eventType === 'EXECUTION_FAILED') {
    return <XCircle className="w-4 h-4 text-destructive" />;
  }
  if (eventType === 'EXECUTION_STARTED') {
    return <Clock className="w-4 h-4 text-warning" />;
  }
  return <Activity className="w-4 h-4 text-muted-foreground" />;
}

function getDecisionFromPayload(payload: Record<string, unknown>): string | null {
  const eval_ = payload.evaluation as Record<string, unknown> | undefined;
  if (eval_?.decision) return eval_.decision as string;

  const receipt = payload.receipt as Record<string, unknown> | undefined;
  if (receipt?.policyDecision) return receipt.policyDecision as string;

  return null;
}

export default function ActivityPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/audit')
      .then((r) => r.json())
      .then((d) => setEvents(d.events ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="text-muted-foreground text-sm">Loading activity...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Activity</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Complete audit trail of all agent commands and executions.
        </p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Execution Log
            </CardTitle>
            <Badge variant="success">REAL</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No activity recorded yet.</p>
              <p className="text-xs mt-1">
                Commands executed through the Agent Terminal will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => {
                const meta = EVENT_LABELS[event.eventType] ?? { label: event.eventType, color: 'text-foreground' };
                const decision = getDecisionFromPayload(event.payload);

                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="mt-0.5 shrink-0">{getEventIcon(event.eventType)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${meta.color}`}>{meta.label}</span>
                        {event.simulated && (
                          <Badge variant="warning" className="text-[10px]">SIMULATED</Badge>
                        )}
                        {decision && (
                          <Badge
                            variant={
                              decision === 'APPROVED' ? 'success' :
                              decision === 'REQUIRES_APPROVAL' ? 'warning' :
                              'destructive'
                            }
                            className="text-[10px]"
                          >
                            {decision}
                          </Badge>
                        )}
                      </div>
                      {event.intentId && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Intent: <span className="font-mono">{event.intentId.slice(0, 8)}...</span>
                        </div>
                      )}
                      {event.attemptId && (
                        <div className="text-xs text-muted-foreground">
                          Attempt: <span className="font-mono">{event.attemptId.slice(0, 8)}...</span>
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(event.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Audit log is real.</span> Every command is logged with
            timestamp, parsed intent, policy decision, and execution result. In production, logs are persisted to
            Daml contracts for immutable audit trail.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

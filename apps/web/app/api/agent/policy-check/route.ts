import { NextRequest, NextResponse } from 'next/server';
import { parseAndEvaluate, executeApprovedIntent } from '@/lib/agent-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { intentId, text, forceExecute } = body;

    // If intentId provided, re-evaluate with the original text
    // Otherwise parse fresh
    if (!text && !intentId) {
      return NextResponse.json({ error: 'Missing text or intentId' }, { status: 400 });
    }

    const result = await parseAndEvaluate(text?.trim() || 're-evaluate');

    if (forceExecute && result.evaluation.decision !== 'DENIED') {
      const exec = await executeApprovedIntent(result.intent.id, result.intent, result.evaluation);
      return NextResponse.json({
        evaluation: result.evaluation,
        execution: exec,
      });
    }

    return NextResponse.json({
      evaluation: result.evaluation,
      intent: result.intent,
    });
  } catch (err) {
    console.error('[agent/policy-check]', err);
    return NextResponse.json({ error: 'Failed to evaluate policy' }, { status: 500 });
  }
}

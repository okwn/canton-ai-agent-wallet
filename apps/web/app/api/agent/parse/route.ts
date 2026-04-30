import { NextRequest, NextResponse } from 'next/server';
import { parseAndEvaluate } from '@/lib/agent-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid text field' }, { status: 400 });
    }

    const result = await parseAndEvaluate(text.trim());

    return NextResponse.json({
      intent: result.intent,
      intentSummary: result.intentSummary,
      evaluation: result.evaluation,
      opportunities: result.opportunities,
    });
  } catch (err) {
    console.error('[agent/parse]', err);
    return NextResponse.json({ error: 'Failed to parse intent' }, { status: 500 });
  }
}

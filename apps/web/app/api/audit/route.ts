import { NextRequest, NextResponse } from 'next/server';
import { queryAuditEvents } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawLimit = parseInt(searchParams.get('limit') ?? '100', 10);
    const limit = isNaN(rawLimit) ? 100 : Math.min(Math.max(rawLimit, 1), 1000);
    const events = await queryAuditEvents(limit);
    return NextResponse.json({ events });
  } catch (err) {
    console.error('[audit GET]', err);
    return NextResponse.json({ error: 'Failed to load audit events' }, { status: 500 });
  }
}

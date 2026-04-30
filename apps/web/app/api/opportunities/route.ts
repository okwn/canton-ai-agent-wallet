import { NextResponse } from 'next/server';
import { queryOpportunities } from '@/lib/db';

export async function GET() {
  try {
    const opportunities = await queryOpportunities();
    return NextResponse.json({ opportunities });
  } catch (err) {
    console.error('[opportunities GET]', err);
    return NextResponse.json({ error: 'Failed to load opportunities' }, { status: 500 });
  }
}

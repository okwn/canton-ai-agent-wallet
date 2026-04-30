import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/agent-service';

export async function GET() {
  try {
    const data = await getDashboardData();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[dashboard GET]', err);
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}

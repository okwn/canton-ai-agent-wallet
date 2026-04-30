import { NextResponse } from 'next/server';
import { resetDemoData } from '@/lib/db';

export async function POST() {
  try {
    await resetDemoData();
    return NextResponse.json({ success: true, message: 'Demo data reset successfully' });
  } catch (err) {
    console.error('[demo/reset POST]', err);
    return NextResponse.json({ error: 'Failed to reset demo data' }, { status: 500 });
  }
}

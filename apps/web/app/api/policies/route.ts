import { NextResponse } from 'next/server';
import { queryPolicies, updatePolicy, insertAuditEvent } from '@/lib/db';
import { generateId } from '@/lib/utils';

export async function GET() {
  try {
    const policies = await queryPolicies();
    return NextResponse.json({ policies });
  } catch (err) {
    console.error('[policies GET]', err);
    return NextResponse.json({ error: 'Failed to load policies' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, value, enabled, providerIds, assetSymbols } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing policy id' }, { status: 400 });
    }

    await updatePolicy(id, {
      value: value !== undefined ? String(value) : undefined,
      enabled,
      providerIds,
      assetSymbols,
    });

    await insertAuditEvent({
      id: generateId(),
      eventType: 'POLICY_UPDATED',
      payload: { id, value, enabled, providerIds, assetSymbols },
      simulated: true,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[policies PUT]', err);
    return NextResponse.json({ error: 'Failed to update policy' }, { status: 500 });
  }
}

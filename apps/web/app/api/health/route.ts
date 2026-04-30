import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    capabilities: {
      intentParser: 'real',
      policyEngine: 'real',
      marketData: 'simulated',
      walletExecution: 'simulated',
      damlIntegration: 'disabled',
    },
  });
}

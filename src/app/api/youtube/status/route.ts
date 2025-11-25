// src/app/api/youtube/status/route.ts
import { NextResponse } from 'next/server';
import { getApiKeysStatus } from '@/lib/api-key-manager';

export async function GET() {
  try {
    const status = getApiKeysStatus();
    return NextResponse.json(status);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to get API key status', error: error.message }, { status: 500 });
  }
}

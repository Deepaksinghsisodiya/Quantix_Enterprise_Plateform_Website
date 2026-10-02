import { NextResponse } from 'next/server';
import { processDbAiChatQuery } from '@/lib/ai/dynamicDbChatEngine';

export async function POST(req: Request) {
  try {
    const { message, siteVariant } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const response = await processDbAiChatQuery(message, siteVariant || 'Enterprise');
    return NextResponse.json(response);
  } catch {
    const fallback = await processDbAiChatQuery('help', 'Enterprise');
    return NextResponse.json(fallback);
  }
}

import { NextResponse } from 'next/server';
import { processDbAiChatQuery } from '@/lib/ai/dynamicDbChatEngine';

export async function POST(req: Request) {
  try {
    const { message, siteVariant, platform } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const targetVariant = siteVariant || platform || 'Enterprise';
    const response = await processDbAiChatQuery(message, targetVariant);
    return NextResponse.json(response);
  } catch {
    const fallback = await processDbAiChatQuery('help', 'Enterprise');
    return NextResponse.json(fallback);
  }
}

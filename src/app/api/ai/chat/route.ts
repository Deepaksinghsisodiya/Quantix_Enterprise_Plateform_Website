import { NextResponse } from 'next/server';
import { QUANTIX_MASTER_PROMPT, getSmartLocalResponse } from '@/lib/ai/universalKnowledge';

let cachedModels: string[] | null = null;
let lastModelFetch = 0;

async function getAvailableGoogleModels(geminiKey: string): Promise<string[]> {
  const now = Date.now();
  if (cachedModels && now - lastModelFetch < 1000 * 60 * 30) {
    return cachedModels;
  }

  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey}`);
    if (listRes.ok) {
      const json = await listRes.json();
      const models = (json?.models || [])
        .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m: any) => m.name);

      if (models.length > 0) {
        models.sort((a: string, b: string) => {
          const score = (name: string) => {
            if (name.includes('gemini-2.0-flash')) return 100;
            if (name.includes('gemini-1.5-flash')) return 90;
            if (name.includes('gemini-1.5-pro')) return 80;
            if (name.includes('gemini')) return 70;
            return 40;
          };
          return score(b) - score(a);
        });

        cachedModels = models;
        lastModelFetch = now;
        return models;
      }
    }
  } catch {
    // Continue
  }

  return [
    'models/gemini-2.0-flash-exp',
    'models/gemini-1.5-flash-002',
    'models/gemini-1.5-flash-001',
    'models/gemini-1.5-flash',
  ];
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
    const openaiKey = (process.env.OPENAI_API_KEY || '').trim();

    // 1. DYNAMIC LIVE GOOGLE GEMINI CALL (Natural, Professional, Accurate)
    if (geminiKey) {
      const models = await getAvailableGoogleModels(geminiKey);

      for (const modelName of models) {
        const cleanModel = modelName.startsWith('models/') ? modelName : `models/${modelName}`;
        const url = `https://generativelanguage.googleapis.com/v1beta/${cleanModel}:generateContent?key=${geminiKey}`;

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3800);

          const res = await fetch(url, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are Quantix AI, the official 24/7 Chief Solutions Advisor for the Quantix Enterprise POS Platform.
Your goal is to warmly, clearly, and helpfully answer the customer's questions using our verified platform capabilities below.

VERIFIED PLATFORM CAPABILITIES:
${QUANTIX_MASTER_PROMPT}

INSTRUCTIONS:
- Directly answer whatever the customer asks in 2-3 clear, helpful, and professional sentences.
- When asked about delivery, explain our direct DoorDash and Uber Eats integrations (orders inject straight into POS without extra tablets) and branded online ordering.
- When asked about payments, explain our Stripe and Authorize.Net integrations (Apple Pay, Google Pay, Tap-to-Pay, and offline billing).
- Respond in English or natural fluent Hinglish (Roman English letters) based on the customer's language.
- Never output Devanagari script (हिंदी).

Customer: "${message}"
Quantix AI:`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 250,
              },
            }),
          });

          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            let rawReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

            if (rawReply) {
              const lower = rawReply.toLowerCase();
              const isActionable =
                lower.includes('trial') ||
                lower.includes('demo') ||
                lower.includes('pricing') ||
                lower.includes('plan') ||
                lower.includes('schedule') ||
                lower.includes('contact');

              const actionType = lower.includes('pricing') || lower.includes('trial')
                ? 'CONTACT_SALES'
                : 'BOOK_DEMO';

              return NextResponse.json({
                reply: rawReply,
                isActionable,
                actionType,
                source: 'gemini-live',
              });
            }
          }
        } catch {
          // Try next model or fallback
        }
      }
    }

    // 2. OPENAI FALLBACK
    if (openaiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            max_tokens: 250,
            messages: [
              {
                role: 'system',
                content: `You are Quantix AI, the official solutions advisor for Quantix Enterprise. Answer helpfully and accurately using this platform knowledge:\n\n${QUANTIX_MASTER_PROMPT}`,
              },
              { role: 'user', content: message },
            ],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const rawReply = data?.choices?.[0]?.message?.content?.trim();
          if (rawReply) {
            const lower = rawReply.toLowerCase();
            const isActionable = lower.includes('demo') || lower.includes('trial') || lower.includes('pricing');
            return NextResponse.json({
              reply: rawReply,
              isActionable,
              actionType: lower.includes('trial') ? 'CONTACT_SALES' : 'BOOK_DEMO',
              source: 'openai-live',
            });
          }
        }
      } catch {
        // Fallback to deterministic local engine
      }
    }

    // 3. 100% VERIFIED DETERMINISTIC LOCAL ENGINE
    const local = getSmartLocalResponse(message);
    return NextResponse.json({
      reply: local.reply,
      isActionable: local.isActionable,
      actionType: local.actionType,
      source: 'quantix-verified-local',
    });
  } catch {
    const local = getSmartLocalResponse('help');
    return NextResponse.json({
      reply: local.reply,
      isActionable: local.isActionable,
      actionType: local.actionType,
      source: 'quantix-fallback',
    });
  }
}

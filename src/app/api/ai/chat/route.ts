import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, platform = 'Quantix Enterprise' } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return null so frontend falls back to high-accuracy local Enterprise KB
      return NextResponse.json({ reply: null });
    }

    // Call Google Gemini API if GEMINI_API_KEY is available
    if (process.env.GEMINI_API_KEY) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are Quantix AI, the official 24/7 AI Lead & POS Advisor for ${platform}. 
                    Answer the customer query concisely and professionally in 2-3 sentences. 
                    Encourage scheduling an enterprise demo or leaving contact details.
                    Customer query: "${message}"`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          const lower = message.toLowerCase();
          const isActionable = lower.includes('demo') || lower.includes('price') || lower.includes('cost') || lower.includes('book');
          const actionType = lower.includes('price') || lower.includes('cost') ? 'CONTACT_SALES' : 'BOOK_DEMO';
          return NextResponse.json({ reply: replyText, isActionable, actionType });
        }
      }
    }

    return NextResponse.json({ reply: null });
  } catch (error) {
    return NextResponse.json({ reply: null });
  }
}

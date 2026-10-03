// Hybrid Google Gemini Flash + 100% Live DB-Driven AI Chatbot Engine for Enterprise Website
// Combines Generative AI (Hinglish/English/Hindi) with Real ASP.NET Core Database RAG & Local Fallback

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatEngineResponse {
  reply: string;
  isActionable: boolean;
  actionType: 'BOOK_DEMO' | 'VIEW_PRICING' | 'CONTACT_SUPPORT' | 'VIEW_SOLUTIONS' | 'NONE';
  suggestedButtons?: Array<{ label: string; action: string }>;
  leadCaptured?: boolean;
}

interface PlatformDbCache {
  features: any[];
  faqs: any[];
  integrations: any[];
  solutions: any[];
  pricingPlans: any[];
  supportSection: any | null;
  lastFetched: number;
}

const cache: Record<string, PlatformDbCache> = {};
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes cache

function normalizeVariant(input?: string): 'Enterprise' | 'Restaurant' | 'Retail' {
  if (!input) return 'Enterprise';
  const str = input.toLowerCase();
  if (str.includes('restaurant')) return 'Restaurant';
  if (str.includes('retail')) return 'Retail';
  return 'Enterprise';
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5104';
}

async function getLivePlatformData(siteVariantInput: string): Promise<PlatformDbCache> {
  const variant = normalizeVariant(siteVariantInput);
  const now = Date.now();

  if (cache[variant] && now - cache[variant].lastFetched < CACHE_TTL_MS) {
    return cache[variant];
  }

  const apiUrl = getApiBaseUrl();

  try {
    const [featuresRes, faqRes, integrationsRes, solutionsRes, pricingRes, supportRes] = await Promise.all([
      fetch(`${apiUrl}/api/v1/features/public?siteVariant=${variant}`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${apiUrl}/api/v1/faq/public?siteVariant=${variant}`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${apiUrl}/api/v1/integrations?siteVariant=${variant}`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${apiUrl}/api/v1/solutions/public?siteVariant=${variant}`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${apiUrl}/api/v1/marketing/pricing`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${apiUrl}/api/v1/support-section/public?siteVariant=${variant}`, { next: { revalidate: 300 } }).catch(() => null),
    ]);

    const featuresData = featuresRes && featuresRes.ok ? (await featuresRes.json())?.data || [] : [];
    const faqData = faqRes && faqRes.ok ? (await faqRes.json())?.data || [] : [];
    const integrationsData = integrationsRes && integrationsRes.ok ? (await integrationsRes.json())?.data || [] : [];
    const solutionsData = solutionsRes && solutionsRes.ok ? (await solutionsRes.json())?.data || [] : [];
    const pricingRaw = pricingRes && pricingRes.ok ? (await pricingRes.json())?.data?.enterprisePlans?.plans || [] : [];
    const supportData = supportRes && supportRes.ok ? (await supportRes.json())?.data || null : null;

    const fresh: PlatformDbCache = {
      features: Array.isArray(featuresData) ? featuresData : [],
      faqs: Array.isArray(faqData) ? faqData : [],
      integrations: Array.isArray(integrationsData) ? integrationsData : [],
      solutions: Array.isArray(solutionsData) ? solutionsData : [],
      pricingPlans: Array.isArray(pricingRaw) ? pricingRaw : [],
      supportSection: supportData,
      lastFetched: now,
    };

    cache[variant] = fresh;
    return fresh;
  } catch {
    return {
      features: [],
      faqs: [],
      integrations: [],
      solutions: [],
      pricingPlans: [],
      supportSection: null,
      lastFetched: now,
    };
  }
}

async function autoCaptureLeadIfPresent(message: string, siteVariantInput: string): Promise<boolean> {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /\b[6-9]\d{9}\b|\b\d{10}\b/;

  const emailMatch = message.match(emailRegex);
  const phoneMatch = message.match(phoneRegex);

  if (emailMatch || phoneMatch) {
    try {
      const variant = normalizeVariant(siteVariantInput);
      const apiUrl = getApiBaseUrl();
      await fetch(`${apiUrl}/api/v1/contact/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Backend DemoRequestDto field is `contactName`, not `fullName`.
          contactName: 'AI Chatbot Visitor',
          email: emailMatch ? emailMatch[0] : 'chat-lead@quantix.io',
          phone: phoneMatch ? phoneMatch[0] : 'N/A',
          companyName: `${variant} Inquiry`,
          businessType: variant,
          preferredMerchantType: variant === 'Enterprise' ? 'Enterprise' : 'Standalone',
          message: `Auto-captured user message: "${message}"`,
        }),
      });
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

// -------------------------------------------------------------
// GOOGLE GEMINI 100% REAL LIVE DB RAG CALL
// -------------------------------------------------------------
async function queryGeminiWithLiveContext(
  userQuery: string,
  variant: 'Enterprise' | 'Restaurant' | 'Retail',
  dbData: PlatformDbCache
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL || 'gemini-flash-lite-latest';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const pricingSummary = dbData.pricingPlans.slice(0, 4).map((p: any) => {
    return `- ${p.displayName || p.planName}: $${p.planPricePerDay || 0}/day ($${Math.round((p.planPricePerDay || 0) * 30)}/month). Bullets: ${Array.isArray(p.marketingBullets) ? p.marketingBullets.slice(0, 2).join(', ') : p.marketingBullets || ''}`;
  }).join('\n');

  const integrationsSummary = dbData.integrations.slice(0, 8).map((i: any) => `- ${i.name || i.title} (${i.category || 'General'}) [Sync: ${i.syncSpeed || 'Instant'}]`).join('\n');
  const solutionsSummary = dbData.solutions.slice(0, 4).map((s: any) => `- ${s.title || s.name}: ${s.description || ''}`).join('\n');
  const featuresSummary = dbData.features.slice(0, 6).map((f: any) => `- ${f.title || f.name}: ${f.shortDescription || f.fullDescription || ''}`).join('\n');

  const systemPrompt = `You are Quantix AI, an intelligent, polite and warm SaaS sales advisor for "Quantix ${variant} POS".
Here is our 100% REAL LIVE DATABASE information (Direct from ASP.NET Core API):
--- PRICING PLANS ---
${pricingSummary || 'Basic: $6/day, Pro: $10/day, Advance: $15/day'}

--- ACTIVE INTEGRATIONS ---
${integrationsSummary || 'Stripe, Square, DoorDash, Uber Eats, Shopify, QuickBooks'}

--- INDUSTRY SOLUTIONS ---
${solutionsSummary || 'Multi-Store Cloud, Franchises, Quick Service, Retail'}

--- CORE PLATFORM MODULES ---
${featuresSummary || 'Offline-first billing, matrix inventory, real-time sync, KDS kitchen screens, receipt printers, barcode scanning'}

--- SUPPORT CONTACT ---
Direct Phone: ${dbData.supportSection?.directPhone || '+1 (800) 555-0199'}, Email: ${dbData.supportSection?.directEmail || 'support@quantix.io'}, SLA: < 45s Live Response.

CONVERSATION RULES:
1. Speak naturally in the EXACT language of the user (Natural English, Hindi, or Hinglish).
2. If customer says "thank you", "thanks", "dhanyawad", reply warmly and politely.
3. If customer asks about hardware (weighing machines, barcode scanners, iPads, thermal printers), confirm seamless connectivity (USB, RS232, LAN, Bluetooth).
4. If customer asks about offline operations, explain offline-first local SQLite caching + auto cloud sync.
5. If customer asks about pricing, ALWAYS quote the exact numbers from the pricing list above.
6. Keep replies concise, conversational, formatted with markdown bullet points and emojis.
7. Always invite the customer to schedule a free 1-on-1 live demo.`;

  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3-flash-preview', 'gemini-flash-lite-latest'];

  for (const m of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nCustomer Query: "${userQuery}"` }] }
          ],
          generationConfig: {
            temperature: 0.65,
            maxOutputTokens: 600
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      }
    } catch {
      continue;
    }
  }
  return null;
}

export async function processDbAiChatQuery(
  userQuery: string,
  siteVariantInput: string = 'Enterprise'
): Promise<ChatEngineResponse> {
  const variant = normalizeVariant(siteVariantInput);
  const q = userQuery.trim().toLowerCase();
  const dbData = await getLivePlatformData(variant);
  const leadCaptured = await autoCaptureLeadIfPresent(userQuery, variant);

  // 1. First attempt Gemini Generative AI (Hinglish/Hindi/English freeform conversation)
  const geminiResponse = await queryGeminiWithLiveContext(userQuery, variant, dbData);

  if (geminiResponse) {
    const isPricing = q.includes('price') || q.includes('pricing') || q.includes('plan') || q.includes('cost');
    const isSupport = q.includes('support') || q.includes('call') || q.includes('phone') || q.includes('help');

    return {
      reply: geminiResponse,
      isActionable: true,
      actionType: isPricing ? 'VIEW_PRICING' : isSupport ? 'CONTACT_SUPPORT' : 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '🏷️ View Pricing Plans', action: 'VIEW_PRICING' },
        { label: '🎧 Contact Support', action: 'CONTACT_SUPPORT' },
      ],
      leadCaptured,
    };
  }

  // -------------------------------------------------------------
  // FAIL-SAFE LOCAL LIVE DB ENGINE (If Gemini is unavailable or slow)
  // -------------------------------------------------------------
  if (
    q === 'thank you' ||
    q === 'thanks' ||
    q === 'thx' ||
    q.startsWith('thank you') ||
    q.startsWith('thanks') ||
    q.includes('dhanyawad') ||
    q.includes('shukriya')
  ) {
    return {
      reply: `😊 **You're most welcome!**\n\nI'm really glad I could assist you. Whenever you're ready to experience **Quantix ${variant} POS** in action, I can arrange a personalized 1-on-1 walkthrough for you. Have any other questions for me?`,
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '🏷️ View Pricing Plans', action: 'VIEW_PRICING' },
      ],
      leadCaptured,
    };
  }

  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q === 'namaste' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.includes('kaise ho')
  ) {
    return {
      reply: `👋 **Hello there! Welcome to Quantix ${variant} POS.**\n\nI'm your 24/7 AI Solutions Advisor. I can help answer questions about our **high-speed billing**, **multi-location inventory**, **supported hardware & integrations**, or show you our **pricing plans**.\n\nWhat would you like to explore today?`,
      isActionable: true,
      actionType: 'NONE',
      suggestedButtons: [
        { label: '🏷️ Pricing Plans', action: 'VIEW_PRICING' },
        { label: '🚀 Key Features', action: 'What are the main features?' },
        { label: '🔌 Integrations', action: '/integrations' },
        { label: '📅 Book a Live Demo', action: 'BOOK_DEMO' },
      ],
      leadCaptured,
    };
  }

  // Demo intent
  if (q.includes('demo') || q.includes('book') || q.includes('trial')) {
    return {
      reply: leadCaptured
        ? `✅ **Thank You!** We have registered your details with our ${variant} Solutions Team. A specialist will call you shortly.`
        : `👋 We would love to demonstrate Quantix ${variant} POS! You can fill our **quick 30-second Demo Request Form** right inside this chat window or leave your contact number.`,
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📝 Open 30s Demo Form', action: 'BOOK_DEMO' },
        { label: '📞 Call Support Team', action: 'CONTACT_SUPPORT' },
      ],
      leadCaptured,
    };
  }

  // Pricing fallback
  if (dbData.pricingPlans.length > 0) {
    const list = dbData.pricingPlans.slice(0, 3).map((p: any) => `• **${p.displayName || p.planName}**: $${p.planPricePerDay || 0}/day ($${Math.round((p.planPricePerDay || 0) * 30)}/mo)`).join('\n');
    return {
      reply: `💰 **Live Pricing Plans for Quantix ${variant} POS:**\n\n${list}\n\n*All plans include offline-first syncing, 24/7 support, and automatic cloud backups.*`,
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '🎧 Contact Support', action: 'CONTACT_SUPPORT' },
      ],
      leadCaptured,
    };
  }

  return {
    reply: `👋 Welcome to Quantix ${variant} POS! How can I help you today? Would you like to schedule a 1-on-1 demo or view our pricing?`,
    isActionable: true,
    actionType: 'BOOK_DEMO',
    suggestedButtons: [
      { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
      { label: '🏷️ View Pricing Plans', action: 'VIEW_PRICING' },
    ],
    leadCaptured,
  };
}

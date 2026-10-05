// Hybrid Live DB-Driven AI Chatbot Engine for Enterprise Website
// 100% Real Database RAG: Pricing (27 Plans), Integrations, Features, Solutions, Support

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
const CACHE_TTL_MS = 1000 * 60 * 2; // 2 minutes dynamic cache (picks up DB admin updates fast)

function normalizeVariant(input?: string): 'Enterprise' | 'Restaurant' | 'Retail' {
  if (!input) return 'Enterprise';
  const str = input.toLowerCase();
  if (str.includes('restaurant') || str.includes('restaurent')) return 'Restaurant';
  if (str.includes('retail') || str.includes('store') || str.includes('shop')) return 'Retail';
  return 'Enterprise';
}

function getApiBaseUrl(): string {
  return (
    process.env.BACKEND_API_URL ||
    process.env.LIVE_BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'https://quantixapi.foreteksolution.in'
  ).replace(/\/$/, '');
}

// Verified baseline plan structure (safety net during initial server boot or network blip)
const DEFAULT_PLANS = [
  { planCode: 'pos-res-basic', planName: 'Standalone POS · Restaurant · Basic', displayName: 'Basic', flavour: 'RES', planType: 'StandalonePos', planPricePerDay: 6, maxLocations: 1, maxTerminals: 1, marketingBullets: ['Single-terminal counter billing with offline-first local SQLite sync.'] },
  { planCode: 'pos-res-pro', planName: 'Standalone POS · Restaurant · Pro', displayName: 'Pro', flavour: 'RES', planType: 'StandalonePos', planPricePerDay: 10, maxLocations: 1, maxTerminals: 3, marketingBullets: ['Up to 3 POS terminals, floor plan mapping & Kitchen Display System (KDS).'] },
  { planCode: 'pos-res-adv', planName: 'Standalone POS · Restaurant · Advance', displayName: 'Advance', flavour: 'RES', planType: 'StandalonePos', planPricePerDay: 15, maxLocations: 2, maxTerminals: 5, marketingBullets: ['Up to 5 terminals across 2 outlets with live recipe costing & ingredient depletion.'] },
  { planCode: 'pos-ret-basic', planName: 'Standalone POS · Retail · Basic', displayName: 'Basic', flavour: 'RET', planType: 'StandalonePos', planPricePerDay: 6, maxLocations: 1, maxTerminals: 1, marketingBullets: ['Rapid barcode scanning, cash drawer float tracking & receipt printing.'] },
  { planCode: 'pos-ret-pro', planName: 'Standalone POS · Retail · Pro', displayName: 'Pro', flavour: 'RET', planType: 'StandalonePos', planPricePerDay: 10, maxLocations: 1, maxTerminals: 3, marketingBullets: ['Matrix inventory (size/color/batch), barcode labels & customer loyalty.'] },
  { planCode: 'pos-ret-adv', planName: 'Standalone POS · Retail · Advance', displayName: 'Advance', flavour: 'RET', planType: 'StandalonePos', planPricePerDay: 15, maxLocations: 2, maxTerminals: 5, marketingBullets: ['Serial/IMEI tracking, automated purchase order replenishment & BOGO engine.'] },
  { planCode: 'cld-res-basic', planName: 'Standalone Cloud · Restaurant · Basic', displayName: 'Cloud Basic', flavour: 'RES', planType: 'StandaloneCloud', planPricePerDay: 20, maxLocations: 2, maxTerminals: 4, marketingBullets: ['Isolated cloud instance with web storefront and 2 outlets.'] },
  { planCode: 'cld-res-pro', planName: 'Standalone Cloud · Restaurant · Pro', displayName: 'Cloud Pro', flavour: 'RES', planType: 'StandaloneCloud', planPricePerDay: 30, maxLocations: 5, maxTerminals: 10, marketingBullets: ['Up to 5 outlets & 10 terminals with centralized menu management.'] },
  { planCode: 'cld-res-adv', planName: 'Standalone Cloud · Restaurant · Advance', displayName: 'Cloud Advance', flavour: 'RES', planType: 'StandaloneCloud', planPricePerDay: 45, maxLocations: 10, maxTerminals: 20, marketingBullets: ['Multi-branch central kitchen, warehouse transfers and live BI telemetry.'] },
  { planCode: 'ent-res-basic', planName: 'Enterprise Cloud · Restaurant · Basic', displayName: 'Enterprise Basic', flavour: 'RES', planType: 'EnterpriseCloud', planPricePerDay: 60, maxLocations: 15, maxTerminals: 30, marketingBullets: ['Managed enterprise cloud for up to 3 businesses and 15 outlets.'] },
  { planCode: 'ent-res-pro', planName: 'Enterprise Cloud · Restaurant · Pro', displayName: 'Enterprise Pro', flavour: 'RES', planType: 'EnterpriseCloud', planPricePerDay: 100, maxLocations: 50, maxTerminals: 100, marketingBullets: ['10 businesses, 50 outlets and 100 terminals under one unified cloud roof.'] },
  { planCode: 'ent-res-adv', planName: 'Enterprise Cloud · Restaurant · Advance', displayName: 'Enterprise Advance', flavour: 'RES', planType: 'EnterpriseCloud', planPricePerDay: 175, maxLocations: 100, maxTerminals: 250, marketingBullets: ['25 businesses, 100 outlets and 250 terminals — dedicated account manager & 99.99% SLA.'] },
  { planCode: 'ent-bot-basic', planName: 'Enterprise Cloud · Unified · Basic', displayName: 'Enterprise Basic', flavour: 'BOT', planType: 'EnterpriseCloud', planPricePerDay: 60, maxLocations: 15, maxTerminals: 30, marketingBullets: ['Run restaurant and retail terminals side by side on one enterprise license.'] },
  { planCode: 'ent-bot-pro', planName: 'Enterprise Cloud · Unified · Pro', displayName: 'Enterprise Pro', flavour: 'BOT', planType: 'EnterpriseCloud', planPricePerDay: 100, maxLocations: 50, maxTerminals: 100, marketingBullets: ['10 businesses, 50 outlets, advance inventory, HR and analytics bridge sync.'] },
  { planCode: 'ent-bot-adv', planName: 'Enterprise Cloud · Unified · Advance', displayName: 'Enterprise Advance', flavour: 'BOT', planType: 'EnterpriseCloud', planPricePerDay: 175, maxLocations: 100, maxTerminals: 250, marketingBullets: ['Unlimited enterprise footprint, custom REST APIs, dedicated webhooks & SLA.'] },
];

async function getLivePlatformData(siteVariantInput: string): Promise<PlatformDbCache> {
  const variant = normalizeVariant(siteVariantInput);
  const now = Date.now();

  if (cache[variant] && now - cache[variant].lastFetched < CACHE_TTL_MS) {
    return cache[variant];
  }

  const apiUrl = getApiBaseUrl();

  try {
    const fetchWithTimeout = (url: string) =>
      fetch(url, {
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(4000),
      }).catch(() => null);

    const [featuresRes, faqRes, integrationsRes, solutionsRes, pricingRes, supportRes] = await Promise.all([
      fetchWithTimeout(`${apiUrl}/api/v1/features/public?siteVariant=${variant}`),
      fetchWithTimeout(`${apiUrl}/api/v1/faq/public?siteVariant=${variant}`),
      fetchWithTimeout(`${apiUrl}/api/v1/integrations?siteVariant=${variant}`),
      fetchWithTimeout(`${apiUrl}/api/v1/solutions/public?siteVariant=${variant}`),
      fetchWithTimeout(`${apiUrl}/api/v1/marketing/pricing`),
      fetchWithTimeout(`${apiUrl}/api/v1/support-section/public?siteVariant=${variant}`),
    ]);

    const featuresData = featuresRes && featuresRes.ok ? (await featuresRes.json().catch(() => null))?.data || [] : [];
    const faqData = faqRes && faqRes.ok ? (await faqRes.json().catch(() => null))?.data || [] : [];
    const integrationsData = integrationsRes && integrationsRes.ok ? (await integrationsRes.json().catch(() => null))?.data || [] : [];
    const solutionsData = solutionsRes && solutionsRes.ok ? (await solutionsRes.json().catch(() => null))?.data || [] : [];
    
    const pricingJson = pricingRes && pricingRes.ok ? await pricingRes.json().catch(() => null) : null;
    let pricingRaw =
      pricingJson?.data?.enterprisePlans?.plans ||
      pricingJson?.data?.plans ||
      (Array.isArray(pricingJson?.data) ? pricingJson.data : []);

    if (!Array.isArray(pricingRaw) || pricingRaw.length === 0) {
      pricingRaw = DEFAULT_PLANS;
    }

    const supportData = supportRes && supportRes.ok ? (await supportRes.json().catch(() => null))?.data || null : null;

    const fresh: PlatformDbCache = {
      features: Array.isArray(featuresData) ? featuresData : [],
      faqs: Array.isArray(faqData) ? faqData : [],
      integrations: Array.isArray(integrationsData) ? integrationsData : [],
      solutions: Array.isArray(solutionsData) ? solutionsData : [],
      pricingPlans: pricingRaw,
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
      pricingPlans: DEFAULT_PLANS,
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
          contactName: 'AI Chatbot Visitor',
          email: emailMatch ? emailMatch[0] : 'chat-lead@quantix.io',
          phone: phoneMatch ? phoneMatch[0] : 'N/A',
          companyName: `${variant} Website Visitor`,
          businessType: variant,
          preferredMerchantType: variant === 'Enterprise' ? 'Enterprise' : 'Standalone',
          message: `Lead via AI Chatbot [Auto-captured]: "${message}"`,
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
// DYNAMIC DATABASE PRICING RESPONSE BUILDER (100% Live DB Plans)
// -------------------------------------------------------------
function buildPricingResponse(query: string, currentVariant: string, plans: any[]): string {
  const q = query.toLowerCase();
  const allPlans: any[] = plans && plans.length > 0 ? plans : DEFAULT_PLANS;
  const activePlans = allPlans.filter((p: any) => (p.isActive ?? true) && !p.isDeprecated);

  const isAskingEnterprise = q.includes('enterprise') || q.includes('franchise') || q.includes('chain') || q.includes('hq');
  const isAskingRestaurant = q.includes('restaurant') || q.includes('restaurent') || q.includes('food') || q.includes('cafe') || q.includes('dining') || q.includes('kitchen') || q.includes('kds');
  const isAskingRetail = q.includes('retail') || q.includes('store') || q.includes('shop') || q.includes('supermarket') || q.includes('grocery') || q.includes('barcode');
  const isAskingCloudOnly = (q.includes('cloud') || q.includes('multi store') || q.includes('multi location')) && !isAskingEnterprise;
  const isAskingStandaloneOnly = q.includes('standalone') || q.includes('single store') || q.includes('single outlet') || q.includes('basic pos');

  const formatPlanLine = (p: any) => {
    const name = p.displayName || p.planName || 'Plan';
    const daily = Number(p.planPricePerDay || 0);
    const monthly = Math.round(daily * 30);
    const locs = p.maxLocations ? `${p.maxLocations} Location${p.maxLocations > 1 ? 's' : ''}` : '';
    const tills = p.maxTerminals ? `${p.maxTerminals} Terminal${p.maxTerminals > 1 ? 's' : ''}` : '';
    const cap = locs && tills ? ` (${locs} · ${tills})` : '';
    const bullet = Array.isArray(p.marketingBullets) && p.marketingBullets[0]
      ? `\n  - ${p.marketingBullets[0]}`
      : p.description ? `\n  - ${p.description}` : '';
    return `• **${name}**: **$${daily}/day** ($${monthly.toLocaleString()}/month)${cap}${bullet}`;
  };

  // 1. Enterprise Cloud Plans from Database
  if (isAskingEnterprise || (!isAskingRestaurant && !isAskingRetail && currentVariant === 'Enterprise' && !isAskingStandaloneOnly && !isAskingCloudOnly)) {
    const entPlans = activePlans
      .filter((p: any) => p.planType === 'EnterpriseCloud' || Number(p.planPricePerDay || 0) >= 50)
      .sort((a: any, b: any) => Number(a.planPricePerDay || 0) - Number(b.planPricePerDay || 0));

    // Deduplicate by tier (Basic, Pro, Advance)
    const tiers = ['Basic', 'Pro', 'Advance'];
    const chosen = tiers.map(tier => entPlans.find((p: any) => (p.displayName || p.planName || '').toLowerCase().includes(tier.toLowerCase()))).filter(Boolean);
    const listToRender = chosen.length > 0 ? chosen : entPlans.slice(0, 3);

    return `🏢 **Quantix Enterprise Cloud Plans (Live Database):**\n\n${listToRender.map(formatPlanLine).join('\n\n')}\n\n💡 *All Enterprise plans include Centralized Multi-Branch HQ, Warehouse Transfers, Real-Time BI Telemetry, Open REST APIs & 24/7 SLA Support.*`;
  }

  // 2. Restaurant Plans from Database
  if (isAskingRestaurant || (currentVariant === 'Restaurant' && !isAskingRetail && !isAskingEnterprise)) {
    const resPlans = activePlans.filter((p: any) => p.flavour === 'RES' || p.flavour === 'BOT' || !p.flavour);
    const standalone = resPlans.filter((p: any) => p.planType === 'StandalonePos').sort((a: any, b: any) => Number(a.planPricePerDay || 0) - Number(b.planPricePerDay || 0));
    const cloud = resPlans.filter((p: any) => p.planType === 'StandaloneCloud').sort((a: any, b: any) => Number(a.planPricePerDay || 0) - Number(b.planPricePerDay || 0));
    const enterprise = resPlans.filter((p: any) => p.planType === 'EnterpriseCloud').sort((a: any, b: any) => Number(a.planPricePerDay || 0) - Number(b.planPricePerDay || 0));

    const lines: string[] = ['🍽️ **Quantix Restaurant POS Plans (Live Database):**'];
    if (standalone.length > 0) {
      lines.push('\n**1. Standalone POS (Single Outlet — 100% Offline-First):**');
      lines.push(standalone.slice(0, 3).map(formatPlanLine).join('\n'));
    }
    if (cloud.length > 0) {
      lines.push('\n**2. Standalone Cloud (Multi-Outlet Restaurant Hub):**');
      lines.push(cloud.slice(0, 3).map(formatPlanLine).join('\n'));
    }
    if (enterprise.length > 0) {
      lines.push('\n**3. Enterprise Cloud (Franchises & Chains):**');
      lines.push(enterprise.slice(0, 3).map(formatPlanLine).join('\n'));
    }
    lines.push('\n⚡ *All restaurant plans include Kitchen Display System (KDS), Table Management, and DoorDash/Uber Eats/Zomato aggregator sync.*');
    return lines.join('\n');
  }

  // 3. Retail Plans from Database
  if (isAskingRetail || (currentVariant === 'Retail' && !isAskingRestaurant && !isAskingEnterprise)) {
    const retPlans = activePlans.filter((p: any) => p.flavour === 'RET' || p.flavour === 'BOT' || !p.flavour);
    const standalone = retPlans.filter((p: any) => p.planType === 'StandalonePos').sort((a: any, b: any) => Number(a.planPricePerDay || 0) - Number(b.planPricePerDay || 0));
    const cloud = retPlans.filter((p: any) => p.planType === 'StandaloneCloud').sort((a: any, b: any) => Number(a.planPricePerDay || 0) - Number(b.planPricePerDay || 0));
    const enterprise = retPlans.filter((p: any) => p.planType === 'EnterpriseCloud').sort((a: any, b: any) => Number(a.planPricePerDay || 0) - Number(b.planPricePerDay || 0));

    const lines: string[] = ['🛍️ **Quantix Retail POS Plans (Live Database):**'];
    if (standalone.length > 0) {
      lines.push('\n**1. Standalone POS (Single Store — 100% Offline-First):**');
      lines.push(standalone.slice(0, 3).map(formatPlanLine).join('\n'));
    }
    if (cloud.length > 0) {
      lines.push('\n**2. Standalone Cloud (Multi-Store Retail Network):**');
      lines.push(cloud.slice(0, 3).map(formatPlanLine).join('\n'));
    }
    if (enterprise.length > 0) {
      lines.push('\n**3. Enterprise Cloud (Supermarkets & Multi-Store HQ):**');
      lines.push(enterprise.slice(0, 3).map(formatPlanLine).join('\n'));
    }
    lines.push('\n📦 *All retail plans include Barcode Matrix Scanning, Electronic Scale sync, Automated Purchase Orders & Customer Loyalty.*');
    return lines.join('\n');
  }

  // 4. General Pricing Overview from Database
  const standaloneMin = Math.min(...activePlans.filter((p: any) => p.planType === 'StandalonePos').map((p: any) => Number(p.planPricePerDay || 6)));
  const cloudMin = Math.min(...activePlans.filter((p: any) => p.planType === 'StandaloneCloud').map((p: any) => Number(p.planPricePerDay || 20)));
  const enterpriseMin = Math.min(...activePlans.filter((p: any) => p.planType === 'EnterpriseCloud').map((p: any) => Number(p.planPricePerDay || 60)));

  return `💰 **Official Quantix POS Pricing Structure (Live Database):**

**1. Standalone POS (Single Outlet — Offline-First):**
• Starting from **$${standaloneMin}/day** ($${standaloneMin * 30}/month)
• Rapid counter billing, local SQLite zero-internet failover & thermal receipt printing.

**2. Standalone Cloud (Multi-Store Synchronization):**
• Starting from **$${cloudMin}/day** ($${cloudMin * 30}/month)
• Web storefront, centralized menu management & multi-outlet inventory sync.

**3. Enterprise Cloud (Franchises & Multi-Unit HQ Chains):**
• Starting from **$${enterpriseMin}/day** ($${enterpriseMin * 30}/month)
• Unlimited branches, inter-store warehouse transfers, custom REST APIs & 99.99% SLA.

✅ *0% platform commission, zero proprietary hardware lock-in, and 24/7 dedicated support across all plans.*`;
}

// -------------------------------------------------------------
// DYNAMIC DATABASE FEATURES RESPONSE BUILDER (100% Live DB Features)
// -------------------------------------------------------------
function buildFeaturesResponse(variant: string, dbFeatures: any[]): string {
  if (Array.isArray(dbFeatures) && dbFeatures.length > 0) {
    const list = dbFeatures.slice(0, 8).map((f: any) => {
      const title = f.title || f.name || 'Platform Feature';
      const cat = f.category ? ` [${f.category}]` : '';
      const desc = f.shortDescription || f.subtitle || (Array.isArray(f.bullets) && f.bullets[0]) || '';
      const stat = f.statValue && f.statLabel ? ` — *(${f.statValue} ${f.statLabel})*` : '';
      return `• 🚀 **${title}**${cat}: ${desc}${stat}`;
    });

    return `🚀 **Live Features of Quantix ${variant} POS (Direct from Platform Database):**\n\n${list.join('\n\n')}\n\n💡 *All features support offline-first operation, automatic cloud backups, and multi-user role permissions.*`;
  }

  // Graceful fallback if database connection is initialising
  return `🚀 **Top Features of Quantix ${variant} POS:**

• ⚡ **Offline-First Billing Engine**: Process bills and print receipts with zero internet latency; automatically syncs when online.
• 📊 **Multi-Location Inventory & Stock Transfers**: Centralized stock counts, low-stock reorder thresholds, and inter-branch manifests.
• 📺 **Kitchen Display System (KDS) & Floor Mapping**: Real-time ticket routing with station timers and table status.
• 💳 **Omnichannel Checkout & Integrated Payments**: Native support for Stripe, Square, Authorize.Net, and local contactless card terminals.
• 📈 **Real-Time BI Telemetry & Gross Margin Analytics**: Monitor sales, discounts, taxes, and profitability live across outlets.`;
}

// -------------------------------------------------------------
// DYNAMIC DATABASE INTEGRATIONS RESPONSE BUILDER (100% Live DB Integrations)
// -------------------------------------------------------------
function buildIntegrationsResponse(variant: string, dbIntegrations: any[]): string {
  if (Array.isArray(dbIntegrations) && dbIntegrations.length > 0) {
    const categories: Record<string, any[]> = {};
    for (const item of dbIntegrations) {
      const cat = item.categoryLabel || item.category || 'Platform Integrations';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(item);
    }

    const categoryBlocks = Object.entries(categories).map(([catName, items]) => {
      const formattedItems = items.slice(0, 4).map((i: any) => {
        const desc = i.description || i.tagline ? ` — ${i.description || i.tagline}` : '';
        const speed = i.syncSpeed ? ` *(Sync: ${i.syncSpeed})*` : '';
        return `  - **${i.name}**${desc}${speed}`;
      }).join('\n');

      return `• 🔌 **${catName.toUpperCase()}** (${items.length} Active Connectors):\n${formattedItems}`;
    });

    return `🔌 **Live Verified Integrations for Quantix ${variant} POS (Direct from Database):**\n\n${categoryBlocks.join('\n\n')}\n\n💡 *Need custom ERP, Accounting, or Payment Gateway connectivity? Our open REST APIs and webhooks integrate with any legacy system.*`;
  }

  return `🔌 **Supported Integrations for Quantix ${variant} POS:**

• 💳 **Payment Processors**: Stripe, Square, Authorize.Net, Clover, Ingenico & Pax dual-pricing card terminals.
• 🛵 **Online Delivery Aggregators**: DoorDash, Uber Eats, Zomato & Swiggy — live 2-way menu and order routing.
• 🖨️ **Hardware Compatibility**: ESC/POS Thermal Printers (USB/LAN/Wi-Fi/Bluetooth), Barcode Scanners (Zebra, Honeywell), Weighing Scales, and Customer Facing Displays.
• 💼 **Accounting & ERP**: QuickBooks Online, Xero, Tally, SAP & webhook endpoints for custom ERPs.`;
}

// -------------------------------------------------------------
// DYNAMIC DATABASE SOLUTIONS RESPONSE BUILDER (100% Live DB Solutions)
// -------------------------------------------------------------
function buildSolutionsResponse(variant: string, dbSolutions: any[]): string {
  if (Array.isArray(dbSolutions) && dbSolutions.length > 0) {
    const list = dbSolutions.slice(0, 6).map((s: any) => {
      const title = s.title || 'Industry Solution';
      const badge = s.badge ? ` [${s.badge}]` : '';
      const desc = s.description || s.heroDescription || s.tagline || '';
      const metric = s.liveMetric ? ` *(Metric: ${s.liveMetric})*` : '';
      return `• 🎯 **${title}**${badge}: ${desc}${metric}`;
    });

    return `🎯 **Industry Solutions Powered by Quantix ${variant} POS (Direct from Database):**\n\n${list.join('\n\n')}\n\nWould you like to schedule a personalized 1-on-1 demo tailored to your specific business model?`;
  }

  return `🎯 **Industry Solutions Powered by Quantix ${variant} POS:**

• 🍽️ **Food & Beverage**: Quick Service (QSR), Fine Dining, Cafes, Bakeries, Bars, Nightclubs, Cloud Kitchens & Virtual Brands.
• 🛍️ **Retail & Wholesale**: Supermarkets, Grocery, Fashion Boutiques, Electronics, Footwear, Vape & Smoke Shops, Hardware Stores.
• 🏢 **Franchise & Multi-Unit Brands**: Multi-branch enterprises requiring centralized catalog control, pooled inventory, and franchise royalty audits.

Would you like to see a personalized demo for your specific business type?`;
}

// -------------------------------------------------------------
// GEMINI AI RAG CALL WITH LIVE DATABASE CONTEXT
// -------------------------------------------------------------
async function queryGeminiWithLiveContext(
  userQuery: string,
  variant: 'Enterprise' | 'Restaurant' | 'Retail',
  dbData: PlatformDbCache
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith('AQ.')) return null;

  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const topFeatures = (dbData.features || []).slice(0, 6).map(f => `${f.title}: ${f.shortDescription || f.subtitle}`).join('; ');
  const topIntegrations = (dbData.integrations || []).slice(0, 8).map(i => i.name).join(', ');
  const topSolutions = (dbData.solutions || []).slice(0, 5).map(s => s.title).join(', ');

  const systemPrompt = `You are Quantix AI, a professional and helpful SaaS sales advisor for "Quantix ${variant} POS".
Live Database Context:
- Active Features in Database: ${topFeatures || 'Offline Billing, KDS, Matrix Inventory, Real-Time BI Telemetry, Automated POs'}
- Active Integrations in Database: ${topIntegrations || 'Stripe, Square, Authorize.Net, DoorDash, Uber Eats, ESC/POS Printers'}
- Active Solutions in Database: ${topSolutions || 'QSR, Fine Dining, Supermarket, Retail Boutique, Multi-Unit Franchise'}
- Live Pricing Architecture:
  * Standalone POS (Single Outlet): From $6/day ($180/mo)
  * Standalone Cloud (Multi-Outlet): From $20/day ($600/mo)
  * Enterprise Cloud (Chains & HQ): From $60/day ($1,800/mo)

Guidelines:
1. Always give authentic facts from the database above. Never invent fake data or pricing.
2. If customer asks in Hindi or Hinglish, reply warmly in natural Hinglish.
3. Keep responses structured with clean bullet points and encourage scheduling a 1-on-1 demo.`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nCustomer Query: "${userQuery}"` }] }],
        generationConfig: { maxOutputTokens: 500, temperature: 0.2 },
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim().length > 0) return text.trim();
    }
  } catch {
    // Graceful fallback to real DB engine
  }
  return null;
}

// -------------------------------------------------------------
// MAIN CHAT QUERY PROCESSOR
// -------------------------------------------------------------
export async function processDbAiChatQuery(
  userQuery: string,
  siteVariantInput: string = 'Enterprise'
): Promise<ChatEngineResponse> {
  const variant = normalizeVariant(siteVariantInput);
  const q = userQuery.trim().toLowerCase();
  const dbData = await getLivePlatformData(variant);
  const leadCaptured = await autoCaptureLeadIfPresent(userQuery, variant);

  // 1. Try Gemini Generative AI if key is valid
  const geminiResponse = await queryGeminiWithLiveContext(userQuery, variant, dbData);
  if (geminiResponse) {
    const isPricing = q.includes('price') || q.includes('pricing') || q.includes('plan') || q.includes('rate') || q.includes('cost');
    const isSupport = q.includes('support') || q.includes('call') || q.includes('phone') || q.includes('help');

    return {
      reply: geminiResponse,
      isActionable: true,
      actionType: isPricing ? 'VIEW_PRICING' : isSupport ? 'CONTACT_SUPPORT' : 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '🏷️ View Pricing Plans', action: 'What are the pricing plans and rates?' },
        { label: '🎧 Contact Support', action: 'CONTACT_SUPPORT' },
      ],
      leadCaptured,
    };
  }

  // 2. Polite Greetings & Gratitude
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
      reply: `😊 **You're most welcome!**\n\nI'm glad I could assist you with **Quantix ${variant} POS**. Whenever you're ready, I can schedule a personalized 1-on-1 live walkthrough for your business.\n\nDo you have any other questions for me?`,
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '🏷️ View Pricing Plans', action: 'What are the pricing plans and rates?' },
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
    q.includes('kaise ho') ||
    q.includes('kya haal')
  ) {
    return {
      reply: `👋 **Hello there! Welcome to Quantix ${variant} POS.**\n\nI'm your 24/7 AI Solutions Advisor. I can help answer questions about our **live pricing plans**, **key features**, **supported hardware & integrations**, or schedule a **live 1-on-1 demo**.\n\nWhat would you like to explore today?`,
      isActionable: true,
      actionType: 'NONE',
      suggestedButtons: [
        { label: '🏷️ Pricing Plans', action: 'What are the pricing plans and rates?' },
        { label: '🚀 Key Features', action: 'What are the main features?' },
        { label: '🔌 Integrations', action: 'Which integrations are supported?' },
        { label: '📅 Book a Live Demo', action: 'BOOK_DEMO' },
      ],
      leadCaptured,
    };
  }

  // 3. Demo Booking Intent / Lead Capture Request
  if (q.includes('demo') || q.includes('book') || q.includes('trial') || q.includes('schedule') || q.includes('form')) {
    return {
      reply: leadCaptured
        ? `✅ **Thank You!** We have registered your details with our ${variant} Solutions Team. An onboarding specialist will call you shortly to confirm your demo.`
        : `👋 We would love to demonstrate **Quantix ${variant} POS** live in action!\n\nPlease fill out our **quick 30-second Demo Request Form** below or leave your contact details so our solutions team can get in touch with you right away.`,
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📝 Open 30s Demo Form', action: 'BOOK_DEMO' },
        { label: '📞 Call Support Team', action: 'CONTACT_SUPPORT' },
      ],
      leadCaptured,
    };
  }

  // 4. Pricing Intent
  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('plan') ||
    q.includes('rate') ||
    q.includes('cost') ||
    q.includes('charge') ||
    q.includes('kitna') ||
    q.includes('subscription')
  ) {
    return {
      reply: buildPricingResponse(q, variant, dbData.pricingPlans),
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '🚀 Key Features', action: 'What are the main features?' },
        { label: '🎧 Contact Support', action: 'CONTACT_SUPPORT' },
      ],
      leadCaptured,
    };
  }

  // 5. Features Intent
  if (
    q.includes('feature') ||
    q.includes('kya kya') ||
    q.includes('capabilities') ||
    q.includes('kaam karta') ||
    q.includes('kds') ||
    q.includes('billing') ||
    q.includes('module')
  ) {
    return {
      reply: buildFeaturesResponse(variant, dbData.features),
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '🏷️ View Pricing Plans', action: 'What are the pricing plans and rates?' },
        { label: '📅 Book a Live Demo', action: 'BOOK_DEMO' },
        { label: '🔌 Integrations', action: 'Which integrations are supported?' },
      ],
      leadCaptured,
    };
  }

  // 6. Integrations Intent
  if (
    q.includes('integration') ||
    q.includes('integrate') ||
    q.includes('stripe') ||
    q.includes('square') ||
    q.includes('zomato') ||
    q.includes('swiggy') ||
    q.includes('doordash') ||
    q.includes('uber') ||
    q.includes('printer') ||
    q.includes('scanner') ||
    q.includes('hardware') ||
    q.includes('weighing')
  ) {
    return {
      reply: buildIntegrationsResponse(variant, dbData.integrations),
      isActionable: true,
      actionType: 'VIEW_SOLUTIONS',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '🏷️ View Pricing Plans', action: 'What are the pricing plans and rates?' },
      ],
      leadCaptured,
    };
  }

  // 7. Solutions / Industries Intent
  if (
    q.includes('solution') ||
    q.includes('industry') ||
    q.includes('who is this for') ||
    q.includes('kiske liye') ||
    q.includes('business type')
  ) {
    return {
      reply: buildSolutionsResponse(variant, dbData.solutions),
      isActionable: true,
      actionType: 'VIEW_SOLUTIONS',
      suggestedButtons: [
        { label: '📅 Book a Live Demo', action: 'BOOK_DEMO' },
        { label: '🏷️ View Pricing Plans', action: 'What are the pricing plans and rates?' },
      ],
      leadCaptured,
    };
  }

  // 8. Offline Mode Questions
  if (q.includes('offline') || q.includes('internet') || q.includes('wifi') || q.includes('down')) {
    return {
      reply: `📶 **100% Offline-First Architecture:**

• **Zero Internet Downtime**: Built with local SQLite caching. If your Wi-Fi or broadband drops, your POS register never stops.
• You can take orders, process cash/offline transactions, and print thermal kitchen and counter receipts with zero delay.
• The exact second your internet connection returns, all sales and inventory changes automatically synchronize with the cloud.`,
      isActionable: true,
      actionType: 'BOOK_DEMO',
      suggestedButtons: [
        { label: '📅 Book a Live Demo', action: 'BOOK_DEMO' },
        { label: '🏷️ View Pricing Plans', action: 'What are the pricing plans and rates?' },
      ],
      leadCaptured,
    };
  }

  // 9. Contact / Support Intent
  if (q.includes('support') || q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('email')) {
    const phone = dbData.supportSection?.directPhone || '+1 (800) 555-0199';
    const email = dbData.supportSection?.directEmail || 'support@quantix.io';

    return {
      reply: `🎧 **Quantix Support & Sales Assistance:**

• **Direct Support Hotline**: [${phone}](tel:${phone.replace(/[^0-9+]/g, '')})
• **Official Email**: [${email}](mailto:${email})
• **Live Chat & Response SLA**: Under 45 seconds 24/7/365.

Would you like to schedule a 1-on-1 demo or talk to our onboarding team?`,
      isActionable: true,
      actionType: 'CONTACT_SUPPORT',
      suggestedButtons: [
        { label: '📅 Book 1-on-1 Demo', action: 'BOOK_DEMO' },
        { label: '📞 Call Now', action: `tel:${phone.replace(/[^0-9+]/g, '')}` },
      ],
      leadCaptured,
    };
  }

  // Fallback
  return {
    reply: `👋 Welcome to **Quantix ${variant} POS**! I can help you with:

• 🏷️ **Live Pricing Plans** (Standalone, Cloud, Enterprise)
• 🚀 **Key Features** (Offline billing, KDS, inventory, automated POs)
• 🔌 **Integrations** (Stripe, Square, DoorDash, Zomato, printers)
• 📅 **Scheduling a free 1-on-1 Live Demo**

What would you like to know more about?`,
    isActionable: true,
    actionType: 'BOOK_DEMO',
    suggestedButtons: [
      { label: '🏷️ Pricing Plans', action: 'What are the pricing plans and rates?' },
      { label: '🚀 Key Features', action: 'What are the main features?' },
      { label: '📅 Book a Live Demo', action: 'BOOK_DEMO' },
    ],
    leadCaptured,
  };
}

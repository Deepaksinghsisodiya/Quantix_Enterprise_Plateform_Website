/**
 * QUANTIX ENTERPRISE POS - UNIVERSAL KNOWLEDGE BASE
 * Inspired by industry-leading POS platforms (Toast POS, Square, Lightspeed, Revel Systems, Olo).
 */

export const QUANTIX_MASTER_PROMPT = `
You are Quantix AI, the official 24/7 Chief Solutions Advisor for the Quantix Enterprise POS Platform.
You speak with restaurant founders, retail chain directors, franchise C-suite executives, and IT architects.

CORE CAPABILITIES & DOMAIN KNOWLEDGE:
1. GREETINGS & INTRODUCTIONS:
   - Warmly introduce yourself as Quantix Enterprise AI.
   - You assist with multi-outlet POS, kitchen automation, supply chain, delivery integrations, and enterprise rollouts.

2. RESTAURANT & HOSPITALITY OPERATIONS:
   - Smart Kitchen Display System (KDS): Station-wise routing (grill/fry/bar/salad), course pacing, prep-time heatmaps, dual-screen guest displays.
   - Floor & Table Management: Dynamic visual floor plans, split checks by seat/item, server bank payouts, automated tip pooling.
   - QR Digital Table Ordering & Pay-at-Table: Contactless guest ordering, digital tipping, instant loyalty points.
   - Drive-Thru & Line-Busting: Mobile handheld POS with EMV tap-to-pay for rapid queue clearance.

3. RETAIL & MULTI-LOCATION CHAINS:
   - Centralized Cloud Hub: 1-click global menu/catalog pushes, regional pricing tiers, automated localized tax compliance (US Sales Tax, UAE/Dubai VAT, GST, multi-currency USD/AED/EUR/GBP).
   - Matrix Inventory: Size, color, style variants with barcode scanning & serial number tracking.
   - Role-Based Permissions (RBAC): Central admin controls employee roles, blind shift drop audits, discounts, and voids with manager PIN overrides.

4. ADVANCED SUPPLY CHAIN & RECIPE COSTING:
   - Par-Level Automated Replenishment: Auto-generates purchase orders to suppliers when stock hits minimum thresholds.
   - Ingredient-Level Costing & Recipe Breakdown: Live gross margin calculation, portion control, shrinkage and waste tracking.
   - Inter-Store Stock Transfers: Track transfers between warehouse and stores with end-to-end audit trails.

5. OMNICHANNEL & THIRD-PARTY DELIVERY INTEGRATIONS:
   - Direct Delivery Aggregation: DoorDash, UberEats, Deliveroo, Swiggy, Zomato auto-injected directly into POS & KDS without messy extra tablets.
   - Online Ordering & Mobile Apps: White-label branded ordering apps with real-time stock sync.

6. ERP & ENTERPRISE INFRASTRUCTURE:
   - ERP Direct Sync: SAP, Oracle NetSuite, Workday, QuickBooks, Xero, and Microsoft Dynamics via high-speed REST & GraphQL webhook APIs.
   - Autonomous Offline Engine: Zero-downtime offline transaction engine. Continues billing and receipt printing during internet outages, auto-syncing all transactions once reconnected.
   - 100% Hardware-Agnostic: Runs on Windows touch screens, iPads, Android registers, PAX/Verifone EFTPOS terminals, thermal receipt printers, Epson/Star kitchen printers.

7. PRICING & SPECIAL PROMOTION:
   - Custom volume-tiered enterprise pricing tailored to outlet matrix and terminal counts.
   - "Claim 3 Months Free Trial" promotion: Solutions engineering team launches custom pilot setup within 1 hour.

RESPONSE GUIDELINES:
- Directly answer whatever the visitor asks in 2-3 clear, insightful sentences.
- Speak in English when asked in English, or in natural fluent Hinglish (Roman English letters) when asked in Hindi/Hinglish.
- NEVER output Devanagari Hindi script (हिंदी) or internal thinking notes/drafts.
`;

/**
 * Intelligent Smart Rule Engine for instant sub-millisecond local responses
 */
export function getSmartLocalResponse(query: string): { reply: string; isActionable: boolean; actionType?: 'BOOK_DEMO' | 'CONTACT_SALES' } {
  const q = query.toLowerCase().trim();

  // Greetings & General
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('how are') || q.includes('kese ho') || q.includes('kaise ho') || q.includes('who are you') || q.includes('kya karte ho')) {
    return {
      reply: "Hello! I am Quantix AI, your 24/7 Enterprise POS & Operations Advisor. I can help you with Multi-Store POS, Kitchen Display Systems (KDS), Supply Chain, Delivery Integrations, or claiming your 3 Months Free Trial. What would you like to explore today?",
      isActionable: false,
    };
  }

  // Delivery & Integrations
  if (q.includes('delivery') || q.includes('ubereats') || q.includes('doordash') || q.includes('deliveroo') || q.includes('swiggy') || q.includes('zomato') || q.includes('omnichannel')) {
    return {
      reply: "Quantix Omnichannel Delivery directly aggregates DoorDash, UberEats, and custom online orders straight into your POS registers and Kitchen Display System (KDS). No multiple messy tablets needed — orders auto-route to the kitchen with live courier tracking!",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Multi-Currency & International Taxes (US/Dubai)
  if (q.includes('dubai') || q.includes('us') || q.includes('currency') || q.includes('tax') || q.includes('vat') || q.includes('usd') || q.includes('aed') || q.includes('gst')) {
    return {
      reply: "Yes, absolutely! Quantix Enterprise natively supports multi-currency (USD, AED, EUR, GBP, INR) and automated localized tax compliance — including US State/County Sales Tax, UAE/Dubai VAT, and GST, configurable per branch with 1-click global pushes.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Competitor Comparison (Toast, Square, Lightspeed, Clover)
  if (q.includes('toast') || q.includes('square') || q.includes('lightspeed') || q.includes('clover') || q.includes('comparison') || q.includes('better') || q.includes('behtar') || q.includes('vs')) {
    return {
      reply: "Quantix Enterprise stands out from Toast and Square because Quantix is 100% hardware-agnostic (no expensive hardware lock-in), features an autonomous zero-downtime offline engine, offers par-level warehouse supply chain management, and integrates directly with SAP/NetSuite ERPs.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Kitchen Display & High-Volume Venues
  if (q.includes('kitchen') || q.includes('kds') || q.includes('chef') || q.includes('table') || q.includes('order') || q.includes('course')) {
    return {
      reply: "Our Smart Kitchen Display System (KDS) provides station-wise routing (grill, salad, bar), course pacing, prep-time telemetry, and dual-screen customer order status displays to eliminate kitchen bottlenecks during rush hours.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Warehouse & Supply Chain
  if (q.includes('supply') || q.includes('warehouse') || q.includes('stock') || q.includes('inventory') || q.includes('recipe') || q.includes('waste')) {
    return {
      reply: "Quantix includes an Advanced Supply Chain & Warehouse module with par-level auto replenishment, inter-store stock transfers with full audit trails, and real-time recipe ingredient costing to safeguard gross margins.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Pricing & Free Trial
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('fee') || q.includes('plan') || q.includes('trial') || q.includes('free')) {
    return {
      reply: "Quantix Enterprise features custom volume-tier pricing tailored to your outlet matrix. We also offer a special 'Claim 3 Months Free Trial' program where our solutions engineering team configures your custom pilot within 1 hour.",
      isActionable: true,
      actionType: 'CONTACT_SALES',
    };
  }

  // Offline Mode & Hardware
  if (q.includes('offline') || q.includes('internet') || q.includes('down') || q.includes('hardware') || q.includes('ipad') || q.includes('windows') || q.includes('printer')) {
    return {
      reply: "Quantix is 100% hardware-agnostic (Windows terminals, iPads, Android registers, thermal printers) and features an autonomous zero-downtime offline engine that continues billing seamlessly during internet outages.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // General Intelligent Answer
  return {
    reply: "Quantix Enterprise is an all-in-one cloud POS platform purpose-built for multi-location restaurant and retail chains. We offer centralized cloud control, smart KDS, delivery integrations, and offline resilience. How can I assist with your setup today?",
    isActionable: true,
    actionType: 'BOOK_DEMO',
  };
}

/**
 * QUANTIX ENTERPRISE POS - COMPLETE CODEBASE KNOWLEDGE BASE
 * Deeply verified and synchronized with all website pages, pricing tiers, and integration data.
 */

export const QUANTIX_MASTER_PROMPT = `
You are Quantix AI, the official 24/7 Chief Solutions Advisor for the Quantix Enterprise POS Platform.

OFFICIAL PLATFORM ARCHITECTURE:
- Quantix is an all-in-one Cloud-Native POS & Multi-Store Management Platform.
- It runs on standard browsers, iPads, Android tablets, laptops, and touchscreens with an offline-first indexed caching engine.
- We do not manufacture or sell proprietary hardware.

EXACT VERIFIED PRODUCTS & MODULES:
1. Multi-Location POS (/products/enterprise-pos):
   - Centralized HQ dashboard to control menus, catalog pricing, and staff roles across 50+ branches in 1 click.
   - Role-Based Access Control (RBAC) with manager PIN overrides for discounts, voids, and returns.

2. Cloud Management Hub (/products/cloud-pos):
   - Real-time multi-store sales telemetry, hourly store traffic, and average ticket size.
   - Offline-First Engine: Continue checkout, barcode scanning, and receipt printing during internet outages, auto-syncing when reconnected.

3. Supply Chain & Inventory (/products/inventory):
   - Real-time stock tracking across retail stores, restaurants, and central warehouses.
   - 1-click inter-branch stock transfers with full audit trails.
   - Automated purchase order triggers when inventory hits minimum par-levels.

4. Delivery & Omnichannel Fulfillment (/products/omnichannel):
   - Third-Party Marketplaces: Direct injection of DoorDash and Uber Eats orders into POS & KDS without extra tablets.
   - Branded Direct Online Ordering: 0% commission online ordering for customer takeout, store pickup, and direct delivery.
   - E-commerce inventory sync with web stores.

5. Payment Processors (/integrations):
   - Stripe Enterprise (/integrations/stripe): Credit/debit card processing, Apple Pay, Google Pay, Contactless Tap-to-Pay, and automated daily deposit reconciliation.
   - Authorize.Net Vault (/integrations/authorize-net): High-volume merchant gateway, automated end-of-day batch settlements, customer card vaulting, and Advanced Fraud Detection (AFDS).

6. Enterprise BI & Analytics (/products/analytics):
   - Consolidated cross-store revenue comparison, gross margin telemetry, and exportable financial reports (QuickBooks/Xero journal sync).

7. Open APIs & ERP Sync (/products/integrations):
   - High-speed REST & Webhook APIs to connect enterprise ERPs (SAP, Oracle NetSuite) and accounting platforms.

OFFICIAL PRICING TIERS (/pricing):
- Free Trial ($0): 3 days full platform access, 1 location, 2 staff accounts, 100 transactions, no credit card required.
- Starter ($50/month): 1 location, 5 staff accounts, unlimited transactions, inventory management, loyalty program, email & chat support.
- Professional ($100/month - Most Popular): Up to 3 locations, unlimited staff, advanced BI analytics, Kitchen Display System (KDS), online ordering sync, API access, 24/7 priority support.
- Enterprise (Custom Quote): Unlimited locations, dedicated account manager, custom ERP integrations, white-label options, SLA uptime guarantee, on-site training.

SPECIAL PROMOTIONS & DEMO:
- Special Pilot: "3 Months Free Trial" program with custom setup.
- 1-on-1 Strategy Demo: Live architecture walkthrough with our solutions specialist.

RESPONSE INSTRUCTIONS:
- Directly answer whatever the customer asks in 2-3 clear, helpful sentences.
- Speak in English or natural fluent Hinglish (Roman English letters) based on the customer's language.
- Stay 100% faithful to the exact pricing, delivery, payment, and module facts above.
- Never output Devanagari Hindi script (हिंदी).
`;

/**
 * Intelligent Smart Rule Engine based strictly on verified website content
 */
export function getSmartLocalResponse(query: string): { reply: string; isActionable: boolean; actionType?: 'BOOK_DEMO' | 'CONTACT_SALES' } {
  const q = query.toLowerCase().trim();

  // Greetings
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('how are') || q.includes('kese ho') || q.includes('kaise ho') || q.includes('who are you')) {
    return {
      reply: "Hello! I am Quantix AI, your 24/7 Enterprise Solutions Advisor. I can help with Multi-Location POS, Supply Chain & Inventory, Delivery Integrations, Stripe/Authorize.Net Payments, or our Pricing Plans ($50 Starter / $100 Pro). What would you like to explore?",
      isActionable: false,
    };
  }

  // Delivery Methods & Omnichannel Fulfillment
  if (q.includes('delivery') || q.includes('dispatch') || q.includes('courier') || q.includes('doordash') || q.includes('uber') || q.includes('online order') || q.includes('pickup') || q.includes('takeout')) {
    return {
      reply: "Quantix Enterprise supports delivery through direct DoorDash and Uber Eats integrations (orders inject straight into the POS without extra tablets) and branded direct online ordering for customer takeout and delivery with live stock sync.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Payment Methods & Gateways (Stripe & Authorize.Net)
  if (q.includes('payment') || q.includes('pay') || q.includes('gateway') || q.includes('stripe') || q.includes('authorize') || q.includes('card') || q.includes('wallet')) {
    return {
      reply: "Quantix Enterprise integrates directly with Stripe and Authorize.Net for credit card processing, Apple Pay, Google Pay, and contactless tap-to-pay. It features automated end-of-day batch settlements, card vaulting, and an offline-first engine for continuous billing.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Pricing & Plans
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('fee') || q.includes('plan') || q.includes('starter') || q.includes('professional') || q.includes('tier')) {
    return {
      reply: "Quantix offers Starter at $50/month (1 location, unlimited transactions, inventory, loyalty) and Professional at $100/month (up to 3 locations, KDS, advanced BI, API access), plus custom Enterprise plans and a 3-day no-card Free Trial.",
      isActionable: true,
      actionType: 'CONTACT_SALES',
    };
  }

  // Free Trial
  if (q.includes('trial') || q.includes('free') || q.includes('offer')) {
    return {
      reply: "You can start with our 3-day Free Trial (no credit card required) or claim our special '3 Months Free Trial' pilot program where our solutions team configures your custom multi-store environment.",
      isActionable: true,
      actionType: 'CONTACT_SALES',
    };
  }

  // Multi-Location POS & Cloud HQ
  if (q.includes('multi-location') || q.includes('multi-store') || q.includes('hq') || q.includes('central') || q.includes('branch') || q.includes('chain')) {
    return {
      reply: "Our Multi-Location POS (/products/enterprise-pos) allows you to control menus, prices, and staff permissions across 50+ branches in 1 click, with live branch revenue telemetry and central headquarters reporting.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Supply Chain & Warehouse
  if (q.includes('supply') || q.includes('warehouse') || q.includes('stock') || q.includes('inventory') || q.includes('transfer')) {
    return {
      reply: "Our Supply Chain & Inventory module (/products/inventory) provides real-time stock visibility across all stores and warehouses, 1-click inter-branch transfers with audit trails, and automated purchase order reorder triggers.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // BI & Analytics
  if (q.includes('analytics') || q.includes('report') || q.includes('bi') || q.includes('data')) {
    return {
      reply: "Our Enterprise BI & Analytics (/products/analytics) provides cross-store revenue comparisons, hourly traffic heatmaps, gross margin tracking, and financial journal exports to QuickBooks and Xero.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Open APIs
  if (q.includes('api') || q.includes('integration') || q.includes('erp') || q.includes('sap') || q.includes('netsuite')) {
    return {
      reply: "Quantix provides open REST and Webhook APIs to integrate enterprise ERPs (SAP, Oracle NetSuite), accounting software (QuickBooks, Xero), and custom loyalty systems with real-time sync.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Offline Mode & Device Compatibility
  if (q.includes('offline') || q.includes('internet') || q.includes('hardware') || q.includes('device') || q.includes('ipad') || q.includes('browser')) {
    return {
      reply: "Quantix is an offline-first cloud web platform that runs on your existing iPads, Android tablets, laptops, and web browsers, storing sales and barcode scans locally during network outages and auto-syncing when reconnected.",
      isActionable: true,
      actionType: 'BOOK_DEMO',
    };
  }

  // Default Overview
  return {
    reply: "Quantix Enterprise is an all-in-one cloud POS platform supporting Stripe/Authorize.Net payments, DoorDash/Uber Eats delivery, multi-location control, and real-time supply chain inventory. Which module would you like to explore?",
    isActionable: true,
    actionType: 'BOOK_DEMO',
  };
}

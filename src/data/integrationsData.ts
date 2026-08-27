export type IntegrationDetail = {
  slug: string;
  name: string;
  category: string;
  logo: string;
  accent: string;
  badge: string;
  heroHeadline: string;
  tagline: string;
  description: string;
  stats: {
    value: string;
    label: string;
  }[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  setupSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  specs: {
    syncSpeed: string;
    dataTypes: string;
    setupTime: string;
    security: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const INTEGRATIONS_DATA: Record<string, IntegrationDetail> = {
  paypal: {
    slug: 'paypal',
    name: 'PayPal',
    category: 'PAYMENTS & BNPL',
    logo: '/images/navbar/nav_guide_blueprint.png',
    accent: '#003087',
    badge: 'Official PayPal Express & Venmo Partner',
    heroHeadline: 'Supercharge Checkout Conversion with PayPal, Venmo & Pay in 4',
    tagline: 'Accept 400M+ global wallet buyers with sub-second register & web ledger sync.',
    description:
      'Quantix seamlessly unifies PayPal, Venmo, Pay in 4 BNPL, and local bank transfers into one automated Point of Sale. Experience instant 2-way payment reconciliation, zero manual bookkeeping, and complete fraud protection.',
    stats: [
      { value: '3.4X', label: 'Higher Checkout Conversion' },
      { value: '< 50ms', label: 'Webhook Latency' },
      { value: '100%', label: 'Automated Payout Reconciliation' },
    ],
    features: [
      {
        title: 'PayPal & Venmo One-Touch Checkout',
        description: 'Allow customers to scan dynamic QR codes or click 1-touch mobile payment buttons without entering card details.',
        icon: '📱',
      },
      {
        title: 'Pay in 4 Installments (BNPL)',
        description: 'Increase average order value (AOV) by up to 40% with flexible interest-free installments funded upfront by PayPal.',
        icon: '💎',
      },
      {
        title: 'Automated Daily Bank Ledger Reconciliation',
        description: 'Quantix automatically matches PayPal payouts, processing fees, and refunds against your daily sales reports.',
        icon: '⚡',
      },
      {
        title: 'Instant Dispute & Chargeback Alerts',
        description: 'Real-time webhook notifications alert store managers immediately when a dispute is filed, preserving revenue.',
        icon: '🛡️',
      },
    ],
    setupSteps: [
      {
        step: '01',
        title: 'Authenticate Business Account',
        description: 'Click "Connect PayPal" in your Quantix Admin Hub and log in with your PayPal Business credentials.',
      },
      {
        step: '02',
        title: 'Enable Smart Buttons & Venmo',
        description: 'Toggle Express Checkout, Venmo QR, and Pay in 4 options for both online and in-store terminals.',
      },
      {
        step: '03',
        title: 'Automated Real-Time Ledger Sync',
        description: 'All payments and daily payouts immediately post into your Quantix Cloud Accounting dashboard.',
      },
    ],
    specs: [
      { syncSpeed: '< 50ms (Real-Time Webhooks)', dataTypes: 'Payments, Refunds, Venmo, Disputes', setupTime: 'Under 2 Minutes', security: 'PayPal Merchant Verified' },
    ],
    faqs: [
      {
        question: 'Do I get paid immediately when a customer chooses Pay in 4?',
        answer: 'Yes! You receive 100% of the transaction amount upfront minus standard processing fees, while PayPal manages buyer payments.',
      },
      {
        question: 'Does this support Venmo QR code payments at physical counters?',
        answer: 'Yes, cashiers can generate dynamic Venmo QR codes on customer-facing POS screens for instant contactless payment.',
      },
    ],
  },
  stripe: {
    slug: 'stripe',
    name: 'Stripe',
    category: 'PAYMENTS',
    logo: '/images/navbar/nav_guide_blueprint.png',
    accent: '#635BFF',
    badge: 'Enterprise Stripe Connect Partner',
    heroHeadline: 'Accept Global Card Payments & Subscriptions with Zero Friction',
    tagline: 'Connect Stripe Smart Terminals & Online Checkout directly into Quantix POS.',
    description:
      'Power your retail, restaurant, or multi-location brand with direct Stripe integration. Accept contactless credit cards, Apple Pay, Google Pay, and recurring subscriptions with real-time ledger sync.',
    stats: [
      { value: '< 30ms', label: 'Terminal Response Time' },
      { value: '99.99%', label: 'Payment Gateway Uptime' },
      { value: '135+', label: 'Supported Currencies' },
    ],
    features: [
      {
        title: 'Stripe Smart Terminal POS Sync',
        description: 'Route credit card taps, chip swipes, and contactless mobile payments straight to Quantix register tickets.',
        icon: '💳',
      },
      {
        title: 'Automated Daily Deposit Reconciliation',
        description: 'Stripe payouts are parsed and mapped into your accounting ledger with itemized processing fee deductions.',
        icon: '🏦',
      },
      {
        title: 'Apple Pay & Google Pay 1-Tap',
        description: 'Deliver friction-free checkout speed for mobile-first shoppers across web, kiosk, and counter registers.',
        icon: '🚀',
      },
      {
        title: 'PCI-DSS Tier 1 Encrypted Fraud Shield',
        description: 'Advanced Stripe Radar AI screens transactions to eliminate fraudulent chargebacks before they happen.',
        icon: '🔒',
      },
    ],
    setupSteps: [
      {
        step: '01',
        title: 'Connect Stripe Account',
        description: 'Authorize Quantix in your Stripe Dashboard with 1-click OAuth authentication.',
      },
      {
        step: '02',
        title: 'Pair Payment Readers',
        description: 'Assign Stripe Terminal IDs to specific POS registers and sync store tax rules.',
      },
      {
        step: '03',
        title: 'Go Live with Webhook Sync',
        description: 'Quantix provisions encrypted webhooks for real-time payment notification push.',
      },
    ],
    specs: [
      { syncSpeed: '< 30ms (Real-Time Webhooks)', dataTypes: 'Payments, Refunds, Payouts, Radar AI', setupTime: 'Under 2 Minutes', security: 'PCI-DSS Level 1' },
    ],
    faqs: [
      {
        question: 'Does this support physical Stripe Reader terminals?',
        answer: 'Yes! Quantix fully supports Stripe Smart Terminals including S700, BBPOS WisePOS E, and Reader M2.',
      },
    ],
  },
  'authorize-net': {
    slug: 'authorize-net',
    name: 'Authorize.Net',
    category: 'PAYMENTS',
    logo: '/images/navbar/nav_guide_blueprint.png',
    accent: '#003366',
    badge: 'Enterprise Visa Payment Gateway',
    heroHeadline: 'High-Volume Credit Card Processing & Automated Batching',
    tagline: 'Automate daily end-of-day batch settlements and secure merchant tokenization.',
    description:
      'Enterprise Visa payment gateway integration built for high-volume merchants. Automate daily batch settlements, card vaulting, and multi-location merchant ID routing with total compliance.',
    stats: [
      { value: '25+ Yrs', label: 'Trusted Merchant Gateway' },
      { value: '100%', label: 'Automated Batch Settlement' },
      { value: 'Level 3', label: 'Card Data Encryption' },
    ],
    features: [
      {
        title: 'Automated End-of-Day Batch Settlement',
        description: 'Quantix automatically triggers, verifies, and posts daily credit card batches into accounting records.',
        icon: '💳',
      },
      {
        title: 'Advanced Fraud Detection Suite (AFDS)',
        description: 'Customizable security rules, IP filters, and AVS verification protect high-ticket sales.',
        icon: '🛡️',
      },
      {
        title: 'Customer Information Manager (CIM)',
        description: 'Safely vault customer card credentials for instant repeat purchases and recurring subscriptions.',
        icon: '🔑',
      },
      {
        title: 'Multi-Location Merchant ID Routing',
        description: 'Direct transaction payouts to distinct store bank accounts based on register ID.',
        icon: '🏪',
      },
    ],
    setupSteps: [
      {
        step: '01',
        title: 'Enter Merchant API Keys',
        description: 'Paste your Authorize.Net API Login ID and Transaction Key into Quantix Payment Settings.',
      },
      {
        step: '02',
        title: 'Set Batch Closure Time',
        description: 'Define daily batch cut-off hours for automated ledger posting.',
      },
      {
        step: '03',
        title: 'Verify Live Response',
        description: 'Run a test authorization to confirm instant POS response and terminal pairing.',
      },
    ],
    specs: [
      { syncSpeed: 'Real-Time Transaction API', dataTypes: 'Card Charges, Virtual Batches, Tokens', setupTime: 'Instant Key Pair', security: 'Visa Certified' },
    ],
    faqs: [
      {
        question: 'Can I keep my current merchant merchant processor?',
        answer: 'Yes! Authorize.Net connects with virtually all major US acquiring banks while Quantix manages the POS integration.',
      },
    ],
  },
  square: {
    slug: 'square',
    name: 'Square',
    category: 'POS & INVENTORY',
    logo: '/images/navbar/nav_guide_blueprint.png',
    accent: '#006AFF',
    badge: 'Official Square Register Bridge',
    heroHeadline: 'Unify Square POS Terminals with Central Quantix Cloud Inventory',
    tagline: 'Keep your Square registers while powering your back-office with Quantix Enterprise.',
    description:
      'Bridge your existing Square terminals with Quantix Enterprise Cloud. Maintain a single unified inventory catalog, multi-store stock levels, and real-time kitchen order dispatching with zero dual-entry.',
    stats: [
      { value: '1 Catalog', label: 'Unified Multi-Store Stock' },
      { value: '0 Tablet', label: 'Clutter Elimination' },
      { value: 'Real-Time', label: 'KDS Order Printing' },
    ],
    features: [
      {
        title: 'Central Multi-Location Stock Sync',
        description: 'Sales completed on Square registers immediately update global inventory balances across all stores.',
        icon: '📦',
      },
      {
        title: 'Square Reader Bridge',
        description: 'Accept tap, swipe, and chip payments on Square devices seamlessly logged into Quantix tickets.',
        icon: '🖥️',
      },
      {
        title: 'Kitchen Display System (KDS) Direct Push',
        description: 'Square terminal orders send instant tickets to Quantix kitchen display monitors and station printers.',
        icon: '🍳',
      },
      {
        title: 'Unified Multi-Channel Analytics',
        description: 'View Square register sales alongside online, kiosk, and delivery revenue in one central dashboard.',
        icon: '📈',
      },
    ],
    setupSteps: [
      {
        step: '01',
        title: 'Log in with Square Merchant',
        description: 'Authorize Quantix access to your Square locations and item catalog.',
      },
      {
        step: '02',
        title: 'Map SKUs & Categories',
        description: 'Auto-import Square catalog items or map existing Quantix products.',
      },
      {
        step: '03',
        title: 'Start Live Bi-Directional Sync',
        description: 'Inventory and sales data immediately sync across both platforms.',
      },
    ],
    specs: [
      { syncSpeed: 'Instant Bi-Directional Webhooks', dataTypes: 'Stock Levels, Orders, Terminal Receipts', setupTime: 'OAuth Merchant Sync', security: 'Square Verified' },
    ],
    faqs: [
      {
        question: 'Do I need to replace my existing Square Stand or Terminal?',
        answer: 'No! You can keep your physical Square terminals while leveraging Quantix for enterprise back-office management.',
      },
    ],
  },
  doordash: {
    slug: 'doordash',
    name: 'DoorDash',
    category: 'DELIVERY DISPATCH',
    logo: '/images/navbar/nav_guide_blueprint.png',
    accent: '#FF3008',
    badge: 'Direct DoorDash Drive POS Partner',
    heroHeadline: 'Automate DoorDash Orders Directly Into Kitchen Printers & POS',
    tagline: 'Eliminate tablet clutter, manual re-entry errors, and item double-selling.',
    description:
      'Connect DoorDash delivery directly into Quantix POS. Orders flow straight to your kitchen displays, items 86 automatically when stock runs low, and weekly payouts reconcile with fee deductions automatically.',
    stats: [
      { value: '0 Tablet', label: 'Manual Re-Entry Required' },
      { value: '< 100ms', label: 'Kitchen Ticket Dispatch' },
      { value: '100%', label: 'Automated 86ing Sync' },
    ],
    features: [
      {
        title: 'Direct Kitchen Printer & KDS Ticket Injection',
        description: 'DoorDash orders bypass extra counter tablets and print directly to kitchen stations with customer notes.',
        icon: '🖨️',
      },
      {
        title: 'Automated 86ing & Menu Availability Sync',
        description: 'Marking an ingredient or dish out-of-stock in Quantix instantly updates your DoorDash menu status.',
        icon: '🚫',
      },
      {
        title: 'Live Dasher Driver ETA & Pickup Tracking',
        description: 'Kitchen staff see live Dasher arrival times on kitchen monitors so orders are cooked fresh upon pickup.',
        icon: '🛵',
      },
      {
        title: 'Weekly Payout & Commission Reconciliation',
        description: 'Automatically reconcile DoorDash bank payouts against sales totals and platform commission fees.',
        icon: '📊',
      },
    ],
    setupSteps: [
      {
        step: '01',
        title: 'Link DoorDash Store ID',
        description: 'Enter your DoorDash Merchant credentials in Quantix Delivery Settings.',
      },
      {
        step: '02',
        title: 'Publish Menu & Printer Routing',
        description: 'Map Quantix menu categories and assign kitchen printer station rules.',
      },
      {
        step: '03',
        title: 'Switch to Direct POS Mode',
        description: 'Turn off manual tablet entry and enjoy 100% automated kitchen printing.',
      },
    ],
    specs: [
      { syncSpeed: '< 100ms Order Injection', dataTypes: 'Orders, Menus, Dasher ETA, Payouts', setupTime: 'Direct Store Link', security: 'DoorDash Drive Certified' },
    ],
    faqs: [
      {
        question: 'Do I still need a DoorDash tablet sitting on my counter?',
        answer: 'No! DoorDash orders inject directly into your Quantix POS and kitchen display monitors.',
      },
    ],
  },
  'uber-eats': {
    slug: 'uber-eats',
    name: 'Uber Eats',
    category: 'DELIVERY DISPATCH',
    logo: '/images/navbar/nav_guide_blueprint.png',
    accent: '#06C167',
    badge: 'Direct Uber Eats Integration',
    heroHeadline: 'Streamline Uber Eats Delivery Tickets Directly to POS & KDS',
    tagline: 'Route delivery orders straight to your kitchen and manage store prep times dynamically.',
    description:
      'Integrate Uber Eats online delivery channels with Quantix. Route delivery orders straight to your kitchen, sync menu price modifiers, and manage store prep times dynamically during peak rush hours.',
    stats: [
      { value: '3X Faster', label: 'Kitchen Ticket Printing' },
      { value: '1 Central', label: 'Menu & Modifier Control' },
      { value: '0 Error', label: 'Manual Re-Entry Rate' },
    ],
    features: [
      {
        title: 'Zero Re-Entry POS Order Dispatch',
        description: 'Uber Eats orders auto-create sales tickets with correct customer notes, custom options, and delivery address.',
        icon: '🛵',
      },
      {
        title: 'Dynamic Kitchen Prep Time Adjustments',
        description: 'Adjust restaurant prep times from your Quantix POS screen to automatically delay Uber courier dispatch during rushes.',
        icon: '⏱️',
      },
      {
        title: 'Complex Menu Modifier & Combo Sync',
        description: 'Toppings, add-ons, and combo choices sync flawlessly without order confusion.',
        icon: '🍔',
      },
      {
        title: 'Consolidated Delivery Channel Analytics',
        description: 'Compare Uber Eats sales alongside DoorDash and direct takeaway orders in one reporting hub.',
        icon: '📈',
      },
    ],
    setupSteps: [
      {
        step: '01',
        title: 'Authorize Uber Eats Store',
        description: 'Connect your Uber Eats Manager account via Quantix Integration Hub.',
      },
      {
        step: '02',
        title: 'Sync Menu & Operating Hours',
        description: 'Publish your main menu categories and opening hours to Uber Eats.',
      },
      {
        step: '03',
        title: 'Activate Live Kitchen Tickets',
        description: 'Uber Eats orders begin printing automatically to kitchen displays.',
      },
    ],
    specs: [
      { syncSpeed: 'Instant Direct Webhook', dataTypes: 'Delivery Tickets, Stock 86ing, Payouts', setupTime: 'Uber Eats Merchant Sync', security: 'Uber Developer Verified' },
    ],
    faqs: [
      {
        question: 'Can I pause incoming Uber Eats orders if the restaurant gets too busy?',
        answer: 'Yes! You can pause Uber Eats orders directly from your Quantix POS screen with one tap.',
      },
    ],
  },
};

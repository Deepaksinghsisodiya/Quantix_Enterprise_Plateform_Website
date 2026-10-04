import {
  Cloud,
  Layers,
  Monitor,
  Tablet,
  Globe,
  Tv,
  Smartphone,
  CreditCard,
  Scan,
  Printer,
  RefreshCw,
  BarChart3,
  MessageSquare,
  Grid,
  Award,
  Store,
  Utensils,
  ShoppingBag,
  Coffee,
  Truck,
  Download,
  Server,
  ShieldCheck,
  Check,
  Sparkles,
  Headset,
  Zap,
  Wrench,
  BookOpen,
  Users,
  FileText,
  Calculator,
  HelpCircle,
  Activity,
  Flame,
  Briefcase,
  Newspaper,
  Star,
  Compass,
  FileSpreadsheet,
  Boxes,
  PlayCircle,
  Building2,
  Handshake,
} from 'lucide-react';
import type { NavLink, MegaMenuSectionData, MobileMenuSection, QuickMobileTool } from './navTypes';

export const RESTAURANT_SITE_URL = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
export const RETAIL_SITE_URL = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';

export const PRIMARY_LINKS: NavLink[] = [
  { label: 'Solutions', href: '/solutions', desc: 'Tailored workflows for Dining, Takeaways & Retail Stores', hasMegaMenu: true },
  { label: 'Features', href: '/features', desc: 'Complete Restaurant & Retail Cloud POS Software', hasMegaMenu: true },
  { label: 'Integrations', href: '/integrations', desc: 'Card readers, online delivery apps & accounting sync', hasMegaMenu: true },
  { label: 'Why Quantix', href: '/why-quantix', desc: 'ROI proof, enterprise comparison & customer success', hasMegaMenu: true },
  { label: 'Resources', href: '/resources', desc: 'Help guides, setup tutorials & software downloads', hasMegaMenu: true },
  { label: 'Pricing', href: '/pricing', desc: 'Affordable monthly plans with 3 Months Free trial' },
];

export const PRODUCTS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'RESTAURANT SOFTWARE',
      title: 'Restaurant POS & Kitchen Screens',
      desc: 'Table floor mapping, tableside ordering, kitchen display screens & bill splitting.',
      ctaText: 'Visit Restaurant Site',
      href: RESTAURANT_SITE_URL,
      imageSrc: '/images/nav_restaurant_bundle.png',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
    {
      badge: 'RETAIL SOFTWARE',
      title: 'Retail POS & Live Inventory',
      desc: 'Barcode scanning, offline cash register, size/color variants & low stock alerts.',
      ctaText: 'Visit Retail Site',
      href: RETAIL_SITE_URL,
      imageSrc: '/images/nav_retail_bundle.png',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-900/30 border border-emerald-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'RESTAURANT & FOODSERVICE SOFTWARE',
      items: [
        { title: 'Restaurant POS System', desc: 'Table floor plans, kitchen orders & fast billing', href: '/solutions/restaurants', icon: Utensils, iconColor: 'text-amber-500' },
      ],
    },
    {
      categoryTitle: 'RETAIL & STORE SOFTWARE',
      items: [
        { title: 'Retail POS System', desc: 'Barcode scanner checkout, variants & offline till', href: '/solutions/grocery', icon: Store, iconColor: 'text-emerald-500' },
      ],
    },
    {
      categoryTitle: 'MULTI-STORE CLOUD CONTROL',
      items: [
        { title: 'Cloud Multi-Store POS System', desc: 'Central menus, prices, stock transfers & live store sales', href: '/features/multi-store', icon: Cloud, iconColor: 'text-sky-500' },
      ],
    },
  ],
};

export const FEATURES_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'ENTERPRISE FLAGSHIP',
      title: 'Multi-Store Cloud HQ & Franchise Command',
      desc: 'Centralized cloud governance, instant catalog rollouts & automated franchise royalties.',
      ctaText: 'Explore Capability',
      href: '/features/multi-store',
      imageSrc: '/images/nav_cloud_bundle_v2.png',
      badgeColor: 'text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 border border-primary/30',
    },
  ],
  categories: [
    {
      categoryTitle: 'MULTI-STORE CLOUD HQ',
      items: [
        { title: 'Multi-Store Command', desc: 'Central menus, price tiers & royalty ledgers', href: '/features/multi-store', icon: Building2, iconColor: 'text-primary' },
        { title: 'Executive BI Telemetry', desc: 'Real-time sales velocity, labor ratios & ERP pipelines', href: '/features/executive-bi', icon: BarChart3, iconColor: 'text-amber-500' },
        { title: 'Central Supply Chain', desc: 'Manage inventory across every central warehouse', href: '/features/central-inventory', icon: Boxes, iconColor: 'text-sky-500' },
      ],
    },
    {
      categoryTitle: 'STOREFRONT & CHECKOUT',
      items: [
        { title: 'Branch Cloud POS', desc: 'One POS system for every branch location with offline mesh', href: '/features/cloud-pos', icon: Store, iconColor: 'text-orange-500' },
        { title: 'Smart Inventory', desc: 'Recipe costing down to the gram & automated par orders', href: '/features/smart-inventory', icon: Boxes, iconColor: 'text-emerald-500' },
        { title: 'Offline Registers', desc: 'Continuous standalone billing & local thermal receipt printing', href: '/features/offline-registers', icon: Zap, iconColor: 'text-teal-500' },
      ],
    },
    {
      categoryTitle: 'HOSPITALITY & DINING',
      items: [
        { title: 'Kitchen Display (KDS)', desc: 'Multi-station routing, cook timers & course pacing', href: '/features/kitchen-display', icon: Tv, iconColor: 'text-amber-500' },
        { title: 'Table Management', desc: 'Interactive floor layouts, table timers & split checks', href: '/features/table-management', icon: Utensils, iconColor: 'text-orange-500' },
        { title: 'Tableside QR Ordering', desc: 'Contactless digital menus & browser self-pay at table', href: '/features/qr-code-ordering', icon: Smartphone, iconColor: 'text-rose-500' },
      ],
    },
  ],
};

export const SOLUTIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'FEATURED SECTORS',
      title: 'Multi-Unit Enterprise Solutions',
      desc: 'Unified cloud management for restaurant chains, retail franchises, and hybrid dining concepts.',
      ctaText: 'Explore Solutions',
      href: '/solutions',
      imageSrc: '/images/nav_restaurant_bundle.png',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'FOODSERVICE & HOSPITALITY',
      items: [
        { title: 'Dine-In Restaurants', desc: 'Floor plans, table orders & bill split', href: '/solutions/restaurants', icon: Utensils, iconColor: 'text-amber-500' },
        { title: 'Cafes & Bakeries', desc: 'Fast modifiers, hot drinks & combos', href: '/solutions/cafes', icon: Coffee, iconColor: 'text-orange-500' },
        { title: 'Bars & Nightclubs', desc: 'Quick bar tabs, drink reorders & tips', href: '/solutions/bars', icon: Flame, iconColor: 'text-purple-500' },
      ],
    },
    {
      categoryTitle: 'RETAIL & COMMERCE',
      items: [
        { title: 'Boutiques & Apparel', desc: 'Variants, barcode tags & returns', href: '/solutions/apparel', icon: ShoppingBag, iconColor: 'text-pink-500' },
        { title: 'Convenience & Grocery', desc: 'Weight scales, barcode scans & fast till', href: '/solutions/grocery', icon: Store, iconColor: 'text-emerald-500' },
        { title: 'Vape & Smoke Shops', desc: 'Age checks, serial numbers & high-SKU', href: '/solutions/smoke-shops', icon: Layers, iconColor: 'text-blue-500' },
      ],
    },
  ],
};

export const INTEGRATIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'CONNECTED APPS',
      title: 'Enterprise Integrations Hub',
      desc: 'Link fleet card terminals, ERP accounting ledgers, and delivery marketplaces automatically.',
      ctaText: 'Explore All Integrations',
      href: '/integrations',
      imageSrc: '/images/nav_payment_bundle.png',
      badgeColor: 'text-primary dark:text-primary-light bg-primary/10 border border-primary/20',
    },
  ],
  categories: [
    {
      categoryTitle: 'PAYMENT PROCESSORS',
      items: [
        { title: 'Stripe Enterprise', desc: 'Fleet terminals, P2PE tokenization & multi-currency', href: '/integrations/stripe', icon: CreditCard, iconColor: 'text-indigo-500' },
        { title: 'Authorize.Net Vault', desc: 'High-volume merchant gateway & fraud suites', href: '/integrations/authorize-net', icon: ShieldCheck, iconColor: 'text-blue-600' },
        { title: 'Square Register Fleet', desc: 'Multi-unit terminal pairing & offline resilience', href: '/integrations/square', icon: Smartphone, iconColor: 'text-slate-700 dark:text-slate-300' },
      ],
    },
    {
      categoryTitle: 'DELIVERY MARKETPLACES',
      items: [
        { title: 'DoorDash Drive', desc: 'Direct kitchen routing & courier dispatching', href: '/integrations/doordash', icon: Truck, iconColor: 'text-rose-500' },
        { title: 'Uber Eats Enterprise', desc: 'Multi-location automated order injection & delivery sync', href: '/integrations/uber-eats', icon: Truck, iconColor: 'text-emerald-500' },
      ],
    },
  ],
};

export const WHY_QUANTIX_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'ENTERPRISE PROOF',
      title: 'Why Modern Chains Choose Quantix',
      desc: 'Discover how multi-location operators eliminate hardware lock-in, achieve high availability, and increase table turns by 38%.',
      ctaText: 'Calculate Your ROI',
      href: '/roi-calculator',
      imageSrc: '/images/ent_bi_analytics_bundle_v2.png',
      badgeColor: 'text-primary dark:text-primary-light bg-primary/10 border border-primary/20',
    },
  ],
  categories: [
    {
      categoryTitle: 'COMPARE & EVALUATE',
      items: [
        { title: 'Enterprise vs Standalone', desc: 'Multi-store cloud HQ vs single isolated till', href: '/enterprise-vs-standalone', icon: Building2, iconColor: 'text-blue-500' },
        { title: 'ROI Savings Calculator', desc: 'Calculate your annual processing & hardware savings', href: '/roi-calculator', icon: Calculator, iconColor: 'text-amber-500' },
      ],
    },
    {
      categoryTitle: 'PROVEN ADVANTAGES',
      items: [
        { title: 'Enterprise POS Guide', desc: 'Detailed architectural roadmap for multi-store brands', href: '/resources/pos-guide', icon: BookOpen, iconColor: 'text-emerald-500' },
        { title: 'Customer Testimonials', desc: 'Read authentic experiences from active POS operators', href: '/testimonials', icon: Star, iconColor: 'text-orange-500' },
      ],
    },
  ],
};

export const RESOURCES_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'OFFICIAL SUPPORT',
      title: 'Help Center & Setup Guides',
      desc: 'Step-by-step documentation, terminal unboxing, printer pairing, and operational guides.',
      ctaText: 'Explore Help Center',
      href: '/help',
      imageSrc: '/images/nav_cloud_bundle_v2.png',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'LEARN & READ',
      items: [
        { title: 'Enterprise POS Guide', desc: 'Setup documentation and multi-store workflows', href: '/resources/pos-guide', icon: FileText, iconColor: 'text-amber-500' },
        { title: 'Blog & Insights', desc: 'Latest retail trends, POS guides & tips', href: '/blog', icon: Newspaper, iconColor: 'text-indigo-500' },
        { title: 'Help Center', desc: 'Setup guides, troubleshooting & FAQs', href: '/help', icon: HelpCircle, iconColor: 'text-blue-500' },
        { title: 'Getting Started Guide', desc: '5-step terminal onboarding & configuration', href: '/help/getting-started', icon: BookOpen, iconColor: 'text-emerald-500' },
      ],
    },
    {
      categoryTitle: 'TOOLS & SUPPORT',
      items: [
        { title: 'ROI Calculator', desc: 'Estimate business savings and hardware cost reductions', href: '/roi-calculator', icon: Calculator, iconColor: 'text-purple-500' },
        { title: '24/7 Priority Support', desc: 'Talk to our dedicated POS engineering team', href: '/contact', icon: Headset, iconColor: 'text-cyan-500' },
      ],
    },
  ],
};

export const MOBILE_MENU_SECTIONS: MobileMenuSection[] = [
  {
    ...PRIMARY_LINKS[0],
    icon: Sparkles,
    imageSrc: '/images/nav_restaurant_bundle.png',
    badge: 'PLATFORM SOLUTIONS',
    promoCards: PRODUCTS_MEGA_CONFIG.promoCards,
    groups: PRODUCTS_MEGA_CONFIG.categories.map((c) => ({
      title: c.categoryTitle,
      items: c.items,
    })),
  },
  {
    ...PRIMARY_LINKS[1],
    icon: Layers,
    imageSrc: '/images/nav_cloud_bundle_v2.png',
    badge: 'ENTERPRISE FEATURES',
    promoCards: FEATURES_MEGA_CONFIG.promoCards || (FEATURES_MEGA_CONFIG.promoCard ? [FEATURES_MEGA_CONFIG.promoCard] : undefined),
    groups: FEATURES_MEGA_CONFIG.categories.map((c) => ({
      title: c.categoryTitle,
      items: c.items,
    })),
  },
  {
    ...PRIMARY_LINKS[2],
    icon: RefreshCw,
    imageSrc: '/images/nav_payment_bundle.png',
    badge: 'PAYMENTS & APPS',
    promoCards: INTEGRATIONS_MEGA_CONFIG.promoCards || (INTEGRATIONS_MEGA_CONFIG.promoCard ? [INTEGRATIONS_MEGA_CONFIG.promoCard] : undefined),
    groups: INTEGRATIONS_MEGA_CONFIG.categories.map((c) => ({
      title: c.categoryTitle,
      items: c.items,
    })),
  },
  {
    ...PRIMARY_LINKS[3],
    icon: Star,
    imageSrc: '/images/ent_bi_analytics_bundle_v2.png',
    badge: 'WHY QUANTIX',
    promoCards: WHY_QUANTIX_MEGA_CONFIG.promoCards || (WHY_QUANTIX_MEGA_CONFIG.promoCard ? [WHY_QUANTIX_MEGA_CONFIG.promoCard] : undefined),
    groups: WHY_QUANTIX_MEGA_CONFIG.categories.map((c) => ({
      title: c.categoryTitle,
      items: c.items,
    })),
  },
  {
    ...PRIMARY_LINKS[4],
    icon: BookOpen,
    imageSrc: '/images/nav_cloud_bundle_v2.png',
    badge: 'GUIDES & DOWNLOADS',
    promoCards: RESOURCES_MEGA_CONFIG.promoCards || (RESOURCES_MEGA_CONFIG.promoCard ? [RESOURCES_MEGA_CONFIG.promoCard] : undefined),
    groups: RESOURCES_MEGA_CONFIG.categories.map((c) => ({
      title: c.categoryTitle,
      items: c.items,
    })),
  },
];

export const QUICK_MOBILE_TOOLS: QuickMobileTool[] = [
  { label: 'ROI Calculator', href: '/roi-calculator', icon: Calculator },
  { label: 'Why Quantix', href: '/why-quantix', icon: Star },
  { label: 'Help Center', href: '/help', icon: HelpCircle },
  { label: 'Pricing', href: '/pricing', icon: Sparkles },
];

/**
 * Determines whether a primary top-level navigation link is currently active based on pathname.
 */
export const isPrimaryLinkActive = (link: { label: string; href: string }, pathname: string): boolean => {
  if (!pathname) return false;

  // Direct match or child route match of link.href
  if (pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`))) {
    return true;
  }

  // Why Quantix routes
  if (link.label === 'Why Quantix') {
    const whyQuantixRoutes = [
      '/why-quantix',
      '/enterprise-vs-standalone',
      '/roi-calculator',
      '/case-studies',
      '/testimonials',
    ];
    return whyQuantixRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  }

  // Resources routes
  if (link.label === 'Resources') {
    const resourcesRoutes = [
      '/resources',
      '/help',
      '/downloads',
      '/blog',
    ];
    return resourcesRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  }

  // Solutions routes
  if (link.label === 'Solutions') {
    return pathname === '/solutions' || pathname.startsWith('/solutions/');
  }

  // Features routes
  if (link.label === 'Features') {
    return (
      pathname === '/features' ||
      pathname.startsWith('/features/')
    );
  }

  // Integrations routes
  if (link.label === 'Integrations') {
    return pathname === '/integrations' || pathname.startsWith('/integrations/');
  }

  return false;
};

/**
 * Finds the single most specific active item href from a list of navigation items.
 * Prevents multiple items (e.g. /help and /help/getting-started) from showing active at the same time.
 */
export const getActiveMenuHref = (
  items: Array<{ href: string }>,
  pathname: string
): string | null => {
  if (!pathname || !items || items.length === 0) return null;

  // 1. Exact match has highest priority
  const exact = items.find((item) => item.href === pathname);
  if (exact) return exact.href;

  // 2. Longest prefix match if not an exact match
  const prefixMatches = items
    .filter((item) => item.href !== '/' && item.href !== '#' && pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length);

  return prefixMatches.length > 0 ? prefixMatches[0].href : null;
};


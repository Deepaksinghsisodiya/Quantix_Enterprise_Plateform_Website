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

export const FEATURES_MEGA_CONFIG: MegaMenuSectionData = PRODUCTS_MEGA_CONFIG;

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
      title: 'Why 50,000+ Chains Choose Quantix',
      desc: 'Discover how multi-location operators eliminate hardware lock-in, achieve 99.99% uptime, and increase table turns by 38%.',
      ctaText: 'Calculate Your ROI',
      href: '/roi-calculator',
      imageSrc: '/images/ent_bi_analytics_bundle.png',
      badgeColor: 'text-primary dark:text-primary-light bg-primary/10 border border-primary/20',
    },
  ],
  categories: [
    {
      categoryTitle: 'COMPARE & EVALUATE',
      items: [
        { title: 'Enterprise vs Standalone', desc: 'Multi-store cloud HQ vs single isolated till', href: '/enterprise-vs-standalone', icon: Building2, iconColor: 'text-blue-500' },
        { title: 'Competitor Comparisons', desc: 'Why leading brands switch from Toast, Square & Clover', href: '/compare', icon: FileSpreadsheet, iconColor: 'text-purple-500' },
        { title: 'ROI Savings Calculator', desc: 'Calculate your annual processing & hardware savings', href: '/roi-calculator', icon: Calculator, iconColor: 'text-amber-500' },
      ],
    },
    {
      categoryTitle: 'PROVEN SUCCESS & REVIEWS',
      items: [
        { title: 'Case Studies & ROI Stories', desc: 'Real quantifiable metrics from multi-unit operators', href: '/case-studies', icon: BarChart3, iconColor: 'text-emerald-500' },
        { title: 'Customer Testimonials', desc: 'Read authentic reviews from enterprise founders & GMs', href: '/testimonials', icon: Star, iconColor: 'text-orange-500' },
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
      imageSrc: '/images/nav_cloud_bundle.png',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'LEARN & READ',
      items: [
        { title: 'Blog & Insights', desc: 'Latest retail trends, POS guides & tips', href: '/blog', icon: Newspaper, iconColor: 'text-indigo-500' },
        { title: 'Help Center', desc: 'Setup guides, troubleshooting & FAQs', href: '/help', icon: HelpCircle, iconColor: 'text-blue-500' },
        { title: 'Getting Started Guide', desc: '5-step terminal onboarding & configuration', href: '/help/getting-started', icon: BookOpen, iconColor: 'text-emerald-500' },
      ],
    },
    {
      categoryTitle: 'TOOLS & DOWNLOADS',
      items: [
        { title: 'Software Downloads', desc: 'Windows .exe, Linux .deb & Android APK binaries', href: '/downloads', icon: Download, iconColor: 'text-purple-500' },
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
    groups: [
      {
        title: 'PLATFORM SYSTEMS',
        items: [
          { title: 'Restaurant POS System', desc: 'Table floor plans & kitchen billing', href: '/solutions/restaurants', icon: Utensils },
          { title: 'Retail Register', desc: 'Barcode scanner & cash drawer', href: '/solutions/grocery', icon: Store },
          { title: 'Cloud Multi-Store HQ', desc: 'Manage menus & multi-store sales', href: '/features/multi-store', icon: Cloud },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[1],
    icon: Layers,
    imageSrc: '/images/ent_global_pos_bundle.png',
    badge: 'ENTERPRISE FEATURES',
    groups: [
      {
        title: 'BY BUSINESS TYPE',
        items: [
          { title: 'Dine-In Restaurants', desc: 'Table floor plan & billing', href: '/solutions/restaurants', icon: Utensils },
          { title: 'Boutiques & Apparel', desc: 'Variants & barcode tags', href: '/solutions/apparel', icon: ShoppingBag },
          { title: 'Cafes & Bakeries', desc: 'Modifiers, drinks & combos', href: '/solutions/cafes', icon: Coffee },
          { title: 'Convenience & Grocery', desc: 'Weight scales & fast till', href: '/solutions/grocery', icon: Store },
          { title: 'Bars & Nightclubs', desc: 'Bar tabs & quick reorders', href: '/solutions/bars', icon: Flame },
          { title: 'Vape & Smoke Shops', desc: 'Age checks & SKU catalogs', href: '/solutions/smoke-shops', icon: Layers },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[2],
    icon: RefreshCw,
    imageSrc: '/images/nav_payment_bundle.png',
    badge: 'PAYMENTS & APPS',
    groups: [
      {
        title: 'INTEGRATIONS',
        items: [
          { title: 'Stripe Enterprise', desc: 'Fleet terminals & tokenization', href: '/integrations/stripe', icon: CreditCard },
          { title: 'Authorize.Net Vault', desc: 'High-volume merchant gateway', href: '/integrations/authorize-net', icon: ShieldCheck },
          { title: 'Square Register Fleet', desc: 'Terminal pairing & offline', href: '/integrations/square', icon: Smartphone },
          { title: 'DoorDash Drive', desc: 'Online delivery app sync', href: '/integrations/doordash', icon: Truck },
          { title: 'Uber Eats Enterprise', desc: 'Automated order injection', href: '/integrations/uber-eats', icon: Truck },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[3],
    icon: Star,
    imageSrc: '/images/ent_bi_analytics_bundle.png',
    badge: 'WHY QUANTIX',
    groups: [
      {
        title: 'ROI & EVALUATION',
        items: [
          { title: 'Enterprise vs Standalone', desc: 'Multi-store vs single till', href: '/enterprise-vs-standalone', icon: Building2 },
          { title: 'Competitor Comparisons', desc: 'Why switch from Toast/Square', href: '/compare', icon: FileSpreadsheet },
          { title: 'ROI Savings Calculator', desc: 'Calculate annual savings', href: '/roi-calculator', icon: Calculator },
          { title: 'Case Studies & Stories', desc: 'Real customer ROI results', href: '/case-studies', icon: BarChart3 },
          { title: 'Customer Testimonials', desc: 'Operator reviews & ratings', href: '/testimonials', icon: Star },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[4],
    icon: BookOpen,
    imageSrc: '/images/nav_cloud_bundle.png',
    badge: 'GUIDES & DOWNLOADS',
    groups: [
      {
        title: 'LEARNING & SUPPORT',
        items: [
          { title: 'Help & Knowledge Center', desc: 'Setup tutorials & guides', href: '/help', icon: HelpCircle },
          { title: 'Software Downloads', desc: 'Windows & Android binaries', href: '/downloads', icon: Download },
          { title: '24/7 Priority Support', desc: 'Speak to a POS engineer', href: '/contact', icon: Headset },
        ],
      },
    ],
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
      '/compare',
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
      '/contact',
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
      pathname.startsWith('/features/') ||
      pathname === '/products' ||
      pathname.startsWith('/products/')
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


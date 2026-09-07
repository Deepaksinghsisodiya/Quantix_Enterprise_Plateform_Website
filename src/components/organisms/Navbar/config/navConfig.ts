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
  { label: 'Solutions', href: '/products', desc: 'Complete Restaurant & Retail Cloud POS Software', hasMegaMenu: true },
  { label: 'Features', href: '/solutions', desc: 'Tailored workflows for Dining, Takeaways & Retail Stores', hasMegaMenu: true },
  { label: 'Integrations', href: '/integrations', desc: 'Card readers, online delivery apps & accounting sync', hasMegaMenu: true },
  { label: 'Pricing', href: '/pricing', desc: 'Affordable monthly plans with 3 Months Free trial' },
  { label: 'Resources', href: '/resources', desc: 'Help guides, ROI calculator & setup tutorials', hasMegaMenu: true },
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
        { title: 'Restaurant POS System', desc: 'Table floor plans, kitchen orders & fast billing', href: '/products/restaurant-pos', icon: Utensils, iconColor: 'text-amber-500' },
      ],
    },
    {
      categoryTitle: 'RETAIL & STORE SOFTWARE',
      items: [
        { title: 'Retail POS System', desc: 'Barcode scanner checkout, variants & offline till', href: '/products/retail-pos', icon: Store, iconColor: 'text-emerald-500' },
      ],
    },
    {
      categoryTitle: 'MULTI-STORE CLOUD CONTROL',
      items: [
        { title: 'Cloud Multi-Store POS System', desc: 'Central menus, prices, stock transfers & live store sales', href: '/products/cloud-pos', icon: Cloud, iconColor: 'text-sky-500' },
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

export const RESOURCES_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'FEATURED GUIDE',
      title: '2026 POS Buying & Setup Guide',
      desc: 'A complete step-by-step checklist on choosing the right hardware, reducing fees, and training cashiers.',
      ctaText: 'Read Free POS Guide',
      href: '/resources/pos-guide',
      imageSrc: '/images/nav_cloud_bundle.png',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'TOOLS & CALCULATORS',
      items: [
        { title: 'POS Savings ROI Calculator', desc: 'Calculate how much you save on card fees & labor', href: '/roi-calculator', icon: Calculator, iconColor: 'text-emerald-500' },
        { title: 'Help & Knowledge Center', desc: 'Step-by-step setup tutorials & hardware guides', href: '/help', icon: HelpCircle, iconColor: 'text-blue-500' },
        { title: 'POS System Comparison', desc: 'See how Quantix compares to traditional systems', href: '/compare', icon: FileSpreadsheet, iconColor: 'text-purple-500' },
      ],
    },
    {
      categoryTitle: 'SUPPORT & STORIES',
      items: [
        { title: 'Customer Stories', desc: 'Read how multi-unit businesses scale with Quantix', href: '/testimonials', icon: Users, iconColor: 'text-amber-500' },
        { title: 'Live Hardware Diagnostics', desc: 'Test printers, card readers & scanners online', href: '/status', icon: Activity, iconColor: 'text-cyan-500' },
        { title: '24/7 Priority Support', desc: 'Speak to a dedicated POS engineer anytime', href: '/contact', icon: Headset, iconColor: 'text-rose-500' },
      ],
    },
  ],
};

export const MOBILE_MENU_SECTIONS: MobileMenuSection[] = [
  {
    ...PRIMARY_LINKS[0],
    icon: Sparkles,
    imageSrc: '/images/nav_restaurant_bundle.png',
    badge: 'CORE POS SUITE',
    groups: [
      {
        title: 'SOFTWARE CAPABILITIES',
        items: [
          { title: 'Restaurant POS System', desc: 'Table floor plans & kitchen billing', href: '/products/restaurant-pos', icon: Utensils },
          { title: 'Retail Register', desc: 'Barcode scanner & cash drawer', href: '/products/retail-pos', icon: Store },
          { title: 'Cloud Multi-Store HQ', desc: 'Manage menus & multi-store sales', href: '/products/cloud-pos', icon: Cloud },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[1],
    icon: Layers,
    imageSrc: '/images/ent_global_pos_bundle.png',
    badge: 'INDUSTRY SOLUTIONS',
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
    ...PRIMARY_LINKS[4],
    icon: BookOpen,
    imageSrc: '/images/nav_cloud_bundle.png',
    badge: 'GUIDES & SUPPORT',
    groups: [
      {
        title: 'TOOLS & SUPPORT',
        items: [
          { title: 'ROI Savings Calculator', desc: 'Calculate monthly savings', href: '/roi-calculator', icon: Calculator },
          { title: 'Help & Knowledge Center', desc: 'Setup tutorials & guides', href: '/help', icon: HelpCircle },
          { title: 'POS System Comparison', desc: 'Side-by-side feature matrix', href: '/compare', icon: FileSpreadsheet },
          { title: 'Customer Stories', desc: 'Real customer case studies', href: '/testimonials', icon: Users },
          { title: 'Live Hardware Diagnostics', desc: 'Test scanners & printers online', href: '/status', icon: Activity },
          { title: '24/7 Priority Support', desc: 'Speak to a POS engineer', href: '/contact', icon: Headset },
        ],
      },
    ],
  },
];

export const QUICK_MOBILE_TOOLS: QuickMobileTool[] = [
  { label: 'ROI Calculator', href: '/roi-calculator', icon: Calculator },
  { label: 'Help Center', href: '/help', icon: HelpCircle },
  { label: 'Pricing', href: '/pricing', icon: Sparkles },
  { label: 'Contact Us', href: '/contact', icon: Headset },
];

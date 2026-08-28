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
  { label: 'Products', href: '/products', desc: 'Complete Restaurant & Retail Cloud POS Software', hasMegaMenu: true },
  { label: 'Solutions', href: '/solutions', desc: 'Tailored workflows for Dining, Takeaways & Retail Stores', hasMegaMenu: true },
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
      ctaText: 'Explore Restaurant POS',
      href: '/products/restaurant-pos',
      imageSrc: '/images/nav_restaurant_bundle.png',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
    {
      badge: 'RETAIL SOFTWARE',
      title: 'Retail Register & Live Stock',
      desc: 'Barcode scanning, offline cash register, size/color variants & low stock alerts.',
      ctaText: 'Explore Retail Register',
      href: '/products/retail-pos',
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
        { title: 'Retail Register', desc: 'Barcode scanner checkout & offline cash drawer', href: '/products/retail-pos', icon: Store, iconColor: 'text-emerald-500' },
      ],
    },
    {
      categoryTitle: 'MULTI-STORE CLOUD CONTROL',
      items: [
        { title: 'Cloud Multi-Store HQ', desc: 'Manage menus, prices & see live sales across all stores', href: '/products/cloud-pos', icon: Cloud, iconColor: 'text-sky-500' },
      ],
    },
  ],
};

export const SOLUTIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'RESTAURANT SECTORS',
      title: 'Dining & Foodservice POS',
      desc: 'Floor plans, kitchen routing & split bills for restaurants, cafes, bars & food trucks.',
      ctaText: 'Explore Foodservice POS',
      href: '/solutions',
      imageSrc: '/images/nav_restaurant_bundle.png',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
    {
      badge: 'RETAIL SECTORS',
      title: 'Retail Store POS Solutions',
      desc: 'Barcode checkout, SKU inventory & offline drawer for boutiques, groceries & vape shops.',
      ctaText: 'Explore Retail POS',
      href: '/solutions',
      imageSrc: '/images/nav_retail_bundle.png',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-900/30 border border-emerald-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'BY BUSINESS TYPE',
      items: [
        { title: 'Dine-In Restaurants', desc: 'Floor plans, table orders & bill split', href: '/solutions', icon: Utensils, iconColor: 'text-amber-500' },
        { title: 'Boutiques & Apparel', desc: 'Variants, barcode tags & returns', href: '/solutions', icon: ShoppingBag, iconColor: 'text-pink-500' },
        { title: 'Cafes & Bakeries', desc: 'Fast modifiers, hot drinks & combos', href: '/solutions', icon: Coffee, iconColor: 'text-orange-500' },
        { title: 'Convenience & Grocery', desc: 'Weight scales, barcode scans & fast till', href: '/solutions', icon: Store, iconColor: 'text-emerald-500' },
        { title: 'Bars & Nightclubs', desc: 'Quick bar tabs, drink reorders & tips', href: '/solutions', icon: Flame, iconColor: 'text-purple-500' },
        { title: 'Vape & Smoke Shops', desc: 'Age checks, serial numbers & high-SKU', href: '/solutions', icon: Layers, iconColor: 'text-blue-500' },
      ],
    },
  ],
};

export const INTEGRATIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'TOP INTEGRATION',
      title: 'QuickBooks & Xero Accounting Sync',
      desc: 'Automatically sync daily sales, sales taxes, tips, and inventory costs to your ledger with zero manual data entry.',
      ctaText: 'Explore Accounting Sync',
      href: '/integrations',
      imageSrc: '/images/nav_payment_bundle.png',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-900/30 border border-emerald-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'COMPATIBLE PLATFORMS & HARDWARE',
      items: [
        { title: 'Payment Card Readers', desc: 'Tap, chip & Apple Pay with Stripe, Square & Clover', href: '/integrations', icon: CreditCard, iconColor: 'text-blue-500' },
        { title: 'QuickBooks Online', desc: 'Automatic daily sales, tax & payroll bookkeeping sync', href: '/integrations', icon: Calculator, iconColor: 'text-emerald-500' },
        { title: 'DoorDash & UberEats', desc: 'Online food orders print straight to your kitchen', href: '/integrations', icon: Truck, iconColor: 'text-red-500' },
        { title: 'Xero Accounting', desc: 'Live bank feeds & automatic profit/loss sync', href: '/integrations', icon: RefreshCw, iconColor: 'text-sky-500' },
        { title: 'Barcode Scanners & Scales', desc: 'Plug-and-play USB & Bluetooth hardware devices', href: '/integrations', icon: Scan, iconColor: 'text-purple-500' },
        { title: 'Receipt & Kitchen Printers', desc: 'Epson & Star Micronics thermal & KDS network printers', href: '/integrations', icon: Printer, iconColor: 'text-amber-500' },
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
      categoryTitle: 'TOOLS, GUIDES & SUPPORT',
      items: [
        { title: 'POS Savings ROI Calculator', desc: 'Calculate how much you save on card fees & labor', href: '/resources/roi-calculator', icon: Calculator, iconColor: 'text-emerald-500' },
        { title: 'Help & Knowledge Center', desc: 'Step-by-step setup tutorials & hardware guides', href: '/resources/help-center', icon: HelpCircle, iconColor: 'text-blue-500' },
        { title: 'POS System Comparison', desc: 'See how Quantix compares to traditional systems', href: '/resources/compare', icon: FileSpreadsheet, iconColor: 'text-purple-500' },
        { title: 'Customer Stories', desc: 'Read how multi-unit businesses scale with Quantix', href: '/resources/case-studies', icon: Users, iconColor: 'text-amber-500' },
        { title: 'Live Hardware Diagnostics', desc: 'Test printers, card readers & scanners online', href: '/resources/system-status', icon: Activity, iconColor: 'text-cyan-500' },
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
          { title: 'Dine-In Restaurants', desc: 'Table floor plan & billing', href: '/solutions', icon: Utensils },
          { title: 'Boutiques & Apparel', desc: 'Variants & barcode tags', href: '/solutions', icon: ShoppingBag },
          { title: 'Cafes & Bakeries', desc: 'Modifiers, drinks & combos', href: '/solutions', icon: Coffee },
          { title: 'Convenience & Grocery', desc: 'Weight scales & fast till', href: '/solutions', icon: Store },
          { title: 'Bars & Nightclubs', desc: 'Bar tabs & quick reorders', href: '/solutions', icon: Flame },
          { title: 'Vape & Smoke Shops', desc: 'Age checks & SKU catalogs', href: '/solutions', icon: Layers },
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
          { title: 'Payment Card Readers', desc: 'Stripe, Square & Clover readers', href: '/integrations', icon: CreditCard },
          { title: 'QuickBooks Online', desc: 'Auto bookkeeping sync', href: '/integrations', icon: Calculator },
          { title: 'DoorDash & UberEats', desc: 'Online delivery app sync', href: '/integrations', icon: Truck },
          { title: 'Xero Accounting', desc: 'Profit & loss ledger sync', href: '/integrations', icon: RefreshCw },
          { title: 'Barcode Scanners & Scales', desc: 'Hardware peripheral bridge', href: '/integrations', icon: Scan },
          { title: 'Receipt & Kitchen Printers', desc: 'Star & Epson thermal printers', href: '/integrations', icon: Printer },
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
          { title: 'ROI Savings Calculator', desc: 'Calculate monthly savings', href: '/resources/roi-calculator', icon: Calculator },
          { title: 'Help & Knowledge Center', desc: 'Setup tutorials & guides', href: '/resources/help-center', icon: HelpCircle },
          { title: 'POS System Comparison', desc: 'Side-by-side feature matrix', href: '/resources/compare', icon: FileSpreadsheet },
          { title: 'Customer Stories', desc: 'Real customer case studies', href: '/resources/case-studies', icon: Users },
          { title: 'Live Hardware Diagnostics', desc: 'Test scanners & printers online', href: '/resources/system-status', icon: Activity },
          { title: '24/7 Priority Support', desc: 'Speak to a POS engineer', href: '/contact', icon: Headset },
        ],
      },
    ],
  },
];

export const QUICK_MOBILE_TOOLS: QuickMobileTool[] = [
  { label: 'ROI Calculator', href: '/resources/roi-calculator', icon: Calculator },
  { label: 'Help Center', href: '/resources/help-center', icon: HelpCircle },
  { label: 'Pricing', href: '/pricing', icon: Sparkles },
  { label: 'Contact Us', href: '/contact', icon: Headset },
];

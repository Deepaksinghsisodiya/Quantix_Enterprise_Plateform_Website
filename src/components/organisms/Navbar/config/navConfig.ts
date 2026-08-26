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
} from 'lucide-react';
import type { NavLink, MegaMenuSectionData, MobileMenuSection, QuickMobileTool } from './navTypes';

export const RESTAURANT_SITE_URL = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
export const RETAIL_SITE_URL = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';

export const PRIMARY_LINKS: NavLink[] = [
  { label: 'Products', href: '/products', desc: 'Unified Restaurant & Retail POS Platforms', hasMegaMenu: true },
  { label: 'Solutions', href: '/solutions', desc: 'Industry-tailored solutions for Dining & Retail', hasMegaMenu: true },
  { label: 'Integrations', href: '/integrations', desc: 'Payment terminals, online delivery & app sync', hasMegaMenu: true },
  { label: 'Pricing', href: '/pricing', desc: 'Flexible plans for Restaurant & Retail chains' },
  { label: 'Resources', href: '/resources', desc: 'Help guides, playbooks & company mission', hasMegaMenu: true },
];

export const PRODUCTS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'RESTAURANT PLATFORM',
      title: 'Restaurant POS System',
      desc: 'Tableside ordering, floor maps, KDS routing & split check payments.',
      ctaText: 'Launch Restaurant POS',
      href: '/products/restaurant-pos',
      imageSrc: '/images/nav_restaurant_bundle.png',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
    {
      badge: 'RETAIL PLATFORM',
      title: 'Retail Register',
      desc: 'Barcode checkout, cashier permissions, inventory matrix & offline till.',
      ctaText: 'Launch Retail Register',
      href: '/products/retail-pos',
      imageSrc: '/images/nav_retail_bundle.png',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-900/30 border border-emerald-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'CORE POS TERMINALS & PLATFORMS',
      items: [
        { title: 'Restaurant POS', desc: 'Tableside orders & kitchen KDS', href: '/products/restaurant-pos', icon: Utensils, iconColor: 'text-amber-500' },
        { title: 'Retail Register', desc: 'Barcode billing & offline till', href: '/products/retail-pos', icon: Store, iconColor: 'text-emerald-500' },
      ],
    },
  ],
};

export const SOLUTIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'FOODSERVICE SOLUTION',
      title: 'Fine Dining & Quick Service',
      desc: 'Interactive floor mapping, course pacing, 15-sec counter checkout & KDS.',
      ctaText: 'Explore Foodservice Solutions',
      href: '/solutions',
      imageSrc: '/images/foodhub_bundle_mockup.png',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
    {
      badge: 'RETAIL SOLUTION',
      title: 'Boutiques, Grocery & Multi-Store',
      desc: 'Barcode scale, size/color variant matrix, cashier floats & central push.',
      ctaText: 'Explore Retail Solutions',
      href: '/solutions',
      imageSrc: '/images/nav_retail_bundle.png',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-900/30 border border-emerald-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'RESTAURANT & DINING SECTORS',
      items: [
        { title: 'Fine Dining & Full Service', desc: 'Course pacing & table floor map', href: '/solutions/fine-dining', icon: Utensils, iconColor: 'text-amber-500' },
        { title: 'Quick Service (QSR)', desc: '15-second counter billing & KDS', href: '/solutions/quick-service', icon: Zap, iconColor: 'text-yellow-500' },
        { title: 'Fast Casual Restaurants', desc: 'Counter order with table delivery', href: '/solutions/fast-casual', icon: Layers, iconColor: 'text-blue-500' },
        { title: 'Cafes & Bakeries', desc: 'Drink modifiers & batch costing', href: '/solutions/cafe-bakery', icon: Coffee, iconColor: 'text-amber-700' },
      ],
    },
    {
      categoryTitle: 'RETAIL & STORE SECTORS',
      items: [
        { title: 'Fashion & Apparel Boutiques', desc: 'Size/color matrix & boutique stock', href: '/solutions/fashion-retail', icon: ShoppingBag, iconColor: 'text-pink-500' },
        { title: 'Grocery & Supermarkets', desc: 'Barcode scale & perishable alerts', href: '/solutions/grocery', icon: Store, iconColor: 'text-emerald-500' },
        { title: 'Electronics & Tech Retail', desc: 'Serial number sync & warranty', href: '/solutions/electronics', icon: Monitor, iconColor: 'text-sky-500' },
        { title: 'Multi-Store Franchise Chains', desc: 'Central catalog push & multi-branch', href: '/solutions/franchise', icon: Server, iconColor: 'text-purple-500' },
      ],
    },
  ],
};

export const INTEGRATIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'PAYMENT INTEGRATION',
      title: 'Stripe & Card Terminals',
      desc: 'Card readers, tap-to-pay, Apple Pay & real-time payout reconciliation.',
      ctaText: 'Explore Payment Gateway',
      href: '/integrations/stripe',
      imageSrc: '/images/nav_payment_bundle.png',
      badgeColor: 'text-indigo-700 dark:text-indigo-400 bg-indigo-100/90 dark:bg-indigo-900/30 border border-indigo-300/40',
    },
    {
      badge: 'DELIVERY INTEGRATION',
      title: 'DoorDash & Uber Eats Sync',
      desc: 'Direct kitchen printer & KDS ticket injection without manual tablets.',
      ctaText: 'Explore Delivery Sync',
      href: '/integrations/doordash',
      imageSrc: '/images/foodhub_bundle_mockup.png',
      badgeColor: 'text-red-700 dark:text-red-400 bg-red-100/90 dark:bg-red-900/30 border border-red-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'PAYMENT PROCESSORS & TERMINALS',
      items: [
        { title: 'Stripe Payments', desc: 'Card terminals & subscription sync', href: '/integrations/stripe', icon: CreditCard, iconColor: 'text-indigo-500' },
        { title: 'Authorize.Net', desc: 'Enterprise Visa gateway & batching', href: '/integrations/authorize-net', icon: ShieldCheck, iconColor: 'text-blue-600' },
        { title: 'Square POS Reader', desc: 'Terminal reader & catalog bridge', href: '/integrations/square', icon: Monitor, iconColor: 'text-sky-500' },
      ],
    },
    {
      categoryTitle: 'FOODSERVICE & DELIVERY PLATFORMS',
      items: [
        { title: 'DoorDash Drive', desc: 'Direct kitchen ticket printing', href: '/integrations/doordash', icon: Truck, iconColor: 'text-red-500' },
        { title: 'Uber Eats Direct Sync', desc: 'Zero-tablet kitchen dispatching', href: '/integrations/uber-eats', icon: Utensils, iconColor: 'text-emerald-500' },
      ],
    },
  ],
};

export const RESOURCES_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'ENTERPRISE PLAYBOOK',
      title: 'Enterprise POS Master Guide',
      desc: 'Hybrid cloud topology, offline cashier cache & real-time ERP data pipelines.',
      ctaText: 'Open Master Guide',
      href: '/resources/pos-guide',
      imageSrc: '/images/nav_cloud_bundle.png',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40',
    },
    {
      badge: 'KNOWLEDGE & TEMPLATES',
      title: 'Resource Library & Worksheets',
      desc: 'Download free migration checklists, COGS models, and SOP spreadsheets.',
      ctaText: 'Browse Knowledge Hub',
      href: '/resources',
      imageSrc: '/images/foodhub_bundle_mockup.png',
      badgeColor: 'text-purple-700 dark:text-purple-400 bg-purple-100/90 dark:bg-purple-900/30 border border-purple-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'ESSENTIAL GUIDES & TOOLS',
      items: [
        { title: 'Enterprise POS Master Guide', desc: 'Hybrid cloud, offline till & ERP sync', href: '/resources/pos-guide', icon: Server, iconColor: 'text-blue-500' },
        { title: 'Resource Hub & Templates', desc: 'Whitepapers, spreadsheets & SOPs', href: '/resources', icon: FileSpreadsheet, iconColor: 'text-emerald-500' },
        { title: 'ROI Savings Calculator', desc: 'Calculate cost savings vs legacy POS', href: '/roi-calculator', icon: Calculator, iconColor: 'text-purple-500' },
      ],
    },
    {
      categoryTitle: 'DEVELOPER & SUPPORT',
      items: [
        { title: 'API Documentation', desc: 'REST endpoints & webhook data lakes', href: '/api-docs', icon: FileText, iconColor: 'text-amber-500' },
        { title: 'Help Center & Docs', desc: 'Setup documentation & ticket support', href: '/help', icon: HelpCircle, iconColor: 'text-sky-500' },
        { title: 'About Us & Mission', desc: 'Discover our vision, story & leadership', href: '/about', icon: Flame, iconColor: 'text-rose-500' },
      ],
    },
  ],
};

export const MOBILE_MENU_SECTIONS: MobileMenuSection[] = [
  {
    ...PRIMARY_LINKS[0],
    icon: Layers,
    imageSrc: '/images/nav_restaurant_bundle.png',
    badge: 'CORE POS PLATFORMS',
    groups: [
      {
        title: 'CORE POS PLATFORMS',
        items: [
          { title: 'Restaurant POS', desc: 'Tableside orders & kitchen KDS', href: '/products/restaurant-pos', icon: Utensils },
          { title: 'Retail Register', desc: 'Barcode billing & offline till', href: '/products/retail-pos', icon: Store },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[1],
    icon: Store,
    imageSrc: '/images/nav_retail_bundle.png',
    badge: 'ALL INDUSTRY VERTICALS',
    groups: [
      {
        title: 'DINING & FOODSERVICE',
        items: [
          { title: 'Fine Dining & Full Service', desc: 'Table mapping & course service', href: '/solutions/fine-dining', icon: Utensils },
          { title: 'Quick Service & QSR', desc: 'Fast counter checkout', href: '/solutions/quick-service', icon: Zap },
          { title: 'Cafes & Bakeries', desc: 'Modifiers & recipe costing', href: '/solutions/cafe-bakery', icon: Coffee },
        ],
      },
      {
        title: 'RETAIL & STORE',
        items: [
          { title: 'Fashion & Apparel', desc: 'Size/color matrix & boutique stock', href: '/solutions/fashion-retail', icon: ShoppingBag },
          { title: 'Grocery & Supermarket', desc: 'Barcode scanning & scale', href: '/solutions/grocery', icon: Store },
          { title: 'Multi-Store Franchise', desc: 'Central menu push & multi-branch', href: '/solutions/franchise', icon: Server },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[2],
    icon: RefreshCw,
    imageSrc: '/images/nav_payment_bundle.png',
    badge: 'PAYMENT & APPS SYNC',
    groups: [
      {
        title: 'PAYMENT & DELIVERY GATEWAYS',
        items: [
          { title: 'Stripe Payments', desc: 'Card terminal & subscription sync', href: '/integrations/stripe', icon: CreditCard },
          { title: 'Authorize.Net Gateway', desc: 'Enterprise Visa payment gateway', href: '/integrations/authorize-net', icon: ShieldCheck },
          { title: 'DoorDash Drive', desc: 'Direct kitchen ticket printing', href: '/integrations/doordash', icon: Truck },
          { title: 'Uber Eats', desc: 'Zero tablet order dispatch', href: '/integrations/uber-eats', icon: Utensils },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[4],
    icon: HelpCircle,
    imageSrc: '/images/nav_cloud_bundle.png',
    badge: 'GUIDES & PLAYBOOKS',
    groups: [
      {
        title: 'KNOWLEDGE & PLAYBOOKS',
        items: [
          { title: 'Enterprise POS Guide', desc: 'Hybrid cloud & ERP architecture', href: '/resources/pos-guide', icon: Server },
          { title: 'Resource Hub & Templates', desc: 'Spreadsheets, whitepapers & checklists', href: '/resources', icon: FileSpreadsheet },
          { title: 'ROI Savings Calculator', desc: 'Calculate cost savings vs legacy POS', href: '/roi-calculator', icon: Calculator },
          { title: 'Help Guides & Documentation', desc: 'Terminal & setup guides', href: '/help', icon: FileText },
          { title: 'About Us & Mission', desc: 'Learn about our vision and team', href: '/about', icon: Flame },
        ],
      },
    ],
  },
];

export const QUICK_MOBILE_TOOLS: QuickMobileTool[] = [
  { label: 'Downloads', href: '/downloads', icon: Download },
  { label: 'Support', href: '/help', icon: Headset },
  { label: 'Pricing', href: '/pricing', icon: Sparkles },
  { label: 'About Us', href: '/about', icon: Users },
];

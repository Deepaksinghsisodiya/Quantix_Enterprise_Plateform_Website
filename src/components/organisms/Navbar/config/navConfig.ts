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
} from 'lucide-react';
import type { NavLink, MegaMenuSectionData, MobileMenuSection, QuickMobileTool } from './navTypes';

export const PRIMARY_LINKS: NavLink[] = [
  { label: 'Products', href: '/products', desc: 'Smarter retail, restaurant, and cloud POS tools', hasMegaMenu: true },
  { label: 'Solutions', href: '/solutions', desc: 'Industry-tailored POS solutions and services', hasMegaMenu: true },
  { label: 'Integrations', href: '/integrations', desc: 'Connect payment terminals, delivery platforms, and tools', hasMegaMenu: true },
  { label: 'Pricing', href: '/pricing', desc: 'Flexible plans tailored to your business scale' },
  { label: 'Resources', href: '/resources', desc: 'Help guides, documentation, downloads, and insights', hasMegaMenu: true },
  { label: 'Company', href: '/about', desc: 'Our mission, team, careers, and press', hasMegaMenu: true },
];

export const PRODUCTS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'FEATURED PRODUCT',
      title: 'Restaurant POS System',
      desc: 'Tableside ordering, floor maps, KDS routing & split check payments.',
      ctaText: 'Explore Restaurant POS',
      href: '/products/restaurant-pos',
      imageSrc: '/images/kitchen_display_3d.png',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
    {
      badge: 'FEATURED PRODUCT',
      title: 'Retail Register',
      desc: 'Barcode checkout, cashier permissions, inventory sync & offline till.',
      ctaText: 'Explore Retail Register',
      href: '/products/retail-pos',
      imageSrc: '/images/pos_counter_3d.png',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/90 dark:bg-emerald-900/30 border border-emerald-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'CORE POS HARDWARE & PLATFORMS',
      items: [
        { title: 'Restaurant POS', desc: 'Tableside orders & kitchen KDS', href: '/products/restaurant-pos', icon: Utensils, iconColor: 'text-amber-500' },
        { title: 'Retail Register', desc: 'Barcode billing & offline till', href: '/products/retail-pos', icon: Store, iconColor: 'text-emerald-500' },
        { title: 'Cloud Back-Office Hub', desc: 'Multi-store cloud analytics & stock', href: '/products/cloud-pos', icon: Cloud, iconColor: 'text-blue-500' },
        { title: 'Enterprise POS System', desc: 'Multi-location network & SLA controls', href: '/products/enterprise-pos', icon: Server, iconColor: 'text-purple-500' },
      ],
    },
    {
      categoryTitle: 'DIGITAL ORDERING CHANNELS',
      items: [
        { title: 'Online Ordering Website', desc: 'Branded web menus & pickup', href: '/products/websites', icon: Globe, iconColor: 'text-violet-500' },
        { title: 'Self-Service Kiosk', desc: 'Touchscreen guest self-ordering', href: '/features/self-service-kiosk', icon: Tablet, iconColor: 'text-sky-500' },
        { title: 'QR Table Ordering', desc: 'Contactless mobile menu & pay', href: '/features/qr-code-ordering', icon: Scan, iconColor: 'text-indigo-500' },
      ],
    },
    {
      categoryTitle: 'KITCHEN & COUNTER OPERATIONS',
      items: [
        { title: 'Kitchen Display (KDS)', desc: 'Multi-station ticket order dispatch', href: '/features/kitchen-display', icon: Tv, iconColor: 'text-orange-500' },
        { title: 'Mobile Waiter App', desc: 'Handheld tableside server app', href: '/products/mobile-application', icon: Smartphone, iconColor: 'text-teal-500' },
        { title: 'Dynamic TV Menu Boards', desc: 'Non-interactive counter TV displays', href: '/features/menu-boards', icon: Monitor, iconColor: 'text-cyan-500' },
        { title: 'Custom POS & API Platform', desc: 'White-label & API middleware', href: '/products/custom-service', icon: Wrench, iconColor: 'text-slate-600' },
      ],
    },
  ],
};

export const SOLUTIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'FEATURED SOLUTION',
      title: 'Fine Dining & Full Service',
      desc: 'Interactive floor mapping, course pacing, wine pairing & split checks.',
      ctaText: 'Explore Fine Dining',
      href: '/solutions/fine-dining',
      imageSrc: '/images/hero-restaurant.jpg',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40',
    },
    {
      badge: 'FEATURED SOLUTION',
      title: 'Quick Service (QSR)',
      desc: '15-second rapid counter checkout, combo builders, kitchen queue & delivery sync.',
      ctaText: 'Explore Quick Service',
      href: '/solutions/quick-service',
      imageSrc: '/images/hero-retail.jpg',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'DINING & FOODSERVICE SECTORS',
      items: [
        { title: 'Fine Dining & Full Service', desc: 'Course pacing & table floor map', href: '/solutions/fine-dining', icon: Utensils, iconColor: 'text-amber-500' },
        { title: 'Quick Service (QSR)', desc: '15-second counter billing & KDS', href: '/solutions/quick-service', icon: Zap, iconColor: 'text-yellow-500' },
        { title: 'Fast Casual Restaurants', desc: 'Counter order with table delivery', href: '/solutions/fast-casual', icon: Layers, iconColor: 'text-blue-500' },
        { title: 'Cafes & Bakeries', desc: 'Drink modifiers & batch costing', href: '/solutions/cafe-bakery', icon: Coffee, iconColor: 'text-amber-700' },
      ],
    },
    {
      categoryTitle: 'RETAIL & FRANCHISE SECTORS',
      items: [
        { title: 'Fashion & Apparel Boutiques', desc: 'Size/color matrix & boutique stock', href: '/solutions/fashion-retail', icon: ShoppingBag, iconColor: 'text-pink-500' },
        { title: 'Grocery & Supermarkets', desc: 'Barcode scale & perishable alerts', href: '/solutions/grocery', icon: Store, iconColor: 'text-emerald-500' },
        { title: 'Electronics & Tech Retail', desc: 'Serial number sync & warranty', href: '/solutions/electronics', icon: Monitor, iconColor: 'text-sky-500' },
        { title: 'Multi-Store Franchise Chains', desc: 'Central menu push & multi-branch', href: '/solutions/franchise', icon: Server, iconColor: 'text-purple-500' },
      ],
    },
  ],
};

export const INTEGRATIONS_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'FEATURED INTEGRATION',
      title: 'Stripe Payments',
      desc: 'Card readers, Apple Pay, Google Pay & real-time payout reconciliation.',
      ctaText: 'Explore Stripe Integration',
      href: '/integrations/stripe',
      imageSrc: '/images/hero-cafe.jpg',
      badgeColor: 'text-indigo-700 dark:text-indigo-400 bg-indigo-100/90 dark:bg-indigo-900/30 border border-indigo-300/40',
    },
    {
      badge: 'FEATURED INTEGRATION',
      title: 'DoorDash Drive',
      desc: 'Direct kitchen printer & KDS ticket injection without manual tablets.',
      ctaText: 'Explore DoorDash Sync',
      href: '/integrations/doordash',
      imageSrc: '/images/online_ordering_3d.png',
      badgeColor: 'text-red-700 dark:text-red-400 bg-red-100/90 dark:bg-red-900/30 border border-red-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'PAYMENT & TERMINAL GATEWAYS',
      items: [
        { title: 'Stripe Payments', desc: 'Card terminals & subscription sync', href: '/integrations/stripe', icon: CreditCard, iconColor: 'text-indigo-500' },
        { title: 'Authorize.Net', desc: 'Enterprise Visa gateway & batching', href: '/integrations/authorize-net', icon: ShieldCheck, iconColor: 'text-blue-600' },
        { title: 'Square POS Reader', desc: 'Terminal reader & catalog bridge', href: '/integrations/square', icon: Monitor, iconColor: 'text-sky-500' },
        { title: 'PayPal Checkout', desc: 'Express checkout & Venmo wallet', href: '/integrations/paypal', icon: CreditCard, iconColor: 'text-cyan-600' },
      ],
    },
    {
      categoryTitle: 'ONLINE DELIVERY PLATFORMS',
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
      badge: 'FEATURED RESOURCE',
      title: 'Help Guides & Documentation',
      desc: 'Step-by-step terminal configuration, printer setup & hardware guides.',
      ctaText: 'View Documentation',
      href: '/help',
      imageSrc: '/images/hero-cafe.jpg',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40',
    },
    {
      badge: 'FEATURED RESOURCE',
      title: 'Blog & Articles',
      desc: 'Industry research on restaurant throughput, inventory costing & retail growth.',
      ctaText: 'Read Blog Articles',
      href: '/blog',
      imageSrc: '/images/ss1.jpg',
      badgeColor: 'text-purple-700 dark:text-purple-400 bg-purple-100/90 dark:bg-purple-900/30 border border-purple-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'KNOWLEDGE & HELP GUIDES',
      items: [
        { title: 'Help Guides & Documentation', desc: 'Terminal & hardware guides', href: '/help', icon: FileText, iconColor: 'text-blue-500' },
        { title: 'Frequently Asked Questions', desc: 'Pre-purchase, billing & account FAQs', href: '/faq', icon: HelpCircle, iconColor: 'text-amber-500' },
        { title: 'POS Insights & Blog', desc: 'Expert articles on retail & POS growth', href: '/blog', icon: BookOpen, iconColor: 'text-purple-500' },
        { title: 'ROI Savings Calculator', desc: 'Calculate cost savings vs legacy POS', href: '/roi-calculator', icon: Calculator, iconColor: 'text-emerald-500' },
      ],
    },
    {
      categoryTitle: 'DOWNLOADS & LIVE STATUS',
      items: [
        { title: 'App & Printer Driver Downloads', desc: 'Register app & printer drivers', href: '/downloads', icon: Download, iconColor: 'text-teal-500' },
        { title: 'Live System Uptime & Status', desc: 'Real-time cloud server status & uptime', href: '/status', icon: Activity, iconColor: 'text-rose-500' },
        { title: 'Cloud vs Standalone POS Guide', desc: 'Compare cloud sync vs offline POS', href: '/enterprise-vs-standalone', icon: Layers, iconColor: 'text-indigo-500' },
      ],
    },
  ],
};

export const COMPANY_MEGA_CONFIG: MegaMenuSectionData = {
  promoCards: [
    {
      badge: 'FEATURED PAGE',
      title: 'About Us & Mission',
      desc: 'Discover our story, leadership team, and offline-first cloud POS platform vision.',
      ctaText: 'Learn About Us',
      href: '/about',
      imageSrc: '/images/hero-restaurant.jpg',
      badgeColor: 'text-rose-700 dark:text-rose-400 bg-rose-100/90 dark:bg-rose-900/30 border border-rose-300/40',
    },
    {
      badge: 'FEATURED PAGE',
      title: 'Careers & Openings',
      desc: 'Explore engineering, UI design, and merchant support career opportunities.',
      ctaText: 'View Openings',
      href: '/careers',
      imageSrc: '/images/ss3-ai.png',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40',
    },
  ],
  categories: [
    {
      categoryTitle: 'OUR COMPANY & MISSION',
      items: [
        { title: 'Company Overview & Mission', desc: 'Learn about our vision & team', href: '/about', icon: Flame, iconColor: 'text-rose-500' },
        { title: 'Careers & Global Team', desc: 'Join our remote international team', href: '/careers', icon: Briefcase, iconColor: 'text-blue-500' },
        { title: 'Press & Brand Kit', desc: 'Official brand kit & announcements', href: '/press', icon: Newspaper, iconColor: 'text-purple-500' },
        { title: 'Merchant Success Stories', desc: 'Read reviews & case studies from merchants', href: '/testimonials', icon: Star, iconColor: 'text-amber-500' },
      ],
    },
  ],
};

export const MOBILE_MENU_SECTIONS: MobileMenuSection[] = [
  {
    ...PRIMARY_LINKS[0],
    icon: Layers,
    groups: [
      {
        title: 'CORE POS PLATFORMS',
        items: [
          { title: 'Restaurant POS', desc: 'Tableside orders & kitchen KDS', href: '/products/restaurant-pos', icon: Utensils },
          { title: 'Retail Register', desc: 'Barcode billing & offline till', href: '/products/retail-pos', icon: Store },
          { title: 'Cloud POS Hub', desc: 'Multi-store cloud analytics', href: '/products/cloud-pos', icon: Cloud },
          { title: 'Enterprise POS', desc: 'Multi-location network controls', href: '/products/enterprise-pos', icon: Server },
        ],
      },
      {
        title: 'DIGITAL ORDERING CHANNELS',
        items: [
          { title: 'Online Ordering Website', desc: 'Branded web menus & pickup', href: '/products/websites', icon: Globe },
          { title: 'Self-Service Kiosk', desc: 'Touchscreen guest ordering', href: '/features/self-service-kiosk', icon: Tablet },
          { title: 'QR Table Ordering', desc: 'Contactless mobile menu & pay', href: '/features/qr-code-ordering', icon: Scan },
          { title: 'Kitchen Display (KDS)', desc: 'Order routing screens', href: '/features/kitchen-display', icon: Tv },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[1],
    icon: Store,
    groups: [
      {
        title: 'DINING & FOODSERVICE',
        items: [
          { title: 'Fine Dining & Full Service', desc: 'Table mapping & course service', href: '/solutions/fine-dining', icon: Utensils },
          { title: 'Quick Service & QSR', desc: 'Fast counter checkout', href: '/solutions/quick-service', icon: Zap },
          { title: 'Fast Casual', desc: 'Combos & queue timers', href: '/solutions/fast-casual', icon: Layers },
          { title: 'Cafes & Bakeries', desc: 'Modifiers & recipe costing', href: '/solutions/cafe-bakery', icon: Coffee },
        ],
      },
      {
        title: 'RETAIL & FRANCHISE',
        items: [
          { title: 'Fashion & Apparel', desc: 'Size/color matrix & boutique stock', href: '/solutions/fashion-retail', icon: ShoppingBag },
          { title: 'Grocery & Supermarket', desc: 'Barcode scanning & scale', href: '/solutions/grocery', icon: Store },
          { title: 'Electronics & Tech', desc: 'Serial number sync & warranty', href: '/solutions/electronics', icon: Monitor },
          { title: 'Multi-Store Franchise', desc: 'Central menu push & multi-branch', href: '/solutions/franchise', icon: Server },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[2],
    icon: RefreshCw,
    groups: [
      {
        title: 'PAYMENT & DELIVERY GATEWAYS',
        items: [
          { title: 'Stripe Payments', desc: 'Card terminal & subscription sync', href: '/integrations/stripe', icon: CreditCard },
          { title: 'Authorize.Net Gateway', desc: 'Enterprise Visa payment gateway', href: '/integrations/authorize-net', icon: ShieldCheck },
          { title: 'Square POS Reader', desc: 'Hardware reader bridge', href: '/integrations/square', icon: Monitor },
          { title: 'DoorDash Drive', desc: 'Direct kitchen ticket printing', href: '/integrations/doordash', icon: Truck },
          { title: 'Uber Eats', desc: 'Zero tablet order dispatch', href: '/integrations/uber-eats', icon: Utensils },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[4],
    icon: HelpCircle,
    groups: [
      {
        title: 'KNOWLEDGE & SUPPORT',
        items: [
          { title: 'Frequently Asked Questions', desc: 'Billing, POS & setup answers', href: '/faq', icon: HelpCircle },
          { title: 'Help Guides & Documentation', desc: 'Terminal & hardware guides', href: '/help', icon: FileText },
          { title: 'Blog & Articles', desc: 'POS insights & industry trends', href: '/blog', icon: BookOpen },
          { title: 'App & Driver Downloads', desc: 'Register app & printer drivers', href: '/downloads', icon: Download },
        ],
      },
    ],
  },
  {
    ...PRIMARY_LINKS[5],
    icon: Users,
    groups: [
      {
        title: 'COMPANY & MISSION',
        items: [
          { title: 'Company Overview & Mission', desc: 'Learn about our vision and team', href: '/about', icon: Flame },
          { title: 'Careers & Hiring', desc: 'Join our remote international team', href: '/careers', icon: Briefcase },
          { title: 'Press & Media', desc: 'Brand kit & announcements', href: '/press', icon: Newspaper },
          { title: 'Merchant Success Stories', desc: 'Read stories from real merchants', href: '/testimonials', icon: Star },
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

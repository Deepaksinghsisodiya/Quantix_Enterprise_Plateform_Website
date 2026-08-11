import {
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
  Laptop,
  ShieldCheck,
  Check,
  Sparkles,
  Headset,
} from 'lucide-react';
import type { NavLink, MobileMenuIcon, MobileMenuItem, MobileMenuSection } from '../types/NavbarTypes';

export const LINKS: NavLink[] = [
  { label: 'Products', href: '/features', desc: 'Smarter retail, restaurant, and cloud POS tools' },
  { label: 'Solutions', href: '/services', desc: 'Enterprise retail setup, installation, and integration services' },
  { label: 'Integrations', href: '/integrations', desc: 'Connect payment terminals, delivery platforms, and tools' },
  { label: 'Resources', href: '/resources', desc: 'Download register terminals and sync services' },
  { label: 'Pricing Plans', href: '/pricing', desc: 'Flexible plans tailored to your business scale' },
];

export const PRODUCTS_LIST = [
  { title: 'Point of Sale (EPOS)', icon: Monitor, desc: 'Offline-first terminal billing', slug: 'offline-registers', href: '/products/retail-pos', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Order Kiosks Integration', icon: Tablet, desc: 'Self-checkout guest screens', slug: 'self-service-kiosk', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Online Ordering Portal', icon: Globe, desc: 'Web and mobile customer app', slug: 'online-ordering', href: '/products/websites', image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Kitchen Display Systems', icon: Tv, desc: 'Real-time kitchen order sync', slug: 'kitchen-display', image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Android & iPad POS', icon: Smartphone, desc: 'Handheld tableside ordering', slug: 'offline-registers', href: '/products/mobile-application', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&h=120&q=80' }
];

export const HARDWARE_LIST = [
  { title: 'Touch Terminal Stations', icon: Tv, desc: 'Heavy-duty registers', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'PDQ Payment Terminals', icon: CreditCard, desc: 'Integrated processors', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Barcode & QR Scanners', icon: Scan, desc: 'Fast stock scanners', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Thermal Receipt Printers', icon: Printer, desc: 'High-speed bill printers', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Mobile Billing Terminals', icon: Smartphone, desc: 'Handheld POS units', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&h=120&q=80' }
];

export const OPERATIONS_LIST = [
  { title: 'Multi-Store Stock Sync', icon: RefreshCw, desc: 'Live inventory sync hubs', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Visual Sales Reports', icon: BarChart3, desc: 'Margins, sales & analytics', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'QR Code Ordering', icon: Scan, desc: 'Table ordering and pay flows', slug: 'qr-code-ordering', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Delivery Dispatch', icon: Truck, desc: 'Pickup, delivery and handoff', slug: 'delivery-management', image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'SMS Queue Dispatch', icon: MessageSquare, desc: 'Notify customer queues', slug: 'table-management', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Interactive Floor Layouts', icon: Grid, desc: 'Visual table mapping stats', slug: 'table-management', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Secure Payments', icon: CreditCard, desc: 'Tokenized checkout workflows', slug: 'secure-payments', image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Customer Loyalty Tiers', icon: Award, desc: 'Points, rewards campaigns', slug: 'marketing-loyalty', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Owner App', icon: Smartphone, desc: 'Live owner sales dashboard', slug: 'owner-app', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Digital Menu Boards', icon: Tv, desc: 'Live counter display menus', slug: 'menu-boards', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=120&h=120&q=80' },
];

export const SERVICES_LIST = [
  { title: 'Retail Solutions', slug: 'retail', desc: 'Boutiques, chain branch sync', icon: Store, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Restaurant Solutions', slug: 'restaurant', desc: 'Table layout, kitchen display', icon: Utensils, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Enterprise Setup & Services', slug: 'enterprise-setup', href: '/sign-up/enterprise', desc: 'Dedicated SLA, rollout & custom setup', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Grocery & Supermarket', slug: 'grocery', desc: 'Quick barcode scanners weight', icon: ShoppingBag, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Cafes & Coffee Shops', slug: 'cafes', desc: 'Loyalty points, modifiers bills', icon: Coffee, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Food Trucks & Takeaways', slug: 'food-trucks', desc: 'Queue dispatch, SMS queues', icon: Truck, image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a24b5?auto=format&fit=crop&w=120&h=120&q=80' },
];

export const PRICING_LIST = [
  { title: 'Starter Trial', desc: 'Free 3-day test checkout flow and inventory', price: '$0', badge: 'Free Trial', icon: Sparkles, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Business Pro', desc: 'Complete cashier registers and margins sync', price: '$49', badge: 'Most Popular', icon: Check, popular: true, image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Enterprise Plan', desc: 'Custom APIs, dedicated servers & SLA SLA check', price: 'Custom', badge: 'For Corporations', icon: Headset, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80' },
];

const featureLink = (item: { title: string; desc: string; slug: string; href?: string; icon: MobileMenuIcon }): MobileMenuItem => ({
  title: item.title,
  desc: item.desc,
  href: item.href ?? `/features/${item.slug}`,
  icon: item.icon,
});

export const MOBILE_MENU_SECTIONS: MobileMenuSection[] = [
  {
    ...LINKS[0],
    icon: Layers,
    groups: [
      {
        title: 'POS Products',
        items: PRODUCTS_LIST.map(featureLink),
      },
      {
        title: 'Hardware & Registers',
        items: HARDWARE_LIST.map(featureLink),
      },
      {
        title: 'Operations Tools',
        items: OPERATIONS_LIST.map(featureLink),
      },
    ],
  },
  {
    ...LINKS[1],
    icon: Store,
    groups: [
      {
        title: 'Restaurant Solutions',
        items: [
          { title: 'Quick Service Restaurants', desc: 'Fast checkout, kiosks, and KDS queues', href: '/solutions/quick-service', icon: Utensils },
          { title: 'Fine Dining', desc: 'Table mapping and course-paced service', href: '/solutions/fine-dining', icon: Coffee },
          { title: 'Cafes & Bakeries', desc: 'Recipe costing and digital menu boards', href: '/solutions/cafe-bakery', icon: Coffee },
          { title: 'Franchise & Multi-Location', desc: 'Central controls for branch operations', href: '/solutions/franchise', icon: Server },
        ],
      },
      {
        title: 'Retail Solutions',
        items: [
          { title: 'Fashion & Apparel', desc: 'Size, color, collection, and store sync', href: '/solutions/fashion-retail', icon: ShoppingBag },
          { title: 'Grocery & Convenience', desc: 'Barcode, scale, batch, and stock controls', href: '/solutions/grocery', icon: Store },
          { title: 'Enterprise Setup', desc: 'Dedicated SLA, rollout, and custom setup', href: '/sign-up/enterprise', icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    ...LINKS[2],
    icon: RefreshCw,
    groups: [
      {
        title: 'Payment & Finance',
        items: [
          { title: 'Stripe Payments', desc: 'Secure card and online payments', href: '/integrations/stripe', icon: CreditCard },
          { title: 'Xero Accounting', desc: 'Invoice and ledger sync workflows', href: '/integrations/xero', icon: BarChart3 },
        ],
      },
      {
        title: 'Ordering & Delivery',
        items: [
          { title: 'Shopify Sync', desc: 'Retail inventory and e-commerce sync', href: '/integrations/shopify', icon: Store },
          { title: 'DoorDash Drive', desc: 'Delivery dispatch into POS operations', href: '/integrations/doordash', icon: Truck },
          { title: 'Integration Directory', desc: 'Browse all supported connectors', href: '/integrations', icon: Layers },
        ],
      },
    ],
  },
  {
    ...LINKS[3],
    icon: Download,
    groups: [
      {
        title: 'Help & Learning',
        items: [
          { title: 'Help Centre', desc: 'Setup guides and support articles', href: '/help', icon: Headset },
          { title: 'Frequently Asked Questions', desc: 'Common setup and pricing answers', href: '/faq', icon: MessageSquare },
          { title: 'Product Tour', desc: 'Explore the platform walkthrough', href: '/product-tour', icon: Sparkles },
          { title: 'API Documentation', desc: 'Developer docs and API examples', href: '/api-docs', icon: Server },
        ],
      },
      {
        title: 'Downloads & Status',
        items: [
          { title: 'App Downloads & Drivers', desc: 'POS terminal installers and sync tools', href: '/downloads', icon: Download },
          { title: 'System Status', desc: 'Live service and API status', href: '/status', icon: ShieldCheck },
          { title: 'Resources Hub', desc: 'All guides, tools, and documents', href: '/resources', icon: Layers },
        ],
      },
    ],
  },
  {
    ...LINKS[4],
    icon: Award,
    groups: [
      {
        title: 'Plans',
        items: PRICING_LIST.map((item) => ({
          title: item.title,
          desc: item.desc,
          href: '/pricing',
          icon: item.icon,
          badge: item.price,
        })),
      },
      {
        title: 'Decision Tools',
        items: [
          { title: 'ROI Calculator', desc: 'Estimate savings for your operations', href: '/roi-calculator', icon: BarChart3 },
          { title: 'Solution Quiz', desc: 'Find the right setup for your business', href: '/quiz', icon: Sparkles },
        ],
      },
    ],
  },
];

export const QUICK_MOBILE_TOOLS = [
  { label: 'ROI Calculator', href: '/roi-calculator', icon: BarChart3 },
  { label: 'Solution Quiz', href: '/quiz', icon: Sparkles },
  { label: 'Product Tour', href: '/product-tour', icon: Monitor },
  { label: 'Help Centre', href: '/help', icon: Headset },
];

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Layers, LogOut, User, ChevronDown, ChevronRight, ArrowLeft, ArrowRight, Monitor, Tablet, Globe, Tv, Smartphone, CreditCard, Scan, Printer, RefreshCw, BarChart3, MessageSquare, Grid, Award, Store, Utensils, ShoppingBag, Coffee, Truck, Download, Server, Laptop, ShieldCheck, Check, Sparkles, Headset, LogIn, Phone } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetMeQuery } from '@/features/Login/Service/LoginService';
import { logout } from '@/redux/slices/authSlice';
import { useIndustry } from '@/context/IndustryContext';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useContactModal } from '@/context/ContactModalContext';

// Nav link definition with description for premium mobile view
interface NavLink {
  label: string;
  href: string;
  desc: string;
}

const LINKS: NavLink[] = [
  { label: 'Products', href: '/features', desc: 'Smarter retail, restaurant, and cloud POS tools' },
  { label: 'Solutions', href: '/services', desc: 'Enterprise retail setup, installation, and integration services' },
  { label: 'Integrations', href: '/integrations', desc: 'Connect payment terminals, delivery platforms, and tools' },
  { label: 'Resources', href: '/resources', desc: 'Download register terminals and sync services' },
  { label: 'Pricing Plans', href: '/pricing', desc: 'Flexible plans tailored to your business scale' },
];

const PRODUCTS_LIST = [
  { title: 'Point of Sale (EPOS)', icon: Monitor, desc: 'Offline-first terminal billing', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Order Kiosks Integration', icon: Tablet, desc: 'Self-checkout guest screens', slug: 'self-service-kiosk', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Online Ordering Portal', icon: Globe, desc: 'Web and mobile customer app', slug: 'online-ordering', image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Kitchen Display Systems', icon: Tv, desc: 'Real-time kitchen order sync', slug: 'kitchen-display', image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Android & iPad POS', icon: Smartphone, desc: 'Handheld tableside ordering', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&h=120&q=80' }
];

const HARDWARE_LIST = [
  { title: 'Touch Terminal Stations', icon: Tv, desc: 'Heavy-duty registers', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'PDQ Payment Terminals', icon: CreditCard, desc: 'Integrated processors', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Barcode & QR Scanners', icon: Scan, desc: 'Fast stock scanners', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Thermal Receipt Printers', icon: Printer, desc: 'High-speed bill printers', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Mobile Billing Terminals', icon: Smartphone, desc: 'Handheld POS units', slug: 'offline-registers', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&h=120&q=80' }
];

const OPERATIONS_LIST = [
  { title: 'Multi-Store Stock Sync', icon: RefreshCw, desc: 'Live inventory sync hubs', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Visual Sales Reports', icon: BarChart3, desc: 'Margins, sales & analytics', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'SMS Queue Dispatch', icon: MessageSquare, desc: 'Notify customer queues', slug: 'table-management', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Interactive Floor Layouts', icon: Grid, desc: 'Visual table mapping stats', slug: 'table-management', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Customer Loyalty Tiers', icon: Award, desc: 'Points, rewards campaigns', slug: 'marketing-loyalty', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=120&h=120&q=80' }
];

const SERVICES_LIST = [
  { title: 'Retail Solutions', slug: 'retail', desc: 'Boutiques, chain branch sync', icon: Store, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Restaurant Solutions', slug: 'restaurant', desc: 'Table layout, kitchen display', icon: Utensils, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Enterprise Setup & Services', slug: 'enterprise-setup', href: '/sign-up/enterprise', desc: 'Dedicated SLA, rollout & custom setup', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Grocery & Supermarket', slug: 'grocery', desc: 'Quick barcode scanners weight', icon: ShoppingBag, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Cafes & Coffee Shops', slug: 'cafes', desc: 'Loyalty points, modifiers bills', icon: Coffee, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Food Trucks & Takeaways', slug: 'food-trucks', desc: 'Queue dispatch, SMS queues', icon: Truck, image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a24b5?auto=format&fit=crop&w=120&h=120&q=80' },
];

const INTEGRATIONS_FINANCE = [
  { title: 'Stripe Payments', desc: 'Secure online & card payments', slug: 'stripe', icon: CreditCard, image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Xero Accounting', desc: 'Auto-sync invoices & ledger', slug: 'xero', icon: BarChart3, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&h=120&q=80' },
];

const INTEGRATIONS_OPERATIONS = [
  { title: 'Shopify Sync', desc: 'Bi-directional stock sync', slug: 'shopify', icon: Store, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'DoorDash Drive', desc: 'On-demand delivery dispatch', slug: 'doordash', icon: Truck, image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&w=120&h=120&q=80' },
];

const DOWNLOADS_LIST = [
  { title: 'Quantix POS Terminal', desc: 'Windows desktop installer (x64) for cashier desks', icon: Laptop, badge: 'Win x64', size: '45 MB', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Quantix POS (Linux)', desc: 'Linux Debian/Ubuntu installer for registers', icon: Monitor, badge: 'Debian x64', size: '42 MB', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Quantix Sync Service', desc: 'Local database sync coordinator background app', icon: Server, badge: 'Background', size: '12 MB', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&h=120&q=80' },
];

const PRICING_LIST = [
  { title: 'Starter Trial', desc: 'Free 3-day test checkout flow and inventory', price: '$0', badge: 'Free Trial', icon: Sparkles, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Business Pro', desc: 'Complete cashier registers and margins sync', price: '$49', badge: 'Most Popular', icon: Check, popular: true, image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Enterprise Plan', desc: 'Custom APIs, dedicated servers & SLA SLA check', price: 'Custom', badge: 'For Corporations', icon: Headset, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80' },
];

type MobileMenuIcon = React.ComponentType<{ size?: number; className?: string }>;

interface MobileMenuItem {
  title: string;
  desc: string;
  href: string;
  icon: MobileMenuIcon;
  badge?: string;
}

interface MobileMenuGroup {
  title: string;
  items: MobileMenuItem[];
}

interface MobileMenuSection extends NavLink {
  icon: MobileMenuIcon;
  groups: MobileMenuGroup[];
}

const featureLink = (item: { title: string; desc: string; slug: string; icon: MobileMenuIcon }): MobileMenuItem => ({
  title: item.title,
  desc: item.desc,
  href: `/features/${item.slug}`,
  icon: item.icon,
});

const MOBILE_MENU_SECTIONS: MobileMenuSection[] = [
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

const QUICK_MOBILE_TOOLS = [
  { label: 'ROI Calculator', href: '/roi-calculator', icon: BarChart3 },
  { label: 'Solution Quiz', href: '/quiz', icon: Sparkles },
  { label: 'Product Tour', href: '/product-tour', icon: Monitor },
  { label: 'Help Centre', href: '/help', icon: Headset },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useContactModal();
  const dispatch = useDispatch();
  const { setMode: setIndustryMode } = useIndustry();

  const itemColors = [
    { bg: 'bg-blue-50/70 border-blue-100/50 text-blue-600', hover: 'group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-600' },
    { bg: 'bg-purple-50/70 border-purple-100/50 text-purple-600', hover: 'group-hover/item:bg-purple-600 group-hover/item:text-white group-hover/item:border-purple-600' },
    { bg: 'bg-emerald-50/70 border-emerald-100/50 text-emerald-600', hover: 'group-hover/item:bg-emerald-600 group-hover/item:text-white group-hover/item:border-emerald-600' },
    { bg: 'bg-rose-50/70 border-rose-100/50 text-rose-600', hover: 'group-hover/item:bg-rose-600 group-hover/item:text-white group-hover/item:border-rose-600' },
    { bg: 'bg-amber-50/70 border-amber-100/50 text-amber-600', hover: 'group-hover/item:bg-amber-600 group-hover/item:text-white group-hover/item:border-amber-600' },
    { bg: 'bg-teal-50/70 border-teal-100/50 text-teal-600', hover: 'group-hover/item:bg-teal-600 group-hover/item:text-white group-hover/item:border-teal-600' },
  ];

  const token = useSelector((state: RootState) => state.auth.token);
  const { data: meData } = useGetMeQuery(undefined, { skip: !token });

  const handleLogout = async () => {
    try {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(logout());
      toast.success("Successfully signed out. Have a great day!");
      router.push("/");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();

      const start = window.scrollY;
      const startTime = performance.now();
      const duration = 1200; // 1.2s slow-motion duration

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const scroll = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, start * (1 - ease));

        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      };

      requestAnimationFrame(scroll);
    }
  };


  const [scrolled, setScrolled] = useState(false);

  // Navbar always stays visible — only track scrolled state for shadow/bg styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => {
      if (prev) setMobileSubMenu(null);
      return !prev;
    });
  }, []);

  // Prevent background scrolling when mobile overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Navbar uses light frosted glass — text is dark
  const useWhiteText = false;

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubMenu(null);
  }, [pathname]);

  // Animation variants for Staggered Mobile Menu links
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120, damping: 14 } },
  };

  const activeMobileSection = MOBILE_MENU_SECTIONS.find((section) => section.label === mobileSubMenu);
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSubMenu(null);
  };
  const isMenuHrefActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isMobileSectionActive = (section: MobileMenuSection) =>
    isMenuHrefActive(section.href) ||
    section.groups.some((group) => group.items.some((item) => isMenuHrefActive(item.href)));

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full flex flex-col">
        {/* Top Promo Banner - Smooth CSS Collapse on Scroll */}
        <div className={cn(
          "w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 text-center text-[10px] sm:text-[13px] font-sans font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 select-none transition-all duration-300 ease-out overflow-hidden",
          scrolled ? "max-h-0 opacity-0 py-0 border-b-0" : "max-h-8 py-1 px-3 opacity-100 sm:max-h-10 sm:py-1.5"
        )}>
          <span className="truncate max-w-[220px] sm:max-w-none">Get 3 Months FREE Quantix Cloud POS</span>
          <span className="text-slate-350 dark:text-slate-700 mx-0.5 sm:mx-1">|</span>
          <Link
            href="/pricing"
            className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-0.5 hover:underline transition-colors shrink-0"
          >
            Book Now <ChevronRight size={12} className="stroke-[3]" />
          </Link>
        </div>

        <nav
          className={cn(
            "w-full bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 relative transition-all duration-300",
            scrolled ? "shadow-md shadow-slate-900/5 py-1.5 sm:py-2.5" : "shadow-sm py-2 sm:py-3"
          )}
          onMouseLeave={() => setOpenMegaMenu(null)}
        >
          <div
            className="site-container"
          >

            {/* Inner Content */}
            <div className="w-full flex items-center justify-between">
              {/* Left: Brand logo */}
              <Link href="/" onClick={handleBrandClick} className="flex items-center z-50 group">
                {/* Desktop Full Logo (always full size) */}
                <img
                  src="/images/logo/quantix-logo-full-on-light.svg"
                  alt="Quantix Logo"
                  className="hidden lg:block h-[44px] w-auto transition-all duration-300 group-hover:scale-[1.02]"
                />
                {/* Mobile/Tablet Logo */}
                <img
                  src="/images/logo/quantix-logo-full-on-light.svg"
                  alt="Quantix Logo"
                  className="block lg:hidden h-[26px] sm:h-[34px] w-auto transition-all duration-300 group-hover:scale-[1.02]"
                />
              </Link>

              {/* Center: Nav links */}
              <ul className="hidden space-x-2 lg:flex items-center font-sans">
                {LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const isDropdown = ['Products', 'Features', 'Solutions', 'Services', 'Integrations', 'Downloads', 'Resources'].includes(link.label);
                  const isMenuOpen = openMegaMenu === link.label;
                  return (
                    <li
                      key={link.href}
                      className="relative py-2.5 px-3 group"
                      onMouseEnter={() => {
                        if (isDropdown) {
                          setOpenMegaMenu(link.label);
                        } else {
                          setOpenMegaMenu(null);
                        }
                      }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'relative z-10 text-[15px] font-semibold transition-all duration-300 block hover:scale-105 active:scale-95',
                          isActive || isMenuOpen
                            ? 'text-primary font-bold'
                            : 'text-slate-600 group-hover:text-slate-950'
                        )}
                      >
                        <span className="inline-flex items-center gap-1">
                          {link.label}
                          {isDropdown && (
                            <ChevronDown
                              size={12}
                              className={cn(
                                "transition-transform duration-300 ease-out shrink-0",
                                isMenuOpen
                                  ? "rotate-180 text-primary"
                                  : "text-slate-400 group-hover:text-slate-900"
                              )}
                            />
                          )}
                        </span>
                      </Link>

                      {/* Bottom border line for active/hover states */}
                      <span
                        className={cn(
                          'absolute bottom-0 left-3 right-3 h-[2px] bg-primary transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100',
                          (isActive || isMenuOpen) && 'scale-x-100'
                        )}
                      />
                    </li>
                  );
                })}
              </ul>

              {/* Right side: Auth State check */}
              <div className="hidden lg:flex items-center gap-3">
                {token ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 select-none">
                      <User size={13} className="text-blue-400" />
                      <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-200">
                        {meData?.data?.username || meData?.username || "Admin"}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500 text-white font-bold text-[11px] tracking-[0.08em] uppercase transition-all duration-300 hover:scale-[1.04] active:scale-95 cursor-pointer"
                    >
                      <LogOut size={13} />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="tel:+18005550199"
                      className="hidden xl:flex items-center justify-center gap-2 h-10 px-4.5 rounded-xl border border-primary/40 hover:border-primary text-primary-dark dark:text-primary-light font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-2xs"
                    >
                      <Phone size={14} className="text-primary dark:text-primary-light" />
                      Call Now
                    </a>
                    <button
                      type="button"
                      onClick={() => openModal()}
                      className="flex items-center justify-center h-10 px-5.5 rounded-xl bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.06] active:scale-95 shadow-md shadow-primary/20 cursor-pointer"
                    >
                      Contact sales
                    </button>
                  </>
                )}
              </div>

              {/* Morphing Hamburger Menu Trigger for Mobile */}
              <div className="flex lg:hidden items-center z-50">
                <button
                  type="button"
                  className={cn(
                    'flex flex-col justify-center items-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 focus:outline-none',
                    useWhiteText ? 'text-white' : 'text-slate-800'
                  )}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileOpen}
                  onClick={toggleMobile}
                >
                  <span className={cn(
                    "w-[18px] h-[2px] sm:w-5 bg-current rounded-full transition-all duration-300 ease-out",
                    mobileOpen ? "rotate-45 translate-y-[5px]" : ""
                  )} />
                  <span className={cn(
                    "w-[18px] h-[2px] sm:w-5 bg-current rounded-full my-[3px] transition-all duration-300 ease-out",
                    mobileOpen ? "opacity-0 scale-x-0" : ""
                  )} />
                  <span className={cn(
                    "w-[18px] h-[2px] sm:w-5 bg-current rounded-full transition-all duration-300 ease-out",
                    mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
                  )} />
                </button>
              </div>
            </div>
          </div>          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {(openMegaMenu === 'Products' || openMegaMenu === 'Features') && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Products')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: 2 Featured Cards (4 cols) */}
                  <div className="col-span-4 border-r border-slate-200/80 dark:border-slate-800 pr-6 flex flex-col gap-4 justify-between">
                    {/* Featured Card 1 */}
                    <Link
                      href="/features/offline-registers"
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 hover:bg-primary/5 border border-slate-200/60 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
                        <Image
                          src="/images/hero-retail.jpg"
                          alt="Point of Sale"
                          fill
                          className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-primary-dark bg-primary/10 px-2 py-0.5 rounded-md inline-block">
                          CORE PLATFORM
                        </span>
                        <div className="flex items-center gap-1 text-[13px] font-black text-slate-900 group-hover/card:text-primary transition-colors">
                          Point of Sale <ArrowRight size={13} className="-rotate-45 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug line-clamp-2">
                          Take orders, manage menus, process payments, and view performance from one fast POS.
                        </p>
                      </div>
                    </Link>

                    {/* Featured Card 2 */}
                    <Link
                      href="/features/table-management"
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 hover:bg-primary/5 border border-slate-200/60 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
                        <Image
                          src="/images/hero-cafe.jpg"
                          alt="Online Ordering"
                          fill
                          className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md inline-block">
                          POPULAR
                        </span>
                        <div className="flex items-center gap-1 text-[13px] font-black text-slate-900 group-hover/card:text-primary transition-colors">
                          Online Ordering <ArrowRight size={13} className="-rotate-45 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug line-clamp-2">
                          Launch a branded website and app for commission-free direct ordering.
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Right Columns: 4 Categorized Columns (8 cols) */}
                  <div className="col-span-8 grid grid-cols-4 gap-5">
                    {/* Column 1: OUR PRODUCTS */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                        OUR PRODUCTS
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <Link href="/features/table-management" onClick={() => setOpenMegaMenu(null)} className="group/link flex items-center gap-2 text-[13px] font-bold text-primary hover:text-primary-dark transition-colors">
                          <Utensils size={14} className="text-primary shrink-0" /> Restaurant POS
                        </Link>
                        <Link href="/features/offline-registers" onClick={() => setOpenMegaMenu(null)} className="group/link flex items-center gap-2 text-[13px] font-bold text-primary hover:text-primary-dark transition-colors">
                          <Store size={14} className="text-emerald-600 shrink-0" /> Retail POS
                        </Link>
                        <Link href="/enterprise-vs-standalone" onClick={() => setOpenMegaMenu(null)} className="group/link flex items-center gap-2 text-[13px] font-bold text-primary hover:text-primary-dark transition-colors">
                          <Server size={14} className="text-blue-600 shrink-0" /> Enterprise POS
                        </Link>
                        <Link href="/contact" onClick={() => setOpenMegaMenu(null)} className="group/link flex items-center gap-2 text-[13px] font-bold text-primary hover:text-primary-dark transition-colors">
                          <Headset size={14} className="text-amber-600 shrink-0" /> Custom Solutions
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: ORDERING CHANNELS */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                        ORDERING CHANNELS
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <Link href="/features/online-ordering" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Online Ordering
                        </Link>
                        <Link href="/features/self-service-kiosk" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Self-Service Kiosk
                        </Link>
                        <Link href="/features/qr-code-ordering" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          QR Code Ordering
                        </Link>
                      </div>
                    </div>

                    {/* Column 3: MANAGEMENT & OPS */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                        MANAGEMENT & OPS
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <Link href="/features/kitchen-display" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Kitchen Display System
                        </Link>
                        <Link href="/features/delivery-management" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Delivery Management
                        </Link>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[13px] font-bold text-slate-500">Owner App</span>
                          <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">SOON</span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[13px] font-bold text-slate-500">Menu Boards</span>
                          <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">SOON</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 4: GROWTH SERVICES */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                        GROWTH SERVICES
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <Link href="/pci" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Secure Payments
                        </Link>
                        <Link href="/features/marketing-loyalty" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Marketing & Loyalty
                        </Link>
                        <Link href="/enterprise-vs-standalone" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Multi-Tenant Enterprise
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Solutions Mega Menu Dropdown */}
          <AnimatePresence>
            {(openMegaMenu === 'Solutions' || openMegaMenu === 'Services') && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Solutions')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Featured Card (4 cols) */}
                  <div className="col-span-4 border-r border-slate-200/80 dark:border-slate-800 pr-6 flex flex-col justify-center">
                    <Link
                      href="/services"
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 hover:bg-primary/5 border border-slate-200/60 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
                        <Image
                          src="/images/hero-restaurant.jpg"
                          alt="Tailored Technology"
                          fill
                          className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md inline-block">
                          SECTOR FOCUS
                        </span>
                        <div className="flex items-center gap-1 text-[13px] font-black text-slate-900 group-hover/card:text-primary transition-colors">
                          Tailored Technology <ArrowRight size={13} className="-rotate-45 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug">
                          Quantix adapts to the way your team serves, from counter to kitchen.
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Right Column: SERVICE TYPES (8 cols) */}
                  <div className="col-span-8 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                      SERVICE TYPES
                    </span>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      <Link href="/solutions/quick-service" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Quick Service Restaurants
                      </Link>
                      <Link href="/solutions/fine-dining" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Full Service Diners
                      </Link>
                      <Link href="/solutions/cafe-bakery" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Cafes & Bakeries
                      </Link>
                      <Link href="/solutions/quick-service" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Food Trucks & Mobile
                      </Link>
                      <Link href="/solutions/franchise" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Multi-Location Chains
                      </Link>
                      <Link href="/solutions/fashion-retail" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Retail & Boutiques
                      </Link>
                      <Link href="/solutions/grocery" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Grocery & Supermarkets
                      </Link>
                      <Link href="/sign-up/enterprise" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-primary hover:text-primary-dark transition-colors block">
                        Enterprise Custom Setup ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Integrations Mega Menu Dropdown */}
          <AnimatePresence>
            {openMegaMenu === 'Integrations' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Integrations')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Featured Card (4 cols) */}
                  <div className="col-span-4 border-r border-slate-200/80 dark:border-slate-800 pr-6 flex flex-col justify-center">
                    <Link
                      href="/integrations"
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 hover:bg-primary/5 border border-slate-200/60 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
                        <Image
                          src="/images/hero-cafe.jpg"
                          alt="Partner Ecosystem"
                          fill
                          className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md inline-block">
                          INSTANT 2-WAY SYNC
                        </span>
                        <div className="flex items-center gap-1 text-[13px] font-black text-slate-900 dark:text-white group-hover/card:text-primary transition-colors">
                          Integration Ecosystem <ArrowRight size={13} className="-rotate-45 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                          Connect Stripe, Authorize.Net, Square, PayPal, DoorDash & Uber Eats with zero code.
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Right Column: INTEGRATION PARTNERS (8 cols) */}
                  <div className="col-span-8 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                      SUPPORTED INTEGRATION PLATFORMS
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/integrations/stripe"
                        onClick={() => setOpenMegaMenu(null)}
                        className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all"
                      >
                        <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <CreditCard size={18} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">
                            Stripe Payments
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            Credit card & subscription sync
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/integrations/authorize-net"
                        onClick={() => setOpenMegaMenu(null)}
                        className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all"
                      >
                        <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                          <ShieldCheck size={18} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">
                            Authorize.Net
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            Enterprise Visa gateway & batching
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/integrations/square"
                        onClick={() => setOpenMegaMenu(null)}
                        className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all"
                      >
                        <div className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                          <Monitor size={18} className="text-sky-600 dark:text-sky-400" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">
                            Square POS
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            Terminal reader & catalog bridge
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/integrations/paypal"
                        onClick={() => setOpenMegaMenu(null)}
                        className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all"
                      >
                        <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                          <CreditCard size={18} className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">
                            PayPal Checkout
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            Express checkout & Venmo wallet
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/integrations/doordash"
                        onClick={() => setOpenMegaMenu(null)}
                        className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all"
                      >
                        <div className="h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                          <Truck size={18} className="text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">
                            DoorDash Drive
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            Direct kitchen ticket printing
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/integrations/uber-eats"
                        onClick={() => setOpenMegaMenu(null)}
                        className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all"
                      >
                        <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <Utensils size={18} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">
                            Uber Eats
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            Zero tablet order dispatch
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resources Mega Menu Dropdown */}
          <AnimatePresence>
            {(openMegaMenu === 'Resources' || openMegaMenu === 'Downloads') && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Resources')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Featured Card (4 cols) */}
                  <div className="col-span-4 border-r border-slate-200/80 dark:border-slate-800 pr-6 flex flex-col justify-center">
                    <Link
                      href="/help"
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 hover:bg-primary/5 border border-slate-200/60 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
                        <Image
                          src="/images/hero-cafe.jpg"
                          alt="Support Center"
                          fill
                          className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md inline-block">
                          KNOWLEDGE
                        </span>
                        <div className="flex items-center gap-1 text-[13px] font-black text-slate-900 group-hover/card:text-primary transition-colors">
                          Support Center <ArrowRight size={13} className="-rotate-45 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug">
                          Find setup guides, answers to popular questions, and tech specs.
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Right Column: LEARN & SUPPORT (8 cols) */}
                  <div className="col-span-8 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                      LEARN & SUPPORT
                    </span>
                    <div className="flex flex-col space-y-2.5">
                      <Link href="/faq" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Frequently Asked Questions
                      </Link>
                      <Link href="/help" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Help Guides & Documentation
                      </Link>
                      <Link href="/contact" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        Contact Customer Support
                      </Link>
                      <Link href="/downloads" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        App Downloads & Hardware Drivers
                      </Link>
                      <Link href="/status" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                        System Status & API Docs
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </nav>
      </div>

      {/* Full-Screen Slide Overlay for Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            className={cn(
              "fixed inset-x-0 bottom-0 z-40 overflow-hidden border-t border-slate-200/80 bg-slate-50 lg:hidden",
              scrolled ? "top-[44px] sm:top-[58px]" : "top-[70px] sm:top-[96px]"
            )}
          >
            {activeMobileSection ? (
              /* Drill-down Sub-Menu View */
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex h-full w-full flex-col overflow-y-auto overscroll-contain px-3.5 pt-3 pb-[calc(env(safe-area-inset-bottom)+112px)] min-[380px]:px-4 sm:px-5"
              >
                <div className="mx-auto flex w-full max-w-md flex-col gap-3.5">
                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={() => setMobileSubMenu(null)}
                    className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-primary/10 bg-white px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wider text-primary shadow-xs transition-colors hover:bg-primary/10"
                  >
                    <ArrowLeft size={14} /> Back to Main Menu
                  </button>

                  {/* Drill-down Header */}
                  <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                      Explore Category
                    </span>
                    <div className="mt-2 flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-primary">
                        {React.createElement(activeMobileSection.icon, { size: 17 })}
                      </span>
                      <div>
                        <h3 className="font-syne text-xl font-black uppercase leading-none text-slate-900">
                          {activeMobileSection.label}
                        </h3>
                        <p className="mt-1 text-xs font-medium leading-snug text-slate-500">
                          {activeMobileSection.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sub-items List per Category */}
                  <div className="space-y-4">
                    {activeMobileSection.groups.map((group) => (
                      <div key={group.title} className="space-y-2">
                        <span className="block px-1 text-[10px] font-extrabold uppercase tracking-widest text-primary">
                          {group.title}
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {group.items.map((item) => {
                            const ItemIcon = item.icon;
                            const isItemActive = isMenuHrefActive(item.href);

                            return (
                              <Link
                                key={`${group.title}-${item.title}`}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={cn(
                                  "group/item relative flex min-h-[108px] flex-col justify-between rounded-lg border p-3 text-left shadow-xs transition-all hover:border-primary/35 hover:bg-primary/5 active:scale-[0.99]",
                                  isItemActive
                                    ? "border-primary/40 bg-primary/10 text-primary"
                                    : "border-slate-200/80 bg-white text-slate-900"
                                )}
                              >
                                <span className="flex items-start justify-between gap-2">
                                  <span
                                    className={cn(
                                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors group-hover/item:bg-primary group-hover/item:text-white",
                                      isItemActive
                                        ? "border-primary bg-primary text-white"
                                        : "border-primary/15 bg-primary/10 text-primary"
                                    )}
                                  >
                                    <ItemIcon size={15} />
                                  </span>
                                  <ChevronRight
                                    size={14}
                                    className={cn(
                                      "shrink-0 transition-transform group-hover/item:translate-x-0.5",
                                      isItemActive ? "text-primary" : "text-slate-300 group-hover/item:text-primary"
                                    )}
                                  />
                                </span>
                                <span className="mt-2 block min-w-0">
                                  <span
                                    className={cn(
                                      "block font-syne text-[11px] font-black uppercase leading-tight",
                                      isItemActive ? "text-primary" : "text-slate-900"
                                    )}
                                  >
                                    {item.title}
                                  </span>
                                  <span className="mt-1 block text-[10px] font-medium leading-snug text-slate-500 line-clamp-2">
                                    {item.desc}
                                  </span>
                                  {item.badge && (
                                    <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-black text-primary">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                {/* Primary Category Page Link Button */}
                <Link
                  href={activeMobileSection.href}
                  onClick={closeMobileMenu}
                  className="mt-1 flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-light"
                >
                  View Main {activeMobileSection.label} Page <ArrowRight size={14} />
                </Link>
                </div>
              </motion.div>
            ) : (
              /* Main Mobile Menu */
              <div className="h-full overflow-y-auto overscroll-contain px-3.5 pt-3 pb-[calc(env(safe-area-inset-bottom)+112px)] min-[380px]:px-4 sm:px-5">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="mx-auto flex w-full max-w-md flex-col gap-2.5"
                >
                  <div className="mb-0.5 flex items-center justify-between px-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Navigation
                    </span>
                    <span className="rounded-full border border-primary/10 bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary shadow-xs">
                      POS Platform
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {MOBILE_MENU_SECTIONS.map((link, index) => {
                      const isActive = isMobileSectionActive(link);
                      const LinkIcon = link.icon;

                      return (
                        <motion.div
                          key={link.href}
                          variants={itemVariants}
                          className={cn(index === MOBILE_MENU_SECTIONS.length - 1 && "col-span-2")}
                        >
                          <button
                            type="button"
                            onClick={() => setMobileSubMenu(link.label)}
                            aria-label={`Open ${link.label} menu`}
                            className={cn(
                              'group/nav relative flex min-h-[112px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg border p-3 text-left shadow-xs transition-all duration-200 active:scale-[0.99]',
                              isActive
                                ? 'border-primary/45 bg-primary/10 text-primary shadow-primary/10'
                                : 'border-slate-200/80 bg-white text-slate-900 hover:border-primary/30 hover:bg-primary/5'
                            )}
                          >
                            <span className="flex items-start justify-between gap-2">
                              <span className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                isActive
                                  ? "border-primary bg-primary text-white"
                                  : "border-primary/15 bg-primary/10 text-primary group-hover/nav:bg-primary group-hover/nav:text-white"
                              )}>
                                <LinkIcon size={17} />
                              </span>
                              <span className={cn(
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all",
                                isActive
                                  ? "border-primary/25 bg-white/80 text-primary"
                                  : "border-slate-200 text-slate-400 group-hover/nav:border-primary/20 group-hover/nav:text-primary"
                              )}>
                                <ChevronRight size={14} className="transition-transform group-hover/nav:translate-x-0.5" />
                              </span>
                            </span>
                            <span className="mt-3 block min-w-0">
                              <span className={cn(
                                'block font-syne text-[13px] font-black uppercase leading-tight tracking-tight transition-colors duration-200',
                                isActive ? 'text-primary' : 'text-slate-900'
                              )}>
                                {link.label}
                              </span>
                              <span className="mt-1 block text-[10px] font-medium leading-snug tracking-normal text-slate-500 normal-case line-clamp-2">
                                {link.desc}
                              </span>
                            </span>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Quick Tools Grid */}
                  <motion.div variants={itemVariants} className="mt-1 space-y-2 border-t border-slate-200/70 pt-3">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">
                      Tools & Resources
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_MOBILE_TOOLS.map((tool) => {
                        const ToolIcon = tool.icon;

                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={closeMobileMenu}
                            className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-700 shadow-xs transition-all hover:border-primary/25 hover:bg-primary/5 hover:text-primary min-[380px]:text-[11px]"
                          >
                            <ToolIcon size={13} className="shrink-0 text-primary" />
                            {tool.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Bottom Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mx-auto mt-4 flex w-full max-w-md flex-col gap-2.5 border-t border-slate-200/70 pt-3"
                >
                  {token ? (
                    <>
                      <div className="flex items-center gap-2.5 justify-center rounded-lg border border-slate-200/80 bg-white py-2.5 shadow-xs select-none">
                        <User size={15} className="text-primary" />
                        <span className="text-[13px] font-bold tracking-wider uppercase text-slate-800">
                          Hi, {meData?.data?.username || meData?.username || "Admin"}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          handleLogout();
                        }}
                        className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-md shadow-red-600/15 transition-all duration-200 hover:bg-red-700"
                      >
                        <LogOut size={15} />
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/sign-up"
                        onClick={closeMobileMenu}
                        className="flex h-11 items-center justify-center rounded-lg bg-primary text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-light"
                      >
                        Start Free Trial
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/sign-in"
                          onClick={closeMobileMenu}
                          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-800 shadow-xs transition-all duration-200 hover:bg-slate-50 active:bg-slate-100"
                        >
                          <LogIn size={14} /> Sign In
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            closeMobileMenu();
                            openModal();
                          }}
                          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 text-[12px] font-extrabold uppercase tracking-[0.08em] text-primary shadow-xs transition-all duration-200 hover:bg-primary/15"
                        >
                          <Headset size={14} /> Contact
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

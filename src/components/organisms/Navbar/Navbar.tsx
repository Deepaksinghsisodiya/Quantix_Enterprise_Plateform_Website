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
  { title: 'Order Kiosks Integration', icon: Tablet, desc: 'Self-checkout guest screens', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Online Ordering Portal', icon: Globe, desc: 'Web and mobile customer app', slug: 'table-management', image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&w=120&h=120&q=80' },
  { title: 'Kitchen Display Systems', icon: Tv, desc: 'Real-time kitchen order sync', slug: 'table-management', image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=120&h=120&q=80' },
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
  { title: 'Customer Loyalty Tiers', icon: Award, desc: 'Points, rewards campaigns', slug: 'smart-inventory', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=120&h=120&q=80' }
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

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full flex flex-col">
        {/* Top Promo Banner - Smooth CSS Collapse on Scroll */}
        <div className={cn(
          "w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 text-center text-[11px] sm:text-[13px] font-sans font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 select-none transition-all duration-300 ease-out overflow-hidden",
          scrolled ? "max-h-0 opacity-0 py-0 border-b-0" : "max-h-10 py-1.5 px-3 opacity-100"
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
            scrolled ? "shadow-md shadow-slate-900/5 py-2 sm:py-2.5" : "shadow-sm py-2.5 sm:py-3"
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
                  className="block lg:hidden h-[30px] sm:h-[34px] w-auto transition-all duration-300 group-hover:scale-[1.02]"
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
                    'flex flex-col justify-center items-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none',
                    useWhiteText ? 'text-white' : 'text-slate-800'
                  )}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileOpen}
                  onClick={toggleMobile}
                >
                  <span className={cn(
                    "w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-out",
                    mobileOpen ? "rotate-45 translate-y-[5px]" : ""
                  )} />
                  <span className={cn(
                    "w-5 h-[2px] bg-current rounded-full my-[3px] transition-all duration-300 ease-out",
                    mobileOpen ? "opacity-0 scale-x-0" : ""
                  )} />
                  <span className={cn(
                    "w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-out",
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

                  {/* Right Columns: 3 Categorized Columns (8 cols) */}
                  <div className="col-span-8 grid grid-cols-3 gap-6">
                    {/* Column 1: ORDERING CHANNELS */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                        ORDERING CHANNELS
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <Link href="/features/offline-registers" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-primary hover:text-primary-dark transition-colors block">
                          Point of Sale (POS)
                        </Link>
                        <Link href="/features/table-management" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-primary hover:text-primary-dark transition-colors block">
                          Online Ordering
                        </Link>
                        <Link href="/features/smart-inventory" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Self-Service Kiosk
                        </Link>
                        <Link href="/features/table-management" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          QR Code Ordering
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: MANAGEMENT & OPS */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                        MANAGEMENT & OPS
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <Link href="/features/table-management" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Kitchen Display System
                        </Link>
                        <Link href="/features/smart-inventory" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Delivery Management
                        </Link>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[13px] font-bold text-slate-500">Restaurant Owner App</span>
                          <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">COMING SOON</span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[13px] font-bold text-slate-500">Digital Menu Boards</span>
                          <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">COMING SOON</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: GROWTH SERVICES */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none px-1">
                        GROWTH SERVICES
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <Link href="/pci" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Secure Payments
                        </Link>
                        <Link href="/features/smart-inventory" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
                          Marketing & Loyalty
                        </Link>
                        <Link href="/solutions/franchise" onClick={() => setOpenMegaMenu(null)} className="group/link text-[13px] font-bold text-slate-700 hover:text-primary transition-colors block">
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
            className="fixed inset-0 z-40 bg-white flex flex-col justify-between pt-[68px] sm:pt-20 pb-5 px-5 lg:hidden overflow-y-auto max-h-screen"
          >
            {mobileSubMenu ? (
              /* Drill-down Sub-Menu View */
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 w-full max-w-md mx-auto pt-1 pb-3"
              >
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setMobileSubMenu(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl w-fit transition-colors cursor-pointer"
                >
                  <ArrowLeft size={14} /> Back to Main Menu
                </button>

                {/* Drill-down Header */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-500">
                    EXPLORE CATEGORY
                  </span>
                  <h3 className="text-xl font-syne font-black uppercase text-slate-900">
                    {mobileSubMenu}
                  </h3>
                </div>

                {/* Sub-items List per Category */}
                <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                  {(mobileSubMenu === 'Products' || mobileSubMenu === 'Features') && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block">Ordering Channels</span>
                        <Link href="/features/offline-registers" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                          <span className="text-xs font-bold text-slate-900 uppercase font-syne">Point of Sale (POS)</span>
                          <span className="text-[11px] text-slate-500 font-medium">Offline-first register billing</span>
                        </Link>
                        <Link href="/features/table-management" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                          <span className="text-xs font-bold text-slate-900 uppercase font-syne">Online Ordering</span>
                          <span className="text-[11px] text-slate-500 font-medium">Branded web and mobile app</span>
                        </Link>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block">Management & Ops</span>
                        <Link href="/features/table-management" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                          <span className="text-xs font-bold text-slate-900 uppercase font-syne">Kitchen Display System</span>
                          <span className="text-[11px] text-slate-500 font-medium">Real-time order sync</span>
                        </Link>
                        <Link href="/features/smart-inventory" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                          <span className="text-xs font-bold text-slate-900 uppercase font-syne">Delivery Management</span>
                          <span className="text-[11px] text-slate-500 font-medium">Live order tracking</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  {mobileSubMenu === 'Integrations' && (
                    <div className="space-y-2.5">
                      <Link href="/integrations" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">POS Integrations (EPX, Keptu, Pine Labs)</span>
                        <span className="text-[11px] text-slate-500 font-medium">Hardware terminal sync</span>
                      </Link>
                      <Link href="/integrations" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">Ordering Integrations (WooCommerce, Shopify)</span>
                        <span className="text-[11px] text-slate-500 font-medium">E-Commerce channel sync</span>
                      </Link>
                      <Link href="/integrations" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">Delivery Partners (DoorDash Drive)</span>
                        <span className="text-[11px] text-slate-500 font-medium">Automatic delivery dispatch</span>
                      </Link>
                    </div>
                  )}

                  {(mobileSubMenu === 'Solutions' || mobileSubMenu === 'Services') && (
                    <div className="space-y-2.5">
                      <Link href="/solutions/quick-service" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">Quick Service Restaurants</span>
                        <span className="text-[11px] text-slate-500 font-medium">Fast billing & kiosks</span>
                      </Link>
                      <Link href="/solutions/fine-dining" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">Full Service Diners</span>
                        <span className="text-[11px] text-slate-500 font-medium">Visual table mapping</span>
                      </Link>
                      <Link href="/solutions/franchise" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">Multi-Location Chains</span>
                        <span className="text-[11px] text-slate-500 font-medium">Enterprise multi-tenant hub</span>
                      </Link>
                    </div>
                  )}

                  {(mobileSubMenu === 'Resources' || mobileSubMenu === 'Downloads') && (
                    <div className="space-y-2.5">
                      <Link href="/faq" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">Frequently Asked Questions</span>
                        <span className="text-[11px] text-slate-500 font-medium">Common questions & answers</span>
                      </Link>
                      <Link href="/help" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">Help Guides & Documentation</span>
                        <span className="text-[11px] text-slate-500 font-medium">Setup guides & API specs</span>
                      </Link>
                      <Link href="/downloads" onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }} className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-slate-900 uppercase font-syne">App Downloads & Drivers</span>
                        <span className="text-[11px] text-slate-500 font-medium">POS terminal installers</span>
                      </Link>
                    </div>
                  )}

                  {(mobileSubMenu === 'Pricing' || mobileSubMenu === 'Pricing Plans') && (
                    <div className="space-y-2.5">
                      {PRICING_LIST.map((item) => (
                        <Link
                          key={item.title}
                          href="/pricing"
                          onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                          className="flex flex-col p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 uppercase font-syne">{item.title}</span>
                            <span className="text-xs font-black text-primary">{item.price}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium mt-1">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Primary Category Page Link Button */}
                <Link
                  href={
                    (mobileSubMenu === 'Products' || mobileSubMenu === 'Features') ? '/features' :
                      mobileSubMenu === 'Integrations' ? '/integrations' :
                        (mobileSubMenu === 'Solutions' || mobileSubMenu === 'Services') ? '/services' :
                          (mobileSubMenu === 'Resources' || mobileSubMenu === 'Downloads') ? '/resources' : '/pricing'
                  }
                  onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-primary hover:bg-primary-light text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-primary/20 transition-all mt-2"
                >
                  View Main {mobileSubMenu} Page <ArrowRight size={14} />
                </Link>
              </motion.div>
            ) : (
              /* Main Mobile Menu */
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-1 w-full max-w-md mx-auto pt-1 pb-3"
                >
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1 px-1">
                    Navigation
                  </div>

                  {LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.href} variants={itemVariants}>
                        <button
                          type="button"
                          onClick={() => setMobileSubMenu(link.label)}
                          className={cn(
                            'w-full text-left flex flex-col gap-0.5 py-2.5 px-3.5 rounded-xl transition-all duration-200 cursor-pointer',
                            isActive
                              ? 'bg-blue-50 border border-blue-100 text-blue-600'
                              : 'hover:bg-slate-50 border border-transparent'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              'text-[15px] font-syne font-bold tracking-tight uppercase transition-colors duration-200',
                              isActive ? 'text-blue-600' : 'text-slate-900'
                            )}>
                              {link.label}
                            </span>
                            <ChevronRight size={14} className={cn("transition-transform", isActive ? "text-blue-600" : "text-slate-400")} />
                          </div>
                          <span className="text-[12px] text-slate-500 font-medium tracking-normal normal-case">
                            {link.desc}
                          </span>
                        </button>
                      </motion.div>
                    );
                  })}

                  {/* Quick Tools Grid */}
                  <motion.div variants={itemVariants} className="pt-3 border-t border-slate-100 mt-2 space-y-2">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">
                      Tools & Resources
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'ROI Calculator', href: '/roi-calculator' },
                        { label: 'Solution Quiz', href: '/quiz' },
                        { label: 'Product Tour', href: '/product-tour' },
                        { label: 'Help Centre', href: '/help' },
                      ].map((tool, idx) => (
                        <Link
                          key={idx}
                          href={tool.href}
                          onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                          className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl py-2.5 px-3 text-center transition-all"
                        >
                          {tool.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Bottom Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex flex-col gap-2.5 w-full max-w-md mx-auto pt-3 border-t border-slate-100"
                >
                  {token ? (
                    <>
                      <div className="flex items-center gap-2.5 justify-center py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 select-none">
                        <User size={15} className="text-blue-600" />
                        <span className="text-[13px] font-bold tracking-wider uppercase text-slate-800">
                          Hi, {meData?.data?.username || meData?.username || "Admin"}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileSubMenu(null);
                          handleLogout();
                        }}
                        className="flex items-center justify-center gap-2 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-[13px] uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer shadow-md shadow-red-600/15"
                      >
                        <LogOut size={15} />
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/sign-up"
                        onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                        className="flex items-center justify-center h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold text-[13px] uppercase tracking-[0.08em] transition-all duration-200 shadow-lg shadow-blue-600/20"
                      >
                        Start Free Trial
                      </Link>
                      <Link
                        href="/sign-in"
                        onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                        className="flex items-center justify-center h-11 rounded-xl text-[13px] font-bold uppercase tracking-[0.08em] border border-slate-200 text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all duration-200 shadow-xs"
                      >
                        Sign In
                      </Link>
                    </>
                  )}
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

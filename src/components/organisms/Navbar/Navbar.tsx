'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, LogOut, User, ChevronDown, ChevronRight, ArrowLeft, ArrowRight, Monitor, Tablet, Globe, Tv, Smartphone, CreditCard, Scan, Printer, RefreshCw, BarChart3, MessageSquare, Grid, Award, Store, Utensils, ShoppingBag, Coffee, Truck, Download, Server, Laptop, ShieldCheck, Check, Sparkles, Headset, LogIn } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetMeQuery } from '@/features/Login/Service/LoginService';
import { logout } from '@/redux/slices/authSlice';
import { useIndustry } from '@/context/IndustryContext';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

// Nav link definition with description for premium mobile view
interface NavLink {
  label: string;
  href: string;
  desc: string;
}

const LINKS: NavLink[] = [
  { label: 'Features', href: '/features', desc: 'Smarter retail, restaurant, and cloud POS tools' },
  { label: 'Integrations', href: '/integrations', desc: 'Connect payment terminals, delivery platforms, and tools' },
  { label: 'Downloads', href: '/downloads', desc: 'Download register terminals and sync services' },
  { label: 'Pricing', href: '/pricing', desc: 'Flexible plans tailored to your business scale' },
  { label: 'Services', href: '/services', desc: 'Enterprise retail setup, installation, and integration services' },
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
        {/* Top Promo Banner */}
        <div className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 py-1.5 px-3 text-center text-[11px] sm:text-[13px] font-sans font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 select-none">
          <span className="truncate max-w-[220px] sm:max-w-none">Get 3 Months FREE Quantix Cloud POS</span>
          <span className="text-slate-350 dark:text-slate-700 mx-0.5 sm:mx-1">|</span>
          <Link
            href="/pricing"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-bold inline-flex items-center gap-0.5 hover:underline transition-colors shrink-0"
          >
            Book Now <ChevronRight size={12} className="stroke-[3]" />
          </Link>
        </div>

        <nav
          className="w-full bg-white border-b border-slate-200/80 shadow-sm py-2.5 sm:py-3 relative"
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
                  const isDropdown = ['Features', 'Integrations', 'Downloads', 'Pricing', 'Services'].includes(link.label);
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
                    <Link
                      href="/sign-in"
                      className="group flex items-center justify-center gap-1.5 h-10 px-4.5 rounded-lg border border-slate-200 hover:border-slate-300 dark:border-slate-800 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-sm"
                    >
                      <LogIn size={14} className="text-slate-400 group-hover:text-slate-650 transition-colors" />
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="flex items-center justify-center h-10 px-5.5 rounded-lg bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.06] active:scale-95 shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/35 animate-pulse-subtle"
                    >
                      Start Free Trial
                    </Link>
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
            {openMegaMenu === 'Features' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Features')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Featured Card (4 cols) */}
                  <div className="col-span-4 border-r border-slate-100 dark:border-slate-800 pr-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md inline-block select-none">
                        Featured Platform
                      </span>
                      
                      {/* Interactive Diagram SVG */}
                      <Link
                        href="/features"
                        onClick={() => setOpenMegaMenu(null)}
                        className="relative block aspect-video rounded-2xl bg-slate-50/30 hover:bg-slate-50/80 dark:bg-slate-900/30 dark:hover:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary dark:hover:border-primary transition-all duration-300 overflow-hidden p-2 group/diagram cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <svg className="w-full h-full max-h-[140px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Pulsing lines */}
                          <line x1="100" y1="60" x2="40" y2="30" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
                          <line x1="100" y1="60" x2="160" y2="30" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
                          <line x1="100" y1="60" x2="40" y2="90" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
                          <line x1="100" y1="60" x2="160" y2="90" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
                          
                          {/* Outer Nodes */}
                          <circle cx="40" cy="30" r="12" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <path d="M37 27 H43 V33 H37 Z" stroke="#00A69C" strokeWidth="1.5" fill="none" />
                          
                          <circle cx="160" cy="30" r="12" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <circle cx="160" cy="30" r="4" fill="#00A69C" />
                          
                          <circle cx="40" cy="90" r="12" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <path d="M36 90 L40 86 L44 90" stroke="#00A69C" strokeWidth="1.5" fill="none" />
                          
                          <circle cx="160" cy="90" r="12" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <path d="M156 90 H164 M160 86 V94" stroke="#00A69C" strokeWidth="1.5" fill="none" />
                          
                          {/* Center Node */}
                          <circle cx="100" cy="60" r="16" fill="#00A69C" className="drop-shadow-md" />
                          <circle cx="100" cy="60" r="8" fill="#FFFFFF" />
                          <circle cx="100" cy="60" r="4" fill="#00A69C" />
                        </svg>
                      </Link>

                      <div className="space-y-1">
                        <Link
                          href="/features"
                          onClick={() => setOpenMegaMenu(null)}
                          className="group/featlink inline-flex items-center gap-1 text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wide hover:text-primary transition-colors"
                        >
                          All-In-One POS Ecosystem <ChevronRight size={14} className="stroke-[2.5] transform transition-transform group-hover/featlink:translate-x-1" />
                        </Link>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          Explore our offline-first registers, mobile tableside ordering tablets, and centralized cloud dashboard sync.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Columns: Explore lists (8 cols) */}
                  <div className="col-span-8 grid grid-cols-2 gap-8">
                    {/* Column 1: Explore Products */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none">
                        Explore Products
                      </span>
                      <div className="flex flex-col space-y-3.5">
                        {PRODUCTS_LIST.map((item) => (
                          <Link
                            key={item.title}
                            href={`/features/${item.slug}`}
                            onClick={() => setOpenMegaMenu(null)}
                            className="group/item block text-left"
                          >
                            <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200 group-hover/item:text-primary transition-colors block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold block mt-0.5 leading-tight">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Operations */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none">
                        Operations & Control
                      </span>
                      <div className="flex flex-col space-y-3.5">
                        {OPERATIONS_LIST.map((item) => (
                          <Link
                            key={item.title}
                            href={`/features/${item.slug}`}
                            onClick={() => setOpenMegaMenu(null)}
                            className="group/item block text-left"
                          >
                            <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200 group-hover/item:text-primary transition-colors block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold block mt-0.5 leading-tight">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Services Mega Menu Dropdown */}
          <AnimatePresence>
            {openMegaMenu === 'Services' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Services')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Featured Card (4 cols) */}
                  <div className="col-span-4 border-r border-slate-100 dark:border-slate-800 pr-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md inline-block select-none">
                        Our Services
                      </span>
                      
                      {/* Services Diagram SVG */}
                      <Link
                        href="/services"
                        onClick={() => setOpenMegaMenu(null)}
                        className="relative block aspect-video rounded-2xl bg-slate-50/30 hover:bg-slate-50/80 dark:bg-slate-900/30 dark:hover:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary dark:hover:border-primary transition-all duration-300 overflow-hidden p-2 group/diagram cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <svg className="w-full h-full max-h-[140px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="60" cy="60" r="20" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <circle cx="140" cy="60" r="20" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <line x1="80" y1="60" x2="120" y2="60" stroke="#00A69C" strokeWidth="2" />
                          <circle cx="60" cy="60" r="6" fill="#00A69C" />
                          <circle cx="140" cy="60" r="6" fill="#00A69C" />
                        </svg>
                      </Link>

                      <div className="space-y-1">
                        <Link
                          href="/services"
                          onClick={() => setOpenMegaMenu(null)}
                          className="group/featlink inline-flex items-center gap-1 text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wide hover:text-primary transition-colors"
                        >
                          POS Solutions & Industries <ChevronRight size={14} className="stroke-[2.5] transform transition-transform group-hover/featlink:translate-x-1" />
                        </Link>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          Tailored POS systems with custom layouts, modifiers, and features crafted specifically for retail and restaurants.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Columns: Services list (8 cols) */}
                  <div className="col-span-8">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-4 select-none">
                      Explore Industries
                    </span>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col space-y-3.5">
                        {SERVICES_LIST.map((item) => (
                          <Link
                            key={item.title}
                            href={`/solutions/${item.slug}`}
                            onClick={() => setOpenMegaMenu(null)}
                            className="group/item block text-left"
                          >
                            <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200 group-hover/item:text-primary transition-colors block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold block mt-0.5 leading-tight">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
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
                className="absolute top-full left-0 right-0 mt-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Integrations')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Featured Card (4 cols) */}
                  <div className="col-span-4 border-r border-slate-100 dark:border-slate-800 pr-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md inline-block select-none">
                        Featured Integration
                      </span>
                      
                      {/* Schematic Graphic SVG */}
                      <Link
                        href="/integrations"
                        onClick={() => setOpenMegaMenu(null)}
                        className="relative block aspect-video rounded-2xl bg-slate-50/30 hover:bg-slate-50/80 dark:bg-slate-900/30 dark:hover:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary dark:hover:border-primary transition-all duration-300 overflow-hidden p-2 group/diagram cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <svg className="w-full h-full max-h-[140px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Central Plug Icon in circle connected to others */}
                          <line x1="100" y1="60" x2="30" y2="60" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="100" y1="60" x2="170" y2="60" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="100" y1="60" x2="100" y2="15" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="100" y1="60" x2="100" y2="105" stroke="#00A69C" strokeWidth="1.5" strokeDasharray="3 3" />
                          
                          {/* Outer Nodes */}
                          <circle cx="30" cy="60" r="10" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <circle cx="30" cy="60" r="3" fill="#00A69C" />
                          
                          <circle cx="170" cy="60" r="10" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <circle cx="170" cy="60" r="3" fill="#00A69C" />
                          
                          <circle cx="100" cy="15" r="10" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <circle cx="100" cy="15" r="3" fill="#00A69C" />
                          
                          <circle cx="100" cy="105" r="10" fill="#E6F6F5" className="dark:fill-slate-800" />
                          <circle cx="100" cy="105" r="3" fill="#00A69C" />
                          
                          {/* Center Node */}
                          <circle cx="100" cy="60" r="15" fill="#00A69C" className="drop-shadow-md" />
                          <path d="M96 60 H104 M100 56 V64" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </Link>

                      <div className="space-y-1">
                        <Link
                          href="/integrations"
                          onClick={() => setOpenMegaMenu(null)}
                          className="group/featlink inline-flex items-center gap-1 text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wide hover:text-primary transition-colors"
                        >
                          Third-Party Integrations <ChevronRight size={14} className="stroke-[2.5] transform transition-transform group-hover/featlink:translate-x-1" />
                        </Link>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          Connect Xero Accounting, DoorDash delivery, and Stripe card terminals in a single unified POS dashboard.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Columns: Finance and Delivery lists (8 cols) */}
                  <div className="col-span-8 grid grid-cols-2 gap-8">
                    {/* Column 1: Payments & Accounting */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none">
                        Finance & Accounting
                      </span>
                      <div className="flex flex-col space-y-3.5">
                        {INTEGRATIONS_FINANCE.map((item) => (
                          <Link
                            key={item.title}
                            href="/integrations"
                            onClick={() => setOpenMegaMenu(null)}
                            className="group/item block text-left"
                          >
                            <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200 group-hover/item:text-primary transition-colors block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold block mt-0.5 leading-tight">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Delivery & Sales */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-2 select-none">
                        Delivery & E-Commerce
                      </span>
                      <div className="flex flex-col space-y-3.5">
                        {INTEGRATIONS_OPERATIONS.map((item) => (
                          <Link
                            key={item.title}
                            href="/integrations"
                            onClick={() => setOpenMegaMenu(null)}
                            className="group/item block text-left"
                          >
                            <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200 group-hover/item:text-primary transition-colors block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold block mt-0.5 leading-tight">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Downloads Mega Menu Dropdown */}
          <AnimatePresence>
            {openMegaMenu === 'Downloads' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Downloads')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Featured Card (4 cols) */}
                  <div className="col-span-4 border-r border-slate-100 dark:border-slate-800 pr-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md inline-block select-none">
                        Downloads Hub
                      </span>
                      
                      {/* Laptop Sync Icon SVG */}
                      <Link
                        href="/downloads"
                        onClick={() => setOpenMegaMenu(null)}
                        className="relative block aspect-video rounded-2xl bg-slate-50/30 hover:bg-slate-50/80 dark:bg-slate-900/30 dark:hover:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary dark:hover:border-primary transition-all duration-300 overflow-hidden p-2 group/diagram cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <svg className="w-full h-full max-h-[140px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="50" y="30" width="100" height="55" rx="4" stroke="#00A69C" strokeWidth="2" fill="none" />
                          <line x1="30" y1="85" x2="170" y2="85" stroke="#00A69C" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M90 50 L100 62 L110 50 M100 38 V60" stroke="#00A69C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>

                      <div className="space-y-1">
                        <Link
                          href="/downloads"
                          onClick={() => setOpenMegaMenu(null)}
                          className="group/featlink inline-flex items-center gap-1 text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wide hover:text-primary transition-colors"
                        >
                          Quantix POS Terminals <ChevronRight size={14} className="stroke-[2.5] transform transition-transform group-hover/featlink:translate-x-1" />
                        </Link>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          Download Windows, Linux registers, and the local database synchronization coordinator background service.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Columns: Downloads lists (8 cols) */}
                  <div className="col-span-8">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-4 select-none">
                      Available Installers
                    </span>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col space-y-4">
                        {DOWNLOADS_LIST.map((item) => (
                          <Link
                            key={item.title}
                            href="/downloads"
                            onClick={() => setOpenMegaMenu(null)}
                            className="group/item block text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200 group-hover/item:text-primary transition-colors block">
                                {item.title}
                              </span>
                              <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded uppercase">
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-semibold block mt-1 leading-relaxed">
                              {item.desc} — {item.size}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pricing Mega Menu Dropdown */}
          <AnimatePresence>
            {openMegaMenu === 'Pricing' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xl py-8 z-50 text-left overflow-hidden"
                onMouseEnter={() => setOpenMegaMenu('Pricing')}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="site-container grid grid-cols-12 gap-8">
                  {/* Left Column: Offers & Trial (4 cols) */}
                  <div className="col-span-4 border-r border-slate-100 pr-8 space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Pricing Support</span>

                    {/* Card 1: Start Free Trial */}
                    <Link
                      href="/sign-up"
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex flex-col p-4 rounded-2xl bg-white hover:bg-slate-50 transition-all duration-300 border border-slate-200/80 hover:border-primary hover:shadow-sm"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold uppercase text-slate-800 group-hover/card:text-blue-600 transition-colors">3-Day Free Trial</span>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">No Card</span>
                      </div>
                      <p className="text-[13px] text-slate-500 mt-1.5 font-medium leading-relaxed">
                        Get instant access to cloud databases, custom catalog exports, and sync dashboard tools.
                      </p>
                    </Link>

                    {/* Card 2: Contact Sales */}
                    <Link
                      href="/contact/sales"
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex flex-col p-4 rounded-2xl bg-white hover:bg-slate-50 transition-all duration-300 border border-slate-200/80 hover:border-primary hover:shadow-sm"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold uppercase text-slate-800 group-hover/card:text-blue-600 transition-colors">Custom Deployment</span>
                        <span className="text-[10px] text-blue-600 font-bold uppercase bg-blue-500/10 px-1.5 py-0.5 rounded">Enterprise</span>
                      </div>
                      <p className="text-[13px] text-slate-500 mt-1.5 font-medium leading-relaxed">
                        Need dedicated SLA uptime contracts, custom webhooks, or localized on-site installation help?
                      </p>
                    </Link>
                  </div>

                  {/* Right Columns (8 cols): 3 columns of pricing plans */}
                  <div className="col-span-8 grid grid-cols-3 gap-6">
                    {PRICING_LIST.map((item) => (
                      <Link
                        key={item.title}
                        href="/pricing"
                        onClick={() => setOpenMegaMenu(null)}
                        className={cn(
                          "group/card flex flex-col justify-between p-5 rounded-2xl transition-all duration-300 border border-slate-200/80 hover:border-primary hover:shadow-sm relative bg-white",
                          item.popular && "bg-emerald-50/20 hover:bg-emerald-50/30 border-emerald-300/60 hover:border-primary"
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                              item.popular
                                ? "text-blue-600 bg-blue-500/10"
                                : "text-slate-500 bg-slate-100"
                            )}>
                              {item.badge}
                            </span>
                          </div>
                          <div className="mt-4">
                            <span className="text-[15px] font-bold text-slate-800 group-hover/card:text-primary transition-colors block leading-tight">
                              {item.title}
                            </span>
                            <p className="text-[13px] text-slate-500 mt-1.5 font-medium leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                          <span className="text-lg font-black text-slate-900">{item.price}</span>
                          <span className="text-xs font-bold text-primary group-hover/card:underline">Select &rarr;</span>
                        </div>
                      </Link>
                    ))}
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
                  {mobileSubMenu === 'Features' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Products & Terminals</span>
                        {PRODUCTS_LIST.map((item) => (
                          <Link
                            key={item.title}
                            href={`/features/${item.slug}`}
                            onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                            className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all"
                          >
                            <span className="text-xs font-bold text-slate-900 uppercase font-syne">{item.title}</span>
                            <span className="text-[11px] text-slate-500 font-medium">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Operations & Control</span>
                        {OPERATIONS_LIST.map((item) => (
                          <Link
                            key={item.title}
                            href={`/features/${item.slug}`}
                            onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                            className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all"
                          >
                            <span className="text-xs font-bold text-slate-900 uppercase font-syne">{item.title}</span>
                            <span className="text-[11px] text-slate-500 font-medium">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {mobileSubMenu === 'Integrations' && (
                    <div className="space-y-2.5">
                      {[...INTEGRATIONS_FINANCE, ...INTEGRATIONS_OPERATIONS].map((item) => (
                        <Link
                          key={item.title}
                          href="/integrations"
                          onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                          className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all"
                        >
                          <span className="text-xs font-bold text-slate-900 uppercase font-syne">{item.title}</span>
                          <span className="text-[11px] text-slate-500 font-medium">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {mobileSubMenu === 'Services' && (
                    <div className="space-y-2.5">
                      {SERVICES_LIST.map((item) => (
                        <Link
                          key={item.title}
                          href={`/solutions/${item.slug}`}
                          onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                          className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all"
                        >
                          <span className="text-xs font-bold text-slate-900 uppercase font-syne">{item.title}</span>
                          <span className="text-[11px] text-slate-500 font-medium">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {mobileSubMenu === 'Downloads' && (
                    <div className="space-y-2.5">
                      {DOWNLOADS_LIST.map((item) => (
                        <Link
                          key={item.title}
                          href="/downloads"
                          onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                          className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 uppercase font-syne">{item.title}</span>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.badge}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium mt-1">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {mobileSubMenu === 'Pricing' && (
                    <div className="space-y-2.5">
                      {PRICING_LIST.map((item) => (
                        <Link
                          key={item.title}
                          href="/pricing"
                          onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                          className="flex flex-col p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 uppercase font-syne">{item.title}</span>
                            <span className="text-xs font-black text-blue-600">{item.price}</span>
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
                    mobileSubMenu === 'Features' ? '/features' :
                    mobileSubMenu === 'Integrations' ? '/integrations' :
                    mobileSubMenu === 'Services' ? '/services' :
                    mobileSubMenu === 'Downloads' ? '/downloads' : '/pricing'
                  }
                  onClick={() => { setMobileOpen(false); setMobileSubMenu(null); }}
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all mt-2"
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

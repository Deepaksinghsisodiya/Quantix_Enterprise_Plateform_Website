'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, LogOut, User, ChevronDown, Monitor, Tablet, Globe, Tv, Smartphone, CreditCard, Scan, Printer, RefreshCw, BarChart3, MessageSquare, Grid, Award, Store, Utensils, ShoppingBag, Coffee, Truck } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetMeQuery } from '@/features/Login/Service/LoginService';
import { logout } from '@/redux/slices/authSlice';
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
  { title: 'Point of Sale (EPOS)', icon: Monitor, desc: 'Offline-first terminal billing', slug: 'offline-registers' },
  { title: 'Order Kiosks Integration', icon: Tablet, desc: 'Self-checkout guest screens', slug: 'smart-inventory' },
  { title: 'Online Ordering Portal', icon: Globe, desc: 'Web and mobile customer app', slug: 'table-management' },
  { title: 'Kitchen Display Systems', icon: Tv, desc: 'Real-time kitchen order sync', slug: 'table-management' },
  { title: 'Android & iPad POS', icon: Smartphone, desc: 'Handheld tableside ordering', slug: 'offline-registers' }
];

const HARDWARE_LIST = [
  { title: 'Touch Terminal Stations', icon: Tv, desc: 'Heavy-duty checkout registers', slug: 'offline-registers' },
  { title: 'PDQ Payment Terminals', icon: CreditCard, desc: 'Integrated card processors', slug: 'offline-registers' },
  { title: 'Barcode & QR Scanners', icon: Scan, desc: 'Fast inventory scan units', slug: 'smart-inventory' },
  { title: 'Thermal Receipt Printers', icon: Printer, desc: 'High-speed billing printer', slug: 'offline-registers' },
  { title: 'Mobile Billing Terminals', icon: Smartphone, desc: 'All-in-one handheld POS', slug: 'offline-registers' }
];

const OPERATIONS_LIST = [
  { title: 'Multi-Store Stock Sync', icon: RefreshCw, desc: 'Live inventory sync across hubs', slug: 'smart-inventory' },
  { title: 'Visual Sales Reports', icon: BarChart3, desc: 'Margins, hourly sales & analytics', slug: 'smart-inventory' },
  { title: 'SMS Queue Dispatch', icon: MessageSquare, desc: 'Notify customers when ready', slug: 'table-management' },
  { title: 'Interactive Floor Layouts', icon: Grid, desc: 'Visual table mapping & status', slug: 'table-management' },
  { title: 'Customer Loyalty Tiers', icon: Award, desc: 'Points, rewards & campaigns', slug: 'smart-inventory' }
];

const SERVICES_LIST = [
  { title: 'Retail Solutions', slug: 'retail', desc: 'Boutiques, multi-branch chains, and inventory sync', icon: Store },
  { title: 'Restaurant Solutions', slug: 'restaurant', desc: 'Table layout, kitchen display, and online ordering', icon: Utensils },
  { title: 'Grocery & Supermarket', slug: 'grocery', desc: 'Quick barcode scanning and stock weight scale integration', icon: ShoppingBag },
  { title: 'Cafes & Coffee Shops', slug: 'cafes', desc: 'Loyalty points, quick modifiers, and speedy billing', icon: Coffee },
  { title: 'Food Trucks & Takeaways', slug: 'food-trucks', desc: 'Queue dispatch, SMS notifications, and mobile terminals', icon: Truck },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

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
    setMobileOpen((prev) => !prev);
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
      <nav
        className="fixed top-0 left-0 z-50 w-full bg-white border-b border-slate-200/80 shadow-sm py-3 relative"
        onMouseLeave={() => setOpenMegaMenu(null)}
      >
        <div
          className="site-container"
        >

          {/* Inner Content */}
          <div className="w-full flex items-center justify-between">
            {/* Left: Brand icon/text */}
            <Link href="/" onClick={handleBrandClick} className="flex items-center gap-2 z-50 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/40">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span
                className="text-lg font-bold tracking-tight transition-all duration-300 font-syne uppercase text-slate-900 group-hover:text-primary group-hover:scale-[1.03]"
              >
                Quantix
              </span>
            </Link>

            {/* Center: Nav links */}
            <ul className="hidden space-x-2 lg:flex items-center font-sans">
              {LINKS.map((link) => {
                const isActive = pathname === link.href;
                const isFeatures = link.label === 'Features';
                const isServices = link.label === 'Services';
                return (
                  <li 
                    key={link.href} 
                    className="relative py-2.5 px-3 group"
                    onMouseEnter={() => {
                      if (isFeatures) {
                        setOpenMegaMenu('Features');
                      } else if (isServices) {
                        setOpenMegaMenu('Services');
                      } else {
                        setOpenMegaMenu(null);
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'relative z-10 text-[13px] font-semibold transition-all duration-300 block hover:scale-105 active:scale-95',
                        isActive || (isFeatures && openMegaMenu === 'Features') || (isServices && openMegaMenu === 'Services')
                          ? 'text-primary font-bold'
                          : 'text-slate-600 group-hover:text-slate-950'
                      )}
                    >
                      <span className="inline-flex items-center gap-1">
                        {link.label}
                        {(isFeatures || isServices) && (
                          <ChevronDown 
                            size={12} 
                            className={cn(
                              "transition-transform duration-300 ease-out shrink-0",
                              (isFeatures && openMegaMenu === 'Features') || (isServices && openMegaMenu === 'Services')
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
                        (isActive || (isFeatures && openMegaMenu === 'Features') || (isServices && openMegaMenu === 'Services')) && 'scale-x-100'
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
                    className="text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 mr-3 text-slate-600 hover:text-slate-950"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center h-8 px-4 rounded-lg bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-bold text-xs transition-all duration-300 hover:scale-[1.06] active:scale-95 shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/35 animate-pulse-subtle"
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
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {openMegaMenu === 'Features' && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.95 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="absolute top-full left-0 right-0 mt-0 bg-white border border-slate-200/80 rounded-b-2xl shadow-xl py-6 z-50 text-left overflow-hidden"
              onMouseEnter={() => setOpenMegaMenu('Features')}
              onMouseLeave={() => setOpenMegaMenu(null)}
            >
              <div className="site-container grid grid-cols-12 gap-8">
                {/* Left Column: Featured (4 cols) */}
                <div className="col-span-4 border-r border-slate-100 pr-8 space-y-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Featured Solutions</span>
                  
                  {/* Card 1: Restaurant Ecosystem */}
                  <Link 
                    href="/services"
                    onClick={() => setOpenMegaMenu(null)}
                    className="group/card flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-100/50"
                  >
                    <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative bg-slate-100">
                      <img src="/images/hero-restaurant.jpg" alt="Restaurant POS" className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold uppercase text-slate-800 group-hover/card:text-blue-600 transition-colors">Restaurant POS</span>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">Speedy</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                        Complete restaurant ecosystem for table management, kitchen display sync, and payment splits.
                      </p>
                    </div>
                  </Link>

                  {/* Card 2: Retail POS */}
                  <Link 
                    href="/services"
                    onClick={() => setOpenMegaMenu(null)}
                    className="group/card flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-100/50"
                  >
                    <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative bg-slate-100">
                      <img src="/images/hero-retail.jpg" alt="Retail POS" className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold uppercase text-slate-800 group-hover/card:text-blue-600 transition-colors">Retail POS</span>
                        <span className="text-[10px] text-blue-600 font-bold uppercase bg-blue-500/10 px-1.5 py-0.5 rounded">Smart</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                        Smarter retail checkout terminal, barcode scanners support, and multi-store inventory sync.
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Center Column: Explore Products (4 cols) */}
                <div className="col-span-4 border-r border-slate-100 pr-8 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Explore Products</span>
                  <div className="flex flex-col gap-1">
                    {PRODUCTS_LIST.map((item) => (
                      <Link 
                        key={item.title}
                        href={`/features/${item.slug}`}
                        onClick={() => setOpenMegaMenu(null)}
                        className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100/50 transition-all duration-200"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100/80 text-slate-600 transition-colors group-hover/item:bg-primary/10 group-hover/item:text-primary">
                          <item.icon size={15} />
                        </div>
                        <div>
                          <span className="text-[12px] font-bold text-slate-800 group-hover/item:text-primary transition-colors block leading-tight">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold group-hover/item:text-slate-500 transition-colors block mt-0.5 leading-tight">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Column: Hardware & operations */}
                <div className="col-span-4 grid grid-cols-2 gap-6">
                  {/* Column 2: Hardware & Devices */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Hardware & Devices</span>
                    <div className="flex flex-col gap-1">
                      {HARDWARE_LIST.map((item) => (
                        <Link 
                          key={item.title}
                          href={`/features/${item.slug}`}
                          onClick={() => setOpenMegaMenu(null)}
                          className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100/50 transition-all duration-200"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100/80 text-slate-600 transition-colors group-hover/item:bg-primary/10 group-hover/item:text-primary">
                            <item.icon size={15} />
                          </div>
                          <div>
                            <span className="text-[12px] font-bold text-slate-800 group-hover/item:text-primary transition-colors block leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold group-hover/item:text-slate-500 transition-colors block mt-0.5 leading-tight">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Advanced Operations */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Operations</span>
                    <div className="flex flex-col gap-1">
                      {OPERATIONS_LIST.map((item) => (
                        <Link 
                          key={item.title}
                          href={`/features/${item.slug}`}
                          onClick={() => setOpenMegaMenu(null)}
                          className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100/50 transition-all duration-200"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100/80 text-slate-600 transition-colors group-hover/item:bg-primary/10 group-hover/item:text-primary">
                            <item.icon size={15} />
                          </div>
                          <div>
                            <span className="text-[12px] font-bold text-slate-800 group-hover/item:text-primary transition-colors block leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold group-hover/item:text-slate-500 transition-colors block mt-0.5 leading-tight">
                              {item.desc}
                            </span>
                          </div>
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
              initial={{ opacity: 0, scaleY: 0.95 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="absolute top-full left-0 right-0 mt-0 bg-white border border-slate-200/80 rounded-b-2xl shadow-xl py-6 z-50 text-left overflow-hidden"
              onMouseEnter={() => setOpenMegaMenu('Services')}
              onMouseLeave={() => setOpenMegaMenu(null)}
            >
              <div className="site-container">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-4">Our Services & Industries</span>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {SERVICES_LIST.map((item) => (
                    <Link 
                      key={item.title}
                      href={`/solutions/${item.slug}`}
                      onClick={() => setOpenMegaMenu(null)}
                      className="group/card flex flex-col gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-100/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100/80 text-slate-600 transition-colors group-hover/card:bg-primary/10 group-hover/card:text-primary">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-slate-800 group-hover/card:text-primary transition-colors block leading-tight">
                          {item.title}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Full-Screen Slide Overlay for Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#06080F] flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-1.5 w-full max-w-md mx-auto"
            >
              {LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex flex-col gap-0.5 py-3 px-4 rounded-xl transition-all duration-200',
                        isActive
                          ? 'bg-white/10 border border-white/5'
                          : 'hover:bg-white/5 border border-transparent'
                      )}
                    >
                      <span className={cn(
                        'text-[14px] font-bold tracking-wider uppercase transition-colors duration-200',
                        isActive ? 'text-blue-400' : 'text-white'
                      )}>
                        {link.label}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium tracking-normal normal-case">
                        {link.desc}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="flex flex-col gap-3 w-full max-w-md mx-auto"
            >
              {token ? (
                <>
                  <div className="flex items-center gap-2.5 justify-center py-3.5 rounded-xl bg-white/5 border border-white/5 select-none">
                    <User size={15} className="text-blue-400" />
                    <span className="text-[13px] font-bold tracking-wider uppercase text-slate-200">
                      Hi, {meData?.data?.username || meData?.username || "Admin"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-[13px] uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer shadow-lg shadow-red-600/10"
                  >
                    <LogOut size={15} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center h-11 rounded-xl text-[13px] font-bold uppercase tracking-[0.08em] border border-white/10 text-white bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white font-extrabold text-[13px] uppercase tracking-[0.08em] transition-all duration-200 shadow-lg shadow-blue-600/20"
                  >
                    Start Free Trial
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

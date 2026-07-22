'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, LogOut, User } from 'lucide-react';
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
  { label: 'FEATURES', href: '/features', desc: 'Smarter retail, restaurant, and cloud POS tools' },
  { label: 'INTEGRATIONS', href: '/integrations', desc: 'Connect payment terminals, delivery platforms, and tools' },
  { label: 'DOWNLOADS', href: '/downloads', desc: 'Download register terminals and sync services' },
  { label: 'PRICING', href: '/pricing', desc: 'Flexible plans tailored to your business scale' },
  { label: 'CONTACT SALES', href: '/contact', desc: 'Talk to our retail and billing specialists' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
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

  // Hide navbar only when scroll reaches the footer area (bottom of page)
  useEffect(() => {
    const footerBuffer = 300; // px from bottom where navbar starts hiding

    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (window.scrollY > 24) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Only hide when user is near the very bottom (footer zone)
      if (pageHeight - scrollBottom < footerBuffer) {
        setHidden(true);
      } else {
        setHidden(false);
      }
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
      setHidden(false); // always show navbar when menu is open
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Navbar always uses dark frosted glass — text is always white
  const useWhiteText = true;

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
  };  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 z-50 w-full px-0 bg-transparent py-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          hidden && !mobileOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        )}
      >
        <div
          className={cn(
            'mx-2 sm:mx-4 lg:mx-8 xl:mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden',
            scrolled
              ? 'max-w-[92%] md:max-w-[85%] lg:max-w-[77.5%] xl:max-w-[1440px] rounded-xl bg-[#0a0e1a]/85 border border-white/[0.08] shadow-2xl shadow-black/30 backdrop-blur-2xl py-1.5'
              : 'max-w-[94%] md:max-w-[88%] lg:max-w-[80%] xl:max-w-[1440px] rounded-2xl bg-[#0a0e1a]/70 border border-white/[0.05] shadow-lg shadow-black/10 backdrop-blur-xl py-2.5',
            mobileOpen && 'bg-[#06080F] border border-transparent shadow-none max-w-full'
          )}
        >
          {/* Top gradient line when scrolled */}
          <div
            className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 rounded-t-xl"
            style={{
              background: `linear-gradient(90deg, transparent, var(--blue-color), var(--indigo-color), transparent)`,
              opacity: scrolled ? 1 : 0,
            }}
          />

          {/* Inner Content */}
          <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between">
            {/* Left: Brand icon/text */}
            <Link href="/" onClick={handleBrandClick} className="flex items-center gap-2 z-50 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/40">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span
                className={cn(
                  'text-lg font-bold tracking-tight transition-all duration-300 font-syne uppercase group-hover:scale-[1.03]',
                  useWhiteText
                    ? 'text-white group-hover:text-blue-400'
                    : 'text-slate-900 group-hover:text-blue-600'
                )}
              >
                Quantix
              </span>
            </Link>

            {/* Center: Nav links */}
            <ul className="hidden space-x-2 lg:flex items-center">
              {LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="relative py-1.5 px-3 group">
                    <Link
                      href={link.href}
                      className={cn(
                        'relative z-10 text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300 block hover:scale-105 active:scale-95',
                        isActive
                          ? (useWhiteText ? 'text-white font-bold' : 'text-blue-600 font-bold')
                          : useWhiteText
                            ? 'text-slate-300 group-hover:text-white'
                            : 'text-slate-600 group-hover:text-slate-950'
                      )}
                    >
                      {link.label}
                    </Link>

                    {/* Soft hover pill background for inactive items */}
                    {!isActive && (
                      <span
                        className={cn(
                          'absolute inset-0 rounded-lg -z-0 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-transparent scale-95 group-hover:scale-100',
                          useWhiteText
                            ? 'bg-white/5 border-white/5'
                            : 'bg-slate-950/5 border-slate-950/5'
                        )}
                      />
                    )}

                    {/* Dynamic sliding layout pill for the active route */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavTab"
                        className={cn(
                          'absolute inset-0 rounded-lg -z-0 border',
                          useWhiteText
                            ? 'bg-white/10 border-white/5'
                            : 'bg-slate-950/5 border-slate-950/5'
                        )}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
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
                    className={cn(
                      'text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:scale-105 active:scale-95 mr-2',
                      useWhiteText ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                    )}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center h-9 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white font-bold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 hover:scale-[1.06] active:scale-95 shadow-md shadow-indigo-600/15 hover:shadow-lg hover:shadow-indigo-600/35 animate-pulse-subtle"
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

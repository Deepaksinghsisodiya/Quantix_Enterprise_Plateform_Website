'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '../../../lib/utils';
import { RootState } from '../../../redux/store';
import { toggleTheme } from '../../../redux/slices/themeSlice';

// Nav link definition
interface NavLink {
  label: string;
  href: string; // Next.js page routes
}

const LINKS: NavLink[] = [
  { label: 'Features', href: '/features' },
  { label: 'Resources', href: '/resources' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Sales', href: '/contact' },
];

/**
 * Navbar component (organism).
 * - Sticky top-0 with z-50.
 * - Always uses a dark navy background (#0F172A) to ensure white text is perfectly visible
 *   on both light background subpages and dark homepage.
 * - On scroll past 80px: transitions from semi-transparent dark to solid dark navy.
 * - Mobile hamburger toggles a full-screen overlay with stagger animations.
 * - Active link highlighted using pathname.
 * - Dispatches toggleTheme to Redux.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  // Scroll listener for background transition
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  // Motion variants for background transition
  const bgVariant = {
    transparent: { backgroundColor: 'rgba(255, 255, 255, 0)' }, // Transparent initially
    solid: { backgroundColor: 'rgba(255, 255, 255, 1.0)' }, // Solid white on scroll
  };

  // Slide down fullscreen mobile menu
  const menuVariant = {
    hidden: { opacity: 0, y: '-100%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.35,
        ease: 'easeInOut' as const,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      <motion.div
        initial="transparent"
        animate={scrolled ? 'solid' : 'transparent'}
        variants={bgVariant}
        className={cn(
          "transition-all duration-300",
          scrolled 
            ? "backdrop-blur-md border-b border-slate-100 shadow-sm" 
            : "border-b border-transparent"
        )}
      >
        <div className="site-container flex items-center justify-between py-4">
          {/* Left: Square logo icon + "Quantix" text */}
          <Link href="/" className="flex items-center gap-2.5 z-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <span className={cn("text-lg font-bold tracking-tight transition-colors duration-300", (scrolled || mobileOpen) ? "text-slate-900" : "text-white")}>
              Quantix
            </span>
          </Link>

          {/* Desktop navigation links (Center) */}
          <ul className="hidden space-x-8 md:flex">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-xs font-bold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95 inline-block cursor-pointer',
                      isActive 
                        ? 'text-blue-600 font-bold' 
                        : (scrolled ? 'text-slate-700 hover:text-blue-600' : 'text-slate-200 hover:text-white')
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-5">
            {/* Mode toggle button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={cn(
                "p-2 rounded-full transition-all duration-200 cursor-pointer active:scale-90",
                scrolled 
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" 
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              )}
              aria-label="Toggle dark mode"
              type="button"
            >
              {themeMode === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <Link
              href="/sign-in"
              className={cn(
                "text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95",
                scrolled ? "text-slate-700 hover:text-blue-600" : "text-white hover:text-slate-200"
              )}
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:shadow-blue-600/25 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile hamburger + Mode Toggle */}
          <div className="flex md:hidden items-center gap-3 z-50">
            {/* Mode toggle button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={cn(
                "p-2 rounded-full transition-all duration-200 cursor-pointer active:scale-90",
                (scrolled || mobileOpen) 
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" 
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              )}
              aria-label="Toggle dark mode"
              type="button"
            >
              {themeMode === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              type="button"
              className={cn(
                "rounded-full p-2 transition-all",
                (scrolled || mobileOpen) ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile fullscreen menu overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariant}
              className="fixed inset-0 z-40 bg-white flex flex-col justify-center min-h-screen w-full"
            >
              <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-20 px-8">
                <ul className="space-y-8 text-center text-xl font-bold uppercase tracking-wider text-slate-700 w-full mb-12">
                  {LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li key={link.href} variants={itemVariant}>
                        <Link
                          href={link.href}
                          onClick={toggleMobile}
                          className={cn(
                            'transition-all duration-200 hover:scale-105 active:scale-95 inline-block',
                            isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div variants={itemVariant} className="flex flex-col gap-4 w-full">
                  <Link
                    href="/sign-in"
                    className="rounded-full border border-slate-200 text-slate-700 text-center py-3.5 text-xs font-bold bg-slate-50 hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    onClick={toggleMobile}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="rounded-full bg-blue-600 text-center py-3.5 text-xs font-bold text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-blue-600/25"
                    onClick={toggleMobile}
                  >
                    Start Free Trial
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;

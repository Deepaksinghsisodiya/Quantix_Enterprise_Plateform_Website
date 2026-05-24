'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Layers, BookOpen, Briefcase, Tag, Mail } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Nav link definition
interface NavLink {
  label: string;
  href: string; // Next.js page routes
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const LINKS: NavLink[] = [
  { label: 'Features', href: '/features', icon: Layers },
  { label: 'Resources', href: '/resources', icon: BookOpen },
  { label: 'Services', href: '/services', icon: Briefcase },
  { label: 'Pricing', href: '/pricing', icon: Tag },
  { label: 'Contact Sales', href: '/contact', icon: Mail },
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


  // Scroll listener for background transition
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  // Determine if header text should be white or dark based on scroll state, page theme, and mobile open state
  const isDarkPageAtTop = ['/', '/contact', '/sign-in', '/sign-up'].includes(pathname);
  const useWhiteText = !mobileOpen && isDarkPageAtTop;



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
      className="fixed inset-x-0 top-0 z-50 w-full pointer-events-auto"
    >
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          scrolled
            ? (isDarkPageAtTop
                ? "border-b border-slate-800/50 bg-slate-950/80 shadow-lg shadow-slate-950/20 backdrop-blur-md"
                : "border-b border-slate-200/50 bg-white/90 shadow-sm backdrop-blur-md")
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className={cn("site-container flex items-center justify-between transition-all duration-300", scrolled ? "py-3" : "py-5")}>
          {/* Left: Square logo icon + "Quantix" text */}
          {/* Left: Square logo icon + "Quantix" text */}
          <Link href="/" className="flex items-center gap-2.5 z-50 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5.5 w-5.5"
              >
                <path
                  d="M12 2L3.5 7L12 12L20.5 7L12 2Z"
                  fill="url(#logo-grad-1)"
                />
                <path
                  d="M3.5 7V17L12 22V12L3.5 7Z"
                  fill="url(#logo-grad-2)"
                />
                <path
                  d="M12 12V22L20.5 17V7L12 12Z"
                  fill="url(#logo-grad-3)"
                />
                <defs>
                  <linearGradient id="logo-grad-1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#93C5FD" />
                    <stop offset="1" stopColor="#60A5FA" />
                  </linearGradient>
                  <linearGradient id="logo-grad-2" x1="3.5" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#1E3A8A" />
                  </linearGradient>
                  <linearGradient id="logo-grad-3" x1="12" y1="12" x2="20.5" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className={cn("text-lg font-bold tracking-tight transition-colors duration-300 font-display", useWhiteText ? "text-white" : "text-slate-900")}>
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
                      'text-xs font-bold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer',
                      isActive 
                        ? 'text-blue-500 font-bold' 
                        : (useWhiteText ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-blue-600')
                    )}
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-5">

            <Link
              href="/sign-in"
              className={cn(
                "text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95",
                useWhiteText ? "text-white hover:text-slate-200" : "text-slate-700 hover:text-blue-600"
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

            <button
              type="button"
              className={cn(
                "rounded-full p-2 transition-all",
                useWhiteText ? "text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
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
                            'transition-all duration-200 hover:scale-105 active:scale-95',
                            isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'
                          )}
                        >
                          <span>{link.label}</span>
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
      </div>
    </nav>
  );
};

export default Navbar;

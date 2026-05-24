'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Nav link definition with description for premium mobile view
interface NavLink {
  label: string;
  href: string;
  desc: string;
}

const LINKS: NavLink[] = [
  { label: 'FEATURES', href: '/features', desc: 'Smarter retail, restaurant, and cloud POS tools' },
  { label: 'RESOURCES', href: '/resources', desc: 'Guides, API documentation, and industry insights' },
  { label: 'SERVICES', href: '/services', desc: 'Enterprise integrations and 24/7 custom support' },
  { label: 'PRICING', href: '/pricing', desc: 'Flexible plans tailored to your business scale' },
  { label: 'CONTACT SALES', href: '/contact', desc: 'Talk to our retail and billing specialists' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();


  // Hide navbar only when scroll reaches the footer area (bottom of page)
  useEffect(() => {
    const footerBuffer = 300; // px from bottom where navbar starts hiding

    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

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
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 z-50 w-full px-0 bg-transparent border-b border-transparent py-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          hidden && !mobileOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        )}
      >
        {/* Outer Card — consistent dark frosted glass (readable over any section) */}
        <div
          className={cn(
            'mx-2 sm:mx-4 lg:mx-8 xl:mx-auto xl:max-w-7xl rounded-2xl transition-all duration-300',
            mobileOpen
              ? 'bg-[#06080F] border border-transparent shadow-none'
              : 'bg-[#0a0e1a]/70 backdrop-blur-xl border border-white/[0.06] shadow-lg shadow-black/10'
          )}
        >
          {/* Inner Content */}
          <div className="w-full mx-auto py-2 px-3 sm:px-4 lg:px-6 xl:max-w-7xl flex items-center justify-between">
            {/* Left: Smaller Quantix icon */}
            <Link href="/" className="flex items-center gap-2 z-50 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/40">
                <Layers className="h-3.5 w-3.5 text-white" />
              </div>
              <span
                className={cn(
                  'text-base font-bold tracking-tight transition-all duration-300 font-syne uppercase group-hover:scale-[1.03]',
                  useWhiteText
                    ? 'text-white group-hover:text-blue-400'
                    : 'text-slate-900 group-hover:text-blue-600'
                )}
              >
                Quantix
              </span>
            </Link>

            {/* Center: Nav links */}
            <ul className="hidden space-x-2 md:flex items-center">
              {LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="relative py-1.5 px-3 group">
                    <Link
                      href={link.href}
                      className={cn(
                        'relative z-10 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 block hover:scale-105 active:scale-95',
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

            {/* Right side: Ghost Sign In + Blue/Indigo Start Free Trial */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/sign-in"
                className={cn(
                  'text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:scale-105 active:scale-95',
                  useWhiteText ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center justify-center h-9 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white font-bold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 hover:scale-[1.06] active:scale-95 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/30"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Morphing Hamburger Menu Trigger for Mobile */}
            <div className="flex md:hidden items-center z-50">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

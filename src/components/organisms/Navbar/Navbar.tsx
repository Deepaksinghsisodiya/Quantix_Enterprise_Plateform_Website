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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Scroll listener for background transition (>30px)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run on mount
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

  // Determine if links and logo should be white or dark based on the active page background
  const isDarkPage = ['/', '/contact', '/sign-in', '/sign-up'].includes(pathname);
  // When scrolled or mobile drawer is open, background is dark, so we must use white text.
  const useWhiteText = mobileOpen || scrolled || isDarkPage;

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
          'fixed top-0 left-0 z-50 w-full px-0 transition-all duration-500 ease-in-out',
          scrolled
            ? 'bg-[#06080F]/75 backdrop-blur-md border-b border-white/10 py-2.5 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent py-4'
        )}
      >
        {/* Morphing Outer Card: mx-2 on mobile, mx-4 on tablet, mx-8 on laptop, centers on desktop at xl-max-w-7xl */}
        <div
          className={cn(
            'transition-all duration-500 ease-in-out border-t-0 border-x-0 border-b-0',
            scrolled
              ? 'mx-0 w-full max-w-full rounded-none border-transparent bg-transparent'
              : cn(
                'mx-2 sm:mx-4 lg:mx-8 xl:mx-auto xl:max-w-7xl rounded-2xl border transition-colors duration-300',
                mobileOpen
                  ? 'bg-[#06080F] border-transparent shadow-none'
                  : useWhiteText
                    ? 'bg-[#06080F]/40 backdrop-blur-md border-white/10 shadow-sm'
                    : 'bg-white/50 backdrop-blur-md border-slate-900/10 shadow-sm'
              )
          )}
        >
          {/* Inner Content Container: Mathematically matches site-container indentation in both states */}
          <div
            className={cn(
              'transition-all duration-500 ease-in-out flex items-center justify-between',
              scrolled
                ? 'site-container py-0'
                : 'w-full mx-auto py-2 px-3 sm:px-4 lg:px-6 xl:max-w-7xl'
            )}
          >
            {/* Left: Lucide Layers icon + "Quantix" (Syne font) */}
            <Link href="/" className="flex items-center gap-2.5 z-50 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/40">
                <Layers className="h-5 w-5 text-white transition-transform duration-300" />
              </div>
              <span
                className={cn(
                  'text-xl font-bold tracking-tight transition-all duration-300 font-syne uppercase group-hover:scale-[1.03]',
                  useWhiteText
                    ? 'text-white group-hover:text-blue-400'
                    : 'text-slate-900 group-hover:text-blue-600'
                )}
              >
                Quantix
              </span>
            </Link>

            {/* Center: Nav links with interactive sliding background & hover micro-interactions */}
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

            {/* Morphing Hamburger Menu Trigger for Mobile (z-50 keeps it over overlay) */}
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
                {/* Apple-style morphing CSS bars */}
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

      {/* Enterprise-grade Full-Screen Slide Overlay for Mobile Menu */}
      {/* Moved outside the <nav> element to prevent CSS transition containment clipping */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#06080F] flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
          >
            {/* Top/Center: Informational Links with Descriptions */}
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

            {/* Bottom: Docked Enterprise Action Buttons */}
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

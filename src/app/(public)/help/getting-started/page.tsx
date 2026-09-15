// src/app/(public)/help/getting-started/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Cloud, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

// Exact original content retained - 0 extra items added
const ENTERPRISE_STEPS = [
  {
    title: 'Create Your Account',
    description: 'Visit the signup page and choose Enterprise. Select your plan tier and enter your business profile details.',
  },
  {
    title: 'Verify Your Email',
    description: 'Enter the 6-digit verification code sent to your email. This secures your account and activates your merchant master profile.',
  },
  {
    title: 'Set Up Payment Gateway',
    description: 'Configure your processing gateway or use your own preferred interchange processor. Zero Quantix transaction fees.',
  },
  {
    title: 'Configure Your Business HQ',
    description: 'Set up your store locations, add initial menu catalog items, configure regional sales tax rates, and customize digital receipt templates.',
  },
  {
    title: 'Connecting Registers to Cloud',
    description: 'Deploy the Quantix Sync Service or Web Till on your devices. All registers automatically maintain encrypted local caches with seamless cloud synchronization.',
  },
];

const STANDALONE_STEPS = [
  {
    title: 'Download Offline Binary',
    description: 'Navigate to the Downloads page. Select the offline perpetual installer package matching your operating system (Windows x64 or Linux).',
  },
  {
    title: 'Local Database Setup',
    description: 'Run the setup wizard. The software configures a secure local database (SQLite/IndexedDB) natively on your physical disk with zero internet requirement.',
  },
  {
    title: 'Purchase License Tokens',
    description: 'Order Standalone validity perpetual tokens from our license catalog (Standard, Advance, or Premium) without monthly SaaS subscriptions.',
  },
  {
    title: 'Activate Register License',
    description: 'Enter your perpetual token into the terminal register activation modal to fully unlock all offline sales, barcode scanning, and receipt printing workflows.',
  },
];

// Staggered sequential container animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Individual item entrance animation with spring physics
const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

export default function HelpGettingStartedPage() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'standalone'>('enterprise');

  const steps = activeTab === 'enterprise' ? ENTERPRISE_STEPS : STANDALONE_STEPS;

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* ─── 1. Page Hero Header (Using site-wide standard .page-hero-header from globals.css) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 page-nav-header space-y-3 text-left">
          {/* Breadcrumb - exact site-wide pattern, left-aligned, proper navbar clearance */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold">Getting Started</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] shadow-2xs">
              <Sparkles size={13} className="text-[#FF4D00]" />
              <span>Step-by-Step Onboarding</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight max-w-3xl uppercase">
            Getting Started Guide
          </h1>
        </div>
      </section>

      {/* ─── 2. Main Steps Section (Using site-wide standard .section-py from globals.css) ─── */}
      <section className="section-py site-container max-w-4xl pb-28 sm:pb-24">
        
        {/* Animated Toggle Tabs */}
        <div className="flex justify-start mb-8 sm:mb-12">
          <div className="relative inline-flex items-center rounded-md bg-slate-200/80 dark:bg-slate-900 p-1 border border-slate-200/90 dark:border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('enterprise')}
              className={cn(
                'relative z-10 flex items-center gap-2 rounded-md px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-syne font-bold transition-colors duration-200 cursor-pointer',
                activeTab === 'enterprise'
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {activeTab === 'enterprise' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-primary rounded-md shadow-md shadow-primary/25 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Cloud size={16} />
              <span>Cloud Enterprise</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('standalone')}
              className={cn(
                'relative z-10 flex items-center gap-2 rounded-md px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-syne font-bold transition-colors duration-200 cursor-pointer',
                activeTab === 'standalone'
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {activeTab === 'standalone' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-primary rounded-md shadow-md shadow-primary/25 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <ShieldCheck size={16} />
              <span>Offline Standalone</span>
            </button>
          </div>
        </div>

        {/* Animated Sequential Steps Timeline */}
        <div className="relative">
          {/* Glowing continuous vertical timeline track */}
          <div className="absolute left-[21px] sm:left-[27px] top-6 bottom-6 w-0.5 bg-linear-to-b from-primary via-primary/50 to-slate-200 dark:to-slate-800" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="space-y-6 sm:space-y-8"
            >
              {steps.map((step, idx) => (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  variants={itemVariants}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="relative flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Step Number Node */}
                  <div className="relative z-10 shrink-0">
                    <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-md bg-white dark:bg-slate-900 border-2 border-primary text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center text-sm sm:text-base font-syne font-black shadow-md shadow-primary/10 group-hover:shadow-primary/30 transition-all duration-300">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Step Content Card */}
                  <div className="flex-1 min-w-0 rounded-md border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-5 sm:p-6 shadow-2xs group-hover:shadow-lg group-hover:shadow-primary/5 group-hover:border-primary/40 transition-all duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-syne font-black uppercase text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-snug">
                          {step.title}
                        </h3>
                        <CheckCircle2 size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Conversion Row */}
        <div className="mt-12 sm:mt-16 text-center border-t border-slate-200 dark:border-slate-800 pt-8 sm:pt-10 space-y-4">
          <h4 className="text-sm sm:text-base font-syne font-bold uppercase text-slate-950 dark:text-white">
            Ready to launch your terminal setup?
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/sign-up"
              className="rounded-md bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-syne font-bold uppercase tracking-wider py-3 px-6 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-primary/20"
            >
              <span>Start Registration</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-syne font-bold uppercase tracking-wider py-3 px-6 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Talk to POS Specialist</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </section>

      {/* Global CTA Banner */}
      <CTABanner />
    </main>
  );
}

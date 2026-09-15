// src/app/(public)/roi-calculator/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import ROICalculator from '@/features/ROI/ROICalculator';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

export default function ROICalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Page Hero Header Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Subtle ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-amber-400/10 via-orange-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Why Quantix trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors font-medium">Why Quantix</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">ROI Calculator</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs font-syne font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 shadow-xs">
              <Sparkles size={13} className="text-amber-500" />
              <span>MULTI-UNIT FINANCIAL FORECASTER</span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-syne font-black text-slate-950 dark:text-white leading-tight tracking-tight uppercase">
              Calculate Your Multi-Store ROI
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
              Adjust your store outlet count and daily order volume to forecast annual operational cost reductions vs legacy enterprise POS vendors and generic cloud systems.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Zero Transaction Take</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>40% Lower SaaS Overhead</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>&lt;60 Day Hardware Payback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="site-container max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <ROICalculator />
      </section>

      {/* Bottom CTABanner */}
      <CTABanner />
    </main>
  );
}

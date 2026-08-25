// src/app/(public)/roi-calculator/page.tsx
'use client';

import React from 'react';
import { Sparkles, Calculator, ArrowRight, TrendingUp, ShieldCheck, Flame } from 'lucide-react';
import ROICalculator from '@/features/ROI/ROICalculator';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

export default function ROICalculatorPage() {
  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-darkBg transition-colors duration-300">
      {/* 1. Hero Header Section (Clear of fixed navbar with pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16) */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 bg-linear-to-b from-slate-50/70 via-white to-white dark:from-darkBg dark:via-darkSurface/30 dark:to-darkBg border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        {/* Ambient brand glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
            <Flame size={13} className="text-primary" />
            <span>Multi-Unit Financial Forecaster</span>
          </div>

          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.12] tracking-tight">
            Calculate Your Multi-Store ROI
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Adjust your store outlet count and daily order volume to forecast annual operational cost reductions vs legacy enterprise POS vendors.
          </p>
        </div>
      </section>

      {/* 2. Interactive Calculator Section */}
      <section className="py-10 sm:py-16 bg-slate-50/60 dark:bg-darkBg/50">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <ROICalculator />
        </div>
      </section>

      {/* 3. Bottom CTABanner */}
      <CTABanner />
    </div>
  );
}

// src/app/(public)/roi-calculator/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calculator, ArrowRight, TrendingUp, ShieldCheck, Flame, ChevronRight } from 'lucide-react';
import ROICalculator from '@/features/ROI/ROICalculator';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

export default function ROICalculatorPage() {
  return (
    <>
      {/* 1. Hero Header Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-4 inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">ROI Calculator</span>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
              <Flame size={13} className="text-primary" />
              <span>Multi-Unit Financial Forecaster</span>
            </div>

            <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
              Calculate Your Multi-Store ROI
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Adjust your store outlet count and daily order volume to forecast annual operational cost reductions vs legacy enterprise POS vendors.
            </p>

            {/* 3D ROI Visual Showcase */}
            <div className="relative w-full max-w-lg mx-auto aspect-16/10 flex items-center justify-center pt-2">
              <img
                src="/images/ent_roi_analytics.png"
                alt="Enterprise ROI Analytics Dashboard"
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Calculator Section */}
      <section className="section-py bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container px-4 sm:px-6">
          <ROICalculator />
        </div>
      </section>

      {/* 3. Bottom CTABanner */}
      <CTABanner />
    </>
  );
}

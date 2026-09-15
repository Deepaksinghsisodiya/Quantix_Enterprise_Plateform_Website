// src/app/(public)/case-studies/page.tsx
'use client';

import React from 'react';
import { CaseStudiesWrapper } from '@/features/CaseStudies';
import { Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Ambient warm glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-orange-400/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Why Quantix trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors font-medium">
              Why Quantix
            </Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">
              Case Studies
            </span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-syne font-bold uppercase tracking-wider text-primary shadow-xs">
              <Award size={13} />
              <span>VERIFIED CLIENT TRANSFORMATIONS</span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight uppercase">
              Real Impact. Quantified Results.
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
              Explore authentic case studies from high-volume restaurants, multi-location retail chains, and enterprise franchises that modernized operations with Quantix.
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="pt-2 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg p-3 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs text-center">
            <div className="p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-primary">+38%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Table Turns</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-800 p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-emerald-600 dark:text-emerald-400">-64%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Shrinkage</div>
            </div>
            <div className="p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-slate-900 dark:text-white">99.99%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Cloud SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <div className="py-6 sm:py-10">
        <CaseStudiesWrapper hideHeader={true} />
      </div>

      {/* Bottom Conversion CTA Banner */}
      <CTABanner />
    </main>
  );
}

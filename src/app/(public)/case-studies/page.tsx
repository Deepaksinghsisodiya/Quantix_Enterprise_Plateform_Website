// src/app/(public)/case-studies/page.tsx
'use client';

import React from 'react';
import { CaseStudiesWrapper } from '@/features/CaseStudies';
import { Award, ChevronRight, ShieldCheck, TrendingUp, Clock, Sparkles, CheckCircle2, Quote, ArrowRight, Building2, Store } from 'lucide-react';
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
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-xs font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors">
              Why Quantix
            </Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">
              Case Studies
            </span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs font-syne font-bold uppercase tracking-wider text-[#FF4F00] shadow-xs">
              <Sparkles size={13} />
              <span>VERIFIED CLIENT TRANSFORMATIONS</span>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Real Impact.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
                Quantified Results.
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
              Discover how leading restaurants, multi-location retail chains, and enterprise franchises modernize operations, eliminate inventory leakage, and accelerate revenue with Quantix.
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="pt-2 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg p-3 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs text-center">
            <div className="p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] to-amber-500">+38%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mt-0.5">Table Turns</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-800 p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-emerald-600 dark:text-emerald-400">-65%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mt-0.5">Shrinkage</div>
            </div>
            <div className="p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-slate-900 dark:text-white">99.99%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mt-0.5">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Interactive List with Category Filters */}
      <div className="py-8 sm:py-12 site-container">
        <CaseStudiesWrapper hideHeader={true} />
      </div>

      {/* Enterprise Transformation Methodology Strip */}
      <section className="py-12 sm:py-16 border-y border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#FF4F00] uppercase tracking-widest block mb-2">
              PROVEN DEPLOYMENT METHODOLOGY
            </span>
            <h2 className="text-xl sm:text-3xl font-syne font-extrabold text-slate-950 dark:text-white tracking-tight">
              How Quantix Delivers Measurable ROI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                  <Clock size={20} />
                </div>
                <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white">
                  Zero Order Loss LAN Mesh
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Registers automatically mesh peer-to-peer over local Wi-Fi, allowing 100% uninterrupted ring-up and kitchen printing during internet drops.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Eliminates Peak-Hour Revenue Loss
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white">
                  1-Click Central Catalog Push
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Push new items, menu combos, prices, and tax rules to hundreds of locations in under 10 seconds without branch manager intervention.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Slashes HQ Menu Admin Hours by 85%
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white">
                  Live COGS & Shrinkage Defense
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Real-time ingredient depletion down to the gram, automated par-order drafts, and barcode dock audits stop food waste and retail theft.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Saves ~$14,500/Store in Annual Waste
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Executive Quote */}
      <section className="py-12 sm:py-16 bg-slate-50/80 dark:bg-slate-950">
        <div className="site-container max-w-4xl">
          <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-xl overflow-hidden text-center">
            <Quote className="w-12 h-12 text-[#FF4F00]/15 mx-auto mb-4" />
            <p className="font-syne text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed max-w-2xl mx-auto mb-6">
              &ldquo;Peak lunch surges used to overwhelm our kitchen with lost paper slips and 18-minute ticket delays. Quantix unified KDS and real-time counter routing cut turnaround times by 38% on day one.&rdquo;
            </p>
            <div>
              <div className="font-syne font-extrabold text-sm sm:text-base text-slate-950 dark:text-white">
                Marcus Thorne
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                Chief Operating Officer, Krave Brands (18 Locations)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <CTABanner />
    </main>
  );
}

// src/app/(public)/newsletter/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Mail,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Users,
} from 'lucide-react';
import NewsletterWrapper from '@/features/Newsletter';

export default function NewsletterPage() {
  return (
    <div className="w-full font-sans min-h-screen text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Exact site-wide standard) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-4 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">Newsletter</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] mb-3 shadow-2xs">
            <Mail size={13} className="text-[#FF4D00]" />
            <span>Weekly Product &amp; Engineering Digest</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Stay Ahead of the <span className="text-[#FF4D00]">Commerce Curve</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Join 12,000+ retail executives, restaurant owners, and POS engineers receiving our weekly playbooks on offline-first registers, sub-second checkout, and omnichannel growth.
          </p>

          {/* Interactive Subscribe Box in Hero */}
          <div className="mt-7 max-w-md mx-auto">
            <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-orange-500/5">
              <NewsletterWrapper
                title=""
                subtitle=""
                variant="card"
                placeholder="Enter your work email..."
                buttonText="Subscribe Free"
                className="w-full"
              />
              <div className="flex items-center justify-center gap-3 pt-3 text-[11px] text-slate-400 dark:text-slate-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  Zero Spam
                </span>
                <span>•</span>
                <span>Unsubscribe Anytime</span>
                <span>•</span>
                <span>Weekly Every Tuesday</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Main Content Section (Exact site-wide standard with section-py) ─── */}
      <section className="section-py site-container">
        <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
          {/* 3 Pillars Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
              <span className="text-xs font-syne font-black text-primary tracking-widest uppercase">
                WHAT YOU RECEIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-syne font-extrabold text-slate-950 dark:text-white leading-tight">
                Curated Intelligence for High-Growth Brands
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-primary flex items-center justify-center border border-orange-500/20">
                  <Zap size={20} />
                </div>
                <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white">
                  Sub-Second Register Velocity
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Real-world benchmarks and case studies on shaving 800ms off counter checkouts and eliminating cashier bottlenecks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white">
                  Offline-First Architecture
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Deep-dives into SQLite sync, multi-till local clustering, and network failover topologies that keep sales ringing during fiber cuts.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white">
                  Omnichannel Rollout Playbooks
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Step-by-step guides for ERP sync, unified customer wallets, BOPIS fulfillment, and multi-location menu distribution.
                </p>
              </div>
            </div>
          </div>

          {/* Sample Past Editions */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-syne font-black text-primary uppercase tracking-wider">
                  Recent Editions
                </span>
                <h3 className="text-xl sm:text-2xl font-syne font-black text-slate-900 dark:text-white mt-1">
                  Peek Inside Past Newsletters
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                <Users size={13} className="text-primary" />
                <span>Read by 12,000+ Leaders</span>
              </div>
            </div>

            <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/80">
              <div className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10.5px] font-bold text-primary uppercase">Issue #48 • Architecture</span>
                  <h4 className="font-syne font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                    How 200+ Store Chains Maintain 100% Register Uptime During ISP Blackouts
                  </h4>
                </div>
                <span className="text-xs text-slate-400 shrink-0">4 min read</span>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10.5px] font-bold text-blue-500 uppercase">Issue #47 • Benchmarks</span>
                  <h4 className="font-syne font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                    2026 POS Hardware Latency Benchmark: Android Tablets vs. Dual-Screen Terminals
                  </h4>
                </div>
                <span className="text-xs text-slate-400 shrink-0">6 min read</span>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10.5px] font-bold text-emerald-500 uppercase">Issue #46 • Operations</span>
                  <h4 className="font-syne font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                    Zero-Commission Direct Ordering: Converting Aggregator Customers into Brand Loyalists
                  </h4>
                </div>
                <span className="text-xs text-slate-400 shrink-0">5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

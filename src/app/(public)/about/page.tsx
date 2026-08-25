// src/app/(public)/about/page.tsx
'use client';

import React from 'react';
import { Award, Users, Globe, Target, Flame, Sparkles, Building2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import SocialProofStatsWrapper from '@/features/SocialProof/components/SocialProofWrapper';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

export default function AboutPage() {
  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-darkBg transition-colors duration-300 flex-1">
      {/* 1. Hero Section (Clear of fixed navbar with pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20) */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 bg-linear-to-b from-slate-50/70 via-white to-white dark:from-darkBg dark:via-darkSurface/30 dark:to-darkBg border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
            <Flame size={13} className="text-primary" />
            <span>Our Mission & Architectural Vision</span>
          </div>

          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.12] tracking-tight">
            Redefining Commerce for Multi-Location Enterprises
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            We engineer offline-first, cloud-synchronized point-of-sale platforms that empower high-volume retail chains and multi-unit restaurant brands to scale with sub-second register velocity.
          </p>
        </div>
      </section>

      {/* 2. Numbers & Statistics Grid */}
      <section className="-mt-8 relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <SocialProofStatsWrapper />
      </section>

      {/* 3. Core Architectural Pillars */}
      <section className="py-14 sm:py-20 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-syne font-black text-primary tracking-widest uppercase">
            ARCHITECTURAL PRINCIPLES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-extrabold text-slate-950 dark:text-white leading-tight">
            Built for Zero-Downtime Reliability
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-600 dark:text-slate-400">
            Enterprise point-of-sale infrastructure must be resilient, secure, and delightfully effortless for store staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-slate-50/70 dark:bg-darkSurface/60 p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-2xs hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-950 dark:text-white">Merchant-Centric Velocity</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                Every workflow is engineered for rapid sub-second register checkout. We optimize for high scanning speeds and zero cashier fatigue during peak rush hours.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-primary flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>Sub-second Barcode & Tender Response</span>
            </div>
          </div>

          <div className="bg-slate-50/70 dark:bg-darkSurface/60 p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-2xs hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-950 dark:text-white">Offline-First Trust</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                An internet blackout should never stop checkout trading. Local IndexedDB and satellite mesh cache transactions uninterrupted, syncing automatically to HQ once restored.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-primary flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>99.999% Offline Uptime Resilience</span>
            </div>
          </div>

          <div className="bg-slate-50/70 dark:bg-darkSurface/60 p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-2xs hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-950 dark:text-white">Tier 1 Security & Compliance</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                PCI-DSS Tier 1 certified P2PE tokenization, role-based manager override governance, and immutable transactional audit trails built directly into the core engine.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-primary flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>P2PE Hardware Isolation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Enterprise Blueprint CTA Section */}
      <section className="bg-slate-50/70 dark:bg-darkSurface/40 border-y border-slate-200/80 dark:border-slate-800 py-14 sm:py-20">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-bold text-primary uppercase tracking-wider">
            <Building2 size={13} />
            <span>Scale With Absolute Confidence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-syne font-extrabold text-slate-950 dark:text-white">
            Explore Our Enterprise Blueprints & Guides
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover technical architecture guides, hardware migration checklists, and multi-store ROI models to plan your rollout.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/resources/pos-guide"
              className="px-6 py-3.5 rounded-2xl bg-primary text-white font-syne font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:bg-primary-dark transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Read POS Master Guide</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/resources"
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-darkBg text-slate-800 dark:text-slate-200 font-syne font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-200 dark:border-slate-800 hover:border-primary transition-all inline-flex items-center gap-2"
            >
              <span>Browse Resource Hub</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTABanner */}
      <CTABanner />
    </div>
  );
}

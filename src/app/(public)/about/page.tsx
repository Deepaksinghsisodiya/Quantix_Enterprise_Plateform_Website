// src/app/(public)/about/page.tsx
'use client';

import React from 'react';
import { Award, Users, Globe, Target, Flame, Sparkles, Building2, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import SocialProofStatsWrapper from '@/features/SocialProof/components/SocialProofWrapper';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header text-center">
        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-4 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">About Us</span>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
              <Flame size={13} className="text-primary" />
              <span>Our Mission & Architectural Vision</span>
            </div>

            <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
              Redefining Commerce for Multi-Location Enterprises
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              We engineer offline-first, cloud-synchronized point-of-sale platforms that empower high-volume retail chains and multi-unit restaurant brands to scale with sub-second register velocity.
            </p>

            {/* 3D Visual Showcase */}
            <div className="relative w-full max-w-lg mx-auto aspect-16/10 flex items-center justify-center pt-2">
              <img
                src="/images/products/ent_global_pos.png"
                alt="Quantix Enterprise Engineering Platform"
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Numbers & Statistics Grid */}
      <section className="-mt-8 relative z-20 site-container px-4 sm:px-6">
        <SocialProofStatsWrapper />
      </section>

      {/* 3. Core Architectural Pillars */}
      <section className="section-py site-container px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-syne font-black text-lg text-slate-950 dark:text-white">Offline-First Engine</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Every register operates independently on local IndexedDB storage. Hardware peripherals, receipt printers, and cash drawers never freeze when broadband fails.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Globe size={24} />
            </div>
            <h3 className="font-syne font-black text-lg text-slate-950 dark:text-white">Sub-Second Cloud Telemetry</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Head office dashboards receive live sales totals, cashier throughput speed, and inventory counts in real time via bidirectional gRPC data streaming.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Building2 size={24} />
            </div>
            <h3 className="font-syne font-black text-lg text-slate-950 dark:text-white">Central Menu & Price Book Push</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Update pricing, regional tax brackets, combo bundles, and promotional schedules across 50+ stores in under 200 milliseconds.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTABanner */}
      <CTABanner />
    </>
  );
}

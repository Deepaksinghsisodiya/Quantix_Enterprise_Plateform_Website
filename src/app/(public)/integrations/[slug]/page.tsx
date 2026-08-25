'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { useContactModal } from '@/context/ContactModalContext';
import { INTEGRATIONS_DATA } from '@/data/integrationsData';
import { Check, ArrowRight, ShieldCheck, Zap, Layers, RefreshCw, Smartphone, Clock, Award, Star, Lock, Sparkles, HelpCircle } from 'lucide-react';

export default function IntegrationDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const data = INTEGRATIONS_DATA[slug];
  const { openModal } = useContactModal();

  if (!data) {
    return (
      <main className="min-h-[75vh] flex flex-col items-center justify-center pt-36 pb-20 text-center px-4">
        <div className="h-16 w-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-2xl mb-4">
          !
        </div>
        <h1 className="text-4xl font-syne font-black mb-3 text-slate-900 dark:text-white">Integration Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md text-sm font-medium">
          The integration platform you requested is unavailable or has been relocated.
        </p>
        <Link
          href="/integrations"
          className="px-6 py-3.5 rounded-xl bg-primary text-white font-syne font-bold text-sm shadow-lg shadow-primary/25"
        >
          Explore Integration Ecosystem →
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-slate-50/60 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Clear of Navbar with pt-32 sm:pt-40) */}
        {/* ========================================================================= */}
        <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-linear-to-b from-white via-slate-50/60 to-slate-50/80 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950">
          {/* Ambient Background Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-120 rounded-full blur-[170px] pointer-events-none opacity-20 dark:opacity-30"
            style={{ backgroundColor: data.accent }}
          />

          {/* Micro Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

          <div className="site-container relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-8 select-none">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/integrations" className="hover:text-primary transition-colors">
                Integrations
              </Link>
              <span>/</span>
              <span className="text-primary font-black uppercase tracking-wider">{data.name}</span>
            </div>

            {/* Glowing Brand Bridge Element */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10">
              {/* Quantix Brand Card */}
              <div className="h-16 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl p-4 flex items-center justify-center shrink-0">
                <span className="text-2xl font-syne font-black text-slate-900 dark:text-white">
                  Quantix<span className="text-primary">.</span>
                </span>
              </div>

              {/* Glowing Sync Status Connector */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider shadow-xs backdrop-blur-md">
                <Zap size={14} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                <span>2-WAY REAL-TIME SYNC</span>
              </div>

              {/* Partner Brand Card */}
              <div className="h-16 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl p-4 flex items-center justify-center shrink-0">
                <Image
                  src={data.logo}
                  alt={data.name}
                  width={140}
                  height={50}
                  className="max-h-full max-w-full object-contain filter dark:brightness-110"
                  unoptimized
                />
              </div>
            </div>

            {/* Title & Headline */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary-dark dark:text-primary-light mb-5 shadow-2xs">
                <Sparkles size={13} />
                <span>{data.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-syne font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                {data.heroHeadline}
              </h1>

              <p className="mt-5 text-base sm:text-xl text-slate-700 dark:text-slate-200 font-bold leading-relaxed max-w-2xl mx-auto">
                {data.tagline}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                {data.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openModal(`Connect ${data.name} Integration`)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-base shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <span>Connect {data.name} Now</span>
                  <ArrowRight size={18} />
                </button>
                <Link
                  href="/contact/sales"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-syne font-bold text-base text-slate-900 dark:text-white transition-all text-center"
                >
                  Talk to Integration Specialist
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl max-w-3xl mx-auto">
                {data.stats.map((st, sIdx) => (
                  <div key={sIdx} className="text-center">
                    <div className="text-2xl sm:text-3xl font-syne font-black text-primary dark:text-primary-light">
                      {st.value}
                    </div>
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. BEFORE VS AFTER COMPARISON SECTION */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900">
          <div className="site-container max-w-5xl">
            <div className="text-center mb-14">
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">
                OPERATIONAL IMPACT
              </span>
              <h2 className="text-3xl sm:text-4xl font-syne font-black tracking-tight text-slate-900 dark:text-white">
                Before & After Connecting {data.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Without Integration (Old Way) */}
              <div className="p-7 sm:p-9 rounded-3xl bg-rose-500/5 border border-rose-500/20 text-slate-900 dark:text-white space-y-4 relative overflow-hidden">
                <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 font-syne font-black text-lg">
                  <span className="h-8 w-8 rounded-full bg-rose-500/20 flex items-center justify-center text-sm font-bold shrink-0">✕</span>
                  <span>Without Quantix Integration</span>
                </div>
                <ul className="space-y-3.5 pt-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 text-base">•</span>
                    <span>Manual order re-keying leading to register cashier delays and costly item misprints.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 text-base">•</span>
                    <span>Counter tablet clutter resulting in missed delivery tickets and delayed customer prep.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 text-base">•</span>
                    <span>Stock out-of-sync causes double-selling popular menu items during rush hours.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 text-base">•</span>
                    <span>Hours lost every week manually reconciling bank deposits against platform fee statements.</span>
                  </li>
                </ul>
              </div>

              {/* With Quantix Integration (New Way) */}
              <div className="p-7 sm:p-9 rounded-3xl bg-emerald-500/5 border border-emerald-500/30 text-slate-900 dark:text-white space-y-4 shadow-xl shadow-emerald-500/5 relative overflow-hidden">
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-syne font-black text-lg">
                  <span className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                  <span>With Quantix 2-Way Sync</span>
                </div>
                <ul className="space-y-3.5 pt-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold shrink-0 text-base">✓</span>
                    <span>Direct register injection & automatic kitchen ticket printing with zero human re-entry.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold shrink-0 text-base">✓</span>
                    <span>Zero tablet clutter — manage all orders, menus, and preparation status from 1 central screen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold shrink-0 text-base">✓</span>
                    <span>Real-time menu 86ing automatically disables out-of-stock items across channels instantaneously.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold shrink-0 text-base">✓</span>
                    <span>Automated daily payout reconciliation with fees and net deposits logged straight into ledger.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CORE CAPABILITIES GRID */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="site-container">
            <div className="text-center mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">
                POWERFUL FEATURES
              </span>
              <h2 className="text-3xl sm:text-4xl font-syne font-black tracking-tight text-slate-900 dark:text-white">
                Key Features Included With {data.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {data.features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-syne font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. STEP-BY-STEP SETUP WORKFLOW */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="site-container max-w-5xl">
            <div className="text-center mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">
                SIMPLE ONBOARDING
              </span>
              <h2 className="text-3xl sm:text-4xl font-syne font-black tracking-tight text-slate-900 dark:text-white">
                How to Connect {data.name} in 3 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {data.setupSteps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-7 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-12 rounded-xl bg-primary text-white font-syne font-black text-base flex items-center justify-center mb-5 shadow-md">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TECHNICAL DEVELOPER SPECS */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24">
          <div className="site-container max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">
                ENTERPRISE INFRASTRUCTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-syne font-black text-slate-900 dark:text-white">
                Technical Specifications & Compliance
              </h2>
            </div>

            {data.specs.map((spec, spIdx) => (
              <div
                key={spIdx}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 text-center shadow-2xl"
              >
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sync Latency
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 mt-1 block">
                    {spec.syncSpeed}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Data Endpoints
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-primary-light mt-1 block truncate">
                    {spec.dataTypes}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Average Setup
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-400 mt-1 block">
                    {spec.setupTime}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Compliance
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-sky-400 mt-1 block">
                    {spec.security}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="site-container max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-syne font-black text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80"
                >
                  <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <HelpCircle size={16} className="text-primary shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. BOTTOM CONVERSION CTA BANNER */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-primary text-white text-center">
          <div className="site-container max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-syne font-black mb-4">
              Ready to Connect {data.name} with Quantix POS?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8 font-medium">
              Join thousands of merchants automating their payments, inventory, and delivery operations today.
            </p>
            <button
              onClick={() => openModal(`Get Started with ${data.name} Integration`)}
              className="px-8 py-4 rounded-xl bg-white text-primary hover:bg-slate-100 font-syne font-bold text-base shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Get Started with {data.name} Integration →
            </button>
          </div>
        </section>

      </main>
  );
}

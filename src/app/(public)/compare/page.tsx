// src/app/(public)/compare/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Shield, ArrowRight, Zap, Coins, Layers, Lock, Cpu, Server, CheckCircle2 } from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface Competitor {
  name: string;
  slug: string;
  category: string;
  offlineMode: string;
  paymentProcessor: string;
  multiLocation: string;
  hardwareFreedom: string;
  enterpriseIntegrations: string;
  pricing: string;
  verdict: string;
}

const COMPETITORS: Competitor[] = [
  {
    name: 'Toast POS',
    slug: 'toast',
    category: 'Restaurant POS',
    offlineMode: 'Degraded (Cloud reliant, 24h limit)',
    paymentProcessor: 'Forced Toast Processing (High swipe markups)',
    multiLocation: 'Cloud-only (Manual location adjustments)',
    hardwareFreedom: 'Locked proprietary Toast hardware only',
    enterpriseIntegrations: 'Walled garden, high API add-on fees',
    pricing: '$79+/mo/till + 2.99% swipe + mandatory fees',
    verdict: 'Forces payment processor lock-in with proprietary hardware and variable percentage cuts.',
  },
  {
    name: 'Clover POS',
    slug: 'clover',
    category: 'Generic Merchant POS',
    offlineMode: 'Limited offline (No local database mesh)',
    paymentProcessor: 'Locked to Fiserv/First Data processing contracts',
    multiLocation: 'Separate store accounts, manual menu edits',
    hardwareFreedom: 'Proprietary Clover hardware required',
    enterpriseIntegrations: 'Marketplace third-party paid plugins',
    pricing: '$45+/mo + terminal leases + app marketplace fees',
    verdict: 'Heavy hardware leasing fees and expensive app marketplace add-ons for multi-unit operators.',
  },
  {
    name: 'Lightspeed POS',
    slug: 'lightspeed',
    category: 'Retail & Hospitality',
    offlineMode: 'Cloud-dependent (Registers freeze without WAN)',
    paymentProcessor: 'Mandatory Lightspeed Payments or penalty fees',
    multiLocation: 'Central catalog with latency delays',
    hardwareFreedom: 'Primarily iOS tablets, limited cross-platform',
    enterpriseIntegrations: 'Good APIs, but expensive enterprise tier',
    pricing: '$89 - $269/mo + payment processing penalty',
    verdict: 'Charges punitive transaction penalty fees if you use external merchant processors.',
  },
  {
    name: 'Square POS',
    slug: 'square',
    category: 'Micro & Small Business',
    offlineMode: 'Basic offline card storage (No offline till mesh)',
    paymentProcessor: 'Locked exclusively to Square card processing',
    multiLocation: 'Limited franchise hierarchy & recipe yield COGS',
    hardwareFreedom: 'Square proprietary hardware & iOS devices',
    enterpriseIntegrations: 'Restricted developer ecosystem',
    pricing: '2.6% + 10¢ per tap (High volume penalty)',
    verdict: 'Great for single-location popups, but highly expensive and fragmented for scaling multi-unit operations.',
  }
];

export default function CompareCompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor>(COMPETITORS[0]);

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      {/* Header Banner */}
      <div className="site-container text-center mb-12 sm:mb-16 space-y-4 px-4 sm:px-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-primary shadow-xs">
          UNBIASED ARCHITECTURE COMPARISON
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
          Quantix vs Legacy POS Platforms
        </h1>
        <p className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          See why fast-growing multi-location retail and restaurant chains choose Quantix over walled-garden systems: true zero-latency offline operations, Bring-Your-Own processor freedom, and zero variable transaction cuts.
        </p>
      </div>

      <div className="site-container max-w-6xl space-y-10 px-4 sm:px-6">
        {/* Selector Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {COMPETITORS.map((comp) => (
            <button
              key={comp.slug}
              type="button"
              onClick={() => setSelectedCompetitor(comp)}
              className={`px-5 py-2.5 sm:py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                selectedCompetitor.slug === comp.slug
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-102'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-primary/40'
              }`}
            >
              vs {comp.name}
            </button>
          ))}
        </div>

        {/* Comparison Matrix Box */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-amber-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Feature Column Labels (Desktop) */}
            <div className="space-y-6 hidden md:block">
              <div className="h-14 flex items-end pb-3 text-xs font-black text-slate-400 uppercase tracking-wider">
                Evaluation Criteria
              </div>
              <div className="h-16 flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                Offline Continuity Architecture
              </div>
              <div className="h-16 flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                Payment Processor Freedom
              </div>
              <div className="h-16 flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                Multi-Location HQ Management
              </div>
              <div className="h-16 flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                Hardware Independence
              </div>
              <div className="h-16 flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                ERP & Open API Telemetry
              </div>
              <div className="h-16 flex items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                Pricing & Variable Fees
              </div>
            </div>

            {/* Quantix Column (Champion) */}
            <div className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/30 rounded-2xl p-5 sm:p-6 space-y-6 relative shadow-md">
              <div className="absolute -top-3 right-4 text-[9px] font-black text-white bg-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Recommended Choice
              </div>
              <div className="h-14 flex flex-col justify-end">
                <span className="text-base sm:text-lg font-syne font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Quantix Platform
                </span>
                <span className="text-[11px] text-primary font-bold">Unified Operating Platform</span>
              </div>
              
              <div className="space-y-6 text-left">
                {/* 1. Offline */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Offline Continuity Architecture</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-start gap-1.5">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    <span>True Perpetual Offline (IndexedDB till mesh, 0ms lag, auto-sync)</span>
                  </span>
                </div>

                {/* 2. Payments */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Payment Processor Freedom</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-start gap-1.5">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    <span>Bring Your Own Processor (Chase, Fiserv, Stripe, Adyen — 0% Quantix cut)</span>
                  </span>
                </div>

                {/* 3. Multi-location */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Multi-Location HQ Management</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>1-Click Central Menu & Price Tiering across 50+ stores in &lt;15s</span>
                  </span>
                </div>

                {/* 4. Hardware */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Hardware Independence</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Cross-platform: Windows, Android, Linux, iPad, ESC/POS printers</span>
                  </span>
                </div>

                {/* 5. APIs */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">ERP & Open API Telemetry</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Direct webhooks & gRPC pipelines into SAP, NetSuite & QuickBooks</span>
                  </span>
                </div>

                {/* 6. Pricing */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Pricing & Variable Fees</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-mono">
                    Predictable Flat SaaS (0% Transaction Tax)
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Competitor Column */}
            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
              <div className="h-14 flex flex-col justify-end">
                <span className="text-base sm:text-lg font-syne font-black text-slate-600 dark:text-slate-400 uppercase tracking-tight">
                  {selectedCompetitor.name}
                </span>
                <span className="text-[11px] text-slate-400">{selectedCompetitor.category}</span>
              </div>
              
              <div className="space-y-6 text-left">
                {/* 1. Offline */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Offline Continuity Architecture</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{selectedCompetitor.offlineMode}</span>
                  </span>
                </div>

                {/* 2. Payments */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Payment Processor Freedom</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{selectedCompetitor.paymentProcessor}</span>
                  </span>
                </div>

                {/* 3. Multi-location */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Multi-Location HQ Management</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{selectedCompetitor.multiLocation}</span>
                  </span>
                </div>

                {/* 4. Hardware */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Hardware Independence</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{selectedCompetitor.hardwareFreedom}</span>
                  </span>
                </div>

                {/* 5. APIs */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">ERP & Open API Telemetry</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{selectedCompetitor.enterpriseIntegrations}</span>
                  </span>
                </div>

                {/* 6. Pricing */}
                <div className="h-16 flex flex-col justify-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase md:hidden">Pricing & Variable Fees</span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                    {selectedCompetitor.pricing}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Dive Link to competitor slug */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              <strong className="text-slate-900 dark:text-white">Summary verdict:</strong> {selectedCompetitor.verdict}
            </p>
            <Link
              href={`/compare/${selectedCompetitor.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-dark transition-all cursor-pointer shrink-0 shadow-xs"
            >
              <span>Full Quantix vs {selectedCompetitor.name} Breakdown</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 3 Strategic Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Zap size={18} />
            </div>
            <h4 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
              Zero Outage Revenue Risk
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Offline sales ring up in under 4ms with local IndexedDB caches. When internet drops, registers, barcode scanners, and thermal printers never skip a beat.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Coins size={18} />
            </div>
            <h4 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
              Zero Payment Lock-In
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Negotiate your own interchange-plus merchant rates with your preferred bank. Quantix never takes a slice of your card turnover.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <Shield size={18} />
            </div>
            <h4 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
              Hardware Independence
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Deploy on touchscreens, Windows POS boxes, iPads, Android terminals, and network ESC/POS thermal printers without forced proprietary hardware.
            </p>
          </div>
        </div>
      </div>

      {/* Global CTA Banner */}
      <div className="mt-16">
        <CTABanner />
      </div>
    </div>
  );
}


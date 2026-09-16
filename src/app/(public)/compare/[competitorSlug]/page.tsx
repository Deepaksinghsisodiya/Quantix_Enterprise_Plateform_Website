// src/app/(public)/compare/[competitorSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  Scale,
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Store,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface CompetitorData {
  slug: string;
  name: string;
  posType: string;
  strengths: string[];
  weaknesses: string[];
  pricingComparison: string;
  featuresList: { title: string; quantix: boolean; competitor: boolean; note: string }[];
}

const COMPETITORS_DATA: Record<string, CompetitorData> = {
  toast: {
    slug: 'toast',
    name: 'Toast POS',
    posType: 'Restaurant Specialist',
    strengths: ['Popular brand recognition', 'Functional restaurant handhelds'],
    weaknesses: [
      'Mandatory proprietary payment processing with high variable fee markups',
      'Degraded offline mode (hard 24-hour time limits, features freeze without cloud)',
      'High hardware and contract lock-in with punitive cancellation terms',
    ],
    pricingComparison:
      'Toast locks merchants into exclusive payment processing where interchange rates cannot be negotiated freely. Quantix allows full Bring-Your-Own-Processor integration with 0% variable payment surcharge.',
    featuresList: [
      {
        title: 'Bring-Your-Own-Processor',
        quantix: true,
        competitor: false,
        note: 'Quantix lets you integrate Chase, Fiserv, Stripe, or Adyen; Toast mandates Toast Processing.',
      },
      {
        title: 'Perpetual Offline Operations',
        quantix: true,
        competitor: false,
        note: 'Quantix operates indefinitely offline via IndexedDB till mesh; Toast requires cloud heartbeat within 24h.',
      },
      {
        title: '1-Click Multi-Store Menu Sync',
        quantix: true,
        competitor: false,
        note: 'Quantix deploys global catalog updates to 50+ stores in <15s with regional price tiering.',
      },
      {
        title: 'Kitchen Display (KDS) & Multi-Course',
        quantix: true,
        competitor: true,
        note: 'Both support multi-station kitchen display systems with fire times and table alerts.',
      },
      {
        title: 'Recipe Yield & COGS Tracking',
        quantix: true,
        competitor: false,
        note: 'Quantix tracks raw ingredient deductions and menu engineering out of the box.',
      },
      {
        title: 'Hardware Freedom (Windows/Android/iOS)',
        quantix: true,
        competitor: false,
        note: 'Quantix runs on existing standard commercial hardware; Toast mandates Toast terminals.',
      },
    ],
  },
  clover: {
    slug: 'clover',
    name: 'Clover POS',
    posType: 'Generic Merchant Systems',
    strengths: ['Solid counter terminal hardware', 'Wide bank sales rep distribution'],
    weaknesses: [
      'Costly app marketplace add-ons required for basic multi-store features',
      'Store-by-store siloed catalogs without instant global sync',
      'No perpetual offline database mesh for multi-terminal sync',
    ],
    pricingComparison:
      'Clover requires buying expensive proprietary hardware and paying monthly fees for third-party marketplace apps. Quantix provides all multi-location and telemetry features natively with zero app store toll gates.',
    featuresList: [
      {
        title: 'Cross-Device Compatibility',
        quantix: true,
        competitor: false,
        note: 'Quantix works on PC, touchscreens, and tablets; Clover mandates proprietary Clover hardware.',
      },
      {
        title: 'Native Unified Enterprise Suite',
        quantix: true,
        competitor: false,
        note: 'Quantix includes all analytics, inventory, and KDS natively without third-party app subscriptions.',
      },
      {
        title: 'Central Franchise Menu Sync',
        quantix: true,
        competitor: false,
        note: 'Quantix syncs multi-stores instantly; Clover requires store-by-store manual updates.',
      },
      {
        title: 'Direct ERP Webhooks (SAP/NetSuite)',
        quantix: true,
        competitor: false,
        note: 'Quantix streams itemized ledgers directly into enterprise financial ledgers.',
      },
      {
        title: 'Barcode Scanner & Printer Support',
        quantix: true,
        competitor: true,
        note: 'Both support plug-and-play barcode scanners and ESC/POS thermal printers.',
      },
    ],
  },
  lightspeed: {
    slug: 'lightspeed',
    name: 'Lightspeed POS',
    posType: 'Retail & Hospitality Specialist',
    strengths: ['Detailed retail inventory matrices', 'Established omnichannel brand'],
    weaknesses: [
      'Charges transaction penalties if you do not use Lightspeed Payments',
      'Cloud-tethered architecture causes tills to freeze during WAN drops',
      'High monthly subscription costs for multi-unit enterprise features',
    ],
    pricingComparison:
      'Lightspeed charges transaction penalty markups for external payment gateways and high recurring software tiers. Quantix delivers true offline survival and flat, predictable SaaS pricing.',
    featuresList: [
      {
        title: 'Zero Transaction Gateway Penalty',
        quantix: true,
        competitor: false,
        note: 'Quantix never penalizes you for using your preferred payment provider.',
      },
      {
        title: 'Sub-4ms Offline Cashier Speed',
        quantix: true,
        competitor: false,
        note: 'Quantix till mesh guarantees instant scanning and checkout during broadband outages.',
      },
      {
        title: 'Multi-Location Inventory Rebalancing',
        quantix: true,
        competitor: true,
        note: 'Both support inter-store transfers and central warehouse purchase orders.',
      },
      {
        title: 'Enterprise Dedicated Onboarding',
        quantix: true,
        competitor: false,
        note: 'Quantix guarantees zero rollout risk with white-glove engineering onboarding.',
      },
    ],
  },
  square: {
    slug: 'square',
    name: 'Square POS',
    posType: 'Micro & Small Business',
    strengths: ['Fast self-serve onboarding', 'Clean consumer hardware design'],
    weaknesses: [
      'High variable transaction cut (2.6% + 10¢) that drains margin as stores scale',
      'No true local database mesh across multiple counter tills',
      'Lack of complex recipe yield costing and franchise hierarchy control',
    ],
    pricingComparison:
      'Square charges 2.6% + 10¢ per transaction, costing a $1M/yr multi-unit chain over $26,000 in payment fees. Quantix flat SaaS model preserves your gross margin.',
    featuresList: [
      {
        title: 'Flat SaaS Pricing (Zero Swipe Take)',
        quantix: true,
        competitor: false,
        note: 'Quantix charges flat software fees, saving growing businesses tens of thousands yearly.',
      },
      {
        title: 'Local Till Mesh & Receipt Spooler',
        quantix: true,
        competitor: false,
        note: 'Quantix runs peer-to-peer across all counter registers during local network blackouts.',
      },
      {
        title: 'Ingredient & Recipe Yield COGS',
        quantix: true,
        competitor: false,
        note: 'Quantix includes deep hospitality inventory costing out of the box.',
      },
      {
        title: 'Tap to Pay & Contactless NFC',
        quantix: true,
        competitor: true,
        note: 'Both support Apple Pay, Google Pay, and contactless cards.',
      },
    ],
  },
};

const ALL_COMPETITORS = [
  { slug: 'toast', name: 'Toast' },
  { slug: 'clover', name: 'Clover' },
  { slug: 'lightspeed', name: 'Lightspeed' },
  { slug: 'square', name: 'Square' },
];

export default function CompetitorComparePage() {
  const params = useParams();
  const competitorSlug = (params?.competitorSlug as string)?.toLowerCase();
  const competitor = COMPETITORS_DATA[competitorSlug];

  if (!competitor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-orange-400/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Why Quantix trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors font-medium">Why Quantix</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/compare" className="hover:text-primary transition-colors font-medium">Compare</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">vs {competitor.name}</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-syne font-bold uppercase tracking-wider text-primary shadow-xs">
              <Sparkles size={13} />
              <span>ARCHITECTURAL AUDIT & MATRIX</span>
            </div>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight tracking-tight">
              Quantix vs{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-amber-500 to-orange-600">
                {competitor.name}
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              Detailed head-to-head comparison between Quantix and {competitor.name}. Evaluate offline reliability, payment freedom, multi-location catalog controls, and total cost of ownership.
            </p>
          </div>

          {/* Quick Competitor Switcher */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Other Comparisons:</span>
            {ALL_COMPETITORS.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  c.slug === competitor.slug
                    ? 'bg-[#FF4F00] border-[#FF4F00] text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-orange-400/60'
                }`}
              >
                vs {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="site-container max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        
        {/* Dual Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Limitation & Advantage Cards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Competitor Limitations */}
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <AlertTriangle size={16} />
                <span className="text-xs font-syne font-black uppercase tracking-wider">
                  Documented Limitations of {competitor.name}
                </span>
              </div>
              <ul className="space-y-2 pt-1">
                {competitor.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    <X size={14} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantix Advantages */}
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 size={16} />
                <span className="text-xs font-syne font-black uppercase tracking-wider">
                  The Quantix Architectural Advantage
                </span>
              </div>
              <ul className="space-y-2 pt-1">
                {[
                  'Bring-Your-Own-Processor freedom with 0% software transaction surcharge',
                  'Perpetual offline till mesh running on sub-4ms local IndexedDB databases',
                  '1-click instant catalog push to 50+ stores simultaneously in <15s',
                  'No proprietary terminal lock-in — deploy on Windows, Android, iPads & ESC/POS',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    <Check size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Total Cost of Ownership Box */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-md border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-6 sm:p-7 relative overflow-hidden shadow-2xs">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-amber-500 to-primary" />
            
            <div className="space-y-3">
              <span className="text-[10px] font-syne font-black uppercase tracking-wider text-[#FF4F00] flex items-center gap-1.5">
                <Scale size={13} /> TOTAL COST OF OWNERSHIP
              </span>
              <h2 className="text-base sm:text-lg font-syne font-black uppercase text-slate-900 dark:text-white">
                Financial Impact & ROI
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {competitor.pricingComparison}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
                <span>Zero variable transaction take with Quantix</span>
              </div>
              <Link href="/roi-calculator" className="block w-full">
                <button className="w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 text-xs font-syne font-bold uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                  <span>Calculate Your Exact Savings</span>
                  <ArrowRight size={13} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Comparison Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-2xl font-syne font-black uppercase text-slate-900 dark:text-white tracking-tight">
                Verified Feature Matrix
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Detailed comparison verified by multi-store enterprise benchmarks.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full w-fit">
              AUDITED 2026 BENCHMARK
            </span>
          </div>

          {/* 📱 MOBILE VIEW: Feature Cards (< md) */}
          <div className="block md:hidden space-y-3.5">
            {competitor.featuresList.map((f, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="font-syne font-bold text-xs uppercase text-slate-900 dark:text-white">
                    {f.title}
                  </h3>
                </div>

                {/* Side by side mini pills */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                    <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Quantix</p>
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                      <span>{f.quantix ? 'Supported' : 'No'}</span>
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <p className="text-[9px] font-bold text-slate-500 uppercase">{competitor.name}</p>
                    <p className={`text-xs font-bold flex items-center gap-1 mt-0.5 ${f.competitor ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {f.competitor ? <Check size={13} strokeWidth={3} /> : <X size={13} strokeWidth={3} />}
                      <span>{f.competitor ? 'Supported' : 'Restricted'}</span>
                    </p>
                  </div>
                </div>

                {/* Architectural Detail note */}
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-800 dark:text-slate-200">Architectural Note: </strong>
                  {f.note}
                </p>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: Clean Table (>= md) */}
          <div className="hidden md:block rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden">
            <table className="w-full text-left text-xs font-medium border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase text-slate-400 tracking-wider bg-slate-50 dark:bg-slate-950/80">
                  <th className="p-5 font-bold w-1/4">Capability Area</th>
                  <th className="p-5 font-bold text-[#FF4F00] w-1/5">Quantix Platform</th>
                  <th className="p-5 font-bold text-slate-700 dark:text-slate-300 w-1/5">{competitor.name}</th>
                  <th className="p-5 font-bold text-slate-400 w-2/5">Architectural Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {competitor.featuresList.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-5 font-syne font-bold text-slate-900 dark:text-white text-xs">
                      {f.title}
                    </td>
                    <td className="p-5">
                      {f.quantix ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                          <Check size={14} strokeWidth={3} /> Included Native
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-500 font-bold text-xs">
                          <X size={14} strokeWidth={3} /> Not Supported
                        </span>
                      )}
                    </td>
                    <td className="p-5">
                      {f.competitor ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                          <Check size={14} strokeWidth={3} /> Supported
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-xs bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-800/50">
                          <X size={14} strokeWidth={3} /> Restricted
                        </span>
                      )}
                    </td>
                    <td className="p-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {f.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>

      {/* Global CTA Banner */}
      <CTABanner />
    </main>
  );
}

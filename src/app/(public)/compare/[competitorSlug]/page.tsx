// src/app/(public)/compare/[competitorSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Sparkles, Scale, X, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
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
  'toast': {
    slug: 'toast',
    name: 'Toast POS',
    posType: 'Restaurant Specialist',
    strengths: ['Popular brand recognition', 'Functional restaurant handhelds'],
    weaknesses: [
      'Mandatory proprietary payment processing with high variable fee markups',
      'Degraded offline mode (hard 24-hour time limits, features freeze without cloud)',
      'High hardware and contract lock-in with punitive cancellation terms'
    ],
    pricingComparison: 'Toast locks merchants into exclusive payment processing where interchange rates cannot be negotiated freely. Quantix allows full Bring-Your-Own-Processor integration with 0% variable payment surcharge.',
    featuresList: [
      { title: 'Bring-Your-Own-Processor', quantix: true, competitor: false, note: 'Quantix lets you integrate Chase, Fiserv, Stripe, or Adyen; Toast mandates Toast Processing.' },
      { title: 'Perpetual Offline Operations', quantix: true, competitor: false, note: 'Quantix operates indefinitely offline via IndexedDB till mesh; Toast requires cloud heartbeat within 24h.' },
      { title: '1-Click Multi-Store Menu Sync', quantix: true, competitor: false, note: 'Quantix deploys global catalog updates to 50+ stores in <15s with regional price tiering.' },
      { title: 'Kitchen Display (KDS) & Multi-Course', quantix: true, competitor: true, note: 'Both support multi-station kitchen display systems.' },
      { title: 'Recipe Yield & COGS Tracking', quantix: true, competitor: false, note: 'Quantix tracks raw ingredient deductions and menu engineering out of the box.' },
      { title: 'Hardware Freedom (Windows/Android/iOS)', quantix: true, competitor: false, note: 'Quantix runs on existing standard commercial hardware; Toast mandates Toast terminals.' }
    ]
  },
  'clover': {
    slug: 'clover',
    name: 'Clover POS',
    posType: 'Generic Merchant Systems',
    strengths: ['Solid counter terminal hardware', 'Wide bank sales rep distribution'],
    weaknesses: [
      'Costly app marketplace add-ons required for basic multi-store features',
      'Store-by-store siloed catalogs without instant global sync',
      'No perpetual offline database mesh for multi-terminal sync'
    ],
    pricingComparison: 'Clover requires buying expensive proprietary hardware and paying monthly fees for third-party marketplace apps. Quantix provides all multi-location and telemetry features natively with zero app store toll gates.',
    featuresList: [
      { title: 'Cross-Device Compatibility', quantix: true, competitor: false, note: 'Quantix works on PC, touchscreens, and tablets; Clover mandates proprietary Clover hardware.' },
      { title: 'Native Unified Enterprise Suite', quantix: true, competitor: false, note: 'Quantix includes all analytics, inventory, and KDS natively without third-party app subscriptions.' },
      { title: 'Central Franchise Menu Sync', quantix: true, competitor: false, note: 'Quantix syncs multi-stores instantly; Clover requires store-by-store manual updates.' },
      { title: 'Direct ERP Webhooks (SAP/NetSuite)', quantix: true, competitor: false, note: 'Quantix streams itemized ledgers directly into enterprise financial ledgers.' },
      { title: 'Barcode Scanner & Printer Support', quantix: true, competitor: true, note: 'Both support plug-and-play barcode scanners and ESC/POS thermal printers.' }
    ]
  },
  'lightspeed': {
    slug: 'lightspeed',
    name: 'Lightspeed POS',
    posType: 'Retail & Hospitality Specialist',
    strengths: ['Detailed retail inventory matrices', 'Established omnichannel brand'],
    weaknesses: [
      'Charges transaction penalties if you do not use Lightspeed Payments',
      'Cloud-tethered architecture causes tills to freeze during WAN drops',
      'High monthly subscription costs for multi-unit enterprise features'
    ],
    pricingComparison: 'Lightspeed charges transaction penalty markups for external payment gateways and high recurring software tiers. Quantix delivers true offline survival and flat, predictable SaaS pricing.',
    featuresList: [
      { title: 'Zero Transaction Gateway Penalty', quantix: true, competitor: false, note: 'Quantix never penalizes you for using your preferred payment provider.' },
      { title: 'Sub-4ms Offline Cashier Speed', quantix: true, competitor: false, note: 'Quantix till mesh guarantees instant scanning and checkout during broadband outages.' },
      { title: 'Multi-Location Inventory Rebalancing', quantix: true, competitor: true, note: 'Both support inter-store transfers and central warehouse purchase orders.' },
      { title: 'Enterprise Dedicated Onboarding', quantix: true, competitor: false, note: 'Quantix guarantees zero rollout risk with white-glove engineering onboarding.' }
    ]
  },
  'square': {
    slug: 'square',
    name: 'Square POS',
    posType: 'Micro & Small Business',
    strengths: ['Fast self-serve onboarding', 'Clean consumer hardware design'],
    weaknesses: [
      'High variable transaction cut (2.6% + 10¢) that drains margin as stores scale',
      'No true local database mesh across multiple counter tills',
      'Lack of complex recipe yield costing and franchise hierarchy control'
    ],
    pricingComparison: 'Square charges 2.6% + 10¢ per transaction, costing a $1M/yr multi-unit chain over $26,000 in payment fees. Quantix flat SaaS model preserves your gross margin.',
    featuresList: [
      { title: 'Flat SaaS Pricing (Zero Swipe Take)', quantix: true, competitor: false, note: 'Quantix charges flat software fees, saving growing businesses tens of thousands yearly.' },
      { title: 'Local Till Mesh & Receipt Spooler', quantix: true, competitor: false, note: 'Quantix runs peer-to-peer across all counter registers during local network blackouts.' },
      { title: 'Ingredient & Recipe Yield COGS', quantix: true, competitor: false, note: 'Quantix includes deep hospitality inventory costing out of the box.' },
      { title: 'Tap to Pay & Contactless NFC', quantix: true, competitor: true, note: 'Both support Apple Pay, Google Pay, and contactless cards.' }
    ]
  }
};

export default function CompetitorComparePage() {
  const params = useParams();
  const competitorSlug = (params?.competitorSlug as string)?.toLowerCase();
  const competitor = COMPETITORS_DATA[competitorSlug];

  if (!competitor) {
    notFound();
  }

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/compare" className="hover:text-primary transition-colors">Compare</Link>
          <ChevronRight size={10} />
          <span className="text-slate-700 dark:text-slate-300 font-black">Quantix vs {competitor.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-primary shadow-xs">
              <Sparkles size={12} /> ARCHITECTURAL AUDIT
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight tracking-tight">
              Quantix vs <br />
              <span className="text-primary">{competitor.name}</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-xl">
              Compare offline resilience, payment processor autonomy, and multi-unit catalog control. See why growing brands transition to the Quantix operating platform.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2">
                <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 tracking-wider">
                  Limitations of {competitor.name}
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-medium list-disc pl-4">
                  {competitor.weaknesses.map((w, idx) => (
                    <li key={idx} className="leading-snug">{w}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Quantix Advantages
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-medium list-disc pl-4">
                  <li className="leading-snug">Bring-Your-Own processor with 0% software transaction tax</li>
                  <li className="leading-snug">Perpetual offline till mesh (sub-4ms IndexedDB speed)</li>
                  <li className="leading-snug">1-click catalog push to 50+ locations in &lt;15s</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side Financial Box */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Scale size={13} /> Total Cost of Ownership
              </span>
              <h3 className="text-base font-syne font-black uppercase text-slate-900 dark:text-white mt-3 mb-2">
                Financial Impact
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {competitor.pricingComparison}
              </p>
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck size={16} />
                <span>Zero variable percentage take with Quantix</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="max-w-6xl mx-auto border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/40 overflow-hidden shadow-xl mb-12">
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-syne font-black uppercase text-slate-900 dark:text-white">
              Feature Matrix: Quantix vs {competitor.name}
            </h3>
            <span className="text-xs text-slate-500 font-mono font-bold">Verified 2026 Audit</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase text-slate-400 dark:text-slate-500 tracking-wider bg-slate-50/50 dark:bg-slate-900/20">
                  <th className="p-4 sm:p-5">Capability Area</th>
                  <th className="p-4 sm:p-5 font-bold text-primary">Quantix Platform</th>
                  <th className="p-4 sm:p-5">{competitor.name}</th>
                  <th className="p-4 sm:p-5 hidden md:table-cell">Architectural Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {competitor.featuresList.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {f.title}
                    </td>
                    <td className="p-4 sm:p-5">
                      {f.quantix ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                          <Check size={16} strokeWidth={3} /> Included
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-500 font-bold text-xs">
                          <X size={16} strokeWidth={3} /> Not Supported
                        </span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5">
                      {f.competitor ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                          <Check size={16} strokeWidth={3} /> Included
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-500 font-bold text-xs">
                          <X size={16} strokeWidth={3} /> Restricted
                        </span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell leading-relaxed">
                      {f.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global CTA Banner */}
        <CTABanner />
      </div>
    </div>
  );
}


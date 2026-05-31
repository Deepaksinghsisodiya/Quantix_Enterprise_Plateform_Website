// src/app/(public)/compare/[competitorSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ChevronRight, Sparkles, Scale, X, Check, ArrowRight } from 'lucide-react';

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
  'square': {
    slug: 'square',
    name: 'Square POS',
    posType: 'Generic Retail/Restaurant',
    strengths: ['Easy registration', 'No upfront software cost'],
    weaknesses: ['Heavy variable transaction fees', 'Poor offline database reliability', 'Limited recipe margins tools'],
    pricingComparison: 'Square charges 2.6% + 10¢ per swipe. Quantix charges $0 variable swipe fees and only flat SaaS subscriptions, saving average franchises $1,200/month.',
    featuresList: [
      { title: 'Offline Sales', quantix: true, competitor: false, note: 'Quantix has secure perpetual IndexedDB checkout; Square limits offline processing.' },
      { title: 'Course Pacing', quantix: true, competitor: false, note: 'Quantix has multi-course KDS routing; Square Restaurant requires higher tier plans.' },
      { title: 'Recipe margins', quantix: true, competitor: false, note: 'Quantix features granular ingredient costing logs; Square requires third-party plugins.' },
      { title: 'Custom Payment terminals', quantix: true, competitor: true, note: 'Both support secure terminal connections.' }
    ]
  },
  'toast': {
    slug: 'toast',
    name: 'Toast POS',
    posType: 'Restaurant Specialist',
    strengths: ['Popular KDS screens', 'Good handheld registers'],
    weaknesses: ['Forced exclusive payments processing', 'High annual subscription locking', 'No standalone offline mode'],
    pricingComparison: 'Toast locks you into their custom payment gateway with high processing markups. Quantix enables you to bring your own credit card terminal processor.',
    featuresList: [
      { title: 'Bring-Your-Own-Processor', quantix: true, competitor: false, note: 'Quantix lets you integrate any processor; Toast mandates Toast Processing.' },
      { title: 'Offline Operations', quantix: true, competitor: false, note: 'Quantix operates fully offline; Toast has server failover dependencies.' },
      { title: 'Zero Monthly Fee option', quantix: true, competitor: false, note: 'Quantix has Standalone tokens; Toast requires monthly subscription fees.' },
      { title: 'Restaurant KDS Sync', quantix: true, competitor: true, note: 'Both support dynamic kitchen display stations.' }
    ]
  },
  'clover': {
    slug: 'clover',
    name: 'Clover POS',
    posType: 'Generic Merchant Systems',
    strengths: ['Strong hardware build', 'Merchant bank partnerships'],
    weaknesses: ['Complex app marketplace costs', 'Limited telemetry telemetry reporting', 'No global menu syncing'],
    pricingComparison: 'Clover requires buying expensive proprietary hardware and paying for individual apps. Quantix runs on any tablet or PC and holds all features natively.',
    featuresList: [
      { title: 'Hardware Compatibility', quantix: true, competitor: false, note: 'Quantix works on iPad, Android, Windows; Clover mandates Clover hardware.' },
      { title: 'Native App ecosystem', quantix: true, competitor: false, note: 'Quantix includes all reporting; Clover requires paid marketplace apps.' },
      { title: 'Central Menu sync', quantix: true, competitor: false, note: 'Quantix syncs multi-stores instantly; Clover requires store-by-store edits.' },
      { title: 'Barcode scanner support', quantix: true, competitor: true, note: 'Both support plug-and-play barcode scanners.' }
    ]
  }
};

export default function CompetitorComparePage() {
  const params = useParams();
  const competitorSlug = params.competitorSlug as string;
  const competitor = COMPETITORS_DATA[competitorSlug];

  if (!competitor) {
    notFound();
  }

  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container px-4 sm:px-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/compare" className="hover:text-blue-500 transition-colors">Compare</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">vs {competitor.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto mb-16">
            {/* Left side details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
                <Sparkles size={11} /> SIDE-BY-SIDE AUDIT
              </div>
              <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                Quantix vs <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{competitor.name}</span>
              </h1>
              <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                See how we compare on hardware adaptability, payment processor choices, offline database safety, and dynamic subscription structures. Break free from variable swipe markup markups.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase text-red-500 tracking-wider">Common Issues with {competitor.name}</span>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 font-medium list-disc pl-4">
                    {competitor.weaknesses.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase text-emerald-500 tracking-wider">Quantix Strengths</span>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 font-medium list-disc pl-4">
                    <li>Flat SaaS / Standalone Perpetual option</li>
                    <li>Secure local IndexedDB database</li>
                    <li>Course pacing & recipe cost logs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right side pricing contrast box */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 flex items-center gap-1.5">
                  <Scale size={12} /> Financial comparison
                </span>
                <h3 className="text-sm font-bold uppercase text-slate-900 dark:text-white mt-3 mb-2">Cost breakdown</h3>
                <p className="text-xs text-slate-650 dark:text-slate-400 font-medium leading-relaxed">
                  {competitor.pricingComparison}
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="max-w-5xl mx-auto border border-gray-250 dark:border-slate-800/80 rounded-3xl bg-gray-50/20 dark:bg-slate-900/10 overflow-hidden shadow-xl mb-12">
            <div className="p-6 border-b border-gray-250 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20">
              <h3 className="text-sm font-bold uppercase text-slate-900 dark:text-white">Feature comparison grid</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-900 text-[10px] uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                    <th className="p-4 sm:p-5">Feature Module</th>
                    <th className="p-4 sm:p-5">Quantix POS</th>
                    <th className="p-4 sm:p-5">{competitor.name}</th>
                    <th className="p-4 sm:p-5 hidden md:table-cell">Detailed breakdown note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-900 text-slate-700 dark:text-slate-350">
                  {competitor.featuresList.map((f, idx) => (
                    <tr key={idx} className="hover:bg-gray-100/30 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="p-4 sm:p-5 font-syne font-bold uppercase text-[11px] text-slate-900 dark:text-white">{f.title}</td>
                      <td className="p-4 sm:p-5">
                        {f.quantix ? <Check size={16} className="text-emerald-500" /> : <X size={16} className="text-red-500" />}
                      </td>
                      <td className="p-4 sm:p-5">
                        {f.competitor ? <Check size={16} className="text-emerald-500" /> : <X size={16} className="text-red-500" />}
                      </td>
                      <td className="p-4 sm:p-5 text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden md:table-cell">{f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Conversion Box */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 blur-[80px] rounded-full pointer-events-none" />
            <h2 className="text-2xl sm:text-4xl font-syne font-black uppercase tracking-tight">Ready to switch to Quantix?</h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto leading-relaxed">
              Ditch expensive swipe fees and locked payment processors. Transition your locations easily using our automated database CSV import helper.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link href="/sign-up">
                <span className="rounded-full bg-white hover:bg-slate-100 text-blue-600 text-xs font-bold py-3.5 px-7 shadow-lg transition-all cursor-pointer">
                  Start Switch Now
                </span>
              </Link>
              <Link href="/contact">
                <span className="rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-bold py-3.5 px-7 transition-all cursor-pointer">
                  Talk to Switch Team
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}

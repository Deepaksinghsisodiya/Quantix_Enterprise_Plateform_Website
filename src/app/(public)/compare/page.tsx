// src/app/(public)/compare/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Check, X, Shield, ArrowRight, Zap, Coins, HelpCircle } from 'lucide-react';

const COMPETITORS = [
  {
    name: 'Square POS',
    slug: 'square',
    offlineMode: 'Basic (Offline cards only)',
    multiLocation: 'Limited sync',
    kds: 'No KDS support',
    tokenOption: 'Subscription Only',
    api: 'Yes (Restricted)',
    pricing: '2.6% + 10¢ per tap',
  },
  {
    name: 'Toast POS',
    slug: 'toast',
    offlineMode: '24hr caching limit',
    multiLocation: 'Yes (Cloud only)',
    kds: 'Yes (Proprietary terminals)',
    tokenOption: 'Subscription Only',
    api: 'Yes (Highly restricted)',
    pricing: '$79+/mo + transaction fees',
  },
  {
    name: 'Clover POS',
    slug: 'clover',
    offlineMode: 'Limited offline support',
    multiLocation: 'Yes (Cloud only)',
    kds: 'Add-on module',
    tokenOption: 'Subscription Only',
    api: 'Yes (Limited)',
    pricing: '$45+/mo + terminal rentals',
  },
  {
    name: 'Lightspeed POS',
    slug: 'lightspeed',
    offlineMode: 'No offline operations',
    multiLocation: 'Yes (Cloud only)',
    kds: 'Yes (Cloud dependent)',
    tokenOption: 'Subscription Only',
    api: 'Yes',
    pricing: '$69+/mo + transactional cuts',
  }
];

export default function CompareCompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState(COMPETITORS[0]);

  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-slate-950 min-h-screen text-white pb-16">
        <div className="site-container text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 shadow-sm">
            MARKET COMPARISON
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
            Quantix vs Competitors
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            See a transparent feature comparison. Discover why merchants switch from generic retail and food terminals to Quantix offline-first architecture.
          </p>
        </div>

        <div className="site-container max-w-5xl space-y-12">
          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {COMPETITORS.map((comp) => (
              <button
                key={comp.slug}
                onClick={() => setSelectedCompetitor(comp)}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedCompetitor.slug === comp.slug
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                vs {comp.name}
              </button>
            ))}
          </div>

          {/* Comparison Matrix Box */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Feature column labels */}
              <div className="space-y-6 hidden md:block">
                <div className="h-14 flex items-end pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Features</div>
                <div className="h-16 flex items-center text-xs font-bold text-slate-400">Offline architecture</div>
                <div className="h-16 flex items-center text-xs font-bold text-slate-400">Multi-Location cloud sync</div>
                <div className="h-16 flex items-center text-xs font-bold text-slate-400">Kitchen Display (KDS)</div>
                <div className="h-16 flex items-center text-xs font-bold text-slate-400">Subscription Token licensing</div>
                <div className="h-16 flex items-center text-xs font-bold text-slate-400">Open API access</div>
                <div className="h-16 flex items-center text-xs font-bold text-slate-400">Monthly costs</div>
              </div>

              {/* Quantix POS features */}
              <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-6 space-y-6 relative">
                <div className="absolute top-3 right-3 text-[8px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase">Recommends</div>
                <div className="h-10 flex flex-col justify-end">
                  <span className="text-sm font-syne font-black text-white uppercase tracking-tight">Quantix POS</span>
                </div>
                
                {/* Mobile indicators fallback */}
                <div className="space-y-6 text-left">
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Offline architecture</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Check size={14} className="stroke-[3]" /> True Offline Mode (No cloud dependency)
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Multi-Location cloud sync</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-400 stroke-[3]" /> Centralised cloud telemetry
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Kitchen Display (KDS)</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-400 stroke-[3]" /> Fully custom KDS workflows
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Subscription Token licensing</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Check size={14} className="stroke-[3]" /> Offline Token purchase mode available
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Open API access</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-400 stroke-[3]" /> Open documentation REST API
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Monthly costs</span>
                    <span className="text-xs font-bold text-white font-mono">$49/mo (No transactional markup)</span>
                  </div>
                </div>
              </div>

              {/* Selected Competitor features */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                <div className="h-10 flex flex-col justify-end">
                  <span className="text-sm font-syne font-black text-slate-400 uppercase tracking-tight">{selectedCompetitor.name}</span>
                </div>
                
                <div className="space-y-6 text-left">
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Offline architecture</span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <X size={14} className="text-rose-500 stroke-[3]" /> {selectedCompetitor.offlineMode}
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Multi-Location cloud sync</span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      {selectedCompetitor.multiLocation.includes('Yes') ? <Check size={14} className="text-emerald-400 stroke-[3]" /> : <X size={14} className="text-rose-500 stroke-[3]" />}
                      {selectedCompetitor.multiLocation}
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Kitchen Display (KDS)</span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      {selectedCompetitor.kds.includes('Yes') ? <Check size={14} className="text-emerald-400 stroke-[3]" /> : <X size={14} className="text-rose-500 stroke-[3]" />}
                      {selectedCompetitor.kds}
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Subscription Token licensing</span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <X size={14} className="text-rose-500 stroke-[3]" /> {selectedCompetitor.tokenOption}
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Open API access</span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      {selectedCompetitor.api.includes('Yes') ? <Check size={14} className="text-emerald-400 stroke-[3]" /> : <X size={14} className="text-rose-500 stroke-[3]" />}
                      {selectedCompetitor.api}
                    </span>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase md:hidden">Monthly costs</span>
                    <span className="text-xs font-semibold text-slate-400 font-mono">{selectedCompetitor.pricing}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bullet Advantage Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Zap size={18} />
              </div>
              <h4 className="text-sm font-syne font-bold uppercase text-white">True Offline Processing</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Never lose a transaction during local internet outages. Quantix operations sync dynamically the instant connection returns.
              </p>
            </div>

            <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Coins size={18} />
              </div>
              <h4 className="text-sm font-syne font-bold uppercase text-white">Zero Vendor Lock-In</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Keep your standard credit card processing rates. We support all leading acquirers without transaction cuts.
              </p>
            </div>

            <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Shield size={18} />
              </div>
              <h4 className="text-sm font-syne font-bold uppercase text-white">Windows & Linux Compatibility</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Run on your existing terminal devices. No overpriced proprietary tablet setups required.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}

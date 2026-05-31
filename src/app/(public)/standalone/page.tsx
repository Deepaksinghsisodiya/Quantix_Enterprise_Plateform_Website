// src/app/(public)/standalone/page.tsx
'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Shield, WifiOff, RefreshCw, Key, HelpCircle, ArrowRight, Video, Download } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  { step: '1', title: 'Register Account', description: 'Create your free Quantix account with your business details.' },
  { step: '2', title: 'Choose Token', description: 'Select a licensing tier (Basic, Standard, Advance, Premium) and duration (30-365 days).' },
  { step: '3', title: 'Download Client', description: 'Download the offline standalone client POS for Windows or Linux.' },
  { step: '4', title: 'Activate & Run', description: 'Enter your valid perpetual token code to activate. Start selling offline instantly!' },
];

const OFFLINE_FEATURES = [
  'Full Offline Transaction Checkout',
  'Local SQLite Database Encryption',
  'Thermal Receipt Printing Matrix',
  'Local Customer Loyalty Caching',
  'End-of-day Z-Report Closures',
  'Kitchen Display (KDS) Integrations',
  'Multi-terminal LAN syncing',
  'Local Stock Inventory Alerts',
];

const TOKEN_TIERS = [
  { name: 'Basic Tier', min: 19, best: 149, desc: 'Single register offline checkout, basic inventory listings.', features: '1 Terminal, local inventory, PDF receipts' },
  { name: 'Standard Tier', min: 39, best: 299, desc: 'Up to 3 LAN connected registers, advanced local stock matrices.', features: '3 Terminals, inventory syncing, discount engines' },
  { name: 'Advance Tier', min: 69, best: 499, desc: 'Multi-register networking, digital offline loyalty tools.', features: 'Unlimited local terminals, custom barcode support' },
  { name: 'Premium Tier', min: 99, best: 799, desc: 'Dedicated client gateway APIs, tailored offline custom modules.', features: 'Full developer client API hooks, 24/7 priority support' },
];

export default function StandalonePOSPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-slate-950 min-h-screen text-white pb-16">
        {/* Hero Section with HSL tokens */}
        <div className="site-container text-center mb-16 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 shadow-sm">
            STANDALONE OFFLINE POS
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
            Full POS Power, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Zero Subscriptions</span>
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
            Quantix Standalone runs 100% offline with perpetual validation tokens. No internet requirements, no recurring monthly fees.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/sign-up">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-full transition-all cursor-pointer">
                Get Standalone Token
              </button>
            </Link>
            <Link href="/enterprise-vs-standalone">
              <button className="border border-slate-800 hover:bg-slate-900/55 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all cursor-pointer">
                Compare Deployments
              </button>
            </Link>
          </div>
        </div>

        {/* How Offline Works Grid */}
        <div className="site-container max-w-5xl mb-24">
          <h2 className="text-xl sm:text-2xl font-syne font-black uppercase text-center tracking-tight text-white mb-12">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-3 relative hover:border-cyan-500/20 transition-all">
                <div className="h-10 w-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 text-xs font-bold font-syne">
                  {s.step}
                </div>
                <h3 className="text-xs font-bold text-white uppercase font-syne">{s.title}</h3>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Token Pricing Tiers */}
        <div className="site-container max-w-5xl mb-24">
          <h2 className="text-xl sm:text-2xl font-syne font-black uppercase text-center tracking-tight text-white mb-12">Token Validity Tiers</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-md">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-850 bg-slate-900/20">
                  <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Tier Name</th>
                  <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Description</th>
                  <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">From (30 Days)</th>
                  <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">365 Days Value</th>
                  <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Included Scope</th>
                </tr>
              </thead>
              <tbody>
                {TOKEN_TIERS.map((tier, idx) => (
                  <tr key={idx} className="border-b border-slate-850/60 hover:bg-slate-900/10 transition-colors">
                    <td className="p-5 text-xs font-bold uppercase text-white font-syne">{tier.name}</td>
                    <td className="p-5 text-xs text-slate-400 font-medium">{tier.desc}</td>
                    <td className="p-5 text-xs font-bold text-white text-right">${tier.min}</td>
                    <td className="p-5 text-xs font-bold text-cyan-400 text-right">${tier.best}</td>
                    <td className="p-5 text-xs text-slate-500 text-center font-semibold">{tier.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Offline Checklist */}
        <div className="site-container max-w-4xl mb-24">
          <h2 className="text-xl sm:text-2xl font-syne font-black uppercase text-center tracking-tight text-white mb-12">100% Offline Capability</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFLINE_FEATURES.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-2xl border border-slate-850 bg-slate-900/10 p-4">
                <WifiOff size={16} className="text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-300 font-semibold">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recharge & Renewal FAQs */}
        <div className="site-container max-w-3xl mb-24 space-y-4">
          <h2 className="text-xl sm:text-2xl font-syne font-black uppercase text-center tracking-tight text-white mb-8">Recharge & Validity FAQs</h2>
          {[
            { q: 'What happens when my license token validity expires?', a: 'Your offline standalone client enters a 7-day grace period (read-only mode), enabling you to export past invoice logs or run audits. After 7 days, a valid recharge token is required.' },
            { q: 'How do I renew or purchase another token?', a: 'Simply log into your web dashboard, choose your desired offline token tier, and complete checkout. Your active token is issued instantly to enter inside your local client.' },
            { q: 'Can I migrate my offline SQLite data to Enterprise Cloud?', a: 'Yes! You can easily upgrade your setup. Quantix technical support will securely sync your local databases directly to our SQL cloud instances.' }
          ].map((faq, idx) => (
            <div key={idx} className="p-5 border border-slate-850 bg-slate-900/10 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold uppercase text-white font-syne flex items-center gap-2">
                <HelpCircle size={14} className="text-cyan-400" /> {faq.q}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium pl-6">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Video Tutorial Walkthrough */}
        <div className="site-container max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-syne font-black uppercase text-center tracking-tight text-white mb-8">Guided Token Setup</h2>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/20 overflow-hidden relative group">
            <div className="aspect-video bg-slate-950/80 flex flex-col items-center justify-center space-y-4 p-6 border-b border-slate-850">
              <div className="h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-lg cursor-pointer hover:scale-105 transition-all">
                <Video size={24} />
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Watch Standalone POS Setup Tutorial (5 Mins)</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}

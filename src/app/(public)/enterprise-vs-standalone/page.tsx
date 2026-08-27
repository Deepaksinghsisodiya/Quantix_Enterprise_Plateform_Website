// src/app/(public)/enterprise-vs-standalone/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Cloud, HardDrive, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const COMPARISON_DIMENSIONS = [
  { dimension: 'Deployment Strategy', enterprise: 'Cloud-connected with background sync', standalone: 'Fully offline local client POS storage' },
  { dimension: 'Licensing Structure', enterprise: 'Monthly / Annual software subscription', standalone: 'Token-based software activation keys' },
  { dimension: 'Multi-Location Support', enterprise: 'Central cloud dashboards & controls', standalone: 'Single isolated store venue' },
  { dimension: 'Network Requirements', enterprise: 'Requires active connection (resilient cache)', standalone: 'Zero internet dependencies' },
  { dimension: 'System Upgrades', enterprise: 'Over-the-air automated updates', standalone: 'Manual installer downloads' },
  { dimension: 'Database Backups', enterprise: 'Automatic cloud backup clusters', standalone: 'Manual local storage backups' },
  { dimension: 'eCommerce integration', enterprise: 'Unified online ordering storefronts', standalone: 'Web ordering menu page (Premium only)' },
  { dimension: 'Analytical Engine', enterprise: 'Real-time telemetry & export tools', standalone: 'Offline generated local Z-reports' }
];

export default function EnterpriseVsStandalonePage() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'standalone'>('enterprise');

  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-32 sm:pt-40 bg-slate-950 min-h-screen text-white pb-16">
        <div className="site-container text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
            DEPLOYMENT BLUEPRINTS
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
            Cloud vs <span className="text-primary">Offline</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            Choose the deployment architecture designed for your operations. Scale with Cloud Enterprise or run standalone offline terminals.
          </p>
        </div>

        {/* Dual Cards Segment */}
        <div className="site-container max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Enterprise */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Cloud size={20} />
                </div>
                <div>
                  <h3 className="text-base font-syne font-bold uppercase tracking-tight text-white">Cloud Enterprise</h3>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Multi-location POS scale</p>
                </div>
              </div>

              {/* 3D Visual Mockup */}
              <div className="relative aspect-16/10 w-full flex items-center justify-center">
                <img
                  src="/images/ent_global_pos_bundle.png"
                  alt="Quantix Cloud Enterprise POS"
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>

              <ul className="space-y-3">
                {[
                  'Real-time backoffice sync',
                  'Multi-store inventory sync',
                  'Online ordering integrations',
                  'REST APIs & dynamic webhooks',
                  'Auto cloud backups'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 stroke-[3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <Link href="/sign-up">
                <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white transition-all cursor-pointer">
                  Launch Enterprise Trial
                </button>
              </Link>
            </div>
          </div>

          {/* Standalone */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <HardDrive size={20} />
                </div>
                <div>
                  <h3 className="text-base font-syne font-bold uppercase tracking-tight text-white">Offline Standalone</h3>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Perpetual local client</p>
                </div>
              </div>

              {/* 3D Visual Mockup */}
              <div className="relative aspect-16/10 w-full flex items-center justify-center">
                <img
                  src="/images/nav_retail_bundle.png"
                  alt="Quantix Offline Standalone POS"
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>

              <ul className="space-y-3">
                {[
                  'Zero monthly subscription fees',
                  '100% offline local SQLite DB',
                  'Direct USB thermal printer driver',
                  'Perpetual one-time license key',
                  'Self-contained audit reports'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 stroke-[3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <Link href="/sign-up">
                <button className="w-full rounded-xl border border-slate-800 hover:bg-slate-900 py-3 text-xs font-bold text-slate-300 transition-all cursor-pointer">
                  Activate License Token
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Comparison Matrix */}
        <div className="site-container max-w-4xl space-y-6">
          <h2 className="text-xl sm:text-2xl font-syne font-black uppercase text-center tracking-tight text-white">Side-by-Side Matrix</h2>
          
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Infrastructure Dimension</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-blue-400">Cloud Enterprise</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-purple-400">Offline Standalone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {COMPARISON_DIMENSIONS.map((row) => (
                  <tr key={row.dimension} className="hover:bg-slate-900/30 transition-all">
                    <td className="px-5 py-4 text-xs font-bold text-slate-300">{row.dimension}</td>
                    <td className="px-5 py-4 text-xs text-slate-400">{row.enterprise}</td>
                    <td className="px-5 py-4 text-xs text-slate-400">{row.standalone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}

// src/app/(public)/enterprise-vs-standalone/page.tsx
'use client';

import React from 'react';
import { Cloud, HardDrive, Check, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

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
  return (
    <main className="page-shell bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Breadcrumb & Hero Header */}
      <section className="site-container page-nav-header space-y-3 text-left">
        <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/why-quantix" className="hover:text-primary transition-colors">Why Quantix</Link>
          <ChevronRight size={12} />
          <span className="text-primary font-bold">Cloud vs Standalone</span>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-xs">
            <Sparkles size={12} />
            DEPLOYMENT BLUEPRINTS
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white max-w-3xl">
          Cloud Enterprise <span className="text-primary">vs Offline Standalone</span>
        </h1>
        <p className="max-w-2xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          Choose the deployment architecture engineered for your store operations. Scale with cloud-synchronized multi-location controls, or run completely offline with perpetual local terminals.
        </p>
      </section>

      {/* Dual Cards Segment */}
      <section className="site-container max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-16">
        {/* Enterprise */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-6 lg:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between shadow-xl dark:shadow-none hover:border-blue-500/50 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 shadow-xs">
                  <Cloud size={22} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">Cloud Enterprise</h3>
                  <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Multi-location POS scale</p>
                </div>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20">
                RECOMMENDED FOR CHAINS
              </span>
            </div>

            {/* 3D Visual Mockup */}
            <div className="relative aspect-16/10 w-full flex items-center justify-center p-2 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
              <img
                src="/images/ent_global_pos_bundle.png"
                alt="Quantix Cloud Enterprise POS"
                className="w-full h-full object-contain drop-shadow-xl hover:scale-103 transition-transform duration-300"
              />
            </div>

            <ul className="space-y-3 pt-2">
              {[
                'Real-time backoffice sync & remote menu updates',
                'Multi-store inventory sync & cross-store transfers',
                'Online ordering & delivery channel integrations',
                'Enterprise REST APIs & dynamic webhooks',
                'Automated multi-region cloud backups'
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
            <Link href="/sign-up" className="block">
              <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-blue-500/20 flex items-center justify-center gap-2">
                <span>Launch Enterprise Cloud Trial</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* Standalone */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-6 lg:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between shadow-xl dark:shadow-none hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-purple-600" />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 shadow-xs">
                  <HardDrive size={22} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">Offline Standalone</h3>
                  <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Perpetual local client</p>
                </div>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full border border-purple-500/20">
                100% ZERO WAN DEPENDENCY
              </span>
            </div>

            {/* 3D Visual Mockup */}
            <div className="relative aspect-16/10 w-full flex items-center justify-center p-2 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
              <img
                src="/images/nav_retail_bundle.png"
                alt="Quantix Offline Standalone POS"
                className="w-full h-full object-contain drop-shadow-xl hover:scale-103 transition-transform duration-300"
              />
            </div>

            <ul className="space-y-3 pt-2">
              {[
                'Zero monthly subscription or mandatory SaaS fees',
                '100% offline local SQLite database on your device',
                'Direct ESC/POS USB and serial thermal printer drivers',
                'Perpetual one-time activation token keys',
                'Self-contained audit reports and offline Z-readings'
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
            <Link href="/downloads" className="block">
              <button className="w-full rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 py-3.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-center gap-2">
                <span>Download Standalone Installer</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Comparison Matrix */}
      <section className="site-container max-w-5xl space-y-6 mb-10 sm:mb-16">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">TECHNICAL SPECIFICATION</span>
          <h2 className="text-2xl sm:text-3xl font-syne font-black uppercase text-center tracking-tight text-slate-900 dark:text-white">
            Side-by-Side Architecture Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Comprehensive breakdown of network, storage, license, and reporting capabilities.
          </p>
        </div>
        
        <div className="overflow-x-auto rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-sm shadow-xl dark:shadow-none">
          <table className="w-full text-left border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
                <th className="px-4 sm:px-6 py-3.5 sm:py-4.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Infrastructure Dimension</th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Cloud Enterprise</th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Offline Standalone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {COMPARISON_DIMENSIONS.map((row) => (
                <tr key={row.dimension} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-xs font-bold text-slate-900 dark:text-slate-200">{row.dimension}</td>
                  <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-xs text-slate-600 dark:text-slate-300 font-medium">{row.enterprise}</td>
                  <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-xs text-slate-600 dark:text-slate-300 font-medium">{row.standalone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Global Conversion CTA Banner */}
      <section className="site-container">
        <CTABanner />
      </section>
    </main>
  );
}

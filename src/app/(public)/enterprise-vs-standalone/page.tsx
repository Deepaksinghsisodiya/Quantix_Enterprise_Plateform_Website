// src/app/(public)/enterprise-vs-standalone/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Cloud,
  HardDrive,
  Check,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Server,
  WifiOff,
  Wifi,
  Database,
  Layers,
  HelpCircle,
  Download,
  Building2,
} from 'lucide-react';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface ComparisonRow {
  dimension: string;
  category: 'core' | 'network' | 'data' | 'features';
  enterprise: string;
  standalone: string;
  enterpriseHighlight?: boolean;
}

const COMPARISON_DIMENSIONS: ComparisonRow[] = [
  {
    dimension: 'Deployment Strategy',
    category: 'core',
    enterprise: 'Centralized cloud management with sub-second background sync',
    standalone: 'Fully isolated local client POS storage on each terminal',
  },
  {
    dimension: 'Licensing Structure',
    category: 'core',
    enterprise: 'Monthly or Annual SaaS subscription per active terminal',
    standalone: 'Perpetual lifetime token-based software activation key',
  },
  {
    dimension: 'Multi-Location Support',
    category: 'core',
    enterprise: 'Unified multi-store catalog push & global real-time dashboards',
    standalone: 'Isolated single-venue database with local store reporting',
    enterpriseHighlight: true,
  },
  {
    dimension: 'Network Requirements',
    category: 'network',
    enterprise: 'Active connection with resilient offline local fallback cache',
    standalone: '100% zero internet dependency (runs perpetually air-gapped)',
  },
  {
    dimension: 'Offline Continuity',
    category: 'network',
    enterprise: 'Full till mesh caching; transactions sync automatically on reconnect',
    standalone: 'Native local SQLite ledger operates indefinitely with zero WAN',
  },
  {
    dimension: 'System Upgrades',
    category: 'data',
    enterprise: 'Zero-touch over-the-air automated cloud updates & hotfixes',
    standalone: 'Manual executable installer downloads and local version control',
  },
  {
    dimension: 'Database Backups',
    category: 'data',
    enterprise: 'Automated multi-region cloud snapshots every 60 seconds',
    standalone: 'Manual local storage USB exports and local disk snapshots',
  },
  {
    dimension: 'Online Ordering & Delivery',
    category: 'features',
    enterprise: 'Native DoorDash, UberEats, Deliveroo & Shopify direct dispatch',
    standalone: 'Web menu landing page with local order receipt printing (Add-on)',
    enterpriseHighlight: true,
  },
  {
    dimension: 'Analytical Engine',
    category: 'features',
    enterprise: 'Real-time AI telemetry, item-velocity dashboards & export tools',
    standalone: 'Offline generated end-of-day X & Z reports and CSV ledger',
  },
];

export default function EnterpriseVsStandalonePage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'core' | 'network' | 'data' | 'features'>('all');

  const filteredRows =
    activeFilter === 'all'
      ? COMPARISON_DIMENSIONS
      : COMPARISON_DIMENSIONS.filter((r) => r.category === activeFilter);

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Ambient top glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Why Quantix trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors font-medium">Why Quantix</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">Cloud vs Standalone</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-xs font-syne font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 shadow-xs">
              <Sparkles size={13} className="text-blue-500" />
              <span>DEPLOYMENT ARCHITECTURE BLUEPRINTS</span>
            </div>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white">
              Cloud Enterprise{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                vs Offline Standalone
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              Engineered for flexibility. Scale with cloud-synchronized multi-location controls across 500+ stores, or run completely air-gapped with zero internet dependency and perpetual local software licenses.
            </p>
          </div>

          {/* Quick Anchor Bar */}
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href="#enterprise-card"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/80 dark:border-blue-800/80 hover:bg-blue-100 transition-colors"
            >
              <Cloud size={13} />
              <span>Cloud Enterprise Overview</span>
            </a>
            <a
              href="#standalone-card"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200/80 dark:border-purple-800/80 hover:bg-purple-100 transition-colors"
            >
              <HardDrive size={13} />
              <span>Offline Standalone Overview</span>
            </a>
            <a
              href="#matrix-section"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
            >
              <ArrowRight size={13} />
              <span>Detailed Feature Matrix</span>
            </a>
          </div>
        </div>
      </section>

      {/* Dual Column Architecture Comparison Cards */}
      <div className="site-container max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Enterprise Card */}
          <div
            id="enterprise-card"
            className="scroll-mt-24 rounded-md border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-slate-900/80 p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-xl shadow-blue-500/5 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-sky-400 to-indigo-600" />

            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-md bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xs">
                    <Cloud size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-syne font-black uppercase tracking-tight text-slate-900 dark:text-white">
                      Cloud Enterprise
                    </h2>
                    <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Multi-location POS scale
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/10 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-md border border-blue-500/25">
                  RECOMMENDED FOR CHAINS
                </span>
              </div>

              {/* Visual Bundle Showcase */}
              <div className="relative aspect-video w-full flex items-center justify-center p-3 rounded-md bg-linear-to-b from-blue-50/50 to-slate-50 dark:from-blue-950/20 dark:to-slate-900 border border-blue-100 dark:border-blue-900/40 overflow-hidden">
                <img
                  src="/images/ent_global_pos_bundle.png"
                  alt="Quantix Cloud Enterprise POS"
                  className="w-full h-full object-contain drop-shadow-md hover:scale-102 transition-transform duration-300"
                />
              </div>

              {/* Key Specs Pill Row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-md bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                  <p className="text-xs sm:text-sm font-syne font-black text-blue-600 dark:text-blue-400">&lt;200ms</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-0.5">Cloud Sync</p>
                </div>
                <div className="p-2.5 rounded-md bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                  <p className="text-xs sm:text-sm font-syne font-black text-blue-600 dark:text-blue-400">99.99%</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-0.5">Uptime SLA</p>
                </div>
                <div className="p-2.5 rounded-md bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                  <p className="text-xs sm:text-sm font-syne font-black text-blue-600 dark:text-blue-400">500+</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-0.5">Stores / Chain</p>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-2.5 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Enterprise Capabilities
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Centralized 1-click menu & price push to hundreds of registers',
                    'Inter-store stock transfers & automated warehouse replenishment',
                    'Direct delivery channel dispatch (DoorDash, UberEats, Deliveroo)',
                    'Enterprise REST APIs, webhooks, and ERP sync (SAP & NetSuite)',
                    'Automated multi-region cloud snapshots & hot disaster failover',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      <div className="h-4 w-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <Link href="/sign-up" className="block w-full">
                <button className="w-full rounded-md bg-blue-600 hover:bg-blue-700 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-md shadow-blue-500/25 flex items-center justify-center gap-2">
                  <span>Start Free Enterprise Trial</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/roi-calculator" className="block text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Calculate multi-location cost savings →
              </Link>
            </div>
          </div>

          {/* Standalone Card */}
          <div
            id="standalone-card"
            className="scroll-mt-24 rounded-md border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-900/80 p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-xl shadow-purple-500/5 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-600 via-fuchsia-400 to-indigo-600" />

            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-md bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-xs">
                    <HardDrive size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-syne font-black uppercase tracking-tight text-slate-900 dark:text-white">
                      Offline Standalone
                    </h2>
                    <p className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      Perpetual local client
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/10 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-md border border-purple-500/25">
                  100% ZERO WAN DEPENDENCY
                </span>
              </div>

              {/* Visual Bundle Showcase */}
              <div className="relative aspect-video w-full flex items-center justify-center p-3 rounded-md bg-linear-to-b from-purple-50/50 to-slate-50 dark:from-purple-950/20 dark:to-slate-900 border border-purple-100 dark:border-purple-900/40 overflow-hidden">
                <img
                  src="/images/nav_retail_bundle.png"
                  alt="Quantix Offline Standalone POS"
                  className="w-full h-full object-contain drop-shadow-md hover:scale-102 transition-transform duration-300"
                />
              </div>

              {/* Key Specs Pill Row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-md bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                  <p className="text-xs sm:text-sm font-syne font-black text-purple-600 dark:text-purple-400">100%</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-0.5">Offline Ready</p>
                </div>
                <div className="p-2.5 rounded-md bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                  <p className="text-xs sm:text-sm font-syne font-black text-purple-600 dark:text-purple-400">Local SSD</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-0.5">Database</p>
                </div>
                <div className="p-2.5 rounded-md bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                  <p className="text-xs sm:text-sm font-syne font-black text-purple-600 dark:text-purple-400">Perpetual</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-0.5">Token License</p>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-2.5 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Standalone Capabilities
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Instant sub-second startup with embedded local SQLite storage engine',
                    'Zero monthly subscription mandates or surprise SaaS price escalations',
                    'Direct hardware serial pairing for cash drawers, receipt printers & scales',
                    'Permanent ownership via one-time cryptographically signed token keys',
                    'Local encrypted offline backup snapshots saved directly to USB drives',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      <div className="h-4 w-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <Link href="/downloads" className="block w-full">
                <button className="w-full rounded-md bg-purple-600 hover:bg-purple-700 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-md shadow-purple-500/25 flex items-center justify-center gap-2">
                  <span>Download Standalone Installer</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/contact" className="block text-center text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                Request custom perpetual token quote →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Comparison Matrix */}
      <section id="matrix-section" className="scroll-mt-20 site-container max-w-6xl px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="text-center space-y-2 mb-6 sm:mb-8">
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
            TECHNICAL SPECIFICATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-syne font-black uppercase text-slate-900 dark:text-white tracking-tight">
            Side-by-Side Architecture Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Comprehensive breakdown across network resilience, storage topology, licensing, and enterprise integrations.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-3">
            {[
              { key: 'all', label: 'All Dimensions' },
              { key: 'core', label: 'Core & Scale' },
              { key: 'network', label: 'Network & Offline' },
              { key: 'data', label: 'Data & Backups' },
              { key: 'features', label: 'Integrations & POS' },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f.key
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 📱 MOBILE VIEW: Responsive Stacked Cards (< md) */}
        <div className="block md:hidden space-y-4">
          {filteredRows.map((row) => (
            <div
              key={row.dimension}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <h3 className="font-syne font-bold text-xs uppercase tracking-tight text-slate-900 dark:text-white">
                  {row.dimension}
                </h3>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {row.category}
                </span>
              </div>

              {/* Cloud Enterprise Side */}
              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 text-[11px] font-bold">
                  <Cloud size={12} />
                  <span>Cloud Enterprise</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {row.enterprise}
                </p>
              </div>

              {/* Offline Standalone Side */}
              <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 text-[11px] font-bold">
                  <HardDrive size={12} />
                  <span>Offline Standalone</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {row.standalone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP VIEW: Clean Side-by-Side Table (>= md) */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-sm shadow-xl dark:shadow-none">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">
                  Infrastructure Dimension
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 w-1/3">
                  <div className="flex items-center gap-1.5">
                    <Cloud size={14} />
                    <span>Cloud Enterprise</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 w-1/3">
                  <div className="flex items-center gap-1.5">
                    <HardDrive size={14} />
                    <span>Offline Standalone</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredRows.map((row) => (
                <tr
                  key={row.dimension}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-slate-200">
                    {row.dimension}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {row.enterprise}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {row.standalone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Decision Helper Strip */}
      <section className="site-container max-w-6xl px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={18} className="text-primary" />
            <h3 className="font-syne font-black text-base sm:text-lg uppercase text-slate-900 dark:text-white">
              Still Deciding Which Deployment Fits Best?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <h4 className="text-xs font-bold uppercase text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Check size={14} /> Pick Cloud Enterprise If:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                You run 2 or more locations, require centralized menu changes, integrate with third-party delivery apps, or need remote dashboard monitoring on mobile devices.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-2">
              <h4 className="text-xs font-bold uppercase text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <Check size={14} /> Pick Offline Standalone If:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                You run a single venue or remote kiosk with unreliable internet, prefer a one-time license without monthly subscriptions, and desire 100% air-gapped data privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Conversion CTA Banner */}
      <CTABanner />
    </main>
  );
}

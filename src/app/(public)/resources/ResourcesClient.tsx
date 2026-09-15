// src/app/(public)/resources/ResourcesClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  Sparkles,
  Search,
  Check,
  ArrowRight,
  HelpCircle,
  Download,
  Terminal,
  Video,
  FileText,
  Headset,
  BookOpen,
  Newspaper,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Server,
  Zap,
  Code2,
  Lock,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

/* ─────────── Types & Data ─────────── */
interface ResourcePillar {
  id: string;
  num: string;
  title: string;
  badge: string;
  category: 'all' | 'docs' | 'tools' | 'dev';
  desc: string;
  icon: React.ElementType;
  href: string;
  linkText: string;
  color: {
    icon: string;
    iconBg: string;
    iconBorder: string;
    badge: string;
    badgeBg: string;
    indicator: string;
  };
  points: string[];
  stats: { v: string; l: string }[];
  preview: React.ReactNode;
}

const RESOURCE_PILLARS: ResourcePillar[] = [
  {
    id: 'help',
    num: '01',
    title: 'Help Center & Setup Manuals',
    badge: 'CORE MANUALS',
    category: 'docs',
    desc: 'Comprehensive step-by-step guides for register unboxing, receipt printer pairing, local offline LAN synchronization, and daily cashier operations.',
    icon: HelpCircle,
    href: '/help',
    linkText: 'Explore Help Center',
    color: {
      icon: '#2563EB',
      iconBg: '#EFF6FF',
      iconBorder: '#BFDBFE',
      badge: '#1D4ED8',
      badgeBg: '#EFF6FF',
      indicator: '#3B82F6',
    },
    points: ['Hardware unboxing & printer setup', 'Offline LAN till failover guide', 'Shift close & reconciliation workflows'],
    stats: [{ v: '150+', l: 'Setup Guides' }, { v: '<3min', l: 'Avg Read Time' }, { v: '24/7', l: 'Searchable' }],
    preview: (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Knowledge Search</span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            Live Database
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-2 rounded-lg border border-slate-700/80">
            <Search size={13} className="text-slate-400 shrink-0" />
            <span className="text-xs text-slate-300 font-mono">Epson TM-T88VI Printer Pairing...</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-950/25 border border-emerald-800/40 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300">✓ ESC/POS Driver Auto-Configured</span>
            <span className="text-[10px] font-mono text-emerald-400">0.2s</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'downloads',
    num: '02',
    title: 'Software Downloads & Client Binaries',
    badge: 'CLIENT BINARIES',
    category: 'tools',
    desc: 'Self-contained register installers, touch screen drivers, and background synchronization daemons for Windows, Linux, and Android POS terminals.',
    icon: Download,
    href: '/downloads',
    linkText: 'View Downloads Catalog',
    color: {
      icon: '#7C3AED',
      iconBg: '#F5F3FF',
      iconBorder: '#DDD6FE',
      badge: '#6D28D9',
      badgeBg: '#F5F3FF',
      indicator: '#8B5CF6',
    },
    points: ['Native Windows x64 & Linux binaries', 'EV Code Signed & SHA-256 verified', 'Silent command-line fleet deployment'],
    stats: [{ v: 'v2.1.0', l: 'Stable Release' }, { v: '3 OS', l: 'Cross-Platform' }, { v: '0s', l: 'Setup Downtime' }],
    preview: (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Release Verification</span>
          <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
            EV Signed
          </span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between text-slate-400">
            <span>Package:</span>
            <span className="text-slate-200">Quantix-Setup-2.1.0.exe</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>SHA-256:</span>
            <span className="text-emerald-400 truncate max-w-[170px]">9f83c1b6a72e811e5f...</span>
          </div>
          <div className="mt-2 p-2 rounded bg-slate-800 text-purple-300 text-[10px] truncate border border-slate-700">
            $ Quantix-Setup.exe /S /ALLUSERS
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'api',
    num: '03',
    title: 'Developer REST & Webhook APIs',
    badge: 'DEVELOPER PORTAL',
    category: 'dev',
    desc: 'Connect external ERPs, custom accounting software, warehouse inventory trackers, and delivery aggregators with our developer-first API documentation.',
    icon: Terminal,
    href: '/help/api',
    linkText: 'Explore API Reference',
    color: {
      icon: '#0D9488',
      iconBg: '#F0FDFA',
      iconBorder: '#99F6E4',
      badge: '#0F766E',
      badgeBg: '#F0FDFA',
      indicator: '#14B8A6',
    },
    points: ['Sub-20ms transaction ingest latency', 'Real-time order webhook callbacks', 'OAuth2 token authentication & HMAC sha256'],
    stats: [{ v: '<20ms', l: 'Sync Latency' }, { v: '120/m', l: 'Rate Limit' }, { v: '100%', l: 'REST & gRPC' }],
    preview: (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-emerald-400 font-bold">POST /api/v1/transactions</span>
          <span className="text-[10px] text-slate-400">201 CREATED</span>
        </div>
        <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
{`{
  "terminalId": "trm_991",
  "amount": 49.99,
  "currency": "USD",
  "inventoryDeducted": true
}`}
        </pre>
      </div>
    ),
  },
  {
    id: 'videos',
    num: '04',
    title: 'Video Tutorials & Masterclasses',
    badge: 'VIDEO GUIDES',
    category: 'docs',
    desc: 'Visual walkthroughs of POS register workflows, manager overrides, table floor layout editing, and inventory variance reconciliations.',
    icon: Video,
    href: '/help/videos',
    linkText: 'Watch Video Guides',
    color: {
      icon: '#EA580C',
      iconBg: '#FFF7ED',
      iconBorder: '#FED7AA',
      badge: '#C2410C',
      badgeBg: '#FFF7ED',
      indicator: '#FF4F00',
    },
    points: ['Visual cashier training playlists', 'Split bill & table management masterclass', 'Hardware troubleshooting clips'],
    stats: [{ v: '4K UHD', l: 'Video Quality' }, { v: '12+', l: 'Playlists' }, { v: '0s', l: 'Sign-in Barrier' }],
    preview: (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Interactive Masterclass</span>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
            Featured
          </span>
        </div>
        <div className="relative aspect-video rounded-lg bg-linear-to-tr from-slate-950 via-slate-800 to-orange-950/40 border border-slate-700/80 flex items-center justify-center group overflow-hidden">
          <div className="h-10 w-10 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Video size={16} className="ml-0.5" />
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2 py-1 rounded">
            <span>Cashier Speed Run</span>
            <span className="text-primary font-bold">4:18</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pos-guide',
    num: '05',
    title: 'POS Buying & Migration Guide',
    badge: 'EXPERT STRATEGY',
    category: 'docs',
    desc: 'Unbiased hardware longevity benchmarks, hidden processing fee audits, and proven step-by-step POS migration playbooks for retail & dining.',
    icon: FileText,
    href: '/resources/pos-guide',
    linkText: 'Read POS Guide',
    color: {
      icon: '#059669',
      iconBg: '#ECFDF5',
      iconBorder: '#A7F3D0',
      badge: '#047857',
      badgeBg: '#ECFDF5',
      indicator: '#10B981',
    },
    points: ['Avoid proprietary hardware lock-ins', 'Interchange-plus vs flat fee analysis', 'Zero-downtime multi-store catalog switch'],
    stats: [{ v: '100% Free', l: 'Public Guide' }, { v: '40% Cut', l: 'Fee Reduction' }, { v: '1-Day', l: 'Data Migration' }],
    preview: (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Fee Audit Matrix</span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            Verified
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs p-2 rounded bg-emerald-900/20 border border-emerald-800/40 text-emerald-300">
            <span className="font-bold">✓ Quantix POS</span>
            <span>Flat 2.4% + 10¢</span>
          </div>
          <div className="flex justify-between items-center text-xs p-2 rounded bg-slate-800/50 text-slate-500 line-through">
            <span>Legacy Vendor</span>
            <span>3.5% + Monthly SaaS</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'support',
    num: '06',
    title: '24/7 Priority Support & Direct Hotline',
    badge: 'DEDICATED SUPPORT',
    category: 'tools',
    desc: 'Connect directly with certified POS systems engineers, schedule a 15-minute live architecture demo, or request urgent deployment assistance.',
    icon: Headset,
    href: '/contact',
    linkText: 'Talk with a POS Specialist',
    color: {
      icon: '#D97706',
      iconBg: '#FFFBEB',
      iconBorder: '#FDE68A',
      badge: '#B45309',
      badgeBg: '#FFFBEB',
      indicator: '#F59E0B',
    },
    points: ['Under 15-minute response SLA', 'Direct phone & email engineering desk', 'Free menu, SKU & catalog import'],
    stats: [{ v: '<15m', l: 'Response SLA' }, { v: '24/7/365', l: 'Support Window' }, { v: '$0', l: 'Onboarding Fee' }],
    preview: (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">Engineers Online</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">USA & Global</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono">Hotline:</span>
            <span className="font-bold text-white">+1 (800) 555-0199</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono">SLA:</span>
            <span className="font-bold text-emerald-400">Guaranteed &lt; 15 Mins</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ResourcesClient() {
  const [openId, setOpenId] = useState<string>('help');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'docs' | 'tools' | 'dev'>('all');

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? '' : id));

  const filteredPillars = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return RESOURCE_PILLARS.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.points.some((pt) => pt.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* ══════════ 1. HERO SECTION (Why Quantix Style) ══════════ */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-100 dark:border-slate-800/80 relative overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
          style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* Warm top ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-orange-400/15 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb - Direct Home > Resources */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
            <span className="text-primary font-bold">Resources</span>
          </nav>

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/50 text-xs font-black uppercase tracking-widest text-[#FF4F00] mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
            <Sparkles size={12} />
            Enterprise Resource Center
          </div>

          {/* Big Typography Heading with Gradient (Why Quantix Style) */}
          <h1 className="font-syne text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] text-slate-950 dark:text-white max-w-3xl mb-4">
            The Complete Toolkit for POS{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #FF4F00 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Implementation &amp; Scale
            </span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-[0.9375rem] text-slate-600 dark:text-slate-400 font-medium leading-[1.75] mb-7 sm:mb-9">
            Setup manuals, downloadable register binaries, developer REST APIs, and expert video guides.
            Everything your operations team and developers need to deploy Quantix POS across all locations.
          </p>

          {/* Trust Stats Strip (Why Quantix 4-column strip) */}
          <div className="mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-slate-100 dark:border-slate-800/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
              {[
                { v: '150+', l: 'Setup Guides & Manuals', sub: 'Printers, registers & LAN setup', accent: '#FF4F00' },
                { v: '100%', l: 'Native Offline Architecture', sub: 'Sub-second till synchronization', accent: '#059669' },
                { v: '3 Platforms', l: 'Windows, Linux & Android', sub: 'EV Code Signed installers', accent: '#2563EB' },
                { v: '<15 Mins', l: 'Priority Support SLA', sub: 'Direct solutions engineer hotline', accent: '#7C3AED' },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`flex flex-col px-4 sm:px-6 py-4 sm:py-0 rounded-xl sm:rounded-none ${
                    i !== 0 ? 'sm:border-l sm:border-slate-100 dark:sm:border-slate-800/80' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-10 rounded-full shrink-0 hidden sm:block mt-1" style={{ background: s.accent }} />
                    <div className="w-full">
                      <div className="font-syne font-black text-xl sm:text-2xl leading-none tracking-tight mb-1" style={{ color: s.accent }}>
                        {s.v}
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5 leading-snug">
                        {s.l}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 leading-snug hidden sm:block">
                        {s.sub}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 2. INTERACTIVE EXPLORER (Why Quantix Accordion Style) ══════════ */}
      <section className="section-py">
        <div className="site-container px-4 sm:px-6">

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, downloads, APIs, or manuals..."
                className="w-full h-10 sm:h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]/15 outline-none transition-all shadow-xs"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Resources' },
                { id: 'docs', label: 'Setup & Guides' },
                { id: 'tools', label: 'Tools & Downloads' },
                { id: 'dev', label: 'Developer APIs' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    activeCategory === cat.id
                      ? 'bg-primary border-primary text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Quick-Jump Badge Strip */}
          <div
            className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredPillars.map((p) => {
              const Icon = p.icon;
              const isActive = openId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[11px] font-syne font-bold whitespace-nowrap shrink-0 transition-all duration-200 active:scale-95 cursor-pointer"
                  style={
                    isActive
                      ? { background: '#FF4F00', color: '#fff', borderColor: '#FF4F00', boxShadow: '0 2px 8px rgba(255,79,0,0.3)' }
                      : { background: '#fff', color: '#475569', borderColor: '#E2E8F0' }
                  }
                >
                  <Icon size={12} style={{ color: isActive ? '#fff' : p.color.icon }} />
                  {p.badge}
                </button>
              );
            })}
          </div>

          {/* Accordion list */}
          <div className="space-y-3 sm:space-y-4">
            {filteredPillars.map((p) => {
              const Icon = p.icon;
              const isOpen = openId === p.id;

              return (
                <div
                  key={p.id}
                  className="rounded-2xl border transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900"
                  style={{
                    borderColor: isOpen ? '#E5E7EB' : '#F1F5F9',
                    boxShadow: isOpen ? '0 4px 24px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* ── Tab Row ── */}
                  <button
                    type="button"
                    onClick={() => toggle(p.id)}
                    className="w-full text-left flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 md:py-5 cursor-pointer relative select-none"
                  >
                    {/* Colored left indicator bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300"
                      style={{ background: isOpen ? p.color.indicator : 'transparent' }}
                    />

                    {/* Step number badge */}
                    <span
                      className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-[11px] font-syne font-black shrink-0 transition-colors border"
                      style={{
                        background: isOpen ? p.color.iconBg : '#F8FAFC',
                        color: isOpen ? p.color.icon : '#94A3B8',
                        borderColor: isOpen ? p.color.iconBorder : '#E2E8F0',
                      }}
                    >
                      {p.num}
                    </span>

                    {/* Icon */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200"
                      style={{
                        background: p.color.iconBg,
                        borderColor: p.color.iconBorder,
                        transform: isOpen ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      <Icon size={18} style={{ color: p.color.icon }} strokeWidth={2.2} />
                    </div>

                    {/* Title & Badge */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-0.5 sm:mb-1">
                        <span
                          className="text-[8px] sm:text-[9px] font-syne font-black uppercase tracking-widest px-2 sm:px-2.5 py-0.5 rounded-full border"
                          style={{ color: p.color.badge, background: p.color.badgeBg, borderColor: p.color.iconBorder }}
                        >
                          {p.badge}
                        </span>
                      </div>
                      <div className="text-[0.8125rem] sm:text-sm md:text-[0.9375rem] font-syne font-bold leading-tight text-slate-900 dark:text-white">
                        {p.title}
                      </div>
                    </div>

                    {/* Toggle Chevron */}
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 bg-slate-100 dark:bg-slate-800 text-slate-400"
                      style={isOpen ? { background: '#FF4F00', color: '#fff' } : undefined}
                    >
                      <ChevronDown
                        size={15}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s',
                        }}
                      />
                    </div>
                  </button>

                  {/* ── Expanded Panel ── */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 md:pb-8 pt-0 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5 sm:gap-6 mt-4 sm:mt-5">

                        {/* ── LEFT: Description + Points + Stats + CTA ── */}
                        <div className="flex flex-col gap-4 sm:gap-5 order-1">
                          <p className="text-[0.8125rem] sm:text-sm text-slate-600 dark:text-slate-400 leading-[1.8] font-medium">
                            {p.desc}
                          </p>

                          {/* Core capabilities checklist */}
                          <div>
                            <p className="text-[9px] sm:text-[10px] font-syne font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                              Key Inclusions
                            </p>
                            <div className="space-y-1.5 sm:space-y-2">
                              {p.points.map((pt) => (
                                <div
                                  key={pt}
                                  className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60"
                                >
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600">
                                    <Check size={10} strokeWidth={3} />
                                  </div>
                                  <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                                    {pt}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Stat Chips */}
                          <div className="grid grid-cols-3 gap-2">
                            {p.stats.map((st) => (
                              <div
                                key={st.l}
                                className="flex flex-col items-center justify-center text-center px-2 py-3 rounded-xl border border-orange-200/80 dark:border-orange-900/40 bg-orange-50/50 dark:bg-orange-950/20"
                              >
                                <span className="text-[0.8125rem] sm:text-sm md:text-base font-syne font-black text-[#FF4F00]">
                                  {st.v}
                                </span>
                                <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                                  {st.l}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Action CTA Link */}
                          <div>
                            <Link
                              href={p.href}
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/25 cursor-pointer w-full sm:w-auto"
                            >
                              <span>{p.linkText}</span>
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>

                        {/* ── RIGHT: Live Visual Preview Card ── */}
                        <div className="order-2 flex flex-col justify-center">
                          {p.preview}
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════ 3. GLOBAL CTA BANNER ══════════ */}
      <CTABanner />
    </div>
  );
}

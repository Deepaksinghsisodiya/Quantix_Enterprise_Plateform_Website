'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  BarChart3,
  Star,
  FileSpreadsheet,
  Calculator,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Check,
  Server,
  Lock,
  Zap,
  TrendingUp,
  Shield,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

/* ─────────── Data ─────────── */
const PILLARS = [
  {
    id: 'architecture',
    num: '01',
    title: 'Cloud Enterprise vs Standalone',
    badge: 'ARCHITECTURE',
    desc: 'Compare centralized multi-store cloud management against fully offline local register deployments with zero internet dependency.',
    icon: Building2,
    href: '/enterprise-vs-standalone',
    linkText: 'Explore Architecture',
    color: { icon: '#2563EB', iconBg: '#EFF6FF', iconBorder: '#BFDBFE', badge: '#1D4ED8', badgeBg: '#EFF6FF', indicator: '#3B82F6', statColor: '#1E40AF' },
    points: ['Centralized catalog push', 'Franchise royalty ledgers', 'Offline local till cache'],
    stats: [{ v: '100%', l: 'Offline Uptime' }, { v: '<200ms', l: 'Cloud Sync' }, { v: '500+', l: 'Stores' }],
    preview: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">Cloud Dashboard</p>
            <p className="text-xs font-bold text-[#34D399] flex items-center gap-1.5"><Server size={11} strokeWidth={2.5} /> Synced · 200ms</p>
          </div>
          <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">Local Till Cache</p>
            <p className="text-xs font-bold text-[#60A5FA] flex items-center gap-1.5"><Lock size={11} strokeWidth={2.5} /> Offline Ready</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-3 text-center">
          <p className="text-[11px] font-mono text-slate-300">Catalog Push → 500 Registers Updated Instantly</p>
        </div>
      </div>
    ),
  },
  {
    id: 'case-studies',
    num: '02',
    title: 'Customer Case Studies & ROI',
    badge: 'PROVEN OUTCOMES',
    desc: 'Discover authentic transformations from 120+ outlet restaurant groups and retail chains achieving quantified ROI.',
    icon: BarChart3,
    href: '/case-studies',
    linkText: 'Explore Case Studies',
    color: { icon: '#059669', iconBg: '#ECFDF5', iconBorder: '#A7F3D0', badge: '#047857', badgeBg: '#ECFDF5', indicator: '#10B981', statColor: '#065F46' },
    points: ['$1.4M annual inventory savings', '64% shrinkage reduction', '48h per store rollout'],
    stats: [{ v: '$1.4M+', l: 'Max Saved' }, { v: '-64%', l: 'Shrinkage' }, { v: '48h', l: 'Rollout Speed' }],
    preview: (
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">FoodFlow Group (120 Outlets)</span>
          <span className="text-[9px] font-bold bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50">Verified ROI</span>
        </div>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          Zero database desync during Friday peak dinner rush with offline till mesh and instant KDS station routing.
        </p>
        <div className="flex items-center gap-3 pt-1 border-t border-slate-700/60">
          <div>
            <span className="text-sm font-syne font-black text-emerald-400">+$1.4M</span>
            <span className="text-[9px] font-mono text-slate-400 ml-1">Saved / yr</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div>
            <span className="text-sm font-syne font-black text-white">99.99%</span>
            <span className="text-[9px] font-mono text-slate-400 ml-1">Cloud SLA</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'calculator',
    num: '03',
    title: 'Interactive ROI Savings Calculator',
    badge: 'ESTIMATE SAVINGS',
    desc: 'Calculate exactly how much your retail chain or restaurant group will save in annual processing and SaaS fees.',
    icon: Calculator,
    href: '/roi-calculator',
    linkText: 'Calculate Your ROI',
    color: { icon: '#D97706', iconBg: '#FFFBEB', iconBorder: '#FDE68A', badge: '#B45309', badgeBg: '#FFFBEB', indicator: '#F59E0B', statColor: '#92400E' },
    points: ['Volume-based rate analysis', 'Multi-location license tiers', 'Hardware upgrade payback time'],
    stats: [{ v: '$14.2K', l: 'Avg Savings/yr' }, { v: '40%', l: 'SaaS Cut' }, { v: '<60d', l: 'Payback' }],
    preview: (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-3">
        <div>
          <p className="text-[9px] font-mono text-amber-400/80 uppercase tracking-widest mb-1">Annual Savings / Store</p>
          <p className="text-2xl font-syne font-black text-amber-300">$14,200</p>
        </div>
        <div>
          <div className="flex justify-between mb-1 text-[10px] text-slate-400">
            <span>Legacy cost</span><span className="text-amber-400 font-semibold">Your savings</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-linear-to-r from-amber-500 to-amber-400 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'case-studies',
    num: '04',
    title: 'Real Case Studies & ROI Metrics',
    badge: 'PROVEN STORIES',
    desc: 'Read authentic operational audits from multi-store restaurant operators and high-volume retail chains.',
    icon: BarChart3,
    href: '/case-studies',
    linkText: 'Read Customer Stories',
    color: { icon: '#059669', iconBg: '#ECFDF5', iconBorder: '#A7F3D0', badge: '#047857', badgeBg: '#ECFDF5', indicator: '#10B981', statColor: '#065F46' },
    points: ['+38% Table turns in 60 days', '64% Shrinkage reduction', 'Zero Black Friday downtime'],
    stats: [{ v: '+38%', l: 'Table Turns' }, { v: '64%', l: 'Shrinkage Cut' }, { v: '0s', l: 'Downtime' }],
    preview: (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-3">Multi-Unit Performance</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[{ v: '+38%', l: 'Table Turns' }, { v: '64%', l: 'Shrinkage' }, { v: '0s', l: 'Downtime' }].map(s => (
            <div key={s.l} className="bg-slate-700/60 p-2.5 rounded-xl border border-slate-600/60">
              <p className="text-sm font-syne font-black text-green-400">{s.v}</p>
              <p className="text-[9px] text-slate-400 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'testimonials',
    num: '05',
    title: 'Verified Customer Reviews',
    badge: 'MERCHANT REVIEWS',
    desc: 'Hear directly from general managers, tech directors, and franchise owners running daily shifts on Quantix.',
    icon: Star,
    href: '/testimonials',
    linkText: 'Read Customer Reviews',
    color: { icon: '#EA580C', iconBg: '#FFF7ED', iconBorder: '#FED7AA', badge: '#C2410C', badgeBg: '#FFF7ED', indicator: '#FF4F00', statColor: '#9A3412' },
    points: ['4.8/5 Star average rating', 'Over 1,000,000 transactions', '24/7 Priority engineer support'],
    stats: [{ v: '4.8★', l: 'Avg Rating' }, { v: '1M+', l: 'Daily Tx' }, { v: '<2min', l: 'Support SLA' }],
    preview: (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-400" fill="#F59E0B" />)}
          <span className="text-sm font-bold text-white ml-2">4.8 / 5.0</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed italic">
          "Over 1,000,000 transactions processed daily with 24/7 priority engineer support on standby."
        </p>
        <p className="text-[10px] text-slate-500">— Franchise Owner, 150+ Location Chain</p>
      </div>
    ),
  },
  {
    id: 'security',
    num: '06',
    title: 'Enterprise Security & 99.99% Cloud SLA',
    badge: 'SECURITY & TRUST',
    desc: 'Bank-grade data encryption, automated multi-region failover, PCI-DSS Level 1 compliance, and round-the-clock guarantees.',
    icon: ShieldCheck,
    href: '/contact',
    linkText: 'Speak to Security Architect',
    color: { icon: '#0D9488', iconBg: '#F0FDFA', iconBorder: '#99F6E4', badge: '#0F766E', badgeBg: '#F0FDFA', indicator: '#14B8A6', statColor: '#134E4A' },
    points: ['PCI-DSS Level 1 & SOC 2 certified', 'AES-256 encrypted local ledger', '99.99% contractual uptime SLA'],
    stats: [{ v: '99.99%', l: 'SLA Uptime' }, { v: 'AES-256', l: 'Encryption' }, { v: 'L1', l: 'PCI-DSS' }],
    preview: (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-teal-400" strokeWidth={2.5} />
            <span className="text-xs font-bold text-teal-300">Security Status</span>
          </div>
          <span className="text-[9px] font-bold bg-green-900/50 text-green-400 px-2 py-0.5 rounded-md border border-green-700/50">ALL CLEAR</span>
        </div>
        <div className="space-y-1.5">
          {['PCI-DSS Level 1', 'SOC 2 Type II', 'AES-256 Ledger', '99.99% SLA Active'].map(l => (
            <div key={l} className="flex items-center gap-2 text-xs text-slate-300">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              {l}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

/* ─────────── Component ─────────── */
export default function WhyQuantixClient() {
  const [openId, setOpenId] = useState<string>('architecture');
  const toggle = (id: string) => setOpenId(prev => (prev === id ? '' : id));

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">

      {/* ══════════ HERO ══════════ */}
      <section className="bg-white page-hero-header border-b border-slate-100 relative overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.55 }}
        />
        {/* Warm top glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-linear-to-b from-orange-400/12 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-[#FF4F00] transition-colors duration-150">Home</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-[#FF4F00]">Why Quantix</span>
          </nav>

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-orange-50 border border-orange-200 text-xs font-black uppercase tracking-widest text-[#FF4F00] mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
            <Sparkles size={12} />
            Why Enterprises Choose Quantix
          </div>

          {/* Heading */}
          <h1 className="font-syne text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] text-slate-950 max-w-3xl mb-4">
            The POS Platform Built for{' '}
            <span
              className="relative inline-block"
              style={{ background: 'linear-gradient(135deg, #FF4F00 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Reliability & Scale
            </span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-[0.9375rem] text-slate-500 font-medium leading-[1.75] mb-7 sm:mb-9">
            Zero proprietary hardware lock-in, sub-second offline resilience, and transparent flat processing.
            Explore our deployment architecture, competitor benchmarks, and proven multi-unit customer success below.
          </p>

          {/* Trust Stats Strip */}
          <div className="mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-slate-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
              {[
                { v: '50,000+',   l: 'Active Store Locations',       sub: 'Across retail & restaurant chains', accent: '#FF4F00', accentBg: '#FFF7ED' },
                { v: '99.99%',    l: 'Contractual Uptime SLA',       sub: 'Multi-region failover guaranteed',  accent: '#059669', accentBg: '#ECFDF5' },
                { v: '$0',        l: 'Hardware Lock-in Fee',          sub: 'Works on any standard terminal',   accent: '#2563EB', accentBg: '#EFF6FF' },
                { v: '2.4% + 10¢', l: 'Flat Processing Rate',       sub: 'No hidden markups or surcharges',  accent: '#7C3AED', accentBg: '#F5F3FF' },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`flex flex-col px-4 sm:px-6 py-4 sm:py-0 rounded-xl sm:rounded-none ${i !== 0 ? 'sm:border-l sm:border-slate-100' : ''}`}
                  style={{ background: 'transparent' }}
                >
                  {/* Coloured top micro-bar on mobile, left-bar on desktop */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-1 h-10 rounded-full shrink-0 hidden sm:block mt-1"
                      style={{ background: s.accent }}
                    />
                    <div className="w-full">
                      <div
                        className="font-syne font-black text-xl sm:text-2xl leading-none tracking-tight mb-1"
                        style={{ color: s.accent }}
                      >
                        {s.v}
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-slate-800 mb-0.5 leading-snug">
                        {s.l}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 leading-snug hidden sm:block">
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

      {/* ══════════ ACCORDION EXPLORER ══════════ */}
      <section className="section-py">
        <div className="site-container px-4 sm:px-6">

          {/* Mobile quick-jump badge strip — icon + short badge label */}
          <div
            className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {PILLARS.map((p) => {
              const Icon = p.icon;
              const isActive = openId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[11px] font-syne font-bold whitespace-nowrap shrink-0 transition-all duration-200 active:scale-95"
                  style={isActive
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
          <div className="space-y-3">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              const isOpen = openId === p.id;

              return (
                <div
                  key={p.id}
                  className="rounded-2xl border transition-all duration-300 overflow-hidden"
                  style={{
                    background: '#fff',
                    borderColor: isOpen ? '#E5E7EB' : '#F1F5F9',
                    boxShadow: isOpen ? '0 4px 24px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* ── Tab Row ── */}
                  <button
                    onClick={() => toggle(p.id)}
                    className="w-full text-left flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 md:py-5 cursor-pointer relative"
                  >
                    {/* Colored left indicator bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300"
                      style={{ background: isOpen ? p.color.indicator : 'transparent' }}
                    />

                    {/* Step num — hidden on mobile, shown sm+ */}
                    <span
                      className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-[11px] font-syne font-black shrink-0 transition-colors border"
                      style={{ background: isOpen ? p.color.iconBg : '#F8FAFC', color: isOpen ? p.color.icon : '#94A3B8', borderColor: isOpen ? p.color.iconBorder : '#E2E8F0' }}
                    >
                      {p.num}
                    </span>

                    {/* Icon — smaller on mobile */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200"
                      style={{ background: p.color.iconBg, borderColor: p.color.iconBorder, transform: isOpen ? 'scale(1.05)' : 'scale(1)' }}
                    >
                      <Icon size={18} style={{ color: p.color.icon }} strokeWidth={2.2} />
                    </div>

                    {/* Title + badge */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-0.5 sm:mb-1">
                        <span
                          className="text-[8px] sm:text-[9px] font-syne font-black uppercase tracking-widest px-2 sm:px-2.5 py-0.5 rounded-full border"
                          style={{ color: p.color.badge, background: p.color.badgeBg, borderColor: p.color.iconBorder }}
                        >
                          {p.badge}
                        </span>
                      </div>
                      <div
                        className="text-[0.8125rem] sm:text-sm md:text-[0.9375rem] font-syne font-bold leading-tight transition-colors"
                        style={{ color: isOpen ? '#0F172A' : '#1E293B' }}
                      >
                        {p.title}
                      </div>
                    </div>

                    {/* Toggle chevron */}
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{ background: isOpen ? '#FF4F00' : '#F1F5F9', color: isOpen ? '#fff' : '#94A3B8' }}
                    >
                      <ChevronDown size={15} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                    </div>
                  </button>

                  {/* ── Expanded Panel ── */}
                  {isOpen && (
                    <div
                      className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 md:pb-8 pt-0 border-t"
                      style={{ borderColor: '#F1F5F9' }}
                    >
                      {/* On mobile: description first, then preview at bottom.
                          On desktop (lg): side-by-side — left desc, right preview. */}
                      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5 sm:gap-6 mt-4 sm:mt-5">

                        {/* ── LEFT: Description + Points + Stats + CTA ── */}
                        <div className="flex flex-col gap-4 sm:gap-5 order-1">

                          <p className="text-[0.8125rem] sm:text-sm text-slate-600 leading-[1.8] font-medium">
                            {p.desc}
                          </p>

                          {/* Capability points */}
                          <div>
                            <p className="text-[9px] sm:text-[10px] font-syne font-black uppercase tracking-widest text-slate-400 mb-2">
                              Core Capabilities
                            </p>
                            <div className="space-y-1.5 sm:space-y-2">
                              {p.points.map(pt => (
                                <div
                                  key={pt}
                                  className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border"
                                  style={{ background: '#F8FAFC', borderColor: '#E2E8F0' }}
                                >
                                  <div
                                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0"
                                    style={{ background: '#DCFCE7' }}
                                  >
                                    <Check size={10} className="text-green-600" strokeWidth={3} />
                                  </div>
                                  <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Stat chips */}
                          <div className="grid grid-cols-3 gap-2">
                            {p.stats.map(st => (
                              <div
                                key={st.l}
                                className="flex flex-col items-center justify-center text-center px-2 py-3 rounded-xl border"
                                style={{ background: '#FFF7ED', borderColor: '#FED7AA' }}
                              >
                                <span className="text-[0.8125rem] sm:text-sm md:text-base font-syne font-black" style={{ color: '#FF4F00' }}>{st.v}</span>
                                <span className="text-[9px] sm:text-[10px] text-slate-500 leading-tight mt-0.5">{st.l}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA — full width on mobile */}
                          <div>
                            <Link
                              href={p.href}
                              className="btn-gradient flex sm:inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-white font-syne font-bold text-sm group w-full sm:w-auto"
                            >
                              {p.linkText}
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                            </Link>
                          </div>
                        </div>

                        {/* ── RIGHT: Dark Preview Widget ── */}
                        <div
                          className="rounded-2xl overflow-hidden order-2 lg:order-2"
                          style={{ background: '#0F172A', border: '1px solid #1E293B' }}
                        >
                          {/* Terminal chrome bar */}
                          <div
                            className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3"
                            style={{ borderBottom: '1px solid #1E293B' }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1.5">
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/70" />
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/70" />
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/70" />
                              </div>
                              <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 ml-1 truncate max-w-30 sm:max-w-none">
                                {p.badge.toLowerCase()}.preview
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-[9px] font-mono font-bold text-green-400">LIVE</span>
                            </div>
                          </div>
                          {/* Preview body */}
                          <div className="p-3.5 sm:p-4">
                            {p.preview}
                          </div>
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

      {/* ══════════ CTA BANNER ══════════ */}
      <CTABanner />
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
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
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

export const metadata: Metadata = {
  title: 'Why Quantix POS | Enterprise ROI, Trust & Competitive Advantage',
  description:
    'Discover why 50,000+ multi-store retail and restaurant locations choose Quantix over legacy and locked-in POS hardware.',
};

const PILLARS = [
  {
    title: 'Cloud Enterprise vs Standalone',
    badge: 'ARCHITECTURE',
    desc: 'Compare centralized multi-store cloud management against fully offline local register deployments with zero internet dependency.',
    icon: Building2,
    href: '/enterprise-vs-standalone',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    linkText: 'Explore Architecture',
    points: ['Centralized catalog push', 'Franchise royalty ledgers', 'Offline local till cache'],
  },
  {
    title: 'Competitor Comparisons',
    badge: 'UNBIASED MATRIX',
    desc: 'See how Quantix stacks up against Toast, Square, Clover, and Lightspeed with zero proprietary hardware lock-in.',
    icon: FileSpreadsheet,
    href: '/compare',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    linkText: 'View POS Comparisons',
    points: ['Flat 2.4% + 10¢ processing', 'No proprietary terminals', 'Sub-second barcode scanning'],
  },
  {
    title: 'Interactive ROI Savings Calculator',
    badge: 'ESTIMATE SAVINGS',
    desc: 'Calculate exactly how much your retail chain or restaurant group will save in annual processing and SaaS fees.',
    icon: Calculator,
    href: '/roi-calculator',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    linkText: 'Calculate Your ROI',
    points: ['Volume-based rate analysis', 'Multi-location license tiers', 'Hardware upgrade payback time'],
  },
  {
    title: 'Real Case Studies & ROI Metrics',
    badge: 'PROVEN STORIES',
    desc: 'Read authentic operational audits from multi-store restaurant operators and high-volume retail chains.',
    icon: BarChart3,
    href: '/case-studies',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    linkText: 'Read Customer Stories',
    points: ['+38% Table turns in 60 days', '64% Shrinkage reduction', 'Zero Black Friday downtime'],
  },
  {
    title: 'Verified Customer Reviews',
    badge: 'MERCHANT REVIEWS',
    desc: 'Hear directly from general managers, tech directors, and franchise owners running daily shifts on Quantix.',
    icon: Star,
    href: '/testimonials',
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    linkText: 'Read Customer Reviews',
    points: ['4.8/5 Star average rating', 'Over 1,000,000 transactions', '24/7 Priority engineer support'],
  },
  {
    title: 'Enterprise Security & 99.99% Cloud SLA',
    badge: 'SECURITY & TRUST',
    desc: 'Bank-grade data encryption, automated multi-region failover, PCI-DSS Level 1 compliance, and round-the-clock guarantees.',
    icon: ShieldCheck,
    href: '/contact',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    linkText: 'Speak to Security Architect',
    points: ['PCI-DSS Level 1 & SOC 2 certified', 'AES-256 encrypted local ledger', '99.99% contractual uptime SLA'],
  },
];

export default function WhyQuantixPage() {
  return (
    <main className="page-shell bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Left-Aligned Header with Breadcrumb */}
      <section className="site-container page-nav-header space-y-3">
        <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary font-bold">Why Quantix</span>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-xs">
            <Sparkles size={12} />
            WHY ENTERPRISES CHOOSE QUANTIX
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white max-w-4xl text-left">
          The POS Platform Built for <span className="text-primary">Reliability & Scale</span>
        </h1>
        <p className="max-w-3xl text-left text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          Zero proprietary hardware lock-in, sub-second offline resilience, and transparent flat processing.
          Explore our deployment architecture, competitor benchmarks, and proven multi-unit customer success below.
        </p>
      </section>

      {/* 6 Balanced Grid Cards */}
      <section className="site-container mb-10 sm:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${p.color} shadow-xs`}>
                      <Icon size={20} className="stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] font-syne font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-syne font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                    {p.desc}
                  </p>

                  <ul className="space-y-2.5 mb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={p.href}
                  className="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 text-xs font-syne font-bold transition-all group-hover:border-primary/50 group-hover:shadow-md cursor-pointer"
                >
                  <span>{p.linkText}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Big Conversion CTA Banner */}
      <section className="site-container">
        <CTABanner />
      </section>
    </main>
  );
}

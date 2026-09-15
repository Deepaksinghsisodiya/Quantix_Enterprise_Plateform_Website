// src/app/(public)/help/[sectionSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, BookOpen, ShieldAlert, Sparkles } from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface Article {
  slug: string;
  title: string;
  desc: string;
}

interface Section {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: Article[];
}

const SECTIONS_DATA: Record<string, Section> = {
  'terminal-setup': {
    slug: 'terminal-setup',
    title: 'Device & Terminal Setup',
    description: 'Guides on unboxing registers, pairing thermal printers, and configuring weight scales.',
    icon: <BookOpen size={20} />,
    articles: [
      { slug: 'pair-printers', title: 'Pairing Bluetooth Receipt Printers', desc: 'Step-by-step pairing guidelines for thermal paper receipt printers.' },
      { slug: 'calibrate-scales', title: 'Calibrating Weight PLU Scales', desc: 'Setting weight metrics and PLU scanning parameters inside registers.' },
      { slug: 'network-hubs', title: 'Configuring Local Ethernet Hubs', desc: 'Ensuring failover safety across multiple checkout terminals.' }
    ]
  },
  'licensing-tokens': {
    slug: 'licensing-tokens',
    title: 'Licensing & Renewals',
    description: 'Managing perpetual token activation, standalone validation, and plans updates.',
    icon: <ShieldAlert size={20} />,
    articles: [
      { slug: 'apply-tokens', title: 'Applying Validity Standalone Tokens', desc: 'Unlock continuous local operations with your digital license token.' },
      { slug: 'export-logs', title: 'Exporting Historical Sales logs', desc: 'Securely transfer IndexedDB records to server backups.' },
      { slug: 'annual-billing', title: 'Configuring Annual Recurring Billing', desc: 'Saves 20% by switching from monthly subscriptions.' }
    ]
  }
};

export default function HelpSectionPage() {
  const params = useParams();
  const sectionSlug = params.sectionSlug as string;
  const section = SECTIONS_DATA[sectionSlug];

  if (!section) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Standard .page-hero-header) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold">{section.title}</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] shadow-2xs">
              <Sparkles size={13} className="text-[#FF4D00]" />
              <span>Category Catalog</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight max-w-3xl uppercase">
            {section.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
            {section.description}
          </p>
        </div>
      </section>

      {/* ─── 2. Articles List Section (Standard .section-py) ─── */}
      <section className="section-py site-container max-w-3xl">
        {/* Articles list */}
        <div className="space-y-3">
          {section.articles.map((art) => (
            <Link key={art.slug} href={`/help/${section.slug}/${art.slug}`}>
              <div className="rounded-md border border-gray-200 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-5 hover:border-primary/40 dark:hover:border-primary/40 transition-all cursor-pointer flex justify-between items-center group shadow-2xs">
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-bold uppercase block text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {art.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">
                    {art.desc}
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-primary transition-colors shrink-0 ml-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner />
    </main>
  );
}

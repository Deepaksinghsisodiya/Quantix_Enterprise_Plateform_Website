// src/app/(public)/help/[sectionSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, BookOpen, ShieldAlert, Sparkles } from 'lucide-react';

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
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container px-4 sm:px-0 max-w-3xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/help" className="hover:text-blue-500 transition-colors">Help Centre</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">{section.title}</span>
          </div>

          <div className="flex items-center gap-2.5 mb-10 border-b border-gray-250 dark:border-slate-900 pb-6">
            <Link href="/help">
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">CATEGORY CATALOG</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                {section.title}
              </h1>
              <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm font-medium mt-1">
                {section.description}
              </p>
            </div>
          </div>

          {/* Articles list */}
          <div className="space-y-4">
            {section.articles.map((art) => (
              <Link key={art.slug} href={`/help/${section.slug}/${art.slug}`}>
                <div className="rounded-2xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-5 hover:border-blue-500/30 transition-all cursor-pointer flex justify-between items-center group mb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase block text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {art.title}
                    </span>
                    <span className="text-[11px] text-slate-550 dark:text-slate-400 block font-medium">
                      {art.desc}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }

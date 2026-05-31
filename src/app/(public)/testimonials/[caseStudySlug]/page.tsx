// src/app/(public)/testimonials/[caseStudySlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ChevronRight, Sparkles, Scale, X, Check, ArrowRight, BarChart3, Star } from 'lucide-react';

interface CaseStudy {
  slug: string;
  merchantName: string;
  businessType: string;
  quote: string;
  metric: string;
  metricLabel: string;
  overview: string;
  results: string[];
}

const CASE_STUDIES_DATA: Record<string, CaseStudy> = {
  'trattoria-elegante': {
    slug: 'trattoria-elegante',
    merchantName: 'Trattoria Elegante',
    businessType: 'Fine Dining Restaurant',
    quote: 'Course pacing alerts and split-billing terminals enabled us to turn tables 18% faster during peak dinner service.',
    metric: '+18% Table Turn Velocity',
    metricLabel: 'Increased capacity and wait time reductions.',
    overview: 'Trattoria Elegante, a premier fine dining establishment, struggled with table communication bottlenecking. Wait staff manually fired courses, causing discrepancies between cold and hot prep kitchens.',
    results: [
      'Visual course-alert cues synced directly to prep line displays.',
      'Average diner wait time dropped by 8 minutes per multi-course seating.',
      'Split-billing modules reduced checkout register delays.'
    ]
  },
  'freshmart': {
    slug: 'freshmart',
    merchantName: 'FreshMart Grocery',
    businessType: 'Grocery & Convenience Outlet',
    quote: 'Intelligent expiration batch tracking reduced grocery spoilage by 40% and simplified vendor restock orders.',
    metric: '-40% Spoilage Reduction',
    metricLabel: 'Saved inventory overheads in the first quarter.',
    overview: 'FreshMart, a high-volume neighborhood grocery, experienced significant losses on perishables. Store managers lacked notifications for batch stock expiration dates.',
    results: [
      'Barcode scanners trigger expiration date entries during receiving.',
      'Automated supplier draft purchases when inventory points trigger warning thresholds.',
      'Deli weight scales integrated seamlessly into registers checkout flows.'
    ]
  }
};

export default function CaseStudyDetailPage() {
  const params = useParams();
  const caseStudySlug = params.caseStudySlug as string;
  const study = CASE_STUDIES_DATA[caseStudySlug];

  if (!study) {
    notFound();
  }

  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container px-4 sm:px-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/testimonials" className="hover:text-blue-500 transition-colors">Testimonials</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">{study.merchantName} Case Study</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto mb-16">
            {/* Left side details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
                <Sparkles size={11} /> MERCHANT CASE STUDY
              </div>
              <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                {study.merchantName} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Success Story</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                {study.businessType}
              </p>
              
              <div className="rounded-2xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-5 space-y-2 italic">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-350 font-semibold leading-relaxed">
                  "{study.quote}"
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-250 dark:border-slate-900">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Core Achievements</span>
                {study.results.map((r, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shrink-0">
                      ✓
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-350 font-bold uppercase tracking-tight">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side metric box */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-8 sm:p-10 relative overflow-hidden backdrop-blur-md space-y-4 text-center">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 mx-auto">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-syne font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {study.metric}
                </h3>
                <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold uppercase tracking-wider leading-relaxed">
                  {study.metricLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}

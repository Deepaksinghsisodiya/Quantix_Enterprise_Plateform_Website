// src/app/(public)/help/[sectionSlug]/[articleSlug]/page.tsx
'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ThumbsUp, ThumbsDown, BookOpen, Clock, Heart } from 'lucide-react';
import { toast } from 'sonner';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface ArticleDetail {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  readTime: string;
  body: string[];
  tips: string;
}

const ARTICLES_DATA: Record<string, ArticleDetail> = {
  'pair-printers': {
    slug: 'pair-printers',
    title: 'Pairing Bluetooth Receipt Printers',
    category: 'Device & Terminal Setup',
    categorySlug: 'terminal-setup',
    readTime: '3 min read',
    body: [
      'Step 1: Power on your thermal paper receipt printer. Verify that the Bluetooth indicator LED is blinking blue, indicating discoverable mode.',
      'Step 2: On your Quantix POS register terminal, navigate to Settings > Device Connect > Bluetooth Printers.',
      'Step 3: Click "Scan for Devices". Select your printer model from the populated list (e.g., "Star-TSP-100").',
      'Step 4: Enter the pairing pin "0000" or "1234" if prompted. Once connected, print a test receipt to verify successful configuration.'
    ],
    tips: 'Ensure your printer paper roll is loaded correctly (thermal side facing the thermal printhead) prior to running test billing receipt commands.'
  },
  'apply-tokens': {
    slug: 'apply-tokens',
    title: 'Applying Validity Standalone Tokens',
    category: 'Licensing & Renewals',
    categorySlug: 'licensing-tokens',
    readTime: '2 min read',
    body: [
      'Step 1: Copy your perpetual token code from the merchant dashboard confirmation email.',
      'Step 2: Launch the standalone client terminal software on your checkout register.',
      'Step 3: Go to Settings > Licensing > Validity Token and paste the copied token key.',
      'Step 4: Click "Activate Register". The terminal will download a minor validation state to your local IndexedDB, extending operation immediately.'
    ],
    tips: 'Offline tokens do not require monthly recurring payments. Make sure to renew tokens before the expiration alert trigger to avoid register locking.'
  }
};

export default function HelpArticleDetailPage() {
  const params = useParams();
  const articleSlug = params.articleSlug as string;
  const article = ARTICLES_DATA[articleSlug];
  const [voted, setVoted] = useState<boolean>(false);

  if (!article) {
    notFound();
  }

  const handleVote = (type: 'up' | 'down') => {
    setVoted(true);
    toast.success(type === 'up' ? 'Thanks for voting this helpful!' : 'Thanks for your feedback!');
  };

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
            <Link href={`/help/${article.categorySlug}`} className="hover:text-primary transition-colors">
              {article.category}
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold">Article Details</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] shadow-2xs">
              <BookOpen size={13} className="text-[#FF4D00]" />
              <span>{article.category}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight max-w-3xl uppercase">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-primary" /> {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. Article Content Section (Standard .section-py) ─── */}
      <section className="section-py site-container max-w-3xl">

        {/* Article Body */}
        <div className="space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tips Box */}
        {article.tips && (
          <div className="rounded-md bg-amber-500/10 border border-amber-500/20 p-5 mt-8 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <Heart size={13} /> Manager tips & recommendations
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
              {article.tips}
            </p>
          </div>
        )}

        {/* Helpfulness Widget */}
        <div className="border-t border-gray-200 dark:border-slate-800/80 mt-12 pt-8 text-center space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-900 dark:text-white">Was this article helpful?</h4>
          {voted ? (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Thank you for helping us optimize our support matrix!</p>
          ) : (
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleVote('up')}
                className="rounded-md border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ThumbsUp size={13} className="text-emerald-500" /> Yes, it helped
              </button>
              <button
                type="button"
                onClick={() => handleVote('down')}
                className="rounded-md border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ThumbsDown size={13} className="text-red-500" /> No, I need more details
              </button>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </main>
  );
}

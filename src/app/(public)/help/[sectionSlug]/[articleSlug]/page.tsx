// src/app/(public)/help/[sectionSlug]/[articleSlug]/page.tsx
'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ChevronRight, ArrowLeft, ThumbsUp, ThumbsDown, BookOpen, Clock, Heart } from 'lucide-react';
import { toast } from 'sonner';

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
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container px-4 sm:px-0 max-w-2xl">
        {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/help" className="hover:text-blue-500 transition-colors">Help Centre</Link>
            <ChevronRight size={10} />
            <Link href={`/help/${article.categorySlug}`} className="hover:text-blue-500 transition-colors">{article.category}</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">Article Details</span>
          </div>

          <div className="flex items-center gap-2.5 mb-8">
            <Link href={`/help/${article.categorySlug}`}>
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">ARTICLE DETAILS</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                <span className="flex items-center gap-1"><BookOpen size={12} /> {article.category}</span>
                <span className="h-1 w-1 bg-slate-400 rounded-full" />
                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-sm leading-relaxed text-slate-750 dark:text-slate-300 font-medium">
            {article.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tips Box */}
          {article.tips && (
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 mt-8 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Heart size={13} /> Manager tips & recommendations
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
                {article.tips}
              </p>
            </div>
          )}

          {/* Helpfulness Widget */}
          <div className="border-t border-gray-250 dark:border-slate-900 mt-12 pt-8 text-center space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-900 dark:text-white">Was this article helpful?</h4>
            {voted ? (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Thank you for helping us optimize our support matrix!</p>
            ) : (
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleVote('up')}
                  className="rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ThumbsUp size={13} className="text-emerald-500" /> Yes, it helped
                </button>
                <button
                  onClick={() => handleVote('down')}
                  className="rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ThumbsDown size={13} className="text-red-500" /> No, I need more details
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

// src/app/(public)/help/article/[slug]/page.tsx
'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Clock,
  Heart,
  Share2,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import { useGetHelpArticleBySlugQuery, useGetHelpArticlesQuery } from '@/features/HelpCentre/Service/HelpCentreService';

export default function DynamicHelpArticlePage() {
  const params = useParams();
  const rawSlug = params.slug as string;
  const decodedSlug = decodeURIComponent(rawSlug || '');

  const { data: article, isLoading, isError } = useGetHelpArticleBySlugQuery(decodedSlug, {
    skip: !decodedSlug,
  });

  const { data: allArticles = [] } = useGetHelpArticlesQuery();

  const [voted, setVoted] = useState<boolean>(false);

  const handleVote = (type: 'up' | 'down') => {
    setVoted(true);
    toast.success(type === 'up' ? 'Thanks for voting this helpful!' : 'Thanks for your feedback!');
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    }
  };

  const otherArticles = allArticles.filter(
    (a) => a.slug !== decodedSlug && a.id !== decodedSlug
  ).slice(0, 3);

  if (isLoading) {
    return (
      <main className="pt-24 min-h-screen bg-white dark:bg-slate-950 pb-20">
        <div className="site-container max-w-3xl px-4 sm:px-6 animate-pulse space-y-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      </main>
    );
  }

  if (isError || !article) {
    return (
      <main className="pt-24 min-h-screen bg-white dark:bg-slate-950 pb-20">
        <div className="site-container max-w-2xl px-4 text-center py-16 space-y-4">
          <BookOpen className="mx-auto text-slate-400" size={48} />
          <h1 className="font-syne text-2xl font-black text-slate-900 dark:text-white">Help Article Not Found</h1>
          <p className="text-sm text-slate-500">The requested documentation article could not be located in our active knowledge base.</p>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-white font-bold text-xs shadow-md"
          >
            <ArrowLeft size={14} /> Back to Help Centre
          </Link>
        </div>
      </main>
    );
  }

  // Format body content lines
  const paragraphs = (article.body || '').split('\n').filter((p) => p.trim().length > 0);

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Standard .page-hero-header) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left max-w-3xl">
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
            <span className="text-primary font-bold truncate max-w-xs">{article.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {article.categoryName || 'Support Knowledge Base'}
            </span>
            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
              <Clock size={12} /> 3 min read
            </span>
            {article.updatedAt && (
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                <Calendar size={12} /> Updated {new Date(article.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black text-slate-950 dark:text-white leading-tight uppercase">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ─── 2. Article Content Section (Standard .section-py) ─── */}
      <section className="section-py site-container max-w-3xl">
        {/* Article Body Container */}
        <article className="prose prose-slate dark:prose-invert max-w-none border-t border-slate-200/80 dark:border-slate-800/80 pt-8 space-y-4">
          {paragraphs.map((para, idx) => {
            if (para.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-syne font-bold text-slate-900 dark:text-white pt-4">
                  {para.replace('### ', '')}
                </h3>
              );
            }
            if (para.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-xl font-syne font-black text-slate-900 dark:text-white pt-5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  {para.replace('## ', '')}
                </h2>
              );
            }
            if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ') || para.startsWith('4. ')) {
              return (
                <div key={idx} className="flex items-start gap-3 pl-2 py-1 text-sm text-slate-700 dark:text-slate-300">
                  <span className="h-5 w-5 rounded-md bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {para.slice(0, 1)}
                  </span>
                  <span>{para.slice(3)}</span>
                </div>
              );
            }
            return (
              <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                {para}
              </p>
            );
          })}
        </article>

        {/* Helpful Feedback Widget */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Was this guide helpful?
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Your feedback optimizes our official knowledge base.</p>
          </div>

          <div className="flex items-center gap-2">
            {voted ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={14} /> Thank you for your feedback!
              </span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleVote('up')}
                  className="px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <ThumbsUp size={13} className="text-emerald-500" /> Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleVote('down')}
                  className="px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <ThumbsDown size={13} className="text-rose-500" /> No
                </button>
              </>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer transition-all"
              title="Copy Article Link"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {otherArticles.length > 0 && (
          <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white mb-4">
              Related Knowledge Base Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherArticles.map((rel) => (
                <Link
                  key={rel.id || rel.slug}
                  href={`/help/article/${rel.slug || rel.id}`}
                  className="p-4 rounded-md border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-primary/40 transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase text-primary">
                    {rel.categoryName || 'Guide'}
                  </span>
                  <h4 className="font-syne font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors mt-1 line-clamp-1">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <CTABanner />
    </main>
  );
}

// src/app/(public)/help/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Search,
  HelpCircle,
  ArrowRight,
  BookOpen,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Terminal,
  FileText,
  LifeBuoy,
  Flame,
  Building2,
  Server,
  ShieldCheck,
  Headphones,
  Mail,
  Phone,
  Clock,
  X,
  ExternalLink,
  ChevronRight,
  Layers,
  FileCode,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import {
  useGetHelpArticlesQuery,
  useGetHelpCategoriesQuery,
  useGetHelpFAQsQuery,
} from '@/features/HelpCentre/Service/HelpCentreService';

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const { data: apiArticles = [], isLoading: isArticlesLoading } = useGetHelpArticlesQuery();
  const { data: apiCategories = [] } = useGetHelpCategoriesQuery();
  const { data: apiFaqs = [], isLoading: isFaqsLoading } = useGetHelpFAQsQuery();

  const filteredArticles = apiArticles.filter((art) => {
    const matchesSearch =
      searchQuery === '' ||
      art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.body?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredFaqs = apiFaqs.filter((faq) => {
    const matchesSearch =
      searchQuery === '' ||
      faq.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 page-nav-header space-y-3 text-left">
          {/* Breadcrumb */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">Help Center</span>
          </div>

          <div className="max-w-3xl space-y-4 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
                <LifeBuoy size={13} className="text-primary" />
                <span>24/7 Enterprise Technical Support</span>
              </div>
            </div>

            <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
              How Can We Help You Today?
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-xl">
              Search setup guides, offline failover protocols, hardware driver setup, and ERP integration documentation.
            </p>

            {/* Live Search Input */}
            <div className="pt-2 max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search troubleshooting guides (e.g. offline till, printer pairing, SAP webhook)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Action Cards */}
      <section className="section-py site-container px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/resources/pos-guide"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen size={20} />
              </div>
              <h3 className="font-syne font-bold text-sm text-slate-900 dark:text-white">Master POS Blueprint</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Step-by-step offline topology and hybrid cloud architecture.
              </p>
            </div>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1 mt-4">
              Explore Guide <ArrowRight size={12} />
            </span>
          </Link>

          <Link
            href="/api-docs"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Terminal size={20} />
              </div>
              <h3 className="font-syne font-bold text-sm text-slate-900 dark:text-white">Developer API Portal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                REST webhook endpoints, payload samples, and gRPC specs.
              </p>
            </div>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1 mt-4">
              View API Docs <ArrowRight size={12} />
            </span>
          </Link>

          <Link
            href="/roi-calculator"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FileText size={20} />
              </div>
              <h3 className="font-syne font-bold text-sm text-slate-900 dark:text-white">ROI Calculator</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Forecast multi-store operational savings vs legacy POS systems.
              </p>
            </div>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1 mt-4">
              Calculate Savings <ArrowRight size={12} />
            </span>
          </Link>

          <Link
            href="/contact"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Headphones size={20} />
              </div>
              <h3 className="font-syne font-bold text-sm text-slate-900 dark:text-white">Priority SLA Hotline</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                24/7 dedicated engineering support for live enterprise venues.
              </p>
            </div>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1 mt-4">
              Contact Engineers <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </section>

      {/* 2.5 Live Knowledge Base Articles from API */}
      <section className="section-py site-container px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-syne font-black text-primary tracking-widest uppercase flex items-center gap-1.5">
              <BookOpen size={14} /> OFFICIAL DOCUMENTATION & GUIDES
            </span>
            <h2 className="font-syne text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Help Articles & Setup Walkthroughs
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} Published
          </span>
        </div>

        {isArticlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <BookOpen className="mx-auto text-slate-400 mb-2" size={28} />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No help articles published yet.</p>
            <p className="text-xs text-slate-500 mt-1">Articles added in Admin will appear here instantly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((art) => (
              <Link
                key={art.id || art.slug}
                href={`/help/article/${art.slug || art.id}`}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      {art.categoryName || 'Support Guide'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Clock size={11} /> 3 min read
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {art.excerpt || art.body?.replace(/#+\s/g, '').slice(0, 140)}...
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Read Full Guide</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 3. Knowledge Base FAQs */}
      <section className="section-py site-container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-syne font-black text-primary tracking-widest uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-syne text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Common Answers & Troubleshooting
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {isFaqsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse h-14" />
              ))}
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <p className="text-sm font-medium text-slate-500">No FAQs found matching "{searchQuery}".</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors"
                >
                  <span className="font-syne font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                    {expandedFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Bottom CTABanner */}
      <CTABanner />
    </>
  );
}

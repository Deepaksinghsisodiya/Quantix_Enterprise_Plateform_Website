// src/app/(public)/blog/category/[categorySlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Layers, BookOpen } from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface Category {
  slug: string;
  name: string;
  desc: string;
}

const CATEGORIES_DATA: Record<string, Category> = {
  'operations': {
    slug: 'operations',
    name: 'Store Operations',
    desc: 'Deep dives into shift scheduling, offline database management, and inventory velocity controls.'
  },
  'technology': {
    slug: 'technology',
    name: 'POS Architecture',
    desc: 'Technical discussions around zero-cloud dependencies, WebSocket telemetry, and resilient local storage.'
  },
  'security': {
    slug: 'security',
    name: 'Data Privacy & Security',
    desc: 'PCI-DSS compliance guides, tokenization parameters, and AES-256 database protection.'
  }
};

const MOCK_CATEGORY_POSTS = [
  { id: '1', title: 'Managing 100+ Franchise Locations with Centralized Sync', readTime: '5 min read', date: 'April 2026' },
  { id: '2', title: 'Why Multi-Terminal LAN Syncing Outperforms Pure Cloud POS in Rush Hours', readTime: '8 min read', date: 'March 2026' },
];

export default function BlogCategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const category = CATEGORIES_DATA[categorySlug];

  if (!category) {
    notFound();
  }

  return (
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container px-4 sm:px-6 max-w-3xl">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
          <ChevronRight size={11} />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight size={11} />
          <span className="text-primary font-bold">{category.name}</span>
        </div>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-slate-800/80">
          <Link href="/blog">
            <span className="h-9 w-9 rounded-md border border-gray-200 dark:border-slate-800 hover:border-primary/40 bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-all cursor-pointer">
              <ArrowLeft size={15} />
            </span>
          </Link>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">BLOG CATEGORY</span>
            <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
              {category.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium mt-1">
              {category.desc}
            </p>
          </div>
        </div>

        {/* Category Articles list */}
        <div className="space-y-3">
          {MOCK_CATEGORY_POSTS.map((art) => (
            <Link key={art.id} href="/blog">
              <div className="rounded-md border border-gray-200 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-5 hover:border-primary/40 dark:hover:border-primary/40 transition-all cursor-pointer flex justify-between items-center group shadow-2xs">
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-bold uppercase block text-slate-900 dark:text-white group-hover:text-primary transition-colors">{art.title}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-bold uppercase tracking-wider">{art.date}</span>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-primary transition-colors shrink-0 ml-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <CTABanner />
      </div>
    </main>
  );
}

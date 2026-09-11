// src/app/(public)/blog/category/[categorySlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Layers, BookOpen } from 'lucide-react';

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
        <div className="site-container px-4 sm:px-0 max-w-2xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">{category.name}</span>
          </div>

          <div className="flex items-center gap-2.5 mb-10 pb-6 border-b border-gray-250 dark:border-slate-900">
            <Link href="/blog">
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">BLOG CATEGORY</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                {category.name}
              </h1>
              <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm font-medium mt-1">
                {category.desc}
              </p>
            </div>
          </div>

          {/* Category Articles list */}
          <div className="space-y-4">
            {MOCK_CATEGORY_POSTS.map((art) => (
              <Link key={art.id} href="/blog">
                <div className="rounded-2xl border border-gray-250 dark:border-slate-850 bg-gray-50/30 dark:bg-slate-900/10 p-5 hover:border-blue-500/30 transition-all cursor-pointer flex justify-between items-center group">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase block text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{art.title}</span>
                    <span className="text-[10px] text-slate-550 dark:text-slate-450 block font-bold uppercase tracking-wider">{art.date}</span>
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

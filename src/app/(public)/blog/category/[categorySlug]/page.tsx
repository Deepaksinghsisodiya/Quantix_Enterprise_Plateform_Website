// src/app/(public)/blog/category/[categorySlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ChevronRight, ArrowLeft, Layers, BookOpen } from 'lucide-react';

interface Category {
  slug: string;
  name: string;
  desc: string;
  articles: { title: string; slug: string; date: string }[];
}

const CATEGORIES_DATA: Record<string, Category> = {
  'retail': {
    slug: 'retail',
    name: 'Retail & Inventory Guides',
    desc: 'Guides on barcode scanners calibration, low-stock warning points, and size guides setups.',
    articles: [
      { title: 'Designing High-Performance Offline Checkout DBs', slug: 'offline-dbs-design', date: 'May 28, 2026' },
      { title: 'Avoiding Inventory Desync Across Franchise Networks', slug: 'avoid-inventory-desync', date: 'May 12, 2026' }
    ]
  },
  'restaurant': {
    slug: 'restaurant',
    name: 'Restaurant & KDS Strategy',
    desc: 'Setting visual course alerts on KDS screens and split receipt check layouts.',
    articles: [
      { title: 'The Ultimate Kitchen Display course pacing Guide', slug: 'kds-course-pacing', date: 'May 24, 2026' }
    ]
  }
};

export default function BlogCategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const category = CATEGORIES_DATA[categorySlug];

  if (!category) {
    notFound();
  }

  return (
    <PublicLayout>
      <Navbar />

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
            {category.articles.map((art) => (
              <Link key={art.slug} href={`/blog/${art.slug}`}>
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

      <Footer />
    </PublicLayout>
  );
}

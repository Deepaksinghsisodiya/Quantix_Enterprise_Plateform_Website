// src/app/(public)/blog/author/[authorSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ChevronRight, ArrowLeft, User, BookOpen, Clock, Heart } from 'lucide-react';

interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  articles: { title: string; slug: string; date: string }[];
}

const AUTHORS_DATA: Record<string, Author> = {
  'sarah-jones': {
    slug: 'sarah-jones',
    name: 'Sarah Jones',
    role: 'Principal Retail Telemetry Architect',
    bio: 'Sarah holds 12+ years designing high-throughput POS database systems and localized offline caches setups.',
    avatar: '/images/authors/sarah.jpg',
    articles: [
      { title: 'Designing High-Performance Offline Checkout DBs', slug: 'offline-dbs-design', date: 'May 28, 2026' },
      { title: 'Avoiding Inventory Desync Across Franchise Networks', slug: 'avoid-inventory-desync', date: 'May 12, 2026' }
    ]
  },
  'alex-chen': {
    slug: 'alex-chen',
    name: 'Alex Chen',
    role: 'Lead Restaurant Workflow Consultant',
    bio: 'Alex guides franchise venues on course pacing KDS setups, split check terminal configurations, and labor costs optimization.',
    avatar: '/images/authors/alex.jpg',
    articles: [
      { title: 'The Ultimate Kitchen Display course pacing Guide', slug: 'kds-course-pacing', date: 'May 24, 2026' }
    ]
  }
};

export default function BlogAuthorPage() {
  const params = useParams();
  const authorSlug = params.authorSlug as string;
  const author = AUTHORS_DATA[authorSlug];

  if (!author) {
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
            <span className="text-slate-600 dark:text-slate-400">{author.name}</span>
          </div>

          <div className="flex items-center gap-2.5 mb-10 pb-6 border-b border-gray-250 dark:border-slate-900">
            <Link href="/blog">
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">BLOG AUTHOR</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                {author.name}
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">
                {author.role}
              </p>
            </div>
          </div>

          {/* Author Details Card */}
          <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-6 sm:p-8 space-y-4 mb-10">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center shrink-0">
                <User size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase text-slate-900 dark:text-white">Biography</h4>
                <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed font-semibold">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Author Articles Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 block">Articles by {author.name}</h3>
            {author.articles.map((art) => (
              <Link key={art.slug} href={`/blog/${art.slug}`}>
                <div className="rounded-2xl border border-gray-250 dark:border-slate-850 bg-gray-50/30 dark:bg-slate-900/10 p-5 hover:border-blue-500/30 transition-all cursor-pointer flex justify-between items-center group">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase block text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{art.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-450 block font-bold uppercase tracking-wider">{art.date}</span>
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

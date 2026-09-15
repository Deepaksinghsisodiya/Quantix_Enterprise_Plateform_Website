// src/app/(public)/blog/author/[authorSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, User, BookOpen, Clock, Heart } from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

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
          <span className="text-primary font-bold">{author.name}</span>
        </div>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-slate-800/80">
          <Link href="/blog">
            <span className="h-9 w-9 rounded-md border border-gray-200 dark:border-slate-800 hover:border-primary/40 bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-all cursor-pointer">
              <ArrowLeft size={15} />
            </span>
          </Link>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">BLOG AUTHOR</span>
            <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
              {author.name}
            </h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">
              {author.role}
            </p>
          </div>
        </div>

        {/* Author Details Card */}
        <div className="rounded-md border border-gray-200 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-6 sm:p-8 space-y-4 mb-10 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
              <User size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase text-slate-900 dark:text-white">Biography</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Author Articles Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 block">Articles by {author.name}</h3>
          {author.articles.map((art) => (
            <Link key={art.slug} href={`/blog/${art.slug}`}>
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

// src/app/(public)/blog/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Clock,
  Calendar,
  X,
  ChevronRight,
  BookOpen,
  User,
  ArrowRight,
  Sparkles,
  Tag,
  RefreshCw,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import NewsletterWrapper from '@/features/Newsletter';
import { useGetBlogPostsQuery } from '@/features/Blog/services/BlogServices';
import { BlogPostDto } from '@/features/Blog/Types/BlogTypes';

export default function EnterpriseBlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const { data: posts = [], isLoading, isError, refetch } = useGetBlogPostsQuery();

  // Extract unique categories dynamically from real API data
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      const cat = p.categoryName || p.category;
      if (cat) set.add(cat.trim());
    });
    return ['all', ...Array.from(set)];
  }, [posts]);

  // Filter posts by active category and search keyword
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const postCat = post.categoryName || post.category;
      const matchCat =
        activeCategory === 'all' ||
        postCat?.toLowerCase() === activeCategory.toLowerCase();

      const tagsString = Array.isArray(post.tags) ? post.tags.join(' ') : (post.tags || '');

      const matchSearch =
        !search.trim() ||
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
        post.author?.toLowerCase().includes(search.toLowerCase()) ||
        tagsString.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, search]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  const formatDate = (dateStr?: string) => {
    try {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr || '';
    }
  };

  const calculateReadTime = (body?: string) => {
    if (!body) return '5 min read';
    const words = body.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* 1. Hero Header */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 bg-linear-to-b from-slate-50/70 via-white to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
            <Sparkles size={13} className="text-primary" />
            <span>Enterprise Commerce Insights</span>
          </div>

          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.12] tracking-tight">
            Quantix Enterprise Blog
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Technical architecture, distributed point-of-sale resilience, ERP integration blueprints, and franchise supply chain strategy.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 ml-3.5 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by architecture, ERP, author, or keyword..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Dynamically populated from API data) */}
          {categories.length > 1 && (
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all border capitalize cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-primary border-primary text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                  }`}
                >
                  {cat === 'all' ? 'All Articles' : cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Main Content Area */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Loading Skeletons */}
        {isLoading && (
          <div className="space-y-10 animate-pulse">
            <div className="h-80 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="text-center py-16 px-4 max-w-md mx-auto rounded-3xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-3">
            <h3 className="font-syne text-lg font-bold text-red-700 dark:text-red-400">Unable to load blog feed</h3>
            <p className="text-xs text-red-600/80">The API endpoint is currently unreachable. Please verify your connection.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold font-syne uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State (When database has 0 posts or search yields 0 results) */}
        {!isLoading && !isError && filteredPosts.length === 0 && (
          <div className="text-center py-20 px-4 max-w-md mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <BookOpen size={24} />
            </div>
            <h3 className="font-syne text-xl font-bold text-slate-950 dark:text-white">
              {search ? 'No Matching Articles' : 'No Articles Published Yet'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {search
                ? `No articles found matching "${search}". Try another keyword or clear filters.`
                : 'Articles published through the central backend portal will automatically stream here.'}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('all');
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-syne font-bold uppercase tracking-wider cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Live Articles Display (When API has posts) */}
        {!isLoading && !isError && featuredPost && (
          <div className="space-y-12">
            {/* Featured Hero Article */}
            <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary-light to-amber-500" />

              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {featuredPost.categoryName || featuredPost.category || 'FEATURED'}
                  </span>
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Clock size={12} />
                    {calculateReadTime(featuredPost.body || featuredPost.content)}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug || featuredPost.postId}`}>
                  <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-primary" />
                    {featuredPost.author || 'Quantix Team'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-primary" />
                    {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug || featuredPost.postId}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link
                  href={`/blog/${featuredPost.slug || featuredPost.postId}`}
                  className="block relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group"
                >
                  <Image
                    src={featuredPost.featuredImageUrl || featuredPost.coverImage || '/images/hero_multi_location_hq.jpg'}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary px-2 py-0.5 rounded">
                      Featured
                    </span>
                    <p className="text-xs font-syne font-bold mt-1 line-clamp-2">
                      {featuredPost.title}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Articles Grid */}
            {gridPosts.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                  More Articles & Architecture Guides
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((post) => (
                    <article
                      key={post.postId || post.slug}
                      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-syne font-black uppercase tracking-wider px-2.5 py-0.5 rounded border text-primary bg-primary/10 border-primary/20">
                            {post.categoryName || post.category || 'Article'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                            <Clock size={11} />
                            {calculateReadTime(post.body || post.content)}
                          </span>
                        </div>

                        <Link href={`/blog/${post.slug || post.postId}`}>
                          <h4 className="font-syne text-base font-bold text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-snug">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-medium">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                        <Link
                          href={`/blog/${post.slug || post.postId}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
                        >
                          <span>Read Article</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Newsletter Subscription Box */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 dark:border-primary/30 text-center space-y-4">
          <h3 className="font-syne text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
            Get the Enterprise POS Engineering Dispatch
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Join 10,000+ VPs of Engineering, CTOs, and multi-unit retail executives receiving our monthly systems blueprints and performance benchmarks.
          </p>
          <div className="flex justify-center pt-2">
            <NewsletterWrapper title="" subtitle="" variant="card" className="w-full max-w-lg mx-auto" />
          </div>
        </div>
      </div>

      {/* 4. Bottom CTABanner */}
      <CTABanner />
    </div>
  );
}

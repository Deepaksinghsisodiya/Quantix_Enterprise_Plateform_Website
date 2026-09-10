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
  BookOpen,
  User,
  ArrowRight,
  Sparkles,
  Tag,
  RefreshCw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Database,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import NewsletterWrapper from '@/features/Newsletter';
import { useGetBlogPostsQuery } from '@/features/Blog/Service/BlogService';
import { BlogPostDto } from '@/features/Blog/Types/BlogTypes';

const ITEMS_PER_PAGE = 6;

export default function EnterpriseBlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'quick'>('latest');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 100% Pure Live API Data — Zero Dummy Data
  const { data: posts = [], isLoading, isError, refetch } = useGetBlogPostsQuery();

  // Helper: Resolve image from API data (supports media asset ID, external URL, or fallback)
  const resolveImageUrl = (post: BlogPostDto): string => {
    if (post.featuredImageUrl?.trim()) return post.featuredImageUrl.trim();
    if (post.featuredImageAssetId?.trim()) {
      return `/api/v1/media/${post.featuredImageAssetId.trim()}/file`;
    }
    if (post.coverImage?.trim()) return post.coverImage.trim();
    return '/images/hero_multi_location_hq.jpg';
  };

  // Helper: Resolve category dynamically from API data
  const resolveCategory = (post: BlogPostDto): string => {
    if (post.categoryName?.trim() && post.categoryName.trim().toLowerCase() !== 'no category') {
      return post.categoryName.trim();
    }
    if (post.category?.trim() && post.category.trim().toLowerCase() !== 'no category') {
      return post.category.trim();
    }
    if (post.tags) {
      const list = Array.isArray(post.tags) ? post.tags : post.tags.split(',');
      if (list.length > 0 && list[0]?.trim()) {
        return list[0].trim();
      }
    }
    return 'General';
  };

  // Helper: Resolve excerpt from API body or SEO description
  const resolveExcerpt = (post: BlogPostDto): string => {
    if (post.excerpt?.trim()) return post.excerpt.trim();
    if (post.seoDescription?.trim()) return post.seoDescription.trim();
    if (post.body?.trim()) {
      const clean = post.body.replace(/[#*`_\[\]]/g, '').replace(/\n+/g, ' ').trim();
      return clean.length > 160 ? clean.substring(0, 160) + '...' : clean;
    }
    return 'Read the full publication for technical benchmarks, integration flows, and hardware guides.';
  };

  // Helper: Resolve author name from API data
  const resolveAuthor = (post: BlogPostDto): string => {
    if (post.author?.trim() && post.author.trim().toLowerCase() !== 'no author') {
      return post.author.trim();
    }
    if (post.authorName?.trim() && post.authorName.trim().toLowerCase() !== 'no author') {
      return post.authorName.trim();
    }
    return 'Quantix Editorial';
  };

  // Helper: Parse tags into an array
  const resolveTags = (post: BlogPostDto): string[] => {
    if (!post.tags) return [];
    if (Array.isArray(post.tags)) return post.tags;
    return post.tags.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean);
  };

  // Dynamic Categories extracted strictly from API posts
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      const cat = resolveCategory(p);
      if (cat) set.add(cat);
    });
    return ['all', ...Array.from(set)];
  }, [posts]);

  // Dynamic Tags extracted strictly from API posts
  const popularTags = useMemo(() => {
    const tagCountMap: Record<string, number> = {};
    posts.forEach((p) => {
      resolveTags(p).forEach((tag) => {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [posts]);

  // Filter & Sort strictly applied to live API posts
  const filteredPosts = useMemo(() => {
    let list = posts.filter((post) => {
      const postCat = resolveCategory(post);
      const matchCat =
        activeCategory === 'all' ||
        postCat.toLowerCase() === activeCategory.toLowerCase();

      const postTags = resolveTags(post);
      const matchTag =
        !selectedTag ||
        postTags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      const matchSearch =
        !search.trim() ||
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        resolveExcerpt(post).toLowerCase().includes(search.toLowerCase()) ||
        resolveAuthor(post).toLowerCase().includes(search.toLowerCase()) ||
        postTags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      return matchCat && matchTag && matchSearch;
    });

    if (sortBy === 'latest') {
      list.sort((a, b) => {
        const da = new Date(a.publishedAt || a.createdAt || 0).getTime();
        const db = new Date(b.publishedAt || b.createdAt || 0).getTime();
        return db - da;
      });
    } else if (sortBy === 'quick') {
      list.sort((a, b) => {
        const wordsA = (a.body || a.content || '').split(/\s+/).length;
        const wordsB = (b.body || b.content || '').split(/\s+/).length;
        return wordsA - wordsB;
      });
    }

    return list;
  }, [posts, activeCategory, selectedTag, search, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const formatDate = (dateStr?: string) => {
    try {
      if (!dateStr) return 'Recent';
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr || 'Recent';
    }
  };

  const calculateReadTime = (body?: string) => {
    if (!body) return '3 min read';
    const words = body.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 480, behavior: 'smooth' });
  };

  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      {/* 1. Hero Header Section */}
      <section className="relative pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 bg-linear-to-b from-slate-50/70 via-white to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
            <Sparkles size={13} className="text-primary" />
            <span>Live Publications Hub</span>
          </div>

          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.12] tracking-tight">
            Quantix Platform Blog
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Direct publications and technical documentation streaming in real time from the backend database.
          </p>

          {/* Search Input Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 ml-3.5 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search live articles by keyword, tag, or topic..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setCurrentPage(1);
                  }}
                  className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs (Generated from live posts) */}
          {categories.length > 1 && (
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
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

      {/* 2. Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        {/* Loading Skeletons */}
        {isLoading && (
          <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="text-center py-16 px-4 max-w-md mx-auto rounded-3xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-3">
            <h3 className="font-syne text-lg font-bold text-red-700 dark:text-red-400">Unable to load blog feed</h3>
            <p className="text-xs text-red-600/80">API connection error. Please ensure the backend on port 5104 is online.</p>
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

        {/* Controls & Live Data Status Bar */}
        {!isLoading && !isError && posts.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Database size={14} className="text-primary" />
              <span>
                Live Database: <strong className="text-slate-950 dark:text-white font-bold">{filteredPosts.length}</strong> of {posts.length} {posts.length === 1 ? 'article' : 'articles'}
              </span>
              {selectedTag && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px]">
                  #{selectedTag}
                  <button
                    type="button"
                    onClick={() => setSelectedTag('')}
                    className="hover:text-red-500 cursor-pointer ml-1"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-syne font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="latest">Latest Published</option>
                <option value="quick">Quick Reads</option>
              </select>
            </div>
          </div>
        )}

        {/* Live Tags Bar */}
        {!isLoading && !isError && popularTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
              <Tag size={12} />
              <span>Tags:</span>
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? '' : tag);
                  setCurrentPage(1);
                }}
                className={`text-xs font-bold px-3 py-1 rounded-xl transition-all border cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-primary border-primary text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/40'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* 3. Multi-Blog Grid (Pure Live API Data) */}
        {!isLoading && !isError && paginatedPosts.length > 0 && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedPosts.map((post) => {
                const postId = post.postId || post.id || post.slug;
                const postUrl = `/blog/${post.slug || post.postId}`;
                const category = resolveCategory(post);
                const imageUrl = resolveImageUrl(post);
                const excerpt = resolveExcerpt(post);
                const author = resolveAuthor(post);
                const tags = resolveTags(post);

                return (
                  <article
                    key={postId}
                    className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* High-res Image with overlay badge */}
                      <Link href={postUrl} className="block relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="text-[10px] font-syne font-black uppercase tracking-wider text-white bg-primary/90 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-xs">
                            {category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 text-white/90 text-[11px] font-bold flex items-center gap-1 bg-slate-950/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          <Clock size={11} />
                          <span>{calculateReadTime(post.body || post.content)}</span>
                        </div>
                      </Link>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <Link href={postUrl}>
                          <h3 className="font-syne text-lg sm:text-xl font-black text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>

                        {/* Tags Badges */}
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {tags.slice(0, 3).map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                          {author[0] || 'Q'}
                        </div>
                        <span className="font-medium truncate max-w-[120px]">{author}</span>
                      </div>

                      <Link
                        href={postUrl}
                        className="inline-flex items-center gap-1 text-xs font-syne font-bold uppercase tracking-wider text-primary group-hover:text-primary-dark transition-colors cursor-pointer"
                      >
                        <span>Read</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls (When more than 6 posts exist) */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary cursor-pointer transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-xl font-syne font-bold text-xs transition-all border cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-primary border-primary text-white shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary cursor-pointer transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State (When DB has 0 posts or search has 0 results) */}
        {!isLoading && !isError && filteredPosts.length === 0 && (
          <div className="text-center py-20 px-4 max-w-md mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <BookOpen size={24} />
            </div>
            <h3 className="font-syne text-xl font-bold text-slate-950 dark:text-white">
              {search || selectedTag ? 'No Matching Publications' : 'No Articles in Database'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {search || selectedTag
                ? 'No articles found matching your filters. Try clearing search or tags.'
                : 'Publish articles from the admin dashboard to populate this grid in real time.'}
            </p>
            {(search || selectedTag || activeCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedTag('');
                  setActiveCategory('all');
                  setCurrentPage(1);
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-syne font-bold uppercase tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* 4. Newsletter Dispatch Card */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 dark:border-primary/30 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-syne font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Monthly Systems Dispatch</span>
          </div>
          <h3 className="font-syne text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Get Enterprise Engineering Updates
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Direct release notes, cloud POS architecture insights, and hardware calibration benchmarks delivered to your inbox.
          </p>
          <div className="flex justify-center pt-3">
            <NewsletterWrapper title="" subtitle="" variant="card" className="w-full max-w-lg mx-auto" />
          </div>
        </div>
      </div>

      {/* 5. Bottom CTABanner */}
      <CTABanner />
    </div>
  );
}

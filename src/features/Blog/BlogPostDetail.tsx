// src/features/Blog/BlogPostDetail.tsx
'use client';

import React from "react";
import { ArrowLeft, Calendar, User, BookOpen, Tag, Clock, Share2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPostDto } from "./Types/BlogTypes";
import { toast } from "sonner";

export interface BlogPostDetailProps {
  slug: string;
  post: BlogPostDto | null;
  isLoading: boolean;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  slug,
  post,
  isLoading,
}) => {
  const formatDate = (dateStr?: string) => {
    try {
      if (!dateStr) return 'Latest Release';
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr || 'Latest Release';
    }
  };

  const calculateReadTime = (body?: string) => {
    if (!body) return '5 min read';
    const words = body.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    }
  };

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 w-full max-w-4xl mx-auto px-4 sm:px-6 animate-pulse space-y-6 sm:space-y-8">
        <div className="h-5 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-10 sm:h-14 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-60 sm:h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl sm:rounded-3xl" />
        <div className="space-y-3 pt-4">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  // 2. Empty / Not Found State
  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-28 pb-16 w-full max-w-lg mx-auto text-center px-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-5 shadow-xs">
          <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <span className="text-[10px] sm:text-[11px] font-syne font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-3">
          404 • Article Not Found
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-syne font-extrabold text-slate-950 dark:text-white mb-2">
          No Article Data Available
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6 break-words max-w-full">
          The requested article (slug: <code className="text-primary font-mono">{slug}</code>) could not be retrieved.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  // 3. Resolve Real Data Values
  const resolveCategory = () => {
    if (post.categoryName?.trim() && post.categoryName.trim().toLowerCase() !== 'no category') {
      return post.categoryName.trim();
    }
    if (post.category?.trim() && post.category.trim().toLowerCase() !== 'no category') {
      return post.category.trim();
    }
    if (post.tags) {
      const list = Array.isArray(post.tags) ? post.tags : post.tags.split(',');
      if (list.length > 0 && list[0]?.trim()) return list[0].trim();
    }
    return 'Retail POS';
  };

  const resolveAuthor = () => {
    if (post.author?.trim() && post.author.trim().toLowerCase() !== 'no author') {
      return post.author.trim();
    }
    if (post.authorName?.trim() && post.authorName.trim().toLowerCase() !== 'no author') {
      return post.authorName.trim();
    }
    return 'Quantix Research Team';
  };

  const resolveImageUrl = () => {
    if (post.featuredImageUrl?.trim()) return post.featuredImageUrl.trim();
    if (post.featuredImageAssetId?.trim()) {
      return `/api/v1/media/${post.featuredImageAssetId.trim()}/file`;
    }
    if (post.coverImage?.trim()) return post.coverImage.trim();
    return '/images/hero_multi_location_hq.jpg';
  };

  const category = resolveCategory();
  const author = resolveAuthor();
  const imageUrl = resolveImageUrl();
  const content = post.body || post.content || post.excerpt || '';
  const dateFormatted = formatDate(post.publishedAt || post.createdAt);
  const readTime = post.readTime || calculateReadTime(content);

  const tagsList = post.tags
    ? (Array.isArray(post.tags) ? post.tags : post.tags.split(',')).map((t) => t.trim().replace(/^#/, '')).filter(Boolean)
    : [];

  return (
    <article className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative pt-24 sm:pt-32 md:pt-36 pb-10 sm:pb-14 bg-linear-to-b from-slate-50/80 via-white to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>Back to Blog</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-syne font-black uppercase tracking-widest text-primary border border-primary/30 bg-primary/10 px-3 sm:px-3.5 py-1 rounded-full">
              <Tag size={11} />
              {category}
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-syne font-black text-slate-950 dark:text-white leading-[1.18] tracking-tight break-words">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed break-words">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 md:gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-3 sm:pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-primary" />
              {author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-primary" />
              {dateFormatted}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-primary" />
              {readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      {imageUrl && (
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 -mt-4 sm:-mt-6 mb-8 sm:mb-12">
          <div className="relative w-full h-52 min-[480px]:h-64 sm:h-80 md:h-96 lg:h-112 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Article Content Body */}
      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-5 sm:space-y-6">
          {content ? (
            content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // H2 Header
              if (trimmed.startsWith("## ")) {
                return (
                  <div key={idx} className="pt-5 sm:pt-7 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-syne font-black text-slate-950 dark:text-white leading-snug break-words">
                      {trimmed.replace("## ", "")}
                    </h2>
                  </div>
                );
              }

              // H3 Header
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl md:text-2xl font-syne font-extrabold text-slate-950 dark:text-white pt-3 sm:pt-4 break-words">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              // List items (e.g. 1. or * or -)
              const lines = trimmed.split("\n");
              const isNumberedList = lines.every((l) => /^\d+\.\s/.test(l.trim()));
              const isBulletList = lines.every((l) => /^[-*]\s/.test(l.trim()));

              if (isNumberedList) {
                return (
                  <div key={idx} className="space-y-3 my-4">
                    {lines.map((item, itemIdx) => {
                      const match = item.match(/^(\d+)\.\s*(.*)/);
                      const num = match ? match[1] : itemIdx + 1;
                      const text = match ? match[2] : item;
                      return (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800"
                        >
                          <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-primary text-white text-xs font-black font-syne shrink-0 mt-0.5">
                            {num}
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                            {text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              if (isBulletList) {
                return (
                  <div key={idx} className="space-y-2.5 my-4">
                    {lines.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2.5 sm:gap-3">
                        <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5 sm:mt-1" />
                        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                          {item.replace(/^[-*]\s*/, "")}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              }

              // Standard Paragraph
              return (
                <p key={idx} className="text-xs sm:text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                  {trimmed}
                </p>
              );
            })
          ) : (
            <p className="text-sm text-slate-400 italic">No full article text provided for this post.</p>
          )}
        </div>

        {/* Tags Section */}
        {tagsList.length > 0 && (
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-[11px] sm:text-xs font-syne font-bold uppercase tracking-widest text-slate-400 mb-3">
              Tags & Taxonomies
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tagsList.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Card Footer */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <User size={24} />
          </div>
          <div>
            <h4 className="font-syne text-sm sm:text-base font-bold text-slate-950 dark:text-white">
              Written by {author}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Quantix Platform Commerce & Distributed Systems Research Group
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogPostDetail;

// src/features/Blog/BlogPostDetail.tsx
'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, BookOpen, Tag, Clock, Share2 } from "lucide-react";
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
  const router = useRouter();

  const formatDate = (dateStr?: string) => {
    try {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
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

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    }
  };

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="pt-28 sm:pt-32 pb-24 site-container max-w-4xl px-4 animate-pulse space-y-8">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="space-y-4 pt-6">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  // 2. Empty / Not Found State (When API has no data for this article)
  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 site-container max-w-lg mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-6 shadow-xs">
          <BookOpen className="h-8 w-8" />
        </div>
        <span className="text-[11px] font-syne font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full mb-3">
          404 • Article Not Found
        </span>
        <h1 className="text-2xl sm:text-3xl font-syne font-extrabold text-slate-950 dark:text-white mb-3">
          No Article Data Available
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
          The requested article (slug: <code className="text-primary font-mono">{slug}</code>) could not be retrieved from the database.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  // 3. Real Article View (Purely driven by API data)
  const category = post.categoryName || post.category;
  const content = post.body || post.content || post.excerpt || '';
  const dateFormatted = formatDate(post.publishedAt || post.createdAt);
  const readTime = post.readTime || calculateReadTime(content);
  const imageUrl = post.featuredImageUrl || post.coverImage;

  return (
    <article className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative pt-32 sm:pt-36 pb-14 bg-linear-to-b from-slate-50/80 via-white to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div className="site-container max-w-4xl px-4 sm:px-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>

          {category && (
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-syne font-black uppercase tracking-widest text-primary border border-primary/30 bg-primary/10 px-3.5 py-1 rounded-full">
                <Tag size={11} />
                {category}
              </span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-syne font-black text-slate-950 dark:text-white leading-[1.15] tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-primary" />
                {post.author}
              </span>
            )}
            {dateFormatted && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-primary" />
                {dateFormatted}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-primary" />
              {readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Cover Image (if available) */}
      {imageUrl && (
        <section className="site-container max-w-4xl px-4 sm:px-6 -mt-4 mb-10">
          <div className="relative w-full h-72 sm:h-96 md:h-112 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Article Content Body */}
      <section className="site-container max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-syne prose-headings:font-black prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
          {content ? (
            content.split("\n\n").map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-syne font-black text-slate-950 dark:text-white mt-8 mb-4">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-syne font-black text-slate-950 dark:text-white mt-10 mb-4">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {trimmed}
                </p>
              );
            })
          ) : (
            <p className="text-sm text-slate-400 italic">No full article text provided for this post.</p>
          )}
        </div>

        {/* Tags Section */}
        {post.tags && (
          <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-syne font-bold uppercase tracking-widest text-slate-400 mb-3">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(post.tags) ? post.tags : post.tags.split(",")).map(
                (tag: string, idx: number) => {
                  const tagClean = tag.trim().replace(/^#/, "");
                  if (!tagClean) return null;
                  return (
                    <span
                      key={idx}
                      className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-xl"
                    >
                      #{tagClean}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Author Card Footer */}
        {post.author && (
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <User size={22} />
            </div>
            <div>
              <h4 className="font-syne text-sm font-bold text-slate-950 dark:text-white">
                Written by {post.author}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Quantix Editorial & Research Team
              </p>
            </div>
          </div>
        )}
      </section>
    </article>
  );
};

export default BlogPostDetail;

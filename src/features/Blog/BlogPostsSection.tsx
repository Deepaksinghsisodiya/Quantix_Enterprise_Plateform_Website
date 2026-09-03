// src/features/Blog/BlogPostsSection.tsx
'use client';

import React from "react";
import { BookOpen, Calendar, User, ArrowRight, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { BlogPostDto } from "./Types/BlogTypes";
import NewsletterWrapper from "@/features/Newsletter";

export interface BlogPostsSectionProps {
  posts: BlogPostDto[];
  isLoading: boolean;
}

export const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({ posts, isLoading }) => {
  const formatDate = (dateStr?: string) => {
    try {
      if (!dateStr) return 'Recent';
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr || 'Recent';
    }
  };

  const calculateReadTime = (body?: string) => {
    if (!body) return "5 min read";
    const words = body.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="site-container px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary shadow-2xs">
              <Sparkles className="h-3 w-3" />
              <span>Engineering & Commerce Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-syne font-black uppercase text-slate-950 dark:text-white leading-tight">
              Latest from the Blog
            </h2>
            <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">
              Technical blueprints, offline mesh architecture, and merchant scaling strategies directly from our engineering team.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-colors shrink-0 group"
          >
            <span>View All Articles</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center py-16 px-4 max-w-md mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-syne text-lg font-bold text-slate-950 dark:text-white">
              No Articles Published Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              New articles published from the central admin dashboard will automatically appear here.
            </p>
          </div>
        )}

        {/* Live Articles Grid (When real API articles exist) */}
        {!isLoading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.slice(0, 3).map((post) => {
              const postId = post.postId || post.id || post.slug;
              const category = post.categoryName || post.category || 'Engineering';
              const content = post.body || post.content || post.excerpt;

              return (
                <article
                  key={postId}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between hover:shadow-lg hover:border-primary/40 transition-all duration-300 group"
                >
                  <div className="space-y-3.5">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span className="text-[10px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                        {category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="h-3 w-3" />
                        {calculateReadTime(content)}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug || postId}`}>
                      <h3 className="text-base sm:text-lg font-syne font-bold text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    {post.excerpt && (
                      <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 pt-6">
                    <hr className="border-slate-100 dark:border-slate-800" />

                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-primary" />
                        {post.author || "Quantix Team"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug || postId}`}
                      className="text-xs font-syne font-bold uppercase tracking-wider text-primary flex items-center gap-1 hover:translate-x-1 transition-transform pt-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Integrated Newsletter Subscription Banner */}
        <div className="mt-16 sm:mt-20">
          <NewsletterWrapper
            title="Join the Quantix Strategy Dispatch"
            subtitle="Get technical blueprints, POS release notes, and high-velocity retail insights in your inbox."
            variant="card"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogPostsSection;

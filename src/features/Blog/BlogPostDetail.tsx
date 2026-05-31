// src/features/Blog/BlogPostDetail.tsx
'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, BookOpen, Tag } from "lucide-react";
import Link from "next/link";
import { BlogPostDto } from "./Types/BlogTypes";
import { ATMLoader } from "@/components/atoms/ATMLoader";

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

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const calculateReadTime = (body: string) => {
    if (!body) return "5 min read";
    const words = body.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center pt-32 pb-24">
        <ATMLoader fullScreen variant="spinner" size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 site-container text-center">
        <BookOpen className="h-16 w-16 text-slate-300 mb-4 animate-pulse" />
        <h1 className="text-3xl font-syne font-bold text-slate-800 dark:text-white mb-2">
          Article Not Found
        </h1>
        <p className="text-slate-500 mb-6 max-w-sm">
          The blog post you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/blog")}
          className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold shadow-md shadow-primary/20 hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 flex-1 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Banner */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="relative site-container max-w-3xl space-y-6 text-center">
          {post.categoryName && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 bg-primary/10 px-3 py-1 rounded-full">
              <Tag className="h-3 w-3" />
              {post.categoryName}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-syne font-black uppercase leading-tight">
            {post.title}
          </h1>
          <p className="text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author || "Quantix Team"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {calculateReadTime(post.body)}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 site-container max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-syne prose-headings:uppercase prose-p:leading-relaxed prose-p:text-slate-500 dark:prose-p:text-slate-400">
          {post.body ? (
            post.body.split("\n").map((paragraph, idx) =>
              paragraph.trim() ? (
                <p key={idx} className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ) : (
                <div key={idx} className="h-4" />
              )
            )
          ) : (
            <p className="text-sm text-slate-400">No content available for this article.</p>
          )}
        </article>

        {/* Tags */}
        {post.tags && (
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.split(",").map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/5 px-3 py-1 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPostDetail;

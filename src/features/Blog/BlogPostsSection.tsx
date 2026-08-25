// src/features/Blog/BlogPostsSection.tsx
import React from "react";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPostDto } from "./Types/BlogTypes";

export interface BlogPostsSectionProps {
  posts: BlogPostDto[];
  isLoading: boolean;
}

const DEFAULT_POSTS: BlogPostDto[] = [
  {
    postId: "1",
    title: "Optimizing Multi-Terminal Register Speed",
    slug: "optimizing-multi-terminal-register-speed",
    excerpt: "Learn how indexing offline sales transactions locally speeds up cashier checkout speeds during busy hours.",
    body: "Multi-register setups need local caching structures to operate smoothly. By using client-side store caches, registers avoid queuing delay, ensuring transactions process in less than 500ms.",
    author: "Elena Rostova",
    categoryName: "Engineering",
    createdAt: "2026-05-28T09:00:00Z"
  },
  {
    postId: "2",
    title: "The Future of Offline-First Merchant APIs",
    slug: "future-of-offline-first-merchant-apis",
    excerpt: "Why background sync networks are becoming the gold standard for retail stores and dining POS systems.",
    body: "Traditional POS models depend heavily on continuous web requests. Today, systems run decoupled SQLite/IndexedDB backplanes, pushing bulk synchronization only when connections stabilize.",
    author: "Marc Verney",
    categoryName: "Architecture",
    createdAt: "2026-05-25T14:30:00Z"
  },
  {
    postId: "3",
    title: "Designing Seamless Restaurant Floor Maps",
    slug: "designing-seamless-restaurant-floor-maps",
    excerpt: "How floor structures and visual table allocations improve waiter round-trips and check-split ease.",
    body: "Floor plan maps should feel like games—drag-and-drop tables, visual bill indicators, and status trackers keep operations running flawlessly even during high peak hours.",
    author: "Sarah Jenkins",
    categoryName: "Design & UX",
    createdAt: "2026-05-20T10:15:00Z"
  }
];

export const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({ posts, isLoading }) => {
  const displayPosts = posts.length > 0 ? posts : DEFAULT_POSTS;

  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  const calculateReadTime = (body: string) => {
    if (!body) return "5 min read";
    const words = body.split(/\s+/).length;
    const time = Math.max(1, Math.ceil(words / 200));
    return `${time} min read`;
  };

  return (
    <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-300 flex-1">
      {/* Header Hero */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800/80 transition-colors text-center">
        <div className="site-container max-w-2xl space-y-4">
          <div className="mx-auto p-3.5 bg-primary/10 rounded-2xl w-fit text-primary animate-pulse">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-syne font-black text-slate-900 dark:text-white uppercase">Merchant & Tech Blog</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Read up on industry checkout optimization guides, restaurant matrix configurations, and modern REST API payment engineering.
          </p>
        </div>
      </section>

      {/* Blog Post Grid */}
      <section className="py-24 site-container max-w-5xl">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs animate-pulse space-y-4">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-20 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPosts.map((post: BlogPostDto) => (
              <div key={post.postId} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="space-y-4">
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {post.categoryName || "General"}
                    </span>
                    <span>{calculateReadTime(post.body)}</span>
                  </div>

                  <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white leading-snug uppercase group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="space-y-4 pt-6">
                  <hr className="border-slate-100 dark:border-slate-800/80" />
                  
                  {/* Meta Author & date */}
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {post.author || "Quantix Team"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                  </div>

                  {/* Read Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:translate-x-1 transition-transform pt-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPostsSection;

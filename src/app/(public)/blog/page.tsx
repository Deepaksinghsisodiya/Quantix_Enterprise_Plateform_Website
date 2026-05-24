// src/app/(public)/blog/page.tsx
"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: "How Offline-First Databases Guarantee Continuous Business Sales Flow",
    excerpt: "Learn how the synchronization patterns inside modern retail POS applications prevent checkout lane blockages when standard cellular or broadband networks drop.",
    category: "POS Tech",
    author: "Elena Rostova",
    date: "May 20, 2026",
    readTime: "6 min read"
  },
  {
    title: "10 Retail Checkout Optimization Steps that Double Cashier Speed",
    excerpt: "A deep dive study on optimizing quick-key grid placements, automated barcode scale reads, and contactless tap-to-pay handshakes to keep queues short.",
    category: "Store Strategy",
    author: "Jameson Brooks",
    date: "May 08, 2026",
    readTime: "8 min read"
  },
  {
    title: "Understanding PCI DSS Compliance Rules for SaaS Card Present Billing",
    excerpt: "An clear, jargon-free compliance map explaining point-to-point card encryption, hardware reader handshakes, and why POS databases must never store raw pins.",
    category: "Security",
    author: "Marcus Vane",
    date: "April 14, 2026",
    readTime: "11 min read"
  }
];

export default function BlogPage() {
  return (
    <PublicLayout>
      <Navbar />

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                
                <div className="space-y-4">
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
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
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                  </div>

                  {/* Read Link */}
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:translate-x-1 transition-transform pt-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </PublicLayout>
  );
}

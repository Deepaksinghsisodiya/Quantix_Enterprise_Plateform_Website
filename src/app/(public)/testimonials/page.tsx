// src/app/(public)/testimonials/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Star, ChevronRight, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";
import TestimonialsSectionWrapper from "@/features/Testimonials";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";

export default function TestimonialsPage() {
  return (
    <main className="page-shell bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Header */}
      <section className="site-container page-nav-header space-y-3 text-left">
        {/* Breadcrumb */}
        <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/why-quantix" className="hover:text-primary transition-colors">Why Quantix</Link>
          <ChevronRight size={12} />
          <span className="text-primary font-bold">Customer Testimonials</span>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-xs">
            <Sparkles size={12} />
            AUTHENTIC MERCHANT EXPERIENCES
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white max-w-3xl">
          Trusted by Over <span className="text-primary">50,000+ Stores</span>
        </h1>
        <p className="max-w-2xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          Hear unfiltered reviews and operational insights directly from franchise owners, multi-unit restaurant operators, and retail directors running daily shifts on Quantix.
        </p>

        {/* Aggregate Review Pill */}
        <div className="pt-2 flex flex-wrap items-center justify-start gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 dark:text-white">4.8 / 5.0</span>
            <span className="text-slate-400">Average Rating</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>100% Verified Merchant Reviews</span>
          </div>
        </div>
      </section>

      {/* Testimonials Dynamic Content */}
      <div className="mb-10 sm:mb-16">
        <TestimonialsSectionWrapper />
      </div>

      {/* Global Conversion CTA Banner */}
      <div className="site-container">
        <CTABanner />
      </div>
    </main>
  );
}

// src/app/(public)/case-studies/page.tsx
"use client";

import React from "react";
import { CaseStudiesWrapper } from "@/features/CaseStudies";
import { Award, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, PhoneCall, ChevronRight } from "lucide-react";
import Link from "next/link";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";

export default function CaseStudiesPage() {
  return (
    <main className="bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300 min-h-[80vh] pb-10 sm:pb-16 lg:pb-20">
      {/* Page Hero Header */}
      <section className="relative page-hero-header border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 page-nav-header space-y-3 text-left">
          {/* Breadcrumb */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/why-quantix" className="hover:text-primary transition-colors">Why Quantix</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">Case Studies</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-syne font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Client Transformations</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight max-w-3xl">
            Real Impact. Quantified Results.
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
            Explore how high-volume restaurants, multi-location retail chains, and enterprise franchises modernize with Quantix Cloud POS.
          </p>

          {/* Quick Metrics Ribbon */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-750 shadow-sm text-center">
            <div className="p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-primary">+38%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Faster Turns</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700 p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-emerald-600 dark:text-emerald-400">-64%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Less Shrinkage</div>
            </div>
            <div className="p-1">
              <div className="text-lg sm:text-2xl font-syne font-black text-slate-900 dark:text-white">99.99%</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Cloud SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real API Case Studies List */}
      <div className="py-6 sm:py-10">
        <CaseStudiesWrapper />
      </div>

      {/* Bottom Conversion CTA Banner */}
      <div className="site-container mt-6 sm:mt-8">
        <CTABanner />
      </div>
    </main>
  );
}

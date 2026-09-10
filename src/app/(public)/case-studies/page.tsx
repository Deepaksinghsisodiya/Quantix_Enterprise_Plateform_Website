"use client";

import React, { useState } from "react";
import { CaseStudiesWrapper } from "@/features/CaseStudies";
import { Award, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300 min-h-[80vh]">
        {/* Page Hero Header */}
        <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="site-container px-4 sm:px-6 relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-4 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              Verified Client Transformations
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
              Real Impact. Quantified Results.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Explore how high-volume restaurants, multi-location retail chains, and enterprise franchises modernize with Quantix Cloud POS.
            </p>

            {/* Quick Metrics Ribbon */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              <div>
                <div className="text-xl sm:text-2xl font-syne font-black text-primary">38%</div>
                <div className="text-xs text-slate-500 font-medium">Faster Turns</div>
              </div>
              <div className="border-x border-slate-200 dark:border-slate-700">
                <div className="text-xl sm:text-2xl font-syne font-black text-emerald-600 dark:text-emerald-400">64%</div>
                <div className="text-xs text-slate-500 font-medium">Less Shrinkage</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-syne font-black text-slate-900 dark:text-white">99.99%</div>
                <div className="text-xs text-slate-500 font-medium">Cloud SLA</div>
              </div>
            </div>
          </div>
        </section>

        {/* Real API Case Studies List */}
        <div className="py-4">
          <CaseStudiesWrapper />
        </div>

        {/* Bottom Conversion CTA Section */}
        <section className="py-16 sm:py-20 bg-slate-900 dark:bg-slate-950 text-white border-t border-slate-800">
          <div className="site-container px-4 sm:px-6 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Enterprise Rollout
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-black tracking-tight mb-4">
              Ready to Accelerate Your Operational Velocity?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal">
              Book a tailored 15-minute walkthrough with our enterprise solutions architect to discuss menu migration, POS hardware, and custom multi-store rollouts.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact/demo"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-syne font-bold text-sm shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
              >
                Schedule Live Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-syne font-bold text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" /> Talk to POS Specialist
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}


// src/app/(public)/changelog/page.tsx
"use client";

import React from "react";
import { Sparkles, Calendar, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ChangelogEntry {
  version: string;
  date: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  features: string[];
}

const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "v2.4.0",
    date: "May 15, 2026",
    tag: "Core POS Engine",
    tagColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    title: "Offline-First Local database replication (IndexedDB Core v2)",
    description: "Our core local synchronization engine has received a complete rewrite. Checkouts now operate completely standalone, caching inventory changes in browser storage, syncing background transactions without locking the cart interface.",
    features: [
      "Zero-latency barcode lookup from 50,000 local SKU cache database entries.",
      "Optimized Bluetooth reader reconnection listeners.",
      "Automatic dynamic conflict resolution for concurrent merchant multi-terminals."
    ]
  },
  {
    version: "v2.3.2",
    date: "April 28, 2026",
    tag: "Restaurant Feature",
    tagColor: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
    title: "Split-Bill Matrix & Graphical table floor layout",
    description: "Added granular splitting support for tables. Cashiers can now divide billing balances equally, select individual items for dynamic card swipes, or split checkouts by seat layout numbers.",
    features: [
      "Visual grid builder supporting drag-and-drop table layouts.",
      "Dynamic tableside ordering tablet syncing with secondary terminal logs.",
      "Real-time kitchen displays updating color timers on active chef terminals."
    ]
  },
  {
    version: "v2.2.0",
    date: "March 10, 2026",
    tag: "Integrations",
    tagColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    title: "Tier 1 Stripe reader & cellular terminal handshakes",
    description: "Merchants can now link certified physical card readers (Stripe WisePOS E, Adyen Terminal ranges) instantly using standard cloud-link handshakes, bypassing complex local router IP settings.",
    features: [
      "Autodiscover active terminal networks via simple manager QR codes.",
      "Support for local Cellular Hotspot fallbacks under weak store connectivity.",
      "PCI DSS P2PE end-to-end payment encryption parameters."
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 flex-1">
        
        {/* Header Hero */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800/80 transition-colors text-center">
          <div className="site-container max-w-2xl space-y-4">
            <div className="mx-auto p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-syne font-black text-slate-900 dark:text-white uppercase">Product Changelog</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Follow our fast-paced timeline of point-of-sale features, upgrades, terminal integrations, and dashboard refinements.
            </p>
          </div>
        </section>

        {/* Timeline Content */}
        <section className="py-24 site-container max-w-4xl">
          <div className="relative border-l-2 border-slate-200/60 dark:border-slate-800/80 pl-6 md:pl-12 space-y-16">
            
            {CHANGELOG_ENTRIES.map((entry, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline Bullet */}
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-white dark:bg-slate-950 group-hover:scale-125 transition-transform" />

                {/* Entry Meta Information */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400 mb-3">
                  <span className="text-primary-light font-syne text-sm font-black tracking-tight">{entry.version}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {entry.date}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] ${entry.tagColor}`}>
                    <Tag className="h-3 w-3" />
                    {entry.tag}
                  </span>
                </div>

                {/* Card Container */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
                  <h2 className="text-xl md:text-2xl font-syne font-bold text-slate-900 dark:text-white mb-4">
                    {entry.title}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {entry.description}
                  </p>

                  <hr className="border-slate-100 dark:border-slate-800/80 mb-6" />

                  {/* Bullet Highlights */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Additions</h3>
                    {entry.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* Core CTA */}
        <section className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 py-20 text-center">
          <div className="site-container max-w-xl space-y-4">
            <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase">Experience these features today</h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Get an instant sandbox store running in less than 60 seconds. Zero setup fees, cancel subscription anytime.
            </p>
            <div className="pt-2">
              <Link
                href="/sign-up"
                className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full text-xs font-bold transition shadow-lg shadow-primary/20 hover:scale-105 inline-block"
              >
                Create Free Merchant Account
              </Link>
            </div>
          </div>
        </section>

      </div>
  );
}

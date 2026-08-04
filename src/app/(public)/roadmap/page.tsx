// src/app/(public)/roadmap/page.tsx
"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { ListTodo, GitMerge, Hourglass, HelpCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface RoadmapItem {
  title: string;
  desc: string;
  status: "completed" | "progress" | "planned";
  category: string;
}

const ROADMAP_QUARTERS: {
  quarter: string;
  timeframe: string;
  items: RoadmapItem[];
}[] = [
  {
    quarter: "Q2 2026",
    timeframe: "CURRENT ACTIVE WORK",
    items: [
      {
        title: "Offline Local Sync Core v2",
        desc: "Complete rewrite of background queue syncing mechanisms to avoid interface freezing under low internet checkouts.",
        status: "completed",
        category: "Database"
      },
      {
        title: "Split-Bill Matrix Layouts",
        desc: "Interactive tableside bill splitting layout matrices for multi-seat guest operations.",
        status: "completed",
        category: "Hospitality"
      },
      {
        title: "Stripe Reader Autodiscover QR",
        desc: "Plug-and-play network scanning and link integration setup using physical hardware QR triggers.",
        status: "progress",
        category: "Hardware Integration"
      }
    ]
  },
  {
    quarter: "Q3 2026",
    timeframe: "NEXT IN LINE",
    items: [
      {
        title: "Smart AI Predictive Stock",
        desc: "Machine learning algorithms looking at sales historical records to automatically predict restocking periods before holidays.",
        status: "progress",
        category: "Analytics Engine"
      },
      {
        title: "Multi-Store Supplier Portal",
        desc: "Unified merchant control dashboards enabling immediate inventory allocation transfers between regional warehouses.",
        status: "planned",
        category: "Merchant Dash"
      },
      {
        title: "Gift Card Cloud Wallet",
        desc: "Merchant-branded physical/digital gift card generation linked to standard merchant POS scanners.",
        status: "planned",
        category: "Loyalty Tools"
      }
    ]
  },
  {
    quarter: "Q4 2026 & BEYOND",
    timeframe: "FUTURE EXPLORATION",
    items: [
      {
        title: "Quantix Merchant Tap Pay",
        desc: "Enabling standard NFC mobile phones to act directly as card terminals without extra reader accessories.",
        status: "planned",
        category: "Mobile POS"
      },
      {
        title: "Payroll & Commission Tracker",
        desc: "Hourly check-in trackers linked directly with commission metrics for retail staff members.",
        status: "planned",
        category: "Staff Management"
      }
    ]
  }
];

export default function RoadmapPage() {
  return (
    <PublicLayout>
      <Navbar />

      <div className="bg-white dark:bg-slate-950 transition-colors duration-300 flex-1">
        
        {/* Header Hero */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800/80 transition-colors text-center">
          <div className="site-container max-w-2xl space-y-4">
            <div className="mx-auto p-3.5 bg-primary/10 rounded-2xl w-fit text-primary animate-bounce">
              <GitMerge className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-syne font-black text-slate-900 dark:text-white uppercase">Platform Roadmap</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Explore planned POS system capabilities, analytics upgrades, merchant tools, and core system speed-ups.
            </p>
          </div>
        </section>

        {/* Roadmap Columns Board */}
        <section className="py-24 site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {ROADMAP_QUARTERS.map((q, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800/80 space-y-6 flex flex-col h-fit">
                
                {/* Quarter Header */}
                <div className="space-y-1.5 pb-4 border-b border-slate-200/50 dark:border-slate-800/80">
                  <span className="text-[10px] font-bold tracking-widest text-primary-light uppercase">
                    {q.timeframe}
                  </span>
                  <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase">
                    {q.quarter}
                  </h2>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {q.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 space-y-3 relative shadow-xs hover:shadow-md transition">
                      
                      {/* Meta Category and Status indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                          {item.category}
                        </span>
                        
                        {item.status === "completed" && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Shipped</span>
                          </span>
                        )}
                        {item.status === "progress" && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            <Hourglass className="h-3.5 w-3.5 animate-spin-slow" />
                            <span>Coding</span>
                          </span>
                        )}
                        {item.status === "planned" && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                            <ListTodo className="h-3.5 w-3.5" />
                            <span>Planned</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* Suggest Feature CTA */}
        <section className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 py-20 text-center">
          <div className="site-container max-w-xl space-y-6">
            <HelpCircle className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase">
              Need a custom merchant feature?
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Our roadmap is highly responsive to real merchant needs. If your store vertical requires specific POS behaviors, tell us!
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full text-xs font-bold transition shadow-lg shadow-primary/20 hover:scale-105 inline-block"
              >
                Submit Feature Suggestion
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </PublicLayout>
  );
}

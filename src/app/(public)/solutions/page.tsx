"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import {
  Utensils,
  Zap,
  ShoppingBag,
  Scan,
  Coffee,
  Layers,
  Hash,
  Server,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

const SECTORS = [
  {
    slug: "fine-dining",
    name: "Fine Dining & Full Service",
    category: "Restaurant & Dining",
    desc: "Interactive floor plan mapping, multi-course pacing, wine pairing notes, split check calculations, and VIP guest profiles.",
    href: "/solutions/fine-dining",
    icon: Utensils,
    badge: "Course Pacing",
    color: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    slug: "quick-service",
    name: "Quick Service & Fast Casual (QSR)",
    category: "High-Speed Counters",
    desc: "15-second counter billing, combo builders, kitchen KDS queue routing, and automated delivery platform sync.",
    href: "/solutions/quick-service",
    icon: Zap,
    badge: "High Speed",
    color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    slug: "fast-casual",
    name: "Fast Casual Restaurants",
    category: "High-Throughput",
    desc: "Combo builders, multi-station kitchen KDS, queue wait time calculators, and points-based customer rewards.",
    href: "/solutions/fast-casual",
    icon: Layers,
    badge: "Combo Engine",
    color: "from-blue-500/20 via-indigo-500/10 to-transparent",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    slug: "cafe-bakery",
    name: "Cafes & Retail Bakeries",
    category: "Beverage & Fresh Goods",
    desc: "Drink modifiers, raw ingredient recipe costing, kitchen waste logging, and digital menu board price sync.",
    href: "/solutions/cafe-bakery",
    icon: Coffee,
    badge: "Recipe Costing",
    color: "from-amber-600/20 via-yellow-500/10 to-transparent",
    iconBg: "bg-amber-600/10 text-amber-700 dark:text-amber-400 border-amber-600/20",
  },
  {
    slug: "fashion-retail",
    name: "Fashion & Apparel Boutiques",
    category: "Retail & Apparel",
    desc: "High-performance size/color variant matrix, seasonal collection tracking, clienteling, and ecommerce stock sync.",
    href: "/solutions/fashion-retail",
    icon: ShoppingBag,
    badge: "Size Matrix",
    color: "from-purple-500/20 via-pink-500/10 to-transparent",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    slug: "grocery",
    name: "Grocery & Convenience Stores",
    category: "High-Volume Retail",
    desc: "High-speed barcode scanner billing, deli weight scale integration, perishable expiration alerts, and supplier purchase orders.",
    href: "/solutions/grocery",
    icon: Scan,
    badge: "Scale Integrated",
    color: "from-teal-500/20 via-emerald-500/10 to-transparent",
    iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  },
  {
    slug: "electronics",
    name: "Electronics & Specialty Retail",
    category: "Specialty Retail",
    desc: "Serial number tracking for warranty audits, trade-in credit valuation, variant management, and extended warranty prompts.",
    href: "/solutions/electronics",
    icon: Hash,
    badge: "Serial Sync",
    color: "from-sky-500/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  {
    slug: "franchise",
    name: "Franchise & Multi-Location Chains",
    category: "Enterprise Chains",
    desc: "Central management hub, global menu and price syncing, regional ranking comparisons, and brand compliance audits.",
    href: "/solutions/franchise",
    icon: Server,
    badge: "Global Sync",
    color: "from-violet-500/20 via-purple-500/10 to-transparent",
    iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
];

export default function SolutionsOverviewPage() {
  return (
    <main className="bg-slate-50/60 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-linear-to-b from-white via-slate-50/60 to-slate-50/80 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950 overflow-hidden">
          <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary-dark dark:text-primary-light mb-6 shadow-2xs">
              <Sparkles size={13} />
              <span>INDUSTRY-TAILORED SOLUTIONS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-syne font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white">
              POS Technology Tailored to Your Specific Business Sector
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              From fine dining course pacing to grocery scale integrations and multi-store franchise governance, Quantix adapts to your exact checkout workflow.
            </p>
          </div>
        </section>

        {/* Sectors Grid Section */}
        <section className="py-16 sm:py-24">
          <div className="site-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SECTORS.map((sec) => {
                const IconComp = sec.icon;

                return (
                  <motion.div
                    key={sec.slug}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-32 bg-linear-to-b ${sec.color} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                    <div>
                      <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${sec.iconBg} shadow-xs`}>
                          <IconComp size={22} />
                        </span>
                        <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                          {sec.badge}
                        </span>
                      </div>

                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-1">
                        {sec.category}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-syne font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-3">
                        {sec.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                        {sec.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                      <Link
                        href={sec.href}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-primary group-hover:text-primary-dark transition-colors"
                      >
                        <span>View Industry Solution</span>
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 sm:py-20 bg-primary text-white text-center">
          <div className="site-container max-w-3xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-syne font-black">
              Ready to Upgrade Your Business Workflow?
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-medium max-w-xl mx-auto">
              Start your 14-day free trial today. Connect your local POS registers and experience 2-way cloud telemetry.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-4 rounded-2xl bg-white text-primary hover:bg-slate-100 font-syne font-bold text-sm shadow-xl transition-transform hover:scale-105"
              >
                Start Free Trial →
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/10 font-syne font-bold text-sm text-white transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}

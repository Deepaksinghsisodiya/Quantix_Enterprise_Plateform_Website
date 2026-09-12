"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Coffee,
  Flame,
  Globe2,
  Layers,
  Scan,
  ShoppingBag,
  Sparkles,
  Store,
  Tag,
  Tv,
  Utensils,
  Zap,
} from "lucide-react";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";

interface EnterpriseSector {
  id: string;
  slug: string;
  title: string;
  category: "all" | "franchise" | "hospitality" | "retail" | "venues";
  badge: string;
  desc: string;
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  glowColor: string;
  features: string[];
}

const SECTORS: EnterpriseSector[] = [
  {
    id: "franchise-chains",
    slug: "franchise",
    title: "Multi-Unit Franchises & Restaurant Groups",
    category: "franchise",
    badge: "CENTRAL HQ",
    desc: "Centralized menu catalog distribution, franchise royalty tracking, regional price tiers, and consolidated P&L telemetry.",
    image: "/images/ent_franchise_portal.png",
    icon: Building2,
    accentColor: "text-primary dark:text-primary-light bg-primary/10 border-primary/20",
    glowColor: "from-primary/15 to-transparent",
    features: ["HQ Broadcast", "Royalty Ledger", "Multi-Branch P&L"],
  },
  {
    id: "global-retail",
    slug: "grocery",
    title: "Global Retail & Supermarket Chains",
    category: "retail",
    badge: "SCALE & MULTI-LANE",
    desc: "High-speed barcode scanner billing, certified weighing scales, automated vendor purchase orders, and inter-store stock routing.",
    image: "/images/ent_global_pos_bundle.png",
    icon: ShoppingBag,
    accentColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
    glowColor: "from-emerald-500/15 to-transparent",
    features: ["Scale Integration", "Auto Vendor POs", "Inter-Store Stock"],
  },
  {
    id: "venues-stadiums",
    slug: "venues",
    title: "Stadiums, Arenas & Large Entertainment Venues",
    category: "venues",
    badge: "HIGH-BURST OFFLINE",
    desc: "Sub-second offline transactions during peak event rushes, mobile hawker POS terminals, and zone-based inventory dispatching.",
    image: "/images/ent_venues_pos.png",
    icon: Zap,
    accentColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50",
    glowColor: "from-blue-500/15 to-transparent",
    features: ["Sub-80ms Burst", "Mobile Hawkers", "Zone Dispatch"],
  },
  {
    id: "supply-chain-hq",
    slug: "supply-chain",
    title: "Enterprise Supply Chain & Global Logistics",
    category: "franchise",
    badge: "WAREHOUSE MATRIX",
    desc: "Real-time central warehouse replenishment, lot/batch tracking, multi-tier safety stock alerts, and automated EDI supplier links.",
    image: "/images/ent_supply_chain_bundle.png",
    icon: Layers,
    accentColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50",
    glowColor: "from-purple-500/15 to-transparent",
    features: ["Central Warehouse", "Lot & Batch", "EDI Supplier Links"],
  },
  {
    id: "fine-dining-groups",
    slug: "fine-dining",
    title: "Fine Dining Groups & Luxury Hospitality",
    category: "hospitality",
    badge: "PACING & WINE VIP",
    desc: "Multi-course pacing, sommelier cellar inventory, tableside split checks, VIP clienteling, and private event banquet logs.",
    image: "/images/ent_fine_dining_bundle.png",
    icon: Utensils,
    accentColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50",
    glowColor: "from-amber-500/15 to-transparent",
    features: ["Course Pacing", "Sommelier Cellar", "VIP Profiles"],
  },
  {
    id: "dine-in-restaurants",
    slug: "restaurants",
    title: "Dine-In Restaurants & Foodservice",
    category: "hospitality",
    badge: "TABLE OPS & KDS",
    desc: "Interactive visual floor plans, course-paced kitchen ticket routing, tableside handheld order taking, and flexible bill splitting.",
    image: "/images/nav_restaurant_bundle.png",
    icon: Utensils,
    accentColor: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/50",
    glowColor: "from-orange-500/15 to-transparent",
    features: ["Visual Floor Plans", "Course Pacing", "Tableside Split"],
  },
  {
    id: "cafes-bakeries",
    slug: "cafes",
    title: "Cafes, Bakeries & Coffee Bars",
    category: "hospitality",
    badge: "BARISTA SPEED",
    desc: "One-tap beverage modifiers, barista espresso KDS queues, automated sticky cup tag printing, and pastry recipe costing.",
    image: "/images/ent_cafe_bakery_bundle.png",
    icon: Coffee,
    accentColor: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50",
    glowColor: "from-amber-600/15 to-transparent",
    features: ["Barista Speed Screen", "Sticky Cup Labels", "Recipe Costing"],
  },
  {
    id: "bars-nightclubs",
    slug: "bars",
    title: "Bars, Nightclubs & High-Volume Lounges",
    category: "hospitality",
    badge: "QUICK TABS & TIPS",
    desc: "Lightning-fast pre-authorized bar tabs, high-speed speed screens, pour controls, and automated shift tip splitting.",
    image: "/images/ent_bars_nightclubs_bundle.png",
    icon: Flame,
    accentColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50",
    glowColor: "from-purple-500/15 to-transparent",
    features: ["Instant Bar Tabs", "Speed Screens", "Tip Pooling"],
  },
  {
    id: "boutiques-apparel",
    slug: "apparel",
    title: "Boutiques & Apparel Fashion Retail",
    category: "retail",
    badge: "SIZE & COLOR MATRIX",
    desc: "Multi-attribute size, color, and style variant matrices, barcode label generation, and swift omnichannel return handling.",
    image: "/images/nav_retail_bundle.png",
    icon: ShoppingBag,
    accentColor: "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-900/50",
    glowColor: "from-pink-500/15 to-transparent",
    features: ["Variant Matrix", "Barcode Tagging", "Cross-Store Returns"],
  },
  {
    id: "qsr-kiosks",
    slug: "quick-service",
    title: "High-Volume QSR & Self-Service Kiosks",
    category: "hospitality",
    badge: "15-SEC TURNOVER",
    desc: "15-second counter turnover, interactive self-ordering kiosks, multi-station kitchen KDS displays, and delivery aggregator auto-injection.",
    image: "/images/ent_qsr_kiosk_bundle.png",
    icon: Tv,
    accentColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
    glowColor: "from-rose-500/15 to-transparent",
    features: ["Self-Kiosks", "Multi-KDS", "Delivery Injection"],
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Sectors" },
  { id: "franchise", label: "Franchises & Supply Chain" },
  { id: "hospitality", label: "Enterprise Hospitality" },
  { id: "retail", label: "Multi-Store Retail" },
  { id: "venues", label: "Stadiums & Venues" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function SolutionsClient() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredSectors = SECTORS.filter((s) => {
    if (selectedFilter === "all") return true;
    return s.category === selectedFilter;
  });

  return (
    <>
      {/* Dynamic Animated Hero Header */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        {/* Animated Breathing Ambient Light */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-linear-to-b from-primary/20 via-primary/10 to-transparent blur-3xl pointer-events-none -z-10"
        />

        <div className="site-container text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] sm:text-xs font-black uppercase tracking-wider text-primary mb-3 shadow-xs"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>ENTERPRISE SOLUTIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight"
          >
            Tailored For Global Enterprise Operations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Purpose-built POS platforms and cloud HQ infrastructure engineered for 50+ unit franchise groups, high-capacity stadiums, and retail conglomerates.
          </motion.p>

          {/* Smooth Sliding Pill Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-5 sm:mt-6 flex items-center sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x touch-pan-x"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-colors duration-200 shrink-0 snap-center cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeEnterpriseFilterPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-primary rounded-xl shadow-xs shadow-primary/30 ring-2 ring-primary/20 z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Fluid Animated Solutions Grid (Seamless White Canvas) */}
      <section className="section-py bg-white dark:bg-slate-950">
        <div className="site-container px-4 sm:px-6">
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSectors.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.slug}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="h-full"
                  >
                    <Link
                      href={`/solutions/${item.slug}`}
                      className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
                    >
                      {/* Subtle Ambient Hover Glow */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />

                      <div className="relative z-10 space-y-3">
                        {/* Top Row: Icon + Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-xs">
                            <Icon size={16} className="stroke-[2.2]" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.accentColor}`}>
                              {item.badge}
                            </span>
                          </div>
                        </div>

                        {/* 100% Free-Floating Transparent 3D Hardware Bundle */}
                        <div className="relative h-32 sm:h-36 w-full flex items-center justify-center my-0.5">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-108 group-hover:-translate-y-1"
                            loading="lazy"
                          />
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="font-syne font-black text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        </div>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.features.map((feat) => (
                            <span
                              key={feat}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Bottom CTA Link */}
                      <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark dark:group-hover:text-primary-light">
                        <span className="flex items-center gap-1">
                          Explore Sector Solution
                        </span>
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <TestimonialsWrapper />

      {/* Production Ready CTA Banner */}
      <CTABanner />
    </>
  );
}

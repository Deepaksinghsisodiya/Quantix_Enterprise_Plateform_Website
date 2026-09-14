"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cloud,
  Layers,
  ShoppingBag,
  Sparkles,
  Store,
  Tv,
  Utensils,
  Zap,
  Scale,
  Scan,
  ChefHat,
  Clock,
  ShieldCheck,
  LineChart,
  Boxes,
  ExternalLink,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";

export const RESTAURANT_SITE_URL = process.env.NEXT_PUBLIC_RESTAURANT_URL || "http://localhost:3002";
export const RETAIL_SITE_URL = process.env.NEXT_PUBLIC_RETAIL_URL || "http://localhost:3001";

interface SolutionFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
  badge: string;
}

interface SolutionItem {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  externalSiteUrl?: string;
  externalSiteLabel?: string;
  internalHref: string;
  internalCtaLabel: string;
  accentGradient: string;
  glowColor: string;
  icon: LucideIcon;
  subSectors: { label: string; href: string }[];
  features: SolutionFeature[];
  imagePosition: "left" | "right";
}

const FILTER_TABS = [
  { id: "all", label: "All Solutions", icon: Sparkles },
  { id: "restaurant", label: "Restaurant POS", icon: Utensils },
  { id: "retail", label: "Retail POS", icon: ShoppingBag },
  { id: "multistore", label: "Multi-Store Cloud HQ", icon: Cloud },
];

const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "restaurant",
    number: "01",
    title: "Restaurant POS Solution",
    eyebrow: "HOSPITALITY & DINING ARCHITECTURE",
    tagline: "Purpose-Built for Dine-In, Kitchen Operations & Tableside Speed",
    description:
      "A complete dining room, kitchen management, and mobile ordering platform engineered for high-volume hospitality. Sync kitchen displays, table seating, and course pacing seamlessly across front-of-house and back-of-house.",
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Restaurant POS Terminal, Kitchen KDS and Handheld Till",
    topBadge: "Dual-Screen POS + Kitchen KDS",
    bottomBadge: "Zero-Latency Station Mesh",
    externalSiteUrl: RESTAURANT_SITE_URL,
    externalSiteLabel: "Visit Restaurant Site",
    internalHref: "/solutions/restaurants",
    internalCtaLabel: "Explore Restaurant Architecture",
    accentGradient: "from-amber-500 via-orange-500 to-[#FF4F00]",
    glowColor: "rgba(245, 158, 11, 0.15)",
    icon: Utensils,
    imagePosition: "right",
    subSectors: [
      { label: "Dine-In Restaurants", href: "/solutions/restaurants" },
      { label: "Fine Dining Groups", href: "/solutions/fine-dining" },
      { label: "Cafes & Bakeries", href: "/solutions/cafes" },
      { label: "Bars & Nightclubs", href: "/solutions/bars" },
      { label: "Quick-Service (QSR)", href: "/solutions/quick-service" },
    ],
    features: [
      {
        title: "Kitchen Display System (KDS)",
        desc: "Color-coded order routing to grill, fry, cold, and expo prep stations with live countdown bump timers.",
        icon: Tv,
        badge: "KDS Stations",
      },
      {
        title: "Interactive Table Floor Plans",
        desc: "Visual multi-room dining room layouts, guest turnover timers, server section balancing, and live table status.",
        icon: Utensils,
        badge: "Table Ops",
      },
      {
        title: "Synchronized Course Pacing",
        desc: "Fire starters, mains, and desserts in automated sequences to eliminate kitchen ticket bottlenecks.",
        icon: Clock,
        badge: "Course Pacing",
      },
      {
        title: "Tableside Handhelds & Split Checks",
        desc: "Equip waitstaff with mobile handhelds for tableside tap-to-pay and flexible seat-by-seat bill splitting.",
        icon: Sparkles,
        badge: "Mobile EMV",
      },
      {
        title: "Live Recipe & Food Costing",
        desc: "Deduct raw ingredients automatically as dishes clear the POS to audit recipe margins and eliminate kitchen waste.",
        icon: ChefHat,
        badge: "Margin Sync",
      },
    ],
  },
  {
    id: "retail",
    number: "02",
    title: "Retail POS Solution",
    eyebrow: "RETAIL & STORE COMMERCE ARCHITECTURE",
    tagline: "High-Throughput Cashier Checkout, Weighing Scales & Stock Transfers",
    description:
      "Engineered for modern retail stores handling thousands of daily transactions. Accelerate checkout speeds with instant laser barcode scanning, certified weighing scales, and multi-location inventory replenishment.",
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Retail Cashier POS Terminal with Weighing Scale and Barcode Scanner",
    topBadge: "Sub-Second Barcode + Scale Sync",
    bottomBadge: "Offline-First Checkout Engine",
    externalSiteUrl: RETAIL_SITE_URL,
    externalSiteLabel: "Visit Retail Site",
    internalHref: "/solutions/grocery",
    internalCtaLabel: "Explore Retail Architecture",
    accentGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    icon: ShoppingBag,
    imagePosition: "left",
    subSectors: [
      { label: "Supermarkets & Grocery", href: "/solutions/grocery" },
      { label: "Boutiques & Apparel", href: "/solutions/apparel" },
      { label: "Convenience Stores", href: "/solutions/grocery" },
      { label: "Specialty Retail Stores", href: "/solutions/apparel" },
    ],
    features: [
      {
        title: "High-Speed Barcode Laser Checkout",
        desc: "Sub-second barcode scanning for high-density checkouts with multi-SKU lookups and offline till redundancy.",
        icon: Scan,
        badge: "Sub-Second",
      },
      {
        title: "Certified Weighing Scale Integration",
        desc: "NTEP-certified scale pairing with automatic tare weight deduction for produce, delis, and bulk goods.",
        icon: Scale,
        badge: "NTEP Certified",
      },
      {
        title: "Size & Color Variant SKU Matrix",
        desc: "Manage multidimensional product matrices (style, size, color, brand) with integrated barcode tag printing.",
        icon: Layers,
        badge: "SKU Matrix",
      },
      {
        title: "Automated Par-Level Purchase Orders",
        desc: "Trigger supplier PO reorders automatically when warehouse or store shelf inventory falls below safety par levels.",
        icon: Boxes,
        badge: "Auto-PO Engine",
      },
      {
        title: "Inter-Store Stock Routing & Transfers",
        desc: "Transfer stock between regional store branches and central warehouses with automated dock GRN audits.",
        icon: Store,
        badge: "Stock Transfers",
      },
    ],
  },
  {
    id: "multistore",
    number: "03",
    title: "Multi Store Cloud POS System",
    eyebrow: "ENTERPRISE CLOUD COMMAND ARCHITECTURE",
    tagline: "Central Command Matrix for 50+ Unit Franchises & Enterprise Chains",
    description:
      "Take total command over your multi-location enterprise. Deploy catalog updates across 500+ locations in seconds, monitor consolidated store P&L telemetry, and maintain zero-latency offline continuity.",
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Multi Store Enterprise Cloud Management Portal",
    topBadge: "500+ Franchise Locations Synced",
    bottomBadge: "100% Offline Mesh Till Network",
    internalHref: "/solutions/franchise",
    internalCtaLabel: "Explore Enterprise HQ",
    accentGradient: "from-[#FF4F00] via-purple-600 to-indigo-600",
    glowColor: "rgba(255, 79, 0, 0.15)",
    icon: Cloud,
    imagePosition: "right",
    subSectors: [
      { label: "Multi-Unit Franchises", href: "/solutions/franchise" },
      { label: "Supply Chain & Warehouses", href: "/solutions/supply-chain" },
      { label: "Arenas & Mega-Venues", href: "/solutions/venues" },
      { label: "Enterprise Retail Chains", href: "/features/multi-store" },
    ],
    features: [
      {
        title: "One-Click Master Catalog Broadcast",
        desc: "Deploy menu updates, holiday promotions, combo meals, and localized pricing tiers to 500+ locations in < 2.4s.",
        icon: Cloud,
        badge: "< 2.4s Global Sync",
      },
      {
        title: "Consolidated Multi-Unit P&L Telemetry",
        desc: "Monitor hourly sales velocity, store throughput, labor margins, and cashier performance from an executive dashboard.",
        icon: LineChart,
        badge: "Executive BI",
      },
      {
        title: "Automated Franchise Royalty Ledger",
        desc: "Automatically calculate corporate franchise royalties, marketing fund fees, and store remittances with zero accounting lag.",
        icon: Building2,
        badge: "Royalty Ledger",
      },
      {
        title: "Granular Role-Based Access Control (RBAC)",
        desc: "Centralized employee permissions, cashier override audit trails, and multi-tier manager refund authorizations.",
        icon: ShieldCheck,
        badge: "Enterprise RBAC",
      },
      {
        title: "Zero-Latency Offline Till Mesh",
        desc: "Peer mesh tills continue processing sales seamlessly even when local internet or WAN broadband goes completely dark.",
        icon: Zap,
        badge: "100% Offline Mesh",
      },
    ],
  },
];

export default function SolutionsClient() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const visibleSolutions = SOLUTIONS_DATA.filter((sol) => {
    if (selectedFilter === "all") return true;
    return sol.id === selectedFilter;
  });

  return (
    <div className="w-full overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION (using global .page-hero-header)                   */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        {/* Soft Ambient Radial Light */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-linear-to-b from-primary/15 via-primary/5 to-transparent blur-3xl -z-10" />

        <div className="site-container text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10.5px] sm:text-xs font-black uppercase tracking-widest text-primary mb-3 sm:mb-4 shadow-xs"
          >
            <Sparkles size={13} className="text-primary" />
            <span>ENTERPRISE POS SOLUTIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.18] sm:leading-[1.15] tracking-tight text-balance"
          >
            Three Purpose-Built Solutions.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-light to-amber-500 block sm:inline">
              Every Feature Inside.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Purpose-built operating platforms for dining hospitality, high-volume retail stores, and multi-location enterprise chains.
          </motion.p>

          {/* ========================================================================= */}
          {/* SLIDING PILL FILTER BAR (Consistent with Products & Features pages)       */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="mt-5 sm:mt-7 flex items-center sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x touch-pan-x"
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = selectedFilter === tab.id;
              const TabIcon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-syne font-bold transition-all duration-300 shrink-0 select-none snap-center flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "text-white shadow-md shadow-primary/25"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSolutionFilter"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-linear-to-r from-primary via-primary-light to-primary-dark z-0"
                    />
                  )}
                  <TabIcon className="relative z-10 h-3.5 w-3.5 stroke-[2.2] shrink-0" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE SOLUTIONS SHOWCASE (using global .section-py)                       */}
      {/* ========================================================================= */}
      <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
        <AnimatePresence mode="wait">
          {visibleSolutions.map((sol) => {
            const isRight = sol.imagePosition === "right";
            const SolIcon = sol.icon;

            return (
              <motion.section
                key={sol.id}
                id={sol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="section-py relative overflow-hidden bg-white dark:bg-slate-950"
              >
                {/* Soft Ambient Radial Background Aura */}
                <div
                  className="pointer-events-none absolute top-1/3 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl opacity-25 -z-10"
                  style={{
                    background: sol.glowColor,
                    left: isRight ? "auto" : "5%",
                    right: isRight ? "5%" : "auto",
                  }}
                />

                <div className="site-container px-3 sm:px-6">
                  
                  {/* ------------------------------------------------------------- */}
                  {/* TOP HALF: 2-COLUMN HERO (Text Story + Large Hardware Visual)  */}
                  {/* ------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                    
                    {/* TEXT CONTENT COLUMN */}
                    <div
                      className={`space-y-4 sm:space-y-5 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
                    >
                      {/* Eyebrow & Number Badge */}
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4F00] to-orange-600 text-xs font-mono font-black text-white shadow-xs">
                          {sol.number}
                        </span>
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-0.5 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF4F00]">
                          <SolIcon className="h-3 w-3 stroke-[2.2]" />
                          <span>{sol.eyebrow}</span>
                        </div>
                      </div>

                      {/* Headline & Tagline */}
                      <div className="space-y-1 sm:space-y-1.5">
                        <h2 className="font-syne text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white leading-[1.18] sm:leading-[1.15] tracking-tight">
                          {sol.title}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base font-syne font-bold text-[#FF4F00]">
                          {sol.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                        {sol.description}
                      </p>

                      {/* Specialized Verticals Served */}
                      <div className="space-y-1.5 pt-0.5">
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                          SPECIALIZED VERTICALS SERVED:
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {sol.subSectors.map((sec) => (
                            <Link
                              key={sec.label}
                              href={sec.href}
                              className="text-[11px] sm:text-xs font-syne font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-500 hover:text-[#FF4F00] transition-colors"
                            >
                              {sec.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* CTAs: Full width on mobile, inline on desktop */}
                      <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <Link
                          href={sol.internalHref}
                          className="group inline-flex min-h-[44px] sm:min-h-[46px] items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary via-primary-light to-primary-dark px-5 sm:px-6 py-2.5 font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:brightness-105 active:scale-95 transition-all text-center"
                        >
                          <span>{sol.internalCtaLabel}</span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                        </Link>

                        {sol.externalSiteUrl && (
                          <a
                            href={sol.externalSiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] sm:min-h-[46px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-5 py-2.5 font-syne text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-orange-500 hover:text-[#FF4F00] transition-colors active:scale-95 text-center"
                          >
                            <span>{sol.externalSiteLabel}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* HARDWARE IMAGE STAGE */}
                    <div
                      className={`relative lg:col-span-6 flex items-center justify-center ${!isRight ? "lg:order-1" : "lg:order-2"}`}
                    >
                      {/* Floating Terminal Stage Container */}
                      <div className="group relative w-full h-56 sm:h-72 md:h-80 lg:h-96 max-w-xl mx-auto rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/90 p-3 sm:p-6 flex items-center justify-center shadow-xl overflow-hidden">
                        {/* Subtle Ambient Radial Glow */}
                        <div className="pointer-events-none absolute inset-0 bg-radial from-orange-500/10 to-transparent blur-2xl" />

                        {/* Hardware Image */}
                        <Image
                          src={sol.imageSrc}
                          alt={sol.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 92vw, 45vw"
                          className="object-contain p-2 sm:p-4 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                        />

                        {/* Top Floating Badge (mobile safe) */}
                        <div className="pointer-events-none absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 sm:px-3 py-1 text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
                          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#FF4F00]" />
                          </span>
                          <span className="truncate max-w-[150px] sm:max-w-none">{sol.topBadge}</span>
                        </div>

                        {/* Bottom Floating Badge (mobile safe) */}
                        <div className="pointer-events-none absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 sm:px-3 py-1 text-[9px] sm:text-xs font-extrabold text-slate-700 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200">
                          <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FF4F00] shrink-0" />
                          <span className="truncate max-w-[150px] sm:max-w-none">{sol.bottomBadge}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* BOTTOM HALF: "FEATURES INSIDE" GRID (5 Real Features)         */}
                  {/* ------------------------------------------------------------- */}
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      <div className="space-y-0.5">
                        <div className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#FF4F00]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F00]" />
                          <span>CORE CAPABILITIES MATRIX</span>
                        </div>
                        <h3 className="font-syne text-lg sm:text-xl md:text-2xl font-black text-slate-950 dark:text-white">
                          Features Inside {sol.title}
                        </h3>
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                        5 NATIVE MODULES BUILT-IN
                      </span>
                    </div>

                    {/* 5-Card Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {sol.features.map((feat) => {
                        const FeatIcon = feat.icon;

                        return (
                          <div
                            key={feat.title}
                            className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-orange-500/60 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
                          >
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF4F00] group-hover:bg-[#FF4F00] group-hover:text-white transition-colors shadow-xs">
                                  <FeatIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.2]" />
                                </span>

                                <span className="text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                                  {feat.badge}
                                </span>
                              </div>

                              <h4 className="font-syne text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-[#FF4F00] transition-colors">
                                {feat.title}
                              </h4>

                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                                {feat.desc}
                              </p>
                            </div>

                            <div className="pt-3 mt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center gap-1.5 text-[11px] sm:text-xs font-syne font-bold text-slate-500 group-hover:text-[#FF4F00] transition-colors">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate">Included in {sol.title.replace(" POS Solution", "").replace(" POS System", "")}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 3. TESTIMONIALS & CTA BANNER                                              */}
      {/* ========================================================================= */}
      <TestimonialsWrapper />
      <CTABanner />
    </div>
  );
}

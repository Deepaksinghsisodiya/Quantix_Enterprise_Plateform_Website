"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  Cloud,
  CreditCard,
  Gift,
  Globe2,
  Layers,
  LayoutGrid,
  LayoutList,
  LineChart,
  Monitor,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tablet,
  Tv,
  Utensils,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";
import { FAQWrapper } from "@/features/FAQ";
import { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import { useGetPublicFeaturesQuery } from "@/features/Features/Service/FeaturesService";
import { getFeatureIcon } from "@/features/Features/lib/getFeatureIcon";
import { FeaturesBentoSkeleton } from "./FeaturesBentoSkeleton";


interface FeatureCardItem {
  slug: string;
  title: string;
  category: "restaurant" | "retail" | "multistore" | "digital";
  badge: string;
  specBadge?: string;
  desc: string;
  image: string;
  icon: LucideIcon;
  accentColor: string;
  glowColor: string;
  tags: string[];
  includedIn: { name: string; href: string };
  isFeatured?: boolean; // Span 2 cols in bento layout
  keyPoints?: string[]; // Bullet highlights for wide featured cards
}



const SOLUTION_GROUPS = [
  {
    id: "restaurant",
    title: "Features Inside Restaurant Cloud POS",
    desc: "Dining room, kitchen mesh, tableside ordering, and course pacing capabilities.",
    href: "/solutions/restaurants",
    icon: Utensils,
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: "retail",
    title: "Features Inside Retail Commerce POS",
    desc: "Barcode scanning, weighing scales, inventory replenishment, and customer loyalty.",
    href: "/solutions/grocery",
    icon: Store,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: "multistore",
    title: "Features Inside Multi-Store Cloud HQ",
    desc: "Central catalog distribution, real-time BI telemetry, and supply chain logistics.",
    href: "/solutions/franchise",
    icon: Cloud,
    accent: "from-primary to-purple-600",
  },
  {
    id: "digital",
    title: "Features for Direct Online Channels",
    desc: "Branded web storefront, commission-free ordering, and delivery dispatch.",
    href: "/solutions",
    icon: Globe2,
    accent: "from-cyan-500 to-blue-500",
  },
];

const ENTERPRISE_FEATURE_FAQS: FAQItem[] = [
  {
    question: "Is Quantix software locked into proprietary hardware?",
    answer:
      "No. Quantix is 100% hardware-agnostic cloud software. It operates natively across standard iPads, Android tablets, touch monitors, and Windows/Linux till hardware without proprietary machine lock-in.",
  },
  {
    question: "How does the Zero-Latency Offline Till Mesh work during internet outages?",
    answer:
      "Every register till uses local IndexedDB caches. Cashiers can continue scanning barcodes, ringing sales, and printing receipts without internet. When connection returns, transactions automatically reconcile with the cloud.",
  },
  {
    question: "How fast do menu, pricing, and catalog updates push across multiple locations?",
    answer:
      "Catalog updates and pricing tiers deploy across hundreds of branch terminals within 2.4 seconds via real-time WebSocket channels with zero downtime or cashier interruption.",
  },
  {
    question: "Can we integrate our existing weighing scales and barcode laser scanners?",
    answer:
      "Yes. Quantix integrates natively with certified NTEP weighing scales (with auto tare-weight deduction) and multi-directional laser barcode scanners.",
  },
  {
    question: "Are all 15 features included or sold as separate modular add-ons?",
    answer:
      "All features are built directly into the unified Quantix platform. Depending on whether you activate Restaurant Cloud POS, Retail Commerce POS, or Multi-Store Cloud HQ, the relevant modules are natively active with zero third-party software sprawl.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function FeaturesClient() {
  const { data: apiFeatures = [], isLoading, isError, refetch } = useGetPublicFeaturesQuery({
    siteVariant: "Enterprise",
  });

  const FEATURES: FeatureCardItem[] = useMemo(() => {
    return (apiFeatures || []).map((f) => {
      const rawCat = (f.category || "multistore").toLowerCase();
      let cat: "restaurant" | "retail" | "multistore" | "digital" = "multistore";
      if (rawCat.includes("restaurant") || rawCat.includes("kitchen") || rawCat.includes("dining")) {
        cat = "restaurant";
      } else if (rawCat.includes("retail") || rawCat.includes("checkout") || rawCat.includes("storefront")) {
        cat = "retail";
      } else if (rawCat.includes("digital") || rawCat.includes("omnichannel") || rawCat.includes("online")) {
        cat = "digital";
      }

      const accentColor = f.iconColor || "text-primary bg-primary/10 border-primary/20";
      const tags = f.bullets && f.bullets.length > 0 ? f.bullets.slice(0, 3) : [f.category || "Enterprise"];

      return {
        slug: f.slug,
        title: f.title,
        category: cat,
        badge: f.navbarBadge || f.topBadge || "CAPABILITY",
        specBadge: f.statValue || f.bottomBadge || undefined,
        desc: f.shortDescription || f.fullDescription || "",
        image: f.imageUrl || f.imageSrc || "/images/ent_global_pos_bundle.png",
        icon: getFeatureIcon(f.iconKey),
        accentColor,
        glowColor: "rgba(255, 77, 0, 0.18)",
        tags,
        includedIn: { name: "Quantix Enterprise", href: `/features/${f.slug}` },
        isFeatured: !!f.isFeatured,
        keyPoints: f.bullets && f.bullets.length > 0 ? f.bullets : undefined,
      };
    });
  }, [apiFeatures]);

  const FILTER_TABS = useMemo(() => {
    return [
      { id: "all", label: "All Features", count: FEATURES.length, icon: Sparkles },
      { id: "restaurant", label: "Restaurant & Dining", count: FEATURES.filter((f) => f.category === "restaurant").length, icon: Utensils },
      { id: "retail", label: "Retail & Checkout", count: FEATURES.filter((f) => f.category === "retail").length, icon: Store },
      { id: "multistore", label: "Multi-Store Cloud HQ", count: FEATURES.filter((f) => f.category === "multistore").length, icon: Cloud },
      { id: "digital", label: "Online & Delivery", count: FEATURES.filter((f) => f.category === "digital").length, icon: Globe2 },
    ];
  }, [FEATURES]);

  if (isLoading) {
    return <FeaturesBentoSkeleton />;
  }

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [viewMode, setViewMode] = useState<"bento" | "grouped">("bento");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Pressing '/' or 'Cmd+K' focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Live real-time filtered results combining Category Tab + Search Query
  const filteredFeatures = useMemo(() => {
    return FEATURES.filter((f) => {
      // 1. Category check
      const matchesCategory = selectedFilter === "all" || f.category === selectedFilter;
      if (!matchesCategory) return false;

      // 2. Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        f.title.toLowerCase().includes(q) ||
        f.desc.toLowerCase().includes(q) ||
        f.badge.toLowerCase().includes(q) ||
        f.specBadge?.toLowerCase().includes(q) ||
        f.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        f.includedIn.name.toLowerCase().includes(q)
      );
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER (using global .page-hero-header)                           */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        {/* Ambient Radial Lighting */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-linear-to-b from-primary/15 via-primary/5 to-transparent blur-3xl -z-10" />

        <div className="site-container text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10.5px] sm:text-xs font-black uppercase tracking-widest text-primary mb-3 sm:mb-4 shadow-xs"
          >
            <Sparkles size={13} className="text-primary" />
            <span>ENTERPRISE BENTO CAPABILITIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.18] sm:leading-[1.15] tracking-tight text-balance"
          >
            Purpose-Built Features.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-light to-amber-500 block sm:inline">
              Engineered for Speed & Scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Explore modular capabilities powering dining room hospitality, high-throughput retail stores, multi-location cloud command, and direct digital ordering.
          </motion.p>

          {/* ========================================================================= */}
          {/* 3 ENTERPRISE CAPABILITY HIGHLIGHT PILLARS (Instant Authority)             */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold font-syne">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>100% Offline Mesh Till</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold font-syne">
              <Cloud className="h-3.5 w-3.5 text-sky-500" />
              <span>&lt; 2.4s Global Catalog Broadcast</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold font-syne">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>PCI-DSS Tier 1 & P2PE Ready</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STICKY FILTER, INSTANT SEARCH & VIEW TOGGLE DOCK                       */}
      {/* ========================================================================= */}
      <div className="sticky top-20 sm:top-22 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 py-3 shadow-xs">
        <div className="site-container px-3 sm:px-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Sliding Pill Category Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none snap-x touch-pan-x flex-1">
              {FILTER_TABS.map((tab) => {
                const isSelected = selectedFilter === tab.id;
                const TabIcon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`group relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-syne font-bold transition-all duration-300 shrink-0 select-none snap-center flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "text-white shadow-sm shadow-primary/25"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeBentoFilterPill"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        className="absolute inset-0 rounded-full bg-linear-to-r from-primary via-primary-light to-primary-dark z-0"
                      />
                    )}
                    <TabIcon className="relative z-10 h-3 w-3 stroke-[2.2] shrink-0" />
                    <span className="relative z-10">{tab.label}</span>
                    <span
                      className={`relative z-10 text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Controls Right: Search + 2-Way View Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              
              {/* Instant Search Bar (with '/' keyboard shortcut hint) */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search capability..."
                  className="w-full pl-8.5 pr-14 py-1.5 text-xs rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <span className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-400 bg-slate-200/60 dark:bg-slate-800/60 pointer-events-none">
                    /
                  </span>
                )}
              </div>

              {/* 2-Way View Switcher (Bento vs Grouped by Solution) */}
              <div className="hidden sm:flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("bento")}
                  title="Bento Grid View"
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    viewMode === "bento"
                      ? "bg-white dark:bg-slate-800 text-primary shadow-xs"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grouped")}
                  title="Grouped by Solution View"
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    viewMode === "grouped"
                      ? "bg-white dark:bg-slate-800 text-primary shadow-xs"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  <LayoutList className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC SHOWCASE (BENTO OR GROUPED VIEW)                               */}
      {/* ========================================================================= */}
      <section className="section-py bg-white dark:bg-slate-950">
        <div className="site-container px-3.5 sm:px-6">
          
          {/* Active Search & Filter Feedback Strip */}
          {(searchQuery.trim() || selectedFilter !== "all") && (
            <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-white">
                  {filteredFeatures.length} {filteredFeatures.length === 1 ? "capability" : "capabilities"}
                </span>
                <span>found</span>
                {searchQuery && (
                  <span>matching &ldquo;<span className="text-primary font-bold">{searchQuery}</span>&rdquo;</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="text-primary hover:underline font-syne font-bold cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Empty State when Search returns no results */}
          {filteredFeatures.length === 0 ? (
            <div className="text-center py-16 sm:py-24 max-w-md mx-auto space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-primary mx-auto">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-syne text-lg font-black text-slate-950 dark:text-white">
                No matching capabilities found
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No features matched your search for &ldquo;{searchQuery}&rdquo;. Try another keyword or clear filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-syne font-bold hover:brightness-105 transition-all cursor-pointer shadow-xs"
              >
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : viewMode === "grouped" && !searchQuery.trim() && selectedFilter === "all" ? (
            
            // -------------------------------------------------------------
            // GROUPED BY SOLUTION VIEW (Organized by Solution Ecosystem)
            // -------------------------------------------------------------
            <div className="space-y-12 sm:space-y-16">
              {SOLUTION_GROUPS.map((group) => {
                const groupFeatures = FEATURES.filter((f) => f.category === group.id);
                const GroupIcon = group.icon;

                return (
                  <div key={group.id} className="space-y-5">
                    {/* Solution Group Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-primary">
                          <GroupIcon className="h-3.5 w-3.5 stroke-[2.2]" />
                          <span>ECOSYSTEM CHAPTER</span>
                        </div>
                        <h3 className="font-syne text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                          {group.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          {group.desc}
                        </p>
                      </div>

                      <Link
                        href={group.href}
                        className="text-xs font-syne font-bold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        <span>View Solution Architecture</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* Features Grid for this Solution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
                      {groupFeatures.map((item) => (
                        <StandardFeatureCard key={item.slug} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          ) : (
            
            // -------------------------------------------------------------
            // BENTO GRID VIEW (Dynamic Panoramic Cards)
            // -------------------------------------------------------------
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredFeatures.map((item) => {
                  // Allow wide presentation in "all" or specific category view when not in text-search mode
                  const isWide = Boolean(
                    item.isFeatured &&
                    !searchQuery.trim() &&
                    (selectedFilter === "all" || selectedFilter === item.category)
                  );

                  if (isWide) {
                    return <WideFeatureCard key={item.slug} item={item} />;
                  }

                  return <StandardFeatureCard key={item.slug} item={item} />;
                })}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ENTERPRISE CAPABILITY FAQS SECTION                                     */}
      {/* ========================================================================= */}
      <FAQWrapper
        title="Enterprise Capabilities & Platform FAQs"
        subtitle="Common questions from restaurant groups, retail enterprises, and multi-unit franchise operators."
        badgeText="FEATURE ARCHITECTURE FAQS"
        fallbackFaqs={ENTERPRISE_FEATURE_FAQS}
      />

      {/* Customer Testimonials */}
      <TestimonialsWrapper />

      {/* Production Ready CTA Banner */}
      <CTABanner />
    </div>
  );
}

// =============================================================================
// HELPER COMPONENT: WIDE 2-COLUMN FLAGSHIP BENTO CARD
// =============================================================================
function WideFeatureCard({ item }: { item: FeatureCardItem }) {
  const Icon = item.icon;

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="col-span-1 md:col-span-2"
    >
      <Link
        href={`/features/${item.slug}`}
        className="group relative p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-primary/60 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
      >
        {/* Soft Ambient Radial Bloom */}
        <div
          className="absolute -top-12 -right-12 w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{ background: item.glowColor }}
        />

        {/* Top Header Row */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Icon size={18} className="stroke-[2.2]" />
            </span>
            <span className="text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border text-primary bg-primary/10 border-primary/20 truncate">
              {item.badge}
            </span>
          </div>

          {item.specBadge && (
            <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{item.specBadge}</span>
            </span>
          )}
        </div>

        {/* Bento Content: On mobile stacks naturally; On Desktop 2-Col Split */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center flex-1">
          {/* Left Details (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
            <h3 className="font-syne font-black text-base sm:text-xl md:text-2xl text-slate-950 dark:text-white group-hover:text-primary transition-colors duration-200 leading-snug">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              {item.desc}
            </p>

            {/* Bullet Highlights */}
            {item.keyPoints && (
              <div className="space-y-1.5 pt-0.5">
                {item.keyPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
                      <Check className="h-2.5 w-2.5 stroke-3" />
                    </span>
                    <span className="leading-tight">{point}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-syne font-bold px-2 sm:px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Hardware Stage (5 cols on lg) */}
          <div className="lg:col-span-5 relative h-40 sm:h-48 md:h-52 w-full flex items-center justify-center overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 90vw, 35vw"
              className="object-contain p-1 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>

        {/* Card Bottom: Included in Solution Badge + Deep Dive Arrow */}
        <div className="relative z-10 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-syne font-bold">
          <div className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Included in <span className="text-primary underline decoration-primary/30 underline-offset-2">{item.includedIn.name}</span></span>
          </div>

          <div className="flex items-center gap-1 text-primary group-hover:text-primary-dark dark:group-hover:text-primary-light ml-auto">
            <span>Explore Capability</span>
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-2xs shrink-0">
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// =============================================================================
// HELPER COMPONENT: STANDARD 1-COLUMN BENTO CARD
// =============================================================================
function StandardFeatureCard({ item }: { item: FeatureCardItem }) {
  const Icon = item.icon;

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link
        href={`/features/${item.slug}`}
        className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/85 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
      >
        {/* Ambient Hover Glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{ background: item.glowColor }}
        />

        <div className="relative z-10 space-y-2.5 sm:space-y-3">
          {/* Top Row: Icon + Badges */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-xs shrink-0">
              <Icon size={16} className="stroke-[2.2]" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {item.specBadge && (
                <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full truncate">
                  {item.specBadge}
                </span>
              )}
              <span
                className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.accentColor} truncate`}
              >
                {item.badge}
              </span>
            </div>
          </div>

          {/* Free-Floating 3D Hardware / Workflow Visual */}
          <div className="relative h-28 sm:h-32 w-full flex items-center justify-center overflow-hidden my-0.5">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-contain p-1 drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="font-syne font-black text-sm sm:text-base text-slate-950 dark:text-white group-hover:text-primary transition-colors duration-200 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
              {item.desc}
            </p>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9.5px] font-syne font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Bottom: Included in Solution Badge + Arrow */}
        <div className="relative z-10 pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-syne font-bold">
          <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[65%]">
            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="truncate">{item.includedIn.name}</span>
          </div>

          <div className="flex items-center gap-1 text-primary group-hover:text-primary-dark dark:group-hover:text-primary-light shrink-0">
            <span className="text-[11px] hidden sm:inline">Explore</span>
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-2xs shrink-0">
              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

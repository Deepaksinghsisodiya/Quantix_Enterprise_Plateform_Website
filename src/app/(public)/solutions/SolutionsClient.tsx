"use client";

import React, { useState, useMemo } from "react";
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
import { useGetSolutionsQuery } from "@/features/Solutions/Service/SolutionsService";
import { SolutionsOverviewSkeleton } from "@/features/Solutions/components/SolutionsOverviewSkeleton";
import type { SolutionItemDto } from "@/features/Solutions/Types/SolutionTypes";

export const RESTAURANT_SITE_URL = process.env.NEXT_PUBLIC_RESTAURANT_URL || "http://localhost:3002";
export const RETAIL_SITE_URL = process.env.NEXT_PUBLIC_RETAIL_URL || "http://localhost:3001";

const ICON_MAP: Record<string, LucideIcon> = {
  Utensils,
  ShoppingBag,
  Cloud,
  Tv,
  Clock,
  Sparkles,
  ChefHat,
  Scan,
  Scale,
  Layers,
  Boxes,
  Store,
  LineChart,
  Building2,
  ShieldCheck,
  Zap,
};

function resolveIcon(iconKey?: string, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!iconKey) return fallback;
  return ICON_MAP[iconKey] || fallback;
}

const FILTER_TABS = [
  { id: "all", label: "All Solutions", icon: Sparkles },
  { id: "restaurant", label: "Restaurant POS", icon: Utensils },
  { id: "retail", label: "Retail POS", icon: ShoppingBag },
  { id: "multistore", label: "Multi-Store Cloud HQ", icon: Cloud },
];

export default function SolutionsClient() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const { data: apiSolutions = [], isLoading, isError } = useGetSolutionsQuery({
    siteVariant: "Enterprise",
  });

  // Extract the 3 showcase overview solutions from the API
  const showcaseSolutions = useMemo(() => {
    if (!apiSolutions || apiSolutions.length === 0) return [];

    // Filter items belonging to the 3 overview categories
    const overviews = apiSolutions.filter(
      (s) =>
        s.categoryTitle === "OVERVIEW SHOWCASE" ||
        s.slug === "restaurant-overview" ||
        s.slug === "retail-overview" ||
        s.slug === "multistore-overview" ||
        (s.overviewFeatures && s.overviewFeatures.length > 0)
    );

    if (overviews.length > 0) return overviews;

    // Fallback: take top 3 active Enterprise solutions
    return apiSolutions.slice(0, 3);
  }, [apiSolutions]);

  const visibleSolutions = useMemo(() => {
    if (!Array.isArray(showcaseSolutions)) return [];
    return showcaseSolutions.filter((sol) => {
      if (!sol) return false;
      if (selectedFilter === "all") return true;
      const cat = (sol.category || sol.slug || "").toLowerCase();
      return cat.includes(selectedFilter);
    });
  }, [showcaseSolutions, selectedFilter]);

  if (isLoading) {
    return (
      <div className="w-full overflow-x-hidden">
        <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden py-10 sm:py-14">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-linear-to-b from-primary/15 via-primary/5 to-transparent blur-3xl -z-10" />
          <div className="site-container relative z-10 px-4 sm:px-6 text-left space-y-4">
            <div className="h-6 w-48 bg-primary/10 border border-primary/20 rounded-full animate-pulse" />
            <div className="h-10 sm:h-12 w-3/4 max-w-2xl bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-4 w-2/3 max-w-xl bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="pt-2 flex items-center justify-start gap-2 overflow-x-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-9 w-32 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0 animate-pulse" />
              ))}
            </div>
          </div>
        </section>
        <SolutionsOverviewSkeleton showFilterSkeleton={false} />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. HERO HEADER SECTION */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-linear-to-b from-primary/15 via-primary/5 to-transparent blur-3xl -z-10" />

        <div className="site-container relative z-10 px-4 sm:px-6 text-left space-y-4">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10.5px] sm:text-xs font-black uppercase tracking-widest text-primary shadow-xs"
            >
              <Sparkles size={13} className="text-primary" />
              <span>ENTERPRISE POS SOLUTIONS</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.18] sm:leading-[1.15] tracking-tight max-w-4xl"
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
            className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal max-w-2xl leading-relaxed"
          >
            Purpose-built operating platforms for dining hospitality, high-volume retail stores, and multi-location enterprise chains.
          </motion.p>

          {/* SLIDING PILL FILTER BAR */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="pt-2 flex items-center justify-start gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x touch-pan-x"
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

      {/* 2. THE SOLUTIONS SHOWCASE */}
      <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
        {visibleSolutions.length === 0 ? (
          <div className="section-py text-center space-y-3">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {isError ? "Unable to load enterprise solutions right now. Please try again." : "No enterprise solutions found for this category."}
            </p>
            {selectedFilter !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-all cursor-pointer shadow-xs"
              >
                View All Solutions
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {visibleSolutions.map((sol, index) => {
              const isRight = index % 2 === 0;
              const SolIcon = resolveIcon(sol?.iconKey, Sparkles);
              const features = Array.isArray(sol?.overviewFeatures) ? sol.overviewFeatures : [];
              const subSectors = Array.isArray(sol?.subSectors) ? sol.subSectors : [];
              const imageSrc = sol?.imageUrl || sol?.imageSrc || sol?.detailImageUrl || "/images/nav_restaurant_bundle.png";

            return (
              <motion.section
                key={sol.solutionId || sol.id || sol.slug || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="section-py relative overflow-hidden bg-white dark:bg-slate-950"
              >
                <div
                  className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-60"
                  style={{ background: sol.glowColor || "rgba(255, 79, 0, 0.15)" }}
                />

                <div className="site-container px-4 sm:px-6 lg:px-8">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                      !isRight ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    {/* LEFT / RIGHT CONTENT COLUMN */}
                    <div
                      className={`space-y-6 lg:col-span-7 ${
                        !isRight ? "lg:col-start-6" : ""
                      }`}
                    >
                      {/* Eyebrow + Number */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="inline-flex items-center gap-1.5 text-xs font-syne font-bold uppercase tracking-wider text-primary">
                          <SolIcon size={14} className="text-primary" />
                          <span>{sol.eyebrow || "ENTERPRISE ARCHITECTURE"}</span>
                        </div>
                      </div>

                      {/* Main Title */}
                      <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                        {sol.title}
                      </h2>

                      {/* Tagline */}
                      {sol.tagline && (
                        <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                          {sol.tagline}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                        {sol.description}
                      </p>

                      {/* Sub-Sectors Pill Cloud */}
                      {subSectors.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Supported Sub-Sectors & Venues
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {subSectors.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                href={sub.href || "/solutions"}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors"
                              >
                                <span>{sub.label}</span>
                                <ArrowRight size={11} className="opacity-60" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Feature Bento Tiles */}
                      {features.length > 0 && (
                        <div className="space-y-2.5 pt-3">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Architectural Capabilities
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {features.map((feat, fIdx) => {
                              const FeatIcon = resolveIcon(feat?.icon, Sparkles);
                              const featTitle = typeof feat === 'object' ? (feat?.title || '') : String(feat || '');
                              const featDesc = typeof feat === 'object' ? (feat?.desc || '') : '';
                              const featBadge = typeof feat === 'object' ? feat?.badge : null;

                              return (
                                <div
                                  key={`${sol.slug || index}-feat-${fIdx}-${featTitle}`}
                                  className="group/feat p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200"
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <div className="flex items-center gap-2">
                                      <FeatIcon size={14} className="text-primary shrink-0" />
                                      <span className="text-xs font-bold text-slate-900 dark:text-white font-syne">
                                        {featTitle}
                                      </span>
                                    </div>
                                    {featBadge && (
                                      <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 shrink-0">
                                        {featBadge}
                                      </span>
                                    )}
                                  </div>
                                  {featDesc && (
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                      {featDesc}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* CTA Action Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-4">
                        <Link
                          href={sol.href || "/solutions"}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-syne text-xs sm:text-sm font-bold shadow-md hover:shadow-lg shadow-primary/20 transition-all duration-200 cursor-pointer"
                        >
                          <span>{sol.ctaLabel || "Explore Architecture"}</span>
                          <ArrowRight size={14} />
                        </Link>

                        {(sol.externalUrl || sol.ctaText) && (
                          <a
                            href={sol.externalUrl || RESTAURANT_SITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-syne text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 transition-all duration-200"
                          >
                            <span>{sol.ctaText || "Visit Site"}</span>
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* HARDWARE BUNDLE IMAGE SHOWCASE */}
                    <div
                      className={`lg:col-span-5 ${
                        !isRight ? "lg:col-start-1 lg:row-start-1" : ""
                      }`}
                    >
                      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-100 via-white to-slate-100/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden group">
                        {/* Top Hardware Badge */}
                        {sol.topBadge && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-[10px] sm:text-[11px] font-syne font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-xs mb-4">
                            <Sparkles size={11} className="text-primary" />
                            <span>{sol.topBadge}</span>
                          </div>
                        )}

                        {/* Image Canvas */}
                        <div className="relative w-full h-64 sm:h-80 my-2 flex items-center justify-center">
                          <Image
                            src={imageSrc}
                            alt={sol.imageAlt || sol.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 420px"
                            className="object-contain p-2 filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        {/* Bottom Hardware Pill */}
                        {sol.bottomBadge && (
                          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs">
                            <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Hardware Architecture
                            </span>
                            <span className="inline-flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                              <CheckCircle2 size={12} className="text-emerald-500" />
                              {sol.bottomBadge}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      )}
    </div>

      {/* 3. TESTIMONIALS & SOCIAL PROOF */}
      <TestimonialsWrapper />

      {/* 4. CONVERSION CTA BANNER */}
      <CTABanner />
    </div>
  );
}

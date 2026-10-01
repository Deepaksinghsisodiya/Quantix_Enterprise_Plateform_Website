"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Utensils, ShoppingBag, Cloud, Store, Building2, Zap, type LucideIcon } from "lucide-react";
import { useGetSolutionsQuery } from "../Service/SolutionsService";

const ICON_RESOLVER: Record<string, LucideIcon> = {
  Utensils,
  ShoppingBag,
  Cloud,
  Store,
  Building2,
  Sparkles,
  Zap,
};

function resolveIcon(iconKey?: string): LucideIcon {
  if (!iconKey) return Sparkles;
  return ICON_RESOLVER[iconKey] || Sparkles;
}

const extractStringTag = (item: any): string => {
  if (!item) return '';
  if (typeof item === 'string') return item;
  if (typeof item === 'object') {
    return (item.title || item.label || item.name || item.badge || item.desc || '').toString();
  }
  return String(item);
};

export const HomeSolutionsSection: React.FC = () => {
  const { data: apiSolutions, isLoading, isError } = useGetSolutionsQuery({ siteVariant: "Enterprise" });

  const solutions = useMemo(() => {
    if (!apiSolutions || !Array.isArray(apiSolutions)) return [];
    return apiSolutions
      .filter((s) => s && !s.itemType?.toLowerCase().includes("promo") && s.isActive !== false)
      .slice(0, 3)
      .map((s, idx) => {
        const rawFeatures: any[] = Array.isArray(s.tags) && s.tags.length > 0
          ? s.tags
          : (Array.isArray(s.points) ? s.points : []);

        const features: string[] = rawFeatures
          .map(extractStringTag)
          .filter((t): t is string => Boolean(t && t.trim()))
          .slice(0, 3);

        return {
          id: s.slug || s.solutionId || `enterprise-home-sol-${idx}`,
          slug: s.slug || "",
          badge: s.badge || s.topBadge || "ENTERPRISE",
          title: s.title || "",
          desc: s.description || "",
          icon: resolveIcon(s.iconKey),
          image: s.imageUrl || s.detailImageUrl || s.imageSrc || "/images/nav_restaurant_bundle.png",
          accentColor: s.accentColor || "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50",
          features,
        };
      });
  }, [apiSolutions]);

  // Loading state -> Skeleton
  if (isLoading) {
    return (
      <section className="section-py bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 animate-pulse">
        <div className="site-container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
            <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="flex gap-2 pt-1">
                  <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error or Empty -> Hide section cleanly
  if (isError || solutions.length === 0) {
    return null;
  }

  return (
    <section className="section-py bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="site-container px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] sm:text-xs font-black uppercase tracking-wider text-primary mb-3 shadow-xs">
            <Sparkles size={13} className="text-primary" />
            <span>ENTERPRISE ARCHITECTURE</span>
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Built For Multi-Unit Enterprise Scalability
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            High-availability POS clusters, central master data synchronization, and multi-location cloud orchestration.
          </p>
        </div>

        {/* 3 Solutions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug || item.id}
                href={`/solutions/${item.slug}`}
                className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon size={16} className="stroke-[2.2]" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.accentColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="relative h-32 sm:h-36 w-full flex items-center justify-center my-1">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <h3 className="font-syne font-black text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.features.map((feat, fIdx) => (
                      <span
                        key={`${item.id || item.slug}-feat-${fIdx}-${feat}`}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark">
                  <span>Explore Architecture</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Solutions Link */}
        <div className="text-center mt-10">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs"
          >
            <span>View All Enterprise Solutions</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSolutionsSection;

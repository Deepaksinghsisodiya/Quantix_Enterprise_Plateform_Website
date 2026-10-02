'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Building2,
  LineChart,
  Boxes,
  Store,
  Zap,
  Tv,
  Utensils,
  QrCode,
  Cloud,
  ChefHat,
  ShieldCheck,
  CreditCard,
  Truck,
  Layers,
  Coffee,
  Flame,
  ShoppingBag,
  Smartphone,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MobileMenuSection, MobileMenuGroup, MobileMenuItem } from '../../config/navTypes';
import { getActiveMenuHref } from '../../config/navConfig';
import { useGetPublicFeaturesQuery } from '@/features/Features/Service/FeaturesService';
import { useGetSolutionsMegaMenuQuery } from '@/features/Solutions/Service/SolutionsService';
import { useGetIntegrationsQuery } from '@/features/Integrations/Service/IntegrationsService';

interface MobileSubMenuProps {
  activeSection: MobileMenuSection;
  pathname: string;
  onBack: () => void;
  onClose: () => void;
}

// ─── ICON RESOLVERS FOR DYNAMIC API DATA ─────────────────────────────────────
const getFeatureIcon = (iconKey?: string, slug?: string): LucideIcon => {
  const k = (iconKey || '').toLowerCase();
  const s = (slug || '').toLowerCase();
  if (k.includes('building') || s.includes('multi-store')) return Building2;
  if (k.includes('chart') || s.includes('bi') || s.includes('analytics')) return LineChart;
  if (k.includes('box') || s.includes('inventory') || s.includes('supply')) return Boxes;
  if (k.includes('store') || s.includes('pos')) return Store;
  if (k.includes('zap') || s.includes('offline')) return Zap;
  if (k.includes('tv') || s.includes('kds') || s.includes('kitchen')) return Tv;
  if (k.includes('utensil') || s.includes('table') || s.includes('dining')) return Utensils;
  if (k.includes('qr') || s.includes('mobile') || s.includes('order')) return QrCode;
  if (k.includes('cloud')) return Cloud;
  if (k.includes('chef')) return ChefHat;
  if (k.includes('shield')) return ShieldCheck;
  return Sparkles;
};

const getSolutionIcon = (iconKey?: string, slug?: string): LucideIcon => {
  const k = (iconKey || '').toLowerCase();
  const s = (slug || '').toLowerCase();
  if (k.includes('utensil') || s.includes('restaurant')) return Utensils;
  if (k.includes('coffee') || s.includes('cafe') || s.includes('bakery')) return Coffee;
  if (k.includes('flame') || s.includes('bar')) return Flame;
  if (k.includes('bag') || s.includes('apparel') || s.includes('retail')) return ShoppingBag;
  if (k.includes('store') || s.includes('grocery')) return Store;
  if (k.includes('layer') || s.includes('smoke')) return Layers;
  return Sparkles;
};

const getIntegrationIcon = (slug?: string, cat?: string): LucideIcon => {
  const s = (slug || '').toLowerCase();
  const c = (cat || '').toLowerCase();
  if (s.includes('stripe') || c.includes('payment')) return CreditCard;
  if (s.includes('authorize') || s.includes('vault')) return ShieldCheck;
  if (s.includes('square') || s.includes('terminal')) return Smartphone;
  if (s.includes('doordash') || s.includes('uber') || c.includes('delivery')) return Truck;
  if (c.includes('accounting') || c.includes('erp')) return Layers;
  return Zap;
};

// ─── DEDICATED SKELETON LOADER FOR MOBILE NAVIGATION ───────────────────────────
const MobileSubMenuSkeleton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="flex h-full w-full flex-col overflow-y-auto px-3.5 pt-3.5 pb-24 min-[380px]:px-4 sm:px-5 animate-pulse">
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-3.5 text-[11px] font-extrabold uppercase text-slate-400"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* Header visual card skeleton */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 flex items-center gap-3.5">
        <div className="h-20 w-20 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4.5 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-44 rounded bg-slate-100 dark:bg-slate-800/70" />
        </div>
      </div>

      {/* Category header skeleton */}
      <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800 mt-2" />

      {/* 4 Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 min-h-[96px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-3.5 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-1.5 mt-2">
              <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-2.5 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const MobileSubMenu: React.FC<MobileSubMenuProps> = ({
  activeSection,
  pathname,
  onBack,
  onClose,
}) => {
  const isFeaturesSection = activeSection.label === 'Features';
  const isSolutionsSection = activeSection.label === 'Solutions';
  const isIntegrationsSection = activeSection.label === 'Integrations';

  // 1. Live RTK Query API Hooks
  const { data: apiFeatures, isLoading: isFeaturesLoading } = useGetPublicFeaturesQuery(
    { siteVariant: 'Enterprise' },
    { skip: !isFeaturesSection }
  );

  const { data: apiSolutionsData, isLoading: isSolutionsLoading } = useGetSolutionsMegaMenuQuery(
    'Enterprise',
    { skip: !isSolutionsSection }
  );

  const { data: apiIntegrations, isLoading: isIntegrationsLoading } = useGetIntegrationsQuery(
    { siteVariant: 'Enterprise', showInNavbar: true },
    { skip: !isIntegrationsSection }
  );

  const isCurrentSectionLoading =
    (isFeaturesSection && isFeaturesLoading) ||
    (isSolutionsSection && isSolutionsLoading) ||
    (isIntegrationsSection && isIntegrationsLoading);

  // 2. Compute dynamic groups from live API data
  const dynamicGroups: MobileMenuGroup[] = useMemo(() => {
    // ── FEATURES (Live DB) ──────────────────────────────────────────────────
    if (isFeaturesSection) {
      if (apiFeatures && apiFeatures.length > 0) {
        const activeList = apiFeatures
          .filter((f) => f.showInNavbar !== false && f.isActive !== false)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

        if (activeList.length > 0) {
          // Group by category if present, or split into 2 logical groups
          const categoryMap = new Map<string, typeof activeList>();
          activeList.forEach((f) => {
            const cat = (f.category || 'CORE PLATFORM').toUpperCase();
            if (!categoryMap.has(cat)) categoryMap.set(cat, []);
            categoryMap.get(cat)!.push(f);
          });

          return Array.from(categoryMap.entries()).map(([catTitle, items]) => ({
            title: catTitle,
            items: items.map((f): MobileMenuItem => ({
              title: f.title,
              desc: f.shortDescription || f.subtitle || '',
              href: `/features/${f.slug}`,
              icon: getFeatureIcon(f.iconKey, f.slug),
            })),
          }));
        }
      }
      return activeSection.groups;
    }

    // ── SOLUTIONS (Live DB) ─────────────────────────────────────────────────
    if (isSolutionsSection) {
      if (apiSolutionsData?.categories && apiSolutionsData.categories.length > 0) {
        return apiSolutionsData.categories.map((cat: any): MobileMenuGroup => ({
          title: (cat.categoryTitle || cat.title || 'SOLUTIONS').toUpperCase(),
          items: (cat.items || []).map((s: any): MobileMenuItem => ({
            title: s.title,
            desc: s.description || s.shortDescription || '',
            href: s.href || `/solutions/${s.slug}`,
            icon: getSolutionIcon(s.iconKey, s.slug),
          })),
        }));
      }
      return activeSection.groups;
    }

    // ── INTEGRATIONS (Live DB) ──────────────────────────────────────────────
    if (isIntegrationsSection) {
      if (apiIntegrations && apiIntegrations.length > 0) {
        const activeList = apiIntegrations
          .filter((i: any) => i.isActive !== false)
          .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0));

        if (activeList.length > 0) {
          return [
            {
              title: 'CERTIFIED INTEGRATIONS & HARDWARE',
              items: activeList.map((i: any): MobileMenuItem => ({
                title: i.name || i.title || 'Integration',
                desc: i.description || i.shortDescription || 'Verified API Integration',
                href: `/integrations/${i.slug}`,
                icon: getIntegrationIcon(i.slug, i.category),
              })),
            },
          ];
        }
      }
      return activeSection.groups;
    }

    // Fallback: static curated groups for Why Quantix / Resources
    return activeSection.groups;
  }, [
    isFeaturesSection,
    isSolutionsSection,
    isIntegrationsSection,
    apiFeatures,
    apiSolutionsData,
    apiIntegrations,
    activeSection,
  ]);

  const allSubItems = useMemo(() => {
    return dynamicGroups.flatMap((group) => group.items);
  }, [dynamicGroups]);

  const activeSubHref = useMemo(() => {
    return getActiveMenuHref(allSubItems, pathname);
  }, [allSubItems, pathname]);

  // If live data is loading, display the layout-matched skeleton loader
  if (isCurrentSectionLoading) {
    return <MobileSubMenuSkeleton onBack={onBack} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="flex h-full w-full flex-col overflow-y-auto overscroll-contain px-3.5 pt-3.5 pb-[calc(env(safe-area-inset-bottom)+112px)] min-[380px]:px-4 sm:px-5"
    >
      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-full border border-primary/15 bg-white dark:bg-slate-900 px-3.5 text-[11px] font-extrabold uppercase tracking-normal text-primary shadow-xs transition-all hover:border-primary/25 hover:bg-primary/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <ArrowLeft size={14} /> Back to Main Menu
        </button>

        {/* Header Visual Card with Real Image Mockup */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs flex items-center gap-3.5 overflow-hidden">
          {activeSection.imageSrc ? (
            <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-transparent flex items-center justify-center p-1">
              <Image
                src={activeSection.imageSrc}
                alt={activeSection.label}
                fill
                sizes="100px"
                className="object-contain p-0.5 drop-shadow-md"
              />
            </div>
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
              {React.createElement(activeSection.icon, { size: 20 })}
            </span>
          )}
          <div className="min-w-0 flex-1">
            {activeSection.badge && (
              <span className="inline-flex items-center gap-1 text-[8.5px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mb-1">
                <Sparkles size={8.5} />
                {activeSection.badge}
              </span>
            )}
            <h3 className="font-syne text-[16px] font-bold text-slate-900 dark:text-white leading-tight">
              {activeSection.label}
            </h3>
            {activeSection.desc && (
              <p className="mt-0.5 text-[11px] font-medium leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                {activeSection.desc}
              </p>
            )}
          </div>
        </div>

        {/* Real Live Sub-items List (Direct API Slugs) */}
        <div className="space-y-4">
          {dynamicGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <span className="block px-1 text-[10px] font-extrabold uppercase tracking-normal text-primary">
                {group.title}
              </span>
              <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  const isItemActive = item.href === activeSubHref;

                  return (
                    <Link
                      key={`${group.title}-${item.title}-${item.href}`}
                      href={item.href}
                      onClick={onClose}
                      aria-current={isItemActive ? 'page' : undefined}
                      className={cn(
                        'group/item relative flex flex-col justify-between overflow-hidden rounded-xl border px-3 py-3 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/5 hover:shadow-sm active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 min-h-[96px]',
                        isItemActive
                          ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                      )}
                    >
                      {isItemActive && (
                        <span className="absolute inset-x-3 top-0 h-0.5 rounded-b-full bg-white/65" />
                      )}
                      <span className="flex items-start justify-between gap-2">
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors group-hover/item:bg-primary group-hover/item:text-white',
                            isItemActive
                              ? 'border-white/20 bg-white/15 text-white'
                              : 'border-primary/15 bg-primary/10 text-primary'
                          )}
                        >
                          <ItemIcon size={15} />
                        </span>
                        <ChevronRight
                          size={14}
                          className={cn(
                            'shrink-0 transition-transform group-hover/item:translate-x-0.5',
                            isItemActive ? 'text-white/80' : 'text-slate-300 group-hover/item:text-primary'
                          )}
                        />
                      </span>
                      <span className="mt-2 block min-w-0">
                        <span
                          className={cn(
                            'block font-syne text-[11px] font-black uppercase leading-[1.12] tracking-normal',
                            isItemActive ? 'text-white' : 'text-slate-900 dark:text-white'
                          )}
                        >
                          {item.title}
                        </span>
                        <span
                          className={cn(
                            'mt-1 block text-[10px] font-medium leading-snug line-clamp-2',
                            isItemActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                          )}
                        >
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* View Main Category Button */}
        <Link
          href={activeSection.href}
          onClick={onClose}
          className="mt-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-extrabold uppercase tracking-normal text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          View Main {activeSection.label} Page <ChevronRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

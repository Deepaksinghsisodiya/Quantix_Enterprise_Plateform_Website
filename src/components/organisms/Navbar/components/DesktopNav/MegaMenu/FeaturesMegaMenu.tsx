'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Check,
  Building2,
  BarChart3,
  Boxes,
  Store,
  Zap,
  Tv,
  Utensils,
  Smartphone,
  Cloud,
  Layers,
  ChefHat,
  ShieldCheck,
  LineChart,
  QrCode,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenuWrapper } from './MegaMenuWrapper';
import { FEATURES_MEGA_CONFIG } from '../../../config/navConfig';
import type { MegaMenuPromoCard, MegaMenuCategory, MegaMenuItem } from '../../../config/navTypes';
import { useGetPublicFeaturesQuery } from '@/features/Features/Service/FeaturesService';

interface FeaturesMegaMenuProps {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const FeaturesMegaMenu: React.FC<FeaturesMegaMenuProps> = ({
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const pathname = usePathname();
  const { promoCards: staticPromo, categories: staticCategories } = FEATURES_MEGA_CONFIG;

  const { data: apiFeatures, isLoading } = useGetPublicFeaturesQuery({
    siteVariant: 'Enterprise',
  });

  const getIconFromKey = (iconKey?: string, slug?: string): { icon: LucideIcon; color: string } => {
    const k = (iconKey || '').toLowerCase();
    const s = (slug || '').toLowerCase();

    if (k.includes('building') || s.includes('multi-store')) return { icon: Building2, color: 'text-primary' };
    if (k.includes('chart') || s.includes('bi') || s.includes('analytics')) return { icon: LineChart, color: 'text-amber-500' };
    if (k.includes('box') || s.includes('inventory') || s.includes('supply')) return { icon: Boxes, color: 'text-sky-500' };
    if (k.includes('store') || s.includes('pos')) return { icon: Store, color: 'text-orange-500' };
    if (k.includes('zap') || s.includes('offline')) return { icon: Zap, color: 'text-teal-500' };
    if (k.includes('tv') || s.includes('kds') || s.includes('kitchen')) return { icon: Tv, color: 'text-amber-600' };
    if (k.includes('utensil') || s.includes('table') || s.includes('dining')) return { icon: Utensils, color: 'text-orange-600' };
    if (k.includes('qr') || s.includes('mobile') || s.includes('order')) return { icon: QrCode, color: 'text-rose-500' };
    if (k.includes('cloud')) return { icon: Cloud, color: 'text-sky-600' };
    if (k.includes('chef')) return { icon: ChefHat, color: 'text-amber-500' };
    if (k.includes('shield')) return { icon: ShieldCheck, color: 'text-emerald-500' };

    return { icon: Sparkles, color: 'text-primary' };
  };

  const { promoCard, displayCategories } = useMemo(() => {
    if (!apiFeatures || apiFeatures.length === 0) {
      return {
        promoCard: staticPromo?.[0],
        displayCategories: staticCategories,
      };
    }

    // Filter active navbar items
    const navbarFeatures = apiFeatures
      .filter((f) => f.showInNavbar !== false && f.isActive !== false)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    if (navbarFeatures.length === 0) {
      return {
        promoCard: staticPromo?.[0],
        displayCategories: staticCategories,
      };
    }

    // Determine left promo card
    const featuredFlagship =
      navbarFeatures.find((f) => f.isFeatured && f.slug === 'multi-store') ||
      navbarFeatures.find((f) => f.isFeatured) ||
      navbarFeatures[0];

    const promo: MegaMenuPromoCard = {
      badge: featuredFlagship.navbarBadge || featuredFlagship.topBadge || 'ENTERPRISE FLAGSHIP',
      title: featuredFlagship.title,
      desc: featuredFlagship.shortDescription || featuredFlagship.subtitle || '',
      ctaText: 'Explore Capability',
      href: `/features/${featuredFlagship.slug}`,
      imageSrc: featuredFlagship.imageUrl || '/images/nav_cloud_bundle_v2.png',
      badgeColor: 'text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 border border-primary/30',
    };

    // Group items into 3 columns
    const catMulti: MegaMenuItem[] = [];
    const catStore: MegaMenuItem[] = [];
    const catDining: MegaMenuItem[] = [];

    navbarFeatures.forEach((f) => {
      const { icon, color } = getIconFromKey(f.iconKey, f.slug);
      const item: MegaMenuItem = {
        title: f.title.length > 36 ? f.title.substring(0, 34) + '...' : f.title,
        desc: f.subtitle || f.shortDescription || '',
        href: `/features/${f.slug}`,
        icon,
        iconColor: color,
      };

      const c = (f.category || '').toLowerCase();
      const s = (f.slug || '').toLowerCase();

      if (c.includes('multistore') || c.includes('cloud') || c.includes('intelligence') || s.includes('multi-store') || s.includes('bi')) {
        catMulti.push(item);
      } else if (c.includes('restaurant') || c.includes('kitchen') || s.includes('table') || s.includes('kds') || s.includes('qr')) {
        catDining.push(item);
      } else {
        catStore.push(item);
      }
    });

    const categories: MegaMenuCategory[] = [];
    if (catMulti.length > 0) {
      categories.push({
        categoryTitle: 'MULTI-STORE CLOUD HQ',
        items: catMulti.slice(0, 4),
      });
    }
    if (catStore.length > 0) {
      categories.push({
        categoryTitle: 'STOREFRONT & CHECKOUT',
        items: catStore.slice(0, 4),
      });
    }
    if (catDining.length > 0) {
      categories.push({
        categoryTitle: 'HOSPITALITY & DINING',
        items: catDining.slice(0, 4),
      });
    }

    return {
      promoCard: promo,
      displayCategories: categories.length > 0 ? categories : staticCategories,
    };
  }, [apiFeatures, staticPromo, staticCategories]);

  const renderMenuItem = (item: MegaMenuItem) => {
    const ItemIcon = item.icon;
    const isItemActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));

    return (
      <Link
        key={item.href + item.title}
        href={item.href}
        onClick={onClose}
        className={cn(
          'group/item flex items-center justify-between gap-2.5 p-2 rounded-xl border transition-all duration-200',
          isItemActive
            ? 'bg-primary/10 dark:bg-primary/20 border-primary/40 shadow-xs'
            : 'hover:bg-slate-50 dark:hover:bg-slate-900/60 border-transparent hover:border-slate-200 dark:hover:border-slate-800'
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 shadow-2xs',
              isItemActive
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 group-hover/item:border-primary/30 group-hover/item:bg-primary/5 group-hover/item:scale-105'
            )}
          >
            <ItemIcon
              size={15}
              className={isItemActive ? 'text-white stroke-[2.5]' : item.iconColor || 'text-primary'}
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'font-syne font-bold text-[12.5px] transition-colors block truncate leading-tight',
                  isItemActive ? 'text-primary font-black' : 'text-slate-900 dark:text-white group-hover/item:text-primary'
                )}
              >
                {item.title}
              </span>
              {isItemActive && (
                <span className="inline-flex items-center gap-1 text-[7.5px] font-black uppercase tracking-wider bg-primary text-white px-1 py-0.2 rounded-full shrink-0">
                  <Check size={7} strokeWidth={3} /> Active
                </span>
              )}
            </div>
            {item.desc && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 line-clamp-1 mt-0.5">
                {item.desc}
              </p>
            )}
          </div>
        </div>
        <ChevronRight
          size={13}
          className={cn(
            'transition-all duration-200 shrink-0 stroke-3',
            isItemActive
              ? 'opacity-100 text-primary translate-x-0'
              : 'opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-primary'
          )}
        />
      </Link>
    );
  };

  return (
    <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-7">
        {/* Left Promo Card */}
        {promoCard && (
          <div className="flex flex-col border-slate-200/80 pr-0 dark:border-slate-800/80 lg:col-span-3 lg:border-r lg:pr-6 h-full">
            <Link
              href={promoCard.href || '/features'}
              onClick={onClose}
              className="group/card relative flex flex-col justify-between h-full gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-slate-850 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
            >
              <div className="relative w-full h-44 sm:h-48 lg:h-46.25 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex items-center justify-center p-2.5">
                <Image
                  src={promoCard.imageSrc || '/images/nav_cloud_bundle_v2.png'}
                  alt={promoCard.title}
                  fill
                  sizes="280px"
                  className="object-contain p-1 group-hover/card:scale-105 transition-transform duration-500 drop-shadow-xs"
                />
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center gap-1 text-[8.5px] font-syne font-black uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full">
                    <Sparkles size={8.5} />
                    {promoCard.badge}
                  </span>
                </div>
              </div>

              <div className="space-y-1 min-w-0 pb-1">
                <div className="text-[14px] font-syne font-bold text-slate-900 dark:text-white group-hover/card:text-primary transition-colors leading-snug">
                  <span>{promoCard.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                  {promoCard.desc}
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* 3 Categories: MULTI-STORE, STOREFRONT, HOSPITALITY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:col-span-9">
          {displayCategories.map((cat: MegaMenuCategory) => (
            <div key={cat.categoryTitle} className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-syne font-black uppercase tracking-widest text-primary select-none px-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>{cat.categoryTitle}</span>
              </div>

              <div className="flex flex-col space-y-1">
                {cat.items.map(renderMenuItem)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>Unified multi-unit cloud POS infrastructure engineered for 500+ locations.</span>
        </div>
        <Link
          href="/features"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark font-syne font-bold hover:underline transition-colors select-none"
        >
          <span>Explore All Enterprise Features</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </MegaMenuWrapper>
  );
};

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
  CreditCard,
  ShieldCheck,
  Smartphone,
  Truck,
  Layers,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenuWrapper } from './MegaMenuWrapper';
import { INTEGRATIONS_MEGA_CONFIG } from '../../../config/navConfig';
import type { MegaMenuPromoCard, MegaMenuCategory, MegaMenuItem } from '../../../config/navTypes';
import { useGetIntegrationsQuery } from '@/features/Integrations/Service/IntegrationsService';

interface IntegrationsMegaMenuProps {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const IntegrationsMegaMenu: React.FC<IntegrationsMegaMenuProps> = ({
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const pathname = usePathname();
  const { promoCards, categories: staticCategories } = INTEGRATIONS_MEGA_CONFIG;

  const { data: apiIntegrations, isLoading } = useGetIntegrationsQuery({
    siteVariant: 'Enterprise',
    showInNavbar: true,
  });

  const displayCategories: MegaMenuCategory[] = useMemo(() => {
    if (!apiIntegrations || apiIntegrations.length === 0) {
      return staticCategories;
    }

    const getIconForItem = (slug: string = '', cat: string = '') => {
      const s = (slug || '').toLowerCase();
      const c = (cat || '').toLowerCase();
      if (s.includes('stripe') || c.includes('payment')) return { icon: CreditCard, color: 'text-indigo-500' };
      if (s.includes('authorize') || s.includes('vault')) return { icon: ShieldCheck, color: 'text-blue-600' };
      if (s.includes('square') || s.includes('terminal')) return { icon: Smartphone, color: 'text-slate-700 dark:text-slate-300' };
      if (s.includes('doordash')) return { icon: Truck, color: 'text-rose-500' };
      if (s.includes('uber')) return { icon: Truck, color: 'text-emerald-500' };
      if (c.includes('delivery')) return { icon: Truck, color: 'text-emerald-500' };
      if (c.includes('accounting') || c.includes('erp')) return { icon: Layers, color: 'text-cyan-500' };
      return { icon: Zap, color: 'text-primary' };
    };

    const groups: Record<string, MegaMenuItem[]> = {};

    apiIntegrations.forEach((item) => {
      const rawCat = (item.category || 'Other').toUpperCase();
      const catTitle =
        rawCat.includes('PAY') ? 'PAYMENT PROCESSORS' :
        rawCat.includes('DELIV') ? 'DELIVERY MARKETPLACES' :
        rawCat.includes('ERP') || rawCat.includes('ACCOUNT') ? 'ACCOUNTING & ERP' :
        `${rawCat} CONNECTORS`;

      if (!groups[catTitle]) {
        groups[catTitle] = [];
      }

      const { icon, color } = getIconForItem(item.slug || '', item.category || '');

      groups[catTitle].push({
        title: item.name,
        desc: item.tagline || item.description || '',
        href: `/integrations/${item.slug}`,
        icon,
        iconColor: color,
      });
    });

    return Object.entries(groups).map(([categoryTitle, items]) => ({
      categoryTitle,
      items,
    }));
  }, [apiIntegrations, staticCategories]);

  const renderMenuItem = (item: MegaMenuItem) => {
    const ItemIcon = item.icon;
    const isItemActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));

    return (
      <Link
        key={item.title}
        href={item.href}
        onClick={onClose}
        className={cn(
          "group/item flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all duration-200",
          isItemActive
            ? "bg-primary/10 dark:bg-primary/20 border-primary/40 shadow-xs"
            : "hover:bg-slate-50 dark:hover:bg-slate-900/60 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span
            className={cn(
              "flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 shadow-2xs",
              isItemActive
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-slate-100 dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 group-hover/item:border-primary/30 group-hover/item:bg-primary/5 group-hover/item:scale-105"
            )}
          >
            <ItemIcon
              size={15}
              className={isItemActive ? "text-white stroke-[2.5]" : item.iconColor || 'text-primary'}
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "font-syne font-bold text-[13.5px] transition-colors block leading-tight",
                  isItemActive ? "text-primary font-black" : "text-slate-900 dark:text-white group-hover/item:text-primary"
                )}
              >
                {item.title}
              </span>
              {isItemActive && (
                <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-wider bg-primary text-white px-1.5 py-0.2 rounded-full shrink-0">
                  <Check size={8} strokeWidth={3} /> Active
                </span>
              )}
            </div>
            {item.desc && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 mt-0.5">
                {item.desc}
              </p>
            )}
          </div>
        </div>
        <ChevronRight
          size={14}
          className={cn(
            "transition-all duration-200 shrink-0 stroke-3",
            isItemActive ? "opacity-100 text-primary translate-x-0" : "opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-primary"
          )}
        />
      </Link>
    );
  };

  if (isLoading) {
    return (
      <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8 w-full animate-pulse">
          {/* Left Promo Card Skeleton (4 cols) */}
          <div className="flex flex-col border-slate-200/80 pr-0 dark:border-slate-800/80 lg:col-span-4 lg:border-r lg:pr-7 h-full">
            <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full gap-3.5">
              <div className="w-full h-44 sm:h-48 lg:h-46.25 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-3 relative">
                <div className="absolute top-2 left-2 h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-20 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="space-y-2 pb-1">
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          {/* 2 Category Columns Skeleton (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {[1, 2].map((col) => (
              <div key={col} className="space-y-2.5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {[1, 2, 3].map((row) => (
                    <div key={row} className="flex items-center gap-3 p-3 rounded-2xl border border-transparent bg-slate-50/50 dark:bg-slate-900/40">
                      <div className="h-8.5 w-8.5 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-2.5 w-44 rounded bg-slate-100 dark:bg-slate-800/80" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Skeleton Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <div className="h-3 w-72 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </MegaMenuWrapper>
    );
  }

  return (
    <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8 w-full">
        {/* Left Promo Card (4 cols) */}
        {promoCards && promoCards.length > 0 && (
          <div className="flex flex-col border-slate-200/80 pr-0 dark:border-slate-800/80 lg:col-span-4 lg:border-r lg:pr-7 h-full">
            {promoCards.map((card: MegaMenuPromoCard, idx: number) => (
              <Link
                key={idx}
                href={card.href || '/integrations'}
                onClick={onClose}
                className="group/card relative flex flex-col justify-between h-full gap-3.5 p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-slate-850 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
              >
                <div className="relative w-full h-44 sm:h-48 lg:h-46.25 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex items-center justify-center p-2.5">
                  <Image
                    src={card.imageSrc || '/images/nav_payment_bundle.png'}
                    alt={card.title}
                    fill
                    sizes="280px"
                    className="object-contain p-2.5 group-hover/card:scale-105 transition-transform duration-500 drop-shadow-xs"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 text-[8.5px] font-syne font-black uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full">
                      <Sparkles size={8.5} />
                      {card.badge}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 min-w-0 pb-1">
                  <div className="text-[14px] font-syne font-bold text-slate-900 dark:text-white group-hover/card:text-primary transition-colors leading-snug">
                    <span>{card.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 2 Categories: Generous 2-Column Grid (8 cols, wide and untruncated) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {displayCategories.map((cat: MegaMenuCategory) => (
            <div key={cat.categoryTitle} className="space-y-2.5">
              <div className="flex items-center gap-2 text-[10px] font-syne font-black uppercase tracking-widest text-primary select-none px-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>{cat.categoryTitle}</span>
              </div>

              <div className="flex flex-col space-y-1.5">
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
          <span>Connect your enterprise ERP, payment fleets, and omnichannel channels with 1-click sync.</span>
        </div>
        <Link
          href="/integrations"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark font-syne font-bold hover:underline transition-colors select-none"
        >
          <span>View All Enterprise Integrations</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </MegaMenuWrapper>
  );
};

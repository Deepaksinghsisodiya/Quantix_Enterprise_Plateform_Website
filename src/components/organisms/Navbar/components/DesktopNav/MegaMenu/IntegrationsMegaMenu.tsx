'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { MegaMenuWrapper } from './MegaMenuWrapper';
import { INTEGRATIONS_MEGA_CONFIG } from '../../../config/navConfig';
import type { MegaMenuPromoCard, MegaMenuCategory, MegaMenuItem } from '../../../config/navTypes';

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
  const { promoCards, categories } = INTEGRATIONS_MEGA_CONFIG;

  const renderMenuItem = (item: MegaMenuItem) => {
    const ItemIcon = item.icon;
    return (
      <Link
        key={item.title}
        href={item.href}
        onClick={onClose}
        className="group/item flex items-center justify-between gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800 transition-all duration-200"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 group-hover/item:border-primary/30 group-hover/item:bg-primary/5 group-hover/item:scale-105 transition-all duration-200 shadow-2xs">
            <ItemIcon size={15} className={item.iconColor || 'text-primary'} />
          </span>
          <div className="min-w-0 flex-1">
            <span className="font-syne font-bold text-[13px] text-slate-900 dark:text-white group-hover/item:text-primary transition-colors block truncate leading-tight">
              {item.title}
            </span>
            {item.desc && (
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 line-clamp-1 mt-0.5">
                {item.desc}
              </p>
            )}
          </div>
        </div>
        <ChevronRight
          size={14}
          className="opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-primary transition-all duration-200 shrink-0 stroke-3"
        />
      </Link>
    );
  };

  return (
    <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-7">
        {/* Left Promo Card */}
        {promoCards && promoCards.length > 0 && (
          <div className="flex flex-col border-slate-200/80 pr-0 dark:border-slate-800/80 lg:col-span-3 lg:border-r lg:pr-6 h-full">
            {promoCards.map((card: MegaMenuPromoCard, idx: number) => (
              <Link
                key={idx}
                href={card.href || '/integrations'}
                onClick={onClose}
                className="group/card relative flex flex-col justify-between h-full gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-slate-850 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
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
                  <div className="flex items-center justify-between text-[14px] font-syne font-bold text-slate-900 dark:text-white group-hover/card:text-primary transition-colors leading-snug">
                    <span className="truncate">{card.title}</span>
                    <ChevronRight
                      size={15}
                      className="shrink-0 transition-transform group-hover/card:translate-x-1 text-primary stroke-3"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 2 Categories: PAYMENT PROCESSORS, ERP & MARKETPLACES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-9">
          {categories.map((cat: MegaMenuCategory) => (
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

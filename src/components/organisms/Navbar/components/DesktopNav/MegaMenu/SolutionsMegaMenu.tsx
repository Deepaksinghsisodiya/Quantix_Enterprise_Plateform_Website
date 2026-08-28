'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenuWrapper } from './MegaMenuWrapper';
import { SOLUTIONS_MEGA_CONFIG } from '../../../config/navConfig';

interface SolutionsMegaMenuProps {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const SolutionsMegaMenu: React.FC<SolutionsMegaMenuProps> = ({
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const pathname = usePathname();
  const { promoCards, categories } = SOLUTIONS_MEGA_CONFIG;

  return (
    <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-12 gap-8 items-stretch">
        {/* Left Column: 2 Ultra-Modern Featured Cards (4 cols) */}
        {promoCards && promoCards.length > 0 && (
          <div className="col-span-4 border-r border-slate-200/80 dark:border-slate-800/80 pr-8 flex flex-col gap-4 justify-between">
            {promoCards.map((card, idx) => {
              const isCardActive = card.href && pathname.startsWith(card.href);
              return (
                <Link
                  key={idx}
                  href={card.href || '/solutions'}
                  onClick={onClose}
                  className={cn(
                    "group/card relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden",
                    isCardActive
                      ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-500/40 shadow-xs"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-850"
                  )}
                >
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 bg-transparent flex items-center justify-center p-1">
                    <Image
                      src={card.imageSrc || '/images/foodhub_bundle_mockup.png'}
                      alt={card.title}
                      fill
                      sizes="90px"
                      className="object-contain p-0.5 group-hover/card:scale-105 transition-transform duration-300 drop-shadow-xs"
                    />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[9px] font-syne font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-900/30 border border-amber-300/40 px-2.5 py-0.5 rounded-full">
                        <Sparkles size={9} />
                        {card.badge}
                      </span>
                      {isCardActive && (
                        <span className="text-[8px] font-black uppercase tracking-widest bg-amber-600 text-white px-1.5 py-0.2 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[14px] font-syne font-bold text-slate-900 dark:text-white group-hover/card:text-amber-600 dark:group-hover/card:text-amber-400 transition-colors leading-snug">
                      <span className="truncate">{card.title}</span>
                      <ArrowRight
                        size={14}
                        className="shrink-0 transition-transform group-hover/card:translate-x-1 text-amber-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Right Columns: Clean 2-Column Grid (8 cols) */}
        <div className="col-span-8 space-y-3">
          {categories.map((cat: any) => (
            <div key={cat.categoryTitle} className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-syne font-black uppercase tracking-widest text-primary select-none px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>{cat.categoryTitle}</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5 max-w-2xl">
                {cat.items.map((item: any, idx: number) => {
                  const ItemIcon = item.icon;
                  const isItemActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={`${cat.categoryTitle}-${item.title}-${idx}`}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group/item flex items-start gap-3.5 p-3 rounded-2xl border transition-all duration-200",
                        isItemActive
                          ? "bg-primary/10 dark:bg-primary/20 border-primary/40 shadow-xs"
                          : "hover:bg-slate-50 dark:hover:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 shadow-2xs mt-0.5",
                          isItemActive
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 group-hover/item:border-primary/40 group-hover/item:bg-primary/10 group-hover/item:scale-110"
                        )}
                      >
                        <ItemIcon
                          size={16}
                          className={isItemActive ? "text-white stroke-[2.5]" : item.iconColor || 'text-primary'}
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-syne font-bold text-[13.5px] transition-colors",
                              isItemActive ? "text-primary font-black" : "text-slate-900 dark:text-white group-hover/item:text-primary"
                            )}
                          >
                            {item.title}
                          </span>
                          {isItemActive && (
                            <span className="inline-flex items-center gap-1 text-[8.5px] font-black uppercase tracking-wider bg-primary text-white px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                              <Check size={9} strokeWidth={3} /> Active
                            </span>
                          )}
                          {item.badge && !isItemActive && (
                            <span className="text-[8px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.2 rounded-md shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 mt-0.5 line-clamp-2">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MegaMenuWrapper>
  );
};

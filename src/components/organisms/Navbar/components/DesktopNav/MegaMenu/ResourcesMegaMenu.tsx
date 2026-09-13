'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenuWrapper } from './MegaMenuWrapper';
import { RESOURCES_MEGA_CONFIG, getActiveMenuHref } from '../../../config/navConfig';

interface ResourcesMegaMenuProps {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ResourcesMegaMenu: React.FC<ResourcesMegaMenuProps> = ({
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const pathname = usePathname();
  const { promoCards, categories } = RESOURCES_MEGA_CONFIG;

  const allMenuItems = React.useMemo(() => {
    return categories.flatMap((cat) => cat.items);
  }, [categories]);

  const activeHref = React.useMemo(() => {
    return getActiveMenuHref(allMenuItems, pathname);
  }, [allMenuItems, pathname]);

  return (
    <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8 w-full">
        {/* Left Column: Featured Guides (4 cols, flush left) */}
        {promoCards && promoCards.length > 0 && (
          <div className="flex flex-col border-slate-200/80 pr-0 dark:border-slate-800/80 lg:col-span-4 lg:border-r lg:pr-7 h-full">
            {promoCards.map((card, idx) => (
              <Link
                key={idx}
                href={card.href || '/resources'}
                onClick={onClose}
                className="group/card relative flex flex-col justify-between h-full gap-3.5 p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-850 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
              >
                <div className="relative w-full h-44 sm:h-48 lg:h-46.25 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex items-center justify-center p-2.5">
                  <Image
                    src={card.imageSrc || '/images/nav_cloud_bundle.png'}
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

        {/* Right Columns: 2 Ultra-Modern 2-Line Item Grids (8 cols / 2 sub-cols, wide) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {categories.map((cat) => (
            <div key={cat.categoryTitle} className="space-y-2.5">
              <div className="flex items-center gap-2 text-[10px] font-syne font-black uppercase tracking-widest text-primary select-none px-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>{cat.categoryTitle}</span>
              </div>

              <div className="flex flex-col space-y-1.5">
                {cat.items.map((item) => {
                  const ItemIcon = item.icon;
                  const isItemActive = item.href === activeHref;

                  return (
                    <Link
                      key={`${cat.categoryTitle}-${item.title}`}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group/item flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all duration-200",
                        isItemActive
                          ? "bg-primary/10 dark:bg-primary/20 border-primary/40 shadow-xs"
                          : "hover:bg-slate-50 dark:hover:bg-slate-900/60 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span
                          className={cn(
                            "flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 shadow-2xs",
                            isItemActive
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 group-hover/item:border-primary/40 group-hover/item:bg-primary/10 group-hover/item:scale-105"
                          )}
                        >
                          <ItemIcon
                            size={15}
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
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 mt-0.5">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Hover Chevron Arrow on Right Side */}
                      <ChevronRight
                        size={14}
                        className={cn(
                          "transition-all duration-200 shrink-0 stroke-3",
                          isItemActive
                            ? "opacity-100 text-primary translate-x-0"
                            : "opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-primary"
                        )}
                      />
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

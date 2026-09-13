'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Check, ExternalLink, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenuWrapper } from './MegaMenuWrapper';
import { PRODUCTS_MEGA_CONFIG } from '../../../config/navConfig';

interface ProductsMegaMenuProps {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ProductsMegaMenu: React.FC<ProductsMegaMenuProps> = ({
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const pathname = usePathname();
  const { promoCards, categories } = PRODUCTS_MEGA_CONFIG;

  return (
    <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8 w-full">
        {/* Left Column: 2 Featured Subdomain Redirect Cards (5 cols, flush to left) */}
        {promoCards && promoCards.length > 0 && (
          <div className="lg:col-span-5 border-r border-slate-200/80 dark:border-slate-800/80 pr-8 flex flex-col gap-4 justify-between">
            {promoCards.map((card, idx) => {
              const isExternal = card.href?.startsWith('http://') || card.href?.startsWith('https://');

              return (
                <Link
                  key={idx}
                  href={card.href || '/products'}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="group/card relative flex items-center gap-4.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50/70 dark:hover:bg-slate-850 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
                >
                  {/* Top-Right Subdomain Badge */}
                  {isExternal && (
                    <div className="absolute top-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 border border-primary/30 px-3 py-1 rounded-full shadow-2xs">
                        <ExternalLink size={11} strokeWidth={2.5} />
                        Subdomain
                      </span>
                    </div>
                  )}

                  {/* Enlarged Image to fill height with zero gap */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-transparent flex items-center justify-center p-1">
                    <Image
                      src={card.imageSrc || '/images/foodhub_bundle_mockup.png'}
                      alt={card.title}
                      fill
                      sizes="120px"
                      className="object-contain p-0.5 group-hover/card:scale-105 transition-transform duration-300 drop-shadow-xs"
                    />
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[8.5px] font-syne font-black uppercase tracking-wider text-primary-dark dark:text-primary-light bg-primary/10 dark:bg-primary/20 border border-primary/20 px-2 py-0.5 rounded-full">
                        <Sparkles size={8.5} />
                        {card.badge}
                      </span>
                    </div>
                    <div className="text-[14.5px] font-syne font-bold text-slate-900 dark:text-white group-hover/card:text-primary transition-colors leading-snug">
                      <span>{card.title}</span>
                    </div>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Right Columns: Product Categories (7 cols) with Hover Chevron Arrow */}
        <div className="lg:col-span-7 flex flex-col justify-between py-1">
          <div className="space-y-4.5">
            {categories.map((cat: any) => (
              <div key={cat.categoryTitle} className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-syne font-black uppercase tracking-widest text-primary select-none px-1 border-b border-slate-100 dark:border-slate-800 pb-1.5 w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{cat.categoryTitle}</span>
                </div>

                <div className="flex flex-col space-y-2 items-start">
                  {cat.items.map((item: any) => {
                    const ItemIcon = item.icon;
                    const isItemActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));

                    return (
                      <Link
                        key={`${cat.categoryTitle}-${item.title}`}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group/item inline-flex items-center justify-between gap-4 p-2.5 px-4 rounded-2xl border transition-all duration-200 w-fit max-w-full",
                          isItemActive
                            ? "bg-primary/10 dark:bg-primary/20 border-primary/40 shadow-xs"
                            : "hover:bg-slate-50 dark:hover:bg-slate-900/60 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                        )}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className={cn(
                              "flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 shadow-2xs",
                              isItemActive
                                ? "bg-primary text-white border-primary shadow-sm"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 group-hover/item:border-primary/40 group-hover/item:bg-primary/10 group-hover/item:scale-105"
                            )}
                          >
                            <ItemIcon
                              size={16}
                              className={isItemActive ? "text-white stroke-[2.5]" : item.iconColor || 'text-primary'}
                            />
                          </span>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "font-syne font-bold text-[13.5px] transition-colors whitespace-nowrap",
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
                            </div>
                            {item.desc && (
                              <span className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap mt-0.5">
                                {item.desc}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Hover Chevron Arrow on Right-Side Item */}
                        <ChevronRight
                          size={14}
                          className={cn(
                            "transition-all duration-200 shrink-0 stroke-3 ml-2",
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
      </div>
    </MegaMenuWrapper>
  );
};

export default ProductsMegaMenu;

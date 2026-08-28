'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Sparkles, Check, ExternalLink } from 'lucide-react';
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
      <div className="grid grid-cols-12 gap-7 items-stretch">
        {/* Left Column: 2 Featured Subdomain Redirect Cards (5 cols) */}
        {promoCards && promoCards.length > 0 && (
          <div className="col-span-5 border-r border-slate-200/80 dark:border-slate-800/80 pr-7 flex flex-col gap-3 justify-between">
            {promoCards.map((card, idx) => {
              const isExternal = card.href?.startsWith('http://') || card.href?.startsWith('https://');

              return (
                <Link
                  key={idx}
                  href={card.href || '/products'}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="group/card relative flex items-center gap-3.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50/70 dark:hover:bg-slate-850 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
                >
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-transparent flex items-center justify-center p-1">
                    <Image
                      src={card.imageSrc || '/images/foodhub_bundle_mockup.png'}
                      alt={card.title}
                      fill
                      sizes="80px"
                      className="object-contain p-0.5 group-hover/card:scale-105 transition-transform duration-300 drop-shadow-xs"
                    />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[8.5px] font-syne font-black uppercase tracking-wider text-primary-dark dark:text-primary-light bg-primary/10 dark:bg-primary/20 border border-primary/20 px-2 py-0.5 rounded-full">
                        <Sparkles size={8.5} />
                        {card.badge}
                      </span>
                      {isExternal && (
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-slate-400 dark:text-slate-500">
                          <ExternalLink size={9} /> Subdomain
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[13.5px] font-syne font-bold text-slate-900 dark:text-white group-hover/card:text-primary transition-colors leading-snug">
                      <span className="truncate">{card.title}</span>
                      <ArrowRight
                        size={13}
                        className="shrink-0 transition-transform group-hover/card:translate-x-1 text-primary"
                      />
                    </div>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-snug line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Right Columns: Compact Sleek Product Categories (7 cols) */}
        <div className="col-span-7 flex flex-col justify-between py-0.5">
          <div className="space-y-3 max-w-md">
            {categories.map((cat: any) => (
              <div key={cat.categoryTitle} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[9.5px] font-syne font-black uppercase tracking-widest text-primary select-none px-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{cat.categoryTitle}</span>
                </div>

                <div className="space-y-1.5">
                  {cat.items.map((item: any) => {
                    const ItemIcon = item.icon;
                    const isItemActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));

                    return (
                      <Link
                        key={`${cat.categoryTitle}-${item.title}`}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group/item flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200",
                          isItemActive
                            ? "bg-primary/10 dark:bg-primary/20 border-primary/40 shadow-xs"
                            : "hover:bg-slate-50 dark:hover:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 shadow-2xs",
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
                                "font-syne font-bold text-[13px] transition-colors",
                                isItemActive ? "text-primary font-black" : "text-slate-900 dark:text-white group-hover/item:text-primary"
                              )}
                            >
                              {item.title}
                            </span>
                            {isItemActive && (
                              <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-wider bg-primary text-white px-1.5 py-0.2 rounded-full shrink-0 shadow-2xs">
                                <Check size={8} strokeWidth={3} /> Active
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-snug group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 line-clamp-1 mt-0.5">
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
      </div>
    </MegaMenuWrapper>
  );
};

export default ProductsMegaMenu;

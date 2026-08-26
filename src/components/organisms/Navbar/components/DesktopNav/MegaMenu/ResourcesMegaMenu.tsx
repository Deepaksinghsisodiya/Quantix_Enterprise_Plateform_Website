'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MegaMenuWrapper } from './MegaMenuWrapper';
import { RESOURCES_MEGA_CONFIG } from '../../../config/navConfig';

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
  const { promoCards, categories } = RESOURCES_MEGA_CONFIG;

  return (
    <MegaMenuWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grid grid-cols-12 gap-8 items-stretch">
        {/* Left Column: 2 Ultra-Modern Featured Cards (4 cols) */}
        {promoCards && promoCards.length > 0 && (
          <div className="col-span-4 border-r border-slate-200/80 dark:border-slate-800/80 pr-8 flex flex-col gap-4 justify-between">
            {promoCards.map((card, idx) => (
              <Link
                key={idx}
                href={card.href || '/help'}
                onClick={onClose}
                className="group/card relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-850 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
              >
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex items-center justify-center p-1.5">
                  <Image
                    src={card.imageSrc || '/images/nav_cloud_bundle.png'}
                    alt={card.title}
                    fill
                    sizes="90px"
                    className="object-contain p-0.5 group-hover/card:scale-105 transition-transform duration-300 drop-shadow-xs"
                  />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <span className="inline-flex items-center gap-1 text-[9px] font-syne font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 border border-blue-300/40 px-2.5 py-0.5 rounded-full">
                    <Sparkles size={9} />
                    {card.badge}
                  </span>
                  <div className="flex items-center justify-between text-[14px] font-syne font-bold text-slate-900 dark:text-white group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors leading-snug">
                    <span className="truncate">{card.title}</span>
                    <ArrowRight
                      size={14}
                      className="shrink-0 transition-transform group-hover/card:translate-x-1 text-blue-500"
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

        {/* Right Columns: 2 Ultra-Modern 2-Line Item Grids (8 cols / 2 sub-cols) */}
        <div className="col-span-8 grid grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div key={cat.categoryTitle} className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-syne font-black uppercase tracking-widest text-primary select-none px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>{cat.categoryTitle}</span>
              </div>

              <div className="flex flex-col space-y-1.5">
                {cat.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="group/item flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-200"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 group-hover/item:border-primary/40 group-hover/item:bg-primary/10 group-hover/item:scale-110 transition-all duration-200 shadow-2xs mt-0.5">
                        <ItemIcon size={16} className={item.iconColor || 'text-primary'} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-syne font-bold text-[13.5px] text-slate-900 dark:text-white group-hover/item:text-primary transition-colors truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.2 rounded-md shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 line-clamp-1 mt-0.5">
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

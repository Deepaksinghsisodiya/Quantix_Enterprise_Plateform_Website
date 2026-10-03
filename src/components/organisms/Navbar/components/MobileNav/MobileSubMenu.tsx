'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MobileMenuSection } from '../../config/navTypes';
import { getActiveMenuHref } from '../../config/navConfig';

interface MobileSubMenuProps {
  activeSection: MobileMenuSection;
  pathname: string;
  onBack: () => void;
  onClose: () => void;
}

export const MobileSubMenu: React.FC<MobileSubMenuProps> = ({
  activeSection,
  pathname,
  onBack,
  onClose,
}) => {
  const allSubItems = React.useMemo(() => {
    return activeSection.groups.flatMap((group) => group.items);
  }, [activeSection]);

  const activeSubHref = React.useMemo(() => {
    return getActiveMenuHref(allSubItems, pathname);
  }, [allSubItems, pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
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

        {/* Featured Products / Subdomains (Matches Desktop MegaMenu) */}
        {activeSection.promoCards && activeSection.promoCards.length > 0 ? (
          <div className="space-y-2.5">
            <span className="block px-1 text-[10px] font-extrabold uppercase tracking-normal text-primary">
              Featured Systems &amp; Subdomains
            </span>
            <div className="flex flex-col gap-2.5">
              {activeSection.promoCards.map((card, idx) => {
                const isExternal = card.href?.startsWith('http://') || card.href?.startsWith('https://');

                return (
                  <Link
                    key={idx}
                    href={card.href || '/features'}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    onClick={onClose}
                    className="group/card relative flex items-center gap-3.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-primary/50 transition-all overflow-hidden"
                  >
                    {/* Visual Mockup */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-transparent flex items-center justify-center p-0.5">
                      <Image
                        src={card.imageSrc || '/images/nav_restaurant_bundle.png'}
                        alt={card.title}
                        fill
                        sizes="90px"
                        className="object-contain drop-shadow-sm group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className="inline-flex items-center gap-1 text-[8.5px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          <Sparkles size={8} />
                          {card.badge}
                        </span>
                        {isExternal && (
                          <span className="inline-flex items-center gap-1 text-[8.5px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded-full">
                            <ExternalLink size={8.5} />
                            Subdomain
                          </span>
                        )}
                      </div>
                      <h4 className="font-syne text-[13.5px] font-bold text-slate-900 dark:text-white leading-tight group-hover/card:text-primary transition-colors">
                        {card.title}
                      </h4>
                      <p className="mt-1 text-[11px] font-medium leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                        {card.desc}
                      </p>
                    </div>

                    <ChevronRight
                      size={15}
                      className="shrink-0 text-slate-300 group-hover/card:text-primary group-hover/card:translate-x-0.5 transition-all"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          /* Header Visual Card with Hardware Mockup */
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
        )}

        {/* Sub-items List */}
        <div className="space-y-4">
          {activeSection.groups.map((group) => (
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
                      key={`${group.title}-${item.title}`}
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

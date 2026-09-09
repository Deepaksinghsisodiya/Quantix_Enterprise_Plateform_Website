// src/features/Clientele/components/ClienteleMarquee.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClientBrandDto } from '../Types/ClienteleTypes';
import { ATMSkeleton } from '@/components/atoms';
import {
  Building2,
  Store,
  Sparkles,
  Coffee,
  ShoppingBag,
  UtensilsCrossed,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClienteleMarqueeProps {
  clientele?: ClientBrandDto[];
  isLoading?: boolean;
}

const getCategoryIcon = (industry?: string, category?: string) => {
  const norm = `${industry || ''} ${category || ''}`.toLowerCase();
  if (norm.includes('coffee') || norm.includes('cafe')) return Coffee;
  if (norm.includes('restaurant') || norm.includes('hospitality') || norm.includes('dining')) return UtensilsCrossed;
  if (norm.includes('retail') || norm.includes('shop') || norm.includes('store')) return ShoppingBag;
  if (norm.includes('franchise')) return Store;
  return Building2;
};

// Single Brand Card (1:1 styling with Integration Card)
const BrandCard = ({ brand, idx }: { brand: ClientBrandDto; idx: number }) => {
  const [imgError, setImgError] = useState(false);
  const brandName = brand.title || brand.name || 'Brand Partner';
  const brandIndustry = brand.industry || brand.category || 'Enterprise';
  const Icon = getCategoryIcon(brand.industry, brand.category);
  const href = brand.websiteUrl || brand.linkUrl;
  const logoUrl =
    !imgError && (brand.logoUrl || (brand.mediaAssetId ? `/api/v1/media/${brand.mediaAssetId}/file` : undefined));

  const cardContent = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="w-52 sm:w-60 h-28 sm:h-32 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-4 shrink-0 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group relative select-none"
    >
      {/* Featured Star Badge */}
      {brand.isFeatured && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[8.5px] font-syne font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
          <span>Featured</span>
        </div>
      )}

      {/* Brand Logo Container */}
      <div className="h-10 sm:h-12 w-full flex items-center justify-center p-1">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${brandName} logo`}
            className="max-h-full max-w-[140px] object-contain filter dark:brightness-110 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center gap-2 text-primary font-syne font-bold text-sm">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="w-4 h-4" />
            </div>
            <span className="truncate max-w-[110px] text-slate-900 dark:text-white font-bold">{brandName}</span>
          </div>
        )}
      </div>

      {/* Brand Name & Category Badge */}
      <div className="flex items-center justify-center gap-2 mt-2 w-full px-1">
        <span className="text-xs font-syne font-bold text-slate-900 dark:text-white leading-tight truncate">
          {brandName}
        </span>
        <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 shrink-0">
          {brandIndustry}
        </span>
        {href && (
          <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-opacity shrink-0" />
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        key={`client-${brand.clientLogoId || brand.id || brandName}-${idx}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${brandName}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl shrink-0"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div key={`client-${brand.clientLogoId || brand.id || brandName}-${idx}`} className="shrink-0">
      {cardContent}
    </div>
  );
};

export const ClienteleMarquee: React.FC<ClienteleMarqueeProps> = ({
  clientele = [],
  isLoading = false,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Skeleton Loading State
  if (isLoading) {
    return (
      <div className="py-16 sm:py-24 text-slate-900 dark:text-white overflow-hidden relative select-none transition-colors">
        <div className="site-container mb-10 sm:mb-14 text-center relative z-10">
          <ATMSkeleton variant="rounded" className="h-6 w-44 mx-auto mb-3 rounded-full bg-primary/10" />
          <ATMSkeleton variant="text" className="h-9 w-72 sm:w-96 mx-auto mb-3 rounded-lg" />
          <ATMSkeleton variant="text" className="h-4 w-60 sm:w-80 mx-auto rounded" />
        </div>

        <div className="flex gap-4 sm:gap-6 shrink-0 items-center justify-center overflow-hidden py-3 px-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={`skeleton-${item}`}
              className="w-52 sm:w-60 h-28 sm:h-32 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-4 shrink-0 flex flex-col items-center justify-center text-center shadow-xs"
            >
              <ATMSkeleton variant="rounded" className="h-10 w-28 rounded-lg mb-3" />
              <div className="flex items-center gap-2">
                <ATMSkeleton variant="text" className="h-3.5 w-20 rounded" />
                <ATMSkeleton variant="badge" className="h-4 w-14 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Filter Active Brands
  const activeBrands = clientele
    .filter((brand) => brand.isActive !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  if (activeBrands.length === 0) {
    return null;
  }

  // Create an even repeated list so Framer Motion's -50% loop matches seamlessly
  const repeatCount = Math.max(6, Math.ceil(18 / activeBrands.length));
  const safeRepeat = repeatCount % 2 === 0 ? repeatCount : repeatCount + 1;
  const duplicatedList = Array(safeRepeat).fill(activeBrands).flat();

  // Dynamic duration scaling with item count for a smooth, natural glide
  const slideDuration = Math.max(35, (duplicatedList.length / 2) * 4);

  return (
    <div className="py-16 sm:py-24 text-slate-900 dark:text-white overflow-hidden relative select-none transition-colors">
      {/* Section Header matching Integrations Style */}
      <div className="site-container mb-10 sm:mb-14 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary-dark dark:text-primary-light mb-3">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>ENTERPRISE CLIENTELE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-semibold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Trusted by High-Volume <span className="text-primary dark:text-primary-light">Brands & Franchises</span>
        </h2>

        <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
          Industry leaders across retail, dining, and multi-unit hospitality power daily mission-critical operations with Quantix.
        </p>
      </div>

      {/* Sliding Track with Gradient Fades */}
      <div
        className="flex w-full overflow-hidden relative z-10 py-3"
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setIsPaused(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') setIsPaused(false);
        }}
      >
        {/* Left and Right Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 md:w-40 lg:w-56 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 md:w-40 lg:w-56 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 z-20 pointer-events-none" />

        {/* Framer Motion Seamless Infinite Slider */}
        <motion.div
          animate={isPaused ? { x: undefined } : { x: ['0%', '-50%'] }}
          transition={
            isPaused
              ? { duration: 0 }
              : { duration: slideDuration, ease: 'linear', repeat: Infinity }
          }
          className="flex gap-4 sm:gap-6 shrink-0 items-center"
        >
          {duplicatedList.map((brand, idx) => (
            <BrandCard key={`slide-${brand.clientLogoId || idx}-${idx}`} brand={brand} idx={idx} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClienteleMarquee;

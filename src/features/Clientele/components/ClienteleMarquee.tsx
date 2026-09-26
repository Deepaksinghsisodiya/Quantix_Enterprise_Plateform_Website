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
  CheckCircle2,
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

// Single Brand Card (High-End Enterprise Card - Option 1)
const BrandCard = ({ brand, idx }: { brand: ClientBrandDto; idx: number }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const brandName = brand.title || brand.name || 'Brand Partner';
  const brandIndustry = brand.industry || brand.category || 'Enterprise';
  const Icon = getCategoryIcon(brand.industry, brand.category);
  const href = brand.websiteUrl || brand.linkUrl;
  const logoUrl =
    !imgError && (brand.logoUrl || (brand.mediaAssetId ? `/api/v1/media/${brand.mediaAssetId}/file` : undefined));

  const cardContent = (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="w-64 sm:w-72 h-40 sm:h-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-4 shrink-0 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-orange-500/60 dark:hover:border-orange-500/60 transition-all cursor-pointer group relative select-none overflow-hidden"
    >
      {/* Subtle Brand Ambient Glow on Hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_right,#FF4F0012,transparent_70%)]" />

      {/* Top Bar: Category Pill & Status Badge */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          <Icon className="w-3 h-3 text-[#FF4F00]" />
          <span>{brandIndustry}</span>
        </div>

        {brand.isFeatured ? (
          <div className="flex items-center gap-1 text-[9px] font-syne font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 shadow-2xs">
            <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
            <span>Featured</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400 dark:text-slate-500">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Center: Brand Logo in Crisp Backplate Viewport */}
      <div className="relative h-16 w-full flex items-center justify-center bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800/70 z-10 overflow-hidden">
        {logoUrl ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700/80 rounded-xl" />
            )}
            <img
              src={logoUrl}
              alt={`${brandName} logo`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={cn(
                'max-h-full max-w-full object-contain filter dark:brightness-110 transition-all duration-300 group-hover:scale-105',
                !imgLoaded ? 'opacity-0' : 'opacity-100'
              )}
              loading="lazy"
            />
          </>
        ) : (
          <div className="flex items-center gap-2.5 text-[#FF4F00] font-syne font-bold text-sm">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-slate-900 dark:text-white font-bold">{brandName}</span>
          </div>
        )}
      </div>

      {/* Bottom Bar: Full Brand Name (No Truncation) & Scale Info */}
      <div className="flex items-center justify-between gap-2 relative z-10 pt-1 border-t border-slate-100 dark:border-slate-800/60">
        <h4 className="text-xs sm:text-sm font-syne font-bold text-slate-950 dark:text-white group-hover:text-[#FF4F00] transition-colors leading-tight line-clamp-1">
          {brandName}
        </h4>

        <div className="flex items-center gap-1 shrink-0">
          {brand.locationsCount ? (
            <span className="text-[9.5px] font-mono font-bold text-slate-400 dark:text-slate-500">
              {brand.locationsCount}+ Units
            </span>
          ) : (
            <span className="text-[9.5px] font-mono font-medium text-slate-400 dark:text-slate-500">
              {brand.tier || 'Enterprise'}
            </span>
          )}

          {href && (
            <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-[#FF4F00] transition-opacity ml-1" />
          )}
        </div>
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
        className="block outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl shrink-0"
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
          <ATMSkeleton variant="rounded" className="h-6 w-44 mx-auto mb-3 rounded-full bg-orange-500/10" />
          <ATMSkeleton variant="text" className="h-9 w-72 sm:w-96 mx-auto mb-3 rounded-lg" />
          <ATMSkeleton variant="text" className="h-4 w-60 sm:w-80 mx-auto rounded" />
        </div>

        <div className="flex gap-4 sm:gap-6 shrink-0 items-center justify-center overflow-hidden py-4 px-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={`skeleton-${item}`}
              className="w-64 sm:w-72 h-40 sm:h-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-4 shrink-0 flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-center justify-between">
                <ATMSkeleton variant="badge" className="h-4 w-20 rounded" />
                <ATMSkeleton variant="badge" className="h-4 w-14 rounded" />
              </div>
              <ATMSkeleton variant="rounded" className="h-16 w-full rounded-xl my-2" />
              <div className="flex items-center justify-between pt-1">
                <ATMSkeleton variant="text" className="h-4 w-28 rounded" />
                <ATMSkeleton variant="text" className="h-3 w-16 rounded" />
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
  const slideDuration = Math.max(35, (duplicatedList.length / 2) * 4.5);

  return (
    <div className="py-16 sm:py-24 text-slate-900 dark:text-white overflow-hidden relative select-none transition-colors">
      {/* Section Header */}
      <div className="site-container mb-10 sm:mb-14 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-black uppercase tracking-widest text-[#FF4F00] mb-3">
          <span className="h-2 w-2 rounded-full bg-[#FF4F00] animate-pulse" />
          <span>ENTERPRISE CLIENTELE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Trusted by High-Volume{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
            Brands & Franchises
          </span>
        </h2>

        <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 font-normal max-w-xl mx-auto leading-relaxed">
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
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-44 lg:w-60 bg-linear-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-44 lg:w-60 bg-linear-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-20 pointer-events-none" />

        {/* Framer Motion Seamless Infinite Slider */}
        <motion.div
          animate={isPaused ? { x: undefined } : { x: ['0%', '-50%'] }}
          transition={
            isPaused
              ? { duration: 0 }
              : { duration: slideDuration, ease: 'linear', repeat: Infinity }
          }
          className="flex gap-4 sm:gap-6 shrink-0 items-center py-2"
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

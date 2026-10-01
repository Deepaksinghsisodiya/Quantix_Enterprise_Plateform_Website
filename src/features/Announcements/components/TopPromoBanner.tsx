'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useContactModal } from '@/context/ContactModalContext';
import { useGetAnnouncementsQuery } from '../Service/AnnouncementService';
import { AnnouncementSkeleton } from './AnnouncementSkeleton';

export interface TopPromoBannerProps {
  scrolled?: boolean;
}

export const TopPromoBanner: React.FC<TopPromoBannerProps> = ({ scrolled = false }) => {
  const { openModal } = useContactModal();
  const { data: announcements, isLoading, isError } = useGetAnnouncementsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Active items strictly from Admin API with 100% null-safety
  const items = useMemo(() => {
    if (isError || !announcements || !Array.isArray(announcements)) {
      return [];
    }
    return announcements.filter((a) => Boolean(a && a.isActive !== false && (a.title || a.body)));
  }, [announcements, isError]);

  // Auto-rotate every 5 seconds if multiple items exist and user is not hovering
  useEffect(() => {
    let isMounted = true;
    if (items.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      if (isMounted) {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [items.length, isPaused]);

  // While loading, display the crisp high-contrast skeleton loader
  if (isLoading) {
    return <AnnouncementSkeleton accentColor="orange" />;
  }

  // If Admin disabled all announcements or error, collapse the whole section completely
  if (items.length === 0) {
    return null;
  }

  const activePromo = items[currentIndex % items.length] || items[0];
  const bannerText = activePromo?.body || activePromo?.title || '';
  const ctaText = activePromo?.ctaLabel || '';

  const handleAction = () => {
    if (activePromo?.linkUrl && !activePromo.linkUrl.startsWith('#') && !activePromo.linkUrl.includes('modal')) {
      window.location.href = activePromo.linkUrl;
    } else {
      openModal?.(activePromo?.title || activePromo?.body || '', 'TOP_PROMO_BANNER');
    }
  };

  return (
    <div
      aria-hidden={scrolled}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        'relative w-full overflow-hidden select-none transition-all duration-300 ease-in-out z-50',
        'bg-slate-950 text-slate-100 border-b border-orange-500/20 shadow-xs flex items-center',
        scrolled
          ? 'h-0 max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
          : 'h-8 sm:h-9 opacity-100'
      )}
    >
      {/* Subtle warm ambient glow behind banner */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(255,79,0,0.1),transparent_70%)]" />

      {/* Main Container - Unified Desktop & Mobile Responsive View */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-2.5 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePromo.id || activePromo.announcementId || activePromo.title || currentIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[1720px] mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs lg:text-[13px] font-medium"
          >
            {activePromo.badge && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-[#FF7332] border border-orange-500/30 shrink-0">
                {activePromo.badge}
              </span>
            )}

            <span className="text-slate-200 truncate max-w-[155px] min-[360px]:max-w-[195px] min-[420px]:max-w-[250px] sm:max-w-none">
              {bannerText}
            </span>

            {ctaText && (
              <>
                <span className="text-slate-600 shrink-0">|</span>

                {activePromo?.linkUrl && !activePromo.linkUrl.startsWith('#') && !activePromo.linkUrl.includes('modal') ? (
                  <a
                    href={activePromo.linkUrl}
                    tabIndex={scrolled ? -1 : 0}
                    className="inline-flex items-center gap-0.5 font-bold text-[#FF7332] hover:text-orange-400 transition-colors underline decoration-orange-500/40 hover:decoration-orange-400 underline-offset-2 shrink-0 cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ChevronRight size={13} className="stroke-[2.5]" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleAction}
                    tabIndex={scrolled ? -1 : 0}
                    className="inline-flex items-center gap-0.5 font-bold text-[#FF7332] hover:text-orange-400 transition-colors underline decoration-orange-500/40 hover:decoration-orange-400 underline-offset-2 shrink-0 cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ChevronRight size={13} className="stroke-[2.5]" />
                  </button>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopPromoBanner;

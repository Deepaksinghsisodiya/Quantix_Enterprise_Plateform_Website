'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useContactModal } from '@/context/ContactModalContext';
import { useGetAnnouncementsQuery } from '@/features/Announcements/Service/AnnouncementService';

interface TopPromoBannerProps {
  scrolled: boolean;
}

export const TopPromoBanner: React.FC<TopPromoBannerProps> = ({ scrolled }) => {
  const { openModal } = useContactModal();
  const { data: announcements, isLoading } = useGetAnnouncementsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Active items from Admin API
  const items = React.useMemo(() => {
    if (!announcements || announcements.length === 0) {
      return [
        {
          id: 'default',
          title: '3 Months Free Offer',
          body: 'Get 3 Months 100% Free POS Trial • Zero Setup Fee',
          linkUrl: '/contact/demo',
        },
      ];
    }
    return announcements.filter((a) => a.isActive !== false);
  }, [announcements]);

  // Auto-rotate every 5 seconds if multiple items exist
  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const activePromo = items[currentIndex % items.length] || items[0];
  const bannerText = activePromo?.body || activePromo?.title || 'Get 3 Months 100% Free POS Trial • Zero Setup Fee';
  const ctaText = activePromo?.linkUrl ? 'Learn More' : 'Claim Offer';

  return (
    <div
      aria-hidden={scrolled}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        'w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 text-center text-[10.5px] sm:text-[13px] font-sans font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 select-none transition-all duration-300 ease-out overflow-hidden z-50',
        scrolled
          ? 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
          : 'max-h-9 py-1 px-2.5 opacity-100 sm:max-h-10 sm:py-1.5 sm:px-4'
      )}
    >
      {isLoading ? (
        <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 animate-pulse select-none">
          {/* Promo Text Skeleton */}
          <div className="h-3 w-48 min-[400px]:w-64 min-[520px]:w-80 rounded bg-slate-300/80 dark:bg-slate-700/80 shrink-0" />
          <span className="text-slate-300 dark:text-slate-700 mx-0.5 sm:mx-1 font-bold">|</span>
          {/* CTA Link Skeleton */}
          <div className="inline-flex items-center gap-1 shrink-0">
            <div className="h-3 w-16 sm:w-20 rounded bg-primary/30" />
            <ChevronRight size={12} className="stroke-[3] text-primary/40" />
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activePromo.id || activePromo.title || currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center gap-1 max-w-full"
          >
            <span className="shrink-0 truncate max-w-[240px] min-[400px]:max-w-[340px] min-[520px]:max-w-none">
              {bannerText}
            </span>
            <span className="text-slate-400 dark:text-slate-700 mx-0.5 sm:mx-1">|</span>
            {activePromo?.linkUrl && !activePromo.linkUrl.startsWith('#') && !activePromo.linkUrl.includes('modal') ? (
              <a
                href={activePromo.linkUrl}
                tabIndex={scrolled ? -1 : 0}
                className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-0.5 hover:underline transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm cursor-pointer"
              >
                <span>{ctaText}</span>
                <ChevronRight size={12} className="stroke-[3]" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => openModal(activePromo?.title || 'Claim Your 3 Months Free Trial', 'TOP_PROMO_BANNER')}
                tabIndex={scrolled ? -1 : 0}
                className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-0.5 hover:underline transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm cursor-pointer"
              >
                <span>Claim Offer</span>
                <ChevronRight size={12} className="stroke-[3]" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default TopPromoBanner;

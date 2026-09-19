'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useContactModal } from '@/context/ContactModalContext';
import { useGetAnnouncementsQuery } from '@/features/Announcements/Service/AnnouncementService';
import { TopPromoBannerSkeleton } from '@/components/atoms';

interface TopPromoBannerProps {
  scrolled: boolean;
}

export const TopPromoBanner: React.FC<TopPromoBannerProps> = ({ scrolled }) => {
  const { openModal } = useContactModal();
  const { data: announcements, isLoading } = useGetAnnouncementsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Active items strictly from Admin API or default fallback
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

  const activePromo = items[currentIndex % items.length] || items[0];
  const bannerText = activePromo?.body || activePromo?.title || 'Get 3 Months 100% Free POS Trial • Zero Setup Fee';
  const ctaText = activePromo?.linkUrl ? 'Learn More' : 'Claim Offer';

  const handleAction = () => {
    if (activePromo?.linkUrl && !activePromo.linkUrl.startsWith('#') && !activePromo.linkUrl.includes('modal')) {
      window.location.href = activePromo.linkUrl;
    } else {
      openModal(activePromo?.title || 'Claim Your 3 Months Free Trial', 'TOP_PROMO_BANNER');
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(255,77,0,0.08),transparent_70%)]" />

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {isLoading ? (
          <TopPromoBannerSkeleton />
        ) : (
          <>
            {/* MOBILE VIEW (< sm): Smooth Single-Line Continuous Marquee (Never takes 3 lines, Never cuts off) */}
            <div
              onClick={handleAction}
              className="flex sm:hidden relative w-full h-full items-center overflow-hidden cursor-pointer"
            >
              {/* Soft Left and Right Edge Masks for smooth entrance/exit */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-950 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-950 to-transparent z-10" />

              <div className="flex w-max shrink-0 animate-[heroTickerScroll_26s_linear_infinite] hover:[animation-play-state:paused] active:[animation-play-state:paused] items-center gap-8 pl-4">
                {[1, 2].map((group) => (
                  <div key={group} className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-200 text-[11px] font-medium whitespace-nowrap">
                      {bannerText}
                    </span>
                    <span className="text-slate-600 font-bold">|</span>
                    <span className="text-[#FF7332] font-bold text-[11px] whitespace-nowrap inline-flex items-center gap-0.5 underline decoration-orange-500/40">
                      <span>{ctaText}</span>
                      <ChevronRight size={12} className="stroke-[2.5]" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP, LAPTOP & TABLET VIEW (>= sm): Centered Single Line */}
            <div className="hidden sm:flex mx-auto max-w-[1720px] w-full items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePromo.id || activePromo.title || currentIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center justify-center gap-2 text-xs lg:text-[13px] font-medium"
                >
                  <span className="text-slate-200 whitespace-nowrap">
                    {bannerText}
                  </span>

                  <span className="text-slate-600">|</span>

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
                      <span>Claim Offer</span>
                      <ChevronRight size={13} className="stroke-[2.5]" />
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopPromoBanner;

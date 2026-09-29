// src/components/organisms/HeroSection/HeroSection.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HERO_AUTO_PLAY_INTERVAL_MS, HeroSlide } from './HeroData';
import { HeroView } from './HeroView';
import { useGetHeroBannersQuery } from '@/features/Hero/Service/HeroBannerService';
import { HeroSlideSkeleton } from '@/components/atoms';

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: apiResult, isLoading } = useGetHeroBannersQuery();

  /**
   * Slides come exclusively from the CMS.
   *  - Backend reachable with active slides → API slides
   *  - Backend reachable with all slides disabled → [] → section collapses
   *  - Backend offline / result undefined → [] → section collapses
   */
  const slides = useMemo<HeroSlide[]>(() => {
    if (!apiResult || !apiResult.backendReachable) return [];
    if (apiResult.items.length === 0) return [];

    return apiResult.items.map((banner, index) => {
      const assetId = banner.mediaAssetId || banner.imageAssetId;
      const bgImage = assetId
        ? `/api/v1/media/${assetId}/file`
        : banner.imageUrl || '';

      const heading = banner.heading || banner.title || '';

      return {
        id: banner.heroSlideId || banner.contentId || `banner-${index}`,
        badge: banner.badge || '',
        heading,
        subheading: banner.subheading ?? banner.body ?? '',
        primaryCta: {
          label: banner.primaryCtaLabel || '',
          href: banner.primaryCtaUrl || banner.linkUrl || '',
        },
        secondaryCta: {
          label: banner.secondaryCtaLabel || '',
          href: banner.secondaryCtaUrl || '',
        },
        backgroundImage: bgImage,
        featureHighlights: banner.featureHighlights ?? [],
      };
    });
  }, [apiResult]);

  const slideCount = slides.length;

  const nextSlide = useCallback(() => {
    if (slideCount <= 1) return;
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    if (slideCount <= 1) return;
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Auto-play via setInterval — same approach as Restaurant/Retail for consistency
  useEffect(() => {
    if (isPaused || slideCount <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, HERO_AUTO_PLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slideCount]);

  // Bounds guard: reset if active slide index becomes out of range
  useEffect(() => {
    if (slideCount > 0 && activeIndex >= slideCount) {
      setActiveIndex(0);
    }
  }, [slideCount, activeIndex]);

  if (isLoading) return <HeroSlideSkeleton />;

  // All slides disabled in Admin → section disappears completely
  if (slides.length === 0) return null;

  const safeActiveIndex = Math.min(activeIndex, slideCount - 1);

  return (
    <HeroView
      slides={slides}
      activeIndex={safeActiveIndex}
      isPaused={isPaused}
      onNext={nextSlide}
      onPrev={prevSlide}
      onGoTo={goToSlide}
      onTogglePause={togglePause}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    />
  );
};

export default HeroSection;

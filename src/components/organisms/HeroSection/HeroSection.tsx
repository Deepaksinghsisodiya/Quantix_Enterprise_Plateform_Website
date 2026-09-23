// src/components/organisms/HeroSection/HeroSection.tsx
'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { HERO_SLIDES, HERO_AUTO_PLAY_INTERVAL_MS, HeroSlide } from './HeroData';
import { HeroView } from './HeroView';
import { useGetHeroBannersQuery } from '@/features/Hero/Service/HeroBannerService';
import { HeroSlideSkeleton } from '@/components/atoms';

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: apiBanners, isLoading } = useGetHeroBannersQuery();

  // Flag to toggle between full rich dummy UI and API data
  const USE_API_DATA = true;

  // Data mapped directly from real Admin APIs, preserving full UI structure
  const slides = useMemo<HeroSlide[]>(() => {
    if (!USE_API_DATA || !apiBanners || apiBanners.length === 0) {
      return HERO_SLIDES;
    }

    return apiBanners.map((banner, index) => {
      const fallback = HERO_SLIDES[index % HERO_SLIDES.length];
      const assetId = banner.mediaAssetId || banner.imageAssetId;
      const bgImage = assetId
        ? `/api/v1/media/${assetId}/file`
        : banner.imageUrl || fallback.backgroundImage;

      const heading = banner.heading || banner.title || fallback.heading;

      return {
        id: banner.heroSlideId || banner.contentId || `banner-${index}`,
        badge: banner.badge || fallback.badge,
        heading: heading,
        mobileHeadingLines: fallback.mobileHeadingLines || [heading, '', ''],
        subheading: banner.subheading ?? banner.body ?? fallback.subheading,
        primaryCta: {
          label: banner.primaryCtaLabel || fallback.primaryCta?.label || 'Start Free Trial',
          href: banner.primaryCtaUrl || banner.linkUrl || fallback.primaryCta?.href || '/contact',
        },
        secondaryCta: {
          label: banner.secondaryCtaLabel || fallback.secondaryCta?.label || 'Book an Enterprise Demo',
          href: banner.secondaryCtaUrl || fallback.secondaryCta?.href || '/contact/demo',
        },
        backgroundImage: bgImage,
        featureHighlights:
          banner.featureHighlights && banner.featureHighlights.length > 0
            ? banner.featureHighlights
            : fallback.featureHighlights,
      };
    });
  }, [apiBanners]);

  const slideCount = slides.length;

  const goToNext = useCallback(() => {
    if (slideCount <= 1) return;
    setActiveIndex((i) => (i + 1) % slideCount);
  }, [slideCount]);

  const goToPrev = useCallback(() => {
    if (slideCount <= 1) return;
    setActiveIndex((i) => (i - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  // Auto-play effect with mounted guard
  useEffect(() => {
    let isMounted = true;
    if (isPaused || slideCount <= 1) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (isMounted) {
        goToNext();
      }
    }, HERO_AUTO_PLAY_INTERVAL_MS);
    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, isPaused, goToNext, slideCount]);

  const safeActiveIndex = activeIndex >= slideCount ? 0 : activeIndex;

  if (isLoading && USE_API_DATA) {
    return <HeroSlideSkeleton />;
  }

  return (
    <HeroView
      slides={slides}
      activeIndex={safeActiveIndex}
      isPaused={isPaused}
      onNext={goToNext}
      onPrev={goToPrev}
      onGoTo={goTo}
      onTogglePause={togglePause}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    />
  );
};

export default HeroSection;

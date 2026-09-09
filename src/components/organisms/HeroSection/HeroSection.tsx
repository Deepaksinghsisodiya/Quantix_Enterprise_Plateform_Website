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
  const USE_API_DATA = false;

  // Data mapped directly from real Admin APIs, preserving full UI structure
  const slides = useMemo<HeroSlide[]>(() => {
    if (!USE_API_DATA || !apiBanners || apiBanners.length === 0) {
      return HERO_SLIDES;
    }

    return apiBanners.map((banner, index) => {
      const fallback = HERO_SLIDES[index % HERO_SLIDES.length];
      const bgImage = banner.imageAssetId
        ? `/api/v1/media/${banner.imageAssetId}/file`
        : banner.imageUrl || fallback.backgroundImage;

      return {
        id: banner.contentId || `banner-${index}`,
        badge: banner.pageSlug ? banner.pageSlug.toUpperCase() : fallback.badge,
        heading: banner.title || fallback.heading,
        mobileHeadingLines: fallback.mobileHeadingLines || [banner.title, '', ''],
        subheading: banner.body ?? fallback.subheading,
        primaryCta: {
          label: fallback.primaryCta?.label || 'Start Free Trial',
          href: banner.linkUrl || fallback.primaryCta?.href || '/contact',
        },
        secondaryCta: fallback.secondaryCta || { label: 'Request Demo', href: '/contact/demo' },
        backgroundImage: bgImage,
        featureHighlights: fallback.featureHighlights,
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

  // Auto-play effect
  useEffect(() => {
    if (isPaused || slideCount <= 1) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(goToNext, HERO_AUTO_PLAY_INTERVAL_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, isPaused, goToNext, slideCount]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [slides.length, activeIndex]);

  if (isLoading && USE_API_DATA) {
    return <HeroSlideSkeleton />;
  }

  return (
    <HeroView
      slides={slides}
      activeIndex={activeIndex}
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

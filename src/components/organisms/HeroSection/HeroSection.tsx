// src/components/organisms/HeroSection/HeroSection.tsx
// Wrapper — owns carousel state + auto-play timer. Passes all state + handlers to HeroView.
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

  const slides = useMemo<HeroSlide[]>(() => {
    if (!apiBanners || apiBanners.length === 0) {
      return HERO_SLIDES;
    }

    return apiBanners.map((banner, index) => {
      const fallback = HERO_SLIDES[index % HERO_SLIDES.length];
      const bgImage = banner.imageAssetId
        ? `/api/v1/media/${banner.imageAssetId}/file`
        : banner.imageUrl || fallback.backgroundImage;

      return {
        id: banner.contentId || `banner-${index}`,
        badge: fallback.badge || 'ENTERPRISE SPOTLIGHT',
        heading: banner.title || fallback.heading,
        mobileHeadingLines: fallback.mobileHeadingLines || [banner.title, '', ''],
        subheading: banner.body || fallback.subheading,
        primaryCta: {
          label: fallback.primaryCta?.label || 'Contact Sales',
          href: banner.linkUrl || fallback.primaryCta?.href || '/contact',
        },
        secondaryCta: fallback.secondaryCta || { label: 'Request Demo', href: '/contact/demo' },
        backgroundImage: bgImage,
        featureHighlights: fallback.featureHighlights || [
          'Global Menu Management',
          'Role-Based Permissions',
          'Live Enterprise Sync',
        ],
      };
    });
  }, [apiBanners]);

  const slideCount = slides.length;

  const goToNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % (slideCount || 1));
  }, [slideCount]);

  const goToPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + (slideCount || 1)) % (slideCount || 1));
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

  // Adjust activeIndex if slides length changes
  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [slides.length, activeIndex]);

  if (isLoading) {
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

// src/components/organisms/HeroSection/HeroSection.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HERO_SLIDES, HERO_AUTO_PLAY_INTERVAL_MS, HeroSlide } from './HeroData';
import { HeroView } from './HeroView';
import { useGetHeroBannersQuery } from '@/features/Hero/Service/HeroBannerService';
import { HeroSlideSkeleton } from '@/components/atoms';

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: apiResult, isLoading } = useGetHeroBannersQuery();

  /**
   * Slide selection logic (3-way):
   *  1. Backend reachable + active slides       → API slides (supplemented with HERO_SLIDES if < HERO_SLIDES.length)
   *  2. Backend reachable + all slides disabled → [] → section collapses (return null below)
   *  3. Backend offline / result undefined      → HERO_SLIDES (full static fallback, always beautiful)
   *
   * Supplementing with HERO_SLIDES ensures the section ALWAYS has multiple slides when visible,
   * so auto-play and navigation icons are always active.
   */
  const slides = useMemo<HeroSlide[]>(() => {
    // Still loading or backend offline → full static fallback
    if (!apiResult || !apiResult.backendReachable) return HERO_SLIDES;

    // All slides disabled in Admin → collapse section
    if (apiResult.items.length === 0) return [];

    // Map API slides into HeroSlide shape
    const mapped: HeroSlide[] = apiResult.items.map((banner, index) => {
      const fallback = HERO_SLIDES[index % HERO_SLIDES.length] || HERO_SLIDES[0];
      const assetId = banner.mediaAssetId || banner.imageAssetId;
      const bgImage = assetId
        ? `/api/v1/media/${assetId}/file`
        : banner.imageUrl || fallback?.backgroundImage || '/images/foodhub_pos_terminal.jpg';

      const heading = banner.heading || banner.title || fallback?.heading || 'Enterprise Cloud POS';

      return {
        id: banner.heroSlideId || banner.contentId || `banner-${index}`,
        badge: banner.badge || fallback?.badge || 'ENTERPRISE PLATFORM',
        heading,
        mobileHeadingLines: fallback?.mobileHeadingLines || [heading, '', ''],
        subheading: banner.subheading ?? banner.body ?? fallback?.subheading ?? '',
        primaryCta: {
          label: banner.primaryCtaLabel || fallback?.primaryCta?.label || 'Start Free Trial',
          href: banner.primaryCtaUrl || banner.linkUrl || fallback?.primaryCta?.href || '/contact',
        },
        secondaryCta: {
          label: banner.secondaryCtaLabel || fallback?.secondaryCta?.label || 'Book an Enterprise Demo',
          href: banner.secondaryCtaUrl || fallback?.secondaryCta?.href || '/contact/demo',
        },
        backgroundImage: bgImage,
        featureHighlights:
          banner.featureHighlights && banner.featureHighlights.length > 0
            ? banner.featureHighlights
            : fallback?.featureHighlights || [],
      };
    });

    // Supplement with remaining HERO_SLIDES so there are always multiple slides
    // (ensures icons + auto-play are always active when section is visible).
    // Admin's real slides always come first.
    if (mapped.length < HERO_SLIDES.length) {
      const extras = HERO_SLIDES.slice(mapped.length);
      return [...mapped, ...extras];
    }

    return mapped;
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

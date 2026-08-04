// src/components/organisms/HeroSection/HeroSection.tsx
// Wrapper — owns carousel state + auto-play timer. Passes all state + handlers to HeroView.
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { HERO_SLIDES, HERO_AUTO_PLAY_INTERVAL_MS } from "./HeroData";
import { HeroView } from "./HeroView";
import { useIndustry } from "../../../context/IndustryContext";

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % HERO_SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (isPaused) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(goToNext, HERO_AUTO_PLAY_INTERVAL_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, isPaused, goToNext]);

  return (
    <HeroView
      slides={HERO_SLIDES}
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

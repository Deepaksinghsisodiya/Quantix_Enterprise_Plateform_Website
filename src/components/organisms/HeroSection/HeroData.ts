// src/components/organisms/HeroSection/HeroData.ts

export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  mobileHeadingLines?: [string, string, string];
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  backgroundImage: string;
  featureHighlights: string[];
}

export const HERO_AUTO_PLAY_INTERVAL_MS = 5000;

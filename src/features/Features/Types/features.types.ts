import { LucideIcon } from "lucide-react";

export interface FeatureStat {
  label: string;
  value: string;
}

export interface FeatureModule {
  id: string;
  number: string;
  tabLabel: string;
  shortMobileName: string;
  category: string;
  statusBadge: string;
  title: string;
  description: string;
  bullets: string[];
  stat: FeatureStat;
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  href: string;
  ctaText: string;
  icon: LucideIcon;
}

export interface PlatformExtension {
  id: string;
  title: string;
  badge: string;
  icon: LucideIcon;
  href: string;
}

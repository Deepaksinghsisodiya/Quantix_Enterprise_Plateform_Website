// src/features/Hero/Types/HeroBannerTypes.ts

export interface HeroBannerItem {
  heroSlideId?: string;
  contentId?: string;
  siteVariant?: string;
  badge?: string;
  heading?: string;
  title?: string;
  subheading?: string | null;
  body?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaUrl?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaUrl?: string | null;
  featureHighlights?: string[];
  linkUrl?: string | null;
  mediaAssetId?: string | null;
  imageAssetId?: string | null;
  imageUrl?: string | null;
  pageSlug?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiHeroBannerResponse {
  success?: boolean;
  message?: string;
  data?: HeroBannerItem[];
}

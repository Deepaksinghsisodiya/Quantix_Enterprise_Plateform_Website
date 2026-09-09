// src/features/Hero/Types/HeroBannerTypes.ts

export interface HeroBannerItem {
  contentId: string;
  contentType: 'HeroBanner' | string;
  title: string;
  body?: string | null;
  linkUrl?: string | null;
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

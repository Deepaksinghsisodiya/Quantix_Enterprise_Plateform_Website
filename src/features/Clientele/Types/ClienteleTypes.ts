// src/features/Clientele/Types/ClienteleTypes.ts

export interface ClientBrandDto {
  id?: string;
  clientLogoId?: string;
  name?: string;
  title?: string;
  body?: string;
  category?: 'Retail' | 'Restaurant' | 'Enterprise' | 'Franchise' | string;
  industry?: string;
  logoUrl?: string;
  mediaAssetId?: string;
  websiteUrl?: string;
  linkUrl?: string;
  tier?: 'Enterprise' | 'Global' | 'Standard' | string;
  locationsCount?: number;
  isFeatured?: boolean;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
}

export interface ApiClienteleResponse {
  success: boolean;
  message?: string;
  data: ClientBrandDto[];
}

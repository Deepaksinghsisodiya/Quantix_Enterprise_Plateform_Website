// src/features/Industries/Types/IndustriesTypes.ts

export interface IndustryDto {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
  statLabel?: string;
  statValue?: string;
}

export interface ApiIndustriesResponse {
  success: boolean;
  data: IndustryDto[];
}

export interface ApiIndustryDetailResponse {
  success: boolean;
  data: IndustryDto;
}

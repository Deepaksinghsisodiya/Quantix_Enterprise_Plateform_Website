// src/features/HelpCentre/Types/HelpCentreTypes.ts

export interface HelpArticleDto {
  id: string;
  slug: string;
  title: string;
  body: string;
  categoryId?: string;
  categoryName?: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export interface HelpCategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount?: number;
}

export interface HelpFAQDto {
  id: string;
  question: string;
  answer: string;
  categoryId?: string;
}

export interface HelpVideoDto {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: string;
}

export interface ApiHelpArticlesResponse {
  success: boolean;
  data: HelpArticleDto[];
}

export interface ApiHelpArticleResponse {
  success: boolean;
  data: HelpArticleDto;
}

export interface ApiHelpCategoriesResponse {
  success: boolean;
  data: HelpCategoryDto[];
}

export interface ApiHelpFAQsResponse {
  success: boolean;
  data: HelpFAQDto[];
}

export interface ApiHelpVideosResponse {
  success: boolean;
  data: HelpVideoDto[];
}

// src/features/CaseStudies/Types/CaseStudiesTypes.ts

export interface CaseStudyDto {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  logoUrl?: string;
  imageUrl?: string;
  statLabel?: string;
  statValue?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface ApiCaseStudiesResponse {
  success: boolean;
  data: CaseStudyDto[];
}

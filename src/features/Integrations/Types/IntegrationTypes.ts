export interface IntegrationStep {
  step: string;
  title: string;
  desc: string;
}

export interface IntegrationFeature {
  title: string;
  desc: string;
}

export interface IntegrationFaq {
  question: string;
  answer: string;
  category?: string;
}

export interface IntegrationStat {
  label: string;
  value: string;
  description?: string;
}

export interface IntegrationSpec {
  name: string;
  value: string;
}

export interface IntegrationDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryLabel?: string;
  color?: string;
  tagline?: string;
  logoUrl?: string;
  imageUrl?: string;
  websiteUrl?: string;
  isPopular?: boolean;
  isActive?: boolean;
  showInNavbar?: boolean;
  displayOrder?: number;
  syncSpeed?: string;
  syncSpeedIcon?: string;
  siteVariant?: string;
  featuresJson?: string;
  setupStepsJson?: string;
  benefitsJson?: string;
  faqsJson?: string;
  specsJson?: string;
  statsJson?: string;
  tagsJson?: string;
}

export interface ApiIntegrationsResponse {
  success: boolean;
  data: IntegrationDto[];
}

export interface ApiSingleIntegrationResponse {
  success: boolean;
  data: IntegrationDto;
}

export interface IntegrationCategorySummary {
  category: string;
  label: string;
  count: number;
}

export interface ApiCategoriesResponse {
  success: boolean;
  data: IntegrationCategorySummary[];
}

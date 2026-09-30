export interface KeyPointDto {
  title: string;
  desc: string;
}

export interface WorkflowDto {
  title: string;
  desc: string;
}

export interface SolutionFaqDto {
  id?: string;
  question: string;
  answer: string;
}

export interface SubSectorDto {
  label: string;
  href: string;
}

export interface OverviewFeatureDto {
  title: string;
  desc: string;
  icon?: string;
  badge?: string;
}

export interface SolutionItemDto {
  solutionId: string;
  id?: string;
  siteVariant: string;
  itemType: 'PromoCard' | 'SectorItem' | string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  imageUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
  slug?: string;
  href?: string;
  isSubdomain?: boolean;

  ctaText?: string;
  externalUrl?: string;

  categoryTitle?: string;
  iconKey?: string;
  iconColor?: string;

  eyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  topBadge?: string;
  bottomBadge?: string;
  ctaLabel?: string;
  detailImageUrl?: string;
  detailImageAlt?: string;

  points?: KeyPointDto[];
  pointsJson?: string;
  workflows?: WorkflowDto[];
  workflowsJson?: string;
  faqs?: SolutionFaqDto[];
  faqsJson?: string;

  tagline?: string;
  liveMetric?: string;
  tags?: string[];
  tagsJson?: string;
  subSectors?: SubSectorDto[];
  subSectorsJson?: string;
  overviewFeatures?: OverviewFeatureDto[];
  overviewFeaturesJson?: string;
  accentColor?: string;
  glowColor?: string;
  category?: string;

  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MegaMenuCategoryGroupDto {
  categoryTitle: string;
  items: SolutionItemDto[];
}

export interface SolutionsMegaMenuResponseDto {
  promoCards: SolutionItemDto[];
  categories: MegaMenuCategoryGroupDto[];
}

export interface ApiSolutionsResponse {
  success: boolean;
  data: SolutionItemDto[];
  message?: string;
}

export interface ApiSingleSolutionResponse {
  success: boolean;
  data: SolutionItemDto;
  message?: string;
}

export interface ApiMegaMenuResponse {
  success: boolean;
  data: SolutionsMegaMenuResponseDto;
  message?: string;
}

import { LucideIcon } from 'lucide-react';

export interface FeatureCapability {
  title: string;
  desc: string;
  iconKey?: string;
}

export interface FeatureWorkflowStep {
  stepNumber: string;
  title: string;
  desc: string;
}

export interface FeatureFaq {
  id?: string;
  question: string;
  answer: string;
}

export interface PlatformFeature {
  featureId: string;
  id?: string;
  siteVariant: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  category: string;
  iconKey: string;
  iconColor?: string | null;

  showInNavbar: boolean;
  showOnHomepage: boolean;
  isFeatured: boolean;
  navbarBadge?: string | null;
  sortOrder: number;
  isActive: boolean;

  numberLabel?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;

  bullets: string[];
  bulletsJson?: string | null;

  statValue?: string | null;
  statLabel?: string | null;
  imageUrl?: string | null;
  imageSrc?: string | null;
  imageAlt?: string | null;
  topBadge?: string | null;
  bottomBadge?: string | null;
  ctaText?: string | null;
  ctaHref?: string | null;

  heroHeadline?: string | null;
  heroSubheadline?: string | null;

  keyCapabilities: FeatureCapability[];
  keyCapabilitiesJson?: string | null;

  workflows: FeatureWorkflowStep[];
  workflowsJson?: string | null;

  faqs: FeatureFaq[];
  faqsJson?: string | null;

  relatedIntegrations: string[];
  relatedIntegrationsJson?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface ApiFeatureResponse {
  success: boolean;
  data: PlatformFeature;
  message?: string;
}

export interface ApiFeaturesResponse {
  success: boolean;
  data: PlatformFeature[];
  message?: string;
}

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

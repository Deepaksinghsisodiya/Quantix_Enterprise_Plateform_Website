// src/features/Pricing/Types/PricingTypes.ts

export type PlanType = 'StandalonePos' | 'StandaloneCloud' | 'EnterpriseCloud' | string;
export type PlanFlavour = 'RES' | 'RET' | 'BOT' | string;
export type BillingCycle = 'monthly' | 'annual' | 'Daily' | 'Monthly' | 'Annual';

export interface PlanFeatureItem {
  planFeatureId?: string;
  planId?: string;
  featureCode?: string;
  featureName?: string;
  featureClass?: string;
  isIncluded?: boolean;
  showOnWebsite?: boolean;
  unitPricePerDay?: number;
}

export interface PlanLimitItem {
  planLimitId?: string;
  planId?: string;
  limitCode?: string;
  limitName?: string;
  value?: number;
  unitPricePerDay?: number;
  limitUnit?: string;
}

export interface ApiBillingPlan {
  planId: string;
  planCode: string;
  planName: string;
  displayName?: string;
  planType?: PlanType;
  flavour?: PlanFlavour;
  description?: string;
  isActive?: boolean;
  isPublic?: boolean;
  isDeprecated?: boolean;
  planPricePerDay?: number;
  sortOrder?: number;
  activeSubscriberCount?: number;
  maxLocations?: number;
  maxTerminals?: number;
  marketingBullets?: string[] | string;
  features?: PlanFeatureItem[];
  limits?: PlanLimitItem[];
  payments?: unknown[];
  services?: unknown[];
}

export interface ApiPricingDataPayload {
  plans?: ApiBillingPlan[];
  currencyCode?: string;
  tokenToCurrencyRate?: number;
}

export interface ApiBillingPlansResponse {
  success?: boolean;
  data?: ApiPricingDataPayload | ApiBillingPlan[];
  message?: string;
  errorCode?: string;
}

export interface PricingCardProps {
  plan: ApiBillingPlan;
  billing: BillingCycle;
  isSelected?: boolean;
  onSelect?: (plan: ApiBillingPlan) => void;
  brandColor?: string;
  badgeText?: string;
  locationLabel?: string;
  terminalLabel?: string;
}
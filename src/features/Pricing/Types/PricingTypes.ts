// src/features/Pricing/Types/PricingTypes.ts

export type PlanType = 'StandalonePos' | 'StandaloneCloud' | 'EnterpriseCloud';
export type PlanFlavour = 'RES' | 'RET' | 'BOT';
export type BillingCycle = 'monthly' | 'annual';

export interface ApiBillingPlan {
  planId: string;
  planCode: string;
  planName: string;
  displayName: string;
  planType: PlanType;
  flavour: PlanFlavour;
  isActive: boolean;
  isPublic: boolean;
  isDeprecated: boolean;
  planPricePerDay: number;
  sortOrder: number;
  activeSubscriberCount: number;
  maxLocations: number;
  maxTerminals: number;
  marketingBullets: string[];
}

export interface ApiBillingPlansResponse {
  success: boolean;
  data: ApiBillingPlan[];
  message?: string;
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
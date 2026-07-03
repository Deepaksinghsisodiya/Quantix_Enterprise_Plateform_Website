// src/features/Pricing/Types/PricingTypes.ts

export interface PricingPlan {
  id: string;
  planCode: string;
  name: string;
  price: number;
  interval: string;
  priceMonthly: number;
  priceSuffix: string;
  description: string;
  features: string[];
  mostPopular?: boolean;
  custom?: boolean;
  isActive?: boolean;
}

// Matches actual /api/v1/billing/plans response
export interface ApiBillingPlan {
  planId: string;
  planCode: string;
  displayName: string;
  planType: string; // "Trial" | "Basic" | "Pro" | "Enterprise"
  isActive: boolean;
  isPublic: boolean;
  isDeprecated: boolean;
  planPricePerDay: number;
}

export interface ApiBillingPlansResponse {
  success: boolean;
  data: ApiBillingPlan[];
}
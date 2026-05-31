// src/features/Pricing/Types/PricingTypes.ts

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  priceMonthly: number;
  priceSuffix: string;
  description: string;
  features: string[];
  mostPopular?: boolean;
  custom?: boolean;
}

export interface PlanFeature {
  planFeatureId: string;
  planId: string;
  featureCode: string;
  featureName: string;
  featureClass: string;
  isIncluded: boolean;
  showOnWebsite: boolean;
  unitPricePerDay: number;
}

export interface ApiPricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual?: number;
  description: string;
  features: PlanFeature[];
}

export interface ApiPricingResponse {
  success: boolean;
  data: {
    plans: ApiPricingPlan[];
    currencyCode: string;
    tokenToCurrencyRate: number;
  };
}

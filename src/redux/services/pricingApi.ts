// src/redux/services/pricingApi.ts
import { baseApi } from "./baseApi";

// Simple PricingPlan type – replace with real fields later
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "annual";
  priceMonthly: number;
  priceAnnual?: number;
  priceSuffix?: string;
  description: string;
  features: string[];
  mostPopular?: boolean;
  custom?: boolean;
}

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      query: () => "/pricing/plans",
      // Adjust cache time as needed (e.g., 5 min)
      providesTags: ["Pricing"],
    }),
  }),
  // Prevent overwriting if re‑injected elsewhere
  overrideExisting: false,
});

export const { useGetPricingPlansQuery } = pricingApi;

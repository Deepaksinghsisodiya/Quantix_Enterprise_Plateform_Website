// src/features/Pricing/Service/PricingService.ts
import { baseApi } from '@/redux/services/baseApi';
import { PricingPlan, ApiPricingResponse } from '../Types/PricingTypes';

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      query: () => "/marketing/pricing",
      transformResponse: (response: ApiPricingResponse) => {
        if (!response?.success || !response?.data?.plans) {
          return [];
        }
        return response.data.plans.map((p) => {
          const isEnterprise = p.name.toLowerCase().includes('enterprise');
          const isTrial = p.name.toLowerCase().includes('trial') || p.name.toLowerCase().includes('free');
          return {
            id: p.id,
            name: p.name,
            price: p.priceMonthly,
            interval: 'monthly',
            priceMonthly: p.priceMonthly,
            priceSuffix: isTrial ? ' 3 days, no card' : '/month',
            description: p.description || '',
            features: p.features
              ? p.features.filter((f) => f.showOnWebsite).map((f) => f.featureName)
              : [],
            mostPopular: p.name.toLowerCase().includes('pro') || p.name.toLowerCase().includes('standard'),
            custom: isEnterprise,
          };
        });
      },
      providesTags: ["Pricing"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPricingPlansQuery } = pricingApi;

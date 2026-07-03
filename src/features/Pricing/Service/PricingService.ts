// src/features/Pricing/Service/PricingService.ts
import { baseApi } from '@/redux/services/baseApi';
import { PricingPlan, ApiBillingPlansResponse, ApiBillingPlan } from '../Types/PricingTypes';

// Backend abhi description/features nahi deta, isliye static content map — 
// planCode change ho toh yahin update karna
const PLAN_CONTENT: Record<string, { description: string; features: string[] }> = {
  trial: {
    description: 'Perfect for testing our checkout flow and local inventory setup.',
    features: ['Single register terminal', 'Basic inventory listings', 'Offline-first sales caching', 'Email receipt routing'],
  },
  basic: {
    description: 'Everything you need to run a single-location store smoothly.',
    features: ['1 register terminal', 'Core inventory management', 'Standard email support', 'Daily sales reports'],
  },
  pro: {
    description: 'Complete checkout control for growing retail stores and cafes.',
    features: ['Up to 3 active registers', 'Omnichannel matrix stock', 'Discount & coupon engine', '24/7 priority help desk'],
  },
  enterprise: {
    description: 'Custom scale setups, API gateways, and dedicated support lines.',
    features: ['Unlimited checkout registers', 'Custom integrations API', 'Dedicated account manager', '99.9% uptime SLA guarantee'],
  },
};

const DEFAULT_CONTENT = { description: '', features: [] as string[] };

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      // baseApi ka baseUrl already `/api/v1` tak set hai toh sirf yeh path rakho,
      // warna poora "/api/v1/billing/plans" use karo
      query: () => '/billing/plans',
      transformResponse: (response: ApiBillingPlansResponse) => {
        if (!response?.success || !Array.isArray(response?.data)) {
          return [];
        }

        return response.data
          .filter((p) => p.isActive && p.isPublic && !p.isDeprecated)
          .map((p: ApiBillingPlan) => {
            const code = p.planCode.toLowerCase();
            const type = p.planType.toLowerCase();
            const content = PLAN_CONTENT[code] ?? DEFAULT_CONTENT;

            const isTrial = type === 'trial';
            const isEnterprise = type === 'enterprise';
            const priceMonthly = isEnterprise ? 0 : Math.round(p.planPricePerDay * 30);

            return {
              id: p.planId,
              planCode: code,
              name: p.displayName,
              price: priceMonthly,
              interval: 'monthly',
              priceMonthly,
              priceSuffix: isTrial ? ' 3 days, no card' : isEnterprise ? '' : '/month',
              description: content.description,
              features: content.features,
              mostPopular: type === 'pro',
              custom: isEnterprise,
              isActive: p.isActive,
            } as PricingPlan;
          })
          // trial -> basic -> pro -> enterprise order
          .sort((a, b) => a.priceMonthly - b.priceMonthly);
      },
      providesTags: ['Pricing'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPricingPlansQuery } = pricingApi;
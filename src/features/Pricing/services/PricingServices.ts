// src/features/Pricing/services/PricingServices.ts
import { baseApi } from '@/redux/services/baseApi';
import { ApiBillingPlansResponse } from '../Types/PricingTypes';

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBillingPlans: builder.query<ApiBillingPlansResponse, void>({
      query: () => '/billing/plans',
      providesTags: ['Pricing'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetBillingPlansQuery } = pricingApi;

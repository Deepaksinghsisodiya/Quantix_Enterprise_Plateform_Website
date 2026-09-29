// src/features/SocialProof/Service/SocialProofService.ts
import { baseApi } from '@/redux/services/baseApi';
import type { SocialProofMetricItem } from '../Types/SocialProofTypes';

export const socialProofApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialProofMetrics: builder.query<SocialProofMetricItem[], void>({
      query: () => '/social-proof-metrics?siteVariant=Enterprise',
      transformResponse: (response: any): SocialProofMetricItem[] => {
        if (!response) return [];
        let items: any[] = [];
        if (Array.isArray(response)) {
          items = response;
        } else if (Array.isArray(response?.data)) {
          items = response.data;
        } else if (Array.isArray(response?.data?.items)) {
          items = response.data.items;
        }
        return items
          .filter((item) => item && item.isActive !== false && (item.label || item.value))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      },
      providesTags: ['SocialProof'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSocialProofMetricsQuery } = socialProofApi;

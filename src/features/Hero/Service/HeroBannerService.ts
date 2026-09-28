// src/features/Hero/Service/HeroBannerService.ts
import { baseApi } from '@/redux/services/baseApi';
import { HeroBannerItem } from '../Types/HeroBannerTypes';

export interface HeroBannersResult {
  items: HeroBannerItem[];
  /** true = backend responded (even if no active slides), false = backend offline → use fallback */
  backendReachable: boolean;
}

export const heroBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeroBanners: builder.query<HeroBannersResult, void>({
      query: () => '/hero-slides?siteVariant=Enterprise',
      transformResponse: (response: any): HeroBannersResult => {
        const backendReachable = response?.backendReachable === true;
        if (!response) return { items: [], backendReachable: false };

        let rawItems: any[] = [];
        if (Array.isArray(response)) {
          rawItems = response;
        } else if (Array.isArray(response?.data)) {
          rawItems = response.data;
        } else if (Array.isArray(response?.data?.items)) {
          rawItems = response.data.items;
        }

        const items = rawItems
          .filter((item) => item && item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

        return { items, backendReachable };
      },
      providesTags: ['MarketingContent'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetHeroBannersQuery } = heroBannerApi;

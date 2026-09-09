// src/features/Hero/Service/HeroBannerService.ts
import { baseApi } from '@/redux/services/baseApi';
import { HeroBannerItem } from '../Types/HeroBannerTypes';

export const heroBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeroBanners: builder.query<HeroBannerItem[], void>({
      query: () => '/marketing/content/HeroBanner',
      transformResponse: (response: any): HeroBannerItem[] => {
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
          .filter((item) => item && item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      },
      providesTags: ['MarketingContent'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetHeroBannersQuery } = heroBannerApi;

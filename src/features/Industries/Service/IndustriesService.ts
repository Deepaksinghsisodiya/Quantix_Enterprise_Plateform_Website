// src/features/Industries/Service/IndustriesService.ts
import { baseApi } from '@/redux/services/baseApi';
import { IndustryDto, ApiIndustriesResponse, ApiIndustryDetailResponse } from '../Types/IndustriesTypes';

export const industriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIndustries: builder.query<IndustryDto[], void>({
      query: () => '/marketing/industries',
      transformResponse: (response: ApiIndustriesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Industries'],
    }),
    getIndustryBySlug: builder.query<IndustryDto | null, string>({
      query: (slug) => `/marketing/industries/${slug}`,
      transformResponse: (response: ApiIndustryDetailResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: (result, error, slug) => [{ type: 'Industries', id: slug }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetIndustriesQuery, useGetIndustryBySlugQuery } = industriesApi;
export { useGetIndustriesQuery as useIndustriesQuery, useGetIndustryBySlugQuery as useIndustryBySlugQuery };

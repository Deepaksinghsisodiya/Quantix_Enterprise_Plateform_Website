// src/features/Features/Service/FeaturesService.ts
import { baseApi } from '@/redux/services/baseApi';
import { PlatformFeature, ApiFeaturesResponse, ApiFeatureResponse } from '../Types/FeaturesTypes';

export const featuresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicFeatures: builder.query<PlatformFeature[], { siteVariant?: string } | void>({
      query: (arg) => {
        const variant = (arg && 'siteVariant' in arg && arg.siteVariant) ? arg.siteVariant : 'Enterprise';
        return `/features/public?siteVariant=${encodeURIComponent(variant)}`;
      },
      transformResponse: (response: ApiFeaturesResponse) => {
        return response?.success && Array.isArray(response?.data) ? response.data : [];
      },
      providesTags: ['Features'],
    }),

    getHomepageFeatures: builder.query<PlatformFeature[], { siteVariant?: string } | void>({
      query: (arg) => {
        const variant = (arg && 'siteVariant' in arg && arg.siteVariant) ? arg.siteVariant : 'Enterprise';
        return `/features/public/homepage?siteVariant=${encodeURIComponent(variant)}`;
      },
      transformResponse: (response: ApiFeaturesResponse) => {
        return response?.success && Array.isArray(response?.data) ? response.data : [];
      },
      providesTags: ['Features'],
    }),

    getFeatureBySlug: builder.query<PlatformFeature | null, { slug: string; siteVariant?: string }>({
      query: ({ slug, siteVariant = 'Enterprise' }) => {
        return `/features/public/${encodeURIComponent(slug)}?siteVariant=${encodeURIComponent(siteVariant)}`;
      },
      transformResponse: (response: ApiFeatureResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: (_result, _error, { slug }) => [{ type: 'Features', id: slug }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPublicFeaturesQuery,
  useGetHomepageFeaturesQuery,
  useGetFeatureBySlugQuery,
} = featuresApi;

export { useGetHomepageFeaturesQuery as useGetFeaturesQuery };
export { useGetPublicFeaturesQuery as useFeaturesQuery };

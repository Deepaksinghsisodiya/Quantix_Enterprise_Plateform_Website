// src/features/Features/Service/FeaturesService.ts
import { baseApi } from '@/redux/services/baseApi';
import { Feature, ApiFeaturesResponse } from '../Types/FeaturesTypes';

export const featuresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatures: builder.query<Feature[], void>({
      query: () => '/marketing/features',
      transformResponse: (response: ApiFeaturesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Features'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetFeaturesQuery } = featuresApi;
export { useGetFeaturesQuery as useFeaturesQuery };

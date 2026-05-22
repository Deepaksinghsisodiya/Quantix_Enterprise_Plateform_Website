import { baseApi } from './baseApi';

export const featuresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatures: builder.query<any[], void>({
      query: () => '/features',
    }),
  }),
});

// Export hook with the name the component expects
export const { useGetFeaturesQuery: useFeaturesQuery } = featuresApi;

import { baseApi } from './baseApi';

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQs: builder.query<any[], void>({
      query: () => '/faqs',
    }),
  }),
});

// Export hook under the name used by components
export const { useGetFAQsQuery } = faqApi;

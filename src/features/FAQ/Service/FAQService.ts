// src/features/FAQ/Service/FAQService.ts
import { baseApi } from '@/redux/services/baseApi';
import { FAQItem, ApiFAQResponse } from '../Types/FAQTypes';

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQs: builder.query<FAQItem[], void>({
      query: () => '/help-centre/faqs',
      transformResponse: (response: ApiFAQResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['FAQ'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetFAQsQuery } = faqApi;

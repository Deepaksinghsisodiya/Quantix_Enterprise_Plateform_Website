// src/features/FAQ/Service/FAQService.ts
import { baseApi } from '@/redux/services/baseApi';
import { FAQItem, ApiFAQResponse } from '../Types/FAQTypes';
import { FAQ_ENDPOINT, FAQ_CATEGORY_ENDPOINT } from '../Constants/FAQConstants';

/** Sort FAQs by `order` field (or `sortOrder` for legacy responses) */
const sortByOrder = (faqs: FAQItem[]): FAQItem[] =>
  [...faqs].sort((a, b) => {
    const ao = a.order ?? a.sortOrder ?? 999;
    const bo = b.order ?? b.sortOrder ?? 999;
    return ao - bo;
  });

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** GET /help-centre/faqs — returns all FAQs sorted by order */
    getFAQs: builder.query<FAQItem[], void>({
      query: () => FAQ_ENDPOINT,
      transformResponse: (response: ApiFAQResponse) => {
        const items = response?.success && Array.isArray(response?.data)
          ? response.data
          : [];
        return sortByOrder(items);
      },
      providesTags: ['FAQ'],
    }),

    /** GET /help-centre/faqs?category=General — filter by category */
    getFAQsByCategory: builder.query<FAQItem[], string>({
      query: (category) => FAQ_CATEGORY_ENDPOINT(category),
      transformResponse: (response: ApiFAQResponse) => {
        const items = response?.success && Array.isArray(response?.data)
          ? response.data
          : [];
        return sortByOrder(items);
      },
      providesTags: (_result, _error, category) => [{ type: 'FAQ', id: category }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetFAQsQuery, useGetFAQsByCategoryQuery } = faqApi;

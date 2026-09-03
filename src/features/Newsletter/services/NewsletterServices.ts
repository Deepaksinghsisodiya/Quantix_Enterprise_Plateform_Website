// src/features/Newsletter/services/NewsletterServices.ts
import { baseApi } from '@/redux/services/baseApi';
import { NewsletterSubscribeDto, NewsletterApiResponse } from '../types/NewsletterTypes';

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<NewsletterApiResponse, NewsletterSubscribeDto>({
      query: (body) => ({
        url: '/contact/newsletter/subscribe',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
  overrideExisting: false,
});

export const { useSubscribeNewsletterMutation } = newsletterApi;

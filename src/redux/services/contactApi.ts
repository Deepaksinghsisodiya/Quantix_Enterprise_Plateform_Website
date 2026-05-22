import { baseApi } from './baseApi';

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation<void, Record<string, any>>({
      query: (payload) => ({
        url: '/contact',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSubmitContactFormMutation } = contactApi;

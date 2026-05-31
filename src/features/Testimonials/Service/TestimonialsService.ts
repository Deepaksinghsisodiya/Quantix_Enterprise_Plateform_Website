// src/features/Testimonials/Service/TestimonialsService.ts
import { baseApi } from '@/redux/services/baseApi';
import { TestimonialDto, ApiTestimonialsResponse } from '../Types/TestimonialsTypes';

export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query<TestimonialDto[], void>({
      query: () => '/marketing/testimonials',
      transformResponse: (response: ApiTestimonialsResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Testimonials'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetTestimonialsQuery } = testimonialsApi;
export { useGetTestimonialsQuery as useTestimonialsQuery };

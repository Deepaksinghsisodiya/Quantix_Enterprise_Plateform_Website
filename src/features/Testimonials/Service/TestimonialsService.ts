// src/features/Testimonials/Service/TestimonialsService.ts
import { baseApi } from '@/redux/services/baseApi';
import { TestimonialDto, ApiTestimonialsResponse } from '../Types/TestimonialsTypes';

export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query<TestimonialDto[], void>({
      query: () => '/marketing/testimonials',
      transformResponse: (response: any) => {
        if (!response) return [];
        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.data?.testimonials)) return response.data.testimonials;
        if (Array.isArray(response?.data?.items)) return response.data.items;
        if (Array.isArray(response?.data?.data)) return response.data.data;
        if (Array.isArray(response?.testimonials)) return response.testimonials;
        return [];
      },
      providesTags: ['Testimonials'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetTestimonialsQuery } = testimonialsApi;
export { useGetTestimonialsQuery as useTestimonialsQuery };

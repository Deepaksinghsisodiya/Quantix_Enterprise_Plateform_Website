// src/features/Testimonials/TestimonialBannerWrapper.tsx
import React from 'react';
import { useGetTestimonialsQuery } from './services/TestimonialsServices';
import TestimonialBanner from './TestimonialBanner';

export const TestimonialBannerWrapper: React.FC = () => {
  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();

  return <TestimonialBanner testimonials={testimonials} isLoading={isLoading} />;
};

export default TestimonialBannerWrapper;

'use client';

import React from 'react';
import { useGetTestimonialsQuery } from './Service/TestimonialsService';
import TestimonialsSection from './TestimonialsSection';
import TestimonialsSectionSkeleton from './components/TestimonialsSectionSkeleton';

export const TestimonialsSectionWrapper: React.FC = () => {
  const { data: testimonials, isLoading } = useGetTestimonialsQuery();

  // Synchronize loading state: show skeleton immediately while fetching or before initial response
  const isInitialLoading = isLoading || (testimonials === undefined);

  if (isInitialLoading) {
    return <TestimonialsSectionSkeleton />;
  }

  // Complete safety: hide completely if empty and not loading
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return <TestimonialsSection testimonials={testimonials} isLoading={false} />;
};

export default TestimonialsSectionWrapper;

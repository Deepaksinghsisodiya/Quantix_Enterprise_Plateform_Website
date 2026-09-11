'use client';

import React from 'react';
import { useGetTestimonialsQuery } from './Service/TestimonialsService';
import TestimonialsSection from './TestimonialsSection';

export const TestimonialsSectionWrapper: React.FC = () => {
  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();

  return <TestimonialsSection testimonials={testimonials} isLoading={isLoading} />;
};

export default TestimonialsSectionWrapper;

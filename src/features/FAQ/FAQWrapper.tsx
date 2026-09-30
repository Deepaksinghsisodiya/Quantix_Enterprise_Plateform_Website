'use client';

// src/features/FAQ/FAQWrapper.tsx
import React from 'react';
import { useGetFAQsQuery } from './Service/FAQService';
import FAQSection from './FAQSection';
import { FAQItem } from './Types/FAQTypes';
import FAQSectionSkeleton from './components/FAQSectionSkeleton';

export interface FAQWrapperProps {
  category?: string;
  fallbackFaqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

/**
 * FAQWrapper — fetches real FAQ data from the API (/help-centre/faqs?siteVariant=Enterprise).
 * Shows matching skeletons immediately while loading.
 * Hides completely (returns null) if no FAQs exist or API is empty.
 */
export const FAQWrapper: React.FC<FAQWrapperProps> = ({
  category,
  fallbackFaqs,
  title,
  subtitle,
  badgeText,
}) => {
  const { data: apiFaqs, isLoading } = useGetFAQsQuery();

  // Synchronize loading state: immediately render skeleton on initial load or while fetching
  const isInitialLoading = isLoading || (apiFaqs === undefined);

  if (isInitialLoading) {
    return <FAQSectionSkeleton />;
  }


  const faqsToUse = apiFaqs || [];

  // Filter by category if requested
  const filteredFaqs = category
    ? faqsToUse.filter((f) => f.category?.toLowerCase() === category.toLowerCase())
    : faqsToUse;

  // Complete safety: hide completely if empty and not loading
  if (filteredFaqs.length === 0) {
    return null;
  }

  return (
    <FAQSection
      faqs={filteredFaqs}
      isLoading={false}
      title={title}
      subtitle={subtitle}
      badgeText={badgeText}
    />
  );
};

export default FAQWrapper;

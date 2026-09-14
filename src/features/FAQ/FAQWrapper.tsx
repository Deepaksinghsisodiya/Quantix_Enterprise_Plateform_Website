'use client';

// src/features/FAQ/FAQWrapper.tsx
import React from 'react';
import { useGetFAQsQuery } from './Service/FAQService';
import FAQSection from './FAQSection';
import { DEFAULT_ENTERPRISE_FAQS } from './Constants/FAQConstants';
import { FAQItem } from './Types/FAQTypes';

export interface FAQWrapperProps {
  category?: string;
  fallbackFaqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

/**
 * FAQWrapper — fetches FAQ data from the API (/help-centre/faqs) and passes it to FAQSection.
 * Prioritizes live API data. Falls back to fallbackFaqs or DEFAULT_ENTERPRISE_FAQS when API returns empty.
 */
export const FAQWrapper: React.FC<FAQWrapperProps> = ({
  category,
  fallbackFaqs,
  title,
  subtitle,
  badgeText,
}) => {
  const { data: apiFaqs = [], isLoading } = useGetFAQsQuery();

  // Filter by category if requested and available
  const filteredApiFaqs = category
    ? apiFaqs.filter((f) => f.category?.toLowerCase() === category.toLowerCase())
    : apiFaqs;

  const resolvedFaqs =
    Array.isArray(filteredApiFaqs) && filteredApiFaqs.length > 0
      ? filteredApiFaqs
      : Array.isArray(apiFaqs) && apiFaqs.length > 0
      ? apiFaqs
      : fallbackFaqs && fallbackFaqs.length > 0
      ? fallbackFaqs
      : DEFAULT_ENTERPRISE_FAQS;

  return (
    <FAQSection
      faqs={resolvedFaqs}
      isLoading={isLoading}
      title={title}
      subtitle={subtitle}
      badgeText={badgeText}
    />
  );
};

export default FAQWrapper;

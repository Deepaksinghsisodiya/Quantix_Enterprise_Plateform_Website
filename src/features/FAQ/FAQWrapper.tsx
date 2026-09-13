'use client';

// src/features/FAQ/FAQWrapper.tsx
import React from 'react';
import { useGetFAQsQuery } from './Service/FAQService';
import FAQSection from './FAQSection';
import { DEFAULT_ENTERPRISE_FAQS } from './Constants/FAQConstants';

/**
 * FAQWrapper — fetches FAQ data from the API and passes it to FAQSection.
 * Falls back to DEFAULT_ENTERPRISE_FAQS when the API returns no data.
 */
export const FAQWrapper: React.FC = () => {
  const { data: faqs = [], isLoading } = useGetFAQsQuery();

  const resolvedFaqs = Array.isArray(faqs) && faqs.length > 0 ? faqs : DEFAULT_ENTERPRISE_FAQS;

  return <FAQSection faqs={resolvedFaqs} isLoading={isLoading} />;
};

export default FAQWrapper;

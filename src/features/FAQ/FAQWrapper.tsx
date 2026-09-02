'use client';

// src/features/FAQ/FAQWrapper.tsx
import React from 'react';
import { useGetFAQsQuery } from './services/FAQServices';
import FAQSection from './FAQSection';

/**
 * FAQWrapper — fetches FAQ data from the API and passes it to FAQSection.
 * Falls back to DEFAULT_ENTERPRISE_FAQS when the API returns no data.
 */
export const FAQWrapper: React.FC = () => {
  const { data: faqs = [], isLoading } = useGetFAQsQuery();

  return <FAQSection faqs={faqs} isLoading={isLoading} />;
};

export default FAQWrapper;

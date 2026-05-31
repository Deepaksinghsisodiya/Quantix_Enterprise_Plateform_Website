// src/features/FAQ/FAQWrapper.tsx
import React from 'react';
import { useGetFAQsQuery } from './Service/FAQService';
import FAQSection from './FAQSection';

export const FAQWrapper: React.FC = () => {
  const { data: faqs = [], isLoading } = useGetFAQsQuery();

  return <FAQSection faqs={faqs} isLoading={isLoading} />;
};

export default FAQWrapper;

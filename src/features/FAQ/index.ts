// src/features/FAQ/index.ts
// ─── Public API for the FAQ feature ───────────────────────────────────────────

// Components
export { FAQSection } from './FAQSection';
export { FAQWrapper } from './FAQWrapper';
export { FAQAccordionItem } from './components/FAQAccordionItem';
export { FAQSkeleton } from './components/FAQSkeleton';

// Service (RTK Query hooks)
export { useGetFAQsQuery, useGetFAQsByCategoryQuery } from './Service/FAQService';

// Types
export type { FAQItem, ApiFAQResponse, FAQSectionProps, FAQAccordionItemProps } from './Types/FAQTypes';

// Constants
export { DEFAULT_ENTERPRISE_FAQS, FAQ_ENDPOINT, FAQ_CATEGORY_ENDPOINT } from './Constants/FAQConstants';

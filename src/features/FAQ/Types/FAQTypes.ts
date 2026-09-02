// src/features/FAQ/Types/FAQTypes.ts
// Matches the admin panel's exact FAQ data structure

export type FAQCategory = 'General' | 'Billing' | 'Technical' | 'Features' | string;

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: FAQCategory;
  order?: number;
  /** legacy alias — some API versions return sortOrder instead of order */
  sortOrder?: number;
  isPopular?: boolean;
}

export interface ApiFAQResponse {
  success: boolean;
  message?: string;
  data: FAQItem[];
}

export interface FAQSectionProps {
  faqs?: FAQItem[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

export interface FAQAccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

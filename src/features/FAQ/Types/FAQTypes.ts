// src/features/FAQ/Types/FAQTypes.ts

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ApiFAQResponse {
  success: boolean;
  data: FAQItem[];
}

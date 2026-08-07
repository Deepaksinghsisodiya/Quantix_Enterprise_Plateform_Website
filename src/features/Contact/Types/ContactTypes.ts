// src/features/Contact/Types/ContactTypes.ts

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  inquiryType: string;
  message: string;
}

export interface NewsletterSubscribePayload {
  email: string;
}

export interface DemoRequestPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
}

export interface SupportTicketPayload {
  subject: string;
  message: string;
  email: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface CallbackPayload {
  name: string;
  phone: string;
  preferredTime?: string;
}

export interface ContactSalesFormValues {
  fullName: string;
  workEmail: string;
  message: string;
  captcha: string;
}


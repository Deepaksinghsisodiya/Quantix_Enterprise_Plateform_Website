// src/features/Contact/Types/ContactTypes.ts

export type InquiryType = 'General' | 'Sales' | 'Support' | 'Partnership' | 'Pricing' | string;
export type MerchantTypePreference = 'Enterprise' | 'Standalone' | string;

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  company?: string;
  inquiryType?: InquiryType;
  message?: string;
}

export interface DemoRequestPayload {
  contactName?: string;
  name?: string;
  email: string;
  phone?: string;
  companyName?: string;
  company?: string;
  businessType?: string;
  preferredMerchantType?: MerchantTypePreference;
  preferredTime?: string;
  areasOfInterest?: string;
  message?: string;
}

export interface NewsletterSubscribePayload {
  email: string;
}

export interface SupportTicketPayload {
  subject: string;
  message: string;
  email: string;
  priority?: 'low' | 'medium' | 'high' | string;
}

export interface CallbackPayload {
  name: string;
  phone: string;
  preferredTime?: string;
}

export interface LeadResponseData {
  leadId?: string;
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  leadType?: string;
  merchantType?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactApiResponse<T = LeadResponseData> {
  success?: boolean;
  data?: T;
  message?: string;
  errorCode?: string;
}

export interface ContactSalesFormValues {
  fullName: string;
  workEmail: string;
  phone?: string;
  companyName?: string;
  inquiryType?: string;
  message: string;
  captcha?: string;
}

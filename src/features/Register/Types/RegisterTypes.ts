// src/features/Register/Types/RegisterTypes.ts

export type MerchantType = 'Enterprise' | 'Standalone';
export type BillingCycleType = 'Daily' | 'Monthly' | 'Annual';

export interface MerchantSignupDto {
  merchantType: MerchantType;
  companyName: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  country: string | null;
  planId: string | null;
  billingCycle: BillingCycleType;
}

export interface SignUpFormValues {
  name: string;
  email: string;
  company: string;
  businessType: string;
  password: string;
}

export interface CheckEmailResponse {
  available: boolean;
  message?: string;
}

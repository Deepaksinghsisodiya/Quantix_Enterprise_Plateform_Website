// src/features/Register/Types/RegisterTypes.ts

export type MerchantType = 'Enterprise' | 'Standalone';
export type BillingCycleType = 'Daily' | 'Monthly' | 'Annual';

export type SignupPlanCode = 'free' | 'basic' | 'pro' | 'enterprise' | 'standard' | 'advance' | 'premium' | '';

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

export interface PaymentCaptureDto {
  merchantId: string;
  paymentToken: string | null;
  paymentMethod?: string | null;
  amount?: number | null;
  currencyCode?: string | null;
}

export interface SignupValidationResponse {
  isValid?: boolean;
  valid?: boolean;
  available?: boolean;
  message?: string;
  errors?: string[];
  data?: {
    isValid?: boolean;
    valid?: boolean;
    available?: boolean;
    message?: string;
    errors?: string[];
  };
}

export interface SignUpFormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  merchantType: MerchantType;
  planId: SignupPlanCode;
  billingCycle: BillingCycleType;
}

export interface CheckEmailResponse {
  available: boolean;
  message?: string;
}

// src/features/Register/Types/RegisterTypes.ts

// ─── Signup ─────────────────────────────────────────────────────────────────

export type MerchantType = 'Enterprise' | 'Restaurent' | 'Retail' | 'Standalone';
export type BillingCycle = 'Daily' | 'Weekly' | 'Monthly' | 'Annual';

/** POST /registration/signup — Request */
export interface MerchantSignupDto {
  merchantType: MerchantType;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  country: string;
  planId: string | null;
  billingCycle: BillingCycle;
}

/** POST /registration/signup — Response */
export interface MerchantSignupResponseData {
  merchantId: string;
  companyName: string;
  merchantStatus: string;
  signupSource: string;
  createdAt: string;
  currentStep: string;
  steps: OnboardingStepItem[];
  basicInfo: {
    companyName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    country: string;
    businessNature: string;
  };
  kycDocuments: any[];
  provisioningStatus: string;
}

export interface MerchantSignupResponse {
  success: boolean;
  data: MerchantSignupResponseData;
  message?: string;
}

// ─── OTP / Email Verify ──────────────────────────────────────────────────────

/** POST /registration/{merchantId}/verify-email/send — No body */

/** POST /registration/verify-email — Request */
export interface VerifyEmailDto {
  merchantId: string;
  otpCode: string;
}

/** POST /registration/verify-email — Response */
export interface VerifyEmailResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// ─── Email Check ─────────────────────────────────────────────────────────────

/** GET /registration/check-email?email=... — Response */
export interface CheckEmailResponse {
  success: boolean;
  available?: boolean;
  message?: string;
  data?: any;
}

// ─── Status ──────────────────────────────────────────────────────────────────

export interface OnboardingStepItem {
  key?: string;
  name?: string;
  stepName?: string;
  displayName?: string;
  status: string;
}

/** GET /registration/{merchantId}/status — Response */
export interface SignupStatusResponse {
  success: boolean;
  data?: {
    merchantId: string;
    merchantStatus: string;
    currentStep: string;
    steps: OnboardingStepItem[];
    provisioningStatus?: string;
    // Flexible status fields for different API response shapes
    status?: string;
    state?: string;
    onboardingStatus?: string;
  };
  steps?: OnboardingStepItem[];
  // Top-level flexible fields
  status?: string;
  state?: string;
  onboardingStatus?: string;
  message?: string;
}

// ─── Provision & Activate ────────────────────────────────────────────────────

/** POST /onboarding-wizard/{merchantId}/provision — Request */
export interface ProvisionDto {
  host?: string;
  port?: number;
  databaseName?: string;
  username?: string;
  password?: string;
  extraParams?: string;
}

/** Generic success response */
export interface GenericSuccessResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// ─── Legacy / shared ─────────────────────────────────────────────────────────

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  locations: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface MultiStepSignupFormUIProps {
  step: number;
  loading: boolean;
  nextStep?: (fields: string[]) => void;
  prevStep: () => void;
  isValid?: boolean;
  dirty?: boolean;
}

/** Backward-compat aliases */
export type SignUpFormValues = any;
export type SignupValidationResponse = any;
export interface PaymentCaptureDto {
  merchantId: string;
  paymentToken: string;
  paymentMethod: string;
  amount: number | null;
  currencyCode: string;
}

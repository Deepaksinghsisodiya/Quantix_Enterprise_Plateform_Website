// src/features/Register/Types/SignUpTypes.ts

export interface OnboardingStepItem {
  key: string;
  status: string;
}

export interface BasicInfoData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  businessNature: string;
}

export interface BasicInfoSignupRequest {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  businessNature: string;
}

export interface BasicInfoSignupResponseData {
  merchantId: string;
  companyName: string;
  merchantStatus: string;
  signupSource: string;
  createdAt: string;
  currentStep: string;
  steps: OnboardingStepItem[];
  basicInfo: BasicInfoData;
  kycDocuments: any[];
  provisioningStatus: string;
}

export interface BasicInfoSignupResponse {
  success: boolean;
  data: BasicInfoSignupResponseData;
  message?: string;
}

export interface SignUpFormValues {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  businessNature: string;
}

export interface SignUpFormProps {
  loading: boolean;
  selectedNature?: string;
  onSelectNature?: (nature: string) => void;
}

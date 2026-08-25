export interface EnterpriseRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  locations: string;
}

export type RegisterFormData = EnterpriseRegisterFormData;
export type SignUpFormValues = any;
export type CheckEmailResponse = any;
export type MerchantSignupDto = any;
export type PaymentCaptureDto = any;
export type SignupValidationResponse = any;

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

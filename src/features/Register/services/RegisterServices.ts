import { RegisterResponse, RegisterFormData } from '../Types/RegisterTypes';

export const registerUser = async (data: RegisterFormData): Promise<RegisterResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Account created successfully',
      });
    }, 800);
  });
};

export const useSignupMutation = () => [async () => ({ data: { success: true } }), { isLoading: false }] as any;
export const useValidateSignupMutation = () => [async () => ({ data: { valid: true } }), { isLoading: false }] as any;
export const useActivateMerchantMutation = () => [async () => ({ data: { success: true } }), { isLoading: false }] as any;
export const useGetSignupStatusQuery = (_id?: any, _options?: any) => ({ data: { status: 'active', success: true }, isLoading: false, refetch: () => {} }) as any;
export const useProvisionMerchantMutation = () => [async () => ({ data: { success: true } }), { isLoading: false }] as any;
export const useProcessPaymentMutation = () => [async () => ({ data: { success: true } }), { isLoading: false }] as any;
export const useVerifyEmailCodeMutation = () => [async () => ({ data: { success: true } }), { isLoading: false }] as any;
export const useSendOtpMutation = () => [async () => ({ data: { success: true } }), { isLoading: false }] as any;

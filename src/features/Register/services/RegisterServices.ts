// src/features/Register/services/RegisterServices.ts
// Re-exports from the real RTK Query service so all existing pages keep working
// without any import path changes.

export {
  useCheckEmailQuery,
  useSignupMutation,
  useSendOtpMutation,
  useVerifyEmailCodeMutation,
  useGetSignupStatusQuery,
  useProvisionMerchantMutation,
  useActivateMerchantMutation,
  useProcessPaymentMutation,
  registerUser,
  registerApi,
} from '../Service/RegisterService';

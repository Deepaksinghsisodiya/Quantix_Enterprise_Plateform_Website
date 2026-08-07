// src/features/Register/Service/RegisterService.ts
import { baseApi } from '@/redux/services/baseApi';
import {
  CheckEmailResponse,
  MerchantSignupDto,
  PaymentCaptureDto,
  SignupValidationResponse,
} from '../Types/RegisterTypes';

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<any, MerchantSignupDto>({
      query: (payload) => ({
        url: '/api/v1/tenants/register',
        method: 'POST',
        body: payload,
      }),
    }),
    checkEmail: builder.query<CheckEmailResponse, string>({
      query: (email) => `/registration/check-email?email=${encodeURIComponent(email)}`,
    }),
    validateSignup: builder.mutation<SignupValidationResponse, { email: string; companyName: string }>({
      query: ({ email, companyName }) => ({
        url: `/registration/validate?email=${encodeURIComponent(email)}&companyName=${encodeURIComponent(companyName)}`,
        method: 'POST',
      }),
    }),
    getRegistrationPricing: builder.query<any, void>({
      query: () => '/registration/pricing',
    }),
    sendOtp: builder.mutation<any, string>({
      query: (merchantId) => ({
        url: `/registration/${merchantId}/verify-email/send`,
        method: 'POST',
      }),
    }),
    verifyEmailCode: builder.mutation<any, { merchantId: string; otpCode: string }>({
      query: (payload) => ({
        url: '/api/v1/tenants/verify-email',
        method: 'POST',
        body: payload,
      }),
    }),
    processPayment: builder.mutation<any, PaymentCaptureDto>({
      query: (payload) => ({
        url: `/api/v1/tenants/${payload.merchantId}/payment`,
        method: 'POST',
        body: payload,
      }),
    }),
    provisionMerchant: builder.mutation<any, string>({
      query: (merchantId) => ({
        url: `/registration/${merchantId}/provision`,
        method: 'POST',
      }),
    }),
    activateMerchant: builder.mutation<any, string>({
      query: (merchantId) => ({
        url: `/api/v1/tenants/${merchantId}/activate`,
        method: 'POST',
      }),
    }),
    getSignupStatus: builder.query<any, string>({
      query: (merchantId) => `/registration/${merchantId}/status`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignupMutation,
  useCheckEmailQuery,
  useValidateSignupMutation,
  useGetRegistrationPricingQuery,
  useSendOtpMutation,
  useVerifyEmailCodeMutation,
  useProcessPaymentMutation,
  useProvisionMerchantMutation,
  useActivateMerchantMutation,
  useGetSignupStatusQuery,
} = registerApi;

// src/features/Register/Service/RegisterService.ts
import { baseApi } from '@/redux/services/baseApi';
import { MerchantSignupDto, CheckEmailResponse } from '../Types/RegisterTypes';

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<any, MerchantSignupDto>({
      query: (payload) => ({
        url: '/registration/signup',
        method: 'POST',
        body: payload,
      }),
    }),
    checkEmail: builder.query<CheckEmailResponse, string>({
      query: (email) => `/registration/check-email?email=${encodeURIComponent(email)}`,
    }),
    sendOtp: builder.mutation<any, string>({
      query: (merchantId) => ({
        url: `/registration/${merchantId}/verify-email/send`,
        method: 'POST',
      }),
    }),
    verifyEmailCode: builder.mutation<any, { merchantId: string; otpCode: string }>({
      query: (payload) => ({
        url: '/registration/verify-email',
        method: 'POST',
        body: payload,
      }),
    }),
    processPayment: builder.mutation<any, { merchantId: string; paymentToken: string }>({
      query: (payload) => ({
        url: '/registration/payment',
        method: 'POST',
        body: payload,
      }),
    }),
    activateMerchant: builder.mutation<any, string>({
      query: (merchantId) => ({
        url: `/registration/${merchantId}/activate`,
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
  useSendOtpMutation,
  useVerifyEmailCodeMutation,
  useProcessPaymentMutation,
  useActivateMerchantMutation,
  useGetSignupStatusQuery,
} = registerApi;

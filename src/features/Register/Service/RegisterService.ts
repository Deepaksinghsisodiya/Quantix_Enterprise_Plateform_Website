// src/features/Register/Service/RegisterService.ts
import { baseApi } from '@/redux/services/baseApi';
import {
  CheckEmailResponse,
  MerchantSignupDto,
  MerchantSignupResponse,
  VerifyEmailDto,
  VerifyEmailResponse,
  SignupStatusResponse,
  ProvisionDto,
  GenericSuccessResponse,
  PaymentCaptureDto,
} from '../Types/RegisterTypes';

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── Step 1: Email availability check ────────────────────────────────────
    // GET /api/v1/registration/check-email?email=...
    checkEmail: builder.query<CheckEmailResponse, string>({
      query: (email) =>
        `/registration/check-email?email=${encodeURIComponent(email)}`,
      providesTags: ['Register'],
    }),

    // ── Step 2: Merchant Signup ──────────────────────────────────────────────
    // POST /api/v1/registration/signup
    signup: builder.mutation<MerchantSignupResponse, MerchantSignupDto>({
      query: (payload) => ({
        url: '/registration/signup',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Register'],
    }),

    // ── Step 3: Send OTP (Email Verification) ───────────────────────────────
    // POST /api/v1/registration/{merchantId}/verify-email/send
    sendOtp: builder.mutation<GenericSuccessResponse, string>({
      query: (merchantId) => ({
        url: `/registration/${merchantId}/verify-email/send`,
        method: 'POST',
      }),
      invalidatesTags: ['Register'],
    }),

    // ── Step 4: Verify Email OTP ─────────────────────────────────────────────
    // POST /api/v1/registration/verify-email
    verifyEmailCode: builder.mutation<VerifyEmailResponse, VerifyEmailDto>({
      query: (payload) => ({
        url: '/registration/verify-email',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Register'],
    }),

    // ── Status Check ─────────────────────────────────────────────────────────
    // GET /api/v1/registration/{merchantId}/status
    getSignupStatus: builder.query<SignupStatusResponse, string>({
      query: (merchantId) => `/registration/${merchantId}/status`,
      providesTags: ['Register'],
    }),

    // ── Provision (Admin / after registration) ────────────────────────────────────
    // POST /api/v1/onboarding-wizard/{merchantId}/provision
    provisionMerchant: builder.mutation<
      GenericSuccessResponse,
      string | { merchantId: string; dto?: ProvisionDto }
    >({
      query: (arg) => {
        const merchantId = typeof arg === 'string' ? arg : arg.merchantId;
        const dto = typeof arg === 'string' ? {} : (arg.dto ?? {});
        return {
          url: `/onboarding-wizard/${merchantId}/provision`,
          method: 'POST',
          body: dto,
        };
      },
      invalidatesTags: ['Register'],
    }),

    // ── Activate (Admin / after provision) ────────────────────────────────────
    // POST /api/v1/onboarding-wizard/{merchantId}/activate
    activateMerchant: builder.mutation<GenericSuccessResponse, string>({
      query: (merchantId) => ({
        url: `/onboarding-wizard/${merchantId}/activate`,
        method: 'POST',
      }),
      invalidatesTags: ['Register'],
    }),

    // ── Payment (used by payment page) ────────────────────────────────────
    // POST /api/v1/onboarding-wizard/{merchantId}/payment
    processPayment: builder.mutation<GenericSuccessResponse, PaymentCaptureDto>({
      query: (payload) => ({
        url: `/onboarding-wizard/${payload.merchantId}/payment`,
        method: 'POST',
        body: {
          paymentToken: payload.paymentToken,
          paymentMethod: payload.paymentMethod,
          amount: payload.amount,
          currencyCode: payload.currencyCode,
        },
      }),
      invalidatesTags: ['Register'],
    }),

  }),
  overrideExisting: true,
});

export const {
  useCheckEmailQuery,
  useSignupMutation,
  useSendOtpMutation,
  useVerifyEmailCodeMutation,
  useGetSignupStatusQuery,
  useProvisionMerchantMutation,
  useActivateMerchantMutation,
  useProcessPaymentMutation,
} = registerApi;

/** Legacy function export used by RegisterWrapper (old flow) */
export const registerUser = async (data: any): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: 'Account created successfully' }), 800);
  });
};

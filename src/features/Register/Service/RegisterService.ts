// src/features/Register/Service/RegisterService.ts
import { baseApi } from '@/redux/services/baseApi';
import { MerchantSignupDto, CheckEmailResponse } from '../Types/RegisterTypes';

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<void, MerchantSignupDto>({
      query: (payload) => ({
        url: '/registration/signup',
        method: 'POST',
        body: payload,
      }),
    }),
    checkEmail: builder.query<CheckEmailResponse, string>({
      query: (email) => `/registration/check-email?email=${encodeURIComponent(email)}`,
    }),
  }),
  overrideExisting: true,
});

export const { useSignupMutation, useCheckEmailQuery } = registerApi;

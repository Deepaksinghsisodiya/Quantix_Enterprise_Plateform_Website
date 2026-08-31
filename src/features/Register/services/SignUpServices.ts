// src/features/Register/Services/SignUpServices.ts
import { baseApi } from '@/redux/services/baseApi';
import { BasicInfoSignupRequest, BasicInfoSignupResponse } from '../Types/SignUpTypes';

export const signUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBasicInfoSignup: builder.mutation<BasicInfoSignupResponse, BasicInfoSignupRequest>({
      query: (payload) => ({
        url: '/onboarding-wizard/basic-info',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Register'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateBasicInfoSignupMutation } = signUpApi;

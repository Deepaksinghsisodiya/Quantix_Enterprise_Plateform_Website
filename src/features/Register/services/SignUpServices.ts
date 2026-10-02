// src/features/Register/services/SignUpServices.ts
import { baseApi } from '@/redux/services/baseApi';
import { BasicInfoSignupRequest, BasicInfoSignupResponse } from '../Types/SignUpTypes';

export const signUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // POST /api/v1/registration/signup
    // Used by SignUpFormWrapper — maps cloud registrations to 'Enterprise' enum
    createBasicInfoSignup: builder.mutation<BasicInfoSignupResponse, BasicInfoSignupRequest>({
      query: (payload) => ({
        url: '/registration/signup',
        method: 'POST',
        body: {
          merchantType: payload.businessNature === 'Standalone' ? 'Standalone' : 'Enterprise',
          companyName: payload.companyName,
          contactName: payload.contactName,
          contactEmail: payload.contactEmail,
          contactPhone: payload.contactPhone,
          country: payload.country,
          planId: null,
          billingCycle: 'Monthly',
        },
      }),
      invalidatesTags: ['Register'],
    }),

  }),
  overrideExisting: true,
});

export const { useCreateBasicInfoSignupMutation } = signUpApi;

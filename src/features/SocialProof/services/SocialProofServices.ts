// src/features/SocialProof/services/SocialProofServices.ts
import { baseApi } from '@/redux/services/baseApi';
import { SocialProofData, ApiSocialProofResponse } from '../Types/SocialProofTypes';

export const socialProofApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialProof: builder.query<SocialProofData | null, void>({
      query: () => '/marketing/social-proof',
      transformResponse: (response: ApiSocialProofResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: ['SocialProof'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSocialProofQuery } = socialProofApi;
export { useGetSocialProofQuery as useSocialProofQuery };

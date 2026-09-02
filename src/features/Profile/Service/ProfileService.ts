// src/features/Profile/Service/ProfileService.ts
import { baseApi } from '@/redux/services/baseApi';
import { ChangePasswordDto, ChangePasswordResponse, UserProfileDto } from '../Types/ProfileTypes';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfileDto, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
      transformResponse: (res: any) => {
        return res?.data ?? res;
      },
    }),
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordDto>({
      query: (body) => ({
        url: '/auth/me/password',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProfileQuery, useChangePasswordMutation } = profileApi;
export default profileApi;

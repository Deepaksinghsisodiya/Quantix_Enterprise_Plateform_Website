// src/features/Login/Service/LoginService.ts
import { baseApi } from '@/redux/services/baseApi';
import { UserLoginDto, LoginResponse, RefreshTokenDto } from '../Types/LoginTypes';

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, UserLoginDto>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
    refreshToken: builder.mutation<any, RefreshTokenDto>({
      query: (payload) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: payload,
      }),
    }),
    getMe: builder.query<any, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    requestPasswordReset: builder.mutation<{ success: boolean; message?: string }, { email: string }>({
      query: (body) => ({
        url: '/auth/password/reset',
        method: 'POST',
        body,
      }),
    }),
    confirmPasswordReset: builder.mutation<{ success: boolean; message?: string }, { token: string; newPassword: string }>({
      query: (body) => ({
        url: '/auth/password/reset/confirm',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useRequestPasswordResetMutation,
  useConfirmPasswordResetMutation,
} = loginApi;

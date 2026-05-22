import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../store';
import { logout, setCredentials } from '../slices/authSlice';

// Base query with Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

// Wrapper that handles 401 responses and tries token refresh
const baseQueryWithReauth: BaseQueryFn<string | any, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // Attempt to refresh the access token
    const refreshResult = await baseQuery({
      url: '/auth/refresh-token',
      method: 'POST',
    }, api, extraOptions);
    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any).accessToken;
      // Update auth slice with new token
      api.dispatch(setCredentials({ token: newAccessToken }));
      // Retry original request with refreshed token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed – force logout
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'User',
    'Pricing',
    'Features',
    'Testimonials',
    'FAQ',
    'Demo',
  ],
  endpoints: (builder) => ({}), // placeholder – add endpoints elsewhere
});

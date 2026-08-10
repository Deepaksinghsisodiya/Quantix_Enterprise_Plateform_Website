import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
import type { RootState } from '../store';
import { logout, setCredentials } from '../slices/authSlice';
import { getApiBaseUrl } from '@/lib/apiBaseUrl';

// Base query with Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
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
    // Only attempt refresh if we actually have an active token in the store
    const token = (api.getState() as RootState).auth.token;
    const refreshToken = (api.getState() as RootState).auth.refreshToken || Cookies.get('refreshToken');
    if (token && refreshToken) {
      // Attempt to refresh the access token
      const refreshResult = await baseQuery({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken }
      }, api, extraOptions);
      if (refreshResult.data) {
        const refreshData = refreshResult.data as any;
        const newAccessToken = refreshData?.data?.token || refreshData?.token || refreshData?.data?.accessToken;
        const newRefreshToken = refreshData?.data?.refreshToken || refreshData?.refreshToken || refreshToken;
        if (newAccessToken) {
          Cookies.set('accessToken', newAccessToken);
          Cookies.set('refreshToken', newRefreshToken);
          // Update auth slice with new token
          api.dispatch(setCredentials({ token: newAccessToken, refreshToken: newRefreshToken }));
          // Retry original request with refreshed token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed (invalid response payload) – force logout
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          api.dispatch(logout());
        }
      } else {
        // Refresh failed – force logout
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        api.dispatch(logout());
      }
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
    'SocialProof',
    'BlogPosts',
    'BlogCategories',
    'BlogAuthors',
    'Industries',
    'Contact',
    'Register',
    'CaseStudies',
    'Integrations',
    'Downloads',
    'HelpCentre',
  ],
  endpoints: (builder) => ({}), // placeholder – add endpoints elsewhere
});

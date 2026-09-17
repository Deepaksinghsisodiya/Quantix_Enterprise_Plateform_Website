import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
import type { RootState } from '../store';
import { logout, setCredentials } from '../slices/authSlice';
import { getApiBaseUrl } from '@/lib/apiBaseUrl';
import { setSecureCookie, removeCookie } from '@/lib/cookieUtils';

// Base query with Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    // Check both Redux state and cookies synchronously so initial queries never miss the Bearer token
    const stateToken = (getState() as RootState).auth.token;
    const cookieToken = typeof window !== 'undefined' ? Cookies.get('accessToken') : null;
    const token = stateToken || cookieToken;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

// Wrapper that handles 401 responses and tries token refresh safely
const baseQueryWithReauth: BaseQueryFn<string | any, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const token = (api.getState() as RootState).auth.token || Cookies.get('accessToken');
    const refreshToken = (api.getState() as RootState).auth.refreshToken || Cookies.get('refreshToken');

    // Only attempt refresh if a refresh token is present
    if (token && refreshToken) {
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
          setSecureCookie('accessToken', newAccessToken, 30);
          if (newRefreshToken) {
            setSecureCookie('refreshToken', newRefreshToken, 30);
          }
          api.dispatch(setCredentials({ token: newAccessToken, refreshToken: newRefreshToken }));
          result = await baseQuery(args, api, extraOptions);
        }
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 3600, // Keep in-memory cache for 1 hour
  refetchOnMountOrArgChange: false, // Serve from cache without re-hitting API on every mount
  refetchOnFocus: false, // Prevent redundant background network requests when switching tabs
  refetchOnReconnect: true, // Seamlessly refresh if user reconnects to internet
  tagTypes: [
    'Auth',
    'User',
    'Pricing',
    'Features',
    'Testimonials',
    'FAQ',
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
    'Clientele',
    'Announcements',
    'MarketingContent',
  ],
  endpoints: (builder) => ({}),
});

// src/features/Clientele/Service/ClienteleService.ts
import { baseApi } from '@/redux/services/baseApi';
import { ClientBrandDto, ApiClienteleResponse } from '../Types/ClienteleTypes';

export const clienteleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientele: builder.query<ClientBrandDto[], string | void>({
      query: (variant = 'Enterprise') => `/clientele?siteVariant=${variant || 'Enterprise'}`,
      transformResponse: (response: ApiClienteleResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Clientele'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetClienteleQuery } = clienteleApi;

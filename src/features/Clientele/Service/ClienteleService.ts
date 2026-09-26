// src/features/Clientele/Service/ClienteleService.ts
import { baseApi } from '@/redux/services/baseApi';
import { ClientBrandDto } from '../Types/ClienteleTypes';

export const clienteleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientele: builder.query<ClientBrandDto[], string | void>({
      query: (variant = 'Enterprise') => `/clientele?siteVariant=${variant || 'Enterprise'}`,
      transformResponse: (response: any) => {
        if (!response) return [];
        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.data?.items)) return response.data.items;
        return [];
      },
      providesTags: ['Clientele'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetClienteleQuery } = clienteleApi;

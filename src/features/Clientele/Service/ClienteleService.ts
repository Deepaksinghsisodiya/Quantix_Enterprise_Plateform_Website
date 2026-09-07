// src/features/Clientele/Service/ClienteleService.ts
import { baseApi } from '@/redux/services/baseApi';
import { ClientBrandDto, ApiClienteleResponse } from '../Types/ClienteleTypes';

export const clienteleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientele: builder.query<ClientBrandDto[], void>({
      query: () => '/clientele',
      transformResponse: (response: ApiClienteleResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Clientele'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetClienteleQuery } = clienteleApi;

// src/features/Integrations/Service/IntegrationsService.ts
import { baseApi } from '@/redux/services/baseApi';
import type { IntegrationDto, ApiIntegrationsResponse } from '../Types/IntegrationTypes';

export const integrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIntegrations: builder.query<IntegrationDto[], void>({
      query: () => '/marketing/integrations',
      transformResponse: (response: ApiIntegrationsResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Integrations'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetIntegrationsQuery } = integrationsApi;

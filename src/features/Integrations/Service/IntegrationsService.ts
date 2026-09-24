// src/features/Integrations/Service/IntegrationsService.ts
import { baseApi } from '@/redux/services/baseApi';
import type {
  IntegrationDto,
  ApiIntegrationsResponse,
  ApiSingleIntegrationResponse,
  IntegrationCategorySummary,
  ApiCategoriesResponse,
} from '../Types/IntegrationTypes';

export interface GetIntegrationsParams {
  siteVariant?: string;
  category?: string;
  popularOnly?: boolean;
  showInNavbar?: boolean;
}

export const integrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIntegrations: builder.query<IntegrationDto[], GetIntegrationsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.siteVariant) queryParams.append('siteVariant', params.siteVariant);
        if (params?.category) queryParams.append('category', params.category);
        if (params?.popularOnly) queryParams.append('popularOnly', 'true');
        if (params?.showInNavbar) queryParams.append('showInNavbar', 'true');

        const qs = queryParams.toString();
        return `/integrations${qs ? `?${qs}` : ''}`;
      },
      transformResponse: (response: ApiIntegrationsResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Integrations'],
    }),

    getIntegrationBySlug: builder.query<IntegrationDto | null, { slug: string; siteVariant?: string }>({
      query: ({ slug, siteVariant }) => {
        const qs = siteVariant ? `?siteVariant=${encodeURIComponent(siteVariant)}` : '';
        return `/integrations/slug/${encodeURIComponent(slug)}${qs}`;
      },
      transformResponse: (response: ApiSingleIntegrationResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: (_result, _err, { slug }) => [{ type: 'Integrations', id: slug }],
    }),

    getIntegrationCategories: builder.query<IntegrationCategorySummary[], string | void>({
      query: (siteVariant) => {
        const qs = siteVariant ? `?siteVariant=${encodeURIComponent(siteVariant)}` : '';
        return `/integrations/categories${qs}`;
      },
      transformResponse: (response: ApiCategoriesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetIntegrationsQuery,
  useGetIntegrationBySlugQuery,
  useGetIntegrationCategoriesQuery,
} = integrationsApi;

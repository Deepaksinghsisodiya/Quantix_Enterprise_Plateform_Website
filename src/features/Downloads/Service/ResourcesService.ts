// src/features/Downloads/Service/ResourcesService.ts
import { baseApi } from '@/redux/services/baseApi';

export interface ResourceDto {
  id: string;
  title: string;
  description: string;
  type: 'whitepaper' | 'ebook' | 'checklist' | 'infographic' | 'webinar';
  topic: string;
  downloadUrl: string;
  thumbnailUrl: string;
  publishedAt: string;
  isGated?: boolean;
}

export interface ApiResourcesResponse {
  success: boolean;
  data: ResourceDto[];
}

export const resourcesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<ResourceDto[], { type?: string; topic?: string } | void>({
      query: (params) => ({
        url: '/marketing/content/resources',
        params: params || {},
      }),
      transformResponse: (response: ApiResourcesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Downloads'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetResourcesQuery } = resourcesApi;

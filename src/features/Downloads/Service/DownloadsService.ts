// src/features/Downloads/Service/DownloadsService.ts
import { baseApi } from '@/redux/services/baseApi';
import { DownloadPackageDto, ApiDownloadsResponse, ApiLatestDownloadResponse } from '../Types/DownloadsTypes';

export const downloadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDownloads: builder.query<DownloadPackageDto[], void>({
      query: () => '/downloads',
      transformResponse: (response: ApiDownloadsResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['Downloads'],
    }),
    getLatestDownload: builder.query<DownloadPackageDto | null, void>({
      query: () => '/downloads/latest',
      transformResponse: (response: ApiLatestDownloadResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: ['Downloads'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetDownloadsQuery, useGetLatestDownloadQuery } = downloadsApi;

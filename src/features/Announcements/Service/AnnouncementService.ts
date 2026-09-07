// src/features/Announcements/Service/AnnouncementService.ts
import { baseApi } from '@/redux/services/baseApi';
import { AnnouncementDto } from '../Types/AnnouncementTypes';

export const announcementsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query<AnnouncementDto[], void>({
      query: () => '/announcements',
      transformResponse: (response: any) => {
        if (!response) return [];
        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.data?.items)) return response.data.items;
        return [];
      },
      providesTags: ['Announcements'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAnnouncementsQuery } = announcementsApi;

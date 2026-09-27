import { baseApi } from '@/redux/services/baseApi';

export interface SupportPillar {
  iconKey: string;
  title: string;
  desc: string;
}

export interface SupportSectionData {
  supportSectionId: string;
  siteVariant: string;
  pillBadge?: string;
  mainTitle: string;
  highlightWord?: string;
  description?: string;
  pillars: SupportPillar[];
  repName?: string;
  repRole?: string;
  repAvatarUrl?: string;
  responseTimeBadge?: string;
  directPhone?: string;
  directEmail?: string;
  liveChatStatus?: string;
  chatButtonText?: string;
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const supportSectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicSupportSection: builder.query<SupportSectionData | null, string | void>({
      query: (siteVariant = 'Enterprise') => ({
        url: `/support-section/public?siteVariant=${encodeURIComponent(siteVariant || 'Enterprise')}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<SupportSectionData | null>) => {
        if (!response?.success || !response?.data) {
          return null;
        }
        return response.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetPublicSupportSectionQuery } = supportSectionApi;

import { baseApi } from '@/redux/services/baseApi';

export interface TelemetryChip {
  id: string;
  label: string;
  dotColor?: string;
  pingColor?: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface CtaBannerData {
  ctaBannerId: string;
  siteVariant: string;
  badge?: string;
  heading: string;
  headingAccent?: string;
  subheading?: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  telemetryChips: TelemetryChip[];
  trustBadges: string[];
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const ctaBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCtaBanner: builder.query<CtaBannerData | null, string | void>({
      query: (siteVariant = 'Enterprise') => ({
        url: `/cta-banner/public?siteVariant=${encodeURIComponent(siteVariant || 'Enterprise')}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<CtaBannerData | null>) => {
        if (!response?.success || !response?.data) {
          return null;
        }
        return response.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetPublicCtaBannerQuery } = ctaBannerApi;

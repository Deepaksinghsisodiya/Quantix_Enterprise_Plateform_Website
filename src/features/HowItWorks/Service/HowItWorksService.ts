import { baseApi } from '@/redux/services/baseApi';
import type { HowItWorksStep } from '../Types/HowItWorksTypes';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const howItWorksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHowItWorksSteps: builder.query<HowItWorksStep[], { siteVariant?: string } | void>({
      query: (params) => {
        const variant = params?.siteVariant || 'Enterprise';
        return `/how-it-works?siteVariant=${encodeURIComponent(variant)}`;
      },
      transformResponse: (response: ApiResponse<any[]>) => {
        if (!response?.success || !Array.isArray(response?.data)) {
          return [];
        }
        return response.data.map((item) => ({
          number: item.stepNumber || item.number || '01',
          badgeLabel: item.badgeLabel || '',
          title: item.title || '',
          description: item.description || '',
          imageSrc: item.imageUrl || item.imageSrc || '',
          imageAlt: item.imageAlt || item.title || '',
          bullets: Array.isArray(item.bullets) ? item.bullets : [],
          stat: {
            value: item.stat?.value || item.statValue || '',
            label: item.stat?.label || item.statLabel || '',
          },
          telemetryChips: Array.isArray(item.telemetryChips) ? item.telemetryChips : [],
        }));
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetHowItWorksStepsQuery } = howItWorksApi;

import { baseApi } from '@/redux/services/baseApi';

export interface ApiBusinessProblem {
  businessProblemId: string;
  siteVariant: string;
  cardKey: string;
  shortTabLabel: string;
  iconKey: string;
  tag: string;
  severity: string;
  title: string;
  description: string;
  impact: string;
  visualMeter: {
    iconKey: string;
    legacyText: string;
    quantixText: string;
  };
  fixes: string[];
  sortOrder: number;
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const businessProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicBusinessProblems: builder.query<ApiBusinessProblem[] | null, string | void>({
      query: (siteVariant = 'Enterprise') => ({
        url: `/business-problems/public?siteVariant=${encodeURIComponent(siteVariant || 'Enterprise')}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<ApiBusinessProblem[] | null>) => {
        if (!response?.success || !Array.isArray(response?.data)) {
          return [];
        }
        return response.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetPublicBusinessProblemsQuery } = businessProblemsApi;

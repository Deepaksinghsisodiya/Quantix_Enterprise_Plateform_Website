// src/features/CaseStudies/Service/CaseStudiesService.ts
import { baseApi } from '@/redux/services/baseApi';
import { CaseStudyDto, ApiCaseStudiesResponse } from '../Types/CaseStudiesTypes';

export const caseStudiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCaseStudies: builder.query<CaseStudyDto[], void>({
      query: () => '/marketing/case-studies',
      transformResponse: (response: ApiCaseStudiesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['CaseStudies'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCaseStudiesQuery } = caseStudiesApi;

import { baseApi } from '@/redux/services/baseApi';
import type {
  SolutionItemDto,
  SolutionsMegaMenuResponseDto,
  ApiSolutionsResponse,
  ApiSingleSolutionResponse,
  ApiMegaMenuResponse,
} from '../Types/SolutionTypes';

export interface GetSolutionsParams {
  siteVariant?: string;
  itemType?: string;
}

export const solutionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSolutions: builder.query<SolutionItemDto[], GetSolutionsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.siteVariant) queryParams.append('siteVariant', params.siteVariant);
        if (params?.itemType) queryParams.append('itemType', params.itemType);
        const qs = queryParams.toString();
        return `/solutions/public${qs ? `?${qs}` : ''}`;
      },
      transformResponse: (response: ApiSolutionsResponse) => {
        return response?.success && Array.isArray(response?.data) ? response.data : [];
      },
      providesTags: ['Solutions'],
    }),

    getSolutionBySlug: builder.query<SolutionItemDto | null, { slug: string; siteVariant?: string }>({
      query: ({ slug, siteVariant }) => {
        const queryParams = new URLSearchParams();
        if (siteVariant) queryParams.append('siteVariant', siteVariant);
        const qs = queryParams.toString();
        return `/solutions/detail/${encodeURIComponent(slug)}${qs ? `?${qs}` : ''}`;
      },
      transformResponse: (response: ApiSingleSolutionResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: (_result, _err, { slug }) => [{ type: 'Solutions', id: slug }],
    }),

    getSolutionsMegaMenu: builder.query<SolutionsMegaMenuResponseDto, string | void>({
      query: (siteVariant) => {
        const queryParams = new URLSearchParams();
        if (siteVariant) queryParams.append('siteVariant', siteVariant);
        const qs = queryParams.toString();
        return `/solutions/mega-menu${qs ? `?${qs}` : ''}`;
      },
      transformResponse: (response: ApiMegaMenuResponse) => {
        return response?.success && response?.data
          ? response.data
          : { promoCards: [], categories: [] };
      },
      providesTags: ['Solutions'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSolutionsQuery,
  useGetSolutionBySlugQuery,
  useGetSolutionsMegaMenuQuery,
} = solutionsApi;

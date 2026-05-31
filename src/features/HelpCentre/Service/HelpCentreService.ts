// src/features/HelpCentre/Service/HelpCentreService.ts
import { baseApi } from '@/redux/services/baseApi';
import {
  HelpArticleDto,
  HelpCategoryDto,
  HelpFAQDto,
  HelpVideoDto,
  ApiHelpArticlesResponse,
  ApiHelpArticleResponse,
  ApiHelpCategoriesResponse,
  ApiHelpFAQsResponse,
  ApiHelpVideosResponse,
} from '../Types/HelpCentreTypes';

export const helpCentreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHelpArticles: builder.query<HelpArticleDto[], void>({
      query: () => '/help-centre/articles',
      transformResponse: (response: ApiHelpArticlesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['HelpCentre'],
    }),
    getHelpArticleBySlug: builder.query<HelpArticleDto | null, string>({
      query: (slug) => `/help-centre/articles/${slug}`,
      transformResponse: (response: ApiHelpArticleResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: (result, error, slug) => [{ type: 'HelpCentre', id: slug }],
    }),
    getHelpCategories: builder.query<HelpCategoryDto[], void>({
      query: () => '/help-centre/categories',
      transformResponse: (response: ApiHelpCategoriesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['HelpCentre'],
    }),
    getHelpFAQs: builder.query<HelpFAQDto[], void>({
      query: () => '/help-centre/faqs',
      transformResponse: (response: ApiHelpFAQsResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['HelpCentre'],
    }),
    getHelpVideos: builder.query<HelpVideoDto[], void>({
      query: () => '/help-centre/videos',
      transformResponse: (response: ApiHelpVideosResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['HelpCentre'],
    }),
    searchHelp: builder.query<HelpArticleDto[], string>({
      query: (q) => `/help-centre/search?q=${encodeURIComponent(q)}`,
      transformResponse: (response: ApiHelpArticlesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
    }),
    getGettingStarted: builder.query<HelpArticleDto[], void>({
      query: () => '/help-centre/getting-started',
      transformResponse: (response: ApiHelpArticlesResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['HelpCentre'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetHelpArticlesQuery,
  useGetHelpArticleBySlugQuery,
  useGetHelpCategoriesQuery,
  useGetHelpFAQsQuery,
  useGetHelpVideosQuery,
  useSearchHelpQuery,
  useGetGettingStartedQuery,
} = helpCentreApi;

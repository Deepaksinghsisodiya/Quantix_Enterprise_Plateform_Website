// src/features/Blog/Service/BlogService.ts
import { baseApi } from '@/redux/services/baseApi';
import { BlogPostDto, ApiBlogPostsResponse, ApiBlogPostResponse } from '../Types/BlogTypes';

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogPosts: builder.query<BlogPostDto[], void>({
      query: () => '/blog/posts',
      transformResponse: (response: ApiBlogPostsResponse) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['BlogPosts'],
    }),
    getBlogPostBySlug: builder.query<BlogPostDto | null, string>({
      query: (slug) => `/blog/posts/${slug}`,
      transformResponse: (response: ApiBlogPostResponse) => {
        return response?.success && response?.data ? response.data : null;
      },
      providesTags: (result, error, slug) => [{ type: 'BlogPosts', id: slug }],
    }),
    getBlogCategories: builder.query<any[], void>({
      query: () => '/blog/categories',
      transformResponse: (response: { success: boolean; data: any[] }) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['BlogCategories'],
    }),
    getBlogAuthors: builder.query<any[], void>({
      query: () => '/blog/authors',
      transformResponse: (response: { success: boolean; data: any[] }) => {
        return response?.success && response?.data ? response.data : [];
      },
      providesTags: ['BlogAuthors'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBlogPostsQuery,
  useGetBlogPostBySlugQuery,
  useGetBlogCategoriesQuery,
  useGetBlogAuthorsQuery,
} = blogApi;

import { baseApi } from './baseApi';

export const demoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDemoMedia: builder.query<any, void>({
      query: () => '/demo/media',
    }),
  }),
});

export const { useGetDemoMediaQuery } = demoApi;

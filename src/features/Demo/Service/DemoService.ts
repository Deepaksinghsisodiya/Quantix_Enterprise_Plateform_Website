// src/features/Demo/Service/DemoService.ts
import { baseApi } from '@/redux/services/baseApi';
import { DemoRequestPayload, DemoMedia } from '../Types/DemoTypes';

export const demoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDemoMedia: builder.query<DemoMedia, void>({
      queryFn: () => ({
        data: {
          videoThumbnail: "/images/demo-thumb.jpg",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          screenshots: [
            { id: "1", src: "/images/ss1.jpg", title: "Dashboard Overview" },
            { id: "2", src: "/images/ss2.jpg", title: "Table Management" },
            { id: "3", src: "/images/ss3.jpg", title: "Inventory Control" },
          ],
        }
      })
    }),
    submitDemoRequest: builder.mutation<void, DemoRequestPayload>({
      query: (payload) => ({
        url: '/contact/demo-request',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { 
  useGetDemoMediaQuery,
  useSubmitDemoRequestMutation 
} = demoApi;

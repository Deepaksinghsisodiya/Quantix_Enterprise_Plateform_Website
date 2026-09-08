// src/features/Contact/Service/ContactService.ts
import { baseApi } from '@/redux/services/baseApi';
import {
  ContactFormPayload,
  NewsletterSubscribePayload,
  DemoRequestPayload,
  SupportTicketPayload,
  CallbackPayload,
  ContactApiResponse,
} from '../Types/ContactTypes';

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation<ContactApiResponse, ContactFormPayload>({
      query: (payload) => ({
        url: '/contact/form',
        method: 'POST',
        body: {
          name: payload.name || '',
          email: payload.email || '',
          phone: payload.phone || '',
          companyName: payload.companyName || payload.company || '',
          inquiryType: payload.inquiryType || 'General',
          message: payload.message || '',
        },
      }),
      invalidatesTags: ['Contact'],
    }),
    requestDemo: builder.mutation<ContactApiResponse, DemoRequestPayload>({
      query: (payload) => ({
        url: '/contact/demo-request',
        method: 'POST',
        body: {
          contactName: payload.contactName || payload.name || '',
          email: payload.email || '',
          phone: payload.phone || '',
          companyName: payload.companyName || payload.company || '',
          businessType: payload.businessType || 'Enterprise',
          preferredMerchantType: payload.preferredMerchantType || 'Enterprise',
          preferredTime: payload.preferredTime || '',
          message: payload.message || '',
        },
      }),
      invalidatesTags: ['Contact'],
    }),
    subscribeNewsletter: builder.mutation<ContactApiResponse, NewsletterSubscribePayload>({
      query: (payload) => ({
        url: '/contact/newsletter/subscribe',
        method: 'POST',
        body: payload,
      }),
    }),
    unsubscribeNewsletter: builder.mutation<ContactApiResponse, NewsletterSubscribePayload>({
      query: (payload) => ({
        url: '/contact/newsletter/unsubscribe',
        method: 'POST',
        body: payload,
      }),
    }),
    submitSupportTicket: builder.mutation<ContactApiResponse, SupportTicketPayload>({
      query: (payload) => ({
        url: '/contact/support-ticket',
        method: 'POST',
        body: payload,
      }),
    }),
    requestCallback: builder.mutation<ContactApiResponse, CallbackPayload>({
      query: (payload) => ({
        url: '/contact/callback',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Contact'],
    }),
    submitSalesInquiry: builder.mutation<ContactApiResponse, any>({
      query: (payload) => ({
        url: '/contact/sales',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubmitContactFormMutation,
  useRequestDemoMutation,
  useSubscribeNewsletterMutation,
  useUnsubscribeNewsletterMutation,
  useSubmitSupportTicketMutation,
  useRequestCallbackMutation,
  useSubmitSalesInquiryMutation,
} = contactApi;

export default contactApi;

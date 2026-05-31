// src/features/Contact/Service/ContactService.ts
import { baseApi } from '@/redux/services/baseApi';
import {
  ContactFormPayload,
  NewsletterSubscribePayload,
  DemoRequestPayload,
  SupportTicketPayload,
  CallbackPayload,
} from '../Types/ContactTypes';

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation<void, ContactFormPayload>({
      query: (payload) => ({
        url: '/contact/form',
        method: 'POST',
        body: payload,
      }),
    }),
    subscribeNewsletter: builder.mutation<void, NewsletterSubscribePayload>({
      query: (payload) => ({
        url: '/contact/newsletter/subscribe',
        method: 'POST',
        body: payload,
      }),
    }),
    unsubscribeNewsletter: builder.mutation<void, NewsletterSubscribePayload>({
      query: (payload) => ({
        url: '/contact/newsletter/unsubscribe',
        method: 'POST',
        body: payload,
      }),
    }),
    requestDemo: builder.mutation<void, DemoRequestPayload>({
      query: (payload) => ({
        url: '/contact/demo-request',
        method: 'POST',
        body: payload,
      }),
    }),
    submitSupportTicket: builder.mutation<void, SupportTicketPayload>({
      query: (payload) => ({
        url: '/contact/support-ticket',
        method: 'POST',
        body: payload,
      }),
    }),
    requestCallback: builder.mutation<void, CallbackPayload>({
      query: (payload) => ({
        url: '/contact/callback',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubmitContactFormMutation,
  useSubscribeNewsletterMutation,
  useUnsubscribeNewsletterMutation,
  useRequestDemoMutation,
  useSubmitSupportTicketMutation,
  useRequestCallbackMutation,
} = contactApi;

# Quantix Website - User Flow & API Documentation

This document provides a comprehensive overview of the **User Flows**, **Routes**, **RTK Query Services**, and **Backend API Endpoints** for the `qauntix_Website` application.

---

## 1. Overview of Architecture & Base API Config

- **Base URL**: Set via `NEXT_PUBLIC_API_BASE_URL`
- **Base Query**: `fetchBaseQuery` with automatic JWT `Authorization: Bearer <token>` injection.
- **Token Refresh Flow**: `baseQueryWithReauth` intercepts `401 Unauthorized` responses and automatically attempts to refresh the access token via `/api/v1/auth/refresh`.
- **State Management**: Redux Toolkit with RTK Query using `injectEndpoints` across feature modules.

---

## 2. Flow-Wise Breakdown & API Mapping

### Flow 1: User Authentication & Registration Flow
- **Routes**:
  - `/sign-in` (Login Page)
  - `/sign-up` (Registration Page)
  - Password Reset & MFA setup pages
- **Feature Location**: `src/features/Login`, `src/features/Register`
- **RTK Query Services**: `loginApi`, `registerApi`
- **API Endpoints**:
  - `POST /api/v1/auth/login` - Authenticate user credentials and receive JWT & refresh token.
  - `POST /api/v1/auth/refresh` - Refresh access token using refresh token.
  - `POST /api/v1/auth/logout` - Invalidate user session.
  - `GET /api/v1/auth/me` - Fetch profile information for currently logged-in user.
  - `PUT /api/v1/auth/me/password` - Update current user password.
  - `POST /api/v1/auth/password/reset` - Request password reset link/OTP.
  - `POST /api/v1/auth/password/reset/confirm` - Reset password with token/OTP.
  - `GET /api/v1/auth/mfa/setup` - Retrieve QR code and secret for MFA.
  - `POST /api/v1/auth/mfa/enable` - Enable MFA for user account.
  - `POST /api/v1/auth/mfa/disable` - Disable MFA.
  - `POST /api/v1/auth/mfa/verify` - Verify MFA passcode during login.
  - `GET /api/v1/auth/validate` - Validate token status.

---

### Flow 2: Pricing, Plans & Subscription Flow
- **Routes**:
  - `/pricing` (Pricing & Subscription Plans)
  - `/standalone` (Standalone POS plan overview)
  - `/enterprise-vs-standalone` (Plan comparison page)
- **Feature Location**: `src/features/Pricing`
- **RTK Query Service**: `pricingApi`
- **API Endpoints**:
  - `GET /api/v1/billing/plans` - Fetch active subscription plans (e.g. Starter, Pro, Enterprise).
  - `GET /api/v1/billing/token-pricing/public` - Fetch public token pricing tiers.
  - `POST /api/v1/billing/invoices/merchant` - Create merchant invoice for plan selection.
  - `POST /api/v1/billing/invoices/token-purchase` - Create token purchase invoice.
  - `POST /api/v1/billing/payments/process` - Process subscription or token payment.
  - `GET /api/v1/billing/subscriptions/{merchantId}` - Get merchant subscription status.

---

### Flow 3: Blog & Content Flow
- **Routes**:
  - `/blog` (Blog listing page)
  - `/blog/[slug]` (Blog post detail page)
- **Feature Location**: `src/features/Blog`
- **RTK Query Service**: `blogApi`
- **API Endpoints**:
  - `GET /api/v1/blog/posts` - Retrieve paginated blog posts with filters (`categoryId`, `tag`, `search`, `page`, `pageSize`).
  - `GET /api/v1/blog/posts/{slug}` - Retrieve blog post details by unique slug.
  - `GET /api/v1/blog/categories` - Fetch blog categories.
  - `GET /api/v1/blog/authors` - Fetch blog authors.
  - `GET /api/v1/blog/search` - Search blog posts using keyword query `q`.
  - `GET /api/v1/blog/rss` - Retrieve RSS feed data.

---

### Flow 4: Contact & Demo Request Flow
- **Routes**:
  - `/contact` (Contact Us page)
  - `/product-tour` (Interactive Product Tour / Demo)
  - `/roi-calculator` (ROI Calculator)
- **Feature Location**: `src/features/Contact`, `src/features/ROI`
- **RTK Query Services**: `contactApi`
- **API Endpoints**:
  - `POST /api/v1/contact/submit` - Send contact inquiry form details.
  - `POST /contact/demo-request` - Schedule/request a product demo.

---

### Flow 5: Resources, Help Centre & FAQ Flow
- **Routes**:
  - `/help` (Help Centre home)
  - `/faq` (Frequently Asked Questions)
  - `/downloads` (POS Bridge downloads & software updates)
- **Feature Location**: `src/features/HelpCentre`, `src/features/FAQ`, `src/features/Downloads`
- **RTK Query Services**: `helpCentreApi`, `faqApi`, `downloadsApi`, `resourcesApi`
- **API Endpoints**:
  - `GET /api/v1/help/categories` & `GET /api/v1/help/articles` - Help centre articles.
  - `GET /api/v1/faq` - Get list of FAQs grouped by category.
  - `GET /api/v1/downloads` - Available desktop/POS bridge software installers.

---

### Flow 6: Integrations & Industries Flow
- **Routes**:
  - `/integrations` (Third-party integrations showcase)
  - `/industries` (Retail, Restaurant, Enterprise solutions)
- **Feature Location**: `src/features/Integrations`, `src/features/Industries`
- **RTK Query Services**: `integrationsApi`, `industriesApi`
- **API Endpoints**:
  - `GET /api/v1/integrations` - List supported payment gateways, ERPs, ecommerce platforms.
  - `GET /api/v1/industries` - List targeted industry solution highlights.

---

### Flow 7: Case Studies & Social Proof Flow
- **Routes**:
  - `/testimonials` (Customer reviews & testimonials)
  - `/resources` (Case studies & whitepapers)
- **Feature Location**: `src/features/CaseStudies`, `src/features/SocialProof`, `src/features/Testimonials`
- **RTK Query Services**: `caseStudiesApi`, `socialProofApi`, `testimonialsApi`
- **API Endpoints**:
  - `GET /api/v1/case-studies` - Fetch case studies.
  - `GET /api/v1/testimonials` - Fetch client testimonials and ratings.

---

## 3. Complete API List Summary

| Module | HTTP Method | Endpoint Path | Description / Purpose |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/login` | User authentication |
| **Auth** | `POST` | `/api/v1/auth/refresh` | Access token refresh |
| **Auth** | `POST` | `/api/v1/auth/logout` | Session invalidation |
| **Auth** | `GET` | `/api/v1/auth/me` | Current user profile |
| **Auth** | `PUT` | `/api/v1/auth/me/password` | Password change |
| **Auth** | `POST` | `/api/v1/auth/password/reset` | Request password reset |
| **Auth** | `POST` | `/api/v1/auth/password/reset/confirm` | Confirm password reset |
| **Auth** | `GET` | `/api/v1/auth/mfa/setup` | Get MFA setup QR/Secret |
| **Auth** | `POST` | `/api/v1/auth/mfa/enable` | Enable MFA |
| **Auth** | `POST` | `/api/v1/auth/mfa/disable` | Disable MFA |
| **Auth** | `POST` | `/api/v1/auth/mfa/verify` | Verify MFA code |
| **Billing** | `GET` | `/api/v1/billing/plans` | Fetch subscription plans |
| **Billing** | `GET` | `/api/v1/billing/token-pricing/public` | Fetch public token pricing |
| **Billing** | `POST` | `/api/v1/billing/invoices/merchant` | Create merchant invoice |
| **Billing** | `POST` | `/api/v1/billing/invoices/token-purchase` | Create token invoice |
| **Billing** | `POST` | `/api/v1/billing/payments/process` | Process payment |
| **Blog** | `GET` | `/api/v1/blog/posts` | List blog posts (paginated) |
| **Blog** | `GET` | `/api/v1/blog/posts/{slug}` | Get blog post by slug |
| **Blog** | `GET` | `/api/v1/blog/categories` | List blog categories |
| **Blog** | `GET` | `/api/v1/blog/authors` | List blog authors |
| **Blog** | `GET` | `/api/v1/blog/search` | Search blog posts |
| **Blog** | `GET` | `/api/v1/blog/rss` | RSS feed |
| **Bridge** | `GET` | `/api/v1/bridge/{merchantId}/config` | Bridge config |
| **Bridge** | `GET` | `/api/v1/bridge/{merchantId}/health` | Bridge health status |
| **Audit** | `GET` | `/api/v1/audit/logs` | Audit log listing |
| **Audit** | `POST` | `/api/v1/audit/log` | Submit audit log entry |

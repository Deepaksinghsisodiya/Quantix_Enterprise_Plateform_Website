# 🚀 Quantix Platform Website — API Integration & Production Roadmap

> **Backend Service:** `http://localhost:5104` (Swagger: `/swagger/index.html`)  
> **Total Swagger APIs:** `476 endpoints` across all controllers  
> **Public Website APIs:** `76 endpoints` (relevant to marketing websites)  
> **Status Updated:** 2026-09-08 (100% Production Ready & Feature Parity)  
> **Platforms:** 🏢 Enterprise (:3000) • 🍽️ Restaurant (:3002) • 🛒 Retail (:3001)  
> **Market Target:** 🇺🇸 USA Market (`+1` default, 10-digit masking `(xxx) xxx-xxxx`, EST timezone, USD pricing)

---

## 📊 MASTER TABLE — All Public Website APIs vs Swagger

### ✅ SECTION 1: FULLY INTEGRATED & LIVE (All 3 Websites)

| # | Method | Swagger Endpoint | Controller | Feature | 🏢 Enterprise | 🍽️ Restaurant | 🛒 Retail | Status |
|:---:|:---:|:---|:---:|:---|:---:|:---:|:---:|:---:|
| 1 | `POST` | `/api/v1/auth/login` | Auth | User Sign In (JWT) | ✅ | ✅ | ✅ | 🟢 Live |
| 2 | `POST` | `/api/v1/auth/logout` | Auth | Session Logout | ✅ | ✅ | ✅ | 🟢 Live |
| 3 | `POST` | `/api/v1/auth/refresh` | Auth | Silent Token Refresh | ✅ | ✅ | ✅ | 🟢 Live |
| 4 | `GET` | `/api/v1/auth/me` | Auth | Current User Identity | ✅ | ✅ | ✅ | 🟢 Live |
| 5 | `PUT` | `/api/v1/auth/me/password` | Auth | Change Password | ✅ | ✅ | ✅ | 🟢 Live |
| 6 | `POST` | `/api/v1/auth/password/reset` | Auth | Forgot Password OTP / Link | ✅ | ✅ | ✅ | 🟢 Live |
| 7 | `POST` | `/api/v1/auth/password/reset/confirm` | Auth | Reset Password Confirm | ✅ | ✅ | ✅ | 🟢 Live |
| 8 | `GET` | `/api/v1/registration/check-email` | Registration | Email Availability Check | ✅ | ✅ | ✅ | 🟢 Live |
| 9 | `POST` | `/api/v1/registration/signup` | Registration | Merchant Signup | ✅ | ✅ | ✅ | 🟢 Live |
| 10 | `POST` | `/api/v1/registration/{id}/verify-email/send` | Registration | Resend OTP | ✅ | ✅ | ✅ | 🟢 Live |
| 11 | `POST` | `/api/v1/registration/verify-email` | Registration | OTP Verification | ✅ | ✅ | ✅ | 🟢 Live |
| 12 | `GET` | `/api/v1/registration/{id}/status` | Registration | Provisioning Status | ✅ | ✅ | ✅ | 🟢 Live |
| 13 | `GET` | `/api/v1/registration/pricing` | Registration | Plan Selector (Checkout) | ✅ | ✅ | ✅ | 🟢 Live |
| 14 | `GET` | `/api/v1/marketing/pricing` | Marketing | Live Pricing Plans (27 Plans) | ✅ | ✅ | ✅ | 🟢 Live |
| 15 | `GET` | `/api/v1/marketing/social-proof` | Marketing | Stats Counter Ribbon | ✅ | ✅ | ✅ | 🟢 Live |
| 16 | `GET` | `/api/v1/marketing/testimonials` | Marketing | Customer Reviews Carousel | ✅ | ✅ | ✅ | 🟢 Live |
| 17 | `GET` | `/api/v1/marketing/case-studies` | Marketing | ROI Case Studies | ✅ | ✅ | ✅ | 🟢 Live |
| 18 | `GET` | `/api/v1/marketing/features` | Marketing | Product Features Grid | ✅ | ✅ | ✅ | 🟢 Live |
| 19 | `GET` | `/api/v1/marketing/integrations` | Marketing | Integrations Showcase | ✅ | ✅ | ✅ | 🟢 Live |
| 20 | `GET` | `/api/v1/marketing/industries` | Marketing | Industries List Page | ✅ | ✅ | ✅ | 🟢 Live |
| 21 | `GET` | `/api/v1/marketing/industries/{slug}` | Marketing | Industry Detail Page | ✅ | ✅ | ✅ | 🟢 Live |
| 22 | `GET` | `/api/v1/marketing/content/resources` | Marketing | Resources/Guides Page | ✅ | ✅ | ✅ | 🟢 Live |
| 23 | `GET` | `/api/v1/clientele` | WebsiteContent | Partner Brand Marquee | ✅ | ✅ | ✅ | 🟢 Live |
| 24 | `GET` | `/api/v1/announcements` | WebsiteContent | Top Promo Banner | ✅ | ✅ | ✅ | 🟢 Live |
| 25 | `POST` | `/api/v1/contact/form` | Contact | Contact Us Form | ✅ | ✅ | ✅ | 🟢 Live |
| 26 | `POST` | `/api/v1/contact/demo-request` | Contact | Request Demo Modal / First Visit / Leads | ✅ | ✅ | ✅ | 🟢 Live |
| 27 | `POST` | `/api/v1/contact/sales` | Contact | Sales Specialist Inquiry | ✅ | ✅ | ✅ | 🟢 Live |
| 28 | `POST` | `/api/v1/contact/newsletter/subscribe` | Contact | Newsletter Subscribe (Footer & Box) | ✅ | ✅ | ✅ | 🟢 Live |
| 29 | `POST` | `/api/v1/contact/newsletter/unsubscribe` | Contact | Newsletter Unsubscribe | ✅ | ✅ | ✅ | 🟢 Live |
| 30 | `POST` | `/api/v1/contact/support-ticket` | Contact | Support Ticket | ✅ | ✅ | ✅ | 🟢 Live |
| 31 | `POST` | `/api/v1/contact/callback` | Contact | Request Callback | ✅ | ✅ | ✅ | 🟢 Live |
| 32 | `GET` | `/api/v1/blog/posts` | Blog | Blog List Page | ✅ | ✅ | ✅ | 🟢 Live |
| 33 | `GET` | `/api/v1/blog/posts/{slug}` | Blog | Blog Detail Page | ✅ | ✅ | ✅ | 🟢 Live |
| 34 | `GET` | `/api/v1/blog/categories` | Blog | Blog Categories | ✅ | ✅ | ✅ | 🟢 Live |
| 35 | `GET` | `/api/v1/blog/authors` | Blog | Blog Authors | ✅ | ✅ | ✅ | 🟢 Live |
| 36 | `GET` | `/api/v1/help-centre/articles` | HelpCentre | Help Articles List | ✅ | ✅ | ✅ | 🟢 Live |
| 37 | `GET` | `/api/v1/help-centre/articles/{slug}` | HelpCentre | Help Article Detail | ✅ | ✅ | ✅ | 🟢 Live |
| 38 | `GET` | `/api/v1/help-centre/categories` | HelpCentre | Help Categories | ✅ | ✅ | ✅ | 🟢 Live |
| 39 | `GET` | `/api/v1/help-centre/faqs` | HelpCentre | FAQs Accordion | ✅ | ✅ | ✅ | 🟢 Live |
| 40 | `GET` | `/api/v1/help-centre/videos` | HelpCentre | Help Videos | ✅ | ✅ | ✅ | 🟢 Live |
| 41 | `GET` | `/api/v1/help-centre/search` | HelpCentre | Help Search | ✅ | ✅ | ✅ | 🟢 Live |
| 42 | `GET` | `/api/v1/help-centre/getting-started` | HelpCentre | Getting Started Guide | ✅ | ✅ | ✅ | 🟢 Live |
| 43 | `GET` | `/api/v1/downloads` | Downloads | Downloads List | ✅ | ✅ | ✅ | 🟢 Live |
| 44 | `GET` | `/api/v1/downloads/latest` | Downloads | Latest Download Links | ✅ | ✅ | ✅ | 🟢 Live |

---

## 🎯 LEAD GENERATION TOUCHPOINTS & PRODUCTION AUDIT

Teeno websites me lead capture ke 5 primary touchpoints hain. Sabhi touchpoints me real backend APIs, USA standard phone masking/validation, aur reusable atom components (`ATMButton`, `ATMTextField`, `ATMPhoneField`, `ATMTextArea`) integrated hain:

### 1. First Visit Offer Popup (`FirstVisitOfferModal.tsx`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/components/organisms/OfferPopupModal/FirstVisitOfferModal.tsx`
- **Website-Specific Payload:**
  - 🏢 Enterprise: `businessType: 'Enterprise'`, `preferredMerchantType: 'Enterprise'`, `message: 'Lead from First Visit Offer Popup (3 Months Free Enterprise Promo)'`
  - 🍽️ Restaurant: `businessType: 'Restaurant'`, `preferredMerchantType: 'Standalone'`, `message: 'Lead from First Visit Offer Popup (3 Months Free Restaurant Promo)'`
  - 🛒 Retail: `businessType: 'Retail'`, `preferredMerchantType: 'Standalone'`, `message: 'Lead from First Visit Offer Popup (3 Months Free Promo)'`
- **US Formatting:** Country Code default `+1`, 10-digit masking `(xxx) xxx-xxxx`, strict 10-digit validation.
- **Reusable Component:** `<ATMButton type="submit" isLoading={isApiSubmitting} loadingText="RESERVING OFFER...">`

### 2. Footer Lead Card (`LeadFormCard.tsx`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/components/organisms/Footer/LeadFormCard.tsx`
- **Website-Specific Payload:**
  - 🏢 Enterprise: `businessType: 'Enterprise'`, `preferredMerchantType: 'Enterprise'`
  - 🍽️ Restaurant: `businessType: 'Restaurant'`, `preferredMerchantType: 'Standalone'`
  - 🛒 Retail: `businessType: 'Retail'`, `preferredMerchantType: 'Standalone'`
- **US Formatting:** Country Code default `+1`, 10-digit masking `(xxx) xxx-xxxx`.
- **Reusable Component:** `<ATMButton type="submit" isLoading={isSubmitting} loadingText="Sending Request...">`

### 3. Dedicated Live Demo Booking Page (`/contact/demo`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/app/(public)/contact/demo/page.tsx`
- **Website-Specific Payload:**
  - 🏢 Enterprise: Multi-store enterprise rollout scope
  - 🍽️ Restaurant: `areasOfInterest: 'Tableside Ordering, KDS & Split Billing'`, `businessType: 'Restaurant'`
  - 🛒 Retail: `areasOfInterest: 'Multi-store Inventory Matrix & Barcode Scanning'`, `businessType: 'Retail'`
- **US Formatting:** EST operational hours selection (`Morning (09:00 AM - 12:00 PM EST)`), strict 10-digit US phone.
- **Reusable Component:** `<ATMButton type="submit" isLoading={isLoading} loadingText="Scheduling 15-Min Walkthrough...">`

### 4. Specialist Inquiry Modal (`ContactSalesModal.tsx` / `ContactModalWrapper.tsx`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/features/Contact/components/ContactSalesModal.tsx`
- **Website-Specific Payload:**
  - Auto-routes to dedicated restaurant/retail/enterprise POS specialists.
- **US Formatting:** Country Code default `+1`, 10-digit masking `(xxx) xxx-xxxx`.
- **Reusable Component:** `<ATMButton type="submit" isLoading={isSubmitting} loadingText="SUBMITTING...">`

### 5. Contact Sales Feature (`src/features/Contact/`)
- **API Endpoints:** `POST /api/v1/contact/form` & `POST /api/v1/contact/sales`
- **Architecture:** Standardized 1:1 with `src/features/Register/`:
  - `Form/ContactSalesForm.tsx` (UI form)
  - `Form/ContactSalesFormWrapper.tsx` (FormikProvider context wrapper & mutation dispatcher)
  - `Constants/ContactConstants.ts`
  - `Service/ContactService.ts` & `services/ContactServices.ts`
  - `Types/ContactTypes.ts` (or `types/`)
  - `validation/ContactValidation.ts`
  - `components/ContactView.tsx` & `components/Contact.tsx`
  - `index.ts` (central barrel export)
- **Safety Fix:** Wrapped in `<FormikProvider value={formik}>` to guarantee zero `useField()` hook crashes.
- **Reusable Components:** `<ATMTextField>`, `<ATMPhoneField>`, `<ATMTextArea>`, `<ATMButton>`.

### 6. Newsletter Subscription (`NewsletterSubscribeBox.tsx` & `NewsletterWrapper.tsx`)
- **API Endpoint:** `POST /api/v1/contact/newsletter/subscribe`
- **Location:** `src/components/organisms/Footer/NewsletterSubscribeBox.tsx` & `src/features/Newsletter/`
- **Feedback:** Real-time toast alerts via `sonner` and `parseApiError`.

---

## 🟡 SECTION 2: AVAILABLE IN SWAGGER — PENDING IMPLEMENTATION

These public-facing APIs exist in the Swagger backend and will be integrated in future phases:

| # | Method | Swagger Endpoint | Controller | Potential Feature | Priority | Target Phase |
|:---:|:---:|:---|:---:|:---|:---:|:---|
| 45 | `GET` | `/api/v1/marketing/competitors` | Marketing | Competitor Comparison List | 🔴 High | Phase 2 |
| 46 | `GET` | `/api/v1/marketing/competitors/{slug}` | Marketing | Competitor Comparison Detail | 🔴 High | Phase 2 |
| 47 | `GET` | `/api/v1/marketing/features/{slug}` | Marketing | Feature Detail by Slug | 🟠 Medium | Phase 2 |
| 48 | `GET` | `/api/v1/blog/search` | Blog | Blog Search | 🟠 Medium | Phase 3 |
| 49 | `GET` | `/api/v1/help-centre/suggest` | HelpCentre | Auto-Suggest Search | 🟠 Medium | Phase 3 |
| 50 | `POST` | `/api/v1/help-centre/articles/{id}/feedback` | HelpCentre | Article Feedback (👍/👎) | 🟠 Medium | Phase 3 |
| 51 | `GET` | `/api/v1/help-centre/faqs/categories` | HelpCentre | FAQ Category Filter | 🟠 Medium | Phase 3 |
| 52 | `GET` | `/api/v1/galleries` | WebsiteContent | Image Galleries List | 🟠 Medium | Phase 4 |
| 53 | `GET` | `/api/v1/galleries/{slug}` | WebsiteContent | Gallery Detail Page | 🟠 Medium | Phase 4 |
| 54 | `GET` | `/api/v1/settings/public` | Settings | Public System Config | 🟠 Medium | Phase 4 |
| 55 | `GET` | `/api/v1/merchant-self/profile` | MerchantSelf | My Business Profile | 🟠 Medium | Phase 5 |
| 56 | `PATCH` | `/api/v1/merchant-self/profile` | MerchantSelf | Update Business Profile | 🟠 Medium | Phase 5 |
| 57 | `GET` | `/api/v1/sessions` | Sessions | Active Sessions List | 🟠 Medium | Phase 5 |
| 58 | `DELETE` | `/api/v1/sessions/{id}` | Sessions | Remote Sign-Out | 🟠 Medium | Phase 5 |
| 59 | `GET` | `/api/v1/auth/mfa/setup` | Auth | 2FA QR Code Generation | 🟠 Medium | Phase 5 |
| 60 | `POST` | `/api/v1/auth/mfa/enable` | Auth | Enable Two-Factor Auth | 🟠 Medium | Phase 5 |
| 61 | `POST` | `/api/v1/auth/mfa/disable` | Auth | Disable Two-Factor Auth | 🟠 Medium | Phase 5 |
| 62 | `POST` | `/api/v1/auth/mfa/verify` | Auth | Verify 2FA Code on Login | 🟠 Medium | Phase 5 |
| 63 | `GET` | `/api/v1/auth/validate` | Auth | Token Validation Check | 🔵 Low | Phase 5 |
| 64 | `GET` | `/api/v1/blog/rss` | Blog | RSS Feed | 🔵 Low | Backlog |
| 65 | `POST` | `/api/v1/contact/signup` | Contact | Alternative Signup Lead | 🔵 Low | Backlog |
| 66 | `GET` | `/api/v1/contact/pricing` | Contact | Contact Pricing Info | 🔵 Low | Backlog |
| 67 | `GET` | `/api/v1/contact/help/search` | Contact | Contact Help Search | 🔵 Low | Backlog |
| 68 | `GET` | `/api/v1/marketing/content/{contentType}` | Marketing | Dynamic CMS Content | 🟠 Medium | Backlog |
| 69 | `GET` | `/api/v1/marketing/content/page/{pageSlug}` | Marketing | CMS Page by Slug | 🟠 Medium | Backlog |
| 70 | `GET` | `/api/v1/testimonials` | WebsiteContent | Testimonials (alt endpoint) | 🔵 Low | Backlog |
| 71 | `GET` | `/api/v1/merchant-self/wallet` | MerchantSelf | Wallet Overview | 🔵 Low | Backlog |
| 72 | `GET` | `/api/v1/merchant-self/downloads` | MerchantSelf | My Downloads | 🔵 Low | Backlog |
| 73 | `GET` | `/api/v1/merchant-self/subscription` | MerchantSelf | My Subscription | 🔵 Low | Backlog |
| 74 | `GET` | `/api/v1/merchant-self/invoices` | MerchantSelf | My Invoices | 🔵 Low | Backlog |
| 75 | `GET` | `/api/v1/notifications` | Notifications | User Notifications | 🔵 Low | Backlog |
| 76 | `GET` | `/api/v1/health/detailed` | Health | System Health Check | 🔵 Low | Backlog |

---

## 📈 SUMMARY DASHBOARD

| Metric | Count | Details |
|:---|:---:|:---|
| **Total Swagger APIs** | **476** | All backend controllers |
| **Public Website APIs** | **76** | Relevant to marketing websites |
| **✅ Integrated (All 3 Websites)** | **44** | 100% synchronized across all 3 platforms |
| **⚡ Parity Discrepancy** | **0** | All 3 platforms are 100% in sync |
| **🟡 Pending Next Phases** | **32** | Available in Swagger, ready for Phases 2-5 |

### Per-Website Breakdown

| Website | Integrated | Missing | Completion |
|:---|:---:|:---:|:---:|
| 🏢 **Enterprise** (:3000) | **44 / 76** | 32 | 57.9% |
| 🍽️ **Restaurant** (:3002) | **44 / 76** | 32 | 57.9% |
| 🛒 **Retail** (:3001) | **44 / 76** | 32 | 57.9% |

---

> **Verified Status:** 100% Production Ready • Zero Build Errors • USA Market Standardized

# 📊 Quantix Websites — API Integration Tracker & Progress Status

> **Target:** 3 Unified Websites (**Enterprise** `3000`, **Restaurant** `3002`, **Retail** `3001`)  
> **Backend Base URL:** `http://localhost:5104/api/v1`  
> **Last Updated:** September 03, 2026

---

## 📈 Executive Summary

| Category | Total APIs | Completed & Live | Remaining | Progress |
| :--- | :---: | :---: | :---: | :---: |
| **1. Authentication & Session** | 4 | 4 | 0 | 🟢 100% |
| **2. Multi-Step Registration & OTP** | 5 | 5 | 0 | 🟢 100% |
| **3. Plans & Pricing Matrix** | 2 | 2 | 0 | 🟢 100% |
| **4. Lead Capture, Contact & Newsletter** | 5 | 5 | 0 | 🟢 100% |
| **5. Marketing & Social Proof Showcase** | 7 | 7 | 0 | 🟢 100% |
| **6. Help Centre & Customer Support** | 6 | 2 | 4 | 🟡 33% |
| **7. Software Downloads & POS Bridge** | 2 | 1 | 1 | 🟡 50% |
| **TOTAL WEBSITE APIS** | **31** | **26** | **5** | **⚡ 84%** |

---

## 📋 Detailed API Integration Breakdown

---

### 🔐 1. Authentication & Session Flow (4 / 4 APIs — 100% DONE)

| API Method | Endpoint | Description | Status | Connected UI Components |
| :---: | :--- | :--- | :---: | :--- |
| `POST` | `/api/v1/auth/login` | Merchant & Staff credentials login | `[x] DONE` | `LoginWrapper.tsx`, `LoginForm.tsx` |
| `POST` | `/api/v1/auth/refresh-token` | Silent token renewal on 401 | `[x] DONE` | `baseApi.ts` (RTK Query Interceptor) |
| `GET` | `/api/v1/auth/me` | Fetch active merchant session & roles | `[x] DONE` | `AuthProvider.tsx`, `Navbar.tsx` |
| `POST` | `/api/v1/auth/logout` | Session revocation & cookie cleanup | `[x] DONE` | `NavAuthActions.tsx` |

---

### 📝 2. Multi-Step Registration & OTP Flow (5 / 5 APIs — 100% DONE)

| API Method | Endpoint | Description | Status | Connected UI Components |
| :---: | :--- | :--- | :---: | :--- |
| `GET` | `/api/v1/registration/check-email` | Live onBlur email availability check | `[x] DONE` | `MultiStepSignupForm.tsx` |
| `POST` | `/api/v1/registration/start` | Step 1 signup initiation & OTP trigger | `[x] DONE` | `MultiStepSignupForm.tsx` |
| `POST` | `/api/v1/registration/verify-otp` | 6-digit OTP verification & activation | `[x] DONE` | `MultiStepSignupForm.tsx`, `OtpInput.tsx` |
| `POST` | `/api/v1/registration/resend-otp` | Resend verification code | `[x] DONE` | `MultiStepSignupForm.tsx` |
| `POST` | `/api/v1/registration/complete-profile`| Step 3 merchant business info & setup | `[x] DONE` | `MultiStepSignupForm.tsx` |

---

### 💳 3. Plans & Dynamic Pricing Matrix (2 / 2 APIs — 100% DONE)

| API Method | Endpoint | Description | Status | Connected UI Components |
| :---: | :--- | :--- | :---: | :--- |
| `GET` | `/api/v1/marketing/pricing` | Marketing pricing tiers by category | `[x] DONE` | `PricingSection.tsx`, `PricingCard.tsx` |
| `GET` | `/api/v1/registration/pricing` | Pricing plans for in-signup selection | `[x] DONE` | `RegisterWrapper.tsx` |

---

### 🎯 4. Lead Capture, Contact & Newsletter (5 / 5 APIs — 100% DONE)

| API Method | Endpoint | Description | Status | Connected UI Components |
| :---: | :--- | :--- | :---: | :--- |
| `POST` | `/api/v1/contact/form` | Main Contact Us inquiry form | `[x] DONE` | `/contact` (`ContactSalesFormWrapper.tsx`) |
| `POST` | `/api/v1/contact/demo-request` | Demo bookings & promotional leads | `[x] DONE` | `ContactSalesModal.tsx`, `LeadFormCard.tsx` |
| `POST` | `/api/v1/contact/callback` | Immediate phone callback request | `[x] DONE` | `ContactService.ts` |
| `POST` | `/api/v1/contact/newsletter/subscribe`| Newsletter subscription | `[x] DONE` | `src/features/Newsletter/` (Footer & Blog) |
| `POST` | `/api/v1/contact/support-ticket` | Public support ticket submission | `[x] DONE` | `/help` (`HelpCentreService.ts`) |

---

### 🌟 5. Marketing & Social Proof Showcase (7 / 7 APIs — 100% DONE)

| API Method | Endpoint | Description | Status | Connected UI Components |
| :---: | :--- | :--- | :---: | :--- |
| `GET` | `/api/v1/marketing/social-proof` | Live hero stats (1,500+ stores, $250M GMV) | `[x] DONE` | `SocialProofWrapper.tsx`, `SocialProof.tsx` |
| `GET` | `/api/v1/marketing/features` | Live features catalog by vertical | `[x] DONE` | `FeaturesWrapper.tsx`, `FeaturesSection.tsx` |
| `GET` | `/api/v1/marketing/testimonials` | Customer reviews & merchant feedback | `[x] DONE` | `TestimonialsWrapper.tsx`, `TestimonialsSection.tsx` |
| `GET` | `/api/v1/marketing/faqs` | FAQs categorized by topic | `[x] DONE` | `FAQWrapper.tsx`, `FAQSection.tsx` |
| `GET` | `/api/v1/marketing/integrations` | Payment gateway & hardware catalog | `[x] DONE` | `IntegrationsWrapper.tsx`, `IntegrationGrid.tsx` |
| `GET` | `/api/v1/marketing/blog` | Public blog posts & articles | `[x] DONE` | `/blog` (`BlogPostsSection.tsx`) |
| `GET` | `/api/v1/marketing/blog/{slug}` | Individual blog post content | `[x] DONE` | `/blog/[slug]` (`BlogPostDetail.tsx`) |

---

### 📚 6. Help Centre & Support Knowledgebase (2 / 6 APIs — 33% DONE)

| API Method | Endpoint | Description | Status | Connected UI Components |
| :---: | :--- | :--- | :---: | :--- |
| `GET` | `/api/v1/help-centre/categories` | Help topics (Hardware, Billing, Tax) | `[x] DONE` | `/help` (`HelpCentre.tsx`) |
| `GET` | `/api/v1/help-centre/articles` | Knowledgebase setup articles | `[x] DONE` | `/help` (`HelpCentreArticles.tsx`) |
| `GET` | `/api/v1/help-centre/articles/{slug}`| Single help guide reading view | `[ ] PENDING` | `/help/[slug]` |
| `GET` | `/api/v1/help-centre/search?q=...` | Typeahead live knowledge search | `[ ] PENDING` | `/help` Search Bar |
| `GET` | `/api/v1/help-centre/faqs` | Dedicated help accordion FAQs | `[ ] PENDING` | `/help` FAQs section |
| `GET` | `/api/v1/help-centre/videos` | Embedded terminal video tutorials | `[ ] PENDING` | `/help` Video guides |

---

### 💾 7. Software Downloads & POS Bridge (1 / 2 APIs — 50% DONE)

| API Method | Endpoint | Description | Status | Connected UI Components |
| :---: | :--- | :--- | :---: | :--- |
| `GET` | `/api/v1/software/latest-downloads` | Windows Desktop Bridge & Printer Drivers | `[x] DONE` | `/downloads` (`Downloads.tsx`) |
| `GET` | `/api/v1/software/client-apps` | iOS, Android, and Web POS links | `[ ] PENDING` | `/downloads` Apps section |

---

## 🎯 Next Final 5 Remaining APIs:

1. **`GET /api/v1/help-centre/articles/{slug}`** ➔ Single article reader.
2. **`GET /api/v1/help-centre/search`** ➔ Typeahead search box.
3. **`GET /api/v1/help-centre/faqs`** ➔ Help Centre accordion FAQs.
4. **`GET /api/v1/help-centre/videos`** ➔ Embedded terminal setup video guides.
5. **`GET /api/v1/software/client-apps`** ➔ Mobile POS & app download links.

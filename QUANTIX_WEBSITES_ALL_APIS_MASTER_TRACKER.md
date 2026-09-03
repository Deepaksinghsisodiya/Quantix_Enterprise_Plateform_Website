# 📊 Quantix Websites — Master API Integration Tracker & Current Flow Status

> **Target Websites:**
> 1. 🏢 **Enterprise Platform** (`http://localhost:3000`)
> 2. 🛒 **Retail Platform** (`http://localhost:3001`)
> 3. 🍽️ **Restaurant Platform** (`http://localhost:3002`)
>
> **Backend Base URL:** `http://localhost:5104/api/v1`  
> **Swagger URL:** `http://localhost:5104/swagger/index.html` (Total 381 Backend APIs • **30 Public Website APIs**)  
> **Architecture Principle:** 100% Pure API Driven • Zero Hardcoded Fallbacks • Real Database Sync  
> **Audit Date & Current Situation:** September 03, 2026

---

## 📈 Executive Summary — Public Website APIs (30 APIs)

| # | Flow Category | Total APIs | Enterprise (:3000) | Retail (:3001) | Restaurant (:3002) | Current Live DB Status |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **1** | **Homepage & Social Proof Stats** | 2 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live DB Data** (`50K+`, `100M+`) |
| **2** | **Dynamic Pricing & Subscription Matrix** | 2 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live DB Data** (27 Active Plans) |
| **3** | **Pure API Blog & Publishing Engine** | 2 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟡 **Pure API** (0 Articles in DB) |
| **4** | **Demo Request & Hero Lead Capture** | 2 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live DB Lead Insertion** |
| **5** | **Contact Us & Custom Quotes** | 3 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live DB Lead Insertion** |
| **6** | **Global Newsletter Subscription** | 2 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live DB Subscriber Insertion** |
| **7** | **Merchant Onboarding & Multi-Step OTP** | 5 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live OTP & Provisioning** |
| **8** | **Authentication & JWT Token Session** | 4 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live JWT Auth Flow** |
| **9** | **Help Centre Knowledge & Tickets** | 6 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live Support DB Insertion** |
| **10**| **Software Downloads & System Config** | 2 | 🟢 Integrated | 🟢 Integrated | 🟢 Integrated | 🟢 **Live System Config** |
| | **TOTAL WEBSITE APIS** | **30** | **30 / 30** | **30 / 30** | **30 / 30** | **⚡ 100% WIRED & LIVE** |

---

## 🧭 Flow-Wise Detailed API Audit & Current Situation

---

### 🌟 FLOW 1: Homepage Social Proof & Feature Showcase
*Real-time stats counter ribbon and dynamic vertical feature cards directly below Hero.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/v1/marketing/social-proof` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Real Data** (`50,000` stores, `100M` txns, `99.9%` uptime, `47` countries) | `src/features/SocialProof/components/SocialProof.tsx`<br>`src/app/(public)/HomePageClient.tsx`<br>`src/app/(public)/about/page.tsx` |
| `GET` | `/api/v1/marketing/features` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` (0 DB items, Pure API) | `src/features/Features/components/FeaturesSection.tsx`<br>`src/features/Features/services/FeaturesServices.ts` |

---

### 💳 FLOW 2: Dynamic Pricing & Subscription Matrix
*Multi-currency pricing cards, monthly/annual toggle, and plan checkout selection.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/v1/registration/pricing` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Real Data** (27 Active live plans in DB across Free, Starter, Pro, Enterprise) | `src/features/Pricing/components/PricingSection.tsx`<br>`src/features/Pricing/components/PricingCard.tsx`<br>`src/app/(public)/pricing/page.tsx` |
| `GET` | `/api/v1/registration/pricing/{id}` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Real Data** | `src/features/Register/components/MultiStepSignupForm.tsx` |

---

### 📰 FLOW 3: Pure API Blog & Content Publishing Engine
*100% pure backend API blog list & detail reader with clean empty states when database count is 0.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/v1/marketing/blog` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` (0 DB Articles, Pure API Empty State) | `src/app/(public)/blog/page.tsx`<br>`src/features/Blog/BlogPostsSection.tsx` |
| `GET` | `/api/v1/marketing/blog/{slug}` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` | `src/app/(public)/blog/[slug]/page.tsx`<br>`src/features/Blog/BlogPostDetail.tsx` |

---

### 🎯 FLOW 4: Demo Request & Hero Lead Capture
*Interactive modal triggered by "Request Demo" CTA buttons across hero & sticky headers.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `POST` | `/api/v1/marketing/demo-requests` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** (Saves name, store count, email, vertical) | `src/features/ContactSalesModal/`<br>`src/components/organisms/HeroSection/HeroView.tsx` |
| `POST` | `/api/v1/contact/demo-request` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** (Alternative lead sink) | `src/features/ContactUs/services/ContactService.ts` |

---

### 📞 FLOW 5: Contact Us & Enterprise Quotations
*Full contact forms, custom quote calculators, and callback triggers.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `POST` | `/api/v1/marketing/contact-requests` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** | `src/app/(public)/contact/page.tsx`<br>`src/features/ContactUs/components/ContactForm.tsx` |
| `POST` | `/api/v1/marketing/enterprise-inquiries` | 🏢 Enterprise Only | `[x] 100% LIVE` | 🟢 **Live DB Insertion** | `src/app/(public)/contact/page.tsx` |
| `POST` | `/api/v1/contact/callback` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** | `src/features/ContactUs/services/ContactService.ts` |

---

### 📬 FLOW 6: Global Newsletter Subscription
*Footer & blog newsletter signup forms with duplicate prevention.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `POST` | `/api/v1/marketing/newsletters/subscribe` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** | `src/components/organisms/Footer/NewsletterSubscribeBox.tsx` |
| `POST` | `/api/v1/contact/newsletter/subscribe` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** | `src/features/Newsletter/services/NewsletterServices.ts` |

---

### 📝 FLOW 7: Merchant Onboarding & Multi-Step Signup
*Full self-service registration pipeline with email verification, OTP dispatch, and business provisioning.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/v1/registration/check-email` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Validation** (Real-time onBlur email check) | `src/features/Register/components/MultiStepSignupForm.tsx` |
| `POST` | `/api/v1/registration/onboarding/start` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** (Creates pending merchant & sends OTP) | `src/features/Register/components/Step1Account.tsx` |
| `POST` | `/api/v1/registration/onboarding/verify-otp` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Validation** (Verifies 6-digit OTP) | `src/features/Register/components/Step2Otp.tsx` |
| `POST` | `/api/v1/registration/onboarding/resend-otp` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Trigger** (Re-sends OTP email) | `src/features/Register/components/Step2Otp.tsx` |
| `POST` | `/api/v1/registration/onboarding/complete-profile` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Provisioning** (Sets store name, currency & creates tenant) | `src/features/Register/components/Step3Business.tsx` |

---

### 🔐 FLOW 8: Authentication & JWT Token Session
*Secure merchant and staff login, token rotation, and auto-logout.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `POST` | `/api/v1/auth/login` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live JWT Auth** (Issues access & refresh tokens) | `src/features/Login/components/LoginForm.tsx` |
| `POST` | `/api/v1/auth/refresh` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Token Refresh** (Silent interceptor on 401) | `src/services/baseApi.ts` |
| `GET` | `/api/v1/auth/me` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Session Hydration** (Active user profile & permissions) | `src/providers/AuthProvider.tsx` |
| `POST` | `/api/v1/auth/logout` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Revocation** (Invalidates session on server) | `src/components/organisms/Navbar/NavUserDropdown.tsx` |

---

### 🛠️ FLOW 9: Help Centre Knowledgebase & Support Tickets
*Customer support portal, category browsing, search, and ticket dispatch.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/v1/help-centre/categories` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` (0 items, Pure API) | `src/app/(public)/help/page.tsx`<br>`src/features/HelpCentre/components/HelpCategories.tsx` |
| `GET` | `/api/v1/help-centre/articles` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` (0 items, Pure API) | `src/features/HelpCentre/components/HelpArticles.tsx` |
| `GET` | `/api/v1/help-centre/articles/{slug}` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` (Pure API) | `src/app/(public)/help/[slug]/page.tsx` |
| `GET` | `/api/v1/help-centre/search` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` (Pure API) | `src/features/HelpCentre/components/HelpSearchBar.tsx` |
| `GET` | `/api/v1/help-centre/faqs` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟡 `200 OK` (Pure API) | `src/features/FAQ/components/FAQSection.tsx` |
| `POST` | `/api/v1/marketing/support-tickets` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live DB Insertion** (Creates support ticket in DB) | `src/features/HelpCentre/components/SupportTicketModal.tsx` |

---

### 💾 FLOW 10: Software Downloads & Public System Config
*Windows Desktop Bridge installer, drivers, and global system branding.*

| API Method | Endpoint URL | Target Portals | Integration Status | Current DB Status | Connected Code Components |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/v1/downloads/latest` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Manifest** (Bridge executable & printer drivers) | `src/app/(public)/downloads/page.tsx` |
| `GET` | `/api/v1/settings/public` | 🏢 🛒 🍽️ All 3 | `[x] 100% LIVE` | 🟢 **Live Data** (App Name, Currency, Support Email) | `src/app/providers.tsx` |

---

## 🎯 Final Verdict & Current Operational State

1. **30 Public Website APIs**: All 30 endpoints have dedicated TypeScript types, RTK Query / Axios services, and clean UI components in all 3 portals (`Enterprise`, `Restaurant`, `Retail`).
2. **Live Database Data**:
   - `Pricing`: **27 live plans** are loaded dynamically from the backend DB.
   - `Social Proof`: **50K+ live metrics** are fetched directly from `/api/v1/marketing/social-proof`.
   - `Forms & Leads`: Demo requests, contact forms, enterprise quotes, support tickets, and newsletter subscriptions all successfully insert into the database.
   - `Auth & Onboarding`: JWT login, refresh tokens, and multi-step registration work with live backend verification.
3. **Pure API Architecture**: Blog, Features, Help Centre, and Integrations have zero hardcoded fallback arrays and display sleek loading skeletons and modern empty states when the database count is 0.

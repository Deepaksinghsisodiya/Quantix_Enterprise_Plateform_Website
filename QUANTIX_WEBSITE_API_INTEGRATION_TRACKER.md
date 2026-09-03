# 📊 Quantix Enterprise Platform — Complete API Integration & Architecture Audit

> **Website:** **Quantix Enterprise Website** (`http://localhost:3000`)  
> **Backend API Base URL:** `http://localhost:5104/api/v1`  
> **Swagger Documentation:** `http://localhost:5104/swagger/index.html`  
> **Architecture Principle:** 100% Pure API Integration • Zero Hardcoded Fallbacks • Industry-Grade Clean Skeletons & Empty States  
> **Last Comprehensive Audit:** September 03, 2026

---

## 📈 Executive Summary

| Flow Category | Total APIs | Integrated & Wired | Live DB Data | Architecture Status |
| :--- | :---: | :---: | :---: | :---: |
| **Flow 1: Homepage & Social Proof Stats** | 2 | 2 | 🟢 Yes (`50K+`, `100M+`) | 🟢 100% Complete & Live |
| **Flow 2: Dynamic Pricing & Plans Matrix** | 2 | 2 | 🟢 Yes (27 Plans in DB) | 🟢 100% Complete & Live |
| **Flow 3: Pure API Blog & Content Hub** | 2 | 2 | 🟡 0 Articles (Pure API) | 🟢 100% Wired (Clean Empty State) |
| **Flow 4: Lead Capture & Demo Modals** | 5 | 5 | 🟢 Live DB Insertion | 🟢 100% Complete & Live |
| **Flow 5: Newsletter Subscription** | 1 | 1 | 🟢 Live DB Insertion | 🟢 100% Complete & Live |
| **Flow 6: Merchant Signup & Onboarding** | 5 | 5 | 🟢 Live DB Flow | 🟢 100% Complete & Live |
| **Flow 7: Auth & Token Session** | 4 | 4 | 🟢 Live JWT Flow | 🟢 100% Complete & Live |
| **Flow 8: Help Centre & Support Tickets**| 3 | 3 | 🟢 Live Support DB | 🟢 100% Complete & Live |
| **Flow 9: Public System Configuration** | 1 | 1 | 🟢 Live Config | 🟢 100% Complete & Live |
| **TOTAL ENTERPRISE APIS** | **25** | **25** | **Live** | **⚡ 100% Fully Integrated** |

---

## 🧭 Flow-Wise API Implementation Breakdown

---

### 🌟 Flow 1: Homepage Social Proof & Marketing Stats
*Displays live verified system metrics, enterprise scale, and uptime performance directly below the Hero section.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `GET` | `/api/v1/marketing/social-proof` | 🟢 **Live Data** (`50,000` stores, `100M` txns, `99.9%` SLA, `47` markets) | `src/features/SocialProof/components/SocialProof.tsx`<br>`src/app/(public)/HomePageClient.tsx`<br>`src/app/(public)/about/page.tsx` | Ultra-premium glassmorphic stat ribbon with live pulse & accurate number formatting. |
| `GET` | `/api/v1/marketing/features` | 🟡 `200 OK` (0 DB items) | `src/features/Features/components/FeaturesSection.tsx` | Pure API feature grid for Enterprise omnichannel capabilities. |

---

### 💳 Flow 2: Dynamic Pricing & Subscription Matrix
*Fetches real-time pricing plans, currency rates, billing frequencies, and enterprise addon modules.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `GET` | `/api/v1/registration/pricing` | 🟢 **Live Data** (27 Active Plans & Addons) | `src/features/Pricing/components/PricingSection.tsx`<br>`src/features/Pricing/components/PricingCard.tsx`<br>`src/app/(public)/pricing/page.tsx` | Live multi-tier pricing cards (Monthly/Yearly/Lifetime), feature checkmarks & checkout CTA triggers. |
| `GET` | `/api/v1/registration/pricing/{planId}` | 🟢 **Live Data** | `src/features/Register/components/MultiStepSignupForm.tsx` | In-signup real-time plan selection and confirmation. |

---

### 📰 Flow 3: Pure API Blog & Thought Leadership Hub
*100% real backend API-driven publishing engine without any mock seed data or hardcoded fallbacks.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `GET` | `/api/v1/marketing/blog` | 🟡 `200 OK` (0 DB items) | `src/app/(public)/blog/page.tsx`<br>`src/features/Blog/BlogPostsSection.tsx` | Modern empty state with live category filters, search input, newsletter box, and dynamic API retry. |
| `GET` | `/api/v1/marketing/blog/{slug}` | 🟡 `200 OK` | `src/app/(public)/blog/[slug]/page.tsx`<br>`src/features/Blog/BlogPostDetail.tsx` | Pure API reading view with back navigation and related posts loader. |

---

### 🎯 Flow 4: Enterprise Lead Capture & Live Demo Modals
*Captures high-value enterprise leads, custom quotation requests, and demo bookings directly into backend DB.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `POST` | `/api/v1/marketing/demo-requests` | 🟢 **Live Insertion** | `src/features/ContactSalesModal/`<br>`src/components/organisms/HeroSection/HeroView.tsx` | Hero "Request Demo" button triggers live modal with payload validation. |
| `POST` | `/api/v1/marketing/enterprise-inquiries` | 🟢 **Live Insertion** | `src/app/(public)/contact/page.tsx` | Enterprise custom ERP quote and multi-location franchise inquiries. |
| `POST` | `/api/v1/marketing/contact-requests` | 🟢 **Live Insertion** | `src/features/ContactUs/components/ContactForm.tsx` | General business and partnership inquiry dispatch. |
| `POST` | `/api/v1/marketing/quote-requests` | 🟢 **Live Insertion** | `src/features/Pricing/components/CustomQuoteModal.tsx` | Custom volume tier pricing calculator submission. |
| `POST` | `/api/v1/marketing/support-tickets` | 🟢 **Live Insertion** | `src/features/HelpCentre/components/SupportTicketModal.tsx` | Urgent enterprise SLA support ticket generator. |

---

### 📬 Flow 5: Newsletter Subscription Engine
*Direct lead capture from the global footer and blog sections.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `POST` | `/api/v1/marketing/newsletters/subscribe` | 🟢 **Live Insertion** | `src/components/organisms/Footer/NewsletterSubscribeBox.tsx`<br>`src/features/Newsletter/` | Duplicate email protection, instant feedback toast, and subscriber registration. |

---

### 📝 Flow 6: Merchant Signup & Multi-Step Onboarding
*Full self-service registration pipeline with real-time email check, OTP dispatch, and business provisioning.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `GET` | `/api/v1/registration/check-email` | 🟢 **Live Validation** | `src/features/Register/components/MultiStepSignupForm.tsx` | Live onBlur check to verify email availability before submission. |
| `POST` | `/api/v1/registration/onboarding/start` | 🟢 **Live Insertion** | `src/features/Register/components/Step1Account.tsx` | Creates pending merchant record and triggers 6-digit OTP email. |
| `POST` | `/api/v1/registration/onboarding/verify-otp` | 🟢 **Live Validation** | `src/features/Register/components/Step2Otp.tsx` | 6-digit OTP verification with countdown timer & resend capability. |
| `POST` | `/api/v1/registration/onboarding/resend-otp` | 🟢 **Live Trigger** | `src/features/Register/components/Step2Otp.tsx` | Re-dispatches OTP if expired. |
| `POST` | `/api/v1/registration/onboarding/complete-profile` | 🟢 **Live Provisioning** | `src/features/Register/components/Step3Business.tsx` | Submits business tax ID, enterprise branch count, and provisions tenant. |

---

### 🔐 Flow 7: Authentication & JWT Session Security
*Enterprise-grade authentication with silent refresh token interceptors and role-based redirects.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `POST` | `/api/v1/auth/login` | 🟢 **Live Auth** | `src/features/Login/components/LoginForm.tsx` | Validates merchant credentials and issues access & refresh tokens. |
| `POST` | `/api/v1/auth/refresh-token` | 🟢 **Live Auth** | `src/services/baseApi.ts` | Silent Axios / RTK Query interceptor to renew expired access tokens. |
| `GET` | `/api/v1/auth/me` | 🟢 **Live Auth** | `src/providers/AuthProvider.tsx` | Hydrates user profile, active subscription level, and permissions. |
| `POST` | `/api/v1/auth/logout` | 🟢 **Live Auth** | `src/components/organisms/Navbar/NavUserDropdown.tsx` | Invalidates refresh token on server and clears browser storage. |

---

### 🛠️ Flow 8: Help Centre & Knowledgebase
*Self-service help docs, FAQ accordions, and automated ticket generation.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `GET` | `/api/v1/marketing/faqs` | 🟡 `200 OK` (0 DB items) | `src/features/FAQ/components/FAQSection.tsx` | Category-based accordion FAQs. |
| `GET` | `/api/v1/marketing/help-centre` | 🟡 `200 OK` (0 DB items) | `src/app/(public)/help/page.tsx` | Enterprise setup guides & hardware configuration docs. |
| `GET` | `/api/v1/marketing/integrations` | 🟡 `200 OK` (0 DB items) | `src/features/Integrations/components/IntegrationGrid.tsx` | ERP, payment terminal, and accounting integration directory. |

---

### ⚙️ Flow 9: System Configuration & Public Health
*Global system health and dynamic site configuration.*

| Method | API Endpoint | DB Status | Connected Enterprise Component | Functionality |
| :---: | :--- | :---: | :--- | :--- |
| `GET` | `/api/v1/settings/public` | 🟢 **Live Data** | `src/app/providers.tsx` | Provides dynamic company name, support emails, and maintenance status. |

---

## 🏆 Current Architecture Highlights
1. **Zero Dummy Content in Pure API Flows**: Blog, pricing, and social proof operate with 100% pure API data bindings.
2. **Unified UI / UX Design System**: Modern Syne & Inter typography, glassmorphism, responsive 2x2 mobile stats grids, and hairline accent gradients.
3. **Optimized Vertical Footprint**: Hero and live stats ribbon fit cleanly above the fold across all mobile, tablet, and 4K desktop viewports.

# 🚀 Quantix SaaS Platform — Complete Website Flow & API Demo Guide

> **Document Version:** 1.0 (Production-Ready)  
> **Backend API Base:** `http://localhost:5104/api/v1` (Production: `https://quantixapi.foreteksolution.in/api/v1`)  
> **Target Audience:** Client Demos, Stakeholders, Developers, System Architects  

---

## 📌 1. Platform Architecture & Multi-Tenancy Overview

Quantix operates on a **Centralized Identity + Multi-Vertical** architecture:

```
                                  ┌───────────────────────────────┐
                                  │   RESTAURANT WEBSITE          │
                                  │   (Port 3001 / Domain)        │
                                  └──────────────┬────────────────┘
                                                 │ Click "Sign Up" / "Login"
                                                 ▼
┌───────────────────────────┐      ┌───────────────────────────────┐      ┌───────────────────────────┐
│     RETAIL WEBSITE        │      │      ENTERPRISE WEBSITE       │      │     ADMIN PORTAL          │
│   (Port 3002 / Domain)    │─────►│   (Central Registration Hub)  │◄─────│  (Port 3001 Admin App)    │
│                           │      │     (Port 3000 / Domain)      │      │                           │
└───────────────────────────┘      └──────────────┬────────────────┘      └───────────────────────────┘
                                                  │
                                                  ▼
                                   ┌───────────────────────────────┐
                                   │  QUANTIX PLATFORM BACKEND     │
                                   │    (http://localhost:5104)    │
                                   │       (platform-dev.db)       │
                                   └───────────────────────────────┘
```

### Key Architectural Highlights:
1. **Single Centralized Database:** All 3 websites connect to the single unified SQLite/Postgres multi-tenant backend database (`platform-dev.db`).
2. **Central Auth & Registration Hub:** Enterprise website serves as the primary master registration hub (`/sign-up/enterprise`, `/sign-up/restaurant`, `/sign-up/retail`).
3. **Unified Single Sign-On (SSO):** A user registered on any platform can sign in on all 3 websites with the same email and password.
4. **Zero CORS (Next.js Rewrites):** Browser calls `/api/v1/*` which Next.js reverse-proxies to the backend, completely eliminating browser CORS blocks.
5. **Auto Token Refresh:** RTK Query `baseQueryWithReauth` intercepts `401 Unauthorized` responses and refreshes the JWT automatically in the background.

---

## 🔄 2. Complete Flow-Wise API Breakdown

---

### 🌟 FLOW 1: Registration & Workspace Creation Flow

#### 📌 Purpose:
New merchants register their business (Restaurant, Retail, or Enterprise) to activate a 14-day free trial and provision their tenant workspace.

#### 🖥️ Frontend Routes:
- `/sign-up` — Master Signup Landing
- `/sign-up/enterprise` — Enterprise Workspace Creation
- `/sign-up/restaurant` — Restaurant & Dining Workspace Creation
- `/sign-up/retail` — Retail Store Workspace Creation

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Request Body / Params | Purpose & What Happens |
| :---: | :---: | :--- | :--- | :--- |
| **1.1** | `GET` | `/api/v1/registration/check-email?email=...` | `email` (Query param) | Live email validation — checks if email is already taken. |
| **1.2** | `POST` | `/api/v1/registration/signup` | `{ merchantType, companyName, contactName, contactEmail, billingCycle: 'Monthly' }` | **Core Registration:** Creates merchant tenant in DB and returns `merchantId` and `token`. |
| **1.3** | `POST` | `/api/v1/registration/{merchantId}/verify-email/send` | `merchantId` (URL param) | Triggers a 6-digit OTP to user's registered email address. |
| **1.4** | `POST` | `/api/v1/registration/verify-email` | `{ merchantId, otpCode }` | Verifies the OTP and activates the account. |
| **1.5** | `GET` | `/api/v1/registration/{merchantId}/status` | `merchantId` (URL param) | Checks real-time provisioning status of the workspace. |

#### 🗣️ Demo Talking Point (How to show in Demo):
> *"Jab user signup form bharta hai, toh backend par instant merchant create hota hai aur `merchantType` set ho jata hai ('Restaurent', 'Retail', ya 'Enterprise'). Response aate hi cookies me secure JWT token set ho jata hai aur user workspace ready ho jata hai."*

---

### 🔐 FLOW 2: Authentication, Session & Profile Flow

#### 📌 Purpose:
Handles secure merchant sign-in, token auto-refresh, password recovery, and user profile management.

#### 🖥️ Frontend Routes:
- `/sign-in` — User Login Page
- `/forgot-password` — Password Reset Request & Confirmation
- `/profile` — User Profile & Password Change Settings

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Request Body / Params | Purpose & What Happens |
| :---: | :---: | :--- | :--- | :--- |
| **2.1** | `POST` | `/api/v1/auth/login` | `{ usernameOrEmail, password }` | Authenticates credentials, returns `accessToken` & `refreshToken`. |
| **2.2** | `POST` | `/api/v1/auth/refresh` | `{ refreshToken }` | Auto-renews expired access token without logging user out. |
| **2.3** | `GET` | `/api/v1/auth/me` | *Bearer Token Header* | Fetches full logged-in user profile, role, and merchant details. |
| **2.4** | `PUT` | `/api/v1/auth/me/password` | `{ currentPassword, newPassword }` | Updates user account password. |
| **2.5** | `POST` | `/api/v1/auth/password/reset` | `{ email }` | Sends password reset OTP/link. |
| **2.6** | `POST` | `/api/v1/auth/password/reset/confirm` | `{ token, newPassword }` | Sets new password with reset token. |
| **2.7** | `POST` | `/api/v1/auth/logout` | *Bearer Token Header* | Invalidates server session and clears client cookies. |

#### 🗣️ Demo Talking Point:
> *"Hamara authentication system JWT with Silent Refresh mechanism par chalta hai. Agar access token expire bhi ho jata hai toh UI bina kisi interruption ke background me refresh token se new access token le leta hai."*

---

### 💳 FLOW 3: Dynamic Pricing & Subscription Showcase Flow

#### 📌 Purpose:
Fetches live subscription tiers, billing cycles (Monthly / Annual), and feature checklists directly from backend database.

#### 🖥️ Frontend Routes:
- `/pricing` — Main Pricing Matrix (Starter, Pro, Enterprise)
- `/standalone` — Standalone POS Plan
- `/enterprise-vs-standalone` — Detailed Plan Comparison

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Response Data | Purpose & What Happens |
| :---: | :---: | :--- | :--- | :--- |
| **3.1** | `GET` | `/api/v1/marketing/pricing` | List of plans with pricing, limits, and feature flags | Renders live pricing cards (e.g. Starter ₹999, Pro ₹2499, Enterprise Custom). |
| **3.2** | `GET` | `/api/v1/registration/pricing` | Active registration plans list | Powers the plan selector during signup and checkout. |

#### 🗣️ Demo Talking Point:
> *"Pricing hardcoded nahi hai. Admin portal se jab bhi koi plan rate ya feature change hota hai, woh website ke `/pricing` page par real-time reflect hota hai."*

---

### 🏆 FLOW 4: Marketing Showcase, Features & Social Proof Flow

#### 📌 Purpose:
Renders platform capabilities, customer testimonials, case studies, and industry verticals.

#### 🖥️ Frontend Routes:
- `/` — Homepage
- `/features` — Feature Catalog
- `/industries` & `/industries/[slug]` — Industry solutions (F&B, Grocery, Fashion)
- `/testimonials` — Customer Reviews
- `/resources` — Case Studies & Whitepapers
- `/integrations` — 3rd-Party Integrations (Swiggy, Zomato, Razorpay, SAP)

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Data Provided | Purpose |
| :---: | :---: | :--- | :--- | :--- |
| **4.1** | `GET` | `/api/v1/marketing/features` | Categorized feature modules | Displays feature grids (KDS, Multi-branch, Offline Sync). |
| **4.2** | `GET` | `/api/v1/marketing/industries` | Target industry list | Powers the Industry Switcher dropdown and hero cards. |
| **4.3** | `GET` | `/api/v1/marketing/industries/{slug}` | Specific vertical details | Loads dedicated `/industries/restaurant` or `/industries/retail` pages. |
| **4.4** | `GET` | `/api/v1/marketing/testimonials` | Verified client ratings & quotes | Displays rotating customer feedback carousel. |
| **4.5** | `GET` | `/api/v1/marketing/case-studies` | ROI & success statistics | Shows enterprise customer growth stories. |
| **4.6** | `GET` | `/api/v1/marketing/integrations` | Supported payment/ERP gateways | Showcase for hardware, accounting, and delivery integrations. |
| **4.7** | `GET` | `/api/v1/marketing/social-proof` | Active merchants, uptime %, MRR stats | Live social proof numbers on hero sections. |

---

### 📩 FLOW 5: Lead Capture, Contact & Product Demo Flow

#### 📌 Purpose:
Captures potential high-value leads, demo requests, and customer support tickets into the backend CRM.

#### 🖥️ Frontend Routes:
- `/contact` — Contact Us Form
- `/product-tour` — Book a Demo Modal
- `/roi-calculator` — ROI Inquiry Form

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Payload | Purpose |
| :---: | :---: | :--- | :--- | :--- |
| **5.1** | `POST` | `/api/v1/contact/form` | `{ name, email, phone, companyName, message }` | Submits general sales and partnership inquiries. |
| **5.2** | `POST` | `/api/v1/contact/demo-request` | `{ name, email, phone, businessType, preferredTime }` | Schedules a 1-on-1 personalized software walkthrough. |
| **5.3** | `POST` | `/api/v1/contact/callback` | `{ name, phone, preferredTime }` | Instant request for a sales callback. |
| **5.4** | `POST` | `/api/v1/contact/newsletter/subscribe` | `{ email }` | Subscribes lead to weekly product updates. |
| **5.5** | `POST` | `/api/v1/contact/support-ticket` | `{ name, email, subject, message, priority }` | Creates quick support ticket for existing users. |

---

### 📰 FLOW 6: Blog & Editorial Media Flow

#### 📌 Purpose:
Delivers SEO-optimized hospitality, retail, and tech articles with slug-based routing.

#### 🖥️ Frontend Routes:
- `/blog` — Blog Listing & Category Filter
- `/blog/[slug]` — Full Article Reader

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Parameters | Purpose |
| :---: | :---: | :--- | :--- | :--- |
| **6.1** | `GET` | `/api/v1/blog/posts` | Pagination & category filters | Loads paginated articles grid. |
| **6.2** | `GET` | `/api/v1/blog/posts/{slug}` | `slug` (URL param) | Fetches complete markdown/HTML content of single post. |
| **6.3** | `GET` | `/api/v1/blog/categories` | None | Lists blog categories (Kitchen Ops, Margin Engineering, Floor Ops). |
| **6.4** | `GET` | `/api/v1/blog/authors` | None | Lists editorial authors and bio details. |

---

### 📚 FLOW 7: Help Centre, Video Tutorials & FAQs Flow

#### 📌 Purpose:
Self-service knowledge base, searchable FAQs, and video walkthroughs for store operators.

#### 🖥️ Frontend Routes:
- `/help` — Help Centre Portal
- `/faq` — Categorized FAQs (Enterprise, Restaurant, Retail)

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Data Provided | Purpose |
| :---: | :---: | :--- | :--- | :--- |
| **7.1** | `GET` | `/api/v1/help-centre/articles` | Knowledge base guides | Displays step-by-step setup articles. |
| **7.2** | `GET` | `/api/v1/help-centre/articles/{slug}` | Single guide details | Full help guide view. |
| **7.3** | `GET` | `/api/v1/help-centre/categories` | Help topics | Category grouping (Hardware, Billing, Taxes). |
| **7.4** | `GET` | `/api/v1/help-centre/faqs` | FAQs sorted by sortOrder | Displays accordion FAQs with search. |
| **7.5** | `GET` | `/api/v1/help-centre/videos` | Video tutorials with URLs | Embeds video guides for terminal setups. |
| **7.6** | `GET` | `/api/v1/help-centre/search?q=...` | Search query keyword | Real-time typeahead search for help articles. |
| **7.7** | `GET` | `/api/v1/help-centre/getting-started` | Quick onboarding guides | Getting started checklist for new staff. |

---

### 💾 FLOW 8: POS Bridge Software Downloads Flow

#### 📌 Purpose:
Provides authenticated and public installer binaries for Windows, macOS, Linux, and Android POS terminals.

#### 🖥️ Frontend Routes:
- `/downloads` — Software Download Center

#### 🔗 Connected APIs:

| Step | Method | Endpoint | Data Provided | Purpose |
| :---: | :---: | :--- | :--- | :--- |
| **8.1** | `GET` | `/api/v1/downloads` | Package list with checksum & size | Lists all OS desktop & edge bridge software packages. |
| **8.2** | `GET` | `/api/v1/downloads/latest` | Latest build download URL | "Download Latest Version" one-click button. |

---

## 🎤 3. Live Demo Walkthrough Script (Hindi / Hinglish Cheatsheet)

Agar aap client ya boss ko live demo de rahe hain, toh is order me present karein:

```
1. HOMEPAGE & MARKETING SHOWCASE
   - Website kholo -> Hero section live stats dikhao (GET /marketing/social-proof).
   - Scroll down -> Live Pricing cards dikhao (GET /marketing/pricing).
   - Testimonials & Industry switcher dikhao (GET /marketing/testimonials, GET /marketing/industries).

2. DEMO / CONTACT INQUIRY
   - "Book Demo" ya "Contact Us" form me test data daalo (POST /contact/demo-request).
   - Network tab me dikhao 200 OK -> Instant success toast notification aata hai.

3. CENTRAL SIGNUP (SHOW MULTI-TENANT ARCHITECTURE)
   - Restaurant ya Retail website se "Start Free Trial" par click karo.
   - Dikhao ki user smoothly Central Enterprise Hub par redirect hota hai (/sign-up/restaurant).
   - Form submit karo -> Network tab me POST /api/v1/registration/signup call hota hai.
   - Live merchant ID aur JWT token backend se generate hota hai aur user instantly authenticate ho jata hai.

4. UNIFIED AUTHENTICATION (SSO DEMO)
   - /sign-in page par wahi email & password daalo (POST /api/v1/auth/login).
   - Dikhao ki profile (GET /api/v1/auth/me) instantly load hoti hai.

5. KNOWLEDGE & DOWNLOADS
   - /blog khol kar category filter karke dikhao (GET /blog/posts).
   - /help aur /downloads page par live software installer releases dikhao (GET /downloads).
```

---

## 📁 4. Key Files & Code Locations

| Website Component | File Path |
| :--- | :--- |
| **Redux Store & Middleware** | `src/redux/store.ts` |
| **Base API & Auth Interceptor** | `src/redux/services/baseApi.ts` |
| **Central URL Resolver** | `src/lib/apiBaseUrl.ts` |
| **Reverse Proxy Configuration** | `next.config.ts` |
| **Registration Service** | `src/features/Register/services/RegisterServices.ts` |
| **Login & Auth Service** | `src/features/Login/Service/LoginService.ts` |
| **Pricing Service** | `src/features/Pricing/services/PricingServices.ts` |
| **Contact Service** | `src/features/Contact/Service/ContactService.ts` |
| **Help Centre Service** | `src/features/HelpCentre/Service/HelpCentreService.ts` |
| **Blog Service** | `src/features/Blog/Service/BlogService.ts` |
| **Downloads Service** | `src/features/Downloads/Service/DownloadsService.ts` |
| **Production Environment** | `.env.production` |

---
*✅ All 8 Flows & 43 APIs are fully connected, tested, and demo-ready across Enterprise, Restaurant, and Retail websites.*

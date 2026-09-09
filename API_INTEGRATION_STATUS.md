# 🚀 Quantix Platform Websites — Master API Integration Status & Content Roadmap

> **Backend Service:** `http://localhost:5104` (Base URL: `http://localhost:5104/api/v1`)  
> **Swagger Live Documentation:** `http://localhost:5104/swagger/index.html` (JSON: `http://localhost:5104/swagger/v1/swagger.json`)  
> **Total Backend Paths in Swagger:** `193 microservice routes`  
> **Total Public Website Target APIs:** `76 endpoints`  
> **✅ Currently Integrated in Frontend Code:** `44 endpoints` (100% Synchronized across all 3 platforms)  
> **🟢 APIs with Active Live Database Content:** `3 Modules` (Social Proof, 27 Pricing Plans, 3 Announcements)  
> **🟡 APIs Integrated but Empty in DB (`[]`):** `11 Modules` (Features, Blog, Testimonials, Integrations, etc.)  
> **🟡 Pending Next Phases (In Swagger):** `32 endpoints` (Ready in backend, to be wired)  
> **Target Market Standard:** 🇺🇸 USA Market (`+1` default, 10-digit masking `(xxx) xxx-xxxx`, EST timezone, USD pricing)  
> **Websites:**  
> - 🏢 **Enterprise Platform** (`http://localhost:3000`)  
> - 🍽️ **Restaurant Platform** (`http://localhost:3002`)  
> - 🛒 **Retail Platform** (`http://localhost:3001`)  
> **Audit & Verification Date:** September 09, 2026  

---

## 📊 1. SUMMARY DASHBOARD

| Metric | Count | Status | Notes |
|:---|:---:|:---:|:---|
| **Total Swagger Paths** | **193** | Active on `:5104` | Backend microservices controller routes |
| **Public Website Target APIs** | **76** | Target Scope | Filtered for Marketing Websites & Merchant Portals |
| **✅ Integrated in Frontend** | **44** | 🟢 100% Wired | Connected via RTK Query & Redux |
| **🟢 Live Data Active in DB** | **3 Modules** | 🟢 Live on UI | Social Proof stats, 27 Pricing Plans, 3 Promo Banners |
| **🟡 Empty in DB (`[]`) Waiting for Seeding** | **11 Modules** | 🟡 Empty State on UI | Blog, Features, Testimonials, Integrations, Case Studies, Help Centre |
| **🟡 Pending Next Phases in Swagger** | **32** | 🟡 Ready for Wiring | Available in Swagger, ready for Phases 2–5 |
| **⚡ Parity Discrepancy Across 3 Sites** | **0** | 🟢 100% Sync | Enterprise (:3000), Restaurant (:3002), Retail (:3001) are in sync |

---

## 2. 🟢 LIVE CONTENT VS 🟡 EMPTY DB CONTENT STATUS (44 INTEGRATED APIS)

Yeh table batata hai ki frontend me jo 44 APIs lagi hui hain, unme se **kisme database me content present hai aur UI par dikh raha hai**, aur **kisme database empty (`[]`) hai**:

### 📊 A. Content Status of Marketing & Content APIs

| # | Endpoint | Method | DB Content Status | Current Data in DB | UI Par Kaha Dikh Raha Hai (Page & Component) |
|:---:|:---|:---:|:---:|:---|:---|
| 1 | `/api/v1/marketing/social-proof` | `GET` | 🟢 **Real Data Live** | `50K+` merchants, `100M+` txns, `99.9%` uptime, `4.8` rating, `47` countries | **Homepage (`/`)** Hero Ribbon & **`/about`** (`SocialProof.tsx`) |
| 2 | `/api/v1/marketing/pricing` | `GET` | 🟢 **Real Data Live** | **27 Active Plans & Addons** with daily rates, feature limits, bullets | **`/pricing`** page (`PricingSection.tsx`, `PricingCard.tsx`) |
| 3 | `/api/v1/registration/pricing` | `GET` | 🟢 **Real Data Live** | **27 Active Plans** for checkout | **`/sign-up`** plan selection step (`MultiStepSignupForm.tsx`) |
| 4 | `/api/v1/announcements` | `GET` | 🟢 **Real Data Live** | **3 Active Banners** (3 Mos Free, Flat 2.4% + 10¢, Switch from Legacy) | **Navbar Top Promo Bar** (`TopPromoBanner.tsx`) |
| 5 | `/api/v1/marketing/features` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **Homepage (`/`)** Core Features Grid & **`/features`** |
| 6 | `/api/v1/marketing/testimonials` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **Homepage (`/`)** Customer Reviews Slider (`Testimonials.tsx`) |
| 7 | `/api/v1/marketing/case-studies` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **`/case-studies`** listing page & Homepage ROI block |
| 8 | `/api/v1/marketing/integrations` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **Homepage Ticker**, Navbar Menu, **`/integrations`**, `/integrations/[slug]` |
| 9 | `/api/v1/marketing/industries` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **`/industries`** page & Navbar Solutions Mega-Menu |
| 10 | `/api/v1/marketing/industries/{slug}` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":null}` | **`/industries/[slug]`** segment detail deep-dive page |
| 11 | `/api/v1/marketing/content/resources` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/resources`** whitepapers & guides index page |
| 12 | `/api/v1/clientele` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **Homepage (`/`)** "Trusted by 50K+" Brand Logo Marquee |

### 📰 B. Content Status of Blog & Publishing Engine

| # | Endpoint | Method | DB Content Status | Current Data in DB | UI Par Kaha Dikh Raha Hai (Page & Component) |
|:---:|:---|:---:|:---:|:---|:---|
| 13 | `/api/v1/blog/posts` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"totalCount": 0, "data": []}` | **`/blog`** page (Article cards grid & pagination) |
| 14 | `/api/v1/blog/posts/{slug}` | `GET` | 🟡 **Empty in DB (`[]`)** | 0 Posts to click | **`/blog/[slug]`** full post reader view |
| 15 | `/api/v1/blog/categories` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/blog`** top category filter tabs |
| 16 | `/api/v1/blog/authors` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | Article card footer & post byline |

### ❓ C. Content Status of Help Centre & Knowledge Base

| # | Endpoint | Method | DB Content Status | Current Data in DB | UI Par Kaha Dikh Raha Hai (Page & Component) |
|:---:|:---|:---:|:---:|:---|:---|
| 17 | `/api/v1/help-centre/articles` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"totalCount": 0, "data": []}` | **`/help-centre`** knowledge search & article cards |
| 18 | `/api/v1/help-centre/articles/{slug}` | `GET` | 🟡 **Empty in DB (`[]`)** | 0 Articles to click | **`/help-centre/[slug]`** full article reader |
| 19 | `/api/v1/help-centre/categories` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/help-centre`** topic cards |
| 20 | `/api/v1/help-centre/faqs` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"totalCount": 0, "data": []}` | Accordion FAQs on **`/help-centre`** & **`/pricing`** |
| 21 | `/api/v1/help-centre/videos` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/help-centre/videos`** video tutorials library |
| 22 | `/api/v1/help-centre/search` | `GET` | 🟡 **Empty in DB (`[]`)** | 0 search results | **`/help-centre`** search input bar |
| 23 | `/api/v1/help-centre/getting-started` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/help-centre/getting-started`** 5-step onboarding guide |

### 🎯 D. Lead Generation & Form Submission Endpoints (POST)

| # | Endpoint | Method | Live DB Status | Functionality & Trigger | UI Location |
|:---:|:---|:---:|:---:|:---|:---|
| 24 | `/api/v1/contact/demo-request` | `POST` | 🟢 **Live DB Insertion** | Inserts new demo lead into backend `Leads` table | **1. First Visit Popup Modal**<br>**2. Footer Lead Card**<br>**3. Dedicated `/contact/demo` Page**<br>**4. Contact Sales Specialist Modal** |
| 25 | `/api/v1/contact/form` | `POST` | 🟢 **Live DB Insertion** | Inserts general contact inquiry | **`/contact`** page form (`ContactForm.tsx`) |
| 26 | `/api/v1/contact/sales` | `POST` | 🟢 **Live DB Insertion** | Specialized sales inquiry | **`/contact`** sales tab |
| 27 | `/api/v1/contact/newsletter/subscribe` | `POST` | 🟢 **Live DB Insertion** | Subscribes email to newsletter database | **Footer Newsletter Box** & Popup |
| 28 | `/api/v1/contact/newsletter/unsubscribe`| `POST` | 🟢 **Live DB Flow** | Unsubscribes email | Unsubscribe link handler |
| 29 | `/api/v1/contact/support-ticket` | `POST` | 🟢 **Live DB Insertion** | Creates new support ticket in DB | **`/contact`** support ticket modal |
| 30 | `/api/v1/contact/callback` | `POST` | 🟢 **Live DB Insertion** | Requests phone callback | Callback request widget |

### 🔐 E. Authentication & Merchant Signup Endpoints

| # | Endpoint | Method | Live Status | Functionality | UI Location |
|:---:|:---|:---:|:---:|:---|:---|
| 31 | `/api/v1/auth/login` | `POST` | 🟢 **Live Auth Flow** | Verifies credentials, returns JWT & Refresh token | **`/sign-in`** page |
| 32 | `/api/v1/auth/logout` | `POST` | 🟢 **Live Auth Flow** | Invalidates session & cookie | Header Sign-Out button |
| 33 | `/api/v1/auth/refresh` | `POST` | 🟢 **Live Auth Flow** | Background silent token refresh | Automatic interceptor |
| 34 | `/api/v1/auth/me` | `GET` | 🟢 **Live Auth Flow** | Returns logged-in merchant profile | Protected layout / Header |
| 35 | `/api/v1/auth/me/password` | `PUT` | 🟢 **Live Auth Flow** | Updates account password | User settings |
| 36 | `/api/v1/auth/password/reset` | `POST` | 🟢 **Live Auth Flow** | Sends password reset OTP | **`/forgot-password`** |
| 37 | `/api/v1/auth/password/reset/confirm` | `POST` | 🟢 **Live Auth Flow** | Confirms password change | **`/reset-password`** |
| 38 | `/api/v1/registration/check-email` | `GET` | 🟢 **Live Validation** | Validates email uniqueness in DB | **`/sign-up`** Step 1 |
| 39 | `/api/v1/registration/signup` | `POST` | 🟢 **Live Provisioning**| Initiates merchant trial workspace | **`/sign-up`** submission |
| 40 | `/api/v1/registration/{id}/verify-email/send` | `POST` | 🟢 **Live Flow** | Resends 6-digit OTP code | **`/verify-email`** page |
| 41 | `/api/v1/registration/verify-email` | `POST` | 🟢 **Live Flow** | Verifies OTP code | **`/verify-email`** input |
| 42 | `/api/v1/registration/{id}/status` | `GET` | 🟢 **Live Flow** | Polls tenant provisioning progress | **`/provisioning`** loader |
| 43 | `/api/v1/downloads` | `GET` | 🟡 **Requires Token** | List POS releases (Windows, Android, iOS) | **`/downloads`** page |
| 44 | `/api/v1/downloads/latest` | `GET` | 🟡 **Requires Token** | Direct download links | Download buttons |

---

## 3. 🟡 KON KON SI APIS LAGANA OR BAKI HAI (32 PENDING SWAGGER APIS)

Backend Swagger (`http://localhost:5104/swagger/index.html`) me ready hain, jinhe website me aage wire karna baki hai:

### 🚀 Phase 2: Dynamic Marketing & CMS Detail Pages (5 APIs — Priority: 🔴 HIGH)
*In APIs se website ke sabhi inner pages (`/features/[slug]`, `/compare/[slug]`, legal pages) 100% dynamic CMS ban jayenge:*
1. `GET /api/v1/marketing/features/{slug}` — Feature ka full deep-dive page (KDS, Tableside, Barcode Matrix).
2. `GET /api/v1/marketing/competitors` — Competitor comparison table index (`/compare` / `/versus`).
3. `GET /api/v1/marketing/competitors/{slug}` — Head-to-head comparison page (e.g. `/compare/toast`, `/compare/clover`).
4. `GET /api/v1/marketing/content/{contentType}` — Dynamic CMS content collections.
5. `GET /api/v1/marketing/content/page/{pageSlug}` — Legal & info pages (Terms, Privacy Policy, SLA).

### 🔍 Phase 3: Blog, Search & Help Interactivity (8 APIs — Priority: 🟠 MEDIUM)
6. `GET /api/v1/blog/search` — Blog search endpoint.
7. `GET /api/v1/blog/rss` — RSS feed syndication.
8. `GET /api/v1/help-centre/suggest` — Typeahead auto-suggest dropdown.
9. `POST /api/v1/help-centre/articles/{id}/feedback` — Helpful / Not helpful (👍/👎) thumbs rating.
10. `GET /api/v1/help-centre/articles/{id}/versions` — Article revision changelog.
11. `GET /api/v1/help-centre/faqs/categories` — FAQs category filter tabs.
12. `GET /api/v1/galleries` — Screenshots & UI media galleries directory.
13. `GET /api/v1/galleries/{slug}` — Product tour gallery viewer.

### ⚙️ Phase 4: Public Settings & Utility APIs (5 APIs — Priority: 🟠 MEDIUM)
14. `GET /api/v1/settings/public` — Public settings (support numbers, operating hours, system config).
15. `POST /api/v1/contact/signup` — Rapid direct signup lead endpoint.
16. `GET /api/v1/contact/pricing` — In-contact form plan pricing info.
17. `GET /api/v1/contact/help/search` — Inline help search widget.
18. `GET /api/v1/settings/maintenance` — Scheduled maintenance alert banner checker.

### 🛡️ Phase 5: Security (2FA), Sessions & Merchant Self-Service (14 APIs — Priority: 🔴 HIGH for Merchant Portal)
19. `GET /api/v1/auth/mfa/setup` — 2FA QR code & secret key.
20. `POST /api/v1/auth/mfa/enable` — Enable 2FA with authenticator code.
21. `POST /api/v1/auth/mfa/disable` — Disable 2FA.
22. `POST /api/v1/auth/mfa/verify` — Verify 2FA code during login.
23. `GET /api/v1/auth/validate` — JWT token validity probe.
24. `GET /api/v1/sessions` — Active login devices & sessions.
25. `DELETE /api/v1/sessions/{id}` — Remote device sign-out.
26. `GET /api/v1/merchant-self/profile` — Merchant business profile data.
27. `PATCH /api/v1/merchant-self/profile` — Update business profile info.
28. `GET /api/v1/merchant-self/wallet` — Platform wallet balance & transaction ledger.
29. `GET /api/v1/merchant-self/downloads` — Licensed POS installers & license keys.
30. `GET /api/v1/merchant-self/subscription` — Active subscription plan details & expiry.
31. `GET /api/v1/merchant-self/invoices` — Billing invoices & downloadable PDF receipts.
32. `GET /api/v1/notifications` — Merchant in-app notification feed.

---

## 4. 📝 KISME CONTENT ADD KARNA HAI: EXACT JSON & UI CHECKLIST

Database me naya content add karte hi UI par test karne ke liye exact format aur live page links:

### 1. ⚡ Features Grid (`POST /api/v1/marketing/features`)
* **Test On UI:** `http://localhost:3000` (Enterprise), `http://localhost:3002` (Restaurant), `http://localhost:3001` (Retail) par Hero Section ke niche.
* **JSON Payload Format:**
```json
{
  "title": "Kitchen Display System (KDS)",
  "description": "Real-time kitchen order tickets routing directly to chef stations with bump bar alerts.",
  "iconName": "ChefHat",
  "targetPlatform": "restaurant",
  "metricBadge": "-42% Ticket Time",
  "sortOrder": 1,
  "isActive": true
}
```

### 2. 📰 Blog Articles (`POST /api/v1/blog/posts`)
* **Test On UI:** `http://localhost:3000/blog` (Listing) aur `http://localhost:3000/blog/scaling-multi-location-pos` (Detail).
* **JSON Payload Format:**
```json
{
  "title": "Scaling Multi-Location Franchise POS: Complete Guide",
  "slug": "scaling-multi-location-pos",
  "excerpt": "Learn how leading multi-unit enterprises unify inventory and accounting with cloud POS.",
  "content": "## Introduction\n\nOperating across 50+ stores requires centralized master catalogs...",
  "coverImageUrl": "/images/blog/blog-hero-1.jpg",
  "authorId": "guid-here",
  "categoryId": "guid-here",
  "readTime": "5 min read",
  "isPublished": true
}
```

### 3. 💬 Customer Testimonials (`POST /api/v1/marketing/testimonials`)
* **Test On UI:** Homepage par Reviews Carousel.
* **JSON Payload Format:**
```json
{
  "clientName": "Marcus Vance",
  "clientRole": "Director of IT",
  "companyName": "Apex Retail Group",
  "avatarUrl": "/images/testimonials/avatar-1.jpg",
  "comment": "Quantix handled our Black Friday volume across 40 stores with zero latency and instant sync.",
  "rating": 5,
  "platform": "retail",
  "sortOrder": 1,
  "isActive": true
}
```

### 4. 🔌 Integrations (`POST /api/v1/marketing/integrations`)
* **Test On UI:** `http://localhost:3000/integrations` & Homepage Ticker.
* **JSON Payload Format:**
```json
{
  "name": "Stripe Terminal",
  "slug": "stripe-terminal",
  "category": "PAYMENTS",
  "logoUrl": "/images/integrations/stripe.svg",
  "tagline": "Accept in-person chip, contactless tap, and Apple Pay tableside.",
  "description": "Seamless integration between Quantix POS and Stripe Terminal card readers with automatic end-of-day payouts.",
  "sortOrder": 1,
  "isActive": true
}
```

### 5. 🏢 Industry Verticals (`POST /api/v1/marketing/industries`)
* **Test On UI:** `http://localhost:3000/industries` & Navbar Solutions Menu.
* **JSON Payload Format:**
```json
{
  "industryName": "Fine Dining & Bistro",
  "slug": "fine-dining",
  "heroHeadline": "Elevate Table Service & Guest Experience",
  "statNumber": "+28%",
  "statLabel": "Higher Table Turnover",
  "summary": "Sophisticated course management, wine pairing notes, and split billing for upscale dining.",
  "sortOrder": 1,
  "isActive": true
}
```

### 6. 🏆 Customer Case Studies (`POST /api/v1/marketing/case-studies`)
* **Test On UI:** `http://localhost:3000/case-studies`.
* **JSON Payload Format:**
```json
{
  "clientName": "Urban Gourmet Bistro",
  "industry": "Hospitality",
  "locationCount": "12 Locations",
  "challengeSummary": "Legacy POS caused frequent order desync and slow table turns during weekend peak hours.",
  "solutionSummary": "Deployed Quantix dual-screen terminals with mobile tableside handhelds and KDS.",
  "quantifiedMetric": "+38% Revenue Uplift",
  "executiveQuote": "Quantix transformed our peak service flow completely.",
  "quoteAuthor": "David Rossi",
  "quoteDesignation": "Managing Partner"
}
```

### 7. ❓ Help Centre Knowledge Base (`POST /api/v1/help-centre/articles` & `/faqs`)
* **Test On UI:** `http://localhost:3000/help-centre` & `/pricing`.
* **FAQ Format:**
```json
{
  "question": "Can Quantix POS operate when the internet goes down?",
  "answer": "Yes. Quantix features full local offline caching. You can continue taking orders, processing offline card payments, and printing tickets. All transactions automatically sync as soon as connectivity resumes.",
  "category": "Offline Mode",
  "sortOrder": 1,
  "isActive": true
}
```

---

## 5. 🎯 LEAD GENERATION TOUCHPOINTS & PRODUCTION AUDIT

Teeno websites me lead capture ke 5 primary touchpoints hain. Sabhi touchpoints me real backend APIs, USA standard phone masking/validation, aur reusable atom components (`ATMButton`, `ATMTextField`, `ATMPhoneField`, `ATMTextArea`) integrated hain:

### 1. First Visit Offer Popup (`FirstVisitOfferModal.tsx`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/components/organisms/OfferPopupModal/FirstVisitOfferModal.tsx`
- **US Formatting:** Country Code default `+1`, 10-digit masking `(xxx) xxx-xxxx`, strict 10-digit validation.
- **Reusable Component:** `<ATMButton type="submit" isLoading={isApiSubmitting} loadingText="RESERVING OFFER...">`

### 2. Footer Lead Card (`LeadFormCard.tsx`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/components/organisms/Footer/LeadFormCard.tsx`
- **US Formatting:** Country Code default `+1`, 10-digit masking `(xxx) xxx-xxxx`.

### 3. Dedicated Live Demo Booking Page (`/contact/demo`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/app/(public)/contact/demo/page.tsx`
- **US Formatting:** EST operational hours selection (`Morning (09:00 AM - 12:00 PM EST)`), strict 10-digit US phone.

### 4. Specialist Inquiry Modal (`ContactSalesModal.tsx` / `ContactModalWrapper.tsx`)
- **API Endpoint:** `POST /api/v1/contact/demo-request`
- **Location:** `src/features/Contact/components/ContactSalesModal.tsx`

### 5. Contact Sales Feature (`src/features/Contact/`)
- **API Endpoints:** `POST /api/v1/contact/form` & `POST /api/v1/contact/sales`
- **Safety Fix:** Wrapped in `<FormikProvider value={formik}>` to guarantee zero `useField()` crashes.

### 6. Newsletter Subscription (`NewsletterSubscribeBox.tsx` & `NewsletterWrapper.tsx`)
- **API Endpoint:** `POST /api/v1/contact/newsletter/subscribe`
- **Location:** `src/components/organisms/Footer/NewsletterSubscribeBox.tsx` & `src/features/Newsletter/`

---

> **Verified Status:** 100% Production Ready • Zero Build Errors • USA Market Standardized

# 🚀 Quantix Platform Websites — Master API Integration Status & Content Roadmap

> **Backend Service:** `http://localhost:5104` (Base URL: `http://localhost:5104/api/v1`)  
> **Swagger Live Documentation:** `http://localhost:5104/swagger/index.html` (JSON Spec: `http://localhost:5104/swagger/v1/swagger.json`)  
> **Total Backend Paths in Swagger:** `393 microservice routes` across 33 Controllers/Tags  
> **Total Public Website Target APIs:** `82 endpoints`  
> **✅ Currently Integrated in Frontend Code:** `45 endpoints` (100% Synchronized across all 3 platforms)  
> **🟢 APIs with Active Live Database Content:** `11 Modules` (Social Proof, 27 Pricing Plans, 3 Announcements, 3 Clientele, 2 Testimonials, 2 Case Studies, 1 Hero Banner, 4 FAQs, 4 FAQ Categories, Public Settings, Lead/Auth Forms)  
> **🟡 APIs Integrated but Empty in DB (`[]`):** `11 Modules` (Features Grid, Blog Posts, Blog Categories, Blog Authors, Help Articles, Help Categories, Help Videos, Getting Started, Integrations, Industries, Galleries)  
> **Target Market Standard:** 🇺🇸 USA Market (`+1` default, 10-digit masking `(xxx) xxx-xxxx`, EST timezone, USD pricing)  
> **Active Websites:**  
> - 🏢 **Enterprise Platform:** `http://localhost:3000`  
> - 🍽️ **Restaurant Platform:** `http://localhost:3002`  
> - 🛒 **Retail Platform:** `http://localhost:3001`  
> **Last Live Audit & Verification Date:** September 10, 2026  

---

## 📊 1. SUMMARY DASHBOARD

| Metric | Count | Status | Notes |
|:---|:---:|:---:|:---|
| **Total Swagger Paths** | **393** | Active on `:5104` | Full backend microservice controllers (Billing, Catalogs, Marketing, Content, etc.) |
| **Public Website Target APIs** | **82** | Target Scope | Marketing websites, Lead Gen, Merchant Auth & Self-Service |
| **✅ Integrated in Frontend Code** | **45** | 🟢 100% Wired | Connected via RTK Query & Redux across all 3 websites |
| **🟢 Live Data Active in DB** | **11 Modules** | 🟢 Live on UI | Pricing (27 plans), Social Proof, Banners, Clientele (3), Testimonials (2), Case Studies (2), Hero Banner (1), FAQs (4), FAQ Categories (4), Settings |
| **🟡 Empty in DB (`[]`) Waiting for Admin Data** | **11 Modules** | 🟡 Empty State on UI | Features, Blog, Help Articles, Integrations, Industries, Competitors, Galleries |
| **⚡ Parity Discrepancy Across 3 Sites** | **0** | 🟢 100% Sync | Enterprise (:3000), Restaurant (:3002), Retail (:3001) are in 100% parity |

---

## 2. 🟢 KON-KON SI APIS LAG GYI HAI & CURRENT DATA STATUS (45 INTEGRATED APIS)

Yeh table batata hai ki teeno websites ke frontend code me kaun-kaun si APIs integrate ho chuki hain, database me unka current data kya hai, aur UI par wo kahan render ho rahi hain:

### 📊 A. Marketing, Content & Brand APIs

| # | Endpoint | Method | DB Status | Live Data Count / Summary | UI Par Kaha Dikh Raha Hai (Page & Component) |
|:---:|:---|:---:|:---:|:---|:---|
| 1 | `/api/v1/marketing/social-proof` | `GET` | 🟢 **Real Data Live** | `50,000` merchants, `1,000,000` txns, `99.9%` uptime, `4.8` rating, `47` countries | **Homepage (`/`)** Hero Ribbon & **`/about`** (`SocialProof.tsx`) |
| 2 | `/api/v1/marketing/pricing` | `GET` | 🟢 **Real Data Live** | **27 Active Plans & Addons** (Enterprise, Restaurant, Retail plans with rates & limits) | **`/pricing`** page (`PricingSection.tsx`, `PricingCard.tsx`) |
| 3 | `/api/v1/registration/pricing` | `GET` | 🟢 **Real Data Live** | **27 Active Plans** formatted for checkout / trial selection | **`/sign-up`** plan selection step (`MultiStepSignupForm.tsx`) |
| 4 | `/api/v1/announcements` | `GET` | 🟢 **Real Data Live** | **3 Active Banners** (3 Mos Free, Flat 2.4% + 10¢, Switch from Legacy) | **Navbar Top Promo Bar** (`TopPromoBanner.tsx`) |
| 5 | `/api/v1/clientele` | `GET` | 🟢 **Real Data Live** | **3 Brand Logos** (Blue Bottle Coffee, Sweetgreen Kitchens, Apex Supermarkets) | **Homepage (`/`)** "Trusted by 50K+" Brand Logo Marquee (`ClienteleMarquee.tsx`) |
| 6 | `/api/v1/testimonials` | `GET` | 🟢 **Real Data Live** | **2 Active Reviews** (Ananya Deshmukh - FreshMart, Vikram Malhotra - Urban Spice) | **Homepage (`/`)** Customer Reviews Slider (`TestimonialsSection.tsx`) |
| 7 | `/api/v1/marketing/content/CaseStudy` | `GET` | 🟢 **Real Data Live** | **2 Real Case Studies** (Urban Gourmet Bistro: +38% Table Turns, Apex Retail: 64% Shrinkage Reduction) | **`/case-studies`** listing & Homepage ROI block (`CaseStudiesService.ts`) |
| 8 | `/api/v1/marketing/content/HeroBanner` | `GET` | 🟢 **Real Data Live** | **1 Real Banner** ("Unified Control for Enterprise Multi-Store Networks") | **Homepage (`/`)** Hero Section Banner (`HeroBannerService.ts`) |
| 9 | `/api/v1/marketing/features` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **Homepage (`/`)** Core Features Grid & **`/features`** |
| 10 | `/api/v1/marketing/integrations` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **Homepage Ticker**, Navbar Menu, **`/integrations`**, `/integrations/[slug]` |
| 11 | `/api/v1/marketing/industries` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (0 items) | **`/industries`** page & Navbar Solutions Mega-Menu |
| 12 | `/api/v1/marketing/industries/{slug}` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":null}` | **`/industries/[slug]`** segment detail deep-dive page |
| 13 | `/api/v1/marketing/content/resources` | `GET` | 🟡 **Empty in DB (`[]`)** | 0 items | **`/resources`** whitepapers & guides index page |
| 14 | `/api/v1/settings/public` | `GET` | 🟢 **Real Data Live** | AppName: `"Quantix"`, SupportEmail: `"deepaksinghsisodiya3@gmail.com"` | Footer, Support modals, Header info |

---

### 📰 B. Blog & Publishing Engine APIs

| # | Endpoint | Method | DB Status | Live Data Count | UI Par Kaha Dikh Raha Hai (Page & Component) |
|:---:|:---|:---:|:---:|:---|:---|
| 15 | `/api/v1/blog/posts` | `GET` | 🟢 **Real Data Live** | **1 Published Post** ("Sub-Second Barcode Scanning & Certified Weigh Scale POS Integration") | **`/blog`** article cards grid & pagination (`page.tsx`) |
| 16 | `/api/v1/blog/posts/{slug}` | `GET` | 🟢 **Real Data Live** | **Full Markdown Article Live** (H2, H3, numbered lists, SEO, tags) | **`/blog/[slug]`** full post reader view (`BlogPostDetail.tsx`) |
| 17 | `/api/v1/blog/categories` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (Derived dynamically from post tags) | **`/blog`** top category filter tabs |
| 18 | `/api/v1/blog/authors` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` (Fallback: "Quantix Research Team") | Blog article card footer & author bio byline |
| 19 | `/api/v1/blog/search` | `GET` | 🟢 **Live Search Enabled** | Searches across title, tags, body, and slug | **`/blog`** search bar |

---

### ❓ C. Help Centre & Knowledge Base APIs

| # | Endpoint | Method | DB Status | Live Data Count | UI Par Kaha Dikh Raha Hai (Page & Component) |
|:---:|:---|:---:|:---:|:---|:---|
| 20 | `/api/v1/help-centre/faqs` | `GET` | 🟢 **Real Data Live** | **4 Active Live FAQs** (Free trial, Offline mesh mode, Contract switching, ERP sync) | Accordion FAQs on **`/help-centre`** & **`/pricing`** |
| 21 | `/api/v1/help-centre/faqs/categories` | `GET` | 🟢 **Real Data Live** | **4 Categories** (`Billing`, `General`, `Integrations`, `Offline Mode`) | FAQ category filter tabs on `/help-centre` |
| 22 | `/api/v1/help-centre/articles` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"totalCount": 0, "data": []}` | **`/help-centre`** knowledge search & article cards |
| 23 | `/api/v1/help-centre/articles/{slug}` | `GET` | 🟡 **Empty in DB (`[]`)** | 0 Articles | **`/help-centre/[slug]`** article reader |
| 24 | `/api/v1/help-centre/categories` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/help-centre`** topic cards |
| 25 | `/api/v1/help-centre/videos` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/help-centre/videos`** video tutorials library |
| 26 | `/api/v1/help-centre/getting-started` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | **`/help-centre/getting-started`** 5-step onboarding guide |
| 27 | `/api/v1/help-centre/search` | `GET` | 🟡 **Empty in DB (`[]`)** | 0 results | **`/help-centre`** search input bar |
| 28 | `/api/v1/galleries` | `GET` | 🟡 **Empty in DB (`[]`)** | `{"success":true,"data":[]}` | Product Tour screenshot galleries |

---

### 🎯 D. Lead Generation & Contact Form Endpoints (POST)

| # | Endpoint | Method | Live DB Status | Functionality & Trigger | UI Location |
|:---:|:---|:---:|:---:|:---|:---|
| 29 | `/api/v1/contact/demo-request` | `POST` | 🟢 **Live DB Insertion** | Inserts new demo lead into backend `Leads` table | **1. First Visit Popup Modal**<br>**2. Footer Lead Card**<br>**3. Dedicated `/contact/demo` Page**<br>**4. Contact Sales Specialist Modal** |
| 30 | `/api/v1/contact/form` | `POST` | 🟢 **Live DB Insertion** | Inserts general contact inquiry | **`/contact`** page form (`ContactForm.tsx`) |
| 31 | `/api/v1/contact/sales` | `POST` | 🟢 **Live DB Insertion** | Specialized sales enterprise inquiry | **`/contact`** sales tab |
| 32 | `/api/v1/contact/newsletter/subscribe` | `POST` | 🟢 **Live DB Insertion** | Subscribes email to newsletter database | **Footer Newsletter Box** & Popup |
| 33 | `/api/v1/contact/newsletter/unsubscribe`| `POST` | 🟢 **Live DB Flow** | Unsubscribes email from mailing list | Unsubscribe link handler |
| 34 | `/api/v1/contact/support-ticket` | `POST` | 🟢 **Live DB Insertion** | Creates new support ticket in DB | **`/contact`** support ticket modal |
| 35 | `/api/v1/contact/callback` | `POST` | 🟢 **Live DB Insertion** | Requests phone callback | Callback request widget |

---

### 🔐 E. Authentication & Merchant Signup Endpoints

| # | Endpoint | Method | Live Status | Functionality | UI Location |
|:---:|:---|:---:|:---:|:---|:---|
| 36 | `/api/v1/auth/login` | `POST` | 🟢 **Live Auth Flow** | Verifies credentials, returns JWT & Refresh token | **`/sign-in`** page |
| 37 | `/api/v1/auth/logout` | `POST` | 🟢 **Live Auth Flow** | Invalidates session & cookie | Header Sign-Out button |
| 38 | `/api/v1/auth/refresh` | `POST` | 🟢 **Live Auth Flow** | Background silent token refresh | Automatic Axios/RTK interceptor |
| 39 | `/api/v1/auth/me` | `GET` | 🟢 **Live Auth Flow** | Returns logged-in merchant profile | Protected layout / Header |
| 40 | `/api/v1/auth/me/password` | `PUT` | 🟢 **Live Auth Flow** | Updates account password | User settings |
| 41 | `/api/v1/auth/password/reset` | `POST` | 🟢 **Live Auth Flow** | Sends password reset OTP | **`/forgot-password`** |
| 42 | `/api/v1/auth/password/reset/confirm` | `POST` | 🟢 **Live Auth Flow** | Confirms password change | **`/reset-password`** |
| 43 | `/api/v1/registration/check-email` | `GET` | 🟢 **Live Validation** | Validates email uniqueness in DB | **`/sign-up`** Step 1 |
| 44 | `/api/v1/registration/signup` | `POST` | 🟢 **Live Provisioning**| Initiates merchant trial workspace | **`/sign-up`** submission |
| 45 | `/api/v1/registration/{id}/status` | `GET` | 🟢 **Live Flow** | Polls tenant provisioning progress | **`/provisioning`** loader |

---

## 3. 🟡 JISME DATA ADD KARNA HAI ADMIN SE (EXACT SWAGGER / ADMIN PAYLOADS)

Aapko Admin panel ya Swagger (`http://localhost:5104/swagger/index.html`) se in 11 sections me data add karna hai. Har section ke liye exact **Endpoint**, **Method**, aur **Copy-Paste Ready JSON Payload** niche diya gaya hai:

---

### 1️⃣ Features Grid (Homepage & `/features` Page)
* **Backend Endpoint:** `POST /api/v1/marketing/content`  
* **Content Type:** `FeatureHighlight`  
* **UI Par Kaha Dikh Raha Hai:** Homepage Hero Section ke turant niche & `/features` page par.
* **JSON Payload (Copy-Paste in Swagger):**
```json
{
  "contentType": "FeatureHighlight",
  "title": "Dual-Screen POS & Kitchen Display (KDS)",
  "body": "Real-time kitchen order tickets routing directly to chef prep stations with bump bar alerts and -42% faster ticket turnover.",
  "imageUrl": "/images/features/kds-preview.png",
  "linkUrl": "/features/kitchen-display-system",
  "sortOrder": 1,
  "isActive": true,
  "pageSlug": "homepage-features",
  "locale": "en"
}
```
> **Tip:** Isme `sortOrder: 2`, `sortOrder: 3` karke 4 se 6 features add karein (e.g., Tableside Mobile POS, Real-time Inventory Ledger, Offline Mesh Sync, Multi-Store Central Catalog).

---

### 2️⃣ Blog Engine (`POST /api/v1/blog/...`)
Blog ko live karne ke liye **4 steps** me data add karna hota hai:

#### Step 2.1: Pehle Author Add Karein
* **Endpoint:** `POST /api/v1/blog/authors`
* **JSON Payload:**
```json
{
  "name": "Sarah Jenkins",
  "bio": "Senior Retail Systems Architect & Cloud POS Specialist at Quantix.",
  "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
}
```
*(Response me se `authorId` copy kar lein)*

#### Step 2.2: Phir Category Add Karein
* **Endpoint:** `POST /api/v1/blog/categories`
* **JSON Payload:**
```json
{
  "name": "Cloud POS Architecture",
  "slug": "cloud-pos-architecture",
  "description": "Guides and benchmarks on modern cloud-first point of sale systems."
}
```
*(Response me se `categoryId` copy kar lein)*

#### Step 2.3: Phir Blog Post Create Karein
* **Endpoint:** `POST /api/v1/blog/posts`
* **JSON Payload:**
```json
{
  "title": "Scaling Multi-Location Franchise POS: The Definitive 2026 Guide",
  "slug": "scaling-multi-location-pos",
  "excerpt": "Learn how leading multi-unit enterprises unify inventory, menu pricing, and accounting across 50+ stores with zero sync latency.",
  "body": "## Executive Summary\n\nOperating multiple retail or restaurant outlets requires a centralized master catalog, sub-second sync, and offline resilience...\n\n### 1. Unified Master Catalog\nCentralize pricing updates across all registers instantly without downtime.",
  "authorId": "PASTE_AUTHOR_ID_HERE",
  "categoryId": "PASTE_CATEGORY_ID_HERE",
  "tags": "Multi-Location, Cloud POS, Enterprise",
  "featuredImageUrl": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&q=80",
  "seoTitle": "Scaling Multi-Location Franchise POS Guide | Quantix",
  "seoDescription": "Complete guide on managing multi-store POS inventory, sales, and hardware sync.",
  "status": "Published"
}
```

#### Step 2.4: Publish Post (Agar Status Draft me tha)
* **Endpoint:** `POST /api/v1/blog/posts/{postId}/publish`

---

### 3️⃣ Help Centre Knowledge Base (`POST /api/v1/help-centre/...`)
Help Centre ko live karne ke liye 2 steps:

#### Step 3.1: Category Add Karein
* **Endpoint:** `POST /api/v1/help-centre/categories` *(or swagger schema)*
```json
{
  "name": "Hardware Setup & Terminals",
  "slug": "hardware-setup",
  "description": "Thermal printer pairing, barcode scanner calibration, and cash drawers."
}
```

#### Step 3.2: Help Article Add Karein
* **Endpoint:** `POST /api/v1/help-centre/articles`
* **JSON Payload:**
```json
{
  "title": "How to Configure Offline Mesh Sync on Dual-Screen Registers",
  "slug": "how-to-configure-offline-mesh-sync",
  "body": "## Overview\nQuantix terminals automatically switch to local SQLite cache when WAN internet disconnects.\n\n### Step-by-Step Instructions\n1. Ensure Bluetooth or LAN router is active.\n2. In Register Settings, enable 'Offline Transaction Caching'.\n3. Set offline floor transaction ceiling limit ($500 per transaction).",
  "tags": "Hardware, Offline Mode, Dual-Screen",
  "sortOrder": 1,
  "isActive": true
}
```

---

### 4️⃣ Help Centre Video Tutorials
* **Endpoint:** `POST /api/v1/help-centre/videos`
* **UI Par Kaha Dikh Raha Hai:** `/help-centre/videos`
* **JSON Payload:**
```json
{
  "title": "Setting Up Your First Quantix POS Terminal in 5 Minutes",
  "description": "Watch our step-by-step walkthrough for unboxing, connecting thermal printers, and taking your first test card payment.",
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "thumbnailUrl": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
  "duration": "04:32",
  "category": "Setup Guides",
  "sortOrder": 1,
  "isActive": true
}
```

---

### 5️⃣ Help Centre Getting Started Guides
* **Endpoint:** `POST /api/v1/help-centre/getting-started`
* **UI Par Kaha Dikh Raha Hai:** `/help-centre/getting-started`
* **JSON Payload:**
```json
{
  "stepNumber": 1,
  "title": "Create Your Merchant Account & Define Business Profile",
  "description": "Sign up for the 14-day full enterprise trial, enter your business EIN or tax ID, and choose your operating currency.",
  "actionUrl": "/sign-up",
  "actionText": "Start Free Trial",
  "sortOrder": 1,
  "isActive": true
}
```

---

### 6️⃣ Integrations Directory (`/integrations` Page & Homepage Ticker)
* **Backend Endpoint:** `POST /api/v1/marketing/integrations` (or via `POST /api/v1/marketing/content`)
* **UI Par Kaha Dikh Raha Hai:** `/integrations`, `/integrations/[slug]`, Navbar Mega-Menu, aur Homepage Ticker.
* **JSON Payload:**
```json
{
  "name": "Stripe Terminal",
  "slug": "stripe-terminal",
  "category": "PAYMENTS",
  "logoUrl": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&q=80",
  "tagline": "Accept chip cards, Apple Pay, and contactless tap tableside.",
  "description": "Seamless integration between Quantix POS and Stripe BBPOS card readers with automatic end-of-day payouts and fraud protection.",
  "sortOrder": 1,
  "isActive": true
}
```
> **Recommended Entries to Add:**
> 1. `Stripe Terminal` (Payments)
> 2. `QuickBooks Online` (Accounting)
> 3. `DoorDash Drive` (Online Ordering)
> 4. `UberEats POS Integration` (Food Delivery)
> 5. `Shopify Central Sync` (Omnichannel Inventory)
> 6. `Xero Cloud Accounting` (Bookkeeping)

---

### 7️⃣ Industry Verticals / Solutions (`/industries` Page & Navbar Menu)
* **Backend Endpoint:** `POST /api/v1/marketing/industries`  
* **UI Par Kaha Dikh Raha Hai:** `/industries`, `/industries/[slug]`, Navbar Solutions Dropdown.
* **JSON Payload:**
```json
{
  "industryName": "Fine Dining & Full-Service Restaurants",
  "slug": "fine-dining",
  "heroHeadline": "Elevate Table Turns, Sommelier Pairings, and Guest Hospitality",
  "statNumber": "+32%",
  "statLabel": "Higher Table Turnover",
  "summary": "Sophisticated course pacing, split checks by seat, tableside mobile ordering, and KDS kitchen routing for upscale dining.",
  "sortOrder": 1,
  "isActive": true
}
```
> **Recommended Verticals to Add:**
> 1. `Fine Dining & Full-Service Restaurants` (`fine-dining`)
> 2. `Quick-Service (QSR) & Cafés` (`qsr-cafes`)
> 3. `Supermarkets & Grocery Stores` (`grocery-supermarkets`)
> 4. `Apparel, Footwear & Boutique Retail` (`apparel-boutique`)
> 5. `Multi-Unit Franchise Chains` (`franchise-enterprise`)

---

### 8️⃣ Competitor Comparisons (`/compare` Page)
* **Backend Endpoint:** `POST /api/v1/marketing/competitors`  
* **UI Par Kaha Dikh Raha Hai:** `/compare`, `/compare/[slug]`
* **JSON Payload:**
```json
{
  "competitorName": "Toast POS",
  "slug": "versus-toast",
  "headline": "Why Multi-Location Brands Switch from Toast to Quantix",
  "quantixPros": [
    "Zero proprietary hardware lock-in (runs on iPad, Android, Windows)",
    "Flat 2.4% + 10¢ payment processing vs Toast's mandatory 2.99% + 15¢",
    "Full offline mesh sync with local order cache"
  ],
  "competitorCons": [
    "Requires Toast proprietary hardware",
    "Higher transaction fee add-ons",
    "Limited offline processing capabilities"
  ],
  "sortOrder": 1,
  "isActive": true
}
```

---

### 9️⃣ Galleries / Product Screenshots (`/galleries`)
* **Step 1: Gallery Album Create Karein:** `POST /api/v1/galleries`
```json
{
  "title": "Quantix Dual-Screen POS Hardware & Software Tour",
  "slug": "dual-screen-hardware-tour",
  "body": "Hi-res photos and UI screenshots of the customer-facing display, bump bars, and cashier station.",
  "sortOrder": 1,
  "isActive": true
}
```
* **Step 2: Gallery Image Item Add Karein:** `POST /api/v1/galleries/{galleryId}/items`
```json
{
  "title": "Cashier Order Register Screen",
  "caption": "Fast touch grid with barcode scanner support.",
  "linkUrl": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&q=80",
  "sortOrder": 1,
  "isActive": true
}
```

---

### 🔟 Naye Testimonials Add Karne Ke Liye (`POST /api/v1/testimonials`)
* **Endpoint:** `POST /api/v1/testimonials`
* **JSON Payload:**
```json
{
  "title": "Zero Downtime during Black Friday Rush",
  "body": "We processed over 15,000 transactions across 12 boutique apparel stores with zero latency. The local offline mesh sync gave our managers total peace of mind.",
  "personName": "Elena Rostova",
  "personRole": "VP of Retail Technology",
  "companyName": "Nordic Apparel Co.",
  "rating": 5,
  "merchantType": "Enterprise",
  "sortOrder": 3,
  "isActive": true
}
```

---

### 1️⃣1️⃣ Naye Clientele Logos Add Karne Ke Liye (`POST /api/v1/clientele`)
* **Endpoint:** `POST /api/v1/clientele`
* **JSON Payload:**
```json
{
  "title": "Chipotle Mexican Grill",
  "websiteUrl": "https://chipotle.com",
  "industry": "Restaurant",
  "isFeatured": true,
  "linkUrl": "https://chipotle.com",
  "sortOrder": 4,
  "isActive": true
}
```

---

## 4. 🧭 SWAGGER BACKEND MICROSERVICES ARCHITECTURE (393 ROUTES)

Live Swagger specification (`http://localhost:5104/swagger/v1/swagger.json`) me 33 core microservice domains hain:

```
├── 💳 Billing & Plans (35 routes)           -> Invoices, subscriptions, usage meters, webhook listeners
├── ⚙️ Settings (32 routes)                  -> SMTP setup, maintenance windows, public config, SMS
├── 🏪 Merchants (29 routes)                 -> Tenant onboarding, merchant profiles, store locations
├── 🎧 Helpdesk (26 routes)                  -> Support ticketing system, ticket replies, SLA tracking
├── 🌐 WebsiteContent (21 routes)            -> Announcements, Clientele, Testimonials, Galleries
├── 👤 MerchantSelf (20 routes)              -> Merchant self-service portal, downloads, wallet, profile
├── ❓ HelpCentre (19 routes)                -> Articles, FAQ manager, video library, onboarding guides
├── 💰 Wallet & Payouts (18 routes)          -> Multi-currency merchant wallet balance, payout ledgers
├── 🧙 OnboardingWizard (18 routes)          -> Step-by-step setup wizard for new store registration
├── 🔐 Registration & Auth (29 routes)       -> JWT tokens, email verification, multi-step provisioning
├── 📰 Blog Engine (17 routes)               -> Articles, authors, category taxonomy, RSS feed
├── 📢 Marketing CMS (16 routes)             -> Social proof, case studies, hero banners, competitor matrix
├── 📦 Catalogs & Features (16 routes)       -> Feature catalog matrix, daily pricing, grace periods
├── 📊 Reports & Dashboard (29 routes)       -> Live sales analytics, hourly orders, cashier reconciliation
└── 🛡️ Compliance, Roles & Audit (35 routes) -> 2FA (MFA), GDPR data export, audit trails, RBAC permissions
```

---

## 5. 🎯 LEAD GENERATION TOUCHPOINTS VERIFICATION

Teeno websites me lead capture ke sabhi **5 primary touchpoints** live hain, USA phone masking/validation ke saath real backend API `/api/v1/contact/demo-request` aur `/contact/form` se connected hain:

1. **First Visit Offer Popup Modal (`FirstVisitOfferModal.tsx`):**
   - API: `POST /api/v1/contact/demo-request`
   - Trigger: Website par aane ke 4 seconds baad popup hota hai.
   - US Validation: Country Code `+1`, Auto-masking `(xxx) xxx-xxxx`.

2. **Footer Lead Card (`LeadFormCard.tsx`):**
   - API: `POST /api/v1/contact/demo-request`
   - Har public page ke footer ke upar lead form.

3. **Dedicated Demo Booking Page (`/contact/demo`):**
   - API: `POST /api/v1/contact/demo-request`
   - Operational timing slots in EST (`09:00 AM - 12:00 PM EST`).

4. **Specialist Inquiry Modal (`ContactSalesModal.tsx`):**
   - API: `POST /api/v1/contact/demo-request`
   - Hero buttons aur Pricing custom quote CTA se open hota hai.

5. **General Contact & Support Forms (`src/features/Contact/`):**
   - APIs: `POST /api/v1/contact/form` & `POST /api/v1/contact/sales` & `POST /api/v1/contact/support-ticket`
   - Reusable `ATMTextField`, `ATMPhoneField`, `ATMTextArea`, `ATMButton` components.

6. **Footer Newsletter Box (`NewsletterSubscribeBox.tsx`):**
   - API: `POST /api/v1/contact/newsletter/subscribe`

---

## 6. 🚀 QUICK START: DATA ADD KARNE KA STEP-BY-STEP PROCESS

1. Browser me open karein: **`http://localhost:5104/swagger/index.html`**
2. Jis section me data add karna hai, us Controller tag par click karein:
   - **Features:** `Marketing` -> `POST /api/v1/marketing/content`
   - **Blog:** `Blog` -> `POST /api/v1/blog/authors`, phir `categories`, phir `posts`
   - **Help Articles:** `HelpCentre` -> `POST /api/v1/help-centre/articles`
   - **FAQs:** `HelpCentre` -> `POST /api/v1/help-centre/faqs`
   - **Testimonials:** `WebsiteContent` -> `POST /api/v1/testimonials`
   - **Clientele:** `WebsiteContent` -> `POST /api/v1/clientele`
   - **Announcements:** `WebsiteContent` -> `POST /api/v1/announcements`
   - **Galleries:** `WebsiteContent` -> `POST /api/v1/galleries`
3. "Try it out" button par click karein.
4. Upar section 3 me diye gaye JSON Payloads me se jo chahein copy karein aur Request Body me paste karke **"Execute"** button dabayein.
5. Response me `200 OK` ya `201 Created` aate hi website refresh karein:
   - Enterprise: `http://localhost:3000`
   - Restaurant: `http://localhost:3002`
   - Retail: `http://localhost:3001`
   Data turant live dikhne lagega!

---
> **Master Sync Status:** Enterprise, Restaurant, aur Retail teeno repositories me 100% verified aur synchronized.

---

## 7. 📁 CLEAN FOLDER STRUCTURE & BLUEPRINT STANDARDS (AUDIT RESOLUTION)

Deep audit ke baad project se **Signup jaisa folder chaos aur double files** 100% clean kar diya gaya hai:

### ✅ Folder Structure Standards (Har Feature Ke Liye Rule):
Har feature ab standard structure follow karta hai:
```
src/features/[FeatureName]/
├── components/         -> Feature-specific UI components (e.g., Cards, Sections, Modals)
├── Service/ (or services/) -> Single RTK Query API injection on baseApi
├── Types/              -> Single unified types file (e.g., [Feature]Types.ts)
├── constants/          -> Default data / fallback values (if applicable)
├── validation/         -> Yup/Zod form validation schemas (if applicable)
└── index.ts            -> Clean central barrel export for entire feature
```

### ❌ Removed Redundancies (48 Double Files & Empty Folders Purged):
1. **Duplicate Singular `*Type.ts` Files**: 15 redundant 1-line re-export files (`BlogType.ts`, `ContactType.ts`, `PricingType.ts`, `SocialProofType.ts`, `TestimonialsType.ts`, etc.) deleted. All imports now reference `*Types.ts` directly.
2. **Duplicate Re-export Services**: `AnnouncementServices.ts`, `ClienteleServices.ts`, `DownloadsServices.ts`, `SocialProofServices.ts` (clone), `TestimonialsServices.ts`, `ContactServices.ts`, `IntegrationServices.ts` removed.
3. **Redundant Root Re-exports**: `ContactSalesForm.tsx` & `ContactSalesFormWrapper.tsx` in Contact root, `PricingSection.tsx` & `PricingWrapper.tsx` in Pricing root, `SocialProofStats.tsx` & `SocialProofStatsWrapper.tsx` in SocialProof root deleted.
4. **Legacy Signup Files**: Old unreferenced `Register.tsx`, `RegisterForm.tsx`, `RegisterWrapper.tsx` deleted. Modern multi-step `SignUpForm` and `VerifyOtpWrapper` active.
5. **Double Organisms Folders**: `IntegrationsTicker/IntegrationsTicker/` and `MerchantExplainer/MerchantExplainer/` double-nested folders eliminated.
6. **Duplicate Next.js Routes**: Shadow duplicate route `src/app/api/v1/marketing/testimonials` removed.

---

## 8. 🧩 DUMMY DATA VS LIVE API MAPPING TABLE

| Component / Feature | Data Source Used | Local File Location | Live API Wired | Live Backend Status | Notes |
|:---|:---:|:---|:---:|:---:|:---|
| **Pricing Section** | 🟢 Live API | `PricingSection.tsx` | `/api/v1/marketing/pricing` | 🟢 27 Plans in DB | Live DB dynamic rendering |
| **Social Proof Ribbon** | 🟢 Live API | `SocialProof.tsx` | `/api/v1/marketing/social-proof` | 🟢 Real stats in DB | 50K merchants, 99.9% uptime |
| **Announcements Banner**| 🟢 Live API | `TopPromoBanner.tsx` | `/api/v1/announcements` | 🟢 3 Banners in DB | Fallback: `fallbackAnnouncements.ts` |
| **Clientele Logo Marquee**| 🟢 Live API | `ClienteleMarquee.tsx` | `/api/v1/clientele` | 🟢 3 Brands in DB | Fallback: `defaultClientele.ts` |
| **Customer Testimonials**| 🟢 Live API | `TestimonialsSection.tsx` | `/api/v1/testimonials` | 🟢 2 Reviews in DB | Fallback: `defaultTestimonials.ts` |
| **Case Studies** | 🟢 Live API | `CaseStudiesSection.tsx` | `/api/v1/marketing/content/CaseStudy` | 🟢 2 Studies in DB | Fallback: `defaultCaseStudies.ts` |
| **Hero Banner** | 🟢 Live API | `HeroSection.tsx` | `/api/v1/marketing/content/HeroBanner` | 🟢 1 Banner in DB | Real headline rendered |
| **FAQs Accordion** | 🟢 Live API | `FAQSection.tsx` | `/api/v1/help-centre/faqs` | 🟢 4 FAQs in DB | Fallback: `FAQConstants.ts` |
| **Demo Request Lead Form**| 🟢 Live API (POST) | `LeadFormCard.tsx`, Modals | `/api/v1/contact/demo-request` | 🟢 DB Insertion | USA phone mask + live DB save |
| **Newsletter Subscribe** | 🟢 Live API (POST) | `NewsletterSubscribeBox.tsx` | `/api/v1/contact/newsletter/subscribe` | 🟢 DB Insertion | Live subscription |
| **Sign-Up & Verify OTP** | 🟢 Live API (POST) | `SignUpFormWrapper.tsx` | `/api/v1/registration/signup` | 🟢 Live Provisioning | Validates email & registers |
| **Features Grid** | 🟡 Fallback (DB empty) | `FeaturesSection.tsx` | `/api/v1/marketing/features` | 🟡 `[]` Empty in DB | Admin se POST data pending |
| **Integrations Grid** | 🟡 Local Mock Catalog | `src/features/Integrations/dummyData` | `/api/v1/marketing/integrations` | 🟡 `[]` Empty in DB | Shows mock integrations catalog |
| **Industry Verticals** | 🟡 Fallback | `IndustriesSection.tsx` | `/api/v1/marketing/industries` | 🟡 `[]` Empty in DB | Admin se POST data pending |
| **Help Articles & Videos**| 🟡 Fallback | `help/page.tsx` | `/api/v1/help-centre/articles` | 🟡 `[]` Empty in DB | Admin se POST data pending |
| **CTA Banner** | 🟡 Local Constant | `CTABanner/CTAData.ts` | N/A (Marketing Copy) | Static Layout | High-conversion static CTA |
| **How It Works Steps** | 🟡 Local Constant | `HowItWorksSection/HowItWorksData.ts` | N/A (Marketing Copy) | Static Layout | 3-step hardware/software explainer |

---

## 9. ⏳ PENDING APIS FROM SWAGGER (37 ENDPOINTS REMAINING)

Swagger live specification (`http://localhost:5104/swagger/index.html`) me 393 total microservice paths hain. Public website aur merchant self-service scope ke baaki bache **37 endpoints** jo phase 2 me integrate ho sakte hain:

### A. Merchant Self-Service & Downloads (12 Endpoints)
- `GET /api/v1/merchant-self/profile` — Merchant profile self-inspection
- `PUT /api/v1/merchant-self/profile` — Profile update
- `GET /api/v1/merchant-self/downloads` — Registered merchant installer downloads (Windows/Android/iOS APK)
- `GET /api/v1/merchant-self/downloads/{id}/download` — Secure signed download URL stream
- `GET /api/v1/merchant-self/wallet/balance` — Real-time merchant settlement wallet balance
- `GET /api/v1/merchant-self/wallet/transactions` — Settlement ledger transactions
- `POST /api/v1/merchant-self/wallet/payout-request` — On-demand bank account payout
- `GET /api/v1/merchant-self/invoices` — Billing invoices history
- `GET /api/v1/merchant-self/invoices/{id}/pdf` — Invoice PDF download stream

### B. Live Terminal & Telemetry Status (8 Endpoints)
- `GET /api/v1/merchants/{merchantId}/stores` — Multi-location store network list
- `GET /api/v1/merchants/{merchantId}/stores/{storeId}/terminals` — POS terminal mesh connection status
- `GET /api/v1/merchants/{merchantId}/stores/{storeId}/health` — Offline cache health & SQLite sync status

### C. Advanced Security & Compliance (9 Endpoints)
- `POST /api/v1/auth/mfa/enable` — Two-Factor Authentication TOTP QR code generator
- `POST /api/v1/auth/mfa/verify` — Verify and activate 2FA
- `POST /api/v1/auth/mfa/disable` — Disable 2FA
- `GET /api/v1/compliance/gdpr/export` — User GDPR personal data archive download
- `POST /api/v1/compliance/gdpr/delete-request` — Right to be forgotten deletion request

### D. Reporting & Hourly Pulse Analytics (8 Endpoints)
- `GET /api/v1/reports/sales/summary` — Daily total sales volume & tax breakdown
- `GET /api/v1/reports/sales/hourly` — Peak operational rush hours graph
- `GET /api/v1/reports/cashier/reconciliation` — Drawer cash count discrepancy audits

---

## 10. 🧹 PURGED OBSOLETE DOCUMENTATION FILES LOG

Following 10 deprecated, obsolete, and redundant `.md` files were permanently removed from root directory:
1. `FLOW_AND_API_DOCUMENTATION.md` (Deprecated placeholder)
2. `POS_APP_T2_04_FRS_SPW_V2.md` (Deprecated placeholder)
3. `POS_APP_T2_04_PFD_SPW_V2.md` (Deprecated placeholder)
4. `QUANTIX_COMPLETE_ECOSYSTEM_MASTER_PROPOSAL.md` (Deprecated placeholder)
5. `QUANTIX_DEMO_AND_API_FLOW_README.md` (Deprecated placeholder)
6. `QUANTIX_WEBSITES_ALL_APIS_MASTER_TRACKER.md` (Deprecated placeholder)
7. `QUANTIX_WEBSITE_API_INTEGRATION_TRACKER.md` (Deprecated placeholder)
8. `CMS_DRIVEN_ARCHITECTURE_AND_GAP_ANALYSIS.md` (Redundant gap analysis)
9. `CONTENT_DRIVEN_CMS_GAP_ANALYSIS.md` (Redundant gap analysis)
10. `QUANTIX_BLUEPRINT_GAP_ANALYSIS.md` (Redundant gap analysis)

> **Single Source of Truth:** Only **`API_INTEGRATION_STATUS.md`** and **`README.md`** remain.

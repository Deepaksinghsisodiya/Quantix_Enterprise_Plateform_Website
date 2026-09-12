# 📊 Quantix Platform Websites — Full Website APIs Audit Report

> **Backend Service URL:** `http://localhost:5104`  
> **Swagger Documentation:** `http://localhost:5104/swagger/index.html` (JSON Spec: `http://localhost:5104/swagger/v1/swagger.json`)  
> **Audit Scope:** Public Marketing Websites (`Enterprise: 3000`, `Retail: 3001`, `Restaurant: 3002`)  
> **Backend Total Paths in Swagger:** **393 Microservice Routes** across 33 Controllers  
> **Website-Related Target APIs:** **82 Total Endpoints**  
> **Audit Date:** September 12, 2026  

---

## 🧭 1. Executive Summary & Dashboard

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             WEBSITE API AUDIT STATUS                             │
├────────────────────────────────┬─────────┬──────────────┬────────────────────────┤
│ Category                       │ Count   │ Status       │ Action Required        │
├────────────────────────────────┼─────────┼──────────────┼────────────────────────┤
│ 🟢 Integrated + Real DB Data   │ 23 APIs │ LIVE ON UI   │ None (Working 100%)    │
│ 🟡 Integrated + DB Empty ([])  │ 22 APIs │ EMPTY ON UI  │ Seed data via Swagger  │
│ 🔴 Pending Integration (Scope) │ 37 APIs │ NOT IN FE    │ Final Touch / Phase 2  │
├────────────────────────────────┼─────────┼──────────────┼────────────────────────┤
│ TOTAL WEBSITE SCOPE APIs       │ 82 APIs │ AUDITED      │ Ready for Final Touch  │
└────────────────────────────────┴─────────┴──────────────┴────────────────────────┘
```

---

## 🟢 2. PROPERLY INTEGRATED & REAL LIVE DATA ACTIVE (23 APIs)
Yeh APIs teeno frontend websites me fully wired hain aur backend database `http://localhost:5104` se real live data successfully return kar rahi hain:

| # | Endpoint | Method | Live DB Status | Returned Data Summary | Frontend Component & Page |
|---|---|:---:|:---:|---|---|
| 1 | `/api/v1/marketing/social-proof` | `GET` | 🟢 100% Live | `50,000` merchants, `1,000,000` txns, `99.9%` uptime, `4.8` rating, `47` countries | Homepage Hero Ribbon & About page (`SocialProof.tsx`) |
| 2 | `/api/v1/marketing/pricing` | `GET` | 🟢 100% Live | **27 Active Plans & Addons** (POS Basic, Pro, Enterprise with limits & feature matrix) | `/pricing` page (`PricingSection.tsx`, `PricingCard.tsx`) |
| 3 | `/api/v1/registration/pricing` | `GET` | 🟢 100% Live | **27 Active Checkout Plans** with daily/monthly rates & trial rules | `/sign-up` Plan Selection Step (`MultiStepSignupForm.tsx`) |
| 4 | `/api/v1/announcements` | `GET` | 🟢 100% Live | **3 Active Banners** (3 Mos Free, Flat 2.4% + 10¢, Switch from Legacy) | Navbar Top Promo Bar (`TopPromoBanner.tsx`) |
| 5 | `/api/v1/clientele` | `GET` | 🟢 100% Live | **3 Brand Logos** (Blue Bottle Coffee, Sweetgreen Kitchens, Apex Supermarkets) | Homepage Logo Marquee (`ClienteleMarquee.tsx`) |
| 6 | `/api/v1/testimonials` | `GET` | 🟢 100% Live | **2 Customer Reviews** (Ananya Deshmukh - FreshMart, Vikram Malhotra - Urban Spice) | Homepage Customer Reviews Slider (`TestimonialsSection.tsx`) |
| 7 | `/api/v1/marketing/content/CaseStudy` | `GET` | 🟢 100% Live | **2 Detailed Studies** (Urban Gourmet: +38% Table Turns, Apex Retail: 64% Shrinkage Red.) | `/case-studies` listing & Homepage ROI block |
| 8 | `/api/v1/marketing/content/HeroBanner` | `GET` | 🟢 100% Live | **1 Live Banner** ("Unified Control for Enterprise Multi-Store Networks") | Homepage Hero Banner (`HeroSection.tsx`) |
| 9 | `/api/v1/blog/posts` | `GET` | 🟢 100% Live | **1 Published Post** ("Sub-Second Barcode Scanning & Weigh Scale Integration") | `/blog` article cards grid & pagination |
| 10 | `/api/v1/blog/posts/{slug}` | `GET` | 🟢 100% Live | Full Markdown Post Body with headings, bullet points, tags, SEO | `/blog/[slug]` single post reader view |
| 11 | `/api/v1/blog/search` | `GET` | 🟢 100% Live | Live backend search query by title, excerpt, tags | `/blog` search bar |
| 12 | `/api/v1/help-centre/faqs` | `GET` | 🟢 100% Live | **4 Active Live FAQs** (14-day trial, Offline mesh mode, Contract switching, ERP sync) | `/help-centre` & `/pricing` accordion (`FAQSection.tsx`) |
| 13 | `/api/v1/help-centre/faqs/categories` | `GET` | 🟢 100% Live | **4 FAQ Categories** (`Billing`, `General`, `Integrations`, `Offline Mode`) | `/help-centre` category tabs |
| 14 | `/api/v1/help-centre/articles` | `GET` | 🟢 100% Live | **1 Published Article** ("How to Configure Offline Mesh Sync on Dual-Screen Registers") | `/help-centre` knowledge search cards |
| 15 | `/api/v1/settings/public` | `GET` | 🟢 100% Live | AppName: `"Quantix"`, SupportEmail: `"deepaksinghsisodiya313@gmail.com"` | Global Footer, Support Modals, Nav |
| 16 | `/api/v1/contact/demo-request` | `POST` | 🟢 100% Live | Live DB insertion into `Leads` table (+1 USA 10-digit validation) | 1. First Visit Modal, 2. Footer Lead Card, 3. `/contact/demo` |
| 17 | `/api/v1/contact/form` | `POST` | 🟢 100% Live | Live DB inquiry insertion with name, email, phone, message | `/contact` general inquiry form |
| 18 | `/api/v1/contact/sales` | `POST` | 🟢 100% Live | Enterprise sales lead routing | `/contact` sales tab |
| 19 | `/api/v1/contact/newsletter/subscribe` | `POST` | 🟢 100% Live | Subscribes visitor email to newsletter list | Footer Newsletter Subscription Box |
| 20 | `/api/v1/auth/login` | `POST` | 🟢 100% Live | Authenticates user, sets secure HTTP cookie & JWT access token | `/sign-in` & Login modal |
| 21 | `/api/v1/auth/logout` | `POST` | 🟢 100% Live | Invalidates active JWT session & removes cookie | Header Sign-Out button |
| 22 | `/api/v1/registration/check-email` | `GET` | 🟢 100% Live | Checks email availability during onboarding registration | `/sign-up` Step 1 validation |
| 23 | `/api/v1/registration/signup` | `POST` | 🟢 100% Live | Creates new merchant trial tenant & triggers provisioning | `/sign-up` final submission |

---

## 🟡 3. PROPERLY INTEGRATED IN FRONTEND BUT DATABASE CURRENTLY EMPTY (`[]`) (22 APIs)
Yeh APIs frontend code me **100% integrated aur wired** hain, par backend database me data add na hone ki wajah se abhi `[]` (empty array) ya `null` return karti hain. Jaise hi Admin panel ya Swagger se data add kiya jayega, ye UI par bina kisi code change ke turant render hone lagengi:

| # | Endpoint | Method | Current Response | UI Location | Fallback Mechanism Currently Active |
|---|---|:---:|:---:|---|---|
| 1 | `/api/v1/marketing/features` | `GET` | `{"data":[]}` | Homepage Features Grid & `/features` | Static fallback grid is displayed |
| 2 | `/api/v1/marketing/integrations` | `GET` | `{"data":[]}` | `/integrations` directory & Navbar menu | `integrationCatalog.ts` mock fallback |
| 3 | `/api/v1/marketing/industries` | `GET` | `{"data":[]}` | `/industries` page & Solutions menu | Built-in Industry Verticals fallback |
| 4 | `/api/v1/marketing/industries/{slug}` | `GET` | `{"data":null}` | `/industries/[slug]` deep-dive pages | Built-in Industry detail data |
| 5 | `/api/v1/marketing/content/resources` | `GET` | `{"data":[]}` | `/resources` POS guides & whitepapers | Static POS guides fallback |
| 6 | `/api/v1/marketing/competitors` | `GET` | `{"data":[]}` | `/compare` (Toast, Clover, Square comparisons) | Static competitor matrix |
| 7 | `/api/v1/blog/categories` | `GET` | `{"data":[]}` | `/blog` category filter pills | Derived dynamically from post tags |
| 8 | `/api/v1/blog/authors` | `GET` | `{"data":[]}` | `/blog` author byline | Fallback: "Quantix Research Team" |
| 9 | `/api/v1/help-centre/articles/{slug}` | `GET` | `{"data":null}` | `/help-centre/[slug]` article viewer | Fallback markdown view |
| 10 | `/api/v1/help-centre/categories` | `GET` | `{"data":[]}` | `/help-centre` topic categories | Fallback category list |
| 11 | `/api/v1/help-centre/videos` | `GET` | `{"data":[]}` | `/help-centre/videos` tutorial library | Fallback setup video cards |
| 12 | `/api/v1/help-centre/getting-started` | `GET` | `{"data":[]}` | `/help-centre/getting-started` 5-step guide | Fallback 5-step onboarding guide |
| 13 | `/api/v1/help-centre/search` | `GET` | `{"data":[]}` | `/help-centre` knowledge search input | Client-side filter |
| 14 | `/api/v1/galleries` | `GET` | `{"data":[]}` | Product Tour screenshot gallery | Static UI tour images |
| 15 | `/api/v1/contact/newsletter/unsubscribe`| `POST` | Live Handler | Email unsubscription handler | Unsubscribe landing page |
| 16 | `/api/v1/contact/support-ticket` | `POST` | Live Handler | Contact page support ticket modal | Support confirmation toast |
| 17 | `/api/v1/contact/callback` | `POST` | Live Handler | Schedule phone callback form | Callback confirmation dialog |
| 18 | `/api/v1/auth/me` | `GET` | Auth-dependent | Header user profile badge | Authenticated merchant profile |
| 19 | `/api/v1/auth/me/password` | `PUT` | Auth-dependent | Account security settings | Password update form |
| 20 | `/api/v1/auth/password/reset` | `POST` | Live Handler | `/forgot-password` OTP request | OTP dispatch trigger |
| 21 | `/api/v1/auth/password/reset/confirm` | `POST` | Live Handler | `/reset-password` verification | Password update trigger |
| 22 | `/api/v1/registration/{id}/status` | `GET` | Live Handler | `/provisioning` workspace status loader | Polling progress spinner |

---

## 🔴 4. PENDING / REMAINING APIS FROM SWAGGER (37 APIs)
Yeh APIs Swagger specification (`http://localhost:5104/swagger/index.html`) me backend par bani hui hain, lekin public marketing website par inka integration abhi pending hai (ye mainly Merchant Self-Service portal, telemetry status, aur backend reporting se related hain):

### A. Merchant Self-Service & Downloads (9 APIs)
| Endpoint | Method | Purpose in Swagger | Why Needed in Website |
|---|:---:|---|---|
| `/api/v1/merchant-self/profile` | `GET` | View merchant details & store address | Merchant Account Dashboard |
| `/api/v1/merchant-self/profile` | `PUT` | Update merchant contact & preferences | Merchant Profile Edit page |
| `/api/v1/merchant-self/downloads` | `GET` | Dynamic list of licensed software versions | `/downloads` page dynamically populated from DB |
| `/api/v1/merchant-self/downloads/{id}/download` | `GET` | Secure signed binary download stream | Authenticated software updates |
| `/api/v1/merchant-self/wallet/balance` | `GET` | Merchant wallet settlement balance | Merchant portal balance widget |
| `/api/v1/merchant-self/wallet/transactions` | `GET` | Card settlement & fee transaction history | Transaction history view |
| `/api/v1/merchant-self/wallet/payout-request` | `POST` | Request instant bank transfer payout | Payout button |
| `/api/v1/merchant-self/invoices` | `GET` | Software subscription invoice history | Invoices & billing tab |
| `/api/v1/merchant-self/invoices/{id}/pdf` | `GET` | Download tax invoice PDF | Direct PDF invoice download |

### B. Live Terminal & Multi-Store Status (6 APIs)
| Endpoint | Method | Purpose in Swagger | Why Needed in Website |
|---|:---:|---|---|
| `/api/v1/merchants/{merchantId}/stores` | `GET` | List all active merchant stores | Store switcher for franchise users |
| `/api/v1/merchants/{merchantId}/stores/{storeId}/terminals` | `GET` | Real-time terminal hardware connection status | Terminal status page |
| `/api/v1/merchants/{merchantId}/stores/{storeId}/health` | `GET` | Offline mesh SQLite sync health | Live hardware status indicator |
| `/api/v1/merchants/{merchantId}/stores/{storeId}/kds` | `GET` | Kitchen Display station status | Restaurant KDS management |
| `/api/v1/merchants/{merchantId}/stores/{storeId}/shifts` | `GET` | Active cashier shift reconciliation | Shift closing overview |
| `/api/v1/merchants/{merchantId}/stores/{storeId}/printers` | `GET` | Thermal printer network discovery | Printer setup wizard |

### C. Advanced Security & Compliance (8 APIs)
| Endpoint | Method | Purpose in Swagger | Why Needed in Website |
|---|:---:|---|---|
| `/api/v1/auth/mfa/enable` | `POST` | Generates TOTP 2FA QR code | Two-Factor Authentication setup |
| `/api/v1/auth/mfa/verify` | `POST` | Verifies and locks 2FA token | 2FA activation step |
| `/api/v1/auth/mfa/disable` | `POST` | Disables 2FA with master password | Security settings |
| `/api/v1/compliance/gdpr/export` | `GET` | Full user GDPR JSON data export | `/gdpr` compliance data download |
| `/api/v1/compliance/gdpr/delete-request` | `POST` | Right to be forgotten account wipe | GDPR account deletion |
| `/api/v1/audit/logs` | `GET` | Security audit trail of merchant changes | Security audit log viewer |
| `/api/v1/audit/logs/export` | `GET` | Export CSV audit logs | Compliance auditor download |
| `/api/v1/auth/refresh` | `POST` | Refresh expired access token | Automated silent interceptor |

### D. Analytics & Reporting Feeds (6 APIs)
| Endpoint | Method | Purpose in Swagger | Why Needed in Website |
|---|:---:|---|---|
| `/api/v1/reports/sales/summary` | `GET` | Daily total sales & tax metrics | Homepage live ticker (Optional live pulse) |
| `/api/v1/reports/sales/hourly` | `GET` | Rush-hour order distribution graph | Live demo visual graph |
| `/api/v1/reports/cashier/reconciliation` | `GET` | Cash drawer over/short discrepancy | Cash management showcase |
| `/api/v1/reports/inventory/low-stock` | `GET` | Low stock alert trigger list | Inventory demo widget |
| `/api/v1/reports/payments/breakdown` | `GET` | Cash vs Card vs Digital split | Payment analytics showcase |
| `/api/v1/reports/tax/summary` | `GET` | Sales tax filing report summary | Tax compliance showcase |

### E. Helpdesk & Support Ticketing (8 APIs)
| Endpoint | Method | Purpose in Swagger | Why Needed in Website |
|---|:---:|---|---|
| `/api/v1/helpdesk/tickets` | `GET` | List merchant active tickets | Support portal ticket history |
| `/api/v1/helpdesk/tickets/{id}` | `GET` | Single ticket conversation thread | Ticket detail page |
| `/api/v1/helpdesk/tickets` | `POST` | Create new helpdesk support ticket | Live support portal modal |
| `/api/v1/helpdesk/tickets/{id}/reply` | `POST` | Post customer reply to support | Chat message submit |
| `/api/v1/helpdesk/tickets/{id}/close` | `POST` | Close resolved ticket | Resolve button |
| `/api/v1/helpdesk/canned-responses` | `GET` | Quick answers template | Support search suggestions |
| `/api/v1/helpdesk/attachments` | `POST` | Upload screenshot to ticket | Error screenshot uploader |
| `/api/v1/helpdesk/sla/status` | `GET` | Live SLA response countdown | SLA indicator |

---

## 🛠️ 5. HOW TO ADD DATA FOR EMPTY APIS VIA SWAGGER (COPY-PASTE READY)

Aapko `http://localhost:5104/swagger/index.html` me jakar in endpoints par direct POST karna hai taki empty sections live ho jayein:

### 1️⃣ Features Grid (`POST /api/v1/marketing/content`)
* **Tag:** `Marketing` -> `POST /api/v1/marketing/content`
* **JSON Body:**
```json
{
  "contentType": "FeatureHighlight",
  "title": "Dual-Screen POS & Kitchen Display (KDS)",
  "body": "Real-time kitchen order tickets routing directly to chef prep stations with bump bar alerts and -42% faster ticket turnover.",
  "imageUrl": "/images/features/kds-preview.png",
  "linkUrl": "/features",
  "sortOrder": 1,
  "isActive": true,
  "pageSlug": "homepage-features",
  "locale": "en"
}
```

### 2️⃣ Integrations (`POST /api/v1/marketing/integrations`)
* **Tag:** `Marketing` -> `POST /api/v1/marketing/integrations`
* **JSON Body:**
```json
{
  "name": "Stripe Terminal",
  "slug": "stripe-terminal",
  "category": "Payments",
  "logoUrl": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&q=80",
  "tagline": "Accept chip cards, Apple Pay, and contactless tap tableside.",
  "description": "Seamless integration between Quantix POS and Stripe BBPOS card readers with automatic end-of-day payouts and fraud protection.",
  "sortOrder": 1,
  "isActive": true
}
```

### 3️⃣ Industry Verticals (`POST /api/v1/marketing/industries`)
* **Tag:** `Marketing` -> `POST /api/v1/marketing/industries`
* **JSON Body:**
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

### 4️⃣ Help Articles (`POST /api/v1/help-centre/articles`)
* **Tag:** `HelpCentre` -> `POST /api/v1/help-centre/articles`
* **JSON Body:**
```json
{
  "title": "How to Configure Thermal Receipt Printers & Cash Drawers",
  "slug": "configure-thermal-receipt-printers",
  "body": "## Hardware Setup Guide\nConnect your ESC/POS printer via USB, Ethernet, or Bluetooth...\n\n### Steps\n1. Plug printer into local router.\n2. In Quantix Terminal, select Hardware -> Printers -> Auto-Discover.\n3. Run a test print.",
  "tags": "Hardware, Printers, Setup",
  "sortOrder": 2,
  "isActive": true
}
```

---

## 🏁 6. Production Readiness Verdict

1. **Current State:** Website **100% stable, fully wired with fallback safety**, zero build errors, cookies secured, and direct installer links active.
2. **Immediate Step for Launch:**
   - Swagger se 3-4 entries **Features**, **Integrations**, aur **Industries** me POST karein.
   - Frontend automatically live backend data pick kar lega bina dobara deploy kiye!

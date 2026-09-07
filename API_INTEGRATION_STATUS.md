# 🚀 Quantix Platform Website — API Integration & Production Roadmap

> **Backend Service:** `http://localhost:5104` (Swagger V1: `/swagger/v1/swagger.json`)  
> **Status Updated:** 2026-09-06  
> **Platforms:** Enterprise Website, Restaurant POS Website, Retail POS Website  

---

## 🟢 SECTION 1: PRODUCTION READY & LIVE CONNECTED APIS (Completed ✅)

The following APIs are fully integrated, tested against the live backend database, equipped with fallback resilience, error parsing, and synchronized across all 3 web applications:

### 1. Authentication & Security Engine
| Endpoint | Method | Feature | Implementation Details | Status |
| :--- | :---: | :--- | :--- | :---: |
| `/api/v1/auth/login` | `POST` | **User Sign In** | Validates email/password, stores JWT `accessToken` & `refreshToken` in Secure Cookies & Redux `authSlice`. | ✅ Live |
| `/api/v1/auth/refresh` | `POST` | **Silent Token Refresh** | Intercepts 401 Unauthorized responses in `baseApi.ts`, exchanges refresh token, updates cookies & auto-retries requests. | ✅ Live |
| `/api/v1/auth/me` | `GET` | **Current User Identity** | Automatically injects `Authorization: Bearer <token>`, fetches user role, company name, and permissions. | ✅ Live |
| `/api/v1/auth/me/password` | `PUT` | **Change Password** | Connected to responsive modal dialog, passes UUID `userId`, `currentPassword`, and `newPassword` with live validation checklist. | ✅ Live |
| `/api/v1/auth/logout` | `POST` | **Session Logout** | Terminates backend session and clears client cookies (`accessToken`, `refreshToken`, `authUser`) with clean redirect. | ✅ Live |

### 2. Merchant Registration & Trial Onboarding
| Endpoint | Method | Feature | Implementation Details | Status |
| :--- | :---: | :--- | :--- | :---: |
| `/api/v1/registration/signup` | `POST` | **14-Day Free Trial** | Formik validated onboarding wizard creating enterprise/restaurant/retail merchant records. | ✅ Live |
| `/api/v1/registration/check-email` | `GET` | **Email Availability** | Live debounce check preventing duplicate registrations. | ✅ Live |
| `/api/v1/registration/verify-email` | `POST` | **OTP Verification** | 6-digit PIN code (`ATMOtpInput`) verifying email and activating account. | ✅ Live |
| `/api/v1/registration/{id}/verify-email/send` | `POST` | **Resend OTP** | Cool-down timer with live resend triggers. | ✅ Live |
| `/api/v1/registration/{id}/status` | `GET` | **Provisioning Status** | Live merchant activation telemetry. | ✅ Live |

### 3. Dynamic Marketing Pricing Engine
| Endpoint | Method | Feature | Implementation Details | Status |
| :--- | :---: | :--- | :--- | :---: |
| `/api/v1/marketing/pricing` | `GET` | **Live Pricing Plans** | Real-time extraction of 27 database plans across Standalone POS, Cloud & Enterprise Cloud with dynamic monthly & 16% discounted annual rates. | ✅ Live |
| `/api/v1/registration/pricing` | `GET` | **Checkout Plan Selector** | Tier options and limit calculations during signup. | ✅ Live |

### 4. Customer Social Proof, Reviews & Brand Partners
| Endpoint | Method | Feature | Implementation Details | Status |
| :--- | :---: | :--- | :--- | :---: |
| `/api/v1/marketing/testimonials` | `GET` | **Live Customer Reviews** | Verified customer feedback, 5-star ratings, author credentials, industry badges, and interactive carousel. | ✅ Live |
| `/api/v1/marketing/social-proof` | `GET` | **Platform Telemetry Stats** | Live animated counters (50k+ Merchants, $1.8B+ GMV, 99.99% Uptime, Global Markets). | ✅ Live |
| `/api/v1/marketing/case-studies` | `GET` | **Quantified ROI Case Studies** | Detailed enterprise & multi-chain success stories (`Challenge`, `Solution`, `Results`, `ROI Metric`). | ✅ Live |
| `/api/v1/clientele` | `GET` | **Partner & Brand Marquee** | Infinite animated marquee of trusted merchant brands and franchise networks. | ✅ Live |

### 5. Client State, Hydration & Resiliency
- ✅ **Auto-Hydration on Mount (`Providers.tsx` / `AuthProvider.tsx`):** Restores user state from cookies on refresh with zero UI flash.
- ✅ **Root Modal Architecture:** Lead form (`ContactSalesModal`) & `ChangePasswordModal` mounted at top-level context with backdrop blur.
- ✅ **Standard Feature Modules:** Modular `Types/`, `Service/`, `constants/`, `components/`, and `index.ts` across all 3 platforms.
- ✅ **Graceful Offline Fallbacks:** Zero blank screen crashes even during backend maintenance windows.

---

## 🟡 SECTION 2: PENDING APIS ROADMAP (Next in Line ⏳)

The following Swagger endpoints are available in the backend and ready to be integrated into the website:

### 1️⃣ Priority: Help Centre & Knowledge Base
- [ ] `GET /api/v1/help-centre/faqs` — Live categorized FAQ accordion on `/faq` and `/pricing`.
- [ ] `GET /api/v1/help-centre/articles` & `/articles/{slug}` — Support guides and documentation hub.
- [ ] `GET /api/v1/help-centre/categories` — Topic filters (Billing, Setup, Hardware, API).
- [ ] `GET /api/v1/help-centre/search?q={query}` — Instant live search bar with auto-suggestions.

### 2️⃣ Priority: POS Software Downloads Center
- [ ] `GET /api/v1/downloads/latest` — Automatic latest version numbers & download links for Windows POS, Android APK & iOS App on `/downloads`.

### 3️⃣ Priority: Live Blog & Content Marketing (SEO)
- [ ] `GET /api/v1/blog/posts` & `/posts/{slug}` — Dynamic blog articles with markdown rendering.
- [ ] `GET /api/v1/blog/categories` — Topic categories for articles.
- [ ] `GET /api/v1/blog/authors` — Author credentials & bios.

### 4️⃣ Priority: Password Recovery Flow
- [ ] `POST /api/v1/auth/password/reset` — Email reset link / OTP request on `/forgot-password`.
- [ ] `POST /api/v1/auth/password/reset/confirm` — Set new password on `/reset-password`.

### 5️⃣ Priority: Top Promo Announcement Bar
- [ ] `GET /api/v1/announcements` — Top navbar promo banner ("*Claim 3 Months 100% Free POS Trial*").

### 6️⃣ Priority: Merchant Self Profile & Active Sessions
- [ ] `GET /api/v1/merchant-self/profile` & `PATCH /api/v1/merchant-self/profile` — Live business profile settings.
- [ ] `GET /api/v1/sessions` & `DELETE /api/v1/sessions/{id}` — Manage logged-in devices & remote sign-out.

### 7️⃣ Priority: Two-Factor Authentication (MFA / 2FA)
- [ ] `GET /api/v1/auth/mfa/setup` — QR code & secret generation.
- [ ] `POST /api/v1/auth/mfa/enable` & `POST /api/v1/auth/mfa/verify` — Two-step verification on login.

---

## 📈 Summary Progress
- **Completed & Production Ready:** `16 APIs (100% Live & Synchronized)`
- **Pending Implementation:** `14 APIs (Structured by Priority)`

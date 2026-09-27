# Quantix Platform — Homepage CMS & API Gap Analysis
**Scope:** Enterprise (`localhost:3000`), Restaurant (`localhost:3002`), Retail (`localhost:3001`), PlatformAdmin (`localhost:3001`), PlatformApi (`localhost:5104`)  
**Generated On:** 2026-09-27  

---

## 1. Executive Summary

A comprehensive audit was performed across the **Homepages (`HomePageClient.tsx`)** of all three storefronts:
1. **Enterprise Platform Website** (`Qauntix_Plateform_Enterprise_Website`)
2. **Restaurant Platform Website** (`Qauntix_Plateform_Restaurent_Website`)
3. **Retail Platform Website** (`Qauntix_Plateform_Retail_Website`)

All three websites share an identical **11-section layout** on their Homepages.  
Currently:
- **6 Sections** are fully backed by CMS in Admin and dynamic Backend APIs.
- **5 Sections** are completely static (hardcoded data files or static React components) and have **no CMS in Admin and no API endpoints**.

---

## 2. Master Comparison Matrix (11 Homepage Sections)

| # | Section Name | Component in Websites | Backend API Controller | Admin CMS Module | Status |
|:---:|:---|:---|:---|:---|:---:|
| 1 | **Hero Section** | `HeroSection` | `HeroSlidesController.cs` | `/content/hero-banners` | <span style="color:green;font-weight:bold;">✅ Built & Dynamic</span> |
| 2 | **Social Proof Stats Counter** | `SocialProofStatsWrapper` | `SocialProofMetricsController.cs` | `/content/social-proof` | <span style="color:green;font-weight:bold;">✅ Built & Dynamic</span> |
| 3 | **Business Problems Section** | `BusinessProblemSection` | ❌ *None (`businessProblemsData.ts`)* | ❌ *None* | <span style="color:red;font-weight:bold;">🔴 Static (Needs CMS)</span> |
| 4 | **Core Features Suite Showcase** | `FeaturesSection` / `FeaturesVaultView` | ❌ *None (`featuresData.ts`)* | ❌ *None* | <span style="color:red;font-weight:bold;">🔴 Static (Needs CMS)</span> |
| 5 | **Platform Modules Deck (Slider)** | `PlatformModulesDeck` | ❌ *None (`PLATFORM_DECK_MODULES`)* | ❌ *None* | <span style="color:red;font-weight:bold;">🔴 Static (Needs CMS)</span> |
| 6 | **How It Works Flow** | `HowItWorksSection` | `HowItWorksController.cs` | `/content/how-it-works` | <span style="color:green;font-weight:bold;">✅ Built & Dynamic</span> |
| 7 | **Integrations Ecosystem Ticker** | `IntegrationsTickerSection` | `IntegrationController.cs` | `/content/integrations` | <span style="color:green;font-weight:bold;">✅ Built & Dynamic</span> |
| 8 | **24/7 Dedicated Customer Support** | `SupportSection` | ❌ *None (`SupportSection.tsx`)* | ❌ *None* | <span style="color:red;font-weight:bold;">🔴 Static (Needs CMS)</span> |
| 9 | **Testimonials & Reviews** | `LazyTestimonialsSection` | `TestimonialsController.cs` | `/content/testimonials` | <span style="color:green;font-weight:bold;">✅ Built & Dynamic</span> |
| 10 | **FAQs Accordion** | `LazyFAQWrapper` | `HelpCentreController.cs` (`/faqs`) | `/content/faq` | <span style="color:green;font-weight:bold;">✅ Built & Dynamic</span> |
| 11 | **Final CTA Banner** | `CTABanner` | ❌ *None (`CTABanner.tsx`)* | ❌ *None* | <span style="color:red;font-weight:bold;">🔴 Static (Needs CMS)</span> |

---

## 3. Deep Dive: The 5 Missing Sections (Detailed Requirements)

### 📌 1. 24/7 Dedicated Customer Support Section (`SupportSection`)
- **Websites Impacted:** Enterprise, Restaurant, Retail (Section 8, right before Testimonials).
- **Current State:** 100% hardcoded in `SupportSection.tsx`.
- **Fields Required in CMS & API:**
  - `SiteVariant`: `Enterprise` | `Restaurant` | `Retail` | `All`
  - `PillBadge`: e.g., *"24/7/365 HUMAN CUSTOMER SUPPORT"*
  - `MainTitle`: e.g., *"24/7 Dedicated Enterprise Technical Support"*
  - `HighlightWord`: e.g., *"Technical Support"* (renders with orange-amber gradient)
  - `Description`: e.g., *"Multi-location operations need immediate resolution..."*
  - **3 Support Pillars (Array)**:
    - `IconKey`: `Headphones`, `Clock`, `ShieldCheck`, etc.
    - `Title`: e.g., *"Dedicated Account Manager"*, *"Priority Direct Channel"*, *"Instant Remote Screen-Share"*
    - `Description`: Short 1-liner explanation.
  - **Support Contact Card**:
    - `RepresentativeName`: e.g., *"Senior Enterprise Escalation Desk"*
    - `RepresentativeAvatar`: Image URL
    - `ResponseTimeBadge`: e.g., *"Average Live Response: < 45 Seconds"*
    - `DirectPhoneNumber`: e.g., `+1 (800) 555-0199`
    - `EmailAddress`: e.g., `enterprise@quantixpos.com`
    - `LiveChatStatus`: `Online` / `Available`

---

### 📌 2. Business Problems Section (`BusinessProblemSection`)
- **Websites Impacted:** Enterprise, Restaurant, Retail (Section 3, between Stats and Features).
- **Current State:** Hardcoded in `src/features/BusinessProblems/constants/businessProblemsData.ts`.
- **Fields Required in CMS & API:**
  - `SiteVariant`: `Enterprise` | `Restaurant` | `Retail`
  - `PillBadge`: e.g., *"THE HIDDEN DRAIN ON MULTI-UNIT MARGINS"*
  - `MainTitle`: e.g., *"Fragmented Systems Are Quietly Costing You 4–8% in Margins"*
  - `Description`: Subtitle explaining the cost of outdated tech.
  - **3 Problem Cards (Array)**:
    - `ProblemNumber`: `"01"`, `"02"`, `"03"`
    - `ImpactBadge`: e.g., `"-6.2% Revenue Loss"`, `"High Staff Turnover"`, `"Inventory Shrinkage"`
    - `Title`: e.g., *"Disconnected POS & Kitchen Silos"*
    - `ProblemDescription`: Detailed pain point.
    - `QuantixSolutionTitle`: e.g., *"How Quantix Resolves It"*
    - `QuantixSolutionDesc`: The positive solution provided by Quantix.

---

### 📌 3. Platform Modules Deck (`PlatformModulesDeck`)
- **Websites Impacted:** Enterprise, Restaurant, Retail (Section 5, interactive 4-card slider).
- **Current State:** Hardcoded in `PLATFORM_DECK_MODULES`.
- **Fields Required in CMS & API:**
  - `SiteVariant`: `Enterprise` | `Restaurant` | `Retail`
  - `FilterCategory`: `Storefront & Till` | `Kitchen & Inventory` | `Multi-Store HQ` | `Enterprise Security`
  - `Title`: e.g., *"Cloud POS Mesh Till"*, *"Kitchen Display Engine"*
  - `Description`: High-throughput cashier checkout features.
  - `Badge`: e.g., *"Storefront Flagship"*, *"Real-Time Expo"*
  - `SpecBadge`: e.g., *"⚡ 100% Offline Mesh"*, *"☁ < 2.4s Global Sync"*
  - `Highlights`: 3 key feature bullets (e.g., `["Peer Till Mesh", "Sub-Second Barcode", "Split Checks"]`)
  - `ImageSrc`: Mockup hardware/software preview.
  - `DetailHref`: Link to feature page (e.g., `/features/cloud-pos`).

---

### 📌 4. Core Features Suite Showcase (`FeaturesSection`)
- **Websites Impacted:** Enterprise, Restaurant, Retail (Section 4).
- **Current State:** Hardcoded in `src/features/Features/constants/featuresData.ts`.
- **Fields Required in CMS & API:**
  - `SiteVariant`: `Enterprise` | `Restaurant` | `Retail`
  - `VaultModules`: 5-6 core architectural pillars:
    - *Point of Sale & Checkout*
    - *Inventory & Stock Control*
    - *Kitchen & Order Routing*
    - *Multi-Store Cloud Synchronization*
    - *Financial & Labor Telemetry*
  - `HardwareChips`: Array of connected devices (Barcodes, Weighing Scales, KDS, Cash Drawers).

---

### 📌 5. Final CTA Banner (`CTABanner`)
- **Websites Impacted:** Enterprise, Restaurant, Retail (Section 11, bottom of page).
- **Current State:** Hardcoded in `src/components/organisms/CTABanner/CTABanner.tsx`.
- **Fields Required in CMS & API:**
  - `SiteVariant`: `Enterprise` | `Restaurant` | `Retail`
  - `PillBadge`: e.g., *"READY TO SCALE YOUR OPERATION?"*
  - `MainHeading`: e.g., *"Run Every Store From One Central Cloud Platform"*
  - `Subtitle`: Description encouraging trial signup or demo request.
  - `PrimaryCtaText`: e.g., *"Start 30-Day Free Trial"*
  - `PrimaryCtaHref`: `/sign-up` or modal trigger.
  - `SecondaryCtaText`: e.g., *"Book Executive Demo"*
  - `SecondaryCtaHref`: `/contact` or demo modal trigger.
  - `TrustBadges`: 3 checkmarks (e.g., *"No credit card required"*, *"Instant cloud rollout"*, *"Cancel anytime"*).

---

## 4. Priority Recommendation

| Priority | Module | Justification |
|:---:|:---|:---|
| **P1** | **Customer Support (`SupportSection`)** | Directly impacts enterprise buyer trust, conversion, and phone/chat response credibility. User explicitly requested this first. |
| **P2** | **Platform Modules Deck (`PlatformModulesDeck`)** | Interactive showcase displaying hardware and system specs across all 3 sites. |
| **P3** | **Business Problems Section (`BusinessProblemSection`)** | Critical for value proposition and ROI calculation on the homepage. |
| **P4** | **Final CTA Banner (`CTABanner`)** | Centralizes marketing conversion banners across the footer of multiple pages. |
| **P5** | **Core Features Suite Showcase** | Completes the kinetic feature vault. |

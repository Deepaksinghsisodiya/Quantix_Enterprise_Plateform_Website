# APP-T2-04: SaaS Platform Public Website (SPW) — Process Flow Document (PFD)

> **Input Document**: POS_APP_T2_04_FRS_SPW_V2.md (88 FRs, 7 sections)
> **Application**: APP-T2-04 | Tier-2 | Next.js 14+ SSR/ISR | SaaS platform public website
> **SAD Reference**: POS_SAD_V2.md — Section 2 (Cloud Architecture)
> **FRS Reference**: POS_APP_T2_04_FRS_SPW_V2.md
> **Related PFDs**: POS_APP_T2_03_PFD_SAP_V1.md (Admin Portal — manages content consumed by SPW), POS_APP_T2_02_PFD_SPA_V1.md (API — processes signups, contacts, content queries)
> **Purpose**: Documents all visitor journey flows, conversion funnels, signup processes, content engagement patterns, and interaction sequences on the public website. These flows describe the prospective merchant experience — from first landing to registered customer.

> **Note**: SPW is a public-facing marketing website. There is no login, no cart, no transactional flow. Process flows here describe: visitor journeys, content discovery, conversion paths (signup + demo + contact), content engagement (blog + help centre), and the bifurcated Enterprise vs Standalone signup experience.

---

## 1. Process Flow Index

| # | Flow | Type | FRS Section | Key FRS References |
|---|------|------|-------------|--------------------|
| PF-01 | Visitor Landing & Discovery Journey | Master Orchestration | 1xx | FRS-SPW-101, 102, 107, 109, 114 |
| PF-02 | Pricing Page & Plan Discovery | Decision Tree | 1xx | FRS-SPW-103, 112, 113 |
| PF-03 | Enterprise Signup Flow | Sequential Process | 2xx | FRS-SPW-201–206, 208 |
| PF-04 | Standalone Signup Flow | Sequential Process | 2xx | FRS-SPW-201, 203–204, 206, 210 |
| PF-05 | Solution Finder Quiz | Sequential Process | 1xx | FRS-SPW-112 |
| PF-06 | ROI Calculator Journey | Sequential Process | 1xx | FRS-SPW-110 |
| PF-07 | Interactive Product Tour | Sequential Process | 1xx | FRS-SPW-111 |
| PF-08 | Contact & Lead Capture | Decision Tree | 3xx | FRS-SPW-301–303, 305, 307 |
| PF-09 | Blog Content Engagement | Sequential Process | 4xx | FRS-SPW-401–409 |
| PF-10 | Help Centre Self-Service | Sequential Process | 5xx | FRS-SPW-501–511 |
| PF-11 | Conversion Funnel & CTA Pipeline | Master Orchestration | 7xx | FRS-SPW-714–717 |
| PF-12 | Page Load & Render Pipeline | Sequential Process | 6xx, 7xx | FRS-SPW-605, 710–713 |
| PF-13 | SEO & Content Indexing | Sequential Process | 6xx | FRS-SPW-602 |
| PF-14 | Newsletter & Email Capture | Sequential Process | 4xx, 7xx | FRS-SPW-407, 715 |

---

## 2. PF-01: Visitor Landing & Discovery Journey

**Trigger**: Visitor arrives at website (organic search, paid ad, referral, direct)
**Actors**: Visitor (prospective merchant), System (Next.js SSR/ISR, SaaS API)

```
┌─────────────────────────────────────────────────────────────────────┐
│          PF-01: VISITOR LANDING & DISCOVERY JOURNEY                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [VISITOR ARRIVES]                                                  │
│       │                                                             │
│       ↓                                                             │
│  ENTRY POINT = ?                                                    │
│  ┌────────────┬──────────┬──────────┬──────────┐                   │
│  ↓            ↓          ↓          ↓          ↓                   │
│ HOMEPAGE   FEATURE   PRICING    INDUSTRY   BLOG/HELP              │
│ (101)      PAGE(102) PAGE(103)  PAGE(107)  (4xx/5xx)              │
│  │            │          │          │          │                   │
│  ↓            ↓          ↓          ↓          ↓                   │
│                                                                     │
│ ═══ HOMEPAGE JOURNEY (FRS-SPW-101) ═══                             │
│                                                                     │
│  SECTION 1: HERO (viewport-height)                                 │
│  ┌──────────────────────────────────────────┐                      │
│  │ 3D POS terminal (float + parallax)       │                      │
│  │ Bold gradient headline (80-96px)         │                      │
│  │ Subheadline                              │                      │
│  │ [Start Free Trial] [Get a Demo]          │                      │
│  │ Scroll indicator ↓                       │                      │
│  └──────────────────────────────────────────┘                      │
│       │ (scroll)                                                    │
│       ↓                                                             │
│  SECTION 2: VALUE PROPOSITIONS                                      │
│  3 glassmorphism cards — fade-in staggered on scroll               │
│       │                                                             │
│       ↓                                                             │
│  SECTION 3: PRODUCT SHOWCASE                                        │
│  Tabbed: [Restaurant POS] [Retail POS] [Online Ordering]           │
│  Screenshot + feature bullets per tab                               │
│       │                                                             │
│       ↓                                                             │
│  SECTION 4: SOCIAL PROOF BAR (FRS-SPW-114)                        │
│  Animated counters: 50K+ merchants, 1M+ txns/day, 99.9% uptime   │
│       │                                                             │
│       ↓                                                             │
│  SECTION 5: PRICING PREVIEW                                        │
│  3-plan summary → "View All Plans" link → PF-02                   │
│       │                                                             │
│       ↓                                                             │
│  SECTION 6: TESTIMONIALS                                           │
│  Carousel with photos, quotes, business type badges (104)          │
│       │                                                             │
│       ↓                                                             │
│  SECTION 7: INTEGRATION LOGOS                                      │
│  Scrolling ticker: Stripe, Square, DoorDash, QuickBooks, etc.     │
│       │                                                             │
│       ↓                                                             │
│  SECTION 8: MERCHANT TYPE EXPLAINER (FRS-SPW-113)                  │
│  ┌─────────────────┬────────────────────┐                          │
│  │ Cloud Enterprise │ Standalone Terminal │                         │
│  │ [Learn More]     │ [Learn More]       │                         │
│  └─────────────────┴────────────────────┘                          │
│       │                                                             │
│       ↓                                                             │
│  SECTION 9: FINAL CTA                                              │
│  "Ready to transform your business?" → [Sign Up Now]              │
│                                                                     │
│  PERSISTENT ELEMENTS:                                               │
│  • Announcement bar (109) — top, dismissible                       │
│  • Sticky header (611) — glassmorphism on scroll                   │
│  • Sticky CTA bar (714) — appears after scrolling past hero       │
│  • Social proof nudge (716) — toast every 60s                     │
│                                                                     │
│  VISITOR EXITS TO:                                                  │
│  → PF-02 (Pricing) | PF-03/04 (Signup) | PF-05 (Quiz)            │
│  → PF-06 (ROI Calc) | PF-07 (Product Tour) | PF-08 (Contact)     │
│  → PF-09 (Blog) | PF-10 (Help Centre) | PF-11 (CTA pipeline)    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. PF-02: Pricing Page & Plan Discovery

**Trigger**: Visitor navigates to /pricing or clicks "View Plans"
**Actors**: Visitor

```
┌─────────────────────────────────────────────────────────────────────┐
│          PF-02: PRICING PAGE & PLAN DISCOVERY                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [/PRICING LOADED]                                                  │
│       │                                                             │
│       ↓                                                             │
│  TAB SELECTION (FRS-SPW-103):                                      │
│  ┌────────────────────┬────────────────────┐                       │
│  │ Enterprise Plans ← │ Standalone Tokens  │                       │
│  │    (default)        │                    │                       │
│  └────────────────────┴────────────────────┘                       │
│       │                       │                                     │
│  ENTERPRISE TAB ↓        STANDALONE TAB ↓                           │
│                                                                     │
│  ┌────────────────────┐   ┌────────────────────┐                   │
│  │ Billing toggle:    │   │ Token Tier Cards:  │                   │
│  │ [Monthly] [Annual] │   │ Basic / Standard / │                   │
│  │ "Save 2 months"    │   │ Advance / Premium  │                   │
│  │                    │   │                    │                   │
│  │ Plan columns:      │   │ Each card:         │                   │
│  │ FREE / BASIC /     │   │ • Tier name        │                   │
│  │ PRO ★ / ENTERPRISE │   │ • Validity dropdown│                   │
│  │ "Most Popular"     │   │   30/60/90/180/365 │                   │
│  │                    │   │ • Price per validity│                   │
│  │ Features matrix    │   │ • Feature list     │                   │
│  │ with tooltips      │   │ • [Buy Token] CTA  │                   │
│  │                    │   │                    │                   │
│  │ [Choose Plan] CTA  │   │ Bulk discount note │                   │
│  │ per tier           │   │ "10+? Contact sales"│                  │
│  └────────────────────┘   └────────────────────┘                   │
│       │                       │                                     │
│       ↓                       ↓                                     │
│  [Choose Plan] →         [Buy Token] →                             │
│  PF-03 (Enterprise       PF-04 (Standalone                         │
│  signup with plan        signup) OR                                │
│  pre-selected)           PF-08 (Contact sales                      │
│                          for bulk)                                  │
│                                                                     │
│  BELOW BOTH TABS:                                                   │
│  ┌──────────────────────────────────────────┐                      │
│  │ FAQ Accordion (common pricing questions) │                      │
│  │ "Not sure?" → [Take the Quiz] → PF-05   │                      │
│  │ "Compare options" → FRS-SPW-113 page     │                      │
│  └──────────────────────────────────────────┘                      │
│                                                                     │
│  DATA SOURCE: SaaS API SPA-1103 (Enterprise plans)                 │
│               SaaS API SPA-611 (Standalone token pricing)           │
│               Cached 5-min ISR                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. PF-03: Enterprise Signup Flow

**Trigger**: Visitor clicks "Choose Plan", "Start Free Trial", or "Sign Up" (Enterprise path)
**Actors**: Visitor, System (SaaS API SPA-013)

```
┌─────────────────────────────────────────────────────────────────────┐
│          PF-03: ENTERPRISE SIGNUP FLOW                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 0: PATH SELECTION (FRS-SPW-201)                              │
│  ┌──────────────────────────────────────────┐                      │
│  │ "How do you want to use Quantix?"        │                      │
│  │                                          │                      │
│  │ ┌──────────────┐  ┌───────────────────┐  │                     │
│  │ │☁ Cloud       │  │⚡ Standalone      │  │                     │
│  │ │  Enterprise  │  │   Terminal        │  │                     │
│  │ │              │  │                   │  │                     │
│  │ │ Monthly plan │  │ One-time token    │  │                     │
│  │ │ Cloud sync   │  │ Works offline     │  │                     │
│  │ │ Multi-device │  │ No internet req.  │  │                     │
│  │ │              │  │                   │  │                     │
│  │ │ [Select] ←   │  │ [Select]          │  │                     │
│  │ └──────────────┘  └───────────────────┘  │                     │
│  │                                          │                      │
│  │ "Not sure?" → [Help me choose] → PF-05  │                      │
│  └──────────────────────────────────────────┘                      │
│       │ Enterprise selected                                         │
│       ↓                                                             │
│  STEP 1: SELECT PLAN (FRS-SPW-202)                                 │
│  ┌──────────────────────────────────────────┐                      │
│  │ Plan cards: FREE / BASIC / PRO / ENTRP.  │                      │
│  │ Pre-selected if from pricing CTA         │                      │
│  │ Monthly/Annual toggle                    │                      │
│  │ Feature comparison inline                │                      │
│  │ "Recommended" badge if from Quiz (PF-05) │                      │
│  │                                          │                      │
│  │ Plan summary sidebar (sticky)            │                      │
│  │ [Continue →]                             │                      │
│  └──────────────────────────────────────────┘                      │
│       │                                                             │
│       ↓                                                             │
│  STEP 2: BUSINESS DETAILS (FRS-SPW-203)                            │
│  ┌──────────────────────────────────────────┐                      │
│  │ Business name*                           │                      │
│  │ Business type*: [Restaurant][Retail][Both]│                     │
│  │ Contact name*                            │                      │
│  │ Email*                                   │                      │
│  │ Phone*                                   │                      │
│  │ Country*                                 │                      │
│  │ Locations (optional)                     │                      │
│  │                                          │                      │
│  │ Animated floating labels                 │                      │
│  │ Real-time validation                     │                      │
│  │ Duplicate email check (API)              │                      │
│  │ [Continue →]                             │                      │
│  └──────────────────────────────────────────┘                      │
│       │                                                             │
│       ↓                                                             │
│  STEP 3: EMAIL VERIFICATION (FRS-SPW-204)                          │
│  ┌──────────────────────────────────────────┐                      │
│  │ OTP sent to email                        │                      │
│  │ 6-digit code input (auto-advance)        │                      │
│  │ [Resend] after 60s cooldown              │                      │
│  │ 10-min expiry                            │                      │
│  └──────────────────────────────────────────┘                      │
│       │                                                             │
│       ↓                                                             │
│  STEP 4: PAYMENT (FRS-SPW-205)                                     │
│  ┌──────────────────────────────────────────┐                      │
│  │ FREE tier → SKIP to Step 5               │                      │
│  │ Paid tier →                              │                      │
│  │   Embedded payment gateway (tokenized)   │                      │
│  │   Card / Apple Pay / Google Pay          │                      │
│  │   Billing address                        │                      │
│  │   First billing date shown               │                      │
│  │   Plan summary sidebar                   │                      │
│  │   [Complete Signup]                      │                      │
│  └──────────────────────────────────────────┘                      │
│       │                                                             │
│       ↓                                                             │
│  STEP 5: CONFIRMATION (FRS-SPW-206)                                │
│  ┌──────────────────────────────────────────┐                      │
│  │ 🎉 Confetti animation                   │                      │
│  │ "Welcome to Quantix!"                   │                      │
│  │ Merchant ID: QX-xxxxx                    │                      │
│  │ Plan: [Selected Plan]                    │                      │
│  │ Next steps checklist                     │                      │
│  │ [Go to Admin Portal] ← primary CTA      │                      │
│  │                                          │                      │
│  │ Welcome email sent:                      │                      │
│  │   • Login credentials                    │                      │
│  │   • Getting-started guide link           │                      │
│  │   • Support contact                      │                      │
│  └──────────────────────────────────────────┘                      │
│                                                                     │
│  API CALLS:                                                         │
│  Step 2 → POST /api/v1/tenants/register (MerchantType=Enterprise) │
│  Step 3 → POST /api/v1/tenants/verify-email                       │
│  Step 4 → POST /api/v1/tenants/{id}/payment                       │
│  Step 5 → POST /api/v1/tenants/{id}/activate                      │
│                                                                     │
│  ANALYTICS (FRS-SPW-209):                                          │
│  Track: step completion, drop-off per step, time per step,         │
│  plan selected, billing cycle, source (UTM)                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. PF-04: Standalone Signup Flow

**Trigger**: Visitor clicks "Buy Token" or selects Standalone path
**Actors**: Visitor, System (SaaS API SPA-013)

```
┌─────────────────────────────────────────────────────────────────────┐
│          PF-04: STANDALONE SIGNUP FLOW                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 0: PATH SELECTION → Standalone selected (FRS-SPW-201)        │
│       │                                                             │
│       ↓                                                             │
│  ❌ NO PLAN SELECTION (token-based licensing)                       │
│       │                                                             │
│       ↓                                                             │
│  STEP 1: BUSINESS DETAILS (FRS-SPW-203)                            │
│  Business name, type (Restaurant/Retail/Both), contact,             │
│  email, phone, country                                              │
│  NO plan field, NO locations count                                  │
│       │                                                             │
│       ↓                                                             │
│  STEP 2: EMAIL VERIFICATION (FRS-SPW-204)                          │
│  Same OTP flow as Enterprise                                        │
│       │                                                             │
│       ↓                                                             │
│  ❌ NO PAYMENT STEP (token purchased separately)                    │
│       │                                                             │
│       ↓                                                             │
│  STEP 3: CONFIRMATION (FRS-SPW-206)                                │
│  ┌──────────────────────────────────────────┐                      │
│  │ 🎉 "You're registered!"                 │                      │
│  │                                          │                      │
│  │ "Your recharge token will be generated   │                      │
│  │  and emailed within 24 hours."           │                      │
│  │                                          │                      │
│  │ [Download Installation Guide] ← PDF      │                      │
│  │ [View Token Tiers & Pricing]             │                      │
│  │ [Contact Support]                        │                      │
│  │                                          │                      │
│  │ Welcome email sent:                      │                      │
│  │   • Registration confirmation            │                      │
│  │   • Installation guide attached          │                      │
│  │   • "Token will arrive within 24h"       │                      │
│  │   • Support contact                      │                      │
│  └──────────────────────────────────────────┘                      │
│                                                                     │
│  API CALLS:                                                         │
│  Step 1 → POST /api/v1/tenants/register (MerchantType=Standalone) │
│  Step 2 → POST /api/v1/tenants/verify-email                       │
│  Step 3 → POST /api/v1/tenants/{id}/activate                      │
│           (triggers token generation on platform side — SAP PF-04) │
│                                                                     │
│  POST-SIGNUP:                                                       │
│  Platform admin generates token → emails to merchant                │
│  Merchant installs POS app → enters token → live                   │
│  (Flow continues on merchant's local machine — not on website)     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. PF-05: Solution Finder Quiz

**Trigger**: Visitor clicks "Find Your Perfect Plan" or "Help me choose"
**Actors**: Visitor

```
┌─────────────────────────────────────────────────────────────────────┐
│          PF-05: SOLUTION FINDER QUIZ                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 1: "What type of business do you run?"                       │
│  [Restaurant] [Retail] [Both]                                      │
│  Animated progress bar: 1/6                                        │
│       │                                                             │
│  STEP 2: "How many locations?"                                     │
│  [1] [2-5] [6-20] [20+]                                           │
│       │                                                             │
│  STEP 3: "How many POS terminals do you need?"                     │
│  [1-2] [3-10] [11-50] [50+]                                       │
│       │                                                             │
│  STEP 4: "Which features are most important?"                      │
│  Multi-select: Inventory, Loyalty, Delivery, Kitchen Display,      │
│  Multi-Location Sync, Offline Mode, Online Ordering, Analytics     │
│       │                                                             │
│  STEP 5: "Do you have reliable internet at your locations?"        │
│  [Yes, always] [Sometimes] [No / Very unreliable]                  │
│       │                                                             │
│  STEP 6: "What's your monthly budget for POS?"                     │
│  [Free / Minimal] [$50-$150] [$150-$500] [$500+] [One-time only]  │
│       │                                                             │
│       ↓                                                             │
│  RESULT: RECOMMENDATION (FRS-SPW-112)                              │
│  ┌──────────────────────────────────────────┐                      │
│  │ "We recommend:"                          │                      │
│  │                                          │                      │
│  │ ┌─────────────────────────────┐          │                      │
│  │ │ PRO Plan (Enterprise)       │          │                      │
│  │ │ Feature match: 92%          │          │                      │
│  │ │ $149/month (annual)         │          │                      │
│  │ │ [Sign Up Now]               │          │                      │
│  │ └─────────────────────────────┘          │                      │
│  │                                          │                      │
│  │ Also consider:                           │                      │
│  │ • Basic Plan ($49/mo) — if budget tight  │                      │
│  │ • Standalone Premium — if internet poor  │                      │
│  │                                          │                      │
│  │ [Email my results] (optional capture)    │                      │
│  │ [Retake quiz]                            │                      │
│  └──────────────────────────────────────────┘                      │
│                                                                     │
│  LOGIC:                                                             │
│  Internet = "No" → recommend Standalone                            │
│  Budget = "One-time" → recommend Standalone                        │
│  Locations > 5 → recommend Enterprise Pro+                         │
│  Features include "Multi-Location Sync" → Enterprise only          │
│  Otherwise → score each plan/tier by feature match %               │
│                                                                     │
│  [Sign Up Now] → PF-03 or PF-04 with pre-selected plan/tier       │
│  Email capture → sent to SaaS API as warm lead (SPA-012)           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. PF-06: ROI Calculator Journey

**Trigger**: Visitor navigates to /roi-calculator
**Actors**: Visitor

```
STEP 1: INPUTS (FRS-SPW-110)
  • Business type: [Restaurant] [Retail]
  • Number of locations: [slider 1-50]
  • Average daily transactions: [slider 10-500]
  • Current system: [Manual / Spreadsheet] [Competitor POS] [None]
  • Number of employees: [slider 1-100]

STEP 2: CALCULATE (client-side)
  Formulas based on industry benchmarks:
  • Time saved = employees × avg_minutes_saved_per_day × 30
  • Cost saved = time_saved × avg_hourly_rate + error_reduction + waste_reduction
  • Monthly savings = cost_saved − subscription_price
  • ROI % = (savings / subscription_price) × 100
  • Payback period = subscription_price / (savings / 30)

STEP 3: RESULTS (animated)
  ┌──────────────────────────────────────┐
  │ Estimated Monthly Savings: $2,340    │ (count-up animation)
  │ Time Saved Per Week: 12 hours        │
  │ Projected ROI: 340%                  │ (animated donut chart)
  │ Payback Period: 9 days               │
  │                                      │
  │ [Start Free Trial — see these results│
  │  for your business]                  │
  │                                      │
  │ [Share Results] (unique link)        │
  │ [Download PDF Report]               │
  └──────────────────────────────────────┘

STEP 4: CTA → PF-03 (Enterprise signup) or PF-08 (Contact sales)
  Results data pre-filled into signup context (personalized follow-up)
```

---

## 8. PF-07: Interactive Product Tour

**Trigger**: Visitor clicks "Try Interactive Demo" or navigates to /demo
**Actors**: Visitor

```
STEP 1: Tour intro — "See Quantix in action (no signup needed)"
STEP 2: Step 1/7 — "Taking an Order" → screenshot with hotspot → click to advance
STEP 3: Step 2/7 — "Applying a Discount" → interactive
STEP 4: Step 3/7 — "Processing Payment" → interactive
STEP 5: Step 4/7 — "Viewing Dashboard" → interactive
STEP 6: Step 5/7 — "Managing Inventory" → interactive
STEP 7: Step 6/7 — "Online Order Arrives" → interactive
STEP 8: Step 7/7 — "End-of-Day Report" → interactive
STEP 9: COMPLETION
  "You've seen what Quantix can do!"
  [Start Free Trial] [Request Demo] [View Pricing]
  
ANALYTICS: Track engagement per step; drop-off point; completion rate
DESIGN: Each step is a guided overlay on a product screenshot;
  cursor animation shows where to click; Framer Motion transitions
```

---

## 9. PF-08: Contact & Lead Capture

**Trigger**: Visitor navigates to /contact, clicks "Talk to Sales", "Request Demo", or "Callback"
**Actors**: Visitor, System (SaaS API SPA-012)

```
┌─────────────────────────────────────────────────────────────────────┐
│          PF-08: CONTACT & LEAD CAPTURE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ENTRY = ?                                                          │
│  ┌──────────┬────────────┬──────────┬──────────┐                   │
│  ↓          ↓            ↓          ↓                               │
│ CONTACT   SALES       DEMO       CALLBACK                          │
│ (301)     (302)       (303/207)  (307)                             │
│  │          │            │          │                               │
│  ↓          ↓            ↓          ↓                               │
│ Full form  Qualified    Calendar   Quick form                      │
│ (name,     form (biz    widget     (phone +                        │
│ email,     type, locs,  (Calendly) time +                          │
│ phone,     current POS, + details  topic)                          │
│ company,   timeline,              │                                │
│ inquiry    merchant               │                                │
│ type,      type pref)             │                                │
│ message)        │                  │                               │
│  │              │                  │                               │
│  └──────────────┴──────────────────┘                               │
│                  │                                                   │
│                  ↓                                                   │
│  SPAM CHECK (FRS-SPW-306):                                         │
│  CAPTCHA / invisible challenge + honeypot + rate limit              │
│                  │                                                   │
│                  ↓                                                   │
│  SUBMIT TO API (SPA-1201 / SPA-1202)                               │
│  • Validated + stored as inquiry/lead                               │
│  • Routed to team (sales / support / partnership)                  │
│  • Auto-acknowledgement email to visitor                           │
│                  │                                                   │
│                  ↓                                                   │
│  SUCCESS STATE:                                                     │
│  Animated checkmark + "We'll be in touch within 24 hours"          │
│  Suggested links: [View Pricing] [Read Blog] [Help Centre]        │
│                                                                     │
│  LIVE CHAT (FRS-SPW-305):                                          │
│  Available on all pages; chatbot initial → human escalation        │
│  FAQ matching: visitor types question → AI suggests help article   │
│  If no match → "Chat with our team"                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 10. PF-09: Blog Content Engagement

**Trigger**: Visitor navigates to /blog
**Actors**: Visitor

```
LISTING (FRS-SPW-401):
  Featured/pinned post (full-width hero card)
  → Grid of post cards (title, image, excerpt, author, date, category, read time)
  → Category filter pills (Product Updates, How-To, Industry, etc.)
  → Infinite scroll / pagination
  → Newsletter signup strip between posts

ARTICLE (FRS-SPW-402):
  Full-bleed hero image → title → author bio → date + read time
  → Auto-generated TOC (sticky sidebar desktop)
  → Rich content with embedded product CTAs
  → Progress bar at top (scroll %)
  → Floating share bar (405)
  → "Was this helpful?" at bottom
  → Related articles grid (3-4 cards)
  → Newsletter CTA banner

SEARCH (FRS-SPW-404):
  Real-time; suggestions; highlight matches

CONTENT HUB (FRS-SPW-409):
  /resources → all content types: blog, case studies, whitepapers, eBooks, videos
  → Filterable by type + topic + business type
  → Gated content: email required for whitepapers/eBooks → PF-14

ENGAGEMENT TRACKING (FRS-SPW-607):
  Scroll depth, read completion, share clicks, CTA clicks, newsletter signup
```

---

## 11. PF-10: Help Centre Self-Service

**Trigger**: Visitor (or existing merchant) navigates to /help
**Actors**: Visitor / Merchant

```
HOME (FRS-SPW-501):
  Prominent search bar → sections grid (Getting Started, Billing, POS Setup...)
  → Type-specific sections: "Standalone Setup", "Enterprise Cloud"
  → Popular articles → Recently updated

SEARCH (FRS-SPW-503):
  AI-powered ranking; snippet previews; popular searches; auto-suggest

ARTICLE (FRS-SPW-502):
  Breadcrumbs → title → rich content (screenshots, video, steps, callouts)
  → "Was this helpful?" feedback (507)
  → Related articles → "Still need help? Contact support" CTA

FAQ (FRS-SPW-504):
  Type-specific tabs: [General] [Enterprise] [Standalone]
  Accordion format → topic filter

GETTING STARTED (FRS-SPW-505):
  Guided walkthroughs with progress checklists:
  Enterprise: "Connecting to Cloud" → "Creating Location" → "First Sale"
  Standalone: "Installing POS" → "Activating Token" → "First Sale"

VIDEO (FRS-SPW-506):
  Library by journey: Beginner → Intermediate → Advanced
  Playlist format; auto-play next

COMMUNITY (FRS-SPW-510): External link → forum
API DOCS (FRS-SPW-511): Link → developer docs for Enterprise
VERSIONING (FRS-SPW-509): Version selector → latest default
```

---

## 12. PF-11: Conversion Funnel & CTA Pipeline

**Trigger**: Visitor engagement on any page
**Actors**: System (persistent UI elements)

```
┌─────────────────────────────────────────────────────────────────────┐
│      PF-11: CONVERSION FUNNEL & CTA PIPELINE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  LAYER 1: PRIMARY CTAs (in page content)                           │
│  Every section has a contextual CTA:                                │
│  Feature page → "Start Free Trial" / "Get Demo"                   │
│  Pricing page → "Choose Plan" / "Buy Token"                       │
│  Blog article → "Try this feature" (product CTA in content)       │
│  Help article → "Not on Quantix yet? Sign up"                     │
│                                                                     │
│  LAYER 2: STICKY CTA BAR (FRS-SPW-714)                            │
│  ┌──────────────────────────────────────────┐                      │
│  │ After scrolling past hero:               │                      │
│  │ Mobile: bottom bar "Start Free Trial"    │                      │
│  │ Desktop: floating sidebar CTA            │                      │
│  │ Glassmorphism; dismissible; re-appears   │                      │
│  └──────────────────────────────────────────┘                      │
│                                                                     │
│  LAYER 3: EXIT INTENT (FRS-SPW-715)                                │
│  ┌──────────────────────────────────────────┐                      │
│  │ Desktop: mouse toward close              │                      │
│  │ → Modal: "Wait! Get 20% off first year"  │                      │
│  │ → Email capture field                    │                      │
│  │ → One-time per session                   │                      │
│  │ → Not shown to returning dismissers      │                      │
│  └──────────────────────────────────────────┘                      │
│                                                                     │
│  LAYER 4: SOCIAL PROOF NUDGE (FRS-SPW-716)                        │
│  ┌──────────────────────────────────────────┐                      │
│  │ Floating toast (bottom-left):            │                      │
│  │ "A restaurant in Mumbai just signed up"  │                      │
│  │ Every 60s; anonymized real data          │                      │
│  │ Dismissible; builds FOMO                 │                      │
│  └──────────────────────────────────────────┘                      │
│                                                                     │
│  LAYER 5: TRUST REINFORCEMENT (FRS-SPW-717)                       │
│  Persistent on pricing + signup pages:                              │
│  "SOC 2 Compliant" "PCI DSS" "GDPR Ready"                        │
│  "No credit card required" "30-day money-back"                     │
│                                                                     │
│  ALL CTAs ROUTE TO:                                                 │
│  → PF-03 (Enterprise Signup)                                       │
│  → PF-04 (Standalone Signup)                                       │
│  → PF-08 (Contact / Demo / Callback)                               │
│  → PF-14 (Newsletter / Email Capture)                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 13. PF-12: Page Load & Render Pipeline

**Trigger**: Any page navigation
**Actors**: System (Next.js, CDN, SaaS API)

```
STEP 1: REQUEST arrives at CDN edge
STEP 2: ISR cache hit?
         YES → serve cached HTML (stale-while-revalidate)
         NO  → SSR render at origin
STEP 3: HTML streamed to browser (React Server Components)
STEP 4: Critical CSS inlined; fonts preloaded (font-display: swap)
STEP 5: Above-fold content painted (target: LCP <1.5s)
STEP 6: Below-fold: lazy load images (blur-up placeholder)
STEP 7: JavaScript hydration (client components only)
STEP 8: GSAP scroll animations initialized (observe intersections)
STEP 9: 3D hero element loaded (non-blocking, after initial paint)
         Low-power device? → static fallback image
         prefers-reduced-motion? → no animation
STEP 10: Analytics events fire (page view, scroll depth tracking)
STEP 11: Cookie consent check → load marketing scripts only if consented

CACHE STRATEGY:
  Marketing pages: ISR revalidate 5-min (near-static)
  Blog articles: ISR revalidate 5-min
  Help articles: ISR revalidate 5-min
  Pricing data: ISR revalidate 5-min (SaaS API cached)
  Signup form: SSR (always fresh for CSRF)
```

---

## 14. PF-13: SEO & Content Indexing

**Trigger**: Search engine crawler arrives
**Actors**: System (Next.js SSR, search engine)

```
STEP 1: Crawler requests page → SSR renders full HTML (no JS required)
STEP 2: Meta tags in <head>: title, description, OG, Twitter Card, canonical
STEP 3: JSON-LD structured data in <script>:
         Homepage → Organization + SoftwareApplication
         Pricing → Product + Offer (per plan)
         Feature pages → SoftwareApplication + features
         Blog → Article + author
         Help → HowTo or FAQPage
         FAQ → FAQPage
STEP 4: Internal links via semantic HTML (<nav>, <a>, breadcrumbs)
STEP 5: sitemap.xml auto-generated: all pages + blog + help articles
STEP 6: robots.txt: allow all public; disallow /signup (form pages)
STEP 7: hreflang tags for multi-language variants
STEP 8: Image alt text on all images; lazy-loaded images have noscript fallback
```

---

## 15. PF-14: Newsletter & Email Capture

**Trigger**: Visitor interacts with email capture form
**Actors**: Visitor, System (SaaS API SPA-1205)

```
ENTRY POINTS:
  • Blog page newsletter strip (407)
  • Footer email input
  • Exit intent modal (715)
  • Content hub gated download (409)
  • Solution Finder "Email my results" (112)
  • ROI Calculator "Download PDF Report" (110)
  • Changelog "Subscribe to updates" (115)

FLOW:
  STEP 1: Visitor enters email
  STEP 2: Client-side validation (email format)
  STEP 3: Submit to SaaS API (SPA-1205)
  STEP 4: Double opt-in: confirmation email sent
  STEP 5: Visitor clicks confirm link → subscribed
  STEP 6: Welcome email with "Top 5 articles" collection
  STEP 7: Subscriber added to marketing list

SUCCESS UI:
  Animated confetti + "You're subscribed! 🎉"
  Replace form with "Check your inbox for confirmation"

GATED CONTENT (409):
  Email required to download whitepapers/eBooks
  → Same flow + immediate download link after email entry
  → Double opt-in still required for ongoing newsletter
```

---

## 16. Cross-Reference Matrix

### Process Flow ↔ FRS Requirements

| Flow | FRS Requirements Covered |
|------|--------------------------|
| PF-01 | FRS-SPW-101, 102, 104, 106, 107, 109, 113, 114, 611, 714, 716 |
| PF-02 | FRS-SPW-103, 112, 113 |
| PF-03 | FRS-SPW-201–206, 208, 209 |
| PF-04 | FRS-SPW-201, 203, 204, 206, 209, 210 |
| PF-05 | FRS-SPW-112 |
| PF-06 | FRS-SPW-110 |
| PF-07 | FRS-SPW-111 |
| PF-08 | FRS-SPW-301–303, 305–307 |
| PF-09 | FRS-SPW-401–409 |
| PF-10 | FRS-SPW-501–511 |
| PF-11 | FRS-SPW-714–717 |
| PF-12 | FRS-SPW-605, 710–713 |
| PF-13 | FRS-SPW-602 |
| PF-14 | FRS-SPW-407, 409, 715, 112, 110, 115 |

### Process Flow ↔ SaaS API Endpoints

| Flow | SaaS API (APP-T2-02 V2) |
|------|------------------------|
| PF-01 | SPA-1102 (marketing content, cached) |
| PF-02 | SPA-1103 (Enterprise pricing), SPA-611 (Standalone pricing) |
| PF-03 | SPA-1204 (signup), SPA-302 (verify), SPA-303 (payment), SPA-305 (activate) |
| PF-04 | SPA-1204 (signup), SPA-302 (verify), SPA-305 (activate) |
| PF-05 | Client-side logic; SPA-1201 (email capture as lead) |
| PF-06 | Client-side calculation; no API call (optional: SPA-1201 for lead) |
| PF-07 | No API calls (static interactive content) |
| PF-08 | SPA-1201 (contact), SPA-1202 (demo), SPA-1201 (callback) |
| PF-09 | SPA-1302 (blog posts), SPA-1305 (RSS) |
| PF-10 | SPA-1402 (help articles), SPA-1404 (FAQ), SPA-1405 (feedback) |
| PF-11 | No API calls (UI layer) |
| PF-12 | All SPA endpoints (ISR fetch) |
| PF-13 | All SPA public endpoints (SSR) |
| PF-14 | SPA-1205 (newsletter) |

---

## 17. Flow Dependency Graph

```
PF-12 (Page Load) ←── every page load triggers this pipeline
  │
  ├─→ PF-01 (Homepage Landing)
  │     │
  │     ├─→ PF-02 (Pricing Discovery)
  │     │     ├─→ PF-03 (Enterprise Signup)
  │     │     └─→ PF-04 (Standalone Signup)
  │     │
  │     ├─→ PF-05 (Solution Finder Quiz) → PF-03 or PF-04
  │     ├─→ PF-06 (ROI Calculator) → PF-03 or PF-08
  │     ├─→ PF-07 (Product Tour) → PF-03 or PF-08
  │     └─→ PF-08 (Contact / Demo / Callback)
  │
  ├─→ PF-09 (Blog Engagement)
  │     └─→ PF-14 (Newsletter Capture)
  │
  ├─→ PF-10 (Help Centre)
  │
  ├─→ PF-11 (Conversion CTAs) ←── persistent across ALL flows
  │     ├─→ PF-03 or PF-04 (Signup)
  │     ├─→ PF-08 (Contact)
  │     └─→ PF-14 (Email Capture)
  │
  └─→ PF-13 (SEO Indexing) ←── parallel to all page renders

CONVERSION DESTINATIONS (all roads lead here):
  PF-03 (Enterprise Signup) ← from PF-01, PF-02, PF-05, PF-06, PF-07, PF-11
  PF-04 (Standalone Signup) ← from PF-01, PF-02, PF-05, PF-11
  PF-08 (Contact/Demo)      ← from PF-01, PF-02, PF-06, PF-07, PF-11
  PF-14 (Email Capture)     ← from PF-05, PF-06, PF-09, PF-11
```

---

**END OF PFD**

# APP-T2-04: SaaS Platform Public Website (SPW) — Functional Requirements Specification V2

> **BRD Reference**: POS_BRD_System_Blueprint_V2.md — Section 4.8, BR-T2-SPW-001 through BR-T2-SPW-006
> **SAD Reference**: POS_SAD_V2.md — Sections 2 (Cloud Architecture)
> **Application**: APP-T2-04 | Tier-2 | Next.js 14+ SSR/ISR | SaaS platform public website — marketing, merchant signup, and onboarding
> **Database**: No own database — consumes SaaS Platform API (APP-T2-02 V2) for all dynamic content and form submissions
> **Authentication**: Public (no login for browsing); merchant signup creates tenant via SaaS Platform API
> **Consumes**: SaaS Platform API V2 (APP-T2-02) for: marketing content (SPA-011), contact form (SPA-012), merchant signup (SPA-013 — now with MerchantType + BusinessType), blog (SPA-014), help centre (SPA-015), **token pricing (SPA-611)** **[V2]**
> **Tech Stack**: Next.js 14+ App Router, React Server Components, Tailwind CSS, Framer Motion, GSAP (scroll animations), Three.js / Spline (3D hero), Headless CMS-ready, PWA-lite

> **Vision**: A world-class SaaS marketing website rivaling Stripe, Linear, Vercel, Shopify, Toast, and Square. First impression is everything — the website must feel premium, fast, and trustworthy within 3 seconds. Every pixel must communicate quality, every interaction must delight, and every page must drive conversion. The site is the platform's storefront — it sells the POS system to restaurant and retail merchants.

> **Role**: Public-facing marketing website for the Quantix POS platform. First touchpoint for prospective merchants. Markets the product, explains features, displays pricing (both Enterprise subscription and Standalone token models), converts visitors into registered merchants, and serves as help centre + blog for existing merchants.

> **V2 Fundamental Change — Dual Merchant Type Signup**:
> The platform now supports two merchant types simultaneously. The website must clearly present both paths:
> - **Enterprise** (cloud-connected): subscription plans, cloud dashboard, multi-location sync, commission model
> - **Standalone** (offline): prepaid token licensing, single-terminal or multi-terminal, no cloud dependency
> Pricing page, signup flow, feature pages, help centre, and downloads all differentiated by type. Visitor self-selects their path early in the journey.

> **V2 UI/UX Design Philosophy**:
> - **Motion-first**: Every page has purposeful animation — parallax, scroll-triggered reveals, hover micro-interactions, page transitions (Framer Motion + GSAP)
> - **Dark-native**: Dark mode is the default hero design (like Stripe, Linear); light mode equally polished; system-preference respected
> - **Whitespace-rich**: Generous spacing, clean typography, breathing room; never cramped
> - **Typography-driven**: Bold headlines (80-96px hero), clear hierarchy (6 levels), monospace for technical/pricing, serif accent for editorial
> - **Glass & gradients**: Glassmorphism cards, subtle gradient meshes, glow effects on CTAs, frosted overlays
> - **3D elements**: Hero section with 3D POS terminal render (Spline/Three.js); product screenshots with perspective tilt; animated illustrations
> - **Conversion-obsessed**: Every section has a CTA; sticky CTAs on scroll; exit-intent capture; social proof persistent; urgency where genuine
> - **Speed**: LCP <1.5s (marketing pages ISR-cached); FID <50ms; CLS <0.05; Lighthouse >95

> **V2 Change Summary**:
> - **NEW**: FRS-SPW-1xx expanded — ROI calculator, interactive product tour, solution finder quiz, merchant type explainer
> - **UPDATED**: FRS-SPW-103 — Pricing page now shows BOTH Enterprise plans AND Standalone token tiers in tabbed view
> - **UPDATED**: FRS-SPW-2xx — Signup flow bifurcated by MerchantType; Standalone skips plan selection and payment
> - **NEW**: FRS-SPW-7xx — Design System & Visual Identity (comprehensive design spec, parallel to WEB-REST/WEB-RETAIL 8xx sections)
> - **EXPANDED**: All sections with enhanced UI/UX detail, animation specs, and conversion optimization

---

## FRS-SPW-1xx: Home & Marketing Pages
**BRD**: BR-T2-SPW-001, BR-T2-SPW-002 | **SaaS API**: SPA-011

- FRS-SPW-101: Home Page / Landing Page - **Hero section**: full-viewport dark gradient with 3D animated POS terminal (Spline or Three.js, subtle float + rotate), bold headline (80-96px, gradient text), subheadline, dual CTAs ("Start Free Trial" / "Get a Demo"); scroll indicator arrow. **Value proposition section**: 3 cards with icons, titles, descriptions (fade-in on scroll). **Product showcase**: tabbed carousel — Restaurant POS, Retail POS, Online Ordering — each with screenshot + feature bullets. **Social proof bar**: animated counters (transactions processed, merchants active, uptime %, countries). **Pricing preview**: 3-plan summary with "View All Plans" link. **Testimonial carousel**: merchant photos, quotes, business type badges, auto-play with pause-on-hover. **Integration logos**: scrolling ticker of payment/delivery/hardware partners. **Merchant type explainer** **[V2]**: side-by-side cards — "Cloud Enterprise" vs "Standalone Terminal" — with visual comparison and "Which is right for me?" link. **Final CTA**: gradient section with "Ready to transform your business?" + signup button. All content from SaaS API (SPA-011)

- FRS-SPW-102: Feature Pages - Dedicated pages per feature area: POS for Restaurants, POS for Retail, Online Ordering, Inventory Management, Delivery & Dispatch, Loyalty & CRM, Reporting & Analytics, Kitchen Display, Employee Management, **Multi-Location Management** **[V2]**, **Offline Mode / Standalone** **[V2]**; each page: hero with feature illustration, feature grid with hover animations, screenshot gallery (perspective tilt on scroll), benefit bullets with checkmark icons, **interactive mini-demo (embedded click-through)** **[V2]**, comparison table (us vs manual process), CTA; SSR for SEO; content from SaaS API

- FRS-SPW-103: Pricing Page **[V2 MAJOR UPDATE]** - **Tabbed view**: [Enterprise Plans] and [Standalone Tokens] tabs **[V2]**. **Enterprise tab**: plan comparison table (FREE, BASIC, PRO, ENTERPRISE) with monthly/annual toggle (annual = 2 months free badge), price, features, limits, "Choose Plan" CTA; feature matrix with tooltips; "Most Popular" badge on PRO; Enterprise Commission model explained (small print). **Standalone tab** **[V2]**: token tier cards (Basic, Standard, Advance, Premium) with validity options (30/60/90/180/365 days), price per tier per validity, feature comparison, "Buy Token" CTA; bulk discount callout ("10+ terminals? Contact sales for volume pricing"). **Both tabs**: FAQ accordion at bottom; "Not sure which is right for you?" link to Solution Finder (FRS-SPW-115). **Design**: clean comparison grid, sticky header on scroll within table, highlighted recommended plan, glassmorphism cards, gradient CTAs

- FRS-SPW-104: Testimonials & Case Studies - Testimonials: merchant photo (circular), name, business name, type badge (Restaurant/Retail), quote, star rating, location; masonry grid layout with hover scale. Case study pages: hero with merchant photo + business name, challenge/solution/results story format, KPI callouts ("+40% efficiency", "−25% food waste"), before/after visual, CTA at bottom. **Video testimonials** **[V2]**: embedded video with play button overlay; auto-play muted on scroll-into-view

- FRS-SPW-105: About Us Page - Company story with timeline; mission statement (large quote); team section: leadership grid with hover flip (photo → bio); company values with animated icons; office location with embedded map; press/media section with logo grid; "Join Our Team" link to careers; trust section: certifications, security badges

- FRS-SPW-106: Partners & Integrations Page - Integration grid: payment gateways (Stripe, Square, PayPal, Razorpay, etc.), delivery partners (DoorDash, Uber Eats, etc.), shipping carriers, accounting (QuickBooks, Xero), hardware; each with logo, name, "Learn more" link; category filter; search; total integration count badge; "Request Integration" form

- FRS-SPW-107: Industry Pages - Vertical landing pages: Fine Dining, Fast Casual, QSR / Food Trucks, Cafes & Bakeries, Fashion Retail, Electronics, Grocery, Convenience, **Franchise / Multi-Location** **[V2]**; each with: industry-specific hero image, tailored feature highlights, relevant testimonial, industry-specific pricing note, CTA; SSR for industry SEO keywords

- FRS-SPW-108: Comparison Pages - "Quantix vs [Competitor]" pages: Square, Toast, Lightspeed, Clover, Shopify POS; side-by-side feature matrix; objective comparison; "Switch to Quantix" migration CTA; structured data for rich search results; content from SaaS API

- FRS-SPW-109: Dynamic Banner & Promotions - Top-of-page announcement bar: animated gradient background; dismissible (×); scheduled show/hide; content from SaaS API; examples: "Black Friday: 3 months free on annual plans", "New: Standalone mode now available"

- FRS-SPW-110: ROI Calculator **[NEW V2]** - Interactive calculator page: inputs — business type, number of locations, average daily transactions, current system (manual/competitor), number of employees; output — estimated monthly savings, time saved per week, projected ROI %, payback period; animated results with chart; "Get Started" CTA with pre-filled data; shareable results link; builds urgency and quantifies value

- FRS-SPW-111: Interactive Product Tour **[NEW V2]** - Click-through product demo: embedded interactive walkthrough of the POS terminal interface (screenshot sequence with hotspots, or iFrame sandbox); 5-7 steps showing: taking an order, applying discount, processing payment, viewing reports, managing inventory; no signup required; "Ready to try for real? Start Free Trial" CTA at end; tracks engagement per step

- FRS-SPW-112: Solution Finder Quiz **[NEW V2]** - "Find Your Perfect Plan" interactive quiz: 5-6 questions (business type, locations, terminals, features needed, budget, Enterprise vs Standalone preference); animated progress; recommendation result: "We recommend [Plan/Tier] for your business" with feature match score and "Sign Up" CTA; email capture optional ("Send my results"); quiz data sent to SaaS API as warm lead

- FRS-SPW-113: Merchant Type Explainer **[NEW V2]** - Dedicated page: "Enterprise vs Standalone — What's Right for You?"; side-by-side comparison with animated toggle; comparison table (12 dimensions per SAP V2 Appendix C); "Choose Enterprise" / "Choose Standalone" CTAs leading to respective signup flows; scenarios: "If you have internet → Enterprise", "If you're offline or mobile → Standalone"

- FRS-SPW-114: Success Metrics Bar **[NEW V2]** - Persistent social proof: animated counters on homepage and key pages — "50,000+ merchants", "1M+ transactions/day", "99.9% uptime", "4.8★ rating"; counters animate on scroll-into-view (count-up); data from SaaS API (SPA-011) or hardcoded with periodic refresh

- FRS-SPW-115: Changelog / What's New **[NEW V2]** - Product changelog page: release notes organized by date; version badges; category filters (Features, Improvements, Fixes); "Subscribe to updates" email signup; builds transparency and shows active development; content from SaaS API blog with special "Changelog" category

---

## FRS-SPW-2xx: Merchant Signup & Onboarding
**BRD**: BR-T2-SPW-004 | **SaaS API**: SPA-013 (with MerchantType + BusinessType per V2)

- FRS-SPW-201: Signup Flow **[V2 MAJOR UPDATE]** - Multi-step registration bifurcated by merchant type: **Step 0 — Choose Path**: "I want Cloud Enterprise" / "I want Standalone Terminal" (with brief explainer); **Enterprise path**: Step 1 — Select Plan → Step 2 — Business Details (+ BusinessType) → Step 3 — Email Verify → Step 4 — Payment → Step 5 — Confirmation + "Go to Admin Portal". **Standalone path** **[V2]**: Step 1 — Business Details (+ BusinessType, NO plan selection) → Step 2 — Email Verify → Step 3 — Confirmation + "Your recharge token will be emailed within 24 hours" + Installation Guide download. Progress indicator; animated step transitions (Framer Motion); all data to SaaS API (SPA-013 with MerchantType + BusinessType)

- FRS-SPW-202: Plan Selection (Enterprise) - Pre-select if from pricing CTA; plan summary sidebar; changeable; feature comparison inline; annual/monthly toggle; **"Recommended for you" badge if arriving from Solution Finder** **[V2]**

- FRS-SPW-203: Business Details Capture - Required: business name, **business type (Restaurant/Retail/Both)** **[V2]**, contact name, email, phone, country; optional: address, website, locations count; validation; duplicate email check; **animated form with floating labels and micro-interactions** **[V2]**

- FRS-SPW-204: Email Verification - OTP to email; 6-digit code; resend; 10-min expiry; animated code input (auto-advance on digit entry)

- FRS-SPW-205: Payment Setup (Enterprise Only) - Card via embedded gateway (PCI-compliant, tokenized); billing address; first billing date; skip for FREE tier; **Apple Pay / Google Pay supported** **[V2]**

- FRS-SPW-206: Signup Confirmation - **Type-specific** **[V2]**: Enterprise → merchant ID, plan, "Go to Admin Portal" CTA, welcome email with credentials. Standalone → "Token will be generated and emailed", installation guide download link, "Contact support if you need help" CTA. Confetti animation on success

- FRS-SPW-207: Demo Request - "Request a Demo" flow; **optional MerchantType preference** **[V2]**; demo scheduling via embedded calendar widget (Calendly or similar); auto-acknowledgement; lead captured

- FRS-SPW-208: Free Trial Activation - Enterprise FREE tier; no payment; trial period + upgrade path; **trial countdown banner once logged into Admin Portal** **[V2]**

- FRS-SPW-209: Signup Analytics - Funnel tracking: landing → path selection → details → verify → payment → confirmation; **type-split funnel (Enterprise vs Standalone)** **[V2]**; drop-off per step; source attribution (UTM)

- FRS-SPW-210: Standalone Information Page **[NEW V2]** - Pre-signup information page for Standalone path: how it works (buy token → install POS → enter token → go live), what's included per tier, offline operation explained, renewal process, support options; "Get Started" CTA leads to Standalone signup; video walkthrough of token activation process

---

## FRS-SPW-3xx: Contact & Sales Inquiry
**BRD**: BR-T2-SPW-003 | **SaaS API**: SPA-012

- FRS-SPW-301: Contact Page - Contact form: name, email, phone, company, inquiry type (General, Sales, Support, Partnership, Media, **Standalone Token Inquiry** **[V2]**), message; auto-acknowledge; team routing; **animated form with success state animation** **[V2]**

- FRS-SPW-302: Sales Inquiry - "Talk to Sales": business type, locations, current POS, timeline, **preferred merchant type** **[V2]**; sales lead; notification

- FRS-SPW-303: Demo Request - Same as FRS-SPW-207; **embedded calendar scheduling** **[V2]**; confirmation

- FRS-SPW-304: Office Locations - Addresses, phone, email, hours, embedded map; multiple offices

- FRS-SPW-305: Live Chat Widget - Embedded chatbot (initial automated) → human escalation; all pages; transcript email; configurable from Admin Portal; **AI-powered initial responses with FAQ matching** **[V2]**

- FRS-SPW-306: Contact Form Spam Protection - CAPTCHA/invisible challenge; honeypot; rate limiting; bot detection

- FRS-SPW-307: Callback Request **[NEW V2]** - "Request a Callback" quick form: phone number + preferred time + topic; smaller commitment than full demo; captured as lead; sales team calls back

---

## FRS-SPW-4xx: Blog & Content Marketing
**BRD**: BR-T2-SPW-005 | **SaaS API**: SPA-014

- FRS-SPW-401: Blog Listing Page - Paginated grid; post card: title, featured image (hover zoom), excerpt, author avatar + name, date, category badge, read time; **featured/pinned post at top (full-width hero)** **[V2]**; category filter pills; infinite scroll or pagination; SSR

- FRS-SPW-402: Blog Article Page - Full article: title, hero image (full-bleed), author bio (sidebar or top), date, category, read time, **auto-generated table of contents (sticky sidebar on desktop)** **[V2]**, rich content (headings, images, code blocks, quotes, videos, callouts), **embedded product CTAs within article content** **[V2]**, related articles grid at bottom; progress bar at top; SSR; structured data (Article schema)

- FRS-SPW-403: Blog Categories & Tags - Filter by category (Product Updates, Industry Insights, How-To Guides, Company News, Merchant Success Stories, **Standalone Guides** **[V2]**, **Enterprise Deep Dives** **[V2]**); tag cloud; category page

- FRS-SPW-404: Blog Search - Real-time; highlight matches; empty state; **search suggestions** **[V2]**

- FRS-SPW-405: Social Sharing - Share buttons: Facebook, X, LinkedIn, WhatsApp, email, copy link; OG/Twitter Card meta; **floating share bar on scroll (desktop)** **[V2]**

- FRS-SPW-406: Author Pages - Author profile: photo, bio, role, articles; clickable from articles

- FRS-SPW-407: Newsletter Subscription - Email capture on blog + footer; double opt-in; unsubscribe; **animated subscribe form with success confetti** **[V2]**; **welcome email with "Top 5 articles" collection** **[V2]**

- FRS-SPW-408: Blog RSS Feed - RSS/Atom; feed URL in header

- FRS-SPW-409: Content Hub / Resource Library **[NEW V2]** - Centralized resource page: blog posts, case studies, whitepapers, eBooks, video tutorials, webinar recordings; filterable by type, topic, business type; gated content (email required for downloads — whitepapers, eBooks); builds email list and positions platform as thought leader

---

## FRS-SPW-5xx: Help Centre & Knowledge Base
**BRD**: BR-T2-SPW-006 | **SaaS API**: SPA-015

- FRS-SPW-501: Help Centre Home - Sections: Getting Started, Account & Billing, POS Setup, Online Ordering, Inventory, Reporting, Integrations, Troubleshooting, **Standalone Setup & Token Management** **[V2]**, **Enterprise Cloud Setup** **[V2]**; article count per section; prominent search; recently updated; **popular articles** **[V2]**

- FRS-SPW-502: Help Article Page - Title, breadcrumbs, rich content (text, images, screenshots, step-by-step, video, callouts), last updated, "Was this helpful?" feedback, related articles; **copy-friendly code/config snippets** **[V2]**; **"Still need help? Contact support" CTA at bottom** **[V2]**; SSR

- FRS-SPW-503: Help Search - Search all articles; real-time; snippet previews; popular searches; auto-suggest; **AI-powered search ranking** **[V2]**

- FRS-SPW-504: FAQ Pages - Accordion format; topic filter; **type-specific FAQ sections (Enterprise FAQ, Standalone FAQ, General FAQ)** **[V2]**; commonly asked featured

- FRS-SPW-505: Getting Started Guides - Step-by-step: "Setting Up Your First Location", "Configuring Your Menu", "Processing Your First Sale", "Setting Up Online Ordering", "Inviting Your Team", **"Activating Your Recharge Token (Standalone)"** **[V2]**, **"Connecting to Cloud (Enterprise)"** **[V2]**; screenshots, video, progress checklist

- FRS-SPW-506: Video Tutorials - Embedded videos; video library page; thumbnail, title, duration, topic; **video playlist by journey (Beginner, Intermediate, Advanced)** **[V2]**

- FRS-SPW-507: Help Article Feedback - "Was this helpful?" (Yes/No) + comment; submitted to API; analytics

- FRS-SPW-508: Contextual Help Links - Help articles linked from product; deep linking

- FRS-SPW-509: Help Centre Versioning - Version per product release; version selector; latest default

- FRS-SPW-510: Community Forum Link **[NEW V2]** - "Ask the Community" link/section: redirects to external community forum (Discourse, Circle, or future embedded); shows recent community questions; builds peer-to-peer support ecosystem

- FRS-SPW-511: API Documentation Link **[NEW V2]** - "Developer Docs" section in help centre: link to API documentation (Swagger/OpenAPI); getting started with API; authentication guide; webhook reference; for Enterprise merchants building integrations

---

## FRS-SPW-6xx: Website Design, SEO & Operations
**BRD**: Implicit | **Standards**: Same patterns as WEB-REST/WEB-RETAIL 8xx

- FRS-SPW-601: Responsive Design - Mobile-first; breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px); bottom nav mobile (Home, Features, Pricing, Blog, More); touch-optimized; consistent across devices

- FRS-SPW-602: SEO Optimization - SSR/ISR (Next.js 14+ App Router); structured data (Organization, SoftwareApplication, FAQPage, Article, BreadcrumbList, HowTo, Product — for pricing); meta tags per page; sitemap.xml; robots.txt; canonical; hreflang; blog + help indexed; **JSON-LD for all structured data** **[V2]**; **product schema on pricing page** **[V2]**

- FRS-SPW-603: Multi-Language - Language selector; URL routing (/en/, /es/, /fr/, /hi/, /ar/); default configurable; RTL; all content translatable

- FRS-SPW-604: Accessibility - WCAG 2.1 AA; keyboard nav; screen reader; contrast; alt text; ARIA; focus; skip-to-content; **reduced motion support** **[V2]**; accessibility statement page

- FRS-SPW-605: Performance - **LCP <1.5s** **[V2 — stricter than V1]** (marketing pages ISR-cached at edge); FID <50ms; CLS <0.05; image optimization (WebP/AVIF, lazy, srcset, blur-up); code splitting; CDN; edge caching; **Lighthouse >95** **[V2]**; skeleton loading

- FRS-SPW-606: Cookie Consent & Privacy - Category banner (Necessary, Analytics, Marketing); persistence; privacy policy; terms; GDPR/CCPA

- FRS-SPW-607: Analytics Integration - GA4; signup funnel; contact submissions; blog engagement; help views; CTA clicks; UTM; conversion tracking; **heatmaps (Hotjar/Clarity)** **[V2]**; **A/B test variant tracking** **[V2]**; **scroll depth tracking** **[V2]**

- FRS-SPW-608: Error Handling - Custom 404 (with search + popular links + signup CTA); custom 500 (retry + contact); cached fallback; form retry

- FRS-SPW-609: Rate Limiting & Bot Protection - Form rate limiting; CAPTCHA; bot protection; DDoS via CDN/WAF

- FRS-SPW-610: Platform Branding - Platform identity: logo, colors (primary gradient: deep blue → purple), fonts (Inter for UI, serif accent for editorial), favicon, **animated logo on hover** **[V2]**; dark mode default for hero + marketing, light mode for reading content

- FRS-SPW-611: Navigation & Information Architecture - Primary nav: Home, Features (mega menu), Pricing, Blog, Help Centre, Contact, **[Enterprise Signup]** **[V2]** (primary CTA button), **[Standalone]** **[V2]** (secondary link); sticky header (glassmorphism on scroll); mobile hamburger; footer: all nav + legal + social + newsletter + language; breadcrumbs on blog + help

- FRS-SPW-612: Social Media Integration - Profile links in footer; social sharing on blog; OG/Twitter Card meta all pages; **Instagram feed embed on homepage (optional)** **[V2]**

- FRS-SPW-613: Legal Pages - Terms, Privacy Policy, Cookie Policy, AUP, SLA/Uptime, DPA; last-updated date; printable; **GDPR data subject request form** **[V2]**

- FRS-SPW-614: Status Page Link - Link to status page; footer status indicator (operational/degraded/down); **animated pulse for "All Systems Operational"** **[V2]**

- FRS-SPW-615: Downloads Page - POS desktop (Windows/Linux), mobile apps (App Store/Play), hardware guides; version + release notes; **type-tagged downloads: "Enterprise (requires cloud)" vs "Works with all setups"** **[V2]**; direct download links

- FRS-SPW-616: Dark Mode - **Default dark for hero/marketing sections** **[V2]**; light for reading (blog, help); toggle available; system preference respected; smooth transition; **both modes equally polished — not an afterthought** **[V2]**

---

## FRS-SPW-7xx: Design System & Visual Identity [NEW V2]
**BRD**: Implicit | **Design Reference**: World-class SaaS sites (Stripe, Linear, Vercel, Notion)

> This section defines the visual language, component library, and interaction patterns that make the SPW a world-class marketing site. These are NOT just technical requirements — they are design mandates that drive perception of platform quality.

### Layout & Structure

- FRS-SPW-701: Grid System - 12-column grid; max-width 1280px (content), full-bleed for hero/marketing sections; 4px baseline grid; generous section spacing (120px desktop, 80px mobile between major sections)

- FRS-SPW-702: Section Rhythm - Alternating section backgrounds: dark (gradient mesh) → light → dark; creates visual rhythm and breaks up long pages; each section self-contained with its own CTA

- FRS-SPW-703: Card Design Language - Glassmorphism cards: semi-transparent backdrop-blur, subtle border, inner shadow; hover: lift + glow + border brightening; consistent 16px border-radius; padding 24-32px

### Typography

- FRS-SPW-704: Font System - Primary: Inter (body, UI); Headlines: Inter with tight tracking (-0.02em) and bold weight; Editorial accent: serif font (Merriweather or Source Serif) for testimonial quotes and case study pull-quotes; Monospace: JetBrains Mono for pricing numbers and technical specs; font-display: swap

- FRS-SPW-705: Type Scale - Hero headline: 80-96px (desktop), 48-56px (mobile); Section headline: 48-56px; Sub-headline: 32-40px; Body: 18px; Small: 14px; all with comfortable line-height (1.2 headlines, 1.6 body)

- FRS-SPW-706: Gradient Text - Hero headlines and key CTAs use gradient text (linear-gradient on -webkit-background-clip: text); brand gradient: blue (#3B82F6) → purple (#8B5CF6); used sparingly for maximum impact

### Color & Theming

- FRS-SPW-707: Color Palette - Primary: Blue-600 (#2563EB); Secondary: Purple-500 (#8B5CF6); Accent: Cyan-400 (#22D3EE); Success: Emerald-500; Warning: Amber-500; Error: Rose-500; neutral grays for text/backgrounds; AA contrast in both dark and light modes

- FRS-SPW-708: Dark Mode Palette - Background: Slate-950 (#020617) → Slate-900 gradient; cards: Slate-800/50 with backdrop-blur; text: Slate-100 (primary), Slate-400 (secondary); borders: Slate-700/50; glow effects use primary blue/purple

- FRS-SPW-709: Light Mode Palette - Background: White → Slate-50; cards: White with subtle shadow; text: Slate-900 (primary), Slate-500 (secondary); borders: Slate-200; clean and bright

### Animation & Motion

- FRS-SPW-710: Scroll Animations (GSAP + Framer Motion) - Sections fade-up + slide-in on scroll-into-view; staggered child animations (cards appear one-by-one, 100ms delay each); parallax on hero background; counter animations (numbers count up on view); smooth and purposeful — never jarring

- FRS-SPW-711: Hover Micro-Interactions - Cards: subtle lift (translateY -4px) + shadow expansion + border glow; Buttons: background shift + scale (1.02) + glow; Links: underline slide-in from left; Images: subtle zoom (scale 1.05); Navigation items: bottom border slide-in

- FRS-SPW-712: Page Transitions - Route transitions: crossfade + slide (Framer Motion layout animations); content loading: skeleton shimmer → fade-in; form steps: horizontal slide with spring physics

- FRS-SPW-713: 3D Hero Element - Homepage hero: 3D POS terminal model (Spline or Three.js); subtle float animation + mouse-parallax (terminal tilts toward cursor); loads after initial paint (non-blocking); fallback: high-quality 2D illustration for low-power devices; reduced motion: static image

### Conversion Elements

- FRS-SPW-714: Sticky CTA Bar - After scrolling past hero: sticky bottom bar (mobile) or floating sidebar CTA (desktop) with "Start Free Trial" / "Get Started"; dismissible; re-appears on scroll-up; glassmorphism style

- FRS-SPW-715: Exit Intent Capture - On desktop mouse-toward-close: modal with "Wait! Get 20% off your first year" (or relevant offer); email capture; one-time per session; not shown to returning visitors who dismissed

- FRS-SPW-716: Social Proof Nudge - Floating toast notification (bottom-left): "A restaurant in [City] just signed up" (anonymized); shows periodically (every 60s); real data from SaaS API or mock; dismissible; builds FOMO

- FRS-SPW-717: Trust Section - "Trusted by businesses worldwide" section: security certifications (SOC 2, PCI DSS compliant, GDPR ready), uptime guarantee badge, money-back guarantee, "No credit card required for trial"; displayed on pricing page and signup flow

### Iconography & Imagery

- FRS-SPW-718: Icon System - Lucide icons (consistent with WEB-REST/WEB-RETAIL); 24px standard; stroke-width 1.5; monochrome in body, colored/gradient in features; animated variants for key interactions

- FRS-SPW-719: Product Screenshots - High-quality screenshots with perspective tilt; shadow underneath; browser/device chrome mockup (desktop in Safari frame, mobile in iPhone frame); interactive (hover to enlarge); dark UI screenshots on dark sections, light on light

- FRS-SPW-720: Illustration Style - Custom illustrations for concepts (cloud sync, offline mode, multi-location); consistent style: line art with gradient fills; animated SVG (subtle motion); used for feature pages and empty states

---

## Appendix A: FRS Summary

| Metric | V1 Count | V2 Count | Delta |
|--------|----------|----------|-------|
| Total FRS Requirements | 55 | 88 | +33 |
| 1xx (Marketing Pages) | 9 | 15 | +6 |
| 2xx (Signup) | 9 | 10 | +1 |
| 3xx (Contact) | 6 | 7 | +1 |
| 4xx (Blog) | 8 | 9 | +1 |
| 5xx (Help Centre) | 9 | 11 | +2 |
| 6xx (Design/SEO/Ops) | 16 | 16 | — (all updated) |
| 7xx (Design System) [V2] | — | 20 | NEW |

## Appendix B: Design Benchmarks

| Element | V1 Target | V2 Target |
|---------|-----------|-----------|
| LCP | <3.0s | **<1.5s** |
| FID | <100ms | **<50ms** |
| CLS | <0.1 | **<0.05** |
| Lighthouse | >90 | **>95** |
| WCAG | 2.1 AA | 2.1 AA |

## Appendix C: Competitive Design Benchmarks

| Reference Site | What to Emulate |
|---------------|----------------|
| Stripe.com | Dark hero, gradient text, 3D elements, typography, section rhythm |
| Linear.app | Motion design, glassmorphism, product screenshots, minimal aesthetic |
| Vercel.com | Performance obsession, dark mode, developer-focused clarity |
| Shopify.com/pos | POS-specific messaging, merchant-centric language, pricing clarity |
| Toast.restaurant | Restaurant vertical focus, ROI calculator, social proof |
| Square.com | Clean simplicity, trustworthiness, dual business type support |

## Appendix D: V1 → V2 Change Log

| FRS ID | Change | Description |
|--------|--------|-------------|
| FRS-SPW-101 | EXPANDED | 3D hero, merchant type explainer, enhanced social proof, gradient design |
| FRS-SPW-102 | EXPANDED | Interactive mini-demo, Standalone feature page |
| FRS-SPW-103 | MAJOR UPDATE | Tabbed pricing: Enterprise plans + Standalone token tiers |
| FRS-SPW-104 | EXPANDED | Video testimonials |
| FRS-SPW-109 | EXPANDED | Animated gradient announcement bar |
| FRS-SPW-110–115 | NEW | ROI calculator, product tour, solution finder, type explainer, metrics bar, changelog |
| FRS-SPW-201 | MAJOR UPDATE | Bifurcated signup: Enterprise vs Standalone paths |
| FRS-SPW-203 | UPDATED | BusinessType field added; animated form design |
| FRS-SPW-206 | UPDATED | Type-specific confirmation; confetti |
| FRS-SPW-210 | NEW | Standalone information page |
| FRS-SPW-301 | UPDATED | Standalone token inquiry type |
| FRS-SPW-307 | NEW | Callback request quick form |
| FRS-SPW-401–402 | EXPANDED | Featured post hero, embedded product CTAs, sticky TOC |
| FRS-SPW-409 | NEW | Content hub / resource library |
| FRS-SPW-501 | UPDATED | Type-specific help sections |
| FRS-SPW-504 | UPDATED | Type-specific FAQ sections |
| FRS-SPW-505 | UPDATED | Standalone + Enterprise getting started guides |
| FRS-SPW-510–511 | NEW | Community forum link, API docs link |
| FRS-SPW-605 | UPDATED | Stricter performance targets (LCP <1.5s, Lighthouse >95) |
| FRS-SPW-611 | UPDATED | Dual CTA navigation (Enterprise + Standalone) |
| FRS-SPW-615 | UPDATED | Type-tagged downloads |
| FRS-SPW-7xx | NEW | 20 design system requirements: grid, typography, color, animation, conversion, imagery |

---

**END OF FRS V2 DOCUMENT**

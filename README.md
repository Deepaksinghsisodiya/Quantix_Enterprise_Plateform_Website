# Quantix POS Website - UI Content & Data Dictionary

This document is a comprehensive, word-for-word reference of all user-facing data, texts, pricing structures, features, statistics, forms, and mockups shown across the public pages of the **Quantix POS Website** UI.

---

## Table of Contents
1. [Home Page (`/`)](#1-home-page-)
2. [Features Page (`/features`)](#2-features-page-features)
3. [Services & Industries Pages (`/services` & `/industries`)](#3-services--industries-pages-services--industries)
4. [Pricing Page (`/pricing`)](#4-pricing-page-pricing)
5. [Resources Page (`/resources`)](#5-resources-page-resources)
6. [Testimonials Page (`/testimonials`)](#6-testimonials-page-testimonials)
7. [FAQ Page (`/faq`)](#7-faq-page-faq)
8. [Contact Sales Page (`/contact`)](#8-contact-sales-page-contact)
9. [Sign-In Page (`/sign-in`)](#9-sign-in-page-sign-in)
10. [Sign-Up Page (`/sign-up`)](#10-sign-up-page-sign-up)
11. [Common Components (Navbar, Footer, banners)](#11-common-components-navbar-footer--banners)

---

## 1. Home Page (`/`)

Aggregates previews of specialized sections that are detailed on specific subpages.

### A. Hero Section (Carousel Slides)
Displays four business use cases with distinct imagery and CTAs:

#### Slide 1: Retail POS
*   **Badge:** `RETAIL POS`
*   **Heading:** "SMARTER RETAIL STARTS HERE"
*   **Subtext:** "Sync inventory, manage staff, and delight customers across every location."
*   **Primary CTA Button:** "Start Free Trial" (links to `/sign-up`)
*   **Secondary CTA Button:** "Explore Retail" (links to `#industries`)
*   **Background Image:** `/images/hero-retail.jpg`

#### Slide 2: Restaurant POS
*   **Badge:** `RESTAURANT POS`
*   **Heading:** "THE ALL-IN-ONE POS FOR RESTAURANTS"
*   **Subtext:** "Manage tables, orders, and kitchen flow in real time — all from one device."
*   **Primary CTA Button:** "Start Free Trial" (links to `/sign-up`)
*   **Secondary CTA Button:** "Explore Restaurant" (links to `#industries`)
*   **Background Image:** `/images/hero-restaurant.jpg`

#### Slide 3: Cloud POS
*   **Badge:** `CLOUD POS`
*   **Heading:** "RUN YOUR BUSINESS FROM THE CLOUD"
*   **Subtext:** "Access real-time sales data, inventory levels, and analytics from anywhere in the world on any device."
*   **Primary CTA Button:** "Start Free Trial" (links to `/sign-up`)
*   **Secondary CTA Button:** "See Pricing" (links to `/pricing`)
*   **Background Image:** `/images/hero-cafe.jpg`

#### Slide 4: Local Billing POS
*   **Badge:** `LOCAL BILLING POS`
*   **Heading:** "OFFLINE-FIRST LOCAL BILLING TERMINAL"
*   **Subtext:** "Keep selling even when the internet goes down. Seamless local billing with automatic cloud sync when reconnected."
*   **Primary CTA Button:** "Start Free Trial" (links to `/sign-up`)
*   **Secondary CTA Button:** "See Offline Mode" (links to `#features`)
*   **Background Image:** `/images/hero-local.png`

---

### B. Platform Demo Section
A high-fidelity dashboard preview showing different operational workflows:

*   **Header Section:**
    *   **Badge:** `PLATFORM DEMO`
    *   **Heading:** "KEEP THINGS FLOWING WITH THE ALL-IN-ONE POS"
    *   **Subtext:** "Transform your business with Quantix's integrated software — designed to streamline operations, enhance customer experiences, and boost profitability through real-time insights."
    *   **Action Link:** "Explore Features →" (links to `#features`)
*   **4 Mockup Grid Cards:**
    1.  **Analytics:**
        *   *Label:* `Weekly Revenue`
        *   *Value:* `$24,812`
        *   *Indicator:* `↑ 18.4% this week`
        *   *Meta:* `Updated 1m ago`
        *   *Title:* "See top-performing items"
        *   *Caption:* "Live revenue analytics, product rankings, and peak hour detection."
    2.  **Staff:**
        *   *Clocked-in Active Profile:* "Maria K. - Clocked in at 9:15 AM"
        *   *Active Staff Grid:* "James", "Sofia", "Raj", "Ana"
        *   *Title:* "Manage staff & scheduling"
        *   *Caption:* "Clock-ins, shift scheduling, payroll reports and labor cost tracking."
    3.  **Orders:**
        *   *Order Ticket:* `Order #568` (with Green active dot indicator)
        *   *Items List:*
            *   🍔 Classic Burger — `$12.99`
            *   🍔 Truffle Fries — `$6.50`
            *   🍔 Choc. Shake — `$5.25`
        *   *Card Button:* "SEND TO KITCHEN"
        *   *Title:* "Keep all orders in one place"
        *   *Caption:* "Real-time order management with instant kitchen display sync."
    4.  **Loyalty:**
        *   *Profile:* "Sarah Mitchell" (Member since 2022)
        *   *Points Balance:* `3,412`
        *   *Progress Bar:* `68% to next reward`
        *   *Badge:* `Gold Tier`
        *   *Buttons:* "History", "Redeem"
        *   *Title:* "Turn guests into regulars"
        *   *Caption:* "Built-in loyalty program with tiers, points, and targeted promotions."

---

### C. Features Preview Grid
Nine core value pillars of the Quantix ecosystem:

*   **Badge:** `EVERYTHING INCLUDED`
*   **Heading:** "Every tool your business needs"
*   **Subtext:** "From counter to cloud — Quantix handles every part of your operation."
*   **9 Grid Items:**
    1.  **Real-Time Analytics:** Live dashboards showing sales trends, peak hours, best‑sellers, and revenue — all in one view.
    2.  **Smart Inventory:** Automatic stock tracking with low‑stock alerts and one‑click purchase orders to suppliers.
    3.  **Omni Payments:** Accept cash, card, contactless, QR codes, and split bills — all settled in seconds.
    4.  **Customer Loyalty:** Built‑in CRM with loyalty points, purchase history, and targeted promotions.
    5.  **Multi‑Location:** Manage all your branches from one dashboard. Sync menus, pricing, and reports centrally.
    6.  **Bank‑Grade Security:** PCI DSS compliant, end‑to‑end encryption, and role‑based access controls out of the box.
    7.  **24/7 Support:** Live chat, phone, and email support whenever you need it. Real humans, fast responses.
    8.  **Offline Mode:** Keep selling even without internet. Quantix syncs all transactions automatically when back online.
    9.  **Always Up‑to‑Date:** Automatic silent updates. No downtime, no manual installs, zero disruption.

---

### D. How It Works Section
Three easy onboarding steps:

*   **Badge:** `HOW IT WORKS`
*   **Heading:** "Up and running in minutes"
*   **Subtext:** "No technical expertise needed. We handle the setup so you can focus on your business."
*   **3 Steps:**
    1.  `1` **Create your account:** Sign up in 2 minutes. Choose your industry — retail or restaurant. No credit card needed for your free trial.
    2.  `2` **Configure your store:** Add products, menu items, pricing, tax rates, and payment methods. Import existing data via CSV or API.
    3.  `3` **Go live and grow:** Start accepting payments immediately. Real-time analytics help you make smarter decisions from day one.

---

### E. Industry Highlight Segment
Interactive toggles switching between specialized modes:

*   **Badge:** `INDUSTRIES`
*   **Heading:** "Tailored for your industry"
*   **Subtext:** "One platform, two specialized modes — retail or restaurant, always the right fit."
*   **Toggle Options:** `Retail` (Store icon) and `Restaurant` (Utensils icon)
*   **Retail Store Mode:**
    *   *Badge:* `RETAIL`
    *   *Title:* "Built for modern retail stores"
    *   *Description:* "From boutiques to multi-branch chains — Quantix handles your entire retail workflow. Track inventory across warehouses, manage staff shifts, and deliver a seamless checkout experience."
    *   *Features checklist:*
        *   Barcode & QR scanner support
        *   Customer loyalty & gift cards
        *   Purchase order management
        *   Supplier management
        *   Multi-warehouse inventory sync
        *   Discount & coupon engine
        *   Staff performance reports
        *   Returns & exchange handling
    *   *CTA Button:* "Get Started →"
    *   *Graphic background:* `/images/hero-retail.jpg`
    *   *Floating stat card:* Avg. result: `+34% avg. revenue growth`
*   **Restaurant / Cafe Mode:**
    *   *Badge:* `RESTAURANT`
    *   *Title:* "Made for fast-paced restaurants"
    *   *Description:* "Table management, kitchen display systems, online ordering integration — Quantix keeps your restaurant running smoothly during the busiest hours with zero bottlenecks."
    *   *Features checklist:*
        *   Table & floor plan management
        *   Online ordering integration
        *   Recipe costing & food cost tracking
        *   Modifier & combo builder
        *   Kitchen Display System (KDS)
        *   Split bill & bill-by-seat
        *   Reservation & waitlist management
        *   Delivery partner sync
    *   *CTA Button:* "Get Started →"
    *   *Graphic background:* `/images/hero-restaurant.jpg`
    *   *Floating stat card:* Avg. result: `+40% faster kitchen output`

---

### F. Customer Testimonials Ticker
Infinite marquee carousel displaying customer success reviews (also rendered on `/testimonials` page):

*   **Sarah Mitchell** (Initials: `SM`, Avatar Color: `bg-purple-600`)
    *   *Role/Business:* Owner, Bella Boutique
    *   *Industry:* `Retail`
    *   *Quote:* *"Quantix transformed how we manage our 3 stores. Inventory sync alone saves us 4 hours a week. The analytics helped us cut slow-moving stock by 30% in two months."*
*   **James Chen** (Initials: `JC`, Avatar Color: `bg-blue-600`)
    *   *Role/Business:* GM, The Harbor Kitchen
    *   *Industry:* `Restaurant`
    *   *Quote:* *"Table management and the KDS integration made our kitchen 40% faster during dinner rush. Our servers love the split-bill feature. Best POS we have ever used, period."*
*   **Priya Sharma** (Initials: `PS`, Avatar Color: `bg-emerald-600`)
    *   *Role/Business:* Founder, FreshMart Chain
    *   *Industry:* `Retail`
    *   *Quote:* *"We expanded from 2 to 8 locations in a year. Quantix scaled with us effortlessly. The multi-location dashboard is a game-changer for our regional managers."*
*   **Marcus Webb** (Initials: `MW`, Avatar Color: `bg-amber-600`)
    *   *Role/Business:* Director, Urban Eats Group
    *   *Industry:* `Restaurant`
    *   *Quote:* *"Online ordering integration boosted our off-peak revenue by 22%. Reporting is granular enough for finance and simple enough for our floor managers."*

---

## 2. Features Page (`/features`)

Dedicated showcase page containing:
*   **Badge:** `EVERYTHING INCLUDED`
*   **Heading:** "Every tool your business needs"
*   **Subheading:** "From counter to cloud — Quantix handles every part of your operation."
*   **Grid Content:** Displays all 9 primary features (detailed in [Features Preview Grid](#c-features-preview-grid)).

---

## 3. Services & Industries Pages (`/services` & `/industries`)

These pages focus on industry-specific operations:
*   **Badge:** `INDUSTRIES`
*   **Heading:** "Tailored for your industry"
*   **Subheading:** "One platform, two specialized modes — retail or restaurant, always the right fit."
*   **Content:** Contains the interactive toggle system displaying checklists, stat badges, and graphics for both **Retail** and **Restaurant** (detailed in [Industry Highlight Segment](#e-industry-highlight-segment)).

---

## 4. Pricing Page (`/pricing`)

Contains subscription plans, billing toggle, and customization banner.

*   **Header Section:**
    *   **Badge:** `PRICING`
    *   **Heading:** "Simple, transparent pricing"
    *   **Subtext:** "Start free. Scale as you grow. No hidden fees, ever."
*   **Billing Switch Options:**
    *   `Monthly` (standard rates listed below).
    *   `Annual` (displays calculated annual price, offering a **16% discount** on monthly rates).

### Plan Specifications

1.  **Free Trial Plan:**
    *   *Price (Monthly):* `$0`
    *   *Suffix:* `3 days, no card`
    *   *Description:* "Full access to all features. No credit card required."
    *   *Features checklist:* Full platform access, 1 location, 2 staff accounts, 100 transactions, Basic analytics, Email support.
    *   *CTA Button:* "Start Free Trial"
2.  **Starter Plan:**
    *   *Price (Monthly):* `$50/month` (or `$504/year` on Annual)
    *   *Description:* "Perfect for small retailers and single-location restaurants."
    *   *Features checklist:* Everything in Free Trial, 1 location, 5 staff accounts, Unlimited transactions, Inventory management, Loyalty program, Standard reports, Email & chat support.
    *   *CTA Button:* "Get Started"
3.  **Professional Plan** *(Most Popular):*
    *   *Price (Monthly):* `$100/month` (or `$1008/year` on Annual)
    *   *Badge:* `Most Popular` (floating top center)
    *   *Description:* "For growing businesses with multiple staff and advanced needs."
    *   *Features checklist:* Everything in Starter, Up to 3 locations, Unlimited staff, Advanced analytics & BI, Kitchen Display System, Online ordering sync, API access, Tailored receipt branding, Priority 24/7 support.
    *   *CTA Button:* "Get Started"
4.  **Enterprise Plan:**
    *   *Price:* Custom (Tailored pricing structures)
    *   *Description:* "For large chains, franchises, and businesses with unique needs."
    *   *Features checklist:* Everything in Professional, Unlimited locations, Dedicated account manager, Enterprise integrations, White-label options, SLA guarantee, On-site training, Tailored contracts & billing.
    *   *CTA Button:* "Get Started"

---

## 6. Testimonials Page (`/testimonials`)

A comprehensive compilation page containing:
*   **Badge:** `TESTIMONIALS`
*   **Heading:** "Businesses love Quantix"
*   **Subheading:** "Real results from real businesses across retail and restaurants."
*   **Content:** Contains full-width review cards detailing quotes, star ratings, and roles of Sarah Mitchell, James Chen, Priya Sharma, and Marcus Webb (detailed in [Customer Testimonials Ticker](#f-customer-testimonials-ticker)).

---

## 7. FAQ Page (`/faq`)

*   **Header Section:**
    *   **Badge:** `FAQ`
    *   **Heading:** "Frequently asked questions"
    *   **Help Subtext:** "Can't find what you're looking for? Contact our team." (Links to `/contact`)
*   **FAQ Content Items:**
    1.  **Do I need a credit card for the free trial?**
        *   *Answer:* No credit card required. Sign up and get full platform access for 3 days completely free.
    2.  **What hardware does Quantix support?**
        *   *Answer:* Quantix works on iPad, Android tablets, and any web browser. We support receipt printers, barcode scanners, cash drawers, and card readers via integrations.
    3.  **Can I switch plans or cancel anytime?**
        *   *Answer:* Yes. You can upgrade, downgrade, or cancel your plan at any time from your account settings with no cancellation fees.
    4.  **How does multi-location support work?**
        *   *Answer:* Manage all your branches from a single dashboard. Each location has its own inventory, staff, and reports but you can view consolidated data across all locations.
    5.  **Is my data secure and backed up?**
        *   *Answer:* Quantix is PCI DSS compliant with end-to‑end encryption, SOC 2 Type II certification, and automatic daily backups with 99.9% uptime SLA.
    6.  **Do you offer onboarding support?**
        *   *Answer:* Yes. All plans include free onboarding support. Professional and Enterprise plans include a dedicated onboarding specialist and priority support.

---

## 8. Contact Sales Page (`/contact`)

Custom request form for enterprise queries and custom plans.

*   **Header Section:**
    *   **Badge:** `CONTACT SALES`
    *   **Heading:** "Need a Custom Plan?"
    *   **Subheading:** "Tell us about your requirements and our team will build a tailored solution — usually within 1 business day."
*   **Card Title:** "Get in touch with our team"
*   **Form Fields:**
    1.  **Full Name:** Input field (`FULL NAME`) -> Placeholder: `Jane Smith` (Required, min 2 characters).
    2.  **Work Email:** Input field (`WORK EMAIL`) -> Placeholder: `jane@company.com` (Required, valid email format).
    3.  **Message:** Text area (`HOW CAN WE HELP?`) -> Placeholder: `Tell us about your business needs...` (Required, min 20 / max 1000 characters).
*   **Action Row:**
    *   `Cancel` (resets form and redirects back).
    *   `Send Message` (submits form).
*   **Footer Note:** "Your request is secure & confidential. We respond within 24 hours."

---

## 9. Sign-In Page (`/sign-in`)

*   **Heading:** "Sign in to your account"
*   **Subheading:** "Or start your 3-day free trial" (Links to `/sign-up`)
*   **Form Fields:**
    1.  **Work Email Address:** Input field -> Placeholder: `name@company.com` (Required).
    2.  **Password:** Password field -> Placeholder: `••••••••` (Required).
*   **Additional Actions:**
    *   "Forgot password?" link.
    *   "Remember my session" checkbox.
    *   "Sign In to Dashboard →" submit button.

---

## 10. Sign-Up Page (`/sign-up`)

*   **Heading:** "Start your 3-day free trial"
*   **Subheading:** "No credit card required. Already have an account? Sign in" (Links to `/sign-in`)
*   **Form Fields:**
    1.  **Full Name:** Input field -> Placeholder: `Jane Smith` (Required).
    2.  **Work Email Address:** Input field -> Placeholder: `jane@company.com` (Required).
    3.  **Company Name:** Input field -> Placeholder: `Acme Corp` (Required).
    4.  **Business Type Dropdown:** Selectable options (Required):
        *   *Select industry...* (Default option)
        *   *Retail Store*
        *   *Restaurant / Cafe*
        *   *Grocery / Supermarket*
        *   *Other Business*
    5.  **Password:** Password input -> Placeholder: `Min. 8 characters` (Required, min 8 characters).
*   **Action Button:** "Create Free Account →"

---

## 11. Common Components (Navbar, Footer, & Banners)

### A. Navigation Bar (Navbar)
*   **Logo/Branding:** Icon SVG + "Quantix" text (links to home page `/`).
*   **Main Navigation Links:**
    *   `FEATURES` (links to `/features`)
    *   `RESOURCES` (links to `/resources`)
    *   `SERVICES` (links to `/services`)
    *   `PRICING` (links to `/pricing`)
    *   `CONTACT SALES` (links to `/contact`)
*   **Right Side Links:**
    *   `Sign In` (links to `/sign-in`)
    *   `Start Free Trial` button (links to `/sign-up`)

---

### B. Rotating Testimonial Banner
Full-width dark section situated on the homepage.
*   **Background graphic:** `/images/hero-restaurant.jpg`
*   **Quote text:** `"QUANTIX FEELS LIKE OUR THIRD ARM — IT LET US FOCUS ON HOSPITALITY, NOT PAPERWORK."`
*   **Author:** `James Chen`
*   **Role:** `GM, The Harbor Kitchen • Table 87`
*   **Avatar Initials:** `JC` (Avatar bg: `bg-blue-600`)

---

### C. General Call To Action (CTA) Banner
Full-width CTA block situated at the bottom of the home page.
*   **Heading:** "Ready to modernize your business?"
*   **Subtext:** "Join 2,000+ businesses already using Quantix. Start your 3-day free trial — no credit card needed."
*   **Buttons:**
    *   "Start Free Trial" (links to `/sign-up`)
    *   "Talk to Sales" (links to `/contact`)

---

### D. Custom Plan Customization Banner
Bottom section of the pricing page.
*   **Heading:** "Need a Custom Plan?"
*   **Subheading:** "Talk to our sales team and get a tailored solution for your business."
*   **CTAs:** "Contact Sales" (links to `/contact`), "Schedule a Demo" (links to `#resources`).

---

### E. Page Footer (Footer)
*   **Description:** "The modern POS platform for retail and restaurant businesses. Simple, powerful, and built to scale."
*   **Footer Links Categorization:**
    *   **Product:** Features, Pricing, Changelog, Roadmap, API Docs
    *   **Company:** About Us, Careers, Blog, Press Kit, Contact
    *   **Industries:** Retail POS, Restaurant POS, Grocery, Cafes & Bars, Food Trucks
    *   **Legal:** Privacy Policy, Terms of Service, Cookie Policy, GDPR, PCI Compliance
*   **Socials:** Twitter/X (`x`), LinkedIn (`in`), GitHub (`gh`)
*   **Compliance Text:** "PCI DSS Compliant · SOC 2 Type II · GDPR Ready"
*   **Copyright Text:** "© 2025 Quantix, Inc. All rights reserved."

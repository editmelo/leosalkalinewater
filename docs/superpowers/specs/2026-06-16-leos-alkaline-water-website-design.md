# Leo's Alkaline Water — Website Design Spec

**Date:** 2026-06-16
**Prepared by:** Edit Me Lo (Lauren) for Leo's Alkaline Water (Leonardo Colon)
**Sponsor:** Indiana Urban League

---

## 1. Overview

A modern, custom-coded marketing + e-commerce website for **Leo's Alkaline Water**, an
Indianapolis-based business that delivers 5-gallon jugs of alkaline water on a subscription
or one-off basis. The site must make ordering effortless for customers (whom Leo calls the
**"Water Fam"**), tell the brand story, and reflect a premium, community-rooted identity.

The build is the **website only** — the customer self-service portal and live payment
processing are explicitly out of scope for this phase but the architecture must leave room
for both.

### Goals
- Let customers **purchase from both the homepage and the Store page**.
- Capture the full subscription/one-off ordering flow exactly as Leo operates it.
- Block checkout for customers outside the Indianapolis service area and capture their email.
- Communicate brand, benefits, certifications, and the Indiana Urban League partnership.
- Be fast, fully owned by Leo, and extensible toward the future portal + ionizer sales.

### Non-goals (this phase)
- **Customer self-service portal** (skip/pause/change subscription, update card, change address).
- **Live payment processing** — the checkout ends at a clearly-marked Square placeholder.
- **Ionizer / Water Machine sales** — left out of the UI for now; architecture stays ready.

---

## 2. Tech & Architecture

- **Framework:** Next.js (App Router) + TypeScript.
- **Styling:** Tailwind CSS with brand design tokens (colors, fonts, spacing).
- **Animation:** Lightweight CSS / minimal JS for "flow like water" motion (animated wave
  dividers, rising bubbles, gradient blends, video bleed). All motion must respect
  `prefers-reduced-motion` and degrade to static.
- **State:** Client-side cart/order state via React Context (+ `localStorage` persistence).
  No database required this phase.
- **Forms & APIs:** Next.js Route Handlers for contact, "notify me" (out-of-area), and the
  order handoff. For now these validate input and return success; they are structured to
  connect to a real email provider (e.g. Resend) and the Square API later. Contact and
  notify-me submissions are destined for **leo@leosalkalinewater.com** (configurable).
- **Deployment:** Vercel.
- **Content/config:** Products, pricing, service-area ZIPs, and site copy live in typed
  config/data files so non-developers can edit values without touching components.

### Component boundaries (each independently understandable/testable)
- **Brand/UI primitives:** Button, Section, WaveDivider, Bubbles, Container, Card, Field.
- **Layout:** Header/Nav (with cart), Footer, AnnouncementBar.
- **Ordering domain:** `QuickOrder` (homepage hero), `OrderBuilder` (Store), `CartProvider`,
  `ServiceAreaCheck`, `StarterPackageAddon`, `OrderSummary`, `CheckoutPlaceholder`.
- **Forms:** `ContactForm`, `NotifyMeForm`.
- **Content sections:** Hero, TrustStrip, Benefits, HowItWorks, ShopPreview, WaterFam,
  PartnerBlock (Indiana Urban League), ServiceAreaBanner, FounderTeaser, FinalCTA.

---

## 3. Pages

### Home
Flowing, animated, single-scroll experience in scroll order:
1. **Announcement bar** — "Now serving the Indianapolis area · Join the Water Fam".
2. **Hero** — background video (from `Leo_s 2026 Rough Edits/Leo Hero Media.mp4`, compressed
   for web), headline **"Hydrating You Is What We Do."**, tagline *"Water for the People."*,
   subcopy, CTAs (Order Delivery / Shop Water), and a **Quick Order** widget (jugs +
   frequency → Build my order) so visitors can purchase without leaving home.
3. **Trust strip** — pH 8.5–9.5 · Kangen-powered · Refillable 5-gal · Indianapolis local ·
   Est. 2019 · MBE Certified.
4. **Benefits ("Choose us for your…")** — Deep Cellular Hydration, Alkaline pH 8.5–9.5,
   Immune Health, Sustainability, Local & Community Support (postcard copy).
5. **How delivery works** — Pick your jugs → Choose frequency → We deliver, you hydrate.
6. **Shop preview** — buyable: 5-Gal Jug Subscription, One-Time Jugs, Starter Package.
7. **Water Fam** — community story + testimonials placeholder + *"We heal the Water, you
   heal yourself."*
8. **Proud Supporting Partner — Indiana Urban League** — logo + supporting statement.
9. **Service area** — "Currently serving the Indianapolis area" + notify-me capture.
10. **Meet Leo** — founder teaser → links to About.
11. **Final CTA band** → footer.

### About
- Leo's story: Founder & Water Steward, **est. 2019**; the "living water" origin story
  (drawn from the postcard copy) and mission ("make Water health clear and accessible").
- **Certifications** (with logos):
  - **Minority Business Enterprise** — Certified with the City of Indianapolis (Office of
    Minority & Women Business Development).
  - **Water Quality Association Gold Standard** — upholding Enagic's Gold Standard, powered
    with trusted **Kangen Water™** technology.
- Tagline: *"We heal the Water, you heal yourself."*
- **Indiana Urban League** proud-supporting-partner block.

### Store
Product list + the full **ordering flow** (see §4). Products:
- **5-Gallon Alkaline Water Jug — Subscription** ($15/jug; qty 2/4/6/8/10/custom;
  weekly/biweekly/monthly; residential/business).
- **5-Gallon Alkaline Water Jug — One-Time** ($15/jug; no commitment).
- **Starter Package** — hand dispenser + refundable $15 jug deposit (optional add-on).

### Contact
- **Contact form** routing to **leo@leosalkalinewater.com** (configurable).
- Displayed phone: **317-985-0966**.
- Social links: Instagram, Facebook, Linktree.
- Service-area note.

### Privacy Policy & Terms & Conditions
Drafted from standard templates tailored to an Indianapolis water-delivery + subscription
business, clearly marked **"template — review with legal counsel before launch."**

---

## 4. Ordering Flow (core)

Available from the **homepage Quick Order** and the **Store**:

1. **Quantity** — 2 / 4 / 6 / 8 / 10 / custom (1–10+).
2. **Frequency** — Weekly / Biweekly / Monthly, or **One-Time**.
3. **Customer type** — Residential / Business.
4. **Service-area check** — ZIP entry validated against the allowlist (see §5).
5. **Starter Package** — optional add-on (dispenser + refundable $15 deposit).
6. **Cart / Order Summary** — line items, quantity × $15, deposit, add-ons, frequency.
7. **Checkout** — **Square payment placeholder**: a clearly-labeled step that assembles the
   complete order payload and is ready to hand off to Square Subscriptions/Payments once
   credentials are available. No real charge occurs in this phase.

Pricing constant: **$15 per 5-gallon jug, delivered.**

---

## 5. Service-Area Gating

- A **configurable ZIP allowlist** (typed data file) seeded with Indianapolis-metro ZIP codes.
- **In-area:** order proceeds normally.
- **Out-of-area:** checkout is **blocked** with a friendly message — *"We don't currently
  service your area yet."* — and a **"Notify me when you reach my area"** email capture.
- The list is easy to expand as Leo grows (single source of truth, documented).

---

## 6. Brand System

**Direction C — "Fresh & Natural"** (refined from the AI brand suite Leo found "a bit busy"):

| Token | Value | Usage |
|---|---|---|
| Main Blue | `#0F4C81` | Primary brand, headings on light, CTAs |
| Aqua Accent | `#4AB7D8` | Secondary accents, highlights, CTAs |
| Logo Green | `#2F5D3A` | Wellness/community accents, gradients |
| Premium Gold | `#C69A2D` | **Only** the WQA certification badge / rare premium touches |
| Background | `#F7F5F1` | Page background |
| Text | `#2B2B2B` | Body text |

**Typography:** Montserrat (headings), Source Sans 3 (body), Playfair Display *italic*
(taglines).

**Motion — "flow like water," level B (more water):** animated flowing wave section dividers,
rising bubbles, soft gradient blends between sections, and the hero video bleeding between
sections. Tasteful and performant; fully static under `prefers-reduced-motion`.

**Logo:** `Leo's Alkaline Water Brand Suite/leos alt logo.png` (chrome/water wordmark).

---

## 7. Assets & Content Sources

- **Logo:** `Leo's Alkaline Water Brand Suite/leos alt logo.png`
- **Hero video:** `Leo_s 2026 Rough Edits/Leo Hero Media.mp4` (compress for web; provide a
  poster image + static fallback).
- **Additional videos** available in `Leo_s 2026 Rough Edits/` for secondary sections.
- **Indiana Urban League logo:** `urban-league-logo.png`.
- **Benefit/About copy:** from `LAW Postcard with Orders.pdf` (benefits, Leo's bio, certs,
  taglines).
- **Certification badges:** MBE (City of Indianapolis) and WQA Gold Standard — recreate or
  source clean logo files; postcard has reference imagery.
- **Social:** Instagram `@leosalkalinewater`, Facebook, Linktree.

---

## 8. Open Items (placeholders — not blockers)

These ship as clearly-marked placeholders; values swap in later without structural change:

- **Starter Package / dispenser price** (deposit is $15 refundable; dispenser price TBD).
- **Real product photography** (using tasteful placeholders meanwhile).
- **Live Square API credentials** (checkout placeholder until provided).
- **Email delivery provider** wiring for contact / notify-me (routes to
  leo@leosalkalinewater.com once connected).
- **Certification badge** final logo files.
- **Privacy/Terms** legal review before launch.
- **Domain** (currently `leosalkalinewater.com` on Wix) — cutover handled at launch.

---

## 9. Confirmed Decisions Log

- Build: **custom-coded** (not Shopify), full ordering flow with **stubbed Square payment**.
- Brand: **Direction C**; motion **level B**.
- Ionizers/Water Machines: **left out** of UI this phase.
- Contact: **form → leo@leosalkalinewater.com**; phone **317-985-0966** (Leo's info, not
  the agency's).
- Starter Package: **optional add-on** at checkout.
- Service area: **Indianapolis metro**, configurable ZIP allowlist, out-of-area blocked +
  email capture.

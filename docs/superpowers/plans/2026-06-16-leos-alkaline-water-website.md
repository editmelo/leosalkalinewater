# Leo's Alkaline Water Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, custom-coded marketing + e-commerce website for Leo's Alkaline Water with a full subscription/one-off ordering flow, Indianapolis service-area gating, and a Square-ready (stubbed) checkout.

**Architecture:** Next.js (App Router) + TypeScript + Tailwind CSS. Pure domain logic (pricing, service-area, cart/order payload) is isolated in `src/lib` and unit-tested with Vitest. UI is composed from brand primitives + "flow like water" motion components (wave dividers, bubbles), all `prefers-reduced-motion` safe. Cart state lives in a client React Context persisted to `localStorage`. Forms and the order handoff are Next.js Route Handlers that validate and return success today, structured to connect to email (Resend) and the Square API later. No database this phase.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Vitest + Testing Library, Vercel.

**Visual source of truth:** The approved brainstorm mockups at
`.superpowers/brainstorm/34861-1781611864/content/flow-language.html` (motion/design language, "level B")
and `.../homepage-flow.html` (section order). The design spec is at
`docs/superpowers/specs/2026-06-16-leos-alkaline-water-website-design.md`.

**Brand tokens:** Blue `#0F4C81`, Aqua `#4AB7D8`, Green `#2F5D3A`, Deep navy `#0c2e4f`, Gold `#C69A2D` (cert badge only), Background `#F7F5F1`, Text `#2B2B2B`. Fonts: Montserrat (headings), Source Sans 3 (body), Playfair Display italic (taglines). Pricing: **$15 / 5-gal jug**. Contact: **leo@leosalkalinewater.com**, **317-985-0966**.

---

## Phase 0 — Project Setup

### Task 1: Scaffold the Next.js app + tooling

**Files:**
- Create: project root files via `create-next-app`
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Scaffold Next.js into the current directory**

Run:
```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-npm
```
If prompted that the directory is not empty, choose to proceed (our only existing files are asset folders + `docs/` + `.superpowers/`). Expected: a Next.js app with `src/app/`, `tailwind.config`/`globals.css`, `tsconfig.json`.

- [ ] **Step 2: Initialize git and add ignores**

Run:
```bash
git init
printf "\n# brainstorm scratch\n.superpowers/\n# source media (kept out of repo; see public/)\nLeo_s 2026 Rough Edits/\n" >> .gitignore
git add -A && git commit -m "chore: scaffold Next.js app"
```
Expected: a clean initial commit. (`.superpowers/` and the raw video folder stay out of the repo; web-ready assets go in `public/`.)

- [ ] **Step 3: Install test tooling**

Run:
```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```
Expected: devDependencies added.

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: { alias: { "@": resolve(__dirname, "src") } },
});
```

- [ ] **Step 5: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Add test scripts to `package.json`**

Add to the `"scripts"` block:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Verify tooling runs**

Run: `npm run test`
Expected: Vitest runs and reports "No test files found" (exit 0). Then commit:
```bash
git add -A && git commit -m "chore: add vitest test tooling"
```

---

### Task 2: Brand design tokens & fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/lib/brand.ts`

- [ ] **Step 1: Define brand tokens in `src/lib/brand.ts`**

```ts
// Single source of truth for brand values referenced in TS (e.g. inline SVG fills).
export const BRAND = {
  blue: "#0F4C81",
  aqua: "#4AB7D8",
  green: "#2F5D3A",
  navy: "#0c2e4f",
  gold: "#C69A2D",
  bg: "#F7F5F1",
  text: "#2B2B2B",
} as const;

export const CONTACT = {
  email: "leo@leosalkalinewater.com",
  phone: "317-985-0966",
  phoneHref: "tel:+13179850966",
  social: {
    instagram: "https://www.instagram.com/leosalkalinewater/",
    facebook: "https://www.facebook.com/share/1CeqmakfxE/",
    linktree: "https://linktr.ee/leosalkalinewater",
  },
} as const;
```

- [ ] **Step 2: Load fonts + expose CSS variables in `src/app/layout.tsx`**

Replace the font setup with:
```tsx
import type { Metadata } from "next";
import { Montserrat, Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-heading", weight: ["500","600","700","800"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", weight: ["300","400","600"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-tagline", style: ["italic"], weight: ["400","500"] });

export const metadata: Metadata = {
  title: "Leo's Alkaline Water — Hydrating You Is What We Do",
  description: "Premium alkaline water delivered fresh across Indianapolis. Subscribe or order one-time. Join the Water Fam.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sourceSans.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Set Tailwind theme + base styles in `src/app/globals.css`**

Replace contents with (Tailwind v4 `@theme` syntax):
```css
@import "tailwindcss";

@theme {
  --color-brand-blue: #0F4C81;
  --color-brand-aqua: #4AB7D8;
  --color-brand-green: #2F5D3A;
  --color-brand-navy: #0c2e4f;
  --color-brand-gold: #C69A2D;
  --color-brand-bg: #F7F5F1;
  --color-brand-text: #2B2B2B;

  --font-heading: var(--font-heading), system-ui, sans-serif;
  --font-body: var(--font-body), system-ui, sans-serif;
  --font-tagline: var(--font-tagline), Georgia, serif;
}

body {
  background: var(--color-brand-bg);
  color: var(--color-brand-text);
  font-family: var(--font-body);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
h1,h2,h3,h4 { font-family: var(--font-heading); line-height: 1.1; }
.tagline { font-family: var(--font-tagline); font-style: italic; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 4: Verify dev server renders with fonts/colors**

Run: `npm run dev` then visit `http://localhost:3000`.
Expected: page renders on cream background, no console errors. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: brand tokens, fonts, and base theme"
```

---

### Task 3: Stage web-ready assets in `public/`

**Files:**
- Create: `public/logo.png`, `public/urban-league-logo.png`, `public/hero.mp4`, `public/hero-poster.jpg`
- Create: `public/README-assets.md`

- [ ] **Step 1: Copy the logo and partner logo**

Run:
```bash
cp "Leo's Alkaline Water Brand Suite/leos alt logo.png" public/logo.png
cp "urban-league-logo.png" public/urban-league-logo.png
```
Expected: both files exist in `public/`.

- [ ] **Step 2: Compress the hero video for web + generate a poster**

Run (requires ffmpeg; if unavailable, copy the raw file and note it):
```bash
ffmpeg -i "Leo_s 2026 Rough Edits/Leo Hero Media.mp4" -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/hero.mp4
ffmpeg -i public/hero.mp4 -ss 00:00:01 -vframes 1 public/hero-poster.jpg
```
Expected: `public/hero.mp4` (smaller, muted, faststart) and `public/hero-poster.jpg`. If ffmpeg is missing: `cp "Leo_s 2026 Rough Edits/Leo Hero Media.mp4" public/hero.mp4` and record in the assets README that compression + poster are still TODO.

- [ ] **Step 3: Document assets + open items in `public/README-assets.md`**

```md
# Web Assets
- logo.png — primary wordmark
- urban-league-logo.png — Indiana Urban League partner logo
- hero.mp4 / hero-poster.jpg — homepage hero background (compressed from Leo_s 2026 Rough Edits)

## Still needed (placeholders in use until provided)
- Real product photography (jug, dispenser, starter package)
- MBE + WQA Gold Standard certification badge files
- Final dispenser/starter-package price
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: stage web-ready logo, partner logo, hero video assets"
```

---

## Phase 1 — Domain Logic (Test-Driven)

### Task 4: Order types, products, and pricing

**Files:**
- Create: `src/lib/order/types.ts`
- Create: `src/lib/order/products.ts`
- Create: `src/lib/order/pricing.ts`
- Test: `src/lib/order/pricing.test.ts`

- [ ] **Step 1: Define domain types in `src/lib/order/types.ts`**

```ts
export type Frequency = "weekly" | "biweekly" | "monthly" | "one-time";
export type CustomerType = "residential" | "business";

export interface OrderSelection {
  jugCount: number;            // 1-10+ (custom allowed)
  frequency: Frequency;
  customerType: CustomerType;
  starterPackage: boolean;     // optional add-on
  zip: string;
}

export interface OrderLine {
  label: string;
  qty: number;
  unitPriceCents: number;
  refundable?: boolean;
}

export interface OrderTotals {
  lines: OrderLine[];
  subtotalCents: number;       // includes refundable deposit
  refundableCents: number;     // deposit portion (informational)
}
```

- [ ] **Step 2: Define products/constants in `src/lib/order/products.ts`**

```ts
export const JUG_PRICE_CENTS = 1500;          // $15 per 5-gal jug, delivered
export const JUG_DEPOSIT_CENTS = 1500;        // refundable $15 jug deposit
// PLACEHOLDER: confirm real dispenser price with Leo before launch.
export const STARTER_DISPENSER_CENTS = 0;     // dispenser price TBD
export const QUICK_QUANTITIES = [2, 4, 6, 8, 10] as const;

export const FREQUENCY_LABELS: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Every 2 weeks",
  monthly: "Monthly",
  "one-time": "One-time",
};
```

- [ ] **Step 3: Write the failing test `src/lib/order/pricing.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { computeTotals } from "./pricing";

describe("computeTotals", () => {
  it("prices jugs at $15 each", () => {
    const t = computeTotals({ jugCount: 4, frequency: "weekly", customerType: "residential", starterPackage: false, zip: "46204" });
    expect(t.subtotalCents).toBe(6000);
    expect(t.refundableCents).toBe(0);
    expect(t.lines).toHaveLength(1);
  });

  it("adds a refundable deposit + dispenser when the starter package is chosen", () => {
    const t = computeTotals({ jugCount: 2, frequency: "one-time", customerType: "residential", starterPackage: true, zip: "46204" });
    // 2 jugs ($30) + refundable deposit ($15) + dispenser (placeholder $0)
    expect(t.subtotalCents).toBe(4500);
    expect(t.refundableCents).toBe(1500);
    expect(t.lines.some(l => l.refundable)).toBe(true);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npx vitest run src/lib/order/pricing.test.ts`
Expected: FAIL — `computeTotals` is not defined.

- [ ] **Step 5: Implement `src/lib/order/pricing.ts`**

```ts
import { JUG_PRICE_CENTS, JUG_DEPOSIT_CENTS, STARTER_DISPENSER_CENTS } from "./products";
import type { OrderSelection, OrderTotals, OrderLine } from "./types";

export function computeTotals(sel: OrderSelection): OrderTotals {
  const lines: OrderLine[] = [
    { label: "5-Gallon Alkaline Water Jug", qty: sel.jugCount, unitPriceCents: JUG_PRICE_CENTS },
  ];
  let refundableCents = 0;
  if (sel.starterPackage) {
    lines.push({ label: "Refundable jug deposit", qty: 1, unitPriceCents: JUG_DEPOSIT_CENTS, refundable: true });
    refundableCents += JUG_DEPOSIT_CENTS;
    if (STARTER_DISPENSER_CENTS > 0) {
      lines.push({ label: "Hand dispenser", qty: 1, unitPriceCents: STARTER_DISPENSER_CENTS });
    }
  }
  const subtotalCents = lines.reduce((sum, l) => sum + l.qty * l.unitPriceCents, 0);
  return { lines, subtotalCents, refundableCents };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx vitest run src/lib/order/pricing.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: order types, products, and pricing logic (tested)"
```

---

### Task 5: Service-area ZIP gating

**Files:**
- Create: `src/lib/service-area.ts`
- Create: `src/lib/indy-zips.ts`
- Test: `src/lib/service-area.test.ts`

- [ ] **Step 1: Create the Indianapolis ZIP allowlist `src/lib/indy-zips.ts`**

```ts
// Indianapolis (Marion County) + immediate metro ZIP codes.
// Single source of truth — expand this array as Leo's service area grows.
export const SERVICE_AREA_ZIPS: ReadonlySet<string> = new Set([
  "46201","46202","46203","46204","46205","46208","46214","46216","46217","46218",
  "46219","46220","46221","46222","46224","46225","46226","46227","46228","46229",
  "46231","46234","46235","46236","46237","46239","46240","46241","46250","46254",
  "46256","46259","46260","46268","46278","46280","46290",
  // Immediate suburbs (Carmel, Fishers, Greenwood, Beech Grove, Lawrence, Speedway)
  "46032","46033","46037","46038","46060","46142","46143","46107","46235","46224",
]);
```

- [ ] **Step 2: Write the failing test `src/lib/service-area.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { isInServiceArea, normalizeZip } from "./service-area";

describe("service area", () => {
  it("accepts a downtown Indianapolis ZIP", () => {
    expect(isInServiceArea("46204")).toBe(true);
  });
  it("accepts a ZIP+4 by using the 5-digit prefix", () => {
    expect(isInServiceArea("46204-1234")).toBe(true);
  });
  it("rejects an out-of-area (Ohio) ZIP", () => {
    expect(isInServiceArea("45402")).toBe(false);
  });
  it("normalizes whitespace and rejects invalid input", () => {
    expect(normalizeZip("  46204 ")).toBe("46204");
    expect(isInServiceArea("abc")).toBe(false);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run src/lib/service-area.test.ts`
Expected: FAIL — module/exports not found.

- [ ] **Step 4: Implement `src/lib/service-area.ts`**

```ts
import { SERVICE_AREA_ZIPS } from "./indy-zips";

export function normalizeZip(raw: string): string {
  return (raw ?? "").trim().slice(0, 5);
}

export function isInServiceArea(raw: string): boolean {
  const zip = normalizeZip(raw);
  if (!/^\d{5}$/.test(zip)) return false;
  return SERVICE_AREA_ZIPS.has(zip);
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run src/lib/service-area.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Indianapolis service-area ZIP gating (tested)"
```

---

### Task 6: Cart/order state + Square-ready payload

**Files:**
- Create: `src/lib/order/payload.ts`
- Test: `src/lib/order/payload.test.ts`
- Create: `src/components/cart/CartProvider.tsx`

- [ ] **Step 1: Write the failing test `src/lib/order/payload.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { buildOrderPayload } from "./payload";

describe("buildOrderPayload", () => {
  it("produces a Square-ready payload with recurrence + totals", () => {
    const p = buildOrderPayload({ jugCount: 4, frequency: "weekly", customerType: "residential", starterPackage: false, zip: "46204" });
    expect(p.recurring).toBe(true);
    expect(p.cadence).toBe("WEEKLY");
    expect(p.totals.subtotalCents).toBe(6000);
    expect(p.selection.jugCount).toBe(4);
  });
  it("marks one-time orders as non-recurring", () => {
    const p = buildOrderPayload({ jugCount: 2, frequency: "one-time", customerType: "business", starterPackage: true, zip: "46220" });
    expect(p.recurring).toBe(false);
    expect(p.cadence).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/order/payload.test.ts`
Expected: FAIL — `buildOrderPayload` not defined.

- [ ] **Step 3: Implement `src/lib/order/payload.ts`**

```ts
import type { OrderSelection } from "./types";
import { computeTotals } from "./pricing";

// Square Subscriptions cadence mapping (used when we connect the real API later).
const CADENCE: Record<string, string | null> = {
  weekly: "WEEKLY",
  biweekly: "EVERY_TWO_WEEKS",
  monthly: "MONTHLY",
  "one-time": null,
};

export interface OrderPayload {
  selection: OrderSelection;
  recurring: boolean;
  cadence: string | null;
  totals: ReturnType<typeof computeTotals>;
}

export function buildOrderPayload(sel: OrderSelection): OrderPayload {
  const cadence = CADENCE[sel.frequency];
  return {
    selection: sel,
    recurring: sel.frequency !== "one-time",
    cadence,
    totals: computeTotals(sel),
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/order/payload.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Implement the cart context `src/components/cart/CartProvider.tsx`**

```tsx
"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { OrderSelection } from "@/lib/order/types";

type CartState = { items: OrderSelection[] };
type CartCtx = {
  items: OrderSelection[];
  count: number;
  addItem: (sel: OrderSelection) => void;
  removeItem: (index: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "law-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const addItem = useCallback((sel: OrderSelection) => setState(s => ({ items: [...s.items, sel] })), []);
  const removeItem = useCallback((i: number) => setState(s => ({ items: s.items.filter((_, idx) => idx !== i) })), []);
  const clear = useCallback(() => setState({ items: [] }), []);

  return (
    <Ctx.Provider value={{ items: state.items, count: state.items.length, addItem, removeItem, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
```

- [ ] **Step 6: Wrap the app with `CartProvider` in `src/app/layout.tsx`**

Inside `<body>`, wrap children:
```tsx
import { CartProvider } from "@/components/cart/CartProvider";
// ...
<body><CartProvider>{children}</CartProvider></body>
```

- [ ] **Step 7: Run the full test suite + build**

Run: `npm run test && npm run build`
Expected: all tests PASS; build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: cart context + Square-ready order payload (tested)"
```

---

## Phase 2 — UI Primitives & Motion

### Task 7: Brand UI primitives

**Files:**
- Create: `src/components/ui/Button.tsx`, `Container.tsx`, `Section.tsx`, `Card.tsx`, `Field.tsx`

- [ ] **Step 1: `src/components/ui/Container.tsx`**

```tsx
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: `src/components/ui/Section.tsx`**

```tsx
export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`py-16 sm:py-24 ${className}`}>{children}</section>;
}
```

- [ ] **Step 3: `src/components/ui/Button.tsx`**

```tsx
import Link from "next/link";

type Variant = "primary" | "aqua" | "green" | "outline";
const styles: Record<Variant, string> = {
  primary: "bg-brand-blue text-white hover:bg-[#0c3f6c]",
  aqua: "bg-brand-aqua text-brand-blue hover:brightness-95",
  green: "bg-brand-green text-white hover:brightness-110",
  outline: "bg-transparent text-current border border-current/40 hover:border-current",
};

export function Button({
  href, onClick, children, variant = "primary", className = "", type = "button",
}: {
  href?: string; onClick?: () => void; children: React.ReactNode;
  variant?: Variant; className?: string; type?: "button" | "submit";
}) {
  const cls = `inline-flex items-center justify-center rounded-full px-7 py-3 font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide transition ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
```

- [ ] **Step 4: `src/components/ui/Card.tsx`**

```tsx
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-6 shadow-[0_6px_24px_rgba(15,76,129,0.08)] ${className}`}>{children}</div>;
}
```

- [ ] **Step 5: `src/components/ui/Field.tsx`**

```tsx
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wide text-brand-blue">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/30";
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: brand UI primitives (Button, Container, Section, Card, Field)"
```

---

### Task 8: "Flow like water" motion components

**Files:**
- Create: `src/components/motion/WaveDivider.tsx`
- Create: `src/components/motion/Bubbles.tsx`
- Modify: `src/app/globals.css` (keyframes)

Visual reference: `.superpowers/brainstorm/34861-1781611864/content/flow-language.html`.

- [ ] **Step 1: Add keyframes to `src/app/globals.css`**

Append:
```css
@keyframes law-wave-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes law-rise { 0% { transform: translateY(0) scale(1); opacity: 0; } 15% { opacity: .55; } 100% { transform: translateY(-120px) scale(1.3); opacity: 0; } }
@keyframes law-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.law-drop { animation: law-drift 5s ease-in-out infinite; }
```

- [ ] **Step 2: `src/components/motion/WaveDivider.tsx`**

```tsx
// Animated wave that melts one section's color into the next.
// `fill` = the color of the section BELOW this divider.
export function WaveDivider({ fill, flip = false, animate = true }: { fill: string; flip?: boolean; animate?: boolean }) {
  const path = "M0,40 C240,90 480,0 720,30 C960,60 1200,15 1440,45 L1440,120 L0,120 Z";
  return (
    <div aria-hidden className="relative -mt-px leading-[0]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-[60px] w-full sm:h-[90px]">
        <g className={animate ? "[animation:law-wave-x_14s_linear_infinite] motion-reduce:[animation:none]" : ""}>
          <path d={path} fill={fill} />
          <path d={path} fill={fill} transform="translate(1440,0)" />
        </g>
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: `src/components/motion/Bubbles.tsx`**

```tsx
// Decorative rising bubbles. Deterministic positions (no Math.random in render).
const BUBBLES = [
  { left: "8%", size: 10, delay: 0, dur: 7 },
  { left: "22%", size: 6, delay: 1.5, dur: 9 },
  { left: "40%", size: 14, delay: 0.8, dur: 8 },
  { left: "58%", size: 8, delay: 2.2, dur: 10 },
  { left: "74%", size: 5, delay: 1.1, dur: 7.5 },
  { left: "88%", size: 11, delay: 0.4, dur: 9.5 },
];

export function Bubbles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-white/25 [animation:law-rise_var(--d)_ease-in_infinite] motion-reduce:hidden"
          style={{ left: b.left, width: b.size, height: b.size, ["--d" as string]: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: water-flow motion (WaveDivider, Bubbles, keyframes)"
```

---

### Task 9: Header / nav + announcement bar

**Files:**
- Create: `src/components/layout/AnnouncementBar.tsx`
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: `src/components/layout/AnnouncementBar.tsx`**

```tsx
export function AnnouncementBar() {
  return (
    <div className="bg-brand-green py-2 text-center font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-white">
      💧 Now serving the Indianapolis area · Join the Water Fam
    </div>
  );
}
```

- [ ] **Step 2: `src/components/layout/Header.tsx`** (client component for cart count + mobile menu)

```tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Leo's Alkaline Water" width={150} height={44} priority className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="font-[family-name:var(--font-heading)] text-sm font-semibold text-brand-blue/90 hover:text-brand-blue">{n.label}</Link>
          ))}
          <Button href="/store" variant="aqua">Order</Button>
          <Link href="/cart" className="relative text-xl" aria-label="Cart">🛒
            {count > 0 && <span className="absolute -right-2 -top-1 rounded-full bg-brand-blue px-1.5 text-[10px] font-bold text-white">{count}</span>}
          </Link>
        </nav>
        <button className="md:hidden text-2xl" aria-label="Menu" onClick={() => setOpen(o => !o)}>☰</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-5 py-3 md:hidden">
          {NAV.map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 font-[family-name:var(--font-heading)] font-semibold text-brand-blue">{n.label}</Link>)}
          <Link href="/cart" onClick={() => setOpen(false)} className="py-2 font-[family-name:var(--font-heading)] font-semibold text-brand-blue">Cart ({count})</Link>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: header nav with cart count + announcement bar"
```

---

### Task 10: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: `src/components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { CONTACT } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-sm text-[#cfe3f0]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-[family-name:var(--font-heading)] text-lg font-extrabold text-white">LEO&apos;S ALKALINE WATER</div>
          <p className="mt-2 max-w-xs opacity-80">Premium alkaline water, delivered fresh across Indianapolis. Powered with Kangen Water™.</p>
          <p className="tagline mt-3 text-[#cdeefb]">We heal the Water, you heal yourself.</p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/store" className="hover:text-white">Store</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Connect</h4>
          <ul className="space-y-2">
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
            <li><a href={CONTACT.phoneHref} className="hover:text-white">{CONTACT.phone}</a></li>
            <li><a href={CONTACT.social.instagram} className="hover:text-white">Instagram</a></li>
            <li><a href={CONTACT.social.facebook} className="hover:text-white">Facebook</a></li>
            <li><a href={CONTACT.social.linktree} className="hover:text-white">Linktree</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Leo&apos;s Alkaline Water · Minority Business Enterprise (City of Indianapolis) · WQA Gold Standard
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: site footer with social, certs, legal links"
```

---

## Phase 3 — Ordering Experience

### Task 11: OrderBuilder (the core flow)

**Files:**
- Create: `src/components/order/OrderBuilder.tsx`
- Create: `src/components/order/ServiceAreaCheck.tsx`

- [ ] **Step 1: `src/components/order/ServiceAreaCheck.tsx`**

```tsx
"use client";
import { useState } from "react";
import { isInServiceArea } from "@/lib/service-area";
import { Field, inputClass } from "@/components/ui/Field";
import { NotifyMeForm } from "@/components/order/NotifyMeForm";

export function ServiceAreaCheck({ zip, onZip, onStatus }: {
  zip: string; onZip: (z: string) => void; onStatus: (ok: boolean) => void;
}) {
  const [touched, setTouched] = useState(false);
  const ok = isInServiceArea(zip);
  return (
    <div>
      <Field label="Delivery ZIP code">
        <input
          className={inputClass} inputMode="numeric" placeholder="46204" value={zip}
          onChange={(e) => { onZip(e.target.value); setTouched(true); onStatus(isInServiceArea(e.target.value)); }}
        />
      </Field>
      {touched && zip.length >= 5 && !ok && (
        <div className="mt-3 rounded-xl bg-brand-green/5 p-4 text-sm">
          <p className="font-semibold text-brand-green">We don&apos;t currently service your area yet.</p>
          <p className="mb-3 text-brand-text/70">Leave your email and we&apos;ll let you know the moment we reach you.</p>
          <NotifyMeForm defaultZip={zip} />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: `src/components/order/OrderBuilder.tsx`**

```tsx
"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Frequency, CustomerType, OrderSelection } from "@/lib/order/types";
import { QUICK_QUANTITIES, FREQUENCY_LABELS } from "@/lib/order/products";
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { isInServiceArea } from "@/lib/service-area";
import { useCart } from "@/components/cart/CartProvider";
import { ServiceAreaCheck } from "./ServiceAreaCheck";
import { Button } from "@/components/ui/Button";

const FREQS: Frequency[] = ["weekly", "biweekly", "monthly", "one-time"];
const pillBase = "rounded-full px-4 py-2 text-sm font-semibold transition border";

export function OrderBuilder({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [jugCount, setJugCount] = useState(4);
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [starterPackage, setStarter] = useState(false);
  const [zip, setZip] = useState("");
  const [zipOk, setZipOk] = useState(false);

  const selection: OrderSelection = { jugCount, frequency, customerType, starterPackage, zip };
  const totals = useMemo(() => computeTotals(selection), [jugCount, frequency, customerType, starterPackage]);
  const ready = isInServiceArea(zip);

  function pill(active: boolean) {
    return `${pillBase} ${active ? "border-brand-blue bg-brand-blue text-white" : "border-black/10 bg-white text-brand-text hover:border-brand-aqua"}`;
  }
  function submit() {
    addItem(selection);
    router.push("/cart");
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">How many 5-gal jugs?</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUANTITIES.map(q => <button key={q} className={pill(jugCount === q)} onClick={() => setJugCount(q)}>{q}</button>)}
          <input type="number" min={1} value={jugCount} onChange={e => setJugCount(Math.max(1, Number(e.target.value) || 1))}
            className="w-24 rounded-full border border-black/10 px-4 py-2 text-sm" aria-label="Custom quantity" />
        </div>
      </div>
      <div>
        <p className="mb-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">How often?</p>
        <div className="flex flex-wrap gap-2">
          {FREQS.map(f => <button key={f} className={pill(frequency === f)} onClick={() => setFrequency(f)}>{FREQUENCY_LABELS[f]}</button>)}
        </div>
      </div>
      {!compact && (
        <div>
          <p className="mb-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">Delivery type</p>
          <div className="flex gap-2">
            {(["residential","business"] as CustomerType[]).map(t =>
              <button key={t} className={pill(customerType === t)} onClick={() => setCustomerType(t)}>{t[0].toUpperCase()+t.slice(1)}</button>)}
          </div>
        </div>
      )}
      {!compact && (
        <label className="flex items-center gap-3 rounded-xl bg-brand-aqua/10 p-4">
          <input type="checkbox" checked={starterPackage} onChange={e => setStarter(e.target.checked)} className="h-5 w-5 accent-brand-blue" />
          <span className="text-sm"><b>Add Starter Package</b> — hand dispenser + refundable $15 jug deposit.</span>
        </label>
      )}
      <ServiceAreaCheck zip={zip} onZip={setZip} onStatus={setZipOk} />
      <div className="flex items-center justify-between rounded-xl bg-brand-bg p-4">
        <span className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">{formatUsd(totals.subtotalCents)}{frequency !== "one-time" ? " / delivery" : ""}</span>
        <Button variant="primary" onClick={submit} className={!ready ? "pointer-events-none opacity-40" : ""}>
          {ready ? "Add to cart →" : "Enter a serviced ZIP"}
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Build + commit**

Run: `npm run build` (NotifyMeForm is created next; if build fails on its import, proceed to Task 14 then return). Once both compile:
```bash
git add -A && git commit -m "feat: OrderBuilder + service-area check"
```

---

### Task 12: QuickOrder (hero) wrapper

**Files:**
- Create: `src/components/order/QuickOrder.tsx`

- [ ] **Step 1: `src/components/order/QuickOrder.tsx`**

```tsx
import { OrderBuilder } from "./OrderBuilder";
import { Card } from "@/components/ui/Card";

export function QuickOrder() {
  return (
    <Card className="w-full max-w-sm">
      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">Quick Order</p>
      <h3 className="mb-4 mt-1 font-extrabold text-brand-navy">Start in seconds</h3>
      <OrderBuilder compact />
    </Card>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: hero QuickOrder card"
```

---

### Task 13: NotifyMe form + API route

**Files:**
- Create: `src/components/order/NotifyMeForm.tsx`
- Create: `src/app/api/notify/route.ts`

- [ ] **Step 1: `src/app/api/notify/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";

// TODO(Square/email): wire to Resend or a list provider; for now we validate + log.
export async function POST(req: NextRequest) {
  const { email, zip } = await req.json().catch(() => ({}));
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  console.log("[notify-me]", { email, zip, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: `src/components/order/NotifyMeForm.tsx`**

```tsx
"use client";
import { useState } from "react";
import { inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function NotifyMeForm({ defaultZip = "" }: { defaultZip?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/notify", { method: "POST", body: JSON.stringify({ email, zip: defaultZip }) });
    if (res.ok) setDone(true); else setErr("Please enter a valid email.");
  }
  if (done) return <p className="text-sm font-semibold text-brand-green">You&apos;re on the list — we&apos;ll be in touch! 💧</p>;
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input className={inputClass} type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
      <Button type="submit" variant="green">Notify me</Button>
      {err && <span className="text-xs text-red-600">{err}</span>}
    </form>
  );
}
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: success (OrderBuilder import now resolves).
```bash
git add -A && git commit -m "feat: notify-me form + API route for out-of-area capture"
```

---

### Task 14: Cart page, order summary, and Square checkout placeholder

**Files:**
- Create: `src/components/order/OrderSummary.tsx`
- Create: `src/components/order/CheckoutPlaceholder.tsx`
- Create: `src/app/cart/page.tsx`
- Create: `src/app/api/order/route.ts`

- [ ] **Step 1: `src/app/api/order/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { buildOrderPayload } from "@/lib/order/payload";
import type { OrderSelection } from "@/lib/order/types";

// TODO(Square): replace the stub with a Square Subscriptions/Payments call once
// credentials exist. The payload below is already shaped for that handoff.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as { items?: OrderSelection[] } | null;
  if (!body?.items?.length) return NextResponse.json({ ok: false, error: "Empty order" }, { status: 400 });
  const payloads = body.items.map(buildOrderPayload);
  console.log("[order:stub]", JSON.stringify(payloads));
  return NextResponse.json({ ok: true, stub: true, payloads });
}
```

- [ ] **Step 2: `src/components/order/OrderSummary.tsx`**

```tsx
"use client";
import { useCart } from "@/components/cart/CartProvider";
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { FREQUENCY_LABELS } from "@/lib/order/products";
import { Card } from "@/components/ui/Card";

export function OrderSummary() {
  const { items, removeItem } = useCart();
  if (!items.length) return <p className="text-brand-text/70">Your cart is empty. Head to the Store to build an order.</p>;
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        const t = computeTotals(it);
        return (
          <Card key={i}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">{it.jugCount} × 5-Gallon Alkaline Water Jug</p>
                <p className="text-sm text-brand-text/70">{FREQUENCY_LABELS[it.frequency]} · {it.customerType} · ZIP {it.zip}{it.starterPackage ? " · + Starter Package" : ""}</p>
              </div>
              <button onClick={() => removeItem(i)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
            <p className="mt-2 font-bold">{formatUsd(t.subtotalCents)}{it.frequency !== "one-time" ? " / delivery" : ""}{t.refundableCents ? ` (incl. ${formatUsd(t.refundableCents)} refundable deposit)` : ""}</p>
          </Card>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: `src/components/order/CheckoutPlaceholder.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";

export function CheckoutPlaceholder() {
  const { items, clear } = useCart();
  const [msg, setMsg] = useState("");
  async function checkout() {
    const res = await fetch("/api/order", { method: "POST", body: JSON.stringify({ items }) });
    const data = await res.json();
    if (data.ok) { setMsg("✅ Order captured (demo). Square payment connects here once Leo's account is linked."); clear(); }
    else setMsg("Something went wrong — please try again.");
  }
  return (
    <div className="rounded-2xl border-2 border-dashed border-brand-aqua/60 bg-brand-aqua/5 p-6 text-center">
      <p className="mb-1 font-[family-name:var(--font-heading)] font-bold text-brand-blue">Payment — Square (coming soon)</p>
      <p className="mb-4 text-sm text-brand-text/70">This step is wired and ready; live Square checkout activates once account credentials are added.</p>
      <Button variant="primary" onClick={checkout} className={!items.length ? "pointer-events-none opacity-40" : ""}>Place demo order</Button>
      {msg && <p className="mt-4 text-sm font-semibold text-brand-green">{msg}</p>}
    </div>
  );
}
```

- [ ] **Step 4: `src/app/cart/page.tsx`**

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { OrderSummary } from "@/components/order/OrderSummary";
import { CheckoutPlaceholder } from "@/components/order/CheckoutPlaceholder";

export const metadata = { title: "Your Cart — Leo's Alkaline Water" };

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] py-12">
        <Container className="max-w-3xl">
          <h1 className="mb-6 text-3xl font-extrabold text-brand-navy">Your Order</h1>
          <OrderSummary />
          <div className="mt-8"><CheckoutPlaceholder /></div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: cart page, order summary, and Square checkout placeholder"
```

---

## Phase 4 — Pages & Content Sections

> Sections use the brand primitives + motion. Visual fidelity target = the approved
> `flow-language.html` mockup (airy spacing, wave dividers between every section, blended
> gradients, bubbles in the deep bands). Copy below is final-draft and comes from the
> postcard/spec.

### Task 15: Home content sections

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/TrustStrip.tsx`
- Create: `src/components/sections/Benefits.tsx`
- Create: `src/components/sections/HowItWorks.tsx`
- Create: `src/components/sections/ShopPreview.tsx`
- Create: `src/components/sections/WaterFam.tsx`
- Create: `src/components/sections/PartnerBlock.tsx`
- Create: `src/components/sections/ServiceAreaBanner.tsx`
- Create: `src/components/sections/FounderTeaser.tsx`
- Create: `src/components/sections/FinalCTA.tsx`

- [ ] **Step 1: `Hero.tsx`** — video background + QuickOrder

```tsx
import { QuickOrder } from "@/components/order/QuickOrder";
import { Bubbles } from "@/components/motion/Bubbles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline poster="/hero-poster.jpg">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[url('/hero-poster.jpg')] bg-cover bg-center motion-safe:hidden" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/85 via-brand-blue/80 to-brand-green/80" aria-hidden />
      <Bubbles />
      <Container className="relative grid items-center gap-10 py-20 md:grid-cols-[1.2fr_minmax(0,380px)] md:py-28">
        <div className="text-white">
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.2em] text-[#9fe0c0]">Local Water · Indianapolis</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] sm:text-6xl">Hydrating You<br />Is What We Do.</h1>
          <p className="tagline mt-3 text-2xl text-[#cdeefb]">Water for the People.</p>
          <p className="mt-5 max-w-md text-white/90">Premium alkaline water, delivered fresh to your door across Indianapolis — on your schedule. Welcome to the Water Fam.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/store" variant="aqua">Order Delivery</Button>
            <Button href="/store" variant="outline" className="text-white">Shop Water</Button>
          </div>
        </div>
        <div className="justify-self-center md:justify-self-end"><QuickOrder /></div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: `TrustStrip.tsx`**

```tsx
const ITEMS = [
  { icon: "💧", label: "pH 8.5–9.5" }, { icon: "🔬", label: "Kangen-powered" }, { icon: "♻️", label: "Refillable 5-gal" },
  { icon: "📍", label: "Indianapolis local" }, { icon: "⭐", label: "Est. 2019" }, { icon: "🏅", label: "MBE Certified" },
];
export function TrustStrip() {
  return (
    <div className="bg-brand-navy py-8 text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 text-center text-sm sm:grid-cols-3 md:grid-cols-6">
        {ITEMS.map(i => <div key={i.label}><div className="text-2xl">{i.icon}</div><div className="mt-1 opacity-90">{i.label}</div></div>)}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `Benefits.tsx`** (postcard copy)

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const BENEFITS = [
  { icon: "💧", title: "Deep Cellular Hydration", body: "Structured water for better absorption and real results." },
  { icon: "⚖️", title: "Alkaline pH 8.5–9.5", body: "Helps neutralize body acidity and restore balance." },
  { icon: "🛡️", title: "Immune Health", body: "Antioxidant-rich to support cellular harmony, resilience, and recovery." },
  { icon: "♻️", title: "Sustainability", body: "Delivered in refillable 5-gallon jugs and system solutions available." },
  { icon: "🤝", title: "Local & Community Support", body: "Proudly rooted in Indianapolis, promoting healthy water access for all." },
];
export function Benefits() {
  return (
    <Section className="bg-[#eef7f1]">
      <Container className="text-center">
        <p className="tagline text-3xl text-brand-green">Choose us for your…</p>
        <p className="mx-auto mt-2 max-w-md text-brand-text/70">Five reasons the Water Fam keeps coming back.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map(b => (
            <div key={b.title}>
              <div className="text-3xl law-drop">{b.icon}</div>
              <h3 className="mt-3 text-base font-bold text-brand-navy">{b.title}</h3>
              <p className="mt-1 text-sm text-brand-text/70">{b.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: `HowItWorks.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const STEPS = [
  { n: "1", t: "Pick your jugs", d: "2–10+ jugs at $15 each, delivered." },
  { n: "2", t: "Choose frequency", d: "Weekly, biweekly, monthly — or one-time." },
  { n: "3", t: "We deliver", d: "You hydrate. We handle the rest." },
];
export function HowItWorks() {
  return (
    <Section>
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">How delivery works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(s => (
            <Card key={s.n} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue font-bold text-white">{s.n}</div>
              <h3 className="mt-4 font-bold text-brand-blue">{s.t}</h3>
              <p className="mt-1 text-sm text-brand-text/70">{s.d}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: `ShopPreview.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const PRODUCTS = [
  { t: "5-Gal Jug Subscription", p: "$15/jug · recurring", cta: "Subscribe" },
  { t: "One-Time Jugs", p: "$15/jug · no commitment", cta: "Order once" },
  { t: "Starter Package", p: "Dispenser + refundable deposit", cta: "Get started" },
];
export function ShopPreview() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Shop the Water Fam favorites</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PRODUCTS.map(p => (
            <Card key={p.t}>
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-brand-aqua/20 to-brand-blue/10 text-5xl">💧</div>
              <h3 className="font-bold text-brand-blue">{p.t}</h3>
              <p className="text-sm text-brand-text/70">{p.p}</p>
              <Button href="/store" variant="aqua" className="mt-4 w-full">{p.cta}</Button>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 6: `WaterFam.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Bubbles } from "@/components/motion/Bubbles";

export function WaterFam() {
  return (
    <Section className="relative overflow-hidden bg-brand-navy text-white">
      <Bubbles />
      <Container className="relative text-center">
        <p className="tagline text-3xl text-[#cdeefb]">&ldquo;We heal the Water, you heal yourself.&rdquo;</p>
        <p className="mx-auto mt-4 max-w-xl text-white/80">More than a delivery service — a community built on better hydration. When you order from Leo&apos;s, you join the <b>Water Fam</b>: neighbors across Indianapolis choosing living, alkaline water every day.</p>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 7: `PartnerBlock.tsx`** (Indiana Urban League)

```tsx
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function PartnerBlock() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Image src="/urban-league-logo.png" alt="Indianapolis Urban League" width={220} height={70} className="h-16 w-auto" />
        <div>
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-brand-blue">Proud Supporting Partner</p>
          <p className="mt-1 max-w-xl text-brand-text/80">Leo&apos;s Alkaline Water proudly supports the <b>Indiana Urban League</b> and its mission to empower communities and advance economic inclusion across Indianapolis.</p>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 8: `ServiceAreaBanner.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { NotifyMeForm } from "@/components/order/NotifyMeForm";

export function ServiceAreaBanner() {
  return (
    <Section className="bg-[#eef7f1]">
      <Container className="max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold text-brand-green">Currently serving the Indianapolis area</h2>
        <p className="mt-2 text-brand-text/70">Outside our delivery zone? Leave your email and we&apos;ll let you know the moment we reach your neighborhood.</p>
        <div className="mx-auto mt-5 max-w-md"><NotifyMeForm /></div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 9: `FounderTeaser.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FounderTeaser() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-aqua/20 to-brand-blue/10 text-5xl">💧</div>
        <div>
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-brand-blue">Meet Leo</p>
          <h2 className="mt-1 text-2xl font-extrabold text-brand-navy">Founder &amp; Water Steward, est. 2019</h2>
          <p className="mt-3 max-w-xl text-brand-text/80">For over a decade, Leo has dedicated himself to understanding water. His mission is simple — make water health clear and accessible, so others can feel the same life-changing difference.</p>
          <Button href="/about" variant="primary" className="mt-5">Read Leo&apos;s story</Button>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 10: `FinalCTA.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-brand-blue to-brand-aqua py-16 text-center text-white">
      <Container>
        <h2 className="text-3xl font-extrabold">Ready to feel the difference?</h2>
        <p className="mt-2 text-white/90">Join the Water Fam today.</p>
        <Button href="/store" variant="primary" className="mt-6 bg-white text-brand-blue hover:bg-white/90">Order Delivery</Button>
      </Container>
    </section>
  );
}
```

- [ ] **Step 11: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: homepage content sections"
```

---

### Task 16: Assemble the Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Benefits } from "@/components/sections/Benefits";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ShopPreview } from "@/components/sections/ShopPreview";
import { WaterFam } from "@/components/sections/WaterFam";
import { PartnerBlock } from "@/components/sections/PartnerBlock";
import { ServiceAreaBanner } from "@/components/sections/ServiceAreaBanner";
import { FounderTeaser } from "@/components/sections/FounderTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WaveDivider } from "@/components/motion/WaveDivider";
import { BRAND } from "@/lib/brand";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <WaveDivider fill="#eef7f1" />
        <Benefits />
        <HowItWorks />
        <WaveDivider fill="#f2f7fa" />
        <ShopPreview />
        <WaveDivider fill={BRAND.navy} />
        <WaterFam />
        <WaveDivider fill="#ffffff" flip />
        <PartnerBlock />
        <ServiceAreaBanner />
        <FounderTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`. Verify: video hero plays (or poster shows), quick-order works, waves animate, bubbles rise, sections flow without hard edges, mobile menu works. Compare against `flow-language.html`. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: assemble homepage with water-flow section transitions"
```

---

### Task 17: About page

**Files:**
- Create: `src/components/sections/Certifications.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: `src/components/sections/Certifications.tsx`**

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const CERTS = [
  { badge: "🏅", title: "Minority Business Enterprise", body: "Certified as a Minority Business Enterprise with the City of Indianapolis (Office of Minority & Women Business Development), proudly contributing to economic inclusion and diversity in our region." },
  { badge: "🥇", title: "Water Quality Association — Gold Standard", body: "We uphold Enagic's Gold Standard, supporting premium alkaline water powered with trusted Kangen Water™ technology. Convenient delivery and independent solutions — hydration you can count on." },
];
export function Certifications() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Certified &amp; trusted</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CERTS.map(c => (
            <Card key={c.title} className="flex gap-4">
              <div className="text-4xl text-brand-gold">{c.badge}</div>
              <div><h3 className="font-bold text-brand-blue">{c.title}</h3><p className="mt-1 text-sm text-brand-text/75">{c.body}</p></div>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-brand-text/50">Replace badge emoji with official MBE &amp; WQA logo files once provided.</p>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: `src/app/about/page.tsx`**

```tsx
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Certifications } from "@/components/sections/Certifications";
import { PartnerBlock } from "@/components/sections/PartnerBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = { title: "About — Leo's Alkaline Water", description: "Leo's story, our mission, and our certifications." };

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section className="bg-gradient-to-br from-brand-green to-brand-blue text-white">
          <Container className="max-w-3xl text-center">
            <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.2em] text-[#9fe0c0]">Est. 2019</p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">About Leo&apos;s Alkaline Water</h1>
            <p className="tagline mt-3 text-2xl text-[#cdeefb]">We heal the Water, you heal yourself.</p>
          </Container>
        </Section>
        <Section>
          <Container className="max-w-3xl space-y-5 text-lg text-brand-text/85">
            <h2 className="text-2xl font-extrabold text-brand-navy">Leonardo — Founder &amp; Water Steward</h2>
            <p>For over a decade, I&apos;ve dedicated myself to researching and understanding water. My journey began when I first experienced the remarkable effects of &ldquo;living water&rdquo; — within just 10 minutes, a persistent headache disappeared.</p>
            <p>From that moment on, everything changed. Experiencing truly balanced, living water brought me greater energy, mental clarity, and vitality — it even enhanced my running performance. Once you discover true balance, everything else becomes easier.</p>
            <p>Now, my mission is simple: to make water health clear and accessible, so others can experience the same life-changing impact.</p>
          </Container>
        </Section>
        <Certifications />
        <PartnerBlock />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: About page with story, certifications, partner block"
```

---

### Task 18: Store page

**Files:**
- Create: `src/app/store/page.tsx`

- [ ] **Step 1: `src/app/store/page.tsx`**

```tsx
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { OrderBuilder } from "@/components/order/OrderBuilder";

export const metadata = { title: "Store — Leo's Alkaline Water", description: "Order 5-gallon alkaline water jugs for delivery across Indianapolis." };

export default function StorePage() {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section className="bg-gradient-to-br from-brand-blue to-brand-green text-white">
          <Container className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl">Build your water order</h1>
            <p className="tagline mt-3 text-2xl text-[#cdeefb]">Water for the People.</p>
          </Container>
        </Section>
        <Section>
          <Container className="grid gap-10 md:grid-cols-[minmax(0,420px)_1fr]">
            <Card><OrderBuilder /></Card>
            <div className="space-y-4 text-brand-text/80">
              <h2 className="text-2xl font-extrabold text-brand-navy">5-Gallon Alkaline Water Jugs</h2>
              <p>Premium, structured alkaline water at <b>pH 8.5–9.5</b>, powered with Kangen Water™ technology. <b>$15 per jug, delivered.</b></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Subscribe weekly, biweekly, or monthly — or order one-time.</li>
                <li>Residential &amp; business delivery across the Indianapolis area.</li>
                <li>Add the optional Starter Package: hand dispenser + refundable $15 jug deposit.</li>
                <li>Delivered in refillable, sustainable 5-gallon jugs.</li>
              </ul>
              <p className="text-sm text-brand-text/60">Enter your ZIP in the order builder to confirm we serve your area.</p>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: Store page with full order builder"
```

---

### Task 19: Contact page + form + API

**Files:**
- Create: `src/components/forms/ContactForm.tsx`
- Create: `src/app/api/contact/route.ts`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: `src/app/api/contact/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { CONTACT } from "@/lib/brand";

// TODO(email): connect Resend to deliver to CONTACT.email. For now: validate + log.
export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json().catch(() => ({}));
  if (!name || !email || !message || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please complete all fields." }, { status: 400 });
  }
  console.log("[contact]", { to: CONTACT.email, name, email, message, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: `src/components/forms/ContactForm.tsx`**

```tsx
"use client";
import { useState } from "react";
import { Field, inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  function set(k: string) { return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value }); }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    if (res.ok) setDone(true); else setErr("Please complete all fields with a valid email.");
  }
  if (done) return <p className="rounded-xl bg-brand-green/10 p-6 font-semibold text-brand-green">Thanks for reaching out — we&apos;ll be in touch soon! 💧</p>;
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Name"><input className={inputClass} required value={form.name} onChange={set("name")} /></Field>
      <Field label="Email"><input className={inputClass} type="email" required value={form.email} onChange={set("email")} /></Field>
      <Field label="Message"><textarea className={inputClass} rows={5} required value={form.message} onChange={set("message")} /></Field>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <Button type="submit" variant="primary">Send message</Button>
    </form>
  );
}
```

- [ ] **Step 3: `src/app/contact/page.tsx`**

```tsx
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/lib/brand";

export const metadata = { title: "Contact — Leo's Alkaline Water" };

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section>
          <Container className="grid max-w-4xl gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-extrabold text-brand-navy">Get in touch</h1>
              <p className="mt-2 text-brand-text/75">Questions about delivery, your subscription, or the Water Fam? We&apos;d love to hear from you.</p>
              <ul className="mt-6 space-y-2 text-brand-text/85">
                <li>📧 <a className="text-brand-blue hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li>📞 <a className="text-brand-blue hover:underline" href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
                <li>📍 Serving the Indianapolis area</li>
              </ul>
              <div className="mt-6 flex gap-4">
                <a href={CONTACT.social.instagram} className="text-brand-blue hover:underline">Instagram</a>
                <a href={CONTACT.social.facebook} className="text-brand-blue hover:underline">Facebook</a>
                <a href={CONTACT.social.linktree} className="text-brand-blue hover:underline">Linktree</a>
              </div>
            </div>
            <ContactForm />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: Contact page with form + API route"
```

---

### Task 20: Privacy Policy & Terms pages

**Files:**
- Create: `src/components/legal/LegalLayout.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/terms/page.tsx`

- [ ] **Step 1: `src/components/legal/LegalLayout.tsx`**

```tsx
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section>
          <Container className="max-w-3xl">
            <h1 className="text-3xl font-extrabold text-brand-navy">{title}</h1>
            <p className="mt-2 rounded-lg bg-brand-gold/10 p-3 text-sm text-brand-text/70">⚠️ Template content — review with legal counsel before launch.</p>
            <div className="prose mt-8 max-w-none space-y-4 text-brand-text/85 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-navy">{children}</div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: `src/app/privacy/page.tsx`**

```tsx
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT } from "@/lib/brand";

export const metadata = { title: "Privacy Policy — Leo's Alkaline Water" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>Leo&apos;s Alkaline Water (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what we collect and how we use it.</p>
      <h2>Information we collect</h2>
      <p>Contact details (name, email, phone), delivery address and ZIP code, order and subscription details, and payment information processed securely by our payment provider (Square). We do not store full card numbers.</p>
      <h2>How we use it</h2>
      <p>To process orders and recurring deliveries, contact you about your service, respond to inquiries, and improve our offerings. We do not sell your personal information.</p>
      <h2>Email updates</h2>
      <p>If you ask to be notified when service reaches your area, we use your email solely for that purpose.</p>
      <h2>Your choices</h2>
      <p>You may request access to or deletion of your information at any time by contacting us.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a className="text-brand-blue" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call {CONTACT.phone}.</p>
    </LegalLayout>
  );
}
```

- [ ] **Step 3: `src/app/terms/page.tsx`**

```tsx
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT } from "@/lib/brand";

export const metadata = { title: "Terms & Conditions — Leo's Alkaline Water" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>By ordering from Leo&apos;s Alkaline Water, you agree to these terms.</p>
      <h2>Service area</h2>
      <p>We currently deliver only within the Indianapolis service area. Orders outside this area cannot be fulfilled.</p>
      <h2>Orders &amp; subscriptions</h2>
      <p>Water is sold at $15 per 5-gallon jug, delivered. Subscriptions recur at your chosen frequency (weekly, biweekly, or monthly) until paused or cancelled. One-time orders are charged once.</p>
      <h2>Jug deposit</h2>
      <p>The Starter Package includes a refundable $15 jug deposit, returned when jugs are returned in good condition.</p>
      <h2>Payments</h2>
      <p>Payments are processed securely through Square. Recurring charges occur automatically per your subscription schedule.</p>
      <h2>Cancellations</h2>
      <p>You may cancel or modify your subscription by contacting us; self-service management is coming soon.</p>
      <h2>Contact</h2>
      <p>Email <a className="text-brand-blue" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call {CONTACT.phone}.</p>
    </LegalLayout>
  );
}
```

- [ ] **Step 4: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: Privacy Policy and Terms pages (templates)"
```

---

## Phase 5 — Polish & Deploy

### Task 21: SEO, favicon, and shared layout metadata

**Files:**
- Create: `src/app/icon.png` (use logo)
- Modify: `src/app/layout.tsx` (metadataBase, openGraph)

- [ ] **Step 1: Add a favicon from the logo**

Run: `cp public/logo.png src/app/icon.png`
Expected: Next.js auto-serves it as the favicon.

- [ ] **Step 2: Expand metadata in `src/app/layout.tsx`**

Replace the `metadata` export with:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.leosalkalinewater.com"),
  title: { default: "Leo's Alkaline Water — Hydrating You Is What We Do", template: "%s" },
  description: "Premium alkaline water delivered fresh across Indianapolis. Subscribe or order one-time. Join the Water Fam.",
  openGraph: {
    title: "Leo's Alkaline Water",
    description: "Premium alkaline water delivered fresh across Indianapolis. Join the Water Fam.",
    type: "website",
    images: ["/hero-poster.jpg"],
  },
};
```

- [ ] **Step 3: Build + commit**

Run: `npm run build` (expect success), then:
```bash
git add -A && git commit -m "feat: SEO metadata, favicon, OpenGraph"
```

---

### Task 22: Accessibility & reduced-motion pass

**Files:**
- Modify: any section/component flagged below

- [ ] **Step 1: Audit checklist (fix inline as found)**

Verify and fix:
- Every `<img>`/`<Image>` has meaningful `alt` (decorative ones `alt=""`).
- The hero video has `muted` + `playsInline`; poster fallback shows under `prefers-reduced-motion` (the `motion-safe:hidden`/`motion-reduce:hidden` pairing in `Hero.tsx`).
- All interactive elements are real `<button>`/`<a>` and reachable by keyboard; focus rings visible (Tailwind default + `:focus-visible`).
- Color contrast: body text on cream and white on navy/blue meet AA (they do with the chosen tokens).
- Bubbles/waves have `aria-hidden` and disappear/halt under reduced motion (`motion-reduce:hidden` / keyframe guard).
- Heading order is sequential per page (one `h1`).

- [ ] **Step 2: Run build + tests**

Run: `npm run test && npm run build`
Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: accessibility + reduced-motion pass"
```

---

### Task 23: README + Vercel deploy notes

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`**

```md
# Leo's Alkaline Water — Website

Custom Next.js site for Leo's Alkaline Water (Indianapolis 5-gal alkaline water delivery).

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run test     # unit tests (Vitest)
npm run build    # production build
```

## Architecture
- `src/lib/order/*` — pricing, products, order payload (Square-ready), types
- `src/lib/service-area.ts` + `indy-zips.ts` — Indianapolis ZIP gating (edit the ZIP set to expand coverage)
- `src/components/order/*` — order builder, cart, checkout placeholder
- `src/components/sections/*` — homepage/about content sections
- `src/components/motion/*` — wave dividers + bubbles (reduced-motion safe)
- `src/app/api/*` — contact / notify / order route handlers (stubbed; ready to wire)

## Open items before launch
- Add live Square credentials and replace the checkout stub in `src/app/api/order/route.ts`.
- Connect an email provider (e.g. Resend) in the contact/notify routes → delivers to leo@leosalkalinewater.com.
- Confirm Starter Package dispenser price in `src/lib/order/products.ts` (`STARTER_DISPENSER_CENTS`).
- Replace placeholder product imagery + cert badges; compress hero video if not already.
- Legal review of `/privacy` and `/terms`.

## Deploy
Push to GitHub and import into Vercel (zero-config). Set the production domain to leosalkalinewater.com at launch.
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "docs: project README with architecture + launch checklist"
```

- [ ] **Step 3: Deploy (optional, when ready)**

Deploy a preview to Vercel using the `vercel:deploy` skill, or `npx vercel`. Share the preview URL with Leo for review.

---

## Self-Review — Spec Coverage

- Custom-coded Next.js + stubbed Square checkout → Tasks 1, 6, 14 ✓
- Home, About, Store, Contact, Privacy, Terms → Tasks 16–20 ✓
- Purchase from homepage AND store → Hero QuickOrder (15/16) + Store OrderBuilder (18) ✓
- "Water Fam" present → AnnouncementBar, WaterFam section, copy throughout ✓
- Indiana Urban League Proud Supporting Partner → PartnerBlock on Home + About (15, 17) ✓
- Ordering flow (qty/freq/type/ZIP/starter add-on) → Task 11 ✓
- Service-area gating + out-of-area email capture → Tasks 5, 11, 13 ✓
- Brand Direction C + motion level B → Tasks 2, 8, 15, 16 ✓
- Certifications (MBE + WQA) on About → Task 17 ✓
- Ionizers left out → not built (architecture clean) ✓
- Contact form → leo@leosalkalinewater.com, phone 317-985-0966 → Tasks 2, 19 ✓
- Starter package optional add-on → Tasks 4, 11 ✓
- Social links (IG/FB/Linktree) → Footer + Contact (10, 19) ✓
- Hero video → Task 3 (asset) + 15 (Hero) ✓

No spec requirement is left without a task. Placeholder values (dispenser price, Square keys, email provider, product photos, cert logos) are intentional, isolated to single edit points, and documented in the README + assets notes.

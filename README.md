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

## Products / pricing

Four fixed plans defined in `src/lib/order/products.ts` (`PLANS`): Bi-Weekly Delivery
($30/mo), Weekly Delivery ($55/mo), Pay as You Go ($20 per jug, one-time), Starter Pack
Bundle ($45, one-time). Pay as You Go is the only per-jug plan (price × jug count); the
others are fixed-price. The jug-quantity selector records "jugs per delivery" for the
subscriptions but does not change their price — confirm any per-extra-jug pricing with Leo
before wiring Square.

## Open items before launch

- Add live Square credentials and replace the checkout stub in `src/app/api/order/route.ts`
  (subscriptions bill monthly via the `cadence`/`recurring` fields on the order payload).
- Connect an email provider (e.g. Resend) in the contact/notify routes → delivers to leo@leosalkalinewater.com.
- Confirm subscription jug-quantity pricing (extra jugs per delivery) with Leo.
- Replace placeholder product imagery + cert badges; compress `public/hero.mp4` + generate a real poster (see `public/README-assets.md`).
- Legal review of `/privacy` and `/terms`.

## Deploy

Push to GitHub and import into Vercel (zero-config). Set the production domain to leosalkalinewater.com at launch.

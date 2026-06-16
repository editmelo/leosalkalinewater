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

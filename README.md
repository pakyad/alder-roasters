# ALDER ROASTERS

ALDER ROASTERS is a fictional specialty-coffee commerce experience built as a production-style portfolio case study. It combines an editorial brand system with a complete demo shopping journey: discovery, filtering, product configuration, subscriptions, a persistent cart, and a clearly labelled simulated checkout.

## What is included

- Editorial home, story, location, policies, FAQ, search, and journal-style brew guides
- Coffee catalogue with URL-backed filters and seven structured products
- Product detail pages with grind, size, purchase-frequency, and quantity controls
- Subscription plan configuration with transparent pricing
- Persistent cart, validation-led demo checkout, and confirmation state
- Responsive navigation and layouts across mobile and desktop
- Metadata, sitemap, robots rules, semantic HTML, keyboard support, and reduced-motion treatment
- Unit, component, integration-style, accessibility, and end-to-end checks

## Technology

- Next.js 16 App Router, React 19, and TypeScript
- CSS custom properties and component-scoped styles; no UI framework
- Vitest and Testing Library for application tests
- Playwright and axe-core for critical journeys and automated accessibility checks

The stack is deliberately compact. Static typed content is the appropriate boundary for this portfolio build; a CMS, payment processor, customer accounts, and fulfilment backend would add operational complexity without improving the demonstrated frontend product work.

## Run locally

Requirements: Node.js 20.9+ and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm test:coverage
pnpm build
pnpm test:e2e
```

Playwright needs its Chromium runtime once per machine:

```bash
pnpm exec playwright install chromium
```

## Environment and deployment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the canonical production origin. The project can be deployed directly to Vercel or another Node-compatible Next.js host with `pnpm build` as the build command.

Checkout is intentionally simulated: no payment details are requested or stored, and placing an order only creates an in-browser confirmation. Cart state is stored locally in the browser. These boundaries are visible in the interface so the experience is convincing without implying real commerce.

## Product documentation

- [Product requirements](docs/product/alder-roasters-prd.md)
- [Brand and design strategy](docs/brand/alder-brand-design-strategy.md)
- [Asset register](docs/brand/asset-register.md)
- [UX specification](docs/ux/alder-phase3-ux-spec.md)
- [Release verification](docs/release/verification-report.md)
- [Portfolio case-study outline](docs/portfolio/case-study-outline.md)

All brand, products, locations, testimonials, and commercial details are fictional.

# ALDER ROASTERS — Release Verification

## Release boundary

This build is a deployment-ready fictional commerce prototype. Product discovery, configuration, subscriptions, cart persistence, validation, confirmation, content discovery, and responsive navigation are implemented. Payments, account creation, inventory, fulfilment, email delivery, and CMS authoring are intentionally simulated or omitted.

## Automated gates

The release is accepted only when all of the following pass:

- TypeScript strict type checking
- ESLint application and test checks
- Vitest unit and component suite
- V8 coverage thresholds of 80% for statements, branches, functions, and lines
- Next.js optimized production build
- Playwright critical journeys at desktop and mobile breakpoints
- axe-core scans of home, catalogue, product, and cart routes

Final local verification on 10 August 2026:

- 34/34 Vitest tests passed
- Business-logic coverage: 98.85% statements, 83.33% branches, 100% functions, 98.85% lines
- 17/17 applicable Playwright checks passed across desktop and mobile; one desktop-only skip covers the mobile-navigation-specific assertion
- Production build completed with 28 generated routes/pages
- TypeScript and ESLint completed without errors

## Manually reviewed

- Home, catalogue, product detail, mobile navigation, cart, checkout, and confirmation
- Keyboard-operable controls and visible focus treatment
- Layout behaviour at 390px mobile and desktop viewports
- Semantic landmark structure and labelled form controls
- Empty, validation, filtered, and persisted-cart states
- Image sizing and WebP delivery for the three approved editorial assets

## Known production integrations

A real launch would replace the following seams without redesigning the frontend:

- Static catalogues with a commerce backend or CMS
- Local cart persistence with server-backed sessions
- Demo checkout with a hosted payment flow
- Simulated order creation with order, tax, stock, shipping, and email services
- Example canonical origin with the deployed `NEXT_PUBLIC_SITE_URL`

No customer data or payment credentials are collected by this portfolio build.

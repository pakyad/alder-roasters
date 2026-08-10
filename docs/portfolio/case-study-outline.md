# ALDER ROASTERS

A fictional specialty-coffee storefront built to test whether an editorial brand system could support a complete commerce journey without turning into generic ecommerce UI.

**Project type**

Independent product, brand and frontend case study

**Stack**

Next.js 16 · React 19 · TypeScript · CSS Modules · Vitest · Playwright · axe-core

**Links**

Live site: deployment URL is not yet verified

Repository: `https://github.com/pakyad/alder-roasters` — unavailable publicly when checked on 10 August 2026

## Project Overview

ALDER ROASTERS is a complete fictional commerce experience for a small specialty-coffee roastery in Petaling Jaya. It covers discovery, product comparison, purchase configuration, subscriptions, a persistent cart, a simulated checkout and brewing education.

The project was treated as a commercial product rather than a collection of screens. Seven coffees share one structured content model. Catalogue filters produce shareable URLs. Product choices carry through to the cart. Checkout validates delivery details while making the demonstration boundary explicit.

The result is 28 generated pages and routes built around one consistent product, content and visual system.

## Product Vision

Specialty coffee often asks people to decode processing terms, scoring systems and tasting language before they can choose a bag. ALDER takes the opposite position: **Coffee, made clear.**

The interface keeps the useful detail—origin, process, altitude, roast intent, brew suitability and flavour structure—but introduces it in the order a customer needs it. Plain-language taste comes first. Technical context remains available once someone wants to go deeper.

This principle connects the storefront and the editorial content. A product page does not end at the purchase control. It explains what the coffee should taste like, where it came from and how to brew it.

## The Problem

The product needed to solve two tensions at the same time.

The first was commercial. A customer has to move from an unfamiliar coffee to a specific size, grind and buying cadence with enough confidence to add it to a cart.

The second was visual. Premium coffee brands can become either overly precious or indistinguishable from generic direct-to-consumer templates. The experience needed warmth and character without decorative UI getting between the customer and the product.

That led to three constraints:

- explain specialist information without removing its substance;
- make one-time purchases and subscriptions feel like parts of the same system;
- use typography, photography, spacing and product data—not interface effects—to establish the brand.

## Design Direction

The visual language is built from parchment, espresso, warm grey, clay and muted green. Newsreader carries the editorial voice; Instrument Sans handles navigation, labels, prices and controls.

The homepage pairs a large serif statement with a working-roastery image instead of centring a slogan inside an empty hero. Fine rules, square controls and asymmetrical compositions keep the interface closer to a printed coffee journal than a software dashboard.

Motion is intentionally quiet. Hover and control transitions are short, and the global stylesheet removes animation and smooth scrolling when reduced motion is requested. There are no decorative page transitions or scroll effects competing with the content.

The restraint is part of the system. Only three art-directed images are used across the experience. Product labels, structured coffee data and typography carry the remaining visual work.

## User Experience

### Finding a coffee

The catalogue opens with all seven coffees and keeps comparison information visible: origin, process, tasting notes, availability and starting price. Filters cover flavour character, brew method and availability. Applying them updates the URL, so a filtered view can be bookmarked or shared.

### Choosing the right configuration

Each product page turns a bag into a decision surface. Size changes the displayed price. Grind choices include a short explanation. One-time and recurring prices remain visible together, including the subscription saving and cadence.

The rest of the page answers the questions that usually appear after purchase: how bright or full the coffee is, which methods suit it, what happened at origin and what the roast is trying to preserve.

### Subscribing without a separate product universe

The subscription configurator reuses the same cart model as individual coffee. Customers choose the selection model, bag count, grind and cadence before seeing the calculated recurring price. This keeps subscriptions legible as configured products rather than an abstract membership tier.

### Completing the journey honestly

Cart state persists between routes and reconciles saved items against the current catalogue before displaying them. The cart shows recurring status, grind, size, quantity, totals and progress towards the fictional shipping threshold.

Checkout deliberately contains no card fields. It validates sample contact and delivery details, states that no payment or fulfilment occurs, and ends with a confirmation page that repeats the demonstration boundary. The flow can be evaluated end to end without implying that a real order exists.

### Learning after buying

Three brew guides connect method-level instruction back to suitable coffees. The V60 guide combines a concise recipe, required equipment, troubleshooting and product recommendations. A ratio calculator turns the editorial section into a small practical tool rather than static content.

### Responsive behaviour

Desktop layouts use split product and checkout compositions with sticky summaries. Below their breakpoints, those columns collapse into one reading order and sticky panels return to normal document flow. Catalogue filters become a disclosure, card grids reduce their columns and the primary navigation becomes a labelled menu.

At 390px, the hierarchy remains intact: the hero keeps its photographic context, navigation controls remain explicit, and purchase forms use native radio and select controls rather than compressed custom widgets.

## Engineering Decisions

### A small stack on purpose

The application uses Next.js App Router, React and TypeScript without a component framework, animation library, CMS or database. CSS custom properties define shared colour, spacing, type and motion tokens; CSS Modules contain feature-level composition.

That boundary fits the project. ALDER needs to demonstrate product modelling, responsive interaction and commerce state, not infrastructure that has no real operator behind it.

### Content shaped like a future CMS

Coffees, subscriptions, guides, policies and location data live in typed content modules. Domain types define valid statuses, grind options, brew methods, money values and cross-content references.

A validation layer checks duplicate identifiers, invalid slugs, prices and broken guide-to-coffee relationships. Static content stays simple while retaining a clear migration path to a CMS.

### Domain logic separated from presentation

Filtering, sorting, cart reduction, persisted-state parsing, catalogue reconciliation, money formatting and checkout validation are plain functions outside page components.

The cart reducer returns new state rather than mutating existing lines. Persisted values are parsed defensively, versioned and filtered before use. Reconciliation prevents removed, sold-out or incompatible products from surviving indefinitely in a saved cart.

### Server-rendered content, client-side interaction where needed

Editorial and product routes are statically generated where possible. Client components are limited to stateful surfaces such as filters, product configuration, search, subscriptions, cart and checkout.

The global cart provider hydrates from browser storage after mount and exposes derived display lines and item counts. This keeps the content-heavy parts of the site indexable while preserving a continuous client-side purchase journey.

## Technical Highlights

- Seven typed coffee records and three linked brew guides
- Static product and guide routes generated from structured content
- URL-backed catalogue filters with malformed-value recovery
- Immutable cart reducer with versioned local persistence
- Defensive cart reconciliation against current product data
- Shared one-time and subscription line-item model
- Checkout validation with no payment-data collection
- Responsive native controls and semantic landmarks
- Skip link, focus treatment, forced-colour support and reduced-motion handling
- Route metadata, sitemap, robots rules and configurable canonical origin
- AVIF/WebP image negotiation through Next.js
- Vitest coverage thresholds enforced for domain and business logic
- Playwright journeys across desktop and Pixel 7 viewports with axe-core checks

Final local verification recorded 34 passing Vitest tests, 98.85% statement coverage, 83.33% branch coverage, 17 applicable passing browser checks and a successful 28-page production build.

## Trade-offs

### Static content instead of a CMS

Typed modules make the portfolio build fast, testable and easy to inspect. They do not provide editorial previews, scheduled publishing or non-technical authoring. A real roastery would likely move this model behind a CMS without changing the public information architecture.

### Browser persistence instead of a commerce backend

Local storage is enough to prove cart continuity and configuration logic. It cannot synchronize devices, reserve stock or recover an abandoned cart. Those responsibilities remain explicitly outside the prototype.

### Simulated checkout instead of payment integration

The project demonstrates validation, order review and confirmation without asking visitors for sensitive information. Taxes, shipping rates, inventory, payments, transactional email and fulfilment are unknown because they are not implemented.

### A limited image library

Three images give the brand a coherent material quality and keep performance predictable. The trade-off is repetition across a content-rich site. A production art direction would need a larger original shoot covering farms, roast work, packaging variants, people and the physical location.

### Local test-server configuration

The Playwright configuration currently references the bundled Windows Node runtime used during development. The tests pass in this environment, but that command is not portable to a generic CI runner and should be replaced with a package-manager command before public CI is added.

## Reflection

### Foundation

The visual identity works because the product model and content hierarchy were decided first. Origin, process and tasting language are not decoration placed around a shop template. They determine how products are compared, filtered, explained and connected to guides.

### System

The useful boundary was not “frontend versus backend.” It was authored content, pure commerce rules and interactive presentation. Keeping those concerns separate made it possible to test pricing and persistence without rendering a page, while letting the interface remain editorial.

### Problems solved

A premium storefront still has to be understandable. The strongest parts of ALDER are the places where the commercial and editorial systems meet: plain-language tasting notes beside structured facts, subscriptions inside the same cart model, and brew guides that return readers to coffees suited to the method.

The main production gap is operational rather than visual. Real inventory, payment, fulfilment and content workflows are not present. The prototype makes those boundaries visible instead of disguising them.

## Outcome

ALDER demonstrates a complete product-design and frontend-engineering process in one coherent system: product definition, brand direction, information architecture, typed content, responsive commerce interactions, accessibility, SEO and automated verification.

The final experience can be followed from the homepage to a configured product, through a persisted cart and demonstration checkout, then back into educational content. It behaves like a small commercial site while remaining honest about what is simulated.

## Portfolio Assets

### Screenshots worth using

1. **Desktop homepage hero** — the clearest single frame for the brand: editorial type, restrained navigation, roastery context and the “Coffee, made clear.” position.
2. **Catalogue with filters visible** — shows structured content and practical discovery, not only art direction.
3. **Gichathaini product page at the configuration boundary** — include the product label, size and grind controls, price and the first origin facts in one frame.
4. **Product detail further down the page** — brightness/body indicators beside origin and roast intent demonstrate the information hierarchy.
5. **Subscription configurator** — capture a non-default plan or cadence so the calculated recurring model is visible.
6. **Cart and checkout side by side** — use two narrower frames to show persistence, order review and the explicit no-payment boundary.
7. **V60 guide** — the strongest proof that ALDER is also an educational content system.
8. **Mobile homepage with navigation open** — demonstrates that the editorial direction survives at 390px without becoming a different design.

### Interactions worth recording

1. Filter the catalogue by flavour and brew method, apply it, then show the updated URL and reduced result set.
2. Change a coffee from 250g whole bean to 1000g filter, switch to subscription and add it to the cart; keep the price and confirmation message in frame.
3. Configure a subscription by changing plan, bag count and cadence, ending on the calculated recurring price.
4. Add a product, move to another route, then open the cart to demonstrate persistence.
5. Complete the checkout with sample details and end on the “Demonstration complete” confirmation.
6. Change the brew-guide ratio calculator and show the resulting water quantity.

### Motion worth showing

Do not create a general animation reel. The implemented motion is deliberately minimal. Show only the control feedback that supports the system: button state changes, the mobile navigation opening, filter disclosure on small screens and the product add-to-cart confirmation.

### Suggested case-study sequence on iyadiman.me

1. Project title, one-sentence summary, role once confirmed, stack and live/source links
2. Full-width homepage hero
3. “Coffee, made clear” product problem and the catalogue/product pairing
4. Product configuration recording
5. Design-system detail: type, palette, product label and tasting structure
6. Subscription, cart and checkout journey
7. Responsive mobile frame
8. Engineering decisions and verified test/build numbers
9. Trade-offs and the three-part reflection used by the existing portfolio

## Unknown or Unverified

- A public ALDER deployment URL was not available during this review. The local site at `http://127.0.0.1:3000` was used as the product source.
- The supplied GitHub repository returned 404 publicly on 10 August 2026. Implementation claims were verified against the local workspace instead.
- Individual role wording, project duration and completion date were not available and should not be added until confirmed.
- No real customers, analytics, conversion data, stakeholder feedback or commercial outcomes exist in the supplied sources.

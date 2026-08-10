# ALDER ROASTERS — Product Requirements Document

**Status:** Phase 1 approved baseline

**Project type:** Fictional direct-to-consumer specialty coffee commerce experience

**Primary purpose:** Portfolio case study demonstrating production-minded product design and frontend engineering
**Working principle:** The experience must be honest about being a demonstration while behaving like a credible commercial product.

## 1. Product vision

ALDER ROASTERS is a premium, editorial commerce experience that helps curious coffee drinkers choose excellent coffee with confidence. It should turn origin, processing and tasting information into useful buying guidance rather than specialist theatre.

The finished product should feel like a small, established roaster with a clear point of view: quiet confidence, seasonal sourcing, careful roasting and practical education. Its value as a portfolio project comes from depth and coherence—not from implementing every possible commerce feature.

### Capability statement

A customer can discover ALDER, understand its standards, compare a focused coffee range, choose a suitable product or subscription, and complete a convincing demonstration purchase journey. A recruiter can inspect the same experience as evidence of brand systems, responsive UX, content modelling, state management, accessibility, performance and engineering judgement.

### Non-goals

- Operating a real coffee business, fulfilment workflow or customer account system.
- Processing real payments or collecting sensitive payment data.
- Building a generic headless-commerce platform or CMS administration panel.
- Maximising feature count at the expense of polish.
- Copying the visual language or wording of an existing roaster.

## 2. Fictional company background

ALDER ROASTERS began in 2018 as a small roasting project serving independent cafés and later opened a public roastery and tasting room. It buys traceable seasonal coffees from long-term import and producer relationships, roasts in small batches and publishes practical brew guidance for each coffee.

The company sells whole-bean and ground coffee online, operates one flagship location and offers flexible recurring subscriptions. Its fictional operational details should remain internally consistent but avoid unverifiable ethical superlatives. Claims such as “direct trade,” farmer income impact or certifications should only appear if the project defines credible evidence for them.

### Proposed brand proposition

**Exceptional coffee, made easier to understand.**

ALDER occupies the space between intimidating connoisseurship and mass-market convenience. It is knowledgeable without lecturing, premium without status signalling, and tactile without manufactured nostalgia.

### Brand principles

- **Measured:** concise, specific language; no hype.
- **Sensory:** flavour, material and process are made tangible.
- **Transparent:** origin and roast information is useful and clearly structured.
- **Welcoming:** expertise reduces uncertainty rather than creating exclusivity.
- **Seasonal:** the catalogue feels edited and alive, not like an endless marketplace.

## 3. Target customers

### Primary: the quality-seeking home brewer

Age is less important than behaviour. This customer buys coffee online, owns a basic brewing setup and wants noticeably better coffee, but may not confidently interpret variety, process, altitude, roast profile or tasting notes. They value quality and design and will pay a moderate premium when the choice feels justified.

### Secondary: the considered gift buyer

They want a refined, low-risk gift for someone who enjoys coffee. They need clear recommendations, attractive presentation, delivery expectations and minimal specialist knowledge.

### Tertiary: the routine upgrader

They want reliably good coffee without repeatedly shopping. They care about freshness, cadence, grind and the ability to pause or change a subscription.

### Portfolio audience

Recruiters, design leads and engineering leads are not commerce users, but the project must reward inspection. They should find deliberate content models, robust edge states, accessible interaction, credible technical choices and documented scope decisions.

## 4. Customer problems and motivations

| Problem                                                 | Motivation                                            | Product response                                                          |
| ------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| Specialty coffee terminology makes comparison difficult | Buy confidently without becoming an expert            | Plain-language flavour families, brew-fit guidance and progressive detail |
| Tasting notes can feel abstract or exaggerated          | Predict whether a coffee matches personal taste       | Structured notes, acidity/body scales and “best for” explanations         |
| Large catalogues create choice paralysis                | Find a suitable coffee quickly                        | Small seasonal range, meaningful filters and editorial recommendations    |
| Subscription commitments feel risky                     | Get fresh coffee conveniently while retaining control | Transparent cadence, quantity, grind and pause/cancel messaging           |
| Premium pricing needs justification                     | Understand what makes the product worth buying        | Traceable origin, process, producer story and roast intent                |
| Online coffee lacks physical cues                       | Feel the craft and material quality                   | Strong photography, packaging detail, restrained motion and sensory copy  |

## 5. Business goals

The fictional commercial goals are to:

1. Convert qualified visitors into one-time coffee purchases.
2. Increase repeat value through subscriptions without obscuring terms.
3. Build trust through sourcing transparency and useful education.
4. Raise product discovery through journal and brew-guide content.
5. Support a premium average order value through curated bundles rather than aggressive upselling.

The portfolio goals are to demonstrate:

1. A coherent brand and design system across commerce and editorial surfaces.
2. Product thinking through prioritisation, customer journeys and honest simulation.
3. Modern React/Next.js architecture, typed content and maintainable components.
4. Responsive, accessible, tested interactions and state.
5. SEO, performance and deployment discipline.

## 6. Primary user journeys

### Journey A — discover and buy

Home → featured coffee/editorial story → shop listing → filter or compare → product detail → select size/grind/purchase type → add to cart → cart → demonstration checkout → confirmation.

### Journey B — choose by taste

Shop → select flavour family and brew method → review reduced product set → inspect tasting profile and brew recommendation → add to cart.

### Journey C — subscribe

Home or subscriptions page → understand benefits and terms → choose curated or single-coffee plan → configure quantity, grind and cadence → review first shipment and recurring price → cart → demonstration checkout.

### Journey D — learn, then purchase

Search or browse brew guides/journal → read useful article → follow contextual coffee recommendation → product detail → cart.

### Journey E — locate the brand

Navigation/footer → locations → inspect flagship details, hours and amenities → open an external map link. One fictional location is stronger than several shallow ones.

## 7. Information architecture

```text
Home
Shop
├── All coffee
├── Coffee product detail
├── Bundles (later)
└── Equipment (not in MVP)
Subscriptions
Our Story
├── Approach
└── Sourcing
Brew Guides
├── Guide index
└── Guide article
Journal (later)
├── Article index
└── Article
Locations
Search
Cart
Checkout (demonstration)
Order confirmation (demonstration)
Utility
├── Shipping & returns
├── FAQ
├── Privacy
├── Terms
└── 404 / error states
```

Navigation should expose Shop, Subscriptions, Our Story and Brew Guides. Search, account and cart may appear as utilities, but a non-functional account icon should not be included. “Locations” can live in the footer until its content is substantial.

## 8. Homepage content hierarchy

1. **Header and restrained announcement:** free-shipping threshold or seasonal release; never a rotating promo carousel.
2. **Hero:** asymmetrical product-led image composition, short brand proposition and direct shop action. “Craft roasted. Slow perfected.” is a useful tonal reference, not final copy; the eventual line should be more ownable and less grammatically awkward.
3. **Seasonal edit:** three or four coffees with distinct taste profiles and clear price/purchase cues.
4. **Taste-led discovery:** a compact route into shopping by flavour or brewing preference.
5. **Brand proof:** sourcing/roasting principles supported by documentary imagery and specific facts.
6. **Subscription proposition:** convenience, flexibility and freshness with transparent recurring terms.
7. **Brew education:** selected guide that demonstrates usefulness beyond selling.
8. **Physical place:** flagship roastery vignette, only if photography and content quality support it.
9. **Newsletter and footer:** calm close, not a disruptive modal.

The homepage should not attempt to summarise every page. Its job is to establish desire, reduce purchase uncertainty and open the three strongest paths: shop, subscribe and understand the brand.

## 9. Shop experience

### Catalogue model

Launch with six to eight coffees. This is enough to make filtering meaningful while retaining the credibility of a seasonal small-batch roaster. Each product needs a real editorial identity, not placeholder variations.

### Product attributes

- Name and stable slug
- Status: available, low stock, sold out, seasonal/archive
- Country, region, producer/farm and altitude
- Variety and process
- Roast approach (avoid an imprecise light/medium/dark scale when richer language is available)
- Tasting notes and flavour-family tags
- Acidity and body levels
- Recommended brew methods
- Available sizes and grind options
- One-time and subscription pricing
- Images with useful alt text
- Short description, sourcing story and roast intent
- Related brew guide and recommended products

### Discovery and filtering

MVP filters: flavour family, brew method and availability. Sorting: featured, price and newest. Country and process can remain informational until the range is large enough to make them useful filters.

Filter state should be reflected in the URL so views are shareable and browser navigation works. Mobile uses an accessible filter sheet; desktop uses an unobtrusive sidebar or toolbar. Active filters, result count, clear-all and zero-results recovery are required.

Product cards should prioritise imagery, name, origin, concise flavour description and price. Avoid excessive badges, buttons and card containers. The whole card may link to detail, while add-to-cart remains a deliberate action on product detail for configurable products.

## 10. Product-detail experience

The page must answer, in order: What is it? Will I like it? How should I buy it? Why is it worth the price? How should I brew it?

### Content order

1. Image gallery with stable aspect ratios and keyboard-operable controls.
2. Name, origin, concise sensory description, price and availability.
3. Size, grind and purchase-type selectors with explicit labels.
4. Subscription savings and terms adjacent to the recurring option.
5. Add-to-cart feedback that does not steal focus unexpectedly.
6. Structured taste profile and recommended brew methods.
7. Producer/origin narrative and roast intent.
8. Shipping/freshness information.
9. Related brew guide and restrained recommendations.

Impossible variants must be disabled with explanation. Price and availability update predictably. Sold-out products remain useful editorial pages with a clear alternative, rather than disappearing or pretending to accept orders.

## 11. Subscription experience

The strongest portfolio version is a guided configuration, not a complex quiz. A quiz risks collecting preferences without enough catalogue depth to justify its recommendation logic.

### Plan types

- **Roaster's Choice:** rotating seasonal coffee selected by ALDER; strongest default.
- **Stay With One:** recurring delivery of a chosen available coffee; secondary path.

### Configuration

1. Choose plan.
2. Choose quantity/size.
3. Choose whole bean or grind.
4. Choose delivery every two or four weeks.
5. Review first order, recurring price, estimated shipment and flexibility terms.

The interface must clearly distinguish one-time price, recurring price, savings and billing cadence. “Pause or cancel anytime” can be stated as fictional policy, but the account-management surface will be simulated/documented rather than built in MVP.

## 12. Cart and checkout concept

### Cart

A persistent client-side cart supports configurable line items, quantity changes, removal, subtotal, free-shipping progress, empty state and clear distinction between one-time and recurring products. State persists locally between visits and is defensively parsed/versioned.

Cart UI may use a quick drawer after adding, but a full `/cart` route is required for accessibility, deep linking and reliable review. Recommendations are optional and must never obstruct checkout.

### Checkout

Build a polished, explicitly labelled **demonstration checkout**. It should validate contact, shipping and delivery fields; present order summary; show a fictional shipping method; and finish with an order-confirmation state. It must not request or store real card details. A clearly marked demo payment panel can show a preselected “Portfolio demo payment” method.

This choice is deliberate: a fake card form creates security and trust problems, while real payment/fulfilment integration adds operational complexity that contributes little to the core portfolio story.

## 13. Content strategy

### Voice

Calm, precise and sensory. Prefer “red apple, cacao nib and brown sugar” over vague luxury language. Explain specialist terms when they influence a decision. Avoid moral grandstanding, coffee snobbery and invented impact statistics.

### Content pillars

- **Coffee:** product, producer, seasonality and roast intent.
- **Practice:** practical brew guides with repeatable ratios and troubleshooting.
- **Place:** roastery, team and flagship location.
- **Principles:** sourcing approach expressed through concrete standards.

### Initial content inventory

- 6–8 complete coffee records.
- 3 brew guides: pour-over, AeroPress and French press (or espresso if imagery supports it).
- 1 complete sourcing/brand story.
- 1 location record.
- Shipping, returns and FAQ content.
- Journal is deferred until at least three genuinely distinct articles can be produced.

All factual company, producer and location data is fictional and should be identified as such in an unobtrusive site disclaimer and prominently in the portfolio case study.

## 14. Functional requirements

### Required for MVP

- Responsive global navigation, footer and announcement.
- Product catalogue sourced from typed structured content.
- URL-backed filtering/sorting with zero and loading states.
- Dynamic product routes and variant selection.
- Persistent client-side cart with one-time and subscription line items.
- Subscription configurator and transparent recurring summary.
- Demonstration checkout with validation and confirmation.
- Our Story/Sourcing, Brew Guide index and at least three guide pages.
- Site-wide search across products and guide content.
- Location, shipping/returns, FAQ, legal placeholders and custom 404.
- Metadata, sitemap, robots policy, Open Graph assets and product/article structured data where valid.
- Keyboard operation, focus management, reduced-motion support and screen-reader announcements for cart changes.
- Automated unit, integration/component and critical-path end-to-end tests.
- Production deployment with analytics and real-user performance monitoring configured only with privacy-conscious tooling.

### Optional

- Product compare view.
- Taste-profile visualisation that includes a textual equivalent.
- Recently viewed products.
- Subtle image transitions and editorial scroll reveals.
- Saved cart via URL.
- Newsletter demonstration form with success/error states.
- Product archive and “returning next season” status.

### Deliberately deferred

- Real payments, tax, shipping rates, inventory and fulfilment.
- Authentication, accounts and subscription management.
- Reviews and ratings; fabricated social proof would weaken trust.
- Wishlist.
- Loyalty programme.
- Multi-currency/localisation.
- Full CMS and preview workflow.
- Equipment catalogue.

## 15. Real implementation versus simulation

| Capability                                 | Treatment                                   | Reason                                          |
| ------------------------------------------ | ------------------------------------------- | ----------------------------------------------- |
| Catalogue, product pages, filters, search  | Fully implemented                           | Core discovery and engineering evidence         |
| Variant and subscription configuration     | Fully implemented                           | High-value commerce interaction                 |
| Cart persistence and calculations          | Fully implemented                           | Demonstrates state, validation and edge cases   |
| Checkout form and order confirmation       | Interactive simulation                      | Demonstrates UX without collecting payment data |
| Payment, tax, fulfilment and stock service | Not implemented                             | Operational backend with low portfolio return   |
| Accounts and subscription management       | Described/prototyped later                  | Requires auth and durable backend               |
| Content editing                            | Typed local content, CMS-ready boundary     | Content quality matters; CMS dashboard does not |
| Newsletter                                 | Simulated or serverless test endpoint later | Avoid storing personal data in MVP              |
| Analytics                                  | Real, privacy-conscious                     | Validates deployed behaviour and performance    |

The site footer and checkout should state: “ALDER ROASTERS is a fictional brand created as a portfolio case study. No orders or payments are processed.” This should be clear without dominating the commercial illusion.

## 16. Accessibility requirements

- Target WCAG 2.2 AA for designed and implemented surfaces.
- Semantic landmarks, heading order and native controls by default.
- Visible focus states that fit the visual system; skip link on every page.
- Full keyboard operation for menus, filters, galleries, cart drawer and checkout.
- Minimum 44×44 CSS-pixel touch targets where practical.
- Text contrast of at least 4.5:1 for normal text; do not place essential copy on uncontrolled photography without a robust treatment.
- Informative image alt text; decorative images use empty alt text.
- Form labels, instructions and errors are explicit, associated and summarised.
- Cart updates use a restrained live region; focus is moved only when the user expects it.
- Motion respects `prefers-reduced-motion`; meaning never depends on animation.
- Flavour, roast and availability are never communicated by colour alone.
- Responsive zoom and text resizing must not hide content or controls.
- Automated accessibility checks supplement—not replace—keyboard and screen-reader review.

## 17. Responsive behaviour

Design content-first from approximately 320px upward rather than creating a reduced desktop layout. Breakpoints should respond to content stress, not named devices.

- Hero composition may crop or reorder, but product and action remain visible without relying on viewport height.
- Product grid progresses from one to two to three/four columns based on readable card width.
- Filters become a modal sheet on narrow layouts and an inline control on wide layouts; state and labels remain identical.
- Product purchase controls remain in normal flow on mobile; a sticky add bar is optional only after usability testing.
- Cart drawer becomes near-full-screen on small viewports; the full cart route remains available.
- Checkout uses a single column on small screens and a sticky summary alongside the form on wide screens.
- Tables and dense origin data reflow into labelled definition lists.
- Navigation supports touch, keyboard, escape-to-close and sensible focus return.

## 18. SEO requirements

- Unique human-written title and description for every indexable route.
- Canonical URLs and stable descriptive slugs.
- Generated sitemap and intentional robots rules; checkout, cart and search-result permutations are not indexed.
- Product and Article/Breadcrumb structured data only when fields are genuinely represented on-page. Avoid misleading review/rating markup.
- Open Graph and social images with consistent brand treatment.
- Semantic internal links between products, origin stories and guides.
- Product filter query combinations use canonical catalogue URLs to avoid index bloat.
- Useful 404 page and correct HTTP states for missing products.
- Descriptive image filenames and meaningful alt text; no keyword stuffing.

## 19. Performance requirements

- Target Lighthouse ≥90 in Performance, Accessibility, Best Practices and SEO on key production routes, with accessibility aiming higher.
- Target Core Web Vitals: LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile where real-user data exists.
- Prefer server-rendered/static content; add client JavaScript only to interactive islands.
- Use responsive image sizing, explicit dimensions, modern formats and intentional priority for the true LCP image.
- Self-host/subset fonts, minimise weights and provide metric-compatible fallbacks.
- Avoid autoplay video in the hero; use a still image unless motion has measured value.
- Lazy-load below-fold media and non-critical modules without causing layout shift.
- Keep motion transform/opacity based and restrained.
- Track bundle size and prevent a general animation library or UI kit from becoming an accidental dependency.

## 20. Technical requirements and recommended stack

### Recommended stack

- **Next.js App Router + React + TypeScript (strict):** supports content-led routing, server-rendered product pages, metadata, image optimisation and focused client components.
- **CSS Modules plus global design tokens in CSS custom properties:** gives ALDER a handcrafted visual system without encouraging generic utility-class composition. Tailwind is defensible technically, but is not the strongest choice for this particular art-directed case study.
- **Local typed content:** TypeScript data modules for products and subscriptions; MDX or validated frontmatter for longer guides. Add a schema validator such as Zod at content boundaries. This provides a CMS-ready repository interface without operating a CMS.
- **Zustand with persistence for cart state, or a small reducer/context if the final state model stays narrow:** choose after the cart state transitions are specified. Do not add Redux.
- **React Hook Form + Zod for demonstration checkout:** accessible form state and shared validation without hand-rolled complexity.
- **Vitest + React Testing Library + Playwright:** unit/state tests, component/integration behaviour and end-to-end critical journeys.
- **ESLint, Prettier, TypeScript checks and axe-assisted accessibility tests:** consistent quality gates.
- **Storybook is optional, not baseline:** add it only if the component inventory grows enough to make isolated states materially useful.
- **Vercel deployment with privacy-conscious Web Analytics and Speed Insights:** natural fit for Next.js previews, production deployment and real-user performance evidence.

### Architecture constraints

- Default to Server Components; mark only genuinely interactive boundaries as client components.
- Separate content/domain models, commerce calculations, state adapters and presentation.
- All prices use integer minor units and a single currency formatter; never floating-point arithmetic.
- Cart line identity includes product, size, grind and purchase plan.
- Persisted state has a version and safe migration/fallback path.
- Search can be a deterministic client or server index over the small local dataset; no hosted search service.
- Repository methods shield UI from local content shape so a future CMS can replace storage without rewriting page components.
- No secrets are required for MVP. Environment variables must be validated if later integrations are added.
- Images must have documented usage rights; commissioned/generated project imagery should be stored and attributed consistently.

## 21. Success criteria

### Customer experience

- A new visitor can identify what ALDER sells and reach a relevant coffee within two meaningful actions from the homepage.
- Filters produce correct, shareable result states and always provide a recovery path.
- A user can configure coffee and subscription variants without ambiguity about price or recurrence.
- Cart and demonstration checkout complete without dead ends across mobile, keyboard and desktop paths.
- Core content reads as one credible brand rather than assembled placeholder copy.

### Quality gates

- No critical or serious automated accessibility violations on primary routes; manual keyboard and screen-reader checks documented.
- Unit, integration/component and end-to-end critical-path suites pass with at least 80% coverage on business logic and state modules. Coverage is not used to justify low-value snapshot tests.
- No TypeScript, lint or production-build errors.
- Performance targets are met on Home, Shop and one product page using production builds.
- Broken links, missing metadata and invalid structured data are caught before release.
- Responsive QA covers narrow mobile, large mobile, tablet, laptop and wide desktop content stresses.

### Portfolio outcome

- The case study can explain the problem, positioning, key trade-offs, content model, interaction design, accessibility and measured performance.
- The repository demonstrates deliberate commits, tests and documentation rather than a single generated code dump.
- The live site discloses its fictional nature and never accepts real payment or misleadingly presents real customer proof.

## 22. MVP scope

The MVP is a polished vertical slice, not every item in the eventual sitemap.

### Included

- Brand foundations and responsive design system.
- Home.
- Shop with six to eight products, filters and sorting.
- Product detail with variants, taste/origin information and related content.
- Subscription landing/configurator.
- Persistent cart and full cart page.
- Demonstration checkout and confirmation.
- Our Story/Sourcing.
- Brew Guide index plus three guides.
- Search across coffee and guides.
- One location plus core utility/legal pages.
- Complete accessibility, SEO, performance and test passes for these routes.
- Deployed production site and portfolio-ready project documentation.

### Exit condition

MVP is complete only when the complete discover → choose → configure → cart → demo checkout journey is convincing and verified on mobile and desktop. Page count alone is not completion.

## 23. Later enhancement scope

Prioritised only after the MVP quality gate:

1. Taste comparison and richer, accessible profile visualisation.
2. Journal with at least three substantive pieces and cross-linked editorial commerce.
3. Bundles/gifting flow.
4. Product archive and seasonal release lifecycle.
5. Recently viewed and improved recommendations based on explicit tags.
6. Newsletter test integration with privacy handling.
7. CMS migration if the case study needs to demonstrate editorial workflow.
8. Account/subscription-management prototype—not production auth—if it adds a meaningful UX case study.
9. Motion refinement after performance and reduced-motion validation.

Real commerce integration should remain a separate future project decision. It would require payment, tax, fulfilment, transactional email, inventory, privacy, security and operational support scopes.

## 24. Risks and decisions to defend

| Risk                                                 | Decision/mitigation                                                                    |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Too many routes produce thin content                 | Build the commerce vertical slice first; defer Journal and equipment                   |
| Premium becomes visually cold or inaccessible        | Pair editorial restraint with plain-language buying guidance and strong contrast       |
| Photography quality undermines the brand             | Define an image art direction and rights strategy before visual implementation         |
| Fiction appears deceptive                            | Disclose clearly in footer, checkout and case study; no fake reviews or payment fields |
| Subscription UI implies unsupported account controls | State fictional terms while labelling checkout as demo; defer management UI            |
| Animation masks weak hierarchy                       | Motion is a final enhancement with a functional purpose and reduced-motion equivalent  |
| Tooling becomes the case study                       | Prefer framework capabilities and a small dependency set                               |

## 25. Open decisions before visual design

These do not block Phase 1 completion, but Phase 2 must resolve them:

- Final brand narrative, geographic setting and currency. Recommendation: choose one plausible market and write all shipping, pricing and location details consistently around it.
- Original photography versus licensed/generated imagery, including usage-rights documentation.
- Final display and text typefaces, with licensing and performance budgets.
- Exact product range, pricing architecture and subscription discount.
- Whether the brand mark is wordmark-only or includes a restrained symbol.
- Whether the tone leans more contemporary roastery or quiet heritage; the recommendation is contemporary with tactile material cues, avoiding faux-vintage motifs.

## 26. Recommended development phases

### Phase 1 — Product definition and PRD (complete with this document)

Define users, positioning, journeys, scope, simulation policy, requirements, stack and measurable success criteria.

### Phase 2 — Brand strategy, content model and art direction

Resolve market/currency, brand story, verbal identity, product inventory, content schemas, photography plan, typography candidates, colour/material direction and moodboards. Produce structured seed content before high-fidelity UI.

### Phase 3 — UX architecture and low-fidelity flows

Create responsive wireframes and interaction specifications for navigation, shop/filter, product configuration, subscription, cart and checkout. Test information hierarchy and edge states without visual polish.

### Phase 4 — Technical foundation and design system

Scaffold the application, quality gates and deployment previews. Implement tokens, typography, layout primitives, accessibility foundations, image pipeline and core component states using test-first development.

### Phase 5 — Commerce discovery vertical slice

Implement Home, Shop and Product Detail from typed content. Add URL-backed filters, search foundations, metadata and responsive media. Validate with component, accessibility and browser tests.

### Phase 6 — Subscription, cart and demonstration checkout

Specify state transitions and price invariants first, then implement configurator, versioned persistent cart, cart route/drawer, validated demo checkout and confirmation. Test calculations and the critical end-to-end journey before refinement.

### Phase 7 — Story, guides, location and utility content

Complete editorial routes, internal linking, search index, sourcing narrative, policies, 404/error states and structured data. Confirm that content density justifies every route.

### Phase 8 — Responsive, accessibility and performance hardening

Run manual and automated accessibility reviews, real-device/browser responsive QA, production performance profiling, image/font tuning, reduced-motion review and regression fixes.

### Phase 9 — Visual and motion refinement

Add only purposeful micro-interactions and transitions. Conduct design consistency, copy and art-direction reviews; remove decorative effects that compete with product imagery.

### Phase 10 — Release and portfolio case study

Complete security/dependency review, production checks, analytics/performance monitoring, deployment and smoke tests. Capture design rationale, architecture, testing evidence, trade-offs and measured outcomes for iyadiman.me.

## 27. Phase 1 handoff

**Readiness:** Ready for Phase 2 product/content and art-direction work. It is not ready for UI implementation until the open brand-market, content and photography decisions are resolved.

The next artifact should be a compact brand/content brief and typed content-model specification, followed by low-fidelity UX flows. Code scaffolding before those decisions would create rework without adding portfolio value.

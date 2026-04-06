# Edible Bouquet Website Design

## Summary

Build a mobile-first website-vitrine for edible bouquets that serves local customers in `Krasnodar` and `Yablonovskiy`.
The site is a commercial catalog, not a full ecommerce store: users browse bouquets, read delivery details, and contact the business through `WhatsApp`, `Telegram`, or `Avito`.

The product goal is to launch a credible local brand site with strong local SEO foundations, fast mobile conversion, and a content model simple enough to maintain directly in code with `JSON/TS` and `MDX`.

## Business Goal

- Generate leads from organic search and Yandex Direct.
- Present the business as a modern local gift brand, not a generic marketplace.
- Move users quickly into messaging channels without requiring checkout, account creation, or a complex form flow.

## Launch Scope

### In Scope

- Mobile-first responsive website.
- Catalog organized primarily by bouquet composition.
- `10-12` bouquet detail pages with unique photos and content.
- Category pages for:
  - meat bouquets
  - fish bouquets
  - sweet bouquets
  - fruit bouquets
- Occasion and audience landing pages for SEO.
- Location pages for `Krasnodar` and `Yablonovskiy`.
- Delivery page.
- Contacts page.
- FAQ.
- Reviews block and/or reviews page using real customer feedback.
- Configurable contact channels for `WhatsApp`, `Telegram`, and `Avito`.
- Blog architecture ready for future use, without requiring launch content.
- Technical SEO foundations.
- Yandex Metrica events for lead actions.

### Explicitly Out of Scope for V1

- Shopping cart.
- Online payment.
- User accounts.
- Public self-pickup address.
- CMS or admin panel.
- NestJS backend.
- Database.
- Marketplace synchronization.
- Auto-generated large blog footprint.

## Brand and Visual Direction

The visual direction combines:

- a modern local gift-shop structure
- a natural food-oriented palette
- product-first presentation through photography

The approved direction is:

- overall tone: modern local gift brand
- visual mood: `natural food-style`
- brand feel: warm, appetizing, trustworthy, locally grounded

Design implications:

- avoid sterile tech or generic SaaS styling
- avoid purple-heavy or over-bright template aesthetics
- use warm, natural colors that feel tied to food ingredients
- keep layouts clean and commercial, not homemade or scrapbook-like
- rely heavily on strong bouquet photography

## Target Users

- Local buyers in `Krasnodar`
- Local buyers in `Yablonovskiy`
- People searching for gift ideas for men, birthdays, holidays, and fast delivery
- Mobile users who prefer writing in a messenger over filling a long form

## Core User Journeys

### Journey 1: Direct product discovery

1. User lands on home, category, or bouquet page from search or ads.
2. User sees bouquet photos, price-from, composition, and delivery zone.
3. User clicks a primary CTA to contact via a preferred channel.

### Journey 2: Local commercial search

1. User searches for something like `edible bouquets Krasnodar`.
2. User lands on a local landing page or a category page.
3. User understands delivery coverage and available bouquet types.
4. User moves into WhatsApp, Telegram, or Avito.

### Journey 3: Occasion-driven search

1. User searches for something like `gift bouquet for February 23 Krasnodar`.
2. User lands on an occasion page.
3. User sees a curated selection from multiple categories.
4. User continues to a bouquet detail page or contacts directly.

## Information Architecture

### Primary Routes

- `/`
- `/catalog`
- `/catalog/myasnye`
- `/catalog/rybnye`
- `/catalog/sladkie`
- `/catalog/fruktovye`
- `/bouquets/[slug]`
- `/occasions/[slug]`
- `/locations/krasnodar`
- `/locations/yablonovskiy`
- `/delivery`
- `/contacts`
- `/blog`
- `/blog/[slug]`

### Navigation Structure

Top-level navigation should prioritize:

- catalog
- delivery
- Krasnodar
- Yablonovskiy
- contacts

Occasion pages are important for SEO but do not need to dominate primary navigation.
They can be linked from:

- homepage sections
- internal cross-links
- footer
- contextual blocks on bouquet and category pages

## Content Model

Bouquet content is maintained in code, not in a CMS.
Each bouquet record should support rendering, SEO, internal linking, and filtering.

### Bouquet Fields

- `slug`
- `name`
- `shortDescription`
- `fullDescription`
- `category`
- `tags`
- `priceFrom`
- `images`
- `composition`
- `weightOrSize`
- `deliveryNote`
- `availableLocations`
- `featured`
- `seoTitle`
- `seoDescription`

### Notes

- `category` is one of: meat, fish, sweet, fruit.
- `tags` can include things like: men's, February 23, birthday, with nuts, gift, festive.
- nuts are not a first-class category; they are represented through bouquet composition and tags.
- location coverage should remain explicit at bouquet level so future availability rules are possible without refactoring the model.

### Occasion Content

Occasion pages should be structured content entries with:

- `slug`
- `title`
- `intro`
- `seoTitle`
- `seoDescription`
- `relatedBouquetSlugs`
- optional FAQ items

These pages must not be thin duplicates of one another.
Each should have a distinct purpose and text angle, for example:

- gift ideas for men
- bouquets for February 23
- birthday edible bouquets
- bouquet gift for a colleague

### Blog Content

Blog content should live in `MDX`.
The blog architecture is included in V1, but launch does not depend on publishing articles.

## Conversion Model

The site is designed around direct messaging rather than forms or checkout.

### Lead Channels

- WhatsApp
- Telegram
- Avito

### Rules

- all channels are first-class, not secondary fallbacks
- channel links and labels must live in one configuration source
- CTA placement should be consistent across pages
- mobile should include a sticky quick-contact bar
- future changes to channels must not require component rewrites

### Recommended CTA Placement

- homepage hero
- bouquet cards in key sections
- bouquet detail pages
- delivery page
- contacts page
- sticky mobile action bar

## Page Responsibilities

### Homepage

The homepage should:

- establish local service area
- explain the product offer quickly
- link into main categories
- feature selected bouquets
- surface lead channels early
- build trust through delivery info, FAQ, and reviews

### Catalog

The catalog page should:

- present all primary categories
- surface featured bouquets
- make category entry obvious on mobile

### Category Pages

Category pages should:

- focus on one composition type
- list bouquets in HTML
- include short intro text
- include internal links to related occasion and location pages

### Bouquet Detail Pages

Bouquet detail pages should:

- show primary photo immediately
- present price-from prominently
- explain composition clearly
- show relevant tags and occasion fit
- state delivery coverage
- place messaging CTAs above the fold and again below content

### Location Pages

Location pages should:

- target `Krasnodar` and `Yablonovskiy` separately
- explain delivery expectations for that area
- include unique local copy
- feature relevant bouquets
- avoid near-duplicate copy between locations

### Delivery Page

The delivery page should answer:

- where delivery is available
- same-day expectations
- ordering flow through messengers
- possible composition changes
- timing and price notes

### Contacts Page

The contacts page should:

- focus on messaging channels
- include phone if available later
- avoid publishing a home address in V1
- reinforce service area and working model

### FAQ

FAQ content is required in V1.
It should address:

- how to order
- whether composition can change
- delivery timing
- service area
- price expectations
- messenger ordering process

### Reviews

Reviews are required in V1, but should use real customer content only.
If the available review material is weak, the site should prefer a smaller honest block over padded filler content.

## SEO Strategy

The SEO strategy is local and commercial first.

### Principles

- prioritize commercial intent over vanity content
- create separate pages for real query groups
- avoid thin near-duplicate pages
- use internal linking between products, categories, occasions, and locations
- keep all important content accessible in server-rendered HTML

### Priority Query Groups

- edible bouquets Krasnodar
- edible bouquets Yablonovskiy
- men's edible bouquet Krasnodar
- fish bouquet Krasnodar
- sweet bouquet Krasnodar
- fruit bouquet Krasnodar
- bouquet for February 23 Krasnodar
- birthday edible bouquet Krasnodar

### Technical SEO Requirements

- unique `title` and `meta description` for all indexable pages
- semantic headings
- canonical metadata
- `robots.txt`
- `sitemap.xml`
- breadcrumb markup
- `Product` structured data on bouquet pages
- `Organization` structured data site-wide
- `BreadcrumbList` structured data where appropriate
- future-ready support for `LocalBusiness` if public business information becomes available

### Local SEO Constraints

- V1 does not publish a home address
- V1 should still clearly state service coverage for Krasnodar and Yablonovskiy
- local relevance is built through page copy, delivery content, metadata, and internal linking rather than address publication

## Analytics

Yandex Metrica is required in V1.

Track at least:

- click on WhatsApp CTA
- click on Telegram CTA
- click on Avito CTA
- click from homepage hero
- click from bouquet detail page

The analytics goal is to identify:

- which pages generate contact intent
- which communication channel users prefer
- which bouquet and category pages drive the most leads

## Technical Architecture

### Stack

- Next.js
- TypeScript
- Tailwind CSS
- local content/data files in `TS/JSON`
- MDX for blog and optional long-form SEO content

### Why This Stack

- supports React-based development as requested
- supports static or pre-rendered HTML suitable for SEO
- avoids unnecessary backend complexity
- keeps launch maintenance simple

### Non-Goals

- do not add NestJS for V1
- do not add a database for V1
- do not add a CMS for V1

## Rendering and Data Flow

- bouquet, category, occasion, and location pages should be generated from structured content
- important catalog content must exist in HTML, not appear only after client-side filtering
- contact components read from a centralized site configuration
- SEO metadata should be generated from page content where practical

## Error Handling and Resilience

- if one contact channel becomes unavailable, it should be removable from configuration without page rewrites
- missing optional content should degrade gracefully, for example a bouquet can render without a secondary gallery image
- invalid or missing slugs should render proper not-found pages
- launch must not depend on third-party API availability

## Performance and UX Constraints

- mobile-first layouts are mandatory
- primary design target is phone-sized screens around `360-390px`
- CTA buttons must be large and thumb-friendly
- no heavy client-side app shell
- image optimization is required
- pages should remain readable and actionable without long scrolling before the first meaningful CTA

## Accessibility Constraints

- sufficient color contrast
- descriptive button labels
- usable navigation on mobile
- meaningful alt text for bouquet imagery where possible
- clear heading structure

## Content Quality Requirements

- bouquet photos should be real and unique
- product descriptions must be distinct enough to avoid thin duplicate content
- location pages need unique text, not city-name swaps
- review content must be authentic

## Testing Expectations for Implementation

Implementation planning should include:

- route generation checks for bouquet, category, occasion, and location pages
- metadata and sitemap coverage checks
- UI verification for mobile CTA visibility
- analytics event verification for contact actions
- smoke testing for key navigation paths

## Launch Readiness Criteria

V1 is ready to launch when:

- all planned pages render correctly
- `10-12` bouquet pages exist with real content
- category pages and local pages are populated
- WhatsApp, Telegram, and Avito CTAs work from all key entry points
- FAQ and reviews are present
- technical SEO files are in place
- Metrica events are wired

## Guardrails for Planning

- keep the first release focused on a lead-generation vitrine
- prefer stronger content over more pages
- do not expand scope into ecommerce checkout or custom backend workflows
- build the architecture so future additions like blog growth, self-pickup, CMS, or backend services remain possible without redoing the site

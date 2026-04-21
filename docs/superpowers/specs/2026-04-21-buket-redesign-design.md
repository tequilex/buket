# Gastro Buket Redesign Design

## Goal

Redesign the site into a fresher, lighter storefront inspired by the visual language of `primer.html`, while preserving the existing static architecture, route structure, SEO plumbing, and analytics integration.

The redesign should:

- feel cleaner and more modern
- stay warm, but avoid muddy or heavy tones
- become more product-led
- simplify cards and page rhythm
- make the homepage feel like a storefront, not a generic landing page

## Reference Direction

Primary visual reference: `/Users/tequilex/Downloads/primer.html`

What is approved from the reference:

- light, fresh palette
- fixed clean header
- hero with large photo and dark overlay
- clearer modern typography
- compact storefront product grid
- simpler product cards
- less decorative UI noise

What is explicitly not copied as-is:

- client-side React/Babel implementation
- any browser-only rendering pattern
- reliance on images as the only carrier of meaning
- marketplace-style visual density

The reference is used as a visual benchmark, not as a technical template.

## Design Direction

Approved direction: `fresh light storefront`

Target feel:

- very light ivory background
- clean green accent instead of swampy olive
- restrained sand / honey secondary accent
- dark warm text with strong readability
- photo-led, but still text-first for meaning
- more modern storefront feel than handmade landing-page feel

This should feel like a local premium-friendly gift vitrine, not a craft fair page and not a marketplace clone.

## SEO And Architecture Constraints

The redesign must remain SEO-safe.

That means:

- preserve the current Next.js App Router structure
- preserve static generation / static export behavior
- preserve routes and slugs
- preserve `metadata`, `robots`, `sitemap`, and structured data
- preserve indexable HTML text in the hero and page content
- avoid hiding primary meaning inside images only

The hero may become image-led, but:

- `h1` stays visible and meaningful in HTML
- supporting copy stays readable in HTML
- primary CTAs remain semantic links or buttons

## Visual System

### Color

Use a fresh, bright, warm-neutral system:

- background: light ivory, not pure cold white
- surfaces: soft warm neutral cards
- accent: clean botanical green
- secondary accent: restrained warm sand / honey
- text: near-black with warm undertone
- borders: subtle warm-neutral lines

The palette should feel brighter and cleaner than the current version.

### Typography

Typography should move closer to the reference in spirit:

- strong but clean display headlines
- calmer supporting text
- compact labels and metadata
- less “soft handmade” feeling

Headlines should feel contemporary and structured, not decorative.

### Surfaces

Surfaces should be simplified:

- lighter cards
- thinner borders
- softer shadows
- less internal padding bloat
- fewer stacked pills and decorative micro-panels

UI should support product photography rather than compete with it.

## Homepage

## Role

The homepage becomes the storefront entry point.

It should communicate:

1. what the product is
2. where delivery works
3. how to order quickly
4. what to browse first

## Structure

Recommended homepage order:

1. hero
2. popular bouquets
3. categories
4. compact service / ordering support block
5. FAQ
6. reviews

## Hero

The hero should be rebuilt around a large image-led composition inspired by the reference.

Requirements:

- large photo background or dominant photo area
- readable dark or tinted overlay
- visible HTML `h1`
- one concise supporting paragraph
- clear messenger CTA group
- no oversized decorative side-card competing with the message

The hero should feel lighter and more direct than the current one.

## Popular Bouquets

This section should behave like a compact storefront shelf.

- smaller cards
- tighter rhythm
- faster scanning
- less visual mass

It should resemble a clean vitrine, not a heavy feature block.

## Categories

Categories should stay prominent, but no longer dominate the homepage.

- smaller and cleaner than now
- visually aligned with the storefront system
- useful for navigation, not ornamental

## Catalog And Category Pages

These pages should move closest to the reference.

Target behavior:

- compact storefront grid
- cleaner visual rhythm
- stronger focus on image, name, price, CTA
- fewer oversized surfaces

The catalog should feel easier to scan and more modern than the current version.

## Bouquet Cards

Bouquet cards should be simplified and normalized.

Preferred structure:

1. image
2. optional small label
3. bouquet name
4. one short supporting line
5. price from
6. calm CTA

Rules:

- smaller than current cards
- less vertical heaviness
- less internal clutter
- more even grid rhythm
- image-first, but with readable text hierarchy

## Bouquet Detail Page

The bouquet detail page should be cleaner and more premium.

Above the fold:

- large photo
- bouquet name
- price
- short description
- CTA

Below the fold:

- composition
- format / size
- delivery note
- related bouquets

The page should stop feeling like a stack of nested panels and become a calmer product page.

## Shared Layout Chrome

### Header

Inspired by the reference:

- fixed or visually persistent
- lighter and cleaner
- more modern spacing
- clearer brand presentation

### Footer

- simpler grouping
- less visual weight
- still useful for trust and navigation

### Mobile Contact Bar

- still utility-first
- visually aligned to the new storefront style
- cleaner and less visually noisy

## Supporting Pages

Supporting pages should inherit the redesign system without becoming separate design projects:

- delivery
- contacts
- locations
- occasions
- FAQ blocks
- reviews

They should feel consistent with the storefront system, but product pages remain the main priority.

## Scope

### In Scope

- homepage redesign
- product-card redesign
- catalog and category storefront redesign
- bouquet detail redesign
- header / footer / mobile CTA redesign
- support-page visual alignment

### Out Of Scope

- route changes
- content model changes in `src/data`
- slug changes
- metadata / sitemap / robots changes
- analytics behavior changes
- blog architecture changes

## Implementation Guidance

The redesign should be implemented using the current SCSS-based system.

Preferred implementation style:

- keep markup semantic
- keep styles modular
- avoid visual hacks that fight the layout
- preserve existing functionality while replacing the presentation layer

Do not mix the redesign with unrelated refactoring.

## Success Criteria

The redesign is successful if:

- the site visibly feels fresher and more modern
- the palette stays warm but no longer feels muddy
- the homepage feels like a storefront
- catalog cards become smaller and more usable
- bouquet detail pages feel calmer and more premium
- the redesign remains SEO-safe and static-export-safe

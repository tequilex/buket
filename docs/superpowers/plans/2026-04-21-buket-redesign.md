# Gastro Buket Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the interface layer into a fresh, reference-inspired storefront while preserving static generation, routes, SEO, and analytics.

**Architecture:** The redesign stays inside the current Next.js App Router and SCSS Modules setup. The visual reference from `primer.html` is translated into the existing semantic HTML structure: fixed clean header, image-led hero with readable text overlay, compact storefront cards, and lighter support pages. Implementation is staged so that product browsing surfaces are redesigned first, while SEO-critical HTML and route behavior stay intact throughout.

**Tech Stack:** Next.js App Router, TypeScript, React, SCSS Modules, Vitest, React Testing Library

---

## Planned File Responsibilities

- `src/app/globals.scss`
  Global tokens for palette, typography, shadows, spacing, and shared surfaces.
- `src/app/layout.module.scss`
  Global shell constraints, page width, body rhythm, fixed-header offsets.
- `src/components/layout/site-header.tsx`
  Header markup and navigation hierarchy.
- `src/components/layout/site-header.module.scss`
  Clean fixed-header storefront styling inspired by the reference.
- `src/components/layout/site-footer.tsx`
  Footer navigation and trust grouping.
- `src/components/layout/site-footer.module.scss`
  Footer alignment to the new light storefront language.
- `src/components/layout/mobile-contact-bar.tsx`
  Sticky mobile lead bar.
- `src/components/layout/mobile-contact-bar.module.scss`
  Mobile contact bar styling aligned to the redesign.
- `src/components/cta/contact-buttons.tsx`
  Messenger CTA cluster used in hero, cards, and support pages.
- `src/components/cta/contact-buttons.module.scss`
  CTA visual system and compact/regular variants.
- `src/app/page.tsx`
  Homepage structure and storefront section order.
- `src/app/page.module.scss`
  Homepage hero, storefront shelves, category navigation, and support-block styling.
- `src/components/home/hero-featured-carousel.tsx`
  Compact storefront product strip used inside or below the homepage hero.
- `src/components/home/hero-featured-carousel.module.scss`
  Styling for the homepage storefront vitrine.
- `src/components/catalog/bouquet-card.tsx`
  Shared compact product card used across homepage, catalog, and category pages.
- `src/components/catalog/bouquet-card.module.scss`
  Product-card sizing, image handling, text rhythm, and CTA styling.
- `src/app/catalog/page.tsx`
  Catalog landing page composition.
- `src/app/catalog/[category]/page.tsx`
  Category storefront page composition.
- `src/app/internal-page.module.scss`
  Shared internal/support-page layout and lighter support surfaces.
- `src/app/bouquet-page.module.scss`
  Bouquet detail page styling.
- `src/app/bouquets/[slug]/page.tsx`
  Bouquet detail markup and hierarchy.
- `src/components/shared/section-heading.tsx`
  Shared heading structure where needed for the new storefront hierarchy.
- `src/components/shared/section-heading.module.scss`
  Shared section-heading styling.
- `src/components/shared/breadcrumbs.tsx`
  Breadcrumb markup.
- `src/components/shared/breadcrumbs.module.scss`
  Breadcrumb storefront styling.
- `src/components/shared/faq-list.tsx`
  FAQ structure for support surfaces.
- `src/components/shared/faq-list.module.scss`
  FAQ storefront styling.
- `src/components/shared/review-list.tsx`
  Reviews section markup.
- `src/components/shared/review-list.module.scss`
  Reviews storefront styling.
- `src/app/delivery/page.tsx`
  Delivery page aligned to the new storefront system.
- `src/app/contacts/page.tsx`
  Contacts page aligned to the new storefront system.
- `src/app/locations/krasnodar/page.tsx`
  Krasnodar location page alignment.
- `src/app/locations/yablonovskiy/page.tsx`
  Yablonovskiy location page alignment.
- `src/app/occasions/[slug]/page.tsx`
  Occasion-page alignment.
- `src/app/blog/page.tsx`
  Blog empty-state alignment.
- `src/app/not-found.tsx`
  Not-found alignment.
- `tests/unit/smoke/app-shell.test.tsx`
  Homepage shell and storefront-section assertions.
- `tests/unit/components/contact-buttons.test.tsx`
  Messenger CTA assertions.
- `tests/unit/components/hero-featured-carousel.test.tsx`
  Hero/storefront strip assertions.
- `tests/unit/components/bouquet-card.test.tsx`
  Compact product-card assertions.

## Task 1: Establish The New Storefront Shell

**Files:**
- Modify: `src/app/globals.scss`
- Modify: `src/app/layout.module.scss`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/site-header.module.scss`
- Modify: `src/components/layout/site-footer.tsx`
- Modify: `src/components/layout/site-footer.module.scss`
- Modify: `src/components/layout/mobile-contact-bar.tsx`
- Modify: `src/components/layout/mobile-contact-bar.module.scss`
- Test: `tests/unit/smoke/app-shell.test.tsx`

- [ ] **Step 1: Extend the smoke test for the storefront shell**

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders the storefront shell sections', () => {
  render(<HomePage />);

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /популярные букеты/i })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the smoke test**

Run: `npm test -- tests/unit/smoke/app-shell.test.tsx`  
Expected: FAIL or require updates because the current shell does not yet expose the final storefront structure consistently.

- [ ] **Step 3: Implement the storefront shell baseline**

In `src/app/globals.scss`, introduce the fresh reference-inspired tokens:

```scss
:root {
  --bg: #fffdf8;
  --bg-soft: #f7f2e8;
  --surface: #fffaf0;
  --surface-muted: #f1eadb;
  --text: #231f17;
  --muted: rgba(50, 42, 29, 0.72);
  --line: rgba(121, 104, 73, 0.14);
  --accent: #2f6a49;
  --accent-soft: #efe3cd;
  --shadow-soft: 0 18px 44px rgba(27, 20, 11, 0.08);
}
```

Then redesign the global shell:

- cleaner fixed header
- lighter footer
- calmer mobile contact bar
- consistent top offset for fixed navigation

- [ ] **Step 4: Run the smoke test again**

Run: `npm test -- tests/unit/smoke/app-shell.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.scss src/app/layout.module.scss src/components/layout/site-header.tsx src/components/layout/site-header.module.scss src/components/layout/site-footer.tsx src/components/layout/site-footer.module.scss src/components/layout/mobile-contact-bar.tsx src/components/layout/mobile-contact-bar.module.scss tests/unit/smoke/app-shell.test.tsx
git commit -m "feat: add storefront shell baseline"
```

## Task 2: Rebuild The Homepage Hero Around The Reference Direction

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.scss`
- Modify: `src/components/cta/contact-buttons.tsx`
- Modify: `src/components/cta/contact-buttons.module.scss`
- Modify: `src/components/home/hero-featured-carousel.tsx`
- Modify: `src/components/home/hero-featured-carousel.module.scss`
- Test: `tests/unit/components/contact-buttons.test.tsx`
- Test: `tests/unit/components/hero-featured-carousel.test.tsx`
- Test: `tests/unit/smoke/app-shell.test.tsx`

- [ ] **Step 1: Add failing tests for the hero CTA layer and storefront strip**

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { HeroFeaturedCarousel } from '@/components/home/hero-featured-carousel';

test('renders the primary messenger CTAs', () => {
  render(<ContactButtons source="hero" />);
  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /telegram/i })).toBeInTheDocument();
});

test('renders a popular bouquets storefront strip', () => {
  render(<HeroFeaturedCarousel />);
  expect(screen.getByRole('heading', { name: /популярные букеты/i })).toBeInTheDocument();
});

test('homepage hero keeps an indexable h1', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the tests**

Run: `npm test -- tests/unit/components/contact-buttons.test.tsx tests/unit/components/hero-featured-carousel.test.tsx tests/unit/smoke/app-shell.test.tsx`  
Expected: FAIL or require updates because the current hero does not yet match the approved reference-inspired storefront layout.

- [ ] **Step 3: Implement the new hero and CTA layer**

Rebuild the homepage hero using:

- large photo-led surface
- readable overlay
- visible HTML `h1`
- one short paragraph
- compact messenger CTA group
- compact product shelf or product strip that does not dominate the hero

Do not move meaning into the image only.

Example target shape:

```tsx
<section className={styles.hero}>
  <div className={styles.heroMedia} />
  <div className={styles.heroOverlay} />
  <div className={styles.heroContent}>
    <p className={styles.heroLabel}>Краснодар · Яблоновский</p>
    <h1>Съедобные букеты с доставкой в Краснодаре и Яблоновском</h1>
    <p>Короткий понятный оффер.</p>
    <ContactButtons source="hero" />
  </div>
</section>
```

- [ ] **Step 4: Run the tests again**

Run: `npm test -- tests/unit/components/contact-buttons.test.tsx tests/unit/components/hero-featured-carousel.test.tsx tests/unit/smoke/app-shell.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/page.module.scss src/components/cta/contact-buttons.tsx src/components/cta/contact-buttons.module.scss src/components/home/hero-featured-carousel.tsx src/components/home/hero-featured-carousel.module.scss tests/unit/components/contact-buttons.test.tsx tests/unit/components/hero-featured-carousel.test.tsx tests/unit/smoke/app-shell.test.tsx
git commit -m "feat: redesign homepage hero and ctas"
```

## Task 3: Rebuild Bouquet Cards And Homepage Shelves

**Files:**
- Modify: `src/components/catalog/bouquet-card.tsx`
- Modify: `src/components/catalog/bouquet-card.module.scss`
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.scss`
- Modify: `src/components/shared/section-heading.tsx`
- Modify: `src/components/shared/section-heading.module.scss`
- Test: `tests/unit/components/bouquet-card.test.tsx`
- Test: `tests/unit/smoke/app-shell.test.tsx`

- [ ] **Step 1: Add the failing compact-card test**

```tsx
import { render, screen } from '@testing-library/react';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { bouquets } from '@/data/bouquets';

test('renders a compact storefront bouquet card', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  expect(screen.getByRole('img', { name: bouquets[0].images[0].alt })).toBeInTheDocument();
  expect(screen.getByText(bouquets[0].name)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(String(bouquets[0].priceFrom)))).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /подробнее/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the bouquet-card and smoke tests**

Run: `npm test -- tests/unit/components/bouquet-card.test.tsx tests/unit/smoke/app-shell.test.tsx`  
Expected: FAIL or require updates because the current cards are larger and heavier than the approved storefront direction.

- [ ] **Step 3: Implement the compact storefront cards**

Rebuild cards closer to the reference:

- smaller image-led card
- less vertical mass
- thinner borders
- lighter shadow
- compact text rhythm
- image, name, price, CTA as the core scan path

Use target structure:

```tsx
<article className={styles.card}>
  <Link href={`/bouquets/${bouquet.slug}`} className={styles.media}>...</Link>
  <div className={styles.body}>
    <p className={styles.label}>{categoryName}</p>
    <h3>{bouquet.name}</h3>
    <p className={styles.summary}>{bouquet.shortDescription}</p>
    <div className={styles.footer}>
      <span className={styles.price}>от {bouquet.priceFrom} ₽</span>
      <Link ...>Подробнее</Link>
    </div>
  </div>
</article>
```

Also rebuild the homepage “Популярные букеты” shelf and category section into calmer storefront surfaces.

- [ ] **Step 4: Run the tests again**

Run: `npm test -- tests/unit/components/bouquet-card.test.tsx tests/unit/smoke/app-shell.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/bouquet-card.tsx src/components/catalog/bouquet-card.module.scss src/app/page.tsx src/app/page.module.scss src/components/shared/section-heading.tsx src/components/shared/section-heading.module.scss tests/unit/components/bouquet-card.test.tsx tests/unit/smoke/app-shell.test.tsx
git commit -m "feat: redesign storefront cards and homepage shelves"
```

## Task 4: Rebuild Catalog And Category Pages As A Storefront Grid

**Files:**
- Modify: `src/app/catalog/page.tsx`
- Modify: `src/app/catalog/[category]/page.tsx`
- Modify: `src/app/internal-page.module.scss`
- Modify: `src/components/shared/breadcrumbs.tsx`
- Modify: `src/components/shared/breadcrumbs.module.scss`
- Test: `tests/unit/routes/static-params.test.ts`

- [ ] **Step 1: Add a failing catalog storefront assertion**

```tsx
import { render, screen } from '@testing-library/react';
import CatalogPage from '@/app/catalog/page';

test('catalog page renders a storefront heading and popular bouquet shelf', () => {
  render(<CatalogPage />);
  expect(screen.getByRole('heading', { name: /каталог/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /популярные букеты/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the route tests**

Run: `npm test -- tests/unit/routes/static-params.test.ts`  
Expected: PASS on route generation and FAIL or require updates for any new rendering assertions you add locally.

- [ ] **Step 3: Implement the storefront catalog layout**

Align catalog and category pages to the reference-inspired storefront:

- compact product grid
- smaller category navigation
- cleaner intro block
- calmer breadcrumbs
- less “landing page” feeling

Do not change any route logic or slug behavior.

- [ ] **Step 4: Run the route tests again**

Run: `npm test -- tests/unit/routes/static-params.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/catalog/page.tsx src/app/catalog/[category]/page.tsx src/app/internal-page.module.scss src/components/shared/breadcrumbs.tsx src/components/shared/breadcrumbs.module.scss tests/unit/routes/static-params.test.ts
git commit -m "feat: redesign catalog storefront pages"
```

## Task 5: Rebuild The Bouquet Detail Page

**Files:**
- Modify: `src/app/bouquets/[slug]/page.tsx`
- Modify: `src/app/bouquet-page.module.scss`
- Modify: `src/components/shared/faq-list.tsx`
- Modify: `src/components/shared/faq-list.module.scss`
- Modify: `src/components/shared/review-list.tsx`
- Modify: `src/components/shared/review-list.module.scss`
- Test: `tests/unit/routes/static-params.test.ts`

- [ ] **Step 1: Add a failing bouquet-page structure test**

```tsx
import { render, screen } from '@testing-library/react';
import BouquetPage from '@/app/bouquets/[slug]/page';

test('bouquet page renders primary product data above the fold', async () => {
  const page = await BouquetPage({ params: Promise.resolve({ slug: 'muzhskoy-hit' }) });
  render(page);

  expect(screen.getByRole('heading', { name: /мужской хит/i })).toBeInTheDocument();
  expect(screen.getByText(/3400/i)).toBeInTheDocument();
  expect(screen.getByText(/состав/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the relevant tests**

Run: `npm test -- tests/unit/routes/static-params.test.ts`  
Expected: PASS on params and FAIL or require updates for any new rendering assertions you add locally.

- [ ] **Step 3: Implement the cleaner product page**

Use a calmer detail hierarchy:

- large image
- clear title and price
- short description
- CTA
- simplified support panels below the fold

Keep structured data, metadata, and route behavior unchanged.

- [ ] **Step 4: Run the tests again**

Run: `npm test -- tests/unit/routes/static-params.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/bouquets/[slug]/page.tsx src/app/bouquet-page.module.scss src/components/shared/faq-list.tsx src/components/shared/faq-list.module.scss src/components/shared/review-list.tsx src/components/shared/review-list.module.scss tests/unit/routes/static-params.test.ts
git commit -m "feat: redesign bouquet detail page"
```

## Task 6: Align Support Pages To The Same Visual System

**Files:**
- Modify: `src/app/delivery/page.tsx`
- Modify: `src/app/contacts/page.tsx`
- Modify: `src/app/locations/krasnodar/page.tsx`
- Modify: `src/app/locations/yablonovskiy/page.tsx`
- Modify: `src/app/occasions/[slug]/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/internal-page.module.scss`
- Test: `tests/unit/content/blog.test.ts`
- Test: `tests/unit/routes/static-params.test.ts`

- [ ] **Step 1: Add a failing support-page assertion**

```tsx
import { render, screen } from '@testing-library/react';
import ContactsPage from '@/app/contacts/page';

test('contacts page renders inside the storefront support layout', () => {
  render(<ContactsPage />);
  expect(screen.getByRole('heading', { name: /контакты/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the support-page tests**

Run: `npm test -- tests/unit/content/blog.test.ts tests/unit/routes/static-params.test.ts`  
Expected: FAIL or require updates because the support pages still carry pre-redesign spacing and surfaces.

- [ ] **Step 3: Align support pages to the storefront style**

Apply:

- lighter intro surfaces
- cleaner spacing
- calmer internal blocks
- less oversized decorative UI

Do not change content structure or route behavior.

- [ ] **Step 4: Run the support-page tests again**

Run: `npm test -- tests/unit/content/blog.test.ts tests/unit/routes/static-params.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/delivery/page.tsx src/app/contacts/page.tsx src/app/locations/krasnodar/page.tsx src/app/locations/yablonovskiy/page.tsx src/app/occasions/[slug]/page.tsx src/app/blog/page.tsx src/app/not-found.tsx src/app/internal-page.module.scss tests/unit/content/blog.test.ts tests/unit/routes/static-params.test.ts
git commit -m "feat: align support pages to storefront redesign"
```

## Task 7: Full Verification And Final Polish

**Files:**
- Modify: any redesigned files from Tasks 1-6 as needed
- Test: `tests/unit/smoke/app-shell.test.tsx`
- Test: `tests/unit/components/contact-buttons.test.tsx`
- Test: `tests/unit/components/hero-featured-carousel.test.tsx`
- Test: `tests/unit/components/bouquet-card.test.tsx`
- Test: `tests/unit/content/blog.test.ts`
- Test: `tests/unit/routes/static-params.test.ts`
- Test: `tests/unit/routes/sitemap.test.ts`
- Test: `tests/unit/analytics/metrica.test.ts`
- Test: `tests/unit/seo/metadata.test.ts`
- Test: `tests/unit/seo/structured-data.test.ts`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`  
Expected: PASS or a short redesign-related failure list to fix.

- [ ] **Step 2: Run static analysis and production build**

Run: `npm run lint`  
Expected: PASS

Run: `npm run typecheck`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

- [ ] **Step 3: Fix remaining polish issues**

Only fix:

- spacing inconsistencies
- responsive issues
- card scaling issues
- hero readability issues
- support-page rhythm issues

Do not reopen approved design direction.

- [ ] **Step 4: Re-run the full verification suite**

Run: `npm test`  
Expected: PASS

Run: `npm run lint`  
Expected: PASS

Run: `npm run typecheck`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app src/components tests/unit
git commit -m "feat: redesign gastro buket storefront"
```

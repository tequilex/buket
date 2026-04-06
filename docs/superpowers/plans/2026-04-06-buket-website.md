# Buket Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first Next.js website-vitrine for edible bouquets in Krasnodar and Yablonovskiy with local SEO pages, configurable messenger CTAs, and launch-ready static content.

**Architecture:** The site is a statically generated Next.js App Router app. Structured TypeScript content files drive bouquet, category, occasion, location, FAQ, review, and contact-channel content. Shared components render all pages, while small helper modules own SEO metadata, JSON-LD, blog loading, and Yandex Metrica events.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Vitest, React Testing Library, MDX, Yandex Metrica.

---

## Planned File Structure

### Project and Tooling

- Create: `.gitignore`
- Create: `.env.example`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

### App Routes

- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/not-found.tsx`
- Create: `src/app/catalog/page.tsx`
- Create: `src/app/catalog/[category]/page.tsx`
- Create: `src/app/bouquets/[slug]/page.tsx`
- Create: `src/app/occasions/[slug]/page.tsx`
- Create: `src/app/locations/krasnodar/page.tsx`
- Create: `src/app/locations/yablonovskiy/page.tsx`
- Create: `src/app/delivery/page.tsx`
- Create: `src/app/contacts/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

### Shared UI

- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/mobile-contact-bar.tsx`
- Create: `src/components/cta/contact-buttons.tsx`
- Create: `src/components/catalog/bouquet-card.tsx`
- Create: `src/components/shared/section-heading.tsx`
- Create: `src/components/shared/breadcrumbs.tsx`
- Create: `src/components/shared/faq-list.tsx`
- Create: `src/components/shared/review-list.tsx`
- Create: `src/components/seo/json-ld.tsx`

### Content and Helpers

- Create: `src/data/site-config.ts`
- Create: `src/data/categories.ts`
- Create: `src/data/locations.ts`
- Create: `src/data/bouquets.ts`
- Create: `src/data/occasions.ts`
- Create: `src/data/faqs.ts`
- Create: `src/data/reviews.ts`
- Create: `src/lib/utils.ts`
- Create: `src/lib/content/schemas.ts`
- Create: `src/lib/content/catalog.ts`
- Create: `src/lib/content/blog.ts`
- Create: `src/lib/analytics/metrica.ts`
- Create: `src/lib/seo/metadata.ts`
- Create: `src/lib/seo/structured-data.ts`
- Create: `src/content/blog/.gitkeep`

### Public Assets

- Create: `public/images/bouquets/.gitkeep`
- Create: `public/images/reviews/.gitkeep`

### Tests

- Create: `tests/unit/smoke/app-shell.test.tsx`
- Create: `tests/unit/content/catalog.test.ts`
- Create: `tests/unit/content/blog.test.ts`
- Create: `tests/unit/analytics/metrica.test.ts`
- Create: `tests/unit/seo/metadata.test.ts`
- Create: `tests/unit/seo/structured-data.test.ts`
- Create: `tests/unit/components/contact-buttons.test.tsx`
- Create: `tests/unit/routes/static-params.test.ts`
- Create: `tests/unit/routes/sitemap.test.ts`

## Launch Content Targets

- `10-12` bouquet entries in `src/data/bouquets.ts`
- `4` composition categories: `myasnye`, `rybnye`, `sladkie`, `fruktovye`
- `4` initial occasion pages:
  - `muzhskie`
  - `23-fevralya`
  - `den-rozhdeniya`
  - `podarok-kollege`
- `2` location pages:
  - `krasnodar`
  - `yablonovskiy`
- FAQ entries for delivery, ordering, and composition changes
- Real customer reviews and real bouquet photos before launch

## Shared Data Shapes

Use these shapes consistently across content files:

```ts
export type ChannelId = 'whatsapp' | 'telegram' | 'avito';
export type CategorySlug = 'myasnye' | 'rybnye' | 'sladkie' | 'fruktovye';
export type LocationSlug = 'krasnodar' | 'yablonovskiy';

export interface BouquetEntry {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: CategorySlug;
  tags: string[];
  priceFrom: number;
  images: { src: string; alt: string }[];
  composition: string[];
  weightOrSize: string;
  deliveryNote: string;
  availableLocations: LocationSlug[];
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}
```

## Task 1: Bootstrap The Workspace

**Files:**
- Create: `.gitignore`
- Create: `.env.example`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Test: `tests/unit/smoke/app-shell.test.tsx`

- [ ] **Step 1: Initialize git and ignore generated files**

Create `.gitignore` with at least:

```gitignore
node_modules
.next
coverage
.env.local
.DS_Store
.superpowers
```

Run: `git init`
Expected: `Initialized empty Git repository`

- [ ] **Step 2: Create the package manifest and install dependencies**

Write `package.json` scripts as:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Run: `npm init -y`
Run: `npm install next react react-dom zod gray-matter next-mdx-remote remark-gfm`
Run: `npm install -D typescript @types/node @types/react @types/react-dom eslint eslint-config-next @eslint/eslintrc tailwindcss @tailwindcss/postcss vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths`
Expected: install completes without audit-blocking failures

- [ ] **Step 3: Add framework, lint, test, and env configuration**

Create:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

```env
# .env.example
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
});
```

- [ ] **Step 4: Create a minimal app shell and a failing smoke test**

Create the failing test first:

```tsx
// tests/unit/smoke/app-shell.test.tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders the launch heading', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { name: /съедобные букеты/i })).toBeInTheDocument();
});
```

Run: `npm test -- tests/unit/smoke/app-shell.test.tsx`
Expected: FAIL because the app shell is not implemented yet

- [ ] **Step 5: Implement the minimum app shell to satisfy the smoke test**

Create:

```tsx
// src/app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Съедобные букеты в Краснодаре и Яблоновском</h1>
    </main>
  );
}
```

Also create:

- `src/app/layout.tsx` with `<html lang="ru">`
- `src/app/globals.css` with Tailwind import and base CSS variables
- `src/test/setup.ts` with `import '@testing-library/jest-dom';`

- [ ] **Step 6: Verify the baseline**

Run: `npm test -- tests/unit/smoke/app-shell.test.tsx`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run typecheck`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 7: Commit**

Run:

```bash
git add .gitignore .env.example package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts src/test/setup.ts src/app/layout.tsx src/app/page.tsx src/app/globals.css tests/unit/smoke/app-shell.test.tsx
git commit -m "chore: bootstrap next app workspace"
```

## Task 2: Define Structured Content And Catalog Helpers

**Files:**
- Create: `src/data/site-config.ts`
- Create: `src/data/categories.ts`
- Create: `src/data/locations.ts`
- Create: `src/data/bouquets.ts`
- Create: `src/data/occasions.ts`
- Create: `src/data/faqs.ts`
- Create: `src/data/reviews.ts`
- Create: `src/lib/content/schemas.ts`
- Create: `src/lib/content/catalog.ts`
- Test: `tests/unit/content/catalog.test.ts`

- [ ] **Step 1: Write the failing catalog test**

Create:

```ts
import { bouquets, categories, locations, occasions } from '@/lib/content/catalog';

test('launch content covers the required catalog surface', () => {
  expect(categories.map((item) => item.slug)).toEqual([
    'myasnye',
    'rybnye',
    'sladkie',
    'fruktovye',
  ]);
  expect(locations.map((item) => item.slug)).toEqual(['krasnodar', 'yablonovskiy']);
  expect(bouquets.length).toBeGreaterThanOrEqual(10);
  expect(occasions.length).toBeGreaterThanOrEqual(4);
  expect(new Set(bouquets.map((item) => item.category))).toEqual(
    new Set(['myasnye', 'rybnye', 'sladkie', 'fruktovye']),
  );
});
```

Run: `npm test -- tests/unit/content/catalog.test.ts`
Expected: FAIL because catalog helpers and content files do not exist

- [ ] **Step 2: Implement typed schemas and content sources**

Add `zod` schemas in `src/lib/content/schemas.ts` for:

- contact channel config
- category entries
- location entries
- bouquet entries
- occasion entries
- FAQ entries
- review entries

Seed `src/data/bouquets.ts` with `10-12` entries using real launch slugs, for example:

```ts
{
  slug: 'muzhskoy-hit',
  name: 'Букет "Мужской хит"',
  shortDescription: 'Колбасы, сыр и орехи в плотной подарочной упаковке.',
  fullDescription: 'Эффектный мясной букет для дня рождения, 23 февраля и подарка мужчине.',
  category: 'myasnye',
  tags: ['мужской', 'с орехами', 'на 23 февраля'],
  priceFrom: 3400,
  images: [{ src: '/images/bouquets/muzhskoy-hit-1.jpg', alt: 'Мясной съедобный букет Мужской хит' }],
  composition: ['колбасы', 'сыр', 'орехи', 'декор'],
  weightOrSize: 'Средний размер',
  deliveryNote: 'Доставка по Краснодару и Яблоновскому в день заказа по согласованию.',
  availableLocations: ['krasnodar', 'yablonovskiy'],
  featured: true,
  seoTitle: 'Мясной съедобный букет в Краснодаре | Мужской хит',
  seoDescription: 'Мясной букет с доставкой по Краснодару и Яблоновскому. Подходит на день рождения и 23 февраля.'
}
```

- [ ] **Step 3: Implement the catalog facade**

Create `src/lib/content/catalog.ts` with exports:

```ts
export { default as siteConfig } from '@/data/site-config';
export { categories } from '@/data/categories';
export { locations } from '@/data/locations';
export { bouquets } from '@/data/bouquets';
export { occasions } from '@/data/occasions';
export { faqs } from '@/data/faqs';
export { reviews } from '@/data/reviews';

export function getBouquetBySlug(slug: string) { /* ... */ }
export function getBouquetsByCategory(category: CategorySlug) { /* ... */ }
export function getOccasionBySlug(slug: string) { /* ... */ }
export function getLocationBySlug(slug: LocationSlug) { /* ... */ }
```

Validate imported arrays once at module load so bad content fails fast during build.

- [ ] **Step 4: Verify content coverage**

Run: `npm test -- tests/unit/content/catalog.test.ts`
Expected: PASS

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

Run:

```bash
git add src/data/site-config.ts src/data/categories.ts src/data/locations.ts src/data/bouquets.ts src/data/occasions.ts src/data/faqs.ts src/data/reviews.ts src/lib/content/schemas.ts src/lib/content/catalog.ts tests/unit/content/catalog.test.ts
git commit -m "feat: add typed catalog content"
```

## Task 3: Build Analytics, Metadata, And Structured Data Helpers

**Files:**
- Create: `src/lib/analytics/metrica.ts`
- Create: `src/lib/seo/metadata.ts`
- Create: `src/lib/seo/structured-data.ts`
- Test: `tests/unit/analytics/metrica.test.ts`
- Test: `tests/unit/seo/metadata.test.ts`
- Test: `tests/unit/seo/structured-data.test.ts`

- [ ] **Step 1: Write the failing helper tests**

Create test cases for:

- `buildMetadata()` returning canonical URLs and Russian titles
- `trackCtaClick()` safely no-oping when Metrica is unavailable
- `buildBouquetProductJsonLd()` producing `Product` + `Offer` fields

Example metadata test:

```ts
import { buildMetadata } from '@/lib/seo/metadata';

test('buildMetadata returns canonical URL for route path', () => {
  const metadata = buildMetadata({
    title: 'Каталог',
    description: 'Каталог съедобных букетов',
    path: '/catalog',
  });

  expect(metadata.alternates?.canonical).toBe('http://localhost:3000/catalog');
});
```

Run: `npm test -- tests/unit/analytics/metrica.test.ts tests/unit/seo/metadata.test.ts tests/unit/seo/structured-data.test.ts`
Expected: FAIL because helpers do not exist

- [ ] **Step 2: Implement metadata and structured data helpers**

Create:

```ts
export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: `${baseUrl}${input.path}`,
    },
  };
}
```

Also implement:

- `buildOrganizationJsonLd()`
- `buildBreadcrumbJsonLd()`
- `buildBouquetProductJsonLd()`

- [ ] **Step 3: Implement the Yandex Metrica tracking helper**

Create:

```ts
declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function trackCtaClick(channel: 'whatsapp' | 'telegram' | 'avito', source: string) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return;
  }

  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!counterId) {
    return;
  }

  window.ym(Number(counterId), 'reachGoal', 'contact_click', { channel, source });
}
```

- [ ] **Step 4: Verify helper modules**

Run: `npm test -- tests/unit/analytics/metrica.test.ts tests/unit/seo/metadata.test.ts tests/unit/seo/structured-data.test.ts`
Expected: PASS

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

Run:

```bash
git add src/lib/analytics/metrica.ts src/lib/seo/metadata.ts src/lib/seo/structured-data.ts tests/unit/analytics/metrica.test.ts tests/unit/seo/metadata.test.ts tests/unit/seo/structured-data.test.ts
git commit -m "feat: add seo and analytics helpers"
```

## Task 4: Implement Shared Layout And CTA Components

**Files:**
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/mobile-contact-bar.tsx`
- Create: `src/components/cta/contact-buttons.tsx`
- Create: `src/components/catalog/bouquet-card.tsx`
- Create: `src/components/shared/section-heading.tsx`
- Create: `src/components/shared/breadcrumbs.tsx`
- Create: `src/components/shared/faq-list.tsx`
- Create: `src/components/shared/review-list.tsx`
- Create: `src/components/seo/json-ld.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/unit/components/contact-buttons.test.tsx`

- [ ] **Step 1: Write the failing contact-buttons test**

Create:

```tsx
import { render, screen } from '@testing-library/react';
import { ContactButtons } from '@/components/cta/contact-buttons';

test('renders all configured lead channels', () => {
  render(<ContactButtons source="hero" />);

  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /telegram/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /avito/i })).toBeInTheDocument();
});
```

Run: `npm test -- tests/unit/components/contact-buttons.test.tsx`
Expected: FAIL because shared components do not exist

- [ ] **Step 2: Implement the shared components**

Requirements:

- header with compact navigation
- footer with service areas and quick links
- sticky mobile contact bar
- contact button group using `siteConfig.channels`
- bouquet card with image, title, price-from, tags, and CTA
- FAQ list and review list for reusable page sections
- JSON-LD wrapper component for `<script type="application/ld+json">`

- [ ] **Step 3: Implement the visual system in global CSS**

Set CSS variables for the approved direction:

```css
:root {
  --background: #fbf8f2;
  --surface: #f4efe6;
  --card: #fffdf9;
  --text: #2f3426;
  --muted: #625d4f;
  --accent: #556b4f;
  --accent-strong: #3f523a;
  --line: #ddd3bf;
}
```

Add:

- generous mobile spacing
- rounded cards
- strong image containers
- thumb-friendly CTA sizing

- [ ] **Step 4: Wire the global shell**

Update `src/app/layout.tsx` to include:

- `SiteHeader`
- `SiteFooter`
- `MobileContactBar`
- Yandex Metrica bootstrap script only when `NEXT_PUBLIC_YANDEX_METRIKA_ID` is present

- [ ] **Step 5: Verify the shared UI**

Run: `npm test -- tests/unit/components/contact-buttons.test.tsx`
Expected: PASS

Run: `npm run lint`
Expected: PASS

- [ ] **Step 6: Commit**

Run:

```bash
git add src/components/layout/site-header.tsx src/components/layout/site-footer.tsx src/components/layout/mobile-contact-bar.tsx src/components/cta/contact-buttons.tsx src/components/catalog/bouquet-card.tsx src/components/shared/section-heading.tsx src/components/shared/breadcrumbs.tsx src/components/shared/faq-list.tsx src/components/shared/review-list.tsx src/components/seo/json-ld.tsx src/app/layout.tsx src/app/globals.css tests/unit/components/contact-buttons.test.tsx
git commit -m "feat: add shared layout and conversion components"
```

## Task 5: Build The Homepage And Catalog Pages

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/catalog/page.tsx`
- Create: `src/app/catalog/[category]/page.tsx`
- Test: `tests/unit/routes/static-params.test.ts`

- [ ] **Step 1: Write the failing static-params test**

Create:

```ts
import { generateStaticParams as generateCategoryParams } from '@/app/catalog/[category]/page';

test('category route generates all category params', async () => {
  await expect(generateCategoryParams()).resolves.toEqual([
    { category: 'myasnye' },
    { category: 'rybnye' },
    { category: 'sladkie' },
    { category: 'fruktovye' },
  ]);
});
```

Run: `npm test -- tests/unit/routes/static-params.test.ts`
Expected: FAIL because category pages do not exist

- [ ] **Step 2: Implement the homepage**

Build sections in `src/app/page.tsx` for:

- hero with service area and primary CTAs
- category grid
- featured bouquets
- how ordering works
- FAQ teaser
- review teaser

Homepage content should visually support:

- local trust
- product photography
- immediate contact

- [ ] **Step 3: Implement catalog index and category pages**

Requirements:

- `src/app/catalog/page.tsx` lists the four composition categories and featured bouquets
- `src/app/catalog/[category]/page.tsx` renders HTML bouquet cards for the selected category
- invalid categories call `notFound()`
- category pages include intro copy and contextual links to occasions and locations

- [ ] **Step 4: Verify catalog routing**

Run: `npm test -- tests/unit/routes/static-params.test.ts`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

Run:

```bash
git add src/app/page.tsx src/app/catalog/page.tsx src/app/catalog/[category]/page.tsx tests/unit/routes/static-params.test.ts
git commit -m "feat: add homepage and catalog pages"
```

## Task 6: Build Bouquet Detail Pages

**Files:**
- Create: `src/app/bouquets/[slug]/page.tsx`
- Modify: `tests/unit/routes/static-params.test.ts`

- [ ] **Step 1: Extend the failing route test for bouquet detail params**

Add:

```ts
import { generateStaticParams as generateBouquetParams } from '@/app/bouquets/[slug]/page';
import { bouquets } from '@/lib/content/catalog';

test('bouquet route generates one param per bouquet', async () => {
  await expect(generateBouquetParams()).resolves.toEqual(
    bouquets.map((item) => ({ slug: item.slug })),
  );
});
```

Run: `npm test -- tests/unit/routes/static-params.test.ts`
Expected: FAIL because bouquet page does not exist

- [ ] **Step 2: Implement the bouquet page**

The page must include:

- breadcrumb navigation
- large primary image
- bouquet title
- price-from
- composition list
- tags
- delivery note
- dual CTA placement
- related bouquets section
- `Product` JSON-LD

- [ ] **Step 3: Add page metadata**

Use `generateMetadata()` with bouquet-level `seoTitle` and `seoDescription`.

- [ ] **Step 4: Verify bouquet pages**

Run: `npm test -- tests/unit/routes/static-params.test.ts`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

Run:

```bash
git add src/app/bouquets/[slug]/page.tsx tests/unit/routes/static-params.test.ts
git commit -m "feat: add bouquet detail pages"
```

## Task 7: Build Occasion And Location Landing Pages

**Files:**
- Create: `src/app/occasions/[slug]/page.tsx`
- Create: `src/app/locations/krasnodar/page.tsx`
- Create: `src/app/locations/yablonovskiy/page.tsx`
- Modify: `tests/unit/routes/static-params.test.ts`

- [ ] **Step 1: Extend the failing route test for occasion params**

Add:

```ts
import { generateStaticParams as generateOccasionParams } from '@/app/occasions/[slug]/page';
import { occasions } from '@/lib/content/catalog';

test('occasion route generates one param per occasion page', async () => {
  await expect(generateOccasionParams()).resolves.toEqual(
    occasions.map((item) => ({ slug: item.slug })),
  );
});
```

Run: `npm test -- tests/unit/routes/static-params.test.ts`
Expected: FAIL because occasion pages do not exist

- [ ] **Step 2: Implement occasion landing pages**

Requirements:

- unique intro copy from `src/data/occasions.ts`
- curated bouquet grid from `relatedBouquetSlugs`
- contextual FAQ when available
- strong internal links back to categories and local pages

- [ ] **Step 3: Implement location pages**

Requirements:

- unique copy for Krasnodar vs Yablonovskiy
- service/delivery notes specific to each location
- relevant featured bouquets
- strong CTAs without publishing a home address

- [ ] **Step 4: Verify SEO landing routes**

Run: `npm test -- tests/unit/routes/static-params.test.ts`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

Run:

```bash
git add src/app/occasions/[slug]/page.tsx src/app/locations/krasnodar/page.tsx src/app/locations/yablonovskiy/page.tsx tests/unit/routes/static-params.test.ts
git commit -m "feat: add occasion and location landing pages"
```

## Task 8: Build Support Pages And Blog Scaffold

**Files:**
- Create: `src/app/delivery/page.tsx`
- Create: `src/app/contacts/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/lib/content/blog.ts`
- Create: `src/content/blog/.gitkeep`

- [ ] **Step 1: Write the failing blog helper test**

Create a simple test case that verifies an empty blog directory returns an empty list rather than crashing.

Example:

```ts
import { getAllBlogPosts } from '@/lib/content/blog';

test('returns an empty list when no blog posts exist yet', async () => {
  await expect(getAllBlogPosts()).resolves.toEqual([]);
});
```

Run: `npm test -- tests/unit/content/blog.test.ts`
Expected: FAIL because the helper does not exist

- [ ] **Step 2: Implement delivery and contacts pages**

`/delivery` must explain:

- service area
- same-day expectations
- ordering flow in messengers
- composition-change policy

`/contacts` must emphasize:

- WhatsApp
- Telegram
- Avito
- service areas
- no public address in V1

- [ ] **Step 3: Implement the blog scaffold**

Create `src/lib/content/blog.ts` with helpers:

```ts
export async function getAllBlogPosts() { /* read src/content/blog */ }
export async function getBlogPostBySlug(slug: string) { /* return parsed MDX or null */ }
```

Behavior:

- `/blog` renders a useful empty state if no posts exist
- `/blog/[slug]` returns `notFound()` for missing posts

- [ ] **Step 4: Add the shared not-found page**

Create `src/app/not-found.tsx` with:

- clear “page not found” copy
- links back to catalog, delivery, and homepage

- [ ] **Step 5: Verify support pages and blog scaffold**

Run: `npm test -- tests/unit/content/blog.test.ts`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

Run:

```bash
git add src/app/delivery/page.tsx src/app/contacts/page.tsx src/app/blog/page.tsx src/app/blog/[slug]/page.tsx src/app/not-found.tsx src/lib/content/blog.ts src/content/blog/.gitkeep tests/unit/content/blog.test.ts
git commit -m "feat: add support pages and blog scaffold"
```

## Task 9: Add Robots, Sitemap, And Final Metadata Wiring

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Test: `tests/unit/routes/sitemap.test.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the failing sitemap test**

Create:

```ts
import sitemap from '@/app/sitemap';

test('sitemap includes the main commercial routes', async () => {
  const entries = await sitemap();
  const urls = entries.map((item) => item.url);

  expect(urls).toContain('http://localhost:3000/');
  expect(urls).toContain('http://localhost:3000/catalog');
  expect(urls).toContain('http://localhost:3000/locations/krasnodar');
});
```

Run: `npm test -- tests/unit/routes/sitemap.test.ts`
Expected: FAIL because sitemap route does not exist

- [ ] **Step 2: Implement `robots.ts` and `sitemap.ts`**

`robots.ts` should:

- allow indexing
- point to sitemap

`sitemap.ts` should include:

- homepage
- catalog
- category pages
- bouquet pages
- occasion pages
- location pages
- delivery
- contacts
- blog index

- [ ] **Step 3: Finalize shared metadata**

Update `src/app/layout.tsx` metadata export to set:

- site title template
- default description
- open graph defaults
- metadata base from `NEXT_PUBLIC_SITE_URL`

- [ ] **Step 4: Verify SEO plumbing**

Run: `npm test -- tests/unit/routes/sitemap.test.ts`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

Run:

```bash
git add src/app/robots.ts src/app/sitemap.ts src/app/layout.tsx tests/unit/routes/sitemap.test.ts
git commit -m "feat: add sitemap and metadata plumbing"
```

## Task 10: Populate Launch Content, Assets, And Final QA

**Files:**
- Modify: `src/data/bouquets.ts`
- Modify: `src/data/occasions.ts`
- Modify: `src/data/faqs.ts`
- Modify: `src/data/reviews.ts`
- Modify: `src/data/locations.ts`
- Modify: `public/images/bouquets/*`
- Modify: `public/images/reviews/*`

- [ ] **Step 1: Replace placeholder copy and images with launch content**

Before touching code, prepare:

- `10-12` real bouquet photo sets
- `3-5` real reviews
- final FAQ answers
- final delivery wording for Krasnodar and Yablonovskiy

Then update the content files and asset folders with real launch material.

- [ ] **Step 2: Verify category, occasion, and location coverage manually**

Check that:

- each category page has enough relevant bouquet cards
- occasion pages do not feel like city-name swaps
- location pages have distinct local copy
- FAQ answers are specific, not generic filler

- [ ] **Step 3: Run the full automated verification suite**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run typecheck`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Run a manual launch checklist**

Open these routes locally and verify mobile and desktop:

- `/`
- `/catalog`
- one category page
- one bouquet page
- one occasion page
- `/locations/krasnodar`
- `/locations/yablonovskiy`
- `/delivery`
- `/contacts`
- `/blog`

Confirm:

- sticky mobile CTA is visible
- all three lead channels open valid URLs
- metadata is present in page source
- no route crashes on refresh

- [ ] **Step 5: Commit**

Run:

```bash
git add src/data/bouquets.ts src/data/occasions.ts src/data/faqs.ts src/data/reviews.ts src/data/locations.ts public/images/bouquets public/images/reviews
git commit -m "feat: add launch-ready bouquet content"
```

## Completion Notes

- Keep V1 focused on lead generation, not checkout.
- Do not add NestJS, a database, or a CMS unless the scope changes.
- If the user later wants self-pickup, business address publication, or a dashboard, add them as a new spec/plan cycle instead of folding them into this build.

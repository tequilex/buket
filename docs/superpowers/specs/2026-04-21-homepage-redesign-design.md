# Homepage Redesign — Design Spec

**Date:** 2026-04-21  
**Branch:** redisgn  
**Source design:** `primer.html` (Fresh Modern theme)  
**Approach:** CSS layer-over — reuse existing components, apply new visual via CSS variables and updated styles.

---

## Goals

Apply the primer.html "Fresh Modern" visual design to the existing Next.js homepage without breaking SEO:
- Keep all existing routes, metadata, H1 text, robots.ts, sitemap.ts unchanged
- Add new visual sections (About, hero stats, CTA block)
- Modernise typography, colour palette, spacing

---

## 1. Global Styles

**File:** `src/app/globals.scss`

Replace current CSS variables with primer.html Fresh Modern palette:

```
--bg: #ffffff
--bg2: oklch(0.97 0.01 145)   // section backgrounds
--bg3: oklch(0.94 0.02 145)   // card backgrounds
--fg: oklch(0.15 0.02 200)    // primary text
--fg2: oklch(0.45 0.02 200)   // secondary text
--accent: oklch(0.55 0.18 145)
--accent2: oklch(0.62 0.18 42)
--accent-light: oklch(0.94 0.06 145)
--card: #ffffff
--border: oklch(0.90 0.02 145)
--shadow: 0 2px 16px oklch(0.55 0.18 145 / 0.12)
--radius: 12px
--font-head: var(--font-montserrat), sans-serif
--font-body: var(--font-montserrat), sans-serif
```

`.page-shell` → remove max-width constraint (sections go full-width); inner containers use `max-width: 1200px` via `.container` utility class added to globals.

**File:** `src/app/layout.tsx`

Add `next/font/google` Montserrat (weights 400, 500, 600, 700), expose as `--font-montserrat` CSS variable on `<html>`.

---

## 2. SiteHeader

**File:** `src/components/layout/site-header.tsx` + `site-header.module.scss`

- `position: fixed`, `top: 0`, `z-index: 100`
- `backdrop-filter: blur(12px)`, semi-transparent background
- Height `64px`, flex row: logo left, nav links center, CTA button right
- Logo: two lines — `GASTRO BUKET` (700 weight, letter-spacing) + `Искусство вкусных подарков` (9px, uppercase, muted)
- Nav links: 13px, letter-spacing, color `var(--fg2)`, hover `var(--accent)`
- CTA button: `background: var(--accent)`, white text, `border-radius: var(--radius)`
- Mobile: hide nav links (already handled by MobileContactBar)
- Main content gets `padding-top: 64px` to offset fixed header

---

## 3. Hero Section

**File:** `src/app/page.tsx` + `src/app/page.module.scss`

Structure:
```
<section class="hero">
  <div class="hero-bg" />          // IMG_9631.PNG, cover
  <div class="hero-overlay" />     // dark overlay
  <div class="hero-content">
    <div class="hero-tag">пгт. Яблоновский · Краснодар</div>
    <h1>...</h1>                   // existing SEO text, unchanged
    <p>...</p>                     // existing description
    <div class="hero-btns">
      Смотреть каталог | Заказать
    </div>
  </div>
  <div class="hero-stats">         // bottom-right
    500+ Букетов | 4 Категории | 2–5к Рублей
  </div>
</section>
```

Styles:
- `min-height: 100vh`, background image + overlay
- Content: `position: relative; z-index: 2`, left-aligned
- H1: `clamp(42px, 6vw, 76px)`, white, Montserrat 700
- Stats: absolute bottom-right, white text

---

## 4. Catalog Section

**File:** `src/app/page.tsx` + `src/app/page.module.scss`

- Background: `var(--bg2)`
- `SectionHeading` eyebrow/title/desc kept as-is
- Category grid: styled as accent-bordered tiles, hover fill `var(--accent-light)`
- Featured bouquets grid: `auto-fill, minmax(260px, 1fr)`, 24px gap

**File:** `src/components/catalog/bouquet-card.tsx` + module

- `background: var(--card)`, `border-radius: var(--radius)`, `border: 1px solid var(--border)`
- `box-shadow: var(--shadow)`
- Hover: `translateY(-4px)`, deeper shadow
- Image: `height: 220px`, `object-fit: cover`
- Price: `var(--accent)`, 22px, bold
- Order button: `var(--accent)` background

---

## 5. About Section (new)

**File:** `src/app/page.tsx` — new section inserted between catalog and "Как заказать"

Two-column grid (1fr 1fr, gap 80px):
- Left: `IMG_9632.PNG`, aspect-ratio 4/5, border-radius, accent badge overlay (5★ Рейтинг)
- Right: section-label, H2 "Мы делаем съедобное искусство", description, 3 feature rows:
  - 🦞 Только свежее
  - 🎨 Ручная работа
  - 🚚 Быстрая доставка

Mobile: single column.

---

## 6. How to Order Section

**File:** `src/app/page.tsx` — update existing order section

- Background: `var(--bg2)`
- 4 steps (add step 4: «Получите подарок — Доставим свежим и красиво упакованным»)
- Step numbers: 64px circle, `var(--accent)` background, white text
- CTA block below steps: `var(--accent)` background, H3 "Готовы сделать заказ?", WhatsApp link button (white bg, accent text)

---

## 7. FAQ Section

Kept as-is structurally. Gets new visual via CSS variables:
- Section background: `var(--bg)`
- `SectionHeading` updates automatically via global styles

---

## 8. Reviews Section

**File:** `src/components/shared/review-list.tsx` + module

- 3-column grid (1fr 1fr 1fr), gap 24px
- Card: `background: var(--card)`, border, shadow, padding 28px
- Stars: `var(--accent)` color
- Text: italic, `var(--fg2)`
- Avatar: circle, `var(--accent-light)` bg, initials

Mobile: single column.

---

## 9. SiteFooter

**File:** `src/components/layout/site-footer.tsx` + `site-footer.module.scss`

- Background: `var(--fg)` (dark)
- Text: `var(--bg)` (white/light)
- Logo centered: GASTRO BUKET, large, letter-spacing
- Subtitle: «Искусство вкусных подарков · пгт. Яблоновский, Краснодар»
- Padding: 40px 0

---

## SEO Invariants (never touch)

- `src/app/layout.tsx` → `metadata` object unchanged
- `src/app/robots.ts` unchanged
- `src/app/sitemap.ts` unchanged
- H1 text in `page.tsx` unchanged
- All href/Link routes unchanged
- Yandex Metrica script unchanged

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/globals.scss` | New CSS variables, font vars, container utility |
| `src/app/layout.tsx` | Add Montserrat font |
| `src/app/page.tsx` | Hero structure, About section, updated order steps |
| `src/app/page.module.scss` | Full visual update |
| `src/components/layout/site-header.tsx` | Fixed nav, new logo style |
| `src/components/layout/site-header.module.scss` | New header styles |
| `src/components/layout/site-footer.tsx` | Dark footer |
| `src/components/layout/site-footer.module.scss` | Dark footer styles |
| `src/components/catalog/bouquet-card.tsx` | New card styles (minor) |
| `src/components/catalog/bouquet-card.module.scss` | Full card restyle |
| `src/components/shared/review-list.tsx` | Grid layout |
| `src/components/shared/review-list.module.scss` | Card styles |

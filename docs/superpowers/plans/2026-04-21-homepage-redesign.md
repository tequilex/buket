# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the primer.html "Fresh Modern" visual design to the existing Next.js homepage — new palette, Montserrat font, full-screen hero with bg image, About section, restyled cards and footer — without touching any SEO surfaces.

**Architecture:** CSS layer-over approach — all existing components and routes are preserved. New CSS custom properties replace the old palette in `globals.scss`, with aliases kept so inner pages don't break. New JSX is added only for hero stats and the About section. Everything else is a pure SCSS change.

**Tech Stack:** Next.js 16, TypeScript, SCSS Modules, `next/font/google` (Montserrat), Vitest + Testing Library

---

## File Map

| File | What changes |
|------|-------------|
| `src/app/globals.scss` | New CSS vars + old-name aliases, body font-family |
| `src/app/layout.tsx` | Add Montserrat via `next/font/google` with `variable` prop |
| `src/app/layout.module.scss` | Add `padding-top: 64px` to `.main` |
| `src/app/page.tsx` | Hero (bg image, overlay, tag, stats), About section, 4 order steps |
| `src/app/page.module.scss` | Full visual restyle |
| `src/components/layout/site-header.tsx` | Fixed position, two-line logo, CTA button |
| `src/components/layout/site-header.module.scss` | Fixed nav styles |
| `src/components/layout/site-footer.module.scss` | Dark footer styles |
| `src/components/catalog/bouquet-card.module.scss` | New card shadow/hover/radius |
| `src/components/shared/review-list.module.scss` | Card style, 3-col grid from 768px |
| `src/components/home/hero-featured-carousel.module.scss` | Token updates to new var names |

---

## Task 1: Global palette + font wiring

**Files:**
- Modify: `src/app/globals.scss`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/layout.module.scss`

- [ ] **Step 1: Replace CSS variables in globals.scss**

Replace the entire `:root` block and `body` font-family:

```scss
:root {
  /* New Fresh Modern palette */
  --bg: #ffffff;
  --bg2: oklch(0.97 0.01 145);
  --bg3: oklch(0.94 0.02 145);
  --fg: oklch(0.15 0.02 200);
  --fg2: oklch(0.45 0.02 200);
  --accent: oklch(0.55 0.18 145);
  --accent2: oklch(0.62 0.18 42);
  --accent-light: oklch(0.94 0.06 145);
  --card: #ffffff;
  --border: oklch(0.90 0.02 145);
  --shadow: 0 2px 16px oklch(0.55 0.18 145 / 0.12);
  --radius: 12px;

  /* Aliases — keep old names so inner pages (catalog, contacts, delivery, etc.) don't break */
  --background: var(--bg);
  --surface: var(--bg2);
  --text: var(--fg);
  --muted: var(--fg2);
  --line: var(--border);
  --shadow-soft: var(--shadow);
  --accent-strong: oklch(0.45 0.18 145);
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
  font-family: var(--font-montserrat), 'Segoe UI', sans-serif;
}
```

Also add `.container` utility class (used in hero and sections):

```scss
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

And remove the `max-width` from `.page-shell` (sections go full-width now):

```scss
.page-shell {
  margin: 0;
  max-width: none;
  padding: 0;
}
```

- [ ] **Step 2: Add Montserrat font in layout.tsx**

At the top of `src/app/layout.tsx`, add:

```tsx
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});
```

Then apply both `className` and `variable` to `<html>`:

```tsx
<html lang="ru" className={montserrat.variable}>
```

- [ ] **Step 3: Add padding-top to .main in layout.module.scss**

```scss
.main {
  padding-top: 64px;
  padding-bottom: 7rem;
}
```

- [ ] **Step 4: Run build to check for errors**

```bash
cd /Users/tequilex/Desktop/buket && npm run build
```

Expected: build completes without errors.

- [ ] **Step 5: Run tests**

```bash
npm run test
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.scss src/app/layout.tsx src/app/layout.module.scss
git commit -m "feat: apply Fresh Modern palette and Montserrat font"
```

---

## Task 2: SiteHeader — fixed nav

**Files:**
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/site-header.module.scss`

- [ ] **Step 1: Update site-header.tsx**

Replace the file content:

```tsx
import Link from 'next/link';
import styles from './site-header.module.scss';

const navItems = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/locations/krasnodar', label: 'Краснодар' },
  { href: '/locations/yablonovskiy', label: 'Яблоновский' },
  { href: '/contacts', label: 'Контакты' },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMain}>GASTRO BUKET</span>
          <span className={styles.brandSub}>Искусство вкусных подарков</span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/catalog" className={styles.cta}>
          Заказать букет
        </Link>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Update site-header.module.scss**

```scss
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
  background: oklch(from var(--bg) l c h / 0.92);
  backdrop-filter: blur(12px);
  transition: all 0.3s;
}

.inner {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 32px;
  padding: 0 24px;
}

.brand {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-decoration: none;
  color: var(--fg);
  min-width: 0;
}

.brandMain {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.brandSub {
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--fg2);
  margin-top: 3px;
}

.nav {
  display: none;
  align-items: center;
  gap: 28px;
  list-style: none;
}

.navLink {
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--fg2);
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--accent);
  }
}

.cta {
  background: var(--accent);
  color: white;
  padding: 10px 22px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  border-radius: var(--radius);
  transition: opacity 0.2s, transform 0.15s;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }
}

@media (min-width: 768px) {
  .nav {
    display: flex;
  }
}
```

- [ ] **Step 3: Run tests**

```bash
npm run test
```

Expected: all pass (the smoke test renders the header).

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/site-header.tsx src/components/layout/site-header.module.scss
git commit -m "feat: redesign site header — fixed nav with new logo and CTA"
```

---

## Task 3: SiteFooter — dark theme

**Files:**
- Modify: `src/components/layout/site-footer.module.scss`

No changes to `site-footer.tsx` — keep all links and content. Only the SCSS changes.

- [ ] **Step 1: Update site-footer.module.scss**

```scss
.footer {
  background: var(--fg);
  color: var(--bg);
  padding: 40px 0;
}

.inner {
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.brandBlock {
  display: grid;
  gap: 0.75rem;
}

.eyebrow {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--bg);
}

.description {
  max-width: 32rem;
  color: oklch(1 0 0 / 0.6);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.title {
  margin: 0 0 0.75rem;
  color: var(--bg);
  font-size: 0.875rem;
  font-weight: 600;
}

.list {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
}

.link {
  color: oklch(1 0 0 / 0.6);
  transition: color 160ms ease;

  &:hover {
    color: var(--bg);
  }
}

@media (min-width: 1024px) {
  .inner {
    grid-template-columns: 1.4fr 1fr 1fr;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/site-footer.module.scss
git commit -m "feat: redesign site footer — dark background"
```

---

## Task 4: Hero section — full-screen with bg image

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.scss`
- Test: `tests/unit/smoke/app-shell.test.tsx`

- [ ] **Step 1: Write a test for hero stats**

Add to `tests/unit/smoke/app-shell.test.tsx` (or create `tests/unit/components/homepage-hero.test.tsx`):

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders hero section with stats', () => {
  render(<HomePage />);
  expect(screen.getByText(/500\+/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- --reporter=verbose 2>&1 | grep "hero section"
```

Expected: FAIL (stats not yet in DOM).

- [ ] **Step 3: Update the hero section in page.tsx**

Replace the `<section className={styles.hero}>` block with:

```tsx
<section className={styles.hero}>
  <div className={styles.heroBg} style={{ backgroundImage: "url('/images/bouquets/IMG_9631.PNG')" }} />
  <div className={styles.heroOverlay} />
  <div className={styles.heroContent}>
    <div className={styles.heroTag}>пгт. Яблоновский · Краснодар</div>
    <div className={styles.heroBody}>
      <h1 className={styles.heroTitle}>
        Съедобные букеты с доставкой в Краснодаре и Яблоновском
      </h1>
      <p className={styles.heroDescription}>
        Мясные, рыбные, сладкие и фруктовые букеты с аккуратной
        подарочной подачей. Удобно заказать через WhatsApp, Telegram или
        Avito и быстро согласовать детали доставки.
      </p>
    </div>
    <div className={styles.heroBtns}>
      <Link href="/catalog" className={styles.btnPrimary}>Смотреть каталог</Link>
      <Link href="/contacts" className={styles.btnSecondary}>Заказать сейчас</Link>
    </div>
  </div>
  <div className={styles.heroStats}>
    <div className={styles.heroStat}>
      <span className={styles.heroStatNum}>500+</span>
      <span className={styles.heroStatLabel}>Букетов</span>
    </div>
    <div className={styles.heroStat}>
      <span className={styles.heroStatNum}>4</span>
      <span className={styles.heroStatLabel}>Категории</span>
    </div>
    <div className={styles.heroStat}>
      <span className={styles.heroStatNum}>2–5к</span>
      <span className={styles.heroStatLabel}>Рублей</span>
    </div>
  </div>
</section>
```

Also remove `<HeroFeaturedCarousel>` from this section (the carousel will be removed from the hero — it doesn't fit the full-screen bg image design). Remove its import too.

- [ ] **Step 4: Update hero styles in page.module.scss**

Replace the hero-related classes (`.hero`, `.heroCopy`, `.heroEyebrow`, `.heroBody`, `.heroTitle`, `.heroDescription`) with:

```scss
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.heroBg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.heroOverlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: oklch(0.15 0.02 200 / 0.45);
}

.heroContent {
  position: relative;
  z-index: 2;
  max-width: 620px;
  padding: 120px 24px 80px;
  margin-left: max(24px, calc((100vw - 1200px) / 2));
  display: grid;
  gap: 1.5rem;
}

.heroTag {
  display: inline-block;
  background: var(--accent);
  color: white;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: var(--radius);
  font-weight: 600;
  width: fit-content;
}

.heroBody {
  display: grid;
  gap: 1rem;
}

.heroTitle {
  font-size: clamp(36px, 5vw, 68px);
  line-height: 1.05;
  color: white;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-wrap: pretty;
}

.heroDescription {
  font-size: 17px;
  line-height: 1.65;
  color: oklch(1 0 0 / 0.85);
  font-weight: 300;
  max-width: 460px;
}

.heroBtns {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.btnPrimary {
  background: var(--accent);
  color: white;
  padding: 16px 32px;
  font-size: 15px;
  font-weight: 600;
  border-radius: var(--radius);
  letter-spacing: 0.04em;
  transition: opacity 0.2s, transform 0.15s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }
}

.btnSecondary {
  background: transparent;
  color: white;
  border: 2px solid oklch(1 0 0 / 0.6);
  padding: 14px 30px;
  font-size: 15px;
  font-weight: 500;
  border-radius: var(--radius);
  letter-spacing: 0.04em;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    border-color: white;
    background: oklch(1 0 0 / 0.1);
  }
}

.heroStats {
  position: absolute;
  bottom: 40px;
  right: max(24px, calc((100vw - 1200px) / 2));
  z-index: 2;
  display: flex;
  gap: 32px;
}

.heroStat {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.heroStatNum {
  font-size: 32px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.heroStatLabel {
  font-size: 11px;
  color: oklch(1 0 0 / 0.7);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .heroStats {
    position: static;
    padding: 0 24px 40px;
    flex-direction: row;
    justify-content: flex-start;
  }

  .heroContent {
    padding: 100px 24px 24px;
  }
}
```

- [ ] **Step 5: Run test**

```bash
npm run test -- --reporter=verbose 2>&1 | grep -E "hero|PASS|FAIL"
```

Expected: hero stats test passes.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/page.module.scss tests/unit/
git commit -m "feat: full-screen hero with background image and stats"
```

---

## Task 5: About section (new)

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.scss`

- [ ] **Step 1: Write a test for the About section**

Add to the homepage test file:

```tsx
test('renders about section with features', () => {
  render(<HomePage />);
  expect(screen.getByText(/Мы делаем/i)).toBeInTheDocument();
  expect(screen.getByText(/Только свежее/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test
```

Expected: FAIL.

- [ ] **Step 3: Add About section to page.tsx**

Insert this section after the catalog section and before the order section in `page.tsx`:

```tsx
{/* ABOUT */}
<section className={styles.aboutSection}>
  <div className="container">
    <div className={styles.aboutGrid}>
      <div className={styles.aboutImage}>
        <img src="/images/bouquets/IMG_9632.PNG" alt="Наши букеты — ручная работа" />
        <div className={styles.aboutBadge}>
          <span className={styles.aboutBadgeNum}>5★</span>
          <span className={styles.aboutBadgeTxt}>Рейтинг</span>
        </div>
      </div>
      <div className={styles.aboutCopy}>
        <p className={styles.sectionLabel}>Наша история</p>
        <h2 className={styles.sectionTitle}>Мы делаем съедобное искусство</h2>
        <p className={styles.sectionDesc}>
          Каждый букет — это ручная работа с любовью. Мы в пгт. Яблоновский собираем
          букеты из свежих продуктов для ваших близких в Краснодаре и окрестностях.
        </p>
        <div className={styles.aboutFeatures}>
          {[
            { icon: '🦞', title: 'Только свежее', desc: 'Раки, рыба, мясо и фрукты — всегда свежие, от проверенных поставщиков' },
            { icon: '🎨', title: 'Ручная работа', desc: 'Каждый букет собирается вручную по вашему заказу, с учётом пожеланий' },
            { icon: '🚚', title: 'Быстрая доставка', desc: 'Доставляем по Яблоновскому, Краснодару и пригородам. В день заказа.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={styles.feature}>
              <div className={styles.featureIcon}>{icon}</div>
              <div>
                <p className={styles.featureTitle}>{title}</p>
                <p className={styles.featureDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add About styles to page.module.scss**

```scss
/* SECTION COMMON */
.sectionLabel {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 12px;
}

.sectionTitle {
  font-size: clamp(28px, 3.5vw, 48px);
  line-height: 1.1;
  margin-bottom: 16px;
  font-weight: 700;
}

.sectionDesc {
  font-size: 16px;
  line-height: 1.7;
  color: var(--fg2);
  max-width: 540px;
}

/* ABOUT */
.aboutSection {
  padding: 96px 0;
  background: var(--bg);
}

.aboutGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.aboutImage {
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 4/5;
  background: var(--bg3);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.aboutBadge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--accent);
  padding: 20px 28px;
  border-radius: var(--radius) 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.aboutBadgeNum {
  font-size: 36px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.aboutBadgeTxt {
  font-size: 12px;
  color: oklch(1 0 0 / 0.8);
  letter-spacing: 0.08em;
}

.aboutCopy {
  display: grid;
  gap: 0;
}

.aboutFeatures {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 36px;
}

.feature {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.featureIcon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius);
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.featureTitle {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 4px;
}

.featureDesc {
  font-size: 14px;
  color: var(--fg2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .aboutGrid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

- [ ] **Step 5: Run tests**

```bash
npm run test
```

Expected: all pass including new About test.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/page.module.scss tests/unit/
git commit -m "feat: add About section to homepage"
```

---

## Task 6: Catalog and order sections — visual update

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.scss`

- [ ] **Step 1: Wrap catalog section with section bg and container in page.tsx**

The catalog section should use `var(--bg2)` background. Wrap it:

```tsx
<section className={styles.catalogSection}>
  <div className="container">
    {/* existing SectionHeading + category grid + featured grid */}
  </div>
</section>
```

- [ ] **Step 2: Update order section to 4 steps with CTA block**

Replace `orderSteps` array and the order section JSX in `page.tsx`:

```tsx
const orderSteps = [
  { n: '1', title: 'Выберите букет', desc: 'Выберите из каталога или опишите пожелания — мы поможем' },
  { n: '2', title: 'Свяжитесь с нами', desc: 'Напишите в WhatsApp или оставьте заявку — ответим за 15 минут' },
  { n: '3', title: 'Подтвердите детали', desc: 'Уточним дату, адрес, повод — и соберём букет специально для вас' },
  { n: '4', title: 'Получите подарок', desc: 'Доставим свежим и красиво упакованным в нужное время' },
];
```

Replace the order section JSX:

```tsx
<section className={styles.orderSection}>
  <div className="container">
    <div className={styles.orderIntro}>
      <SectionHeading
        eyebrow="Просто и быстро"
        title="Как сделать заказ"
        description="Вы выбираете букет на сайте, а детали заказа и доставки удобно согласовать в мессенджере."
      />
    </div>
    <div className={styles.orderSteps}>
      {orderSteps.map((step) => (
        <div key={step.n} className={styles.orderCard}>
          <div className={styles.orderStepNum}>{step.n}</div>
          <p className={styles.orderStepTitle}>{step.title}</p>
          <p className={styles.orderStepText}>{step.desc}</p>
        </div>
      ))}
    </div>
    <div className={styles.orderCta}>
      <h3 className={styles.orderCtaTitle}>Готовы сделать заказ?</h3>
      <p className={styles.orderCtaDesc}>Позвоните или напишите — ответим быстро и поможем выбрать</p>
      <Link href="/contacts" className={styles.btnWhite}>Написать нам</Link>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update section styles in page.module.scss**

Add/replace catalog and order styles:

```scss
.catalogSection {
  padding: 96px 0;
  background: var(--bg2);
}

.orderSection {
  padding: 96px 0;
  background: var(--bg2);
}

.orderIntro {
  text-align: center;
  margin-bottom: 56px;
}

.orderSteps {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(2, 1fr);
}

.orderCard {
  text-align: center;
  padding: 24px;
}

.orderStepNum {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 26px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.orderStepTitle {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.orderStepText {
  font-size: 14px;
  color: var(--fg2);
  line-height: 1.55;
}

.orderCta {
  margin-top: 60px;
  text-align: center;
  background: var(--accent);
  padding: 48px;
  border-radius: var(--radius);
}

.orderCtaTitle {
  font-size: 28px;
  color: white;
  margin-bottom: 10px;
}

.orderCtaDesc {
  color: oklch(1 0 0 / 0.8);
  margin-bottom: 28px;
  font-size: 15px;
}

.btnWhite {
  background: white;
  color: var(--accent);
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 700;
  border-radius: var(--radius);
  transition: opacity 0.2s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    opacity: 0.9;
  }
}

@media (min-width: 1024px) {
  .orderSteps {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

Also update `.categoryLink`, `.categoryGrid`, `.featuredGrid` to use new vars:

```scss
.categoryGrid {
  display: grid;
  gap: 16px;
  margin-top: 40px;
}

.categoryLink {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  padding: 24px;
  box-shadow: var(--shadow);
  transition: transform 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
  }
}

.featuredGrid {
  display: grid;
  gap: 24px;
  margin-top: 40px;
}

@media (min-width: 640px) {
  .categoryGrid {
    grid-template-columns: repeat(2, 1fr);
  }
  .featuredGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .categoryGrid {
    grid-template-columns: repeat(4, 1fr);
  }
  .featuredGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npm run test
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/page.module.scss
git commit -m "feat: restyle catalog and order sections"
```

---

## Task 7: BouquetCard and ReviewList — card restyle

**Files:**
- Modify: `src/components/catalog/bouquet-card.module.scss`
- Modify: `src/components/shared/review-list.module.scss`
- Modify: `src/components/home/hero-featured-carousel.module.scss`

- [ ] **Step 1: Update bouquet-card.module.scss**

```scss
.card {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: var(--shadow);
  transition: transform 0.25s, box-shadow 0.25s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px oklch(0 0 0 / 0.15);
  }
}

.imageLink {
  display: block;
}

.imageWrap {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--bg3);
}

.image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.4s;

  .card:hover & {
    transform: scale(1.05);
  }
}

.body {
  display: grid;
  gap: 0.625rem;
  padding: 20px;
}

.copy {
  display: grid;
  gap: 0.375rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  border-radius: 999px;
  background: var(--accent-light);
  padding: 0.25rem 0.625rem;
  color: var(--accent);
  font-size: 0.625rem;
  font-weight: 600;
}

.title {
  color: var(--fg);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.2;
  transition: color 160ms ease;

  &:hover {
    color: var(--accent);
  }
}

.description {
  color: var(--fg2);
  font-size: 13px;
  line-height: 1.5;
}

.meta {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
}

.metaLabel {
  color: var(--fg2);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.price {
  color: var(--accent);
  font-size: 22px;
  font-weight: 700;
}

.detailsLink {
  color: white;
  background: var(--accent);
  font-size: 13px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: var(--radius);
  transition: opacity 0.2s;
  letter-spacing: 0.04em;

  &:hover {
    opacity: 0.85;
  }
}

.actions {
  justify-content: flex-start;
  gap: 0.5rem;
}
```

- [ ] **Step 2: Update review-list.module.scss**

```scss
.empty {
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  background: var(--card);
  padding: 1.5rem;
  color: var(--fg2);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.list {
  display: grid;
  gap: 24px;
  margin-top: 48px;
}

.item {
  background: var(--card);
  padding: 28px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.stars {
  color: var(--accent);
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 14px;
}

.text {
  color: var(--fg2);
  font-size: 15px;
  line-height: 1.65;
  margin-bottom: 20px;
  font-style: italic;
}

.meta {
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
}

.author {
  color: var(--fg);
  font-weight: 600;
  font-size: 14px;
}

.details {
  color: var(--fg2);
  font-size: 12px;
}

@media (min-width: 768px) {
  .list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

Note: The `ReviewList` component TSX currently renders `.meta` with `.author` and `.details`. The avatar initial would require changes to the data. Add a `.stars` div showing 5 stars statically (all reviews are 5 stars), and the avatar showing the first letter of the author. Update `review-list.tsx`:

```tsx
export function ReviewList({ items }: ReviewListProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        Реальные отзывы будут добавлены перед запуском сайта.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <article
          key={`${item.author}-${item.text}`}
          className={styles.item}
        >
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.text}>«{item.text}»</p>
          <div className={styles.meta}>
            <div className={styles.avatar}>{item.author[0]}</div>
            <div>
              <p className={styles.author}>{item.author}</p>
              <p className={styles.details}>
                {item.location} • {item.sourceLabel}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Update hero-featured-carousel.module.scss token references**

The carousel uses `var(--background)`, `var(--surface)`, `var(--line)`, `var(--accent)`, `var(--accent-strong)`, `var(--text)`, `var(--muted)` — these are all aliased, so no changes needed. Just verify the file uses only alias names (not new names like `--bg`). The current file already uses alias names — no changes required.

- [ ] **Step 4: Run tests**

```bash
npm run test
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/bouquet-card.module.scss src/components/shared/review-list.tsx src/components/shared/review-list.module.scss
git commit -m "feat: restyle bouquet cards and reviews"
```

---

## Task 8: FAQ section and page wrapper

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.scss`

- [ ] **Step 1: Wrap FAQ and Reviews sections with bg sections**

In `page.tsx`, wrap the FAQ section:

```tsx
<section className={styles.faqSection}>
  <div className="container">
    <SectionHeading ... />
    <FaqList items={faqs} />
  </div>
</section>
```

And the Reviews section:

```tsx
<section className={styles.reviewsSection}>
  <div className="container">
    <SectionHeading ... />
    <ReviewList items={reviews} />
  </div>
</section>
```

Also update the outer page wrapper — remove `page-shell` and the `page` grid class from the outer `<div>`:

```tsx
<div>  {/* no className needed — sections handle their own spacing */}
  ...sections...
</div>
```

- [ ] **Step 2: Add section wrapper styles to page.module.scss**

```scss
.faqSection {
  padding: 96px 0;
  background: var(--bg);
}

.reviewsSection {
  padding: 96px 0;
  background: var(--bg);
}
```

- [ ] **Step 3: Run full test suite**

```bash
npm run test
```

Expected: all pass.

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 5: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Fixed header with Montserrat font and green CTA
- Full-screen hero with photo background, overlay, H1, stats
- Catalog section on green-tinted bg
- About section with photo and features
- 4-step order with CTA block
- FAQ section
- 3-column review grid
- Dark footer

Also check a few inner pages (`/catalog`, `/contacts`) to confirm they still look correct (old var aliases working).

- [ ] **Step 6: Final commit**

```bash
git add src/app/page.tsx src/app/page.module.scss
git commit -m "feat: complete homepage redesign — FAQ/Reviews sections and page wrapper"
```

# SCSS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Tailwind utility styling with SCSS Modules in the first visible wave of the site without changing the current design.

**Architecture:** Global design tokens and base layout stay in `globals.scss`, while each migrated component gets a colocated `*.module.scss` file. The migration is staged so the site remains buildable between waves, and Tailwind is only removed after every component is migrated.

**Tech Stack:** Next.js App Router, TypeScript, SCSS Modules, Vitest, React Testing Library.

---

### Task 1: Add SCSS Foundation

**Files:**
- Modify: `package.json`
- Create: `src/app/globals.scss`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Install SCSS support**

Run: `npm install -D sass`
Expected: dependency install completes successfully

- [ ] **Step 2: Replace global Tailwind import with SCSS globals**

Move tokens, resets, body rules, and `.page-shell` into `src/app/globals.scss`.

- [ ] **Step 3: Update root layout to import SCSS globals**

Switch `src/app/layout.tsx` to import `./globals.scss`.

- [ ] **Step 4: Verify the app still builds**

Run: `npm run build`
Expected: PASS

### Task 2: Migrate Shared Layout Components

**Files:**
- Modify: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-header.module.scss`
- Modify: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/site-footer.module.scss`
- Modify: `src/components/layout/mobile-contact-bar.tsx`
- Create: `src/components/layout/mobile-contact-bar.module.scss`

- [ ] **Step 1: Move header styles into SCSS module**
- [ ] **Step 2: Move footer styles into SCSS module**
- [ ] **Step 3: Move mobile contact bar styles into SCSS module**
- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

### Task 3: Migrate Hero And CTA Components

**Files:**
- Modify: `src/components/cta/contact-buttons.tsx`
- Create: `src/components/cta/contact-buttons.module.scss`
- Modify: `src/components/home/hero-featured-carousel.tsx`
- Create: `src/components/home/hero-featured-carousel.module.scss`
- Test: `tests/unit/components/contact-buttons.test.tsx`
- Test: `tests/unit/components/hero-featured-carousel.test.tsx`

- [ ] **Step 1: Move CTA button styles into SCSS module**
- [ ] **Step 2: Move hero carousel styles into SCSS module**
- [ ] **Step 3: Adjust tests if class assertions changed**
- [ ] **Step 4: Verify targeted tests**

Run: `npm test -- tests/unit/components/contact-buttons.test.tsx tests/unit/components/hero-featured-carousel.test.tsx`
Expected: PASS

### Task 4: Migrate Catalog Card And Homepage

**Files:**
- Modify: `src/components/catalog/bouquet-card.tsx`
- Create: `src/components/catalog/bouquet-card.module.scss`
- Modify: `src/app/page.tsx`
- Create: `src/app/page.module.scss`
- Test: `tests/unit/components/bouquet-card.test.tsx`
- Test: `tests/unit/smoke/app-shell.test.tsx`

- [ ] **Step 1: Move bouquet card styles into SCSS module**
- [ ] **Step 2: Move homepage layout styles into SCSS module**
- [ ] **Step 3: Update tests for module-driven class names where needed**
- [ ] **Step 4: Verify targeted tests**

Run: `npm test -- tests/unit/components/bouquet-card.test.tsx tests/unit/smoke/app-shell.test.tsx`
Expected: PASS

### Task 5: Verify And Hand Off

**Files:**
- Modify: `package-lock.json`

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Document second-wave leftovers**

List remaining Tailwind-based pages/components for the next migration batch.

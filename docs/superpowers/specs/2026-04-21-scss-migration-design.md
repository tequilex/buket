# SCSS Migration Design

## Goal

Перевести сайт с Tailwind-утилит на `SCSS Modules` без редизайна и без изменения структуры страниц, чтобы проект было проще поддерживать и править вручную.

## Scope

Первая цель миграции — убрать зависимость интерфейсных компонентов от длинных utility-class цепочек. Визуально сайт должен остаться максимально близким к текущему состоянию.

В этой фазе не меняем:

- контентную структуру страниц;
- SEO-логику и маршруты;
- визуальную концепцию сайта;
- поведение аналитики и статической генерации.

## Architecture

### Styling Model

- Глобальный слой переносится в `src/app/globals.scss`.
- Цветовые токены, фон, тени, базовая типографика и контейнер `.page-shell` остаются глобальными.
- Компонентные стили живут в `*.module.scss` рядом с соответствующим `tsx`-файлом.
- `className` в JSX должен ссылаться на именованные классы из модуля, а не на utility-строки.

### Migration Strategy

Миграция идет в два слоя:

1. `Foundation`
   - подключение `sass`;
   - перевод глобального файла;
   - сохранение токенов и базовых layout-правил.

2. `First wave`
   - главная страница;
   - header/footer/mobile contact bar;
   - hero carousel;
   - CTA buttons;
   - bouquet card.

Это даст редактируемый пользовательский слой, не затрагивая сразу весь проект.

## Why SCSS Modules

`SCSS Modules` лучше подходят под этот код, чем:

- глобальный CSS/BEM, потому что меньше риск протекания стилей между компонентами;
- сохранение Tailwind только для layout, потому что цель именно уйти от Tailwind как от основного способа правки интерфейса.

SCSS нужен не ради “магии”, а ради читаемых вложенных правил, состояний и медиа-условий.

## Constraints

- не вносить редизайн во время миграции;
- не ломать текущую static export сборку;
- не удалять Tailwind из зависимостей, пока в проекте остаются компоненты на utility-классах;
- мигрировать волнами, чтобы после каждой волны проект оставался рабочим.

## First-Wave Files

### Global

- `src/app/globals.css` -> `src/app/globals.scss`
- `src/app/layout.tsx`

### Home / shared visible components

- `src/app/page.tsx`
- `src/components/catalog/bouquet-card.tsx`
- `src/components/cta/contact-buttons.tsx`
- `src/components/home/hero-featured-carousel.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/layout/mobile-contact-bar.tsx`

## Success Criteria

- проект собирается с `SCSS`;
- перечисленные компоненты больше не используют Tailwind utility-классы;
- внешний вид первой волны остается близким к текущему;
- проект проходит `lint`, `typecheck`, `build`.

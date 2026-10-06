/** «1 букет», «3 букета», «10 букетов» — счётчики в каталоге и подборках. */
export function pluralBouquets(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return 'букет';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'букета';

  return 'букетов';
}

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
    /\/+$/u,
    '',
  );
}

/**
 * Абсолютный адрес страницы — обязательно со слешем на конце.
 *
 * В next.config включён trailingSlash, поэтому `/catalog` отвечает 308 на
 * `/catalog/`. Пока карта сайта отдавала адреса без слеша, Яндекс исключал их
 * из индекса со статусом «Редирект». Все канонические ссылки, sitemap и
 * JSON-LD обязаны ходить через этот хелпер.
 */
export function absoluteUrl(path: string) {
  const trimmed = path.replace(/^\/+|\/+$/gu, '');

  return trimmed ? `${getBaseUrl()}/${trimmed}/` : `${getBaseUrl()}/`;
}

/**
 * Абсолютный адрес файла — картинки, иконки. Слеш на конце здесь недопустим:
 * это не маршрут, а статический ресурс.
 */
export function assetUrl(src: string) {
  return `${getBaseUrl()}/${src.replace(/^\/+/u, '')}`;
}

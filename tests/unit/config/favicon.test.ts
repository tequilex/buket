import { existsSync } from 'node:fs';
import path from 'node:path';
import { metadata } from '@/app/layout';

const appDir = path.join(process.cwd(), 'src/app');

/**
 * Иконки лежат по файловой конвенции Next: favicon.ico, icon*.png и
 * apple-icon.png в каталоге app. Next сам проставляет им sizes и type,
 * поэтому ручного блока icons в metadata быть не должно — ссылки задвоятся.
 */
test('app ships the icon set Next picks up by convention', () => {
  for (const file of [
    'favicon.ico',
    'icon.png',
    'icon1.png',
    'icon2.png',
    'apple-icon.png',
  ]) {
    expect(existsSync(path.join(appDir, file))).toBe(true);
  }
});

test('layout does not declare icons by hand', () => {
  expect(metadata.icons).toBeUndefined();
});

/** Знак в шапке берётся из того же файла, что и иконки. */
test('header mark ships as an optimised vector', () => {
  expect(existsSync(path.join(process.cwd(), 'public/bouquet.svg'))).toBe(true);
});

/** Без манифеста иконки 192 и 512 браузером не используются. */
test('manifest lists the installable icon sizes', async () => {
  const { default: manifest } = await import('@/app/manifest');
  const sizes = manifest().icons?.map((icon) => icon.sizes);

  expect(sizes).toEqual(['192x192', '512x512']);
});

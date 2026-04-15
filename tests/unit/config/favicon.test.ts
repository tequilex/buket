import { existsSync } from 'node:fs';
import path from 'node:path';
import { metadata } from '@/app/layout';

test('project ships both svg and ico favicon assets', () => {
  expect(existsSync(path.join(process.cwd(), 'src/app/icon.svg'))).toBe(true);
  expect(existsSync(path.join(process.cwd(), 'public/favicon.ico'))).toBe(true);
});

test('layout metadata exposes both ico and svg favicons', () => {
  const icons = metadata.icons as
    | {
        icon?: Array<{
          url: string;
          type?: string;
        }>;
      }
    | undefined;

  expect(icons).toBeDefined();
  expect(Array.isArray(icons?.icon)).toBe(true);
  expect(icons?.icon).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        url: '/favicon.ico',
        type: 'image/x-icon',
      }),
      expect.objectContaining({
        url: '/icon.svg',
        type: 'image/svg+xml',
      }),
    ]),
  );
});

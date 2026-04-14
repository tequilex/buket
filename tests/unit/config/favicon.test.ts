import { existsSync } from 'node:fs';
import path from 'node:path';

test('project ships both svg and ico favicon assets', () => {
  expect(existsSync(path.join(process.cwd(), 'src/app/icon.svg'))).toBe(true);
  expect(existsSync(path.join(process.cwd(), 'public/favicon.ico'))).toBe(true);
});

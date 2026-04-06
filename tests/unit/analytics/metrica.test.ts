import { trackCtaClick } from '@/lib/analytics/metrica';

test('trackCtaClick safely no-ops when Metrica is unavailable', () => {
  expect(() => trackCtaClick('whatsapp', 'hero')).not.toThrow();
});

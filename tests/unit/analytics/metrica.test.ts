import {
  buildTrackedPageUrl,
  buildMetricaInitScript,
  trackCtaClick,
  trackPageView,
} from '@/lib/analytics/metrica';

test('buildMetricaInitScript enables SPA-safe initialization options', () => {
  const script = buildMetricaInitScript(108548590);

  expect(script).toContain("ym(108548590, 'init'");
  expect(script).toContain('defer: true');
  expect(script).toContain('webvisor: true');
  expect(script).toContain('clickmap: true');
  expect(script).toContain('trackLinks: true');
  expect(script).toContain('accurateTrackBounce: true');
});

test('buildTrackedPageUrl appends search string when it exists', () => {
  expect(buildTrackedPageUrl('/catalog/myasnye', '?utm_source=yandex')).toBe(
    '/catalog/myasnye?utm_source=yandex',
  );
  expect(buildTrackedPageUrl('/catalog/myasnye', '')).toBe('/catalog/myasnye');
});

test('trackPageView sends a hit when Metrica is available', () => {
  const ym = vi.fn();

  window.ym = ym;
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = '108548590';

  trackPageView('/catalog/myasnye');

  expect(ym).toHaveBeenCalledWith(108548590, 'hit', '/catalog/myasnye');
});

test('trackCtaClick safely no-ops when Metrica is unavailable', () => {
  delete window.ym;
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = '108548590';

  expect(() => trackCtaClick('whatsapp', 'hero')).not.toThrow();
});

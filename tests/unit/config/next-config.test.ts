import nextConfig from '../../../next.config';

test('next config is compatible with static export hosting', () => {
  expect(nextConfig.output).toBe('export');
  expect(nextConfig.trailingSlash).toBe(true);
  expect(nextConfig.images?.unoptimized).toBe(true);
});

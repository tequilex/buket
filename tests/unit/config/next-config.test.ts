import nextConfig from '../../../next.config';

test('next config is compatible with static export hosting', () => {
  expect(nextConfig.output).toBe('export');
  expect(nextConfig.images?.unoptimized).toBe(true);
});

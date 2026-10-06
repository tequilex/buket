import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  // Папки дизайн-системы и хендофа — эталон, а не исходники проекта.
  {
    ignores: [
      'Buket Design System/**',
      'design_handoff_gastro_buket_redesign/**',
      '.next/**',
      'out/**',
    ],
  },
  ...(Array.isArray(nextCoreWebVitals) ? nextCoreWebVitals : [nextCoreWebVitals]),
];

export default config;

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  // Папка дизайн-системы — эталон, а не исходники проекта.
  { ignores: ['Buket Design System/**', '.next/**', 'out/**'] },
  ...(Array.isArray(nextCoreWebVitals) ? nextCoreWebVitals : [nextCoreWebVitals]),
];

export default config;

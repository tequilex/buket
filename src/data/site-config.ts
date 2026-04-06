import { siteConfigSchema } from '@/lib/content/schemas';

const siteConfig = siteConfigSchema.parse({
  siteName: 'Buket Studio',
  siteDescription:
    'Съедобные букеты с доставкой по Краснодару и Яблоновскому.',
  serviceLocations: ['krasnodar', 'yablonovskiy'],
  channels: [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/79990000000?text=%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D1%81%D1%8A%D0%B5%D0%B4%D0%BE%D0%B1%D0%BD%D1%8B%D0%B9%20%D0%B1%D1%83%D0%BA%D0%B5%D1%82',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: 'https://t.me/buketstudio',
    },
    {
      id: 'avito',
      label: 'Avito',
      href: 'https://www.avito.ru/',
    },
  ],
});

export default siteConfig;

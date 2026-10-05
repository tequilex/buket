import type { Metadata } from 'next';
import { LocationScreen } from '@/components/shared/location-screen';
import { getLocationBySlug } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

const location = getLocationBySlug('krasnodar');

export const metadata: Metadata = location
  ? buildMetadata({
      title: location.seoTitle,
      description: location.seoDescription,
      path: '/locations/krasnodar',
    })
  : {};

export default function KrasnodarLocationPage() {
  if (!location) {
    return null;
  }

  return (
    <LocationScreen
      location={location}
      note={`${location.deliveryLead} По Краснодару чаще всего доступны удобные интервалы для доставки и быстрый заказ в течение дня.`}
      categorySlugs={['myasnye', 'rybnye', 'sladkie']}
    />
  );
}

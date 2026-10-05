import type { Metadata } from 'next';
import { LocationScreen } from '@/components/shared/location-screen';
import { getLocationBySlug } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

const location = getLocationBySlug('yablonovskiy');

export const metadata: Metadata = location
  ? buildMetadata({
      title: location.seoTitle,
      description: location.seoDescription,
      path: '/locations/yablonovskiy',
    })
  : {};

export default function YablonovskiyLocationPage() {
  if (!location) {
    return null;
  }

  return (
    <LocationScreen
      location={location}
      note={`${location.deliveryLead} Для Яблоновского важно заранее уточнять адрес, ориентир и удобный интервал, чтобы доставка прошла без задержек.`}
      categorySlugs={['myasnye', 'fruktovye', 'sladkie']}
    />
  );
}

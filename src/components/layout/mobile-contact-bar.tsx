import { ContactChannels } from '@/components/cta/contact-channels';

/** Фиксированная графитовая полоса мессенджеров, только на мобильном. */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-ink p-3 md:hidden">
      <ContactChannels source="mobile_bar" onDark layout="bar" />
    </div>
  );
}

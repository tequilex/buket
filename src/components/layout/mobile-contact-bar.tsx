import { ContactButtons } from '@/components/cta/contact-buttons';

export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[rgba(251,248,242,0.96)] px-3 py-3 shadow-[0_-12px_30px_rgba(47,52,38,0.1)] md:hidden">
      <ContactButtons source="mobile_bar" compact />
    </div>
  );
}

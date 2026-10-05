import Link from 'next/link';
import { OrderButton } from '@/components/order/order-button';
import { MobileMenu } from './mobile-menu';
import { navItems } from './nav-items';

/** Липкая графитовая шапка 72px: вордмарк со слоганом, навигация заглавными, одна зелёная кнопка. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-dark text-on-dark">
      <div className="page-container flex h-18 items-center gap-3 min-[1041px]:gap-10">
        <Link href="/" className="flex-none whitespace-nowrap">
          <span className="block font-display text-[18px] leading-none font-bold tracking-mark uppercase text-on-dark min-[420px]:text-[22px]">
            Gastro Buket
          </span>
          <span className="mt-[3px] hidden text-[9px] leading-none tracking-[0.22em] uppercase text-mute-on-dark min-[420px]:block">
            Яблоновский · Краснодар
          </span>
        </Link>

        <nav className="flex flex-1 justify-center gap-6.5 whitespace-nowrap max-[1040px]:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] leading-none font-medium tracking-button uppercase text-on-dark hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-2">
          <OrderButton source="header">Написать</OrderButton>
          <span className="hidden max-[1040px]:inline-flex">
            <MobileMenu items={navItems} />
          </span>
        </div>
      </div>
    </header>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { OrderButton } from '@/components/order/order-button';
import siteConfig from '@/data/site-config';
import { phoneHref } from '@/lib/content/catalog';
import { HeaderNav } from './header-nav';
import { MobileMenu } from './mobile-menu';
import { navItems } from './nav-items';

/** Белая плавающая плашка 68px: логотип, навигация, телефон и жёлтая кнопка. */
export function SiteHeader() {
  return (
    <header className="px-3 pt-3 max-md:px-2 max-md:pt-2">
      <div className="flex h-17 items-center gap-8 rounded-[20px] bg-card pr-3 pl-6 max-md:h-15 max-md:gap-2.5 max-md:rounded-md max-md:pr-2 max-md:pl-3.5">
        <Link href="/" className="flex flex-1 items-center gap-2.5 md:flex-none">
          <span className="flex size-12.5 flex-none items-center justify-center rounded-full bg-primary max-md:size-11">
            <Image
              src="/bouquet.svg"
              alt=""
              width={34}
              height={45}
              priority
              className="h-11.25 w-auto max-md:h-10"
            />
          </span>
          <span className="flex flex-col leading-[1.1]">
            <span className="font-display text-[16px] font-bold text-ink max-md:text-[15px]">
              gastro buket
            </span>
            <span className="text-[12px] text-subtle max-md:hidden">
              Яблоновский · Краснодар
            </span>
          </span>
        </Link>

        <HeaderNav items={navItems} />

        <a
          href={phoneHref}
          className="text-[15px] font-medium whitespace-nowrap max-lg:hidden"
        >
          {siteConfig.phone}
        </a>

        <OrderButton
          source="header"
          shape="soft"
          className="max-md:min-h-11 max-md:px-3.5 max-md:text-[14px]"
        >
          Написать
        </OrderButton>

        {/* Навигация прячется раньше, чем сжимается шапка, — с 1024px её
            заменяет бургер. */}
        <span className="inline-flex lg:hidden">
          <MobileMenu items={navItems} />
        </span>
      </div>
    </header>
  );
}

export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/locations/krasnodar', label: 'Краснодар' },
  { href: '/locations/yablonovskiy', label: 'Яблоновский' },
  { href: '/contacts', label: 'Контакты' },
];

import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-dark py-22 text-on-dark">
      <div className="page-container flex flex-col items-start gap-6.5">
        <span className="type-eyebrow text-primary">404</span>
        <h1 className="type-display-lg text-on-dark">
          Такой страницы
          <br />
          нет
        </h1>
        <p className="max-w-[46ch] text-mute-on-dark text-pretty">
          Вернитесь на главную или откройте каталог — десять букетов на месте.
        </p>
        <Button href="/">На главную</Button>
        <div className="flex flex-wrap gap-2">
          <Tag onDark href="/catalog">
            Каталог
          </Tag>
          <Tag onDark href="/delivery">
            Доставка
          </Tag>
          <Tag onDark href="/contacts">
            Контакты
          </Tag>
        </div>
      </div>
    </div>
  );
}

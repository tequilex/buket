import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { HeroFeaturedCarousel } from '@/components/home/hero-featured-carousel';
import { FaqList } from '@/components/shared/faq-list';
import { ReviewList } from '@/components/shared/review-list';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, categories, faqs, reviews } from '@/lib/content/catalog';
import styles from './page.module.scss';

const featuredBouquets = bouquets.filter((bouquet) => bouquet.featured).slice(0, 4);

const orderSteps = [
  'Выберите букет по составу или поводу.',
  'Напишите в WhatsApp, Telegram или Avito.',
  'Согласуйте состав, дату и адрес доставки.',
];

export default function HomePage() {
  return (
    <div className={`page-shell ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            Краснодар • Яблоновский
          </p>
          <div className={styles.heroBody}>
            <h1 className={styles.heroTitle}>
              Съедобные букеты с доставкой в Краснодаре и Яблоновском
            </h1>
            <p className={styles.heroDescription}>
              Мясные, рыбные, сладкие и фруктовые букеты с аккуратной
              подарочной подачей. Удобно заказать через WhatsApp, Telegram или
              Avito и быстро согласовать детали доставки.
            </p>
          </div>
          <ContactButtons source="hero" />
        </div>

        <HeroFeaturedCarousel bouquets={featuredBouquets} />
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Каталог"
          title="Подберите букет по составу"
          description="Мясные, рыбные, сладкие и фруктовые букеты собраны по категориям, чтобы выбрать подходящий подарок было проще."
        />
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog/${category.slug}`}
              className={styles.categoryLink}
            >
              <p className={styles.categoryEyebrow}>
                Категория
              </p>
              <h2 className={styles.categoryTitle}>
                {category.title}
              </h2>
              <p className={styles.categoryDescription}>
                {category.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Популярное"
          title="Популярные букеты"
          description="Подборка вариантов, с которых удобно начать выбор, если вы заказываете съедобный букет впервые."
        />
        <div className={styles.featuredGrid}>
          {featuredBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </section>

      <section className={styles.orderSection}>
        <div className={styles.orderIntro}>
          <SectionHeading
            eyebrow="Как заказать"
            title="Как проходит заказ"
            description="Вы выбираете букет на сайте, а детали заказа и доставки удобно согласовать в мессенджере."
          />
        </div>
        <div className={styles.orderSteps}>
          {orderSteps.map((step, index) => (
            <div
              key={step}
              className={styles.orderCard}
            >
              <p className={styles.orderStepLabel}>
                Шаг {index + 1}
              </p>
              <p className={styles.orderStepText}>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="FAQ"
          title="Частые вопросы"
          description="Коротко отвечаем на частые вопросы по составу, доставке и оформлению заказа."
        />
        <FaqList items={faqs} />
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Отзывы"
          title="Отзывы клиентов"
          description="Здесь будут только реальные отзывы и фото после вручения, когда соберем первые материалы от покупателей."
        />
        <ReviewList items={reviews} />
      </section>
    </div>
  );
}

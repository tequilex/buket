import Image from 'next/image';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { FaqList } from '@/components/shared/faq-list';
import { ReviewList } from '@/components/shared/review-list';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, categories, faqs, reviews } from '@/lib/content/catalog';
import styles from './page.module.scss';

const featuredBouquets = bouquets.filter((bouquet) => bouquet.featured).slice(0, 4);

const orderSteps = [
  { n: '1', title: 'Выберите букет', desc: 'Выберите из каталога или опишите пожелания — мы поможем' },
  { n: '2', title: 'Свяжитесь с нами', desc: 'Напишите в WhatsApp или оставьте заявку — ответим за 15 минут' },
  { n: '3', title: 'Подтвердите детали', desc: 'Уточним дату, адрес, повод — и соберём букет специально для вас' },
  { n: '4', title: 'Получите подарок', desc: 'Доставим свежим и красиво упакованным в нужное время' },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/bouquets/1.webp"
            alt="Съедобные букеты с доставкой"
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>пгт. Яблоновский · Краснодар</div>
          <div className={styles.heroBody}>
            <h1 className={styles.heroTitle}>
              Съедобные букеты с доставкой в <em>Краснодаре и Яблоновском</em>
            </h1>
            <p className={styles.heroDescription}>
              Мясные, рыбные, сладкие и фруктовые букеты с аккуратной
              подарочной подачей. Удобно заказать через WhatsApp, Telegram или
              Avito и быстро согласовать детали доставки.
            </p>
          </div>
          <div className={styles.heroBtns}>
            <Link href="/catalog" className={styles.btnPrimary}>Смотреть каталог</Link>
            <ContactButtons source="hero" variant="hero" />
          </div>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>500+</span>
            <span className={styles.heroStatLabel}>Букетов</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>4</span>
            <span className={styles.heroStatLabel}>Категории</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>2–5к</span>
            <span className={styles.heroStatLabel}>Рублей</span>
          </div>
        </div>
      </section>

      {/* КАТАЛОГ */}
      <section className={styles.catalogSection}>
        <div className="container">
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
                <p className={styles.categoryEyebrow}>Категория</p>
                <h2 className={styles.categoryTitle}>{category.title}</h2>
                <p className={styles.categoryDescription}>{category.shortDescription}</p>
              </Link>
            ))}
          </div>
          <div className={styles.featuredGrid}>
            {featuredBouquets.map((bouquet) => (
              <BouquetCard key={bouquet.slug} bouquet={bouquet} />
            ))}
          </div>
        </div>
      </section>

      {/* О НАС */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <Image 
                src="/images/bouquets/9.webp" 
                alt="Наши букеты — ручная работа" 
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.aboutBadge}>
                <span className={styles.aboutBadgeNum}>5★</span>
                <span className={styles.aboutBadgeTxt}>Рейтинг</span>
              </div>
            </div>
            <div className={styles.aboutCopy}>
              <p className={styles.sectionLabel}>Наша история</p>
              <h2 className={styles.sectionTitle}>Мы делаем съедобное искусство</h2>
              <p className={styles.sectionDesc}>
                Каждый букет — это ручная работа с любовью. Мы в пгт. Яблоновский собираем
                букеты из свежих продуктов для ваших близких в Краснодаре и окрестностях.
              </p>
              <div className={styles.aboutFeatures}>
                {[
                  { icon: '🦞', title: 'Только свежее', desc: 'Раки, рыба, мясо и фрукты — всегда свежие, от проверенных поставщиков' },
                  { icon: '🎨', title: 'Ручная работа', desc: 'Каждый букет собирается вручную по вашему заказу, с учётом пожеланий' },
                  { icon: '🚚', title: 'Быстрая доставка', desc: 'Доставляем по Яблоновскому, Краснодару и пригородам. В день заказа.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className={styles.feature}>
                    <div className={styles.featureIcon}>{icon}</div>
                    <div>
                      <p className={styles.featureTitle}>{title}</p>
                      <p className={styles.featureDesc}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КАК ЗАКАЗАТЬ */}
      <section className={styles.orderSection}>
        <div className="container">
          <div className={styles.orderIntro}>
            <SectionHeading
              eyebrow="Просто и быстро"
              title="Как сделать заказ"
              description="Вы выбираете букет на сайте, а детали заказа и доставки удобно согласовать в мессенджере."
            />
          </div>
          <div className={styles.orderSteps}>
            {orderSteps.map((step) => (
              <div key={step.n} className={styles.orderCard}>
                <div className={styles.orderStepNum}>{step.n}</div>
                <p className={styles.orderStepTitle}>{step.title}</p>
                <p className={styles.orderStepText}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.orderCta}>
            <h3 className={styles.orderCtaTitle}>Готовы сделать заказ?</h3>
            <p className={styles.orderCtaDesc}>Позвоните или напишите — ответим быстро и поможем выбрать</p>
            <Link href="/contacts" className={styles.btnWhite}>Написать нам</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <SectionHeading
            eyebrow="FAQ"
            title="Частые вопросы"
            description="Коротко отвечаем на частые вопросы по составу, доставке и оформлению заказа."
          />
          <FaqList items={faqs} />
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className={styles.reviewsSection}>
        <div className="container">
          <SectionHeading
            eyebrow="Отзывы"
            title="Отзывы клиентов"
            description="Здесь будут только реальные отзывы и фото после вручения, когда соберем первые материалы от покупателей."
          />
          <ReviewList items={reviews} />
        </div>
      </section>
    </div>
  );
}

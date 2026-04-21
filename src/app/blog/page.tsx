import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { getAllBlogPosts } from '@/lib/content/blog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '@/app/internal-page.module.scss';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Блог о съедобных букетах',
    description:
      'Материалы о съедобных букетах, вариантах подарков и полезных идеях для выбора.',
    path: '/blog',
  });
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className={`page-shell ${styles.page}`}>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Блог' }]} />

      <section className={styles.introPanel}>
        <div className={styles.introCopy}>
          <SectionHeading
            eyebrow="Блог"
            title="Полезные материалы о букетах и подарках"
            description="Раздел уже готов, а статьи будем добавлять по мере появления действительно полезного контента."
          />
          <p className={styles.introText}>
            Здесь будут только статьи, которые помогают выбрать подарок,
            разобраться в форматах букетов и не тратить время на пустые советы.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          Пока статей нет. Позже здесь появятся материалы о выборе съедобных
          букетов, идеях подарков и сезонных подборках.
        </div>
      ) : (
        <div className={styles.articleList}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.articleCard}
            >
              <h2 className={styles.articleTitle}>
                {post.title}
              </h2>
              {post.description ? (
                <p className={styles.articleDescription}>
                  {post.description}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

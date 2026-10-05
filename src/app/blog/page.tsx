import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { CtaBand } from '@/components/ui/cta-band';
import { getAllBlogPosts } from '@/lib/content/blog';
import { buildMetadata } from '@/lib/seo/metadata';

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
    <div>
      <PageHeader
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Блог' }]}
        eyebrow="Блог"
        title="О букетах и подарках"
        lead="Раздел готов, статьи добавляем по мере появления действительно полезного материала."
      />

      <div className="page-container py-22">
        {posts.length === 0 ? (
          <div className="bg-band p-8 text-mute">
            Пока статей нет. Позже здесь появятся материалы о выборе съедобных букетов,
            идеях подарков и сезонных подборках.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 bg-card p-4.5"
              >
                <h2 className="type-heading-lg text-ink">{post.title}</h2>
                {post.description ? (
                  <p className="text-sm text-mute text-pretty">{post.description}</p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-2 pt-3 type-button text-primary transition-[gap] duration-140 ease-linear group-hover:gap-[13px]">
                  Читать <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <CtaBand
        eyebrow="Готовы собрать"
        title="Скажите повод — предложим состав"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource="blog"
      />
    </div>
  );
}

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

      <div className="mx-3 mt-7 max-md:mx-2 max-md:mt-4">
        {posts.length === 0 ? (
          <div className="rounded-2xl bg-card p-8 text-[15px] text-mute max-md:rounded-xl max-md:p-5 max-md:text-[14px]">
            Пока статей нет. Позже здесь появятся материалы о выборе съедобных букетов,
            идеях подарков и сезонных подборках.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-2xl bg-card p-7 max-md:rounded-lg max-md:p-5"
              >
                <h2 className="font-display text-[20px] leading-[1.15] font-bold text-ink">
                  {post.title}
                </h2>
                {post.description ? (
                  <p className="text-[15px] text-mute text-pretty max-md:text-[14px]">
                    {post.description}
                  </p>
                ) : null}
                <span className="mt-auto pt-3 text-[15px] font-semibold text-ink">
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

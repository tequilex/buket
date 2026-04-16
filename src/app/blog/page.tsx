import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/section-heading';
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
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <SectionHeading
        eyebrow="Блог"
        title="Полезные материалы о букетах и подарках"
        description="Раздел уже готов, а статьи будем добавлять по мере появления действительно полезного контента."
      />

      {posts.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[var(--line)] bg-[var(--card)] p-8 text-base leading-7 text-[var(--muted)]">
          Пока статей нет. Позже здесь появятся материалы о выборе съедобных
          букетов, идеях подарков и сезонных подборках.
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[24px] border border-[var(--line)] bg-[var(--card)] p-6"
            >
              <h2 className="text-2xl font-semibold text-[var(--text)]">
                {post.title}
              </h2>
              {post.description ? (
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
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

import Link from 'next/link';
import { SectionHeading } from '@/components/shared/section-heading';
import { getAllBlogPosts } from '@/lib/content/blog';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <SectionHeading
        eyebrow="Блог"
        title="SEO-статьи будут добавлены позже"
        description="Структура блога уже есть, но первую версию сайта запускаем без искусственного наполнения."
      />

      {posts.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[var(--line)] bg-[var(--card)] p-8 text-base leading-7 text-[var(--muted)]">
          Пока статей нет. Когда появится реальный контент под SEO, здесь
          появятся статьи про выбор букетов, подарки по поводам и локальные
          подборки.
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

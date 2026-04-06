import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content/blog';
import { buildMetadata } from '@/lib/seo/metadata';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Статья не найдена',
      description: 'Запрошенная статья не найдена.',
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.description || 'SEO-статья о съедобных букетах.',
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-shell space-y-10 py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Блог', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="rounded-[32px] border border-[var(--line)] bg-[var(--card)] p-8">
        <h1 className="text-4xl font-semibold text-[var(--text)]">{post.title}</h1>
        {post.description ? (
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            {post.description}
          </p>
        ) : null}
        <div className="prose prose-neutral mt-8 max-w-none text-[var(--text)]">
          {post.content}
        </div>
      </article>
    </div>
  );
}

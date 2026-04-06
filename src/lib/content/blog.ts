import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPostSummary {
  slug: string;
  title: string;
  description?: string;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
}

async function getBlogFileNames() {
  try {
    const entries = await fs.readdir(blogDirectory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
      .map((entry) => entry.name);
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const fileNames = await getBlogFileNames();
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const source = await fs.readFile(path.join(blogDirectory, fileName), 'utf8');
      const { data } = matter(source);

      return {
        slug: fileName.replace(/\.(md|mdx)$/, ''),
        title: typeof data.title === 'string' ? data.title : 'Без названия',
        description:
          typeof data.description === 'string' ? data.description : undefined,
      };
    }),
  );

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const fileNames = await getBlogFileNames();
  const match = fileNames.find((fileName) => fileName.replace(/\.(md|mdx)$/, '') === slug);

  if (!match) {
    return null;
  }

  const source = await fs.readFile(path.join(blogDirectory, match), 'utf8');
  const { data, content } = matter(source);

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : 'Без названия',
    description: typeof data.description === 'string' ? data.description : undefined,
    content,
  };
}

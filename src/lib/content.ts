// Content loading and parsing utilities

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;

// Helper to generate slug from filename
export function generateSlug(filename: string): string {
  return filename
    .replace(/\.mdx?$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '') // Remove date prefix if present
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => {
    return data.draft !== true;
  });

  return projects.sort((a, b) => {
    // Sort by date if available, otherwise by title
    if (a.data.date && b.data.date) {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    }
    return a.data.title.localeCompare(b.data.title);
  });
}

// Get a single project by slug
export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug);
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

import { defineCollection, z } from 'astro:content';

// Define the blog collection
const blog = defineCollection({
  type: 'content',
  schema: ({ image: img }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z
        .string()
        .datetime({ offset: true })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
      tags: z.array(z.string()).optional(),
      slug: z.string().optional(),
      cover: img().optional(),
      draft: z.boolean().optional().default(false)
    })
});

// Define the projects collection
const projects = defineCollection({
  type: 'content',
  schema: ({ image: img }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z
        .string()
        .datetime({ offset: true })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
        .optional(),
      tags: z.array(z.string()).optional(),
      slug: z.string().optional(),
      cover: img().optional(),
      draft: z.boolean().optional().default(false)
    })
});

// Export collections
export const collections = {
  blog,
  projects
};

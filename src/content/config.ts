import { defineCollection, z } from 'astro:content';

// Define a schema for article frontmatter
const articleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

// Export collections
export const collections = {
  'articles': articleCollection,
};
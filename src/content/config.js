import { defineCollection, z } from 'astro:content';
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    coverImage: z.string().optional(),
    githubUrl: z.string().url().optional(),
    excerpt: z.string(),
  }),
});

export const collections = { projects };
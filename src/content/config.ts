import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().or(z.string()).optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    githubUrl: z.string().url().or(z.string()).optional(),
    excerpt: z.string().optional(),
  }),
});

const status = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.boolean().default(true),
    status: z.string(),
    githubUrl: z.string().url().or(z.string()).optional(),
    tech: z.array(z.string()).default([]),
    lastUpdate: z.string().or(z.date()),
  }),
});

export const collections = {
  projects,
  status,
};

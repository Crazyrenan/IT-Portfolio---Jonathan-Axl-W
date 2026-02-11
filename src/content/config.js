import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    
    tagline: z.string().optional(),
    excerpt: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional().default([]),
    githubUrl: z.string().optional(),
    date: z.date().or(z.string()).optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional().default([])
  }),
});

export const collections = { projects };
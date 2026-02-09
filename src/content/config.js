import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    
    // Allow both "tagline" (New) and "excerpt" (Old)
    tagline: z.string().optional(),
    excerpt: z.string().optional(),
    
    // Allow both "techStack" (New) and "tags" (Old)
    techStack: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional().default([]),
    
    githubUrl: z.string().optional(),
    date: z.date().or(z.string()).optional(),
    
    // Keep as string (path to public folder)
    coverImage: z.string().optional(),
    
    gallery: z.array(z.string()).optional().default([])
  }),
});

export const collections = { projects };
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
const status = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.boolean().default(true),        
    status: z.string(),
    githubUrl: z.string().url().optional(),
    progress: z.number().optional(),        
    description: z.string().optional(),      
    tech: z.array(z.string()),  
    lastUpdate: z.string().or(z.date()), 
  }),
});

export const collections = { 
  projects, 
  status    
};


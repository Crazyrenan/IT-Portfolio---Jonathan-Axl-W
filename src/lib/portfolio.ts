import { getCollection } from 'astro:content';
import { normalizeProjectSummary, type ProjectSummary } from '../data/portfolio';

/**
 * Server-only adapter to fetch and normalize all project summaries from Astro Content Collections.
 * Does not expose raw Markdown bodies or internal Astro objects to client islands.
 */
export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  const rawProjects = await getCollection('projects');
  const summaries = rawProjects.map((p) => normalizeProjectSummary(p.data, p.slug));
  return summaries.sort((a, b) => a.featuredOrder - b.featuredOrder);
}

/**
 * Get top 3 featured projects for Quick View and highlighted showcases.
 */
export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  const all = await getProjectSummaries();
  return all.slice(0, 3);
}

/**
 * Find a single normalized project summary by its slug.
 */
export async function getProjectSummaryBySlug(slug: string): Promise<ProjectSummary | undefined> {
  const all = await getProjectSummaries();
  return all.find((p) => p.slug === slug);
}

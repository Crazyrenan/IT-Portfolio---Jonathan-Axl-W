import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        coverImage: fields.image({
            label: 'Cover Image',
            // This defines where images are saved on your computer:
            directory: 'public/images/projects',
            // This defines how the website finds them:
            publicPath: '/images/projects/',
        }),
        githubUrl: fields.url({ label: 'GitHub Repository URL' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.document({
        label: 'Content',
        formatting: true,
        dividers: true,
        links: true,
        images: {
            directory: 'public/images/projects',
            publicPath: '/images/projects/',
        },
        }),
      },
    }),
  },
});
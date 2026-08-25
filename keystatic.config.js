import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    projects: collection({
      label: 'Mission Log',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Mission Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: false } }),
        tags: fields.array(
          fields.text({ label: 'Tech Stack' }),
          {
            label: 'Technologies',
            itemLabel: (props) => props.value,
          }
        ),
        coverImage: fields.image({
          label: 'Evidence Photo',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Gallery Image',
            directory: 'public/images/projects',
            publicPath: '/images/projects/',
          }),
          {
            label: 'Mission Gallery',
            itemLabel: () => 'Evidence Photo',
          }
        ),
        githubUrl: fields.url({ label: 'GitHub Source URL' }),
        excerpt: fields.text({ label: 'Mission Brief (Excerpt)', multiline: true }),
        content: fields.document({
          label: 'Full Report',
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

    status: collection({
      label: 'Active Mission',
      slugField: 'title',
      path: 'src/content/status/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Project Name' } }),
        published: fields.checkbox({
          label: 'Display on Website',
          description: 'Nonaktifkan jika project sudah selesai atau ingin disembunyikan',
          defaultValue: true,
        }),
        status: fields.text({ label: 'Current Phase' }),
        githubUrl: fields.url({
          label: 'GitHub Repository URL (Optional)',
          description: 'Link ke repo project yang sedang dikerjakan',
        }),
        tech: fields.array(
          fields.text({ label: 'Tech Item' }),
          {
            label: 'Tech Stack Used',
            itemLabel: (props) => props.value,
          }
        ),
        lastUpdate: fields.date({ label: 'Last Log Date' }),
        content: fields.document({
          label: 'Short Description',
          formatting: true,
        }),
      },
    }),
  },
});
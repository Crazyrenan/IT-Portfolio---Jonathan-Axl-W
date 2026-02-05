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
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        
        // Tags Field (This one is correct)
        tags: fields.array(
          fields.text({ label: 'Tech Stack' }), 
          {
            label: 'Technologies',
            itemLabel: (props) => props.value
          }
        ),

        coverImage: fields.image({
          label: 'Evidence Photo',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),

        // --- FIXED GALLERY SECTION ---
        gallery: fields.array(
            fields.image({
                label: 'Gallery Image',
                directory: 'public/images/projects',
                publicPath: '/images/projects/',
            }),
            {
                label: 'Mission Gallery',
                // FIX: Use () => 'String' instead of just 'String'
                itemLabel: (props) => 'Evidence Photo', 
            }
        ),
        // -----------------------------
        
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
  },
});
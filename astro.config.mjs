import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    react({
      experimentalReactChildren: true,
    }), 
    tailwind(), 
    keystatic(),
    markdoc(),
  ],
  output: 'static',
});
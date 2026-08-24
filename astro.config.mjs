import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
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
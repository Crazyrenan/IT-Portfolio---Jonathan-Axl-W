import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';

import markdoc from '@astrojs/markdoc';

export default defineConfig({
  integrations: [
    react({
      // ADD THIS LINE: Disables the "Double Loop" in dev
      include: ['**/react/*'], 
      experimentalReactChildren: true,
    }), 
    tailwind(), 
    keystatic()
  ],
  output: 'static',
});
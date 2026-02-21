import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap(), icon()],

  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),

  site: 'https://ry2x.net',

  vite: {
    plugins: [tailwindcss()]
  }
});

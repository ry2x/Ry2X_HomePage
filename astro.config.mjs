import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap(), icon()],

  site: 'https://ry2x.net',

  vite: {
    plugins: [tailwindcss()],
  },
});

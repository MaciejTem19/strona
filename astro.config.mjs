// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages serves the project under /strona/ — BASE_PATH is set in the deploy workflow, locally it stays at /
  site: 'https://maciejtem19.github.io',
  base: process.env.BASE_PATH ?? '/',

  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()]
  }
});
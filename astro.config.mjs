// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages serves the project under /strona/
  site: 'https://maciejtem19.github.io',
  base: '/strona',

  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()]
  }
});
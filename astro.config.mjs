import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shift-at-midnight-compass.vercel.app',
  integrations: [sitemap()],
  output: 'static',
});

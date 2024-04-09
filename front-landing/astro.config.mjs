import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    domains: ['gustus-images-hexcss-dev'],
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    server: {
        host: '0.0.0.0',
        watch: {
          usePolling: true,
          interval: 500
        }
      },
});

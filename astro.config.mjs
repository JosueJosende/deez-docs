import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://deez-docs.vercel.app',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }
})

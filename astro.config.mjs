import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'


import { remarkAlert } from "remark-github-blockquote-alert";

// https://astro.build/config
export default defineConfig({
  site: 'https://3urdparty.github.io',
  base: "/blog",
  integrations: [
    expressiveCode(expressiveCodeOptions),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap(),
    mdx(),
    icon()
  ],
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkAlert],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow, noopener, noreferrer']
        }
      ]
    ],
    remarkRehype: {
      footnoteLabelProperties: {
        className: ['']
      }
    }
  },
  prefetch: true,
})

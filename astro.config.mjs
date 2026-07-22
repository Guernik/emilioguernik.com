// @ts-check
import { defineConfig } from "astro/config"

// integrations
import tailwindcss from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import icon from "astro-icon"
import sitemap from "@astrojs/sitemap"

// Expressive Code
import astroExpressiveCode from "astro-expressive-code"

// Remark Rehype Plugins
import { unified } from "@astrojs/markdown-remark"
import rehypeExternalLinks from "rehype-external-links"
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs"
import rehypeLightbox from "./src/plugins/rehype-lightbox.mjs"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import mermaid from 'astro-mermaid';

// Sidey Config
import { sideyConfig } from "./sidey.config.ts"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  // Serve pages as `/values` directly (values.html) rather than
  // `/values/` (values/index.html). Avoids the static-host 301 redirect
  // from the bare path, which was defeating link prefetch.
  trailingSlash: "ignore",
  build: {
    format: "file",
  },
  integrations: [astroExpressiveCode(), mdx(), icon(), sitemap(), mermaid({
      theme: 'forest',
      autoTheme: false,
      mermaidConfig: {
        startOnLoad: false,
        logLevel: 'error',
        securityLevel: 'strict'
      }
    })
],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        rehypeLightbox,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["heading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener", "noreferrer", "external"],
          },
        ],
      ],
    }),
  },
  prefetch: {
    // `hover` prefetches the instant the pointer touches a link (~150-300ms
    // before the click lands on desktop), which warms the target HTML in time
    // so the first click isn't a cold fetch. `viewport` only prefetched links
    // already scrolled into view, so a quick or off-screen click hit the
    // network cold — the main cause of the laggy first navigation.
    defaultStrategy: "hover",
    prefetchAll: true,
  },
  site: sideyConfig.site.url,
  vite: {
    plugins: [tailwindcss()],
  },
})

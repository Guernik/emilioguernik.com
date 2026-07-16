# emilioguernik.com

My personal site and blog — built with [Astro](https://astro.build),
base theme: https://github.com/odhyp/astro-sidey.  
Customized with [Hallmark](https://www.usehallmark.com/) Almanac theme.
Deployed to GitHub Pages.

## Project structure

| Folder            | What it does                                                                                                                                                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`      | **File-based routes.** Every file here becomes a URL. Includes the catch-all routes (`[...id].astro`) that render content collections, plus standalone routes like `writings/index.astro` and `404.astro`.                                                                                          |
| `src/content/`    | **Markdown/MDX content**, split into two collections defined in `src/content.config.ts`: `pages/` (standalone pages like `home`, `about`, `values`) and `writings/` (blog posts, which require a `date`). Collection membership — not the layout — decides whether an entry is a page or a writing. |
| `src/layouts/`    | **Layout components** wrapping page content. `pages/SinglePage.astro` renders standalone pages; `pages/WritingPage.astro` renders posts (adds reading time, date, tags, drop-cap); `BaseLayout.astro` is the shared HTML shell.                                                                     |
| `src/components/` | **Reusable components**, grouped by role: `common/` (Prose, tags, back link), `layout/` (sidebar, footer, head), `mdx/` (components usable inside MDX), `section/` (page-section blocks like writing cards).                                                                                        |
| `src/styles/`     | **Global CSS** (`global.css`) — Tailwind v4 setup, the Flexoki palette + shadcn semantic tokens, and the Almanac theme layer.                                                                                                                                                                       |
| `src/utils/`      | **Helpers** — content fetching (`getContent.ts`), date formatting, config parsing.                                                                                                                                                                                                                  |
| `src/plugins/`    | **Remark/rehype plugins** wired in `astro.config.mjs` — reading time, image lightbox.                                                                                                                                                                                                               |
| `public/`         | **Static assets** served as-is at the site root (favicons, images, `CNAME`).                                                                                                                                                                                                                        |
| `scripts/`        | **Node scripts** — e.g. `new-writing.mjs` (scaffolds a new post, run via `npm run new`).                                                                                                                                                                                                            |

### Key files

| File                           | What it's for                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `sidey.config.ts`              | Site identity (title, URL, author, locale) and sidebar navigation.             |
| `src/content.config.ts`        | Defines the `pages` and `writings` collections and their frontmatter schemas.  |
| `astro.config.mjs`             | Astro build config — integrations, markdown/rehype plugins, sitemap, site URL. |
| `src/styles/global.css`        | Global styles, design tokens, and the Almanac theme layer.                     |
| `tokens.css`                   | Portable export of the theme's design tokens.                                  |
| `.nvmrc`                       | Pinned Node version for local dev and CI.                                      |
| `.github/workflows/deploy.yml` | Builds and deploys the site to GitHub Pages.                                   |

## License

Code is [MIT licensed](LICENSE).  
Blog content (posts, images, and other
writing, execpt for quotes) is © Emilio Guernik, all rights reserved.

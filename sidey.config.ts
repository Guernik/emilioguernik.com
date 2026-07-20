// sidey.config.ts

export const sideyConfig = {
  /**
   * Global SEO and Site Identity
   * -------------------------------------------------------------------------
   * These values populate your HTML meta tags, RSS feed definitions,
   * and structural header components across the template.
   */
  site: {
    // The main title displayed in browser tabs and search engine results
    title: "Emilio Guernik",

    // A short fallback summary of your site used for SEO and social share cards
    description: "The personal site and blog of Emilio Guernik.",

    // The production domain where your site is deployed (no trailing slash).
    // Overridable at build time via SITE_URL so the same source can be built
    // for multiple hosts (e.g. the Cloudflare Pages mirror on hackwhite.com).
    // This value bakes into canonical tags, OG URLs, the sitemap, and RSS.
    url: process.env.SITE_URL ?? "https://emilioguernik.com",

    // Your name, utilized in copyright strings and author meta tags
    author: "Emilio Guernik",

    // The primary language attribute for HTML accessibility engines (e.g., "en", "id")
    locale: "en",
  },

  /**
   * Primary Sidebar Navigation
   * -------------------------------------------------------------------------
   * Controls the links rendered inside your fixed navigation panel.
   * You can add, reorder, or remove objects here to update your site's structure.
   */
  navigation: [
    { label: "Home", href: "/" },
    { label: "Values", href: "/values" },
    { label: "Writings", href: "/writings" },
    { label: "Colophon(wip)", href: "/about-this-site" },
    { label: "About", href: "/about" },
    { label: "RSS", href: "/rss.xml" },
  ],
}

export type SideyConfigType = typeof sideyConfig

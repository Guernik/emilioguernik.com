import { describe, it, expect } from "vitest"
import { remarkReadingTime } from "./remark-reading-time.mjs"

// Build the { data } shape Astro passes to remark plugins.
const makeVFile = () => ({ data: { astro: { frontmatter: {} as Record<string, unknown> } } })

// Minimal mdast tree with a single paragraph of `wordCount` words.
const paragraph = (wordCount: number) => ({
  type: "root",
  children: [
    {
      type: "paragraph",
      children: [{ type: "text", value: Array(wordCount).fill("word").join(" ") }],
    },
  ],
})

describe("remarkReadingTime", () => {
  it("sets frontmatter.minutesRead in the '<n> min read' format", () => {
    const vfile = makeVFile()
    remarkReadingTime()(paragraph(50), vfile)
    expect(vfile.data.astro.frontmatter.minutesRead).toMatch(/^\d+ min read$/)
  })

  it("reports more minutes for a longer document", () => {
    const short = makeVFile()
    const long = makeVFile()
    remarkReadingTime()(paragraph(20), short)
    remarkReadingTime()(paragraph(5000), long)

    const minutes = (v: typeof short) =>
      parseInt(String(v.data.astro.frontmatter.minutesRead), 10)

    expect(minutes(long)).toBeGreaterThan(minutes(short))
  })
})

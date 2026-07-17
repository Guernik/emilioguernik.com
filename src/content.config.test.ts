import { describe, it, expect } from "vitest"
import { z } from "astro/zod"

// The collection schemas in content.config.ts are wrapped in defineCollection
// (which needs the astro:content runtime), so we mirror the two z.object
// schemas here and assert the frontmatter contract they enforce. Keep these in
// sync with src/content.config.ts.
const pagesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
})

const writingsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})

describe("pages schema", () => {
  it("accepts valid frontmatter and defaults draft to false", () => {
    const parsed = pagesSchema.parse({ title: "About" })
    expect(parsed.draft).toBe(false)
    expect(parsed.description).toBeUndefined()
  })

  it("rejects frontmatter missing a title", () => {
    expect(pagesSchema.safeParse({}).success).toBe(false)
  })
})

describe("writings schema", () => {
  it("coerces a date string and defaults tags/draft", () => {
    const parsed = writingsSchema.parse({
      title: "Getting started",
      date: "2024-05-01",
    })
    expect(parsed.date).toBeInstanceOf(Date)
    expect(parsed.date.getUTCFullYear()).toBe(2024)
    expect(parsed.tags).toEqual([])
    expect(parsed.draft).toBe(false)
  })

  it("requires a date", () => {
    expect(writingsSchema.safeParse({ title: "No date" }).success).toBe(false)
  })

  it("rejects a non-string tag", () => {
    const result = writingsSchema.safeParse({
      title: "Bad tags",
      date: "2024-05-01",
      tags: [123],
    })
    expect(result.success).toBe(false)
  })
})

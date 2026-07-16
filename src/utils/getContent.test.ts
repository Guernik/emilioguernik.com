import { describe, it, expect, vi, beforeEach } from "vitest"

// Mock astro:content before importing the module under test. getCollection is
// the only external dependency getContent touches. vi.hoisted keeps the mock
// fn available to the hoisted vi.mock factory.
const { getCollection } = vi.hoisted(() => ({ getCollection: vi.fn() }))
vi.mock("astro:content", () => ({ getCollection }))

import { getContent, getPages, getWritings } from "./getContent"

// Minimal entry factory — only the fields getContent reads (data.draft,
// data.date) matter here.
const entry = (id: string, data: Record<string, unknown>) => ({ id, data })

describe("getContent", () => {
  beforeEach(() => {
    getCollection.mockReset()
  })

  it("excludes drafts by default", async () => {
    getCollection.mockResolvedValue([
      entry("a", { draft: false, date: new Date("2024-01-01") }),
      entry("b", { draft: true, date: new Date("2024-02-01") }),
    ])
    const result = await getContent("writings")
    expect(result.map((e) => e.id)).toEqual(["a"])
  })

  it("includes drafts when drafts: true", async () => {
    getCollection.mockResolvedValue([
      entry("a", { draft: false, date: new Date("2024-01-01") }),
      entry("b", { draft: true, date: new Date("2024-02-01") }),
    ])
    const result = await getContent("writings", { drafts: true })
    expect(result.map((e) => e.id).sort()).toEqual(["a", "b"])
  })

  it("sorts by date descending", async () => {
    getCollection.mockResolvedValue([
      entry("old", { draft: false, date: new Date("2024-01-01") }),
      entry("new", { draft: false, date: new Date("2024-03-01") }),
      entry("mid", { draft: false, date: new Date("2024-02-01") }),
    ])
    const result = await getContent("writings")
    expect(result.map((e) => e.id)).toEqual(["new", "mid", "old"])
  })

  it("treats entries without a date as epoch (sorted last)", async () => {
    getCollection.mockResolvedValue([
      entry("dated", { draft: false, date: new Date("2024-01-01") }),
      entry("undated", { draft: false }),
    ])
    const result = await getContent("writings")
    expect(result.map((e) => e.id)).toEqual(["dated", "undated"])
  })

  it("preserves input order when sort: false", async () => {
    getCollection.mockResolvedValue([
      entry("b", { draft: false, date: new Date("2024-01-01") }),
      entry("a", { draft: false, date: new Date("2024-03-01") }),
    ])
    const result = await getContent("writings", { sort: false })
    expect(result.map((e) => e.id)).toEqual(["b", "a"])
  })
})

describe("named getters", () => {
  beforeEach(() => {
    getCollection.mockReset()
  })

  it("getPages does not sort (preserves order)", async () => {
    getCollection.mockResolvedValue([
      entry("z", { draft: false }),
      entry("a", { draft: false }),
    ])
    const result = await getPages()
    expect(getCollection).toHaveBeenCalledWith("pages")
    expect(result.map((e) => e.id)).toEqual(["z", "a"])
  })

  it("getWritings sorts by date descending", async () => {
    getCollection.mockResolvedValue([
      entry("old", { draft: false, date: new Date("2024-01-01") }),
      entry("new", { draft: false, date: new Date("2024-06-01") }),
    ])
    const result = await getWritings()
    expect(getCollection).toHaveBeenCalledWith("writings")
    expect(result.map((e) => e.id)).toEqual(["new", "old"])
  })
})

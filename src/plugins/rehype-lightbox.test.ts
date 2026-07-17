import { describe, it, expect } from "vitest"
import rehypeLightbox from "./rehype-lightbox.mjs"

const element = (tagName: string) => ({
  type: "element",
  tagName,
  properties: {} as Record<string, unknown>,
  children: [],
})

describe("rehypeLightbox", () => {
  it("marks img elements with data-lightbox and a zoom cursor", () => {
    const img = element("img")
    const tree = { type: "root", children: [img] }
    rehypeLightbox()(tree)

    expect(img.properties["data-lightbox"]).toBe("")
    expect(img.properties["style"]).toBe("cursor: zoom-in")
  })

  it("leaves non-img elements untouched", () => {
    const p = element("p")
    const tree = { type: "root", children: [p] }
    rehypeLightbox()(tree)

    expect(p.properties["data-lightbox"]).toBeUndefined()
    expect(p.properties["style"]).toBeUndefined()
  })
})

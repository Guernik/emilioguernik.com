import { visit } from "unist-util-visit"

export default function rehypeLightbox() {
  return (tree) => {
    visit(tree, "element", (node, _index, parent) => {
      if (node.tagName !== "img") return

      // An image inside a link is a badge or a linked thumbnail: the click
      // belongs to the anchor, so don't hijack it with the lightbox.
      if (parent?.type === "element" && parent.tagName === "a") return

      node.properties["data-lightbox"] = ""
      node.properties["style"] = "cursor: zoom-in"
    })
  }
}

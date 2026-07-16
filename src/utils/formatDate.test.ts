import { describe, it, expect } from "vitest"
import { formatDate } from "./formatDate"

describe("formatDate", () => {
  // 2024-01-15T12:00:00Z — noon UTC is well inside a single day everywhere,
  // so the styled output is stable regardless of the fixed Jakarta timezone.
  const date = new Date("2024-01-15T12:00:00Z")

  it("defaults to the long style in en-US", () => {
    expect(formatDate(date)).toBe("January 15, 2024")
  })

  it("formats the medium style", () => {
    expect(formatDate(date, "medium")).toBe("Jan 15, 2024")
  })

  it("formats the short style", () => {
    expect(formatDate(date, "short")).toBe("1/15/24")
  })

  it("applies the hardcoded Asia/Jakarta (UTC+7) timezone", () => {
    // 2024-01-15T20:00:00Z is still Jan 15 in UTC, but +7 pushes it to
    // Jan 16 in Jakarta — proving the timeZone option is honored.
    const lateUtc = new Date("2024-01-15T20:00:00Z")
    expect(formatDate(lateUtc, "medium")).toBe("Jan 16, 2024")
  })

  it("merges caller options over the style preset", () => {
    // Intl forbids mixing a dateStyle preset with individual component
    // options, so a full component override effectively replaces the preset.
    const result = formatDate(date, "long", {
      dateStyle: undefined,
      weekday: "long",
    })
    expect(result).toContain("Monday")
  })
})

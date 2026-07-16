import { test, expect } from "@playwright/test"

test("home page renders", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Emilio Guernik/)
  // Match without the apostrophe — markdown smartypants renders a curly quote.
  await expect(page.getByText(/a software engineer, father/)).toBeVisible()
})

test("sidebar nav reaches the main routes", async ({ page }) => {
  for (const path of ["/writings", "/about", "/values"]) {
    const response = await page.goto(path)
    expect(response?.status(), `${path} should not 404`).toBeLessThan(400)
    await expect(page.locator("h1")).toBeVisible()
  }
})

test("writings index lists posts and links to them", async ({ page }) => {
  await page.goto("/writings")
  await expect(page.getByRole("heading", { name: "Writings", level: 1 })).toBeVisible()

  const cards = page.locator('a[href^="/writings/"]')
  await expect(cards.first()).toBeVisible()
  expect(await cards.count()).toBeGreaterThan(0)
})

test("a writing post opens and shows date + reading time", async ({ page }) => {
  await page.goto("/writings")
  await page.locator('a[href^="/writings/"]').first().click()

  await expect(page).toHaveURL(/\/writings\/.+/)
  await expect(page.locator("time")).toBeVisible()
  await expect(page.getByText(/min read/)).toBeVisible()
})

test("rss feed returns valid xml with items", async ({ request }) => {
  const response = await request.get("/rss.xml")
  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toContain("xml")

  const body = await response.text()
  expect(body).toContain("<item>")
})

test("404 page renders", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist")
  expect(response?.status()).toBe(404)
})

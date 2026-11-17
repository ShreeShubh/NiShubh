import { describe, expect, it } from "vitest"

import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsBySlugs,
  getServiceBySlug,
  getServicesBySlugs,
  projects,
  services,
} from "@/content"

function expectUniqueSlugs(entries: { slug: string }[]) {
  const slugs = entries.map((entry) => entry.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
}

describe("content lookup helpers", () => {
  it("keeps service and project slugs unique", () => {
    expectUniqueSlugs(services)
    expectUniqueSlugs(projects)
  })

  it("finds services by slug and returns undefined for unknown services", () => {
    expect(getServiceBySlug("business-websites")?.title).toBe("Business Websites")
    expect(getServiceBySlug("missing-service")).toBeUndefined()
  })

  it("returns requested services in caller order while skipping missing slugs", () => {
    const selected = getServicesBySlugs([
      "web-applications",
      "missing-service",
      "business-websites",
    ])

    expect(selected.map((service) => service.slug)).toEqual([
      "web-applications",
      "business-websites",
    ])
  })

  it("finds projects by slug and preserves ordered project lookups", () => {
    expect(getProjectBySlug("neelima-studio")?.projectType).toBe("client")

    const selected = getProjectsBySlugs([
      "karamuniko-gem-museum",
      "missing-project",
      "automobile-chat-crm",
    ])

    expect(selected.map((project) => project.slug)).toEqual([
      "karamuniko-gem-museum",
      "automobile-chat-crm",
    ])
  })

  it("exposes only projects explicitly marked as featured", () => {
    expect(getFeaturedProjects().every((project) => project.featured)).toBe(true)
  })
})

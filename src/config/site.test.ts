import { describe, expect, it } from "vitest"

import { services } from "@/content/services"
import { siteConfig } from "@/config/site"

describe("site navigation configuration", () => {
  it("keeps the primary navigation mapped to launch routes", () => {
    expect(siteConfig.nav).toEqual([
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ])
  })

  it("links footer services to known service slugs", () => {
    const serviceSlugs = new Set(services.map((service) => service.slug))

    for (const link of siteConfig.services) {
      const slug = link.href.replace("/services/", "")
      expect(serviceSlugs.has(slug)).toBe(true)
    }
  })

  it("keeps legal navigation on the published policy routes", () => {
    expect(siteConfig.legal.map((link) => link.href)).toEqual(["/privacy-policy", "/terms"])
  })
})

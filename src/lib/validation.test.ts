import { describe, expect, it } from "vitest"

import { contactEnquirySchema, normalizeContactInput } from "@/lib/validation"

const validPayload = {
  name: "  Test User  ",
  email: "  USER@EXAMPLE.COM  ",
  phone: "  +91 9999999999  ",
  company: "  Example Co  ",
  website: "https://example.com",
  service: "business-websites",
  budget: "starter",
  timeline: "within-1-month",
  message: "  We need a professional website with enquiry flow and clear service pages.  ",
  source: "referral",
  consent: true,
  companyWebsite: "",
}

describe("contact form validation", () => {
  it("accepts and normalizes a valid enquiry", () => {
    const parsed = contactEnquirySchema.safeParse(validPayload)

    expect(parsed.success).toBe(true)
    if (!parsed.success) return

    expect(normalizeContactInput(parsed.data)).toMatchObject({
      name: "Test User",
      email: "user@example.com",
      phone: "+91 9999999999",
      company: "Example Co",
      service: "business-websites",
      budget: "starter",
      timeline: "within-1-month",
      source: "referral",
      consent: true,
    })
  })

  it("rejects invalid service, email, short message and missing consent", () => {
    const parsed = contactEnquirySchema.safeParse({
      ...validPayload,
      email: "not-an-email",
      service: "unknown-service",
      message: "Too short",
      consent: false,
    })

    expect(parsed.success).toBe(false)
    if (parsed.success) return

    const errors = parsed.error.flatten().fieldErrors
    expect(errors.email).toBeDefined()
    expect(errors.service).toBeDefined()
    expect(errors.message).toBeDefined()
    expect(errors.consent).toBeDefined()
  })

  it("rejects honeypot submissions", () => {
    const parsed = contactEnquirySchema.safeParse({
      ...validPayload,
      companyWebsite: "https://spam.example",
    })

    expect(parsed.success).toBe(false)
  })
})

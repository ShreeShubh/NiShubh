import { NextRequest } from "next/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  checkRateLimit: vi.fn(),
  sendContactEmail: vi.fn(),
}))

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mocks.checkRateLimit,
}))

vi.mock("@/lib/email", () => ({
  sendContactEmail: mocks.sendContactEmail,
}))

import { POST } from "@/app/api/contact/route"

const validPayload = {
  name: "Test User",
  email: "USER@EXAMPLE.COM",
  phone: "+91 9999999999",
  company: "Example Co",
  website: "https://example.com",
  service: "business-websites",
  budget: "starter",
  timeline: "within-1-month",
  message: "We need a professional website with enquiry flow and clear service pages.",
  source: "referral",
  consent: true,
  companyWebsite: "",
}

function contactRequest(body: unknown) {
  return new NextRequest("https://nishubh.test/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.10",
    },
    body: JSON.stringify(body),
  })
}

describe("contact API route", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.checkRateLimit.mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60_000,
    })
  })

  it("sends a normalized enquiry and returns a success response", async () => {
    mocks.sendContactEmail.mockResolvedValue({
      ok: true,
      provider: "development-fallback",
    })

    const response = await POST(contactRequest(validPayload))
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toMatchObject({
      ok: true,
      provider: "development-fallback",
    })
    expect(mocks.checkRateLimit).toHaveBeenCalledWith(
      expect.objectContaining({ key: "203.0.113.10" }),
    )
    expect(mocks.sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "user@example.com",
        name: "Test User",
        service: "business-websites",
      }),
    )
    expect(mocks.sendContactEmail.mock.calls[0]?.[0]).not.toHaveProperty("companyWebsite")
  })

  it("returns a safe provider failure response when email delivery fails", async () => {
    mocks.sendContactEmail.mockResolvedValue({
      ok: false,
      provider: "resend",
      error: "provider down",
    })

    const response = await POST(contactRequest(validPayload))
    const body = await response.json()

    expect(response.status).toBe(502)
    expect(body).toMatchObject({
      ok: false,
      message:
        "The enquiry could not be sent right now. Please try again or use the WhatsApp alternative.",
    })
  })

  it("returns validation errors without sending email", async () => {
    const response = await POST(contactRequest({ ...validPayload, email: "invalid" }))
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.ok).toBe(false)
    expect(body.issues.email).toBeDefined()
    expect(mocks.sendContactEmail).not.toHaveBeenCalled()
  })

  it("rate limits before reading or sending the enquiry", async () => {
    mocks.checkRateLimit.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt: Date.now() + 60_000,
    })

    const response = await POST(contactRequest(validPayload))
    const body = await response.json()

    expect(response.status).toBe(429)
    expect(body.ok).toBe(false)
    expect(mocks.sendContactEmail).not.toHaveBeenCalled()
  })
})

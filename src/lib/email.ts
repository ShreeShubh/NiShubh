import { budgetOptions, sourceOptions, timelineOptions } from "@/content/contact"
import { services } from "@/content/services"
import type { ContactEnquiryInput } from "@/lib/validation"

type NormalizedContactEnquiry = Omit<ContactEnquiryInput, "companyWebsite">

function labelFor(options: readonly { label: string; value: string }[], value?: string) {
  return options.find((option) => option.value === value)?.label ?? value ?? "Not provided"
}

function serviceLabel(value: string) {
  return services.find((service) => service.slug === value)?.title ?? value
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function enquiryRows(enquiry: NormalizedContactEnquiry) {
  return [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone / WhatsApp", enquiry.phone || "Not provided"],
    ["Business or company", enquiry.company || "Not provided"],
    ["Existing website", enquiry.website || "Not provided"],
    ["Service needed", serviceLabel(enquiry.service)],
    ["Approximate budget", labelFor(budgetOptions, enquiry.budget)],
    ["Preferred launch timeframe", labelFor(timelineOptions, enquiry.timeline)],
    ["How they heard about NiShubh", labelFor(sourceOptions, enquiry.source)],
    ["Consent", enquiry.consent ? "Yes" : "No"],
  ] as const
}

export function createPlainTextEmail(enquiry: NormalizedContactEnquiry) {
  const rows = enquiryRows(enquiry)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")

  return `New project enquiry from ${enquiry.name}

${rows}

Project goals and required features:
${enquiry.message}
`
}

export function createHtmlEmail(enquiry: NormalizedContactEnquiry) {
  const rows = enquiryRows(enquiry)
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`,
    )
    .join("")

  return `<!doctype html>
<html>
  <body style="font-family:Arial,sans-serif;color:#111827">
    <h1 style="font-size:20px">New project enquiry</h1>
    <table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table>
    <h2 style="font-size:16px;margin-top:24px">Project goals and required features</h2>
    <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(enquiry.message)}</p>
  </body>
</html>`
}

export async function sendContactEmail(enquiry: NormalizedContactEnquiry) {
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  const apiKey = process.env.RESEND_API_KEY
  const subject = `New project enquiry: ${serviceLabel(enquiry.service)}`

  if (!to || !from || !apiKey) {
    if (process.env.NODE_ENV !== "production") {
      return { ok: true, provider: "development-fallback" as const }
    }

    return {
      ok: false,
      provider: "resend" as const,
      error: "Email provider is not configured.",
    }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: enquiry.email,
        subject,
        text: createPlainTextEmail(enquiry),
        html: createHtmlEmail(enquiry),
      }),
    })

    if (!response.ok) {
      return {
        ok: false,
        provider: "resend" as const,
        error: "Email provider rejected the request.",
      }
    }

    return { ok: true, provider: "resend" as const }
  } catch {
    return {
      ok: false,
      provider: "resend" as const,
      error: "Email provider could not be reached.",
    }
  }
}

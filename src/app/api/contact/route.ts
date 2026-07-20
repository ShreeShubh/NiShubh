import { NextResponse, type NextRequest } from "next/server"

import { sendContactEmail } from "@/lib/email"
import { checkRateLimit } from "@/lib/rate-limit"
import { contactEnquirySchema, normalizeContactInput } from "@/lib/validation"

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = request.headers.get("x-real-ip")
  return forwardedFor || realIp || "unknown"
}

function numberFromEnv(name: string, fallback: number) {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit({
    key: getClientKey(request),
    limit: numberFromEnv("CONTACT_RATE_LIMIT_MAX", 5),
    windowMs: numberFromEnv("CONTACT_RATE_LIMIT_WINDOW_MS", 10 * 60 * 1000),
  })

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many submissions. Please wait a few minutes and try again.",
      },
      { status: 429 },
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid request body.",
      },
      { status: 400 },
    )
  }

  const parsed = contactEnquirySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const enquiry = normalizeContactInput(parsed.data)
  const result = await sendContactEmail(enquiry)

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The enquiry could not be sent right now. Please try again or use the WhatsApp alternative.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thanks. Your enquiry has been received and the NiShubh team will review the project details.",
    provider: result.provider,
  })
}

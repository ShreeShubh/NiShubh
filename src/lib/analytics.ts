export const analyticsEvents = [
  "cta_click",
  "service_card_click",
  "project_card_click",
  "whatsapp_click",
  "email_click",
  "phone_click",
  "contact_form_start",
  "contact_form_success",
  "contact_form_error",
] as const

export type AnalyticsEvent = (typeof analyticsEvents)[number]

export type AnalyticsPayload = {
  page?: string
  source?: string
  serviceSlug?: string
  projectSlug?: string
  linkId?: string
  reason?: string
}

export type AnalyticsProviderName = "google-analytics" | "plausible"

type AnalyticsConfig = {
  provider: AnalyticsProviderName | null
  gaMeasurementId?: string
  plausibleDomain?: string
  consentRequired: boolean
}

const payloadKeys = [
  "page",
  "source",
  "serviceSlug",
  "projectSlug",
  "linkId",
  "reason",
] as const

export const analyticsConsentStorageKey = "nishubh:analytics-consent"
export const analyticsConsentEventName = "nishubh:analytics-consent"
export const analyticsEventName = "nishubh:analytics"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    plausible?: (eventName: string, options?: { props?: AnalyticsPayload }) => void
  }
}

function normalizeProvider(value?: string): AnalyticsProviderName | null {
  if (value === "ga" || value === "google" || value === "google-analytics") {
    return "google-analytics"
  }

  if (value === "plausible") {
    return "plausible"
  }

  return null
}

export function getAnalyticsConfig(): AnalyticsConfig {
  const provider = normalizeProvider(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER)
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  const hasProviderConfig =
    (provider === "google-analytics" && Boolean(gaMeasurementId)) ||
    (provider === "plausible" && Boolean(plausibleDomain))

  return {
    provider: hasProviderConfig ? provider : null,
    gaMeasurementId,
    plausibleDomain,
    consentRequired: process.env.NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED !== "false",
  }
}

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return analyticsEvents.includes(value as AnalyticsEvent)
}

function cleanValue(value: string) {
  return value.trim().slice(0, 120)
}

export function sanitizeAnalyticsPayload(payload: AnalyticsPayload = {}) {
  const sanitized: AnalyticsPayload = {}

  for (const key of payloadKeys) {
    const value = payload[key]

    if (typeof value === "string" && value.trim()) {
      sanitized[key] = cleanValue(value)
    }
  }

  return sanitized
}

export function hasAnalyticsConsent(config = getAnalyticsConfig()) {
  if (!config.consentRequired) {
    return true
  }

  if (typeof window === "undefined") {
    return false
  }

  return window.localStorage.getItem(analyticsConsentStorageKey) === "granted"
}

export function analyticsAttributes(
  event: AnalyticsEvent,
  payload: AnalyticsPayload = {},
) {
  const sanitized = sanitizeAnalyticsPayload(payload)

  return {
    "data-analytics-event": event,
    "data-analytics-page": sanitized.page,
    "data-analytics-source": sanitized.source,
    "data-analytics-service-slug": sanitized.serviceSlug,
    "data-analytics-project-slug": sanitized.projectSlug,
    "data-analytics-link-id": sanitized.linkId,
    "data-analytics-reason": sanitized.reason,
  }
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return
  }

  const config = getAnalyticsConfig()

  if (!config.provider || !hasAnalyticsConsent(config)) {
    return
  }

  window.dispatchEvent(
    new CustomEvent(analyticsEventName, {
      detail: {
        event,
        payload: sanitizeAnalyticsPayload(payload),
      },
    }),
  )
}

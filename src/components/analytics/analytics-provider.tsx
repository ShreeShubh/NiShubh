"use client"

import Script from "next/script"
import { useEffect, useMemo, useState } from "react"

import {
  analyticsConsentEventName,
  analyticsConsentStorageKey,
  analyticsEventName,
  getAnalyticsConfig,
  hasAnalyticsConsent,
  isAnalyticsEvent,
  sanitizeAnalyticsPayload,
  trackEvent,
  type AnalyticsEvent,
  type AnalyticsPayload,
} from "@/lib/analytics"

type AnalyticsDetail = {
  event?: string
  payload?: AnalyticsPayload
}

function sendToProvider(event: AnalyticsEvent, payload: AnalyticsPayload) {
  const config = getAnalyticsConfig()

  if (!config.provider) {
    return
  }

  if (config.provider === "google-analytics") {
    window.gtag?.("event", event, payload)
    return
  }

  window.plausible?.(event, { props: payload })
}

function payloadFromElement(element: HTMLElement): AnalyticsPayload {
  return sanitizeAnalyticsPayload({
    page: element.dataset.analyticsPage || window.location.pathname,
    source: element.dataset.analyticsSource,
    serviceSlug: element.dataset.analyticsServiceSlug,
    projectSlug: element.dataset.analyticsProjectSlug,
    linkId: element.dataset.analyticsLinkId,
    reason: element.dataset.analyticsReason,
  })
}

export function AnalyticsProvider() {
  const config = useMemo(() => getAnalyticsConfig(), [])
  const [hasConsent, setHasConsent] = useState(() => hasAnalyticsConsent(config))

  useEffect(() => {
    if (!config.provider) {
      return
    }

    function syncConsent() {
      setHasConsent(hasAnalyticsConsent(config))
    }

    function handleConsentEvent(event: Event) {
      const detail = (event as CustomEvent<{ granted?: boolean }>).detail

      if (typeof detail?.granted === "boolean") {
        window.localStorage.setItem(
          analyticsConsentStorageKey,
          detail.granted ? "granted" : "denied",
        )
      }

      syncConsent()
    }

    window.addEventListener("storage", syncConsent)
    window.addEventListener(analyticsConsentEventName, handleConsentEvent)

    return () => {
      window.removeEventListener("storage", syncConsent)
      window.removeEventListener(analyticsConsentEventName, handleConsentEvent)
    }
  }, [config])

  useEffect(() => {
    if (!config.provider || !hasConsent) {
      return
    }

    function handleAnalyticsEvent(event: Event) {
      const detail = (event as CustomEvent<AnalyticsDetail>).detail

      if (!detail?.event || !isAnalyticsEvent(detail.event)) {
        return
      }

      sendToProvider(detail.event, sanitizeAnalyticsPayload(detail.payload))
    }

    function handleClick(event: MouseEvent) {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const element = target.closest<HTMLElement>("[data-analytics-event]")

      if (!element?.dataset.analyticsEvent) {
        return
      }

      if (!isAnalyticsEvent(element.dataset.analyticsEvent)) {
        return
      }

      trackEvent(element.dataset.analyticsEvent, payloadFromElement(element))
    }

    window.addEventListener(analyticsEventName, handleAnalyticsEvent)
    document.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener(analyticsEventName, handleAnalyticsEvent)
      document.removeEventListener("click", handleClick)
    }
  }, [config.provider, hasConsent])

  if (!config.provider || !hasConsent) {
    return null
  }

  if (config.provider === "google-analytics" && config.gaMeasurementId) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${config.gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${config.gaMeasurementId}', { anonymize_ip: true });
          `}
        </Script>
      </>
    )
  }

  if (config.provider === "plausible" && config.plausibleDomain) {
    return (
      <Script
        data-domain={config.plausibleDomain}
        defer
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    )
  }

  return null
}

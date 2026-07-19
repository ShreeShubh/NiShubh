"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { type FormEvent, useEffect, useId, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { Button, ButtonLink } from "@/components/ui"
import { budgetOptions, sourceOptions, timelineOptions } from "@/content/contact"
import { services } from "@/content/services"
import { trackEvent } from "@/lib/analytics"
import { contactEnquirySchema, type ContactEnquiryInput } from "@/lib/validation"

type ContactFormProps = {
  defaultService?: string
  whatsappHref?: string
}

type ApiResponse = {
  ok: boolean
  message: string
}

const inputClasses =
  "focus-ring mt-2 w-full rounded-md border border-border bg-surface px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/70"

const labelClasses = "text-sm font-bold text-foreground"
const hintClasses = "mt-2 text-sm leading-6 text-muted-foreground"
const errorClasses = "mt-2 text-sm font-semibold text-red-700"

function describedBy(...ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(" ")
  return value || undefined
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null
  }

  return (
    <p className={errorClasses} id={id}>
      {message}
    </p>
  )
}

export function ContactForm({ defaultService, whatsappHref }: ContactFormProps) {
  const searchParams = useSearchParams()
  const formId = useId()
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const startedRef = useRef(false)
  const serviceFromParams = searchParams.get("service") ?? defaultService ?? ""

  const serviceDefault = useMemo(() => {
    return services.some((service) => service.slug === serviceFromParams)
      ? serviceFromParams
      : ""
  }, [serviceFromParams])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactEnquiryInput>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      service: serviceDefault,
      budget: "",
      timeline: "",
      message: "",
      source: "",
      consent: false,
      companyWebsite: "",
    },
  })

  useEffect(() => {
    setValue("service", serviceDefault)
  }, [serviceDefault, setValue])

  function handleFormStart() {
    if (startedRef.current) {
      return
    }

    startedRef.current = true
    trackEvent("contact_form_start", {
      page: "/contact",
      serviceSlug: serviceDefault || undefined,
    })
  }

  async function onSubmit(values: ContactEnquiryInput) {
    setStatus("idle")
    setStatusMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      const result = (await response.json()) as ApiResponse

      if (!response.ok || !result.ok) {
        setStatus("error")
        setStatusMessage(result.message)
        trackEvent("contact_form_error", {
          page: "/contact",
          serviceSlug: values.service,
          reason: String(response.status),
        })
        return
      }

      setStatus("success")
      setStatusMessage(result.message)
      trackEvent("contact_form_success", {
        page: "/contact",
        serviceSlug: values.service,
      })
      reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        service: serviceDefault,
        budget: "",
        timeline: "",
        message: "",
        source: "",
        consent: false,
        companyWebsite: "",
      })
      startedRef.current = false
    } catch {
      setStatus("error")
      setStatusMessage("The form could not be submitted right now. Please try again or use WhatsApp.")
      trackEvent("contact_form_error", {
        page: "/contact",
        serviceSlug: serviceDefault || undefined,
        reason: "network",
      })
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(onSubmit)(event)
  }

  return (
    <form className="grid gap-6" onFocus={handleFormStart} onSubmit={handleFormSubmit}>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyWebsite">Company website confirmation</label>
        <input
          id="companyWebsite"
          tabIndex={-1}
          type="text"
          {...register("companyWebsite")}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="name">
            Name *
          </label>
          <input
            aria-describedby={describedBy(errors.name ? `${formId}-name-error` : undefined)}
            aria-invalid={errors.name ? "true" : undefined}
            autoComplete="name"
            className={inputClasses}
            id="name"
            placeholder="Your name"
            type="text"
            {...register("name")}
          />
          <FieldError id={`${formId}-name-error`} message={errors.name?.message} />
        </div>

        <div>
          <label className={labelClasses} htmlFor="email">
            Email *
          </label>
          <input
            aria-describedby={describedBy(errors.email ? `${formId}-email-error` : undefined)}
            aria-invalid={errors.email ? "true" : undefined}
            autoComplete="email"
            className={inputClasses}
            id="email"
            placeholder="you@example.com"
            type="email"
            {...register("email")}
          />
          <FieldError id={`${formId}-email-error`} message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="phone">
            Phone / WhatsApp
          </label>
          <input
            aria-describedby={describedBy(`${formId}-phone-hint`, errors.phone ? `${formId}-phone-error` : undefined)}
            aria-invalid={errors.phone ? "true" : undefined}
            autoComplete="tel"
            className={inputClasses}
            id="phone"
            placeholder="+91 ..."
            type="tel"
            {...register("phone")}
          />
          <p className={hintClasses} id={`${formId}-phone-hint`}>
            Optional, but helpful when WhatsApp is the preferred follow-up.
          </p>
          <FieldError id={`${formId}-phone-error`} message={errors.phone?.message} />
        </div>

        <div>
          <label className={labelClasses} htmlFor="company">
            Business or company
          </label>
          <input
            aria-describedby={describedBy(errors.company ? `${formId}-company-error` : undefined)}
            aria-invalid={errors.company ? "true" : undefined}
            autoComplete="organization"
            className={inputClasses}
            id="company"
            placeholder="Business name"
            type="text"
            {...register("company")}
          />
          <FieldError id={`${formId}-company-error`} message={errors.company?.message} />
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="website">
          Existing website
        </label>
        <input
          aria-describedby={describedBy(`${formId}-website-hint`, errors.website ? `${formId}-website-error` : undefined)}
          aria-invalid={errors.website ? "true" : undefined}
          autoComplete="url"
          className={inputClasses}
          id="website"
          placeholder="https://example.com"
          type="url"
          {...register("website")}
        />
        <p className={hintClasses} id={`${formId}-website-hint`}>
          Leave blank if this is a new project.
        </p>
        <FieldError id={`${formId}-website-error`} message={errors.website?.message} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="service">
            Service needed *
          </label>
          <select
            aria-describedby={describedBy(errors.service ? `${formId}-service-error` : undefined)}
            aria-invalid={errors.service ? "true" : undefined}
            className={inputClasses}
            id="service"
            {...register("service")}
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
          <FieldError id={`${formId}-service-error`} message={errors.service?.message} />
        </div>

        <div>
          <label className={labelClasses} htmlFor="budget">
            Approximate budget range *
          </label>
          <select
            aria-describedby={describedBy(errors.budget ? `${formId}-budget-error` : undefined)}
            aria-invalid={errors.budget ? "true" : undefined}
            className={inputClasses}
            id="budget"
            {...register("budget")}
          >
            <option value="">Choose a budget range</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id={`${formId}-budget-error`} message={errors.budget?.message} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="timeline">
            Preferred launch timeframe
          </label>
          <select
            aria-describedby={describedBy(errors.timeline ? `${formId}-timeline-error` : undefined)}
            aria-invalid={errors.timeline ? "true" : undefined}
            className={inputClasses}
            id="timeline"
            {...register("timeline")}
          >
            <option value="">Choose a timeframe</option>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id={`${formId}-timeline-error`} message={errors.timeline?.message} />
        </div>

        <div>
          <label className={labelClasses} htmlFor="source">
            How did you hear about NiShubh?
          </label>
          <select
            aria-describedby={describedBy(errors.source ? `${formId}-source-error` : undefined)}
            aria-invalid={errors.source ? "true" : undefined}
            className={inputClasses}
            id="source"
            {...register("source")}
          >
            <option value="">Choose an option</option>
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id={`${formId}-source-error`} message={errors.source?.message} />
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="message">
          Project goals and required features *
        </label>
        <textarea
          aria-describedby={describedBy(`${formId}-message-hint`, errors.message ? `${formId}-message-error` : undefined)}
          aria-invalid={errors.message ? "true" : undefined}
          className={inputClasses}
          id="message"
          placeholder="Tell me what you want to build, what the site should achieve, and any pages or features you already know you need."
          rows={7}
          {...register("message")}
        />
        <p className={hintClasses} id={`${formId}-message-hint`}>
          Do not include passwords, API keys or sensitive customer data.
        </p>
        <FieldError id={`${formId}-message-error`} message={errors.message?.message} />
      </div>

      <div>
        <label className="flex gap-3 rounded-md border border-border bg-surface p-4 text-sm text-muted-foreground">
          <input
            aria-describedby={describedBy(errors.consent ? `${formId}-consent-error` : undefined)}
            aria-invalid={errors.consent ? "true" : undefined}
            className="mt-1 size-4 shrink-0"
            type="checkbox"
            {...register("consent")}
          />
          <span>
            I agree that NiShubh may use these details to respond to this enquiry. *
          </span>
        </label>
        <FieldError id={`${formId}-consent-error`} message={errors.consent?.message} />
      </div>

      {statusMessage ? (
        <div
          aria-live="polite"
          className={
            status === "success"
              ? "rounded-md border border-accent/20 bg-accent/10 p-4 text-sm font-semibold text-accent"
              : "rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
          }
          role="status"
        >
          {status === "success" ? (
            <CheckCircle2 aria-hidden="true" className="mr-2 inline size-5" />
          ) : null}
          {statusMessage}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button disabled={isSubmitting} size="lg" type="submit">
          {isSubmitting ? (
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
          ) : null}
          Send Enquiry
          <ArrowRight aria-hidden="true" className="size-5" />
        </Button>
        {whatsappHref ? (
          <ButtonLink
            href={whatsappHref}
            onClick={() =>
              trackEvent("whatsapp_click", {
                page: "/contact",
                serviceSlug: serviceDefault || undefined,
              })
            }
            size="lg"
            variant="outline"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
            WhatsApp Instead
          </ButtonLink>
        ) : null}
      </div>
    </form>
  )
}

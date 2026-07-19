import { z } from "zod"

import { budgetOptions, sourceOptions, timelineOptions } from "@/content/contact"
import { services } from "@/content/services"

const serviceValues: string[] = services.map((service) => service.slug)
const budgetValues: string[] = budgetOptions.map((option) => option.value)
const timelineValues: string[] = timelineOptions.map((option) => option.value)
const sourceValues: string[] = sourceOptions.map((option) => option.value)

function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer.`)
    .optional()
    .or(z.literal(""))
}

export const contactEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(160, "Email must be 160 characters or fewer."),
  phone: optionalText(40),
  company: optionalText(120),
  website: z
    .string()
    .trim()
    .url("Enter a valid URL, including https://.")
    .max(220, "Website URL must be 220 characters or fewer.")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .trim()
    .refine((value) => serviceValues.includes(value), "Choose a service."),
  budget: z
    .string()
    .trim()
    .refine((value) => budgetValues.includes(value), "Choose an approximate budget range."),
  timeline: z
    .string()
    .trim()
    .refine((value) => value === "" || timelineValues.includes(value), "Choose a launch timeframe.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Share a little more about the project.")
    .max(2500, "Project details must be 2500 characters or fewer."),
  source: z
    .string()
    .trim()
    .refine((value) => value === "" || sourceValues.includes(value), "Choose a source.")
    .optional()
    .or(z.literal("")),
  consent: z.boolean().refine((value) => value, "Consent is required before submitting."),
  companyWebsite: z.string().max(0, "Spam check failed.").optional().or(z.literal("")),
})

export type ContactEnquiryInput = z.input<typeof contactEnquirySchema>

export function normalizeContactInput(input: ContactEnquiryInput) {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || undefined,
    company: input.company?.trim() || undefined,
    website: input.website?.trim() || undefined,
    service: input.service.trim(),
    budget: input.budget.trim(),
    timeline: input.timeline?.trim() || undefined,
    message: input.message.trim(),
    source: input.source?.trim() || undefined,
    consent: input.consent,
  }
}

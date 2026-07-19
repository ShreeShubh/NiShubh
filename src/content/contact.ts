export const budgetOptions = [
  { label: "PLACEHOLDER: Under minimum budget", value: "under-minimum" },
  { label: "PLACEHOLDER: Starter website budget", value: "starter" },
  { label: "PLACEHOLDER: Growth website budget", value: "growth" },
  { label: "PLACEHOLDER: Custom application budget", value: "custom-application" },
  { label: "Not sure yet", value: "not-sure" },
] as const

export const timelineOptions = [
  { label: "As soon as practical", value: "asap" },
  { label: "Within 1 month", value: "within-1-month" },
  { label: "1-3 months", value: "1-3-months" },
  { label: "3+ months", value: "3-plus-months" },
  { label: "Flexible / planning ahead", value: "flexible" },
] as const

export const sourceOptions = [
  { label: "Referral", value: "referral" },
  { label: "Google/Search", value: "search" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "GitHub", value: "github" },
  { label: "Other", value: "other" },
] as const

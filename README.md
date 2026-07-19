# NiShubh

Production-quality freelance website development and digital services website for Shubham Shree.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React server components by default

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run quality checks:

```bash
npm run type-check
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and replace placeholder values before using production-only features.

Required before launch:

- `NEXT_PUBLIC_SITE_URL`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_WHATSAPP_NUMBER`

Optional later:

- `RESEND_API_KEY`
- analytics provider variables

## Analytics

Analytics is provider-neutral and safely no-ops until configured. The site only tracks these documented events:

- `cta_click`
- `service_card_click`
- `project_card_click`
- `whatsapp_click`
- `email_click`
- `phone_click`
- `contact_form_start`
- `contact_form_success`
- `contact_form_error`

Allowed event properties are limited to `page`, `source`, `serviceSlug`, `projectSlug`, `linkId` and `reason`. Do not send names, email addresses, phone numbers, company names, websites, budgets or message content.

Configure one provider:

```bash
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=example.com
```

or:

```bash
NEXT_PUBLIC_ANALYTICS_PROVIDER=google-analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Consent is required by default:

```bash
NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED=true
```

When consent is required, no analytics script loads and no event is sent until the browser has `localStorage["nishubh:analytics-consent"] = "granted"` or a consent UI dispatches:

```js
window.dispatchEvent(
  new CustomEvent("nishubh:analytics-consent", {
    detail: { granted: true },
  }),
)
```

Set `NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED=false` only when your deployment policy allows analytics without a consent gate.

## Contact Workflow

The `/contact` page posts to `/api/contact`.

Development behavior:

- If `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, or `CONTACT_FROM_EMAIL` are missing, submissions use a development-safe fallback.
- The fallback does not send email and does not log the full sensitive form payload.

Production requirements:

- Set `CONTACT_TO_EMAIL`
- Set `CONTACT_FROM_EMAIL`
- Set `RESEND_API_KEY`
- Replace placeholder WhatsApp/contact values in `src/config/site.ts`

The form uses React Hook Form and Zod, includes a honeypot field, server-side validation, a simple in-memory rate limit, and analytics hooks that never include personal form content.

## Content Notes

Brand name: `NiShubh`

Tagline currently in config: `Digital Product Studio`

Earlier supplied tagline to confirm: `Building Modern Digital Experiences.`

Final domain, logo, favicon, contact details and social links still need to be supplied. Do not invent clients, testimonials, awards, certifications, metrics or credentials. Mark uncertain content with `PLACEHOLDER`.

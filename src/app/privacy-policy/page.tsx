import { AlertTriangle, CheckCircle2 } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import {
  Badge,
  ButtonLink,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui"
import { siteConfig } from "@/config/site"
import { analyticsAttributes } from "@/lib/analytics"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  graphJsonLd,
  webPageSchema,
} from "@/lib/schemas"

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Starter privacy policy template for NiShubh. Final business and legal review is required before launch.",
  path: "/privacy-policy",
})

const privacySections = [
  {
    title: "Information collected",
    body: "The website may collect project enquiry details you submit through the contact form, such as name, email address, phone number, company name, project requirements, service interest, timeline and budget range. Server logs, spam-prevention signals and basic technical information may also be processed for security and reliability.",
  },
  {
    title: "How information is used",
    body: "Submitted information is intended to be used to respond to enquiries, understand project scope, prepare proposals, provide requested services, maintain website security and improve the enquiry workflow. PLACEHOLDER: Confirm all actual processing purposes before launch.",
  },
  {
    title: "Contact form and email handling",
    body: "Contact form submissions are validated server-side and may be sent to the configured owner email address through the selected transactional email provider. The website should not ask for passwords, API keys, payment details or sensitive customer records.",
  },
  {
    title: "Analytics",
    body: "Analytics is designed to track only non-personal interaction events such as CTA clicks, project card clicks, service card clicks and contact form status events. Form names, email addresses, phone numbers and message content must not be sent to analytics. PLACEHOLDER: Confirm final analytics provider and consent requirements.",
  },
  {
    title: "Sharing and processors",
    body: "Information may be processed by service providers used for hosting, email delivery, analytics, spam prevention and operational support. PLACEHOLDER: List final providers, countries and processing terms after deployment choices are confirmed.",
  },
  {
    title: "Retention",
    body: "Enquiry information should be kept only as long as needed to respond, manage project conversations, meet legal obligations and maintain business records. PLACEHOLDER: Confirm final retention periods.",
  },
  {
    title: "Your choices",
    body: "You may request access, correction or deletion of your personal information using the contact details provided on this website, subject to applicable law and legitimate business record requirements. PLACEHOLDER: Confirm jurisdiction-specific rights and response process.",
  },
  {
    title: "Updates",
    body: "This policy may be updated when services, providers, legal requirements or website functionality changes. The final page should include an effective date and a process for reviewing changes.",
  },
] as const

function LegalJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]),
        webPageSchema({
          name: "Privacy Policy",
          path: "/privacy-policy",
          description:
            "Starter privacy policy template for NiShubh requiring final review.",
        }),
      ])}
    />
  )
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalJsonLd />

      <Section>
        <Container>
          <div className="max-w-4xl">
            <Badge variant="primary">Starter Legal Template</Badge>
            <h1 className="text-heading-1 mt-6 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-lead mt-6 text-muted-foreground">
              This is starter website copy for {siteConfig.name}. It is not
              legal advice and must be reviewed, completed and approved for the
              final business, jurisdiction, providers and operating process
              before launch.
            </p>
          </div>

          <Card className="mt-10 border-primary/30 bg-primary/5">
            <AlertTriangle aria-hidden="true" className="size-6 text-primary" />
            <CardHeader className="mt-4">
              <CardTitle>Review required before publication</CardTitle>
              <CardDescription>
                Replace every PLACEHOLDER item, confirm data practices, add an
                effective date and obtain qualified business/legal review before
                treating this as a final policy.
              </CardDescription>
            </CardHeader>
          </Card>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="Each section is intentionally plain and conservative. Final wording should match the real website operations."
            eyebrow="Policy Draft"
            title="Starter privacy sections"
          />
          <div className="mt-10 grid gap-5">
            {privacySections.map((section) => (
              <Card key={section.title}>
                <div className="flex gap-4">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-accent"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-body mt-3 text-muted-foreground">
                      {section.body}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-heading-2 text-foreground">
                Contact details must be finalized.
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-muted-foreground">
                The final policy should show a real business contact channel,
                legal business name and effective date.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                href="/contact"
                {...analyticsAttributes("cta_click", {
                  page: "/privacy-policy",
                  source: "privacy_final_cta",
                  linkId: "contact",
                })}
                size="lg"
              >
                Contact
              </ButtonLink>
              <Link
                className="focus-ring inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-primary hover:underline"
                href="/terms"
              >
                View Terms
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

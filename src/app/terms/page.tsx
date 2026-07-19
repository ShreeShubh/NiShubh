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
  title: "Terms",
  description:
    "Starter terms template for NiShubh website visitors and project enquiries. Final business and legal review is required before launch.",
  path: "/terms",
})

const termsSections = [
  {
    title: "Purpose of this website",
    body: "This website presents website development and digital service information for NiShubh and allows prospective clients to submit project enquiries. It does not create a client relationship, agreement or obligation until scope, fees, responsibilities and terms are separately agreed in writing.",
  },
  {
    title: "Starter information only",
    body: "Service descriptions, process notes, timelines, budget ranges and project examples are provided for general understanding. PLACEHOLDER: Confirm final service claims, pricing approach, timeline language and proposal workflow before launch.",
  },
  {
    title: "Project proposals and agreements",
    body: "Any project should be governed by a separate proposal, statement of work, invoice or written agreement that defines deliverables, exclusions, timeline, payment terms, revision rounds, dependencies, launch requirements and support boundaries.",
  },
  {
    title: "Client responsibilities",
    body: "Clients are expected to provide accurate business details, content, images, brand assets, access credentials through secure channels, timely feedback and final factual approvals. Clients should not submit passwords, secret keys or sensitive customer records through the public contact form.",
  },
  {
    title: "Intellectual property",
    body: "Ownership and usage rights for code, design, content, assets, third-party materials and reusable components should be specified in the final project agreement. PLACEHOLDER: Confirm final IP, licensing and portfolio-use terms.",
  },
  {
    title: "Third-party services",
    body: "Projects may use hosting, domain, analytics, email, CMS, payment, map, media or other third-party services. Their terms, pricing, availability and policies are controlled by the respective providers. PLACEHOLDER: List important providers when final stack decisions are made.",
  },
  {
    title: "No guaranteed outcomes",
    body: "The website must not promise search rankings, revenue, lead volume, performance scores, approval outcomes or business results unless those guarantees are explicitly supported by a final signed agreement and applicable evidence.",
  },
  {
    title: "Limitation and updates",
    body: "Final terms should include jurisdiction, liability limits, dispute process, payment defaults, cancellation rules, maintenance/support boundaries and update procedure after qualified review. PLACEHOLDER: Complete with appropriate legal guidance.",
  },
] as const

function LegalJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]),
        webPageSchema({
          name: "Terms",
          path: "/terms",
          description: "Starter terms template for NiShubh requiring final review.",
        }),
      ])}
    />
  )
}

export default function TermsPage() {
  return (
    <>
      <LegalJsonLd />

      <Section>
        <Container>
          <div className="max-w-4xl">
            <Badge variant="primary">Starter Legal Template</Badge>
            <h1 className="text-heading-1 mt-6 text-foreground">Terms</h1>
            <p className="text-lead mt-6 text-muted-foreground">
              This page is starter content for {siteConfig.name}. It is not
              legal advice and does not replace a project agreement, business
              terms, local legal review or professional counsel.
            </p>
          </div>

          <Card className="mt-10 border-primary/30 bg-primary/5">
            <AlertTriangle aria-hidden="true" className="size-6 text-primary" />
            <CardHeader className="mt-4">
              <CardTitle>Review required before publication</CardTitle>
              <CardDescription>
                Confirm jurisdiction, business entity details, payment terms,
                cancellation policy, ownership rules, liability limits and
                support boundaries before treating this page as final.
              </CardDescription>
            </CardHeader>
          </Card>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="These sections are deliberately conservative and should be aligned with the real proposal and contract workflow."
            eyebrow="Terms Draft"
            title="Starter terms sections"
          />
          <div className="mt-10 grid gap-5">
            {termsSections.map((section) => (
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
                Final terms belong in the project workflow too.
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-muted-foreground">
                The public page should match proposal, invoice, revision,
                support and ownership terms used with real clients.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                href="/contact"
                {...analyticsAttributes("cta_click", {
                  page: "/terms",
                  source: "terms_final_cta",
                  linkId: "contact",
                })}
                size="lg"
              >
                Contact
              </ButtonLink>
              <Link
                className="focus-ring inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-primary hover:underline"
                href="/privacy-policy"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

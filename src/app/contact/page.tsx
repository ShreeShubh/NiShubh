import { Mail, MessageCircle, ShieldCheck } from "lucide-react"
import type { Metadata } from "next"

import { ContactForm } from "@/components/forms/contact-form"
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui"
import { siteConfig } from "@/config/site"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  graphJsonLd,
  webPageSchema,
} from "@/lib/schemas"

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Send a structured project enquiry to NiShubh for website development, redesign, web application or maintenance support.",
  path: "/contact",
})

type ContactPageProps = {
  searchParams?: Promise<{
    service?: string
    project?: string
  }>
}

function whatsappHref() {
  const number = siteConfig.contact.whatsapp

  if (!number || number.startsWith("PLACEHOLDER")) {
    return undefined
  }

  const message = encodeURIComponent(
    `Hi ${siteConfig.name}, I want to discuss a website or web application project.`,
  )

  return `https://wa.me/${number}?text=${message}`
}

function ContactJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
        webPageSchema({
          type: "ContactPage",
          name: "Contact",
          path: "/contact",
          description: "Project enquiry page for NiShubh.",
        }),
      ])}
    />
  )
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const selectedService = params?.service
  const whatsapp = whatsappHref()

  return (
    <>
      <ContactJsonLd />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge variant="primary">Contact</Badge>
              <h1 className="text-heading-1 mt-6 text-foreground">
                Tell me what you want to build.
              </h1>
              <p className="text-lead mt-6 max-w-3xl text-muted-foreground">
                Use the enquiry form to share goals, service needs, budget
                range, timeline and current website details. The response can
                then focus on scope and next steps instead of guesswork.
              </p>
              <div className="mt-8 grid gap-4">
                <Card>
                  <Mail aria-hidden="true" className="size-6 text-primary" />
                  <CardHeader className="mt-4">
                    <CardTitle>Expected response</CardTitle>
                    <CardDescription>
                      A submitted enquiry shows a success state and is sent to
                      the owner email when the email provider is configured.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <ShieldCheck aria-hidden="true" className="size-6 text-accent" />
                  <CardHeader className="mt-4">
                    <CardTitle>Privacy-minded by default</CardTitle>
                    <CardDescription>
                      The form validates input server-side, avoids client-side
                      secrets, uses a spam honeypot and does not send form
                      content to analytics.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <MessageCircle aria-hidden="true" className="size-6 text-primary" />
                  <CardHeader className="mt-4">
                    <CardTitle>WhatsApp alternative</CardTitle>
                    <CardDescription>
                      A prefilled WhatsApp link appears after the final number is
                      added to the central site configuration.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <Card className="p-5 sm:p-7">
              <SectionHeading
                description="Fields marked with * are required."
                eyebrow="Project Enquiry"
                title="Start the conversation"
              />
              <div className="mt-8">
                <ContactForm defaultService={selectedService} whatsappHref={whatsapp} />
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}

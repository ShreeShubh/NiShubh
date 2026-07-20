import { ArrowRight, Check, Clock, Layers3, MessageCircle } from "lucide-react"
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
  IconFrame,
  Section,
  SectionHeading,
} from "@/components/ui"
import { services } from "@/content"
import { analyticsAttributes } from "@/lib/analytics"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  graphJsonLd,
  serviceSchema,
} from "@/lib/schemas"

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Website development, redesign, landing page, e-commerce, web application and maintenance services from NiShubh.",
  path: "/services",
})

function ServicesJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
        ...services.map((service) => serviceSchema(service)),
      ])}
    />
  )
}

export default function ServicesPage() {
  const engagementOptions = [
    "New website builds for service businesses and professionals",
    "Focused landing pages for offers, campaigns and validation",
    "Redesigns and performance improvements for outdated websites",
    "Custom interfaces, integrations and support for web applications",
  ]

  return (
    <>
      <ServicesJsonLd />

      <Section>
        <Container>
          <div className="max-w-4xl">
            <Badge variant="primary">Services</Badge>
            <h1 className="text-heading-1 mt-6 text-foreground">
              Practical web development services for businesses that need a
              stronger digital presence.
            </h1>
            <p className="text-lead mt-6 max-w-3xl text-muted-foreground">
              NiShubh helps turn business goals into fast, modern and
              maintainable websites or web applications, from planning and UI to
              implementation, deployment and handover.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                {...analyticsAttributes("cta_click", {
                  page: "/services",
                  source: "services_hero",
                  linkId: "discuss_project",
                })}
                size="lg"
              >
                Discuss Your Project
                <MessageCircle aria-hidden="true" className="size-5" />
              </ButtonLink>
              <ButtonLink
                href="/work"
                {...analyticsAttributes("cta_click", {
                  page: "/services",
                  source: "services_hero",
                  linkId: "view_work",
                })}
                size="lg"
                variant="outline"
              >
                View Work
                <ArrowRight aria-hidden="true" className="size-5" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="Choose the service closest to your current need. Scope, exclusions and timelines are confirmed after discovery."
            eyebrow="Service Menu"
            title="What NiShubh can build"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Card className="flex h-full flex-col" key={service.slug}>
                <IconFrame>
                  <Layers3 aria-hidden="true" className="size-5" />
                </IconFrame>
                <CardHeader className="mt-5">
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.idealFor.slice(0, 2).map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
                <Link
                  className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:underline"
                  href={`/services/${service.slug}`}
                  {...analyticsAttributes("service_card_click", {
                    page: "/services",
                    source: "services_overview",
                    serviceSlug: service.slug,
                  })}
                >
                  Explore service
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              description="Projects are scoped around the outcome first, then translated into deliverables, milestones and technical choices."
              eyebrow="Engagements"
              title="Common starting points"
            />
            <div className="grid gap-4">
              {engagementOptions.map((option) => (
                <div
                  className="flex gap-3 rounded-md border border-border bg-surface p-5"
                  key={option}
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-accent"
                  />
                  <p className="text-body text-muted-foreground">{option}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-background" data-header-theme="dark">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge className="border-background/20 bg-background/10 text-background">
                Next Step
              </Badge>
              <h2 className="text-heading-2 mt-5 max-w-3xl text-background">
                Start with a short discovery conversation.
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-background/72">
                Share the service you need, your existing website if any, and
                the outcome you want. The scope can then be shaped around real
                constraints instead of assumptions.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                className="bg-background text-foreground hover:bg-background/90"
                href="/contact"
                {...analyticsAttributes("cta_click", {
                  page: "/services",
                  source: "services_final_cta",
                  linkId: "discuss_project",
                })}
                size="lg"
              >
                Discuss Your Project
              </ButtonLink>
              <ButtonLink
                className="border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
                href="/process"
                {...analyticsAttributes("cta_click", {
                  page: "/services",
                  source: "services_final_cta",
                  linkId: "view_process",
                })}
                size="lg"
                variant="outline"
              >
                View Process
                <Clock aria-hidden="true" className="size-5" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

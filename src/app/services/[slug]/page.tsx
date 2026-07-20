import { ArrowRight, Check, CircleSlash, Clock, MessageCircle } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  Badge,
  ButtonLink,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  FaqItem,
  Section,
  SectionHeading,
  TechnologyTag,
} from "@/components/ui"
import {
  getFaqsBySlugs,
  getProjectsBySlugs,
  getServiceBySlug,
  projectTypeLabels,
  services,
} from "@/content"
import { analyticsAttributes } from "@/lib/analytics"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  graphJsonLd,
  serviceSchema,
} from "@/lib/schemas"
import type { Service } from "@/types/content"

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

function displayText(value: string, fallback: string) {
  return value.includes("PLACEHOLDER") ? fallback : value
}

function servicePath(service: Service) {
  return `/services/${service.slug}`
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      path: "/services",
      noIndex: true,
    })
  }

  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    path: servicePath(service),
  })
}

function Breadcrumbs({ service }: { service: Service }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link className="focus-ring rounded-sm hover:text-foreground" href="/">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            className="focus-ring rounded-sm hover:text-foreground"
            href="/services"
          >
            Services
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-semibold text-foreground">
          {service.title}
        </li>
      </ol>
    </nav>
  )
}

function ServiceJsonLd({ service }: { service: Service }) {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: servicePath(service) },
        ]),
        serviceSchema(service),
      ])}
    />
  )
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const relatedProjects = getProjectsBySlugs(service.relatedProjectSlugs)
  const serviceFaqs = getFaqsBySlugs(service.faqSlugs)
  const timeline = displayText(
    service.timeline ?? "",
    "Timeline is confirmed after discovery based on page count, content readiness, integrations and review cycles.",
  )

  return (
    <>
      <ServiceJsonLd service={service} />

      <Section>
        <Container>
          <Breadcrumbs service={service} />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <Badge variant="primary">Service</Badge>
              <h1 className="text-heading-1 mt-6 text-foreground">
                {service.title}
              </h1>
              <p className="text-lead mt-6 max-w-3xl text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={`/contact?service=${service.slug}`}
                  {...analyticsAttributes("cta_click", {
                    page: servicePath(service),
                    source: "service_detail_hero",
                    serviceSlug: service.slug,
                    linkId: "discuss_service",
                  })}
                  size="lg"
                >
                  Discuss This Service
                  <MessageCircle aria-hidden="true" className="size-5" />
                </ButtonLink>
                <ButtonLink
                  href="/work"
                  {...analyticsAttributes("cta_click", {
                    page: servicePath(service),
                    source: "service_detail_hero",
                    serviceSlug: service.slug,
                    linkId: "view_related_work",
                  })}
                  size="lg"
                  variant="outline"
                >
                  View Related Work
                  <ArrowRight aria-hidden="true" className="size-5" />
                </ButtonLink>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Good fit for</CardTitle>
                <CardDescription>
                  Typical clients or situations this service is designed for.
                </CardDescription>
              </CardHeader>
              <div className="mt-5 grid gap-3">
                {service.idealFor.map((item) => (
                  <div className="flex gap-3" key={item}>
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-accent"
                    />
                    <span className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                description="Deliverables are scoped around a business outcome and confirmed in the proposal."
                eyebrow="Outcomes"
                title="What this service can include"
              />
              <div className="mt-8 grid gap-3">
                {service.deliverables.map((deliverable) => (
                  <div
                    className="flex gap-3 rounded-md border border-border bg-background p-4"
                    key={deliverable}
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-accent"
                    />
                    <p className="text-body text-muted-foreground">
                      {deliverable}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                description="Boundaries keep the project predictable and protect launch quality."
                eyebrow="Scope"
                title="Included and excluded"
              />
              <div className="mt-8 grid gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Included</CardTitle>
                  </CardHeader>
                  <div className="mt-5 grid gap-3">
                    {service.included.map((item) => (
                      <div className="flex gap-3" key={item}>
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-5 shrink-0 text-accent"
                        />
                        <span className="text-sm leading-6 text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Not included by default</CardTitle>
                  </CardHeader>
                  <div className="mt-5 grid gap-3">
                    {service.excluded.map((item) => (
                      <div className="flex gap-3" key={item}>
                        <CircleSlash
                          aria-hidden="true"
                          className="mt-1 size-5 shrink-0 text-muted-foreground"
                        />
                        <span className="text-sm leading-6 text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                description={timeline}
                eyebrow="Timeline"
                title="Planned after discovery"
              />
              <Card className="mt-8">
                <Clock aria-hidden="true" className="size-6 text-primary" />
                <p className="text-body mt-4 text-muted-foreground">
                  Pricing is proposal-based and shaped by scope, content,
                  integrations, review cycles and launch requirements. Fixed
                  promises are avoided until the details are known.
                </p>
              </Card>
            </div>
            <div>
              <SectionHeading
                description="A practical service workflow from first conversation to launch-ready delivery."
                eyebrow="Process"
                title="How this service is delivered"
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.process.map((step, index) => (
                  <Card className="p-5" key={step}>
                    <span className="text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-foreground">
                      {step}
                    </h3>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="Related project entries stay conservative until screenshots, permissions, roles and outcomes are verified."
            eyebrow="Related Work"
            title="Relevant project examples"
          />
          {relatedProjects.length > 0 ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <Card key={project.slug}>
                  <Badge>{projectTypeLabels[project.projectType]}</Badge>
                  <CardHeader className="mt-4">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.industry}</CardDescription>
                  </CardHeader>
                  <p className="text-body mt-4 text-muted-foreground">
                    {displayText(
                      project.summary,
                      "Case study details are being finalized with verified scope, screenshots and contribution notes.",
                    )}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((item) => (
                      <TechnologyTag key={item}>
                        {displayText(item, "Stack to confirm")}
                      </TechnologyTag>
                    ))}
                  </div>
                  <Link
                    className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:underline"
                    href={`/work/${project.slug}`}
                    {...analyticsAttributes("project_card_click", {
                      page: servicePath(service),
                      source: "service_related_work",
                      serviceSlug: service.slug,
                      projectSlug: project.slug,
                    })}
                  >
                    View case study
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-10">
              <CardTitle>Project examples are being selected.</CardTitle>
              <CardDescription className="mt-3">
                This service can still be scoped; related case studies will be
                added after verified project details and screenshots are ready.
              </CardDescription>
            </Card>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            description="Answers are kept practical until proposal-specific details are confirmed."
            eyebrow="FAQ"
            title="Questions about this service"
          />
          <div className="mt-10 grid items-start gap-4 lg:grid-cols-2">
            {serviceFaqs.map((faq) => (
              <FaqItem key={faq.slug} question={faq.question}>
                <p className="text-body mt-4 text-muted-foreground">
                  {displayText(
                    faq.answer,
                    "This answer will be finalized with verified pricing, timeline or policy details before launch.",
                  )}
                </p>
              </FaqItem>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-background" data-header-theme="dark">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge className="border-background/20 bg-background/10 text-background">
                {service.title}
              </Badge>
              <h2 className="text-heading-2 mt-5 max-w-3xl text-background">
                Want to explore whether this is the right scope?
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-background/72">
                Send a short project brief, existing website link if available,
                preferred timeline and the outcome you want the project to
                support.
              </p>
            </div>
            <ButtonLink
              className="bg-background text-foreground hover:bg-background/90"
              href={`/contact?service=${service.slug}`}
              {...analyticsAttributes("cta_click", {
                page: servicePath(service),
                source: "service_detail_final_cta",
                serviceSlug: service.slug,
                linkId: "discuss_service",
              })}
              size="lg"
            >
              Discuss This Service
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  )
}

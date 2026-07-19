import {
  ArrowRight,
  Check,
  Code2,
  ExternalLink,
  Layers3,
  MessageCircle,
  MonitorSmartphone,
  Search,
} from "lucide-react"
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
  TechnologyTag,
} from "@/components/ui"
import { siteConfig } from "@/config/site"
import {
  clientExpectations,
  faqs,
  getFeaturedProjects,
  getFeaturedServices,
  homeCta,
  processSteps,
  projectTypeLabels,
  technologyGroups,
  testimonials,
  trustSignals,
  whyWorkWithMe,
} from "@/content"
import { buildMetadata } from "@/lib/metadata"
import { analyticsAttributes } from "@/lib/analytics"
import {
  JsonLd,
  graphJsonLd,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/schemas"

export const metadata: Metadata = buildMetadata({
  title: "Modern Website Development",
  description:
    "NiShubh builds fast, modern and conversion-focused websites and web applications with Next.js, MERN and direct developer support.",
  path: "/",
})

const serviceIcons = [MonitorSmartphone, Layers3, Search, Code2] as const

function cleanPlaceholder(value: string, fallback: string) {
  return value.includes("PLACEHOLDER") ? fallback : value
}

function HomeJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        personSchema(),
        professionalServiceSchema(),
        websiteSchema(),
      ])}
    />
  )
}

function HeroVisual() {
  return (
    <div
      aria-label="Website interface preview"
      className="relative mx-auto w-full max-w-xl"
      role="img"
    >
      <div className="rounded-xl border border-border bg-surface p-3 shadow-soft">
        <div className="rounded-lg border border-border bg-background">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-primary/70" />
            <span className="size-2.5 rounded-full bg-accent/70" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-auto h-2 w-24 rounded-full bg-muted" />
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="h-5 w-28 rounded-full bg-primary/12" />
              <div className="h-8 w-4/5 rounded-md bg-foreground/90" />
              <div className="h-3 w-full rounded-full bg-muted" />
              <div className="h-3 w-4/5 rounded-full bg-muted" />
              <div className="flex gap-2 pt-2">
                <div className="h-9 w-28 rounded-md bg-primary" />
                <div className="h-9 w-24 rounded-md border border-border bg-surface" />
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-md border border-border bg-surface p-3">
                <div className="h-3 w-16 rounded-full bg-accent/35" />
                <div className="mt-3 h-12 rounded-md bg-muted" />
              </div>
              <div className="rounded-md border border-border bg-surface p-3">
                <div className="h-3 w-20 rounded-full bg-primary/20" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-10 rounded bg-muted" />
                  <div className="h-10 rounded bg-muted" />
                  <div className="h-10 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const featuredServices = getFeaturedServices().slice(0, 4)
  const featuredProjects = getFeaturedProjects().slice(0, 3)
  const displayedFaqs = faqs.slice(0, 6)
  const hasTestimonials = testimonials.length > 0

  return (
    <>
      <HomeJsonLd />

      <Section className="overflow-hidden">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="reveal">
            <Badge variant="primary">{siteConfig.tagline}</Badge>
            <h1 className="text-display mt-6 max-w-4xl text-foreground">
              Modern websites that help your business look credible and win more
              customers.
            </h1>
            <p className="text-lead mt-6 max-w-2xl text-muted-foreground">
              NiShubh designs and develops fast, responsive and easy-to-manage
              websites and web applications using modern MERN and Next.js
              technology.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                {...analyticsAttributes("cta_click", {
                  page: "/",
                  source: "home_hero",
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
                  page: "/",
                  source: "home_hero",
                  linkId: "view_work",
                })}
                size="lg"
                variant="outline"
              >
                View My Work
                <ArrowRight aria-hidden="true" className="size-5" />
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Direct website development support from {siteConfig.ownerName}.
              Final portfolio facts are being verified before launch.
            </p>
          </div>

          <HeroVisual />
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface" spacing="tight">
        <Container>
          <h2 className="sr-only">Technology and trust signals</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((signal) => (
              <div
                className="flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3"
                key={signal}
              >
                <Check aria-hidden="true" className="size-5 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  {signal}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              description="Start with the service that matches the business problem: credibility, speed, conversion, application workflow or long-term support."
              eyebrow="Services"
              title="Website and application development services"
            />
            <ButtonLink
              className="md:mb-1"
              href="/services"
              {...analyticsAttributes("cta_click", {
                page: "/",
                source: "home_services_preview",
                linkId: "view_all_services",
              })}
              variant="outline"
            >
              View all services
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service, index) => {
              const Icon =
                serviceIcons[index % serviceIcons.length] ?? MonitorSmartphone

              return (
                <Card className="flex h-full flex-col" key={service.slug}>
                  <IconFrame tone={index % 2 === 0 ? "primary" : "accent"}>
                    <Icon aria-hidden="true" className="size-5" />
                  </IconFrame>
                  <CardHeader className="mt-5">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <Link
                    className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:underline"
                    href={`/services/${service.slug}`}
                    {...analyticsAttributes("service_card_click", {
                      page: "/",
                      source: "home_services_preview",
                      serviceSlug: service.slug,
                    })}
                  >
                    Learn more
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              description="Case studies are seeded conservatively until screenshots, permissions, exact roles and outcomes are finalized."
              eyebrow="Selected Work"
              title="Project proof with honest labels"
            />
            <ButtonLink
              className="md:mb-1"
              href="/work"
              {...analyticsAttributes("cta_click", {
                page: "/",
                source: "home_work_preview",
                linkId: "view_work",
              })}
              variant="outline"
            >
              View work
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card className="overflow-hidden p-0" key={project.slug}>
                <div className="aspect-[16/10] border-b border-border bg-muted p-5">
                  <div className="h-full rounded-md border border-border bg-surface p-4">
                    <div className="h-3 w-24 rounded-full bg-primary/20" />
                    <div className="mt-5 h-8 w-3/4 rounded-md bg-foreground/85" />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-12 rounded bg-muted" />
                      <div className="h-12 rounded bg-muted" />
                      <div className="h-12 rounded bg-muted" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Badge>{projectTypeLabels[project.projectType]}</Badge>
                  <h3 className="mt-4 text-xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {project.industry}
                  </p>
                  <p className="text-body mt-4 text-muted-foreground">
                    {cleanPlaceholder(
                      project.summary,
                      "Case study details are being finalized with verified scope, screenshots and contribution notes.",
                    )}
                  </p>
                  <Link
                    className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:underline"
                    href={`/work/${project.slug}`}
                    {...analyticsAttributes("project_card_click", {
                      page: "/",
                      source: "home_work_preview",
                      projectSlug: project.slug,
                    })}
                  >
                    View case study
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            description="The working model is intentionally practical: clear communication, scoped delivery and maintainable implementation."
            eyebrow="Why Work With Me"
            title="Built for business owners who need clarity, not theatre"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {whyWorkWithMe.map((item, index) => (
              <Card className="reveal" key={item.title}>
                <div className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-body mt-2 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="A simple, transparent delivery path from first discussion to launch and support."
            eyebrow="Process"
            title="How projects move from idea to production"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-7">
            {processSteps.map((step, index) => (
              <Card className="p-5" key={step.slug}>
                <span className="text-sm font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {hasTestimonials ? (
            <SectionHeading eyebrow="Testimonials" title="What clients say" />
          ) : (
            <>
              <SectionHeading
                description="Real testimonials will be added only after permission is available. Until then, this section sets clear expectations."
                eyebrow="Client Expectations"
                title="What clients can expect"
              />
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {clientExpectations.map((expectation) => (
                  <div
                    className="flex gap-3 rounded-md border border-border bg-surface p-5"
                    key={expectation}
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-accent"
                    />
                    <p className="text-body text-muted-foreground">
                      {expectation}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="The stack stays modern, practical and maintainable, with extra services added only when the project scope needs them."
            eyebrow="Technology"
            title="A capable modern web stack"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {technologyGroups.map((group) => (
              <Card key={group.slug}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechnologyTag key={item}>{item}</TechnologyTag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            description="These answers keep early project conversations grounded before a detailed proposal is prepared."
            eyebrow="FAQ"
            title="Common questions before starting"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {displayedFaqs.map((faq) => (
              <details
                className="group rounded-lg border border-border bg-surface p-5 shadow-card"
                key={faq.slug}
              >
                <summary className="focus-ring cursor-pointer rounded-sm text-base font-bold text-foreground marker:text-primary">
                  {faq.question}
                </summary>
                <p className="text-body mt-4 text-muted-foreground">
                  {cleanPlaceholder(
                    faq.answer,
                    "This answer will be finalized with verified pricing, timeline or policy details before launch.",
                  )}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-background">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge
                className="border-background/20 bg-background/10 text-background"
                variant="neutral"
              >
                Start a Project
              </Badge>
              <h2 className="text-heading-2 mt-5 max-w-3xl text-background">
                {homeCta.title}
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-background/72">
                {homeCta.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                className="bg-background text-foreground hover:bg-background/90"
                href="/contact"
                {...analyticsAttributes("cta_click", {
                  page: "/",
                  source: "home_final_cta",
                  linkId: "discuss_project",
                })}
                size="lg"
              >
                Discuss Your Project
              </ButtonLink>
              <ButtonLink
                className="border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
                href="/work"
                {...analyticsAttributes("cta_click", {
                  page: "/",
                  source: "home_final_cta",
                  linkId: "view_work",
                })}
                size="lg"
                variant="outline"
              >
                View My Work
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

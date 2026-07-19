import { ArrowRight, Check, Code2, ImageIcon, MessageCircle } from "lucide-react"
import type { Metadata } from "next"

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
import {
  aboutProfile,
  capabilityGroups,
  experienceSummary,
  technologyGroups,
  workingPrinciples,
} from "@/content"
import { analyticsAttributes } from "@/lib/analytics"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  graphJsonLd,
  personSchema,
} from "@/lib/schemas"

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Shubham Shree, the MERN and Next.js developer behind NiShubh, and the practical working principles behind the service.",
  path: "/about",
})

function AboutJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
        personSchema(),
      ])}
    />
  )
}

function ProfilePlaceholder() {
  return (
    <div
      aria-label="Developer profile image placeholder"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft"
      role="img"
    >
      <div className="aspect-[4/5] rounded-lg border border-border bg-muted p-6">
        <div className="flex h-full flex-col justify-between rounded-md bg-background p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              SS
            </span>
            <div>
              <div className="h-3 w-28 rounded-full bg-foreground/80" />
              <div className="mt-2 h-2 w-20 rounded-full bg-muted" />
            </div>
          </div>
          <ImageIcon aria-hidden="true" className="size-10 text-primary" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-muted" />
            <div className="h-3 w-4/5 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <AboutJsonLd />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.68fr] lg:items-center">
          <div>
            <Badge variant="primary">About NiShubh</Badge>
            <h1 className="text-heading-1 mt-6 text-foreground">
              {aboutProfile.title}
            </h1>
            <p className="text-lead mt-6 max-w-3xl text-muted-foreground">
              {aboutProfile.summary}
            </p>
            <p className="text-body mt-5 max-w-3xl text-muted-foreground">
              {aboutProfile.story}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                {...analyticsAttributes("cta_click", {
                  page: "/about",
                  source: "about_hero",
                  linkId: "discuss_project",
                })}
                size="lg"
              >
                Discuss a Project
                <MessageCircle aria-hidden="true" className="size-5" />
              </ButtonLink>
              <ButtonLink
                href="/work"
                {...analyticsAttributes("cta_click", {
                  page: "/about",
                  source: "about_hero",
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
          <ProfilePlaceholder />
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="A focused capability set for small-business websites, service pages, MVP interfaces and maintainable web applications."
            eyebrow="Capabilities"
            title="What Shubham can help with"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilityGroups.map((group) => (
              <Card key={group.title}>
                <IconFrame>
                  <Code2 aria-hidden="true" className="size-5" />
                </IconFrame>
                <CardHeader className="mt-5">
                  <CardTitle>{group.title}</CardTitle>
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
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              description="The page stays intentionally honest: no employer history, certifications, awards or performance claims are added until supplied and verified."
              eyebrow="Experience"
              title="A practical development profile"
            />
            <div className="grid gap-4">
              {experienceSummary.map((item) => (
                <div className="flex gap-3 rounded-md border border-border bg-surface p-5" key={item}>
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                  <p className="text-body text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="These principles keep projects grounded, maintainable and aligned with real business needs."
            eyebrow="Working Principles"
            title="How NiShubh approaches client work"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {workingPrinciples.map((principle) => (
              <Card key={principle.title}>
                <CardHeader>
                  <CardTitle>{principle.title}</CardTitle>
                  <CardDescription>{principle.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            description="The stack is selected to support fast interfaces, practical integrations and clean handover."
            eyebrow="Technology"
            title="Current technical focus"
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

      <Section className="bg-foreground text-background">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge className="border-background/20 bg-background/10 text-background">
                Work Directly
              </Badge>
              <h2 className="text-heading-2 mt-5 max-w-3xl text-background">
                Need direct development support for a website or web app?
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-background/72">
                Share your goals, current website and preferred timeline so the
                scope can be shaped around real constraints.
              </p>
            </div>
            <ButtonLink
              className="bg-background text-foreground hover:bg-background/90"
              href="/contact"
              {...analyticsAttributes("cta_click", {
                page: "/about",
                source: "about_final_cta",
                linkId: "discuss_project",
              })}
              size="lg"
            >
              Discuss Your Project
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  )
}

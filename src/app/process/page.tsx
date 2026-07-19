import { ArrowRight, Check, Clock, MessageCircle } from "lucide-react"
import type { Metadata } from "next"

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
import { processSteps } from "@/content"
import { analyticsAttributes } from "@/lib/analytics"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  graphJsonLd,
  webPageSchema,
} from "@/lib/schemas"

export const metadata: Metadata = buildMetadata({
  title: "Process",
  description:
    "The NiShubh project process from discovery and proposal through UX direction, development, QA, launch and support.",
  path: "/process",
})

const clientResponsibilities = [
  "Share business goals, audience, service details and any existing website or references.",
  "Provide factual content, brand assets, images and access needed for scoped integrations.",
  "Give consolidated feedback during agreed review windows.",
  "Approve launch details, legal content, contact information and final business claims.",
] as const

const communicationExpectations = [
  "Project scope, milestones, exclusions and dependencies are documented before implementation.",
  "Questions and decisions are kept direct so blockers can be resolved quickly.",
  "Progress updates should focus on completed work, open decisions and next steps.",
] as const

const revisionBoundaries = [
  "Revision rounds should be agreed in the proposal, including what counts as a revision.",
  "New pages, new features or major direction changes are treated as scope changes.",
  "Final factual approval remains with the business owner before launch.",
] as const

function ProcessJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ]),
        webPageSchema({
          name: "Process",
          path: "/process",
          description:
            "Project workflow for NiShubh website and web application development services.",
        }),
      ])}
    />
  )
}

function ChecklistCard({
  title,
  items,
}: {
  title: string
  items: readonly string[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div className="flex gap-3" key={item}>
            <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function ProcessPage() {
  return (
    <>
      <ProcessJsonLd />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-start">
            <div>
              <Badge variant="primary">Process</Badge>
              <h1 className="text-heading-1 mt-6 text-foreground">
                A clear path from first discovery to launch and support.
              </h1>
              <p className="text-lead mt-6 max-w-3xl text-muted-foreground">
                The NiShubh process is designed to reduce ambiguity before
                development begins, keep implementation focused and make launch
                responsibilities visible.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  {...analyticsAttributes("cta_click", {
                    page: "/process",
                    source: "process_hero",
                    linkId: "discuss_project",
                  })}
                  size="lg"
                >
                  Discuss Your Project
                  <MessageCircle aria-hidden="true" className="size-5" />
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  {...analyticsAttributes("cta_click", {
                    page: "/process",
                    source: "process_hero",
                    linkId: "explore_services",
                  })}
                  size="lg"
                  variant="outline"
                >
                  Explore Services
                  <ArrowRight aria-hidden="true" className="size-5" />
                </ButtonLink>
              </div>
            </div>
            <Card>
              <Clock aria-hidden="true" className="size-7 text-primary" />
              <CardHeader className="mt-5">
                <CardTitle>Scope before speed</CardTitle>
                <CardDescription>
                  Fast execution works best when goals, content, review
                  responsibilities and technical dependencies are known early.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="Each step creates a clearer path for the next one, from goals and proposal through launch checks and support."
            eyebrow="Workflow"
            title="The seven project stages"
          />
          <div className="mt-10 grid gap-5">
            {processSteps.map((step, index) => (
              <Card key={step.slug}>
                <div className="grid gap-5 lg:grid-cols-[0.18fr_0.82fr]">
                  <div>
                    <span className="text-heading-3 text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-heading-3 text-foreground">
                      {step.title}
                    </h2>
                    <p className="text-body mt-3 text-muted-foreground">
                      {step.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {step.details.map((detail) => (
                        <Badge key={detail}>{detail}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            description="Good projects need clear ownership on both sides. These boundaries protect quality and timeline."
            eyebrow="Working Agreement"
            title="Responsibilities, communication and revisions"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <ChecklistCard
              items={clientResponsibilities}
              title="Client responsibilities"
            />
            <ChecklistCard
              items={communicationExpectations}
              title="Communication expectations"
            />
            <ChecklistCard
              items={revisionBoundaries}
              title="Revision boundaries"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-background">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge className="border-background/20 bg-background/10 text-background">
                Start With Discovery
              </Badge>
              <h2 className="text-heading-2 mt-5 max-w-3xl text-background">
                Bring the goals, references and constraints. The scope can be
                shaped from there.
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-background/72">
                A short project enquiry is enough to identify the right next
                step, whether that is a business website, redesign, landing page
                or web application.
              </p>
            </div>
            <ButtonLink
              className="bg-background text-foreground hover:bg-background/90"
              href="/contact"
              {...analyticsAttributes("cta_click", {
                page: "/process",
                source: "process_final_cta",
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

import { ArrowRight, BriefcaseBusiness, Check, MessageCircle } from "lucide-react"
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
import { ProjectImage } from "@/components/projects/project-image"
import { getFeaturedProjects, projects, projectTypeLabels } from "@/content"
import { analyticsAttributes } from "@/lib/analytics"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  collectionPageSchema,
  graphJsonLd,
} from "@/lib/schemas"

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected NiShubh website and web application project entries, labelled honestly while final case study facts are verified.",
  path: "/work",
})

function displayText(value: string, fallback: string) {
  return value.includes("PLACEHOLDER") ? fallback : value
}

function ProjectPreview({
  title,
  src,
  alt,
  priority = false,
}: {
  title: string
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <ProjectImage
      alt={alt}
      className="aspect-[16/10] border-b border-border bg-muted"
      fallback={
        <div
          aria-label={`${title} project visual placeholder`}
          className="aspect-[16/10] border-b border-border bg-muted p-5"
          role="img"
        >
          <div className="h-full rounded-md border border-border bg-surface p-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary/60" />
              <span className="size-2 rounded-full bg-accent/60" />
              <span className="h-2 w-20 rounded-full bg-muted" />
            </div>
            <div className="mt-6 h-7 w-3/4 rounded-md bg-foreground/85" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
            </div>
            <div className="mt-4 h-3 w-full rounded-full bg-muted" />
            <div className="mt-2 h-3 w-2/3 rounded-full bg-muted" />
          </div>
        </div>
      }
      priority={priority}
      src={src}
    />
  )
}

function WorkJsonLd() {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]),
        collectionPageSchema({
          name: "Work",
          path: "/work",
          description:
            "Selected project entries for NiShubh website and web application work.",
        }),
      ])}
    />
  )
}

export default function WorkPage() {
  const featuredProjects = getFeaturedProjects()

  return (
    <>
      <WorkJsonLd />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <Badge variant="primary">Work</Badge>
              <h1 className="text-heading-1 mt-6 text-foreground">
                Selected project entries with honest labels and verified-scope
                discipline.
              </h1>
              <p className="text-lead mt-6 max-w-3xl text-muted-foreground">
                These case study entries are prepared from known project names
                and will be completed with screenshots, roles, permissions and
                outcomes before launch. No client claims or metrics are
                fabricated.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  {...analyticsAttributes("cta_click", {
                    page: "/work",
                    source: "work_hero",
                    linkId: "start_similar_project",
                  })}
                  size="lg"
                >
                  Start a Similar Project
                  <MessageCircle aria-hidden="true" className="size-5" />
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  {...analyticsAttributes("cta_click", {
                    page: "/work",
                    source: "work_hero",
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
              <IconFrame>
                <BriefcaseBusiness aria-hidden="true" className="size-5" />
              </IconFrame>
              <CardHeader className="mt-5">
                <CardTitle>Featured first</CardTitle>
                <CardDescription>
                  The strongest available entries are highlighted first, while
                  every card keeps its project type visible.
                </CardDescription>
              </CardHeader>
              <div className="mt-5 grid gap-3">
                {[
                  "Case studies explain context, decisions and contribution.",
                  "Results are shown only when verified.",
                  "Client, personal and concept labels stay explicit.",
                ].map((item) => (
                  <div className="flex gap-3" key={item}>
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-accent"
                    />
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="Filtering is not shown yet because the seeded data is mostly one project type. It can be added with URL state once there are enough verified categories."
            eyebrow="Featured"
            title="Highlighted project entries"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card className="overflow-hidden p-0" key={project.slug}>
                <ProjectPreview
                  alt={displayText(
                    project.gallery[0]?.alt ?? "",
                    `${project.title} project preview`,
                  )}
                  priority={project.slug === "neelima-studio"}
                  src={project.coverImage}
                  title={project.title}
                />
                <div className="p-6">
                  <Badge>{projectTypeLabels[project.projectType]}</Badge>
                  <h2 className="mt-4 text-xl font-bold text-foreground">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {project.industry}
                  </p>
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
                      page: "/work",
                      source: "featured_work",
                      projectSlug: project.slug,
                    })}
                  >
                    View case study
                    <ArrowRight aria-hidden="true" className="size-4" />
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
            description="All seeded entries are available below. Final launch should replace placeholder summaries with verified case-study details."
            eyebrow="All Work"
            title="Project archive"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card className="flex h-full flex-col" key={project.slug}>
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
                <Link
                  className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:underline"
                  href={`/work/${project.slug}`}
                  {...analyticsAttributes("project_card_click", {
                    page: "/work",
                    source: "work_archive",
                    projectSlug: project.slug,
                  })}
                >
                  Read case study
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

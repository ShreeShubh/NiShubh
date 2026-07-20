import { ArrowLeft, ExternalLink, ImageIcon, MessageCircle } from "lucide-react"
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
  Section,
  SectionHeading,
  TechnologyTag,
} from "@/components/ui"
import { ProjectImage } from "@/components/projects/project-image"
import {
  getProjectBySlug,
  projectTypeLabels,
  projects,
  services,
} from "@/content"
import { analyticsAttributes } from "@/lib/analytics"
import { buildMetadata } from "@/lib/metadata"
import {
  JsonLd,
  breadcrumbListSchema,
  creativeWorkSchema,
  graphJsonLd,
} from "@/lib/schemas"
import type { Project } from "@/types/content"

type WorkDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

function displayText(value: string, fallback: string) {
  return value.includes("PLACEHOLDER") ? fallback : value
}

function displayList(items: string[]) {
  return items.filter((item) => !item.includes("PLACEHOLDER"))
}

function projectPath(project: Project) {
  return `/work/${project.slug}`
}

function serviceTitle(slug: string) {
  return services.find((service) => service.slug === slug)?.title ?? slug
}

function getAdjacentProjects(project: Project) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : undefined

  return { previousProject, nextProject }
}

function getRelatedProjects(project: Project) {
  return projects
    .filter(
      (item) =>
        item.slug !== project.slug &&
        item.services.some((service) => project.services.includes(service)),
    )
    .slice(0, 3)
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return buildMetadata({
      title: "Case Study Not Found",
      path: "/work",
      noIndex: true,
    })
  }

  return buildMetadata({
    title: project.title,
    description: displayText(
      project.summary,
      `${project.title} case study entry for NiShubh. Final verified project details are being prepared.`,
    ),
    path: projectPath(project),
  })
}

function Breadcrumbs({ project }: { project: Project }) {
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
          <Link className="focus-ring rounded-sm hover:text-foreground" href="/work">
            Work
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-semibold text-foreground">
          {project.title}
        </li>
      </ol>
    </nav>
  )
}

function CaseStudyJsonLd({ project }: { project: Project }) {
  return (
    <JsonLd
      data={graphJsonLd([
        breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: projectPath(project) },
        ]),
        creativeWorkSchema({
          project,
          description: displayText(
            project.summary,
            `${project.title} case study entry with verified details pending.`,
          ),
        }),
      ])}
    />
  )
}

function ProjectMedia({
  title,
  src,
  alt,
  caption,
  priority = false,
}: {
  title: string
  src: string
  alt: string
  caption?: string
  priority?: boolean
}) {
  const fallbackAlt = displayText(alt, `${title} screenshot placeholder`)

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
      <ProjectImage
        alt={fallbackAlt}
        className="aspect-[16/10] bg-muted"
        fallback={
          <div
            aria-label={fallbackAlt}
            className="aspect-[16/10] bg-muted p-5"
            role="img"
          >
            <div className="flex h-full flex-col rounded-md border border-border bg-background p-5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary/60" />
                <span className="size-2 rounded-full bg-accent/60" />
                <span className="h-2 w-20 rounded-full bg-muted" />
              </div>
              <div className="mt-8 flex items-center gap-3">
                <ImageIcon aria-hidden="true" className="size-6 text-primary" />
                <div className="h-6 w-3/5 rounded-md bg-foreground/85" />
              </div>
              <div className="mt-auto grid grid-cols-3 gap-3">
                <div className="h-16 rounded bg-muted" />
                <div className="h-16 rounded bg-muted" />
                <div className="h-16 rounded bg-muted" />
              </div>
            </div>
          </div>
        }
        priority={priority}
        sizes="(min-width: 1024px) 960px, 100vw"
        src={src}
      />
      <figcaption className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
        {displayText(
          caption ?? "",
          "Screenshot and caption will be replaced after verified project assets are available.",
        )}
      </figcaption>
    </figure>
  )
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const verifiedFeatures = displayList(project.features)
  const verifiedResults = displayList(project.results)
  const relatedProjects = getRelatedProjects(project)
  const { previousProject, nextProject } = getAdjacentProjects(project)
  const hasExternalLinks = project.liveUrl || project.repositoryUrl

  return (
    <>
      <CaseStudyJsonLd project={project} />

      <Section>
        <Container>
          <Breadcrumbs project={project} />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <Badge>{projectTypeLabels[project.projectType]}</Badge>
              <h1 className="text-heading-1 mt-6 text-foreground">
                {project.title}
              </h1>
              <p className="text-lead mt-6 max-w-3xl text-muted-foreground">
                {displayText(
                  project.summary,
                  "This case study is being finalized with verified scope, screenshots, contribution notes and permissions.",
                )}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  {...analyticsAttributes("cta_click", {
                    page: projectPath(project),
                    source: "work_detail_hero",
                    projectSlug: project.slug,
                    linkId: "start_similar_project",
                  })}
                  size="lg"
                >
                  Start a Similar Project
                  <MessageCircle aria-hidden="true" className="size-5" />
                </ButtonLink>
                <ButtonLink
                  href="/work"
                  {...analyticsAttributes("cta_click", {
                    page: projectPath(project),
                    source: "work_detail_hero",
                    projectSlug: project.slug,
                    linkId: "back_to_work",
                  })}
                  size="lg"
                  variant="outline"
                >
                  Back to Work
                  <ArrowLeft aria-hidden="true" className="size-5" />
                </ButtonLink>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                  A conservative summary until final case-study facts are
                  approved.
                </CardDescription>
              </CardHeader>
              <dl className="mt-5 grid gap-4 text-sm">
                <div>
                  <dt className="font-bold text-foreground">Industry</dt>
                  <dd className="mt-1 text-muted-foreground">{project.industry}</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">Role</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {displayText(
                      project.role,
                      "Role and responsibilities are pending verification.",
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <TechnologyTag key={service}>
                        {serviceTitle(service)}
                      </TechnologyTag>
                    ))}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <ProjectMedia
            alt={project.gallery[0]?.alt ?? `${project.title} project preview`}
            caption={project.gallery[0]?.caption}
            priority
            src={project.gallery[0]?.src ?? project.coverImage}
            title={project.title}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Challenge</CardTitle>
                <CardDescription>
                  What the project needed to solve or improve.
                </CardDescription>
              </CardHeader>
              <p className="text-body mt-5 text-muted-foreground">
                {displayText(
                  project.challenge,
                  "The challenge statement is pending verified project details.",
                )}
              </p>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
                <CardDescription>
                  The implementation direction and contribution.
                </CardDescription>
              </CardHeader>
              <p className="text-body mt-5 text-muted-foreground">
                {displayText(
                  project.solution,
                  "The solution summary is pending verified contribution notes.",
                )}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                description="Stack details will be narrowed to the exact technologies used before launch."
                eyebrow="Stack"
                title="Technology"
              />
              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <TechnologyTag key={item}>
                    {displayText(item, "Stack to confirm")}
                  </TechnologyTag>
                ))}
              </div>
              {hasExternalLinks ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl ? (
                    <ButtonLink
                      href={project.liveUrl}
                      {...analyticsAttributes("cta_click", {
                        page: projectPath(project),
                        source: "work_detail_external_links",
                        projectSlug: project.slug,
                        linkId: "live_site",
                      })}
                      variant="outline"
                    >
                      Live Site
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </ButtonLink>
                  ) : null}
                  {project.repositoryUrl ? (
                    <ButtonLink
                      href={project.repositoryUrl}
                      {...analyticsAttributes("cta_click", {
                        page: projectPath(project),
                        source: "work_detail_external_links",
                        projectSlug: project.slug,
                        linkId: "repository",
                      })}
                      variant="outline"
                    >
                      Repository
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </ButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div>
              <SectionHeading
                description="Features and results are shown only when they are verified."
                eyebrow="Features & Results"
                title="What can be shown"
              />
              <div className="mt-8 grid gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  {verifiedFeatures.length > 0 ? (
                    <ul className="mt-5 grid gap-3">
                      {verifiedFeatures.map((feature) => (
                        <li className="text-body text-muted-foreground" key={feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-body mt-5 text-muted-foreground">
                      Feature list will be added after project scope is verified.
                    </p>
                  )}
                </Card>
                {verifiedResults.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Results</CardTitle>
                    </CardHeader>
                    <ul className="mt-5 grid gap-3">
                      {verifiedResults.map((result) => (
                        <li className="text-body text-muted-foreground" key={result}>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            description="Additional screenshots will be swapped in once the final visual assets and permissions are ready."
            eyebrow="Gallery"
            title="Project visuals"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {project.gallery.map((image) => (
              <ProjectMedia
                alt={image.alt}
                caption={image.caption}
                key={image.src}
                src={image.src}
                title={project.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionHeading
                description="Move between case studies or return to the full work archive."
                eyebrow="More Work"
                title="Continue exploring"
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
	                {previousProject ? (
	                  <Link
	                    className="focus-ring rounded-lg border border-border bg-background p-5 hover:border-primary/40"
	                    href={`/work/${previousProject.slug}`}
	                    key={`previous-${previousProject.slug}`}
	                    {...analyticsAttributes("project_card_click", {
	                      page: projectPath(project),
	                      source: "work_detail_adjacent",
                      projectSlug: previousProject.slug,
                    })}
                  >
                    <span className="text-sm font-semibold text-muted-foreground">
                      Previous
                    </span>
                    <span className="mt-2 block font-bold text-foreground">
                      {previousProject.title}
                    </span>
                  </Link>
                ) : null}
	                {nextProject ? (
	                  <Link
	                    className="focus-ring rounded-lg border border-border bg-background p-5 hover:border-primary/40"
	                    href={`/work/${nextProject.slug}`}
	                    key={`next-${nextProject.slug}`}
	                    {...analyticsAttributes("project_card_click", {
	                      page: projectPath(project),
	                      source: "work_detail_adjacent",
                      projectSlug: nextProject.slug,
                    })}
                  >
                    <span className="text-sm font-semibold text-muted-foreground">
                      Next
                    </span>
                    <span className="mt-2 block font-bold text-foreground">
                      {nextProject.title}
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Related projects
              </h2>
              <div className="mt-5 grid gap-3">
                {relatedProjects.length > 0 ? (
                  relatedProjects.map((relatedProject) => (
	                    <Link
	                      className="focus-ring rounded-md border border-border bg-background p-4 hover:border-primary/40"
	                      href={`/work/${relatedProject.slug}`}
	                      key={relatedProject.slug}
	                      {...analyticsAttributes("project_card_click", {
	                        page: projectPath(project),
	                        source: "work_detail_related",
	                        projectSlug: relatedProject.slug,
	                      })}
	                    >
                      <span className="font-semibold text-foreground">
                        {relatedProject.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {projectTypeLabels[relatedProject.projectType]}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-body text-muted-foreground">
                    Related entries will appear as more verified case studies are
                    added.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-background" data-header-theme="dark">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge className="border-background/20 bg-background/10 text-background">
                Similar Project
              </Badge>
              <h2 className="text-heading-2 mt-5 max-w-3xl text-background">
                Need a similar website or application experience?
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-background/72">
                Share the type of project you want to build, what needs to
                happen after launch, and any existing website or reference links.
              </p>
            </div>
            <ButtonLink
              className="bg-background text-foreground hover:bg-background/90"
              href={`/contact?project=${project.slug}`}
              {...analyticsAttributes("cta_click", {
                page: projectPath(project),
                source: "work_detail_final_cta",
                projectSlug: project.slug,
                linkId: "start_similar_project",
              })}
              size="lg"
            >
              Start a Similar Project
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  )
}

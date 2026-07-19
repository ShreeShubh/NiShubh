import type { ProcessStep } from "@/types/content";

export const processSteps = [
  {
    slug: "discovery",
    title: "Discovery",
    summary: "Clarify goals, audience, pages, features, references, content and constraints before design or code.",
    details: ["Business goals", "Audience and conversion paths", "Existing assets and constraints"],
  },
  {
    slug: "scope-proposal",
    title: "Scope & Proposal",
    summary: "Document deliverables, exclusions, milestones, timeline, price and payment schedule.",
    details: ["Scope boundaries", "Milestones", "Timeline and payment expectations"],
  },
  {
    slug: "ux-visual-direction",
    title: "UX & Visual Direction",
    summary: "Plan sitemap, wireframe/content structure and visual direction before full implementation.",
    details: ["Information architecture", "Page structure", "Design direction"],
  },
  {
    slug: "development",
    title: "Development",
    summary: "Build responsive components, integrations, backend work and content implementation as scoped.",
    details: ["Responsive UI", "Integrations", "Server-side functionality where required"],
  },
  {
    slug: "qa-review",
    title: "QA & Review",
    summary: "Check devices, accessibility, performance, SEO, forms and stakeholder feedback before launch.",
    details: ["Cross-device review", "Accessibility and performance checks", "Stakeholder review"],
  },
  {
    slug: "launch",
    title: "Launch",
    summary: "Configure domain, hosting, environment variables, analytics, indexing and production checks.",
    details: ["Deployment", "Environment setup", "Production verification"],
  },
  {
    slug: "support",
    title: "Support",
    summary: "Provide bug-fix window, handover documentation and optional maintenance plan where scoped.",
    details: ["Handover notes", "Bug-fix window", "Optional maintenance"],
  },
] satisfies ProcessStep[];

export function getProcessStepBySlug(slug: string) {
  return processSteps.find((step) => step.slug === slug);
}

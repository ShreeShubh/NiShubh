import type { TechnologyGroup } from "@/types/content";

export const technologyGroups = [
  {
    slug: "frontend",
    title: "Frontend",
    description: "Modern, responsive interfaces built for clarity, speed and maintainable component structure.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "backend",
    title: "Backend & APIs",
    description: "Server-side functionality, API integrations and data-backed workflows when the scope requires them.",
    items: ["Node.js", "Express", "REST APIs", "MongoDB"],
  },
  {
    slug: "forms-integrations",
    title: "Forms & Integrations",
    description: "Lead capture, validation, email delivery and practical third-party integrations.",
    items: ["React Hook Form", "Zod", "Resend", "Nodemailer"],
  },
  {
    slug: "deployment-quality",
    title: "Deployment & Quality",
    description: "Production-minded deployment, performance, SEO and handover practices.",
    items: ["Vercel", "Core Web Vitals", "Technical SEO", "Accessibility QA"],
  },
] satisfies TechnologyGroup[];

export function getTechnologyGroupBySlug(slug: string) {
  return technologyGroups.find((group) => group.slug === slug);
}

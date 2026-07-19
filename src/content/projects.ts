import type { Project, ProjectType } from "@/types/content";

export const projectTypeLabels: Record<ProjectType, string> = {
  client: "Client work",
  personal: "Personal project",
  concept: "Concept project",
};

export const projects: Project[] = [
  {
    slug: "automobile-chat-crm",
    title: "Automobile Chat CRM",
    summary:
      "PLACEHOLDER: Add verified summary. Seeded as a conservative project entry for a CRM-style automobile chat workflow.",
    projectType: "personal",
    industry: "Automobile / CRM",
    services: ["web-applications", "frontend-api-integration"],
    stack: ["React", "Node.js", "Express", "MongoDB", "PLACEHOLDER: Confirm exact stack"],
    challenge:
      "PLACEHOLDER: Describe the real business or product challenge without inventing client details or metrics.",
    solution:
      "PLACEHOLDER: Describe Shubham's actual contribution, feature scope and technical decisions.",
    results: [],
    coverImage: "/images/projects/automobile-chat-crm-cover.png",
    gallery: [
      {
        src: "/images/projects/automobile-chat-crm-01.png",
        alt: "PLACEHOLDER: Automobile Chat CRM screenshot description",
        caption: "PLACEHOLDER: Add verified caption.",
      },
    ],
    featured: true,
    role: "PLACEHOLDER: Confirm role and responsibilities.",
    features: ["PLACEHOLDER: Add verified CRM features."],
  },
  {
    slug: "karamuniko-gem-museum",
    title: "Karamuniko Gem Museum",
    summary:
      "PLACEHOLDER: Add verified summary. Seeded as a conservative migration or website improvement project entry.",
    projectType: "personal",
    industry: "Museum / Education",
    services: ["website-redesign"],
    stack: ["Next.js", "React", "PLACEHOLDER: Confirm exact stack"],
    challenge:
      "PLACEHOLDER: Describe the migration or redesign challenge using only verified facts.",
    solution:
      "PLACEHOLDER: Describe the actual migration, content, UI or performance work completed.",
    results: [],
    coverImage: "/images/projects/karamuniko-gem-museum-cover.png",
    gallery: [
      {
        src: "/images/projects/karamuniko-gem-museum-01.png",
        alt: "PLACEHOLDER: Karamuniko Gem Museum screenshot description",
        caption: "PLACEHOLDER: Add verified caption.",
      },
    ],
    featured: true,
    role: "PLACEHOLDER: Confirm role and responsibilities.",
    features: ["PLACEHOLDER: Add verified migration or website features."],
  },
  {
    slug: "travel-it-yourself",
    title: "Travel It Yourself",
    summary:
      "PLACEHOLDER: Add verified summary. Seeded as a conservative travel website or landing-page project entry.",
    projectType: "personal",
    industry: "Travel",
    services: ["landing-pages", "business-websites"],
    stack: ["React", "PLACEHOLDER: Confirm exact stack"],
    challenge:
      "PLACEHOLDER: Describe the verified travel product, audience or content challenge.",
    solution:
      "PLACEHOLDER: Describe the actual pages, UI flows or implementation work completed.",
    results: [],
    coverImage: "/images/projects/travel-it-yourself-cover.png",
    gallery: [
      {
        src: "/images/projects/travel-it-yourself-01.png",
        alt: "PLACEHOLDER: Travel It Yourself screenshot description",
        caption: "PLACEHOLDER: Add verified caption.",
      },
    ],
    featured: true,
    role: "PLACEHOLDER: Confirm role and responsibilities.",
    features: ["PLACEHOLDER: Add verified travel project features."],
  },
  {
    slug: "nautilus-shipping",
    title: "Nautilus Shipping",
    summary:
      "PLACEHOLDER: Add verified summary. Seeded as a conservative business website or service website project entry.",
    projectType: "personal",
    industry: "Shipping / Logistics",
    services: ["business-websites"],
    stack: ["Next.js", "React", "PLACEHOLDER: Confirm exact stack"],
    challenge:
      "PLACEHOLDER: Describe verified logistics/shipping website requirements without inventing outcomes.",
    solution:
      "PLACEHOLDER: Describe the actual service page, enquiry flow or implementation work completed.",
    results: [],
    coverImage: "/images/projects/nautilus-shipping-cover.png",
    gallery: [
      {
        src: "/images/projects/nautilus-shipping-01.png",
        alt: "PLACEHOLDER: Nautilus Shipping screenshot description",
        caption: "PLACEHOLDER: Add verified caption.",
      },
    ],
    featured: false,
    role: "PLACEHOLDER: Confirm role and responsibilities.",
    features: ["PLACEHOLDER: Add verified shipping project features."],
  },
  {
    slug: "buddy-loan-blog-platform",
    title: "Buddy Loan Blog Platform",
    summary:
      "PLACEHOLDER: Add verified summary. Seeded as a conservative blog platform or content system project entry.",
    projectType: "personal",
    industry: "Finance / Content",
    services: ["website-redesign", "frontend-api-integration"],
    stack: ["React", "Node.js", "PLACEHOLDER: Confirm exact stack"],
    challenge:
      "PLACEHOLDER: Describe verified blog platform or migration requirements without claiming metrics.",
    solution:
      "PLACEHOLDER: Describe actual content structure, UI, migration or integration work completed.",
    results: [],
    coverImage: "/images/projects/buddy-loan-blog-platform-cover.png",
    gallery: [
      {
        src: "/images/projects/buddy-loan-blog-platform-01.png",
        alt: "PLACEHOLDER: Buddy Loan Blog Platform screenshot description",
        caption: "PLACEHOLDER: Add verified caption.",
      },
    ],
    featured: false,
    role: "PLACEHOLDER: Confirm role and responsibilities.",
    features: ["PLACEHOLDER: Add verified blog platform features."],
  },
  {
    slug: "neelima-studio",
    title: "Neelima Studio",
    summary:
      "PLACEHOLDER: Add verified summary. Seeded as a conservative professional studio website project entry.",
    projectType: "personal",
    industry: "Creative Services",
    services: ["business-websites"],
    stack: ["Next.js", "Tailwind CSS", "PLACEHOLDER: Confirm exact stack"],
    challenge:
      "PLACEHOLDER: Describe the verified studio website goals, audience and content needs.",
    solution:
      "PLACEHOLDER: Describe the actual portfolio, service, booking or enquiry implementation work completed.",
    results: [],
    coverImage: "/images/projects/neelima-studio-cover.png",
    gallery: [
      {
        src: "/images/projects/neelima-studio-01.png",
        alt: "PLACEHOLDER: Neelima Studio screenshot description",
        caption: "PLACEHOLDER: Add verified caption.",
      },
    ],
    featured: true,
    role: "PLACEHOLDER: Confirm role and responsibilities.",
    features: ["PLACEHOLDER: Add verified studio website features."],
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsBySlugs(slugs: string[]) {
  const projectMap = new Map(projects.map((project) => [project.slug, project]));
  return slugs.flatMap((slug) => {
    const project = projectMap.get(slug);
    return project ? [project] : [];
  });
}

export function getProjectsByServiceSlug(serviceSlug: string) {
  return projects.filter((project) => project.services.includes(serviceSlug));
}

export function getProjectsByType(projectType: ProjectType) {
  return projects.filter((project) => project.projectType === projectType);
}

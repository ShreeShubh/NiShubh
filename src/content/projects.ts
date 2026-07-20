import type { Project, ProjectType } from "@/types/content"

export const projectTypeLabels: Record<ProjectType, string> = {
  client: "Client work",
  employment: "Employment project",
  personal: "Personal project",
  concept: "Concept project",
}

export const projects: Project[] = [
  {
    slug: "neelima-studio",
    title: "Neelima Studio",
    summary:
      "A makeup artist portfolio and booking website for showcasing services, gallery work, doorstep service options and a booking path that currently guides visitors to direct contact while online slot booking is prepared.",
    projectType: "client",
    industry: "Beauty / Creative Services",
    services: ["business-websites", "web-applications"],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Vercel",
    ],
    challenge:
      "Neelima Studio needed a polished web presence that could present makeup, hairstyle, mehendi and occasion styling services, build trust through portfolio imagery, support doorstep-service enquiries and prepare the foundation for online slot booking.",
    solution:
      "NiShubh developed a Next.js App Router website with public pages for home, services, gallery, about, contact and booking, reusable layout components, MongoDB helpers, service seed data and API route foundations for services, gallery, availability, bookings and inquiries. The booking page currently shows a premium coming-soon message with direct contact guidance.",
    results: [],
    coverImage: "/images/projects/neelima-studio-01.png",
    gallery: [
      {
        src: "/images/projects/neelima-studio-01.png",
        alt: "Neelima Studio makeup artist portfolio and booking website preview",
        caption: "Portfolio and booking website interface for Neelima Studio.",
      },
    ],
    featured: true,
    role: "Website design and development by NiShubh, including frontend pages, reusable components, MongoDB integration helpers, API route foundations and booking workflow preparation.",
    features: [
      "Home, services, gallery, about, contact and booking pages",
      "Service catalog structure for bridal, party, engagement, reception, HD makeup, airbrush makeup, hairstyling, saree draping, mehendi and custom packages",
      "Portfolio gallery foundation with category-based filtering planned for makeup, hairstyle, mehendi and occasion work",
      "Coming-soon booking page with direct contact guidance",
      "MongoDB connection helper, service model, helper functions and seed data",
      "API route foundations for services, gallery, availability, bookings and inquiries",
      "Admin dashboard foundation for managing bookings, services, portfolio images and availability",
    ],
  },
  {
    slug: "automobile-chat-crm",
    title: "Automobile Chat CRM",
    summary:
      "An enterprise automobile customer support CRM with authenticated dashboards, live chat, customer and vehicle records, petitions, tickets, queues, attendance, QA, reporting, client access and external API integration.",
    projectType: "client",
    industry: "Automobile / CRM",
    services: ["web-applications", "frontend-api-integration"],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Zustand",
      "Socket.IO",
      "Express 5",
      "Mongoose",
      "MongoDB",
      "JWT",
      "zod",
    ],
    challenge:
      "Automobile support operations need a single workspace where agents, team leaders, QA, HR, managers and clients can coordinate live customer conversations, vehicle context, service history, complaints, tickets, attendance and reporting without splitting the workflow across disconnected tools.",
    solution:
      "NiShubh built a full-stack CRM foundation with a Next.js App Router frontend and an Express, MongoDB and Socket.IO backend. The implementation includes role-based authentication, protected dashboards, typed API services, Mongoose-backed domain models, live chat persistence, petition workflows, queue and team-leader supervision tools, ticket management, attendance and shift modules, QA scorecards, reporting, notifications, client-panel access and external sync APIs.",
    results: [],
    coverImage: "/images/projects/automobile-chat-crm-cover.png",
    gallery: [
      {
        src: "/images/projects/automobile-chat-crm-cover.png",
        alt: "Automobile Chat CRM dashboard and live customer support workspace",
        caption:
          "CRM operations workspace for chat, petitions, tickets, customers, vehicles and team supervision.",
      },
    ],
    featured: true,
    role: "Full-stack product design and development by NiShubh, covering the Next.js dashboard UI, frontend API integration, role-aware workflows, Socket.IO chat experience, Express API architecture, MongoDB models, service/repository layers, validators, seed data and operational modules.",
    features: [
      "Protected dashboard shell with auth context, refresh-token sessions, role-based permissions and Next.js middleware guards",
      "Realtime Socket.IO chat with authenticated rooms, optimistic message sending, MongoDB persistence, delivery/read receipts, typing indicators and presence",
      "Customer, vehicle, service-history, notes, timeline, lead and duplicate-preview CRM modules",
      "Automatic live-chat petition creation with petition number, status, priority, assignment, escalation, SLA badges, notes and history",
      "Manual email-support ticket workflows with routing, assignment, status changes, priority, email thread fields, attachment metadata and SLA timestamps",
      "Team-leader tools for live agent monitoring, queue overview, chat takeover, force transfer, roster visibility, warnings and performance reports",
      "Attendance, shift and roster foundations with check-in/out, break tracking, geo/device/IP/selfie placeholders, swap approvals and HR reporting views",
      "QA audit queue, scorecards, error tags, feedback, retraining recommendations, reporting and chat reopening flow",
      "Management reports for department performance, shift efficiency, SLA metrics, tickets, petitions, attendance and CSV exports",
      "Client panel, internal communication, notifications, security audit views and external customer/vehicle/lead/ticket/petition sync APIs",
    ],
  },
  {
    slug: "karamuniko-gem-museum",
    title: "KaramUniko Museum",
    summary:
      "A public museum website for KaramUniko Museum, presenting gemstone collections, visit planning, exhibitions, events, shop links, donations, media coverage and collection discovery through an immersive visual experience.",
    projectType: "client",
    industry: "Museum / Gemstones",
    services: ["business-websites", "website-redesign"],
    stack: ["Next.js", "React", "Tailwind CSS"],
    challenge:
      "KaramUniko needed a polished museum-style website that could introduce visitors to naturally formed gemstone collections, highlight important specimens, guide museum visits and organize public information across collections, exhibits, learning content and visitor actions.",
    solution:
      "NiShubh developed a visual Next.js website experience with a video-led hero, dark museum navigation, visit-planning sections, gemstone feature content, collection search prompts, shop and donation calls to action, media coverage previews and public-facing routes for planning visits, exhibitions, collections, auction and learning content.",
    results: [],
    coverImage: "/images/projects/karamuniko-gem-museum-cover.png",
    gallery: [
      {
        src: "/images/projects/karamuniko-gem-museum-cover.png",
        alt: "KaramUniko Museum gemstone collection website preview",
        caption:
          "Public-facing museum website experience for KaramUniko Museum.",
      },
    ],
    featured: true,
    liveUrl: "https://karamuniko.vercel.app/",
    role: "Website design and development by NiShubh, including responsive frontend implementation, museum-style page sections, navigation, collection presentation and public visitor journeys.",
    features: [
      "Video-led homepage hero for gemstone discovery",
      "Navigation for home, plan your visit, exhibitions and events, collections, about, learn and auction",
      "Visitor information blocks for entry, opening hours and last-entry details",
      "Gemstone and sacred specimen feature sections",
      "Visit-the-museum cards for planning, map, galleries and family visit content",
      "Shop, donation, ticket and visit calls to action",
      "Search collection prompt and media coverage carousel",
    ],
  },
  // {
  //   slug: "travel-it-yourself",
  //   title: "Travel It Yourself",
  //   summary:
  //     "PLACEHOLDER: Add verified summary. Seeded as a conservative travel website or landing-page project entry.",
  //   projectType: "personal",
  //   industry: "Travel",
  //   services: ["landing-pages", "business-websites"],
  //   stack: ["React", "PLACEHOLDER: Confirm exact stack"],
  //   challenge:
  //     "PLACEHOLDER: Describe the verified travel product, audience or content challenge.",
  //   solution:
  //     "PLACEHOLDER: Describe the actual pages, UI flows or implementation work completed.",
  //   results: [],
  //   coverImage: "/images/projects/travel-it-yourself-cover.png",
  //   gallery: [
  //     {
  //       src: "/images/projects/travel-it-yourself-01.png",
  //       alt: "PLACEHOLDER: Travel It Yourself screenshot description",
  //       caption: "PLACEHOLDER: Add verified caption.",
  //     },
  //   ],
  //   featured: true,
  //   role: "PLACEHOLDER: Confirm role and responsibilities.",
  //   features: ["PLACEHOLDER: Add verified travel project features."],
  // },
  {
    slug: "nautilus-shipping",
    title: "Nautilus Shipping",
    summary:
      "A public maritime services website for Nautilus Shipping, presenting ship management, crew management, inspection, commercial services, careers, news and company information for ship owners and seafarers.",
    projectType: "employment",
    industry: "Maritime / Ship Management",
    services: ["business-websites", "website-redesign"],
    stack: ["Next.js", "React", "Tailwind CSS", "WordPress"],
    challenge:
      "Nautilus Shipping needed a structured public website that could communicate its ship management and marine services clearly, support contact and career journeys, and organize detailed company, service and insight content for a professional maritime audience.",
    solution:
      "The website presents a service-led structure with homepage messaging, marine service sections, a careers pathway, news and insights, FAQs, contact routes, and supporting company information. The implementation followed a supplied Figma design as part of a professional employment project with public-safe details only.",
    results: [],
    coverImage: "/images/projects/nautilus-shipping-cover.png",
    gallery: [
      {
        src: "/images/projects/nautilus-shipping-01.png",
        alt: "Nautilus Shipping ship management and marine services website preview",
        caption:
          "Public-facing maritime services website for Nautilus Shipping.",
      },
    ],
    featured: false,
    liveUrl: "https://www.nautilusshipping.com/",
    role: "Professional employment project contribution, including implementation from a supplied Figma design. Specific responsibilities should remain limited to approved, public-safe details.",
    features: [
      "Implementation based on a supplied Figma design",
      "Homepage positioning for ship management and marine services",
      "Marine service sections for commercial services, ship management, crew management and inspection",
      "Careers pathway for seafarer and crew-related interest",
      "News and insights sections for maritime topics including crewing, sustainability, compliance and technical operations",
      "FAQ and contact pathways for service enquiries",
      "Footer information links for company, team, approach, fleet, sustainability and legal pages",
    ],
  },
]

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsBySlugs(slugs: string[]) {
  const projectMap = new Map(projects.map((project) => [project.slug, project]))
  return slugs.flatMap((slug) => {
    const project = projectMap.get(slug)
    return project ? [project] : []
  })
}

export function getProjectsByServiceSlug(serviceSlug: string) {
  return projects.filter((project) => project.services.includes(serviceSlug))
}

export function getProjectsByType(projectType: ProjectType) {
  return projects.filter((project) => project.projectType === projectType)
}

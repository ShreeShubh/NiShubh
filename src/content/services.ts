import type { Service } from "@/types/content";

const sharedFaqSlugs = [
  "how-pricing-works",
  "typical-timeline",
  "content-responsibility",
  "hosting-domain",
  "revisions",
  "post-launch-support",
];

export const services = [
  {
    slug: "business-websites",
    title: "Business Websites",
    shortDescription: "Professional service websites that explain your offer clearly and turn visitors into enquiries.",
    description:
      "Mobile-first business websites for service providers, professionals and small businesses that need credibility, clear messaging and practical lead capture.",
    icon: "layout-template",
    idealFor: ["Local service businesses", "Consultants and professionals", "Businesses replacing a basic or outdated website"],
    deliverables: ["Responsive page structure", "Service and enquiry-focused content sections", "Contact and WhatsApp actions", "Technical SEO basics", "Deployment handover notes"],
    process: ["Discovery", "Sitemap and content structure", "Visual direction", "Development", "QA", "Launch support"],
    timeline: "PLACEHOLDER: Confirm typical timeline range.",
    featured: true,
    included: ["Core marketing pages", "Responsive implementation", "Basic metadata", "Form or WhatsApp CTA integration"],
    excluded: ["Paid ads management", "Large CMS buildout", "Ongoing content writing unless scoped"],
    faqSlugs: sharedFaqSlugs,
    relatedProjectSlugs: ["neelima-studio", "nautilus-shipping"],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    shortDescription: "Focused campaign pages for launches, offers, waitlists and lead generation.",
    description:
      "Conversion-focused landing pages that keep the message tight, make the next action obvious and support fast launch cycles.",
    icon: "panel-top",
    idealFor: ["Product launches", "Campaigns", "Offer validation", "Lead generation"],
    deliverables: ["Single-page structure", "CTA and form flow", "Responsive UI", "Analytics event hooks", "Deployment-ready build"],
    process: ["Goal definition", "Offer structure", "Design direction", "Development", "Conversion QA", "Launch"],
    timeline: "PLACEHOLDER: Confirm typical timeline range.",
    featured: true,
    included: ["One focused page", "CTA sections", "Responsive implementation", "Basic SEO/social metadata"],
    excluded: ["Multi-page website scope", "Ad campaign setup", "Unscoped copywriting"],
    faqSlugs: ["how-pricing-works", "typical-timeline", "content-responsibility", "revisions"],
    relatedProjectSlugs: ["travel-it-yourself"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    shortDescription: "Modernize an old website with better structure, speed, mobile UX and credibility.",
    description:
      "Redesign support for businesses whose existing website feels outdated, confusing, slow or difficult to use on mobile devices.",
    icon: "refresh-cw",
    idealFor: ["Businesses with outdated websites", "Teams improving mobile experience", "Brands clarifying services and CTAs"],
    deliverables: ["Current-site review", "Improved page structure", "Modern responsive UI", "Performance-minded implementation", "Launch checklist"],
    process: ["Audit", "Restructure", "Design direction", "Rebuild", "Redirect/SEO QA", "Launch"],
    timeline: "PLACEHOLDER: Confirm typical timeline range.",
    featured: true,
    included: ["UX/content structure improvements", "Responsive rebuild", "Technical SEO preservation checks"],
    excluded: ["Unsupported SEO guarantees", "Full rebrand unless scoped", "Large content migration unless scoped"],
    faqSlugs: ["how-pricing-works", "typical-timeline", "hosting-domain", "ownership-after-launch"],
    relatedProjectSlugs: ["karamuniko-gem-museum", "buddy-loan-blog-platform"],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    shortDescription: "Online storefronts with clear product presentation, checkout planning and maintainable technology.",
    description:
      "E-commerce development for businesses that need a professional storefront, product catalogue and practical checkout or enquiry flow.",
    icon: "shopping-bag",
    idealFor: ["Retail brands", "Small catalogues", "Businesses validating online sales", "Product-led services"],
    deliverables: ["Storefront UI", "Product/category structure", "Checkout or enquiry flow planning", "Responsive product pages", "Deployment support"],
    process: ["Commerce requirements", "Catalogue planning", "UX direction", "Storefront build", "Payment/provider QA", "Launch"],
    timeline: "PLACEHOLDER: Confirm typical timeline range.",
    featured: false,
    included: ["Storefront pages", "Product presentation", "Provider integration planning"],
    excluded: ["Unscoped inventory systems", "Marketplace operations", "Payment provider approval"],
    faqSlugs: ["how-pricing-works", "typical-timeline", "hosting-domain", "post-launch-support"],
    relatedProjectSlugs: [],
  },
  {
    slug: "web-applications",
    title: "Custom Web Applications",
    shortDescription: "MERN and Next.js application interfaces for workflows, dashboards, portals and MVPs.",
    description:
      "Custom web application development for teams that need more than a static website, including interfaces, API integrations and data-backed workflows.",
    icon: "blocks",
    idealFor: ["Startups", "Internal tools", "Workflow dashboards", "MVP interfaces"],
    deliverables: ["Application UI", "API integration", "Data model planning", "Authentication planning when required", "Deployment notes"],
    process: ["Requirements", "Scope boundaries", "UX flows", "Frontend/backend build", "QA", "Handover"],
    timeline: "PLACEHOLDER: Confirm typical timeline range.",
    featured: true,
    included: ["Feature scoping", "Responsive app interface", "API/database integration where scoped"],
    excluded: ["Enterprise security review", "Payment systems unless explicitly scoped", "Mobile native apps"],
    faqSlugs: ["how-pricing-works", "typical-timeline", "ownership-after-launch", "post-launch-support"],
    relatedProjectSlugs: ["automobile-chat-crm"],
  },
  {
    slug: "frontend-api-integration",
    title: "Frontend Development & API Integration",
    shortDescription: "Reliable React and Next.js implementation support for agencies, startups and product teams.",
    description:
      "Implementation support for teams that already have a backend, design direction or product plan and need dependable frontend delivery.",
    icon: "plug",
    idealFor: ["Agencies", "Product teams", "Backend-heavy teams", "Startups extending an existing product"],
    deliverables: ["React/Next.js components", "API integration", "State and loading/error handling", "Responsive implementation", "Handoff documentation"],
    process: ["Technical review", "Interface plan", "Component build", "Integration", "QA", "Handoff"],
    timeline: "PLACEHOLDER: Confirm typical timeline range.",
    featured: false,
    included: ["Frontend implementation", "API wiring", "Accessible UI states"],
    excluded: ["Backend ownership unless scoped", "Design from scratch unless scoped"],
    faqSlugs: ["how-pricing-works", "typical-timeline", "ownership-after-launch"],
    relatedProjectSlugs: ["automobile-chat-crm", "buddy-loan-blog-platform"],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    shortDescription: "Practical fixes, updates, performance improvements and post-launch support.",
    description:
      "Ongoing support for websites and applications that need reliable fixes, updates, deployment help or performance improvements.",
    icon: "wrench",
    idealFor: ["Existing website owners", "Businesses needing small fixes", "Teams without in-house web support"],
    deliverables: ["Issue review", "Bug fixes", "Small content or UI updates", "Performance checks", "Support notes"],
    process: ["Request review", "Scope confirmation", "Fix/update", "QA", "Deployment", "Summary"],
    timeline: "PLACEHOLDER: Confirm support response and turnaround expectations.",
    featured: false,
    included: ["Scoped fixes", "Small updates", "Basic QA after changes"],
    excluded: ["Unlimited support", "Major rebuilds without a new scope", "Third-party platform guarantees"],
    faqSlugs: ["how-pricing-works", "post-launch-support", "ownership-after-launch"],
    relatedProjectSlugs: [],
  },
] satisfies Service[];

export function getFeaturedServices() {
  return services.filter((service) => service.featured);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicesBySlugs(slugs: string[]) {
  const serviceMap = new Map(services.map((service) => [service.slug, service]));
  return slugs.flatMap((slug) => {
    const service = serviceMap.get(slug);
    return service ? [service] : [];
  });
}

import type { FAQ } from "@/types/content";

export const faqs = [
  {
    slug: "how-pricing-works",
    question: "How do you price website projects?",
    answer:
      "Pricing is scoped after discovery because page count, content readiness, integrations, design depth and launch support change the effort. PLACEHOLDER: Add minimum budget bands and preferred pricing model.",
    category: "pricing",
  },
  {
    slug: "typical-timeline",
    question: "How long does a typical website take?",
    answer:
      "A focused business website usually moves fastest when goals, content and feedback are ready before development starts. PLACEHOLDER: Add realistic timeline ranges for NiShubh offers.",
    category: "process",
  },
  {
    slug: "content-responsibility",
    question: "Who provides the website content?",
    answer:
      "The client provides business facts, service details, images and approvals. NiShubh can help structure pages and refine copy, but final factual accuracy must be approved by the owner.",
    category: "content",
  },
  {
    slug: "hosting-domain",
    question: "Can you help with hosting and domain setup?",
    answer:
      "Yes. Deployment, environment setup and domain connection can be included in scope. PLACEHOLDER: Confirm preferred hosting provider and domain workflow.",
    category: "technical",
  },
  {
    slug: "revisions",
    question: "How are revisions handled?",
    answer:
      "Revision rounds should be defined in the proposal so feedback stays clear and the project timeline remains predictable. PLACEHOLDER: Add final revision policy.",
    category: "process",
  },
  {
    slug: "ownership-after-launch",
    question: "Who owns the website after launch?",
    answer:
      "Ownership terms should be confirmed in the proposal and handover notes. The intended launch model is transparent handover of code, content locations and deployment access after agreed payment terms are complete.",
    category: "ownership",
  },
  {
    slug: "post-launch-support",
    question: "Do you provide support after launch?",
    answer:
      "Post-launch support can include bug fixes, small updates, performance checks and maintenance. PLACEHOLDER: Add support window and optional maintenance terms.",
    category: "support",
  },
] satisfies FAQ[];

export function getFaqBySlug(slug: string) {
  return faqs.find((faq) => faq.slug === slug);
}

export function getFaqsBySlugs(slugs: string[]) {
  const faqMap = new Map(faqs.map((faq) => [faq.slug, faq]));
  return slugs.flatMap((slug) => {
    const faq = faqMap.get(slug);
    return faq ? [faq] : [];
  });
}

export function getFaqsByCategory(category: FAQ["category"]) {
  return faqs.filter((faq) => faq.category === category);
}

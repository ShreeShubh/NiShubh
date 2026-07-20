export const siteConfig = {
  name: "NiShubh",
  legalName: "PLACEHOLDER: Legal business name",
  ownerName: "Our Team",
  tagline: "Digital Product Studio",
  title: "NiShubh | Building Modern Digital Experiences",
  description:
    "NiShubh builds fast, modern and conversion-focused websites and web applications for businesses that need a professional online presence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "en",
  contact: {
    email: "hello@example.com",
    phone: "+91 8000212233",
    whatsapp: "918000212233",
    location: "Remote freelance projects across India and worldwide",
  },
  social: {
    github: "PLACEHOLDER: https://github.com/username",
    linkedin: "PLACEHOLDER: https://www.linkedin.com/in/username",
    x: "",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Business Websites", href: "/services/business-websites" },
    {
      label: "E-commerce Development",
      href: "/services/ecommerce-development",
    },
    { label: "Web Applications", href: "/services/web-applications" },
    { label: "Website Redesign", href: "/services/website-redesign" },
    { label: "Maintenance & Support", href: "/services/maintenance-support" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
} as const

export type SiteConfig = typeof siteConfig

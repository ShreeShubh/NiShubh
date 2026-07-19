import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"
import type { Project, Service } from "@/types/content"

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined }

function serializeJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replaceAll("<", "\\u003c")
}

export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
      type="application/ld+json"
    />
  )
}

export function graphJsonLd(items: JsonLdValue[]) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  }
}

export function breadcrumbListSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/about#person`,
    name: siteConfig.ownerName,
    url: absoluteUrl("/about"),
    jobTitle: "MERN and Next.js Developer",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function professionalServiceSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    founder: {
      "@id": `${siteConfig.url}/about#person`,
    },
    serviceType: [
      "Website development",
      "Next.js development",
      "MERN web application development",
    ],
  }
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#business`,
    },
  }
}

export function serviceSchema(service: Service) {
  const url = absoluteUrl(`/services/${service.slug}`)

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.description,
    url,
    provider: {
      "@id": `${siteConfig.url}/#business`,
    },
    serviceOutput: service.deliverables,
  }
}

export function creativeWorkSchema({
  project,
  description,
}: {
  project: Project
  description: string
}) {
  const url = absoluteUrl(`/work/${project.slug}`)

  return {
    "@type": "CreativeWork",
    "@id": `${url}#creative-work`,
    name: project.title,
    url,
    description,
    creator: {
      "@id": `${siteConfig.url}/about#person`,
    },
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    genre: project.industry,
  }
}

export function collectionPageSchema({
  name,
  path,
  description,
}: {
  name: string
  path: string
  description: string
}) {
  return {
    "@type": "CollectionPage",
    name,
    url: absoluteUrl(path),
    description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  }
}

export function webPageSchema({
  type = "WebPage",
  name,
  path,
  description,
}: {
  type?: "WebPage" | "ContactPage"
  name: string
  path: string
  description: string
}) {
  return {
    "@type": type,
    name,
    url: absoluteUrl(path),
    description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  }
}

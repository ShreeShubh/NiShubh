export type ProjectType = "client" | "employment" | "personal" | "concept";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  idealFor: string[];
  deliverables: string[];
  process: string[];
  timeline?: string;
  featured: boolean;
  included: string[];
  excluded: string[];
  faqSlugs: string[];
  relatedProjectSlugs: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  projectType: ProjectType;
  industry: string;
  services: string[];
  stack: string[];
  challenge: string;
  solution: string;
  results: string[];
  coverImage: string;
  gallery: { src: string; alt: string; caption?: string }[];
  liveUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  role: string;
  features: string[];
};

export type ContactEnquiry = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  service: string;
  budget: string;
  timeline?: string;
  message: string;
  source?: string;
  consent: boolean;
};

export type FAQ = {
  slug: string;
  question: string;
  answer: string;
  category: "pricing" | "process" | "ownership" | "support" | "content" | "technical";
};

export type ProcessStep = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
};

export type TechnologyGroup = {
  slug: string;
  title: string;
  description: string;
  items: string[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  source?: string;
  featured: boolean;
};

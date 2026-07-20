# AGENTS.md

This repository is for a production-quality freelance website development and digital services website for NiShubh. Treat the product documentation as the source of truth for business goals, page scope, content rules, UX direction, technical architecture, and launch criteria.

## Product Goal

Build a polished, fast, credible website that turns visitors into qualified enquiries for freelance MERN, Next.js, website design, website redesign, web application, e-commerce, frontend, API integration, and maintenance services.

The first release is a sales and trust-building website. Do not add authentication, payments, dashboards, client portals, complex CMS features, or maintenance subscription systems unless explicitly requested.

## Working Brand

Use `[Brand Name]` until the final brand, domain, wordmark, logo, favicon, contact details, and social URLs are supplied. The current launch direction is a brand-led service such as `NiShubh - Modern Website Development`.

Keep the tone professional, practical, clear, and confident. Avoid exaggerated claims such as "best developer" or "guaranteed #1 on Google."

## Core Audience

Design and write for:

- Local service businesses such as salons, clinics, consultants, tuition centres, makeup artists, and home-service providers.
- Growing businesses replacing old, slow, or non-responsive websites.
- Startups needing landing pages, MVP interfaces, dashboards, or full-stack web applications.
- Agencies needing dependable frontend or MERN development support.
- Professionals needing portfolios, booking flows, lead capture, or content websites.

## Non-Negotiable Content Rules

- Never invent clients, testimonials, awards, certifications, metrics, results, locations, reviews, ratings, or credentials.
- Label work honestly as `client`, `personal`, `demo`, or `concept` where appropriate.
- Use placeholders only when necessary, and mark them clearly with `PLACEHOLDER`.
- Do not display fake client logos.
- Do not publish starter privacy policy or terms copy as final legal advice.
- Hide or reframe testimonial sections until real testimonials are available.

## Recommended Stack

Use this stack unless the user explicitly chooses otherwise:

- Next.js App Router
- TypeScript
- React server components by default
- Tailwind CSS
- Lucide icons
- React Hook Form + Zod for forms
- Resend, Nodemailer, or another transactional email adapter
- Vercel deployment, while keeping the app portable to another Node-compatible host
- Optional MongoDB only when persistence is truly required
- Optional WordPress, Sanity, Contentful, MDX, or database-backed CMS after the core launch

## Architecture Principles

- Inspect the repository before changing files.
- Preserve working code unless a requested change requires modifying it.
- Keep content in typed data files or MDX, not large hardcoded arrays inside page components.
- Prefer server components unless interactivity requires a client component.
- Centralize site configuration, contact details, URLs, social links, metadata defaults, and environment-backed settings.
- Keep secrets in server-only environment variables and document them in `.env.example`.
- Build reusable section and UI primitives without over-abstracting page-specific layouts.
- Use semantic HTML, accessible interactions, visible focus states, and keyboard-operable navigation.
- Keep analytics provider-neutral and no-op until configured.
- Do not send names, emails, phone numbers, or message content to analytics.

## Suggested Project Structure

```text
src/
  app/
    (marketing)/
      page.tsx
      services/
      work/
      process/
      about/
      contact/
    api/contact/route.ts
    sitemap.ts
    robots.ts
    layout.tsx
    not-found.tsx
  components/
    layout/
    sections/
    cards/
    forms/
    ui/
  content/
    services.ts
    projects.ts
    testimonials.ts
    faqs.ts
  lib/
    analytics.ts
    metadata.ts
    schemas.ts
    utils.ts
    validation.ts
  styles/
  types/
```

Adjust this structure only when the existing project has a better established pattern.

## Launch Scope

Version 1 should include:

- Home
- Services overview
- Individual service detail template
- Work / portfolio listing
- Case study detail template
- About
- Process
- Contact / project enquiry
- Privacy Policy
- Terms
- Reusable header, footer, CTA, testimonials/client-expectations, FAQs, and project cards
- SEO metadata, structured data, sitemap, robots, analytics hooks, and form handling

Blog, CMS, client login, project portal, payments, subscriptions, support tickets, and knowledge base features are post-launch unless specifically requested.

## Routes

Use these routes for the first release:

```text
/
/services
/services/business-websites
/services/ecommerce-development
/services/web-applications
/services/website-redesign
/services/maintenance-support
/work
/work/[slug]
/process
/about
/contact
/privacy-policy
/terms
```

`/insights` and `/insights/[slug]` are optional post-launch routes.

## Page Requirements

### Home

Include, in order:

1. Hero with outcome-led headline, supporting copy, primary `Discuss Your Project` CTA, secondary `View My Work` CTA, credibility indicator, and elegant website/product visual.
2. Honest trust or technology strip without fake logos.
3. Services preview with four to six outcome-focused cards.
4. Selected work with project type, challenge, solution, and result where factual.
5. Why work with me.
6. Process preview: Discover, Plan, Design, Develop, Test, Launch & Support.
7. Real testimonials only, or a `What clients can expect` section.
8. Technology capability section.
9. FAQ.
10. Final CTA with enquiry and WhatsApp actions.

### Services

Service cards and detail pages should explain:

- Who the service is for.
- The business problem it solves.
- Deliverables.
- Development process.
- Typical timeline or pricing approach without fake fixed promises.
- What is included and excluded.
- Relevant work samples.
- FAQs.
- Final enquiry CTA carrying service context.

Recommended launch services:

- Business and service websites
- Landing pages and campaign pages
- Website redesign and performance improvement
- E-commerce storefront development
- Custom MERN/Next.js web applications
- Frontend development and API integration
- Website maintenance, fixes, and ongoing support

### Work and Case Studies

Case studies must be more than screenshots. Include context, decisions, and contribution:

- Project overview and industry type.
- Problem or opportunity.
- Role and responsibilities.
- Solution and key features.
- Technology stack.
- Challenges and technical decisions.
- Before/after or measurable results only when supplied.
- Screenshots with meaningful captions.
- Live-site and repository links only when permitted.
- CTA to start a similar project.

Known project names that may be seeded conservatively:

- Automobile Chat CRM
- Karamuniko Gem Museum
- Travel It Yourself
- Nautilus Shipping
- Buddy Loan Blog Platform
- Neelima Studio

### About

Present NiShubh as a MERN/Next.js development service provider. Include an honest professional story, capability groups, working principles, experience summary, image placeholder, and CTA. Do not turn it into a full resume or invent employers, certifications, or numbers.

### Process

Explain:

1. Discovery
2. Scope & proposal
3. UX & visual direction
4. Development
5. QA & review
6. Launch
7. Support

Include client responsibilities, communication expectations, revision boundaries, and CTA.

### Contact

Build a structured enquiry form with:

- Name
- Email
- Phone / WhatsApp
- Business or company
- Existing website
- Service needed
- Approximate budget range
- Preferred launch timeframe
- Project goals and required features
- How did you hear about me?
- Consent checkbox

Use server-side validation, spam protection, rate limiting, safe error handling, a success state with response expectations, and an optional prefilled WhatsApp link.

## Data Models

Use these models as the baseline and improve only when justified:

```ts
type Service = {
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
};

type Project = {
  slug: string;
  title: string;
  summary: string;
  projectType: 'client' | 'personal' | 'concept';
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
};

type ContactEnquiry = {
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
```

## UX and Visual Direction

Aim for a premium developer studio: clean, modern, confident, and business-oriented. Avoid neon hacker aesthetics, excessive glassmorphism, generic startup gradients, large decorative blobs, long intro animations, and fake complexity.

Use:

- Warm white or very light cool neutral background.
- Deep navy or charcoal primary text.
- Professional blue or indigo primary brand color.
- Teal or warm amber as sparse accents.
- Crisp project visuals and consistent image ratios.
- Generous spacing and strong typography.
- Geist, Inter, or Manrope for UI.
- Consistent radius, border, and shadow tokens.
- Mobile-first responsive layouts.
- Reduced-motion support.

Verify common widths around 360px, 390px, 768px, 1024px, 1280px, and large desktop. Avoid horizontal scrolling and text overlap.

## SEO Requirements

- Unique title, description, and canonical URL for every indexable page.
- Central metadata builder with page-level overrides.
- Open Graph and Twitter metadata.
- Sitemap and robots configuration.
- One clear H1 per page and logical heading hierarchy.
- Internal links between services, work, process, contact, and future insights.
- Organization or ProfessionalService schema, Person schema where appropriate.
- Service schema on service pages.
- BreadcrumbList on nested pages.
- Article schema only for blog posts.
- LocalBusiness schema only when real public business location or service-area details support it.
- No fake ratings, reviews, or unsupported claims in structured data.

## Analytics Events

Track only non-personal event data. Supported events:

- `nav_contact_click`
- `hero_primary_cta_click`
- `hero_work_cta_click`
- `service_card_click`
- `project_card_click`
- `whatsapp_click`
- `contact_form_start`
- `contact_form_submit_success`
- `contact_form_submit_error`
- `email_click`
- `phone_click`

Analytics must not block rendering and must safely do nothing until configured.

## Performance, Accessibility, and Security

Done means:

- Strong Core Web Vitals target.
- Optimized fonts and images.
- Minimal client JavaScript.
- No avoidable layout shift.
- WCAG 2.2 AA-oriented semantics, forms, keyboard behavior, focus states, alt text, contrast, and reduced motion.
- Server input validation and normalization.
- Safe output escaping.
- Secure headers where supported.
- No secrets in client code.
- No unnecessary personal data storage.
- Latest stable Chrome, Edge, Firefox, Safari, and common mobile browsers supported.

## Agent Workflow

For every substantial task:

1. Inspect the repository before editing.
2. Briefly state what exists and what you will touch.
3. Implement the requested phase completely.
4. Run available lint, type-check, test, and build commands.
5. Fix errors caused by your changes.
6. Summarize completed work, commands run, remaining placeholders, and manual verification steps.

Do not start future phases unless the user asks.

## Recommended Phases

Use this order when the user asks to build the site incrementally:

1. Repository audit and `IMPLEMENTATION_PLAN.md`.
2. Project foundation and quality tooling.
3. Design system and reusable UI primitives.
4. Global header, mobile navigation, and footer.
5. Typed content models and seed content.
6. Home page.
7. Services overview and detail pages.
8. Portfolio listing and case study pages.
9. About and process pages.
10. Contact page and secure enquiry workflow.
11. SEO, metadata, and structured data system.
12. Performance and accessibility hardening.
13. Analytics and conversion tracking abstraction.
14. Legal pages, production content audit, and polish.
15. Testing and release readiness.
16. Deployment and handover documentation.
17. Optional blog or CMS integration after launch.

## Review Mode

When asked for a review, inspect the complete repository against this file and the product specification. Lead with findings grouped by Critical, High, Medium, and Low priority across functional correctness, security/privacy, accessibility, responsive UX, performance, SEO, TypeScript architecture, content integrity, tests, and deployment readiness. Include file/path evidence, why it matters, and the smallest reliable fix. Do not apply broad refactors unless explicitly asked.

## Owner Inputs Needed Before Final Launch

- Final brand name and preferred domain.
- Whether the site presents as a personal freelancer or small studio.
- Initial portfolio projects and honest classification.
- Project screenshots and permission for client work.
- Primary enquiry method: form, WhatsApp, call booking, or combination.
- Minimum project budget and engagement types.
- Professional email, WhatsApp number, social URLs, and service area.
- Blog launch decision.
- Final privacy and terms review.

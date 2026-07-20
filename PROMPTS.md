# Step-by-Step Codex Prompts

Use these prompts one phase at a time. Start with the global session prompt, then run the numbered phase prompts in order. Do not ask Codex to jump ahead unless you intentionally want to change the delivery sequence.

## Global Session Prompt

```text
You are the senior engineer responsible for building a production-quality freelance website-development business website for NiShubh.

Read AGENTS.md and the supplied product documentation fully before coding. Work incrementally, inspect the current repository first, and do not overwrite working code unnecessarily.

Use Next.js App Router, TypeScript and Tailwind CSS. Prefer server components, semantic HTML, reusable typed content models, accessible interactions and minimal dependencies.

For every phase:
1. Briefly state what you found in the repository.
2. List the files you will create or modify.
3. Implement the requested phase completely.
4. Run available type-check, lint, test and build commands.
5. Fix errors caused by your changes.
6. Summarise completed work, commands run, remaining placeholders and manual verification steps.

Never invent client names, testimonials, metrics, awards, certifications or credentials. Label demo, personal and concept projects accurately. Do not place secrets in client code. Do not start future phases unless asked.
```

## Prompt 1: Repository Audit and Implementation Plan

```text
Read AGENTS.md and the complete product documentation, then inspect the existing repository. Do not implement the website yet.

Report:
- framework and dependency versions
- current routes, components, styles and assets
- reusable code worth preserving
- missing dependencies or configuration
- risks or conflicts with the specification
- proposed folder structure and phased implementation plan

Create or update a concise IMPLEMENTATION_PLAN.md containing checkboxes for every phase. Avoid speculative dependencies and do not change visual code in this phase.
```

## Prompt 2: Project Foundation and Quality Tooling

```text
Implement the project foundation from the approved plan.

Requirements:
- Next.js App Router + TypeScript + Tailwind configuration
- strict, sensible TypeScript settings
- global styles, CSS variables and responsive container utilities
- install only necessary dependencies
- central site configuration with placeholder brand/contact/social values
- utility helpers and class-name helper
- ESLint/format scripts as appropriate
- .env.example and README setup section
- base root layout with metadata defaults
- accessible skip-to-content link

Do not build full page sections yet. Run type-check, lint and build, then fix errors caused by this phase.
```

## Prompt 3: Design System and Reusable UI Primitives

```text
Create the visual design system described in AGENTS.md: premium, clean and business-focused rather than neon or hacker themed.

Implement reusable primitives for:
- Container
- Section
- SectionHeading
- Button and link variants
- Badge and technology tag
- Card shell
- responsive typography classes
- accessible icon treatment
- subtle animation/reveal utility respecting prefers-reduced-motion

Define consistent color, spacing, radius, border and shadow tokens. Add a temporary internal style showcase route only if useful, and remove it before production. Do not add page-specific business copy yet.
```

## Prompt 4: Global Header, Mobile Navigation and Footer

```text
Implement the production header and footer.

Header requirements:
- configurable wordmark/logo placeholder
- navigation for Home, Services, Work, Process, About and Contact
- prominent project enquiry CTA
- accessible mobile menu with focus management, Escape support and proper labels
- active navigation state
- restrained sticky behavior only if it improves usability

Footer requirements:
- brand summary
- service and company links
- contact/social links from site config
- legal links and dynamic copyright year
- final compact CTA

Ensure keyboard accessibility, mobile responsiveness and no hydration errors.
```

## Prompt 5: Typed Content Models and Seed Content

```text
Create typed content/data modules for services, projects, FAQs, process steps, technology groups and optional testimonials.

Requirements:
- use the models in AGENTS.md, improving them only when justified
- include clear PLACEHOLDER markers for facts I must replace
- seed services with realistic benefit-led copy
- seed projects based on these known project names: Automobile Chat CRM, Karamuniko Gem Museum, Travel It Yourself, Nautilus Shipping, Buddy Loan Blog Platform and Neelima Studio
- mark each project type conservatively; do not claim unprovided outcomes or clients
- provide helper functions to retrieve featured items and entries by slug
- keep page components free from large hardcoded content arrays

Run type-check and add basic unit tests for content lookup helpers if a test setup already exists.
```

## Prompt 6: Home Page

```text
Build the complete home page using the approved design system and typed content.

Sections in order:
1. Hero with outcome-led headline, primary project CTA and secondary work CTA
2. Honest trust/technology strip without fake logos
3. Services preview
4. Selected work
5. Why work with me
6. Process preview
7. Client expectations or real testimonials only when data exists
8. Technology capability section
9. FAQ
10. Final CTA

Use meaningful semantic headings, strong mobile layout, optimised placeholder imagery and tasteful motion. Avoid generic filler, huge gradients and excessive decorative effects. Add page metadata and relevant structured data.
```

## Prompt 7: Services Overview and Service Detail Pages

```text
Build /services and dynamic /services/[slug] pages from the typed service data.

The services overview must include positioning copy, service cards, engagement options and CTA.

Each detail page must include:
- service-specific hero
- ideal client/problem
- outcomes and deliverables
- what is included and excluded
- process
- typical timeline or pricing approach without fake fixed promises
- related project cards
- FAQs
- final enquiry CTA carrying the service context

Implement generateStaticParams where appropriate, valid notFound behavior, metadata generation, breadcrumbs and Service/Breadcrumb structured data.
```

## Prompt 8: Portfolio Listing and Case Study Pages

```text
Build /work and /work/[slug].

Listing requirements:
- featured intro
- responsive project cards
- accessible category filtering only if it adds value; URL/search-param state preferred
- clear labels for client, personal or concept projects

Case study requirements:
- overview, role, challenge, solution, stack, features/results and gallery
- never fabricate metrics; hide empty result sections gracefully
- optimised images with alt text and captions
- optional permitted live/repository links
- next/related project navigation
- CTA for a similar project

Add static generation, metadata, breadcrumbs and appropriate CreativeWork/WebSite structured data.
```

## Prompt 9: About and Process Pages

```text
Build the /about and /process pages.

About should present NiShubh as a MERN/Next.js website and web application provider, with an honest professional story, capability groups, working principles, experience summary, image placeholder and CTA. Do not invent employers, certifications or numbers beyond supplied content.

Process should explain Discovery, Scope & Proposal, UX Direction, Development, QA & Review, Launch and Support. Include client responsibilities, communication expectations, revision boundaries and a CTA.

Add unique metadata, responsive visual hierarchy and reusable components where appropriate.
```

## Prompt 10: Contact Page and Secure Enquiry Workflow

```text
Build /contact and the production enquiry workflow.

Form fields and validation must follow AGENTS.md using React Hook Form and Zod.

Implement:
- accessible labels, hints, errors and success state
- budget/service options from central data
- server-only submission handler, either server action or route handler
- transactional email adapter with a development-safe fallback
- HTML and plain-text email content
- honeypot and reasonable rate-limit abstraction
- input normalisation and validation
- privacy consent
- analytics hooks without sending form content
- graceful provider/network failure behavior
- prefilled WhatsApp alternative from site config

Add .env.example variables and setup instructions. Never expose provider secrets or log sensitive full payloads.
```

## Prompt 11: SEO, Metadata and Structured Data System

```text
Audit and complete technical SEO across the site.

Implement:
- central metadata builder
- canonical URLs
- Open Graph and Twitter metadata
- dynamic metadata for services/projects
- sitemap.ts and robots.ts
- branded default social image strategy or opengraph-image route
- JSON-LD helpers for Person/ProfessionalService, WebSite, Service, BreadcrumbList and relevant project content
- logical headings and internal links
- not-found page

Do not add unsupported LocalBusiness details, ratings or reviews. Ensure JSON-LD is valid and safely serialised.
```

## Prompt 12: Performance and Accessibility Hardening

```text
Perform a dedicated performance and accessibility pass across all completed pages.

Review and improve:
- semantic landmarks and heading order
- keyboard navigation and focus visibility
- mobile menu/dialog behavior
- form labels and announcements
- contrast and tap target sizes
- reduced-motion support
- image sizes, loading strategy and aspect ratios
- font loading
- server/client component boundaries
- unnecessary JavaScript and dependencies
- layout shift and responsive overflow

Run available automated checks, lint, type-check and production build. Document remaining manual checks and do not hide failures.
```

## Prompt 13: Analytics and Conversion Tracking Abstraction

```text
Implement a provider-neutral analytics layer that safely becomes a no-op until configured.

Track only the documented events:
- CTA clicks
- service card clicks
- project card clicks
- WhatsApp clicks
- email clicks
- phone clicks
- contact form start
- contact form success
- contact form error

Include page/source and non-personal identifiers such as service/project slug.

Add an optional Google Analytics or Plausible adapter controlled by environment configuration and consent requirements. Never include names, email addresses, phone numbers or message content in analytics. Document setup in README.
```

## Prompt 14: Legal Pages, Production Content Audit and Polish

```text
Build privacy-policy and terms pages using clearly marked starter content that requires final business/legal review.

Then audit the full website for:
- placeholder copy and assets
- invented claims
- broken links
- inconsistent naming/contact details
- empty states
- title/description duplication
- responsive issues
- visual consistency
- spelling and grammar

Create CONTENT_CHECKLIST.md listing every final value and asset I must provide. Do not silently present starter legal copy as legal advice.
```

## Prompt 15: Testing and Release Readiness

```text
Prepare the application for release.

Add or complete high-value tests for:
- content slug lookup
- form validation
- contact handler success/failure using mocks
- critical navigation/rendering where the current test stack supports it

Run and report exact results for install, lint, type-check, tests and production build. Fix issues introduced by the implementation.

Create RELEASE_CHECKLIST.md covering environment variables, email test, analytics, domain/DNS, Search Console, sitemap/robots, social previews, accessibility, browser/device checks and rollback.
```

## Prompt 16: Deployment and Handover Documentation

```text
Finalise deployment for Vercel while keeping the app portable to another Node-compatible platform.

Update README with:
- prerequisites and local setup
- environment variables
- content editing locations
- project/service addition instructions
- contact email provider setup
- analytics setup
- build/deployment steps
- domain and DNS checklist
- common troubleshooting

Verify production build once more. Produce a concise handover summary with all remaining owner actions. Do not claim the domain or external services are configured unless actually verified.
```

## Prompt 17: Optional Blog/CMS Integration After Launch

```text
This is a post-launch optional phase. Add an Insights/blog system without disrupting the existing marketing pages.

First propose and implement a content-provider interface supporting local MDX now and a remote CMS later. Then build /insights and /insights/[slug] with categories, metadata, Article/Breadcrumb schema, related posts and safe rich-content rendering.

If WordPress is selected, use its supported public API endpoint, environment-based base URL, caching/revalidation, robust error handling and sanitisation. Do not require WordPress for the core site to build successfully.
```

## Review Prompt

```text
Act as a senior Next.js code reviewer. Inspect the complete repository against AGENTS.md and the supplied product specification. Do not make changes initially.

Return findings grouped by Critical, High, Medium and Low priority across:
- functional correctness
- security and privacy
- accessibility
- responsive UX
- performance
- SEO
- TypeScript/code architecture
- content integrity and unsupported claims
- test and deployment readiness

For every finding include file/path evidence, why it matters and the smallest reliable fix. Then propose an ordered remediation plan. Wait for the next instruction before applying broad refactors.
```

# Implementation Plan

Current status: Phase 1 through Phase 14 are complete. The repository now has a minimal Next.js App Router foundation, TypeScript, Tailwind CSS, ESLint, global styles, base metadata, site configuration, utility helpers, `.env.example`, README setup notes, reusable design system primitives, production header/footer layout, typed local content modules, a complete home page, services overview/detail pages, work/case study pages, about/process pages, a production-minded contact enquiry workflow, centralized technical SEO/schema handling, a dedicated performance/accessibility hardening pass, a provider-neutral analytics layer, starter legal pages and a content checklist. Testing and deployment readiness phases remain.

## Repository Audit

### Framework and Dependency Versions

- No application framework is installed yet.
- No `package.json` exists.
- No lockfile exists (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb`).
- No Next.js, React, TypeScript, Tailwind CSS, ESLint, testing, or build configuration files are present.
- This directory is not currently a Git repository; `git status` returns `fatal: not a git repository`.

### Current Routes, Components, Styles and Assets

- Current files:
  - `AGENTS.md`
  - `PROMPTS.md`
  - `IMPLEMENTATION_PLAN.md`
- Current routes: none.
- Current components: none.
- Current styles: none.
- Current assets/public files: none.

### Reusable Code Worth Preserving

- `AGENTS.md` should remain the main product and engineering instruction guide.
- `PROMPTS.md` should remain the phase-by-phase execution guide.
- There is no application code to preserve yet.

### Missing Dependencies or Configuration

- Next.js App Router project foundation.
- React and React DOM.
- TypeScript and strict `tsconfig.json`.
- Tailwind CSS and PostCSS configuration.
- ESLint configuration and scripts.
- `src/app` structure, root layout, global styles, and metadata defaults.
- Central site configuration for placeholder brand/contact/social values.
- `.env.example`.
- README with local setup and environment instructions.
- Test setup is not required immediately, but should be introduced when there is code worth testing or when the selected scaffold includes it.

### Risks and Conflicts With the Specification

- The repository is empty, so Phase 2 must create the app foundation rather than modify an existing app.
- Network access may be required to install dependencies during Phase 2.
- Final brand name, domain, logo, favicon, email, WhatsApp number, social links, service area, budget bands, testimonials, legal copy, and project screenshots are not supplied yet.
- The spec allows placeholders during implementation, but final launch must remove or clearly resolve placeholders.
- Case studies must be seeded conservatively because project details, permissions, outcomes, and metrics are not fully supplied.
- Blog/CMS, authentication, payment, client portal, and dashboard features are out of Version 1 unless explicitly requested.
- This folder is not a Git repository yet; useful commits and deployment workflow will require Git initialization or moving the project into a Git repo later.

## Proposed Folder Structure

Use this structure after the Next.js foundation is created:

```text
src/
  app/
    (marketing)/
      page.tsx
      services/
        page.tsx
        [slug]/
          page.tsx
      work/
        page.tsx
        [slug]/
          page.tsx
      process/
        page.tsx
      about/
        page.tsx
      contact/
        page.tsx
    api/
      contact/
        route.ts
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
    process.ts
    technologies.ts
  lib/
    analytics.ts
    metadata.ts
    schemas.ts
    utils.ts
    validation.ts
  styles/
  types/
public/
```

## Phased Implementation Checklist

- [x] Phase 1: Repository audit and `IMPLEMENTATION_PLAN.md`.
- [x] Phase 2: Project foundation and quality tooling.
- [x] Phase 3: Design system and reusable UI primitives.
- [x] Phase 4: Global header, mobile navigation, and footer.
- [x] Phase 5: Typed content models and seed content.
- [x] Phase 6: Home page.
- [x] Phase 7: Services overview and service detail pages.
- [x] Phase 8: Portfolio listing and case study pages.
- [x] Phase 9: About and process pages.
- [x] Phase 10: Contact page and secure enquiry workflow.
- [x] Phase 11: SEO, metadata, and structured data system.
- [x] Phase 12: Performance and accessibility hardening.
- [x] Phase 13: Analytics and conversion tracking abstraction.
- [x] Phase 14: Legal pages, production content audit, and polish.
- [ ] Phase 15: Testing and release readiness.
- [ ] Phase 16: Deployment and handover documentation.
- [ ] Phase 17: Optional blog/CMS integration after launch.

## Phase Notes

### Phase 2: Project Foundation and Quality Tooling

- Create the Next.js App Router project with TypeScript and Tailwind CSS.
- Add strict TypeScript settings, lint/build/type-check scripts, global styles, root layout, metadata defaults, site config, utilities, `.env.example`, and README setup notes.
- Do not build full marketing sections in this phase.

### Phase 3: Design System and Reusable UI Primitives

- Create reusable primitives for layout, section structure, headings, buttons/links, badges, tags, card shells, typography, icons, and reduced-motion-safe reveal utilities.
- Establish a premium, clean, business-focused visual system.

### Phase 4: Global Header, Mobile Navigation and Footer

- Build accessible global navigation with active states, mobile menu behavior, project enquiry CTA, site links, contact/social links, legal links, and compact CTA.

### Phase 5: Typed Content Models and Seed Content

- Add typed local content modules for services, projects, FAQs, process steps, technology groups, and optional testimonials.
- Seed known projects conservatively and mark all uncertain facts with `PLACEHOLDER`.

### Phase 6: Home Page

- Build the complete home page from typed content and reusable components, including hero, trust strip, services, selected work, differentiators, process, expectations/testimonials, technology, FAQ, and final CTA.

### Phase 7: Services Pages

- Build `/services` and `/services/[slug]` with static generation, metadata, breadcrumbs, Service schema, detail content, related projects, FAQs, and contextual enquiry CTA.

### Phase 8: Work and Case Studies

- Build `/work` and `/work/[slug]` with honest project labels, case study sections, image placeholders/captions, optional links, related navigation, metadata, and structured data.

### Phase 9: About and Process

- Build `/about` and `/process` with honest developer positioning, capabilities, working principles, process stages, client responsibilities, revision boundaries, metadata, and CTA.

### Phase 10: Contact Workflow

- Build `/contact`, accessible enquiry form, React Hook Form + Zod validation, server-only submission handler, email adapter fallback, honeypot/rate-limit abstraction, privacy consent, analytics hooks, and WhatsApp alternative.

### Phase 11: SEO System

- Add central metadata builder, canonical URLs, Open Graph/Twitter metadata, sitemap, robots, JSON-LD helpers, internal link checks, and not-found page.

### Phase 12: Performance and Accessibility

- Audit semantics, focus, keyboard behavior, contrast, tap targets, reduced motion, image loading, font loading, client boundaries, layout shift, and responsive overflow.

### Phase 13: Analytics

- Add provider-neutral analytics event helpers, event delegation, optional Google Analytics/Plausible adapters, consent gating and README setup notes. Events remain no-op until configured and never include personal form data.

### Phase 14: Legal and Content Polish

- Add starter privacy/terms pages with legal-review warnings and create `CONTENT_CHECKLIST.md` for owner-supplied final values, assets, placeholders and audit findings.

### Phase 15: Testing and Release Readiness

- Add high-value tests for content lookup, form validation, contact handler mocks, and critical rendering where supported. Create `RELEASE_CHECKLIST.md`.

### Phase 16: Deployment and Handover

- Finalize Vercel-oriented but portable deployment docs, README handover instructions, environment setup, content editing guide, provider setup, domain/DNS checklist, troubleshooting, and final build verification.

### Phase 17: Optional Blog/CMS

- Post-launch only. Add Insights/blog with local MDX and remote CMS-ready content-provider interface without making the core site depend on WordPress or any CMS.

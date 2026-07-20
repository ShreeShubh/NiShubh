# Content Checklist

This checklist captures final values, assets and review items required before launch. Starter legal content is not legal advice and must be reviewed for the real business, jurisdiction, providers and operating workflow.

## Brand And Business Identity

- [ ] Confirm final public brand casing: current app source uses `NiShubh`; earlier notes mention `Nishubh`.
- [ ] Confirm final tagline. Current config displays `Digital Product Studio`; earlier supplied tagline is `Building Modern Digital Experiences.`
- [ ] Provide final legal business name for `siteConfig.legalName`.
- [ ] Confirm whether the site should remain team/brand-led with `Our Team` and `NiShubh` instead of a personal representative name.
- [ ] Provide final business description for metadata, footer, schema and hero support copy.
- [ ] Provide final domain for `NEXT_PUBLIC_SITE_URL` and `siteConfig.url`.
- [ ] Provide logo or wordmark asset to replace the `NS` placeholder.
- [ ] Provide favicon/app icons.
- [ ] Provide default Open Graph/social image direction or final branded image.

## Contact Details

- [ ] Provide public enquiry email address.
- [ ] Provide transactional recipient email for `CONTACT_TO_EMAIL`.
- [ ] Provide verified sender email/domain for `CONTACT_FROM_EMAIL`.
- [ ] Provide public phone number or confirm phone should remain hidden.
- [ ] Provide WhatsApp number in international format for `CONTACT_WHATSAPP_NUMBER` and `siteConfig.contact.whatsapp`.
- [ ] Provide final service area/location text, or confirm no location should be displayed.
- [ ] Provide GitHub profile URL or confirm it should remain hidden.
- [ ] Provide LinkedIn profile URL or confirm it should remain hidden.
- [ ] Provide X/Twitter URL or confirm it should remain hidden.

## Services And Commercial Terms

- [ ] Confirm final service list and labels.
- [ ] Confirm whether `Landing Pages` and `Frontend Development & API Integration` should appear in footer quick links.
- [ ] Provide realistic timeline ranges for each service.
- [ ] Provide minimum budget bands and labels for the contact form.
- [ ] Confirm preferred pricing model: fixed scope, milestone-based, hourly, retainer, or mixed.
- [ ] Confirm support response expectations and maintenance/support terms.
- [ ] Confirm revision policy and number of included revision rounds.
- [ ] Confirm exclusions for each service.
- [ ] Confirm hosting/domain/deployment provider preferences.

## Project Case Studies

- [ ] Provide verified summary, role, challenge, solution, stack, features and screenshots for `Automobile Chat CRM`.
- [ ] Provide verified summary, role, challenge, solution, stack, features and screenshots for `Karamuniko Gem Museum`.
- [ ] Provide verified summary, role, challenge, solution, stack, features and screenshots for `Travel It Yourself`.
- [ ] Provide verified summary, role, challenge, solution, stack, features and screenshots for `Nautilus Shipping`.
- [ ] Provide verified summary, role, challenge, solution, stack, features and screenshots for `Buddy Loan Blog Platform`.
- [ ] Provide verified summary, role, challenge, solution, stack, features and screenshots for `Neelima Studio`.
- [ ] Confirm each project type: client, personal or concept.
- [ ] Confirm whether client/company names may be shown publicly.
- [ ] Provide screenshot alt text and captions.
- [ ] Provide permitted live URLs and repository URLs, or confirm they should remain hidden.
- [ ] Provide verified outcomes only if supported by evidence. Do not add metrics without proof.
- [ ] Confirm whether each project may be used in portfolio/marketing material.

## Testimonials And Proof

- [ ] Provide real testimonials only with permission, name/display preference and role/company if allowed.
- [ ] Provide approved client logos only if permission exists.
- [ ] Provide awards, certifications or credentials only if verifiable.
- [ ] Confirm that no rankings, revenue, lead, performance or conversion claims should be added without evidence.

## Visual Assets

- [ ] Provide team, workspace or brand image asset for the About page, or approve placeholder removal.
- [ ] Provide project screenshots or mockups for all case studies.
- [ ] Provide logo/wordmark variants for light and dark use if available.
- [ ] Provide final social sharing image.
- [ ] Provide any brand colors or typography preferences if they should override the current design tokens.
- [ ] Provide optimized image files with descriptive filenames.

## Legal Review

- [ ] Review and complete `/privacy-policy`; it is starter content, not legal advice.
- [ ] Review and complete `/terms`; it is starter content, not legal advice.
- [ ] Add effective date to legal pages.
- [ ] Confirm jurisdiction/governing law.
- [ ] Confirm data retention periods.
- [ ] Confirm data-subject request process.
- [ ] Confirm analytics provider, consent requirement and cookie/storage disclosures.
- [ ] Confirm email provider, hosting provider and other processors.
- [ ] Confirm intellectual property, licensing and portfolio-use terms.
- [ ] Confirm payment, cancellation, refund, late-payment and dispute terms.

## SEO And Metadata

- [ ] Confirm unique SEO title and description for every public page after final copy is supplied.
- [ ] Confirm canonical production domain.
- [ ] Confirm social image text and visual style.
- [ ] Confirm sitemap should include legal pages and all current service/project pages.
- [ ] Confirm whether `/style-guide` should be removed before production.
- [ ] Confirm final structured data details remain accurate and do not imply unsupported local-business, rating or review claims.

## Analytics And Enquiry Workflow

- [ ] Choose analytics provider: none, Google Analytics or Plausible.
- [ ] Confirm analytics consent policy.
- [ ] Confirm transactional email provider and API key.
- [ ] Confirm contact form destination email.
- [ ] Confirm rate-limit settings.
- [ ] Test contact form success and failure states in production-like environment.
- [ ] Confirm WhatsApp prefilled message wording.

## Audit Findings From This Pass

- [x] Missing `/privacy-policy` and `/terms` routes were added.
- [x] Legal pages were added to `sitemap.ts`.
- [x] Footer copyright now avoids rendering raw `PLACEHOLDER` legal name.
- [x] Visible app copy was aligned to `NiShubh` casing where mixed `Nishubh` appeared.
- [ ] Placeholder contact values remain in `src/config/site.ts`.
- [ ] Placeholder budget labels remain in `src/content/contact.ts`.
- [ ] Placeholder service timelines remain in `src/content/services.ts`.
- [ ] Placeholder FAQ policy details remain in `src/content/faqs.ts`.
- [ ] Placeholder project details and gallery descriptions remain in `src/content/projects.ts`.
- [ ] Profile and project visuals are still UI placeholders, not final assets.
- [ ] No invented testimonials, awards, certifications, revenue claims, rankings or metrics were found.
- [ ] Broken legal links were resolved by adding the legal pages. Remaining internal links should be rechecked after final service/project changes.
- [ ] Empty testimonial state is intentional; testimonials render only when real data exists.
- [ ] Legal page copy is intentionally marked as starter/review-required content.
- [ ] Manual responsive and visual QA is still needed in a browser after final content and images are added.

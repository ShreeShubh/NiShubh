# Release Checklist

Use this checklist before publishing NiShubh. Starter legal/content placeholders still require final business review.

## Environment

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production URL.
- [ ] Set `CONTACT_TO_EMAIL` to the inbox that receives enquiries.
- [ ] Set `CONTACT_FROM_EMAIL` to a verified sender address.
- [ ] Set `RESEND_API_KEY` only in the server environment.
- [ ] Confirm `CONTACT_RATE_LIMIT_MAX` and `CONTACT_RATE_LIMIT_WINDOW_MS`.
- [ ] Set analytics environment variables only after consent requirements are confirmed.
- [ ] Verify no secrets are present in client code or committed files.

## Email

- [ ] Send a test enquiry from production.
- [ ] Confirm plain-text and HTML email render correctly.
- [ ] Confirm reply-to points to the visitor email.
- [ ] Confirm provider failure shows the WhatsApp fallback without exposing technical details.
- [ ] Confirm spam/honeypot and rate-limit behavior.

## Analytics

- [ ] Confirm provider choice: no-op, Google Analytics or Plausible.
- [ ] Confirm consent requirements for the target audience.
- [ ] Verify only allowed non-personal events are sent.
- [ ] Confirm form content, names, email addresses, phone numbers and messages are never tracked.
- [ ] Test CTA, service card, project card, WhatsApp, email, phone and contact form events.

## Domain And DNS

- [ ] Point the final domain to the production host.
- [ ] Verify `www` and apex behavior.
- [ ] Enable HTTPS and automatic certificate renewal.
- [ ] Confirm canonical URL matches the preferred domain.
- [ ] Check redirects from old or preview URLs if applicable.

## Search

- [ ] Submit the site to Google Search Console.
- [ ] Verify domain ownership.
- [ ] Submit `/sitemap.xml`.
- [ ] Check `/robots.txt`.
- [ ] Inspect important URLs: home, services, work, about, process, contact, privacy and terms.
- [ ] Confirm pages have unique titles and descriptions.

## Social Previews

- [ ] Preview Open Graph image, title and description for the home page.
- [ ] Preview service detail URLs.
- [ ] Preview project detail URLs.
- [ ] Confirm default social image strategy is branded and not placeholder-only.

## Accessibility

- [ ] Keyboard-test header navigation, mobile menu, footer links and contact form.
- [ ] Confirm visible focus states on all interactive elements.
- [ ] Confirm form errors are announced and linked to fields.
- [ ] Confirm FAQ accordions work with keyboard and screen reader labels.
- [ ] Run automated accessibility checks on critical pages.
- [ ] Check reduced-motion behavior.

## Browser And Device Checks

- [ ] Test latest Chrome, Edge, Firefox and Safari.
- [ ] Test mobile widths around 360px, 390px and 430px.
- [ ] Test tablet widths around 768px and 1024px.
- [ ] Test desktop widths around 1280px and larger.
- [ ] Confirm no horizontal overflow, text overlap or clipped buttons.
- [ ] Confirm images load with correct aspect ratios.

## Content And Assets

- [ ] Replace all `PLACEHOLDER` values approved for launch.
- [ ] Confirm contact email, phone, WhatsApp and social links.
- [ ] Confirm portfolio project permissions and labels.
- [ ] Confirm legal starter pages are reviewed before launch.
- [ ] Confirm no invented testimonials, metrics, ratings or credentials.

## Rollback

- [ ] Record the deployed version or commit SHA before release.
- [ ] Confirm hosting platform rollback steps.
- [ ] Keep previous production environment variables available.
- [ ] Verify database or provider changes are reversible if introduced later.
- [ ] Document who approves rollback and how visitors will be redirected or notified if needed.

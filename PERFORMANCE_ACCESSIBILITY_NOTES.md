# Performance and Accessibility Notes

Phase 12 dedicated pass completed.

## Improvements Made

- Improved mobile navigation dialog semantics with an accessible dialog title.
- Added deliberate focus restoration to the mobile menu trigger when the menu closes without navigation.
- Kept keyboard trap and Escape support for the mobile menu.
- Added global `overflow-x: clip` to reduce accidental horizontal page overflow.
- Added global media sizing safeguards for `img`, `svg`, `video` and `canvas`.
- Strengthened reduced-motion handling so `.reveal` animations are fully disabled when users prefer reduced motion.
- Added `aria-invalid` and `aria-describedby` relationships for contact form fields with hints and errors.
- Kept form submission status in an `aria-live` status region.
- Confirmed the app still builds with server components by default; the main client boundary remains the interactive header and contact form.

## Automated Checks Run

- `npm run type-check`
- `npm run lint`
- `npm run build`

All passed.

## Remaining Manual Checks

- Keyboard-test the header and mobile menu at mobile and desktop widths.
- Confirm focus order across `/`, `/services`, `/services/[slug]`, `/work`, `/work/[slug]`, `/about`, `/process` and `/contact`.
- Submit the contact form in development and production environments, including success, validation error, rate-limit and provider-failure paths.
- Run Lighthouse or WebPageTest against a deployed preview for Core Web Vitals, unused JavaScript, font loading and SEO diagnostics.
- Run axe or equivalent browser-based accessibility checks once a preview URL is available.
- Check responsive layout at approximately 360px, 390px, 768px, 1024px, 1280px and large desktop widths.
- Verify no text overlap or horizontal scrolling on real mobile browsers.
- Replace placeholder visual frames with optimized real images before final launch and verify aspect ratios, alt text and loading behavior.


import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { ButtonLink, Container } from "@/components/ui"
import { siteConfig } from "@/config/site"
import { analyticsAttributes } from "@/lib/analytics"

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="focus-ring rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
      href={href}
    >
      {label}
    </Link>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const copyrightName = siteConfig.legalName.startsWith("PLACEHOLDER")
    ? siteConfig.name
    : siteConfig.legalName
  const emailHref = siteConfig.contact.email.startsWith("PLACEHOLDER")
    ? undefined
    : `mailto:${siteConfig.contact.email}`
  const phoneHref = siteConfig.contact.phone.startsWith("PLACEHOLDER")
    ? undefined
    : `tel:${siteConfig.contact.phone}`
  const socialLinks = [
    { label: "GitHub", href: siteConfig.social.github },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
  ].filter((item) => item.href && !item.href.startsWith("PLACEHOLDER"))

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div className="max-w-md">
            <Link
              aria-label={`${siteConfig.name} home`}
              className="focus-ring inline-flex items-center gap-3 rounded-md"
              href="/"
            >
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
              >
                NS
              </span>
              <span className="font-bold text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-body mt-5 text-muted-foreground">
              {siteConfig.description}
            </p>
            <ButtonLink
              className="mt-7"
              href="/contact"
              {...analyticsAttributes("cta_click", {
                source: "footer",
                linkId: "start_project",
              })}
              variant="outline"
            >
              Start a Project
            </ButtonLink>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="text-sm font-bold text-foreground">Services</h2>
              <div className="mt-4 grid gap-3">
                {siteConfig.services.map((item) => (
                  <FooterLink
                    href={item.href}
                    key={item.href}
                    label={item.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-foreground">Company</h2>
              <div className="mt-4 grid gap-3">
                {siteConfig.nav
                  .filter((item) => item.href !== "/")
                  .map((item) => (
                    <FooterLink
                      href={item.href}
                      key={item.href}
                      label={item.label}
                    />
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-foreground">Contact</h2>
              <div className="mt-4 grid gap-3">
                {emailHref ? (
                  <a
                    className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
                    href={emailHref}
                    {...analyticsAttributes("email_click", {
                      source: "footer",
                      linkId: "contact_email",
                    })}
                  >
                    <Mail aria-hidden="true" className="size-4" />
                    Email
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail aria-hidden="true" className="size-4" />
                    Email placeholder
                  </span>
                )}
                {phoneHref ? (
                  <a
                    className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
                    href={phoneHref}
                    {...analyticsAttributes("phone_click", {
                      source: "footer",
                      linkId: "contact_phone",
                    })}
                  >
                    <Phone aria-hidden="true" className="size-4" />
                    Phone
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone aria-hidden="true" className="size-4" />
                    Phone placeholder
                  </span>
                )}
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin aria-hidden="true" className="size-4" />
                  {siteConfig.contact.location}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-foreground">
                Social & Legal
              </h2>
              <div className="mt-4 grid gap-3">
                {socialLinks.map((item) => (
                  <a
                    className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
                    href={item.href}
                    key={item.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink aria-hidden="true" className="size-4" />
                    {item.label}
                  </a>
                ))}
                {siteConfig.legal.map((item) => (
                  <FooterLink
                    href={item.href}
                    key={item.href}
                    label={item.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {copyrightName}. All rights reserved.
          </p>
          <p>Direct website development support from {siteConfig.ownerName}.</p>
        </div>
      </Container>
    </footer>
  )
}

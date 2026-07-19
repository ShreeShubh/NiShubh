"use client"

import { Menu, MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { ButtonLink } from "@/components/ui"
import { siteConfig } from "@/config/site"
import { analyticsAttributes } from "@/lib/analytics"
import { cn } from "@/lib/utils"

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function Wordmark() {
  return (
    <Link
      aria-label={`${siteConfig.name} home`}
      className="focus-ring inline-flex items-center gap-3 rounded-md"
      href="/"
    >
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground shadow-card"
      >
        NS
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-bold leading-5 text-foreground">
          {siteConfig.name}
        </span>
        <span className="hidden text-xs leading-4 text-muted-foreground sm:block">
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)

  function closeMenu({ restoreFocus = true }: { restoreFocus?: boolean } = {}) {
    setIsOpen(false)

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus()
      })
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu()
        return
      }

      if (event.key !== "Tab" || !menuPanelRef.current) {
        return
      }

      const focusableElements =
        menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement || !lastElement) {
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/78">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteConfig.nav.map((item) => {
            const isActive = isActivePath(pathname, item.href)

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-ring rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive && "bg-primary/8 text-primary",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink
            href="/contact"
            {...analyticsAttributes("cta_click", {
              page: pathname,
              source: "desktop_header",
              linkId: "discuss_project",
            })}
            size="sm"
          >
            Discuss Project
          </ButtonLink>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label="Open navigation menu"
          className="focus-ring inline-flex size-11 items-center justify-center rounded-md border border-border bg-surface text-foreground lg:hidden"
          onClick={() => setIsOpen(true)}
          ref={menuButtonRef}
          type="button"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </div>

      {isOpen ? (
        <div
          aria-labelledby="mobile-navigation-title"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
        >
          <button
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => closeMenu()}
            type="button"
          />
          <div
            className="absolute right-0 top-0 flex h-dvh w-full max-w-sm flex-col border-l border-border bg-background p-5 shadow-soft"
            id="mobile-navigation"
            ref={menuPanelRef}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="sr-only" id="mobile-navigation-title">
                Mobile navigation
              </h2>
              <Wordmark />
              <button
                aria-label="Close navigation menu"
                className="focus-ring inline-flex size-11 items-center justify-center rounded-md border border-border bg-surface text-foreground"
                onClick={() => closeMenu()}
                ref={closeButtonRef}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-8 grid gap-2">
              {siteConfig.nav.map((item) => {
                const isActive = isActivePath(pathname, item.href)

                return (
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "focus-ring rounded-md px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      isActive && "bg-primary/8 text-primary",
                    )}
                    href={item.href}
                    key={item.href}
                    onClick={() => closeMenu({ restoreFocus: false })}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <ButtonLink
              className="mt-8"
              href="/contact"
              {...analyticsAttributes("cta_click", {
                page: pathname,
                source: "mobile_header",
                linkId: "discuss_project",
              })}
              onClick={() => closeMenu({ restoreFocus: false })}
              size="lg"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              Discuss Project
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  )
}

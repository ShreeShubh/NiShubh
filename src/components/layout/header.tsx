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

function Wordmark({ isDark = false }: { isDark?: boolean }) {
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
        <span
          className={cn(
            "truncate text-sm font-bold leading-5 transition-colors",
            isDark ? "text-background" : "text-foreground",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "hidden text-xs leading-4 transition-colors sm:block",
            isDark ? "text-background/70" : "text-muted-foreground",
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isOverDarkSection, setIsOverDarkSection] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
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

  useEffect(() => {
    let animationFrame = 0

    function updateHeaderTheme() {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        const headerHeight = headerRef.current?.offsetHeight ?? 64
        const elements = document.elementsFromPoint(
          window.innerWidth / 2,
          headerHeight + 1,
        )
        const isDark = elements.some((element) => {
          if (!(element instanceof HTMLElement)) {
            return false
          }

          return (
            element.dataset.headerTheme === "dark" ||
            element.closest<HTMLElement>('[data-header-theme="dark"]') !== null
          )
        })

        setIsOverDarkSection(isDark)
      })
    }

    updateHeaderTheme()
    window.addEventListener("scroll", updateHeaderTheme, { passive: true })
    window.addEventListener("resize", updateHeaderTheme)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", updateHeaderTheme)
      window.removeEventListener("resize", updateHeaderTheme)
    }
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur transition-colors duration-200",
        isOverDarkSection
          ? "border-background/20 bg-foreground/92 supports-[backdrop-filter]:bg-foreground/82"
          : "border-border/80 bg-background/92 supports-[backdrop-filter]:bg-background/78",
      )}
      ref={headerRef}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Wordmark isDark={isOverDarkSection} />

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
                  "focus-ring rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                  isOverDarkSection
                    ? "text-background/70 hover:bg-background/10 hover:text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isActive &&
                    (isOverDarkSection
                      ? "bg-primary/15 text-primary"
                      : "bg-primary/8 text-primary"),
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
          className={cn(
            "focus-ring inline-flex size-11 items-center justify-center rounded-md border transition-colors lg:hidden",
            isOverDarkSection
              ? "border-background/20 bg-background/10 text-background"
              : "border-border bg-surface text-foreground",
          )}
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
            className="absolute inset-y-0 right-0 flex h-dvh w-full flex-col bg-background shadow-soft sm:max-w-sm sm:border-l sm:border-border"
            id="mobile-navigation"
            ref={menuPanelRef}
          >
            <div className="border-b border-border/80">
              <div className="container flex h-16 items-center justify-between gap-4 sm:w-auto sm:px-5">
                <h2 className="sr-only" id="mobile-navigation-title">
                  Mobile navigation
                </h2>
                <Wordmark />
                <button
                  aria-label="Close navigation menu"
                  className="focus-ring inline-flex size-11 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-primary/45 hover:text-primary"
                  onClick={() => closeMenu()}
                  ref={closeButtonRef}
                  type="button"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <div className="container flex flex-1 flex-col py-6 sm:w-auto sm:px-5">
              <nav aria-label="Mobile navigation" className="grid gap-2">
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
        </div>
      ) : null}
    </header>
  )
}

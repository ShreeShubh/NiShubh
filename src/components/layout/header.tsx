"use client"

import { Menu, MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { ThemeToggle } from "@/components/layout/theme-toggle"
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

    const desktopNav = window.matchMedia("(min-width: 1024px)")

    function handleDesktopNav(event: MediaQueryListEvent) {
      if (event.matches) {
        closeMenu({ restoreFocus: false })
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    desktopNav.addEventListener("change", handleDesktopNav)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
      desktopNav.removeEventListener("change", handleDesktopNav)
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
          ? "border-background/20 bg-[hsl(var(--color-foreground)/0.92)] supports-[backdrop-filter]:bg-[hsl(var(--color-foreground)/0.82)]"
          : "border-border/80 bg-[hsl(var(--color-background)/0.92)] supports-[backdrop-filter]:bg-[hsl(var(--color-background)/0.78)]",
      )}
      ref={headerRef}
    >
      <div className="container flex h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label="Open navigation menu"
            className={cn(
              "focus-ring inline-flex size-11 shrink-0 items-center justify-center rounded-md border transition-colors lg:hidden",
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
          <Wordmark isDark={isOverDarkSection} />
        </div>

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
                      ? "bg-primary/15 text-[hsl(var(--color-brand))]"
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

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle
            className={cn(isOpen && "invisible lg:visible")}
            tone={isOverDarkSection ? "inverse" : "default"}
          />
          <ButtonLink
            className="hidden lg:inline-flex"
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
      </div>

      {isOpen
        ? createPortal(
            <div
              aria-labelledby="mobile-navigation-title"
              aria-modal="true"
              className="fixed inset-0 z-[60] lg:hidden"
              role="dialog"
            >
              <button
                aria-label="Close navigation menu"
                className="mobile-drawer-overlay absolute inset-0 bg-foreground/30 dark:bg-[hsl(222_47%_4%/0.72)]"
                onClick={() => closeMenu()}
                type="button"
              />
              <div
                className="mobile-drawer absolute inset-y-0 left-0 flex h-dvh w-[min(19.5rem,calc(100%-3.25rem))] flex-col border-r border-border bg-background shadow-soft"
                id="mobile-navigation"
                ref={menuPanelRef}
              >
                <div className="border-b border-border/80">
                  <div className="container flex h-16 items-center gap-2">
                    <button
                      aria-label="Close navigation menu"
                      className="focus-ring inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-primary/45 hover:text-primary"
                      onClick={() => closeMenu()}
                      ref={closeButtonRef}
                      type="button"
                    >
                      <X aria-hidden="true" className="size-5" />
                    </button>
                    <h2 className="min-w-0 truncate text-sm font-bold text-foreground" id="mobile-navigation-title">
                      Menu
                    </h2>
                    <ThemeToggle className="ml-auto" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-4 py-5">
                  <nav aria-label="Mobile navigation" className="grid gap-1">
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
                    className="mt-auto"
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
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}

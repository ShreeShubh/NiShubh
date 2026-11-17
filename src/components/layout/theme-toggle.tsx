"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

import { applyTheme, getActiveTheme, getStoredTheme, themeStorageKey } from "@/lib/theme"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  tone?: "default" | "inverse"
  className?: string
}

export function ThemeToggle({ tone = "default", className }: ThemeToggleProps) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    function handleSystemChange(event: MediaQueryListEvent) {
      if (getStoredTheme()) {
        return
      }

      applyTheme(event.matches ? "dark" : "light", false)
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== themeStorageKey) {
        return
      }

      if (event.newValue === "light" || event.newValue === "dark") {
        applyTheme(event.newValue, false)
      }
    }

    media.addEventListener("change", handleSystemChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      media.removeEventListener("change", handleSystemChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  function toggleTheme() {
    applyTheme(getActiveTheme() === "dark" ? "light" : "dark")
  }

  return (
    <button
      className={cn(
        "focus-ring inline-flex size-11 items-center justify-center rounded-md border transition-colors",
        tone === "inverse"
          ? "border-background/20 bg-background/10 text-background hover:bg-background/15"
          : "border-border bg-surface text-foreground hover:border-primary/45 hover:text-primary",
        className,
      )}
      onClick={toggleTheme}
      type="button"
    >
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
    </button>
  )
}

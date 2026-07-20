"use client"

import { ChevronDown } from "lucide-react"
import { type ReactNode, useEffect, useId, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type FaqItemProps = {
  question: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}

export function FaqItem({ question, children, defaultOpen = false }: FaqItemProps) {
  const id = useId()
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [height, setHeight] = useState(defaultOpen ? "auto" : "0px")

  useEffect(() => {
    const content = contentRef.current

    if (!content) {
      return
    }

    function updateHeight() {
      setHeight(isOpen ? `${content?.scrollHeight ?? 0}px` : "0px")
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => window.removeEventListener("resize", updateHeight)
  }, [isOpen, children])

  return (
    <div className="rounded-lg border border-border bg-surface shadow-card transition-colors hover:border-primary/30">
      <h3>
        <button
          aria-controls={id}
          aria-expanded={isOpen}
          className="focus-ring flex w-full items-center justify-between gap-4 rounded-lg p-5 text-left text-base font-bold text-foreground"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          <span>{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 text-primary transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </h3>
      <div
        aria-hidden={!isOpen}
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        id={id}
        style={{ maxHeight: height }}
      >
        <div className="px-5 pb-5 pt-0" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

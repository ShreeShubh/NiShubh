import { existsSync } from "node:fs"
import path from "node:path"
import type { ReactNode } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type ProjectImageProps = {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
  fallback: ReactNode
}

function publicAssetExists(src: string) {
  if (!src.startsWith("/")) {
    return false
  }

  return existsSync(path.join(process.cwd(), "public", src))
}

export function ProjectImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  fallback,
}: ProjectImageProps) {
  if (!publicAssetExists(src)) {
    return fallback
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        alt={alt}
        className={cn("object-cover", imageClassName)}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
    </div>
  )
}

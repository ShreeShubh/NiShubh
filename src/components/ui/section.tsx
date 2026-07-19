import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: "default" | "tight";
};

export function Section({ className, spacing = "default", ...props }: SectionProps) {
  return <section className={cn(spacing === "tight" ? "section-tight" : "section", className)} {...props} />;
}

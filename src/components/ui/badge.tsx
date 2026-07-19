import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "primary" | "accent";

const badgeVariants: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface text-muted-foreground",
  primary: "border-primary/20 bg-primary/8 text-primary",
  accent: "border-accent/20 bg-accent/10 text-accent",
};

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs font-semibold leading-none",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

type TechnologyTagProps = BadgeProps;

export function TechnologyTag({ className, ...props }: TechnologyTagProps) {
  return <Badge className={cn("rounded-full font-medium", className)} variant="neutral" {...props} />;
}

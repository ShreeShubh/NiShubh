import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccessibleIconProps = {
  children: ReactNode;
  label?: string;
  className?: string;
};

export function AccessibleIcon({ children, label, className }: AccessibleIconProps) {
  if (label) {
    return (
      <span aria-label={label} className={cn("inline-flex shrink-0 items-center justify-center", className)} role="img">
        {children}
      </span>
    );
  }

  return (
    <span aria-hidden="true" className={cn("inline-flex shrink-0 items-center justify-center", className)}>
      {children}
    </span>
  );
}

type IconFrameProps = AccessibleIconProps & {
  tone?: "primary" | "accent" | "neutral";
};

export function IconFrame({ children, label, className, tone = "primary" }: IconFrameProps) {
  return (
    <AccessibleIcon
      className={cn(
        "size-11 rounded-md border",
        tone === "primary" && "border-primary/15 bg-primary/8 text-primary",
        tone === "accent" && "border-accent/15 bg-accent/10 text-accent",
        tone === "neutral" && "border-border bg-muted text-muted-foreground",
        className,
      )}
      label={label}
    >
      {children}
    </AccessibleIcon>
  );
}

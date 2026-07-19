import Link from "next/link";
import type { Metadata } from "next";

import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="section">
      <div className="container max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="text-3xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          This page is not available yet. Return home and continue from the main site.
        </p>
        <Link className="mt-8 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline" href="/">
          Go home
        </Link>
      </div>
    </div>
  );
}

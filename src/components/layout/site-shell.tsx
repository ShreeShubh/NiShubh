import type { ReactNode } from "react";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <AnalyticsProvider />
    </div>
  );
}

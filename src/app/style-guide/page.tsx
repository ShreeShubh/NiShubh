import { ArrowRight, Check, Mail } from "lucide-react";
import type { Metadata } from "next";

import {
  Badge,
  Button,
  ButtonLink,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  IconFrame,
  Section,
  SectionHeading,
  TechnologyTag,
} from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Style Guide",
  path: "/style-guide",
  noIndex: true,
});

export default function StyleGuidePage() {
  return (
    <Section>
      <Container className="space-y-12">
        <SectionHeading
          description="A temporary internal route for checking the reusable primitives before full pages are built."
          eyebrow="Internal"
          title="Design System Primitives"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Button and link variants with consistent focus and tap targets.</CardDescription>
            </CardHeader>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button aria-label="Email" size="icon" variant="outline">
                <Mail aria-hidden="true" className="size-4" />
              </Button>
            </div>
            <ButtonLink className="mt-6" href="/" variant="primary">
              Link action
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Labels</CardTitle>
              <CardDescription>Compact badges and technology tags for scannable metadata.</CardDescription>
            </CardHeader>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="accent">Accent</Badge>
              <TechnologyTag>Next.js</TechnologyTag>
              <TechnologyTag>TypeScript</TechnologyTag>
              <TechnologyTag>Tailwind CSS</TechnologyTag>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {["Structure", "Clarity", "Access"].map((item) => (
            <Card className="reveal" key={item}>
              <IconFrame label={`${item} icon`}>
                <Check aria-hidden="true" className="size-5" />
              </IconFrame>
              <CardHeader className="mt-5">
                <CardTitle>{item}</CardTitle>
                <CardDescription>
                  Reusable card treatment with restrained borders, shadow and readable text rhythm.
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

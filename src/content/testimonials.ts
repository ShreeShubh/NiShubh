import type { Testimonial } from "@/types/content";

export const testimonials: Testimonial[] = [];

export function getFeaturedTestimonials() {
  return testimonials.filter((testimonial) => testimonial.featured);
}

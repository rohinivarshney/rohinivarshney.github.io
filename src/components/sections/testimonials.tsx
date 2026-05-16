import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";

export const Testimonials = () => {
  const { testimonials } = useContent();
  const items = testimonials.items;
  const [i, setI] = useState(0);
  const safe = items.length ? i % items.length : 0;
  const t = items[safe];
  if (!t) return null;
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Testimonials</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Trusted by <span className="text-gradient italic">candidates & teams</span>
          </h2>
        </div>

        <div className="glass-strong rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <Quote className="absolute top-8 right-8 h-32 w-32 text-primary/10" />
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug mb-8 italic">"{t.quote}"</p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground font-display text-lg">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role} · {t.company}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button aria-label="Previous testimonial" variant="outline" size="icon" className="rounded-full glass border-0" onClick={() => setI((safe - 1 + items.length) % items.length)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground tabular-nums">{String(safe + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <Button aria-label="Next testimonial" variant="outline" size="icon" className="rounded-full glass border-0" onClick={() => setI((safe + 1) % items.length)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

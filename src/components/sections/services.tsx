import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";
import { Icon } from "@/lib/icon-map";

export const Services = () => {
  const { services } = useContent();
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-hero-gradient opacity-50 -z-10" />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Services</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Ways we can <span className="text-gradient italic">work together</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {services.items.map((s, i) => (
            <div key={s.title + i} className="glass-strong rounded-3xl p-8 transition-smooth hover:-translate-y-2 hover:shadow-elegant group relative overflow-hidden">
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 blur-3xl transition-smooth" />
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground mb-6 group-hover:scale-110 transition-smooth">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-display text-3xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
              <Button asChild variant="ghost" className="group/btn rounded-full -ml-3">
                <a href={s.href}>
                  {s.cta}
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-smooth group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

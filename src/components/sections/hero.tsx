import { ArrowRight, Calendar, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/rohini-portrait.jpg";
import { useContent } from "@/lib/content";

export const Hero = () => {
  const { hero } = useContent();
  return (
    <section id="home" className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient -z-10" />
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob -z-10" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-blob -z-10" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {hero.badge}
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            {hero.tagline} <span className="text-gradient italic">{hero.name}</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-muted-foreground mt-3 not-italic">{hero.roleTitle}</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-primary hover:opacity-90 shadow-glow">
              <a href={hero.primaryCta.href}>{hero.primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full glass border-0">
              <a href={hero.secondaryCta.href}><Calendar className="mr-2 h-4 w-4" /> {hero.secondaryCta.label}</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full">
              <a href={hero.cvUrl} download><Download className="mr-2 h-4 w-4" /> Download CV</a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
            {hero.stats.map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 text-center transition-smooth hover:-translate-y-1">
                <div className="font-display text-3xl text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-scale-in">
          <div className="absolute -inset-8 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
          <div className="relative glass-strong rounded-[2.5rem] p-3">
            <img
              src={portrait}
              alt="Rohini Varshney, Talent Acquisition Specialist"
              width={1024}
              height={1024}
              className="rounded-[2rem] w-full h-auto aspect-square object-cover"
            />
            <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-3 animate-float">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-display text-2xl leading-none">{hero.yearsBadge}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Years of Impact</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-4 py-3 animate-float" style={{ animationDelay: "2s" }}>
              <div className="text-xs text-muted-foreground">Currently at</div>
              <div className="font-semibold">{hero.currentlyAt}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

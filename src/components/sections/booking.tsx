import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";

export const Booking = () => {
  const { booking } = useContent();
  return (
    <section id="booking" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Calendar Booking</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              Find a time that <span className="text-gradient italic">works for you</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you need mentorship, recruitment consulting, or want to explore a collaboration —
              pick a slot that suits you and let's chat.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {booking.categories.map((c, i) => (
                <div key={c.label + i} className="glass rounded-2xl p-4 flex items-center gap-3 transition-smooth hover:-translate-y-0.5">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="text-sm font-medium">{c.label}</div>
                    <div className="text-xs text-muted-foreground">{c.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-8 text-center">
            <div className="grid h-16 w-16 mx-auto place-items-center rounded-2xl bg-gradient-primary text-primary-foreground mb-6 shadow-glow">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="font-display text-3xl mb-3">Select your preferred time</h3>
            <p className="text-muted-foreground mb-6">
              Real-time availability, instant confirmation, calendar invites sent automatically.
            </p>
            <Button asChild size="lg" className="rounded-full bg-gradient-primary hover:opacity-90 shadow-glow">
              <a href="https://topmate.io/rohini_varshney" target="_blank" rel="noopener noreferrer">
                Book a Session <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">Seamless scheduling · Mobile friendly</p>
          </div>
        </div>
      </div>
    </section>
  );
};

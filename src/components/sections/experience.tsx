import { Building2, GraduationCap } from "lucide-react";
import { useContent } from "@/lib/content";

export const Experience = () => {
  const { experience } = useContent();
  const items = experience.items;
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Experience</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            A timeline of <span className="text-gradient italic">impact</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2" />

          <div className="space-y-10">
            {items.map((it, i) => (
              <div key={it.company + i} className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="hidden lg:block" />
                <div className="relative glass-strong rounded-3xl p-6 sm:p-8 transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                  <div className="hidden lg:block absolute top-8 w-4 h-4 rounded-full bg-gradient-primary shadow-glow"
                       style={i % 2 ? { right: "-3.5rem" } : { left: "-3.5rem" }} />
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl leading-tight">{it.role}</h3>
                        <p className="text-primary font-medium">{it.company}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                    <span>{it.period}</span><span>·</span><span>{it.location}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-5">
                    {it.points.map((p, k) => (
                      <li key={k} className="flex gap-2"><span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />{p}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {it.tools.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full glass">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-4">
          {experience.education.map((edu, i) => (
            <div
              key={edu.title + i}
              className="glass rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shrink-0">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl">{edu.title}</h3>
                <p className="text-muted-foreground">{edu.school}</p>
              </div>
              {edu.score && edu.scoreLabel ? (
                <div className="glass-strong rounded-2xl px-5 py-3 text-center shrink-0">
                  <div className="font-display text-2xl text-gradient">{edu.score}</div>
                  <div className="text-xs text-muted-foreground">{edu.scoreLabel}</div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useContent } from "@/lib/content";
import { Icon } from "@/lib/icon-map";

export const About = () => {
  const { about } = useContent();
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">{about.eyebrow}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {about.title} <span className="text-gradient italic">{about.titleAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{about.intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {about.expertise.map((e, i) => (
            <div key={e.title + i} className="glass rounded-3xl p-6 transition-smooth hover:-translate-y-1 hover:shadow-elegant group">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground mb-4 group-hover:scale-110 transition-smooth">
                <Icon name={e.icon} className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl mb-2">{e.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {about.skillGroups.map((g) => (
            <div key={g.title} className="glass-strong rounded-3xl p-6 sm:p-8">
              <h3 className="font-display text-2xl mb-6">{g.title}</h3>
              <div className="space-y-5">
                {g.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-gradient-primary rounded-full transition-all duration-1000" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

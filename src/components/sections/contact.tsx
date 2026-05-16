import { useState } from "react";
import { z } from "zod";
import { Linkedin, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useContent } from "@/lib/content";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  service: z.string().min(1, "Pick a service"),
  message: z.string().trim().min(10, "Tell me a little more").max(1000),
});

const SUBMISSIONS_KEY = "rv_contact_submissions_v1";

export const Contact = () => {
  const { contact } = useContent();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const r = schema.safeParse(data);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const existing = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]");
      existing.unshift({ ...r.data, at: new Date().toISOString() });
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existing.slice(0, 200)));
    } catch {}
    const subject = `[Portfolio] ${r.data.service} enquiry from ${r.data.name}`;
    const body =
      `Name: ${r.data.name}\n` +
      `Email: ${r.data.email}\n` +
      `Interested in: ${r.data.service}\n\n` +
      `Message:\n${r.data.message}`;
    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Try opening the user's default mail app; fall back to Gmail compose in a new tab.
    const win = window.open(mailto, "_self");
    setTimeout(() => {
      if (!win || win.closed) {
        window.open(gmail, "_blank", "noopener,noreferrer");
      }
      setLoading(false);
      toast.success("Opening your email — please hit send to deliver your message.");
      (e.target as HTMLFormElement).reset();
    }, 500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Contact</p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
                Let's <span className="text-gradient italic">connect</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Have a role to fill, a career question, or a collaboration in mind? I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-3">
              <a href={`mailto:${contact.email}`} className="glass rounded-2xl p-4 flex items-center gap-4 transition-smooth hover:-translate-y-0.5 block">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Mail className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-medium">{contact.email}</div>
                </div>
              </a>
              <a href={contact.topmate} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-4 flex items-center gap-4 transition-smooth hover:-translate-y-0.5 block">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><MessageCircle className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Topmate</div>
                  <div className="font-medium">{contact.topmateLabel}</div>
                </div>
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-4 flex items-center gap-4 transition-smooth hover:-translate-y-0.5 block">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Linkedin className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">LinkedIn</div>
                  <div className="font-medium">{contact.linkedinLabel}</div>
                </div>
              </a>
              <div className="glass rounded-2xl p-4 flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><MapPin className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Based in</div>
                  <div className="font-medium">{contact.location}</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 glass-strong rounded-3xl p-6 sm:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your full name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@email.com" required maxLength={255} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Interested in</Label>
              <Select name="service" defaultValue="Mentorship">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mentorship">Mentorship</SelectItem>
                  <SelectItem value="Recruitment Consulting">Recruitment Consulting</SelectItem>
                  <SelectItem value="Collaboration">Collaboration</SelectItem>
                  <SelectItem value="Speaking / Networking">Speaking / Networking</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} placeholder="Tell me a bit about what you're looking for…" required maxLength={1000} />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto rounded-full bg-gradient-primary hover:opacity-90 shadow-glow">
              {loading ? "Sending…" : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

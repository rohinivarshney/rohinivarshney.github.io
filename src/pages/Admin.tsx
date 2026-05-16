import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
  ArrowLeft, Download, Inbox, KeyRound, LogOut, Plus, RotateCcw, Save, Trash2, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DEFAULT_CONTENT, SiteContent, getAdminPassword, getContent, isAdminAuthed,
  resetContent, saveContent, setAdminAuthed, setAdminPassword, useContent,
} from "@/lib/content";
import { ICON_NAMES } from "@/lib/icon-map";

const SUBMISSIONS_KEY = "rv_contact_submissions_v1";

const LoginGate = ({ onAuthed }: { onAuthed: () => void }) => {
  const [pw, setPw] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === getAdminPassword()) {
      setAdminAuthed(true);
      onAuthed();
      toast.success("Welcome back");
    } else toast.error("Incorrect password");
  };
  return (
    <div className="min-h-screen grid place-items-center px-4 bg-hero-gradient">
      <form onSubmit={submit} className="glass-strong rounded-3xl p-8 w-full max-w-md space-y-5">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-3xl">Admin Sign in</h1>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pw">Password</Label>
          <Input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
        </div>
        <Button type="submit" className="w-full rounded-full bg-gradient-primary shadow-glow">Enter</Button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
      </form>
    </div>
  );
};

function Field({ label, value, onChange, textarea, rows }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; rows?: number;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {textarea ? (
        <Textarea rows={rows ?? 3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ListEditor<T>({
  items, onChange, newItem, render, title,
}: {
  items: T[]; onChange: (next: T[]) => void; newItem: () => T;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode; title: string;
}) {
  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <div key={idx} className="glass rounded-2xl p-5 space-y-3 relative">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{title} #{idx + 1}</div>
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="sm" disabled={idx === 0}
                onClick={() => { const c = [...items]; [c[idx - 1], c[idx]] = [c[idx], c[idx - 1]]; onChange(c); }}>↑</Button>
              <Button type="button" variant="ghost" size="sm" disabled={idx === items.length - 1}
                onClick={() => { const c = [...items]; [c[idx + 1], c[idx]] = [c[idx], c[idx + 1]]; onChange(c); }}>↓</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange(items.filter((_, i) => i !== idx))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {render(it, (patch) => {
            const c = [...items];
            c[idx] = { ...(c[idx] as object), ...patch } as T;
            onChange(c);
          })}
        </div>
      ))}
      <Button type="button" variant="outline" className="rounded-full" onClick={() => onChange([...items, newItem()])}>
        <Plus className="h-4 w-4 mr-1" /> Add {title}
      </Button>
    </div>
  );
}

const IconSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <Label>Icon</Label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
      {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
    </select>
  </div>
);

const AdminApp = ({ onLogout }: { onLogout: () => void }) => {
  const live = useContent();
  const [draft, setDraft] = useState<SiteContent>(() => getContent());
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(live), [draft, live]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (!dirty) setDraft(live); }, [live]);

  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleSave = () => { saveContent(draft); toast.success("Saved & published"); };
  const handleReset = () => {
    if (!confirm("Reset all content to defaults? This cannot be undone.")) return;
    resetContent(); setDraft(DEFAULT_CONTENT); toast.success("Content reset");
  };
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "rohini-site-content.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const handleImport = (file: File) => {
    file.text().then((t) => {
      try { setDraft(JSON.parse(t)); toast.success("Imported — click Save to publish"); }
      catch { toast.error("Invalid JSON"); }
    });
  };

  const submissions = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]"); } catch { return []; }
  }, [live]);

  const [newPw, setNewPw] = useState("");

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Helmet>
        <title>Admin · Content Studio — Rohini Varshney</title>
        <meta name="description" content="Private content management dashboard for editing site content and viewing contact submissions." />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="/admin" />
        <meta property="og:title" content="Admin · Content Studio" />
        <meta property="og:description" content="Private content management dashboard." />
        <meta property="og:url" content="/admin" />
      </Helmet>
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <h1 className="font-display text-xl">Admin · Content Studio</h1>
            {dirty && <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">unsaved</span>}
          </div>
          <div className="flex items-center gap-2">
            <input ref={fileRef} type="file" accept="application/json" hidden
              onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
            <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4 mr-1" /> Import</Button>
            <Button variant="ghost" size="sm" onClick={handleExport}><Download className="h-4 w-4 mr-1" /> Export</Button>
            <Button variant="ghost" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-1" /> Reset</Button>
            <Button size="sm" className="rounded-full bg-gradient-primary shadow-glow" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="flex flex-wrap h-auto p-1 mb-6 glass rounded-full">
            {["hero", "about", "experience", "services", "booking", "testimonials", "contact", "footer", "inbox", "settings"].map((t) => (
              <TabsTrigger key={t} value={t} className="rounded-full capitalize">{t}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="hero" className="space-y-5 glass-strong rounded-3xl p-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Badge text" value={draft.hero.badge} onChange={(v) => update("hero", { ...draft.hero, badge: v })} />
              <Field label="Tagline (before name)" value={draft.hero.tagline} onChange={(v) => update("hero", { ...draft.hero, tagline: v })} />
              <Field label="Name (highlighted)" value={draft.hero.name} onChange={(v) => update("hero", { ...draft.hero, name: v })} />
              <Field label="CV file URL" value={draft.hero.cvUrl} onChange={(v) => update("hero", { ...draft.hero, cvUrl: v })} />
            </div>
            <Field label="Description" textarea rows={4} value={draft.hero.description} onChange={(v) => update("hero", { ...draft.hero, description: v })} />
            <div className="grid sm:grid-cols-4 gap-3">
              <Field label="Primary CTA label" value={draft.hero.primaryCta.label} onChange={(v) => update("hero", { ...draft.hero, primaryCta: { ...draft.hero.primaryCta, label: v } })} />
              <Field label="Primary CTA href" value={draft.hero.primaryCta.href} onChange={(v) => update("hero", { ...draft.hero, primaryCta: { ...draft.hero.primaryCta, href: v } })} />
              <Field label="Secondary CTA label" value={draft.hero.secondaryCta.label} onChange={(v) => update("hero", { ...draft.hero, secondaryCta: { ...draft.hero.secondaryCta, label: v } })} />
              <Field label="Secondary CTA href" value={draft.hero.secondaryCta.href} onChange={(v) => update("hero", { ...draft.hero, secondaryCta: { ...draft.hero.secondaryCta, href: v } })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Currently at" value={draft.hero.currentlyAt} onChange={(v) => update("hero", { ...draft.hero, currentlyAt: v })} />
              <Field label="Years badge" value={draft.hero.yearsBadge} onChange={(v) => update("hero", { ...draft.hero, yearsBadge: v })} />
            </div>
            <div>
              <Label className="mb-3 block">Stats</Label>
              <ListEditor title="Stat" items={draft.hero.stats}
                onChange={(stats) => update("hero", { ...draft.hero, stats })}
                newItem={() => ({ v: "0", l: "Label" })}
                render={(it, u) => (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Value" value={it.v} onChange={(v) => u({ v })} />
                    <Field label="Label" value={it.l} onChange={(v) => u({ l: v })} />
                  </div>
                )} />
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-5 glass-strong rounded-3xl p-6">
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Eyebrow" value={draft.about.eyebrow} onChange={(v) => update("about", { ...draft.about, eyebrow: v })} />
              <Field label="Title (start)" value={draft.about.title} onChange={(v) => update("about", { ...draft.about, title: v })} />
              <Field label="Title accent" value={draft.about.titleAccent} onChange={(v) => update("about", { ...draft.about, titleAccent: v })} />
            </div>
            <Field label="Intro paragraph" textarea rows={4} value={draft.about.intro} onChange={(v) => update("about", { ...draft.about, intro: v })} />
            <div>
              <Label className="mb-3 block">Expertise areas</Label>
              <ListEditor title="Expertise" items={draft.about.expertise}
                onChange={(expertise) => update("about", { ...draft.about, expertise })}
                newItem={() => ({ icon: "Users", title: "New area", desc: "Describe…" })}
                render={(it, u) => (
                  <div className="grid sm:grid-cols-3 gap-3">
                    <IconSelect value={it.icon} onChange={(v) => u({ icon: v })} />
                    <Field label="Title" value={it.title} onChange={(v) => u({ title: v })} />
                    <Field label="Description" value={it.desc} onChange={(v) => u({ desc: v })} />
                  </div>
                )} />
            </div>
            <div>
              <Label className="mb-3 block">Skill groups</Label>
              <ListEditor title="Skill group" items={draft.about.skillGroups}
                onChange={(skillGroups) => update("about", { ...draft.about, skillGroups })}
                newItem={() => ({ title: "Group", skills: [{ name: "Skill", level: 80 }] })}
                render={(g, u) => (
                  <div className="space-y-3">
                    <Field label="Group title" value={g.title} onChange={(v) => u({ title: v })} />
                    <ListEditor title="Skill" items={g.skills}
                      onChange={(skills) => u({ skills })}
                      newItem={() => ({ name: "New skill", level: 70 })}
                      render={(s, su) => (
                        <div className="grid sm:grid-cols-[1fr_120px] gap-3">
                          <Field label="Name" value={s.name} onChange={(v) => su({ name: v })} />
                          <div className="space-y-2">
                            <Label>Level %</Label>
                            <Input type="number" min={0} max={100} value={s.level}
                              onChange={(e) => su({ level: Number(e.target.value) || 0 })} />
                          </div>
                        </div>
                      )} />
                  </div>
                )} />
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-5 glass-strong rounded-3xl p-6">
            <ListEditor title="Role" items={draft.experience.items}
              onChange={(items) => update("experience", { ...draft.experience, items })}
              newItem={() => ({ company: "Company", role: "Role", period: "Year — Year", location: "Location", points: ["Achievement"], tools: ["Tool"] })}
              render={(it, u) => (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Company" value={it.company} onChange={(v) => u({ company: v })} />
                    <Field label="Role" value={it.role} onChange={(v) => u({ role: v })} />
                    <Field label="Period" value={it.period} onChange={(v) => u({ period: v })} />
                    <Field label="Location / context" value={it.location} onChange={(v) => u({ location: v })} />
                  </div>
                  <Field label="Bullet points (one per line)" textarea rows={4}
                    value={it.points.join("\n")} onChange={(v) => u({ points: v.split("\n").filter(Boolean) })} />
                  <Field label="Tools (comma separated)" value={it.tools.join(", ")}
                    onChange={(v) => u({ tools: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
                </div>
              )} />
            <div className="glass rounded-2xl p-5 space-y-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Education</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Degree title" value={draft.experience.education.title}
                  onChange={(v) => update("experience", { ...draft.experience, education: { ...draft.experience.education, title: v } })} />
                <Field label="School & years" value={draft.experience.education.school}
                  onChange={(v) => update("experience", { ...draft.experience, education: { ...draft.experience.education, school: v } })} />
                <Field label="Score" value={draft.experience.education.score}
                  onChange={(v) => update("experience", { ...draft.experience, education: { ...draft.experience.education, score: v } })} />
                <Field label="Score label" value={draft.experience.education.scoreLabel}
                  onChange={(v) => update("experience", { ...draft.experience, education: { ...draft.experience.education, scoreLabel: v } })} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-5 glass-strong rounded-3xl p-6">
            <ListEditor title="Service" items={draft.services.items}
              onChange={(items) => update("services", { items })}
              newItem={() => ({ icon: "Handshake", title: "Service", desc: "Describe…", cta: "Learn more", href: "#contact" })}
              render={(it, u) => (
                <div className="grid sm:grid-cols-2 gap-3">
                  <IconSelect value={it.icon} onChange={(v) => u({ icon: v })} />
                  <Field label="Title" value={it.title} onChange={(v) => u({ title: v })} />
                  <Field label="CTA label" value={it.cta} onChange={(v) => u({ cta: v })} />
                  <Field label="CTA href" value={it.href} onChange={(v) => u({ href: v })} />
                  <div className="sm:col-span-2">
                    <Field label="Description" textarea rows={2} value={it.desc} onChange={(v) => u({ desc: v })} />
                  </div>
                </div>
              )} />
          </TabsContent>

          <TabsContent value="booking" className="space-y-5 glass-strong rounded-3xl p-6">
            <Field label="Calendly URL" value={draft.booking.calendlyUrl}
              onChange={(v) => update("booking", { ...draft.booking, calendlyUrl: v })} />
            <div>
              <Label className="mb-3 block">Session categories</Label>
              <ListEditor title="Category" items={draft.booking.categories}
                onChange={(categories) => update("booking", { ...draft.booking, categories })}
                newItem={() => ({ label: "Session", duration: "30 min" })}
                render={(it, u) => (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Label" value={it.label} onChange={(v) => u({ label: v })} />
                    <Field label="Duration" value={it.duration} onChange={(v) => u({ duration: v })} />
                  </div>
                )} />
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-5 glass-strong rounded-3xl p-6">
            <ListEditor title="Testimonial" items={draft.testimonials.items}
              onChange={(items) => update("testimonials", { items })}
              newItem={() => ({ quote: "Great experience…", name: "Name", role: "Role", company: "Company" })}
              render={(it, u) => (
                <div className="space-y-3">
                  <Field label="Quote" textarea rows={3} value={it.quote} onChange={(v) => u({ quote: v })} />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Field label="Name" value={it.name} onChange={(v) => u({ name: v })} />
                    <Field label="Role" value={it.role} onChange={(v) => u({ role: v })} />
                    <Field label="Company" value={it.company} onChange={(v) => u({ company: v })} />
                  </div>
                </div>
              )} />
          </TabsContent>

          <TabsContent value="contact" className="space-y-5 glass-strong rounded-3xl p-6">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Email" value={draft.contact.email} onChange={(v) => update("contact", { ...draft.contact, email: v })} />
              <Field label="Topmate URL" value={draft.contact.topmate} onChange={(v) => update("contact", { ...draft.contact, topmate: v })} />
              <Field label="Topmate label" value={draft.contact.topmateLabel} onChange={(v) => update("contact", { ...draft.contact, topmateLabel: v })} />
              <Field label="LinkedIn URL" value={draft.contact.linkedin} onChange={(v) => update("contact", { ...draft.contact, linkedin: v })} />
              <Field label="LinkedIn label" value={draft.contact.linkedinLabel} onChange={(v) => update("contact", { ...draft.contact, linkedinLabel: v })} />
              <Field label="Location" value={draft.contact.location} onChange={(v) => update("contact", { ...draft.contact, location: v })} />
            </div>
          </TabsContent>

          <TabsContent value="footer" className="space-y-5 glass-strong rounded-3xl p-6">
            <Field label="Copyright line (year added automatically)" value={draft.footer.copyright}
              onChange={(v) => update("footer", { copyright: v })} />
          </TabsContent>

          <TabsContent value="inbox" className="space-y-4 glass-strong rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Inbox className="h-4 w-4" /> <h2 className="font-display text-xl">Submissions</h2></div>
              {submissions.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => { localStorage.removeItem(SUBMISSIONS_KEY); location.reload(); }}>
                  <Trash2 className="h-4 w-4 mr-1" /> Clear all
                </Button>
              )}
            </div>
            {submissions.length === 0 && <p className="text-sm text-muted-foreground">No messages yet. Submissions from the contact form appear here (stored locally).</p>}
            <div className="space-y-3">
              {submissions.map((s: any, i: number) => (
                <div key={i} className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{s.name} · <span className="text-muted-foreground font-normal">{s.email}</span></div>
                    <div className="text-xs text-muted-foreground">{new Date(s.at).toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{s.service}{s.phone ? ` · ${s.phone}` : ""}</div>
                  <p className="text-sm">{s.message}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-5 glass-strong rounded-3xl p-6">
            <div className="space-y-3">
              <h2 className="font-display text-xl">Change admin password</h2>
              <p className="text-sm text-muted-foreground">Stored locally in this browser only. There is no external database.</p>
              <div className="flex gap-2">
                <Input type="password" placeholder="New password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
                <Button onClick={() => { if (newPw.length < 4) return toast.error("Min 4 chars"); setAdminPassword(newPw); setNewPw(""); toast.success("Password updated"); }}>
                  Update
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const Admin = () => {
  const [authed, setAuthed] = useState(() => isAdminAuthed());
  if (!authed) return <LoginGate onAuthed={() => setAuthed(true)} />;
  return <AdminApp onLogout={() => { setAdminAuthed(false); setAuthed(false); }} />;
};

export default Admin;

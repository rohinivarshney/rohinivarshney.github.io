import { useSyncExternalStore } from "react";

export type Stat = { v: string; l: string };
export type Expertise = { icon: string; title: string; desc: string };
export type Skill = { name: string; level: number };
export type SkillGroup = { title: string; skills: Skill[] };
export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tools: string[];
};
export type ServiceItem = { icon: string; title: string; desc: string; cta: string; href: string };
export type Testimonial = { quote: string; name: string; role: string; company: string };
export type BookingCategory = { label: string; duration: string };

export type SiteContent = {
  hero: {
    badge: string;
    name: string;
    tagline: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    cvUrl: string;
    stats: Stat[];
    currentlyAt: string;
    yearsBadge: string;
  };
  about: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    expertise: Expertise[];
    skillGroups: SkillGroup[];
  };
  experience: {
    items: ExperienceItem[];
    education: { title: string; school: string; score: string; scoreLabel: string };
  };
  services: { items: ServiceItem[] };
  booking: { calendlyUrl: string; categories: BookingCategory[] };
  testimonials: { items: Testimonial[] };
  contact: {
    email: string;
    topmate: string;
    topmateLabel: string;
    linkedin: string;
    linkedinLabel: string;
    location: string;
  };
  footer: { copyright: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Open for mentorship & collaborations",
    name: "Rohini Varshney",
    tagline: "Hi, I'm",
    description:
      "Talent Acquisition Specialist · HR Professional · Recruitment Strategist. I help companies hire exceptional people — and help professionals build careers worth showing up for.",
    primaryCta: { label: "View Portfolio", href: "#experience" },
    secondaryCta: { label: "Book a Call", href: "#booking" },
    cvUrl: "/Rohini_Varshney_CV.pdf",
    stats: [
      { v: "5+", l: "Years" },
      { v: "500+", l: "Hires" },
      { v: "20+", l: "Stakeholders" },
      { v: "2", l: "Industries" },
    ],
    currentlyAt: "Tech Mahindra",
    yearsBadge: "5+",
  },
  about: {
    eyebrow: "About Me",
    title: "People-first hiring,",
    titleAccent: "powered by data",
    intro:
      "I'm a Talent Acquisition Specialist with 5+ years of experience hiring across IT, product, business and operations roles at both fast-paced startups (Razorpay, Dinzy Foods) and global enterprises (Tech Mahindra). I blend empathy with analytics — building pipelines, partnering with stakeholders, and treating every candidate like a future colleague.",
    expertise: [
      { icon: "Users", title: "Talent Acquisition", desc: "End-to-end recruitment for IT & non-IT roles." },
      { icon: "Handshake", title: "Stakeholder Management", desc: "Aligning hiring managers with sourcing strategies." },
      { icon: "Megaphone", title: "Employer Branding", desc: "Personalized candidate engagement & storytelling." },
      { icon: "Heart", title: "Candidate Experience", desc: "Streamlined interviews & feedback loops." },
      { icon: "BarChart3", title: "Recruitment Analytics", desc: "Data-driven hiring with TAT & quality metrics." },
      { icon: "Briefcase", title: "HR Operations", desc: "Strategic hiring at startup & enterprise scale." },
    ],
    skillGroups: [
      {
        title: "HR & Recruitment",
        skills: [
          { name: "End-to-end Recruitment", level: 95 },
          { name: "Bulk & Lateral Hiring", level: 92 },
          { name: "Stakeholder Collaboration", level: 90 },
          { name: "Candidate Experience", level: 93 },
        ],
      },
      {
        title: "Technical Skills",
        skills: [
          { name: "SQL", level: 80 },
          { name: "Python", level: 70 },
          { name: "Salesforce CRM", level: 78 },
          { name: "HRMS / ATS", level: 90 },
        ],
      },
      {
        title: "Analytics & Reporting",
        skills: [
          { name: "Tableau", level: 78 },
          { name: "Power BI", level: 80 },
          { name: "MS Excel", level: 88 },
          { name: "Recruitment Dashboards", level: 85 },
        ],
      },
      {
        title: "Collaboration Tools",
        skills: [
          { name: "LinkedIn Recruiter", level: 95 },
          { name: "Slack", level: 90 },
          { name: "Microsoft Teams", level: 90 },
          { name: "Google Workspace", level: 92 },
        ],
      },
    ],
  },
  experience: {
    items: [
      {
        company: "Tech Mahindra",
        role: "Talent Acquisition Specialist",
        period: "May 2023 — Jan 2026",
        location: "Enterprise · IT & Non-IT",
        points: [
          "Managed end-to-end recruitment lifecycle for IT and non-IT roles — sourcing, screening, interviewing, offer negotiation.",
          "Handled high-volume bulk & lateral hiring across multiple business units, meeting aggressive TAT targets.",
          "Partnered with hiring managers to define role requirements and build effective sourcing strategies.",
          "Leveraged Naukri, LinkedIn Recruiter & internal databases to attract top talent.",
        ],
        tools: ["LinkedIn Recruiter", "Naukri", "HRMS", "ATS", "MS Office"],
      },
      {
        company: "Razorpay",
        role: "Talent Acquisition Specialist",
        period: "Jan 2020 — May 2023",
        location: "Startup · Tech, Product & Business",
        points: [
          "Led hiring for tech, product, and business roles in a fast-paced startup environment.",
          "Built strong talent pipelines through LinkedIn sourcing, referrals, and networking.",
          "Implemented data-driven recruitment strategies to reduce time-to-hire and improve conversion.",
          "Enhanced employer branding through personalized candidate engagement.",
        ],
        tools: ["LinkedIn Recruiter", "Slack", "Greenhouse", "Tableau"],
      },
      {
        company: "Dinzy Foods",
        role: "HR Business Partner",
        period: "May 2019 — Dec 2020",
        location: "Startup · Sales & Operations",
        points: [
          "Recruited and onboarded female sales agents for an organic grocery distribution network.",
          "Built marketing & management frameworks while working on a remote live project.",
          "Created employment opportunities for women supporting their families post-pandemic.",
        ],
        tools: ["Google Workspace", "WhatsApp Business", "MS Office"],
      },
    ],
    education: {
      title: "Bachelor's in Computer Application (BCA)",
      school: "Teerthankar Mahaveer University, Moradabad · 2016 — 2019",
      score: "86.15%",
      scoreLabel: "Aggregate",
    },
  },
  services: {
    items: [
      { icon: "GraduationCap", title: "Mentorship", desc: "1:1 career guidance for HR professionals & recruiters. Interview prep, LinkedIn optimization, and recruitment strategy.", cta: "Book a session", href: "#booking" },
      { icon: "Handshake", title: "Collaboration", desc: "Hiring partnerships, recruitment consulting, employer branding strategy & talent sourcing collaboration.", cta: "Start a project", href: "#contact" },
      { icon: "MessageSquare", title: "Reach Out", desc: "Professional inquiries, networking opportunities, speaking engagements & business discussions.", cta: "Send a message", href: "#contact" },
      { icon: "Calendar", title: "Calendar Booking", desc: "Schedule mentorship sessions, HR consultation, or quick career check-ins directly via Calendly.", cta: "View calendar", href: "#booking" },
    ],
  },
  booking: {
    calendlyUrl: "https://calendly.com/rohini-varshney01/30min",
    categories: [
      { label: "Mentorship Session", duration: "30 min" },
      { label: "Career Guidance", duration: "45 min" },
      { label: "Recruitment Consultation", duration: "60 min" },
      { label: "Collaboration Discussion", duration: "30 min" },
    ],
  },
  testimonials: {
    items: [
      { quote: "Rohini's process felt human from the very first call. She explained the role with so much clarity and stayed in touch through every round. Easily the best candidate experience I've had.", name: "Aarav Mehta", role: "Senior Software Engineer", company: "Razorpay" },
      { quote: "We closed five critical engineering roles in under a quarter because of Rohini's sourcing rigor and stakeholder management. She turns hiring into a real business lever.", name: "Priya Iyer", role: "Engineering Director", company: "Tech Mahindra" },
      { quote: "Her mentorship reshaped how I approach interviews and personal branding on LinkedIn. Practical, warm, and incredibly generous with her time.", name: "Sneha Kapoor", role: "HR Generalist", company: "Independent" },
      { quote: "Rohini built our hiring playbook from scratch. We went from ad-hoc referrals to a structured pipeline with proper analytics. Game-changing for a young startup.", name: "Vikram Shah", role: "Founder", company: "Dinzy Foods" },
    ],
  },
  contact: {
    email: "rohini.varshney01@gmail.com",
    topmate: "https://topmate.io/rohini_varshney",
    topmateLabel: "topmate.io/rohini_varshney",
    linkedin: "https://linkedin.com/in/rohini-varshney",
    linkedinLabel: "/in/rohini-varshney",
    location: "India · Open to remote",
  },
  footer: { copyright: "Rohini Varshney · Crafted with care." },
};

const STORAGE_KEY = "rv_site_content_v1";
const EVENT = "rv_content_changed";

function deepMerge<T>(base: T, override: any): T {
  if (Array.isArray(base)) return (override ?? base) as T;
  if (base && typeof base === "object") {
    const out: any = { ...base };
    if (override && typeof override === "object") {
      for (const k of Object.keys(override)) {
        out[k] = deepMerge((base as any)[k], override[k]);
      }
    }
    return out;
  }
  return (override ?? base) as T;
}

function read(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    return deepMerge(DEFAULT_CONTENT, JSON.parse(raw));
  } catch {
    return DEFAULT_CONTENT;
  }
}

let cache: SiteContent = read();

const listeners = new Set<() => void>();
function emit() {
  cache = read();
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) emit();
  });
  window.addEventListener(EVENT, () => emit());
}

export function getContent(): SiteContent {
  return cache;
}

export function saveContent(next: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function useContent(): SiteContent {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => cache,
    () => DEFAULT_CONTENT,
  );
}

const AUTH_KEY = import.meta.env.VITE_ADMIN_AUTH_KEY;
const PASS_KEY = import.meta.env.VITE_ADMIN_PASS_KEY;
const DEFAULT_PASS = import.meta.env.VITE_ADMIN_DEFAULT_PASS;

export function getAdminPassword(): string {
  return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
}
export function setAdminPassword(p: string) {
  localStorage.setItem(PASS_KEY, p);
}
export function isAdminAuthed(): boolean {
  return localStorage.getItem(AUTH_KEY) === "1";
}
export function setAdminAuthed(v: boolean) {
  if (v) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
}

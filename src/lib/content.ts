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
export type EducationItem = {
  title: string;
  school: string;
  score?: string;
  scoreLabel?: string;
};
export type ServiceItem = { icon: string; title: string; desc: string; cta: string; href: string };
export type Testimonial = { quote: string; name: string; role: string; company: string };
export type BookingCategory = { label: string; duration: string };

export type SiteContent = {
  hero: {
    badge: string;
    name: string;
    tagline: string;
    roleTitle: string;
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
    education: EducationItem[];
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
    badge: "Open to recruitment & staffing opportunities",
    name: "Rohini Varshney",
    tagline: "Hi, I'm",
    roleTitle: "Talent Acquisition Specialist · US/UK Staffing · IT Recruitment",
    description:
      "I manage end-to-end hiring for IT and non-IT roles — from requirement intake and sourcing through offer negotiation and joining follow-up. Experienced in contract and permanent hiring, domestic and US/UK staffing, and high-volume lateral and bulk recruitment at enterprise and startup scale.",
    primaryCta: { label: "View Experience", href: "#experience" },
    secondaryCta: { label: "Book a Call", href: "#booking" },
    cvUrl: "/Rohini_Varshney_TA.pdf",
    stats: [
      { v: "6+", l: "Years in TA" },
      { v: "10+", l: "Roles / Quarter" },
      { v: "US/UK", l: "Staffing" },
      { v: "3", l: "Key Employers" },
    ],
    currentlyAt: "Stanford Continuing Studies",
    yearsBadge: "6+",
  },
  about: {
    eyebrow: "About Me",
    title: "People-first hiring,",
    titleAccent: "built for scale",
    intro:
      "I'm a Talent Acquisition Specialist with 6+ years across Tech Mahindra, Razorpay, and community hiring at Dinzy Foods. I partner with hiring managers on role clarity and sourcing strategy, run structured HR screenings, and close high-volume pipelines while protecting candidate experience and quality of hire. Currently deepening my practice through Stanford Continuing Studies in Strategic Talent Management.",
    expertise: [
      { icon: "Users", title: "End-to-End Recruitment", desc: "Requirement intake through joining follow-up for IT & non-IT roles." },
      { icon: "Globe", title: "US/UK Staffing", desc: "Domestic and international hiring with time-zone coordination." },
      { icon: "Handshake", title: "Stakeholder Management", desc: "Role understanding, sourcing strategy, and market availability insights." },
      { icon: "Megaphone", title: "Employer Branding", desc: "Professional candidate engagement that represents company culture." },
      { icon: "Heart", title: "Candidate Experience", desc: "Personalized communication, structured follow-ups, and timely updates." },
      { icon: "BarChart3", title: "Recruitment Reporting", desc: "Hiring funnel reports, TAT tracking, and pipeline management." },
    ],
    skillGroups: [
      {
        title: "Job Portals & ATS",
        skills: [
          { name: "LinkedIn Recruiter", level: 95 },
          { name: "Naukri & Indeed", level: 92 },
          { name: "Greenhouse & Workday", level: 88 },
          { name: "Instahyre & Internal DBs", level: 85 },
        ],
      },
      {
        title: "Recruitment Activities",
        skills: [
          { name: "Boolean Search & Sourcing", level: 93 },
          { name: "Resume Screening", level: 94 },
          { name: "Interview Scheduling", level: 91 },
          { name: "Offer Follow-up", level: 90 },
        ],
      },
      {
        title: "HR Systems & Collaboration",
        skills: [
          { name: "ATS / HRMS (Darwinbox, Keka)", level: 90 },
          { name: "Google Workspace", level: 92 },
          { name: "Slack & Zoom", level: 90 },
          { name: "Contract & Permanent Hiring", level: 93 },
        ],
      },
      {
        title: "Reporting & Analytics",
        skills: [
          { name: "MS Office & Google Sheets", level: 90 },
          { name: "Hiring Funnel Reports", level: 88 },
          { name: "Candidate Status Reports", level: 87 },
          { name: "TAT Tracking", level: 91 },
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
        location: "Enterprise · IT & Non-IT · US/UK Staffing",
        points: [
          "Managed end-to-end recruitment for IT and non-IT roles — requirement intake, sourcing, screening, interview coordination, offer negotiation, and joining follow-up.",
          "Supported domestic and US/UK staffing across multiple business units for lateral, bulk, contract, and permanent hiring.",
          "Handled high-volume hiring while meeting aggressive turnaround targets and maintaining hiring quality.",
          "Partnered with hiring managers on role requirements and effective sourcing strategies.",
          "Conducted HR screenings for experience fit, communication, notice period, compensation, work authorization, and role alignment.",
          "Consistently achieved monthly targets by closing 10+ positions per quarter with strong candidate quality and stakeholder satisfaction.",
        ],
        tools: ["Naukri", "LinkedIn Recruiter", "Workday", "ATS", "HRMS", "MS Office"],
      },
      {
        company: "Razorpay",
        role: "Recruitment Specialist",
        period: "Jan 2020 — May 2023",
        location: "Startup · Tech, Product, Business & Support",
        points: [
          "Led hiring for technology, product, business, and support roles in a fast-paced startup environment.",
          "Supported domestic and international recruitment, including US/UK staffing coordination.",
          "Sourced and screened technical and non-technical candidates on skills, experience, notice period, compensation, and business alignment.",
          "Implemented data-driven strategies to reduce time-to-hire and improve candidate conversion rates.",
          "Improved candidate experience through personalized communication, structured follow-ups, and timely updates.",
          "Contributed to employer branding through professional engagement and authentic representation of company culture.",
        ],
        tools: ["LinkedIn Recruiter", "Instahyre", "Greenhouse", "Slack", "Google Workspace"],
      },
      {
        company: "Dinzy Foods",
        role: "HR & Community Hiring",
        period: "May 2019 — Dec 2020",
        location: "Community · Work-from-Home Sales Network",
        points: [
          "Identified and onboarded women agents to sell organic grocery buckets within their local networks.",
          "Communicated earning opportunities and coordinated onboarding for prospective agents.",
          "Created employment options for women seeking work-from-home income during a challenging economic period.",
          "Built skills in communication, people management, community outreach, sales coordination, and grassroots hiring.",
        ],
        tools: ["Google Workspace", "MS Office"],
      },
    ],
    education: [
      {
        title: "Strategic Talent Management: Attracting, Growing, and Retaining Employees",
        school: "Stanford Continuing Studies · Jan 2026 — Apr 2026",
        score: "In progress",
        scoreLabel: "Coursework",
      },
      {
        title: "Bachelor's in Computer Application (BCA)",
        school: "Teerthanker Mahaveer University, Moradabad · 2016 — 2019",
        score: "86.15%",
        scoreLabel: "Aggregate",
      },
    ],
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
    location: "Chandausi, Uttar Pradesh · Open to remote & US/UK coordination",
  },
  footer: { copyright: "Rohini Varshney · Crafted with care." },
};

const STORAGE_KEY = "rv_site_content_v2";
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

function normalizeEducation(experience: SiteContent["experience"]): SiteContent["experience"] {
  const edu = experience.education as EducationItem[] | EducationItem | undefined;
  if (!edu) return { ...experience, education: DEFAULT_CONTENT.experience.education };
  if (Array.isArray(edu)) return experience;
  return { ...experience, education: [edu] };
}

function read(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    const merged = deepMerge(DEFAULT_CONTENT, JSON.parse(raw)) as SiteContent;
    return { ...merged, experience: normalizeEducation(merged.experience) };
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

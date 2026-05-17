import {
  Users, Handshake, Megaphone, Heart, BarChart3, Briefcase,
  GraduationCap, MessageSquare, Calendar, Sparkles, Star,
  Building2, Mail, Phone, Linkedin, MapPin, Globe,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Users, Handshake, Megaphone, Heart, BarChart3, Briefcase,
  GraduationCap, MessageSquare, Calendar, Sparkles, Star,
  Building2, Mail, Phone, Linkedin, MapPin, Globe,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] || Users;
  return <C className={className} />;
}

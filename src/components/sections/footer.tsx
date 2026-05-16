import { useContent } from "@/lib/content";

export const Footer = () => {
  const { footer } = useContent();
  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-primary text-primary-foreground font-bold text-[10px]">RV</span>
          <span>© {new Date().getFullYear()} {footer.copyright}</span>
        </div>
        <div className="flex gap-4">
          <a href="#about" className="hover:text-foreground transition-smooth">About</a>
          <a href="#services" className="hover:text-foreground transition-smooth">Services</a>
          <a href="#contact" className="hover:text-foreground transition-smooth">Contact</a>
          <a href="/admin" className="hover:text-foreground transition-smooth opacity-60">Admin</a>
        </div>
      </div>
    </footer>
  );
};

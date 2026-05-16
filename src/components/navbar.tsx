import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <nav className={cn(
        "container mx-auto flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-smooth",
        scrolled ? "glass-strong" : "bg-transparent"
      )}>
        <a href="#home" className="flex items-center gap-2 font-display text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground font-sans font-bold text-sm shadow-glow">
            RV
          </span>
          
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-full hover:bg-secondary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex rounded-full bg-gradient-primary hover:opacity-90 shadow-glow">
            <a href="#contact">Let's Talk</a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden glass rounded-full" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden container mx-auto mt-2 animate-fade-in">
          <div className="glass-strong rounded-3xl p-4 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="px-4 py-3 rounded-2xl hover:bg-secondary transition-smooth">{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

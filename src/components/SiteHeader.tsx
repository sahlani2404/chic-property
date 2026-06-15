import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Beranda", exact: true },
    { to: "/properties", label: "Properti" },
    { to: "/portfolio", label: "Portofolio" },
    { to: "/about", label: "Tentang" },
    { to: "/contact", label: "Kontak" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border"><meta charset="utf-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-display text-base">
            LP
          </span>
          <span className="font-display text-2xl tracking-tight">Linear Property</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={link.exact ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground" }}
              className="text-muted-foreground hover:text-foreground transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          Konsultasi Gratis
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition cursor-pointer"
                aria-label="Buka menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col justify-between p-6">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2 mt-4">
                  <span className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-display text-base">
                    LP
                  </span>
                  <SheetTitle className="font-display text-2xl tracking-tight">Linear Property</SheetTitle>
                </div>
                <nav className="flex flex-col gap-5 text-base">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      activeOptions={link.exact ? { exact: true } : undefined}
                      activeProps={{ className: "text-foreground font-medium" }}
                      className="text-muted-foreground hover:text-foreground transition py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="mt-auto">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


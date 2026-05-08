import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

const links = [
  { label: "Manifeste", href: "/#manifeste" },
  { label: "Missions", href: "/#missions" },
  { label: "Partenaires", href: "/#partenaires" },
  { label: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex h-20 items-center justify-between">
        
        <NavHashLink smooth to="/#top" className="inline-flex items-center gap-2.5 group">
          <span className="font-display text-base font-semibold tracking-tight text-primary flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-20 object-contain" />
            <span>Intelligence Économique | <span className="text-accent">ie237</span></span>
          </span>
        </NavHashLink>

        
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <NavHashLink
              smooth
              key={`nav-link-${l.href}`}
              to={l.href}
              className="text-sm text-primary/75 hover:text-accent transition-smooth"
            >
              {l.label}
            </NavHashLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
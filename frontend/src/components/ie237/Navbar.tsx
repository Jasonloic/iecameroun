import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

const links = [
  { label: "Manifeste", href: "/#manifeste" },
  { label: "Missions", href: "/#missions" },
  { label: "Partenaires", href: "/#partenaires" },
  { label: "Contact", href: "/#contact" },
];

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-primary fill-none stroke-[1.5]">
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15h10.5" />
      </>
    )}
  </svg>
);

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex h-20 items-center justify-between">
        <NavHashLink smooth to="/#top" className="inline-flex items-center gap-2.5 group min-w-0">
          <span className="font-display text-base font-semibold tracking-tight text-[20px] flex items-center gap-2 min-w-0">
            <img src="/logo.png" alt="Logo" className="w-[92px] shrink-0 object-contain" />
            <span className="font-display font-semibold tracking-tight text-primary text-xs sm:text-[16px] whitespace-nowrap">
              Intelligence Économique | <span className="text-accent">IE237</span>
            </span>
          </span>
        </NavHashLink>

        {/* Desktop nav */}
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

        {/* Burger mobile */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-secondary transition-all"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container py-6 flex flex-col gap-1">
            {links.map((l) => (
              <NavHashLink
                smooth
                key={`mobile-nav-${l.href}`}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-primary/75 hover:text-accent hover:bg-secondary px-4 py-3 rounded-md transition-all"
              >
                {l.label}
              </NavHashLink>
            ))}
          </nav>
        </div>
      )}
      {/* Drapeau Cameroun Gauche */}
      <div className="absolute left-0 flex h-[3px] w-32 sm:w-48 md:w-64 lg:w-80 z-10">
        <div className="flex-1 bg-[#007A5E]" />
        <div className="flex-1 bg-[#CE1126]" />
        <div className="flex-1 bg-[#FCD116]" />
      </div>

      {/* Drapeau Cameroun Droite */}
      <div className="absolute right-0 flex h-[3px] w-32 sm:w-48 md:w-64 lg:w-80 z-10">
        <div className="flex-1 bg-[#007A5E]" />
        <div className="flex-1 bg-[#CE1126]" />
        <div className="flex-1 bg-[#FCD116]" />
      </div>
    </header>
  );
};
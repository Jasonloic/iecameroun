import { NavHashLink } from "react-router-hash-link";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="container py-24 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Contact
          </div>
          <h2 className="font-display text-primary text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-light tracking-tight text-balance">
            Une question stratégique ?
          </h2>
          <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl">
            Pouvoirs publics, entreprises, collectivités, institutions académiques :
            engagez le dialogue avec IE237.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="mailto:contact@iecameroun.cm" className="bg-primary text-primary-foreground rounded-md px-7 py-3.5 text-sm font-medium hover:bg-accent transition-smooth">
              Engager une conversation
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 grid sm:grid-cols-2 gap-8 text-sm">
          {[
            ["Siège", "Bastos, Yaoundé Cameroun"],
            ["Email", "contact@iecameroun.cm"],
            ["Statut", "Think Do Tank républicain"],
            ["Disponibilité", "Lun — Ven · 8h — 15h30"],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-border pt-5">
              <div className="text-accent text-[10px] uppercase tracking-[0.3em] font-medium">{t}</div>
              <div className="text-primary/80 mt-2">{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <NavHashLink smooth to="/#top" className="inline-flex items-center gap-2.5 group">
              <span className="font-display text-base font-semibold tracking-tight text-primary flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-20 object-contain" />
                <span>Intelligence Économique | <span className="text-accent">ie237</span></span>
              </span>
            </NavHashLink>
          </div>
          <span>© {new Date().getFullYear()} IE237 — Veille · Influence · Protection</span>
          <span className="text-[10px]">Fait avec ❤️ par <a href="mailto:contact@olena-imagine.work">Olena-Imagine</a></span>
        </div>
      </div>
    </footer>
  );
};

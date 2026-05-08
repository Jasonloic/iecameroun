import { useMemo, useState } from "react";
import { Navbar } from "@/components/ie237/Navbar";
import { Footer } from "@/components/ie237/Footer";
import {
  FileText,
  AlertTriangle,
  ScrollText,
  LayoutDashboard,
  Telescope,
  Download,
  Search,
} from "lucide-react";

type Type = "Note d'analyse" | "Note d'alerte" | "Policy brief" | "Tableau de bord" | "Étude prospective";

const TYPE_META: Record<Type, { icon: typeof FileText }> = {
  "Note d'analyse": { icon: FileText },
  "Note d'alerte": { icon: AlertTriangle },
  "Policy brief": { icon: ScrollText },
  "Tableau de bord": { icon: LayoutDashboard },
  "Étude prospective": { icon: Telescope },
};

const LIVRABLES: {
  ref: string;
  type: Type;
  title: string;
  domain: string;
  date: string;
  pages: number;
}[] = [
  { ref: "IE237-NA-026", type: "Note d'analyse", title: "Recomposition des chaînes de valeur du cacao en Afrique centrale", domain: "Souveraineté économique", date: "Avril 2026", pages: 18 },
  { ref: "IE237-AL-014", type: "Note d'alerte", title: "Campagne d'influence hostile sur les médias sociaux camerounais", domain: "Guerre informationnelle", date: "Mars 2026", pages: 8 },
  { ref: "IE237-PB-009", type: "Policy brief", title: "Renforcer la doctrine cyber nationale : cinq recommandations à l'ANTIC", domain: "Cybersécurité", date: "Mars 2026", pages: 12 },
  { ref: "IE237-TB-004", type: "Tableau de bord", title: "Indicateurs trimestriels de la sécurité économique du Cameroun", domain: "Veille stratégique", date: "Février 2026", pages: 24 },
  { ref: "IE237-EP-003", type: "Étude prospective", title: "Cameroun 2035 : quatre scénarios de souveraineté", domain: "Prospective", date: "Février 2026", pages: 64 },
  { ref: "IE237-NA-025", type: "Note d'analyse", title: "Bois et cobalt : le Cameroun face aux nouvelles dépendances", domain: "Matières premières", date: "Janvier 2026", pages: 22 },
  { ref: "IE237-PB-008", type: "Policy brief", title: "Diplomatie économique : repositionner le Cameroun en Afrique centrale", domain: "Influence", date: "Janvier 2026", pages: 14 },
  { ref: "IE237-AL-013", type: "Note d'alerte", title: "Risques sur les infrastructures portuaires de Douala et Kribi", domain: "Sécurité économique", date: "Décembre 2025", pages: 10 },
  { ref: "IE237-EP-002", type: "Étude prospective", title: "L'Afrique cognitive : penser la guerre des récits à 10 ans", domain: "Cognitif", date: "Novembre 2025", pages: 52 },
  { ref: "IE237-NA-024", type: "Note d'analyse", title: "PME camerounaises et intelligence économique : état des lieux", domain: "Aide à la décision", date: "Octobre 2025", pages: 20 },
];

const TYPES: ("Tous" | Type)[] = [
  "Tous",
  "Note d'analyse",
  "Note d'alerte",
  "Policy brief",
  "Tableau de bord",
  "Étude prospective",
];

const Bibliotheque = () => {
  const [filter, setFilter] = useState<(typeof TYPES)[number]>("Tous");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return LIVRABLES.filter((l) => {
      const matchType = filter === "Tous" || l.type === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.domain.toLowerCase().includes(q) ||
        l.ref.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [filter, query]);

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="bg-background pt-40 pb-16 border-b border-border">
        <div className="container">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Bibliothèque · Livrables
          </div>
          <h1 className="font-display text-primary text-5xl lg:text-6xl xl:text-7xl leading-[1.05] font-light tracking-tight max-w-4xl">
            Parcourez l'ensemble <span className="text-accent">de nos productions</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground text-base lg:text-lg leading-relaxed">
            Notes d'analyse, alertes, policy briefs, tableaux de bord et études prospectives.
            Une bibliothèque vivante au service de la décision publique et privée.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container py-6 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-md text-xs border transition-smooth ${
                  filter === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-accent hover:text-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un livrable…"
              className="w-full pl-11 pr-4 py-2.5 rounded-md border border-border bg-background text-sm focus:outline-none focus:border-accent transition-smooth"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {filtered.length} livrable{filtered.length > 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              Aucun livrable ne correspond à votre recherche.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {filtered.map((l) => {
                const Icon = TYPE_META[l.type].icon;
                return (
                  <article
                    key={l.ref}
                    className="group bg-background p-8 transition-smooth hover:bg-secondary/40 flex flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                      <span className="text-muted-foreground text-[10px] tracking-[0.2em]">
                        {l.ref}
                      </span>
                    </div>
                    <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-accent font-medium">
                      {l.type}
                    </div>
                    <h3 className="font-display text-lg font-medium text-primary mt-3 leading-tight">
                      {l.title}
                    </h3>
                    <div className="text-xs text-muted-foreground space-y-1 flex-1 mt-4">
                      <div>Domaine · {l.domain}</div>
                      <div>Publié · {l.date}</div>
                      <div>{l.pages} pages</div>
                    </div>
                    <a
                      href="#"
                      className="mt-6 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-medium hover:bg-accent transition-smooth"
                    >
                      <Download className="h-3.5 w-3.5" /> Télécharger
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Bibliotheque;
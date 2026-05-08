import { FileText, AlertTriangle, ScrollText, LayoutDashboard, Telescope } from "lucide-react";

const items = [
  { icon: FileText, title: "Notes d'analyse", desc: "Décrypter les enjeux complexes en éclairages opérationnels." },
  { icon: AlertTriangle, title: "Notes d'alerte", desc: "Signaler en temps réel les risques émergents." },
  { icon: ScrollText, title: "Policy briefs", desc: "Formuler des recommandations actionnables pour les décideurs." },
  { icon: LayoutDashboard, title: "Tableaux de bord", desc: "Mesurer et suivre les indicateurs stratégiques." },
  { icon: Telescope, title: "Études prospectives", desc: "Construire les scénarios du Cameroun de demain." },
];

export const Livrables = () => {
  return (
    <section id="livrables" className="bg-secondary py-24 lg:py-36 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Livrables
          </div>
          <h2 className="font-display text-primary text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-light tracking-tight">
            Productions éditoriales
          </h2>
          <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Des formats pensés pour la décision publique, économique et stratégique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <article key={title} className="bg-background p-8 hover:bg-secondary/40 transition-smooth">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                <span className="text-muted-foreground text-xs">0{i + 1}</span>
              </div>
              <h3 className="font-display text-lg font-medium text-primary mt-8 leading-tight">{title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

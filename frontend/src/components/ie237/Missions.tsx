import { Eye, Megaphone, ShieldCheck, Compass } from "lucide-react";

const missions = [
  { icon: Eye, n: "01", title: "Veille stratégique", desc: "Détecter les signaux faibles, anticiper les ruptures, cartographier les risques économiques et géopolitiques." },
  { icon: Megaphone, n: "02", title: "Influence & lobbying", desc: "Porter la voix du Cameroun dans les arènes internationales et défendre ses intérêts par la puissance d'idée." },
  { icon: ShieldCheck, n: "03", title: "Sécurité économique", desc: "Protéger le patrimoine informationnel, industriel et stratégique des entreprises et institutions nationales." },
  { icon: Compass, n: "04", title: "Aide à la décision", desc: "Éclairer les pouvoirs publics et privés par des analyses rigoureuses, prospectives et opérationnelles." },
];

export const Missions = () => {
  return (
    <section id="missions" className="bg-secondary py-24 lg:py-36 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Missions
          </div>
          <h2 className="font-display text-primary text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-light tracking-tight">
            Comment nous travaillons
          </h2>
          <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-relaxed max-w-2xl">
            Quatre missions cardinales pensées pour les institutions et entreprises
            qui cherchent un positionnement stratégique consistant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {missions.map(({ icon: Icon, n, title, desc }) => (
            <article key={n} className="bg-background p-10 lg:p-12 hover:bg-secondary/40 transition-smooth">
              <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <div className="flex items-baseline gap-3 mt-8">
                <span className="text-muted-foreground text-xs">{n}</span>
                <h3 className="font-display text-2xl font-medium text-primary">{title}</h3>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

import { TrendingUp, Brain, Network, Lock, Sparkles, Target, Globe2, BookOpen } from "lucide-react";

const avantages = [
  { icon: Brain, title: "Expertise pluridisciplinaire", text: "Huit champs de compétences réunis sous un même toit." },
  { icon: Target, title: "Indépendance d'analyse", text: "Une parole libre, rigoureuse et au service de l'intérêt général." },
  { icon: Network, title: "Réseau institutionnel", text: "Un accès privilégié aux décideurs publics et privés du Cameroun." },
  { icon: Lock, title: "Sécurité économique", text: "Une protection active du patrimoine informationnel national." },
  { icon: TrendingUp, title: "Anticipation stratégique", text: "Détection des signaux faibles et des ruptures à venir." },
  { icon: Globe2, title: "Vision continentale", text: "Une lecture africaine et internationale des dynamiques globales." },
  { icon: Sparkles, title: "Patriotisme économique", text: "La défense des intérêts camerounais comme boussole." },
  { icon: BookOpen, title: "Production éditoriale", text: "Notes, briefs, tableaux de bord et études prospectives." },
];

export const Avantages = () => {
  return (
    <section id="avantages" className="bg-background py-24 lg:py-36 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Valeur ajoutée
          </div>
          <h2 className="font-display text-primary text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-light tracking-tight">
            Huit avantages décisifs
          </h2>
          <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Ce que nous délivrons à nos partenaires publics, privés et académiques.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {avantages.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-background p-8 hover:bg-secondary/40 transition-smooth">
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-medium text-primary mt-6 leading-tight">{title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Navbar } from "@/components/ie237/Navbar";
import { Footer } from "@/components/ie237/Footer";
import { Calendar, ArrowUpRight, Newspaper } from "lucide-react";

const featured = {
  category: "Analyse",
  date: "12 avril 2026",
  title: "Cameroun 2035 : repenser la souveraineté économique à l'ère cognitive",
  excerpt:
    "IE237 publie une note stratégique majeure sur les leviers d'une économie nationale résiliente face aux nouvelles formes de guerre informationnelle.",
  readTime: "8 min",
};

const articles = [
  {
    category: "Alerte",
    date: "28 mars 2026",
    title: "Désinformation économique : cartographie des campagnes hostiles au Cameroun",
    excerpt: "Une étude exclusive révèle l'origine et les vecteurs des principales opérations d'influence visant le tissu économique national.",
    readTime: "6 min",
  },
  {
    category: "Policy Brief",
    date: "15 mars 2026",
    title: "Souveraineté numérique : recommandations à l'ANTIC",
    excerpt: "Cinq axes prioritaires pour renforcer la doctrine cyber et la protection des infrastructures critiques camerounaises.",
    readTime: "10 min",
  },
  {
    category: "Tribune",
    date: "02 mars 2026",
    title: "Pourquoi l'Afrique a besoin de ses propres think tanks",
    excerpt: "Plaidoyer pour une production intellectuelle endogène, capable de penser le continent depuis le continent.",
    readTime: "5 min",
  },
  {
    category: "Événement",
    date: "20 février 2026",
    title: "Forum IE237 : 200 décideurs réunis à Yaoundé",
    excerpt: "Retour sur la première édition du Forum de l'Intelligence Économique, organisé en partenariat avec l'IRIC.",
    readTime: "4 min",
  },
  {
    category: "Étude prospective",
    date: "08 février 2026",
    title: "Matières premières stratégiques : le Cameroun face à 2030",
    excerpt: "Quels scénarios pour le bois, le cobalt et le cacao dans un contexte de recomposition des chaînes de valeur ?",
    readTime: "12 min",
  },
  {
    category: "Note d'analyse",
    date: "25 janvier 2026",
    title: "Influence française vs influence chinoise : où est le Cameroun ?",
    excerpt: "Décryptage des nouvelles équations diplomatiques et économiques au cœur de l'Afrique centrale.",
    readTime: "7 min",
  },
];

const Medias = () => {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="bg-background pt-40 pb-20 border-b border-border">
        <div className="container">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Médias · Actualités
          </div>
          <h1 className="font-display text-primary text-5xl lg:text-6xl xl:text-7xl leading-[1.05] font-light tracking-tight max-w-4xl">
            L'actualité stratégique <span className="text-accent">décryptée</span> par IE237.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground text-base lg:text-lg leading-relaxed">
            Tribunes, alertes, analyses, événements : retrouvez toutes nos prises de parole
            publiques sur la guerre économique, l'influence et la souveraineté du Cameroun.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container">
          <article className="group grid lg:grid-cols-12 gap-10 bg-background border border-border rounded-md p-10 lg:p-14 transition-smooth">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-accent font-medium">
                  <Newspaper className="h-3 w-3" /> À la une
                </span>
                <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {featured.category} · {featured.date}
                </div>
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Lecture · {featured.readTime}
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-primary text-3xl lg:text-4xl leading-tight font-light">
                {featured.title}
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 text-sm text-primary font-medium hover:text-accent transition-smooth"
              >
                Lire l'article <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-background py-24 border-t border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-primary text-3xl lg:text-4xl font-light tracking-tight">
              Toutes les <span className="text-accent">publications</span>
            </h2>
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
              {articles.length} articles
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {articles.map((a, i) => (
              <article
                key={i}
                className="group bg-background p-8 hover:bg-secondary/40 transition-smooth flex flex-col"
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-medium">
                  <span className="text-accent">{a.category}</span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {a.readTime}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-primary mt-6 leading-tight">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mt-4">{a.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {a.date}
                  </span>
                  <a
                    href="#"
                    className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:text-accent transition-smooth"
                  >
                    Lire <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Medias;
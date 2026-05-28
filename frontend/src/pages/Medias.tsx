import { useState, useEffect } from "react";
import { Navbar } from "@/components/ie237/Navbar";
import { Footer } from "@/components/ie237/Footer";
import { Calendar, ArrowUpRight, Newspaper } from "lucide-react";

interface Article {
  id: number;
  categorie: string; // Utilisation de 'categorie' pour correspondre au modèle BDD
  createdAt: string; // Géré par Sequelize
  titre: string;     // Correspondance exacte avec votre contrôleur
  resume: string;    // Correspondance exacte avec votre contrôleur
  imageCover?: string | null;
  readTime?: string; // Calculé dynamiquement côté Front
}

const Medias = () => {
  const [featured, setFeatured] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction utilitaire pour simuler un temps de lecture
  const calculateReadTime = (text: string): string => {
    const words = text ? text.split(/\s+/).length : 0;
    // Si la route getAll exclut 'contenu', on se base sur le résumé (min 3 min)
    return `${Math.max(3, Math.ceil(words / 30))} min`;
  };

  // Formatage de la date ISO vers le format local français
  const formatDate = (isoString: string): string => {
    if (!isoString) return "Date inconnue";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(isoString));
  };

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        // Appel de votre route GET '/' avec une limite suffisante pour la page d'accueil
        const response = await fetch("http://localhost:3000/api/actualites?limit=10");
        if (!response.ok) throw new Error("Erreur serveur lors de la récupération");

        const json = await response.json();

        // ATTENTION : sendSuccess renvoie généralement les données dans json.data
        const rawArticles: Article[] = json.data || [];

        if (rawArticles.length > 0) {
          // L'article le plus récent (index 0) passe à la une
          setFeatured(rawArticles[0]);
          // Le reste va dans la grille globale
          setArticles(rawArticles.slice(1));
        }
      } catch (error) {
        console.error("Erreur de liaison API :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActualites();
  }, []);

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

        {/* SECTION À LA UNE */}
        <section className="bg-secondary py-20">
          <div className="container">
            {isLoading ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground bg-background border border-border rounded-md animate-pulse">
                  Chargement de l'analyse à la une...
                </div>
            ) : featured ? (
                <article className="group grid lg:grid-cols-12 gap-10 bg-background border border-border rounded-md p-10 lg:p-14 transition-smooth">
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    <div>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-accent font-medium">
                    <Newspaper className="h-3 w-3" /> À la une
                  </span>
                      <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                        {featured.categorie} · {formatDate(featured.createdAt)}
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Lecture · {calculateReadTime(featured.resume)}
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <h2 className="font-display text-primary text-3xl lg:text-4xl leading-tight font-light">
                      {featured.titre}
                    </h2>
                    <p className="mt-6 text-muted-foreground leading-relaxed">{featured.resume}</p>
                    <a
                        href={`/medias/${featured.id}`}
                        className="mt-8 inline-flex items-center gap-2 text-sm text-primary font-medium hover:text-accent transition-smooth"
                    >
                      Lire l'article <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
            ) : (
                <div className="text-center py-12 text-muted-foreground">Aucune actualité disponible.</div>
            )}
          </div>
        </section>

        {/* LISTE DES ARTICLES */}
        <section className="bg-background py-24 border-t border-border">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-display text-primary text-3xl lg:text-4xl font-light tracking-tight">
                Toutes les <span className="text-accent">publications</span>
              </h2>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
              {articles.length} article{articles.length > 1 ? "s" : ""}
            </span>
            </div>

            {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((n) => (
                      <div key={n} className="h-60 bg-secondary/50 border border-border rounded-md animate-pulse" />
                  ))}
                </div>
            ) : articles.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Aucun autre article disponible pour le moment.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
                  {articles.map((a) => (
                      <article
                          key={a.id}
                          className="group bg-background p-8 hover:bg-secondary/40 transition-smooth flex flex-col"
                      >
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-medium">
                          <span className="text-accent">{a.categorie}</span>
                          <span className="text-muted-foreground inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {calculateReadTime(a.resume)}
                    </span>
                        </div>
                        <h3 className="font-display text-xl font-medium text-primary mt-6 leading-tight">
                          {a.titre}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mt-4">{a.resume}</p>
                        <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {formatDate(a.createdAt)}
                    </span>
                          <a
                              href={`/medias/${a.id}`}
                              className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:text-accent transition-smooth"
                          >
                            Lire <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </article>
                  ))}
                </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
  );
};

export default Medias;
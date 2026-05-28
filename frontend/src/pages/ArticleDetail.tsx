import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ie237/Navbar";
import { Footer } from "@/components/ie237/Footer";

interface Actualite {
    titre: string;
    contenu: string;
    categorie: string;
    createdAt: string;
    auteur: string;
    imageCover?: string | null; // 💡 Ajout du champ pour l'image de couverture
}

const ArticleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Actualite | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/actualites/${id}`);
                if (!response.ok) throw new Error("Article introuvable");

                const json = await response.json();
                setArticle(json.data);
            } catch (error) {
                console.error(error);
                navigate("/404");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="text-center py-40 text-muted-foreground animate-pulse">
                Chargement de l'analyse...
            </div>
        );
    }

    if (!article) return null;

    return (
        <main className="bg-background text-foreground">
            <Navbar />
            <article className="container pt-40 pb-20 max-w-4xl">

                {/* 💡 Rendu de l'image de couverture dynamique via le proxy unifié */}
                {article.imageCover && (
                    <div className="w-full h-[250px] md:h-[400px] overflow-hidden rounded-md mb-10 border border-border bg-secondary">
                        <img
                            src={`/api/${article.imageCover.replace(/\\/g, '/')}`}
                            alt={article.titre}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                <span className="text-accent text-xs uppercase tracking-widest">
          {article.categorie}
        </span>

                <h1 className="font-display text-4xl lg:text-5xl font-light mt-4 mb-6 text-primary leading-tight">
                    {article.titre}
                </h1>

                <div className="text-muted-foreground text-sm mb-10 pb-4 border-b border-border/60">
                    Par {article.auteur} · Publié le {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>

                <div className="prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base lg:text-lg">
                    {article.contenu}
                </div>
            </article>
            <Footer />
        </main>
    );
};

export default ArticleDetail;
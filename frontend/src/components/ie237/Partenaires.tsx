const partenaires = [
  "Présidence", "Assemblée Nationale", "Primature", "Conseil Économique et Social",
  "MINEPAT", "MINREX", "MINDEF", "MINFI", "MINMIDT", "MINPOSTEL", "MINFOPRA",
  "MINADER", "MINAC", "MINTOUL", "Gendarmerie Nationale", "DGSN", "CONAC",
  "ANIF", "ANTIC", "Conseils régionaux", "Municipalités", "PME camerounaises",
  "Université de Yaoundé I", "Université de Yaoundé II", "Université de Dschang",
  "IRIC", "ENAM", "Centres de Recherche",
];

export const Partenaires = () => {
  return (
    <section id="partenaires" className="bg-background py-24 lg:py-36 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Écosystème
          </div>
          <h2 className="font-display text-primary text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-light tracking-tight">
            Une approche partenariale
          </h2>
          <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Avec les forces vives de la nation : pouvoirs publics, collectivités,
            académie et secteur privé.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-16">
          {[
            ["Pouvoirs publics", "Présidence, ministères, gendarmerie, agences"],
            ["Collectivités", "Conseils régionaux, municipalités"],
            ["Académique", "Universités, IRIC, ENAM, centres de recherche"],
            ["Économique", "PME, entreprises, organisations internationales"],
          ].map(([t, d]) => (
            <div key={t} className="bg-background p-8">
              <div className="text-accent text-[11px] uppercase tracking-[0.25em] font-medium">{t}</div>
              <div className="text-muted-foreground mt-3 text-sm leading-relaxed">{d}</div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden border-y border-border py-6">
          <div className="flex animate-marquee w-max gap-10 items-center">
            {[...partenaires, ...partenaires].map((p, i) => (
              <div key={i} className="flex items-center gap-10">
                <span className="text-primary/70 text-sm whitespace-nowrap">{p}</span>
                <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

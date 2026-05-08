const partenaires = [
  "Présidence de la république", "Assemblée Nationale", "Primature", "Conseil Économique et Social",
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
            {
              title: "Pouvoirs publics",
              description: "Présidence de la république, ministères, gendarmerie, agences nationales",
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-accent stroke-[1.5]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              ),
            },
            {
              title: "Collectivités",
              description: "Conseils régionaux, municipalités",
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-accent stroke-[1.5]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              ),
            },
            {
              title: "Académique",
              description: "Universités, IRIC, ENAM, centres de recherche",
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-accent stroke-[1.5]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              ),
            },
            {
              title: "Économique",
              description: "PME, entreprises, organisations internationales",
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-accent stroke-[1.5]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              ),
            },
          ].map(({ title, description, icon }) => (
            <div key={title} className="bg-secondary p-8">
              <div className="mb-4">{icon}</div>
              <div className="text-accent text-[11px] uppercase tracking-[0.25em] font-medium">{title}</div>
              <div className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</div>
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

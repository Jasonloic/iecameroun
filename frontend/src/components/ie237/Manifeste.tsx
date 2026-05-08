export const Manifeste = () => {
  return (
    <section id="manifeste" className="bg-background py-24 lg:py-36 border-t border-border">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-6">
            Qui sommes nous ?
          </div>
          <h2 className="font-display text-primary text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-light text-balance tracking-tight">
            Un Think Do tank républicain au service
            <br />
            d'une <span className="text-accent">souveraineté durable</span>.
          </h2>

          <div className="mt-12 space-y-6 text-muted-foreground leading-relaxed text-base lg:text-lg max-w-3xl mx-auto text-left">
            <p>
              Dans un monde saturé de récits concurrents et de tactiques d'influence,
              IE237 a été créé pour répondre aux défis de la guerre économique,
              informationnelle et cognitive auxquels le continent africain en général,
              et le Cameroun en particulier, sont confrontés.
            </p>
            <p>
              Nous réunissons des experts en <span className="text-primary font-medium">Intelligence Économique</span>,
              Macroéconomie, Analyse stratégique, Sécurité &amp; Défense, Communication,
              Sciences politiques et juridiques, Relations Internationales et Ingénierie informatique.
            </p>
            <p>
              Nous travaillons avec des institutions qui comprennent que la souveraineté
              véritable ne se décrète pas du jour au lendemain — elle se pense, se
              construit et se défend dans la durée.
            </p>
          </div>
        </div>

        <div className="mt-20 grid sm:grid-cols-3 gap-px bg-border max-w-4xl mx-auto border border-border">
          {[
            ["+15", "Notes d'analyse"],
            ["+9", "Notes de veille économique"],
            ["3", "Articles scientifiques"],
          ].map(([n, l]) => (
            <div key={l} className="bg-background p-10 text-center">
              <div className="font-display text-primary text-5xl font-light">{n}</div>
              <div className="text-muted-foreground text-sm mt-3">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

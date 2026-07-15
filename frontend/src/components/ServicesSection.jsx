import PropTypes from "prop-types";

const piliers = [
  {
    number: "01",
    title: "Veille stratégique",
    description:
        "Anticiper les évolutions de marché et surveiller votre environnement informationnel.",
  },
  {
    number: "02",
    title: "Sécurité de l'activité",
    description:
        "Protéger vos actifs, vos données et vos ressources humaines stratégiques.",
  },
  {
    number: "03",
    title: "Influence & lobbying",
    description:
        "Orienter les décisions et les perceptions dans votre environnement réglementaire.",
  },
];

const services = [
  {
    number: "01",
    title: "Veille & analyses concurrentielles",
    tagline: "Anticiper les évolutions de votre marché avant vos concurrents.",
    badge: "Service phare",
    presentation:
        "Dans un environnement économique en mutation permanente, la veille stratégique constitue le socle de toute démarche d'intelligence économique. Notre service de veille vous permet de surveiller en continu votre environnement concurrentiel, technologique et réglementaire, afin de prendre des décisions éclairées et proactives.",
    items: [
      "Surveillance de l'environnement concurrentiel, technologique et réglementaire",
      "Identification des opportunités émergentes et évaluation des menaces",
      "Cartographie des parties prenantes et des acteurs clés du marché",
      "Analyse approfondie des stratégies, produits et services concurrents",
      "Benchmarking des pratiques du marché et positionnement comparatif",
      "Livrables : notes de veille périodiques, tableaux de bord, rapports d'analyse",
    ],
    valeur:
        "Vous disposez d'une vision à 360° de votre secteur et anticipez les évolutions avant qu'elles ne vous impactent.",
  },
  {
    number: "02",
    title: "Due diligence & enquêtes d'intégrité",
    tagline: "Vérifier l'intégrité de vos partenaires avant tout engagement.",
    badge: "Conformité",
    presentation:
        "Toute relation commerciale engage votre responsabilité. Avant de contracter avec un fournisseur, un sous-traitant, un distributeur ou un partenaire stratégique, notre service de due diligence vous apporte les garanties nécessaires pour éviter les risques juridiques, financiers et réputationnels.",
    items: [
      "Audit de la situation juridique, financière et morale de vos intermédiaires",
      "Vérification de la cohérence des parcours et antécédents déclarés",
      "Détection des signaux d'alerte : liens douteux, conflits d'intérêts, sanctions",
      "Évaluation de la conformité aux réglementations anti-corruption",
      "Analyse des risques avant implantation dans un nouveau pays ou secteur",
      "Rapport confidentiel remis dans un cadre juridiquement sécurisé",
    ],
    valeur:
        "Vous contractez en connaissance de cause et protégez votre organisation contre des partenaires à risque.",
  },
  {
    number: "03",
    title: "OSINT & renseignement en sources ouvertes",
    tagline: "Exploiter légalement la mine d'or des données publiques.",
    badge: "Méthode différenciante",
    presentation:
        "L'OSINT (Open Source Intelligence) désigne la collecte et l'analyse d'informations issues de sources légalement accessibles : bases de données publiques, réseaux sociaux, registres officiels, presse spécialisée, forums sectoriels. Pratiqué de façon professionnelle, il constitue un avantage concurrentiel redoutable.",
    items: [
      "Collecte structurée d'informations en sources ouvertes (OSINT)",
      "Veille sur les réseaux sociaux et les médias numériques",
      "Cartographie des réseaux d'influence et des écosystèmes d'acteurs",
      "Recherche sur les individus, entités et marques (réputation, mentions, alertes)",
      "Analyse de la désinformation et des narratifs adverses",
      "Formation de vos équipes aux méthodes et outils OSINT opérationnels",
    ],
    valeur:
        "Vous exploitez des sources légales souvent sous-utilisées pour générer une intelligence à haute valeur ajoutée.",
  },
  {
    number: "04",
    title: "Formation & accompagnement à la décision",
    tagline: "Ancrer la culture de l'intelligence économique dans vos équipes.",
    badge: "Renforcement des capacités",
    presentation:
        "L'intelligence économique n'est pas seulement une prestation externalisée, mais aussi une compétence interne à développer. Nos programmes de formation sont conçus pour vos décideurs, managers et équipes opérationnelles, en présentiel ou à distance.",
    items: [
      "Sensibilisation aux fondamentaux de l'intelligence économique",
      "Formation aux outils de veille et d'analyse documentaire",
      "Ateliers pratiques sur l'OSINT et la collecte d'informations",
      "Coaching stratégique pour la prise de décision en environnement incertain",
      "Sensibilisation aux risques-pays et à la sécurité informationnelle",
      "Programme sur mesure selon vos secteurs d'activité et vos enjeux spécifiques",
    ],
    valeur:
        "Vos équipes deviennent autonomes dans la détection et l'analyse des signaux stratégiques qui concernent votre activité.",
  },
];

const ServicesSection = ({ className = "" }) => {
  return (
      <section
          className={`relative w-full bg-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero py-16 md:py-20 px-6 sm:px-10 lg:px-[129px] text-left text-xl text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black font-[Manrope] ${className}`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col gap-16"
             id="offres-services">
          <div className="max-w-[720px] flex flex-col gap-3">
            <b className="uppercase text-sm text-[#a98047] tracking-wide">
              Nos offres de services
            </b>
            <h1 className="m-0 text-[28px] sm:text-[32px] lg:text-[40px] tracking-[-0.03em] leading-tight font-extrabold">
              L'information stratégique, votre avantage concurrentiel
            </h1>
            <p className="m-0 text-base text-[#8b8a8f]">
              Trois piliers au service de votre compétitivité
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {piliers.map((p) => (
                <div
                    key={p.number}
                    className="rounded-[15px] border border-[#e5e4e2] p-6 flex flex-col gap-3"
                >
              <span className="text-sm font-bold text-[#4c4034]">
                {p.number} —
              </span>
                  <h3 className="m-0 text-lg font-bold text-[#a98047]">{p.title}</h3>
                  <p className="m-0 text-sm text-[#4c4034]">{p.description}</p>
                </div>
            ))}
          </div>
          <div className="flex flex-col gap-10">
            {services.map((s) => (
                <div
                    key={s.number}
                    className="rounded-[15px] bg-white sm:bg-transparent border border-[#e5e4e2] p-6 sm:p-10 flex flex-col gap-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                    <div className="flex items-start gap-4">
                  <span className="text-sm font-bold text-[#a98047] shrink-0">
                    {s.number}
                  </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="m-0 text-xl sm:text-2xl font-bold tracking-[-0.02em]">
                          {s.title}
                        </h3>
                        <p className="m-0 text-sm text-[#4c4034]">{s.tagline}</p>
                      </div>
                    </div>
                    <span className="shrink-0 self-start sm:self-center rounded-full bg-[#a98047] text-white text-xs font-medium px-4 py-1.5">
                  {s.badge}
                </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="m-0 text-sm font-bold uppercase tracking-wide">
                      Présentation
                    </h4>
                    <p className="m-0 text-base text-[#4c4034] leading-relaxed">
                      {s.presentation}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="m-0 text-sm font-bold uppercase tracking-wide">
                      Ce que nous faisons pour vous
                    </h4>
                    <ul className="m-0 pl-5 flex flex-col gap-2 list-disc marker:text-[#a98047]">
                      {s.items.map((item) => (
                          <li key={item} className="text-base text-[#8b8a8f]">
                            {item}
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 rounded-[10px] bg-[#4c4034]/5 p-4">
                    <h4 className="m-0 text-sm font-bold uppercase tracking-wide text-[#4c4034]">
                      Valeur ajoutée
                    </h4>
                    <p className="m-0 text-base text-[#4c4034]">{s.valeur}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

ServicesSection.propTypes = {
  className: PropTypes.string,
};

export default ServicesSection;
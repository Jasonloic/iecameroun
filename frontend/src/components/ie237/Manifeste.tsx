import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  prefix?: string;
}

function CountUp({ target, prefix = "" }: CountUpProps) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / (6000 / 10));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display text-primary text-5xl font-light">
      {prefix}{count}
    </div>
  );
}

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
              Dans un monde saturé de récits concurrents et de tactiques d'influence, IE237 a été créé pour répondre aux défis de la guerre économique, informationnelle et cognitive auxquels 
              le continent africain en général, et le Cameroun en particulier, sont confrontés.
            </p>
            <p>
              Nous réunissons des experts en <span className="text-primary font-medium">Intelligence Économique</span>,
              Macroéconomie, Analyse stratégique, Sécurité &amp; Défense, Communication, Sciences politiques et juridiques, 
              Relations Internationales et Ingénierie informatique.
            </p>
            <p>
              Nous travaillons avec des institutions qui comprennent que la souveraineté
              véritable ne se décrète pas du jour au lendemain — elle se pense, se construit et se défend dans 
              la durée.
            </p>
          </div>
        </div>

        
       <div className="mt-20 grid sm:grid-cols-3 gap-px bg-border max-w-4xl mx-auto border border-border">
        {[
          { n: 15, prefix: "+", label: "Notes d'analyse" },
          { n: 9, prefix: "+", label: "Notes de veille économique" },
          { n: 18000, prefix: "+", label: "Personnes impactées" },
        ].map(({ n, prefix, label }) => (
          <div key={label} className="bg-background p-10 text-center">
            <CountUp target={n} prefix={prefix} />
            <div className="text-muted-foreground text-sm mt-3">{label}</div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

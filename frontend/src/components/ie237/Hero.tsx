import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-lifestyle.jpg";
import emotionVision from "@/assets/emotion-vision.jpg";
import emotionAction from "@/assets/1.webp";
import DotField from "../ui/DotField";

const slides = [
  {
    eyebrow: "Think · Do · Tank",
    title: (
      <>
        L'Intelligence qui éclaire.
        <br />
        <span className="text-accent">La Souveraineté</span> qui se construit.
      </>
    ),
    description:
      "IE237 est le Think Do Tank républicain qui arme le Cameroun et l'Afrique face à la guerre économique, informationnelle et cognitive.",
    cta: { label: "Contactez-Nous", href: "#contact" },
    secondary: { label: "Découvrir le manifeste →", href: "#manifeste" },
    image: heroImg,
    alt: "Experts IE237 en cellule de veille stratégique à Yaoundé",
  },
  {
    eyebrow: "Vision · Stratégie",
    title: (
      <>
        Anticiper les menaces.
        <br />
        <span className="text-accent">Penser</span> le Cameroun de demain.
      </>
    ),
    description:
      "Notes prospectives, tableaux de bord et études stratégiques pour décider plus vite et plus juste, dans un monde qui se recompose.",
    cta: { label: "Nos livrables", href: "#livrables" },
    secondary: { label: "Nos missions →", href: "#missions" },
    image: emotionVision,
    alt: "Vision stratégique IE237 sur l'Afrique de demain",
  },
  {
    eyebrow: "Action · Impact",
    title: (
      <>
        De l'analyse
        <br />
        à <span className="text-accent">l'action</span> républicaine.
      </>
    ),
    description:
      "Aux côtés des institutions, des PME et de l'université : nous transformons l'intelligence en décisions, et les décisions en souveraineté.",
    cta: { label: "Nos partenaires", href: "#partenaires" },
    secondary: { label: "Découvrir le manifeste →", href: "#manifeste" },
    image: emotionAction,
    alt: "Mobilisation républicaine pour la souveraineté camerounaise",
  },
];

const actualites = [
  {
    label: "Journée Africaine de l'Intelligence Économique #JAIE2026 - 29 mai 2026 à l'École Nationale d'Administration et de Magistrature #ENAM",
    href: "https://acci-cavie.org/jaie/inscription/",
  },
  {
    label: "Participez à la Journée Africaine de l'Intelligence Économique #JAIE2026",
    href: "https://acci-cavie.org/jaie/inscription/",
  },
  {
    label: "Découvrez le panel de IE237 (Panel 4) à la #JAIE2026",
    href: "https://acci-cavie.org/jaie/intervenants/",
  },
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <section id="top" className="relative bg-background pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={6}
          glowRadius={70}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={400}
          cursorForce={0.37}
          bulgeOnly
          gradientFrom="#A97F45"
          gradientTo="#C4B76C"
          glowColor="#EDE8BD"
        />
      </div>
      <div className="container grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div key={`text-${index}`} className="animate-fade-up">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-accent text-[11px] uppercase tracking-[0.3em] font-medium">
              {slide.eyebrow}
            </span>
          </div>
          <h1 className="font-display text-primary text-balance text-5xl lg:text-6xl xl:text-7xl leading-[1.05] font-light tracking-tight">
            {slide.title}
          </h1>
          <p className="mt-8 max-w-xl text-muted-foreground text-base lg:text-lg leading-relaxed">
            {slide.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={slide.cta.href}
              className="inline-flex items-center bg-primary text-primary-foreground rounded-md px-7 py-3.5 text-sm font-medium hover:bg-accent transition-smooth"
            >
              {slide.cta.label}
            </a>
            <a
              href={slide.secondary.href}
              className="text-primary text-sm font-medium hover:text-accent transition-smooth"
            >
              {slide.secondary.label}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border">
            {slides.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt={s.alt}
                width={1080}
                height={1350}
                fetchPriority={i === 0 ? "high" : "low"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Aller au slide ${i + 1}`}
                  className={`h-px transition-smooth ${
                    i === index ? "w-12 bg-accent" : "w-6 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Slide précédent"
                className="h-10 w-10 rounded-md border border-border flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-smooth"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Slide suivant"
                className="h-10 w-10 rounded-md border border-border flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-smooth"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Actualités flash */}
      <div className="absolute bottom-0 inset-x-0 z-10 bg-secondary/95 backdrop-blur-sm border-t border-border overflow-hidden">
        <div className="container flex items-center h-10 gap-4">
          <span className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-accent text-primary font-medium border-r border-border pr-4">
            Cliquez pour vous Inscrire !
          </span>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-16 text-[14px] animate-marquee whitespace-nowrap" style={{ animation: "marquee 8s linear infinite" }}>
              {[...actualites, ...actualites].map((a, i) => (
                <a
                  key={i}
                  href={a.href}
                  target={a.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-[11px] text-primary hover:text-accent transition-colors shrink-0"
                >
                  · {a.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

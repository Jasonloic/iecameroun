import ServicesSection from "../components/ServicesSection";
import Footer from "../components/Footer";
import ServicesFunFacts from "../components/ServicesFunFacts";
import Header from "../components/Header";
import Livrables from "../components/LivrablesCard";

const PageContainer = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero leading-[normal] tracking-[normal]">
      <div className="w-full max-w-[1440px] mx-auto">
        <Header />
        <img
            className="relative my-5 top-0 w-full max-w-[350px] z-0 h-auto object-contain mx-auto block px-6"
            alt=""
            src="/Group-1321314344.svg"
        />
        <div className="w-full bg-white h-2"></div>
        <main className="w-full text-left text-2xl text-[#4c4034] font-[Poppins]">
          <ServicesFunFacts />
          <section className="w-full flex flex-col items-center gap-12 sm:gap-16 py-16 sm:py-20 px-6 sm:px-10 lg:px-[142px] text-center text-2xl sm:text-[32px] lg:text-[30px] text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black font-[Manrope]">
            <h2 className="m-0 self-stretch tracking-[-0.03em] leading-tight font-extrabold">
              Notre Vision
            </h2>
            <div className="self-stretch lg:text-[16px] sm:text-2xl leading-[1.6] font-[Poppins] text-justify flex flex-col gap-6 max-w-[1200px]">
              <p className="m-0">
                Dans un monde saturé de récits concurrents et de tactiques
                d'influence, IE237 a été créé pour répondre aux défis de la
                guerre économique, informationnelle et cognitive auxquels le
                continent africain en général, et le Cameroun en particulier,
                sont confrontés.
              </p>
              <p className="m-0">
                Nous réunissons des experts en Intelligence Économique,
                Macroéconomie, Analyse stratégique, Sécurité &amp; Défense,
                Communication, Sciences politiques et juridiques, Relations
                Internationales et Ingénierie informatique.
              </p>
              <p className="m-0">
                Nous travaillons avec des institutions qui comprennent que la
                souveraineté véritable ne se décrète pas du jour au
                lendemain ... elle se pense, se construit et se défend dans
                la durée.
              </p>
            </div>
          </section>
          <ServicesSection />
          <h3 className="m-8 sm:text-[20px] lg:text-[26px] lg:mx-100 relative lg:w-full tracking-[-0.02em] leading-[1.1] font-bold text-natural-black">
            Nos dernières productions ouvertes au public
          </h3>
          <Livrables />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default PageContainer;

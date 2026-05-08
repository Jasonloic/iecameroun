import { Navbar } from "@/components/ie237/Navbar";
import { Hero } from "@/components/ie237/Hero";
import { Manifeste } from "@/components/ie237/Manifeste";
import { Missions } from "@/components/ie237/Missions";
import { Avantages } from "@/components/ie237/Avantages";
import { Partenaires } from "@/components/ie237/Partenaires";
import { Livrables } from "@/components/ie237/Livrables";
import { Footer } from "@/components/ie237/Footer";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Manifeste />
      <Missions />
      <Avantages />
      <Partenaires />
      <Livrables />
      <Footer />
    </main>
  );
};

export default Index;

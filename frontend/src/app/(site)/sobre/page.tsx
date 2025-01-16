import About from "@/components/ui/About";
import Breadcrumb from "@/components/ui/Common/Breadcrumb";
import Team from "@/components/ui/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda+ | Sobre nós - Quem somos?",
  description: "Descubra quem somos e o que fazemos no Agenda+.",
};

const AboutPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Página sobre nós" />
      <About />
      <Team />
    </main>
  );
};

export default AboutPage;

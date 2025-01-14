import About from "@/components/ui/About";
import CallToAction from "@/components/ui/CallToAction";
import ScrollUp from "@/components/ui/Common/ScrollUp";
import Contact from "@/components/ui/Contact";
import Faq from "@/components/ui/Faq";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import Team from "@/components/ui/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgendaZap - Gerencie seus compromissos de forma simples e eficiente.",
  description:
    "Acabe com a dor de cabeça ao gerenciar seus compromissos. AgendaZap é a solução perfeita para você organizar sua rotina de forma simples, moderna e eficiente.",
};

export default function Home() {
  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <About />
      <CallToAction />
      <Pricing />
      <Faq />
      <Team />
      <Contact />
    </main>
  );
}

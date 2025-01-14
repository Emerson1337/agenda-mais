import Breadcrumb from "@/components/ui/Common/Breadcrumb";
import Faq from "@/components/ui/Faq";
import Pricing from "@/components/ui/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgendaZap | Consulte os nossos planos",
  description:
    "Consulte os nossos planos e escolha o que melhor se encaixa para você.",
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Página de planos" />
      <Pricing />
      <Faq />
    </>
  );
};

export default PricingPage;

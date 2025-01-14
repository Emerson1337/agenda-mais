import Breadcrumb from "@/components/ui/Common/Breadcrumb";
import Contact from "@/components/ui/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgendaZap | Contatos",
  description: "Confira as formas de contato com o AgendaZap.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb pageName="Página para contato" />
      <Contact />
    </>
  );
};

export default ContactPage;

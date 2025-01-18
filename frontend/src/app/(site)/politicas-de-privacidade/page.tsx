import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda+ | Politicas de privacidade",
  description: "Confira as politicas de privacidade do Agenda+.",
};

const PrivacyPolicy = () => {
  return (
    <main className="py-48 max-w-screen-md container mx-auto px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Política de Privacidade do Agenda+
        </h1>
      </header>

      <section className="space-y-8">
        <p className="text-justify">
          Proteger a sua privacidade é uma prioridade para nós. Este documento
          detalha como o Agenda+ coleta, utiliza e protege suas informações
          pessoais durante o uso do nosso site e de outros serviços que
          gerenciamos.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          1. Coleta de Dados
        </h2>
        <p className="text-justify">
          Reunimos informações pessoais somente quando necessário para oferecer
          nossos serviços. Esse processo ocorre de forma transparente e com o
          seu consentimento, sempre informando a finalidade da coleta e como os
          dados serão utilizados.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          2. Armazenamento e Uso de Informações
        </h2>
        <p className="text-justify">
          Mantemos os dados coletados apenas pelo período necessário para
          atender às finalidades pretendidas. Adotamos medidas de segurança
          apropriadas para proteger suas informações contra acessos não
          autorizados, divulgação ou alterações indevidas.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          3. Compartilhamento de Dados
        </h2>
        <p className="text-justify">
          As informações fornecidas por você não serão compartilhadas com
          terceiros, exceto quando isso for exigido por lei ou necessário para o
          cumprimento de obrigações legais.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          4. Links para Outros Sites
        </h2>
        <p className="text-justify">
          Nosso site pode conter links para páginas externas que não são
          controladas pelo Agenda+. Recomendamos que você leia as políticas de
          privacidade desses sites, pois não nos responsabilizamos por suas
          práticas ou conteúdos.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          5. Consentimento e Escolhas do Usuário
        </h2>
        <p className="text-justify">
          Você tem o direito de recusar o fornecimento de informações pessoais,
          mas é importante observar que isso pode limitar a disponibilidade de
          certos serviços que oferecemos.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          6. Uso Contínuo
        </h2>
        <p className="text-justify">
          Ao continuar a usar nossa plataforma, você confirma que aceita os
          termos desta Política de Privacidade. Se houver dúvidas ou
          preocupações, estamos à disposição para esclarecimentos.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          7. Cookies e Rastreamento
        </h2>
        <p className="text-justify">
          Utilizamos cookies para melhorar sua experiência em nosso site. Esses
          arquivos ajudam a personalizar os serviços e analisar a navegação.
          Para mais detalhes, consulte nossos Termos de Uso e nossa política
          sobre cookies.
        </p>
        <p className="text-sm mt-4 text-gray-600">
          <strong>Última atualização:</strong> 17 de janeiro de 2025
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        &copy; 2024 Agenda+. Todos os direitos reservados.
      </footer>
    </main>
  );
};

export default PrivacyPolicy;

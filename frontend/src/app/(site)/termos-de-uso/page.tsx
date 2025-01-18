import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda+ | Termos de uso",
  description: "Confira os termos de uso do Agenda+.",
};

const UsageTerms = () => {
  return (
    <main className="py-48 max-w-screen-md container mx-auto px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Termos de uso do Agenda+
        </h1>
      </header>

      <main className="space-y-8">
        <section>
          <p className="text-justify">
            Seja bem-vindo ao Agenda+! Este documento estabelece as condições
            para a utilização de nossa plataforma. Ao utilizar nossos serviços,
            você automaticamente concorda com os termos a seguir. Caso não
            concorde, sugerimos que não prossiga com o uso da plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            1. Aceitação dos Termos
          </h2>
          <p className="text-justify">
            Ao acessar a plataforma, criar uma conta ou utilizar os serviços
            oferecidos pelo Agenda+, você declara estar de acordo com estes
            Termos de Uso, bem como com nossa{" "}
            <a
              href="/politicas-de-privacidade"
              className="text-blue-600 hover:underline"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            2. Sobre a Plataforma
          </h2>
          <p className="text-justify">
            O Agenda+ é uma solução digital voltada para simplificar o
            agendamento de serviços, atendendo tanto empresas quanto
            profissionais autônomos. Oferecemos funcionalidades como
            gerenciamento de calendários e comunicação com clientes através de
            ferramentas integradas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            3. Elegibilidade
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Ter pelo menos 18 anos ou possuir autorização expressa de um
              responsável legal;
            </li>
            <li>
              Fornecer informações precisas e atualizadas durante o cadastro;
            </li>
            <li>
              Não utilizar os serviços para atividades ilícitas ou não
              autorizadas.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            4. Cadastro e Responsabilidades
          </h2>
          <div className="space-y-4">
            <p>
              <strong>4.1. Cadastro:</strong> Para acessar o Agenda+, é
              necessário criar uma conta, informando dados como nome, e-mail e
              número de telefone.
            </p>
            <p>
              <strong>4.2. Segurança:</strong> O usuário é responsável por
              manter sigilo sobre as credenciais de acesso à sua conta e por
              qualquer atividade realizada em sua conta.
            </p>
            <p>
              <strong>4.3. Notificação:</strong> Em caso de uso indevido ou
              suspeita de comprometimento, o usuário deve entrar em contato
              conosco imediatamente.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            5. Licença de Uso
          </h2>
          <p>
            Concedemos uma licença de uso limitada, pessoal, intransferível e
            revogável para acessar a plataforma Agenda+ exclusivamente para fins
            comerciais legítimos.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              Não é permitido alterar, distribuir, comercializar ou alugar os
              serviços;
            </li>
            <li>
              É proibido tentar acessar o código-fonte ou realizar engenharia
              reversa.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            6. Direitos e Deveres do Agenda+
          </h2>
          <p>
            <strong>6.1. Disponibilidade:</strong> Empenhamo-nos em oferecer um
            serviço estável e acessível, mas não podemos garantir
            disponibilidade ininterrupta ou isenção de erros.
          </p>
          <p>
            <strong>6.2. Atualizações:</strong> Reservamo-nos o direito de
            realizar atualizações na plataforma a qualquer momento, com ou sem
            aviso prévio.
          </p>
          <p>
            <strong>6.3. Suspensão:</strong> Contas que infringirem estes Termos
            de Uso poderão ser suspensas ou desativadas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            7. Uso Permitido
          </h2>
          <p>Ao utilizar o Agenda+, o usuário compromete-se a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Utilizar a plataforma de forma ética e em conformidade com a
              legislação vigente;
            </li>
            <li>
              Não realizar ações que possam comprometer a segurança ou
              funcionamento do sistema.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            8. Política de Privacidade
          </h2>
          <p>
            Os dados coletados pelo Agenda+ são tratados conforme detalhado em
            nossa{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Privacidade
            </a>
            , que pode ser acessada em nosso site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            9. Limitação de Responsabilidade
          </h2>
          <p>
            O Agenda+ não se responsabiliza por danos indiretos ou eventuais
            prejuízos que possam surgir do uso da plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            10. Alterações nos Termos
          </h2>
          <p>
            Estes Termos podem ser modificados periodicamente. Recomendamos
            revisá-los com frequência para acompanhar eventuais alterações.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            11. Legislação Aplicável
          </h2>
          <p>
            Este documento é regido pelas leis brasileiras, e qualquer
            controvérsia será resolvida no foro da sede do Agenda+.
          </p>
        </section>

        <section>
          <p className="mt-8 text-lg font-bold">Dúvidas ou Suporte?</p>
          <p>
            Em caso de dúvidas, entre em contato conosco pelo e-mail:{" "}
            <a
              href="mailto:app.agendamais@gmail.com"
              className="text-blue-600 hover:underline"
            >
              app.agendamais@gmail.com
            </a>
            .
          </p>
          <p className="text-sm mt-4 text-gray-600">
            <strong>Última atualização:</strong> 17 de janeiro de 2025
          </p>
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        &copy; 2024 Agenda+. Todos os direitos reservados.
      </footer>
    </main>
  );
};

export default UsageTerms;

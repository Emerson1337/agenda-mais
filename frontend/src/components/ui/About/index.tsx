import Image from "next/image";
import { WhatsappService } from "@/shared/services/whatsapp.service";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-16 lg:pt-32"
    >
      <div className="container">
        <div className="flex flex-wrap items-center">
          <div className="w-full  lg:w-1/2">
            <div className="mb-12 max-w-[540px] lg:mb-0">
              <h2 className="mb-5 text-3xl font-bold leading-tight text-primary sm:text-4xl">
                O Agenda+ traz consigo um suporte 24h.
              </h2>
              <p className="mb-10 text-base leading-relaxed text-body-color">
                Disponha de um time compromissado a trazer novas funcionalidades
                e resolver eventuais problemas que possam acontecer durante o
                uso do aplicativo. Nossa equipe é formada por especialistas que
                buscam sempre a melhor experiência para o usuário e providenciam
                as melhores tecnologias do mercado.
                <br />
                <br />
                Nos ajude a construir um ótimo app, nos envie sugestões e
                críticas.
              </p>
              <a
                href={WhatsappService.contactForDeal()}
                className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-base font-medium text-secondary transition hover:bg-primary/90"
              >
                Saber mais
              </a>
            </div>
          </div>
          <div className="w-full  lg:w-1/2">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full px-2 sm:w-1/2">
                <div className="relative mb-4 sm:mb-8 h-96 lg:h-[400px]">
                  <Image
                    src="/images/about/about-image-01.jpg"
                    alt="about image"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="w-full px-2 sm:w-1/2">
                <div className="relative mb-4 sm:mb-8 h-56 lg:h-[225px]">
                  <Image
                    src="/images/about/about-image-02.jpg"
                    alt="about image"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative flex items-center justify-center overflow-hidden bg-primary px-6 py-12 sm:h-40">
                  <div className="text-center">
                    <span className="block text-5xl font-extrabold text-secondary">
                      10
                    </span>
                    <span className="block text-base font-semibold text-secondary">
                      Temos
                    </span>
                    <span className="block text-sm font-medium text-secondary opacity-70">
                      Motivos para te convencer
                    </span>
                  </div>
                  <span className="absolute left-0 top-0 -z-10">
                    <svg
                      width="106"
                      height="144"
                      viewBox="0 0 106 144"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.1"
                        x="-67"
                        y="47.127"
                        width="113.378"
                        height="131.304"
                        transform="rotate(-42.8643 -67 47.127)"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="-10.3111"
                          y1="47.127"
                          x2="-10.3111"
                          y2="178.431"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="absolute right-0 top-0 -z-10">
                    <svg
                      width="130"
                      height="97"
                      viewBox="0 0 130 97"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.1"
                        x="0.86792"
                        y="-6.67725"
                        width="155.563"
                        height="140.614"
                        transform="rotate(-42.8643 0.86792 -6.67725)"
                        fill="url(#paint1_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint1_linear"
                          x1="78.6495"
                          y1="-6.67725"
                          x2="78.6495"
                          y2="133.937"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

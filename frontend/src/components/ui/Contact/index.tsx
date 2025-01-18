import Link from "next/link";
import { WhatsappIcon } from "@/components/ui/Hero/WhatsappIcon";
import { WhatsappService } from "@/shared/services/whatsapp.service";

const Contact = () => {
  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="absolute inset-0 -z-10 h-full dark:bg-dark-700"></div>
      <div className="absolute inset-0 -z-10 h-1/2  lg:h-[45%] xl:h-1/2"></div>
      <div className="container px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div>
              <div className="mb-12 lg:mb-[150px]">
                <span className="block mb-6 text-base font-medium text-primary">
                  CONTATE-NOS
                </span>
                <h2 className="text-[35px] font-semibold leading-snug text-primary">
                  Vamos conversar e quem sabe criar novas funcionalidades para o aplicativo baseado em suas necessidades 🙂.
                </h2>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="flex w-[330px] mb-8">
                  <div className="mr-6 text-[32px] text-primary">
                    <svg
                      width="34"
                      height="25"
                      viewBox="0 0 34 25"
                      className="fill-current"
                    >
                      <path d="M30.5156 0.960938H3.17188C1.42188 0.960938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.960938 30.5156 0.960938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-primary">
                      Como Podemos Ajudar?
                    </h3>
                    <p className="text-base text-body-color">
                      app.agendamais@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="rounded-lg bg-white px-8 py-10 shadow-md dark:bg-dark-2">
              <h3 className="mb-8 text-2xl font-semibold text-primary">
                Nos envie uma mensagem
              </h3>
              <Link
                href={WhatsappService.contactForDeal()}
                target="_blank"
                className="flex items-center gap-4 rounded-md bg-primary px-6 py-3 text-base font-medium text-secondary transition hover:bg-secondary-foreground hover:text-secondary"
              >
                <WhatsappIcon />
                Tirar Dúvidas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

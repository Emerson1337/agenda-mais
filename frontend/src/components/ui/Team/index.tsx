import { TeamType } from "@/shared/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Emerson Lucena",
    designation: "Founder & Desenvolvedor",
    image: "https://github.com/emerson1337.png",
    instagramLink: "https://instagram.com/erms1337",
    linkedinLink: "https://www.linkedin.com/in/emerson67/",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Nosso time"
            title="Conheça o nosso time"
            paragraph="O aplicativo foi idealizado e construído integralmente por um único programador, com o objetivo de facilitar a vida de quem deseja ter um controle maior sobre suas finanças."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

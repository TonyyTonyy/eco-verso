import { Timeline } from "@/components/timeline";
import { TeamCard } from "@/components/team-card";
import { timelineEvents, teamMembers } from "@/data/sobre";

// Conteúdo da página Sobre, extraído para ser reutilizado como aba em /explorar
export function SobreConteudo() {
  return (
    <>
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Timeline</h2>
        <Timeline events={timelineEvents} />
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Conheça Nossa Equipe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.slice(0, 4).map((member) => (
            <TeamCard key={member.name} name={member.name} image={member.image} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:max-w-[75%] lg:mx-auto">
          {teamMembers.slice(4).map((member) => (
            <TeamCard key={member.name} name={member.name} image={member.image} />
          ))}
        </div>
      </section>
    </>
  );
}

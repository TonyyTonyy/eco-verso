import { Timeline } from "@/components/timeline";
import { TeamCard } from "@/components/team-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  const timelineEvents = [
    {
      year: "2023",
      title: "O Início",
      description:
        "O EcoVerso foi criado com o objetivo de incentivar a educação ambiental com jogos e atividades interativas.",
    },
    {
      year: "2023",
      title: "Primeira Apresentação",
      description:
        "Apresentação do protótipo inicial aos colegas e professores, com feedback positivo.",
    },
    {
      year: "2024",
      title: "Melhorias no Material",
      description:
        "Aprimoramento dos materiais educativos baseado no feedback dos primeiros participantes.",
    },
    {
      year: "2025",
      title: "Site Simples",
      description:
        "Lançamento de um site básico para compartilhar os materiais desenvolvidos no projeto.",
    },
  ];

  const teamMembers = [
    { name: "Camila Áurea Maciel de Souza ", image: "/Person.jpg" },
    { name: "Giovanna Salomão Rodrigues", image: "/Giovanna.jpeg" },
    { name: "Franklin Ferreira dos santos", image: "/Frank.jpeg" },
    { name: "Tony Cleriston Oliveira dos S. J.", image: "/Tony.jpeg" },
    { name: "Lucas Silva Oliveira", image: "/LucasOliveira.png" },
    { name: "João Arthur Nascimento Mascarenhas", image: "/JoaoArthur.png" },
    { name: "Lucas de Jesus Barreto", image: "/LucasBarreto.png" },
  ];

  const partners = [
    "Fundação Terra Verde",
    "Rede de Escolas Sustentáveis",
    "Associação de Educação Ambiental",
    "Iniciativa Global de Conservação",
    "Aliança de Energia Renovável",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sobre o EcoVerso</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conheça nossa jornada, missão e a equipe por trás da plataforma de
          educação ambiental interativa do EcoVerso.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Timeline</h2>
        <Timeline events={timelineEvents} />
      </section>

      <section className="mb-16 mx-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Conheça Nossa Equipe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.slice(0, 4).map((member, index) => (
            <TeamCard key={index} name={member.name} image={member.image} />
          ))}
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.slice(4).map((member, index) => (
            <TeamCard key={index + 4} name={member.name} image={member.image} />
          ))}
        </div>
      </section>

      {/*  <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nossos Parceiros</h2>
        <Card>
          <CardHeader>
            <CardTitle>Organizações com as quais trabalhamos</CardTitle>
            <CardDescription>
              Colaboramos com estas incríveis organizações para criar um futuro mais sustentável.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg text-center hover:bg-muted/80 transition-colors">
                  {partner}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section> */}
    </div>
  );
}

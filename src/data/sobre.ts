export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface TeamMember {
  name: string
  image: string
}

export const timelineEvents: TimelineEvent[] = [
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
]

export const teamMembers: TeamMember[] = [
  { name: "Gabriel Arlisson de Souza Santos Torres", image: "/Person.jpg" },
  { name: "Franklin Ferreira dos Santos", image: "/Frank.jpeg" },
  { name: "Tony Cleriston Oliveira dos S. J.", image: "/Tony.jpeg" },
  { name: "Lucas Silva Oliveira", image: "/LucasOliveira.png" },
  { name: "João Arthur Nascimento Mascarenhas", image: "/JoaoArthur.png" },
  { name: "Lucas de Jesus Barreto", image: "/LucasBarreto.png" },
]

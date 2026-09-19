export interface QuizMeta {
  id: string
  title: string
  description: string
  difficulty: "Fácil" | "Médio" | "Difícil"
  points: number
  icon: string
}

export const quizzes: QuizMeta[] = [
  {
    id: "oitoRs",
    title: "Os 8 Rs da Sustentabilidade",
    description: "Descubra o quanto você conhece sobre os princípios dos 8 Rs da sustentabilidade.",
    difficulty: "Médio",
    points: 150,
    icon: "♻️",
  },
  {
    id: "cidadesSustentaveis",
    title: "Cidades Sustentáveis",
    description: "Teste seu conhecimento sobre práticas e conceitos de cidades sustentáveis.",
    difficulty: "Difícil",
    points: 200,
    icon: "🏙️",
  },
  {
    id: "clima",
    title: "Mudanças Climáticas",
    description: "Teste seus conhecimentos sobre causas e soluções para as mudanças climáticas.",
    difficulty: "Médio",
    points: 150,
    icon: "🌡️",
  },
  {
    id: "biodiversidade",
    title: "Biodiversidade",
    description: "Quanto você sabe sobre a incrível biodiversidade da Terra?",
    difficulty: "Fácil",
    points: 100,
    icon: "🦋",
  },
  {
    id: "energia",
    title: "Energia Renovável",
    description: "Desafie-se com perguntas sobre fontes de energia renovável.",
    difficulty: "Difícil",
    points: 200,
    icon: "⚡",
  },
  {
    id: "oceanos",
    title: "Conservação dos Oceanos",
    description: "Mergulhe fundo no conhecimento sobre conservação dos oceanos.",
    difficulty: "Médio",
    points: 150,
    icon: "🌊",
  },
]

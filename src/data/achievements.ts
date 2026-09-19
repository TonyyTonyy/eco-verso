import { quizzes } from "@/data/quizzes"

// Estatísticas usadas para avaliar se uma conquista foi desbloqueada
export interface AchievementStats {
  points: number
  completedQuizzes: string[]
  completedGames: string[]
  pagesVisited: number
  visitedPages: string[]
  streak: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  check: (stats: AchievementStats) => boolean
}

export const achievements: Achievement[] = [
  {
    id: "primeiros-passos",
    title: "Primeiros Passos",
    description: "Ganhe os seus primeiros 100 pontos.",
    icon: "🌱",
    check: (s) => s.points >= 100,
  },
  {
    id: "eco-guerreiro",
    title: "Eco-Guerreiro",
    description: "Acumule 500 pontos.",
    icon: "🛡️",
    check: (s) => s.points >= 500,
  },
  {
    id: "lenda-verde",
    title: "Lenda Verde",
    description: "Acumule 1000 pontos.",
    icon: "👑",
    check: (s) => s.points >= 1000,
  },
  {
    id: "mestre-reciclagem",
    title: "Mestre da Reciclagem",
    description: "Complete o jogo de separação de resíduos.",
    icon: "♻️",
    check: (s) => s.completedGames.includes("separacao-residuos"),
  },
  {
    id: "equilibrista",
    title: "Equilibrista Ecológico",
    description: "Monte a cadeia alimentar completa no Ecossistema Equilibrado.",
    icon: "⚖️",
    check: (s) => s.completedGames.includes("ecossistema"),
  },
  {
    id: "prefeito-verde",
    title: "Prefeito Verde",
    description: "Vença uma partida do Jogo da Cidade Sustentável.",
    icon: "🏙️",
    check: (s) => s.completedGames.includes("cidade-sustentavel"),
  },
  {
    id: "desafiante",
    title: "Desafiante Semanal",
    description: "Conclua o desafio semanal.",
    icon: "🎯",
    check: (s) => s.completedGames.includes("desafio-semanal"),
  },
  {
    id: "mestre-8rs",
    title: "Mestre dos 8 Rs",
    description: "Complete o quiz Os 8 Rs da Sustentabilidade.",
    icon: "🔄",
    check: (s) => s.completedQuizzes.includes("oitoRs"),
  },
  {
    id: "arquiteto-verde",
    title: "Arquiteto Sustentável",
    description: "Complete o quiz Cidades Sustentáveis.",
    icon: "🏗️",
    check: (s) => s.completedQuizzes.includes("cidadesSustentaveis"),
  },
  {
    id: "cientista-clima",
    title: "Cientista do Clima",
    description: "Complete o quiz Mudanças Climáticas.",
    icon: "🌡️",
    check: (s) => s.completedQuizzes.includes("clima"),
  },
  {
    id: "protetor-biodiversidade",
    title: "Protetor da Biodiversidade",
    description: "Complete o quiz Biodiversidade.",
    icon: "🦋",
    check: (s) => s.completedQuizzes.includes("biodiversidade"),
  },
  {
    id: "energia-limpa",
    title: "Energia Limpa",
    description: "Complete o quiz Energia Renovável.",
    icon: "⚡",
    check: (s) => s.completedQuizzes.includes("energia"),
  },
  {
    id: "guardiao-oceanos",
    title: "Guardião dos Oceanos",
    description: "Complete o quiz Conservação dos Oceanos.",
    icon: "🌊",
    check: (s) => s.completedQuizzes.includes("oceanos"),
  },
  {
    id: "pegada-consciente",
    title: "Consciência Verde",
    description: "Calcule a sua pegada de carbono pela primeira vez.",
    icon: "🌍",
    check: (s) => s.completedGames.includes("pegada-carbono"),
  },
  {
    id: "agente-local",
    title: "Agente Local",
    description: "Explore o Mapa de Ação Local e descubra onde agir perto de você.",
    icon: "🗺️",
    check: (s) => s.visitedPages.includes("/mapa"),
  },
  {
    id: "espirito-comunitario",
    title: "Espírito Comunitário",
    description: "Contribua pela primeira vez para um desafio da comunidade.",
    icon: "🤝",
    check: (s) => s.completedGames.includes("desafio-comunitario"),
  },
  {
    id: "explorador",
    title: "Explorador do EcoVerso",
    description: "Visite todas as páginas do site.",
    icon: "🧭",
    check: (s) => s.pagesVisited >= 8,
  },
  {
    id: "chama-acesa",
    title: "Chama Acesa",
    description: "Visite o EcoVerso por 3 dias seguidos.",
    icon: "🔥",
    check: (s) => s.streak >= 3,
  },
  {
    id: "habito-verde",
    title: "Hábito Verde",
    description: "Visite o EcoVerso por 7 dias seguidos.",
    icon: "🗓️",
    check: (s) => s.streak >= 7,
  },
  {
    id: "mestre-ecoverso",
    title: "Mestre do EcoVerso",
    description: "Complete todos os quizzes e desbloqueie o certificado compartilhável.",
    icon: "🎓",
    check: (s) => quizzes.every((q) => s.completedQuizzes.includes(q.id)),
  },
]

// Níveis por pontos acumulados
export interface LevelInfo {
  level: number
  title: string
  minPoints: number
  nextLevelPoints: number | null
  progressPercent: number
}

export const levels = [
  { level: 1, title: "Semente Curiosa", minPoints: 0 },
  { level: 2, title: "Aprendiz Verde", minPoints: 100 },
  { level: 3, title: "Guardião da Natureza", minPoints: 300 },
  { level: 4, title: "Defensor do Planeta", minPoints: 600 },
  { level: 5, title: "Eco-Herói", minPoints: 1000 },
  { level: 6, title: "Lenda Verde", minPoints: 1500 },
]

export function getLevelInfo(points: number): LevelInfo {
  let current = levels[0]
  for (const l of levels) {
    if (points >= l.minPoints) current = l
  }
  const idx = levels.indexOf(current)
  const next = levels[idx + 1] ?? null
  const progressPercent = next
    ? Math.min(100, Math.round(((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100))
    : 100
  return {
    level: current.level,
    title: current.title,
    minPoints: current.minPoints,
    nextLevelPoints: next ? next.minPoints : null,
    progressPercent,
  }
}

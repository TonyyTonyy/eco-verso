export interface DesafioQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export const desafioQuestions: DesafioQuestion[] = [
  {
    question: "Qual é a principal causa das mudanças climáticas?",
    options: [
      "Emissões de gases de efeito estufa de atividades humanas",
      "Variações naturais na órbita da Terra",
      "Mudanças na atividade solar",
      "Erupções vulcânicas",
    ],
    correctAnswer: 0,
    explanation:
      "As atividades humanas são o principal motor das mudanças climáticas observadas, principalmente através das emissões de gases de efeito estufa.",
  },
  {
    question: "Qual das seguintes opções NÃO é uma fonte de energia renovável?",
    options: ["Energia solar", "Energia eólica", "Gás natural", "Energia hidrelétrica"],
    correctAnswer: 2,
    explanation:
      "O gás natural é um combustível fóssil não renovável, enquanto a energia solar, eólica e hidrelétrica são fontes renováveis.",
  },
  {
    question:
      "Aproximadamente quanto tempo leva para uma garrafa plástica se decompor no meio ambiente?",
    options: ["10-20 anos", "50-100 anos", "450-500 anos", "Mais de 1000 anos"],
    correctAnswer: 2,
    explanation:
      "As garrafas plásticas podem levar entre 450 e 500 anos para se decompor completamente no meio ambiente.",
  },
]

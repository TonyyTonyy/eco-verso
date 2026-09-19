// Dados da calculadora de pegada de carbono
// Fatores de emissão em toneladas de CO₂ equivalente por ano (estimativas educativas
// baseadas em médias de literatura como Our World in Data / ADEME — valores simplificados)

export interface PegadaOption {
  label: string
  icon: string
  co2: number // toneladas CO₂e/ano
}

export interface PegadaQuestion {
  id: string
  title: string
  options: PegadaOption[]
}

export interface PegadaCategory {
  id: string
  title: string
  icon: string
  description: string
  questions: PegadaQuestion[]
  tips: string[]
}

export const pegadaCategories: PegadaCategory[] = [
  {
    id: "transporte",
    title: "Transporte",
    icon: "🚗",
    description: "Como você se desloca no dia a dia e em viagens.",
    questions: [
      {
        id: "deslocacao",
        title: "Como você se desloca normalmente (escola, trabalho, recados)?",
        options: [
          { label: "A pé ou de bicicleta", icon: "🚶", co2: 0.1 },
          { label: "Transporte público", icon: "🚌", co2: 0.6 },
          { label: "Carro compartilhado / carona", icon: "🚙", co2: 1.2 },
          { label: "Carro próprio", icon: "🚗", co2: 2.2 },
          { label: "Carro próprio, muitos km por dia", icon: "⛽", co2: 3.4 },
        ],
      },
      {
        id: "voos",
        title: "Quantos voos você faz por ano, em média?",
        options: [
          { label: "Nenhum", icon: "🏠", co2: 0 },
          { label: "1–2 voos curtos", icon: "🛫", co2: 0.4 },
          { label: "1–2 voos longos", icon: "✈️", co2: 1.0 },
          { label: "3 ou mais voos", icon: "🌍", co2: 2.0 },
        ],
      },
    ],
    tips: [
      "Troque 1–2 viagens de carro por semana por transporte público, bicicleta ou caminhada.",
      "Agrupe recados em um só trajeto e considere compartilhar caronas.",
      "Para distâncias curtas, o trem emite muito menos CO₂ que o avião.",
    ],
  },
  {
    id: "alimentacao",
    title: "Alimentação",
    icon: "🍽️",
    description: "O que você come e quanto desperdiça.",
    questions: [
      {
        id: "carne",
        title: "Com que frequência você come carne ou peixe?",
        options: [
          { label: "Nunca (vegano)", icon: "🥦", co2: 0.7 },
          { label: "Vegetariano (sem carne/peixe)", icon: "🥗", co2: 1.0 },
          { label: "2–3 vezes por semana", icon: "🍗", co2: 1.6 },
          { label: "Quase todos os dias", icon: "🍖", co2: 2.5 },
          { label: "Em quase todas as refeições", icon: "🥩", co2: 3.3 },
        ],
      },
      {
        id: "desperdicio",
        title: "Quanta comida acaba no lixo na sua casa?",
        options: [
          { label: "Quase nenhuma", icon: "✅", co2: 0.1 },
          { label: "Alguma, às vezes", icon: "🗑️", co2: 0.3 },
          { label: "Bastante, frequentemente", icon: "♻️", co2: 0.6 },
        ],
      },
    ],
    tips: [
      "Experimente uma refeição sem carne por semana — é a mudança alimentar com mais impacto.",
      "Prefira produtos locais e da estação: menos transporte e menos estufas aquecidas.",
      "Planeje as refeições e congele sobras para reduzir o desperdício de alimentos.",
    ],
  },
  {
    id: "energia",
    title: "Energia em Casa",
    icon: "⚡",
    description: "Eletricidade, aquecimento e hábitos em casa.",
    questions: [
      {
        id: "eletricidade",
        title: "Como é o consumo de eletricidade na sua casa?",
        options: [
          { label: "Baixo / tarifa renovável", icon: "🌞", co2: 0.4 },
          { label: "Moderado", icon: "💡", co2: 0.9 },
          { label: "Alto (ar condicionado, aquecimento elétrico)", icon: "❄️", co2: 1.6 },
        ],
      },
      {
        id: "aquecimento",
        title: "Como você aquece (ou não) a sua casa no inverno?",
        options: [
          { label: "Não preciso / painéis solares", icon: "☀️", co2: 0.2 },
          { label: "Gás natural", icon: "🔥", co2: 0.6 },
          { label: "Aquecedores elétricos", icon: "🔌", co2: 0.9 },
          { label: "Gasóleo ou lenha", icon: "🪵", co2: 1.1 },
        ],
      },
    ],
    tips: [
      "Baixe o termostato 1 °C no inverno — pode cortar até 7% da energia de aquecimento.",
      "Troque lâmpadas por LED e desligue aparelhos em standby.",
      "Se puder, escolha uma tarifa de eletricidade de fontes renováveis.",
    ],
  },
  {
    id: "consumo",
    title: "Consumo e Compras",
    icon: "🛍️",
    description: "Roupa, tecnologia e hábitos de consumo.",
    questions: [
      {
        id: "compras",
        title: "Com que frequência você compra roupas, gadgets ou outros bens novos?",
        options: [
          { label: "Raramente — reutilizo e compro em segunda mão", icon: "♻️", co2: 0.3 },
          { label: "Ocasionalmente, quando preciso", icon: "🛒", co2: 0.7 },
          { label: "Frequentemente, gosto de novidades", icon: "📦", co2: 1.4 },
        ],
      },
      {
        id: "reciclagem",
        title: "Você separa o lixo para reciclagem em casa?",
        options: [
          { label: "Sempre, em tudo", icon: "🟢", co2: 0 },
          { label: "Às vezes", icon: "🟡", co2: 0.2 },
          { label: "Raramente ou nunca", icon: "🔴", co2: 0.4 },
        ],
      },
    ],
    tips: [
      "Antes de comprar, pergunte-se: eu realmente preciso? Segunda mão é a opção com menos pegada.",
      "Conserte em vez de substituir: roupas, eletrônicos e móveis ganham anos de vida.",
      "Separar o lixo para reciclagem evita emissões de aterros e poupa matérias-primas.",
    ],
  },
]

// Valores de referência (toneladas CO₂e por pessoa/ano)
export const PEGADA_REFERENCIAS = [
  { label: "Meta 2030 (Acordo de Paris)", value: 2.0 },
  { label: "Média mundial", value: 4.7 },
  { label: "Média europeia", value: 6.8 },
]

export function classificarPegada(total: number): { titulo: string; mensagem: string } {
  if (total <= 2.0) {
    return {
      titulo: "Excelente! 🌟",
      mensagem: "Sua pegada já está no nível necessário para cumprir as metas climáticas de 2030. Continue inspirando os outros!",
    }
  }
  if (total <= 4.7) {
    return {
      titulo: "Muito bom! 👏",
      mensagem: "Você está abaixo da média mundial. Com mais alguns ajustes dá para chegar à meta de 2 toneladas.",
    }
  }
  if (total <= 6.8) {
    return {
      titulo: "Na média europeia ⚠️",
      mensagem: "Sua pegada é parecida com a de um europeu típico. Há boas oportunidades de redução nas dicas abaixo.",
    }
  }
  return {
    titulo: "Acima da média 🚨",
    mensagem: "Sua pegada está acima da média europeia — mas cada mudança conta. Comece pelas dicas da maior categoria!",
  }
}

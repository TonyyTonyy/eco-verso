export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

export const quizQuestions: Record<string, QuizQuestion[]> = {
  clima: [
    {
      question: "Qual gás contribui mais para o efeito estufa?",
      options: ["Oxigênio", "Dióxido de Carbono (CO2)", "Nitrogênio", "Hidrogênio"],
      correctAnswer: 1,
    },
    {
      question:
        "Qual das seguintes atividades humanas NÃO contribui significativamente para as mudanças climáticas?",
      options: [
        "Queima de combustíveis fósseis",
        "Desmatamento",
        "Uso de energia nuclear",
        "Pecuária intensiva",
      ],
      correctAnswer: 2,
    },
    {
      question: "O que é a pegada de carbono?",
      options: [
        "A quantidade de carbono presente no corpo humano",
        "Uma técnica de agricultura sustentável",
        "O rastro deixado por veículos movidos a combustível fóssil",
        "A medida da emissão de gases de efeito estufa gerada por atividades humanas",
      ],
      correctAnswer: 3,
    },
    {
      question:
        "Qual das seguintes consequências NÃO está diretamente relacionada às mudanças climáticas?",
      options: [
        "Aumento do nível do mar",
        "Eventos climáticos extremos mais frequentes",
        "Aumento de terremotos e atividade vulcânica",
        "Mudanças nos padrões de migração animal",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Qual das seguintes ações individuais tem o maior impacto na redução da pegada de carbono?",
      options: [
        "Usar sacolas reutilizáveis",
        "Reduzir o consumo de carne",
        "Desligar as luzes quando não estiver no ambiente",
        "Usar transporte público em vez de carro particular",
      ],
      correctAnswer: 1,
    },
  ],
  biodiversidade: [
    {
      question: "O que é biodiversidade?",
      options: [
        "A variedade de vida animal em um ecossistema",
        "A variedade de plantas em uma floresta",
        "A variedade de vida em todas as suas formas, níveis e combinações",
        "A variedade de espécies marinhas nos oceanos",
      ],
      correctAnswer: 2,
    },
    {
      question: "Qual bioma brasileiro possui a maior biodiversidade?",
      options: ["Cerrado", "Amazônia", "Mata Atlântica", "Pantanal"],
      correctAnswer: 1,
    },
    {
      question: "Qual das seguintes NÃO é uma causa direta da perda de biodiversidade?",
      options: [
        "Destruição de habitat",
        "Espécies invasoras",
        "Poluição",
        "Aumento da proteção de áreas naturais",
      ],
      correctAnswer: 3,
    },
    {
      question: "O que é uma espécie endêmica?",
      options: [
        "Uma espécie que está ameaçada de extinção",
        "Uma espécie que existe apenas em uma região geográfica específica",
        "Uma espécie que migra sazonalmente",
        "Uma espécie que foi introduzida em um novo habitat",
      ],
      correctAnswer: 1,
    },
    {
      question: "Qual é a importância da polinização para a biodiversidade?",
      options: [
        "Não tem importância significativa",
        "Ajuda apenas na reprodução de algumas flores ornamentais",
        "É essencial para a reprodução de muitas plantas e para a produção de alimentos",
        "Afeta apenas a produção de mel",
      ],
      correctAnswer: 2,
    },
  ],
  energia: [
    {
      question: "Qual das seguintes NÃO é uma fonte de energia renovável?",
      options: ["Energia solar", "Energia eólica", "Gás natural", "Energia hidrelétrica"],
      correctAnswer: 2,
    },
    {
      question: "Qual país lidera o mundo em capacidade instalada de energia solar?",
      options: ["Estados Unidos", "Alemanha", "China", "Índia"],
      correctAnswer: 2,
    },
    {
      question: "O que é energia de biomassa?",
      options: [
        "Energia gerada a partir de combustíveis fósseis",
        "Energia gerada a partir de material orgânico",
        "Energia gerada a partir do movimento das marés",
        "Energia gerada a partir do calor interno da Terra",
      ],
      correctAnswer: 1,
    },
    {
      question: "Qual é a principal desvantagem da energia eólica?",
      options: [
        "É extremamente cara",
        "Produz gases de efeito estufa",
        "Depende das condições climáticas",
        "Requer combustíveis fósseis para funcionar",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Qual tecnologia de armazenamento é mais comumente usada em sistemas de energia renovável?",
      options: [
        "Baterias de íon-lítio",
        "Células de combustível de hidrogênio",
        "Armazenamento de ar comprimido",
        "Volantes de inércia",
      ],
      correctAnswer: 0,
    },
  ],
  oceanos: [
    {
      question: "Qual é a principal causa da acidificação dos oceanos?",
      options: [
        "Derramamento de petróleo",
        "Absorção de dióxido de carbono atmosférico",
        "Poluição por plásticos",
        "Aumento da temperatura da água",
      ],
      correctAnswer: 1,
    },
    {
      question: "Aproximadamente quanto da superfície da Terra é coberta pelos oceanos?",
      options: ["50%", "60%", "70%", "80%"],
      correctAnswer: 2,
    },
    {
      question: "Qual das seguintes NÃO é uma consequência direta da pesca excessiva?",
      options: [
        "Redução das populações de peixes",
        "Desequilíbrio nos ecossistemas marinhos",
        "Aumento da acidificação dos oceanos",
        "Impacto nas comunidades costeiras que dependem da pesca",
      ],
      correctAnswer: 2,
    },
    {
      question: "O que são os recifes de coral?",
      options: [
        "Formações rochosas no fundo do mar",
        "Ecossistemas formados por animais marinhos",
        "Plantas marinhas que crescem em águas rasas",
        "Acumulações de areia e sedimentos",
      ],
      correctAnswer: 1,
    },
    {
      question: "Qual é o maior problema causado pelo plástico nos oceanos?",
      options: [
        "Apenas poluição visual",
        "Afeta apenas as praias turísticas",
        "Prejudica a vida marinha e entra na cadeia alimentar",
        "Aumenta a temperatura da água",
      ],
      correctAnswer: 2,
    },
  ],
  oitoRs: [
    {
      question: "Quais são os 8 Rs da sustentabilidade?",
      options: [
        "Reduzir, Reutilizar, Reciclar, Repensar, Recusar, Reparar, Responsabilizar-se, Repassar",
        "Reduzir, Reciclar, Renovar, Resgatar, Restaurar, Reproduzir, Reinventar, Reabilitar",
        "Reduzir, Reutilizar, Reciclar, Recuperar, Renovar, Reparar, Respeitar, Reconectar",
        "Reciclar, Restaurar, Reaproveitar, Recuperar, Reutilizar, Reduzir, Respeitar, Renovar",
      ],
      correctAnswer: 0,
    },
    {
      question: "O que significa 'Repensar' no contexto dos 8 Rs?",
      options: [
        "Pensar novamente antes de jogar algo fora",
        "Refletir sobre os hábitos de consumo e questionar sua necessidade",
        "Considerar diferentes formas de reciclar",
        "Planejar novas estratégias de consumo sustentável",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Qual dos 8 Rs enfatiza a importância de não adquirir produtos desnecessários ou que causem danos ao meio ambiente?",
      options: ["Reduzir", "Recusar", "Repensar", "Repassar"],
      correctAnswer: 1,
    },
    {
      question: "Como o princípio 'Reparar' contribui para a sustentabilidade?",
      options: [
        "Aumentando a vida útil dos produtos",
        "Eliminando resíduos através da restauração",
        "Reduzindo a necessidade de novos recursos",
        "Todas as alternativas anteriores",
      ],
      correctAnswer: 3,
    },
    {
      question: "O que significa 'Responsabilizar-se' no contexto dos 8 Rs?",
      options: [
        "Exigir que empresas arquem com os danos ambientais que causam",
        "Assumir as consequências e impactos das próprias escolhas de consumo",
        "Responsabilizar o governo pela gestão inadequada de resíduos",
        "Criar leis mais rígidas para punir crimes ambientais",
      ],
      correctAnswer: 1,
    },
  ],
  cidadesSustentaveis: [
    {
      question: "O que caracteriza uma cidade sustentável?",
      options: [
        "Apenas a presença de áreas verdes e parques",
        "Uso exclusivo de transporte público",
        "Integração equilibrada entre aspectos ambientais, sociais e econômicos",
        "População reduzida e controle de natalidade",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Qual conceito está relacionado com a criação de comunidades que permitem que as pessoas atendam à maioria de suas necessidades a uma curta distância a pé ou de bicicleta?",
      options: [
        "Cidade Compacta",
        "Cidade de 15 minutos",
        "Ecovila Urbana",
        "Megalópole Verde",
      ],
      correctAnswer: 1,
    },
    {
      question: "Qual das seguintes estratégias NÃO é típica de cidades sustentáveis?",
      options: [
        "Infraestrutura para mobilidade ativa (ciclovias, calçadas amplas)",
        "Edificações com certificação de eficiência energética",
        "Expansão horizontal contínua para acomodar o crescimento populacional",
        "Sistemas de captação e reuso de água da chuva",
      ],
      correctAnswer: 2,
    },
    {
      question: "O que são 'telhados verdes' no contexto de cidades sustentáveis?",
      options: [
        "Telhados pintados com tinta ecológica verde",
        "Coberturas de edificações com vegetação plantada",
        "Painéis solares instalados em telhados",
        "Telhados feitos com materiais reciclados",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Qual das seguintes cidades é frequentemente citada como exemplo de sustentabilidade urbana por seu sistema de transporte público eficiente e planejamento urbano?",
      options: ["Los Angeles, EUA", "Mumbai, Índia", "Curitiba, Brasil", "Cairo, Egito"],
      correctAnswer: 2,
    },
  ],
}

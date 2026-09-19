export interface EcoActivity {
  id: string
  title: string
  description: string
  image: string
  ageGroup: string
  participants: string
  duration: string
  materials: string[]
  steps: string[]
  learningOutcomes: string[]
}

export const ecoActivities: EcoActivity[] = [
  {
    id: "caca-tesouro-biodiversidade",
    title: "Caça ao Tesouro da Biodiversidade",
    description:
      "Uma atividade ao ar livre onde os alunos identificam e documentam diferentes espécies em seu ambiente local.",
    image:
      "https://img.freepik.com/fotos-gratis/criancas-participando-de-uma-caca-ao-tesouro_23-2149042853.jpg?semt=ais_hybrid&w=740",
    ageGroup: "10-14 anos",
    participants: "Qualquer número",
    duration: "60 minutos",
    materials: [
      "Guias de identificação de espécies",
      "Cadernos",
      "Lápis",
      "Lupas",
      "Câmeras digitais (opcional)",
    ],
    steps: [
      "Prepare uma lista de espécies locais de plantas e animais para encontrar.",
      "Divida os alunos em pequenos grupos com guias de identificação.",
      "Estabeleça limites para a área de busca e regras de segurança.",
      "Os alunos documentam suas descobertas com notas e esboços ou fotos.",
      "Os grupos apresentam suas descobertas e discutem a importância de cada espécie.",
    ],
    learningOutcomes: [
      "Habilidades de identificação de espécies",
      "Compreensão dos ecossistemas locais",
      "Valorização da biodiversidade",
      "Técnicas de observação científica",
    ],
  },
  {
    id: "pelotas-de-sementes",
    title: "Oficina de Pelotas de Sementes",
    description:
      "Uma atividade prática em que os alunos preparam e espalham pelotas de sementes para restaurar áreas verdes locais.",
    image: "/cacaTesouro.jpg",
    ageGroup: "10-14 anos",
    participants: "Qualquer número",
    duration: "60 minutos",
    materials: [
      "Argila natural (sem aditivos químicos)",
      "Solo peneirado (terra de jardim)",
      "Sementes de plantas nativas ou flores silvestres",
      "Água em borrifador",
      "Bandejas ou recipientes rasos",
      "Luvas de jardinagem (opcional)",
    ],
    steps: [
      "Misture em um balde partes iguais de argila e solo peneirado.",
      "Adicione água aos poucos até formar uma massa maleável.",
      "Incorpore as sementes à massa de terra, garantindo distribuição uniforme.",
      "Modele pequenas pelotas (±2 cm de diâmetro) e deixe secar por 1–2 dias.",
      "Leve as pelotas até uma área degradada ou canteiro escolar e espalhe-as.",
      "Observe ao longo das semanas o germinar das sementes e faça registro fotográfico.",
    ],
    learningOutcomes: [
      "Entendimento dos ciclos de germinação e crescimento de plantas",
      "Conscientização sobre restauração ecológica e uso de plantas nativas",
      "Habilidades de trabalho colaborativo em atividades práticas",
      "Registro e monitoramento científico de mudanças no ambiente",
    ],
  },
  {
    id: "competicao-reciclagem",
    title: "Competição de Reciclagem",
    description:
      "Uma competição divertida onde equipes coletam e separam materiais recicláveis, aprendendo sobre a importância da gestão adequada de resíduos.",
    image:
      "https://escolainfantilflorescer.com.br/site/wp-content/uploads/2019/10/grupo-de-criancas-colegas-aprendizagem-biologia-recicle-ambiente_53876-34451.jpg",
    ageGroup: "8-15 anos",
    participants: "Grupos de 4-6 alunos",
    duration: "90 minutos",
    materials: [
      "Luvas descartáveis",
      "Sacos de lixo coloridos (diferentes cores para cada tipo de material)",
      "Balança",
      "Cronômetro",
      "Placas de identificação (papel, plástico, metal, vidro, orgânico)",
      "Materiais recicláveis limpos para separação",
      "Pranchetas e fichas de pontuação",
    ],
    steps: [
      "Organize uma área com estações de coleta identificadas por tipo de material reciclável.",
      "Divida os alunos em equipes e explique as regras da competição e a pontuação.",
      "Na primeira fase, as equipes têm tempo determinado para coletar o máximo de materiais recicláveis pela escola/parque.",
      "Na segunda fase, as equipes devem separar corretamente os materiais nas estações correspondentes.",
      "Pontue pela quantidade coletada, precisão da separação e velocidade.",
      "Ao final, pese os materiais e calcule o impacto ambiental positivo da atividade.",
      "Discuta a importância da reciclagem e como incorporar essas práticas no dia a dia.",
    ],
    learningOutcomes: [
      "Conhecimento sobre tipos de materiais recicláveis e processos de reciclagem",
      "Desenvolvimento de habilidades de trabalho em equipe e organização",
      "Conscientização sobre a redução de resíduos e consumo responsável",
      "Compreensão do impacto ambiental da gestão de resíduos",
    ],
  },
]

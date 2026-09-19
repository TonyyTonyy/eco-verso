// Pontos de ação ambiental local: ecopontos, reciclagem, hortas e eventos.
// Dados de exemplo curados — num cenário real viriam de bases públicas
// (prefeituras, OSM) ou de cadastro colaborativo.

export type LocalCategory = "reciclagem" | "ecoponto" | "horta" | "evento"

export interface EcoLocal {
  id: string
  name: string
  category: LocalCategory
  city: string
  uf: string
  lat: number
  lng: number
  address: string
  description: string
  hours?: string
  date?: string // apenas eventos
}

export const categoryInfo: Record<
  LocalCategory,
  { label: string; icon: string; color: string }
> = {
  reciclagem: { label: "Reciclagem", icon: "♻️", color: "#16a34a" },
  ecoponto: { label: "Ecoponto", icon: "🗑️", color: "#2563eb" },
  horta: { label: "Horta Comunitária", icon: "🌱", color: "#ca8a04" },
  evento: { label: "Evento Ambiental", icon: "📅", color: "#dc2626" },
}

export interface CityCenter {
  name: string
  uf: string
  lat: number
  lng: number
  zoom: number
}

export const cities: CityCenter[] = [
  { name: "Feira de Santana", uf: "BA", lat: -12.2664, lng: -38.9663, zoom: 13 },
  { name: "Salvador", uf: "BA", lat: -12.9777, lng: -38.5016, zoom: 12 },
  { name: "Vitória da Conquista", uf: "BA", lat: -14.8619, lng: -40.8445, zoom: 13 },
  { name: "Camaçari", uf: "BA", lat: -12.6976, lng: -38.3242, zoom: 13 },
]

export const ecoLocais: EcoLocal[] = [
  // ---------- Feira de Santana / BA ----------
  {
    id: "fsa-ecoponto-sim",
    name: "Ecoponto SIM",
    category: "ecoponto",
    city: "Feira de Santana",
    uf: "BA",
    lat: -12.2421,
    lng: -38.9457,
    address: "Av. Transnordestina – SIM",
    description: "Recebe entulho pequeno, móveis, eletrônicos e recicláveis.",
    hours: "Seg–Sáb, 7h–19h",
  },
  {
    id: "fsa-reciclagem-centro",
    name: "Ponto de Entrega Voluntária Centro",
    category: "reciclagem",
    city: "Feira de Santana",
    uf: "BA",
    lat: -12.2612,
    lng: -38.9601,
    address: "R. Castro Alves – Centro",
    description: "PEV de papel, metal, vidro e plástico — entrega voluntária.",
    hours: "Seg–Sex, 8h–17h",
  },
  {
    id: "fsa-horta-capuchinhos",
    name: "Horta Comunitária Capuchinhos",
    category: "horta",
    city: "Feira de Santana",
    uf: "BA",
    lat: -12.2998,
    lng: -38.9792,
    address: "Av. Artêmia Pires Freitas – Capuchinhos",
    description: "Horta comunitária com oficinas de compostagem e mudas.",
    hours: "Sáb, 8h–12h",
  },
  {
    id: "fsa-evento-lagoa-salgada",
    name: "Mutirão de Limpeza da Lagoa Salgada",
    category: "evento",
    city: "Feira de Santana",
    uf: "BA",
    lat: -12.2507,
    lng: -38.9519,
    address: "Lagoa Salgada – Av. Fraga Maia",
    description: "Coleta de resíduos nas margens e plantio de mudas nativas.",
    date: "Último sábado do mês, 7h",
  },
  {
    id: "fsa-ecoponto-brasilia",
    name: "Ecoponto Brasília",
    category: "ecoponto",
    city: "Feira de Santana",
    uf: "BA",
    lat: -12.2845,
    lng: -38.9512,
    address: "Av. João Durval Carneiro – Brasília",
    description: "Descarte gratuito de eletrônicos, lâmpadas e pilhas.",
    hours: "Seg–Sáb, 7h–19h",
  },
  // ---------- Salvador / BA ----------
  {
    id: "ssa-ecoponto-pituba",
    name: "Ecoponto Pituba",
    category: "ecoponto",
    city: "Salvador",
    uf: "BA",
    lat: -12.9987,
    lng: -38.4629,
    address: "Av. Manoel Dias da Silva – Pituba",
    description: "Recebe móveis, podas, eletrônicos e recicláveis.",
    hours: "Seg–Sáb, 7h–19h",
  },
  {
    id: "ssa-horta-saramandaia",
    name: "Horta Comunitária de Saramandaia",
    category: "horta",
    city: "Salvador",
    uf: "BA",
    lat: -12.9346,
    lng: -38.4467,
    address: "Ladeira de Saramandaia – Saramandaia",
    description: "Horta urbana comunitária com voluntariado aberto.",
    hours: "Sáb, 8h–11h",
  },
  {
    id: "ssa-evento-porto-barra",
    name: "Limpeza da Orla do Porto da Barra",
    category: "evento",
    city: "Salvador",
    uf: "BA",
    lat: -13.0044,
    lng: -38.5327,
    address: "Praia do Porto da Barra – Barra",
    description: "Mutirão mensal de retirada de plástico da orla.",
    date: "1º domingo do mês, 7h",
  },
  {
    id: "ssa-reciclagem-sao-caetano",
    name: "Cooperativa Recicla Salvador",
    category: "reciclagem",
    city: "Salvador",
    uf: "BA",
    lat: -12.9239,
    lng: -38.4701,
    address: "Av. Jequitaia – São Caetano",
    description: "Cooperativa de catadores — papel, metal, vidro e plástico.",
    hours: "Seg–Sex, 8h–17h",
  },
  // ---------- Vitória da Conquista / BA ----------
  {
    id: "vdc-ecoponto-boavista",
    name: "Ecoponto Boa Vista",
    category: "ecoponto",
    city: "Vitória da Conquista",
    uf: "BA",
    lat: -14.8452,
    lng: -40.8598,
    address: "Av. Bartolomeu de Gusmão – Boa Vista",
    description: "Descarte de móveis, eletrônicos e recicláveis.",
    hours: "Seg–Sáb, 7h–18h",
  },
  {
    id: "vdc-horta-guarani",
    name: "Horta Comunitária Guarani",
    category: "horta",
    city: "Vitória da Conquista",
    uf: "BA",
    lat: -14.8721,
    lng: -40.8612,
    address: "Rua do Guarani – Guarani",
    description: "Canteiros coletivos e distribuição de mudas nativas.",
    hours: "Qua e Sáb, 8h–11h",
  },
  {
    id: "vdc-evento-lagoa-bateias",
    name: "Plantio Coletivo na Lagoa das Bateias",
    category: "evento",
    city: "Vitória da Conquista",
    uf: "BA",
    lat: -14.8331,
    lng: -40.8227,
    address: "Lagoa das Bateias – Zona Oeste",
    description: "Plantio de árvores nativas com educadores ambientais.",
    date: "Sábados alternados, 8h",
  },
  // ---------- Camaçari / BA ----------
  {
    id: "cms-ecoponto-centro",
    name: "Ecoponto Centro",
    category: "ecoponto",
    city: "Camaçari",
    uf: "BA",
    lat: -12.7001,
    lng: -38.3289,
    address: "R. Borges dos Reis – Centro",
    description: "Coleta de pilhas, baterias e pequenos eletrônicos.",
    hours: "Seg–Sáb, 8h–18h",
  },
  {
    id: "cms-evento-jaua",
    name: "Limpeza da Praia de Jauá",
    category: "evento",
    city: "Camaçari",
    uf: "BA",
    lat: -12.8131,
    lng: -38.2182,
    address: "Praia de Jauá – Litoral Norte",
    description: "Mutirão de limpeza da praia e proteção de ninhos de tartaruga.",
    date: "2º sábado do mês, 7h",
  },
]

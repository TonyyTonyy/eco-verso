export interface Article {
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  readTime: string
  tags: string[]
  url: string
}

export const articles: Article[] = [
  {
    title: "10 maneiras simples de reduzir a sua pegada de carbono",
    excerpt:
      "Descubra ações práticas para diminuir sua pegada de carbono, desde mudanças nos hábitos alimentares até escolhas financeiras conscientes.",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443",
    date: "20 de agosto de 2020",
    author: "Extinction Rebellion",
    readTime: "5 min de leitura",
    tags: ["Vida Sustentável", "Ação Climática"],
    url: "https://rebellion.global/pt/blog/2020/08/20/reduce-your-carbon-footprint/",
  },
  {
    title: "Perda de biodiversidade: causas, consequências e soluções",
    excerpt:
      "A perda de biodiversidade ameaça ecossistemas e a sobrevivência humana. Entenda suas causas e como mitigá-la.",
    image:
      "https://www.iberdrola.com/documents/20125/41125/PerdidaBiodiversidad_746x419.jpg/beae1e3d-93ac-392c-277e-13f10ea30c6b?t=1628158320684",
    date: "Data não especificada",
    author: "Iberdrola",
    readTime: "8 min de leitura",
    tags: ["Biodiversidade", "Conservação"],
    url: "https://www.iberdrola.com/sustentabilidade/perda-de-biodiversidade",
  },
  {
    title: "Crescimento anual recorde em capacidade de eletricidade renovável",
    excerpt:
      "O mundo alcançou um crescimento recorde em energia renovável, criando empregos e reduzindo custos energéticos.",
    image:
      "https://www.irena.org/-/media/Images/IRENA/Agency/Press-Release/2025/Mar/Capacity-2025-release.JPG?w=1210&h=633&as=1&cc=1&hash=46BE2EEB19D8D9AE019DE9F26604FD21",
    date: "Março de 2025",
    author: "IRENA",
    readTime: "7 min de leitura",
    tags: ["Energia Renovável", "Sustentabilidade"],
    url: "https://www.irena.org/News/pressreleases/2025/Mar/Record-Breaking-Annual-Growth-in-Renewable-Power-Capacity-PT",
  },
  {
    title: "Por que a poluição plástica se tornou uma crise global?",
    excerpt:
      "Milhões de toneladas de plástico entram nos oceanos anualmente, ameaçando a vida marinha e os ecossistemas.",
    image:
      "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01plasticnationalgeographic2702698.webp?w=1600&h=900",
    date: "Abril de 2024",
    author: "National Geographic Brasil",
    readTime: "6 min de leitura",
    tags: ["Conservação dos Oceanos", "Poluição"],
    url: "https://www.nationalgeographicbrasil.com/meio-ambiente/2024/04/por-que-a-poluicao-plastica-se-tornou-uma-crise-global",
  },
  {
    title:
      "Agricultura sustentável: como produzir comida para o mundo todo e preservar o meio ambiente",
    excerpt:
      "Práticas agrícolas sustentáveis são essenciais para alimentar a população crescente sem degradar o meio ambiente.",
    image:
      "https://www.bosch.com.br/media/stories/agronegocio/agricultura_sustentavel/agricultura-sustentvel-como-produzir-comida-para-o-mundo-todo-e-preservar-o-meio-ambiente_res_1984x1116.webp",
    date: "Março de 2025",
    author: "Bosch",
    readTime: "9 min de leitura",
    tags: ["Agricultura Sustentável", "Sistemas Alimentares"],
    url: "https://www.bosch.com.br/noticias-e-historias/agronegocio/agricultura-sustentavel/",
  },
  {
    title:
      "A ligação entre eventos extremos do clima e as mudanças climáticas nunca foi tão clara",
    excerpt:
      "Especialistas destacam a conexão direta entre eventos climáticos extremos e as mudanças climáticas globais.",
    image: "/PlaceholderImage.png",
    date: "Julho de 2024",
    author: "National Geographic Brasil",
    readTime: "7 min de leitura",
    tags: ["Mudanças Climáticas", "Clima"],
    url: "https://www.nationalgeographicbrasil.com/meio-ambiente/2024/07/a-ligacao-entre-eventos-extremos-do-clima-e-as-mudancas-climaticas-nunca-foi-tao-clara",
  },
]

export const popularTags = [
  "Vida Sustentável",
  "Mudanças Climáticas",
  "Biodiversidade",
  "Energia Renovável",
  "Conservação",
  "Poluição",
  "Reciclagem",
  "Conservação dos Oceanos",
]

export const articleTabs = [
  { value: "all", label: "Todos os Artigos" },
  { value: "sustainable", label: "Vida Sustentável" },
  { value: "climate", label: "Mudanças Climáticas" },
  { value: "conservation", label: "Conservação" },
]

export function filterArticlesByTab(tab: string): Article[] {
  switch (tab) {
    case "sustainable":
      return articles.filter((a) => a.tags.includes("Vida Sustentável"))
    case "climate":
      return articles.filter(
        (a) =>
          a.tags.includes("Mudanças Climáticas") || a.tags.includes("Ação Climática"),
      )
    case "conservation":
      return articles.filter(
        (a) =>
          a.tags.includes("Conservação") || a.tags.includes("Conservação dos Oceanos"),
      )
    default:
      return articles
  }
}

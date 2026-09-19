export interface VideoResource {
  title: string
  description: string
  thumbnail: string
  duration: string
  url: string
}

export interface InfographicResource {
  title: string
  description: string
  image: string
}

export const videos: VideoResource[] = [
  {
    title: "Entendendo sobre as mudanças climáticas | Um Pacto pelo Clima #1",
    description:
      "Vídeo da série 'Um Pacto pelo Clima' que explica, de forma didática, o que está acontecendo com o nosso planeta.",
    thumbnail: "https://img.youtube.com/vi/JGwcFHggW90/hqdefault.jpg",
    duration: "06:01",
    url: "https://www.youtube.com/watch?v=JGwcFHggW90",
  },
  {
    title: "Mudanças Climáticas: Entendendo o Desafio Global",
    description:
      "Visão geral das principais causas das mudanças climáticas e como podemos mitigá-las, com exemplos de engenharia ambiental.",
    thumbnail: "https://img.youtube.com/vi/1Y5WgGjUKdo/hqdefault.jpg",
    duration: "08:59",
    url: "https://www.youtube.com/watch?v=1Y5WgGjUKdo",
  },
  {
    title: "Mudança Climática para Crianças",
    description:
      "Vídeo educativo voltado para o público infantil, explicando o que é mudança climática e o que podemos fazer para ajudar.",
    thumbnail: "https://img.youtube.com/vi/PH5halrNnfI/hqdefault.jpg",
    duration: "04:56",
    url: "https://www.youtube.com/watch?v=PH5halrNnfI",
  },
  {
    title: "Aquecimento Global e Mudanças Climáticas",
    description:
      "Você quer entender tudo sobre o aquecimento global e as mudanças climáticas? Neste vídeo, são apresentados conceitos básicos, causas e impactos.",
    thumbnail: "https://img.youtube.com/vi/vzDWFsfrFGY/hqdefault.jpg",
    duration: "28:26",
    url: "https://www.youtube.com/watch?v=vzDWFsfrFGY",
  },
]

export const infographics: InfographicResource[] = [
  {
    title: "A poluição do ambiente marinho",
    description: "Dados sobre a quantidade de plástico que chega aos oceanos anualmente.",
    image:
      "https://www.iberdrola.com/documents/20125/40309/isla_basura_POR.jpg/fbd6d6a1-cb0f-28a0-ddd6-de2597712d13?t=1627278122425",
  },
  {
    title: "Detalhamento da Pegada de Carbono",
    description: "O que compõe a pegada de carbono de um lar médio.",
    image: "https://123ecos.com.br/wp-content/uploads/2023/04/Pegada-de-carbono-calcular.jpg",
  },
  {
    title: "O Ciclo da Água",
    description:
      "Diagrama oficial do ciclo da água, mostrando evaporação, condensação e precipitação.",
    image:
      "https://gpm.nasa.gov/education/sites/default/files/article_images/Water-Cycle-Art2A_medium.png",
  },
]

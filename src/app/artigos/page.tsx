import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleCard } from "@/components/article-card"
import { Search, Calendar, Tag } from "lucide-react"

export default function ArticlesPage() {
  const articles = [
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
      image: "https://www.iberdrola.com/documents/20125/41125/PerdidaBiodiversidad_746x419.jpg/beae1e3d-93ac-392c-277e-13f10ea30c6b?t=1628158320684",
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
      image: "https://www.irena.org/-/media/Images/IRENA/Agency/Press-Release/2025/Mar/Capacity-2025-release.JPG?w=1210&h=633&as=1&cc=1&hash=46BE2EEB19D8D9AE019DE9F26604FD21",
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
      image: "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01plasticnationalgeographic2702698.webp?w=1600&h=900",
      date: "Abril de 2024",
      author: "National Geographic Brasil",
      readTime: "6 min de leitura",
      tags: ["Conservação dos Oceanos", "Poluição"],
      url: "https://www.nationalgeographicbrasil.com/meio-ambiente/2024/04/por-que-a-poluicao-plastica-se-tornou-uma-crise-global",
    },
    {
      title: "Agricultura sustentável: como produzir comida para o mundo todo e preservar o meio ambiente",
      excerpt:
        "Práticas agrícolas sustentáveis são essenciais para alimentar a população crescente sem degradar o meio ambiente.",
      image: "https://www.bosch.com.br/media/stories/agronegocio/agricultura_sustentavel/agricultura-sustentvel-como-produzir-comida-para-o-mundo-todo-e-preservar-o-meio-ambiente_res_1984x1116.webp",
      date: "Março de 2025",
      author: "Bosch",
      readTime: "9 min de leitura",
      tags: ["Agricultura Sustentável", "Sistemas Alimentares"],
      url: "https://www.bosch.com.br/noticias-e-historias/agronegocio/agricultura-sustentavel/",
    },
    {
      title: "A ligação entre eventos extremos do clima e as mudanças climáticas nunca foi tão clara",
      excerpt:
        "Especialistas destacam a conexão direta entre eventos climáticos extremos e as mudanças climáticas globais.",
      image: "data:image/jpeg;base64,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",
      date: "Julho de 2024",
      author: "National Geographic Brasil",
      readTime: "7 min de leitura",
      tags: ["Mudanças Climáticas", "Clima"],
      url: "https://www.nationalgeographicbrasil.com/meio-ambiente/2024/07/a-ligacao-entre-eventos-extremos-do-clima-e-as-mudancas-climaticas-nunca-foi-tao-clara",
    },
  ];
  

  const popularTags = [
    "Vida Sustentável",
    "Mudanças Climáticas",
    "Biodiversidade",
    "Energia Renovável",
    "Conservação",
    "Poluição",
    "Reciclagem",
    "Conservação dos Oceanos",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Artigos</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mantenha-se informado com nossos artigos mais recentes sobre temas ambientais, dicas de vida sustentável e
          esforços de conservação.
        </p>
      </div>

      <section className="mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium mr-2">Tags Populares:</span>
          {popularTags.map((tag, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <Tabs defaultValue="all" className="mb-16">
        <TabsList className="overflow-x-auto max-w-[calc(100vw-2rem)] pl-24 sm:max-w-none sm:pl-0">
          <TabsTrigger value="all">Todos os Artigos</TabsTrigger>
          <TabsTrigger value="sustainable">Vida Sustentável</TabsTrigger>
          <TabsTrigger value="climate">Mudanças Climáticas</TabsTrigger>
          <TabsTrigger value="conservation">Conservação</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                date={article.date}
                author={article.author}
                readTime={article.readTime}
                tags={article.tags}
                url={article.url}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sustainable" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter((article) => article.tags.includes("Vida Sustentável"))
              .map((article, index) => (
                <ArticleCard
                  key={index}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  date={article.date}
                  author={article.author}
                  readTime={article.readTime}
                  tags={article.tags}
                  url={article.url}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="climate" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(
                (article) => article.tags.includes("Mudanças Climáticas") || article.tags.includes("Ação Climática"),
              )
              .map((article, index) => (
                <ArticleCard
                  key={index}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  date={article.date}
                  author={article.author}
                  readTime={article.readTime}
                  tags={article.tags}
                  url={article.url}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="conservation" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(
                (article) => article.tags.includes("Conservação") || article.tags.includes("Conservação dos Oceanos"),
              )
              .map((article, index) => (
                <ArticleCard
                  key={index}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  date={article.date}
                  author={article.author}
                  readTime={article.readTime}
                  tags={article.tags}
                  url={article.url}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

     {/*  <section>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-100 dark:border-green-900">
          <CardHeader>
            <CardTitle>Assine Nossa Newsletter</CardTitle>
            <CardDescription>
              Mantenha-se atualizado com nossos artigos mais recentes e notícias ambientais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Digite seu email" className="flex-grow" />
              <Button>Inscrever-se</Button>
            </div>
          </CardContent>
        </Card>
      </section> */}
    </div>
  )
}

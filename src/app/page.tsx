import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveBanner } from "@/components/interactive-banner"
import { MissionCard } from "@/components/mission-card"
import { DesafioSemanal } from "@/components/desafio-semanal"
import Link from "next/link"
import { ArrowRight, Leaf, Globe, Lightbulb } from "lucide-react"
import { ArticleCard } from "@/components/article-card"

export default function Home() {
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
  ]
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <InteractiveBanner />
      </section>

      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Nossa Missão & Visão</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra como o EcoVerso está trabalhando para criar um futuro mais sustentável através da educação e
            experiências interativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MissionCard
            icon={<Leaf className="h-8 w-8 text-green-500" />}
            title="Educação Ambiental"
            description="Acreditamos que a educação é a base para a mudança. Nosso conteúdo interativo torna o aprendizado sobre questões ambientais envolvente e acessível."
            delay={0.1}
          />
          <MissionCard
            icon={<Globe className="h-8 w-8 text-blue-500" />}
            title="Conscientização Global"
            description="Os desafios ambientais são de natureza global. Nosso objetivo é promover um senso de cidadania global e responsabilidade compartilhada."
            delay={0.2}
          />
          <MissionCard
            icon={<Lightbulb className="h-8 w-8 text-yellow-500" />}
            title="Soluções Sustentáveis"
            description="Além da conscientização, fornecemos soluções práticas e atividades que indivíduos e comunidades podem implementar em seu dia a dia."
            delay={0.3}
          />
        </div>
      </section>

      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Desafio Semanal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Teste seus conhecimentos sobre sustentabilidade e ganhe pontos!
          </p>
        </div>
        <DesafioSemanal />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Recursos Educacionais</CardTitle>
            <CardDescription>Vídeos, infográficos e materiais para download</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Explore nossa coleção de recursos educacionais projetados para ajudar você a aprender mais sobre
              conservação ambiental e sustentabilidade.
            </p>
            <Link href="/recursos">
              <Button variant="outline">Explorar Recursos</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gincanas Ecológicas</CardTitle>
            <CardDescription>Atividades interativas para escolas e comunidades</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Descubra instruções passo a passo para jogos e atividades que ensinam sobre tópicos ecológicos
              específicos.
            </p>
            <Link href="/gincanas">
              <Button variant="outline">Ver Gincanas</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Artigos Recentes</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Mantenha-se atualizado com as últimas notícias e dicas sobre vida sustentável.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="mt-8">
          <Link href="/articles">
            <Button>
              Ver Todos os Artigos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

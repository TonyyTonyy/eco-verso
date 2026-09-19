import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveBanner } from "@/components/interactive-banner"
import { MissionCard } from "@/components/mission-card"
import { DesafioSemanal } from "@/components/desafio-semanal"
import { DesafiosComunitarios } from "@/components/desafios-comunitarios"
import Link from "next/link"
import { ArrowRight, Leaf, Globe, Lightbulb, MapPin } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import PitchSection from "@/components/pitch-section"
import { articles } from "@/data/articles"

export default function Home() {
  const featuredArticles = articles.slice(0, 2)
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
            title="Conscientização"
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
    <PitchSection />
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Desafio Semanal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Teste seus conhecimentos sobre sustentabilidade e ganhe pontos!
          </p>
        </div>
        <DesafioSemanal />
      </section>

      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Desafios da Comunidade</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Metas coletivas que só alcançamos juntos. Registre a sua contribuição e acompanhe a
            barra coletiva subir!
          </p>
        </div>
        <DesafiosComunitarios />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Mapa de Ação Local
            </CardTitle>
            <CardDescription>Ecopontos, reciclagem, hortas e eventos perto de você</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Pare de apenas ler sobre sustentabilidade: encontre no mapa onde descartar
              eletrônicos, participar de hortas comunitárias e mutirões ambientais na sua cidade.
            </p>
            <Link href="/mapa">
              <Button>
                Explorar o mapa <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
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
        {featuredArticles.map((article) => (
              <ArticleCard
                key={article.url}
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
          <Link href="/artigos">
            <Button>
              Ver Todos os Artigos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

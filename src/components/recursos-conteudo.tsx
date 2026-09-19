import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/video-card";
import { InfoCard } from "@/components/info-card";
import { BookOpen, Database, Lightbulb } from "lucide-react";
import Link from "next/link";
import { videos, infographics } from "@/data/resources";

// Conteúdo da página de Recursos, extraído para ser reutilizado como seção/aba
export function RecursosConteudo() {
  return (
    <>
      <Tabs defaultValue="videos" className="mb-16">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="infographics">Infográficos</TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.url}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
                duration={video.duration}
                url={video.url}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="infographics" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infographics.map((infographic) => (
              <InfoCard
                key={infographic.title}
                title={infographic.title}
                description={infographic.description}
                image={infographic.image}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-16">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-100 dark:border-green-900">
          <CardHeader>
            <CardTitle>Conteúdos para o Desenvolvimento Sustentável</CardTitle>
            <CardDescription>
              Compartilhar informações de qualidade é fundamental para
              impulsionar práticas eco-responsáveis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Educação e Conscientização</h3>
                  <p className="text-sm text-muted-foreground">
                    Artigos, guias e vídeos que capacitam pessoas e organizações
                    a adotarem atitudes mais sustentáveis.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full">
                  <Database className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Transparência de Dados</h3>
                  <p className="text-sm text-muted-foreground">
                    Relatórios mostram indicadores ambientais e
                    sociais de forma clara e acessível.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Boas Práticas e Inovação</h3>
                  <p className="text-sm text-muted-foreground">
                    Estudos de caso e infográficos que inspiram soluções
                    criativas e de baixo impacto ambiental.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Sugira um Recurso</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Tem uma ideia para um recurso educacional? Adoraríamos ouvir de você!
        </p>
        <Link href="/contato">
          <Button size="lg" variant="outline">
            Enviar uma Sugestão
          </Button>
        </Link>
      </section>
    </>
  );
}

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
import { DownloadCard } from "@/components/download-card";
import { InfoCard } from "@/components/info-card";
import { BookOpen, Database, FileDown, FileText, Film, ImageIcon, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function EducationalResourcesPage() {
  const videos = [
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
      url: "hhttps://www.youtube.com/watch?v=1Y5WgGjUKdo",
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
  ];

  const infographics = [
    {
      title: "A poluição do ambiente marinho",
      description:
        "Dados sobre a quantidade de plástico que chega aos oceanos anualmente.",
      image:
        "https://www.iberdrola.com/documents/20125/40309/isla_basura_POR.jpg/fbd6d6a1-cb0f-28a0-ddd6-de2597712d13?t=1627278122425",
    },
    {
      title: "Detalhamento da Pegada de Carbono",
      description: "O que compõe a pegada de carbono de um lar médio.",
      image:
        "https://123ecos.com.br/wp-content/uploads/2023/04/Pegada-de-carbono-calcular.jpg",
    },
    {
      title: "O Ciclo da Água",
      description:
        "Diagrama oficial do ciclo da água, mostrando evaporação, condensação e precipitação.",
      image:
        "https://gpm.nasa.gov/education/sites/default/files/article_images/Water-Cycle-Art2A_medium.png",
    },
  ];

  const downloadables = [
    {
      title: "Guia de Atividades para Sala de Aula",
      description:
        "Instruções passo a passo para atividades de educação ambiental.",
      fileType: "PDF",
      fileSize: "2,4 MB",
      href: "/downloadables/guia-atividades-sala-aula.pdf",
      icon: <FileText className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Checklist de Vida Sustentável",
      description:
        "Uma lista imprimível para adotar hábitos sustentáveis em casa.",
      fileType: "PDF",
      fileSize: "1,8 MB",
      href: "/downloadables/guia-vida-sustentavel.pdf",
      icon: <FileText className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Pôster de Biodiversidade",
      description:
        "Um pôster colorido ilustrando a biodiversidade local para exibição em sala de aula.",
      fileType: "PNG",
      fileSize: "5,2 MB",
      href: "/downloadables/poster-biodiversidade.png",
      icon: <ImageIcon className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Cartões de Eco-Desafios",
      description:
        "Cartões imprimíveis com desafios ecológicos diários para estudantes.",
      fileType: "PDF",
      fileSize: "3,1 MB",
      href: "/downloadables/eco-desafios-challenge.pdf",
      icon: <FileText className="h-8 w-8 text-blue-500" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Recursos Educacionais</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore nossa coleção de vídeos, infográficos e materiais para
          download projetados para tornar a educação ambiental envolvente e
          acessível.
        </p>
      </div>

      <Tabs defaultValue="videos" className="mb-16">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="infographics">Infográficos</TabsTrigger>
          {/* <TabsTrigger value="downloadables">Downloads</TabsTrigger> */}
        </TabsList>
        <TabsContent value="videos" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <VideoCard
                key={index}
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
            {infographics.map((infographic, index) => (
              <InfoCard
                key={index}
                title={infographic.title}
                description={infographic.description}
                image={infographic.image}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="downloadables" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloadables.map((download, index) => (
              <DownloadCard
                key={index}
                title={download.title}
                description={download.description}
                fileType={download.fileType}
                fileSize={download.fileSize}
                icon={download.icon}
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
    </div>
  );
}
